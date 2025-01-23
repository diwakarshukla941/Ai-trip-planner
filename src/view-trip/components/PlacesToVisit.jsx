
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  const itinerary = trip?.TripData?.itinerary;

  return (
    <div className="p-4 space-y-6">
      <h2 className="font-bold text-2xl text-gray-800">Places To Visit</h2>

      {Array.isArray(itinerary) && itinerary.length > 0 ? (
        itinerary.map((item, index) => (
          <div key={index} className="mb-6">
            {/* Day Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-xl text-gray-700">{item.day || `Day ${index + 1}`}</h2>
            </div>

            {/* Responsive Grid Layout for Places */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {Array.isArray(item.plan) && item.plan.length > 0 ? (
                item.plan.map((place, placeIndex) => (
                  <div key={placeIndex} className="bg-white p-4 rounded-lg shadow-md mb-4">
                    <h3 className="text-sm text-orange-600 font-medium">{place.time || 'Unknown Time'}</h3>
                    <PlaceCardItem place={place} />
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No places planned for this day.</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No itinerary available.</p>
      )}
    </div>
  );
}

export default PlacesToVisit;
