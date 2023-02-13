import Link from "next/link";
import {useEffect, useState} from "react";
import {MainLayout} from "../../components/MainLayout";
import {useRouter} from "next/router";
import {NextPageContext} from "next";
import {MyPost} from "../../interfaces/posts";

interface PostPageProps{
  post: MyPost
}

export default function Post({post: serverPost}){
  const [post, setPost] = useState(serverPost)
  const router = useRouter()

  useEffect(()=> {
    async function load () {
      const response = await fetch(`${process.env.API_URL}/posts/${router.query.id}`)
      const data = await response.json()
      setPost(data)
    }

    if(!serverPost){
      load()
    }
  }, [])

  if(!post){
    return <MainLayout>
      <p>Loading...</p>
    </MainLayout>
  }

  return(
    <>
      <h1>{post.title}</h1>
      <hr/>
      <p>{post.body}</p>
      <Link href={'/posts'}>Back to all posts</Link>
    </>
  )
}

interface PostNextPageContext extends NextPageContext{
  query: {
    id: string
  }
}

Post.getInitialProps = async ({query, req}: PostNextPageContext) => {
  if(!req){
    return {post: null}
  }
  const response = await fetch(`http://localhost:4200/posts/${query.id}`)
  const post: MyPost[] = await response.json()

  return{post}
}