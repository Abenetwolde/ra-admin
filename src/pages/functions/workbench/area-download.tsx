import { Select, Typography } from "antd";
import { useState } from "react";

import Card from "@/components/card";
import Chart from "@/components/chart/chart";
import useChart from "@/components/chart/useChart";
import { themeVars } from "@/theme/theme.css";

export default function AreaDownload({series,categories}:any) {

	return (
		<Card className="flex-col">
			<header className="flex w-full justify-between self-start">
				<Typography.Title level={5}> Certificate Requests OverTime </Typography.Title>
				
			</header>
			<main className="w-full">
		  <ChartArea series={series} categories={categories} />

			</main>
		</Card>
	);
}

function ChartArea({
  series,
  categories,
}: {
  series: ApexAxisChartSeries;
  categories: string[];
}) {
  const chartOptions = useChart({
    xaxis: {
      type: "category",
      categories,
    },
    tooltip: {},
    chart: {
      id: "requests-over-time",
    },
    colors: [ themeVars.colors.palette.warning.dark], 
    responsive: [
      {
        breakpoint: 1700, // Adjust for large screens
        options: {
          chart: {
            height: "400px", // Adjust height for larger screens
          },
          plotOptions: {
            pie: {
              donut: {
                size: "80%", // Adjust donut size for large screens
              },
            },
          },
        },
      },
      {
        breakpoint: 768, // For tablets and smaller screens
        options: {
          chart: {
            height: "250px", // Adjust height for smaller screens
          },
          plotOptions: {
            pie: {
              donut: {
                size: "70%", // Adjust donut size for smaller screens
              },
            },
          },
        },
      },
      {
        breakpoint: 480, // For very small screens (like phones)
        options: {
          chart: {
            height: "200px", // Adjust height for mobile screens
          },
          plotOptions: {
            pie: {
              donut: {
                size: "60%", // Adjust donut size for very small screens
              },
            },
          },
        },
      },
    ],
  });

  return (
    <div className="w-full h-full">
    <Chart type="bar" series={series} options={chartOptions} height={300} />
    </div>
  );
}