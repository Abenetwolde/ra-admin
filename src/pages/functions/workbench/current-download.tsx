import { Typography } from "antd";
import React from "react";
import Card from "@/components/card";
import ReactApexChart from "react-apexcharts";
import useChart from "@/components/chart/useChart";
import Chart from "@/components/chart/chart";
import { themeVars } from "@/theme/theme.css";

export default function CurrentDownload({ sereis, labels }: any) {
  return (
    <Card className="flex-col w-full h-full">
      <div className="self-start">
        <Typography.Title level={5}>Request Status Breakdown</Typography.Title>
      </div>

      <div className="flex-1 w-full">
        <ChartDonut series={sereis} labels={labels} />
      </div>
    </Card>
  );
}

function ChartDonut({ series, labels }: { series: number[]; labels: string[] }) {

  const chartOptions = useChart({
    labels,
    stroke: {
      show: false,
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
    },
    tooltip: {
      fillSeriesColor: false,
    },
    chart: {
      width: "100%", // responsive width
      id: "donut-chart", // so ApexCharts.exec can target it
      height: "100%", // make the height 100% to ensure it resizes
    },
    colors: [
       themeVars.colors.palette.warning.default,
     
       themeVars.colors.palette.info.default,
       themeVars.colors.palette.error.default,
    ],
    responsive: [
      {
        breakpoint: 1700, // Adjust for large screens
        options: {
          chart: {
            height: "350px", // Adjust height for larger screens
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
    plotOptions: {
      pie: {
        donut: {
          size: "90%",
          labels: {
            total: {
              fontSize: "12px",
            },
            value: {
              fontSize: "18px",
              fontWeight: 700,
            },
          },
        },
      },
    },
  });

  return (
    <div className="w-full h-full"> 
      <Chart
        type="donut"
        series={series}
        options={chartOptions}
        height={420}
        width={"100%"}
      />
    </div>
  );
}
