"use client";

import { useCallback, useMemo, useState } from "react";
import { quizQuestions } from "../../lib/quiz";
import {
  Box,
  Button,
  Card,
  Heading,
  Separator,
  Text,
  TextField,
} from "@radix-ui/themes";
import { accentColors } from "@radix-ui/themes/props";
import GardenComp from "../../components/GardenComp";
import { getPublicPath } from "../../lib/utils";

function getRandomColor() {
  return accentColors[Math.floor(Math.random() * accentColors.length)];
}

function getCharFromIndex(index: number) {
  return String.fromCharCode(index + 65);
}

const shapes = [
  {
    getPoint: (angle: number, offsetX: number, offsetY: number) => {
      const t = angle / Math.PI;
      const x = 19.5 * (16 * Math.pow(Math.sin(t), 3));
      const y =
        -20 *
        (13 * Math.cos(t) -
          5 * Math.cos(2 * t) -
          2 * Math.cos(3 * t) -
          Math.cos(4 * t));
      return new Array(offsetX + x, offsetY + y);
    },
    angle: 0.2,
    width: 670,
    height: 625,
  },
  {
    getPoint: (angle: number, offsetX: number, offsetY: number) => {
      const t = angle / Math.PI;
      const r =
        Math.exp(Math.cos(t)) -
        2 * Math.cos(4 * t) +
        Math.pow(Math.sin(t / 12), 5);
      const x = Math.sin(t) * r * 100;
      const y = Math.cos(t) * r * 100;
      return new Array(offsetX + x, offsetY + y);
    },
    angle: 0.15,
    width: 625,
    height: 625,
  },
  {
    getPoint: (angle: number, offsetX: number, offsetY: number) => {
      // Normalize angle range (10-30) to (0-1)
      const normalizedT = (angle - 10) / 20;

      // Parameters for sunflower
      const outerRadius = 190; // Increased for larger overall size
      const petalLength = 60; // Controls how long the petals are
      const petalCount = 20; // Number of petals around the flower

      // Circle position around which to place petals
      const t = normalizedT * Math.PI * 2;

      // Create distinct petal shapes
      // This creates bulging petals that extend outward
      const r =
        outerRadius + petalLength * Math.pow(Math.sin((petalCount / 2) * t), 2);

      const x = r * Math.cos(t);
      const y = r * Math.sin(t);

      return new Array(offsetX + x, offsetY + y);
    },
    angle: 0.1,
    width: 625,
    height: 625,
  },
  {
    getPoint: (angle: number, offsetX: number, offsetY: number) => {
      // Normalize angle (10-30) to full circle
      const t = ((angle - 10) / 20) * (Math.PI * 2);

      // Set radius for the ring
      const radius = 200; // Adjust this value for ring size

      // Calculate ring position
      const x = radius * Math.cos(t);
      const y = radius * Math.sin(t);

      return new Array(offsetX + x, offsetY + y);
    },
    angle: 0.2,
    width: 625,
    height: 625,
  },
];

export default function QuizPage() {
  const [questionIdx, setQuestionIdx] = useState(3);
  const [optionIdx, setOptionIdx] = useState(-1);
  const [showCommon, setShowCommon] = useState(false);
  const [pass, setPass] = useState("");

  const question = useMemo(() => {
    return quizQuestions[
      Math.min(quizQuestions.length - 1, Math.max(0, questionIdx))
    ];
  }, [questionIdx]);

  const options = useMemo(() => {
    if (optionIdx < 0 || optionIdx >= question.options.length)
      return question.options;
    return undefined;
  }, [question, optionIdx]);

  const selectedOption = useMemo(() => {
    if (optionIdx < 0 || optionIdx >= question.options.length) return undefined;
    return question.options[optionIdx];
  }, [question, optionIdx]);

  const currentShapeIdx = Math.min(shapes.length - 1, Math.max(0, questionIdx));
  const currentShape = shapes[currentShapeIdx];

  const headingColor = useMemo(() => getRandomColor(), [questionIdx]);

  const nextQuestion = useCallback(() => {
    if (question.password !== pass) return;

    setQuestionIdx((p) => p + 1);
    setOptionIdx(-1);
    setShowCommon(false);
    setPass("");
  }, [pass, question, setQuestionIdx, setOptionIdx, setShowCommon, setPass]);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[inherit] px-4 py-6">
      <Box maxWidth="480px" className="w-full">
        <div className="w-full flex flex-col gap-3">
          <Card className="w-full">
            <GardenComp
              key={currentShapeIdx}
              className="w-full"
              width={currentShape.width}
              height={currentShape.height}
              getPointFn={currentShape.getPoint}
              angleOffset={currentShape.angle}
            />
          </Card>
          <Card className="w-full">
            <div className="w-full flex flex-col gap-2">
              <Heading suppressHydrationWarning size="4" color={headingColor}>
                Question {questionIdx + 1}
              </Heading>
              <Text size="3">{question.question}</Text>
              <Separator size="4" />
              <div className="w-full flex flex-col gap-3">
                {options?.map((op, idx) => (
                  <Button
                    suppressHydrationWarning
                    key={op.text}
                    className="w-full"
                    variant="soft"
                    color={getRandomColor()}
                    onClick={() => setOptionIdx(idx)}
                  >
                    {getCharFromIndex(idx)} - {op.text}
                  </Button>
                ))}
                {selectedOption && (
                  <>
                    <Text size="2" color="gray">
                      {selectedOption.response}
                    </Text>
                    {showCommon && (
                      <>
                        <Separator size="4" />
                        {question.commonMessage && (
                          <Text size="2" color="gray">
                            {question.commonMessage}
                          </Text>
                        )}
                        {question.commonAudo && (
                          <>
                            <Text size="2" color="gray">
                              Play this audio to get next password
                            </Text>
                            <audio
                              className="w-full"
                              controls
                              src={getPublicPath(question.commonAudo)}
                            />
                          </>
                        )}
                        {question.commonVideo && (
                          <>
                            <Text size="2" color="gray">
                              Play this video to get next password
                            </Text>
                            <video
                              className="w-full rounded"
                              controls
                              src={getPublicPath(question.commonVideo)}
                            />
                          </>
                        )}
                        {questionIdx === 3 && (
                          <audio
                            className="w-full"
                            controls
                            src={getPublicPath("/music/kalank.mp3")}
                          />
                        )}
                        <Separator size="4" />
                        <Text size="2" color="gray">
                          Enter password for next question 😛
                        </Text>
                        <TextField.Root
                          value={pass}
                          placeholder={question.passwordHint}
                          onChange={(e) => setPass(e.currentTarget.value)}
                        >
                          <TextField.Slot />
                        </TextField.Root>
                      </>
                    )}
                    {!showCommon && (
                      <Button
                        suppressHydrationWarning
                        className="w-full"
                        variant="soft"
                        color={getRandomColor()}
                        onClick={() => setShowCommon(true)}
                      >
                        Continue...
                      </Button>
                    )}
                  </>
                )}
                {showCommon && (
                  <>
                    <Separator size="4" />
                    <Button
                      suppressHydrationWarning
                      className="w-full"
                      variant="soft"
                      color={getRandomColor()}
                      onClick={nextQuestion}
                    >
                      Next
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        </div>
      </Box>
    </div>
  );
}
