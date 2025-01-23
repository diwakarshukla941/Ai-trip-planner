import { getPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import { useEffect, useState } from "react";
const InfoSection = ({ trip }) => {
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    trip && getPlacePhoto();
  }, [trip]);
  const getPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
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
      <img
        src={photoURL?photoURL:'/placeholder.jpg'}
        className="h-[340px] w-full object-cover rounded-xl imgs"
      />

      <div className="my-5 flex flex-col gap-2">
        <h2 className="font-bold text-2xl ">
          {trip?.userSelection?.location?.label}
        </h2>
        <div className="flex gap-5">
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-small">
            📅 {trip?.userSelection?.NoOFDays} Days
          </h2>
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-small">
            💰 {trip?.userSelection?.budget} Budget
          </h2>
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-small">
            🥂 No Of Traveller :- {trip?.userSelection?.traveler} People
          </h2>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
