import React from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSolid,
  faCompass,
  faMap,
  faBirthdayCake,
} from "@fortawesome/free-solid-svg-icons";

export default function Profile(props) {
  // console.log(props.user.created);
  const css2obj = (css) => {
    const r = /(?<=^|;)\s*([^:]+)\s*:\s*([^;]+)\s*/g,
      o = {};
    css.replace(r, (m, p, v) => (o[p] = v));
    return o;
  };

  const btnStyle = {
    backgroundColor: `${props.user.genericImage[0]}`,
    backgroundImage: `linear-gradient(225deg, ${props.user.genericImage[0]} 0%, ${props.user.genericImage[1]} 50%, ${props.user.genericImage[2]} 100%)`,
  };

  // const spanSyle = css2obj(props.user.genericImage);
  // console.log(spanSyle);
  return (
    <main className="Psm:m-0 profile-container Psm:mt-3 mt-3">
      <header className="mb-2 Psm:w-full mx-auto">
        <figure className="md:flex flex-grow bg-gray-800 border border-gray-600 Psm:border-l-0 Psm:border-r-0 Psm:rounded-none rounded-md p-8 md:p-0 overflow-hidden">
          <div className="flex Psm:flex-col w-full">
            {!props.profile.image.url ? (
              <span
                className="profile-circle-avatar w-32 h-32 md:w-48 md:h-auto md:rounded-none rounded-full Psm:mx-auto object-cover"
                style={btnStyle}
              ></span>
            ) : (
              <img
                className="profile-circle-avatar w-32 h-32 md:w-48 md:h-auto md:rounded-none rounded-full Psm:mx-auto object-cover"
                src={props.profile.image.url}
                alt=""
                width="384"
                height="512"
              ></img>
            )}
            <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
              <figcaption className="font-medium">
                <p>{props.user.name}</p>
                <p className="text-lg font-semibold">{props.profile.about}</p>

                <aside className="mt-2 flex justify-around text-sm text-gray-400">
                  <span>
                    <i className="profile-card-loc_joined">
                      <FontAwesomeIcon icon={faMap} />
                    </i>
                    Location: {props.profile.location}{" "}
                  </span>
                  <span>
                    <i className="profile-card-loc_joined">
                      <FontAwesomeIcon icon={faBirthdayCake} />
                    </i>
                    Joined on: {new Date(props.user.created).toDateString()}
                  </span>
                </aside>
                <footer className="flex justify-around w-60 m-auto text-xl mt-4"></footer>
              </figcaption>
            </div>
          </div>
        </figure>
      </header>
    </main>
  );
}
