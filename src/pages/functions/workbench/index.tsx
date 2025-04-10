import { Col, Row, Space ,Select } from "antd";

import AreaDownload from "./area-download";
import BannerCard from "./banner-card";
import { Applications, CertificatesIssued, Conversion } from "./conversion_applications";
import CurrentDownload from "./current-download";
import NewInvoice from "./new-invoice";
import TopAuthor from "./top-authors";
import TopInstalled from "./top-installed";
import TopRelated from "./top-related";
import TotalCard from "./total-card";
import { useState } from "react";
import { useGetDashboardStatsQuery } from "@/api/services/ejbcaApi";
const { Option } = Select;
// Fallback dummy data
const fallbackData = [
  { date: "2025-04-01", count: 20 },
  { date: "2025-04-02", count: 30 },
  { date: "2025-04-03", count: 25 },
];
const fallbackDataSatus = [
  { status: "Pending", count: 50 },
  { status: "Approved", count: 300 },
  { status: "Rejected", count: 100 },
];
function Workbench() {
	const [interval, setInterval] = useState("weekly");

  const { data, isLoading } = useGetDashboardStatsQuery(interval);

  const handleIntervalChange = (value: string) => {
    setInterval(value);
  };
  // Determine data to use: fallback if empty array or error
  const requestData = data?.requestsOverTime?.length
    ? data.requestsOverTime
    : fallbackData;

  const categories = requestData.map((item:any) => item.date);
  const series = [
    {
      name: "Requests",
      data: requestData.map((item:any) => item.count),
    },
  ];
  const breakdownData = data?.requestStatusBreakdown?.length
    ? data.requestStatusBreakdown
    : fallbackDataSatus;

  const seriesStatus = breakdownData.map((item:any) => item.count);
  const labels = breakdownData.map((item:any) => item.status);
	return (
		<div className="p-2">
			<Row justify="space-between" align="middle" className="mb-2">
				<Col>
					<h2 className="text-lg font-semibold">Conversion Overview</h2>
				</Col>
				<Col>
					<Select
						value={interval}
						style={{ width: 150 }}
						onChange={handleIntervalChange}
					>
						<Option value="all">All</Option>
						<Option value="daily">Daily</Option>
						<Option value="weekly">Weekly</Option>
						<Option value="monthly">Monthly</Option>
						<Option value="yearly">Yearly</Option>
					</Select>
				</Col>
			</Row>
	<Row gutter={[16, 16]} justify="start">
   <Col span={24} md={8}>
          <Conversion
            title="Total Users"
            count={data?.totalUsers || 0}
            loading={isLoading}
          />
        </Col>
        <Col span={24} md={8}>
          <Applications
            title="Total Requests"
            count={data?.totalRequests || 0}
            loading={isLoading}
          />
        </Col>
        <Col span={24} md={8}>
          <CertificatesIssued
            title="Pending Approvals"
            count={data?.pendingApprovals || 0}
            loading={isLoading}
          />
        </Col>
</Row>


			{/* <Row gutter={[16, 16]} className="mt-4" justify="center">
				<Col span={24} md={8}>
					<TotalCard
						title="Total Active Users"
						increase
						count="18,765"
						percent="2.6%"
						chartData={[22, 8, 35, 50, 82, 84, 77, 12, 87, 43]}
					/>
				</Col>

				<Col span={24} md={8}>
					<TotalCard
						title="Total Installed"
						increase
						count="4,876"
						percent="0.2%"
						chartData={[45, 52, 38, 24, 33, 26, 21, 20, 6]}
					/>
				</Col>

				<Col span={24} md={8}>
					<TotalCard
						title="Total Downloads"
						increase={false}
						count="678"
						percent="0.1%"
						chartData={[35, 41, 62, 42, 13, 18, 29, 37, 36]}
					/>
				</Col>
			</Row> */}

			<Row gutter={[16, 16]} className="mt-4" justify="center">
				<Col span={24} md={12} lg={8} className="w-full ">
					<CurrentDownload sereis={seriesStatus||[]}  labels={labels||[]} />
			  </Col>
				<Col span={24} md={12} lg={16} >
					<AreaDownload series={series} categories={categories}  />
				</Col>
			</Row>
{/* 
			<Row gutter={[16, 16]} className="mt-4" justify="center">
				<Col span={24} md={12} lg={16}>
					<NewInvoice />
				</Col>
				<Col span={24} md={12} lg={8}>
					<TopRelated />
				</Col>
			</Row>

			<Row gutter={[16, 16]} className="mt-4" justify="center">
				<Col span={24} md={12}>
					<TopInstalled />
				</Col>

				<Col span={24} md={12}>
					<TopAuthor />
				</Col>
			</Row> */}
		</div>
	);
}

export default Workbench;
