import React, {useState} from "react"
import {Form,Container} from "react-bootstrap"
import Axios from "axios"
import {Redirect} from "react-router-dom"

const New = function () {

    const [inputs, setInputs] = useState({
        title:"",
        content:"",
        status:"DRAFT"
    })

    const [redirect, setRedirect] = useState(false)
    
    const handleSubmit = async event => {
        event.preventDefault()

        const resp = await Axios.post("http://localhost:4000/blogs", inputs)

        if(resp.status === 200){
            setRedirect(true)
        }
    }



    const handleInputChange = async event => {
        event.persist()

        const {name, value} = event.target;

        setInputs(inputs => ({
            ...inputs,
            [name]:value
        }))
        console.log(inputs)

    }

    if(redirect) return (<Redirect to="/blogs"/>)
    
    return (
        <Container className = "my-5">
            <header>
                <h1>New Blog Post</h1>
            </header>

            <hr/>

            <div>
                <Form onSubmit={handleSubmit}>

                    <Form.Group>
                        <Form.Label>Title:</Form.Label>
                        <Form.Control
                        name="title"
                        onChange={handleInputChange}
                        value={inputs.titie}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Content:</Form.Label>
                        <Form.Control
                        as="textarea"
                        name="content"
                        onChange={handleInputChange}
                        value={inputs.content}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Status:</Form.Label>
                        <Form.Control
                        as="select"
                        name="status"
                        onChange={handleInputChange}
                        defaultValue={inputs.status || "DRAFT"}
                        >
                        <option value="DRAFT">draft</option>
                        <option value="PUBLISHED">published</option>
                        </Form.Control>

                    </Form.Group>

                    <Form.Group>
                        <button type="submit" className="btn btn-primary">Create</button>

                    </Form.Group>

                </Form>
            </div>

        </Container>
    )

}

export default New;