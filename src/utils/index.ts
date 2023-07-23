export function debounce(callback: any, delay: number) {
  let timerId: NodeJS.Timeout;
  return function (...args: any) {
    clearTimeout(timerId);
    timerId = setTimeout(() => callback.apply(this, args), delay);
  };
}

export function slugify(str: string): string {
  return str.toLowerCase().replace(/\s+/g, "-");
}

export function deepEqual<T>(array1: T[], array2: T[]): boolean {
  if (array1.length !== array2.length) {
    return false;
  }

  const frequencyMap = new Map();

  // Build frequency map for array1
  for (const element of array1) {
    frequencyMap.set(element, (frequencyMap.get(element) || 0) + 1);
  }

  // Compare elements of array2 against frequency map
  for (const element of array2) {
    if (!frequencyMap.has(element)) {
      return false;
    }
    const frequency = frequencyMap.get(element);
    if (frequency === 1) {
      frequencyMap.delete(element);
    } else {
      frequencyMap.set(element, frequency - 1);
    }
  }

  return true;
}
