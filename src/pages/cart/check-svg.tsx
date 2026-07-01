import { motion } from "motion/react";

export function CheckSVG() {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-circle-check-big-icon lucide-circle-check-big text-green-900 dark:text-white"
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1 }}
        d="M21.801 10A10 10 0 1 1 17 3.335"
      />
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        d="m9 11 3 3L22 4"
      />
    </motion.svg>
  );
}
