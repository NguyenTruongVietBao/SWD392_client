import useAuthStore from "../store/useAuthStore";
import { Navigate, Link } from "react-router";
import { Role } from "../constants/enums";
import {
  ArrowRight,
  BarChart3,
  DollarSign,
  Rocket,
  ShieldCheck,
  Users,
  CheckCircle,
  TrendingUp,
  Globe,
} from "lucide-react";

const { ADMIN, PUBLISHER, ADVERTISER } = Role;

export default function Home() {
  const { user } = useAuthStore();

  if (user?.role === ADVERTISER) {
    return <Navigate to="/advertiser" />;
  } else if (user?.role === PUBLISHER) {
    return <Navigate to="/publisher" />;
  } else if (user?.role === ADMIN) {
    return <Navigate to="/admin" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 pt-24 pb-32 max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Hero Left: Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-block px-3 py-1 text-sm bg-orange-100 text-orange-800 rounded-full font-medium mb-6 animate-fadeIn">
                #1 Mạng Lưới Affiliate Tại Việt Nam
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-slideInBottom">
                Tối Ưu Thu Nhập Với Mạng Lưới{" "}
                <span className="text-orange-600 relative">
                  Affiliate
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-orange-100 -z-10 opacity-60"></span>
                </span>{" "}
                Hàng Đầu
              </h1>

              <p className="text-xl text-gray-600 max-w-2xl lg:mr-auto lg:ml-0 mx-auto mb-10 animate-fadeIn animation-delay-300">
                Kết nối nhà quảng cáo và nhà xuất bản trong một nền tảng mạnh
                mẽ. Tăng doanh thu, mở rộng tầm với và tối ưu hóa chiến dịch
                tiếp thị của bạn.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10 animate-fadeIn animation-delay-600">
                <Link
                  to="/register?role=advertiser"
                  className="px-8 py-4 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 hover:scale-105 transition-all duration-300 flex items-center justify-center shadow-lg"
                >
                  Bắt đầu với Nhà quảng cáo{" "}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/register?role=publisher"
                  className="px-8 py-4 bg-white text-orange-600 font-semibold rounded-lg border-2 border-orange-600 hover:bg-orange-50 hover:scale-105 transition-all duration-300 flex items-center justify-center shadow-sm"
                >
                  Đăng ký làm Nhà xuất bản{" "}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-8 animate-fadeIn animation-delay-900">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-600">Thanh toán nhanh chóng</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-600">Báo cáo thời gian thực</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-600">Hỗ trợ 24/7</span>
                </div>
              </div>
            </div>

            {/* Hero Right: Graphics */}
            <div className="flex-1 relative hidden lg:block">
              <div className="relative w-full h-[500px] bg-white rounded-2xl shadow-xl overflow-hidden animate-float">
                {/* Dashboard Mockup */}
                <div className="absolute top-0 left-0 w-full h-12 bg-gray-100 flex items-center pl-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>

                <div className="p-6 pt-16">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        Tổng quan chiến dịch
                      </h3>
                      <p className="text-sm text-gray-500">Tháng 3, 2025</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                      <TrendingUp className="h-4 w-4" />
                      <span>+24.5%</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">
                        Tổng doanh thu
                      </p>
                      <p className="text-2xl font-bold text-gray-800">
                        $12,546
                      </p>
                      <div className="flex items-center gap-1 text-green-600 text-xs mt-2">
                        <TrendingUp className="h-3 w-3" />
                        <span>+12.3% so với tháng trước</span>
                      </div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Truy cập</p>
                      <p className="text-2xl font-bold text-gray-800">1,259</p>
                      <div className="flex items-center gap-1 text-green-600 text-xs mt-2">
                        <TrendingUp className="h-3 w-3" />
                        <span>+8.1% so với tháng trước</span>
                      </div>
                    </div>
                  </div>

                  <div className="h-32 bg-gray-100 rounded-lg mb-8 overflow-hidden relative">
                    {/* Simple Chart Visualization */}
                    <div className="absolute bottom-0 left-0 w-full h-24 flex items-end px-4">
                      <div className="w-1/12 h-[30%] bg-orange-500 rounded-t-sm mx-1"></div>
                      <div className="w-1/12 h-[45%] bg-orange-500 rounded-t-sm mx-1"></div>
                      <div className="w-1/12 h-[25%] bg-orange-500 rounded-t-sm mx-1"></div>
                      <div className="w-1/12 h-[60%] bg-orange-500 rounded-t-sm mx-1"></div>
                      <div className="w-1/12 h-[40%] bg-orange-500 rounded-t-sm mx-1"></div>
                      <div className="w-1/12 h-[75%] bg-orange-500 rounded-t-sm mx-1"></div>
                      <div className="w-1/12 h-[55%] bg-orange-500 rounded-t-sm mx-1"></div>
                      <div className="w-1/12 h-[80%] bg-orange-500 rounded-t-sm mx-1"></div>
                      <div className="w-1/12 h-[65%] bg-orange-500 rounded-t-sm mx-1"></div>
                      <div className="w-1/12 h-[90%] bg-orange-500 rounded-t-sm mx-1"></div>
                      <div className="w-1/12 h-[70%] bg-orange-500 rounded-t-sm mx-1"></div>
                      <div className="w-1/12 h-[85%] bg-orange-500 rounded-t-sm mx-1"></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-gray-100 h-16 rounded-lg flex items-center justify-center">
                      <Globe className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="bg-gray-100 h-16 rounded-lg flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="bg-gray-100 h-16 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-200 rounded-2xl rotate-12 animate-float animation-delay-1000"></div>
              <div className="absolute bottom-12 -left-8 w-16 h-16 bg-orange-200 rounded-full animate-float animation-delay-2000"></div>
              <div className="absolute -bottom-10 right-20 w-20 h-20 bg-purple-200 rounded-lg rotate-45 animate-float animation-delay-3000"></div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-24 relative z-10">
            <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-center">
              <p className="text-4xl font-bold text-orange-500 mb-2">10K+</p>
              <p className="text-gray-600">Nhà xuất bản hoạt động</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-center">
              <p className="text-4xl font-bold text-orange-500 mb-2">5K+</p>
              <p className="text-gray-600">Chiến dịch quảng cáo</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-center">
              <p className="text-4xl font-bold text-orange-500 mb-2">$2M+</p>
              <p className="text-gray-600">Thanh toán hàng tháng</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tại Sao Chọn Chúng Tôi?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nền tảng của chúng tôi cung cấp những công cụ và nguồn lực tốt
              nhất để đạt được thành công trong tiếp thị liên kết.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 border border-gray-200 rounded-xl hover:shadow-lg transition hover:border-orange-300">
              <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center mb-5">
                <BarChart3 className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Phân tích thời gian thực
              </h3>
              <p className="text-gray-600">
                Truy cập dữ liệu chiến dịch và hiệu suất chi tiết để tối ưu hóa
                chiến lược của bạn.
              </p>
            </div>

            <div className="p-8 border border-gray-200 rounded-xl hover:shadow-lg transition hover:border-orange-300">
              <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center mb-5">
                <DollarSign className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Thanh toán nhanh chóng
              </h3>
              <p className="text-gray-600">
                Nhận thanh toán đúng hạn với nhiều phương thức thanh toán khác
                nhau.
              </p>
            </div>

            <div className="p-8 border border-gray-200 rounded-xl hover:shadow-lg transition hover:border-orange-300">
              <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center mb-5">
                <ShieldCheck className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Bảo mật hàng đầu</h3>
              <p className="text-gray-600">
                Hệ thống phát hiện gian lận tiên tiến đảm bảo chất lượng lưu
                lượng truy cập và bảo vệ dữ liệu.
              </p>
            </div>

            <div className="p-8 border border-gray-200 rounded-xl hover:shadow-lg transition hover:border-orange-300">
              <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center mb-5">
                <Rocket className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Công cụ tiếp thị tự động
              </h3>
              <p className="text-gray-600">
                Tối ưu hóa chiến dịch của bạn với các công cụ tự động và tích
                hợp API mạnh mẽ.
              </p>
            </div>

            <div className="p-8 border border-gray-200 rounded-xl hover:shadow-lg transition hover:border-orange-300">
              <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center mb-5">
                <Users className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Hỗ trợ chuyên nghiệp
              </h3>
              <p className="text-gray-600">
                Đội ngũ hỗ trợ chuyên nghiệp luôn sẵn sàng giúp đỡ trong mọi
                bước của quá trình.
              </p>
            </div>

            <div className="p-8 border border-gray-200 rounded-xl hover:shadow-lg transition hover:border-orange-300">
              <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center mb-5">
                <BarChart3 className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Khả năng mở rộng</h3>
              <p className="text-gray-600">
                Nền tảng của chúng tôi phát triển cùng doanh nghiệp của bạn, từ
                nhỏ đến toàn cầu.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-24 bg-orange-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Cách Thức Hoạt Động
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quy trình đơn giản giúp bạn bắt đầu và phát triển doanh thu
              affiliate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Đăng ký & Xác Thực</h3>
              <p className="text-gray-600">
                Tạo tài khoản, xác thực thông tin và chọn vai trò của bạn (nhà
                quảng cáo hoặc nhà xuất bản).
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Kết Nối & Hợp Tác</h3>
              <p className="text-gray-600">
                Tìm kiếm chiến dịch phù hợp hoặc tạo chiến dịch mới để mở rộng
                tầm với của bạn.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Tăng Trưởng & Thu Nhập
              </h3>
              <p className="text-gray-600">
                Theo dõi hiệu suất, tối ưu hóa chiến lược và tăng thu nhập của
                bạn theo thời gian.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-orange-500 text-white">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Sẵn sàng phát triển cùng chúng tôi?
          </h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            Dù bạn là nhà quảng cáo tìm kiếm sự tăng trưởng hay nhà xuất bản
            muốn tăng thu nhập, chúng tôi có giải pháp cho bạn.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="px-8 py-4 bg-white text-orange-500 font-semibold rounded-lg hover:bg-orange-50 transition-all duration-300 hover:scale-105 flex items-center justify-center shadow-lg"
            >
              Đăng nhập <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/register"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-orange-600 transition-all duration-300 hover:scale-105 flex items-center justify-center shadow-lg"
            >
              Đăng ký ngay <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
