import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Award, AlertTriangle, TrendingUp, Search, Sprout, LogOut } from "lucide-react";
import StatsCard from "@/components/StatsCard";
import StudentRow from "@/components/StudentRow";
import { mockStudents, getAttendancePercentage, getAttendanceStatus } from "@/data/students";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "perfect" | "critical">("all");
  const { user, signOut } = useAuth();

  const students = mockStudents
    .filter((s) => {
      const pct = getAttendancePercentage(s);
      const status = getAttendanceStatus(pct);
      if (filter === "perfect" && status !== "perfect") return false;
      if (filter === "critical" && status !== "critical") return false;
      return s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.rollNo.toLowerCase().includes(search.toLowerCase());
    })
    .sort((a, b) => getAttendancePercentage(a) - getAttendancePercentage(b));

  const totalStudents = mockStudents.length;
  const perfectCount = mockStudents.filter((s) => getAttendanceStatus(getAttendancePercentage(s)) === "perfect").length;
  const criticalCount = mockStudents.filter((s) => getAttendanceStatus(getAttendancePercentage(s)) === "critical").length;
  const avgAttendance = Math.round(mockStudents.reduce((sum, s) => sum + getAttendancePercentage(s), 0) / totalStudents);

  const filters = [
    { key: "all" as const, label: "All Students" },
    { key: "perfect" as const, label: "🏆 Perfect" },
    { key: "critical" as const, label: "⚠️ Needs Care" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="rounded-lg bg-primary p-2">
            <Sprout className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-heading font-bold text-lg text-foreground">AttendAI</h1>
            <p className="text-xs text-muted-foreground">Nurturing consistency, celebrating commitment</p>
          </div>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground">
            Every Day You Show Up,<br />
            <span className="text-primary">You Grow 🌱</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            AI-powered attendance tracking that cares about your journey, not just your numbers.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatsCard title="Total Students" value={totalStudents} icon={Users} />
          <StatsCard title="Avg Attendance" value={`${avgAttendance}%`} subtitle="Across all students" icon={TrendingUp} variant="default" />
          <StatsCard title="Perfect Record" value={perfectCount} subtitle="100% attendance" icon={Award} variant="celebration" />
          <StatsCard title="Need Support" value={criticalCount} subtitle="Below 70%" icon={AlertTriangle} variant="warning" />
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or roll number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === f.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Student List */}
        <div className="space-y-3">
          {students.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">No students found</div>
          ) : (
            students.map((student, i) => (
              <StudentRow key={student.id} student={student} index={i} />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
