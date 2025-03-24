import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axiosInstance from "../../lib/axiosInstance";
import Loading from "../../components/Loading";
import { XCircle, Star } from "lucide-react";

export default function AdminDetailCampaign({
  campaignId,
  isOpen,
  onClose,
  onApprove,
  onReject,
}) {
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    const fetchCampaignDetail = async () => {
      if (!campaignId || !isOpen) return;

      setLoading(true);
      try {
        const res = await axiosInstance.get(
          `/api/advertiser/campaigns/${campaignId}`
        );
        setCampaign(res.data);
      } catch (err) {
        console.error("Error fetching campaign detail:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaignDetail();
  }, [campaignId, isOpen]);

  // Xử lý cập nhật trạng thái
  const handleUpdateStatus = async (status) => {
    if (!campaign || updateLoading) return;

    setUpdateLoading(true);
    try {
      await axiosInstance.put(
        `/api/advertiser/campaigns/updateStatus/${campaignId}?status=${status}`
      );

      // Cập nhật trạng thái trong state
      setCampaign({ ...campaign, status });

      // Gọi callback tương ứng
      if (status === "APPROVED" && onApprove) {
        onApprove(campaignId);
      } else if (status === "REJECTED" && onReject) {
        onReject(campaignId);
      }
    } catch (err) {
      console.error(`Error updating campaign status to ${status}:`, err);
      setError(err.message);
    } finally {
      setUpdateLoading(false);
    }
  };

  // Xử lý duyệt chiến dịch
  const handleApprove = async () => {
    await handleUpdateStatus("APPROVED");
    onClose();
  };

  // Xử lý từ chối chiến dịch
  const handleReject = async () => {
    await handleUpdateStatus("REJECTED");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">
              Chi Tiết Chiến Dịch
            </h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
            >
              <XCircle className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex justify-center p-6">
              <Loading />
            </div>
          ) : error ? (
            <div className="text-center text-red-500">Lỗi: {error}</div>
          ) : (
            <div className="space-y-6">
              {/* Hình ảnh chiến dịch */}
              {campaign?.imageUrl && (
                <div className="w-full h-48 bg-gray-100 rounded-xl overflow-hidden">
                  <img
                    src={campaign.imageUrl}
                    alt={campaign.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Thông tin chiến dịch */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {campaign?.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${
                      campaign?.status === "APPROVED"
                        ? "bg-green-100 text-green-800"
                        : campaign?.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-800"
                        : campaign?.status === "REJECTED"
                        ? "bg-red-100 text-red-800"
                        : campaign?.status === "ACTIVE"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {campaign?.status === "APPROVED"
                      ? "Đã duyệt"
                      : campaign?.status === "PENDING"
                      ? "Chờ duyệt"
                      : campaign?.status === "REJECTED"
                      ? "Đã từ chối"
                      : campaign?.status === "ACTIVE"
                      ? "Đang hoạt động"
                      : campaign?.status === "ENDED"
                      ? "Đã kết thúc"
                      : campaign?.status}
                  </span>
                  {campaign?.category && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {campaign.category}
                    </span>
                  )}
                </div>

                <div className="text-sm text-gray-600 mb-4">
                  {campaign?.description}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Thông tin chiến dịch
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">
                          Đối tượng:
                        </span>
                        <span className="text-sm font-medium">
                          {campaign?.targetAudience || "Chưa xác định"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">
                          Ngân sách:
                        </span>
                        <span className="text-sm font-medium">
                          ${campaign?.budget?.toLocaleString() || 0}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">
                          Tỷ lệ hoa hồng:
                        </span>
                        <span className="text-sm font-medium">
                          {campaign?.commissionRate || "0"} %
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">
                          Giá trị hoa hồng:
                        </span>
                        <span className="text-sm font-medium">
                          ${campaign?.commissionValue?.toLocaleString() || 0}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Đánh giá:</span>
                        <span className="text-sm font-medium flex items-center">
                          <Star className="h-3 w-3 text-yellow-400 mr-1 inline" />
                          {campaign?.rating || "Chưa có đánh giá"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Thời gian
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">
                          Ngày bắt đầu:
                        </span>
                        <span className="text-sm font-medium">
                          {campaign?.startDate || "Chưa xác định"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">
                          Ngày kết thúc:
                        </span>
                        <span className="text-sm font-medium">
                          {campaign?.endDate || "Chưa xác định"}
                        </span>
                      </div>
                    </div>

                    <h4 className="text-sm font-medium text-gray-500 mt-4 mb-2">
                      Liên kết
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">
                          Link quảng cáo:
                        </span>
                        <a
                          href={campaign?.adsLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-blue-500 hover:underline"
                        >
                          Mở liên kết
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-100">
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
              disabled={updateLoading}
            >
              Đóng
            </button>

            {campaign?.status === "PENDING" && (
              <>
                <button
                  onClick={handleReject}
                  className="px-4 py-2 border border-red-200 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50"
                  disabled={updateLoading}
                >
                  {updateLoading ? "Đang xử lý..." : "Từ chối"}
                </button>
                <button
                  onClick={handleApprove}
                  className="px-4 py-2 bg-green-500 rounded-lg text-sm font-medium text-white hover:bg-green-600"
                  disabled={updateLoading}
                >
                  {updateLoading ? "Đang xử lý..." : "Phê duyệt"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

AdminDetailCampaign.propTypes = {
  campaignId: PropTypes.number,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onApprove: PropTypes.func,
  onReject: PropTypes.func,
};

AdminDetailCampaign.defaultProps = {
  isOpen: false,
  onClose: () => {},
  onApprove: () => {},
  onReject: () => {},
};
