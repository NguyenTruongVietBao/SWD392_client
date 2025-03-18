import { useEffect, useState } from "react";
import axiosInstance from "../../lib/axiosInstance";
import Loading from "../../components/Loading";

const ListCampaignAdmin = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axiosInstance.get(`/api/advertiser/campaigns`);
        console.log("res", res.data);
        setCampaigns(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen pt-20 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold text-center mb-4">Campaign List</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Budget</th>
              <th>Description</th>
              <th>Target Audience</th>
              <th>Commission Rate</th>
              <th>Commission Value</th>
              <th>Rating</th>
              <th>Ads Link</th>
              <th>Image</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign.id}>
                <td>{campaign.id}</td>
                <td>{campaign.title}</td>
                <td>{campaign.budget}</td>
                <td>{campaign.description}</td>
                <td>{campaign.targetAudience}</td>
                <td>{campaign.commissionRate}</td>
                <td>{campaign.commissionValue}</td>
                <td>{campaign.rating}</td>
                <td>
                  <a
                    href={campaign.adsLink}
                    className="text-blue-500"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Link
                  </a>
                </td>
                <td>
                  <img
                    src={campaign.imageUrl}
                    alt={campaign.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td>{campaign.startDate}</td>
                <td>{campaign.endDate}</td>
                <td>{campaign.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListCampaignAdmin;
