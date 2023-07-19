export const mockData = {
  id: "5njhk3h4545-erwrwer",
  category: "React Components",
  name: "Tip Calcultor",
  prompt: `You're given a CSS file for a tip calculator, and you need to implement the component using React.

  The Tip calculator should have 3 number inputs in this order, each with an associated label:
  * Bill: The total price of a bill, defaulting to 50.
  * Tip percentage: The percentage that the user is tipping, defaulting to 18.
  * Number of People: The number of people splitting the bill, defaulting to 1.
  
   The second paragraph displays the tip per person, rounded to two decimal places. The tip per person is calculated by dividing the total tip by the number of people splitting the bill. For example, if the total tip was $9.00 and two people are splitting the bill, the second paragraph would read: "Tip Per Person: $4.50".
  
   If any of the values needed to calculate the total tip or the tip person are empty strings, then the resulting numbers should be replaced by the "-" character without a "$". For example, the second paragraph might read "Tip Per Person: -" in this case. For simplicity, you do not need to handle the case where a user types in 0 or a negative number for any of the inputs.
  
  Your component has already been rendered to the DOM inside of a `#root`.`,
  hints: ["", "", ""],
  languageToWrite: "jsx",
  promptCode: {
    css: "",
    js: `
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
       
       `,
  },
  reactConfig: { componentName: "Counter" },
  solution: "",
  difficulty: "medium",
  createdAt: "",
  type: "CODING_FRONTEND",
};
