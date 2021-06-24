import React, { Component } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Container, Form, Button } from "react-bootstrap";
import "./styles.css";
export default class NewBlogPost extends Component {

  constructor(props) {
    super(props)
    this.handleQuillChange = this.handleQuillChange.bind(this)
  }

  state = {
    newPost: {
      category: "",
      title: "",
      cover:"https://via.placeholder.com/600x600?text=Blog+Image",
      readTime: {
        value: 2,
        unit: "minutes"
      },
      author: {
        name: "Fulanito",
        avatar:"https://ui-avatars.com/api/?name=Fulanito+Detal"
      },
      content: "",
    }
  }

  // constructor(props) {
  //   super(props);
  //   this.state = { text: "" };
  //   this.handleChange = this.handleChange.bind(this);
  // }

  handleChange(e) {
    this.setState({
      newPost : {
        ...this.state.newPost,
        [e.target.id] : e.target.value
      }
    });
  }

  handleQuillChange (html) {
    this.setState({
      newPost : {
        ...this.state.newPost,
        content : html
      }
    });
  }

  postNewBlog = async (e) => {
    e.preventDefault() 

    try {
      const response = await fetch('http://localhost:3001/blogPosts/', {
        method: 'POST',
        body: JSON.stringify(this.state.newPost),
        headers: {
          "Content-type": "application/json"
        }
      })
      // const postsArray = await response.json()
      console.log(response)
      
    } catch (error) {
        console.log(error)
    }
  }
  render() {
    return (
      <Container className="new-blog-container">
        <Form className="mt-5" onSubmit={this.postNewBlog}>
          <Form.Group className="mt-3">
            <Form.Label>Title</Form.Label>
            <Form.Control id="title" size="lg" placeholder="Title" value={this.state.newPost.title} onChange={(e) => this.handleChange(e)}/>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Category</Form.Label>
            <Form.Control id="category" size="lg" as="select" value={this.state.newPost.category} onChange={(e) => this.handleChange(e)}>
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
              value={this.state.newPost.content}
              onChange={this.handleQuillChange }
              className="new-blog-content"
            />
          </Form.Group>
          <Form.Group className="d-flex mt-3 justify-content-end">
            <Button type="reset" size="lg" variant="outline-dark">
              Reset
            </Button>
            <Button
              type="submit"
              size="lg"
              variant="dark"
              style={{ marginLeft: "1em" }}
            >
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}
