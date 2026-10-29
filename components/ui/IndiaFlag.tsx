export function IndiaFlag({ className }: { className?: string }) {
  const spokes = Array.from({ length: 24 }, (_, index) => index * 15);

  return (
    <svg className={className} viewBox="0 0 36 24" role="img" aria-label="Flag of India">
      <rect width="36" height="8" fill="#FF9933" />
      <rect y="8" width="36" height="8" fill="#FFFFFF" />
      <rect y="16" width="36" height="8" fill="#138808" />
      <circle cx="18" cy="12" r="3.1" fill="none" stroke="#000080" strokeWidth="0.45" />
      {spokes.map((angle) => (
        <line
          key={angle}
          x1="18"
          y1="12"
          x2={18 + Math.sin((angle * Math.PI) / 180) * 2.7}
          y2={12 - Math.cos((angle * Math.PI) / 180) * 2.7}
          stroke="#000080"
          strokeWidth="0.28"
        />
      ))}
      <circle cx="18" cy="12" r="0.45" fill="#000080" />
    </svg>
  );
}
