"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import useCompanies from "@/lib/useCompanies";

export default function Home() {

  const DATA_URL = "https://venefish.enesien.com/api/companies";
  let revenueTotal: number = 0;
  let employeesTotal: number = 0;

  const { companies, error } = useCompanies(DATA_URL);

  // Check for error. If error occurs, display it in an alert popup
  if (error) {
    alert(error);
  }

  // If a list of companies is given, calculate the totals for the revenue and employees
  if (companies && companies.length > 0) {
    const revenues: number[] = companies.map((company) => company.revenue);
    const employees: number[] = companies.map((company) => company.employees);

    revenueTotal = revenues.reduce((total, curr) => total + curr);
    employeesTotal = employees.reduce((total, curr) => total + curr);
  }

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-tl from-blue-400 to-blue-700 text-white space-y-6">
      <div className="bg-white/10 p-4">
        <div className="container">
          <h2 className="font-ornate text-2xl font-semibold tracking-tighter ">
            React Next.js Tester
          </h2>
        </div>
      </div>
      <div className="container">
        <Card>
          <CardHeader className="px-7">
            <CardTitle></CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            {/* Table component from shadcn/ui */}
            <Table>
              <TableCaption>A list of companies</TableCaption>
              <TableHeader>
                {/* Display headers for Name, Location, Revenue, Employees */}
                <TableRow>
                  <TableHead className="w-[400px]">Name</TableHead>
                  <TableHead className="w-[300px]">Location</TableHead>
                  <TableHead>Employees</TableHead>
                  <TableHead>Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companies?.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell className="font-medium">
                      <a 
                        href={company.website}
                        target="_blank">{company.name}</a>
                    </TableCell>
                    <TableCell>{company.location}</TableCell>
                    <TableCell>{company.employees}</TableCell>
                    {/* Display revenue in USD money format */}
                    <TableCell>
                      {company.revenue.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow className="bg-indigo-100">
                  <TableCell colSpan={2} className="font-medium">
                    Total
                  </TableCell>
                  {/* Cut off employees total to two decimal points */}
                  <TableCell>
                    {employeesTotal}
                  </TableCell>
                  <TableCell>
                    {revenueTotal.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
