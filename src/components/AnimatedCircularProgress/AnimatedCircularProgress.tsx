import { CircularProgress, CircularProgressLabel, CircularProgressProps } from "@chakra-ui/react";
import { useState, useEffect } from "react";

interface AnimatedCircularProgressProps extends CircularProgressProps {
  targetValue: number;
  color: string;
}

const AnimatedCircularProgress: React.FC<AnimatedCircularProgressProps> = ({ targetValue, color, size, ...rest }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    const step = targetValue / 100;

    const animateProgress = () => {
      setValue((prevValue) => {
        const nextValue = prevValue + step;
        return nextValue >= targetValue ? targetValue : nextValue;
      });

      if (value < targetValue) {
        animationFrameId = requestAnimationFrame(animateProgress);
      }
    };

    animationFrameId = requestAnimationFrame(animateProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [targetValue]);

  return (
    <CircularProgress value={value} color={color} size={size} {...rest}>
      <CircularProgressLabel>{Math.round(value)}%</CircularProgressLabel>
    </CircularProgress>
  );
};

export default AnimatedCircularProgress;
