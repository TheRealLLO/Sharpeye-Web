import axios from "axios";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";

const VerifyEmail: React.FC = () => {
  const [isUserVerified, setIsUserVerified] = useState(false);

  const verifyEmail = async () => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const queryToken = params.get("token");
    const response = await axios.get(`/api/verify-email/${queryToken}`);
    if (response.status >= 200) {
      alert("Successfully verified email");
    }
    setIsUserVerified(response.status >= 200 ? true : false);
  };

  useEffect(() => {
    verifyEmail().catch((e) =>
      alert(e?.response?.data?.message ?? "Error Verifying Email")
    );
  }, []);

  return (
    <div>
      <h1 >Verify Email</h1>
      {isUserVerified && (
        <>
          <p >
            Your email was successfully verified
          </p>
          <button onClick={() => void signIn()}>Sign in</button>
        </>
      )}
    </div>
  );
};

export default VerifyEmail;
