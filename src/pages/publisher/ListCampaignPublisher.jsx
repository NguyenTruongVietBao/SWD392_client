import { useState } from "react";
import { Link } from "react-router";
import axiosInstance from "../../lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import {
  Eye,
  HandCoins,
  Star,
  User,
  Search,
  Filter,
  ArrowUpDown,
  Clock,
  ChevronDown,
  Tag,
  TrendingUp,
  DollarSign,
} from "lucide-react";

export default function ListCampaignPublisher() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);

  // Các danh mục chiến dịch
  const categories = [
    { id: "all", name: "Tất cả" },
    { id: "fashion", name: "Thời trang" },
    { id: "electronics", name: "Điện tử" },
    { id: "beauty", name: "Làm đẹp" },
    { id: "education", name: "Giáo dục" },
    { id: "food", name: "Ẩm thực" },
  ];

  // Các tùy chọn sắp xếp
  const sortOptions = [
    { id: "popular", name: "Phổ biến nhất" },
    { id: "newest", name: "Mới nhất" },
    { id: "commission-high", name: "Hoa hồng: Cao đến thấp" },
    { id: "commission-low", name: "Hoa hồng: Thấp đến cao" },
    { id: "rating", name: "Đánh giá cao nhất" },
  ];

  const { data, isLoading, error } = useQuery({
    queryKey: ["campaigns"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/advertiser/campaigns`);
      if (!res.data) {
        throw new Error("No data found");
      }
      return res.data;
    },
    staleTime: Infinity,
  });

  if (isLoading) return <Loading />;
  if (error)
    return (
      <div className="min-h-screen pt-20 flex justify-center items-center">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-700">Đã xảy ra lỗi</h3>
          <p className="text-gray-500 mt-1">{error.message}</p>
          <button
            className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg"
            onClick={() => window.location.reload()}
          >
            Thử lại
          </button>
        </div>
      </div>
    );

  // Lọc chiến dịch theo danh mục và từ khóa tìm kiếm
  const filteredCampaigns = data.filter((campaign) => {
    const matchesSearch = campaign.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || campaign.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Sắp xếp các chiến dịch
  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      case "commission-high":
        return b.commissionRate - a.commissionRate;
      case "commission-low":
        return a.commissionRate - b.commissionRate;
      case "rating":
        return b.rating - a.rating;
      case "popular":
      default:
        return b.popularity || 0 - a.popularity || 0;
    }
  });

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 md:px-8 lg:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Khám Phá Chiến Dịch
            </h1>
            <p className="text-gray-600">
              Tìm và tham gia các chiến dịch affiliate phù hợp với bạn
            </p>
          </div>

          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <div className="bg-white p-2 rounded-lg shadow-sm flex items-center">
              <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                <TrendingUp className="h-4 w-4" />
                <span>Tỷ lệ chuyển đổi: 3.5%</span>
              </div>
            </div>

            <div className="bg-white p-2 rounded-lg shadow-sm flex items-center">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-xs text-gray-500">Thu nhập tháng này</p>
                  <p className="font-bold text-sm">1,250,000 VNĐ</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thanh tìm kiếm và bộ lọc */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm chiến dịch..."
                className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-orange-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              {/* Bộ lọc danh mục */}
              <div className="relative">
                <button
                  onClick={() => setFilterMenuOpen(!filterMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  <Filter className="h-4 w-4 text-gray-500" />
                  <span>
                    {categories.find((c) => c.id === categoryFilter)?.name ||
                      "Danh mục"}
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>

                {filterMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-10 py-1">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => {
                          setCategoryFilter(category.id);
                          setFilterMenuOpen(false);
                        }}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Bộ sắp xếp */}
              <div className="relative">
                <button
                  onClick={() => setSortMenuOpen(!sortMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  <ArrowUpDown className="h-4 w-4 text-gray-500" />
                  <span>
                    {sortOptions.find((o) => o.id === sortBy)?.name ||
                      "Sắp xếp"}
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>

                {sortMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-10 py-1">
                    {sortOptions.map((option) => (
                      <button
                        key={option.id}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => {
                          setSortBy(option.id);
                          setSortMenuOpen(false);
                        }}
                      >
                        {option.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Danh mục chiến dịch */}
        <div className="flex overflow-x-auto pb-3 mb-6 gap-3 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                categoryFilter === category.id
                  ? "bg-orange-600 text-white"
                  : "bg-white border text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setCategoryFilter(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Kết quả tìm kiếm */}
        <p className="text-gray-600 mb-6">
          Hiển thị {sortedCampaigns.length} chiến dịch{" "}
          {categoryFilter !== "all" && (
            <span>
              trong danh mục &quot;
              {categories.find((c) => c.id === categoryFilter)?.name}&quot;
            </span>
          )}
        </p>

        {/* Danh sách chiến dịch */}
        {sortedCampaigns.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              Không tìm thấy chiến dịch nào
            </h3>
            <p className="text-gray-500 mb-4">
              Thử tìm kiếm với từ khóa khác hoặc thay đổi bộ lọc
            </p>
            <button
              className="px-4 py-2 bg-orange-600 text-white rounded-lg"
              onClick={() => {
                setSearchTerm("");
                setCategoryFilter("all");
              }}
            >
              Xem tất cả chiến dịch
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedCampaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    src={
                      campaign.image ||
                      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    }
                    alt={campaign.title}
                    className="w-full h-48 object-cover"
                  />
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-medium">
                        {campaign.rating}
                      </span>
                    </div>
                    <span className="text-gray-300">|</span>
                    <div className="flex items-center gap-1 text-gray-500">
                      <User className="h-4 w-4" />
                      <span className="text-sm">
                        {campaign.publishers || 100} nhà xuất bản
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                    {campaign.title}
                  </h3>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Tag className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {campaign.category || "Thời trang"}
                      </span>
                    </div>
                    <div className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {campaign.commissionRate}%
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">
                        {campaign.endDate
                          ? `Còn ${Math.ceil(
                              (new Date(campaign.endDate) - new Date()) /
                                (1000 * 60 * 60 * 24)
                            )} ngày`
                          : "Không giới hạn"}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Tỷ lệ chuyển đổi:{" "}
                      <span className="text-green-600 font-medium">
                        {campaign.conversionRate || "3.2"}%
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link to={`${campaign.id}`} className="flex-1">
                      <button className="w-full py-2 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors flex items-center justify-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>Chi tiết</span>
                      </button>
                    </Link>
                    <Link to={`/campaign/${campaign.id}`} className="flex-1">
                      <button className="w-full py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-1">
                        <HandCoins className="h-4 w-4" />
                        <span>Tham gia</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Phân trang */}
        {sortedCampaigns.length > 0 && (
          <div className="flex justify-center mt-10">
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-lg border flex items-center justify-center text-gray-400 hover:bg-gray-50">
                &lt;
              </button>
              <button className="w-10 h-10 rounded-lg border flex items-center justify-center bg-orange-600 text-white">
                1
              </button>
              <button className="w-10 h-10 rounded-lg border flex items-center justify-center text-gray-700 hover:bg-gray-50">
                2
              </button>
              <button className="w-10 h-10 rounded-lg border flex items-center justify-center text-gray-700 hover:bg-gray-50">
                3
              </button>
              <button className="w-10 h-10 rounded-lg border flex items-center justify-center text-gray-400 hover:bg-gray-50">
                &gt;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
