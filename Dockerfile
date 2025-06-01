### BUILD

FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache libc6-compat openssl

RUN npm install -g pnpm@10.11.0

COPY package.json pnpm-lock.yaml ./
COPY ./src/prisma ./prisma

RUN pnpm install --frozen-lockfile

COPY . .

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

RUN pnpm prisma migrate deploy
RUN pnpm prisma generate

ARG NEXTAUTH_URL
ENV NEXTAUTH_URL=$NEXTAUTH_URL

ENV AUTH_TRUST_HOST=true
ENV NODE_ENV=production

RUN pnpm build

### PRODUCTION

FROM node:20-alpine AS runner

WORKDIR /app

RUN apk add --no-cache libc6-compat

RUN npm install -g pnpm@10.11.0

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

RUN pnpm prisma migrate deploy
RUN pnpm prisma generate

EXPOSE 3000

CMD ["pnpm", "start"]