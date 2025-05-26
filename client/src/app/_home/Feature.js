import React from "react";
import {
  UserPlus,
  Users,
  LogIn,
  LayoutDashboard,
  FileDown,
  Upload,
} from "lucide-react";

export default function Feature() {
  const features = [
    {
      icon: <UserPlus className="h-6 w-6 text-white" />,
      title: "Easy Sign-Up",
      description:
        "Student or Teacher can sign up with easy selection. Each will have different forms to submit data properly.",
    },
    {
      icon: <LogIn className="h-6 w-6 text-white" />,
      title: "Secure Sign-In",
      description:
        "User email and password will be checked. It will redirect to dashboard based on user type securely.",
    },
    {
      icon: <LayoutDashboard className="h-6 w-6 text-white" />,
      title: "Student Dashboard",
      description:
        "Each student will see their own courses. Marks will be visible from the teacher-uploaded database.",
    },
    {
      icon: <FileDown className="h-6 w-6 text-white" />,
      title: "Marksheet Download",
      description:
        "Students can download their in-course marksheet (out of 40) in PDF format for personal use anytime.",
    },
    {
      icon: <Upload className="h-6 w-6 text-white" />,
      title: "Excel Upload",
      description:
        "Teachers can upload marks in Excel format. The data will go to database after successful validation.",
    },
    {
      icon: <Users className="h-6 w-6 text-white" />,
      title: "Course Selection",
      description:
        "Teachers will choose the course and batch. Marks will be linked with selected info for all students.",
    },
  ];

  return (
    <section className="py-16 font-mona">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-tertiary">
            Everything You Need to{" "}
            <span className="text-[#7657ff]/80">Manage Results Easily</span>
          </h2>
          <p className="text-[#5a5a5a] text-sm font-medium w-[50%] mx-auto text-center mt-3">
            Our Result Management System makes it simple for teachers to submit
            marks and for students to view their scores
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="rounded-xl p-6 flex items-start gap-4">
              <div className="bg-tertiary text-white p-3 rounded-lg shadow-xl shadow-white">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-occean">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-xs">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
