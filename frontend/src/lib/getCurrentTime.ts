export function getCurrentTime() {
  return new Date().toTimeString().slice(0, 5);
}
