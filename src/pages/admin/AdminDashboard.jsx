import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router";
import useAuthStore from "../../store/useAuthStore";
import axiosInstance from "../../lib/axiosInstance";
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Users,
  Calendar,
  Activity,
  Bell,
  Layers,
  User,
  Settings,
  ChevronDown,
  Filter,
  ArrowUpRight,
  Flag,
  ShieldAlert,
  Megaphone,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const [timeRange] = useState("7 ngày qua");
  const [totalUsers, setTotalUsers] = useState({});
  const [totalCampaigns, setTotalCampaigns] = useState({});
  const [campaignData, setCampaignsData] = useState([]);
  const [newUsers, setNewUsers] = useState([]);
  const [usersData, setUsersData] = useState([]);
  //fetchTotalUsers
  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await axiosInstance.get(`/accounts/stats`);
        setTotalUsers(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchTotalUsers();
  }, []);

  //fetchTotalCampaigns
  useEffect(() => {
    const fetchTotalCampaigns = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/advertiser/campaigns/stats`
        );
        setTotalCampaigns(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchTotalCampaigns();
  }, []);

  //fetchCampaignsData
  useEffect(() => {
    const fetchCampaignsData = async () => {
      try {
        const response = await axiosInstance.get(`/api/advertiser/campaigns`);
        setCampaignsData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchCampaignsData();
  }, []);

  //fetchUsersData
  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await axiosInstance.get(`/accounts`);
        setUsersData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchUsersData();
  }, []);

  //fetchNewUsers
  useEffect(() => {
    const fetchNewUsers = async () => {
      try {
        const response = await axiosInstance.get(`/accounts/recentAccounts`);
        setNewUsers(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchNewUsers();
  }, []);

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Dữ liệu mẫu
  const revenueData = [12500, 15200, 18700, 16400, 19300, 23600, 25800];
  const maxRevenue = Math.max(...revenueData);

  // Thống kê tổng quan
  const statistics = {
    totalRevenue: 145780.25,
    pendingUsers: 17,
    pendingPayouts: 65,
  };

  const systemAlerts = [
    {
      id: 1,
      title: "Phát hiện hoạt động đáng ngờ",
      description:
        "Nhiều lượt click bất thường từ cùng một IP cho chiến dịch #1258",
      level: "high",
      time: "2 giờ trước",
    },
    {
      id: 2,
      title: "Lỗi thanh toán",
      description:
        "Không thể xử lý 3 yêu cầu thanh toán do API bên thứ ba gặp sự cố",
      level: "medium",
      time: "5 giờ trước",
    },
    {
      id: 3,
      title: "Cập nhật hệ thống",
      description: "Hệ thống sẽ được cập nhật vào 02:00 ngày 25/03/2025",
      level: "low",
      time: "1 ngày trước",
    },
  ];
  console.log("totalCampaigns", totalCampaigns);
  console.log("campaignData", campaignData);
  console.log("usersData", usersData);

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Tiêu đề và điều khiển */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Bảng Điều Khiển Quản Trị
              </h1>
              <div className="flex items-center gap-1 text-xs text-white bg-orange-500 px-2 py-1 rounded-full">
                <Bell className="h-3 w-3" />
                {totalCampaigns.PENDING}
              </div>
            </div>
            <p className="text-gray-500">
              Quản lý hệ thống, người dùng và chiến dịch của bạn
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

            <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-4 py-2 text-sm font-medium transition-all flex items-center">
              <Activity className="h-4 w-4 mr-2" />
              Báo Cáo Hệ Thống
            </button>
          </div>
        </div>

        {/* Thống kê tổng quan */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Doanh thu */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Tổng Doanh Thu
                </p>
                <h3 className="text-2xl font-bold text-gray-800">
                  ${statistics.totalRevenue.toLocaleString()}
                </h3>
                <div className="flex items-center gap-1 mt-2">
                  <div className="text-xs font-medium text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    16.8%
                  </div>
                  <span className="text-xs text-gray-500">
                    so với tuần trước
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-orange-500" />
              </div>
            </div>
          </div>
          {/* User */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Tổng Người Dùng
                </p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {totalUsers.totalAccounts - 1}
                </h3>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-xs text-gray-500">
                      Advertiser: {totalUsers.totalPublishers}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-xs text-gray-500">
                      Publisher: {totalUsers.totalAdvertisers}
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </div>
          {/* Campaigns */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Tổng Chiến Dịch
                </p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {totalCampaigns.Total}
                </h3>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-500">
                      Hoạt động: {totalCampaigns.APPROVED}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-xs text-gray-500">
                      Chờ duyệt: {totalCampaigns.PENDING}
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Layers className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </div>
          {/* Cần xử lý */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Cần Xử Lý
                </p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {totalCampaigns.PENDING}
                </h3>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-xs text-gray-500">Người dùng: 0</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-xs text-gray-500">
                      Chiến dịch: {totalCampaigns.PENDING}
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Flag className="h-5 w-5 text-purple-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Biểu đồ và cảnh báo hệ thống */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Biểu đồ doanh thu */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Doanh Thu Hệ Thống
              </h3>
              <div className="flex gap-2">
                <button className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200">
                  Ngày
                </button>
                <button className="text-xs font-medium text-white bg-orange-500 px-3 py-1 rounded-full">
                  Tuần
                </button>
                <button className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200">
                  Tháng
                </button>
              </div>
            </div>

            <div className="h-[240px] flex items-end justify-between gap-1">
              {revenueData.map((revenue, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center"
                >
                  <div className="group">
                    <div
                      className="w-12 bg-orange-500 rounded-t-sm hover:bg-orange-600 transition-all relative"
                      style={{ height: `${(revenue / maxRevenue) * 180}px` }}
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap transition-opacity">
                        ${revenue.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 mt-2">
                    T{index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* Cảnh báo hệ thống */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Cảnh Báo Hệ Thống
              </h3>
              <button className="text-xs text-orange-500 font-medium hover:underline">
                Xem tất cả
              </button>
            </div>

            <div className="space-y-4">
              {systemAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-3 border border-gray-100 rounded-lg hover:shadow-sm transition-all"
                >
                  <div className="flex items-start">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                        alert.level === "high"
                          ? "bg-red-100"
                          : alert.level === "medium"
                          ? "bg-yellow-100"
                          : "bg-blue-100"
                      }`}
                    >
                      <ShieldAlert
                        className={`h-4 w-4 ${
                          alert.level === "high"
                            ? "text-red-500"
                            : alert.level === "medium"
                            ? "text-yellow-500"
                            : "text-blue-500"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {alert.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {alert.description}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-400">
                          {alert.time}
                        </span>
                        <button className="text-xs text-orange-500 hover:underline">
                          Xử lý
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Phê duyệt người dùng và chiến dịch */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Người dùng mới */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  Người Dùng Mới
                </h3>
                <Link
                  to="/admin/users"
                  className="text-xs text-orange-500 font-medium flex items-center"
                >
                  Xem tất cả
                  <ArrowUpRight className="h-3 w-3 ml-1" />
                </Link>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Người dùng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vai trò
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ngày đăng ký
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {newUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
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
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
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
                        <div className="text-sm text-gray-700">
                          {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex justify-center space-x-2">
                          <button
                            className="p-1 rounded-full text-white bg-orange-500 hover:bg-orange-600"
                            title="Tạm dừng tài khoản"
                          >
                            <ShieldAlert className="h-4 w-4" />
                          </button>
                          <button
                            className="p-1 rounded-full text-white bg-red-500 hover:bg-red-600"
                            title="Chặn tài khoản"
                          >
                            <XCircle className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Chiến dịch chờ phê duyệt */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  Chiến Dịch Chờ Duyệt (
                  {
                    campaignData.filter(
                      (campaign) => campaign.status === "PENDING"
                    ).length
                  }
                  )
                </h3>
                <Link
                  to="/admin/campaigns"
                  className="text-xs text-orange-500 font-medium flex items-center"
                >
                  Xem tất cả
                  <ArrowUpRight className="h-3 w-3 ml-1" />
                </Link>
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
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ngày gửi
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {campaignData
                    .filter((campaign) => campaign.status === "PENDING")
                    .map((campaign) => (
                      <tr key={campaign.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                              <Megaphone className="h-4 w-4 text-gray-500" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {campaign.title}
                              </div>
                              <div className="text-xs text-gray-500">
                                <span>{campaign.advertiser}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm font-medium text-gray-900">
                            ${campaign.budget.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="text-sm text-gray-700">
                            {campaign.startDate}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex justify-center space-x-2">
                            <button className="p-1 rounded-full text-white bg-green-500 hover:bg-green-600">
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            <button className="p-1 rounded-full text-white bg-red-500 hover:bg-red-600">
                              <XCircle className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Điều hướng nhanh */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Link
            to="/admin/users"
            className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 flex flex-col items-center gap-2 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-orange-500" />
            </div>
            <h4 className="text-sm font-medium text-gray-800">
              Quản lý người dùng
            </h4>
          </Link>

          <Link
            to="/admin/campaigns"
            className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 flex flex-col items-center gap-2 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Layers className="h-5 w-5 text-blue-500" />
            </div>
            <h4 className="text-sm font-medium text-gray-800">
              Quản lý chiến dịch
            </h4>
          </Link>

          <Link
            to="/admin/transactions"
            className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 flex flex-col items-center gap-2 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-green-500" />
            </div>
            <h4 className="text-sm font-medium text-gray-800">Giao dịch</h4>
          </Link>

          <Link
            to="/admin/categories"
            className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 flex flex-col items-center gap-2 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Filter className="h-5 w-5 text-purple-500" />
            </div>
            <h4 className="text-sm font-medium text-gray-800">Danh mục</h4>
          </Link>

          <Link
            to="/admin/reports"
            className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 flex flex-col items-center gap-2 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-yellow-500" />
            </div>
            <h4 className="text-sm font-medium text-gray-800">Báo cáo</h4>
          </Link>

          <Link
            to="/admin/settings"
            className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 flex flex-col items-center gap-2 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Settings className="h-5 w-5 text-gray-500" />
            </div>
            <h4 className="text-sm font-medium text-gray-800">Cài đặt</h4>
          </Link>
        </div>
      </div>
    </div>
  );
}
