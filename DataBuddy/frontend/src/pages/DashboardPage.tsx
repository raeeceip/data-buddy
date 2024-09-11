import React, { useState } from 'react';
import Papa from 'papaparse';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

interface DashboardData {
  totalRevenue: string;
  subscriptions: number;
  sales: number;
  activeNow: number;
  recentSales: Array<{ name: string; email: string; amount: string }>;
  overviewData: Array<{ name: string; total: number }>;
}

export default function DashboardPage() {
  const [file, setFile] = useState<File | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      parseCSV(uploadedFile);
    }
  };

  const parseCSV = (file: File) => {
    Papa.parse(file, {
      complete: (result) => {
        const data = result.data as string[][];
        if (data.length > 1) {
          const [headers, ...rows] = data;
          const totalRevenue = rows.reduce((sum, row) => sum + parseFloat(row[0] || '0'), 0);
          const subscriptions = rows.length;
          const sales = rows.reduce((sum, row) => sum + parseInt(row[2] || '0', 10), 0);
          const activeNow = parseInt(rows[rows.length - 1][3] || '0', 10);

          const recentSales = rows.slice(-5).map(row => ({
            name: row[4] || 'Unknown',
            email: row[5] || 'unknown@example.com',
            amount: `$${row[0] || '0'}`,
          }));

          const overviewData = headers.slice(0, 4).map((name, index) => ({
            name,
            total: rows.reduce((sum, row) => sum + parseFloat(row[index] || '0'), 0),
          }));

          setDashboardData({
            totalRevenue: `$${totalRevenue.toFixed(2)}`,
            subscriptions,
            sales,
            activeNow,
            recentSales,
            overviewData,
          });
        }
      },
      header: false,
      skipEmptyLines: true,
    });
  };

  const Overview = () => {
    if (!dashboardData) return null;
    return (
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={dashboardData.overviewData}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const Analytics = () => {
    if (!dashboardData) return null;
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Data Analysis</h3>
        <p>Total Revenue: {dashboardData.totalRevenue}</p>
        <p>Number of Subscriptions: {dashboardData.subscriptions}</p>
        <p>Total Sales: {dashboardData.sales}</p>
        <p>Active Users: {dashboardData.activeNow}</p>
        <h4 className="text-md font-semibold mt-4">Revenue Breakdown</h4>
        <ul className="list-disc pl-5">
          {dashboardData.overviewData.map((item, index) => (
            <li key={index}>{item.name}: ${item.total.toFixed(2)}</li>
          ))}
        </ul>
      </div>
    );
  };

  const RecentSales = ({ sales }: { sales: Array<{ name: string; email: string; amount: string }> }) => (
    <div className="space-y-4">
      {sales.map((sale, index) => (
        <div key={index} className="flex justify-between items-center">
          <div>
            <p className="font-medium">{sale.name}</p>
            <p className="text-sm text-gray-500">{sale.email}</p>
          </div>
          <span className="font-medium">{sale.amount}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="max-w-sm"
          />
          <Button onClick={() => document.getElementById('file-upload')?.click()}>
            Upload CSV
          </Button>
        </div>
      </div>

      {file && (
        <p className="text-sm text-muted-foreground">
          Uploaded file: {file.name}
        </p>
      )}

      {dashboardData ? (
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.totalRevenue}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.subscriptions}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.sales}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.activeNow}</div>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>
                    You made {dashboardData.sales} sales this month.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales sales={dashboardData.recentSales} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <Analytics />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl">Upload a CSV file to view the dashboard</p>
        </div>
      )}
    </div>
  );
}