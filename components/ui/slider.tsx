"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex touch-none select-none items-center",
      props.orientation === "vertical" 
        ? "h-full w-2 flex-col" 
        : "w-full h-2 flex-row",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track
      className={cn(
        "relative grow rounded-full bg-dark-3",
        props.orientation === "vertical" ? "h-full w-[3px]" : "h-[3px] w-full"
      )}
    >
      <SliderPrimitive.Range 
        className={cn(
          "absolute rounded-full bg-blue-1",
          props.orientation === "vertical" ? "w-full" : "h-full"
        )} 
      />
    </SliderPrimitive.Track>
    {props.defaultValue?.map((_: number, i: number) => (
      <SliderPrimitive.Thumb
        key={i}
        className="block size-4 rounded-full border border-blue-1 bg-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      />
    ))}
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider } 