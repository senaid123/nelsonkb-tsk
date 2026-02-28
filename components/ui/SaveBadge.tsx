type SaveBadgeProps = {
  status: "idle" | "saving" | "saved";
};

export function SaveBadge({ status }: SaveBadgeProps) {
  return (
    <div
      className="absolute bottom-8 right-7 z-10 text-[9px] tracking-[0.25em] transition-all duration-500"
      style={{
        opacity: status === "idle" ? 0 : 1,
        color: status === "saved" ? "#4ade80" : "rgba(255,255,255,0.35)",
      }}
    >
      {status === "saving" ? "SAVING..." : "● SAVED TO CLOUD"}
    </div>
  );
}
