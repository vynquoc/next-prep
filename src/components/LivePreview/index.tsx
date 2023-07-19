import { LiveError, LiveProvider, LivePreview as Preview } from "react-live";

type Props = {
  isReact?: boolean;
  html?: string;
  css?: string;
  js?: string;
  componentName?: string;
};

const LivePreview = ({
  html,
  css,
  js,
  isReact = false,
  componentName,
}: Props) => {
  const reactCode = `
   ${js}
  render( <div id="preview">
  <style>{\` ${css}\`}
  </style>
  <div><${componentName} /></div>
  </div>
) 
  `;
  const jsCode = `
    <html>
        <body>
          <div id="root"></div>
          ${html}
        </body>
        <style>${css}</style>
        <script>
          ${js}
        </script>
    </html>
    `;

  return (
    <>
      {isReact ? (
        <LiveProvider code={reactCode} noInline={true}>
          <LiveError style={{ color: "white" }} />
          <Preview />
        </LiveProvider>
      ) : (
        <iframe
          srcDoc={jsCode}
          sandbox="allow-scripts"
          width="100%"
          height="100%"
          frameBorder="0"
        />
      )}
    </>
  );
};

export default LivePreview;
