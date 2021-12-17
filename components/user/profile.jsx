import React from "react";
import ReactDOM from "react-dom";

export default function Profile(props) {
  // console.log(props.user.created);
  // const css2obj = (css) => {
  //   const r = /(?<=^|;)\s*([^:]+)\s*:\s*([^;]+)\s*/g,
  //     o = {};
  //   css.replace(r, (m, p, v) => (o[p] = v));
  //   return o;
  // };

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
                src={props.user.profile.image.url}
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                        />
                      </svg>
                    </i>
                    Location: {props.profile.location}{" "}
                  </span>
                  <span>
                    <i className="profile-card-loc_joined">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
                        />
                      </svg>
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
