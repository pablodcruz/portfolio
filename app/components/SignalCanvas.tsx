"use client";

import { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  accent: boolean;
};

export function SignalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const pointer = { x: -1000, y: -1000 };
    let frame = 0;
    let width = 0;
    let height = 0;
    let points: Point[] = [];

    const makePoints = () => {
      const count = Math.max(28, Math.min(58, Math.floor(width / 22)));
      points = Array.from({ length: count }, (_, index) => ({
        x: (index * 149.7) % width,
        y: (index * 83.3 + 41) % height,
        vx: ((index % 5) - 2) * 0.035,
        vy: (((index * 3) % 5) - 2) * 0.025,
        size: index % 11 === 0 ? 1.9 : 0.8,
        accent: index % 9 === 0,
      }));
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      makePoints();
      draw();
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      for (let index = 0; index < points.length; index += 1) {
        const point = points[index];
        if (!reducedMotion) {
          point.x = (point.x + point.vx + width) % width;
          point.y = (point.y + point.vy + height) % height;
        }

        const pointerDistance = Math.hypot(
          point.x - pointer.x,
          point.y - pointer.y,
        );
        const glow = Math.max(0, 1 - pointerDistance / 260);

        for (let next = index + 1; next < points.length; next += 1) {
          const other = points[next];
          const distance = Math.hypot(point.x - other.x, point.y - other.y);
          if (distance < 128) {
            context.beginPath();
            context.moveTo(point.x, point.y);
            context.lineTo(other.x, other.y);
            context.strokeStyle = `rgba(143, 124, 255, ${
              (1 - distance / 128) * (0.08 + glow * 0.11)
            })`;
            context.lineWidth = 0.65;
            context.stroke();
          }
        }

        context.beginPath();
        context.arc(
          point.x,
          point.y,
          point.size + glow * 1.6,
          0,
          Math.PI * 2,
        );
        context.fillStyle = point.accent
          ? `rgba(190, 255, 54, ${0.45 + glow * 0.45})`
          : `rgba(150, 132, 255, ${0.2 + glow * 0.5})`;
        context.fill();
      }

      if (!reducedMotion) frame = window.requestAnimationFrame(draw);
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
    };

    const onPointerLeave = () => {
      pointer.x = -1000;
      pointer.y = -1000;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);
    resize();
    if (!reducedMotion) frame = window.requestAnimationFrame(draw);

    return () => {
      observer.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} className="signal-canvas" aria-hidden="true" />;
}
