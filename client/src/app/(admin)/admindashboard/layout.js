import Adminsidebar from "@/components/Adminsidebar/page";

export default function Landing({ children }) {
  return (
    <div className="bg-[#F8F9FA] flex">
      <Adminsidebar />
      <div className="w-[90%]">{children}</div>
    </div>
  );
}
