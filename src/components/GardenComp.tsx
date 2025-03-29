"use client";

import React, { useEffect, useRef } from "react";
import { useMeasure } from "react-use";
import Garden from "../lib/garden";

type Props = {
  width: number;
  height: number;
  angleOffset: number;
  className?: string;
  getPointFn: (
    angle: number,
    offsetX: number,
    offsetY: number,
  ) => Array<number>;
};

const GardenComp: React.FC<Props> = (props) => {
  const { width, height, angleOffset, className, getPointFn } = props;

  const heartRef = useRef<HTMLDivElement>(null);
  const gardenRef = useRef<HTMLCanvasElement>(null);
  const startedRef = useRef(false);

  const [parentRef, { width: parentWidth }] = useMeasure<HTMLDivElement>();

  const scale = Math.min(parentWidth / width, 1.0);

  useEffect(() => {
    if (
      !heartRef.current ||
      !gardenRef.current ||
      !parentWidth ||
      startedRef.current
    )
      return;
    startedRef.current = true;

    const { width, height } = heartRef.current.getBoundingClientRect();
    gardenRef.current.width = width;
    gardenRef.current.height = height;

    const gardenCtx = gardenRef.current.getContext("2d");
    if (!gardenCtx) return;

    gardenCtx.globalCompositeOperation = "lighter";
    const garden = new Garden(gardenCtx, gardenRef.current);

    setInterval(() => {
      garden.render();
    }, garden.options.growSpeed);

    function startHeartAnimation() {
      const interval = 50;
      let angle = 10;
      const heart = new Array();
      const animationTimer = setInterval(function () {
        const bloom = getPointFn(angle, width / 2, height / 2 - 55);
        let draw = true;
        for (let i = 0; i < heart.length; i++) {
          const p = heart[i];
          const distance = Math.sqrt(
            Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2),
          );
          if (distance < garden.options.bloomRadius.max * 1.3) {
            draw = false;
            break;
          }
        }
        if (draw) {
          heart.push(bloom);
          garden.createRandomBloom(bloom[0], bloom[1]);
        }
        if (angle >= 30) {
          clearInterval(animationTimer);
        } else {
          angle += angleOffset;
        }
      }, interval);
    }

    setTimeout(() => {
      startHeartAnimation();
    }, 1000);
  }, [parentWidth]);

  return (
    <div ref={parentRef} className={className}>
      <div
        className="w-full overflow-hidden relative"
        style={{
          minHeight: height * scale,
          maxHeight: height * scale,
        }}
      >
        <div
          ref={heartRef}
          className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
          style={{
            width,
            height,
          }}
        >
          <canvas
            ref={gardenRef}
            className="w-full h-full"
            style={{
              width,
              height,
              scale,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default GardenComp;
