"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Settings,
  User,
  Mail,
  Lock,
  BadgeIcon as IdCard,
  Save,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { url } from "@/components/Url/page";
import Cookies from "js-cookie";

export default function SettingsPage() {
  const [userData, setUserData] = useState({
    id: "",
    email: "",
    name: "",
    role: "",
    setting: null,
  });
  const [rollNumber, setRollNumber] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasRollNumber, setHasRollNumber] = useState(false);

  // Fetch user data from API
  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const token = Cookies.get("AccessToken"); // Assuming JWT is stored in localStorage

      const response = await fetch(`${url}/api/user/data`, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);

        // Check if user already has a roll number
        if (data.setting && data.setting.studentId) {
          setRollNumber(data.setting.studentId.toString());
          setHasRollNumber(true);
        }
      } else {
        alert("Failed to fetch user data");
      }
    } catch (error) {
      alert("Error fetching user data: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Submit roll number
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rollNumber || rollNumber.trim() === "") {
      alert("Please enter a valid roll number");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = Cookies.get("AccessToken"); // Assuming JWT is stored in localStorage

      const response = await fetch(`${url}/api/excel/roll/data/upload`, {
        method: "POST",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: Number.parseInt(rollNumber),
        }),
      });

      if (response.ok) {
        alert("Roll number updated successfully!");
        setHasRollNumber(true);
        // Refresh user data to get updated settings
        fetchUserData();
      } else {
        alert("Failed to update roll number. Please try again.");
      }
    } catch (error) {
      alert("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRollNumberChange = (e) => {
    const value = e.target.value;
    // Only allow numbers
    if (/^\d*$/.test(value)) {
      setRollNumber(value);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Account Settings
              </h1>
              <p className="text-gray-600">
                Manage your account information and preferences
              </p>
            </div>
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
              <Settings className="w-8 h-8 text-gray-600" />
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-tertiary rounded-full animate-spin"></div>
            <span className="ml-3 text-gray-600">Loading settings...</span>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Settings Form */}
            <div className="lg:col-span-2">
              <Card className="border border-gray-200 bg-white">
                <CardHeader className="border-b border-gray-200 bg-gray-50">
                  <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Field */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-gray-900 font-medium flex items-center gap-2"
                      >
                        <Mail className="w-4 h-4 text-gray-500" />
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={userData.email}
                        disabled
                        className="h-12 border-gray-300 bg-gray-50 text-gray-500 cursor-not-allowed"
                      />
                      <p className="text-xs text-gray-500">
                        Email cannot be changed
                      </p>
                    </div>

                    {/* Name Field */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-gray-900 font-medium flex items-center gap-2"
                      >
                        <User className="w-4 h-4 text-gray-500" />
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        value={userData.name}
                        disabled
                        className="h-12 border-gray-300 bg-gray-50 text-gray-500 cursor-not-allowed"
                      />
                      <p className="text-xs text-gray-500">
                        Name cannot be changed
                      </p>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="password"
                        className="text-gray-900 font-medium flex items-center gap-2"
                      >
                        <Lock className="w-4 h-4 text-gray-500" />
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        value="••••••••••••"
                        disabled
                        className="h-12 border-gray-300 bg-gray-50 text-gray-500 cursor-not-allowed"
                      />
                      <p className="text-xs text-gray-500">
                        Password cannot be changed
                      </p>
                    </div>

                    {/* Role Field */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="role"
                        className="text-gray-900 font-medium flex items-center gap-2"
                      >
                        <IdCard className="w-4 h-4 text-gray-500" />
                        Role
                      </Label>
                      <div className="flex items-center gap-3">
                        <Input
                          id="role"
                          type="text"
                          value={userData.role}
                          disabled
                          className="h-12 border-gray-300 bg-gray-50 text-gray-500 cursor-not-allowed flex-1"
                        />
                        <Badge
                          className={`px-3 py-2 ${
                            userData.role === "student"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {userData.role}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500">
                        Role is assigned by administrator
                      </p>
                    </div>

                    {/* Roll Number Field */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="rollNumber"
                        className="text-gray-900 font-medium flex items-center gap-2"
                      >
                        <IdCard className="w-4 h-4 text-gray-500" />
                        Student Roll Number
                        {hasRollNumber && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                      </Label>
                      <Input
                        id="rollNumber"
                        type="text"
                        placeholder="Enter your roll number"
                        value={rollNumber}
                        onChange={handleRollNumberChange}
                        disabled={hasRollNumber}
                        className={`h-12 ${
                          hasRollNumber
                            ? "border-gray-300 bg-gray-50 text-gray-500 cursor-not-allowed"
                            : "border-gray-300 focus:border-tertiary focus:ring-tertiary"
                        }`}
                      />
                      <p className="text-xs text-gray-500">
                        {hasRollNumber
                          ? "Roll number has been set and cannot be changed"
                          : "Enter your student roll number (numbers only)"}
                      </p>
                    </div>

                    {/* Submit Button */}
                    {!hasRollNumber && (
                      <div className="pt-6 border-t border-gray-200">
                        <Button
                          type="submit"
                          disabled={isSubmitting || !rollNumber}
                          className="w-full h-12 bg-tertiary hover:bg-occean text-white font-medium"
                        >
                          {isSubmitting ? (
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Updating Roll Number...
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Save className="w-4 h-4" />
                              Save Roll Number
                            </div>
                          )}
                        </Button>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Information */}
            <div className="space-y-6">
              {/* Account Status */}
              <Card className="border border-gray-200 bg-white">
                <CardHeader className="border-b border-gray-200 bg-gray-50">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    Account Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Account Type
                      </span>
                      <Badge className="bg-blue-100 text-blue-800">
                        {userData.role}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Roll Number</span>
                      {hasRollNumber ? (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Set
                        </Badge>
                      ) : (
                        <Badge className="bg-yellow-100 text-yellow-800">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Pending
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Profile Status
                      </span>
                      <Badge className="bg-green-100 text-green-800">
                        Active
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Important Notice */}
              <Card className="border border-gray-200 bg-white">
                <CardHeader className="border-b border-gray-200 bg-gray-50">
                  <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Important Notice
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3 text-sm text-gray-600">
                    <p>• Roll number can only be set once</p>
                    <p>
                      • Contact administrator to change personal information
                    </p>
                    <p>• Ensure roll number is correct before submitting</p>
                    <p>• Roll number is required to access results</p>
                  </div>
                </CardContent>
              </Card>

              {/* Help Section */}
              <Card className="border border-gray-200 bg-white">
                <CardHeader className="border-b border-gray-200 bg-gray-50">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    Need Help?
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3 text-sm text-gray-600">
                    <p>• Contact your institution for roll number</p>
                    <p>• Reach out to support for technical issues</p>
                    <p>• Check with administrator for account changes</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
