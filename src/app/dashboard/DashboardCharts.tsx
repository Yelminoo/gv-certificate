"use client";
import dynamic from "next/dynamic";
import { Chart, ArcElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const Pie = dynamic(() => import("react-chartjs-2").then(mod => mod.Pie), { ssr: false });
const Line = dynamic(() => import("react-chartjs-2").then(mod => mod.Line), { ssr: false });

export function DashboardCharts({ pieLabels, pieData, lineLabels, lineData }: {
  pieLabels: string[];
  pieData: number[];
  lineLabels: string[];
  lineData: number[];
}) {
  return (
    <div className="flex flex-wrap gap-8 mb-8 bg-gray-900 p-8 rounded-xl">
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 w-87.5">
        <h2 className="text-lg font-semibold mb-2 text-white">By Identification (Pie)</h2>
        <Pie
          data={{
            labels: pieLabels,
            datasets: [{
              data: pieData,
              backgroundColor: [
                '#1e293b', '#64748b', '#fbbf24', '#f87171', '#34d399', '#a78bfa', '#f472b6', '#38bdf8', '#facc15', '#fca5a5', '#4ade80', '#818cf8', '#f9fafb'
              ],
            }],
          }}
          options={{
            plugins: { legend: { labels: { color: '#f9fafb' } } },
          }}
        />
      </div>
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 w-125">
        <h2 className="text-lg font-semibold mb-2 text-white">Certificates Per Day (Line)</h2>
        <Line
          data={{
            labels: lineLabels,
            datasets: [{
              label: 'Certificates',
              data: lineData,
              borderColor: '#fbbf24',
              backgroundColor: 'rgba(251,191,36,0.1)',
              tension: 0.3,
            }],
          }}
          options={{
            plugins: { legend: { labels: { color: '#f9fafb' } } },
            scales: { x: { ticks: { color: '#f9fafb' } }, y: { ticks: { color: '#f9fafb' } } },
          }}
        />
      </div>
    </div>
  );
}
