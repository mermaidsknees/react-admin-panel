import React from 'react'
import PostItem from './PostItem'

class PostList extends React.Component{ 
    constructor(){
        super()
        this.state={
            posts:[]
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/posts').then((data) => {
            return data.json()
        }).then((result)=>{
            console.log(result)
            this.setState({posts:result})
        })
    }


    render(){
        return(
            <div>
                <h1>Post List:</h1>
                {
                    this.state.posts.map((post,index) => {
                        return(
                            <PostItem title={post.title} body={post.body} key={index}/>
                        )
                    })
                }
            </div>
        )
    }
}


export default PostList