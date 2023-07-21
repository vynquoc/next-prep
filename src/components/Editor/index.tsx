import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import { less } from "@codemirror/lang-less";
import { html } from "@codemirror/lang-html";

type Props = {
  language?: string;
  onChange?: any;
  code?: string;
  editable?: boolean;
  height?: string;
  minHeight?: string;
  width?: string;
  minWidth?: string;
};

const languages: any = {
  html: html,
  css: less,
  javascript: () => javascript({ jsx: true }),
};

const Editor = ({
  language = "javascript",
  onChange,
  code,
  editable,
  height = "100%",
  minWidth = "400px",
  width,
  minHeight,
}: Props) => {
  const lang = languages[language];
  return (
    <CodeMirror
      value={code}
      theme={vscodeDark}
      extensions={[lang()]}
      style={{ fontSize: 12 }}
      onChange={onChange}
      height={height}
      minWidth={minWidth}
      width={width}
      minHeight={minHeight}
      editable={editable}
    />
  );
};

export default Editor;
