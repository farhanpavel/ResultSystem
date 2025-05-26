"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Upload,
  FileSpreadsheet,
  ArrowLeft,
  BookOpen,
  GraduationCap,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { url } from "@/components/Url/page";
import Cookies from "js-cookie";
export default function NewDataPage() {
  const [formData, setFormData] = useState({
    courseName: "",
    courseTitle: "",
    file: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel")
    ) {
      setFormData((prev) => ({
        ...prev,
        file: file,
      }));
    } else {
      alert("Please select a valid Excel file (.xlsx or .xls)");
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    if (
      file &&
      (file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel")
    ) {
      setFormData((prev) => ({
        ...prev,
        file: file,
      }));
    } else {
      alert("Please select a valid Excel file (.xlsx or .xls)");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("AccessToken");
    if (!formData.file) {
      alert("Please select an Excel file to upload");
      return;
    }

    setIsLoading(true);

    try {
      const uploadData = new FormData();
      uploadData.append("file", formData.file);
      const token = Cookies.get("AccessToken");

      const response = await fetch(`${url}/api/excel/upload`, {
        method: "POST",
        headers: {
          Authorization: `${token}`,
        },
        body: uploadData,
      });

      if (response.ok) {
        alert("Excel file uploaded successfully!");
        // Reset form
        setFormData({
          courseName: "",
          courseTitle: "",
          file: null,
        });
      } else {
        alert("Failed to upload file. Please try again.");
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
                  Back to Dashboard
                </Button>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Upload Student Data
              </h1>
              <p className="text-gray-600">
                Upload Excel file containing student marks and course
                information
              </p>
            </div>
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
              <FileSpreadsheet className="w-8 h-8 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="border border-gray-200 bg-white">
              <CardHeader className="border-b border-gray-200 bg-gray-50">
                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Data Upload Form
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Course Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                      Course Information
                    </h3>

                    {/* Course Name */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="courseName"
                        className="text-gray-900 font-medium flex items-center gap-2"
                      >
                        <BookOpen className="w-4 h-4 text-gray-500" />
                        Course Name
                      </Label>
                      <Input
                        id="courseName"
                        name="courseName"
                        type="text"
                        placeholder="e.g., Computer Science 101"
                        value={formData.courseName}
                        onChange={handleInputChange}
                        className="h-12 border-gray-300 focus:border-tertiary focus:ring-tertiary"
                      />
                    </div>

                    {/* Course Title */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="courseTitle"
                        className="text-gray-900 font-medium flex items-center gap-2"
                      >
                        <GraduationCap className="w-4 h-4 text-gray-500" />
                        Course Title
                      </Label>
                      <Input
                        id="courseTitle"
                        name="courseTitle"
                        type="text"
                        placeholder="e.g., Introduction to Programming"
                        value={formData.courseTitle}
                        onChange={handleInputChange}
                        className="h-12 border-gray-300 focus:border-tertiary focus:ring-tertiary"
                      />
                    </div>
                  </div>

                  {/* File Upload Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                      Excel File Upload *
                    </h3>

                    {/* Drag and Drop Area */}
                    <div
                      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                        dragActive
                          ? "border-tertiary bg-purple-50"
                          : formData.file
                          ? "border-green-300 bg-green-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      {formData.file ? (
                        <div className="space-y-4">
                          <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                          <div>
                            <p className="text-lg font-medium text-gray-900">
                              {formData.file.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              File size:{" "}
                              {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                              setFormData((prev) => ({ ...prev, file: null }))
                            }
                            className="border-gray-300 text-gray-700 hover:bg-gray-50"
                          >
                            Remove File
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <FileSpreadsheet className="w-12 h-12 text-gray-400 mx-auto" />
                          <div>
                            <p className="text-lg font-medium text-gray-900">
                              Drag and drop your Excel file here
                            </p>
                            <p className="text-sm text-gray-500">
                              or click to browse files
                            </p>
                          </div>
                          <input
                            type="file"
                            accept=".xlsx,.xls"
                            onChange={handleFileChange}
                            className="hidden"
                            id="file-upload"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                              document.getElementById("file-upload").click()
                            }
                            className="border-tertiary text-tertiary hover:bg-purple-50"
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Select Excel File
                          </Button>
                        </div>
                      )}
                    </div>
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
                        disabled={isLoading || !formData.file}
                        className="flex-1 h-12 bg-tertiary hover:bg-occean text-white font-medium"
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Uploading...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Upload className="w-4 h-4" />
                            Upload Data
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
            {/* File Requirements */}
            <Card className="border border-gray-200 bg-white">
              <CardHeader className="border-b border-gray-200 bg-gray-50">
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  File Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3 text-sm text-gray-600">
                  <p>• File format: Excel (.xlsx or .xls)</p>
                  <p>• Maximum file size: 10 MB</p>
                  <p>• Required columns: Student ID, Name, Marks</p>
                  <p>• First row should contain headers</p>
                  <p>• No empty rows between data</p>
                </div>
              </CardContent>
            </Card>

            {/* Excel Template */}
            <Card className="border border-gray-200 bg-white">
              <CardHeader className="border-b border-gray-200 bg-gray-50">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Excel Template
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Download our template to ensure proper formatting
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <FileSpreadsheet className="w-4 h-4 mr-2" />
                    Download Template
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Upload History */}
            <Card className="border border-gray-200 bg-white">
              <CardHeader className="border-b border-gray-200 bg-gray-50">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Recent Uploads
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="text-center text-gray-500">
                    <FileSpreadsheet className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">No recent uploads</p>
                  </div>
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
                  <p>• Check file format and size</p>
                  <p>• Ensure all required columns are present</p>
                  <p>• Contact support for technical issues</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
