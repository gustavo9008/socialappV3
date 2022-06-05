import React from "react";

import UserAccount from "./useraccount";
import EditPassword from "./editpassword";
import DeleteAccount from "./deleteaccount";

export default function Account(props) {
  return (
    <>
      <aside className="">
        <UserAccount user={props.user} updateSession={props.updateSession} />
        <EditPassword />
        <DeleteAccount user={props.user} />
      </aside>
    </>
  );
}
