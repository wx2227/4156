import React from 'react';
import { Form, Input, InputNumber, Button } from 'antd';
import axios from 'axios'

const FormItem = Form.Item;

class CustomForm extends React.Component {
    handelFormSubmit = (values, requestType, noteID) => {
        const file_name = values['name'];
        const file_url = values['url']
        const up_votes = 0
        const down_votes = 0;

        console.log(values);

        switch ( requestType ) {
            case 'post':
                return axios.post('http://127.0.0.1:8000/api/note/', {
                    file_name: file_name,
                    file_url: file_url,
                    up_votes: up_votes,
                    down_votes: down_votes
                })
                .then(res => console.log(res))
                .catch(err => console.error(err))
            case 'put':
                console.log(noteID);
                return axios.put(`http://127.0.0.1:8000/api/note/${noteID}/`, {
                    file_name: file_name,
                    file_url: file_url
                })
                .then(res => console.log(res))
                .catch(err => console.error(err))
        }
    }

    render() {
        return (
            <div>
                <Form onFinish={values => this.handelFormSubmit(
                    values,
                    this.props.requestType,
                    this.props.noteID
                )}>
                    <FormItem label="name" name="name" >
                        <Input placeholder="name of file" />
                    </FormItem>
                    <FormItem label="url" name="url">
                        <Input placeholder="url of file" />
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default CustomForm