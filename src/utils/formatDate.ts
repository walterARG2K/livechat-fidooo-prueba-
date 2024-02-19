export function FormatDate(timestamp: {
  seconds: number;
  nanoseconds: number;
}) {
  const dateInMilliseconds =
    timestamp.seconds * 1000 + Math.round(timestamp.nanoseconds / 1e6);
  const date = new Date(dateInMilliseconds);

  const weekDay = date.toLocaleDateString("es-AR", { weekday: "long" });
  const numberDay = date.getDate();
  const month = date.toLocaleDateString("es-AR", { month: "long" });

  const hour = date.getHours();
  const minutes = date.getMinutes();

  const hour24Format = `${hour < 10 ? "0" : ""}${hour}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;

  // Combinar día de la semana y número del día en un string

  return {
    day: `${weekDay} ${numberDay} de ${month}`,
    hour: hour24Format,
  };
}
