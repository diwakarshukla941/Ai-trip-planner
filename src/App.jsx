import { useState } from "react";
import { Button } from "./components/ui/button";
import { Dialog, DialogContent, DialogDescription } from "@radix-ui/react-dialog";
import { DialogHeader } from "./components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Hero from "./components/custom/Hero";

function App() {
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const login = useGoogleLogin({
    onSuccess: (res) => {
      getUserProfile(res);
    },
    onError: (err) => {
      console.log(err);
    },
  });

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
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDialog(false);
        navigate("/create-trip");
      });
  };

  const handleGetStarted = () => {
    if (user) {
      navigate("/create-trip");
    } else {
      setOpenDialog(true);
    }
  };

  return (
    <div className="flex flex-col items-center mx-56 gap-9 relative">
      {/* Hero Section */}
      <h1 className="font-extrabold text-[50px] text-center mt-16 ">
        <span className="text-[#f85454]">Discover Your Next Adventure with AI:</span>{" "}
        Personalized Itineraries At Your Fingertips{" "}
      </h1>
      <p className="text-xl text-gray-500 text-center">
        Your personal trip planner and travel curator, creating custom
        itineraries tailored to your interests and budget.
      </p>
      <Button onClick={handleGetStarted}>Get Started It's Free</Button>

      {/* Dialog for Google Login */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-lg bg-white p-8 rounded-lg shadow-xl z-[11111]"
        >
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="Logo" className="mx-auto mb-4" />
              <h2 className="font-bold text-lg mt-7 text-center">
                Sign In With Google
              </h2>
              <p className="text-center mb-4">
                Sign in to the app securely using your Google account.
              </p>
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center justify-center"
              >
                <FcGoogle className="h-7 w-7" />
                Sign In With Google
              </Button>
              <Button
                variant="outline"
                className="w-full mt-3"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Hero/>
    </div>
  );
}

export default App;
