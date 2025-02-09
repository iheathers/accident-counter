import { useState, useEffect, useRef } from "react";

const MutationObserverCounter = () => {
  const [count, setCount] = useState(0);
  const [draftCount, setDraftCount] = useState(0);

  const [buttonText, setButtonText] = useState("Update Counter");

  const countRef = useRef(null);
  const buttonRef = useRef(null);
  const inputRef = useRef(null)

  useEffect(() => {

    
    const observer = new MutationObserver((mutationsList) => {


      // debugger
      for (let mutation of mutationsList) {
        // if (mutation.type === "childList") {
          console.log("Real DOM updated:", "Parent: ", mutation.target.parentElement);
        // }
      }
    });


    // debugger
    if (countRef.current) {
      observer.observe(countRef.current, { childList: true, characterData: true, subtree: true });
    }
    if (buttonRef.current) {
      observer.observe(buttonRef.current, { childList: true, characterData: true, subtree: true });
    }


    // debugger

    // iWhy Doesn't MutationObserver Work on <input> Value?
// MutationObserver only detects DOM changes (e.g., adding/removing elements, text changes inside an element).
// But the value of an <input> is a property, not an attribute or inner text.
// Since React updates the value as a property, not in the DOM, MutationObserver won't detect it.
    if (inputRef.current) {
        observer.observe(inputRef.current, { childList: true, characterData: true, subtree: true });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="flex flex-col items-center w-2/3 gap-8 p-8 bg-white border-4 shadow-lg border-primary-500">
      <h1>Days Since the Last Accident</h1>
      
      {/* Observed Element */}
      <p ref={countRef} className="text-6xl">{count}</p>

      <div className="flex gap-2">
        <button onClick={() => setCount((count) => count - 1)}>➖ Decrement</button>
        <button onClick={() => setCount(0)}>🔁 Reset</button>
        <button onClick={() => setCount((count) => count + 1)}>➕ Increment</button>
      </div>

      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setCount(draftCount);

            setButtonText("Updated! ✅"); // Change button text to see MutationObserver in action

          }}
        >
          <input
          ref={inputRef}
            type="number"
            value={draftCount}

            onChange={(e) => setDraftCount(e.target.valueAsNumber)}
          />
          
          {/* Observed Element */}
          <button ref={buttonRef} type="submit">{buttonText}</button>
        </form>
      </div>
    </section>
  );
};

export default MutationObserverCounter;
