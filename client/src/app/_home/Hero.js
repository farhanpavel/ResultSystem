"use client";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Users,
  ClipboardList,
  FileCheck2,
  UserCheck,
  FileUp,
} from "lucide-react";
import React from "react";
import {
  FaUniversity,
  FaUserGraduate,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { GrDocumentPdf } from "react-icons/gr";
import { SiGoogleclassroom } from "react-icons/si";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  return (
    <div className="font-mona">
      <div>
        <div className="flex flex-col items-center justify-center mt-[4%]">
          <div>
            <h1 className="text-6xl mx-auto w-[90%] font-semibold leading-[4.2rem] text-[#322372] text-center">
              Result <span className="text-tertiary">Management System</span>{" "}
              for Academic Solutions
            </h1>
          </div>
          <div>
            <p className="text-[#5a5a5a] text-lg font-medium w-[65%] mx-auto text-center mt-7">
              Easily manage results, sign-up as teacher or student, upload data
              to database, access individual marksheets, and ensure smooth
              result communication through a unified digital platform.
            </p>
          </div>

          <div className="grid grid-cols-6 gap-10 mt-10">
            <div>
              <UserCheck
                strokeWidth={2}
                className="w-20 h-20 text-tertiary shadow-xl bg-white p-6 rounded-lg"
              />
              <h1 className="text-xs leading-4 text-center mt-2 text-[#322372] font-semibold">
                Sign Up <br /> As Student
              </h1>
            </div>
            <div>
              <Users
                strokeWidth={2}
                className="w-20 h-20 text-tertiary shadow-xl bg-white p-6 rounded-lg"
              />
              <h1 className="text-xs leading-4 text-center mt-2 text-[#322372] font-semibold">
                Sign Up <br /> As Teacher
              </h1>
            </div>
            <div>
              <ClipboardList
                strokeWidth={2}
                className="w-20 h-20 text-tertiary shadow-xl bg-white p-6 rounded-lg"
              />
              <h1 className="text-xs leading-4 text-center mt-2 text-[#322372] font-semibold">
                Course <br /> Selection
              </h1>
            </div>
            <div>
              <FileUp
                strokeWidth={2}
                className="w-20 h-20 text-tertiary shadow-xl bg-white p-6 rounded-lg"
              />
              <h1 className="text-xs leading-4 text-center mt-2 text-[#322372] font-semibold">
                Upload <br /> Excel File
              </h1>
            </div>
            <div>
              <FileCheck2
                strokeWidth={2}
                className="w-20 h-20 text-tertiary shadow-xl bg-white p-6 rounded-lg"
              />
              <h1 className="text-xs leading-4 text-center mt-2 text-[#322372] font-semibold">
                Marksheet <br /> PDF Export
              </h1>
            </div>
            <div>
              <BookOpen
                strokeWidth={2}
                className="w-20 h-20 text-tertiary shadow-xl bg-white p-6 rounded-lg"
              />
              <h1 className="text-xs leading-4 text-center mt-2 text-[#322372] font-semibold">
                Dashboard <br /> Access
              </h1>
            </div>
          </div>

          <div className="space-x-5 mt-[4%]">
            <Button
              onClick={() => router.push("/signin")}
              className="rounded-lg px-10 bg-tertiary text-white hover:bg-purple-700"
            >
              Sign In
            </Button>
            <Button
              onClick={() => router.push("/signin")}
              className="rounded-lg px-10 border-tertiary bg-white border-[1.5px] text-tertiary hover:bg-white hover:text-tertiary"
            >
              Sign Up
            </Button>
          </div>
        </div>

        <div className="mt-[7%]">
          <h1 className="text-[#322372] text-2xl font-semibold text-center">
            Recommended by{" "}
            <span className="text-tertiary">leading institutes</span>
          </h1>
          <div className="flex py-10 justify-center space-x-[5%] items-center">
            <div className="flex items-center space-x-2 opacity-50">
              <FaUniversity className="text-3xl" />
              <h1 className="font-semibold text-sm">University</h1>
            </div>
            <div className="flex items-center space-x-2 opacity-50">
              <FaUserGraduate className="text-3xl" />
              <h1 className="font-semibold text-sm">Students</h1>
            </div>
            <div className="flex items-center space-x-2 opacity-50">
              <FaChalkboardTeacher className="text-3xl" />
              <h1 className="font-semibold text-sm">Teachers</h1>
            </div>
            <div className="flex items-center space-x-2 opacity-50">
              <GrDocumentPdf className="text-3xl" />
              <h1 className="font-semibold text-sm">PDF Export</h1>
            </div>
            <div className="flex items-center space-x-2 opacity-50">
              <SiGoogleclassroom className="text-3xl" />
              <h1 className="font-semibold text-sm">Classroom</h1>
            </div>
            <div className="flex items-center space-x-2 opacity-50">
              <ClipboardList className="text-3xl" />
              <h1 className="font-semibold text-sm">InCourse Mark</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
