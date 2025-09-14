import { useState } from "react";
import SignUp from "./signUpPage";
import Login from "./login";

function Auth() {
  const [hasAccount, setHasAccount] = useState(true);

  const handleHasAccount = () => {
    setHasAccount(true);
  };

  const handleNeedsAccount = () => {
    setHasAccount(false);
  };

  return (
    <>
      {hasAccount ? (
        <Login needsAccount={handleNeedsAccount} />
      ) : (
        <SignUp hasAccount={handleHasAccount} />
      )}
    </>
  );
}

export default Auth;
