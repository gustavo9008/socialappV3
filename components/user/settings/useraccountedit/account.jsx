import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import UserAccount from "./useraccount";
import EditPassword from "./editpassword";
import DeleteAccount from "./deleteaccount";
import useFetch from "@/hooks/fetch";

export default function Account(props) {
  return (
    <>
      <aside className="">
        <UserAccount send={useFetch} user={props.user} />
        <EditPassword send={useFetch} />
        <DeleteAccount delete={useFetch} user={props.user} />
      </aside>
    </>
  );
}
