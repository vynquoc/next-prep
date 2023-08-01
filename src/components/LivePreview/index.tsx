import { CSSProperties, useState } from "react";
import TabBar from "../TabBar";

type Props = {
  isReact?: boolean;
  html?: string;
  css?: string;
  js?: string;
  componentName?: string;
  style?: CSSProperties;
  backgroundColor?: string;
};

const LivePreview = ({
  html,
  css,
  js,
  isReact = false,
  style,
  backgroundColor,
  componentName,
}: Props) => {
  const iframeReact = `
  <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          ${css}
        </style>
        <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
        <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
      </head>
      <body>
        <div id="react-root"></div>
        <script type="text/babel">
          ${js}
          ReactDOM.render(<${componentName} />, document.getElementById('react-root'));
        </script>
      </body>
    </html>
  `;

  const iframeJs = `
    <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          <div id="root"></div>
          ${html}
        </body>
        <script>
          ${js}
        </script>
    </html>
    `;

  return (
    <div style={{ backgroundColor: backgroundColor, ...style }}>
      {isReact ? (
        <iframe
          srcDoc={iframeReact}
          sandbox="allow-scripts"
          width="100%"
          height="300px"
          frameBorder="0"
        />
      ) : (
        <iframe
          srcDoc={iframeJs}
          sandbox="allow-scripts"
          width="100%"
          height="300px"
          frameBorder="0"
        />
      )}
    </div>
  );
};

export default LivePreview;
