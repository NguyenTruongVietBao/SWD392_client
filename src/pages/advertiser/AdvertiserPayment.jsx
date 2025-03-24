import { useState } from "react";
import {
  DollarSign,
  Calendar,
  ChevronDown,
  Search,
  Download,
  Wallet,
  CreditCard,
  Building,
  ArrowUp,
} from "lucide-react";
import { toast } from "react-toastify";

export default function AdvertiserPayment() {
  const [activeTab, setActiveTab] = useState("history");
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [filterOpen, setFilterOpen] = useState(false);
  const [timeRange, setTimeRange] = useState("Tháng này");
  const [depositAmount, setDepositAmount] = useState("");
  const [depositLoading, setDepositLoading] = useState(false);

  // Dữ liệu mẫu tài khoản
  const accountData = {
    balance: 2500000,
    pendingAmount: 350000,
    totalSpent: 12450000,
  };

  // Dữ liệu mẫu lịch sử giao dịch
  const transactionHistory = [
    {
      id: "DEP-20240324-001",
      date: "24/03/2024",
      amount: 2500000,
      type: "deposit",
      status: "completed",
      method: "Chuyển khoản ngân hàng",
    },
    {
      id: "PAY-20240319-001",
      date: "19/03/2024",
      amount: 1450000,
      type: "payment",
      status: "completed",
      method: "Tự động - Quảng cáo",
      campaign: "Chiến dịch mùa hè 2024",
    },
    {
      id: "PAY-20240212-002",
      date: "12/02/2024",
      amount: 1850000,
      type: "payment",
      status: "completed",
      method: "Tự động - Quảng cáo",
      campaign: "Giảm giá tháng 2",
    },
    {
      id: "DEP-20240125-003",
      date: "25/01/2024",
      amount: 5000000,
      type: "deposit",
      status: "completed",
      method: "Chuyển khoản ngân hàng",
    },
  ];

  // Thông tin về các phương thức thanh toán hỗ trợ
  const bankPaymentInfo = {
    bankName: "Ngân hàng Thương mại Cổ phần Kỹ thương Việt Nam (Techcombank)",
    accountNumber: "19038752146",
    accountName: "CONG TY TNHH QUANG CAO TRUC TUYEN TIP",
    branch: "Hồ Chí Minh",
    note: "Nội dung chuyển khoản: TIP <Mã tài khoản> <Email>",
  };

  // Các mệnh giá phổ biến
  const commonAmounts = [1000000, 2000000, 5000000, 10000000];

  // Xử lý nạp tiền
  const handleDeposit = async () => {
    if (!depositAmount || parseInt(depositAmount) <= 0) {
      toast.error("Vui lòng nhập số tiền hợp lệ");
      return;
    }

    setDepositLoading(true);
    try {
      // Mô phỏng API gọi - sẽ thay thế bằng API thực tế
      // const response = await axiosInstance.post('/api/advertiser/deposit', {
      //   amount: parseInt(depositAmount),
      //   method: paymentMethod,
      // });

      // Mô phỏng API thành công
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(
        `Yêu cầu nạp ${parseInt(
          depositAmount
        ).toLocaleString()} VNĐ thành công!`
      );
      setDepositAmount("");
      setActiveTab("history");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi thực hiện nạp tiền");
      console.error("Lỗi nạp tiền:", error);
    } finally {
      setDepositLoading(false);
    }
  };

  // Format số tiền khi nhập
  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setDepositAmount(value);
  };

  return (
    <div className="min-h-screen pt-20 pb-10 px-4 md:px-8 lg:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Wallet className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                Số dư khả dụng
              </h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {accountData.balance.toLocaleString()} VNĐ
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Số dư tài khoản quảng cáo của bạn
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <ArrowUp className="h-5 w-5 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                Đang xử lý
              </h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {accountData.pendingAmount.toLocaleString()} VNĐ
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Số tiền nạp đang được xử lý
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                Tổng chi tiêu
              </h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {accountData.totalSpent.toLocaleString()} VNĐ
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Tổng chi phí quảng cáo đến nay
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-t-lg shadow-sm mb-1">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("history")}
              className={`flex-1 py-4 text-center font-medium ${
                activeTab === "history"
                  ? "text-orange-600 border-b-2 border-orange-600"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Lịch sử giao dịch
            </button>
            <button
              onClick={() => setActiveTab("deposit")}
              className={`flex-1 py-4 text-center font-medium ${
                activeTab === "deposit"
                  ? "text-orange-600 border-b-2 border-orange-600"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Nạp tiền
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-b-lg shadow-sm p-6">
          {/* Lịch sử giao dịch */}
          {activeTab === "history" && (
            <div>
              <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">
                <div className="relative w-full md:w-72">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm theo ID giao dịch"
                    className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-orange-500"
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

                  <button className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100">
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
                        Loại
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Số tiền
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Chi tiết
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trạng thái
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {transactionHistory.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {transaction.id}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500">
                          {transaction.date}
                        </td>
                        <td className="px-4 py-4 text-sm">
                          <span
                            className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                              transaction.type === "deposit"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {transaction.type === "deposit"
                              ? "Nạp tiền"
                              : "Chi tiêu"}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-900">
                          {transaction.amount.toLocaleString()} VNĐ
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500">
                          {transaction.type === "deposit"
                            ? transaction.method
                            : transaction.campaign}
                        </td>
                        <td className="px-4 py-4 text-sm">
                          <span
                            className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                              transaction.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : transaction.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {transaction.status === "completed"
                              ? "Hoàn thành"
                              : transaction.status === "pending"
                              ? "Đang xử lý"
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

          {/* Nạp tiền */}
          {activeTab === "deposit" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-100 mb-6">
                  <h3 className="text-base font-medium text-orange-800 mb-2">
                    Lưu ý khi nạp tiền
                  </h3>
                  <ul className="text-sm text-orange-700 space-y-2">
                    <li>• Số tiền nạp tối thiểu là 500,000 VNĐ</li>
                    <li>• Giao dịch nạp tiền được xử lý trong vòng 24h</li>
                    <li>• Số dư khả dụng sau khi giao dịch được xác nhận</li>
                    <li>
                      • Có vấn đề cần hỗ trợ? Liên hệ{" "}
                      <a href="mailto:support@tip.vn" className="underline">
                        support@tip.vn
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h3 className="text-base font-medium text-gray-800 mb-3">
                    Câu hỏi thường gặp
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">
                        Thời gian xử lý giao dịch?
                      </h4>
                      <p className="text-sm text-gray-600">
                        Giao dịch được xử lý trong vòng 24 giờ làm việc.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">
                        Tôi có thể rút tiền từ tài khoản không?
                      </h4>
                      <p className="text-sm text-gray-600">
                        Số dư tài khoản chỉ được sử dụng để thanh toán quảng cáo
                        và không thể rút ra.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">
                        Có chấp nhận thanh toán quốc tế không?
                      </h4>
                      <p className="text-sm text-gray-600">
                        Hiện tại hệ thống chỉ hỗ trợ thanh toán nội địa Việt
                        Nam.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 space-y-6">
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="p-5 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">
                      Nạp tiền vào tài khoản
                    </h3>
                  </div>

                  <div className="p-5 space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phương thức nạp tiền
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                          className={`flex items-center gap-3 p-4 rounded-lg border ${
                            paymentMethod === "bank"
                              ? "border-orange-500 bg-orange-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => setPaymentMethod("bank")}
                        >
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Building className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-800">
                              Chuyển khoản ngân hàng
                            </h4>
                            <p className="text-xs text-gray-500">
                              Chuyển khoản qua tài khoản ngân hàng
                            </p>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full border ${
                              paymentMethod === "bank"
                                ? "border-orange-500 bg-orange-500"
                                : "border-gray-300"
                            }`}
                          ></div>
                        </button>

                        <button
                          className={`flex items-center gap-3 p-4 rounded-lg border ${
                            paymentMethod === "card"
                              ? "border-orange-500 bg-orange-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => setPaymentMethod("card")}
                          disabled
                        >
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <CreditCard className="h-5 w-5 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-800">
                              Thẻ tín dụng
                            </h4>
                            <p className="text-xs text-gray-500">Sắp ra mắt</p>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full border ${
                              paymentMethod === "card"
                                ? "border-orange-500 bg-orange-500"
                                : "border-gray-300"
                            }`}
                          ></div>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Số tiền nạp
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <DollarSign className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          value={depositAmount}
                          onChange={handleAmountChange}
                          placeholder="0"
                          className="pl-10 pr-4 py-3 border rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-orange-500 text-lg"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span className="text-gray-500">VNĐ</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Số tiền nạp tối thiểu: 500,000 VNĐ
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mệnh giá phổ biến
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {commonAmounts.map((amount) => (
                          <button
                            key={amount}
                            type="button"
                            className={`py-2 px-3 border rounded-lg text-center hover:bg-gray-50 
                              ${
                                depositAmount === amount.toString()
                                  ? "border-orange-500 bg-orange-50"
                                  : "border-gray-200"
                              }`}
                            onClick={() => setDepositAmount(amount.toString())}
                          >
                            <span className="text-sm font-medium">
                              {amount.toLocaleString()} VNĐ
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {paymentMethod === "bank" && (
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h4 className="text-sm font-medium text-gray-800 mb-3">
                          Thông tin chuyển khoản
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">
                              Ngân hàng:
                            </span>
                            <span className="text-sm font-medium text-gray-800">
                              {bankPaymentInfo.bankName}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">
                              Số tài khoản:
                            </span>
                            <span className="text-sm font-medium text-gray-800">
                              {bankPaymentInfo.accountNumber}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">
                              Chủ tài khoản:
                            </span>
                            <span className="text-sm font-medium text-gray-800">
                              {bankPaymentInfo.accountName}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">
                              Chi nhánh:
                            </span>
                            <span className="text-sm font-medium text-gray-800">
                              {bankPaymentInfo.branch}
                            </span>
                          </div>
                          <div className="border-t pt-3">
                            <span className="text-sm text-gray-500">
                              Nội dung chuyển khoản:
                            </span>
                            <div className="mt-1 p-2 bg-white border border-gray-200 rounded text-sm font-mono">
                              {bankPaymentInfo.note}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="pt-4">
                      <button
                        onClick={handleDeposit}
                        disabled={!depositAmount || depositLoading}
                        className={`w-full py-3 text-white rounded-lg text-center font-medium
                          ${
                            !depositAmount || depositLoading
                              ? "bg-gray-300 cursor-not-allowed"
                              : "bg-orange-500 hover:bg-orange-600"
                          }`}
                      >
                        {depositLoading ? "Đang xử lý..." : "Nạp tiền"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
