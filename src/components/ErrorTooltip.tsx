// src/components/ErrorTooltip.tsx
"use client";
import React from "react";
import styles from "@/styles/tooltip.module.css";

interface Props {
  message: string;
  visible: boolean;
}

const ErrorTooltip: React.FC<Props> = ({ message, visible }) => {
  if (!visible) return null;

  return (
    <div className={styles.tooltip}>
      {message}
    </div>
  );
};

export default ErrorTooltip;