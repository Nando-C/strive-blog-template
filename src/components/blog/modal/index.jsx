import React, { Component } from "react";
import { Modal, Button, Form} from "react-bootstrap"

class CommentModal extends Component {
    state = {  
        newPost : {
            comment: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.id] : e.target.value
        })
    }
    postComment = async (e) => {
        e.preventDefault() 

        try {
            const blogId = this.props.blogId
            console.log(blogId)
            console.log(JSON.stringify(this.state))
            const response = await fetch(`http://localhost:3001/blogPosts/${blogId}/comments`, {
                method: 'POST',
                body: JSON.stringify(this.state.newPost),
                headres: {
                    "Content-type" : "application/json"
                }
            })
            if(response.ok) {
                const createdComment =  await response.json()
                console.log(createdComment)
            } else {
                console.log('Unsuccessfull comment post!!')
            }
        } catch (error) {
            console.log(error)
        }


    }
    render() { 
        return (  
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit = {this.postComment}>
                        {/* <Form.Group controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your name" />
                        </Form.Group> */}
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Example textarea</Form.Label>
                            <Form.Control id="comment" as="textarea" rows={3} value={this.state.comment} onChange={(e) => this.handleChange(e)}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.props.handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
 
export default CommentModal;