import * as React from "react";

import { cn } from "~/utils/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full cursor-text rounded border border-accent/30 bg-background px-3 py-2 text-sm !transition-colors !duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:italic placeholder:text-foreground hover:border-accent focus:outline-none focus:ring-1 focus:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
