type ControlBarProps = {
  transformMode: "translate" | "rotate";
  activeModel: "car1" | "car2" | null;
  onModeChange: (mode: "translate" | "rotate") => void;
  onDeselect: () => void;
};

export function ControlBar({
  transformMode,
  activeModel,
  onModeChange,
  onDeselect,
}: ControlBarProps) {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center text-3xl gap-4">
      <div className="flex gap-4">
        {[
          { label: "MOVE", mode: "translate" as const },
          { label: "ROTATE", mode: "rotate" as const },
        ].map(({ label, mode }) => (
          <button
            key={mode}
            onClick={() => onModeChange(mode)}
            className="text-xl tracking-[0.2em] px-6 py-3 transition-all duration-200 font-medium rounded-md"
            style={{
              background:
                transformMode === mode ? "#e63946" : "rgba(0,0,0,0.65)",
              color:
                transformMode === mode ? "white" : "rgba(255,255,255,0.35)",
              border: `1px solid ${
                transformMode === mode ? "#e63946" : "rgba(255,255,255,0.1)"
              }`,
              backdropFilter: "blur(12px)",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {activeModel && (
        <>
          <div
            className="w-px h-6 mx-4"
            style={{ background: "rgba(255,255,255,0.1)" }}
          />
          <div
            className="flex items-center gap-3 px-4 py-3"
            style={{
              background: "rgba(0,0,0,0.65)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#e63946", boxShadow: "0 0 6px #e63946" }}
            />
            <span className="text-xl tracking-[0.2em] font-medium text-white/60">
              {activeModel === "car1" ? "MODEL 01" : "MODEL 02"} —{" "}
              {transformMode === "translate"
                ? "DRAG TO MOVE"
                : "DRAG ← → TO SPIN"}
            </span>
            <button
              onClick={onDeselect}
              className="text-white/25 hover:text-white/60 transition-colors text-[11px] leading-none"
            >
              ✕
            </button>
          </div>
        </>
      )}
    </div>
  );
}
