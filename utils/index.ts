export const Colors = {
  primary: "#8160AB",
  white: "#FFFFFF",
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
