import { motion } from "framer-motion";
import { getAttendanceStatus } from "@/data/students";

const statusColors = {
  perfect: "stroke-celebration",
  good: "stroke-success",
  warning: "stroke-warning",
  critical: "stroke-destructive",
};

const AttendanceRing = ({ percentage, size = 48 }: { percentage: number; size?: number }) => {
  const status = getAttendanceStatus(percentage);
  const r = (size - 6) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={4} className="stroke-muted" />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={4}
          strokeLinecap="round"
          className={statusColors[status]}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
          strokeDasharray={circumference}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold font-heading text-foreground">
        {percentage}%
      </span>
    </div>
  );
};

export default AttendanceRing;
