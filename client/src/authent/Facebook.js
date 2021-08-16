import React from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import axios from "axios";

const Facebook = ({ informParent = (f) => f }) => {
  const responseFacebook = (response) => {
    console.log(response);
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/facebook_login`,
      data: { userID: response.userID, accessToken: response.accessToken },
    })
      .then((response) => {
        console.log("Facebook Sign-In : ", response);
        //inform parrent component
        informParent(response);
      })
      .catch((error) => {
        console.log("Facebook Sign-In : ", error);
      });
  };
  return (
    <div className="pb-3">
      <FacebookLogin
        appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
        autoLoad={false}
        callback={responseFacebook}
        render={(renderProps) => (
          <button
            className="btn btn-info btn-lg btn-block"
            onClick={renderProps.onClick}
          >
            <i className="fab fa-facebook pr-2"></i> Login with Facebook
          </button>
        )}
      />
    </div>
  );
};

export default Facebook;
