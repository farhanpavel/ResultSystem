"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
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
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  FileSpreadsheet,
  Download,
  Search,
  Calendar,
  Users,
  TrendingUp,
  Filter,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function DetailsPage() {
  const params = useParams();
  const router = useRouter();
  const title = decodeURIComponent(params.slug.replace("title=", ""));

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalStudents: 0,
    averageMark: 0,
    highestMark: 0,
    lowestMark: 0,
  });

  // Fetch course data from API
  const fetchCourseData = async () => {
    const token = Cookies.get("AccessToken");
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:4000/api/excel/data/${title}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.ok) {
        const courseData = await response.json();
        setData(courseData);
        setFilteredData(courseData);

        // Calculate statistics
        if (courseData.length > 0) {
          const totalMarks = courseData.map((item) => item.totalMark);
          const avgMark =
            totalMarks.reduce((a, b) => a + b, 0) / totalMarks.length;
          const maxMark = Math.max(...totalMarks);
          const minMark = Math.min(...totalMarks);

          setStats({
            totalStudents: courseData.length,
            averageMark: avgMark.toFixed(2),
            highestMark: maxMark,
            lowestMark: minMark,
          });
        }
      } else {
        alert("Failed to fetch course data");
      }
    } catch (error) {
      alert("Error fetching course data: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter data based on search term
  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter(
        (item) =>
          item.id.toLowerCase().includes(value.toLowerCase()) ||
          item.comment.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
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

  useEffect(() => {
    if (title) {
      fetchCourseData();
    }
  }, [title]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <Button
                  onClick={() => router.back()}
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Courses
                </Button>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Course Details: {title}
              </h1>
              <p className="text-gray-600">
                Detailed marks and performance data for all students
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Excel
              </Button>
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                <FileSpreadsheet className="w-8 h-8 text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border border-gray-200 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Total Students
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {stats.totalStudents}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-gray-600" />
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
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Lowest Mark
                  </p>
                  <p className="text-2xl font-bold text-red-600 mt-2">
                    {stats.lowestMark}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-red-600" />
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
              Search Records
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search by student ID or comments..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 h-12 border-gray-300 focus:border-tertiary focus:ring-tertiary"
              />
            </div>
          </CardContent>
        </Card>

        {/* Excel-like Data Table */}
        <Card className="border border-gray-200 bg-white">
          <CardHeader className="border-b border-gray-200 bg-gray-50">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5" />
                Student Marks Sheet
              </div>
              <span className="text-sm font-normal text-gray-500">
                {filteredData.length}{" "}
                {filteredData.length === 1 ? "record" : "records"}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex justify-center items-center py-16">
                <div className="w-8 h-8 border-4 border-gray-200 border-t-tertiary rounded-full animate-spin"></div>
                <span className="ml-3 text-gray-600">Loading data...</span>
              </div>
            ) : filteredData.length === 0 ? (
              <div className="text-center py-16">
                <FileSpreadsheet className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Data Found
                </h3>
                <p className="text-gray-500">
                  {searchTerm
                    ? "No records match your search criteria"
                    : "No data available for this course"}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold text-gray-900 border-r border-gray-200">
                        Student ID
                      </TableHead>
                      <TableHead className="font-semibold text-gray-900 border-r border-gray-200">
                        Student Name
                      </TableHead>

                      <TableHead className="font-semibold text-gray-900 border-r border-gray-200 text-center">
                        T1
                      </TableHead>
                      <TableHead className="font-semibold text-gray-900 border-r border-gray-200 text-center">
                        T2
                      </TableHead>
                      <TableHead className="font-semibold text-gray-900 border-r border-gray-200 text-center">
                        T3
                      </TableHead>
                      <TableHead className="font-semibold text-gray-900 border-r border-gray-200 text-center">
                        T4
                      </TableHead>
                      <TableHead className="font-semibold text-gray-900 border-r border-gray-200 text-center">
                        Best 2 Tutorials
                      </TableHead>
                      <TableHead className="font-semibold text-gray-900 border-r border-gray-200 text-center">
                        Assignment
                      </TableHead>
                      <TableHead className="font-semibold text-gray-900 border-r border-gray-200 text-center">
                        Attendance
                      </TableHead>
                      <TableHead className="font-semibold text-gray-900 border-r border-gray-200 text-center">
                        Total Mark
                      </TableHead>
                      <TableHead className="font-semibold text-gray-900 border-r border-gray-200 text-center">
                        Grade
                      </TableHead>
                      <TableHead className="font-semibold text-gray-900 border-r border-gray-200">
                        Comments
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((record, index) => {
                      const gradeInfo = getGrade(record.totalMark);
                      return (
                        <TableRow
                          key={record.id}
                          className={
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }
                        >
                          <TableCell className="font-medium border-r border-gray-200">
                            <div className="text-sm">
                              <p className="font-medium text-gray-900">
                                {record.studentId}
                              </p>
                              <p className="text-gray-500 text-xs">
                                {record.courseId}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className=" border-r border-gray-200 font-mono">
                            {record.studentName}
                          </TableCell>
                          <TableCell className="text-center border-r border-gray-200 font-mono">
                            {record.t1}
                          </TableCell>
                          <TableCell className="text-center border-r border-gray-200 font-mono">
                            {record.t2}
                          </TableCell>
                          <TableCell className="text-center border-r border-gray-200 font-mono">
                            {record.t3}
                          </TableCell>
                          <TableCell className="text-center border-r border-gray-200 font-mono">
                            {record.t4}
                          </TableCell>
                          <TableCell className="text-center border-r border-gray-200 font-mono font-semibold">
                            {record.bestTwoTutorialMarks}
                          </TableCell>
                          <TableCell className="text-center border-r border-gray-200 font-mono">
                            {record.assignment}
                          </TableCell>
                          <TableCell className="text-center border-r border-gray-200 font-mono">
                            {record.attendance}
                          </TableCell>
                          <TableCell className="text-center border-r border-gray-200">
                            <span className="font-bold text-lg text-gray-900">
                              {record.totalMark}
                            </span>
                          </TableCell>
                          <TableCell className="text-center border-r border-gray-200">
                            <Badge className={gradeInfo.color}>
                              {gradeInfo.grade}
                            </Badge>
                          </TableCell>
                          <TableCell className="border-r border-gray-200 max-w-xs">
                            <p
                              className="text-sm text-gray-700 truncate"
                              title={record.comment}
                            >
                              {record.comment}
                            </p>
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
      </div>
    </div>
  );
}
