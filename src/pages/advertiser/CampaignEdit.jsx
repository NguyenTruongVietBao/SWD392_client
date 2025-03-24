import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import axiosInstance from "../../lib/axiosInstance";
import {
  Calendar,
  DollarSign,
  Image,
  Link as LinkIcon,
  Percent,
  Target,
  ArrowLeft,
} from "lucide-react";
import Loading from "../../components/Loading";

export default function CampaignEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    budget: 0,
    description: "",
    targetAudience: "",
    commissionRate: 0,
    commissionValue: 0,
    status: "PENDING",
    adsLink: "",
    imageUrl: "",
    startDate: "",
    endDate: "",
    category: "",
  });

  // Tải dữ liệu chiến dịch ban đầu
  useEffect(() => {
    const fetchCampaignData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/api/advertiser/campaigns/${id}`
        );
        const campaignData = response.data;

        // Định dạng lại ngày từ string sang định dạng YYYY-MM-DD cho input type="date"
        const formatDate = (dateString) => {
          if (!dateString) return "";
          const date = new Date(dateString);
          return date.toISOString().split("T")[0];
        };

        setFormData({
          title: campaignData.title || "",
          budget: campaignData.budget || 0,
          description: campaignData.description || "",
          targetAudience: campaignData.targetAudience || "",
          commissionRate: campaignData.commissionRate || 0,
          commissionValue: campaignData.commissionValue || 0,
          adsLink: campaignData.adsLink || "",
          status: "PENDING",
          imageUrl: campaignData.imageUrl || "",
          startDate: formatDate(campaignData.startDate),
          endDate: formatDate(campaignData.endDate),
          category: campaignData.category || "",
        });
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu chiến dịch:", err);
        setError(
          err.response?.data?.message ||
            "Có lỗi xảy ra khi tải dữ liệu chiến dịch."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCampaignData();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    // Xử lý các trường số
    if (
      name === "budget" ||
      name === "commissionRate" ||
      name === "commissionValue"
    ) {
      updatedValue = value === "" ? 0 : Number(value);

      // Tự động tính giá trị hoa hồng dựa trên ngân sách và tỷ lệ
      if (name === "budget" || name === "commissionRate") {
        const budget = name === "budget" ? updatedValue : formData.budget;
        const rate =
          name === "commissionRate" ? updatedValue : formData.commissionRate;

        const commissionValue = Math.round(budget * (rate / 100));
        setFormData((prev) => ({
          ...prev,
          commissionValue,
        }));
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // Gọi API cập nhật chiến dịch
      await axiosInstance.put(`/api/advertiser/campaigns/${id}`, formData);

      // Chuyển hướng về trang chi tiết chiến dịch sau khi cập nhật thành công
      navigate(`/advertiser/campaign/${id}`);
    } catch (err) {
      console.error("Lỗi khi cập nhật chiến dịch:", err);
      setError(
        err.response?.data?.message || "Có lỗi xảy ra khi cập nhật chiến dịch."
      );
      // Cuộn lên trên để hiển thị thông báo lỗi
      window.scrollTo(0, 0);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Chỉnh Sửa Chiến Dịch
            </h1>
            <p className="text-gray-500">
              Cập nhật thông tin chiến dịch quảng cáo của bạn
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Thông tin cơ bản
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Tên chiến dịch <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Nhập tên chiến dịch"
                />
              </div>

              <div>
                <label
                  htmlFor="budget"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Ngân sách <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Nhập ngân sách chiến dịch"
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mô tả chiến dịch
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Nhập mô tả chi tiết về chiến dịch của bạn"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="targetAudience"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Đối tượng mục tiêu
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Target className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="targetAudience"
                    name="targetAudience"
                    value={formData.targetAudience}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Ví dụ: Người trưởng thành 18-35 tuổi"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="adsLink"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Liên kết quảng cáo <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LinkIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="url"
                    id="adsLink"
                    name="adsLink"
                    value={formData.adsLink}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="https://example.com"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="imageUrl"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  URL hình ảnh
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Image className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="url"
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Danh mục
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Chọn danh mục</option>
                  <option value="fashion">Thời trang</option>
                  <option value="electronics">Điện tử</option>
                  <option value="beauty">Làm đẹp</option>
                  <option value="education">Giáo dục</option>
                  <option value="food">Ẩm thực</option>
                  <option value="other">Khác</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Thông tin hoa hồng
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="commissionRate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Tỷ lệ hoa hồng (%) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Percent className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    id="commissionRate"
                    name="commissionRate"
                    value={formData.commissionRate}
                    onChange={handleChange}
                    required
                    min="0"
                    max="100"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Ví dụ: 10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="commissionValue"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Giá trị hoa hồng (tự động tính)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    id="commissionValue"
                    name="commissionValue"
                    value={formData.commissionValue}
                    readOnly
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Thời gian chiến dịch
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Ngày bắt đầu <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Ngày kết thúc <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              disabled={submitting}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              disabled={submitting}
            >
              {submitting ? "Đang cập nhật..." : "Lưu thay đổi"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
