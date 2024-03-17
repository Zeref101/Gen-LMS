// @ts-ignore
export function timestampToDate({ seconds, nanoseconds }) {
  // Convert seconds to milliseconds and add nanoseconds converted to milliseconds
  const milliseconds = seconds * 1000 + nanoseconds / 1000000;
  return new Date(milliseconds);
}
