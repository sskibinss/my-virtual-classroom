import React from 'react';
import ee from 'event-emitter'
import ToastContainer from "react-bootstrap/cjs/ToastContainer";
import {Toast} from "react-bootstrap";

const emitter = new ee();

export const notify = (name, inout, caseType) => {
    console.log("NOTIFY:" ,name, inout, caseType)
    emitter.emit('notification', name, inout, caseType);
}

class NotificationComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            open: false,
            inout: '',
            caseType: ''
        }
        this.timeout = null;
        emitter.on('notification', (name, inout, caseType) => {
            this.onShow(name, inout, caseType)
        })
    }

    onShow = (name, inout, caseType) => {
        if(this.timeout) {
            clearTimeout(this.timeout)
            this.setState({
                open: false,
                name: '',
                inout: '',
                caseType: ''
            }, () => {
                this.timeout = setTimeout(() => {
                    this.showNotification(name, inout, caseType);
                }, 500)
            })
        } else {
            this.showNotification(name, inout, caseType)
        }
    }
    showNotification = (name, inout, caseType) => {
        this.setState({
            open: true,
            name: name,
            inout: inout,
            caseType: caseType
        }, () => {
            this.timeout = setTimeout(() => {
                this.setState({
                    open: false,
                    name: '',
                    inout: '',
                    caseType: ''
                });
            }, 3000)
        });
    }
    render() {
        const titleMessage = () => {
            if (this.state.caseType === 'case1') {
                if (this.state.inout === 'login') {
                    return <Toast.Body> {this.state.name} has joined the room 🥳</Toast.Body>
                } else if (this.state.inout === 'logout') {
                    return <Toast.Body> {this.state.name} has left 👋</Toast.Body>
                }
            } else if (this.state.caseType === 'case2') {
                if (this.state.inout === 'raised_hand_up') {
                    return <Toast.Body> {this.state.name} has raised hand up 👋</Toast.Body>
                } else if (this.state.inout === 'raised_hand_down') {
                    return <Toast.Body> {this.state.name} has raised hand down</Toast.Body>
                }
            }
        }
        const handleClose = (event, reason) => {
            if (reason === 'clickaway') {
                return;
            }
            this.setState({open: false})
            clearTimeout(this.timeout)
        }

        return (
/*            <Snackbar open={this.state.open} autoHideDuration={1000} onClose={handleClose}>
                {titleMessage()}
            </Snackbar>*/
        <ToastContainer open={this.state.open} autoHideDuration={1000} onClose={handleClose}
                        position="top-end" className="p-3">
            <Toast>
                <Toast.Header>
                    <img src="%PUBLIC_URL%/classroom.png" className="rounded me-2" alt="" />
                    <strong className="me-auto">Notification</strong>
                </Toast.Header>
                {titleMessage()}
            </Toast>
        </ToastContainer>
        )
    }
}
export default NotificationComponent