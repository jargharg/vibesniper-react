import React, { Component } from "react"
import { Link } from "react-router-dom"
import Loader from "./Loader"
import { WP_URL } from "./config"

class Posts extends Component {
	constructor(props) {
		super(props)
		this.state = { postsRendered: [] }
	}

	componentWillMount() {
		this.fetchPosts()
	}

	render() {
		return (
			<div>
				<div id="container" className="posts-container">
					{this.renderPosts()}
				</div>
			</div>
		)
	}

	renderPosts() {
		if (this.state.postsRendered.length > 0) {
			return this.state.postsRendered
		} else {
			return <Loader />
		}
	}

	fetchPosts() {
		fetch(`${WP_URL}posts`)
			.then(data => data.json())
			.then(data => this.loadPosts(data))
	}

	decode(str) {
		return str.replace(/&#(\d+);/g, function(match, dec) {
			return String.fromCharCode(dec)
		})
	}

	loadPosts(data) {
		let posts = []
		for (const post of data) {
			const postTitle = this.decode(post.title.rendered)
			const postExcerpt = post.excerpt.rendered
			const date = new Date(post.date)
			const postDate = `${date.getDate()}/${date.getMonth()}`

			posts.push(
				<div className="blog-post" key={post.id}>
					<Link to={`/post/${post.id}`}>
						<span className="blog-post--date">{postDate}</span>
						<h2>{postTitle}</h2>
						<p
							dangerouslySetInnerHTML={{
								__html: postExcerpt
							}}
						/>
					</Link>
				</div>
			)
		}

		this.setState({ postsRendered: posts })
	}
}

export default Posts
