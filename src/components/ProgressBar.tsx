interface ProgressBarProps {
  percent: number;
}

const ProgressBar = ({ percent }: ProgressBarProps) => (
  <div className="w-full h-[3px] bg-secondary rounded-full overflow-hidden">
    <div
      className="h-full rounded-full transition-all duration-700 ease-out"
      style={{
        width: `${percent}%`,
        background: "linear-gradient(90deg, #0F8A5F, #C9A227)",
      }}
    />
  </div>
);

export default ProgressBar;
