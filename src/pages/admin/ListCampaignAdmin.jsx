import { useEffect, useState } from "react";
import axiosInstance from "../../lib/axiosInstance";
import Loading from "../../components/Loading";
import AdminDetailCampaign from "./AdminDetailCampaign";
import {
  Search,
  Filter,
  ChevronDown,
  Megaphone,
  CheckCircle,
  XCircle,
  Eye,
  AlertTriangle,
  Calendar,
  ArrowUpDown,
  DollarSign,
  Clock,
  Download,
  MoreHorizontal,
} from "lucide-react";

const ListCampaignAdmin = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "ascending",
  });
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axiosInstance.get(`/api/advertiser/campaigns`);
        setCampaigns(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  // Mở modal chi tiết
  const openCampaignDetail = (id) => {
    setSelectedCampaignId(id);
  };

  // Đóng modal
  const closeCampaignDetail = () => {
    setSelectedCampaignId(null);
  };

  // Lọc danh sách theo trạng thái và tìm kiếm
  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesStatus =
      filterStatus === "ALL" || campaign.status === filterStatus;
    const matchesSearch =
      searchTerm === "" ||
      campaign.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(campaign.id).includes(searchTerm);

    return matchesStatus && matchesSearch;
  });

  // Sắp xếp chiến dịch
  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
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

  // Cập nhật trạng thái chiến dịch
  const updateCampaignStatus = async (id, status) => {
    if (actionLoading) return;

    setActionLoading(true);
    try {
      await axiosInstance.put(
        `/api/advertiser/campaigns/updateStatus/${id}?status=${status}`
      );

      // Cập nhật state
      setCampaigns(campaigns.map((c) => (c.id === id ? { ...c, status } : c)));
    } catch (err) {
      console.error(`Error updating campaign status to ${status}:`, err);
    } finally {
      setActionLoading(false);
    }
  };

  // Duyệt chiến dịch
  const handleApprove = async (id) => {
    await updateCampaignStatus(id, "APPROVED");
  };

  // Từ chối chiến dịch
  const handleReject = async (id) => {
    await updateCampaignStatus(id, "REJECTED");
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
              Quản Lý Chiến Dịch
            </h1>
            <p className="text-gray-500">
              Quản lý, duyệt và theo dõi tất cả chiến dịch trong hệ thống
            </p>
          </div>

          <div className="flex gap-3 mt-4 md:mt-0">
            {/* <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-4 py-2 text-sm font-medium transition-all flex items-center">
              <PlusCircle className="h-4 w-4 mr-2" />
              Tạo Chiến Dịch
            </button> */}
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg px-4 py-2 text-sm font-medium transition-all flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Xuất Dữ Liệu
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
                placeholder="Tìm kiếm chiến dịch theo tên hoặc ID..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-4">
              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="appearance-none bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-8 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="ALL">Tất cả trạng thái</option>
                  <option value="PENDING">Đang chờ duyệt</option>
                  <option value="APPROVED">Đã phê duyệt</option>
                  <option value="REJECTED">Bị từ chối</option>
                  <option value="ACTIVE">Đang hoạt động</option>
                  <option value="ENDED">Đã kết thúc</option>
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-4 w-4 text-gray-400" />
                </div>
                <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="relative">
                <select className="appearance-none bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-8 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                  <option>Tháng này</option>
                  <option>Quý này</option>
                  <option>Năm nay</option>
                  <option>Tất cả thời gian</option>
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-4 w-4 text-gray-400" />
                </div>
                <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bảng chiến dịch */}
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
                    onClick={() => requestSort("title")}
                  >
                    <div className="flex items-center gap-1">
                      Chiến dịch <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("budget")}
                  >
                    <div className="flex items-center justify-end gap-1">
                      Ngân sách <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("commissionValue")}
                  >
                    <div className="flex items-center justify-end gap-1">
                      Hoa hồng <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("startDate")}
                  >
                    <div className="flex items-center justify-center gap-1">
                      Ngày bắt đầu <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("endDate")}
                  >
                    <div className="flex items-center justify-center gap-1">
                      Ngày kết thúc <ArrowUpDown className="h-3 w-3" />
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
                {sortedCampaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        #{campaign.id}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                          <Megaphone className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {campaign.title}
                          </div>
                          <div className="text-xs text-gray-500">
                            {campaign.category || "Chưa phân loại"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm font-medium text-gray-900 flex items-center justify-end">
                        <DollarSign className="h-4 w-4 text-green-500 mr-1" />
                        {campaign.budget?.toLocaleString() || 0}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {campaign.commissionValue?.toLocaleString() || 0}
                      </div>
                      <div className="text-xs text-gray-500">
                        {campaign.commissionRate || "0%"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm text-gray-700 flex items-center justify-center">
                        <Clock className="h-4 w-4 text-blue-500 mr-1" />
                        {campaign.startDate || "Chưa xác định"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm text-gray-700">
                        {campaign.endDate || "Chưa xác định"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${
                          campaign.status === "APPROVED"
                            ? "bg-green-100 text-green-800"
                            : campaign.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-800"
                            : campaign.status === "REJECTED"
                            ? "bg-red-100 text-red-800"
                            : campaign.status === "ACTIVE"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {campaign.status === "APPROVED"
                          ? "Đã duyệt"
                          : campaign.status === "PENDING"
                          ? "Chờ duyệt"
                          : campaign.status === "REJECTED"
                          ? "Đã từ chối"
                          : campaign.status === "ACTIVE"
                          ? "Đang hoạt động"
                          : campaign.status === "ENDED"
                          ? "Đã kết thúc"
                          : campaign.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => openCampaignDetail(campaign.id)}
                          className="p-1 rounded-full text-blue-600 hover:bg-blue-100"
                          disabled={actionLoading}
                        >
                          <Eye className="h-5 w-5" />
                        </button>

                        {campaign.status === "PENDING" && (
                          <>
                            <button
                              onClick={() => handleApprove(campaign.id)}
                              className="p-1 rounded-full text-green-600 hover:bg-green-100"
                              disabled={actionLoading}
                            >
                              <CheckCircle className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleReject(campaign.id)}
                              className="p-1 rounded-full text-red-600 hover:bg-red-100"
                              disabled={actionLoading}
                            >
                              <XCircle className="h-5 w-5" />
                            </button>
                          </>
                        )}

                        <button className="p-1 rounded-full text-gray-600 hover:bg-gray-100">
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {sortedCampaigns.length === 0 && (
                  <tr>
                    <td colSpan="8" className="px-6 py-10 text-center">
                      <div className="flex flex-col items-center">
                        <AlertTriangle className="h-10 w-10 text-gray-300 mb-2" />
                        <p className="text-gray-500">
                          Không tìm thấy chiến dịch nào
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
            Hiển thị {sortedCampaigns.length} trên tổng số {campaigns.length}{" "}
            chiến dịch
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-200 rounded-md text-sm text-gray-600 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              Trước
            </button>
            <button className="px-3 py-1 border border-transparent rounded-md text-sm text-white bg-orange-500 hover:bg-orange-600">
              1
            </button>
            {/* <button className="px-3 py-1 border border-gray-200 rounded-md text-sm text-gray-600 bg-white hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 border border-gray-200 rounded-md text-sm text-gray-600 bg-white hover:bg-gray-50">
              3
            </button> */}
            <button className="px-3 py-1 border border-gray-200 rounded-md text-sm text-gray-600 bg-white hover:bg-gray-50">
              Sau
            </button>
          </div>
        </div>
      </div>

      {/* Sử dụng component AdminDetailCampaign thay vì Modal trực tiếp */}
      <AdminDetailCampaign
        campaignId={selectedCampaignId}
        isOpen={!!selectedCampaignId}
        onClose={closeCampaignDetail}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
};

export default ListCampaignAdmin;
