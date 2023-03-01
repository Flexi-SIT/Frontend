import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const clientID = "630166332593-b2k4a2l3lq0rr8d1ko70g12qdnjb5i5a.apps.googleusercontent.com"

function Login() {

    const onSuccess = (res) => {
        console.log("LOGIN SUCCESS! Current User: ", res.profileObj);
    }

    const onFailure = (res) => {
        console.log("LOGIN FAILED! res: ", res);
    }


    return (
        <div id="signInButton">
            <GoogleOAuthProvider clientId="630166332593-b2k4a2l3lq0rr8d1ko70g12qdnjb5i5a.apps.googleusercontent.com">
            <GoogleLogin
                clientID={clientID}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
                width='312'
            />
            </GoogleOAuthProvider>
        </div>
    )
}

export default Login;
