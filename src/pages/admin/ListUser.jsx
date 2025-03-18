import { useEffect, useState } from "react";
import axiosInstance from "../../lib/axiosInstance";
import Loading from "../../components/Loading";

const ListUser = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRole, setSelectedRole] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Số user mỗi trang

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
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

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

  if (loading) return <Loading />;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen pt-20 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold text-center mb-4">User List</h1>

      {/* Tìm kiếm và lọc */}
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="border border-gray-300 px-3 py-1 rounded w-64"
        />
        <select
          value={selectedRole}
          onChange={(e) => handleRoleFilter(e.target.value)}
          className="border border-gray-300 px-3 py-1 rounded"
        >
          <option value="ALL">All</option>
          <option value="PUBLISHER">Publisher</option>
          <option value="ADVERTISERS">Advertiser</option>
        </select>
      </div>

      {/* Bảng danh sách User */}
      <div className="overflow-x-auto w-full max-w-6xl">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Username</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Phone Number</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Role</th>
              <th className="border border-gray-300 px-4 py-2">
                Additional Info
              </th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.username}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.phoneNumber}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.status}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.role}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.role === "PUBLISHER" && (
                    <span>
                      Payment Info: {user.publisher?.paymentInfo || "N/A"},
                      Referral Code: {user.publisher?.referralCode || "N/A"}
                    </span>
                  )}
                  {user.role === "ADVERTISERS" && (
                    <span>
                      Company: {user.advertisers?.companyName || "N/A"}, Billing
                      Info: {user.advertisers?.billingInfo || "N/A"}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Điều hướng phân trang */}
      <div className="mt-4 flex justify-center items-center space-x-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(filteredUsers.length / itemsPerPage)}
        </span>
        <button
          onClick={nextPage}
          disabled={
            currentPage >= Math.ceil(filteredUsers.length / itemsPerPage)
          }
          className="px-4 py-2 border rounded bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ListUser;
