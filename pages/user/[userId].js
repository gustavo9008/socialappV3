import React from "react";
import Profile from "../../components/user/profile";
import useFetch from "@/hooks/fetch";
import { server } from "../../config/index";
import UserProfile from "@/components/user/usersProfile/UserProfile";

import Post from "@/models/post";
import User from "@/models/user";
import Comment from "@/models/comment";
import dbConnect from "../../middleware/mongodb";
import Reply from "@/models/replies";

const getPost = useFetch;

function ProfilePage(props) {
  //   const { data: session, status } = useSession();
  //   console.log(session.user.profile.image.genericPic);
  const user = JSON.parse(props.user);

  // const [user] = React.useState(props.user);

  return (
    <>
      <UserProfile
        user={user}
        post={user.profile.posts}
        comments={user.profile.comments}
        replies={user.profile.replies}
      />
    </>
  );
}

export async function getServerSideProps(context) {
  // console.log("get server side props is running");
  const userId = context.params.userId;
  // console.log(userId);
  // const user = userId;
  // const res = await getPost("GET", `${server}/api/user/${userId}`);
  // console.log(res.data.account);

  await dbConnect();
  // console.log(req.body);

  const user = await User.findById(userId)
    .select("-password")
    .populate({
      path: "profile.posts",
      select: { title: 1, created: 1 },
      options: { sort: { created: -1 } },
    })
    .populate({
      path: "profile.comments",
      options: { sort: { created: -1 } },
    })
    .populate({
      path: "profile.replies",
      options: { sort: { created: -1 } },
    })
    .lean();

  // console.log("server data", user);

  return {
    props: {
      user: JSON.stringify(user),
    },
  };
}

export default ProfilePage;
