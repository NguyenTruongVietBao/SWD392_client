import { useParams } from "react-router";
import axiosInstance from "../../lib/axiosInstance";
import Loading from "../../components/Loading";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function CampaignDetailPublisher() {
  let params = useParams();
  const campaignId = params.id;
  const [enrollStatus, setEnrollStatus] = useState("idle");

  // Campaign data query
  const { isLoading, error, data } = useQuery({
    queryKey: ["campaign", campaignId],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/api/advertiser/campaigns/${campaignId}`
      );
      if (!res.data) {
        throw new Error("No data found");
      }
      return {
        ...res.data,
        feedback: {
          // Mock feedback data - replace with actual API data
          totalReviews: 15,
          avgRating: 4.5,
          comments: [
            { id: 1, text: "Great campaign, easy to promote!", rating: 5 },
            {
              id: 2,
              text: "Good returns but needs clearer guidelines",
              rating: 4,
            },
          ],
        },
      };
    },
    enabled: !!campaignId,
  });

  // Enrollment mutation
  const enrollMutation = useMutation({
    mutationFn: () => axiosInstance.post(`/api/publisher/enroll/${campaignId}`),
    onSuccess: () => {
      setEnrollStatus("success");
    },
    onError: () => {
      setEnrollStatus("error");
    },
  });

  const handleEnroll = () => {
    setEnrollStatus("loading");
    enrollMutation.mutate();
  };

  if (isLoading) return <Loading />;
  if (error)
    return (
      <div className="text-center text-red-500 mt-10">
        Error: {error.message}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4 pb-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <button className="btn btn-square bg-gray-50">
              <a href="/publisher/campaigns">
                <ArrowLeft />
              </a>
            </button>
            {data.title}
          </h1>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              data.status === "APPROVED"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {data.status}
          </span>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <img
                src={data.imageUrl}
                alt={data.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Budget</p>
                  <p className="text-lg font-semibold text-gray-800">
                    ${data.budget.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Rating</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {data.rating}/5
                  </p>
                </div>
              </div>
            </div>

            {/* Enroll Button */}
            <button
              onClick={handleEnroll}
              disabled={
                enrollStatus === "loading" || enrollStatus === "success"
              }
              className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors ${
                enrollStatus === "success"
                  ? "bg-green-600 cursor-not-allowed"
                  : enrollStatus === "error"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {enrollStatus === "loading" && "Enrolling..."}
              {enrollStatus === "success" && "Enrolled Successfully"}
              {enrollStatus === "error" && "Try Again"}
              {enrollStatus === "idle" && "Enroll in Campaign"}
            </button>
          </div>

          {/* Right Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Details */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Campaign Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Description</p>
                    <p className="text-gray-800">{data.description}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Target Audience</p>
                    <p className="text-gray-800">{data.targetAudience}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Campaign Link</p>
                    <a
                      href={data.adsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 break-all"
                    >
                      {data.adsLink}
                    </a>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Commission</p>
                    <p className="text-gray-800">
                      {data.commissionRate}% (${data.commissionValue})
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="text-gray-800">
                      {new Date(data.startDate).toLocaleDateString()} -{" "}
                      {new Date(data.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Timeline</p>
                    <p className="text-gray-800 text-sm">
                      Created: {new Date(data.createdAt).toLocaleDateString()}
                      <br />
                      Approved: {new Date(data.approvedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feedback Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Publisher Feedback
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Average Rating</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {data.feedback.avgRating}/5
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Reviews</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {data.feedback.totalReviews}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Recent Comments</p>
                  {data.feedback.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="border-l-4 border-blue-500 pl-4 py-2 mb-2 bg-gray-50"
                    >
                      <p className="text-gray-800">{comment.text}</p>
                      <p className="text-sm text-gray-600">
                        Rating: {comment.rating}/5
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
