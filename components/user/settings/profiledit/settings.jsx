import { Collection } from "mongoose";
import React, { useRef } from "react";
import { useRouter } from "next/router";
import { appToastContext } from "../../../../context/state";

import Button, { useBtnState } from "@/components/ui/globalUI/Button";

export default function Settings(props) {
  const router = useRouter();
  const { useFetch, showToast, userSession, setTokenRefreshInterval } =
    React.useContext(appToastContext);
  const [
    btnDisabled,
    setBtnDisabled,
    stopBtnAnimate,
    label,
    setLabel,
    btnColor,
    setBtnColor,
  ] = useBtnState(
    false,
    "Update Profile",
    "bg-blue-500 hover:bg-blue-600",
    "block"
  );

  const aboutRef = useRef();
  const locationRef = useRef();
  const personalWebsiteRef = useRef();
  const instagramRef = useRef();
  const twitterRef = useRef();
  const youtubeRef = useRef();
  const linkedinRef = useRef();
  const chAccProfileDetail = "accountChangeDetails";
  const sendAccountProfile = useFetch;

  const refreshTokenTrigger = () => {
    setTokenRefreshInterval(432000);
  };
  // userSession !== null && console.log(userSession.user.id);

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    setBtnDisabled(true);
    setLabel("Updating...");
    // console.log(aboutRef.current.value);
    let data = {
      about: aboutRef.current.value,
      location: locationRef.current.value,
      links: {
        personalWebsite: personalWebsiteRef.current.value,
        instagram: instagramRef.current.value,
        twitter: twitterRef.current.value,
        youtube: youtubeRef.current.value,
        linkedin: linkedinRef.current.value,
      },
      user: userSession.user.id,
      type: "UPDATE_PROFILE",
    };

    const res = await sendAccountProfile(
      "PUT",
      "/api/user/updateuserprofile",
      data
    );

    if (res.data.success === true) {
      const resSession = await sendAccountProfile(
        "GET",
        `/api/auth/session?updateUserSession=true`
      );
      // console.log("resSession", resSession);

      // setTokenRefreshInterval(2);
      // setTimeout(() => {
      //   // console.log("setTimeout Triggered!");
      //   refreshTokenTrigger();
      // }, 4000);
      showToast("success", res.data.message);
      stopBtnAnimate(chAccProfileDetail);
      setLabel("Update Profile");
      setBtnDisabled(false);
    }
  };

  return (
    <>
      <section className="settings-card bottom-2 mt-4 border border-gray-500 bg-gray-100 p-4 dark:bg-gray-800">
        <h4 className="headings-style">Edit Profile</h4>
        <form
          id="edit-profile-form"
          action="/blogs/profile/settings/updateProfile?_method=PUT"
          method="POST"
        >
          <div className="fields divide-y divide-gray-500">
            <div className="mb-2">
              <div className="field">
                <label htmlFor="about" className="font-medium">
                  Tell us about yourself
                </label>
                <input
                  ref={aboutRef}
                  id="about"
                  className="mb-1 h-10 w-full appearance-none rounded bg-gray-300 py-2 px-3 text-sm leading-tight focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 focus:dark:bg-gray-900"
                  type="text"
                  name="about"
                  defaultValue={props.profile.about}
                />
              </div>
              <div className="field">
                <label htmlFor="location" className="font-medium">
                  Location
                </label>
                <input
                  ref={locationRef}
                  id="location"
                  className="mb-1 h-10 w-full appearance-none rounded bg-gray-300 py-2 px-3 text-sm leading-tight focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 focus:dark:bg-gray-900"
                  type="text"
                  name="location"
                  defaultValue={props.profile.location}
                />
              </div>
            </div>

            <div className="field mt-2">
              <h4 className="pt-2">Links</h4>
              <div className="fields">
                <label htmlFor="personal-Website" className="font-medium">
                  Personal Website
                </label>
                <input
                  ref={personalWebsiteRef}
                  id="personal-Website"
                  className="mb-1 h-10 w-full appearance-none rounded bg-gray-300 py-2 px-3 text-sm leading-tight focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 focus:dark:bg-gray-900"
                  type="text"
                  name="personal"
                  placeholder="http://..."
                  defaultValue={
                    props.profile.links
                      ? props.profile.links.personalWebsite
                      : ""
                  }
                />
              </div>
              <div className="fields">
                <label htmlFor="instagram" className="font-medium">
                  Instagram
                </label>
                <input
                  ref={instagramRef}
                  id="instagram"
                  className="mb-1 h-10 w-full appearance-none rounded bg-gray-300 py-2 px-3 text-sm leading-tight focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 focus:dark:bg-gray-900"
                  type="text"
                  name="instagram"
                  placeholder="instagram.com/..."
                  defaultValue={
                    props.profile.links ? props.profile.links.instagram : ""
                  }
                />
              </div>
              <div className="fields">
                <label htmlFor="twitter" className="font-medium">
                  Twitter
                </label>
                <input
                  ref={twitterRef}
                  id="twitter"
                  className="mb-1 h-10 w-full appearance-none rounded bg-gray-300 py-2 px-3 text-sm leading-tight focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 focus:dark:bg-gray-900"
                  type="text"
                  name="twitter"
                  placeholder="twitter/..."
                  defaultValue={
                    props.profile.links ? props.profile.links.twitter : ""
                  }
                />
              </div>
              <div className="fields">
                <label htmlFor="youtube" className="font-medium">
                  Youtube
                </label>
                <input
                  ref={youtubeRef}
                  id="youtube"
                  className="mb-1 h-10 w-full appearance-none rounded bg-gray-300 py-2 px-3 text-sm leading-tight focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 focus:dark:bg-gray-900"
                  type="text"
                  name="youtube"
                  placeholder="channels/..."
                  defaultValue={
                    props.profile.links ? props.profile.links.youtube : ""
                  }
                />
              </div>
              <div className="fields">
                <label htmlFor="linkedin" className="font-medium">
                  Linkedin
                </label>
                <input
                  ref={linkedinRef}
                  id="linkedin"
                  className="mb-1 h-10 w-full appearance-none rounded bg-gray-300 py-2 px-3 text-sm leading-tight focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 focus:dark:bg-gray-900"
                  type="text"
                  name="linkedin"
                  defaultValue={
                    props.profile.links ? props.profile.links.linkedin : ""
                  }
                />
              </div>
            </div>
          </div>
          <Button
            disabled={btnDisabled}
            label={label}
            idTag={chAccProfileDetail}
            handleClick={updateProfileHandler}
            className={`${btnColor} mt-3 mr-1.5 h-10 w-full rounded bg-opacity-80 p-2 hover:text-white`}
          />

          {/* <button
            onClick={updateProfileHandler}
            className="mr-1.5 mt-3 h-10 w-full rounded bg-indigo-500 bg-opacity-80 p-2 hover:bg-indigo-600 hover:text-white"
            aria-roledescription="save profile button"
          >
            Save Profile
          </button> */}
        </form>
      </section>
    </>
  );
}
