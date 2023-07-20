import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import CodeMirror from "@uiw/react-codemirror";
import { less } from "@codemirror/lang-less";
import { html } from "@codemirror/lang-html";

type Props = {
  language?: string;
  onChange?: any;
  code?: string;
  editable?: boolean;
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
}: Props) => {
  const lang = languages[language];
  return (
    <CodeMirror
      value={code}
      theme={vscodeDark}
      extensions={[lang()]}
      style={{ fontSize: 12 }}
      onChange={onChange}
      height="100%"
      minWidth="400px"
      editable={editable}
    />
  );
};

export default Editor;
