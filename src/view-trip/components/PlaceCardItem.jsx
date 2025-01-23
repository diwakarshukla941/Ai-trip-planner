import { getPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PlaceCardItem({ place }) {
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    place && getPlacePhoto();
  }, [place]);
  const getPlacePhoto = async () => {
    const data = {
      textQuery: place.placeName,
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
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=
        ${place.placeName}`}
      target="_blank"
    >
      <div className=" mt-2 p-3 flex gap-5 hover:scale-110 transition-all ">
        <img
          src={photoURL?photoURL:'/placeholder.jpg'}
          alt=""
          className="w-[130px] h-[130px] rounded-xl object-cover "
        />
        <div>
          <h2 className="font-bold text-lg">{place.placeName}</h2>
          <p className="text-sm text-gray-500">{place.placeDetails}</p>
          <h2 className="mt-2">🕙 {place.timeToTravel}</h2>
          <h2 className="mt-2">🎟️ {place.ticketPricing}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
