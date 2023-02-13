import {useRouter} from "next/router";
import Head from "next/head";
import {MainLayout} from "../../components/MainLayout";

export default function About({title}) {
  const router = useRouter();
  const linkClickHandler = () => {
    router.push('/')
  }
  return(
    <MainLayout title={'About page'}>
      <h1>{title}</h1>
      <button onClick={linkClickHandler}>back to home</button>
      <button onClick={()=> router.push('/posts')}>go to posts inline</button>
    </MainLayout>
  )
}

About.getInitialProps = async () => {
  const response = await fetch(`${process.env.API_URL}/about`)
  const data = await response.json()
  return{
    title: data.title
  }
}