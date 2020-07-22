import React from "react"
import { Route, Switch} from "react-router-dom"

import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./sessions/Login";

import Blogs from "./blogs/Index"
import NewBlog from "./blogs/New"

function Routes ({setUser}){
    return(
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/about" component={About}/>
            <Route exact path="/login" render={
                renderProps => <Login
                {...renderProps}
                setUser={setUser}
                />
            }/>
            <Route exact path="/blogs" component={Blogs}/>
            <Route exact path="/blogs/new" component={NewBlog}/>
         </Switch>   
    )
}

export default Routes



