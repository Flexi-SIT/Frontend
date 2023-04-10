import { GoogleLogout } from "react-google-login"

const clientID = "630166332593-b2k4a2l3lq0rr8d1ko70g12qdnjb5i5a.apps.googleusercontent.com"

function Logout () {

    const onSuccess = () => {
        console.log("LOG OUT SUCCESSFULLY!!")
    }

    return (
        <div className="signOutButton">
            <GoogleLogout 
                clientId={clientID}
                buttonText='Logout'
                onLogoutSuccess={onSuccess}
                width='312'
            />
        </div>
    )
}

export default Logout;
