"use client";
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Card,
  Description,
  Form,
  Input,
  Label,
  TextField,
  FieldError
} from "@heroui/react";
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

import { toast } from "react-toastify";

const Login = () => {

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userInfo = Object.fromEntries(formData.entries());
    
    const { data, error } = await authClient.signIn.email({
        email: userInfo.email,
        password: userInfo.password,
    });

    if (error) {
        console.error("Signup Error:", error.message);
        toast.error(error.message); 
    } if(data){
      toast("Success Data")
      redirect("/")
    }
  };

     const signIn = async () => {
     await authClient.signIn.social({
      provider: "google",
    });
  }

  return (
    <div className="max-w-7xl mx-auto py-10 flex flex-col items-center">
      <h2 className="text-3xl my-5 font-bold text-center italic">Login Accound</h2>
      
      <Card className="p-8 border border-cyan-400 shadow-xl bg-white/50 backdrop-blur-md">
        <Form className="flex w-96 flex-col gap-5" onSubmit={handleSubmit}>
          
          <TextField isRequired name="email" type="email">
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>

          <TextField isRequired minLength={8} name="password" type="password">
            <Label>Password</Label>
            <Input placeholder="Enter your password" />
            <Description>Minimum 8 characters required</Description>
            <FieldError />
          </TextField>

          <div className="flex gap-3 mt-2">
            <Button type="submit" className="bg-cyan-500 text-white font-bold flex-1 w-full rounded-none">
              <Check /> Login
            </Button>
          </div>
        </Form>
          <Button onClick={signIn} variant="outline" className="w-full  rounded-none"><FcGoogle /> Sing in with Google</Button> 
      </Card>
    </div>
  );
};

export default Login;