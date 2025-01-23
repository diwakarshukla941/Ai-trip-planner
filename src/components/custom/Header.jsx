import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@radix-ui/react-dialog";
import { DialogHeader } from "../ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Header() {
  const [users, setUsers] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUsers(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user data", error);
      }
    } else {
      navigate("/");
    }
  }, [navigate]);

  const login = useGoogleLogin({
    onSuccess: (res) => {
      getUserProfile(res);
    },
    onError: (err) => {
      console.error(err);
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
        setUsers(res.data);
        setOpenDialog(false);
      });
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5 bg-white sticky top-0 z-50">
      {/* Logo */}
      <Link to={"/"}>
        <img src="/logo.svg" alt="Logo" className="w-200" />
      </Link>

      {/* Navigation */}
      <div className="flex items-center gap-3">
        {users ? (
          <>
            <Link to={"/create-trip"}>
              <Button
                variant="outline"
                className="rounded-full hover:bg-gray-100 transition"
              >
                Create Trips
              </Button>
            </Link>
            <Link to={"/my-trips"}>
              <Button
                variant="outline"
                className="rounded-full hover:bg-gray-100 transition"
              >
                My Trips
              </Button>
            </Link>

            {/* Profile Picture Popover */}
            <Popover>
              <PopoverTrigger>
                <img
                  src={users.picture}
                  alt="User"
                  className="w-[40px] h-[40px] rounded-full border border-gray-300 cursor-pointer"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="cursor-pointer text-red-500 hover:underline"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>

      {/* Sign In Dialog */}
      <Dialog open={openDialog}>
        <DialogContent className="bg-white p-6 rounded-lg shadow-md max-w-sm mx-auto fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="Logo" className="mx-auto mb-5 w-16" />
              <h2 className="font-bold text-lg text-center">
                Sign In With Google
              </h2>
              <p className="text-sm text-gray-500 text-center">
                Sign in to the app securely using Google Auth.
              </p>
              <div className="mt-5 space-y-3">
                <Button
                  onClick={login}
                  className="w-full flex gap-4 items-center justify-center   text-white"
                >
                  <FcGoogle className="h-7 w-7" />
                  Sign In With Google
                </Button>
                <Button
                  onClick={() => setOpenDialog(false)}
                  className="w-full flex gap-4 items-center justify-center bg-gray-300 hover:bg-gray-400 text-gray-700"
                >
                  Cancel
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
