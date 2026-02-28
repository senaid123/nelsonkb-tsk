type HeaderProps = {
  isTopDown: boolean;
  onViewToggle: (topDown: boolean) => void;
};

export function Header({ isTopDown, onViewToggle }: HeaderProps) {
  return (
    <header
      className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-7 py-5"
      style={{
        background:
          "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, transparent 100%)",
      }}
    >
      <div>
        <p
          className="text-[9px] tracking-[0.4em] font-light mb-1"
          style={{ color: "#e63946" }}
        >
          AUTO SHOWCASE
        </p>
        <h1 className="text-[22px] font-bold tracking-[0.06em] text-white leading-none">
          VEHICLE SHOWROOM
        </h1>
      </div>

      <div className="flex gap-px">
        {(
          [
            { label: "3D VIEW", value: false },
            { label: "TOP VIEW", value: true },
          ] as const
        ).map(({ label, value }) => (
          <button
            key={label}
            onClick={() => onViewToggle(value)}
            className="text-[9px] tracking-[0.2em] px-5 py-2.5 transition-all duration-200 font-medium"
            style={{
              background:
                isTopDown === value ? "#e63946" : "rgba(255,255,255,0.05)",
              color: isTopDown === value ? "white" : "rgba(255,255,255,0.35)",
              border: `1px solid ${
                isTopDown === value ? "#e63946" : "rgba(255,255,255,0.12)"
              }`,
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </header>
  );
}
