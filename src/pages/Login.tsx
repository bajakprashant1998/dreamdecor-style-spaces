import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import logo from "@/assets/logo.webp";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container py-12 flex justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <img src={logo} alt="Dream Decor" className="h-16 mx-auto mb-4" />
            <h1 className="font-display text-2xl font-bold">
              {isSignup ? "Create an Account" : "Welcome Back"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {isSignup ? "Join Dream Decor for exclusive offers" : "Sign in to your account"}
            </p>
          </div>

          <form className="border rounded-lg p-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
            {isSignup && (
              <div><Label>Full Name</Label><Input placeholder="Your name" className="mt-1" /></div>
            )}
            <div><Label>Email</Label><Input type="email" placeholder="Email address" className="mt-1" /></div>
            <div><Label>Password</Label><Input type="password" placeholder="Password" className="mt-1" /></div>
            {isSignup && (
              <div><Label>Phone</Label><Input placeholder="Phone number" className="mt-1" /></div>
            )}
            <Button type="submit" className="w-full rounded-none h-11">
              {isSignup ? "Create Account" : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-sm mt-4">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button onClick={() => setIsSignup(!isSignup)} className="text-primary font-medium hover:underline">
              {isSignup ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
