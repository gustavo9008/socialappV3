import { Collection } from "mongoose";
import React, { useState, useRef } from "react";
import { useRouter } from "next/router";

export default function Settings(props) {
  const router = useRouter();
  // console.log(props.profile);

  const aboutRef = useRef();
  const locationRef = useRef();
  const personalWebsiteRef = useRef();
  const instagramRef = useRef();
  const twitterRef = useRef();
  const youtubeRef = useRef();
  const linkedinRef = useRef();

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
    // console.log(data);
  };

  return (
    <>
      <section className="settings-card mt-4 p-4">
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
                  className="text-sm bg-gray-700 focus:bg-gray-900 appearance-none rounded w-full py-2 px-3 text-gray-300 mb-1 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-10"
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
                  className="text-sm bg-gray-700 focus:bg-gray-900 appearance-none rounded w-full py-2 px-3 mb-1 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-10"
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
                  className="text-sm bg-gray-700 focus:bg-gray-900 appearance-none rounded w-full py-2 px-3 mb-1 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-10"
                  type="text"
                  name="personal"
                  placeholder="http://..."
                  defaultValue={props.profile.links.personalWebsite}
                />
              </div>
              <div className="fields">
                <label htmlFor="instagram" className="font-medium">
                  Instagram
                </label>
                <input
                  ref={instagramRef}
                  id="instagram"
                  className="text-sm bg-gray-700 focus:bg-gray-900 appearance-none rounded w-full py-2 px-3 mb-1 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-10"
                  type="text"
                  name="instagram"
                  placeholder="instagram.com/..."
                  defaultValue={props.profile.links.instagram}
                />
              </div>
              <div className="fields">
                <label htmlFor="twitter" className="font-medium">
                  Twitter
                </label>
                <input
                  ref={twitterRef}
                  id="twitter"
                  className="text-sm bg-gray-700 focus:bg-gray-900 appearance-none rounded w-full py-2 px-3 mb-1 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-10"
                  type="text"
                  name="twitter"
                  placeholder="twitter/..."
                  defaultValue={props.profile.links.twitter}
                />
              </div>
              <div className="fields">
                <label htmlFor="youtube" className="font-medium">
                  Youtube
                </label>
                <input
                  ref={youtubeRef}
                  id="youtube"
                  className="text-sm bg-gray-700 focus:bg-gray-900 appearance-none rounded w-full py-2 px-3 mb-1 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-10"
                  type="text"
                  name="youtube"
                  placeholder="channels/..."
                  defaultValue={props.profile.links.youtube}
                />
              </div>
              <div className="fields">
                <label htmlFor="linkedin" className="font-medium">
                  Linkedin
                </label>
                <input
                  ref={linkedinRef}
                  id="linkedin"
                  className="text-sm bg-gray-700 focus:bg-gray-900 appearance-none rounded w-full py-2 px-3 mb-1 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-10"
                  type="text"
                  name="linkedin"
                  defaultValue={props.profile.links.linkedin}
                />
              </div>
            </div>
          </div>

          <button
            onClick={updateProfileHandler}
            className="w-full bg-opacity-80 rounded hover:text-white bg-indigo-500 hover:bg-indigo-600 p-2 mr-1.5 h-10 mt-3"
            aria-roledescription="save profile button"
          >
            Save Profile
          </button>
        </form>
      </section>
    </>
  );
}
