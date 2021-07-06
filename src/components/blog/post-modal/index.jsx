import React, { Component } from "react";
import { Modal, Button, Form} from "react-bootstrap"
import ReactQuill from "react-quill"

class PostModal extends Component {

    constructor(props) {
        super(props)
        this.handleQuillChange = this.handleQuillChange.bind(this)
      }

    state = {  
        post : this.props.blog
    }

      handleChange(e) {
        this.setState({
          post : {
            ...this.state.post,
            [e.target.id] : e.target.value
          }
        });
      }
    
      handleQuillChange (html) {
        this.setState({
          post : {
            ...this.state.post,
            content : html
          }
        });
      }

      updateBlog = async (e) => {
        e.preventDefault()

        try {
            const blogId = this.props.blog._id
            const response = await fetch(`http://localhost:3001/blogPosts/${blogId}`, {
                method: 'PUT',
                body: JSON.stringify(this.state.post),
                headers: { "Content-type" : "application/json" }
            })
            if(response.ok) {
                const modifiedPost = await response.json()
                console.log(modifiedPost);
                this.props.handleClose()
                await this.props.fetchBlog()
            }
        } catch (error) {
            console.log(error)
        }
      }
   
      deletePost = async () => {
          try {
            const blogId = this.props.blog._id
            const response = await fetch(`http://localhost:3001/blogPosts/${blogId}`, {
                method: 'DELETE',
            })
            if(response.ok) {
                console.log(`Sucessfully deleted post with ID: ${blogId}`)
                console.log(this.props)
                this.props.handleClose()
                this.props.history.push("/")
            }
          } catch (error) {
              console.log(error)
          }
      }

    render() { 
        return (  
            <Modal size="lg" show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form onSubmit={this.updateBlog}>
          <Form.Group className="mt-3">
            <Form.Label>Title</Form.Label>
            <Form.Control id="title" size="lg" placeholder="Title" value={this.state.post.title} onChange={(e) => this.handleChange(e)}/>
          </Form.Group>
          {/* <Form.Group className="mt-3">
            <Form.Label>Author</Form.Label>
            <Form.Control id="author.name" size="lg" placeholder="Author name" value={this.state.post.author.name} onChange={(e) => this.handleChange(e)}/>
          </Form.Group> */}
          <Form.Group className="mt-3">
            <Form.Label>Category</Form.Label>
            <Form.Control id="category" size="lg" as="select" value={this.state.post.category} onChange={(e) => this.handleChange(e)}>
              <option>Select category</option>
              <option>Category1</option>
              <option>Category2</option>
              <option>Category3</option>
              <option>Category4</option>
              <option>Category5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group  className="mt-3">
            <Form.Label>Blog Content</Form.Label>
            <ReactQuill
              id="content"
              value={this.state.post.content}
              onChange={this.handleQuillChange }
              className="new-blog-content"
            />
          </Form.Group>
          <Form.Group className="d-flex mt-3 justify-content-end">
            <Button type="reset" size="lg" variant="outline-danger" onClick={this.deletePost}>
              Delete
            </Button>
            <Button
              type="submit"
              size="lg"
              variant="dark"
              style={{ marginLeft: "1em" }}
            >
              Update
            </Button>
          </Form.Group>
        </Form>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleClose}>
                        Close
                    </Button>
                </Modal.Footer> */}
            </Modal>
        );
    }
}
 
export default PostModal;