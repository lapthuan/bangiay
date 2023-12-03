import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "views/admin/Dashboard.js";
import SanPham from "views/admin/sanpham/sanpham.js";
import DanhMuc from "views/admin/danhmuc/danhmuc";
import ThuongHieu from "views/admin/thuonghieu/thuonghieu";
import HoaDon from "views/admin/hoadon/hoadon";
import PhieuNhap from "views/admin/phieunhap/phieunhap";
import khachHang from "views/admin/khachhang/khachhang";
import NhanVien from "views/admin/nhanvien/nhanvien";
import DanhMucChiTiet from "views/admin/danhmuc/DanhMucChiTiet";
import ChiNhanh from "views/admin/chinhanh";
import CuaHang from "views/admin/cuahang";
import SanPhamChiTiet from "views/admin/sanpham/sanphamchitiet";


import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ThuongHieuChiTiet from "views/admin/thuonghieu/thuonghieuchitiet";
import NhanVienChiTiet from "views/admin/nhanvien/nhanvienchitiet";
import KhachHangChiTiet from "views/admin/khachhang/khachhangchitiet";
import HoaDonChiTiet from "views/admin/hoadon/hoadonchitiet";
import ThemHoaDon from "views/admin/hoadon/themhoadon";
import SuaPhieuNhap from "views/admin/phieunhap/suaphieunhap";
import PhieuNhapChiTiet from "views/admin/phieunhap/phieunhapchitiet";

export default function Admin() {
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('user');

    if (!isLoggedIn) {
      window.location.href = "/auth/login";
    }
  }, [])
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24 " style={{ height: "1000px" }}>
          <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard} />
            <Route path="/" exact component={Dashboard} />
            <Route path="/admin/sanpham" exact component={SanPham} />
            <Route path="/admin/sanpham/:id" exact component={SanPhamChiTiet} />

            <Route path="/admin/danhmuc" exact component={DanhMuc} />
            <Route path="/admin/danhmuc/:id" exact component={DanhMucChiTiet} />

            <Route path="/admin/thuonghieu" exact component={ThuongHieu} />
            <Route path="/admin/thuonghieu/:id" exact component={ThuongHieuChiTiet} />

            <Route path="/admin/hoadon" exact component={HoaDon} />
            <Route path="/admin/hoadonchitiet" exact component={HoaDonChiTiet} />
            <Route path="/admin/hoadon/:id" exact component={ThemHoaDon} />

            <Route path="/admin/phieunhap" exact component={PhieuNhap} />
            <Route path="/admin/phieunhapchitiet" exact component={SuaPhieuNhap} />
            <Route path="/admin/phieunhap/:id" exact component={PhieuNhapChiTiet} />

            <Route path="/admin/khachHang" exact component={khachHang} />
            <Route path="/admin/khachHang/:id" exact component={KhachHangChiTiet} />

            <Route path="/admin/nhanvien" exact component={NhanVien} />
            <Route path="/admin/nhanvien/:id" exact component={NhanVienChiTiet} />

            <Route path="/admin/chinhanh" exact component={ChiNhanh} />
            <Route path="/admin/cuahang" exact component={CuaHang} />




          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
