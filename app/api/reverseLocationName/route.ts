"use server";
import { Location } from "@/actions/getUserLocation";

// gets addy info from lat/long
export default async function reverseLocationName(location: Location) {
  console.log(location);
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${process.env.GOOGLE_API_KEY}`,
  );
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}
