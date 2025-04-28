import React from "react";
import { twMerge } from "tailwind-merge";

interface CustomContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  dataTestId?: string;
}

export default function CustomContainer({
  children,
  className,
  style,
  dataTestId,
}: CustomContainerProps) {
  return (
    <div
      data-testid={dataTestId}
      style={style}
      className={twMerge(
        "w-full mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 px-4 py-4 sm:px-5 sm:py-5",
        className
      )}>
      {children}
    </div>
  );
}
