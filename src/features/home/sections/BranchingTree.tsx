import { motion, useReducedMotion } from 'motion/react';
import { useMemo } from 'react';

const COUNT = 70;
const ORIGIN = { x: 500, y: 270 };

/**
 * One line that branches into seventy.
 * א → א ב ג → 70 directions, drawn progressively when scrolled into view.
 */
export function BranchingTree({ rootLabel }: { rootLabel: string }) {
  const reduce = useReducedMotion();

  const branches = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => {
        const theta = Math.PI * (0.92 - (0.84 * i) / (COUNT - 1));
        const x = ORIGIN.x + 470 * Math.cos(theta);
        const y = ORIGIN.y + 330 * Math.sin(theta);
        const d = `M${ORIGIN.x},${ORIGIN.y} C${ORIGIN.x},${ORIGIN.y + (y - ORIGIN.y) * 0.65} ${x},${ORIGIN.y + (y - ORIGIN.y) * 0.25} ${x.toFixed(1)},${y.toFixed(1)}`;
        return { d, x, y };
      }),
    [],
  );

  const draw = (delay: number, duration = 1.4) =>
    reduce
      ? { initial: { pathLength: 1 }, whileInView: { pathLength: 1 } }
      : {
          initial: { pathLength: 0, opacity: 0 },
          whileInView: { pathLength: 1, opacity: 1 },
          transition: { duration, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <svg viewBox="0 0 1000 620" className="h-auto w-full" aria-hidden="true">
      <motion.text
        x="500"
        y="70"
        textAnchor="middle"
        className="fill-navy font-source"
        fontSize="56"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        א
      </motion.text>
      <text x="500" y="100" textAnchor="middle" className="fill-navy/40" fontSize="11" letterSpacing="4">
        {rootLabel.toUpperCase()}
      </text>

      <motion.path
        d="M500,120 L500,200"
        className="stroke-gold"
        strokeWidth="1"
        fill="none"
        viewport={{ once: true }}
        {...draw(0.3, 0.8)}
      />
      <motion.text
        x="500"
        y="238"
        textAnchor="middle"
        className="fill-navy font-source"
        fontSize="30"
        letterSpacing="10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        א ב ג
      </motion.text>

      <g fill="none" className="stroke-gold" strokeWidth="0.7">
        {branches.map((b, i) => (
          <motion.path key={i} d={b.d} viewport={{ once: true }} {...draw(1 + i * 0.012)} />
        ))}
      </g>
      <g className="fill-navy">
        {branches.map((b, i) => (
          <motion.circle
            key={i}
            cx={b.x}
            cy={b.y}
            r="2.4"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: reduce ? 0 : 2.2 + i * 0.01 }}
          />
        ))}
      </g>
    </svg>
  );
}
