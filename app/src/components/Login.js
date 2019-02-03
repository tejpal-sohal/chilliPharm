import React, { Component } from 'react';
import '../css/login.css';
import logo from '../img/chilli.png';

const centerLogo = {
    position: 'absolute',
    width: '500px',
    left: '50%',
    transform: 'translate(-50%,20%)',
    textAlign: 'center'
}


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputUserName: "",
            inputPassword: "",
            hide: true

        }
    }

    onSubmit(e) {
        e.preventDefault()
        if (this.state.inputUserName === "admin" && this.state.inputPassword === "admin") {
            console.log('userLogIN')
            // history.push('/dash')
            // this.props.isAuthed
            // console.log(this.props.isAuthed)
            window.location.href = "/dash"
        } else {
            this.toggle()
        }
    }

    toggle() {
        this.setState({ hide: !this.state.hide });
        setTimeout(()=>{
            this.setState({ hide: !this.state.hide });
        },2000)
    }

    render() {
        var date = new Date();
        var year = date.getFullYear();
        return (
            <div style={centerLogo}>
                <form className="form-signin">
                    <img className="mb-4" src={logo} alt="" style={{ width: '30%' }} />
                    <label htmlFor="text" className="sr-only">User Name</label>
                    <input type="text" id="inputUserName" className="form-control" placeholder="User Name" required autoFocus onChange={(e) => { this.setState({ inputUserName: e.target.value }) }} />
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" required onChange={(e) => { this.setState({ inputPassword: e.target.value }) }} />
                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me" /> Remember me</label>
                    </div>
                    <div className={this.state.hide ? "d-none" : ".d-block"} >
                        <div className="alert alert-danger">
                            <strong><span>🤪</span> Sorry </strong> User not found.
           </div>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" onClick={this.onSubmit.bind(this)} type="submit">Login</button>
                    <p className="mt-5 mb-3 text-muted">ChilliPharm System&copy; {year}</p>
                </form>
            </div>
        )
    }
}

export default Login;