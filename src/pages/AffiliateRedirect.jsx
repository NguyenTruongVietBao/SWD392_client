import { useEffect } from "react";
import { useSearchParams } from "react-router";
import axiosInstance from "../lib/axiosInstance";
import Loading from "../components/Loading";

export default function AffiliateRedirect() {
  const [searchParams] = useSearchParams();
  const affId = searchParams.get("aff_id");
  console.log("affId", affId);

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        if (!affId) {
          return;
        }
        const response = await axiosInstance.get(
          `/api/advertiser/campaigns/affiliateLink/redirect?aff_id=${affId}`
        );
        if (response.data) {
          window.location.href = response.data;
        }
      } catch (error) {
        console.error("Lỗi khi xử lý affiliate link:", error);
      }
    };

    handleRedirect();
  }, [affId]);

  if (!affId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Redirecting ....
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loading />
        <p className="mt-4 text-gray-600">Đang chuyển hướng...</p>
      </div>
    </div>
  );
}
