"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { LoadingSpinner } from "../shared/icons";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
);

function convertFromUnixTimestamp(unixTimestamp: number) {
  var date = new Date(unixTimestamp * 1000);

  var year = date.getFullYear();
  var month = ("0" + (date.getMonth() + 1)).slice(-2); // Adding leading zero if needed
  var day = ("0" + date.getDate()).slice(-2); // Adding leading zero if needed

  var formattedDate = year + month + day;
  return formattedDate;
}

type HistoricalObservation = {
  date: string;
  averageDewPoint: number;
};

const Graph = () => {
  const endTimestamp = Math.floor(Date.now() / 1000);
  const endDate = convertFromUnixTimestamp(endTimestamp);
  const startTimestamp = endTimestamp - 86400 * 30;
  const startDate = convertFromUnixTimestamp(startTimestamp);

  const url = `https://api.weather.com/v1/location/KPHX:9:US/observations/historical.json?apiKey=e1f10a1e78da46f5b10a1e78da96f525&units=e&startDate=${startDate}&endDate=${endDate}`;

  const emptyHistoricalData: HistoricalObservation[] = [];
  const [historicalData, setHistoricalData] = useState(emptyHistoricalData);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          const observations: HistoricalObservation[] = [];

          var processingDate: string = "";
          var processingDewPt: number = 0;
          var processingCount: number = 0;

          response.data.observations.forEach(
            (observation: { valid_time_gmt: number; dewPt: number }) => {
              const observationDate = convertFromUnixTimestamp(
                observation.valid_time_gmt,
              );
              if (processingDate !== observationDate) {
                if (processingCount > 0) {
                  observations.push({
                    date: processingDate,
                    averageDewPoint: processingDewPt / processingCount,
                  });
                }
                processingDate = observationDate;
                processingDewPt = 0;
                processingCount = 0;
              }
              processingDewPt += observation.dewPt;
              processingCount += 1;
            },
          );
          if (processingCount > 0) {
            observations.push({
              date: processingDate,
              averageDewPoint: processingDewPt / processingCount,
            });
          }
          setHistoricalData(observations);
        } else {
          // console.log(url);
          console.log(`Error: ${response.status}`);
        }
      })
      .catch((error) => {
        // console.log(url);
        console.log(`Error: ${error.message}`);
      });
  }, [url]);

  var result;
  if (historicalData.length < 1) {
    result = (
      <div className="flex w-full justify-center">
        <LoadingSpinner />
      </div>
    );
  } else {
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    const data = {
      labels: historicalData.map((d) => d.date.slice(-2)),
      datasets: [
        {
          label: "Dewpoint",
          data: historicalData.map((d) => d.averageDewPoint),
          borderColor: "#36a2eb",
        },
        {
          label: "Monsoon Threshold",
          data: historicalData.map(() => 55),
          borderColor: "#d0d0d0",
          borderDash: [2, 2],
          borderWidth: 1,
        },
      ],
    };

    ChartJS.defaults.elements.point.pointStyle = false;
    ChartJS.defaults.elements.line.tension = 0.5;

    result = <Line options={options} data={data} />;
  }
  return (
    <div className="relative h-[60vh] w-[90vw] md:max-w-[40rem]">{result}</div>
  );
};

export default Graph;
