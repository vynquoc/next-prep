type Props = {
  html?: string;
  css?: string;
  js?: string;
};

const JSPreview = ({ html, css, js }: Props) => {
  const srcDocs = `
    <html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}</script>
    </html>
    `;
  return (
    <div>
      <iframe
        srcDoc={srcDocs}
        sandbox="allow-scripts"
        width="100%"
        height="100%"
        frameBorder="0"
      />
    </div>
  );
};

export default JSPreview;
