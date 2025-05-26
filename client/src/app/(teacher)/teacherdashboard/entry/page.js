"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Search,
  Eye,
  GraduationCap,
  Filter,
  RefreshCw,
  Upload,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { url } from "@/components/Url/page";
import Cookies from "js-cookie";

export default function EntryPage() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Fetch courses from API
  const fetchCourses = async () => {
    const token = Cookies.get("AccessToken");
    try {
      setIsLoading(true);
      const response = await fetch(`${url}/api/excel`, {
        headers: {
          Authorization: token,
        },
      });
      if (response.ok) {
        const data = await response.json();

        // Remove duplicates based on courseId
        const uniqueCourses = data.filter(
          (course, index, self) =>
            index === self.findIndex((c) => c.courseId === course.courseId)
        );

        setCourses(uniqueCourses);
        setFilteredCourses(uniqueCourses);
      } else {
        alert("Failed to fetch courses");
      }
    } catch (error) {
      alert("Error fetching courses: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter courses based on search term
  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value === "") {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter(
        (course) =>
          course.courseTitle.toLowerCase().includes(value.toLowerCase()) ||
          course.courseId.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  };

  // Navigate to details page
  const handleViewDetails = (courseTitle) => {
    router.push(`/teacherdashboard/entry/${encodeURIComponent(courseTitle)}`);

  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Course Management
              </h1>
              <p className="text-gray-600">
                View and manage all available courses
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => {
                  router.push("/teacherdashboard/entry/new");
                }}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border border-gray-200 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Total Courses
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {courses.length}
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
                    Active Courses
                  </p>
                  <p className="text-2xl font-bold text-tertiary mt-2">
                    {filteredCourses.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-tertiary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Search Results
                  </p>
                  <p className="text-2xl font-bold text-occean mt-2">
                    {filteredCourses.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Search className="w-6 h-6 text-occean" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search Section */}
        <Card className="border border-gray-200 bg-white">
          <CardHeader className="border-b border-gray-200 bg-gray-50">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Search Courses
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search by course title or course ID..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 h-12 border-gray-300 focus:border-tertiary focus:ring-tertiary"
              />
            </div>
          </CardContent>
        </Card>

        {/* Courses List */}
        <Card className="border border-gray-200 bg-white">
          <CardHeader className="border-b border-gray-200 bg-gray-50">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Available Courses
              </div>
              <span className="text-sm font-normal text-gray-500">
                {filteredCourses.length}{" "}
                {filteredCourses.length === 1 ? "course" : "courses"}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex justify-center items-center py-16">
                <div className="w-8 h-8 border-4 border-gray-200 border-t-tertiary rounded-full animate-spin"></div>
                <span className="ml-3 text-gray-600">Loading courses...</span>
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="text-center py-16">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Courses Found
                </h3>
                <p className="text-gray-500">
                  {searchTerm
                    ? "No courses match your search criteria"
                    : "No courses have been added yet"}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredCourses.map((course, index) => (
                  <div
                    key={`${course.courseId}-${index}`}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {/* Course Icon */}
                        <div className="w-12 h-12 bg-gradient-to-br from-tertiary to-occean rounded-lg flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>

                        {/* Course Info */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {course.courseTitle}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              variant="secondary"
                              className="bg-gray-100 text-gray-700 border-gray-200"
                            >
                              {course.courseId}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-3">
                        <Button
                          onClick={() => handleViewDetails(course.courseTitle)}
                          className="bg-tertiary hover:bg-occean text-white"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
