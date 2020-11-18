import React from 'react';
import { Layout} from 'antd';
import { Navbar, Nav, Form, FormControl, Button, Container } from 'react-bootstrap';
import "../containers/MainPage.css";

const { Content, Footer} = Layout;

class CustomLayout extends React.Component {

    render() {
        return (
            <>
                <Navbar bg="primary" variant="dark" style={{ position: "sticky", top: "0" }}>
                    <Navbar.Brand href="#home">AirNote</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/airnote/main">Home</Nav.Link>
                        <Nav.Link href="/airnote/notes">Notes</Nav.Link>
                        <Nav.Link href="/airnote/upload">Upload</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
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

export default CustomLayout;