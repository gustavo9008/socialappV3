import React, { useRef } from "react";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const EditorDraft = (props) => {
  /**
   * @type {React.MutableRefObject<SunEditor>} get type definitions for editor
   */
  const editor = useRef();

  // The sunEditor parameter will be set to the core suneditor instance when this function is called
  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };

  return (
    <div>
      <p> My Other Contents </p>
      <SunEditor
        height="100%"
        setAllPlugins={false}
        getSunEditorInstance={getSunEditorInstance}
        placeholder="Please type here..."
      />
    </div>
  );
};
export default EditorDraft;
