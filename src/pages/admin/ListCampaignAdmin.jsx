import { useEffect, useState } from "react";
import axiosInstance from "../../lib/axiosInstance";
import Loading from "../../components/Loading";

const ListCampaignAdmin = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("ALL");

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axiosInstance.get(`/api/advertiser/campaigns`);
        setCampaigns(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  // Fetch campaign detail
  const fetchCampaignDetail = async (id) => {
    setDetailLoading(true);
    try {
      const res = await axiosInstance.get(`/api/advertiser/campaigns/${id}`);
      setSelectedCampaign(res.data);
    } catch (err) {
      console.error("Error fetching campaign detail:", err);
    } finally {
      setDetailLoading(false);
    }
  };

  // Close modal
  const closeModal = () => {
    setSelectedCampaign(null);
  };

  // Lọc danh sách theo trạng thái
  const filteredCampaigns = campaigns.filter((campaign) => {
    if (filterStatus === "ALL") return true;
    return campaign.status === filterStatus;
  });

  if (loading) return <Loading />;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen pt-20 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold text-center mb-4">Campaign List</h1>

      {/* Bộ lọc */}
      <div className="mb-4">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="ALL">Tất cả</option>
          <option value="APPROVED">Đã phê duyệt</option>
          <option value="REJECTED">Bị từ chối</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Budget</th>
              <th>Commission</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCampaigns.map((campaign) => (
              <tr key={campaign.id}>
                <td>{campaign.id}</td>
                <td>{campaign.title}</td>
                <td>{campaign.budget}</td>
                <td>{campaign.commissionValue}</td>
                <td>{campaign.startDate}</td>
                <td>{campaign.endDate}</td>
                <td>{campaign.status}</td>
                <td>
                  <button
                    onClick={() => fetchCampaignDetail(campaign.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Detail */}
      {selectedCampaign && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">{selectedCampaign.title}</h2>
            {detailLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                <p>
                  <strong>Budget:</strong> {selectedCampaign.budget}
                </p>
                <p>
                  <strong>Description:</strong> {selectedCampaign.description}
                </p>
                <p>
                  <strong>Target Audience:</strong>{" "}
                  {selectedCampaign.targetAudience}
                </p>
                <p>
                  <strong>Commission Rate:</strong>{" "}
                  {selectedCampaign.commissionRate}
                </p>
                <p>
                  <strong>Commission Value:</strong>{" "}
                  {selectedCampaign.commissionValue}
                </p>
                <p>
                  <strong>Rating:</strong> {selectedCampaign.rating}
                </p>
                <p>
                  <strong>Ads Link:</strong>
                  <a
                    href={selectedCampaign.adsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    {" "}
                    Link
                  </a>
                </p>
                <img
                  src={selectedCampaign.imageUrl}
                  alt={selectedCampaign.title}
                  className="w-full h-40 object-cover rounded mt-2"
                />
                <p>
                  <strong>Start Date:</strong> {selectedCampaign.startDate}
                </p>
                <p>
                  <strong>End Date:</strong> {selectedCampaign.endDate}
                </p>
                <p>
                  <strong>Status:</strong> {selectedCampaign.status}
                </p>
              </>
            )}
            <button
              onClick={closeModal}
              className="mt-4 bg-red-500 text-white px-3 py-1 rounded w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListCampaignAdmin;
