import React, {Component} from 'react';
import {Card, Table} from 'react-bootstrap';
import NavigationBar from './NavigationBar';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHandSpock} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
/*import {addHandler} from "../util/ws";*/

export default class MembersList extends Component {

    constructor(props) {
        super(props);
        this.state = {members: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        axios.get("/members")
            .then(response => response.data)
            .then(data => this.setState({members: data}));
    }

    async remove(name) {
        await axios.delete("/members/"+name.replace(" ", "%20"), {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedMembers = [...this.state.members].filter(i => i.name !== name);
            this.setState({members: updatedMembers});
        });
    }

    render() {
        const {members, isLoading} = this.state;
        if (isLoading) {
            return <p>Loading...</p>;
        }

        const memberList = members.map(member => {
            return <tr key={member.name}>
                <td style={{whiteSpace: 'nowrap'}}>{member.name} <FontAwesomeIcon style={{"display": member.handMoveType === "LOWERED" ?
                        "none" : "block", textJustify:"center"}} pull={"right"} size={"lg"} icon={faHandSpock}/></td>
            </tr>
        });

        return (
            <div>
                <Card style={{width: '35rem'}} className="m-auto mt-sm-4 border border-dark bg-dark text-white">
                    <Card.Header><NavigationBar memberName={this.props.memberName}
                                                logout={this.remove} history={this.props.history}
                    /> </Card.Header>
                        <div className={"m-auto mt-lg-2"}><h3>Members</h3></div>
                        <Table bordered hover striped variant="dark" size="md" className="mt-3">
                            <thead className={"text-center"}>
                            <tr>
                                <th width="100%" colSpan={2}>Member Name</th>
                            </tr>
                            </thead>
                            <tbody>
                            {memberList}
                            </tbody>
                        </Table>
                </Card>
            </div>
        );
    }
}