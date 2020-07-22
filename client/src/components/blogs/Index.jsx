import React, {useEffect, useState} from "react";
import {Container} from "react-bootstrap"
import Axios from "axios"


const Index = function(){

    const [blogs, setBlogs] = useState([]);

    useEffect(()=>{
        (async () => {
            await getBlogs()
        })()
    },[])

    const getBlogs = async () => {
        
        const blogsResp = await Axios.get("http://localhost:4000/blogs");
        if(blogsResp.status === 200) setBlogs(blogsResp.data)        

    }

    return(
     <Container className="my-5">
        <header>
            <h1>Archive</h1>
        </header>
        <hr/>

        <div className="content">
            {blogs && blogs.map((blog,i)=>(
                <div key={i} className="card my-3">
                    <div className="card-header clearfix">
                        <div className="float-left">
                            <h5 className="card-title">
                                {blog.title}
                            </h5>
                            {blog.user ? (
                                <small>~{blog.user.fulltime}</small>
                            ) : null}
                        </div>
                    </div>
                </div>
            ))}
        </div>

     </Container>   
    )


}

export default Index