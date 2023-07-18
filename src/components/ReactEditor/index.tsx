import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import CodeMirror from "@uiw/react-codemirror";
import { sass } from "@codemirror/lang-sass";

type Props = {
  currentLang: string;
  css?: string;
  js?: string;
  setCss?: any;
  setJs?: any;
};

const ReactEditor = ({ currentLang, css, js, setCss, setJs }: Props) => {
  return (
    <div>
      {currentLang === "JSX" ? (
        <CodeMirror
          value={js}
          theme={vscodeDark}
          extensions={[javascript({ jsx: true })]}
          style={{ fontSize: 14 }}
          onChange={setJs}
          height="470px"
          maxHeight="470px"
        />
      ) : (
        <CodeMirror
          value={css}
          theme={vscodeDark}
          extensions={[sass()]}
          style={{ fontSize: 14 }}
          onChange={setCss}
          height="470px"
          maxHeight="470px"
        />
      )}
    </div>
  );
};

export default ReactEditor;
