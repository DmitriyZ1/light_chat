function getRandom(min:number, max:number):number {
    return Math.floor(Math.random() * (max - min) + min);
  }

export const randomColor = ():string => {
    return `rgb(${getRandom(0, 255)}, ${getRandom(0, 255)}, ${getRandom(0, 255)})`
}
