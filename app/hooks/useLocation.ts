"use client";
import React from "react";
import { getUserLocation } from "@/actions/getUserLocation";
import { Location } from "@/actions/getUserLocation";

export function useLocation() {
  const [location, setLocation] = React.useState<Location>({
    latitude: 0,
    longitude: 0,
  });

  React.useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const userLocation = await getUserLocation();
        console.log("User Location:", userLocation); // Log the retrieved location for debugging
        setLocation({
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        });
      } catch (error) {
        console.error("Error fetching user location:", error);
        // Handle error appropriately
      }
    };

    fetchUserLocation();
  }, []);

  return location;
}
