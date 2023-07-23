import { useEffect, useState } from "react";

const useTimer = (time: number) => {
  const [timeRemaining, setTimeRemaing] = useState<number>(0);
  const convertedTime = time * 60;
  const start = () => {
    setTimeRemaing(convertedTime);
  };
  useEffect(() => {
    if (timeRemaining < 0) return;
    const timerId = setTimeout(() => {
      setTimeRemaing(timeRemaining - 1);
    }, 1000);
    return () => clearTimeout(timerId);
  }, [timeRemaining]);

  return { timeRemaining, start };
};

export default useTimer;
