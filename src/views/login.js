import React from 'react'
import '../css/login.css'
import { Link } from 'react-router-dom'

class AuthenticationPage extends React.Component {
    state = {
        email: "",
        password: "",
        keepLoggedIn: false,
        errorMessage: ""
    }

    componentDidMount() {
        if (localStorage.getItem('credentials_b1')) {
            fetch(`http://localhost:8080/api/connect/${localStorage.getItem('credentials_u7')}/${localStorage.getItem('credentials_p7')}`).then((response) => {
                response.text().then((status) => {
                    if (status == "1") {
                        window.location = '/';
                    }
                })
            })
        }
    }

    logIn(username, password) {
        fetch(`http://localhost:8080/api/connect/${username}/${password}`).then((response) => {
            response.text().then((status) => {
                console.log(status)
                switch (status) {
                    case "0": this.setState({ errorMessage: "Incorrect password!" }); break;
                    case "1": {
                        console.log("Yes");
                        localStorage.setItem("credentials_b1", true);
                        localStorage.setItem("credentials_u7", this.state.email);
                        localStorage.setItem("credentials_p7", this.state.password);
                        window.location = '/'

                        break;
                    };
                    case "2": this.setState({ errorMessage: "This username doesn't exist!" }); break;
                }
            })
        })
    }

    render() {
        return (
            <div class="container">
                <div class="wrapper">
                    <div class="title">
                        <span>Login</span>
                    </div>
                    <form action="#">
                        <span style={{ display: (this.state.errorMessage == "") ? 'none' : 'block' }} className="error-message">{this.state.errorMessage}</span>
                        <div class="row">
                            <input value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} type="text" placeholder="Email Address" required />
                        </div>
                        <div class="row">
                            <input value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} type="password" placeholder="Password" required />
                        </div>
                        <div class="pass"><a href="#">Forgot password?</a></div>
                        <div class="row button">
                            <input onClick={(e) => { e.preventDefault(); this.logIn(this.state.email, this.state.password) }} type="submit" value="Login" />
                        </div>
                        <div class="signup-link">Not a member? <Link to="/signup">Signup now</Link></div>
                    </form>
                </div>
            </div>
        )
    }
}

export default AuthenticationPage