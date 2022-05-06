import React from "react";
import Profile from "../../components/user/profile";
import useFetch from "@/hooks/fetch";
import { server } from "../../config/index";
import UserProfile from "@/components/user/usersProfile/UserProfile";
const getPost = useFetch;

function ProfilePage(props) {
  //   const { data: session, status } = useSession();
  //   console.log(session.user.profile.image.genericPic);
  // console.log(props.user);

  // const [user] = React.useState(props.user);

  return (
    <>
      <UserProfile
        user={props.user}
        post={props.user.profile.posts}
        comments={props.user.profile.comments}
        replies={props.user.profile.replies}
      />
    </>
  );
}

export async function getServerSideProps(context) {
  // console.log("get server side props is running");
  const userId = context.params.userId;
  // console.log(userId);
  // const user = userId;
  const res = await getPost("GET", `api/user/${userId}`);
  // console.log(res.data.account);

  return {
    props: {
      user: await res.data.account,
    },
  };
}

export default ProfilePage;
