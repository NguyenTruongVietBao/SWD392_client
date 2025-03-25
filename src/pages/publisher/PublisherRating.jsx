import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import axiosInstance from "../../lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import {
  ArrowLeft,
  Clock,
  DollarSign,
  ExternalLink,
  HandCoins,
  Info,
  Star,
  Tag,
  Target,
  TrendingUp,
  User,
  Users,
  Globe,
  AlertCircle,
  Copy,
} from "lucide-react";
import useAuthStore from "../../store/useAuthStore";
import { toast } from "react-toastify";

// Component PublisherRating
function PublisherRating({ publisherData }) {
  const defaultData = {
    rating: 4.5,
    totalReviews: 150,
    campaignsCompleted: 25,
    averageEarnings: "$1,200",
    joinDate: "01/01/2023",
  };

  const data = publisherData || defaultData;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Star className="h-5 w-5 text-orange-600" />
        Đánh giá nhà xuất bản
      </h2>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 bg-gray-100 rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-gray-400" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 text-yellow-500 fill-current" />
              <span className="font-medium text-lg">{data.rating} / 5</span>
            </div>
            <p className="text-sm text-gray-500">
              Dựa trên {data.totalReviews} đánh giá
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Chiến dịch hoàn thành</p>
            <p className="font-medium">{data.campaignsCompleted}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Thu nhập trung bình</p>
            <p className="font-medium text-green-600">{data.averageEarnings}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-orange-600" />
          <div>
            <p className="text-sm text-gray-500">Tham gia từ</p>
            <p className="font-medium">{data.joinDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component chính PublisherCampaignDetail
export default function PublisherCampaignDetail() {
  const { id } = useParams();
  const { user } = useAuthStore();
  const publisherId = user?.id;
  const campaignId = id;

  const [enrollLoading, setEnrollLoading] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [shortLink, setShortLink] = useState("");
  const [isEnrolled, setIsEnrolled] = useState(false);

  // Lấy chi tiết chiến dịch
  const { data: campaign, isLoading: campaignLoading } = useQuery({
    queryKey: ["campaignDetail", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/advertiser/campaigns/${id}`);
      return res.data;
    },
    staleTime: Infinity,
  });

  // Kiểm tra trạng thái đăng ký
  const { data: enrollmentStatus } = useQuery({
    queryKey: ["enrollmentStatus", id, publisherId],
    queryFn: async () => {
      if (!publisherId) return null;
      const res = await axiosInstance.get(
        `/api/advertiser/campaigns/check/${publisherId}/{campaignId}?campaignId=${id}`
      );
      return res.data;
    },
    enabled: !!publisherId,
  });

  useEffect(() => {
    if (enrollmentStatus?.trackingUrl) {
      setIsEnrolled(true);
      setShortLink(enrollmentStatus.trackingUrl);
    }
  }, [enrollmentStatus]);

  // Handle enroll campaign
  const handleEnroll = async () => {
    setEnrollLoading(true);
    try {
      const response = await axiosInstance.post(
        `/api/advertiser/campaigns/generateLink/${id}`
      );
      if (response.data) {
        setShortLink(response.data);
        setIsEnrolled(true);
        toast.success("Đăng ký chiến dịch thành công!");
      }
    } catch (error) {
      console.error("Lỗi khi đăng ký chiến dịch:", error);
      toast.error(
        error.response?.data?.message || "Đã xảy ra lỗi khi đăng ký chiến dịch"
      );
    } finally {
      setEnrollLoading(false);
    }
  };

  if (campaignLoading) return <Loading />;

  return (
    <div className="min-h-screen pt-20 px-4 md:px-8 lg:px-12 bg-gray-50 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Back */}
        <div className="mb-6">
          <Link
            to="/publisher/campaigns"
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
                    <span>Đánh giá: {campaign.rating || "4"}/5</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-5 w-5" />
                    <span>
                      {campaign.publishers || 120} nhà xuất bản đã tham gia
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-5 w-5" />
                    <span>
                      {campaign.endDate && campaign.startDate
                        ? `Từ ngày ${new Date(
                            campaign.startDate
                          ).toLocaleDateString()} đến ngày ${new Date(
                            campaign.endDate
                          ).toLocaleDateString()}`
                        : "Không giới hạn thời gian"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Thông tin quảng cáo và nút đăng ký */}
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
                  <h2 className="text-sm text-gray-500">Hoa hồng</h2>
                  <p className="font-medium text-green-600">
                    {campaign.commissionRate || 10}%{" "}
                    <span className="text-gray-500 text-sm">
                      trên mỗi đơn hàng thành công
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-sm text-gray-500">Tỷ lệ chuyển đổi</h2>
                  <p className="font-medium text-blue-600">
                    {campaign.conversionRate || "3.2"}%{" "}
                    <span className="text-gray-500 text-sm">
                      trung bình trong 30 ngày qua
                    </span>
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
                    {campaign.adsLink || "https://example.com"}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Phần bên phải - Nút đăng ký hoặc tracking link */}
            <div className="w-full md:w-1/3 bg-gray-50 rounded-lg p-6">
              {isEnrolled ? (
                <>
                  <h3 className="text-lg font-medium mb-3">
                    Link theo dõi của bạn
                  </h3>
                  <div className="bg-white rounded border p-3 mb-4 flex items-center gap-2">
                    <input
                      type="text"
                      value={shortLink}
                      readOnly
                      className="flex-1 bg-transparent outline-none"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(shortLink);
                        toast.success("Đã sao chép link");
                      }}
                      className="text-orange-600 hover:text-orange-700"
                    >
                      <Copy className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Sử dụng link này để theo dõi các chuyển đổi từ chiến dịch
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-medium mb-3">
                    Đăng ký tham gia chiến dịch
                  </h3>
                  <p className="text-gray-600 text-sm mb-6">
                    Đăng ký tham gia chiến dịch này để nhận hoa hồng
                    {campaign.commissionRate}% cho mỗi đơn hàng thành công.
                  </p>

                  <div className="flex items-start gap-2 mb-4">
                    <div className="mt-1">
                      <input
                        type="checkbox"
                        id="termsCheck"
                        checked={showTerms}
                        onChange={() => setShowTerms(!showTerms)}
                        className="rounded border-gray-300 text-orange-600"
                      />
                    </div>
                    <label
                      htmlFor="termsCheck"
                      className="text-sm text-gray-600"
                    >
                      Tôi đã đọc và đồng ý với{" "}
                      <button
                        type="button"
                        className="text-orange-600 hover:underline"
                        onClick={() =>
                          alert("Hiển thị điều khoản và điều kiện")
                        }
                      >
                        điều khoản và điều kiện
                      </button>{" "}
                      của chiến dịch này
                    </label>
                  </div>

                  <button
                    className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
                      showTerms
                        ? "bg-orange-600 text-white hover:bg-orange-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    onClick={handleEnroll}
                    disabled={!showTerms || enrollLoading}
                  >
                    {enrollLoading ? (
                      <span>Đang xử lý...</span>
                    ) : (
                      <>
                        <HandCoins className="h-5 w-5" />
                        <span>Đăng ký tham gia ngay</span>
                      </>
                    )}
                  </button>
                </>
              )}
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

            {/* Điều khoản và điều kiện */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                Điều khoản và điều kiện
              </h2>
              <div className="prose prose-orange max-w-none">
                <div className="max-w-4xl mx-auto bg-white rounded-lg">
                  <p className="text-gray-600 mb-4">
                    Chào mừng bạn đến với chương trình Affiliate Marketing của
                    chúng tôi. Bằng cách tham gia chiến dịch, bạn đồng ý tuân
                    thủ các điều khoản và điều kiện dưới đây.
                  </p>

                  <h2 className="text-xl font-semibold text-gray-700 mb-2">
                    1. Đăng ký và Điều kiện tham gia
                  </h2>
                  <p className="text-gray-600 mb-4">
                    - Người tham gia phải đăng ký tài khoản hợp lệ.
                    <br />- Đảm bảo nội dung quảng bá không vi phạm pháp luật.
                  </p>

                  <h2 className="text-xl font-semibold text-gray-700 mb-2">
                    2. Chính sách Hoa hồng
                  </h2>
                  <p className="text-gray-600 mb-4">
                    - Hoa hồng sẽ được tính dựa trên số lượt mua hàng hợp lệ.
                    <br />- Thanh toán sẽ được thực hiện hàng tháng nếu đạt
                    ngưỡng tối thiểu.
                  </p>

                  <h2 className="text-xl font-semibold text-gray-700 mb-2">
                    3. Quy định về Nội dung
                  </h2>
                  <p className="text-gray-600 mb-4">
                    - Không được sử dụng nội dung giả mạo hoặc lừa đảo.
                    <br />- Không chạy quảng cáo vi phạm quy định của nền tảng.
                  </p>

                  <h2 className="text-xl font-semibold text-gray-700 mb-2">
                    4. Chấm dứt Hợp tác
                  </h2>
                  <p className="text-gray-600 mb-4">
                    - Chúng tôi có quyền chấm dứt hợp tác nếu phát hiện vi phạm.
                    <br />- Hoa hồng chưa thanh toán có thể bị giữ lại trong
                    trường hợp gian lận.
                  </p>

                  <p className="text-gray-600 mt-6">
                    Bằng cách tiếp tục tham gia, bạn xác nhận đã đọc và đồng ý
                    với tất cả các điều khoản trên.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Thông tin nhà quảng cáo, đánh giá nhà xuất bản và thống kê */}
          <div className="md:col-span-1">
            {/* Thông tin nhà quảng cáo */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-orange-600" />
                Thông tin nhà quảng cáo
              </h2>

              <div className="flex items-center gap-3 mb-4">
                <div className="h-14 w-14 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                  {campaign.advertiserLogo ? (
                    <img
                      src={campaign.advertiserLogo}
                      alt="Logo"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-8 w-8 text-gray-400" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium">
                    {campaign.advertiserName || "Công ty XYZ"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Tham gia từ {campaign.advertiserJoinDate || "01/01/2023"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Chiến dịch</p>
                  <p className="font-medium">
                    {campaign.advertiserCampaignCount || 12}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Đánh giá</p>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium">
                      {campaign.advertiserRating || 4.8}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Đánh giá nhà xuất bản */}
            <PublisherRating
              publisherData={{
                rating: 4.7,
                totalReviews: 200,
                campaignsCompleted: 30,
                averageEarnings: "$1,500",
                joinDate: "15/03/2022",
              }}
            />

            {/* Thống kê chiến dịch */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-orange-600" />
                Thống kê chiến dịch
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-3">
                  <span className="text-gray-600">Thời gian chạy</span>
                  <span className="font-medium">
                    {campaign.duration || "30 ngày"}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b pb-3">
                  <span className="text-gray-600">Tổng lượt xem</span>
                  <span className="font-medium">
                    {campaign.totalViews || "12,345"}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b pb-3">
                  <span className="text-gray-600">Lượt click</span>
                  <span className="font-medium">
                    {campaign.totalClicks || "3,210"}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b pb-3">
                  <span className="text-gray-600">Giao dịch thành công</span>
                  <span className="font-medium">
                    {campaign.totalConversions || "295"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tỷ lệ chuyển đổi</span>
                  <span className="font-medium text-green-600">
                    {campaign.conversionRate || "3.2"}%
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
