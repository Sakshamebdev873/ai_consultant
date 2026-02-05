"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utlis";

export const ShinyButton = ({ children, className, onClick }: any) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "relative px-8 py-3 rounded-xl bg-primary text-white font-semibold shadow-lg shadow-primary/25 overflow-hidden group",
        className
      )}
    >
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};