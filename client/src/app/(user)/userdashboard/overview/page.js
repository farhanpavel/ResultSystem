"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  GraduationCap,
  BookOpen,
  TrendingUp,
  Calendar,
  Settings,
  AlertCircle,
  FileText,
  Award,
  BarChart3,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { url } from "@/components/Url/page";

export default function OverviewPage() {
  const [userData, setUserData] = useState(null);
  const [resultData, setResultData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSettings, setHasSettings] = useState(false);
  const [stats, setStats] = useState({
    totalCourses: 0,
    averageMark: 0,
    highestMark: 0,
    totalCredits: 0,
  });
  const router = useRouter();

  // Check user settings and fetch data
  const checkUserAndFetchData = async () => {
    try {
      setIsLoading(true);
      const token = Cookies.get("AccessToken");

      if (!token) {
        alert("Please login to access this page");
        return;
      }

      // First check user settings
      const userResponse = await fetch(`${url}/api/user/data`, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      if (userResponse.ok) {
        const userData = await userResponse.json();
        setUserData(userData);

        // Check if user has settings (roll number)
        if (userData.setting === null) {
          setHasSettings(false);
          setIsLoading(false);
          return;
        }

        setHasSettings(true);

        // If user has settings, fetch result data
        const resultResponse = await fetch(`${url}/api/result`, {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        });

        if (resultResponse.ok) {
          const results = await resultResponse.json();
          setResultData(results);

          // Calculate statistics
          if (results.length > 0) {
            const totalMarks = results.map((item) => item.totalMark);
            const avgMark =
              totalMarks.reduce((a, b) => a + b, 0) / totalMarks.length;
            const maxMark = Math.max(...totalMarks);

            setStats({
              totalCourses: results.length,
              averageMark: avgMark.toFixed(2),
              highestMark: maxMark,
              totalCredits: results.length * 3, // Assuming 3 credits per course
            });
          }
        } else {
          alert("Failed to fetch result data");
        }
      } else {
        alert("Failed to fetch user data");
      }
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get grade based on total marks
  const getGrade = (totalMark) => {
    if (totalMark >= 35)
      return { grade: "A+", color: "bg-green-100 text-green-800" };
    if (totalMark >= 30)
      return { grade: "A", color: "bg-green-100 text-green-700" };
    if (totalMark >= 25)
      return { grade: "B+", color: "bg-blue-100 text-blue-800" };
    if (totalMark >= 20)
      return { grade: "B", color: "bg-blue-100 text-blue-700" };
    if (totalMark >= 15)
      return { grade: "C", color: "bg-yellow-100 text-yellow-800" };
    return { grade: "F", color: "bg-red-100 text-red-800" };
  };

  // Navigate to settings
  const handleGoToSettings = () => {
    router.push("/userdashboard/settings");
  };

  useEffect(() => {
    checkUserAndFetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Academic Overview
              </h1>
              <p className="text-gray-600">
                {userData
                  ? `Welcome back, ${userData.name}`
                  : "View your academic progress and results"}
              </p>
            </div>
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-gray-600" />
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-tertiary rounded-full animate-spin"></div>
            <span className="ml-3 text-gray-600">Loading your data...</span>
          </div>
        ) : !hasSettings ? (
          /* Settings Required Alert */
          <div className="space-y-6">
            <Alert className="border-yellow-200 bg-yellow-50">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                <strong>Setup Required:</strong> Please complete your profile
                setup by adding your roll number to view your results.
              </AlertDescription>
            </Alert>

            <Card className="border border-gray-200 bg-white">
              <CardHeader className="border-b border-gray-200 bg-gray-50">
                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Complete Your Profile Setup
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                    <User className="w-10 h-10 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Roll Number Required
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      To access your academic results and progress, you need to
                      set up your student roll number in the settings.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <Button
                      onClick={handleGoToSettings}
                      className="bg-tertiary hover:bg-occean text-white px-8 py-3"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Go to Settings
                    </Button>
                    <p className="text-sm text-gray-500">
                      You&lsquo;ll be able to view your results after setting up your
                      roll number
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Main Dashboard Content */
          <>
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border border-gray-200 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        Total Courses
                      </p>
                      <p className="text-2xl font-bold text-gray-900 mt-2">
                        {stats.totalCourses}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-gray-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        Average Mark
                      </p>
                      <p className="text-2xl font-bold text-tertiary mt-2">
                        {stats.averageMark}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-tertiary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        Highest Mark
                      </p>
                      <p className="text-2xl font-bold text-green-600 mt-2">
                        {stats.highestMark}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        Total Credits
                      </p>
                      <p className="text-2xl font-bold text-occean mt-2">
                        {stats.totalCredits}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-occean" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results Table */}
            <Card className="border border-gray-200 bg-white">
              <CardHeader className="border-b border-gray-200 bg-gray-50">
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Academic Results
                  </div>
                  <span className="text-sm font-normal text-gray-500">
                    {resultData.length}{" "}
                    {resultData.length === 1 ? "course" : "courses"}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {resultData.length === 0 ? (
                  <div className="text-center py-16">
                    <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No Results Available
                    </h3>
                    <p className="text-gray-500">
                      Your academic results will appear here once they are
                      published
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="font-semibold text-gray-900">
                            Course
                          </TableHead>
                          <TableHead className="font-semibold text-gray-900 text-center">
                            Tutorial Marks
                          </TableHead>
                          <TableHead className="font-semibold text-gray-900 text-center">
                            Assignment
                          </TableHead>
                          <TableHead className="font-semibold text-gray-900 text-center">
                            Attendance
                          </TableHead>
                          <TableHead className="font-semibold text-gray-900 text-center">
                            Total Mark
                          </TableHead>
                          <TableHead className="font-semibold text-gray-900 text-center">
                            Grade
                          </TableHead>
                          <TableHead className="font-semibold text-gray-900">
                            Date
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {resultData.map((result, index) => {
                          const gradeInfo = getGrade(result.totalMark);
                          return (
                            <TableRow
                              key={result.id}
                              className={
                                index % 2 === 0 ? "bg-white" : "bg-gray-50"
                              }
                            >
                              <TableCell>
                                <div>
                                  <p className="font-medium text-gray-900">
                                    {result.courseTitle}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {result.courseId}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell className="text-center">
                                <div className="space-y-1">
                                  <p className="text-sm text-gray-600">
                                    T1: {result.t1}, T2: {result.t2}, T3:{" "}
                                    {result.t3}, T4: {result.t4}
                                  </p>
                                  <p className="font-medium">
                                    Best 2: {result.bestTwoTutorialMarks}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell className="text-center font-mono">
                                {result.assignment}
                              </TableCell>
                              <TableCell className="text-center font-mono">
                                {result.attendance}
                              </TableCell>
                              <TableCell className="text-center">
                                <span className="font-bold text-lg text-gray-900">
                                  {result.totalMark}
                                </span>
                              </TableCell>
                              <TableCell className="text-center">
                                <Badge className={gradeInfo.color}>
                                  {gradeInfo.grade}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {formatDate(result.createdAt)}
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
