import { useState, useEffect } from "react";
import { Link } from "react-router";
import axiosInstance from "../../lib/axiosInstance";
import Loading from "../../components/Loading";
import {
  Search,
  Filter,
  ChevronDown,
  PlusCircle,
  ArrowUpDown,
  Clock,
  Edit,
  Eye,
  PlayCircle,
  PauseCircle,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Megaphone,
} from "lucide-react";
import useAuthStore from "../../store/useAuthStore";

export default function AdvertiserListCampaigns() {
  const { user } = useAuthStore();
  const advertiserId = user.id;
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "descending",
  });
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [updateStatusLoading, setUpdateStatusLoading] = useState(false);

  // Lấy danh sách chiến dịch
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `/api/advertisers/listCampaign/{id}?id=${advertiserId}`
        );
        setCampaigns(response.data);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách chiến dịch:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  // Cập nhật trạng thái chiến dịch (kích hoạt/tạm dừng)
  const handleUpdateStatus = async (id, newStatus) => {
    if (updateStatusLoading) return;

    setUpdateStatusLoading(true);
    try {
      await axiosInstance.put(
        `/api/advertiser/campaigns/updateStatus/${id}?status=${newStatus}`
      );

      // Cập nhật danh sách chiến dịch sau khi cập nhật trạng thái
      setCampaigns(
        campaigns.map((campaign) =>
          campaign.id === id ? { ...campaign, status: newStatus } : campaign
        )
      );
    } catch (err) {
      console.error(`Lỗi khi cập nhật trạng thái chiến dịch:`, err);
      setError(err.message);
    } finally {
      setUpdateStatusLoading(false);
    }
  };

  // Lọc chiến dịch theo trạng thái và từ khóa tìm kiếm
  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesStatus =
      filterStatus === "ALL" || campaign.status === filterStatus;
    const matchesSearch =
      searchTerm === "" ||
      campaign.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(campaign.id).includes(searchTerm);

    return matchesStatus && matchesSearch;
  });

  // Sắp xếp danh sách chiến dịch
  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    if (!a[sortConfig.key] || !b[sortConfig.key]) return 0;

    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  // Thay đổi sắp xếp
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Hiển thị icon trạng thái
  const renderStatusIcon = (status) => {
    switch (status) {
      case "APPROVED":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "PENDING":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "REJECTED":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "ACTIVE":
        return <PlayCircle className="h-4 w-4 text-blue-500" />;
      case "PAUSED":
        return <PauseCircle className="h-4 w-4 text-orange-500" />;
      case "ENDED":
        return <AlertTriangle className="h-4 w-4 text-gray-500" />;
      default:
        return <Megaphone className="h-4 w-4 text-gray-500" />;
    }
  };

  // Text trạng thái
  const getStatusText = (status) => {
    switch (status) {
      case "APPROVED":
        return "Đã duyệt";
      case "PENDING":
        return "Chờ duyệt";
      case "REJECTED":
        return "Đã từ chối";
      case "ACTIVE":
        return "Đang hoạt động";
      case "PAUSED":
        return "Tạm dừng";
      case "ENDED":
        return "Đã kết thúc";
      default:
        return status;
    }
  };

  // CSS trạng thái
  const getStatusClass = (status) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      case "ACTIVE":
        return "bg-blue-100 text-blue-800";
      case "PAUSED":
        return "bg-orange-100 text-orange-800";
      case "ENDED":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="min-h-screen pt-20 pb-10 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            Lỗi: {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-10 px-4 md:px-8 lg:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Chiến dịch của tôi
            </h1>
            <p className="text-gray-500 mt-1">
              Quản lý và theo dõi các chiến dịch quảng cáo
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              to="/advertiser/campaign/create"
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <PlusCircle className="h-5 w-5" />
              <span>Tạo chiến dịch mới</span>
            </Link>
          </div>
        </div>

        {/* Bộ lọc và tìm kiếm */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative w-full md:w-72">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên hoặc ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <div className="relative">
              <button
                onClick={() => setFilterMenuOpen(!filterMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                <Filter className="h-4 w-4 text-gray-500" />
                <span>
                  Trạng thái:{" "}
                  {filterStatus === "ALL"
                    ? "Tất cả"
                    : getStatusText(filterStatus)}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>
              {filterMenuOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 py-1">
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setFilterStatus("ALL");
                      setFilterMenuOpen(false);
                    }}
                  >
                    Tất cả
                  </button>
                  {[
                    "PENDING",
                    "APPROVED",
                    "REJECTED",
                    "ACTIVE",
                    "PAUSED",
                    "ENDED",
                  ].map((status) => (
                    <button
                      key={status}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => {
                        setFilterStatus(status);
                        setFilterMenuOpen(false);
                      }}
                    >
                      {getStatusText(status)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setSortMenuOpen(!sortMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                <ArrowUpDown className="h-4 w-4 text-gray-500" />
                <span>Sắp xếp theo</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>
              {sortMenuOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 py-1">
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      requestSort("createdAt");
                      setSortMenuOpen(false);
                    }}
                  >
                    Ngày tạo
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      requestSort("startDate");
                      setSortMenuOpen(false);
                    }}
                  >
                    Ngày bắt đầu
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      requestSort("budget");
                      setSortMenuOpen(false);
                    }}
                  >
                    Ngân sách
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      requestSort("title");
                      setSortMenuOpen(false);
                    }}
                  >
                    Tên chiến dịch
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Danh sách chiến dịch */}
        {sortedCampaigns.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Megaphone className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Bạn chưa có chiến dịch nào
            </h3>
            <p className="text-gray-500 mb-6">
              Bắt đầu tạo chiến dịch quảng cáo đầu tiên của bạn để tiếp cận
              khách hàng
            </p>
            <Link
              to="/advertiser/campaign/create"
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <PlusCircle className="h-5 w-5" />
              <span>Tạo chiến dịch mới</span>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Chiến dịch
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Trạng thái
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Ngân sách
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Hoa hồng
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Bắt đầu
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Kết thúc
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedCampaigns.map((campaign) => (
                    <tr key={campaign.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                            <Megaphone className="h-5 w-5 text-orange-500" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {campaign.title}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              <span>ID: {campaign.id}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(
                              campaign.status
                            )}`}
                          >
                            {renderStatusIcon(campaign.status)}
                            <span className="ml-1">
                              {getStatusText(campaign.status)}
                            </span>
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm font-medium text-gray-900">
                          ${campaign.budget?.toLocaleString() || 0}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm font-medium text-gray-900">
                          ${campaign.commissionValue?.toLocaleString() || 0}
                        </div>
                        <div className="text-xs text-gray-500">
                          {campaign.commissionRate || 0}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm text-gray-700">
                          {campaign.startDate || "Chưa xác định"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm text-gray-700">
                          {campaign.endDate || "Chưa xác định"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex justify-center space-x-2">
                          <Link
                            to={`/advertiser/campaign/${campaign.id}`}
                            className="p-1 rounded-full hover:bg-gray-100"
                            title="Xem chi tiết"
                          >
                            <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                          </Link>

                          {campaign.status === "APPROVED" && (
                            <button
                              className="p-1 rounded-full hover:bg-gray-100"
                              onClick={() =>
                                handleUpdateStatus(
                                  campaign.id,
                                  campaign.status === "ACTIVE"
                                    ? "APPROVED"
                                    : "ACTIVE"
                                )
                              }
                              disabled={updateStatusLoading}
                              title={
                                campaign.status === "ACTIVE"
                                  ? "Tạm dừng"
                                  : "Kích hoạt"
                              }
                            >
                              {campaign.status === "ACTIVE" ? (
                                <PauseCircle className="h-4 w-4 text-gray-400 hover:text-yellow-600" />
                              ) : (
                                <PlayCircle className="h-4 w-4 text-gray-400 hover:text-green-600" />
                              )}
                            </button>
                          )}

                          <Link
                            to={`/advertiser/campaign/edit/${campaign.id}`}
                            className="p-1 rounded-full hover:bg-gray-100"
                            title="Chỉnh sửa"
                          >
                            <Edit className="h-4 w-4 text-gray-400 hover:text-blue-600" />
                          </Link>

                          <button
                            className="p-1 rounded-full hover:bg-gray-100"
                            title="Tùy chọn khác"
                          >
                            <MoreHorizontal className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Ghi chú */}
        <div className="mt-6 text-sm text-gray-500">
          <p>
            <span className="font-medium">Lưu ý:</span> Chiến dịch sau khi được
            quản trị viên phê duyệt sẽ có thể được kích hoạt.
          </p>
        </div>
      </div>
    </div>
  );
}
