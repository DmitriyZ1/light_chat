function getRandom(min:number, max:number):number {
    return Math.floor(Math.random() * (max - min) + min);
  }

export const randomColor = ():string => {
    return `rgb(${getRandom(0, 255)}, ${getRandom(0, 255)}, ${getRandom(0, 255)})`
}

export const getTime = ():string => {
    const d = new Date();
    let hours:string = String(d.getHours()) 
    let min:string = String(d.getMinutes())
    hours = (hours.length < 2) ? ('0' + hours) : hours 
    min = (min.length < 2) ? ('0' + min) : min
    return `${hours}:${min}` 
}