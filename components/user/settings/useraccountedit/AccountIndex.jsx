import React from "react";

import UserAccount from "./EditUserEmailName";
import EditPassword from "./EditPassword";
import DeleteAccount from "./DeleteAccount";

export default function Account(props) {
  return (
    <>
      <aside className="">
        <UserAccount user={props.user} updateSession={props.updateSession} />
        <EditPassword />
        <DeleteAccount user={props.user} useAxiosFetch={props.useAxiosFetch} />
      </aside>
    </>
  );
}
