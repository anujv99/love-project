"use client";

import { useEffect, useRef, useState } from "react";
import { useInterval, useMeasure } from "react-use";
import moment from "moment";

import Garden from "../lib/garden";
import parsedLines from "../lib/message";

function getHeartPoint(angle: number, offsetX: number, offsetY: number) {
  const t = angle / Math.PI;
  const x = 19.5 * (16 * Math.pow(Math.sin(t), 3));
  const y =
    -20 *
    (13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t));
  return new Array(offsetX + x, offsetY + y);
}

const together = new Date();
together.setFullYear(2025, 1, 14);
together.setHours(14);
together.setMinutes(7);
together.setSeconds(0);
together.setMilliseconds(0);

export default function Home() {
  const heartRef = useRef<HTMLDivElement>(null);
  const gardenRef = useRef<HTMLCanvasElement>(null);
  const startedRef = useRef(false);

  const [parentRef, { width: parentWidth }] = useMeasure<HTMLDivElement>();

  const [message, setMessage] = useState("");
  const [time, setTime] = useState("");
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);

  useInterval(() => {
    const now = moment();
    const diff = moment.duration(now.diff(together));
    const days = Math.floor(diff.asDays());
    const hours = diff.hours();
    const minutes = diff.minutes();
    const seconds = diff.seconds();

    setTime(
      days +
        " days " +
        (hours < 10 ? "0" + hours : hours) +
        " hours " +
        (minutes < 10 ? "0" + minutes : minutes) +
        " minutes " +
        (seconds < 10 ? "0" + seconds : seconds) +
        " seconds",
    );
  }, 1000);

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
        const bloom = getHeartPoint(angle, width / 2, height / 2 - 55);
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
          // showMessages();
        } else {
          angle += 0.2;
        }
      }, interval);
    }

    const progress = {
      l: 0,
      t: 0,
    };
    let cache = "";
    let curr = "";

    function startTextAnimation() {
      const timer = setInterval(() => {
        if (progress.l >= parsedLines.length) {
          clearInterval(timer);
          setDone(true);
          return;
        }

        const l = parsedLines[progress.l];
        if (progress.t - 1 === l.text.length) {
          progress.l += 1;
          progress.t = 0;
          if (curr) cache = cache ? `${cache}<br>${curr}` : curr;
          curr = "";
          return;
        }

        curr = `<span class="${l.type === "code" ? "text-teal-300 italic" : "text-rose-200"}">${l.text.slice(0, progress.t)}</span>`;
        setMessage(`${cache}<br />${curr}`);
        progress.t += 1;
      }, 50);
    }

    setTimeout(() => {
      startHeartAnimation();
    }, 1000);
    setTimeout(() => {
      startTextAnimation();
    }, 2000);
    setTimeout(() => {
      setShow(true);
    }, 3000);
  }, [parentWidth]);

  const scale = Math.min(parentWidth / 670, 1.0);

  return (
    <div
      ref={parentRef}
      className="w-screen bg-stone-800 flex flex-col items-center gap-12 py-12"
    >
      <div
        className="w-full overflow-hidden relative"
        style={{
          minHeight: 625 * scale,
          maxHeight: 625 * scale,
        }}
      >
        <div
          ref={heartRef}
          className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
          style={{
            width: 670,
            height: 625,
          }}
        >
          <div
            className="absolute inset-0 flex flex-col items-center justify-between pt-42 pb-54 transition-opacity duration-500 ease-in"
            style={{
              scale,
              opacity: show ? 1 : 0,
            }}
          >
            <p className="text-4xl text-center flex flex-col">
              आकांक्षा - अनुज FOREVER
              <span className="text-xl mt-4">{time}</span>
            </p>
            <p className="text-2xl text-right">
              I LOVE YOU SO MUCH
              <br />- ANUJ
            </p>
          </div>
          <canvas
            ref={gardenRef}
            className="w-full h-full"
            style={{
              width: 670,
              height: 625,
              scale,
            }}
          />
        </div>
      </div>
      <div className="flex flex-col items-start">
        <p
          className="whitespace-pre font-mono text-xs"
          dangerouslySetInnerHTML={{
            __html: message,
          }}
        />
        <a
          className="whitespace-pre font-mono text-4xl text-left mt-4 transition-opacity duration-500 ease-in"
          style={{
            opacity: done ? 1 : 1,
          }}
        >
          ❤️
        </a>
      </div>
    </div>
  );
}
