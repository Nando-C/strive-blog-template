import React, { Component } from "react";
import { Container, Image, ListGroup, Card, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import BlogAuthor from "../../components/blog/blog-author";
import PostModal from "../../components/blog/post-modal/index"
// import posts from "../../data/posts.json";
import "./styles.css";
class Blog extends Component {
  state = {
    blog: {},
    loading: true,
    show: false,
  };

  handleClose = () => {
    this.setState({
      ...this.state, 
      show: false
    })
  }
  handleShow = () => {
    this.setState({
      ...this.state, 
      show: true
    })
  }

  fetchBlog = async () => {
    const { id } = this.props.match.params;
  
    try {
      const response = await fetch(`http://localhost:3001/blogPosts/${id}`)
        const post = await response.json()
        console.log(post)
        this.setState({
          blog: post, 
          loading: false
        })
      
    } catch (error) {
      console.log(error)
    }

  }
  componentDidMount = async() => {
    this.fetchBlog()
  }

  render() {
    const { loading, blog } = this.state;
    if (loading) {
      return <div>loading</div>;
    } else {
      return (
        <div className="blog-details-root">
          <Container>
            <div className='mt-5 d-flex justify-content-end'>
              <Button variant="primary" onClick={this.handleShow}>
                Edit Post
              </Button>
            </div>
            <Image className="blog-details-cover" src={blog.cover} fluid />
            <h1 className="blog-details-title">{blog.title}</h1>

            <div className="blog-details-container">
              <div className="blog-details-author">
                <BlogAuthor {...blog.author} />
              </div>
              <div className="blog-details-info">
                <div>{blog.createdAt}</div>
                <div>{`${blog.readTime.value} ${blog.readTime.unit} read`}</div>
              </div>
            </div>

            <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
            
            <div>
              <Button variant="primary" onClick={this.handleShow}>
                Leave Comment
              </Button>
              <PostModal blog={this.state.blog} show={this.state.show} handleShow={this.handleShow} handleClose={this.handleClose} fetchBlog={this.fetchBlog} history={this.props.history}/>
            </div>
            <div>
              {blog.comments
              ? <><h3 className='my-3'>Comments</h3>
              <ListGroup >
                {blog.comments.map(com => 
                  <ListGroup.Item className='border-0'>
                    <Card>
                      <Card.Body>"{com}"</Card.Body>
                    </Card>
                  </ListGroup.Item>)}
              </ListGroup></>
              : <></>
            }
            </div>
          </Container>
        </div>
      );
    }
  }
}

export default withRouter(Blog);
