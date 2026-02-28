export function LoadingOverlay() {
  return (
    <div
      className="absolute inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: "#050505" }}
    >
      <div className="flex gap-1.5 mb-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1 h-6 rounded-full"
            style={{
              background: "rgba(255,255,255,0.2)",
              animation: `barPulse 1.4s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
      <p className="text-[10px] tracking-[0.4em] text-white/30 font-light">
        INITIALIZING SHOWROOM
      </p>
    </div>
  );
}
