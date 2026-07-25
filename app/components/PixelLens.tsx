"use client";

import { useEffect, useRef } from "react";
import styles from "./PixelLens.module.css";

export function PixelLens() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const pointer = { x: 0.72, y: 0.28 };
    let width = 0;
    let height = 0;
    let frame = 0;
    let lastDraw = 0;
    let visible = !document.hidden;

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = "#08080c";
      context.fillRect(0, 0, width, height);

      const cell = width < 700 ? 20 : 24;
      const lensX = pointer.x * width;
      const lensY = pointer.y * height;
      const radius = Math.max(78, Math.min(132, width * 0.11));

      for (let y = -cell; y < height + cell; y += cell) {
        for (let x = -cell; x < width + cell; x += cell) {
          const distance = Math.hypot(x - lensX, y - lensY);
          const inside = distance < radius;
          const wave = Math.sin(x * 0.032 + y * 0.019 + time * 0.0008);
          const size = inside ? 7.5 + wave * 3 : 1.5 + Math.max(0, wave);
          const hue = 74 + (x / Math.max(width, 1)) * 80;

          context.fillStyle = inside
            ? `hsl(${hue} 94% 68% / 0.78)`
            : `rgba(151, 145, 178, ${0.08 + Math.max(0, wave) * 0.045})`;
          context.fillRect(x - size / 2, y - size / 2, size, size);
        }
      }

      const glow = context.createRadialGradient(
        lensX,
        lensY,
        radius * 0.18,
        lensX,
        lensY,
        radius * 1.65,
      );
      glow.addColorStop(0, "rgba(190, 255, 54, 0.1)");
      glow.addColorStop(0.58, "rgba(143, 124, 255, 0.045)");
      glow.addColorStop(1, "rgba(143, 124, 255, 0)");
      context.fillStyle = glow;
      context.beginPath();
      context.arc(lensX, lensY, radius * 1.65, 0, Math.PI * 2);
      context.fill();

      context.strokeStyle = "rgba(243, 243, 236, 0.32)";
      context.lineWidth = 1;
      context.beginPath();
      context.arc(lensX, lensY, radius, 0, Math.PI * 2);
      context.stroke();

      context.strokeStyle = "rgba(243, 243, 236, 0.12)";
      context.beginPath();
      context.moveTo(lensX - radius - 9, lensY);
      context.lineTo(lensX + radius + 9, lensY);
      context.moveTo(lensX, lensY - radius - 9);
      context.lineTo(lensX, lensY + radius + 9);
      context.stroke();
    };

    const animate = (time: number) => {
      if (visible && time - lastDraw >= 32) {
        draw(time);
        lastDraw = time;
      }
      frame = window.requestAnimationFrame(animate);
    };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw();
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = Math.max(0.03, Math.min(0.97, event.clientX / width));
      pointer.y = Math.max(0.05, Math.min(0.95, event.clientY / height));
      if (reducedMotion) draw();
    };

    const onVisibilityChange = () => {
      visible = !document.hidden;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    resize();
    if (!reducedMotion) frame = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className={styles.background}
      data-effect="pixel-lens"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
