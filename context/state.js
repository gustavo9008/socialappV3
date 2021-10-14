import React, { useState } from "react";

var CommentContext = React.createContext(null);

export function CommentsWrapper(props) {
  //   console.log(props);
  var [userDetails] = useState(props.user);
  //   setUserDetails(props.user);
  console.log(userDetails);

  return (
    <CommentContext.Provider value={userDetails}>
      {props.children}
    </CommentContext.Provider>
  );
}

export function useCommentContext() {
  return useContext(CommentContext);
}
