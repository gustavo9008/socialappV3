import React from "react";
import { appToastContext } from "context/state";

export default function ProfileColorAvatar(props) {
  // console.log(props);
  const { userSession } = React.useContext(appToastContext);

  //===== picks between image or color  =====
  // const picbtn = props.user.profile.image.url ? imagebtn : btncolorPic;

  return (
    <>
      {props.type === "LOGGED_USER_CIRCLE_AVATAR" && (
        <>
          {!props.profile.url && (
            <>
              {/* <span
                className="block h-12 w-12 rounded-full"
                style={{
                  background: `liner-gradient(225deg, ${props.profile.profileGenericPic[0]}, ${props.profile.profileGenericPic[1]}, ${props.profile.profileGenericPic[2]}, ${props.profile.profileGenericPic[3]}, ${props.profile.profileGenericPic[4]}, ${props.profile.profileGenericPic[5]})`,
                }}
              ></span> */}
              <pre
                className="h-12 w-12 rounded-full"
                style={{
                  background: `linear-gradient(225deg,${props.profile.genericPic[0]}, ${props.profile.genericPic[1]}, ${props.profile.genericPic[2]}, ${props.profile.genericPic[3]}, ${props.profile.genericPic[4]}, ${props.profile.genericPic[5]})`,
                }}
              ></pre>
            </>
          )}
          {props.profile.url && (
            <pre className="user-profile-image">
              <img
                loading="lazy"
                className="h-12 w-12 rounded-full"
                src={props.profile.url}
                alt=""
              />
            </pre>
          )}
        </>
      )}
      {props.type === "CIRCLE_AVATAR_POST" && (
        <figure className="pr-2">
          {!props.profile.profileImage && (
            <div className="user-profile-image">
              <pre
                className="block h-12 w-12 rounded-full"
                style={{
                  background: `linear-gradient(225deg, ${props.profile.profileGenericPic[0]}, ${props.profile.profileGenericPic[1]}, ${props.profile.profileGenericPic[2]}, ${props.profile.profileGenericPic[3]}, ${props.profile.profileGenericPic[4]}, ${props.profile.profileGenericPic[5]})`,
                }}
              ></pre>
            </div>
          )}
          {props.profile.profileImage && (
            <pre className="user-profile-image">
              <img
                loading="lazy"
                className="h-12 w-12 rounded-full"
                src={props.profile.profileImage}
                alt=""
              />
            </pre>
          )}
        </figure>
      )}

      {props.type === "SQUARE_AVATAR" && (
        <div>
          {!props.user.profile.image.url ? (
            <pre
              className="profile-circle-avatar h-32 w-32 rounded-full object-cover Psm:mx-auto md:h-auto md:w-48 md:rounded-none"
              style={btnStyle}
            ></pre>
          ) : (
            <img
              className="profile-circle-avatar h-32 w-32 rounded-full object-cover Psm:mx-auto md:h-auto md:w-48 md:rounded-none"
              src={props.user.profile.image.url}
              alt=""
              width="384"
              height="512"
            ></img>
          )}
        </div>
      )}
    </>
  );
}
