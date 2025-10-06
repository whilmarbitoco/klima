interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

interface SimpleChartProps {
  data: DataPoint[];
  type: "line" | "bar";
  height?: number;
  unit?: string;
  unitDescription?: string;
}

export default function SimpleChart({
  data,
  type,
  height = 200,
  unit = "",
  unitDescription,
}: SimpleChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value));
  const points = data
    .map((point, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - (point.value / maxValue) * 80;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="w-full" style={{ height }}>
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
        {/* === BAR CHART === */}
        {type === "bar" &&
          data.map((point, index) => {
            const barWidth = 100 / data.length - 3;
            const x = index * (100 / data.length) + 1.5;
            const heightPercent = (point.value / maxValue) * 80;
            const y = 100 - heightPercent;

            return (
              <g key={index}>
                {/* Bar */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={heightPercent}
                  rx="1.5"
                  fill={point.color || "#10b981"}
                />
                {/* Value indicator above bar */}
                <text
                  x={x + barWidth / 2}
                  y={y - 2}
                  textAnchor="middle"
                  className="fill-white text-xs font-medium"
                  fontSize="0.5"
                >
                  {point.value}
                  {unit}
                </text>
              </g>
            );
          })}

        {/* === LINE CHART === */}
        {type === "line" && (
          <>
            <polyline
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              points={points}
            />
            {data.map((point, index) => {
              const x = (index / (data.length - 1)) * 100;
              const y = 100 - (point.value / maxValue) * 80;
              return (
                <g key={index}>
                  <circle cx={x} cy={y} r="2" fill="#10b981" />
                  <text
                    x={x}
                    y={y - 4}
                    textAnchor="middle"
                    className="fill-white text-xs font-medium"
                    fontSize="1"
                  >
                    {point.value}
                    {unit}
                  </text>
                </g>
              );
            })}
          </>
        )}
      </svg>

      {/* X-Axis Labels */}
      <div className="flex justify-between text-xs text-gray-400">
        {data.map((point, index) => (
          <span key={index}>{point.label}</span>
        ))}
      </div>
    </div>
  );
}
