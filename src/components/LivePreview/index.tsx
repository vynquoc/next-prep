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
  hasTabs?: boolean;
};

const tabs = ["Output"];

const LivePreview = ({
  html,
  css,
  js,
  isReact = false,
  style,
  backgroundColor,
  componentName,
  hasTabs = false,
}: Props) => {
  const [currentTab, setCurrentTab] = useState(tabs[0]);

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
        <script src="https://unpkg.com/babel-standalone@6.26.0/babel.min.js"></script>
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
      {hasTabs && (
        <TabBar
          tabs={tabs}
          onTabChange={(tab) => setCurrentTab(tab)}
          currentTab={currentTab}
        />
      )}
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
