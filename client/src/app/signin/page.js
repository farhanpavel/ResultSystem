"use client";
import React, { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle,
  Router,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { url } from "@/components/Url/page";
import Cookies from "js-cookie";
export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const router = useRouter();
  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${url}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      console.log(data);
      Cookies.set("AccessToken", data.token.accessToken);
      Cookies.set("RefreshToken", data.token.refreshToken);
      Cookies.set("role", data.role);

      if (data.role === "student") {
        router.push("/userdashboard/overview");
      } else if (data.role === "admin") {
        router.push("/admindashboard/entry");
      } else if (data.role == "teacher") {
        router.push("/teacherdashboard/entry");
      }

      alert("Login successful!");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("Sign in with Google");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Sign In Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-[#f8f7fe] to-[#f0eeff] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#7657ff]/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#7657ff]/10 rounded-full translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-[#7657ff]/20 rounded-full"></div>
        <div className="absolute bottom-1/3 left-1/4 w-16 h-16 bg-[#7657ff]/15 rounded-full"></div>

        <div
          className={`w-full max-w-md relative z-10 transition-all duration-700 ${
            animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="mb-8 flex justify-center">
            <img
              src="/images/Group.png"
              alt="Logo"
              className="h-14 transition-transform hover:scale-105"
            />
          </div>

          <Card className="border-[#7657ff]/20 shadow-xl backdrop-blur-sm bg-white/90 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#7657ff] to-[#322372]"></div>

            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-[#322372] to-[#7657ff] bg-clip-text text-transparent">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-[#7657ff]/70">
                We&apos;re excited to see you again
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5 pt-4">
              {/* Google Sign In Button */}
              <Button
                variant="outline"
                className="w-full border-[#7657ff]/30 hover:bg-[#7657ff]/5 hover:border-[#7657ff]/50 transition-all duration-300 group relative overflow-hidden"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                <div className="absolute inset-0 w-0 bg-gradient-to-r from-[#7657ff]/10 to-[#7657ff]/20 transition-all duration-300 group-hover:w-full"></div>
                <div className="relative flex items-center justify-center">
                  <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continue with Google
                </div>
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">
                    Or continue with email
                  </span>
                </div>
              </div>

              {/* Email/Password Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700 flex items-center gap-1"
                  >
                    Email Address
                    {email && email.includes("@") && (
                      <CheckCircle className="h-3 w-3 text-green-500" />
                    )}
                  </Label>
                  <div
                    className={`relative transition-all duration-300 ${
                      activeField === "email" ? "scale-[1.02]" : ""
                    }`}
                  >
                    <Mail
                      className={`absolute left-3 top-3 h-4 w-4 transition-colors duration-300 ${
                        activeField === "email"
                          ? "text-[#7657ff]"
                          : "text-muted-foreground"
                      }`}
                    />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      className="pl-10 border-[#7657ff]/30 focus-visible:ring-[#7657ff] transition-all duration-300"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setActiveField("email")}
                      onBlur={() => setActiveField(null)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-700"
                    >
                      Password
                    </Label>
                    <a
                      href="/forgot-password"
                      className="text-xs text-[#7657ff] hover:underline transition-all hover:text-[#322372]"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div
                    className={`relative transition-all duration-300 ${
                      activeField === "password" ? "scale-[1.02]" : ""
                    }`}
                  >
                    <Lock
                      className={`absolute left-3 top-3 h-4 w-4 transition-colors duration-300 ${
                        activeField === "password"
                          ? "text-[#7657ff]"
                          : "text-muted-foreground"
                      }`}
                    />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 border-[#7657ff]/30 focus-visible:ring-[#7657ff] transition-all duration-300"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setActiveField("password")}
                      onBlur={() => setActiveField(null)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-muted-foreground hover:text-[#7657ff] transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Hide password" : "Show password"}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    className="text-[#7657ff] border-[#7657ff]/50"
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-600">
                    Remember me for 30 days
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#7657ff] to-[#322372] hover:from-[#322372] hover:to-[#7657ff] transition-all duration-500 text-white font-medium py-2 px-4 rounded-md shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 text-center pb-6">
              <div className="text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <a
                  href="/signup"
                  className="text-[#7657ff] font-medium hover:underline transition-colors hover:text-[#322372]"
                >
                  Create an account
                </a>
              </div>

              <div className="text-xs text-gray-500">
                By signing in, you agree to our{" "}
                <a href="/terms" className="text-[#7657ff] hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-[#7657ff] hover:underline">
                  Privacy Policy
                </a>
              </div>
            </CardFooter>
          </Card>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>© 2025 Team X-OR. All rights reserved.</p>
          </div>
        </div>
      </div>

      {/* Right side - Image with content */}
      <div className="hidden lg:flex flex-1 relative bg-[#322372] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#322372] via-[#7657ff]/90 to-[#322372] opacity-90"></div>

        {/* Abstract shapes */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>

        <img
          src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Office"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
        />

        <div
          className={`relative z-10 flex flex-col items-center justify-center h-full p-12 text-white transition-all duration-1000 ${
            animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-md text-center">
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Transform Your Digital Experience
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Access your account to unlock powerful tools and resources
              designed to elevate your business.
            </p>

            <div className="space-y-6 mt-12">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <p className="text-left text-lg">
                  Streamlined workflow management
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <p className="text-left text-lg">
                  Advanced analytics and reporting
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <p className="text-left text-lg">
                  Seamless team collaboration tools
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
