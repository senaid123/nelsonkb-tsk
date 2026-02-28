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
    <div className="absolute bottom-5 lg:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col lg:flex-row items-center gap-2 lg:gap-0 w-max">
      <div className="flex gap-px">
        {[
          { label: "MOVE", mode: "translate" as const },
          { label: "ROTATE", mode: "rotate" as const },
        ].map(({ label, mode }) => (
          <button
            key={mode}
            onClick={() => onModeChange(mode)}
            className="text-[10px] lg:text-xl tracking-[0.2em] px-5 py-2.5 lg:px-6 lg:py-3 transition-all duration-200 font-medium"
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
            className="hidden lg:block w-px h-6 mx-4"
            style={{ background: "rgba(255,255,255,0.1)" }}
          />
          <div
            className="flex items-center gap-2 lg:gap-3 px-3 py-2 lg:px-4 lg:py-3"
            style={{
              background: "rgba(0,0,0,0.65)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: "#e63946", boxShadow: "0 0 6px #e63946" }}
            />
            <span className="text-[9px] lg:text-xl tracking-[0.2em] font-medium text-white/60 whitespace-nowrap">
              {activeModel === "car1" ? "MODEL 01" : "MODEL 02"} —{" "}
              <span className="hidden lg:inline">
                {transformMode === "translate" ? "DRAG TO MOVE" : "DRAG ← → TO SPIN"}
              </span>
              <span className="lg:hidden">
                {transformMode === "translate" ? "MOVE" : "ROTATE"}
              </span>
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
