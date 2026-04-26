"use client";

export default function QuantityStepper({
  value,
  onChange,
  max,
  label,
}: {
  value: number;
  onChange: (v: number) => void;
  max: number;
  label: string;
}) {
  return (
    <div className="flex items-center gap-0 border border-border inline-flex">
      <button
        onClick={() => onChange(Math.max(1, value - 1))}
        disabled={value <= 1}
        aria-label={`Decrease ${label}`}
        className="w-10 h-10 flex items-center justify-center text-ink-soft hover:text-ink transition-colors disabled:opacity-30"
      >
        <svg width="12" height="2" viewBox="0 0 12 2" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="0" y1="1" x2="12" y2="1" />
        </svg>
      </button>
      <span className="w-10 h-10 flex items-center justify-center text-sm tabular-nums border-x border-border">
        {value}
      </span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={`Increase ${label}`}
        className="w-10 h-10 flex items-center justify-center text-ink-soft hover:text-ink transition-colors disabled:opacity-30"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="6" y1="0" x2="6" y2="12" />
          <line x1="0" y1="6" x2="12" y2="6" />
        </svg>
      </button>
    </div>
  );
}
