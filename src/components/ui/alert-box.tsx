import { ReactNode } from "react";
import { cn } from "@/src/lib/utils";

interface AlertBoxProps {
  children: ReactNode;
  className?: string;
}

export function AlertBox({ children, className }: AlertBoxProps) {
  return (
    <div
      className={cn(
        "bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 border-l-4 border-pink-main p-4 my-4",
        className
      )}
    >
      {children}
    </div>
  );
}



