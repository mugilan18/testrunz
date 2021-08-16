import React from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";

const Google = ({ informParent = (f) => f }) => {
  const responseGoogle = (response) => {
    console.log(process.env.REACT_APP_API);
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/google_login`,
      data: { idToken: response.tokenId },
    })
      .then((response) => {
        console.log("Google Sign-In : ", response);
        console.log("psting")
        //inform parrent component
        informParent(response);
      })
      .catch((error) => {
        console.log("Google Sign-In : ", error);
      });
  };
  return (
    <div className="pb-3">
      <GoogleLogin
        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
        render={(renderProps) => (
          <button
            className="btn btn-danger btn-lg btn-block"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <i className="fab fa-google pr-2"></i> Login with Google
          </button>
        )}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default Google;
