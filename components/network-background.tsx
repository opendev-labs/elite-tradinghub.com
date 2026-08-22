"use client";

import React, { useRef, useEffect } from "react";

interface Point {
  x: number;
  y: number;
  originX: number;
  originY: number;
  closest?: Point[];
  circle?: Circle;
  active?: number;
  vx?: number;
  vy?: number;
}

class Circle {
  pos: Point;
  radius: number;
  color: string;
  active: number = 0;

  constructor(pos: Point, rad: number, color: string) {
    this.pos = pos;
    this.radius = rad;
    this.color = color;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.active) return;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = `rgba(38,217,138,${this.active})`; // emerald green
    ctx.fill();
  }
}

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    let width = container.clientWidth;
    let height = container.clientHeight;
    let targetPos = { x: width / 2, y: height / 2 };
    let target = { x: width / 2, y: height / 2 };
    let animateHeader = true;

    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let points: Point[] = [];

    // create grid points with random offset
    for (let x = 0; x < width; x = x + width / 20) {
      for (let y = 0; y < height; y = y + height / 20) {
        const px = x + Math.random() * (width / 20);
        const py = y + Math.random() * (height / 20);
        const p: Point = { x: px, originX: px, y: py, originY: py };
        points.push(p);
      }
    }

    // find 5 closest neighbours for each point
    for (let i = 0; i < points.length; i++) {
      const closest: Point[] = [];
      const p1 = points[i];
      for (let j = 0; j < points.length; j++) {
        const p2 = points[j];
        if (p1 !== p2) {
          let placed = false;
          for (let k = 0; k < 5; k++) {
            if (!placed && closest[k] === undefined) {
              closest[k] = p2;
              placed = true;
            }
          }
          for (let k = 0; k < 5; k++) {
            if (!placed && getDistance(p1, p2) < getDistance(p1, closest[k])) {
              closest[k] = p2;
              placed = true;
            }
          }
        }
      }
      p1.closest = closest;
    }

    // assign circles
    for (let i = 0; i < points.length; i++) {
      const c = new Circle(points[i], 2 + Math.random() * 2, "rgba(38,217,138,0.3)");
      points[i].circle = c;
    }

    function getDistance(p1: { x: number; y: number }, p2: { x: number; y: number }) {
      return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }

    function mouseMove(e: MouseEvent) {
      let posx = 0, posy = 0;
      if (e.pageX || e.pageY) { posx = e.pageX; posy = e.pageY; }
      else if (e.clientX || e.clientY) {
        posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      }
      targetPos.x = posx;
      targetPos.y = posy;
    }

    function scrollCheck() {
      animateHeader = document.body.scrollTop <= height;
    }

    function resize() {
      if (!containerRef.current) return;
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight;
      canvas.width = width;
      canvas.height = height;
    }

    function drawLines(p: Point) {
      if (!p.active || !p.closest) return;
      for (let i = 0; i < p.closest.length; i++) {
        ctx!.beginPath();
        ctx!.moveTo(p.x, p.y);
        ctx!.lineTo(p.closest[i].x, p.closest[i].y);
        ctx!.strokeStyle = `rgba(38,217,138,${p.active})`;
        ctx!.stroke();
      }
    }

    let animationFrameId: number;

    function animate() {
      if (animateHeader) {
        target.x += (targetPos.x - target.x) * 0.05;
        target.y += (targetPos.y - target.y) * 0.05;

        ctx!.clearRect(0, 0, width, height);
        for (let i = 0; i < points.length; i++) {
          const dist = Math.abs(getDistance(target, points[i]));
          if (dist < 4000) {
            points[i].active = 0.5;
            if (points[i].circle) points[i].circle!.active = 0.8;
          } else if (dist < 20000) {
            points[i].active = 0.3;
            if (points[i].circle) points[i].circle!.active = 0.5;
          } else if (dist < 40000) {
            points[i].active = 0.1;
            if (points[i].circle) points[i].circle!.active = 0.2;
          } else {
            points[i].active = 0.02;
            if (points[i].circle) points[i].circle!.active = 0.05;
          }
          drawLines(points[i]);
          if (points[i].circle) points[i].circle!.draw(ctx!);
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    }

    function shiftPoint(p: Point) {
      const duration = 1000 + Math.random() * 2000;
      const targetX = p.originX - 50 + Math.random() * 100;
      const targetY = p.originY - 50 + Math.random() * 100;
      const startX = p.x;
      const startY = p.y;
      const startTime = performance.now();

      function step(now: number) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // ease in-out circ
        const t = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        p.x = startX + (targetX - startX) * t;
        p.y = startY + (targetY - startY) * t;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          shiftPoint(p);
        }
      }
      requestAnimationFrame(step);
    }

    function touchMove(e: TouchEvent) {
      if (e.touches.length > 0) {
        targetPos.x = e.touches[0].clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        targetPos.y = e.touches[0].clientY + document.body.scrollTop + document.documentElement.scrollTop;
      }
    }

    animate();
    for (let i = 0; i < points.length; i++) shiftPoint(points[i]);

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("touchmove", touchMove, { passive: true });
    window.addEventListener("scroll", scrollCheck, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("touchmove", touchMove);
      window.removeEventListener("scroll", scrollCheck);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden w-full h-full" style={{ background: "#020617" }}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
