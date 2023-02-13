import {MainLayout} from "../components/MainLayout";
import {useEffect, useState} from "react";
import Link from "next/link";
import {MyPost} from "../interfaces/posts";
import {NextPageContext} from "next";
import nextPageConfig from "next/dist/build/babel/plugins/next-page-config";

interface PostsPageProps{
  posts: MyPost[]
}

export default function Posts({posts: serverPosts}: PostsPageProps) {
  const [posts, setPosts] = useState(serverPosts)

  useEffect(()=> {
    async function load(){
      const response = await fetch(`http://localhost:4200/posts`)
      const json = await response.json()
      setPosts(json)
    }

    if (!serverPosts){
      load()
    }
  }, [])

  if(!posts){
    return <MainLayout>
      <p>Loading...</p>
    </MainLayout>
  }

  return(
    <MainLayout title={'posts page'}>
      <h1>Posts page</h1>
      <pre>
        {posts.map(post => (
          <li key={post.id}>
            <Link href={`/post/[id]`} as={`/post/${encodeURIComponent(post.id)}`}>{post.title}</Link>
          </li>
        ))}
      </pre>
    </MainLayout>
  )
}

Posts.getInitialProps = async ({req}: NextPageContext) => {
  if(!req){
    return {posts: null}
  }
  const response = await fetch(`${process.env.API_URL}/posts`)
  const posts: MyPost[] = await response.json()

  return{
    posts
  }
}

//аналогічне використання з getServerSideProps

// export async function getServerSideProps({query, req}) {
//   const response = await fetch('http://localhost:4200/posts')
//   const post = await response.json()
//
//   return{props: {post}}
// }