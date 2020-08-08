export const hourFormater = (hour = new Date()) => {
  return `${hour.getHours()}:${hour.getMinutes()}`;
};
