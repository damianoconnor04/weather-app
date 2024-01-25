export type Location = { latitude: number; longitude: number };

export const getUserLocation = () => {
  return new Promise<Location>((resolve, reject) => {
    if (navigator.geolocation) {
      // Geolocation is supported
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting location:", error.message);
          reject(error);
        },
      );
    } else {
      // Geolocation is not supported
      console.error("Geolocation is not supported by this browser.");
      reject(new Error("Geolocation is not supported"));
    }
  });
};
