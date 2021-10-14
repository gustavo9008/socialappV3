import { Collection } from "mongoose";
import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import UserAccount from "./useraccount";
import EditPassword from "./editpassword";
import DeleteAccount from "./deleteaccount";
import useFetch from "@/hooks/fetch";

export default function Account(props) {
  // console.log(props.user);
  //   const router = useRouter();
  //   console.log(props.profile);

  //   const aboutRef = useRef();
  //   const locationRef = useRef();
  //   const personalWebsiteRef = useRef();
  //   const instagramRef = useRef();
  //   const twitterRef = useRef();
  //   const youtubeRef = useRef();
  //   const linkedinRef = useRef();

  const updateProfileHandler = async (e) => {
    e.preventDefault();

    // console.log(aboutRef.current.value);

    const res = await fetch("/api/user/updateuserprofile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        about: aboutRef.current.value,
        location: locationRef.current.value,
        links: {
          personalWebsite: personalWebsiteRef.current.value,
          instagram: instagramRef.current.value,
          twiter: twitterRef.current.value,
          youtube: youtubeRef.current.value,
          linkedin: linkedinRef.current.value,
        },
      }),
    });
    // Await for data for any desirable next steps
    const data = await res.json();
    console.log(data);
  };

  return (
    <>
      <aside className="">
        <UserAccount send={useFetch} user={props.user} />
        <EditPassword send={useFetch} />
        <DeleteAccount />
      </aside>
    </>
  );
}
