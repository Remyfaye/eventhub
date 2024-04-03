"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { createUser, getTheUser } from "@/lib/database/actions/user.actions";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useCookies } from "react-cookie";
// import { useDispatch } from "react-redux";

// interface SignInProps {
//   setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>;
// }

interface user {
  username: string;
  email: string;
}

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [hasSignedUp, setHasSignedUp] = useState(false);
  const [cookie, setCookie] = useCookies(["userId"]);
  const [user, setUser] = useState([]);
  // const dispatch = useDispatch();

  // const user =

  const handleCreateUser = async () => {
    try {
      const user = await createUser({
        firstname: firstname,
        lastname: lastname,
        username: username,
        email: email,
      });

      user && setUser(user);
      setUserId(user._id);

      setCookie("userId", user._id);
      // dispatch(setAuthState(true));
      setHasSignedUp(true);
      console.log(user._id);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  //   useEffect(() => {
  //     console.log(user);
  //   }, []);

  return (
    <>
      {hasSignedUp ? (
        <div
          style={{
            backgroundImage: `url(https://media.istockphoto.com/id/1410053593/vector/abstract-black-with-wavy-line-dimension-overlap-background-eps10-vector.jpg?s=612x612&w=0&k=20&c=hIxfFVp9eRtxmEPNmij5f65CufUh6yRiIU0SfSS446A=)`,
          }}
          className="bg-cover bg-center w-full fixed flex justify-center h-screen bg-purple-200 blend-overlay flex-center"
        >
          <div className="lg:w-[35%]  mt-[-5rem] capitalize items-center flex flex-col flex-center w-full mx-5 bg-white shadow-xl p-5 rounded-2xl">
            <h1 className="h3-bold mb-3 text-center">welcome</h1>

            <p className="mb-5 text-purple-400 lowercase">sign in successful</p>

            <Button className="bg-purple-500 w-full">
              <Link href="/">ok</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div
          style={{
            backgroundImage: `url(https://media.istockphoto.com/id/1410053593/vector/abstract-black-with-wavy-line-dimension-overlap-background-eps10-vector.jpg?s=612x612&w=0&k=20&c=hIxfFVp9eRtxmEPNmij5f65CufUh6yRiIU0SfSS446A=)`,
          }}
          className="bg-cover bg-center w-full fixed flex justify-center h-screen bg-purple-200 blend-overlay flex-center"
        >
          <div className="lg:w-[35%]  m-auto capitalize w-full mx-5 bg-white shadow-xl p-5 rounded-2xl">
            <div className="flex items-center justify-between ">
              <h1 className="h3-bold mt-5 mb-3">sign Up</h1>
              <Link href="/">
                <Image
                  src="/assets/icons/arrow.svg"
                  width={10}
                  height={10}
                  alt="image"
                />
              </Link>
            </div>
            <p className="mb-5 text-purple-400 lowercase">
              to continue to eventhub
            </p>

            <div>
              <div className="flex flex-col ">
                <label>firstname</label>
                <input
                  className="rounded-xl my-3 h-10 border-2"
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>

              <div className="flex flex-col ">
                <label>lastname</label>
                <input
                  className="rounded-xl my-3 h-10 border-2"
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>

              <div className="flex flex-col ">
                <label>username</label>
                <input
                  className="rounded-xl my-3 h-10 border-2"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label>email</label>
                <input
                  className="rounded-xl my-3 h-10 border-2"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button
                // type="submit"
                onClick={handleCreateUser}
                className=" bg-purple-700 w-full mt-5"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignIn;
