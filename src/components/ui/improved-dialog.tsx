"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { cn } from "./utils";

function ImprovedDialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function ImprovedDialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function ImprovedDialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function ImprovedDialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

const ImprovedDialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentProps<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    data-slot="dialog-overlay"
    className={cn(
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80 backdrop-blur-md transition-all duration-300",
      className,
    )}
    {...props}
  />
));

ImprovedDialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

// Mobile-first responsive modal content with proper sizing and positioning
function ImprovedDialogContent({
  className,
  children,
  size = "default",
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  size?: "small" | "default" | "large" | "full";
}) {
  const sizeClasses = {
    small: "w-[80vw] max-w-sm sm:max-w-md",
    default: "w-[85vw] max-w-md sm:max-w-lg",
    large: "w-[90vw] max-w-lg sm:max-w-2xl",
    full: "w-[90vw] max-w-xl sm:max-w-4xl"
  };

  return (
    <ImprovedDialogPortal data-slot="dialog-portal">
      <ImprovedDialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          // Perfect centering on screen from all four sides
          "fixed inset-0 z-50 flex items-center justify-center",
          // Safe padding from screen edges
          "p-4 sm:p-6 lg:p-8",
          className,
        )}
        style={{
          // Ensure the content itself is properly sized and positioned
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          className={cn(
            // Responsive width with desktop max-width constraints
            sizeClasses[size],
            // Desktop specific max-width (400-500px range)
            "lg:max-w-[450px] xl:max-w-[500px]",
            // Height constraints - never more than 70-75% of screen height with perfect centering
            "max-h-[70vh] sm:max-h-[75vh]",
            // Enhanced animations with scale and fade
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[state=closed]:slide-out-to-top-[1%] data-[state=open]:slide-in-from-top-[1%]",
            "duration-300 ease-out",
            // Enhanced glassmorphism styling with better shadows
            "glass-card rounded-3xl border border-purple-500/40",
            "shadow-2xl shadow-purple-500/20 backdrop-blur-xl",
            // Soft glow effect
            "ring-1 ring-purple-400/20",
            // Layout and overflow handling
            "flex flex-col overflow-hidden relative",
          )}
        >
          <div className="flex flex-col min-h-0 flex-1 overflow-hidden">
            {children}
          </div>
          <DialogPrimitive.Close className="absolute top-4 right-4 z-10 rounded-xl opacity-70 transition-all duration-200 hover:opacity-100 hover:scale-110 focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none bg-background/30 backdrop-blur-sm p-2.5 border border-purple-400/20">
            <XIcon className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </div>
      </DialogPrimitive.Content>
    </ImprovedDialogPortal>
  );
}

function ImprovedDialogHeader({ 
  className, 
  ...props 
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        "flex flex-col space-y-3 text-center sm:text-left",
        "p-6 pb-4 border-b border-border/30",
        "flex-shrink-0",
        className
      )}
      {...props}
    />
  );
}

function ImprovedDialogBody({ 
  className, 
  ...props 
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-body"
      className={cn(
        "flex-1 overflow-y-auto p-6",
        "min-h-0", // Allow flex shrinking
        // Custom scrollbar for better mobile experience
        "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-purple-500/30",
        className
      )}
      {...props}
    />
  );
}

function ImprovedDialogFooter({ 
  className, 
  ...props 
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end gap-3",
        "p-6 pt-4 border-t border-border/30",
        "flex-shrink-0",
        className,
      )}
      {...props}
    />
  );
}

function ImprovedDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-xl font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  );
}

function ImprovedDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm leading-relaxed", className)}
      {...props}
    />
  );
}

export {
  ImprovedDialog,
  ImprovedDialogClose,
  ImprovedDialogContent,
  ImprovedDialogDescription,
  ImprovedDialogFooter,
  ImprovedDialogHeader,
  ImprovedDialogBody,
  ImprovedDialogOverlay,
  ImprovedDialogPortal,
  ImprovedDialogTitle,
  ImprovedDialogTrigger,
};