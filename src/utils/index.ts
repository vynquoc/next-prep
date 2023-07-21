export function debounce(callback: any, delay: number) {
  let timerId: NodeJS.Timeout;
  return function (...args: any) {
    clearTimeout(timerId);
    timerId = setTimeout(() => callback.apply(this, args), delay);
  };
}

export function slugify(str: string) {
  return str.toLowerCase().replace(/\s+/g, "-");
}
