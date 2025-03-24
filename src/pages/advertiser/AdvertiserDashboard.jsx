import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  MousePointer,
  ChevronDown,
  Search,
  Filter,
  Plus,
  Eye,
  Users,
  Target,
  Calendar,
  PieChart,
  MoreHorizontal,
  Edit,
  PauseCircle,
  PlayCircle,
  Share2,
} from "lucide-react";
import useAuthStore from "../../store/useAuthStore";
import axiosInstance from "../../lib/axiosInstance";

export default function AdvertiserDashboard() {
  const { user } = useAuthStore();
  const [timeRange] = useState("Tháng này");
  const [viewMode, setViewMode] = useState("all");
  const [myCampaigns, setMyCampaigns] = useState([]);
  const [displayCampaigns, setDisplayCampaigns] = useState([]);

  useEffect(() => {
    const fetchMyCampaigns = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/advertisers/listCampaign/{id}?id=${user.id}`
        );
        setMyCampaigns(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchMyCampaigns();
  }, [user.id]);

  // Cập nhật danh sách chiến dịch lọc theo viewMode
  useEffect(() => {
    if (viewMode === "all") {
      setDisplayCampaigns(myCampaigns);
    } else {
      setDisplayCampaigns(
        myCampaigns.filter(
          (campaign) => campaign.status === viewMode.toUpperCase()
        )
      );
    }
  }, [myCampaigns, viewMode]);

  // Dữ liệu mẫu cho biểu đồ
  const spendData = [
    2800, 3500, 2900, 4100, 3700, 5200, 4600, 5800, 4900, 6400, 5500, 6900,
  ];
  const maxSpend = Math.max(...spendData);

  // Thống kê tổng quát
  const totalBudget = myCampaigns.reduce(
    (sum, campaign) => sum + (campaign.budget || 0),
    0
  );
  const totalCommission = myCampaigns.reduce(
    (sum, campaign) => sum + (campaign.commissionValue || 0),
    0
  );
  const totalPending = myCampaigns.filter(
    (campaign) => campaign.status === "PENDING"
  ).length;
  const totalApproved = myCampaigns.filter(
    (campaign) => campaign.status === "APPROVED"
  ).length;

  console.log("user", user);
  console.log("myCampaigns", myCampaigns);

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Tiêu đề và nút tạo chiến dịch */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Bảng Điều Khiển
            </h1>
            <p className="text-gray-500">
              Quản lý và tối ưu hóa chiến dịch quảng cáo của bạn
            </p>
          </div>

          <div className="flex gap-3 mt-4 md:mt-0">
            <div className="relative">
              <button className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                <Calendar className="h-4 w-4 text-gray-500" />
                {timeRange}
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>
            </div>

            <Link
              to="/advertiser/campaign/create"
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-4 py-2 text-sm font-medium transition-all flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tạo Chiến Dịch Mới
            </Link>
          </div>
        </div>

        {/* Thẻ thống kê */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Lượt Click
                </p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {totalApproved + totalPending}
                </h3>
                <div className="flex items-center gap-1 mt-2">
                  <div className="text-xs font-medium text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    22.4%
                  </div>
                  <span className="text-xs text-gray-500">
                    so với tháng trước
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <MousePointer className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Chuyển Đổi
                </p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {totalApproved}
                </h3>
                <div className="flex items-center gap-1 mt-2">
                  <div className="text-xs font-medium text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    15.8%
                  </div>
                  <span className="text-xs text-gray-500">
                    so với tháng trước
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Target className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Tỷ Lệ Click (CTR)
                </p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {(
                    (totalApproved / (totalApproved + totalPending)) *
                    100
                  ).toFixed(2)}
                  %
                </h3>
                <div className="flex items-center gap-1 mt-2">
                  <div className="text-xs font-medium text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    1.2%
                  </div>
                  <span className="text-xs text-gray-500">
                    so với tháng trước
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-purple-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Tổng Hoa Hồng
                </p>
                <h3 className="text-2xl font-bold text-gray-800">
                  ${totalCommission.toFixed(2)}
                </h3>
                <div className="flex items-center gap-1 mt-2">
                  <div className="text-xs font-medium text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    18.2%
                  </div>
                  <span className="text-xs text-gray-500">
                    so với tháng trước
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-orange-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Tổng Ngân Sách
                </p>
                <h3 className="text-2xl font-bold text-gray-800">
                  ${totalBudget.toFixed(2)}
                </h3>
                <div className="flex items-center gap-1 mt-2">
                  <div className="text-xs font-medium text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    18.2%
                  </div>
                  <span className="text-xs text-gray-500">
                    so với tháng trước
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-orange-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Biểu đồ chi tiêu và hiệu suất */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Biểu đồ chi tiêu */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Chi Tiêu Theo Tháng
              </h3>
              <div className="flex gap-2">
                <button className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200">
                  30 Ngày
                </button>
                <button className="text-xs font-medium text-white bg-orange-500 px-3 py-1 rounded-full">
                  Năm 2025
                </button>
              </div>
            </div>

            <div className="h-[240px] flex items-end justify-between gap-1">
              {spendData.map((spend, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center"
                >
                  <div className="group">
                    <div
                      className="w-8 bg-orange-500 rounded-t-sm hover:bg-orange-600 transition-all relative"
                      style={{ height: `${(spend / maxSpend) * 180}px` }}
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap transition-opacity">
                        ${spend}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 mt-2">
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Phân phối ngân sách */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Phân Phối Ngân Sách
              </h3>
            </div>

            <div className="flex justify-center mb-6">
              <div className="relative w-40 h-40">
                <PieChart className="w-full h-full text-gray-200" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-2xl font-bold text-gray-800">
                      ${totalBudget.toFixed(0)}
                    </span>
                    <p className="text-xs text-gray-500">Tổng chi tiêu</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-700">Đã duyệt</span>
                </div>
                <span className="text-sm font-medium">
                  ${totalBudget.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-700">Đang chạy</span>
                </div>
                <span className="text-sm font-medium">
                  ${totalBudget.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-700">Tạm dừng</span>
                </div>
                <span className="text-sm font-medium">
                  ${totalBudget.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-700">Chờ duyệt</span>
                </div>
                <span className="text-sm font-medium">
                  ${totalBudget.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bảng chiến dịch */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Chiến Dịch
                </h3>

                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    className={`px-3 py-1 text-sm rounded-md ${
                      viewMode === "all"
                        ? "bg-white shadow-sm text-gray-800"
                        : "text-gray-600"
                    }`}
                    onClick={() => setViewMode("all")}
                  >
                    Tất cả
                  </button>
                  <button
                    className={`px-3 py-1 text-sm rounded-md ${
                      viewMode === "active"
                        ? "bg-white shadow-sm text-gray-800"
                        : "text-gray-600"
                    }`}
                    onClick={() => setViewMode("active")}
                  >
                    Đang chạy
                  </button>
                  <button
                    className={`px-3 py-1 text-sm rounded-md ${
                      viewMode === "pending"
                        ? "bg-white shadow-sm text-gray-800"
                        : "text-gray-600"
                    }`}
                    onClick={() => setViewMode("pending")}
                  >
                    Đợi duyệt
                  </button>
                  <button
                    className={`px-3 py-1 text-sm rounded-md ${
                      viewMode === "paused"
                        ? "bg-white shadow-sm text-gray-800"
                        : "text-gray-600"
                    }`}
                    onClick={() => setViewMode("paused")}
                  >
                    Tạm dừng
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <div className="relative flex-1 sm:max-w-[240px]">
                  <input
                    type="text"
                    placeholder="Tìm chiến dịch..."
                    className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>

                <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg px-4 py-2 text-sm font-medium transition-all">
                  <Filter className="h-4 w-4" />
                  Lọc
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Chiến dịch
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngân sách
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hoa hồng
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày bắt đầu
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày kết thúc
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayCampaigns.length > 0 ? (
                  displayCampaigns.map((campaign) => (
                    <tr key={campaign.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`campaign/${campaign.id}`}>
                          <div className="flex items-start">
                            <div className="ml-0">
                              <div className="text-sm font-medium text-gray-900">
                                {campaign.title}
                              </div>
                              <div className="text-xs text-gray-500">
                                {campaign.targetAudience || "Chưa xác định"}
                              </div>
                            </div>
                          </div>
                        </Link>
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
                          <button className="p-1 rounded-full hover:bg-gray-100">
                            <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                          </button>
                          {campaign.status === "APPROVED" && (
                            <button className="p-1 rounded-full hover:bg-gray-100">
                              {campaign.status === "ACTIVE" ? (
                                <PauseCircle className="h-4 w-4 text-gray-400 hover:text-yellow-600" />
                              ) : (
                                <PlayCircle className="h-4 w-4 text-gray-400 hover:text-green-600" />
                              )}
                            </button>
                          )}
                          <button className="p-1 rounded-full hover:bg-gray-100">
                            <Edit className="h-4 w-4 text-gray-400 hover:text-blue-600" />
                          </button>
                          <button className="p-1 rounded-full hover:bg-gray-100">
                            <MoreHorizontal className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-10 text-center">
                      <div className="flex flex-col items-center">
                        <p className="text-gray-500 mb-4">
                          Bạn chưa có chiến dịch nào
                        </p>
                        <Link
                          to="/advertiser/campaign/create"
                          className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-4 py-2 text-sm font-medium transition-all flex items-center"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Tạo Chiến Dịch Mới
                        </Link>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="flex items-center">
              <p className="text-sm text-gray-700">
                Hiển thị <span className="font-medium">1</span> đến{" "}
                <span className="font-medium">{displayCampaigns.length}</span>{" "}
                của <span className="font-medium">{myCampaigns.length}</span>{" "}
                kết quả
              </p>
            </div>
            <div className="flex gap-2">
              <button
                className="border border-gray-300 rounded-md px-3 py-1 text-sm bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                disabled
              >
                Trước
              </button>
              <button
                className="border border-gray-300 rounded-md px-3 py-1 text-sm bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                disabled
              >
                Tiếp
              </button>
            </div>
          </div>
        </div>

        {/* Hành động nhanh */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 flex items-center gap-3 w-full md:w-auto cursor-pointer hover:shadow-md transition-all">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Plus className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-800">
                Tạo chiến dịch
              </h4>
              <p className="text-xs text-gray-500">Bắt đầu quảng cáo ngay</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 flex items-center gap-3 w-full md:w-auto cursor-pointer hover:shadow-md transition-all">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-800">
                Đối tượng mục tiêu
              </h4>
              <p className="text-xs text-gray-500">Quản lý đối tượng</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 flex items-center gap-3 w-full md:w-auto cursor-pointer hover:shadow-md transition-all">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-800">
                Báo cáo chi tiết
              </h4>
              <p className="text-xs text-gray-500">Phân tích dữ liệu</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 flex items-center gap-3 w-full md:w-auto cursor-pointer hover:shadow-md transition-all">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Share2 className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-800">
                Mời cộng tác viên
              </h4>
              <p className="text-xs text-gray-500">Mở rộng tiếp cận</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
