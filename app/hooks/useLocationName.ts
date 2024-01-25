"use client";
import React from "react";
import { Location } from "@/actions/getUserLocation";
import reverseLocationName from "@/app/api/reverseLocationName/route";

export function useLocationName(location: Location) {
  const [name, setName] = React.useState<string>("");

  React.useEffect(() => {
    const fetchLocationName = async () => {
      try {
        const response = await reverseLocationName(location);
        const result = response.results[0];

        if (result) {
          // extract city name from addy
          const cityComponent = result.address_components.find(
            (component: any) => component.types.includes("locality"),
          );

          if (cityComponent) {
            setName(cityComponent.short_name);
          } else {
            console.warn("City name not found in address components");
          }
        } else {
          console.warn("No results found from reverse geocode lookup");
        }
      } catch (error) {
        console.error("Error fetching location name:", error);
      }
    };

    fetchLocationName();
  }, [location]);

  return name;
}
