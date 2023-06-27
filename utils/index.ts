export const Colors = {
  primary: "#8160AB",
  white: "#FFFFFF",
  lightGray: "#F5F5F5",
  lowLightGray: "#E9E9E9",
  red: "#FF0000",
};

export const formatDate = (d: any) => {
  const date = new Date(d);

  console.log({ d, date });

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

type DateOptions = {
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  hour12: false
};

export const formatDateWithHour = (d: any) => {

  const date = new Date(d);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${12}h${minutes < 10 ? `0${minutes}`: minutes}`;
}

export const asynchronousEmulation = async (ms = 1000) => {
    await new Promise((resolve) => {
    setTimeout(() => {
      resolve("Loading the events");
    }, ms);
  });
} 