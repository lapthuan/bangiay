import { Breadcrumb, Button, Col, Divider, Popconfirm, Table } from "antd";
import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem";
import Item from "antd/es/list/Item";
import useAsync from "hook/useAsync";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
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
            dataIndex: 'MaNV',
            width: 200,
            render: (id) => (
                <>
                    <Col>

                        <Link to={`/admin/nhanvien/${id}`}> <Button type="primary" >Sửa</Button></Link>

                        <Popconfirm
                            title="Xóa dữ liệu"
                            description="Bạn chắc xóa dữ liệu này?"
                            onConfirm={() => confirm(id)}
                            okText="Đồng ý"
                            cancelText="Hủy"
                        >
                            <Button danger>Xóa</Button>
                        </Popconfirm>
                    </Col>

                </>
            ),
        },
    ];
    const confirm = async (id) => {


        const res = await ServiceEmployee.deleteEmployee(id)
        if (res.message == "Đồng bộ xóa thành công") {
            toast.success("Xóa dữ liệu thành công")
            setTimeout(() => {
                window.location.reload()
            }, 3000);

        }
        else
            toast.error("Lỗi xóa dữ liệu, Dữ liệu này đang tồn tại ở bảng khác")
    }
    return (
        <>
            <div className="flex flex-wrap mt-32">
                <div className="w-full mb-12 px-4">
                    <div className="relative">
                        <Divider orientation="left" className="text-white"><Link to={"/admin/nhanvien/them"}><Button type="primary" shape="round" icon={<i class="fas fa-plus"></i>}  >Thêm dữ liệu</Button></Link> </Divider>

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