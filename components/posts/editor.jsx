import React, { Component } from "react";
import { EditorState } from "draft-js";
import Editor from "@stfy/react-editor.js";
import dynamic from "next/dynamic";
import "draft-js/dist/Draft.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

export default function MyEditor(props) {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const editor = React.useRef(null);
  function focusEditor() {
    editor.current.focus();
  }
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  return (
    <div
      style={{
        color: "white",
        border: "1px solid whie",
        minHeight: "6em",
        cursor: "text",
      }}
    >
      <Editor
        editorState={editorState}
        toolbarClassName="toolbar-class"
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        ref={editor}
        onEditorStateChange={onEditorStateChange}
        placeholder="Write something!"
        toolbar={{
          options: [
            "inline",
            "blockType",
            "fontSize",
            "list",
            "textAlign",
            "link",
            "embedded",
            "emoji",
            "image",
          ],
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
        }}
      />
    </div>
  );
}
