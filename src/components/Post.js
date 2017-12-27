import React, { Component } from "react"
import { Link } from "react-router-dom"
import Loader from "./Loader"
import { WP_URL } from "./config"

class Post extends Component {
    constructor({ match }) {
        super()
        this.postID = match.params.id
        this.state = { post: null }
        this.fetchPost()
    }

    render() {
        return <div className="posts-container">{this.postContent()}</div>
    }

    componentWillUnmount() {
        console.log("bye, leaving now")
    }

    postContent() {
        if (this.state.post) {
            return this.renderPost(this.state.post)
        } else {
            return <Loader />
        }
    }

    fetchPost() {
        fetch(`${WP_URL}posts/${this.postID}`)
            .then(data => data.json())
            .then(data => this.setState({ post: data }))
    }

    renderPost(post) {
        const date = new Date(post.date)
        const postDate = `${date.getDate()}/${date.getMonth()}`

        return (
            <div className="blog-post--individual">
                <span className="blog-post--date">{postDate}</span>
                <h2
                    dangerouslySetInnerHTML={{
                        __html: post.title.rendered
                    }}
                />
                <p
                    dangerouslySetInnerHTML={{
                        __html: post.content.rendered
                    }}
                />
                <Link to="/">
                    <div className="return-link">&larr; Go back</div>
                </Link>
            </div>
        )
    }
}

export default Post
