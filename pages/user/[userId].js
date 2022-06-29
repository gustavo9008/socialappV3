import React from "react";
import { appToastContext } from "../../context/state";

import UserProfile from "@/components/user/usersProfile/UserProfile";
import Spinner from "@/components/ui/Spinner";



function ProfilePage(props) {
  const { useFetch } = React.useContext(appToastContext);
  const [user, setUser] = React.useState(null)




  // const [user] = React.useState(props.user);
  React.useEffect(() => {
    const queryParams = new URL(document.location.href).pathname;
    console.log(queryParams);
    const getUser = async (id) => {
      const res = await useFetch("GET", `/api${queryParams}`);
      // console.log(res);
      res.data.message === "found account" &&
        setUser(res.data.account);
    };

    user === null && getUser();
  }, [user]);

  return (
    <>

      {user ? (
        <UserProfile
          user={user}
          post={user.profile.posts}
          comments={user.profile.comments}
          replies={user.profile.replies}
        />

      ) : (
        <Spinner />
      )}

    </>
  );
}



export default ProfilePage;
