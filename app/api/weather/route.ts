'use server'
import { Location } from "@/actions/getUserLocation";

export default async function getWeather(location: Location) {
  const res = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${location.latitude}&lon=${location.longitude}&units=imperial&appid=${process.env.OPENWEATHER_API_KEY}`,
  );
  if (!res.ok) {
    throw new Error(res.statusText)
  }
  return res.json();
}