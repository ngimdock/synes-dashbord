export const Colors = {
  primary: "#8160AB",
  white: "#FFFFFF",
  lightGray: "#F5F5F5",
  lowLightGray: "#E9E9E9",
  red: "#FF0000",
};

export const formatDate = (d: any) => {
  const date = new Date(d);

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const months = [
    "Jan",
    "Fev",
    "Mar",
    "Avr",
    "Mai",
    "Juin",
    "Juil",
    "Aout",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${day} ${months[month]} ${year}`;
};

export const formatDateForInput = (d: any) => {
  const date = new Date(d);

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const stringMonth = month < 10 ? `0${month}` : month;
  const stringDay = day < 10 ? `0${day}` : day;

  return `${year}-${stringMonth}-${stringDay}`;
};

type DateOptions = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  hour12: false;
};

export const formatDateWithHour = (d: any) => {
  const date = new Date(d);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${12}h${minutes < 10 ? `0${minutes}` : minutes}`;
};

export const asynchronousEmulation = async (ms = 1000) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve("Loading the events");
    }, ms);
  });
};

export const capitalizeFirstLetter = (text: string): string => {
    if(!text || text.length < 1) return "";
    const firstLetter = text[0].toUpperCase();
    const newText = text.substring(1);
    return firstLetter+newText;
}