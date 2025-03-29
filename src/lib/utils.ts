function getPublicPath(path: string) {
  if (!path.startsWith("/")) path = `/${path}`;
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
}

export { getPublicPath };
