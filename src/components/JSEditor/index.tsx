import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import CodeMirror from "@uiw/react-codemirror";
import { sass } from "@codemirror/lang-sass";
import { html as HTML } from "@codemirror/lang-html";

type Props = {
  currentLang: string;
  css?: string;
  js?: string;
  html?: string;
  setHtml: any;
  setCss?: any;
  setJs?: any;
};

const JSEditor = ({
  currentLang,
  html,
  css,
  js,
  setCss,
  setJs,
  setHtml,
}: Props) => {
  return (
    <div>
      {currentLang === "JAVASCRIPT" ? (
        <CodeMirror
          value={js}
          theme={vscodeDark}
          extensions={[javascript({ jsx: true })]}
          style={{ fontSize: 14 }}
          onChange={setJs}
          height="470px"
          maxHeight="470px"
        />
      ) : currentLang === "CSS" ? (
        <CodeMirror
          value={css}
          theme={vscodeDark}
          extensions={[sass()]}
          style={{ fontSize: 14 }}
          onChange={setCss}
          height="470px"
          maxHeight="470px"
        />
      ) : (
        <CodeMirror
          value={html}
          theme={vscodeDark}
          extensions={[HTML()]}
          style={{ fontSize: 14 }}
          onChange={setHtml}
          height="470px"
          maxHeight="470px"
        />
      )}
    </div>
  );
};

export default JSEditor;
