import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import {
  ArrowLeft,
  TrendingUp,
  DollarSign,
  MousePointer,
  Target,
  BarChart3,
  Users,
  Edit,
  PauseCircle,
  PlayCircle,
  Clock,
  Star,
  MapPin,
} from "lucide-react";
import axiosInstance from "../../lib/axiosInstance";
import Loading from "../../components/Loading";

export default function CampaignDetail() {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [statistics, setStatistics] = useState({
    views: 0,
    clicks: 0,
    conversions: 0,
    ctr: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateStatusLoading, setUpdateStatusLoading] = useState(false);
  const [timeRange, setTimeRange] = useState("7days");

  useEffect(() => {
    const fetchCampaignDetail = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/api/advertiser/campaigns/${id}`
        );
        setCampaign(response.data);

        // Giả lập dữ liệu thống kê - sau này sẽ thay bằng API thật
        setStatistics({
          views: 12345,
          clicks: 3287,
          conversions: 287,
          ctr: 4.2,
          revenue: 2547.5,
        });
      } catch (err) {
        console.error("Error fetching campaign details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCampaignDetail();
    }
  }, [id]);

  const handleUpdateStatus = async (newStatus) => {
    if (updateStatusLoading) return;

    setUpdateStatusLoading(true);
    try {
      await axiosInstance.put(
        `/api/advertiser/campaigns/updateStatus/${id}?status=${newStatus}`
      );
      setCampaign({
        ...campaign,
        status: newStatus,
      });
    } catch (err) {
      console.error("Error updating campaign status:", err);
      setError(err.message);
    } finally {
      setUpdateStatusLoading(false);
    }
  };

  // Dữ liệu giả lập cho biểu đồ
  const chartData = {
    "7days": [120, 150, 180, 220, 280, 250, 320],
    "30days": [
      120, 150, 180, 220, 280, 250, 320, 310, 290, 350, 380, 400, 390, 420, 450,
      430, 410, 390, 420, 450, 460, 480, 500, 490, 510, 530, 520, 540, 550, 560,
    ],
  };

  const currentChartData = chartData[timeRange] || chartData["7days"];
  const maxValue = Math.max(...currentChartData);

  if (loading) return <Loading />;
  if (error)
    return <div className="text-red-500 text-center mt-10">Lỗi: {error}</div>;
  if (!campaign)
    return <div className="text-center mt-10">Không tìm thấy chiến dịch</div>;

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center gap-3">
            <Link to="/" className="p-2 rounded-full hover:bg-gray-200">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {campaign.title}
              </h1>
              <div className="flex items-center gap-2 mt-1">
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
                <span className="text-sm text-gray-500">
                  Ngày tạo: {new Date(campaign.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-4 md:mt-0">
            <Link
              to={`/advertiser/campaign/edit/${campaign.id}`}
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
            >
              <Edit className="h-4 w-4" />
              Chỉnh sửa
            </Link>
            {campaign.status === "APPROVED" && (
              <button
                className="flex items-center gap-2 px-3 py-2 bg-orange-500 text-white rounded-lg text-sm hover:bg-orange-600"
                onClick={() =>
                  handleUpdateStatus(
                    campaign.status === "ACTIVE" ? "APPROVED" : "ACTIVE"
                  )
                }
                disabled={updateStatusLoading}
              >
                {campaign.status === "ACTIVE" ? (
                  <>
                    <PauseCircle className="h-4 w-4" />
                    Tạm dừng
                  </>
                ) : (
                  <>
                    <PlayCircle className="h-4 w-4" />
                    Kích hoạt
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Thống kê tổng quan */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Thống kê hiệu suất
            </h2>
            <div className="flex bg-white rounded-lg border border-gray-200 p-1">
              <button
                className={`px-3 py-1 text-sm rounded-md ${
                  timeRange === "7days"
                    ? "bg-gray-100 text-gray-800"
                    : "text-gray-600"
                }`}
                onClick={() => setTimeRange("7days")}
              >
                7 ngày
              </button>
              <button
                className={`px-3 py-1 text-sm rounded-md ${
                  timeRange === "30days"
                    ? "bg-gray-100 text-gray-800"
                    : "text-gray-600"
                }`}
                onClick={() => setTimeRange("30days")}
              >
                30 ngày
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Lượt xem
                  </p>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {statistics.views.toLocaleString()}
                  </h3>
                  <div className="flex items-center gap-1 mt-2">
                    <div className="text-xs font-medium text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      12.5%
                    </div>
                  </div>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-blue-500" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Lượt click
                  </p>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {statistics.clicks.toLocaleString()}
                  </h3>
                  <div className="flex items-center gap-1 mt-2">
                    <div className="text-xs font-medium text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      18.3%
                    </div>
                  </div>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <MousePointer className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Chuyển đổi
                  </p>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {statistics.conversions.toLocaleString()}
                  </h3>
                  <div className="flex items-center gap-1 mt-2">
                    <div className="text-xs font-medium text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      9.7%
                    </div>
                  </div>
                </div>
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Target className="h-5 w-5 text-purple-500" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Tỷ lệ CTR
                  </p>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {statistics.ctr.toFixed(1)}%
                  </h3>
                  <div className="flex items-center gap-1 mt-2">
                    <div className="text-xs font-medium text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      2.1%
                    </div>
                  </div>
                </div>
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-yellow-500" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Hoa hồng
                  </p>
                  <h3 className="text-2xl font-bold text-gray-800">
                    ${statistics.revenue.toLocaleString()}
                  </h3>
                  <div className="flex items-center gap-1 mt-2">
                    <div className="text-xs font-medium text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      15.2%
                    </div>
                  </div>
                </div>
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-orange-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Biểu đồ và Thông tin chi tiết */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Biểu đồ */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Số lượt click theo thời gian
              </h3>
            </div>

            <div className="h-[240px] flex items-end justify-between gap-1">
              {currentChartData.map((value, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center"
                >
                  <div className="group">
                    <div
                      className="w-5 sm:w-8 bg-orange-500 rounded-t-sm hover:bg-orange-600 transition-all relative"
                      style={{ height: `${(value / maxValue) * 180}px` }}
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap transition-opacity">
                        {value} lượt click
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] sm:text-xs text-gray-500 mt-2">
                    {timeRange === "7days"
                      ? ["T2", "T3", "T4", "T5", "T6", "T7", "CN"][index % 7]
                      : index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Thông tin chi tiết */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Thông tin chiến dịch
            </h3>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Thông tin cơ bản
                </h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-500">Ngân sách</p>
                      <p className="text-sm font-medium text-gray-900">
                        ${campaign.budget?.toLocaleString() || 0}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Hoa hồng</p>
                      <p className="text-sm font-medium text-gray-900">
                        {campaign.commissionRate || 0}% ($
                        {campaign.commissionValue?.toLocaleString() || 0})
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Bắt đầu</p>
                      <p className="text-sm font-medium text-gray-900">
                        {campaign.startDate || "Chưa xác định"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Kết thúc</p>
                      <p className="text-sm font-medium text-gray-900">
                        {campaign.endDate || "Chưa xác định"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Đối tượng mục tiêu
                </h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <p className="text-sm font-medium text-gray-900">
                      {campaign.targetAudience || "Tất cả"}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Thống kê phụ
                </h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <div>
                        <p className="text-xs text-gray-500">Đánh giá</p>
                        <p className="text-sm font-medium text-gray-900">
                          {campaign.rating || 0}/5
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <div>
                        <p className="text-xs text-gray-500">Thời gian chạy</p>
                        <p className="text-sm font-medium text-gray-900">
                          12 ngày
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nhà xuất bản hoạt động */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">
              Nhà xuất bản hoạt động (15)
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nhà xuất bản
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lượt click
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Chuyển đổi
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tỷ lệ chuyển đổi
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hoa hồng
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-medium">
                              {String.fromCharCode(65 + index)}
                            </span>
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              Nhà xuất bản {index + 1}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              Hà Nội, Việt Nam
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm font-medium text-gray-900">
                          {(782 - index * 132).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm font-medium text-gray-900">
                          {(58 - index * 9).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm font-medium text-gray-900">
                          {(7.4 - index * 0.5).toFixed(1)}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm font-medium text-gray-900">
                          ${(523 - index * 84).toLocaleString()}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-gray-200 flex justify-center">
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
              Xem tất cả nhà xuất bản
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
