import React from "react";

export const BackgroundBlobs = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      
      {/* Blob 1: The "Active System" Glow (Top Left) */}
      {/* Uses Emerald-500 at very low opacity to suggest 'System Online' status */}
      <div
        className="
          absolute
          -top-[20%] -left-[10%]
          w-[600px] h-[600px]
          rounded-full
          bg-[radial-gradient(circle,rgba(16,185,129,0.15)_0%,transparent_70%)]
          blur-[120px]
          animate-blob-slow
          mix-blend-screen
        "
      />

      {/* Blob 2: The "Deep Infrastructure" Shadow (Bottom Right) */}
      {/* Uses a darker Green/Blue mix to add depth without distracting */}
      <div
        className="
          absolute
          -bottom-[20%] -right-[10%]
          w-[500px] h-[500px]
          rounded-full
          bg-[radial-gradient(circle,rgba(6,78,59,0.2)_0%,transparent_70%)]
          blur-[140px]
          animate-blob-medium
        "
      />

      {/* Blob 3: Center Ambient Light (Optional) */}
      {/* Very faint center highlight to make text pop slightly */}
      <div
        className="
          absolute
          top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[800px] h-[800px]
          rounded-full
          bg-[radial-gradient(circle,rgba(255,255,255,0.01)_0%,transparent_60%)]
          blur-[100px]
        "
      />

      {/* Static Noise Overlay: Adds the "Film Grain" / "Monitor" texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />
    </div>
  );
};