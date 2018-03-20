import React from 'react'
import { Button, Navbar, Nav, NavItem, Grid, Row, Col } from 'react-bootstrap'
import Resource from '../../models/resource'
import Statistic from './Statistic'
import CreateRestaurant from './CreateRestaurant'
import AllRestaurants from './AllRestaurants'
import Login from './Login'
import Cookies from 'js-cookie';
// const ShowRestaurants = Resource('restaurants')


class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            restaurants: [],
            restaurantId: (this.props.match.params.id || null),
            show: false,
            redirect: '',
            clicked: 'login',

        }
        console.log('resturant loaded')
        this._onButtonClick = this._onButtonClick.bind(this);
    }

    _onButtonClick(button) {
        switch (button){
            case "login":
                this.setState({
                    clicked: "login",
                })
                break;
            case "restaurant":
                this.setState({
                    clicked: "restaurant",
                })
                break;
            case "allrestaurants":
                this.setState({
                    clicked: "allrestaurants",
                })
                break;
            case "statistic":
                this.setState({
                    clicked: "statistic"
                })
                break;
        }
    }

    logout() {
        Cookies.remove('AdminUser', { path: '/AdminRestricted' })
        window.location.href = `/AdminRestricted`
    }
    
    componentWillMount() {
        if (Cookies.get('AdminUser') === "admin") {
            this.setState({clicked: "allrestaurants"})
        } else {
            this.setState({ clicked: "login" })
        }
    }
 
    render() {
        let returned = ""
        {if (this.state.clicked === "login") {
            returned = 
            <div>
                <Login login={this.loginAndSetState} />
            </div>
        }}
        {if (this.state.clicked === "allrestaurants") {
            returned = 
            <div>
            <AllRestaurants restaurants={this.state} />
            </div>
        }}
        {if (this.state.clicked === "restaurant") {
            returned = 
            <div>
            <CreateRestaurant newrestaurant={this.state} />
            </div>
        }}
        { if (this.state.clicked === "statistic") {
            returned = 
            <div>
            <Statistic statistic={this.state} />
            </div>
        }}

        if (Cookies.get('AdminUser') !== "admin") {

            return (
                <div>
                    <Navbar style={{ marginBottom: 0, marginRigth: 0, maxWidth: '100%', width: '100%' }}>
                        <Row style={{ marginLeft: 0, marginRigth: 0, maxWidth: '100%', width: '100%' }} className="show-grid">
                            <Col xs={18} lg={1} style={{ }}>
                                <Nav>
                                        <Button bsSize="large" onClick={() => this._onButtonClick("login")}>
                                            Login
                                        </Button>
                                </Nav>
                            </Col>
                        </Row>
                    </Navbar>
                    {returned}
                </div>
            )
        } else {

            return (  
                <div class="main-div-admin">
                    <Navbar style={{ marginBottom: 0, marginRigth: 0, maxWidth: '100%', width: '100%' }}>
                        <Row style={{ marginLeft: 0, marginRigth: 0, maxWidth: '100%', width: '100%' }} className="show-grid">
                        <Col class="text-center center-block" xs={18} lg={3} style={{ }} align="center">
                                <Nav style={{ width: "100%", paddingTop: "3%", paddingBottom: "3%" }}>
                                    <Button style={{ paddingTop: "3%", paddingBottom: "3%"  }}
                                            onClick={() => this._onButtonClick("allrestaurants")}>
                                        <b style={{ fontSize: "1.5em" }}>ALL RESTAURANTS</b>
                                    </Button>
                                </Nav>
                            </Col>
                        <Col xs={18} lg={3} >
                                <Nav style={{ width: "100%", paddingTop: "2%", paddingBottom: "2%" }}>
                                    <Button style={{ paddingTop: "3%", paddingBottom: "3%" }}
                                            onClick={() => this._onButtonClick("statistic")}>
                                        <b style={{ fontSize: "1.5em", height: "25px" }}>STATISTICS</b>
                                    </Button>
                                </Nav>
                            </Col>
                        <Col xs={18} lg={3} style={{ }}>
                                <Nav style={{ width: "100%", paddingTop: "2%", paddingBottom: "2%" }}>
                                    <Button style={{ paddingTop: "3%", paddingBottom: "3%" }}
                                            onClick={() => this._onButtonClick("restaurant")}>
                                        <b style={{ fontSize: "1.5em" }}>NEW RESTAURANTS</b>
                                    </Button>
                                </Nav>
                            </Col>
                        <Col xs={18} lg={3} style={{ }}>
                                <Nav style={{ width: "100%", paddingTop: "2%", paddingBottom: "2%"  }}>
                                    <Button style={{ paddingTop: "3%", paddingBottom: "3%" }}
                                            onClick={this.logout}>
                                        <b style={{fontSize: "1.5em"}}>LOGOUT</b>
                                    </Button>
                                </Nav>
                            </Col>
                        </Row>
                    </Navbar>
                    {returned}
                </div>
            )
        }
    }
}

export default Dashboard