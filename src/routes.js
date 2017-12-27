// src/routes.js
import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"

import Title from "./components/Title"
import Posts from "./components/Posts"
import Post from "./components/Post"

const Routes = () => (
    <Router>
        <div>
            <Title />
            <Route exact path="/" component={Posts} />
            <Route path="/post/:id" component={Post} />
        </div>
    </Router>
)

export default Routes
