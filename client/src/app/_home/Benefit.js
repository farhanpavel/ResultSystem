import React from "react";
import {
  CheckCircle,
  Award,
  Zap,
  Shield,
  Clock,
  Users,
  ArrowRight,
} from "lucide-react";

export default function Benefit() {
  const benefits = [
    {
      icon: <Zap className="h-8 w-8 text-tertiary" />,
      title: "Faster Result Processing",
      description:
        "Teachers can upload results instantly via Excel files, eliminating hours of manual entry.",
    },
    {
      icon: <Shield className="h-8 w-8 text-tertiary" />,
      title: "Secure Access Control",
      description:
        "Student and teacher logins are role-protected, ensuring that sensitive data is always safe.",
    },
    {
      icon: <Clock className="h-8 w-8 text-tertiary" />,
      title: "Time-Saving Automation",
      description:
        "Our system automatically calculates grades and generates PDF marksheets, saving valuable time.",
    },
    {
      icon: <Users className="h-8 w-8 text-tertiary" />,
      title: "Streamlined Collaboration",
      description:
        "Faculty and admins can collaborate seamlessly on result approval and publication processes.",
    },
    {
      icon: <Award className="h-8 w-8 text-tertiary" />,
      title: "Accurate Records",
      description:
        "Digital result entries reduce human error and ensure data consistency across sessions.",
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-tertiary" />,
      title: "Student Empowerment",
      description:
        "Students can view, download, and track their academic progress anytime, from any device.",
    },
  ];

  return (
    <div className="min-h-screen font-mona">
      {/* Stats Section */}
      <div className="bg-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <p className="text-4xl font-bold text-tertiary mb-2">98%</p>
              <p className="text-gray-600">Faculty satisfaction rate</p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold text-tertiary mb-2">75%</p>
              <p className="text-gray-600">Reduction in admin workload</p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold text-tertiary mb-2">1000+</p>
              <p className="text-gray-600">Results generated per semester</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="text-tertiary">Our System</span>
            </h2>
            <p className="text-[#5a5a5a] text-sm font-medium w-[50%] mx-auto text-center mt-3 ">
              From student accessibility to teacher efficiency — our result
              management system transforms the academic experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="bg-tertiary/10 p-3 inline-block rounded-lg mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="bg-tertiary/5 py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-tertiary/20 relative">
            <div className="absolute -top-5 left-10 bg-tertiary text-white text-xl font-bold py-2 px-6 rounded-full">
              Success Story
            </div>
            <div className="md:flex items-center gap-8">
              <div className="md:w-1/3 mb-6 md:mb-0">
                <div className="aspect-square bg-gray-200 rounded-xl overflow-hidden">
                  <div className="w-full h-full bg-tertiary/20 flex items-center justify-center">
                    <span className="text-tertiary font-bold text-xl">
                      Institute Logo
                    </span>
                  </div>
                </div>
              </div>
              <div className="md:w-2/3">
                <p className="text-xl italic mb-6">
                  Managing results used to be a chaotic, time-consuming task.
                  Now it takes minutes. Students and teachers love the
                  simplicity, and we’re seeing real improvements in accuracy and
                  efficiency.
                </p>
                <div>
                  <p className="font-bold text-lg">Dr. Nazmul Huda</p>
                  <p className="text-gray-600">
                    Head of Examination, Prime University
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-occean py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Simplify Result Management?
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">
            Join institutions making the shift to efficient, digital academic
            result systems.
          </p>
          <button className="px-8 py-4 bg-white text-occean font-bold rounded-full hover:bg-white/90 transition-colors flex items-center gap-2 mx-auto">
            Get Started Now
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
