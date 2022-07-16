import React from "react";
import Toast from "../ui/footerUI/Toast";

import styles from "../ui/footerUI/Toast.module.css";
import { appToastContext } from "context/state";

export default function Footer(props) {
  const { list } = React.useContext(appToastContext);

  const [position, setPosition] = React.useState();
  let toastProperties = null;
  return (
    <footer className={`${styles.app}`}>
      <section className="">
        <div className="mx-auto max-w-screen-xl space-y-8 overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
          <p className="mt-8 text-center text-base leading-6 text-gray-400">
            © 2021 Created by Gustavo Ayala. All rights reserved.
          </p>
        </div>
      </section>
      <div>
        <Toast
          toastList={list}
          position={"bottomRight"}
          autoDelete={true}
          autoDeleteTime={4000}
        />
      </div>
    </footer>
  );
}
