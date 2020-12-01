import { useState } from "react";

const UseModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  function toggle() {
    setShowSignIn(false);
    setIsShowing(!isShowing);
  }

  function toggleSignIn() {
    setIsShowing(false);
    setShowSignIn(!showSignIn);
  }

  return {
    isShowing,
    showSignIn,
    toggle,
    toggleSignIn,
  };
};

export default UseModal;
