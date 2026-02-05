import React from "react";

export const BackgroundBlobs = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      
      {/* Blob 1 */}
      <div
        className="
          absolute
          -top-[25%] -left-[25%]
          w-[520px] h-[520px]
          rounded-full
          bg-[radial-gradient(circle_at_center,hsl(var(--foreground)/0.18),transparent_70%)]
          blur-[160px]
          animate-blob-slow
        "
      />

      {/* Blob 2 */}
      <div
        className="
          absolute
          -bottom-[30%] -right-[20%]
          w-[620px] h-[620px]
          rounded-full
          bg-[radial-gradient(circle_at_center,hsl(var(--foreground)/0.12),transparent_70%)]
          blur-[180px]
          animate-blob-medium
        "
      />

      {/* Subtle Noise Overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.04]" />
    </div>
  );
};
