function cx(...classes: (string | { [key: string]: boolean })[]): string {
  let cls = "";

  classes.forEach((p) => {
    if (typeof p === "string") {
      cls = `${cls} ${p}`;
      return;
    }

    Object.keys(p).forEach((k) => {
      if (!p[k]) return;
      cls = `${cls} ${k}`;
    });
  });

  return cls.trim();
}

export default cx;
