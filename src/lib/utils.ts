function getPublicPath(path: string) {
  if (!path.startsWith("/")) path = `/${path}`;
  return `${process.env.PAGES_BASE_PATH || ""}${path}`;
}

export { getPublicPath };
