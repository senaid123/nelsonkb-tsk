type ModelPanelProps = {
  activeModel: "car1" | "car2" | null;
  model1Rotation: [number, number, number];
  model2Rotation: [number, number, number];
  onSelect: (id: "car1" | "car2" | null) => void;
  onResetRotation: (id: "car1" | "car2") => void;
};

export function ModelPanel({
  activeModel,
  model1Rotation,
  model2Rotation,
  onSelect,
  onResetRotation,
}: ModelPanelProps) {
  return (
    <div className="absolute right-3 lg:right-6 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2 lg:gap-3">
      {(["car1", "car2"] as const).map((id, i) => {
        const active = activeModel === id;
        const rot = id === "car1" ? model1Rotation : model2Rotation;

        const rotDeg = Math.round(((rot[1] * 180) / Math.PI) % 360);

        return (
          <div
            key={id}
            className="transition-all duration-200"
            style={{
              background: active ? "rgba(230,57,70,0.12)" : "rgba(0,0,0,0.55)",
              border: `1px solid ${active ? "rgba(230,57,70,0.55)" : "rgba(255,255,255,0.08)"}`,
              backdropFilter: "blur(12px)",
              minWidth: 110,
            }}
          >
            <button
              className="w-full text-left px-3 pt-2.5 pb-2 lg:px-4 lg:pt-3 lg:pb-2"
              onClick={() => onSelect(active ? null : id)}
            >
              <p
                className="text-[7px] lg:text-[8px] tracking-[0.3em] mb-0.5 lg:mb-1 font-medium"
                style={{ color: active ? "#e63946" : "rgba(255,255,255,0.25)" }}
              >
                MODEL 0{i + 1}
              </p>
              <p className="text-[12px] lg:text-[13px] font-semibold tracking-wide text-white">
                {id === "car1" ? "VEHICLE A" : "VEHICLE B"}
              </p>
              <p
                className="text-[7px] lg:text-[8px] tracking-[0.15em] mt-1"
                style={{ color: active ? "rgba(230,57,70,0.7)" : "rgba(255,255,255,0.18)" }}
              >
                {active ? "● SELECTED" : "SELECT"}
              </p>
            </button>

            {active && (
              <div
                className="px-3 pb-2.5 pt-1 lg:px-4 lg:pb-3 flex items-center justify-between gap-2 lg:gap-3"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div>
                  <p className="text-[7px] lg:text-[8px] tracking-[0.2em] text-white/30 mb-0.5">Y ROTATION</p>
                  <p className="text-[12px] lg:text-[13px] font-mono font-semibold text-white/70">{rotDeg}°</p>
                </div>
                <button
                  onClick={() => onResetRotation(id)}
                  className="text-[7px] lg:text-[8px] tracking-[0.15em] px-2 py-1.5 lg:px-2.5 transition-all duration-150"
                  style={{
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "rgba(255,255,255,0.4)",
                    background: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#e63946";
                    (e.currentTarget as HTMLElement).style.color = "#e63946";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)";
                  }}
                >
                  RESET
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
