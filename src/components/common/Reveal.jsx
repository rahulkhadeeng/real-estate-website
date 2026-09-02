import React from 'react';
import useInView from '../../hooks/useInView';

/**
 * Reusable Reveal component to animate elements smoothly when they enter the viewport.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to animate
 * @param {string} props.animation - 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'zoom-out' | 'flip-up' | 'blur-in'
 * @param {number} props.delay - Animation delay in milliseconds (e.g. 100, 200)
 * @param {number} props.duration - Animation duration in milliseconds (default: 700)
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Inline styles
 * @param {number} props.threshold - Intersection threshold (0 to 1)
 * @param {string} props.rootMargin - Custom rootMargin
 * @param {boolean} props.triggerOnce - Whether to trigger only once (default: true)
 * @param {string} props.as - HTML tag to render (default: 'div')
 */
const Reveal = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 700,
  className = '',
  style = {},
  threshold = 0.15,
  rootMargin = '0px 0px -40px 0px',
  triggerOnce = true,
  as: Component = 'div',
  ...rest
}) => {
  const [ref, isInView] = useInView({ threshold, rootMargin, triggerOnce });

  const customStyle = {
    ...style,
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
  };

  const animationClass = `reveal-item reveal-${animation} ${isInView ? 'is-revealed' : ''}`;

  return (
    <Component
      ref={ref}
      className={`${animationClass} ${className}`.trim()}
      style={customStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Reveal;
