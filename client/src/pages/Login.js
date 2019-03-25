import React, { Component } from "react";
import Container from "../components/Container/container";
// import Row from "../components/Row/row";
// import Col from "../components/Col/col";
import API from "../utils/API";
import "./Login.css";
// import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import {Redirect} from 'react-router-dom';



class Login extends Component {

    state = {
        id_token: "",
        redirect: false,
    };

    

    getUserDetails = () => {
        API.getUserDetails(this.state.id_token)
            .then(res =>
                //console.log(res),
                sessionStorage.setItem("userData", res)
            )
    };


    render() {

        if (this.state.redirect || sessionStorage.getItem('userData')) {
            return (<Redirect to={'/home'}/>)
        }

        const responseGoogle = (response) => {
            console.log(response);
            this.setState ({
                id_token: response.tokenObj.id_token,
                redirect: true,
            });
            
            this.getUserDetails();
        }
        
        return (

            <Container>
                <div className="header">
                    <div className="googleSignIn">
                        <GoogleLogin
                            clientId="894965613215-q002ho1pdjsdg42cftph6h9tt66viv3p.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle} />
                    </div>
                    <br></br><br></br>
                    <h1 id="loginPageTitle" className="text-center">Welcome to PodHub!</h1>
                    <h4 id="slogan" className="text-center">Share what you care about!</h4>
                </div>
            </Container>

        )
    }
}

export default Login; 
