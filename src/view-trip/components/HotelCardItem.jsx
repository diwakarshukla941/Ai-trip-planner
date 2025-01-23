import { getPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HotelCardItem({ hotel, index }) {
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    hotel && getPlacePhoto();
  }, [hotel]);
  const getPlacePhoto = async () => {
    const data = {
      textQuery: hotel?.hotelName,
    };

    const result = await getPlaceDetails(data);
    console.log(result.places[0].photos[3].name);

    const PHOTO_URL = PHOTO_REF_URL.replace(
      "{NAME}",
      result.places[0].photos[3].name
    );
    setPhotoURL(PHOTO_URL);
  };
  return (
    <div>
      <Link
        to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${hotel.hotelName} ${hotel.hotelAddress}`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        key={index} // Moved the key to the parent element
      >
        <div className="hover:scale-110 transition-all">
          <img
            src={photoURL ? photoURL : "/placeholder.jpg"}
            alt="Hotel"
            className="rounded-xl h-[180px] w-full object-cover"
          />
          <div className="my-2">
            <h2 className="font-medium">{hotel.hotelName}</h2>
            <h2 className="font-xs text-gray-500">📍 {hotel.hotelAddress}</h2>
            <h2 className="font-xs text-gray-500">
              💰 {hotel.price} per Night
            </h2>
            <h2 className="font-xs text-gray-500">⭐ {hotel.rating}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default HotelCardItem;
