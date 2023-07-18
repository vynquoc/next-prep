import React, { useState } from "react";
import ReactWorkspace from "../ReactWorkspace";
import JSWorkspace from "../JSWorkspace";

type Props = {
  isReact?: boolean;
};

const CodeWorkspace = ({ isReact }: Props) => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState(`
  function Counter() {
     const [count, setCount] =
       React.useState(0)
     return (
       
       <div>
      
         <h3 className="h3" style={{
           background: 'darkslateblue',
           padding: 8,
           borderRadius: 4
         }}>
           Count: {count} 🧮
         </h3>
         <button
           onClick={() =>
             setCount(c => c + 1)
           }>
           Increment
         </button>
       </div>
     
     )
   }
 
 `);

  return (
    <div>
      {isReact ? (
        <ReactWorkspace
          html={html}
          css={css}
          js={js}
          setCss={setCss}
          setHtml={setHtml}
          setJs={setJs}
        />
      ) : (
        <JSWorkspace
          html={html}
          css={css}
          js={js}
          setCss={setCss}
          setHtml={setHtml}
          setJs={setJs}
        />
      )}
    </div>
  );
};

export default CodeWorkspace;
