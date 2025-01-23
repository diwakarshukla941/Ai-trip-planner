import { getPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserTripCardItem({ trip, index }) {
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    trip && getPlacePhoto();
  }, [trip]);

  const getPlacePhoto = async () => {
    try {
      const data = {
        textQuery: trip?.userSelection?.location?.label,
      };

      const result = await getPlaceDetails(data);
      if (result?.places?.[0]?.photos?.[3]?.name) {
        const PHOTO_URL = PHOTO_REF_URL.replace(
          "{NAME}",
          result.places[0].photos[3].name
        );
        setPhotoURL(PHOTO_URL);
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
    }
  };

  return (
    <Link
      to={`/view-trip/${trip.id}`}
      className="block cursor-pointer transition-transform transform hover:scale-105"
    >
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Image Section */}
        <div className="relative h-48 w-full">
          <img
            src={photoURL || "/placeholder.jpg"}
            alt={trip?.userSelection?.location?.label || "Trip Image"}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-2">
          <h2 className="font-bold text-xl text-gray-800 truncate">
            {trip?.userSelection?.location?.label || "Unknown Location"}
          </h2>
          <p className="text-gray-500 text-sm">
            {trip?.userSelection?.NoOFDays || 0} days trip with{" "}
            {trip?.userSelection?.budget || "unknown"} budget
          </p>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
