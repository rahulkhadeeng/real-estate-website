import React, { useState, useEffect } from 'react';
import useInView from '../../hooks/useInView';

/**
 * Parses numeric part and prefix/suffix from strings like "2,000+", "10+", "40+", "High Rental Yield"
 */
const parseValue = (value) => {
  if (typeof value !== 'string') return { isNumeric: false, raw: value };

  const match = value.match(/^([^\d]*)(\d[\d,]*)(\+?.*)$/);
  if (!match) return { isNumeric: false, raw: value };

  const prefix = match[1] || '';
  const numStr = match[2].replace(/,/g, '');
  const targetNumber = parseInt(numStr, 10);
  const suffix = match[3] || '';
  const hasComma = match[2].includes(',');

  return {
    isNumeric: !isNaN(targetNumber),
    prefix,
    targetNumber,
    suffix,
    hasComma,
    raw: value
  };
};

const CountUp = ({ value, duration = 1800, className = '' }) => {
  const [ref, isInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [count, setCount] = useState(0);
  const parsed = parseValue(value);

  useEffect(() => {
    if (!isInView || !parsed.isNumeric) return;

    let startTime = null;
    let animationFrameId;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Ease out cubic: 1 - (1 - t)^3
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeOut * parsed.targetNumber);

      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(parsed.targetNumber);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, parsed.isNumeric, parsed.targetNumber, duration]);

  if (!parsed.isNumeric) {
    return <span ref={ref} className={className}>{value}</span>;
  }

  const formattedCount = parsed.hasComma
    ? count.toLocaleString('en-IN')
    : count;

  return (
    <span ref={ref} className={className}>
      {parsed.prefix}
      {isInView ? formattedCount : 0}
      {parsed.suffix}
    </span>
  );
};

export default CountUp;
