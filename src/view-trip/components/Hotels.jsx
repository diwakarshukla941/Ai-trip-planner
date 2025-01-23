import HotelCardItem from "./HotelCardItem";

function Hotels({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendations</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {trip?.TripData?.hotels?.map((hotel, index) => {
          return (
            <HotelCardItem hotel={hotel} index={index}/>
          );
        })}
      </div>
    </div>
  );
}

export default Hotels;
