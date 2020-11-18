import React from 'react';
import { Layout} from 'antd';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import "../containers/MainPage.css";

const { Content, Footer} = Layout;

class CustomLayout extends React.Component {

    render() {
        return (
            <Layout className="layout">
                <Navbar bg="primary" variant="dark" style={{ position: "sticky", top: "0", zIndex:"100"}}>
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
                <Content>
                    <div style={{ background: '#fff', padding: 24, minHeight: 500 }}>
                        {this.props.children}
                    </div>
                </Content>
                <Footer style={{bottom: "0" }}>
                    Ant Design ©2016 Created by Ant UED
                </Footer>
            </Layout>
        );
    }
}

export default CustomLayout;