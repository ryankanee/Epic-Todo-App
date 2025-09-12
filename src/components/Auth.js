import { useState } from "react";
import SignUp from "./signUpPage";
import Login from "./login";

function Auth({ onLogin }) {
  const [hasAccount, setHasAccount] = useState(true);

  const handleHasAccount = () => {
    setHasAccount(true);
  };

  const handleNeedsAccount = () => {
    setHasAccount(false);
  };

  const handleLogIn = (user) => {
    onLogin(user);
  };

  return (
    <>
      {hasAccount ? (
        <Login needsAccount={handleNeedsAccount} Login={handleLogIn} />
      ) : (
        <SignUp hasAccount={handleHasAccount} Login={handleLogIn} />
      )}
    </>
  );
}

export default Auth;
