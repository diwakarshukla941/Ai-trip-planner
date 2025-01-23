import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bars } from "react-loading-icons";
import { FcGoogle } from "react-icons/fc";
import {
  AI_PROMPT,
  selectBudgetOptions,
  selectTravelesList,
} from "@/constants/Options";
import { chatSession } from "@/service/AIModel";
import { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import path from "path";

const CreateTrip = () => {


  // states
  const [place, setPlace] = useState();
  const [openDialog, setopenDialog] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();



  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };



  const login = useGoogleLogin({
    onSuccess: (res) => {
      console.log(res);
      getUserProfile(res);
    },
    onError: (err) => {
      console.log(err);
    },
  });



  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      return setopenDialog(true);
    }
    if (
      (formData?.NoOFDays > 5 && !formData?.location) ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast("Please Fill All Details.");
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.NoOFDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
    setLoading(false);
    saveAITrip(result?.response?.text());
  };



  const saveAITrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const documentId = Date.now().toString();

    await setDoc(doc(db, "AITrips", documentId), {
      userSelection: formData,
      TripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: documentId,
    });
    setLoading(false);
    navigate('/view-trip/' + documentId);
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const getUserProfile = async (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res.data));
        setopenDialog(false);
        onGenerateTrip();
      });
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 ">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🏕️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>
      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is destination of choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <Input
            type="number"
            placeholder="ex.3"
            onChange={(e) => handleInputChange("NoOFDays", e.target.value)}
          />
        </div>
      </div>
      <div>
        <h2>What is Your Budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5 ">
          {selectBudgetOptions.map((item, index) => (
            <div
              key={index}
              className={`p-4 border rounded-r-lg hover:shadow-lg cursor-pointer ${
                formData?.budget == item.title && "shadow-lg border-black"
              }`}
              onClick={() => handleInputChange("budget", item.title)}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2>Who do you plan on traveling with on your next adventure?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5 ">
          {selectTravelesList.map((item, index) => (
            <div
              key={index}
              className={`p-4 border rounded-r-lg hover:shadow-lg cursor-pointer ${
                formData?.traveler == item.people && "shadow-lg border-black"
              }`}
              onClick={() => handleInputChange("traveler", item.people)}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="my-10 justify-end flex">
        <Button onClick={onGenerateTrip} disable={loading}>
          {" "}
          {loading ? (
            <Bars className="h-7 w-7 animate-pulse" />
          ) : (
            <> Generate Trip </>
          )}
        </Button>
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="" />
              <h2 className="font-bold text-lg mt-7 ">Sign In With Google</h2>
              <p>Sign In to the App With The Google Auth Securely</p>
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" />
                Sign In With Gooogle
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      ;
    </div>
  );
};

export default CreateTrip;
