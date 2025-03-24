import { useEffect, useState } from "react";
import axiosInstance from "../../lib/axiosInstance";
import Loading from "../../components/Loading";
import {
  Search,
  Filter,
  ChevronDown,
  User,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  MoreHorizontal,
  Download,
  ArrowUpDown,
  PlusCircle,
  RefreshCw,
  Clock,
} from "lucide-react";
import { toast } from "react-toastify";

const ListUser = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRole, setSelectedRole] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Tăng số lượng hiển thị

  // Sắp xếp
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "ascending",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const publisherRes = await axiosInstance.get(
          `/accounts/role/PUBLISHER`
        );
        const advertisersRes = await axiosInstance.get(
          `/accounts/role/ADVERTISERS`
        );

        const allUsers = [
          ...publisherRes.data.map((user) => ({ ...user, role: "PUBLISHER" })),
          ...advertisersRes.data.map((user) => ({
            ...user,
            role: "ADVERTISERS",
          })),
        ];

        setUsers(allUsers);
        setFilteredUsers(allUsers);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Bộ lọc theo Role
  const handleRoleFilter = (role) => {
    setSelectedRole(role);
    filterUsers(searchTerm, role);
  };

  // Tìm kiếm theo tên
  const handleSearch = (term) => {
    setSearchTerm(term);
    filterUsers(term, selectedRole);
  };

  // Lọc user theo Role & Search
  const filterUsers = (term, role) => {
    let filtered = users;
    if (role !== "ALL") {
      filtered = users.filter((user) => user.role === role);
    }
    if (term) {
      filtered = filtered.filter((user) =>
        user.username.toLowerCase().includes(term.toLowerCase())
      );
    }
    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset về trang đầu
  };

  // Xử lý phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Sắp xếp
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Danh sách đã sắp xếp
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const currentUsers = sortedUsers.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredUsers.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Mở modal chi tiết người dùng
  const openUserDetail = (user) => {
    setSelectedUser(user);
  };

  // Đóng modal
  const closeModal = () => {
    setSelectedUser(null);
  };

  // Xử lý thay đổi trạng thái người dùng
  const handleChangeStatus = async (userId, newStatus) => {
    try {
      await axiosInstance.put(
        `/accounts/changeStatus/${userId}/{status}?status=${newStatus}`
      );

      // Cập nhật trạng thái trong danh sách người dùng
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, status: newStatus } : user
        )
      );

      // Cập nhật trạng thái trong danh sách đã lọc
      setFilteredUsers(
        filteredUsers.map((user) =>
          user.id === userId ? { ...user, status: newStatus } : user
        )
      );

      // Cập nhật trạng thái trong modal chi tiết nếu đang mở
      if (selectedUser?.id === userId) {
        setSelectedUser({ ...selectedUser, status: newStatus });
      }

      toast.success(
        `Đã ${
          newStatus === "ACTIVE" ? "mở khóa" : "khóa"
        } tài khoản thành công!`
      );
    } catch (error) {
      console.error("Lỗi khi thay đổi trạng thái:", error);
      toast.error(
        error.response?.data?.message || "Đã xảy ra lỗi khi thay đổi trạng thái"
      );
    }
  };

  if (loading) return <Loading />;
  if (error) return <p className="text-center text-red-500">Lỗi: {error}</p>;

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Tiêu đề và điều khiển */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Quản Lý Người Dùng
            </h1>
            <p className="text-gray-500">
              Quản lý và giám sát tất cả người dùng trong hệ thống
            </p>
          </div>

          <div className="flex gap-3 mt-4 md:mt-0">
            <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-4 py-2 text-sm font-medium transition-all flex items-center">
              <PlusCircle className="h-4 w-4 mr-2" />
              Thêm Người Dùng
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg px-4 py-2 text-sm font-medium transition-all flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Xuất Danh Sách
            </button>
          </div>
        </div>

        {/* Bộ lọc và tìm kiếm */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Tìm kiếm người dùng theo tên..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>

            <div className="relative">
              <select
                value={selectedRole}
                onChange={(e) => handleRoleFilter(e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-8 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="ALL">Tất cả vai trò</option>
                <option value="PUBLISHER">Nhà xuất bản</option>
                <option value="ADVERTISERS">Nhà quảng cáo</option>
              </select>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="md:ml-2 px-4 py-2 bg-gray-50 rounded-lg text-gray-500 hover:bg-gray-100 flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="hidden md:inline">Làm mới</span>
            </button>
          </div>
        </div>

        {/* Bảng người dùng */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("id")}
                  >
                    <div className="flex items-center gap-1">
                      ID <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("username")}
                  >
                    <div className="flex items-center gap-1">
                      Tên người dùng <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("email")}
                  >
                    <div className="flex items-center gap-1">
                      Email <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("role")}
                  >
                    <div className="flex items-center gap-1">
                      Vai trò <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("status")}
                  >
                    <div className="flex items-center justify-center gap-1">
                      Trạng thái <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        #{user.id}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                          <User className="h-4 w-4 text-gray-500" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {user.username}
                          </div>
                          <div className="text-xs text-gray-500">
                            {user.phoneNumber || "Chưa cập nhật"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${
                          user.role === "PUBLISHER"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {user.role === "PUBLISHER"
                          ? "Nhà xuất bản"
                          : "Nhà quảng cáo"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${
                          user.status === "ACTIVE"
                            ? "bg-green-100 text-green-800"
                            : user.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-800"
                            : user.status === "LOCKED"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {user.status === "ACTIVE"
                          ? "Hoạt động"
                          : user.status === "PENDING"
                          ? "Chờ duyệt"
                          : user.status === "LOCKED"
                          ? "Đã khóa"
                          : user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => openUserDetail(user)}
                          className="p-1 rounded-full text-blue-600 hover:bg-blue-100"
                          title="Xem chi tiết"
                        >
                          <Eye className="h-5 w-5" />
                        </button>

                        {user.status === "PENDING" && (
                          <>
                            <button
                              className="p-1 rounded-full text-green-600 hover:bg-green-100"
                              title="Phê duyệt"
                            >
                              <CheckCircle className="h-5 w-5" />
                            </button>
                            <button
                              className="p-1 rounded-full text-red-600 hover:bg-red-100"
                              title="Từ chối"
                            >
                              <XCircle className="h-5 w-5" />
                            </button>
                          </>
                        )}

                        <button
                          className="p-1 rounded-full text-gray-600 hover:bg-gray-100"
                          title="Thêm tùy chọn"
                        >
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {currentUsers.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-10 text-center">
                      <div className="flex flex-col items-center">
                        <AlertTriangle className="h-10 w-10 text-gray-300 mb-2" />
                        <p className="text-gray-500">
                          Không tìm thấy người dùng nào
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Phân trang */}
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-500">
            Hiển thị {indexOfFirstItem + 1} -{" "}
            {Math.min(indexOfLastItem, filteredUsers.length)} trên tổng số{" "}
            {filteredUsers.length} người dùng
          </div>
          <div className="flex gap-2">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-200 rounded-md text-sm text-gray-600 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Trước
            </button>

            {Array.from(
              {
                length: Math.min(
                  3,
                  Math.ceil(filteredUsers.length / itemsPerPage)
                ),
              },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 border rounded-md text-sm ${
                    currentPage === i + 1
                      ? "border-transparent text-white bg-orange-500 hover:bg-orange-600"
                      : "border-gray-200 text-gray-600 bg-white hover:bg-gray-50"
                  }`}
                >
                  {i + 1}
                </button>
              )
            )}

            <button
              onClick={nextPage}
              disabled={
                currentPage >= Math.ceil(filteredUsers.length / itemsPerPage)
              }
              className="px-3 py-1 border border-gray-200 rounded-md text-sm text-gray-600 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sau
            </button>
          </div>
        </div>
      </div>

      {/* Modal Chi tiết người dùng */}
      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">
                  Thông Tin Người Dùng
                </h2>
                <button
                  onClick={closeModal}
                  className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                  <User className="h-8 w-8 text-gray-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {selectedUser.username}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                      ${
                        selectedUser.role === "PUBLISHER"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {selectedUser.role === "PUBLISHER"
                        ? "Nhà xuất bản"
                        : "Nhà quảng cáo"}
                    </span>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                      ${
                        selectedUser.status === "ACTIVE"
                          ? "bg-green-100 text-green-800"
                          : selectedUser.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : selectedUser.status === "BLOCKED"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {selectedUser.status === "ACTIVE"
                        ? "Hoạt động"
                        : selectedUser.status === "PENDING"
                        ? "Chờ duyệt"
                        : selectedUser.status === "BLOCKED"
                        ? "Đã khóa"
                        : selectedUser.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Thông tin cơ bản
                    </h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">ID:</span>
                          <span className="text-sm font-medium">
                            {selectedUser.id}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Email:</span>
                          <span className="text-sm font-medium">
                            {selectedUser.email}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">
                            Số điện thoại:
                          </span>
                          <span className="text-sm font-medium">
                            {selectedUser.phoneNumber || "Chưa cập nhật"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">
                            Ngày tham gia:
                          </span>
                          <span className="text-sm font-medium flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {new Date().toLocaleDateString() ||
                              "Không xác định"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Thông tin bổ sung
                    </h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      {selectedUser.role === "PUBLISHER" && (
                        <div className="grid grid-cols-1 gap-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">
                              Thông tin thanh toán:
                            </span>
                            <span className="text-sm font-medium">
                              {selectedUser.publisher?.paymentInfo ||
                                "Chưa cập nhật"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">
                              Mã giới thiệu:
                            </span>
                            <span className="text-sm font-medium">
                              {selectedUser.publisher?.referralCode ||
                                "Chưa cập nhật"}
                            </span>
                          </div>
                        </div>
                      )}

                      {selectedUser.role === "ADVERTISERS" && (
                        <div className="grid grid-cols-1 gap-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">
                              Công ty:
                            </span>
                            <span className="text-sm font-medium">
                              {selectedUser.advertisers?.companyName ||
                                "Chưa cập nhật"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">
                              Thông tin thanh toán:
                            </span>
                            <span className="text-sm font-medium">
                              {selectedUser.advertisers?.billingInfo ||
                                "Chưa cập nhật"}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100">
              <div className="flex justify-end gap-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
                >
                  Đóng
                </button>

                {selectedUser.status === "PENDING" && (
                  <>
                    <button
                      onClick={() =>
                        handleChangeStatus(selectedUser.id, "LOCKED")
                      }
                      className="px-4 py-2 border border-red-200 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      Từ chối
                    </button>
                    <button
                      onClick={() =>
                        handleChangeStatus(selectedUser.id, "ACTIVE")
                      }
                      className="px-4 py-2 bg-green-500 rounded-lg text-sm font-medium text-white hover:bg-green-600"
                    >
                      Phê duyệt
                    </button>
                  </>
                )}

                {selectedUser.status === "ACTIVE" && (
                  <button
                    onClick={() =>
                      handleChangeStatus(selectedUser.id, "LOCKED")
                    }
                    className="px-4 py-2 bg-red-500 rounded-lg text-sm font-medium text-white hover:bg-red-600"
                  >
                    Khóa tài khoản
                  </button>
                )}

                {selectedUser.status === "LOCKED" && (
                  <button
                    onClick={() =>
                      handleChangeStatus(selectedUser.id, "ACTIVE")
                    }
                    className="px-4 py-2 bg-green-500 rounded-lg text-sm font-medium text-white hover:bg-green-600"
                  >
                    Mở khóa tài khoản
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListUser;
