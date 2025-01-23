import { db } from "@/service/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";
import Footer from "../components/Footer";

function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    tripId && getTripData();
  }, [tripId]);

  // used to get trip info from firebase
  const getTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("document", docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log("no such document");
      toast("No Trip Found");
    }
  };
  return (
    <div className="p-10 md:px-20 l:px-44 xl:px-56">
      {/* {information section} */}
      <InfoSection trip={trip} />

      {/* recommended hotels */}
      <Hotels trip={trip} />
      {/* daily plans */}
      <PlacesToVisit trip={trip}/>
      {/* footer */}
      <Footer trip={trip}/>
    </div>
  );
}

export default ViewTrip;
