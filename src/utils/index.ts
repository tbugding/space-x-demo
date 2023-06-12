import dayjs from 'dayjs'

export const formatDate = (timeStamp:number, l?:string)=>{
    if (!timeStamp) return  '--'
    return dayjs(timeStamp).format(l ||"MMM D, YYYY")
}

export const delay = (time = 200) => {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}