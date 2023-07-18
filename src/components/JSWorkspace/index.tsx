import CodeEditor from "@/components/CodeEditor";
import JSPreview from "../JSPreview";

type Props = {
  isReact?: boolean;
  html?: string;
  css?: string;
  js?: string;
  setHtml?: any;
  setCss?: any;
  setJs?: any;
};
const JSWorkspace = ({ html, css, js, setCss, setHtml, setJs }: Props) => {
  return (
    <div>
      <div style={{ height: 470, overflowY: "scroll" }}>
        <CodeEditor
          html={html}
          css={css}
          js={js}
          setHtml={setHtml}
          setCss={setCss}
          setJs={setJs}
        />
      </div>
      <JSPreview html={html} css={css} js={js} />
    </div>
  );
};

export default JSWorkspace;
