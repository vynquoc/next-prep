import CodeEditor from "@/components/CodeEditor";
import { LiveError, LiveProvider, LivePreview } from "react-live";
import { themes } from "prism-react-renderer";

type Props = {
  isReact?: boolean;
  html?: string;
  css?: string;
  js?: string;
  setHtml?: any;
  setCss?: any;
  setJs?: any;
};
const ReactWorkspace = ({ html, css, js, setCss, setHtml, setJs }: Props) => {
  const compname = "Counter";
  const code = `
   ${js}
  render( <>
  <style>{\`${css}\`}
  </style>
  <div><${compname} /></div>
  </>
) 
  `;
  return (
    <div>
      <LiveProvider code={code} noInline={true}>
        <div style={{ height: 470, overflowY: "scroll" }}>
          <CodeEditor
            isReact
            html={html}
            css={css}
            js={js}
            setHtml={setHtml}
            setCss={setCss}
            setJs={setJs}
          />
        </div>
        <LiveError />
        <LivePreview />
      </LiveProvider>
    </div>
  );
};

export default ReactWorkspace;
