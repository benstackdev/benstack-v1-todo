export const generateExpiryTimestamp = (secondsFromNow: number) => {
  const now = new Date();
  return new Date(now.setTime(now.getTime() + (1000 * secondsFromNow)));
};