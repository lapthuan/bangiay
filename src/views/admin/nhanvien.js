import { Breadcrumb, Button, Col, Divider, Table } from "antd";
import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem";
import Item from "antd/es/list/Item";
import useAsync from "hook/useAsync";
import ServiceCustomer from "service/ServiceCustomer";
import ServiceEmployee from "service/ServiceEmployee";
const NhanVien = () => {
    const { data: nhanvien } = useAsync(() => ServiceEmployee.getAllEmployee())

    let dataSource = [];
    nhanvien?.map((item, i) => dataSource.push({
        key: i + 1,
        MaNV: item.MaNV,
        TenNV: item.TenNV,
        TenCuaHang: item.TenCuaHang,
        Diachi: item.DiaChi,
        Sdt: item.Sdt,
        email: item.email,

    }))


    const columns = [
        {
            title: 'Mã nhân viên',
            dataIndex: 'MaNV',
            key: 'MaNV',
        },
        {
            title: 'Cửa hàng',
            dataIndex: 'TenCuaHang',
            key: 'TenCuaHang',
        },
        {
            title: 'Tên nhân viên',
            dataIndex: 'TenNV',
            key: 'TenNV',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'Diachi',
            key: 'Diachi',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'Sdt',
            key: 'Sdt',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Công cụ',
            fixed: 'right',
            width: 200,
            render: () => (
                <>
                    <Col>

                        <Button type="primary" >Sửa</Button>

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
                        <Divider orientation="left" >Danh sách nhân viên</Divider>
                        <Breadcrumb >
                            <BreadcrumbItem >Chức năng</BreadcrumbItem>
                            <BreadcrumbItem >Nhân viên</BreadcrumbItem>

                        </Breadcrumb>
                        <Table dataSource={dataSource} columns={columns} />;
                    </div>
                </div>

            </div>
        </>);
}

export default NhanVien;