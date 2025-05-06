import { GoogleLogin } from "@react-oauth/google";

function TestGoogleAuth() {
  return (
    <div>
      <h1>Test Google Auth</h1>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse); // <-- token is here
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      ;
    </div>
  );
}

export default TestGoogleAuth;
