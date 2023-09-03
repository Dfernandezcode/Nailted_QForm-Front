import { useEffect, useState } from "react";
import "./index.scss";

interface progressBarProps {
  value: number;
}
const ProgressBar = ({ value }: progressBarProps) => {
  const [color, setColor] = useState<string>("");
  const [barValue, setBarValue] = useState<number>(0);

  useEffect(() => {
    const progressBarValue = Math.trunc(value);
    setBarValue(progressBarValue);

    if (progressBarValue < 25) {
      setColor("red");
    }

    if (progressBarValue >= 25 && progressBarValue < 70) {
      setColor("yellow");
    }

    if (progressBarValue >= 75) {
      setColor("green");
    }
  }, [value]);

  return (
    <div className="progress-bar">
      <div className={`progress-bar__background progress-bar--${color}`} style={{ width: `${barValue}%` }}></div>
    </div>
  );
};

export default ProgressBar;
