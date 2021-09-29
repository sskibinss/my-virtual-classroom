import React, {Component} from 'react';
import '../App.css';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import axios from "axios";

export default class NavigationBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nextHandMove: '',
            currentMemberName:this.props.memberName,
            member: {
                name:'',
                handMoveType:''
            }
        }
        this.changeHandMove = this.changeHandMove.bind(this);
    }

    componentDidMount() {
        axios.get("/members/"+this.state.currentMemberName.replace(" ", "%20"))
            .then(response => response.data)
            .then(data => this.setState({member: data}));
        this.setState({nextHandMove: (this.state.member.handMoveType === "RAISED") ? "Raise hand down" : "Raise hand up"});
    }

    makeLogout = (event) => {
        event.preventDefault();
        this.props.logout(this.state.currentMemberName);
        this.props.history.push('/');
    }

    async changeHandMove(){
/*        const {item} = this.state.member;*/
        this.state.member.handMoveType = (this.state.member.handMoveType === "RAISED") ? "LOWERED" : "RAISED";
        this.setState({nextHandMove: (this.state.member.handMoveType === "RAISED") ? "Raise hand down" : "Raise hand up"});
        await axios.put("/members/"+this.state.currentMemberName.replace(" ", "%20"), this.state.member, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        this.props.history.push('/members');
    }

    render() {
        return <Navbar collapseOnSelect bg="dark" variant={"dark"} expand="lg">
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Toggle href="/">Actions</Navbar.Toggle>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <NavDropdown title="Actions" id="collasible-nav-dropdown">
                        <NavDropdown.Item onClick={this.changeHandMove}>{this.state.nextHandMove}</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav>
                    <NavDropdown title={this.state.currentMemberName} id="collasible-nav-dropdown">
                        <NavDropdown.Item onClick={this.makeLogout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>;
    }
}