import React, {Component} from 'react';
import '../App.css';

import {Button, Card, Container, Form, FormGroup} from 'react-bootstrap';
import axios from "axios";
/*import {sendMember} from "../util/ws";*/

export default class Home extends Component {

    emptyItem = {
        name: '',
        handMoveType: '',
    };

    onTrigger = (event) => {
        this.props.parentCallback(event.target.name.value);
        event.preventDefault();
    }

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
        item.handMoveType = 'LOWERED';
        await axios.post("/members", item, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }});
        this.onTrigger(event);
        this.props.history.push('/members');
    }

    render() {
        const {item} = this.state;

        return (
            <div>
                <Card style={{width: '18rem'}}
                      className="m-auto mt-lg-5 border border-dark bg-dark text-white text-center ">
                    <Card.Header><h4>Login to the Classroom</h4></Card.Header>
                    <Container>

                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="name" id="name" value={item.name || ''}
                                              onChange={this.handleChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Button className="mt-lg-4" type="submit">Login</Button>{' '}
                            </FormGroup>
                        </Form>
                    </Container>
                </Card>
            </div>
        );
    }
}