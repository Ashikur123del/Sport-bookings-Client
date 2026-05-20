"use client";

import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { useRouter } from "next/navigation"; // 1. Router ইম্পোর্ট করা হলো
import {
  Button,
  Card,
  Form,
  Input,
  Label,
  TextField,
  FieldError,
  Description
} from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const Register = () => {
  const router = useRouter(); // 2. রাউটার ইনিশিয়ালাইজ করা হলো

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
  
    const { data, error } = await authClient.signUp.email({
        name: user.name,
        email: user.email,
        password: user.password,
        image: user.image, 
    });

    if (error) {
        console.error("Signup Error:", error.message);
        toast.error(`Signup Failed: ${error.message}`); 
    } else {
        console.log("Signup Success:", data);
        toast.success("Account created successfully!");
        
        // 3. রেজিস্টার সফল হলে ১.৫ সেকেন্ড পর হোম পেজে নিয়ে যাবে (যেন টোস্ট মেসেজটি দেখা যায়)
        setTimeout(() => {
          router.push("login");
        }, 1500);
    }
  };

  const signIn = async () => {
     try {
       await authClient.signIn.social({
         provider: "google",
         callbackURL: "/" // 4. গুগলে সাইন-ইন সফল হলেও হোম পেজে রিডাইরেক্ট করবে
       });
     } catch (err) {
       toast.error("Google sign-in failed.");
     }
  };

  return (
    <div className="min-h-[85vh] py-12 flex flex-col items-center justify-center bg-neutral-50/50 dark:bg-neutral-900/30 px-4">
      <div className="text-center mb-6 space-y-1">
        <h2 className="text-3xl font-black text-neutral-900 tracking-tight">Create Your Account</h2>
        <p className="text-xs text-neutral-400">Join us to lock your favorite sports arena instantly</p>
      </div>
      
      {/* প্রিমিয়াম স্মার্ট গ্লাস-কার্ড ডিজাইন */}
      <Card className="p-8 border border-neutral-200/60 shadow-xl bg-white/80 backdrop-blur-md max-w-md w-full rounded-2xl">
        <Form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          
          <TextField isRequired name="name">
            <Label className="text-xs font-bold text-neutral-700">Name</Label>
            <Input placeholder="Enter Your Name" className="mt-1" />
            <FieldError className="text-xs text-red-500 font-medium mt-1" />
          </TextField>

          <TextField isRequired name="image">
            <Label className="text-xs font-bold text-neutral-700">Profile Image URL</Label>
            <Input placeholder="https://example.com/photo.jpg" className="mt-1" />
            <FieldError className="text-xs text-red-500 font-medium mt-1" />
          </TextField>

          <TextField isRequired name="email" type="email">
            <Label className="text-xs font-bold text-neutral-700">Email Address</Label>
            <Input placeholder="john@example.com" className="mt-1" />
            <FieldError className="text-xs text-red-500 font-medium mt-1" />
          </TextField>

          <TextField isRequired minLength={8} name="password" type="password">
            <Label className="text-xs font-bold text-neutral-700">Password</Label>
            <Input placeholder="Enter secure password" className="mt-1" />
            <Description className="text-[10px] text-neutral-400 mt-1 block">Minimum 8 characters required</Description>
            <FieldError className="text-xs text-red-500 font-medium mt-1" />
          </TextField>

          <Button  type="submit" className="bg-emerald-500 w-full hover:bg-emerald-600 text-white font-bold h-12 rounded-xl shadow-sm mt-2 transition-all flex items-center justify-center gap-2">
            <Check /> Create Account
          </Button>
        </Form>

        {/* ডিভাইডার */}
        <div className="relative flex py-4 items-center">
          <div className="flex-grow border-t border-neutral-200/60"></div>
          <span className="flex-shrink mx-4 text-neutral-400 text-[10px] font-bold uppercase tracking-wider">or continue with</span>
          <div className="flex-grow border-t border-neutral-200/60"></div>
        </div>

        {/* সোশ্যাল লগইন */}
        <Button 
          onClick={signIn} 
          variant="bordered" 
          className="w-full h-11 border border-neutral-200 hover:bg-neutral-50 text-neutral-700 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <FcGoogle className="text-lg" /> Sign up with Google
        </Button> 

        {/* লগইন লিংক টগল */}
        <p className="text-center text-xs text-neutral-500 mt-5">
          Already have an account?{" "}
          <Link href="/login" className="text-emerald-600 font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </Card>

      <ToastContainer position="top-right" autoClose={2000} theme="colored" hideProgressBar />
    </div>
  );
};

export default Register;