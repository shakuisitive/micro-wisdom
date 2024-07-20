import { useEffect } from "react";
import { useRef } from "react";

function Header({ showForm, setShowForm }) {
  let buttonRef = useRef(null);
  useEffect(() => {
    buttonRef.current.blur();
  }, [buttonRef]);
  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" height="68" width="68" alt="Today I Learned Logo" />
        <h1>Today I Learned</h1>
      </div>
      <button
        onClick={() => setShowForm((currentState) => !currentState)}
        className="btn btn-large fact-btn"
        ref={buttonRef}
      >
        {showForm ? "Close" : "Share a fact"}
      </button>
    </header>
  );
}

export default Header;
