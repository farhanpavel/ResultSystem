import React from "react";
import { Star } from "lucide-react";

export default function Service() {
  return (
    <div className="bg-occean font-mona">
      <div className="container mx-auto max-w-6xl px-7 py-20">
        <div className="text-center">
          <h2 className="text-3xl md:text-3xl font-bold text-white">
            Our Services
          </h2>
          <p className="text-white text-sm font-medium w-[50%] mx-auto text-center mt-3">
            We offer essential tools for teachers and students to simplify the
            result submission and viewing process in one platform.
          </p>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10">
            <div className="bg-occean/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-lg">
              <h3 className="text-xl font-bold text-white mb-3">
                Student Dashboard
              </h3>
              <p className="text-white/70">
                Students can view their marks, courses, and download PDF
                marksheets anytime.
              </p>
            </div>

            <div className="bg-occean/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-lg">
              <h3 className="text-xl font-bold text-white mb-3">
                Teacher Panel
              </h3>
              <p className="text-white/70">
                Teachers can upload marks using Excel, select courses, and
                manage student data easily.
              </p>
            </div>

            <div className="bg-occean/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-lg">
              <h3 className="text-xl font-bold text-white mb-3">
                Role-based Access
              </h3>
              <p className="text-white/70">
                Users get custom features based on role. Separate login and
                dashboard for students and teachers.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <button className="mt-12 px-8 py-3 bg-white text-occean font-bold rounded-lg hover:bg-white/90 transition-colors">
            Try the System
          </button>
        </div>
      </div>
    </div>
  );
}
