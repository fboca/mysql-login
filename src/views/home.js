import React from 'react'
import app from '../config/firebase'
import '../css/main.css'

class Home extends React.Component {
    state = {
        email: "",
        password: "",
        displayName: "",
    }

    componentDidMount() {
        if (localStorage.getItem('credentials_b1')) {
            fetch(`http://localhost:8080/api/connect/${localStorage.getItem('credentials_u7')}/${localStorage.getItem('credentials_p7')}`).then((response) => {
                response.text().then((status) => {
                    if (status == "1") {

                    } else window.location = '/login';
                })
            })
            this.setState({ displayName: localStorage.getItem('credentials_n7') })
        } else window.location = '/login';
    }

    render() {
        return (
            <div>
                <ul>
                    <li><a href="#home" className="active">Home</a></li>
                </ul>

                <div className="app-container">
                    <div className="welcome-container card-x" style={{ flexDirection: window.innerHeight > 617 ? 'column' : 'row' }}>

                        <div className="card-x-column">
                            <h1>Welcome back, {this.state.displayName}!</h1>
                            <p>This is a dummy home page :)</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home