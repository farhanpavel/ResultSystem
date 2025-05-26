"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  GraduationCap,
  ArrowLeft,
  Shield,
} from "lucide-react";
import { url } from "@/components/Url/page";

export default function NewUserPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      role: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.role
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${url}/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("User account created successfully!");
        // Reset form
        setFormData({
          name: "",
          email: "",
          password: "",
          role: "",
        });
      } else {
        const errorData = await response.json();
        alert("Failed to create user account. Please try again.");
      }
    } catch (error) {
      alert("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Users
                </Button>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Create New User Account
              </h1>
              <p className="text-gray-600">
                Add a new teacher or student to the system
              </p>
            </div>
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
              <UserPlus className="w-8 h-8 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="border border-gray-200 bg-white">
              <CardHeader className="border-b border-gray-200 bg-gray-50">
                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  User Registration Form
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Please fill in all required information to create a new user
                  account
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-gray-900 font-medium flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-gray-500" />
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter the user's full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="h-12 border-gray-300 focus:border-tertiary focus:ring-tertiary"
                      required
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-gray-900 font-medium flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4 text-gray-500" />
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter a valid email address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="h-12 border-gray-300 focus:border-tertiary focus:ring-tertiary"
                      required
                    />
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-gray-900 font-medium flex items-center gap-2"
                    >
                      <Lock className="w-4 h-4 text-gray-500" />
                      Password *
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Create a secure password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="h-12 border-gray-300 focus:border-tertiary focus:ring-tertiary"
                      required
                    />
                    <p className="text-sm text-gray-500">
                      Password should be at least 8 characters long
                    </p>
                  </div>

                  {/* Role Selection */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="role"
                      className="text-gray-900 font-medium flex items-center gap-2"
                    >
                      <GraduationCap className="w-4 h-4 text-gray-500" />
                      User Role *
                    </Label>
                    <Select
                      value={formData.role}
                      onValueChange={handleRoleChange}
                    >
                      <SelectTrigger className="h-12 border-gray-300 focus:border-tertiary focus:ring-tertiary">
                        <SelectValue placeholder="Select the user's role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="teacher" className="cursor-pointer">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Teacher
                          </div>
                        </SelectItem>
                        <SelectItem value="student" className="cursor-pointer">
                          <div className="flex items-center gap-2">
                            <GraduationCap className="w-4 h-4" />
                            Student
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6 border-t border-gray-200">
                    <div className="flex gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1 h-12 border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 h-12 bg-tertiary hover:bg-occean text-white font-medium"
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Creating Account...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <UserPlus className="w-4 h-4" />
                            Create User Account
                          </div>
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Information */}
          <div className="space-y-6">
            {/* Role Information */}
            <Card className="border border-gray-200 bg-white">
              <CardHeader className="border-b border-gray-200 bg-gray-50">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  User Roles
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-tertiary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Teacher</h4>
                      <p className="text-sm text-gray-600">
                        Can upload student marks, manage courses, and access
                        administrative features.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-4 h-4 text-occean" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Student</h4>
                      <p className="text-sm text-gray-600">
                        Can view results, track academic progress, and download
                        marksheets.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Card className="border border-gray-200 bg-white">
              <CardHeader className="border-b border-gray-200 bg-gray-50">
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security Notice
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3 text-sm text-gray-600">
                  <p>• Passwords are encrypted and stored securely</p>
                  <p>• Email addresses must be unique in the system</p>
                  <p>• Users will receive login credentials via email</p>
                  <p>• Account activation is required for first-time login</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border border-gray-200 bg-white">
              <CardHeader className="border-b border-gray-200 bg-gray-50">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  System Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Users</span>
                    <span className="font-medium text-gray-900">--</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Active Teachers
                    </span>
                    <span className="font-medium text-tertiary">--</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Active Students
                    </span>
                    <span className="font-medium text-occean">--</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
