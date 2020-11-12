import React from 'react'
import { GoogleLogin } from 'react-google-login';
import googleLogin from '../services/googleLoginService';

class Login extends React.Component {


    render() {

        const responseGoogle = async(response) => {
            let googleResponse  = await googleLogin(response.accessToken)
            console.log(googleResponse);
            console.log(response);
        }

        return (
            <div>
                <GoogleLogin
                    clientId="117590776103-qt4jgq89g0vhbeu72v4vja56s6sti0as.apps.googleusercontent.com"
                    buttonText="LOGIN WITH GOOGLE"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                />

            </div>
        );
    }

}

export default Login;