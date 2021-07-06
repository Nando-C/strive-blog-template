import React, { Component } from "react";
import { createRef } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Container, Form, Button } from "react-bootstrap";
import "./styles.css";
export default class NewBlogPost extends Component {

    // constructor(props) {
  //   super(props);
  //   this.state = { text: "" };
  //   this.handleChange = this.handleChange.bind(this);
  // }

  constructor(props) {
    super(props)
    this.handleQuillChange = this.handleQuillChange.bind(this)
  }

  state = {
    newPost: {
      category: "",
      title: "",
      cover:"",
      readTime: {
        value: 2,
        unit: "minutes"
      },
      author: {
        name: "Jim Morrisson",
        avatar:"https://res.cloudinary.com/dldkxppwm/image/upload/v1625083348/authors/i9njqmmskahkoo521mox.png"
      },
      content: "",
    },
    coverFile: ""
  }

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

  fileInputRef = createRef()

  handleFile = () => {
    this.fileInputRef.current.click()
  }

  postNewBlog = async (e) => {
    e.preventDefault() 

    try {
      const newCover = new FormData()
      newCover.append('cover', this.state.coverFile)

      const response = await fetch('http://localhost:3001/blogPosts/', {
        method: 'POST',
        body: JSON.stringify(this.state.newPost),
        headers: {
          "Content-type": "application/json"
        }
      })
      const post= await response.json()
      console.log(post._id)

      // this.state.coverFile && (
      //   await fetch(`http://localhost:3001/blogPosts/${post._id}/uploadCover`, {
      //     method: 'POST',
      //     body: newCover,
      //   })
      // )
      this.props.history.push("/")
      
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
              value={this.state.newPost.content}
              onChange={this.handleQuillChange }
              className="new-blog-content"
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Control
              type="file"
              hidden
              ref={this.fileInputRef}
              onChange={e => this.setState({ coverFile: e.currentTarget.files[0] })}
            />
            <Button variant="dark" className="mr-4" onClick={this.handleFile}>
              Upload Cover
            </Button>
            <Button variant="outline-dark" 
            onClick={() => this.setState({ coverFile: "" })}
            >
              Reset Cover
            </Button>
            <img
              src={
                this.state.coverFile
                  ? URL.createObjectURL(this.state.coverFile)
                  : this.state.newPost.cover || "https://via.placeholder.com/600x600?text=Blog+Image"
              }
              height="200px"
              alt="cover"
              className="d-block mt-4"
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
