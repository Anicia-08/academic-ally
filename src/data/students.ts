export interface Student {
  id: string;
  name: string;
  rollNo: string;
  department: string;
  semester: number;
  totalClasses: number;
  attendedClasses: number;
  avatar: string;
}

const motivationalQuotes = [
  "Your consistency is your superpower! Keep shining ✨",
  "100% attendance — you're building habits that last a lifetime 🏆",
  "Champions show up every day. You're one of them! 🌟",
  "Discipline is the bridge between goals and accomplishment 🌉",
  "Your dedication inspires everyone around you 💪",
  "Every day you show up, you invest in your future 🚀",
  "Consistency beats talent when talent doesn't show up 🎯",
  "You're not just attending class, you're building character 🌱",
];

export const getDailyMotivation = (): string => {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return motivationalQuotes[dayOfYear % motivationalQuotes.length];
};

export const getAttendancePercentage = (s: Student): number =>
  s.totalClasses === 0 ? 100 : Math.round((s.attendedClasses / s.totalClasses) * 100);

export const getAttendanceStatus = (pct: number): "critical" | "warning" | "good" | "perfect" => {
  if (pct === 100) return "perfect";
  if (pct >= 75) return "good";
  if (pct >= 70) return "warning";
  return "critical";
};

const avatars = ["👩‍🎓", "👨‍🎓", "🧑‍🎓", "👩‍💻", "👨‍💻", "🧑‍💻"];

export const mockStudents: Student[] = [
  { id: "1", name: "Aarav Sharma", rollNo: "CS2024001", department: "Computer Science", semester: 4, totalClasses: 120, attendedClasses: 120, avatar: avatars[0] },
  { id: "2", name: "Priya Patel", rollNo: "CS2024002", department: "Computer Science", semester: 4, totalClasses: 120, attendedClasses: 115, avatar: avatars[1] },
  { id: "3", name: "Rohan Gupta", rollNo: "EC2024003", department: "Electronics", semester: 3, totalClasses: 100, attendedClasses: 68, avatar: avatars[2] },
  { id: "4", name: "Sneha Reddy", rollNo: "ME2024004", department: "Mechanical", semester: 5, totalClasses: 110, attendedClasses: 110, avatar: avatars[3] },
  { id: "5", name: "Vikram Singh", rollNo: "CS2024005", department: "Computer Science", semester: 4, totalClasses: 120, attendedClasses: 78, avatar: avatars[4] },
  { id: "6", name: "Ananya Iyer", rollNo: "EC2024006", department: "Electronics", semester: 3, totalClasses: 100, attendedClasses: 100, avatar: avatars[5] },
  { id: "7", name: "Karthik Nair", rollNo: "ME2024007", department: "Mechanical", semester: 5, totalClasses: 110, attendedClasses: 74, avatar: avatars[0] },
  { id: "8", name: "Diya Menon", rollNo: "CS2024008", department: "Computer Science", semester: 4, totalClasses: 120, attendedClasses: 112, avatar: avatars[1] },
  { id: "9", name: "Arjun Das", rollNo: "EC2024009", department: "Electronics", semester: 3, totalClasses: 100, attendedClasses: 55, avatar: avatars[2] },
  { id: "10", name: "Meera Joshi", rollNo: "ME2024010", department: "Mechanical", semester: 5, totalClasses: 110, attendedClasses: 110, avatar: avatars[3] },
];
