import { useState } from "react";
import {
  DollarSign,
  Calendar,
  ChevronDown,
  Search,
  Download,
  PlusCircle,
  Wallet,
  ArrowDownUp,
} from "lucide-react";

export default function PublisherPayment() {
  const [activeTab, setActiveTab] = useState("history");
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [timeRange, setTimeRange] = useState("Tháng này");

  // Dữ liệu mẫu
  const paymentHistory = [
    {
      id: "PAY-20240319-001",
      date: "19/03/2024",
      amount: 1450000,
      status: "completed",
      method: "Chuyển khoản ngân hàng",
    },
    {
      id: "PAY-20240212-002",
      date: "12/02/2024",
      amount: 2150000,
      status: "completed",
      method: "Ví điện tử MoMo",
    },
    {
      id: "PAY-20240125-003",
      date: "25/01/2024",
      amount: 980000,
      status: "completed",
      method: "Chuyển khoản ngân hàng",
    },
    {
      id: "PAY-20240105-004",
      date: "05/01/2024",
      amount: 1850000,
      status: "failed",
      method: "Chuyển khoản ngân hàng",
    },
  ];

  const paymentMethods = [
    {
      id: 1,
      type: "bank",
      name: "Ngân hàng Techcombank",
      accountNumber: "19036789421",
      accountName: "NGUYEN VAN A",
      default: true,
    },
    {
      id: 2,
      type: "wallet",
      name: "Ví MoMo",
      accountNumber: "0912345678",
      accountName: "NGUYEN VAN A",
      default: false,
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-10 px-4 md:px-8 lg:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Quản lý thanh toán
          </h1>
          <div className="bg-white p-2 rounded-lg shadow-sm flex items-center">
            <DollarSign className="h-5 w-5 text-green-500 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Số dư hiện tại</p>
              <p className="font-bold text-xl">3,250,000 VNĐ</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-t-lg shadow-sm mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("history")}
              className={`flex-1 py-4 text-center font-medium ${
                activeTab === "history"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Lịch sử thanh toán
            </button>
            <button
              onClick={() => setActiveTab("withdraw")}
              className={`flex-1 py-4 text-center font-medium ${
                activeTab === "withdraw"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Rút tiền
            </button>
            <button
              onClick={() => setActiveTab("methods")}
              className={`flex-1 py-4 text-center font-medium ${
                activeTab === "methods"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Phương thức thanh toán
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-b-lg shadow-sm p-6">
          {/* Lịch sử thanh toán */}
          {activeTab === "history" && (
            <div>
              <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">
                <div className="relative w-full md:w-72">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm theo ID giao dịch"
                    className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                  <div className="relative">
                    <button
                      onClick={() => setFilterOpen(!filterOpen)}
                      className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
                    >
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>{timeRange}</span>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </button>
                    {filterOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 py-1">
                        {[
                          "Hôm nay",
                          "Tuần này",
                          "Tháng này",
                          "Quý này",
                          "Năm nay",
                        ].map((range) => (
                          <button
                            key={range}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            onClick={() => {
                              setTimeRange(range);
                              setFilterOpen(false);
                            }}
                          >
                            {range}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                    <Download className="h-4 w-4" />
                    <span>Xuất CSV</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID giao dịch
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ngày
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Số tiền
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phương thức
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trạng thái
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paymentHistory.map((payment) => (
                      <tr key={payment.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {payment.id}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500">
                          {payment.date}
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-900">
                          {payment.amount.toLocaleString()} VNĐ
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500">
                          {payment.method}
                        </td>
                        <td className="px-4 py-4 text-sm">
                          <span
                            className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                              payment.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {payment.status === "completed"
                              ? "Hoàn thành"
                              : "Thất bại"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Hiển thị 1-4 trong tổng số 4 giao dịch
                </p>
                <div className="flex gap-2">
                  <button className="px-3 py-1 border rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed">
                    Trước
                  </button>
                  <button className="px-3 py-1 border rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed">
                    Sau
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Rút tiền */}
          {activeTab === "withdraw" && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-2">
                  <div className="mb-6">
                    <h2 className="text-lg font-medium mb-4">
                      Yêu cầu rút tiền
                    </h2>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Số tiền cần rút
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          className="pl-12 pr-4 py-3 border rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-blue-500 text-lg"
                          placeholder="Nhập số tiền"
                        />
                        <span className="absolute left-0 top-0 bottom-0 flex items-center justify-center w-12 text-gray-500 border-r">
                          VNĐ
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Số dư khả dụng: 3,250,000 VNĐ
                      </p>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phương thức thanh toán
                      </label>
                      <div className="flex gap-4 mb-4">
                        <button
                          className={`flex-1 flex justify-center items-center gap-2 p-3 border rounded-lg ${
                            paymentMethod === "bank"
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:bg-gray-50"
                          }`}
                          onClick={() => setPaymentMethod("bank")}
                        >
                          <span className="font-medium">Chuyển khoản</span>
                        </button>
                        <button
                          className={`flex-1 flex justify-center items-center gap-2 p-3 border rounded-lg ${
                            paymentMethod === "wallet"
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:bg-gray-50"
                          }`}
                          onClick={() => setPaymentMethod("wallet")}
                        >
                          <Wallet className="h-5 w-5 text-purple-600" />
                          <span className="font-medium">Ví điện tử</span>
                        </button>
                      </div>

                      {paymentMethod === "bank" && (
                        <div className="p-4 border rounded-lg bg-gray-50">
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-gray-500">
                              Ngân hàng:
                            </span>
                            <span className="text-sm font-medium">
                              Techcombank
                            </span>
                          </div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-gray-500">
                              Số tài khoản:
                            </span>
                            <span className="text-sm font-medium">
                              19036789421
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">
                              Chủ tài khoản:
                            </span>
                            <span className="text-sm font-medium">
                              NGUYEN VAN A
                            </span>
                          </div>
                        </div>
                      )}

                      {paymentMethod === "wallet" && (
                        <div className="p-4 border rounded-lg bg-gray-50">
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-gray-500">
                              Ví điện tử:
                            </span>
                            <span className="text-sm font-medium">MoMo</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">
                              Số điện thoại:
                            </span>
                            <span className="text-sm font-medium">
                              0912345678
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      Yêu cầu rút tiền
                    </button>
                  </div>
                </div>

                <div>
                  <div className="bg-gray-50 p-5 rounded-lg border">
                    <h3 className="font-medium mb-4">Thông tin rút tiền</h3>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Phương thức:</span>
                        <span className="font-medium">
                          {paymentMethod === "bank"
                            ? "Chuyển khoản ngân hàng"
                            : "Ví điện tử"}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-500">Phí giao dịch:</span>
                        <span className="font-medium">0 VNĐ</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-500">Thời gian xử lý:</span>
                        <span className="font-medium">1-3 ngày làm việc</span>
                      </div>

                      <div className="border-t pt-3 mt-3">
                        <div className="flex justify-between text-lg">
                          <span className="font-medium">Tổng số dư:</span>
                          <span className="font-semibold">3,250,000 VNĐ</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Phương thức thanh toán */}
          {activeTab === "methods" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium">
                  Phương thức thanh toán đã lưu
                </h2>
                <button
                  onClick={() => setShowAddPayment(!showAddPayment)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>Thêm phương thức</span>
                </button>
              </div>

              {showAddPayment && (
                <div className="mb-6 p-5 border rounded-lg bg-gray-50">
                  <h3 className="font-medium mb-4">
                    Thêm phương thức thanh toán mới
                  </h3>

                  <div className="flex gap-4 mb-4">
                    <button
                      className={`flex-1 flex justify-center items-center gap-2 p-3 border rounded-lg ${
                        paymentMethod === "bank"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                      onClick={() => setPaymentMethod("bank")}
                    >
                      <span className="font-medium">Tài khoản ngân hàng</span>
                    </button>
                    <button
                      className={`flex-1 flex justify-center items-center gap-2 p-3 border rounded-lg ${
                        paymentMethod === "wallet"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                      onClick={() => setPaymentMethod("wallet")}
                    >
                      <Wallet className="h-5 w-5 text-purple-600" />
                      <span className="font-medium">Ví điện tử</span>
                    </button>
                  </div>

                  {paymentMethod === "bank" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Ngân hàng
                        </label>
                        <select className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500">
                          <option>Vietcombank</option>
                          <option>Techcombank</option>
                          <option>BIDV</option>
                          <option>VPBank</option>
                          <option>MBBank</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Số tài khoản
                        </label>
                        <input
                          type="text"
                          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Nhập số tài khoản"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Chủ tài khoản
                        </label>
                        <input
                          type="text"
                          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Nhập tên chủ tài khoản"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          Vui lòng nhập tên chủ tài khoản bằng chữ in hoa không
                          dấu
                        </p>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "wallet" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Loại ví điện tử
                        </label>
                        <select className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500">
                          <option>MoMo</option>
                          <option>ZaloPay</option>
                          <option>VNPay</option>
                          <option>ShopeePay</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Số điện thoại
                        </label>
                        <input
                          type="text"
                          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Nhập số điện thoại liên kết với ví"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end mt-6 gap-3">
                    <button
                      onClick={() => setShowAddPayment(false)}
                      className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                    >
                      Hủy
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Lưu phương thức
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className="p-4 border rounded-lg flex items-center justify-between hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      {method.type === "bank" ? (
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center"></div>
                      ) : (
                        <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <Wallet className="h-5 w-5 text-purple-600" />
                        </div>
                      )}

                      <div>
                        <p className="font-medium">{method.name}</p>
                        <p className="text-sm text-gray-500">
                          {method.type === "bank"
                            ? "Số tài khoản: "
                            : "Số điện thoại: "}
                          {method.accountNumber}
                        </p>
                      </div>

                      {method.default && (
                        <span className="ml-3 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Mặc định
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {!method.default && (
                        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                          <ArrowDownUp className="h-4 w-4" />
                        </button>
                      )}
                      <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
