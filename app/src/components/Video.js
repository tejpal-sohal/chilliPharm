import React, { Component } from 'react';
import '../css/video.css';
import logo from '../img/chilli.png';

class Video extends Component {
    state = {
        appStatus: false,
        dummyData: [],
        search: '',

    }

    componentDidMount() {
        fetch("/data.json")
            .then((data) => {
                return data.json()
            })
            .then((data) => {
                this.setState({
                    dummyData: data
                })
            })
    }

    toggle() {
        if (this.state.dummyData.length === 0) {
            this.setState({ hide: !this.state.hide });
        }
        console.log(this.state.dummyData.length)
    }

    componentDidUpdate() {
        this.checkStatus();

    }

    checkOnlineUpdate() {
        if (this.state.appStatus === true) {
            this.setState({
                dummyData: this.state.dummyData.filter(item => item.reviewed === false)
            })
        }
    }

    searchItems(e) {
        this.setState({
            search: e.target.value
        })
    }

    handleLogout(e) {
        e.preventDefault()
        window.location.href = "/"
    }

    checkStatus() {
        setInterval(() => {
            this.setState({
                appStatus: navigator.onLine
            })
            this.checkOnlineUpdate()
        }, 5000)
    }


    handleReview(id) {
        let newState = this.state.dummyData;
        newState[id].reviewed = true
        this.setState({
            dummyData: newState
        })
    }

    render() {
        let filteredItems = this.state.dummyData.filter((items) => {
            return items.id.indexOf(this.state.search) !== -1
        })
        var date = new Date();
        var year = date.getFullYear();
        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <img src={logo} style={{ width: '50px', marginRight: '2%' }} />
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                        <ul className="navbar-nav mr-auto">
                            <form className="form-inline my-2 my-lg-0">
                                <input className="form-control mr-sm-2" onChange={this.searchItems.bind(this)} type="text" placeholder="Search Videos" aria-label="Search" />

                            </form>

                        </ul>

                        <button className="btn btn-outline-danger my-2 my-sm-0" type="submit" onClick={this.handleLogout.bind(this)}>Logout</button>

                    </div>
                </nav>
                <main role="main">
                    <div className="jumbotron">
                        <div className="container">
                            <h1 className="display-3">ChilliPharm Video Assessment</h1>
                            <p>You Are Currently</p>
                            {this.state.appStatus ?
                                <div className="alert alert-success" role="alert">
                                    Online
                                     </div>
                                :
                                <div className="alert alert-danger" role="alert">
                                    <strong>Offline</strong><p>All Reviewed videos will be processed once online</p>
                                </div>
                            }
                        </div>
                    </div>

                    <div className="container">
                        {

                            <div className="row">
                                {
                                    filteredItems.length !== 0 ? filteredItems.map((data, i) => {
                                        return (
                                            <div key={i} className="col-md-4">
                                                <h2>{data.id}</h2>
                                                <img src={data.url} alt="image" className="img-thumbnail"></img>
                                                <h5>QC Report Details</h5>
                                                <input className="form-control mr-sm-2 mb-2 mt-2" type="text" placeholder="x" aria-label="x" />
                                                <input className="form-control mr-sm-2 mb-2" type="text" placeholder="y" aria-label="y" />
                                                <input className="form-control mr-sm-2 mb-2" type="text" placeholder="z" aria-label="z" />
                                                <p><strong>Reviewed:</strong> {data.reviewed ? "Complete" : "Incomplete"}</p>
                                                <p>{data.reviewed ? "🌶 Pending Sync..." : ""}</p>
                                                {data.reviewed ? ("") : (<p><button className="btn btn btn-primary" onClick={() => this.handleReview(i)} role="button">Approve</button></p>) }
                                              
                                            </div>
                                        )

                                    }) : (<div className={this.state.hide ? "d-none" : ".d-block"} >
                                        <div className="alert alert-success">
                                            <strong>All Videos Reviewed</strong>  Everything has been Synced.
                               </div>
                                    </div>)
                                }
                            </div>
                        }
                        <hr />

                    </div>

                </main>
                <footer className="container">
                    <p>ChilliPharm System&copy; {year}</p>
                </footer>
            </div>

        )
    }
}


export default Video;

