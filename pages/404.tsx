import Link from "next/link";
import classes from "../styles/error.module.css";
import {MainLayout} from "../components/MainLayout";

export default function ErrorPage(){
  return(
    <MainLayout>
      <h1 className={classes.error}>
        Error 404
      </h1>
      <p>
        Please <Link href={'/'} legacyBehavior><a>go back</a></Link>
      </p>
    </MainLayout>
  )
}