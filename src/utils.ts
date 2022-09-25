export function randomArr() {
    const n = randomInt(3, 17);
    let arr = [];
    for (let i = 0; i < n; i++) {
      arr.push(randomInt(0, 100));
    }
    return arr;
  }
  
 export function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  