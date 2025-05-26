"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  Search,
  Trash2,
  GraduationCap,
  User,
  Mail,
  Filter,
  RefreshCw,
  UserPlus,
} from "lucide-react";
import { url } from "@/components/Url/page";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const router = useRouter();
  const [stats, setStats] = useState({
    total: 0,
    teachers: 0,
    students: 0,
  });

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${url}/api/user`);
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);

        // Calculate stats
        const teacherCount = data.filter(
          (user) => user.role === "teacher"
        ).length;
        const studentCount = data.filter(
          (user) => user.role === "student"
        ).length;
        setStats({
          total: data.length,
          teachers: teacherCount,
          students: studentCount,
        });
      } else {
        alert("Failed to fetch users");
      }
    } catch (error) {
      alert("Error fetching users: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete user
  const deleteUser = async (userId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    ) {
      try {
        const response = await fetch(`${url}/api/user/${userId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("User deleted successfully!");
          fetchUsers();
        } else {
          alert("Failed to delete user");
        }
      } catch (error) {
        alert("Error deleting user: " + error.message);
      }
    }
  };

  // Filter users based on search term
  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(value.toLowerCase()) ||
          user.email.toLowerCase().includes(value.toLowerCase()) ||
          user.role.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  // Filter by role
  const filterByRole = (role) => {
    setActiveFilter(role);
    if (role === "all") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) => user.role === role);
      setFilteredUsers(filtered);
    }
    setSearchTerm("");
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                User Management System
              </h1>
              <p className="text-gray-600">
                Manage and monitor all system users
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={fetchUsers}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button
                onClick={() => {
                  router.push("/admindashboard/entry/new");
                }}
                className="bg-tertiary hover:bg-occean text-white"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add New User
              </Button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border border-gray-200 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Total Users
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {stats.total}
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
                    Teachers
                  </p>
                  <p className="text-2xl font-bold text-tertiary mt-2">
                    {stats.teachers}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-tertiary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Students
                  </p>
                  <p className="text-2xl font-bold text-occean mt-2">
                    {stats.students}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-occean" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter Section */}
        <Card className="border border-gray-200 bg-white">
          <CardHeader className="border-b border-gray-200 bg-gray-50">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search users by name, email, or role..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-tertiary focus:ring-tertiary"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => filterByRole("all")}
                  variant={activeFilter === "all" ? "default" : "outline"}
                  className={
                    activeFilter === "all"
                      ? "bg-tertiary hover:bg-occean text-white"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }
                >
                  All Users
                </Button>
                <Button
                  onClick={() => filterByRole("teacher")}
                  variant={activeFilter === "teacher" ? "default" : "outline"}
                  className={
                    activeFilter === "teacher"
                      ? "bg-tertiary hover:bg-occean text-white"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }
                >
                  Teachers
                </Button>
                <Button
                  onClick={() => filterByRole("student")}
                  variant={activeFilter === "student" ? "default" : "outline"}
                  className={
                    activeFilter === "student"
                      ? "bg-tertiary hover:bg-occean text-white"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }
                >
                  Students
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="border border-gray-200 bg-white">
          <CardHeader className="border-b border-gray-200 bg-gray-50">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Users Directory
              </div>
              <span className="text-sm font-normal text-gray-500">
                {filteredUsers.length}{" "}
                {filteredUsers.length === 1 ? "user" : "users"}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {isLoading ? (
              <div className="flex justify-center items-center py-16">
                <div className="w-8 h-8 border-4 border-gray-200 border-t-tertiary rounded-full animate-spin"></div>
                <span className="ml-3 text-gray-600">Loading users...</span>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center py-16">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Users Found
                </h3>
                <p className="text-gray-500">
                  {searchTerm
                    ? "No users match your search criteria"
                    : "No users have been registered yet"}
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold text-gray-900">
                      User
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      Email
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      Role
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900 text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user, index) => (
                    <TableRow
                      key={user.id || index}
                      className="hover:bg-gray-50"
                    >
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                              user.role === "teacher"
                                ? "bg-tertiary"
                                : "bg-occean"
                            }`}
                          >
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {user.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              ID: {user.id}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{user.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={`${
                            user.role === "teacher"
                              ? "bg-purple-100 text-tertiary border-purple-200"
                              : "bg-blue-100 text-occean border-blue-200"
                          }`}
                        >
                          {user.role === "teacher" ? (
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              Teacher
                            </div>
                          ) : (
                            <div className="flex items-center gap-1">
                              <GraduationCap className="w-3 h-3" />
                              Student
                            </div>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          onClick={() => deleteUser(user.id)}
                          variant="outline"
                          size="sm"
                          className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
