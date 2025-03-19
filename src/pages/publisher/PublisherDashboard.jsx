import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  MousePointer,
  ChevronDown,
  Search,
  Filter,
  Tag,
  ExternalLink,
  Link as LinkIcon,
  MoreHorizontal,
  Calendar,
} from "lucide-react";

export default function PublisherDashboard() {
  const [timeRange] = useState("Tháng này");

  // Dữ liệu mẫu cho biểu đồ
  const earningsData = [
    3800, 4200, 3500, 5200, 4900, 6100, 5800, 6200, 5500, 7200, 6500, 7800,
  ];
  const maxEarnings = Math.max(...earningsData);

  // Dữ liệu mẫu cho chiến dịch
  const campaigns = [
    {
      id: 1,
      name: "Thời trang nam Thu Đông 2025",
      advertiser: "FashionVN Store",
      commission: "15% / đơn hàng",
      earnings: 1250.8,
      clicks: 432,
      conversions: 28,
      status: "active",
    },
    {
      id: 2,
      name: "Khóa học Digital Marketing Pro",
      advertiser: "EduTech Vietnam",
      commission: "25% / đăng ký",
      earnings: 978.5,
      clicks: 385,
      conversions: 15,
      status: "active",
    },
    {
      id: 3,
      name: "Ưu đãi Điện thoại Galaxy S28",
      advertiser: "TechZone",
      commission: "8% / sản phẩm",
      earnings: 1564.2,
      clicks: 625,
      conversions: 23,
      status: "active",
    },
    {
      id: 4,
      name: "Du lịch hè Phú Quốc",
      advertiser: "VnTravel",
      commission: "12% / booking",
      earnings: 860.75,
      clicks: 298,
      conversions: 12,
      status: "active",
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Tiêu đề và điều khiển */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Bảng Điều Khiển
            </h1>
            <p className="text-gray-500">
              Chào mừng trở lại, theo dõi hiệu suất của bạn hôm nay
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

            <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-4 py-2 text-sm font-medium transition-all">
              Tải Xuống Báo Cáo
            </button>
          </div>
        </div>

        {/* Thẻ thống kê */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Tổng thu nhập */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Tổng Thu Nhập
                </p>
                <h3 className="text-2xl font-bold text-gray-800">$4,587.42</h3>
                <div className="flex items-center gap-1 mt-2">
                  <div className="text-xs font-medium text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    24.5%
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
          {/* Lượt click */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Lượt Click
                </p>
                <h3 className="text-2xl font-bold text-gray-800">12,846</h3>
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
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <MousePointer className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </div>
          {/* Chuyển đổi */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Chuyển Đổi
                </p>
                <h3 className="text-2xl font-bold text-gray-800">432</h3>
                <div className="flex items-center gap-1 mt-2">
                  <div className="text-xs font-medium text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    12.7%
                  </div>
                  <span className="text-xs text-gray-500">
                    so với tháng trước
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Tag className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </div>
          {/* Tỷ lệ chuyển đổi */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Tỷ Lệ Chuyển Đổi
                </p>
                <h3 className="text-2xl font-bold text-gray-800">3.36%</h3>
                <div className="flex items-center gap-1 mt-2">
                  <div className="text-xs font-medium text-red-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1 rotate-180" />
                    0.8%
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
        </div>

        {/* Biểu đồ hiệu suất và thống kê chiến dịch hàng đầu */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Biểu đồ thu nhập */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Thu Nhập Theo Tháng
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
              {earningsData.map((earning, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center"
                >
                  <div className="group">
                    <div
                      className="w-8 bg-orange-500 rounded-t-sm hover:bg-orange-600 transition-all relative"
                      style={{ height: `${(earning / maxEarnings) * 180}px` }}
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap transition-opacity">
                        ${earning}
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

          {/* Thống kê chiến dịch hàng đầu */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Chiến Dịch Hàng Đầu
              </h3>
            </div>

            <div className="space-y-4">
              {campaigns.slice(0, 3).map((campaign) => (
                <div
                  key={campaign.id}
                  className="flex items-start py-3 border-b border-gray-100 last:border-0"
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                    <LinkIcon className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {campaign.name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {campaign.advertiser}
                    </p>
                    <div className="flex gap-4 mt-2">
                      <div className="flex items-center gap-1 text-xs">
                        <DollarSign className="h-3 w-3 text-green-500" />
                        <span className="font-medium">
                          ${campaign.earnings.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <MousePointer className="h-3 w-3 text-blue-500" />
                        <span>{campaign.clicks}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <Tag className="h-3 w-3 text-purple-500" />
                        <span>{campaign.conversions}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg py-2 text-sm font-medium transition-all">
              Thêm Chiến Dịch Mới
            </button>
          </div>
        </div>

        {/* Bảng chiến dịch */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Chiến Dịch Đang Hoạt Động
              </h3>

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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hoa hồng
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thu nhập
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
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-start">
                        <div className="ml-0">
                          <div className="text-sm font-medium text-gray-900">
                            {campaign.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {campaign.advertiser}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">
                        {campaign.commission}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm font-medium text-gray-900">
                        ${campaign.earnings.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm text-gray-700">
                        {campaign.clicks}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm text-gray-700">
                        {campaign.conversions}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm text-gray-700">
                        {(
                          (campaign.conversions / campaign.clicks) *
                          100
                        ).toFixed(2)}
                        %
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center">
                        <button className="p-1 rounded-full hover:bg-gray-100">
                          <ExternalLink className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                        </button>
                        <button className="p-1 rounded-full hover:bg-gray-100">
                          <MoreHorizontal className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="flex items-center">
              <p className="text-sm text-gray-700">
                Hiển thị <span className="font-medium">1</span> đến{" "}
                <span className="font-medium">4</span> của{" "}
                <span className="font-medium">4</span> kết quả
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
      </div>
    </div>
  );
}
