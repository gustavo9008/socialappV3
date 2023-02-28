"use client";
import React, { useState, useRef, useMemo, Suspense, createRef } from "react";
import dynamic from "next/dynamic";

const importJodit = () => import("jodit-react");
const JoditEditor = dynamic(importJodit, {
  suspense: true,
  ssr: false,
});
console.log("server side");

const editor = React.forwardRef((props, ref) => {
  console.log(props);
  // const editor = createRef();
  // const editor = useRef();
  // const [content, setContent] = useState("");

  const configMemo = useMemo(() => {
    return {
      allowTabNavigation: false,
      askBeforePasteFromWord: false,
      askBeforePasteHTML: false,
      minHeight: "400",
      readonly: false, // all options from https://xdsoft.net/jodit/doc/
    };
  });
  return (
    <JoditEditor
      ref={ref}
      value={props.content}
      config={configMemo}
      tabIndex={1} // tabIndex of textarea
      onBlur={(newContent) => props.setContent(newContent)}
      onChange={(newContent) => {}}
    />
  );
});

export default editor;

// function editor() {
//   const editor = useRef();
//   const [content, setContent] = useState("");

//   const configMemo = useMemo(() => {
//     return {
//       allowTabNavigation: false,
//       askBeforePasteFromWord: false,
//       askBeforePasteHTML: false,
//       minHeight: "400",
//       readonly: false, // all options from https://xdsoft.net/jodit/doc/
//     };
//   });
//   return (
//     <div>
//       <JoditEditor
//         ref={editor}
//         value={content}
//         config={configMemo}
//         tabIndex={1} // tabIndex of textarea
//         onBlur={(newContent) => setContent(newContent)}
//         onChange={(newContent) => {}}
//       />
//     </div>
//   );
// }

// export default editor;
