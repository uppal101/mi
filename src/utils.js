export function getDate() {
 let date = new Date().toJSON().slice(0,10);
 let monthDate = date.slice(5);
 let year = date.slice(0,4);

 return `${monthDate}-${year}`;
};

export function getConsecutiveDays() {
  const date = new Date();
  const weekday = new Array(7);
  weekday[0] = "Sunday:";
  weekday[1] = "Monday:";
  weekday[2] = "Tuesday:";
  weekday[3] = "Wednesday:";
  weekday[4] = "Thursday:";
  weekday[5] = "Friday:";
  weekday[6] = "Saturday:";

  switch(date.getDay()) {
    case 6:
      return [weekday[0], weekday[1]];
      break;
    case 5:
      return [weekday[date.getDay() + 1], weekday[0]];
      break;
    default:
      return [weekday[date.getDay() + 1], weekday[date.getDay() + 2]];
  }
}
