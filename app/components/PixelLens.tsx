"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./PixelLens.module.css";

type LensController = {
  moveBy: (x: number, y: number) => void;
  reset: () => void;
};

export function PixelLens() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controllerRef = useRef<LensController | null>(null);
  const [positionLabel, setPositionLabel] = useState("center");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const pointer = { x: 0.64, y: 0.46 };
    let width = 0;
    let height = 0;
    let frame = 0;

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = "#0d0d14";
      context.fillRect(0, 0, width, height);

      const cell = width < 560 ? 18 : 22;
      const lensX = pointer.x * width;
      const lensY = pointer.y * height;
      const radius = Math.max(68, Math.min(96, width * 0.13));

      for (let y = -cell; y < height + cell; y += cell) {
        for (let x = -cell; x < width + cell; x += cell) {
          const distance = Math.hypot(x - lensX, y - lensY);
          const inside = distance < radius;
          const wave = Math.sin(x * 0.035 + y * 0.018 + time * 0.0012);
          const size = inside ? 8 + wave * 3.4 : 2 + Math.max(0, wave);
          const hue = 72 + (x / Math.max(width, 1)) * 82;

          context.fillStyle = inside
            ? `hsl(${hue} 94% 68% / 0.92)`
            : `rgba(157, 151, 184, ${0.13 + Math.max(0, wave) * 0.08})`;
          context.fillRect(x - size / 2, y - size / 2, size, size);
        }
      }

      const glow = context.createRadialGradient(
        lensX,
        lensY,
        radius * 0.2,
        lensX,
        lensY,
        radius * 1.45,
      );
      glow.addColorStop(0, "rgba(190, 255, 54, 0.09)");
      glow.addColorStop(0.65, "rgba(143, 124, 255, 0.045)");
      glow.addColorStop(1, "rgba(143, 124, 255, 0)");
      context.fillStyle = glow;
      context.beginPath();
      context.arc(lensX, lensY, radius * 1.45, 0, Math.PI * 2);
      context.fill();

      context.strokeStyle = "rgba(243, 243, 236, 0.76)";
      context.lineWidth = 1;
      context.beginPath();
      context.arc(lensX, lensY, radius, 0, Math.PI * 2);
      context.stroke();

      context.strokeStyle = "rgba(243, 243, 236, 0.32)";
      context.beginPath();
      context.moveTo(lensX - radius - 10, lensY);
      context.lineTo(lensX + radius + 10, lensY);
      context.moveTo(lensX, lensY - radius - 10);
      context.lineTo(lensX, lensY + radius + 10);
      context.stroke();
    };

    const animate = (time: number) => {
      draw(time);
      frame = window.requestAnimationFrame(animate);
    };

    const redraw = () => {
      if (reducedMotion) draw();
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw();
    };

    const moveTo = (clientX: number, clientY: number) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = Math.max(
        0.04,
        Math.min(0.96, (clientX - bounds.left) / bounds.width),
      );
      pointer.y = Math.max(
        0.08,
        Math.min(0.92, (clientY - bounds.top) / bounds.height),
      );
      redraw();
    };

    const onPointerMove = (event: PointerEvent) => {
      moveTo(event.clientX, event.clientY);
    };

    controllerRef.current = {
      moveBy(x, y) {
        pointer.x = Math.max(0.04, Math.min(0.96, pointer.x + x));
        pointer.y = Math.max(0.08, Math.min(0.92, pointer.y + y));
        setPositionLabel(
          `${Math.round(pointer.x * 100)}% horizontal, ${Math.round(pointer.y * 100)}% vertical`,
        );
        redraw();
      },
      reset() {
        pointer.x = 0.5;
        pointer.y = 0.5;
        setPositionLabel("center");
        redraw();
      },
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    canvas.addEventListener("pointermove", onPointerMove);
    resize();
    if (!reducedMotion) frame = window.requestAnimationFrame(animate);

    return () => {
      controllerRef.current = null;
      observer.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const movement = {
      ArrowLeft: [-0.05, 0],
      ArrowRight: [0.05, 0],
      ArrowUp: [0, -0.06],
      ArrowDown: [0, 0.06],
    }[event.key];

    if (movement) {
      event.preventDefault();
      controllerRef.current?.moveBy(movement[0], movement[1]);
    } else if (event.key === "Home") {
      event.preventDefault();
      controllerRef.current?.reset();
    }
  };

  return (
    <div
      className={styles.stage}
      role="group"
      tabIndex={0}
      aria-label="Interactive Pixel Lens. Move the pointer or use the arrow keys to inspect the pixel field. Press Home to center the lens."
      aria-describedby="pixel-lens-instructions pixel-lens-position"
      onKeyDown={onKeyDown}
    >
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <div className={styles.overlay} aria-hidden="true">
        <span className={styles.signal}>Signal</span>
        <span className={styles.prompt}>Move to inspect</span>
      </div>
      <div className={styles.topline} aria-hidden="true">
        <span>CANVAS 2D / OPTICS STUDY</span>
        <span>LIVE</span>
      </div>
      <p className={styles.instructions} id="pixel-lens-instructions">
        Pointer, touch, or arrow keys · Home resets
      </p>
      <span className={styles.srOnly} id="pixel-lens-position" aria-live="polite">
        Lens position: {positionLabel}
      </span>
    </div>
  );
}
