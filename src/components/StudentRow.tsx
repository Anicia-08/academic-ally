import { motion } from "framer-motion";
import { AlertTriangle, Award, Sparkles } from "lucide-react";
import AttendanceRing from "./AttendanceRing";
import { Student, getAttendancePercentage, getAttendanceStatus, getDailyMotivation } from "@/data/students";

const StudentRow = ({ student, index }: { student: Student; index: number }) => {
  const pct = getAttendancePercentage(student);
  const status = getAttendanceStatus(pct);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group rounded-lg border bg-card p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-4">
        <div className="text-2xl">{student.avatar}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-heading font-semibold text-foreground truncate">{student.name}</h3>
            {status === "perfect" && (
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.3 }}>
                <Award className="h-4 w-4 text-celebration" />
              </motion.span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{student.rollNo} · {student.department} · Sem {student.semester}</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {student.attendedClasses}/{student.totalClasses} classes attended
          </p>
        </div>
        <AttendanceRing percentage={pct} />
      </div>

      {status === "critical" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-3 flex items-start gap-2 rounded-md bg-destructive/10 p-3"
        >
          <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
          <p className="text-xs text-destructive">
            ⚠️ Attendance below 70%. Please reach out — we're here to help you get back on track.
          </p>
        </motion.div>
      )}

      {status === "perfect" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-3 flex items-start gap-2 rounded-md bg-celebration/10 p-3"
        >
          <Sparkles className="h-4 w-4 text-celebration shrink-0 mt-0.5" />
          <p className="text-xs text-celebration font-medium">{getDailyMotivation()}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default StudentRow;
