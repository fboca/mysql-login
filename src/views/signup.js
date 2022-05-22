import React from 'react'
import '../css/signup.css'
import { Link } from 'react-router-dom'

class RegistrationPage extends React.Component {
    state = {
        email: "",
        password: "",
        errorMessage: "",
        popupPage: 0,
        profilepic: "profile01.png",
        fullname: "",
        isLoading: false,
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

    signup() {
        //Setting the loading as true, so the loading indicator shows
        this.setState({ isLoading: true });

        //Verifying the data provided for signup
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) {
            if (this.state.password.length >= 8) {

                //Sending the data to the server (if all is ok)
                fetch(`http://localhost:8080/api/register/${this.state.email}/${this.state.password}/${this.state.fullname}/${this.state.profilepic}`).then((response) => {
                    response.text().then((status) => {
                        console.log(status);

                        //Status 0 - the username already exists
                        if (status == "0") {
                            this.setState({
                                password: "", errorMessage: "The username you entered already exists.",
                                popupPage: 0,
                                isLoading: false,
                            })
                        }

                        //Status 1 - mysql error
                        if (status == "1") {
                            this.setState({
                                password: "", errorMessage: "Unexpected error occured. Please try again later.",
                                popupPage: 0,
                                isLoading: false,
                            })

                        }

                        //Status 2 - success
                        if (status == "2") {
                            window.location = '/login';
                        }
                    })
                })

            } else this.setState({ errorMessage: "The password must be at least 8 characters long.", password: "", popupPage: 0 })
        } else this.setState({ errorMessage: "The email address is invalid.", password: "", popupPage: 0 })
    }

    render() {
        console.log(this.state)
        return (
            <div class="container">
                {this.state.popupPage === 0 ? (
                    <div class="wrapper">
                        <div class="title">
                            <span>Signup</span>
                        </div>
                        <form action="#">
                            <span style={{ display: (this.state.errorMessage == "") ? 'none' : 'block' }} className="error-message">{this.state.errorMessage}</span>
                            <div class="row">
                                <input value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} type="text" placeholder="Email Address" required />
                            </div>
                            <div class="row">
                                <input value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} type="password" placeholder="Set a password" required />
                            </div>
                            <div class="pass"><Link to="/login">Already have an account?</Link></div>
                            <div class="row button">
                                <input onClick={(e) => { e.preventDefault(); this.setState({ popupPage: 1, errorMessage: '' }) }} type="submit" value="Signup" />
                            </div>
                        </form>
                    </div>
                ) : (
                    <div class="wrapper">
                        {this.state.isLoading ? (
                            <>
                                <p>Loading...</p>
                            </>
                        ) : (
                            <>
                                <div class="title">
                                    <span>Configure your profile</span>
                                </div>
                                <form action="#">
                                    <span style={{ display: (this.state.errorMessage == "") ? 'none' : 'block' }} className="error-message">{this.state.errorMessage}</span>
                                    <div class="profilerow">
                                        <img src={require(`../images/${this.state.profilepic}`)} className="profile-pic" />
                                    </div>
                                    <div class="row">
                                        <input value={this.state.fullname} onChange={(e) => this.setState({ fullname: e.target.value })} type="text" placeholder="Full Name" required />
                                    </div>
                                    <div class="pass"><Link to="/login">Already have an account?</Link></div>
                                    <div class="row button">
                                        <input onClick={(e) => { e.preventDefault(); this.signup() }} type="submit" value="Signup" />
                                    </div>
                                </form>

                            </>
                        )}
                    </div>
                )}

            </div>
        )
    }
}

export default RegistrationPage