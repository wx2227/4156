import React from 'react';
import { Layout} from 'antd';
import { Navbar, Nav, Form, FormControl, Button, Container } from 'react-bootstrap';
import "../containers/MainPage.css";
import {withRouter} from 'react-router-dom';
const { Footer} = Layout;

class CustomLayout extends React.Component {

    constructor( props ){
        super(props);
        this.state = {
            course: null
        }
    }
  

   handleOnChange = (e) => {
        let value = null;
        if (e && e.target && e.target.value) {
            value = e.target.value
        } else {
            return;
        }

        this.setState((props, state) => ({
            course: value 
        }));
    } 

    handleClick = () => {
        if (this.state.course) {
            window.location.href = "/airnote/notes/" + this.state.course;
        } else {
            alert("Please input valid course number");
        }
    }

    render() {
        return (
            <>
                <Navbar bg="primary" variant="dark" style={{ position: "sticky", top: "0" , zIndex:"100"}}>
                    <Navbar.Brand href="#home">AirNote</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/airnote/main">Home</Nav.Link>
                        <Nav.Link href="/airnote/notes">Notes</Nav.Link>
                        <Nav.Link href="/airnote/upload">Upload</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={this.handleOnChange} />
                        <Button variant="outline-light" onClick={this.handleClick}>Search</Button>
                    </Form>
                </Navbar>
                  <div style={{ top: 20, background: '#fff', padding: 24, minHeight: 500 }}>
                    {this.props.children}
                  </div>
                <Footer style={{bottom: "0" }}>
                    Ant Design ©2016 Created by Ant UED
                </Footer>
            </>
        );
    }
}

export default withRouter(CustomLayout);