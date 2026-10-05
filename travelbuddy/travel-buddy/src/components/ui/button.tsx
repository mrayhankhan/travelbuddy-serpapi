import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-semibold transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default:
          "bg-[#FFD233] text-[#1A1A1A] hover:bg-[#F5A623] rounded-full shadow-sm",
        secondary:
          "bg-white text-[#1A1A1A] border border-[#E5E5EA] hover:bg-[#F2F2F7] rounded-full",
        ghost:
          "hover:bg-[#F2F2F7] text-[#1A1A1A] rounded-xl",
        outline:
          "border border-[#E5E5EA] bg-transparent hover:bg-white text-[#6B6B6B] rounded-full",
        destructive:
          "bg-[#FF3B30] text-white hover:bg-[#FF3B30]/90 rounded-full",
        link:
          "text-[#1A1A1A] underline-offset-4 hover:underline",
        circle:
          "bg-[#1A1A1A] text-white hover:bg-[#2D2D2D] rounded-full shadow-md",
        "circle-yellow":
          "bg-[#FFD233] text-[#1A1A1A] hover:bg-[#F5A623] rounded-full shadow-sm",
      },
      size: {
        default: "h-12 px-6 text-[15px]",
        sm: "h-9 px-4 text-sm",
        lg: "h-14 px-8 text-base",
        xl: "h-16 px-10 text-lg",
        icon: "h-10 w-10",
        "icon-lg": "h-14 w-14",
        "icon-sm": "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
