import { Breadcrumb, Button, Col, Divider, Popconfirm, Table } from "antd";
import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem";
import Item from "antd/es/list/Item";
import useAsync from "hook/useAsync";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ServiceCustomer from "service/ServiceCustomer";
const KhachHang = () => {
    const { data: khachhang } = useAsync(() => ServiceCustomer.getAllCustomer())

    let dataSource = [];
    khachhang?.map((item, i) => dataSource.push({
        key: i + 1,
        MaKH: item.MaKH,
        MaCH: item.MaCH,
        TenKH: item.TenKH,
        Diachi: item.Diachi,
        Sdt: item.Sdt,

    }))


    const columns = [
        {
            title: 'Mã khách hàng',
            dataIndex: 'MaKH',
            key: 'MaKH',
        },
        {
            title: 'Cửa hàng',
            dataIndex: 'MaCH',
            key: 'MaCH',
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'TenKH',
            key: 'TenKH',
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
            title: 'Công cụ',
            fixed: 'right',
            dataIndex: 'MaKH',
            width: 200,
            render: (id) => (
                <>
                    <Col>

                        <Link to={`/admin/khachhang/${id}`}> <Button type="primary" >Sửa</Button></Link>

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


        const res = await ServiceCustomer.deleteCustomer(id)
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
                        <Divider orientation="left" className="text-white"><Link to={"/admin/khachhang/them"}><Button type="primary" shape="round" icon={<i class="fas fa-plus"></i>}  >Thêm dữ liệu</Button></Link> </Divider>

                        <Breadcrumb >
                            <BreadcrumbItem >Chức năng</BreadcrumbItem>
                            <BreadcrumbItem >khách hàng</BreadcrumbItem>

                        </Breadcrumb>
                        <Table dataSource={dataSource} columns={columns} />;
                    </div>
                </div>

            </div>
        </>);
}

export default KhachHang;