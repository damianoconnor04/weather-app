"use client";
import React from "react";
import getWeather from "@/app/api/weather/route";
import { Location } from "@/actions/getUserLocation";

export function useWeather(location: Location) {
  // 'any' bc API response is dynamic and idk how else to type it
  const [weather, setWeather] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weatherData = await getWeather(location);
        setWeather(weatherData);
      } catch (error) {
        console.error(error);
        // Handle error appropriately
      }
    };
    fetchWeather();
  }, [location]);

  return weather;
}
