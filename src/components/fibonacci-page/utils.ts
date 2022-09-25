export function getFibonacciNumbers(n: number): number[] {
    let fibonacci: number[] = [];
    for (let i = 1; i <= n; i++) {
      fibonacci = nextFibonacci(fibonacci);
    }
    return fibonacci;
  };
  
export function nextFibonacci (numbers: number[]): number[] { // добавляет "следующий" элемент последовательности
    const n = numbers.length;
    if (n < 1) {
      return [...numbers, 0];
    } if (n < 2) {
      return [...numbers, 1];
    } else {
      return [...numbers, (numbers[n - 2] + numbers[n - 1])];
    }
  };