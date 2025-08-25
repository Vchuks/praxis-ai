const CircularScoreProgress = ({ 
  score = 0, 
  maxScore = 100, 
  size = 120, 
  strokeWidth = 8,
  color = '#10B981', 
  backgroundColor = '#D9D9D9',
  textColor = '#008000',
  showPercentage = true,
  className = ''
}) => {
  // Calculate circle properties
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = Math.min(Math.max(score / maxScore, 0), 1) * 100;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Dynamic color based on score percentage
  const getScoreColor = (percent: number) => {
    if (percent >= 80) return '#10B981'; // Green
    if (percent >= 60) return '#F59E0B'; // Yellow
    if (percent >= 40) return '#F97316'; // Orange
    return '#EF4444'; // Red
  };

  const dynamicColor = color === 'auto' ? getScoreColor(percentage) : color;

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background circle */}
        <svg
          className="transform -rotate-90"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            className="opacity-30"
          />
          
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={dynamicColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
            }}
          />
        </svg>

        {/* Center content */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ color: textColor }}
        >
          <div className="text-2xl font-bold">
            {Math.round(score)}
            {showPercentage && maxScore === 100 && '%'}
            {!showPercentage && maxScore !== 100 && `/${maxScore}`}
          </div>
          
        </div>

        {/* Glow effect for high scores */}
        {percentage >= 90 && (
          <div 
            className="absolute inset-0 rounded-full opacity-20"
            style={{ 
              background: `radial-gradient(circle, ${dynamicColor}40 0%, transparent 70%)`
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CircularScoreProgress