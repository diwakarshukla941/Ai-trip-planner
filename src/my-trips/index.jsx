import { db } from "@/service/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTripCardItem from "./components/UserTripCardItem";

function MyTrips() {
  const navigate = useNavigate(); // Initialize useNavigate here
  const [userTrip, setUserTrip] = useState([]);

  useEffect(() => {
    getUserTrips();
  }, []);

  const getUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/"); // Redirect to the home page if no user is logged in
      return; // Stop further execution
    }

    try {
      const q = query(
        collection(db, "AITrips"),
        where("userEmail", "==", user?.email)
      );
      const querySnapshot = await getDocs(q);
      const trips = [];
      setUserTrip([]); // Clear trips before loading 
      querySnapshot.forEach((doc) => {
        // Collect trips into an array
        trips.push({ id: doc.id, ...doc.data() });
      });
      setUserTrip(trips); // Update state with loaded trips
    } catch (error) {
      console.error("Error fetching trips: ", error);
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">My Trips</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5">
        {userTrip.map((trip, index) => (
          <UserTripCardItem key={trip.id} trip={trip}  />
        ))}
      </div>
    </div>
  );
}

export default MyTrips;
