"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { TypeOf } from "zod/v3"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"


type FormType = "sign-in" | "sign-up"



const authFromShema =(type:FormType)=>{
  return z.object({
    name:type ==="sign-up" ? z.string().min(3) : z.string(),
    email:z.string().email(),
    password:z.string().min(3),
  })
}
const AuthForm = ({type}:{type:FormType})=>{

  const formSchema = authFromShema(type);
  const form=useForm<z.infer<typeof formSchema>>({
    resolver:zodResolver(formSchema),
    defaultValues:{
      name:"",
      email:"",
      password:"",
    }

  })

  function onSubmit(values:z.infer< typeof formSchema>){
    try{
      if(type === "sign-up"){
        console.log("sign up",values)
      }else{
        console.log("sign in",values)
      }
    }catch( error){
      console.error(error);
      toast.error(`There wads an error :${error}`)
    }
    console.log(values)
  }
   
  const isSignIn = type ==="sign-in"

  return   <div className="card-border lg:min-w-[566px] ">
    <div className="flex flex-col gap-6 card py-14 px-10   ">
      <div className="flex flex-row gap-2 justify-center">
      <Image src="/logo.svg" alt="logo" height={32} width={38}
      />
      <h2 className="text-primary-100">PrepWise</h2>
      </div>
      <h3>Practice Job Interviews with AI </h3>
 
     <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full space-y-6  mt-4 form">
         {!isSignIn && <p> Name</p>}
         <p>Email</p>
         <p>Password</p>
        <Button type="submit" className="btn">{isSignIn ? "Sign in":' create an Account '}</Button>
    </form>
     </Form>

     <p className="text-center"> {isSignIn ? 'No account yet?':'Have an accounr already?'}
      <Link href={!isSignIn ? '/auth/sign-in':'/auth/sign-up'} className="font-bold text-user-primaryu ml-1">{!isSignIn ? "Sign in": 'Sign up'}</Link>
     </p>
        </div>
  </div>
}

export default AuthForm