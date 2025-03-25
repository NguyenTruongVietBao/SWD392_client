import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import axiosInstance from "../../lib/axiosInstance";
import Loading from "../../components/Loading";
import {
  ArrowLeft,
  Clock,
  DollarSign,
  ExternalLink,
  Info,
  Star,
  Tag,
  Target,
  Users,
  Globe,
  AlertCircle,
  PlayCircle,
  PauseCircle,
  Edit,
} from "lucide-react";
import useAuthStore from "../../store/useAuthStore";
import { toast } from "react-toastify";

export default function AdvertiserDetail() {
  const { id } = useParams(); // Lấy ID chiến dịch từ URL
  const { user } = useAuthStore();
  const advertiserId = user?.id;
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateStatusLoading, setUpdateStatusLoading] = useState(false);

  // Lấy chi tiết chiến dịch
  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `/api/advertiser/campaigns/${id}`
        );
        setCampaign(response.data);
      } catch (err) {
        console.error("Lỗi khi lấy chi tiết chiến dịch:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  // Cập nhật trạng thái chiến dịch
  const handleUpdateStatus = async (newStatus) => {
    if (updateStatusLoading) return;

    setUpdateStatusLoading(true);
    try {
      await axiosInstance.put(
        `/api/advertiser/campaigns/updateStatus/${id}?status=${newStatus}`
      );
      setCampaign((prev) => ({ ...prev, status: newStatus }));
      toast.success(
        `Chiến dịch đã được ${
          newStatus === "ACTIVE" ? "kích hoạt" : "tạm dừng"
        }`
      );
    } catch (err) {
      console.error("Lỗi khi cập nhật trạng thái:", err);
      toast.error("Không thể cập nhật trạng thái chiến dịch");
    } finally {
      setUpdateStatusLoading(false);
    }
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

  if (!campaign) {
    return (
      <div className="min-h-screen pt-20 pb-10 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg">
            Không tìm thấy chiến dịch
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4 md:px-8 lg:px-12 bg-gray-50 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Nút quay lại */}
        <div className="mb-6">
          <Link
            to="/advertiser/campaigns"
            className="inline-flex items-center text-gray-600 hover:text-orange-600"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Quay lại danh sách chiến dịch</span>
          </Link>
        </div>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="relative h-64 bg-gradient-to-r from-orange-600 to-orange-400">
            {campaign.image && (
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-full object-cover opacity-40"
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="text-white text-center">
                <h1 className="text-3xl font-bold mb-4">{campaign.title}</h1>
                <div className="flex items-center justify-center flex-wrap gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-current" />
                    <span>Đánh giá: {campaign.rating || "Chưa có"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-5 w-5" />
                    <span>
                      {campaign.participants || 0} nhà xuất bản tham gia
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-5 w-5" />
                    <span>
                      {campaign.endDate && campaign.startDate
                        ? `Từ ${new Date(
                            campaign.startDate
                          ).toLocaleDateString()} đến ${new Date(
                            campaign.endDate
                          ).toLocaleDateString()}`
                        : "Không giới hạn thời gian"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Thông tin chiến dịch và thao tác */}
          <div className="p-6 flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Tag className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-sm text-gray-500">Danh mục</h2>
                  <p className="font-medium">
                    {campaign.category || "Tổng hợp"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-sm text-gray-500">Ngân sách</h2>
                  <p className="font-medium text-green-600">
                    ${campaign.budget?.toLocaleString() || 0}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-sm text-gray-500">Hoa hồng</h2>
                  <p className="font-medium text-blue-600">
                    ${campaign.commissionValue?.toLocaleString() || 0} (
                    {campaign.commissionRate || 0}%)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Globe className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-sm text-gray-500">Website</h2>
                  <a
                    href={campaign.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-purple-600 flex items-center gap-1 hover:underline"
                  >
                    {campaign.website || "Chưa có"}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Phần thao tác */}
            <div className="w-full md:w-1/3 bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-medium mb-3">Thao tác</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${getStatusClass(
                      campaign.status
                    )}`}
                  >
                    {renderStatusIcon(campaign.status)}
                    <span className="ml-1">
                      {getStatusText(campaign.status)}
                    </span>
                  </span>
                </div>

                {campaign.status === "APPROVED" && (
                  <button
                    onClick={() =>
                      handleUpdateStatus(
                        campaign.status === "ACTIVE" ? "APPROVED" : "ACTIVE"
                      )
                    }
                    disabled={updateStatusLoading}
                    className={`w-full py-2 rounded-lg font-medium flex items-center justify-center gap-2 ${
                      updateStatusLoading
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : campaign.status === "ACTIVE"
                        ? "bg-orange-600 text-white hover:bg-orange-700"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {updateStatusLoading ? (
                      <span>Đang xử lý...</span>
                    ) : campaign.status === "ACTIVE" ? (
                      <>
                        <PauseCircle className="h-5 w-5" />
                        <span>Tạm dừng</span>
                      </>
                    ) : (
                      <>
                        <PlayCircle className="h-5 w-5" />
                        <span>Kích hoạt</span>
                      </>
                    )}
                  </button>
                )}

                <Link
                  to={`/advertiser/campaign/edit/${campaign.id}`}
                  className="w-full py-2 bg-gray-200 text-gray-700 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-300"
                >
                  <Edit className="h-5 w-5" />
                  <span>Chỉnh sửa chiến dịch</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Thông tin chi tiết */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mô tả chiến dịch */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Info className="h-5 w-5 text-orange-600" />
                Mô tả chiến dịch
              </h2>
              <div className="prose prose-orange max-w-none">
                <div
                  dangerouslySetInnerHTML={{
                    __html: campaign.description || "<p>Không có mô tả</p>",
                  }}
                />
              </div>
            </div>

            {/* Điều kiện tham gia */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                Điều kiện tham gia
              </h2>
              <div className="prose prose-orange max-w-none">
                <p className="text-gray-600">
                  {campaign.requirements ||
                    "Không có điều kiện cụ thể. Tất cả nhà xuất bản đều có thể tham gia sau khi chiến dịch được phê duyệt."}
                </p>
              </div>
            </div>
          </div>

          {/* Thống kê hiệu suất */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-orange-600" />
                Thống kê hiệu suất
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-3">
                  <span className="text-gray-600">Tổng lượt xem</span>
                  <span className="font-medium">
                    {campaign.totalViews?.toLocaleString() || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b pb-3">
                  <span className="text-gray-600">Lượt nhấp</span>
                  <span className="font-medium">
                    {campaign.totalClicks?.toLocaleString() || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b pb-3">
                  <span className="text-gray-600">Giao dịch thành công</span>
                  <span className="font-medium">
                    {campaign.totalConversions?.toLocaleString() || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tỷ lệ chuyển đổi</span>
                  <span className="font-medium text-green-600">
                    {campaign.conversionRate || 0}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
