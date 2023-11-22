import React from "react";

// components

import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import ServiceOrder from "service/ServiceOrder";
import useAsync from "hook/useAsync";

export default function Dashboard() {
  const { data: hoadon } = useAsync(() => ServiceOrder.getAllOrder())
  const invoiceStatistics2023 = new Array(12).fill(0);
  const invoiceStatistics2022 = new Array(12).fill(0);

  // Lặp qua mỗi hóa đơn
  hoadon.forEach((invoice) => {
    // Lấy ngày lập hóa đơn
    const ngayLap = new Date(invoice.NgayLap);

    // Kiểm tra xem hóa đơn có thuộc năm 2023 không
    if (ngayLap.getFullYear() === 2023) {
      // Lấy tháng của hóa đơn (từ 0 đến 11)
      const month = ngayLap.getMonth();

      // Tăng giá trị tương ứng trong mảng thống kê
      invoiceStatistics2023[month]++;
    }
    if (ngayLap.getFullYear() === 2022) {
      // Lấy tháng của hóa đơn (từ 0 đến 11)
      const month = ngayLap.getMonth();

      // Tăng giá trị tương ứng trong mảng thống kê
      invoiceStatistics2022[month]++;
    }
  });

  console.log(invoiceStatistics2023);
  console.log(invoiceStatistics2022);
  return (
    <>
      <div className="flex flex-wrap mt-32">

        <div className="w-full  px-4">
          <CardBarChart invoiceStatistics2022={invoiceStatistics2022} invoiceStatistics2023={invoiceStatistics2023} />
        </div>
      </div>

    </>
  );
}
