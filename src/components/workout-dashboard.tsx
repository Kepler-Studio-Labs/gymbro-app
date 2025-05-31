import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  TrendingUp,
  Dumbbell,
  Target,
  Clock,
  BookOpen,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts";

const weightData = [
  { month: "Janv", weight: 75 },
  { month: "Fevr", weight: 74.5 },
  { month: "Mars", weight: 74 },
  { month: "Avri", weight: 73.5 },
  { month: "Mai", weight: 73 },
  { month: "Juin", weight: 72.5 },
];

const volumeData = [
  { week: "Semaine 1", volume: 12000 },
  { week: "Semaine 2", volume: 13500 },
  { week: "Semaine 3", volume: 14200 },
  { week: "Semaine 4", volume: 15800 },
  { week: "Semaine 5", volume: 16500 },
  { week: "Semaine 6", volume: 17200 },
];

const workoutFrequency = [
  { day: "Lun", workouts: 1 },
  { day: "Mar", workouts: 0 },
  { day: "Mer", workouts: 1 },
  { day: "Jeu", workouts: 0 },
  { day: "Ven", workouts: 1 },
  { day: "Sam", workouts: 1 },
  { day: "Dim", workouts: 0 },
];

const blogArticles = [
  {
    id: 1,
    title: "5 exercices essentiels pour renforcer la ceinture abdominale",
    excerpt:
      "Découvrez les exercices de base les plus efficaces qui transformeront votre routine d'entraînement et amélioreront votre forme physique globale.",
    author: "Sarah Johnson",
    date: "il y a 2 jours",
    readTime: "5 min de lecture",
    category: "Entraînement",
  },
  {
    id: 2,
    title: "La science derrière la surcharge progressive",
    excerpt:
      "Apprenez à appliquer correctement la surcharge progressive dans votre entraînement pour maximiser la prise de muscle et les gains de force.",
    author: "Mike Chen",
    date: "il y a 4 jours",
    readTime: "8 min de lecture",
    category: "Science",
  },
  {
    id: 3,
    title:
      "Le timing nutritionnel : quand manger pour des performances optimales",
    excerpt:
      "Optimisez vos performances sportives et votre récupération en comprenant les meilleurs moments pour nourrir votre corps.",
    author: "Emma Rodriguez",
    date: "il y a 1 semaine",
    readTime: "6 min de lecture",
    category: "Nutrition",
  },
];

const chartConfig = {
  weight: {
    label: "Poids (kg)",
    color: "hsl(var(--chart-1))",
  },
  volume: {
    label: "Volume (kg)",
    color: "hsl(var(--chart-2))",
  },
  workouts: {
    label: "Entrainements",
    color: "hsl(var(--chart-3))",
  },
};

export default function WorkoutDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Welcome Section */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">
              Bienvenue, Alex!
            </h1>
            <p className="text-xl text-gray-600">
              Prêt à atteindre vos objectifs de fitness aujourd&apos;hui?
            </p>
          </div>

          <Card className="">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Dumbbell className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">
                Avez-vous fait votre entraînement aujourd&apos;hui?
              </CardTitle>
              <CardDescription>
                Suivez votre progression et restez cohérent avec votre parcours
                de fitness
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold">
                <Calendar className="w-5 h-5 mr-2" />
                Enregistrer un entraînement
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="space-y-6">
          <div className="">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Votre progression
            </h2>
            <p className="text-gray-600">
              Suivez votre parcours de fitness avec des analyses détaillées
            </p>
          </div>

          <div className="grid gap-6 xl:grid-cols-2 2xl:grid-cols-3">
            {/* Weight Evolution Chart */}
            <Card className="">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Evolution du poids
                </CardTitle>
                <CardDescription>
                  L&apos;évolution de votre poids au cours des 6 derniers mois
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weightData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="weight"
                        stroke="var(--color-weight)"
                        strokeWidth={3}
                        dot={{
                          fill: "var(--color-weight)",
                          strokeWidth: 2,
                          r: 4,
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Training Volume Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  Volume d&apos;entraînement
                </CardTitle>
                <CardDescription>
                  Progression du volume d&apos;entraînement hebdomadaire
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={volumeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="volume"
                        stroke="var(--color-volume)"
                        fill="var(--color-volume)"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Workout Frequency Chart */}
            <Card className="">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-600" />
                  Fréquence d&apos;entraînement
                </CardTitle>
                <CardDescription>
                  Votre fréquence d&apos;entraînement hebdomadaire
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={workoutFrequency}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar
                        dataKey="workouts"
                        fill="var(--color-workouts)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Blog Section */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Articles</h2>
            <p className="text-gray-600">
              Restez informé avec nos derniers conseils et astuces fitness
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogArticles.map((article) => (
              <Card
                key={article.id}
                className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {article.category}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <BookOpen className="w-4 h-4 mr-1" />
                      {article.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight hover:text-blue-600 transition-colors">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>By {article.author}</span>
                    <span>{article.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" className="bg-white/80 backdrop-blur-sm">
              Voir plus d&apos;articles
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
