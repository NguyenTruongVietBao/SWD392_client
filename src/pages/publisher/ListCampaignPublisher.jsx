import React, { useState } from "react";
import { Link } from "react-router";
import axiosInstance from "../../lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import { Eye, HandCoins, Star, User } from "lucide-react";

export default function ListCampaignPublisher() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["campaigns"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/advertiser/campaigns`);
      if (!res.data) {
        throw new Error("No data found");
      }
      console.log("res.data", res.data);
      return res.data;
    },
    staleTime: Infinity,
  });

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  const filteredCampaigns = data.filter((campaign) =>
    campaign.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-20 container mx-auto">
      <div className="flex flex-col gap-4 text-center text-5xl font-bold my-5">
        List Campaigns
      </div>
      <div className="flex justify-end gap-4 mb-5">
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            className="grow"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <kbd className="kbd kbd-sm">⌘</kbd>
          <kbd className="kbd kbd-sm">K</kbd>
        </label>
      </div>
      <div className="flex gap-4 mb-5">
        <div>Target Audience</div>
        <form className="filter">
          <input className="btn btn-square" type="reset" value="×" />
          <input
            className="btn"
            type="radio"
            name="frameworks"
            aria-label="Svelte"
          />
          <input
            className="btn"
            type="radio"
            name="frameworks"
            aria-label="Vue"
          />
          <input
            className="btn"
            type="radio"
            name="frameworks"
            aria-label="React"
          />
        </form>
      </div>
      <div className="flex gap-4 mb-5">
        <div>Sort by Commission</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {filteredCampaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="card bg-base-100 w-64 shadow-sm h-full"
          >
            <figure>
              <img
                src={
                  campaign.image ||
                  "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                }
                alt="Campaign"
              />
            </figure>
            <div className="card-body">
              <div className="flex flex-col gap-2 justify-between h-full">
                <div className="flex justify-between items-start">
                  <h2 className="card-title text-lg font-bold">
                    {campaign.title}
                  </h2>
                  <div className="badge badge-primary rounded-sm mt-2 font-bold">
                    {campaign.commissionRate}%
                  </div>
                </div>
                <div className="flex items-center gap-2 my-2">
                  <div className="text-sm font-medium flex items-center gap-1">
                    <Star
                      size={18}
                      strokeWidth={1.5}
                      className="text-yellow-500"
                    />
                    <p className="text-sm font-medium">{campaign.rating}</p>
                  </div>
                  |
                  <p className="text-sm font-medium flex items-center gap-1">
                    <User
                      size={18}
                      strokeWidth={1.5}
                      className="text-gray-500"
                    />
                    100
                  </p>
                </div>
              </div>
              <div className="card-actions items-center justify-end mt-2 gap-2">
                <Link to={`${campaign.id}`}>
                  <div className="badge badge-secondary rounded-lg py-3.5 flex items-center gap-1">
                    Detail <Eye size={20} strokeWidth={1.5} />
                  </div>
                </Link>
                <Link to={`/campaign/${campaign.id}`}>
                  <div className="badge badge-success rounded-lg py-3.5 flex items-center gap-1 font-semibold">
                    Register
                    <HandCoins size={20} strokeWidth={1.5} />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
