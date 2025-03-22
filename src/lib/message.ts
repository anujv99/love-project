type Line = {
  type: "code" | "text";
  text: string;
};

const loveMessage = `
/*
 * the code of love
 */
Hello Moni Ji!
Do you remember the day we first talked?
/* it was friday, february 14th.
 * on valentines day.
 */
Since that day a spark begun;
/* your face your voice your words. */
Your everything got imprinted in my heart;
As the time went on;
The Bond grew stronger and stronger;
Journey from Infatuation to Love;
We have traveled a long way together;
There have been fights;
/* and i'm sure there will be more. */
But our Bond will always grow back Stronger;


All I want to say is:
Baby, I will love you forever;


Now If you want to hug me,
you can touch the heart below
`;

let type: Line["type"] = "text";

const lines = loveMessage.split("\n").slice(1, -1);
const parsedLines: Line[] = [];

lines.forEach((l) => {
  if (l.includes("/*")) type = "code";
  parsedLines.push({
    type,
    text: l,
  });
  if (l.includes("*/")) type = "text";
});

export default parsedLines;
