import moment from "moment-timezone";

export const timezoneConvert = (date: Date, timezone?: string) => {
    if(timezone === undefined || timezone == '') return moment(date).format("YYYY-MM-DD HH:mm:ss");
    return moment(date).tz(timezone).format("YYYY-MM-DD HH:mm:ss");
}

export const timeConvert = (date: string) => {
    const year = date.substring(0, 4);
    const month = date.substring(5, 7);
    const day = date.substring(8, 10);

    const hours = date.substring(11, 13);
    const minutes = date.substring(14, 16);
    const seconds = date.substring(17, 19);

    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}