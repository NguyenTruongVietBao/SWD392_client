import { useEffect, useState } from "react";
import axiosInstance from "../../lib/axiosInstance";
import Loading from "../../components/Loading";
import {
  X,
  CheckCircle,
  XCircle,
  Info,
  DollarSign,
  Target,
  Clock,
  Globe,
  User,
  Users,
  Star,
  AlertCircle,
  Megaphone,
} from "lucide-react";
import { toast } from "react-toastify";

const AdminDetailCampaign = ({
  campaignId,
  isOpen,
  onClose,
  onApprove,
  onReject,
}) => {
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Lấy chi tiết chiến dịch khi modal mở
  useEffect(() => {
    if (!isOpen || !campaignId) return;

    const fetchCampaign = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/api/advertiser/campaigns/${campaignId}`
        );
        setCampaign(response.data);
      } catch (err) {
        setError(err.message);
        toast.error("Không thể tải chi tiết chiến dịch");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [campaignId, isOpen]);

  // Xử lý duyệt chiến dịch
  const handleApproveCampaign = async () => {
    if (actionLoading) return;

    setActionLoading(true);
    try {
      await onApprove(campaignId);
      setCampaign((prev) => ({ ...prev, status: "APPROVED" }));
      toast.success("Chiến dịch đã được duyệt");
    } catch (err) {
      toast.error("Không thể duyệt chiến dịch");
    } finally {
      setActionLoading(false);
    }
  };

  // Xử lý từ chối chiến dịch
  const handleRejectCampaign = async () => {
    if (actionLoading) return;

    setActionLoading(true);
    try {
      await onReject(campaignId);
      setCampaign((prev) => ({ ...prev, status: "REJECTED" }));
      toast.success("Chiến dịch đã bị từ chối");
    } catch (err) {
      toast.error("Không thể từ chối chiến dịch");
    } finally {
      setActionLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">
            Chi tiết chiến dịch #{campaignId}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Nội dung */}
        {loading ? (
          <div className="p-6">
            <Loading />
          </div>
        ) : error ? (
          <div className="p-6 text-center text-red-500">Lỗi: {error}</div>
        ) : !campaign ? (
          <div className="p-6 text-center text-gray-500">
            Không tìm thấy chiến dịch
          </div>
        ) : (
          <div className="p-6">
            {/* Thông tin cơ bản */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Megaphone className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {campaign.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Danh mục: {campaign.category || "Chưa phân loại"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">Ngân sách</p>
                    <p className="font-medium text-gray-800">
                      ${campaign.budget?.toLocaleString() || 0}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Hoa hồng</p>
                    <p className="font-medium text-gray-800">
                      ${campaign.commissionValue?.toLocaleString() || 0} (
                      {campaign.commissionRate || 0}%)
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-500">Thời gian</p>
                    <p className="font-medium text-gray-800">
                      {campaign.startDate && campaign.endDate
                        ? `${new Date(
                            campaign.startDate
                          ).toLocaleDateString()} - ${new Date(
                            campaign.endDate
                          ).toLocaleDateString()}`
                        : "Không giới hạn"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-500">Website</p>
                    <a
                      href={campaign.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-purple-600 hover:underline"
                    >
                      {campaign.website || "Chưa có"}
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
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
              </div>
            </div>

            {/* Thông tin chi tiết */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Mô tả chiến dịch */}
              <div className="md:col-span-2">
                <div className="bg-white rounded-lg p-4 border border-gray-100 mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-3">
                    <Info className="h-5 w-5 text-orange-600" />
                    Mô tả chiến dịch
                  </h4>
                  <div className="prose prose-sm text-gray-700">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: campaign.description || "<p>Không có mô tả</p>",
                      }}
                    />
                  </div>
                </div>

                {/* Thông tin nhà quảng cáo */}
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                  <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-3">
                    <User className="h-5 w-5 text-orange-600" />
                    Nhà quảng cáo
                  </h4>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {campaign.advertiserName || "Chưa xác định"}
                      </p>
                      <p className="text-sm text-gray-500">
                        ID: {campaign.advertiserId || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Thống kê hiệu suất */}
              <div className="md:col-span-1">
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                  <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-3">
                    <Target className="h-5 w-5 text-orange-600" />
                    Thống kê hiệu suất
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Tổng lượt xem
                      </span>
                      <span className="font-medium text-gray-800">
                        {campaign.totalViews?.toLocaleString() || 0}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Lượt nhấp</span>
                      <span className="font-medium text-gray-800">
                        {campaign.totalClicks?.toLocaleString() || 0}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Giao dịch</span>
                      <span className="font-medium text-gray-800">
                        {campaign.totalConversions?.toLocaleString() || 0}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Tỷ lệ chuyển đổi
                      </span>
                      <span className="font-medium text-green-600">
                        {campaign.conversionRate || 0}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Thao tác */}
            {campaign.status === "PENDING" && (
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={handleRejectCampaign}
                  disabled={actionLoading}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
                    actionLoading
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-red-600 text-white hover:bg-red-700"
                  }`}
                >
                  <XCircle className="h-5 w-5" />
                  Từ chối
                </button>
                <button
                  onClick={handleApproveCampaign}
                  disabled={actionLoading}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
                    actionLoading
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  <CheckCircle className="h-5 w-5" />
                  Duyệt
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDetailCampaign;
