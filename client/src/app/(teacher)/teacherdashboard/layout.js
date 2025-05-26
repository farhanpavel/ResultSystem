import TeacherSidebar from "@/components/TeacherSidebar/page";

export default function Landing({ children }) {
  return (
    <div className="bg-[#F8F9FA] flex">
      <TeacherSidebar />
      <div className="w-[90%]">{children}</div>
    </div>
  );
}
