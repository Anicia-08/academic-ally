import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: "default" | "success" | "warning" | "celebration";
}

const variantStyles = {
  default: "bg-card border-border",
  success: "bg-success/10 border-success/30",
  warning: "bg-destructive/10 border-destructive/30",
  celebration: "bg-celebration/10 border-celebration/30",
};

const iconStyles = {
  default: "text-primary bg-primary/10",
  success: "text-success bg-success/10",
  warning: "text-destructive bg-destructive/10",
  celebration: "text-celebration bg-celebration/10",
};

const StatsCard = ({ title, value, subtitle, icon: Icon, variant = "default" }: StatsCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`rounded-lg border p-5 ${variantStyles[variant]}`}
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="mt-1 text-3xl font-bold font-heading text-foreground">{value}</p>
        {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      <div className={`rounded-lg p-2.5 ${iconStyles[variant]}`}>
        <Icon className="h-5 w-5" />
      </div>
    </div>
  </motion.div>
);

export default StatsCard;
