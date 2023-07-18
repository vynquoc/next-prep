export function debounce(callback: () => void, delay: number) {
  let timerId: ReturnType<typeof setTimeout> | null;
  return function (...args: any) {
    const context = this;
    clearTimeout(timerId);
    timerId = setTimeout(() => callback.apply(context, args), delay);
  };
}
