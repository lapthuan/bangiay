import { Breadcrumb, Button, Col, Divider, Form, Input, Modal, Row, Table } from "antd";
import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem";
import Item from "antd/es/list/Item";
import useAsync from "hook/useAsync";
import { useState } from "react";
import { Link } from "react-router-dom";
import ServiceDanhMuc from "service/ServiceDanhMuc";
import ServiceSanPham from "service/ServiceSanPham";

const DanhMuc = () => {
    const { data: danhmuc } = useAsync(() => ServiceDanhMuc.getAllDanhMuc())

    const [form] = Form.useForm();

    let dataSource = [];
    danhmuc?.map((item, i) => dataSource.push({
        key: i + 1,
        MaLoai: item.MaLoai,
        TenLoai: item.TenLoai,
        GhiChu: item.GhiChu,

    }))

    const columns = [
        {
            title: 'Mã danh mục',
            dataIndex: 'MaLoai',
            key: 'MaLoai',
        },
        {
            title: 'Tên Danh mục',
            dataIndex: 'TenLoai',
            key: 'TenLoai',
        },
        {
            title: 'Ghi chú',
            dataIndex: 'GhiChu',
            key: 'GhiChu',
        },

        {
            title: 'Công cụ',
            fixed: 'right',
            dataIndex: 'MaLoai',
            width: 200,
            render: (id) => (
                <>
                    <Col>

                        <Link to={`/admin/danhmuc/${id}`}> <Button type="primary" >Sửa</Button></Link>

                        <Button type="primary" danger>Xóa</Button>
                    </Col>

                </>
            ),
        },
    ];

    return (
        <>

            <div className="flex flex-wrap mt-32">
                <div className="w-full mb-12 px-4">

                    <div className="relative">
                        <Divider orientation="left" className="text-white"><Link to={"/admin/danhmuc/add"}><Button type="primary" shape="round" icon={<i class="fas fa-plus"></i>}  >Thêm dữ liệu</Button></Link> </Divider>
                        
                        <Breadcrumb>
                            <BreadcrumbItem >Chức năng</BreadcrumbItem>
                            <BreadcrumbItem >Danh mục</BreadcrumbItem>

                        </Breadcrumb>
                        <Table dataSource={dataSource} columns={columns} />
                    </div>
                </div>

            </div>
        </>);
}

export default DanhMuc;