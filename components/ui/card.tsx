import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardVariants = cva(
  "rounded-xl overflow-hidden transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-secondary-800/50 border border-secondary-700/30",
        solid: "bg-secondary-800 border border-secondary-700",
        gradient: "bg-gradient-to-br from-primary-900/50 to-secondary-900/50 border border-primary-800/30",
        glass: "glass border border-white/10",
        glassDark: "glass-dark border border-white/5",
        outline: "bg-transparent border border-secondary-700",
      },
      hover: {
        default: "hover-card",
        none: "",
        scale: "hover:scale-[1.02] transition-transform",
        glow: "hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]",
      },
      padding: {
        none: "",
        sm: "p-3",
        md: "p-5",
        lg: "p-6",
        xl: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      hover: "default",
      padding: "md",
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

// Memoize the Card component for better performance
const Card = React.memo(
  React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant, hover, padding, ...props }, ref) => {
      return (
        <div
          ref={ref}
          className={cn(cardVariants({ variant, hover, padding, className }))}
          {...props}
        />
      )
    }
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-secondary-400", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
