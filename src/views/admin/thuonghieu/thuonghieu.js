import { Breadcrumb, Button, Col, Divider, Popconfirm, Table } from "antd";
import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem";
import Item from "antd/es/list/Item";
import useAsync from "hook/useAsync";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ServiceSanPham from "service/ServiceSanPham";
import ServiceThuongHieu from "service/ServiceThuongHieu";

const ThuongHieu = () => {
    const { data: thuonghieu } = useAsync(() => ServiceThuongHieu.getAllThuongHieu())

    let dataSource = [];
    thuonghieu?.map((item, i) => dataSource.push({
        key: i + 1,
        MaThuongHieu: item.MaThuongHieu,
        TenThuongHieu: item.TenThuongHieu,
        DiaChi: item.DiaChi,
        SDT: item.SDT,
        Email: item.Email,

    }))


    const columns = [
        {
            title: 'Mã TH',
            dataIndex: 'MaThuongHieu',
            key: 'MaThuongHieu',
        },
        {
            title: 'Tên giày',
            dataIndex: 'TenThuongHieu',
            key: 'TenThuongHieu',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'DiaChi',
            key: 'DiaChi',
        },
        {
            title: 'Số ĐT',
            dataIndex: 'SDT',
            key: 'SDT',
        },
        {
            title: 'Email',
            dataIndex: 'Email',
            key: 'Email',
        },

        {
            title: 'Công cụ',
            dataIndex: 'MaThuongHieu',
            fixed: 'right',
            width: 200,
            render: (id) => (
                <>
                    <Col>

                        <Link to={`/admin/thuonghieu/${id}`}> <Button type="primary" >Sửa</Button></Link>

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

        const res = await ServiceThuongHieu.deleteThuongHieu(id)
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
                        <Divider orientation="left" className="text-white"><Link to={"/admin/thuonghieu/them"}><Button type="primary" shape="round" icon={<i class="fas fa-plus"></i>}  >Thêm dữ liệu</Button></Link> </Divider>

                        <Breadcrumb >
                            <BreadcrumbItem >Chức năng</BreadcrumbItem>
                            <BreadcrumbItem >Thương hiệu</BreadcrumbItem>

                        </Breadcrumb>
                        <Table dataSource={dataSource} columns={columns} />;
                    </div>
                </div>

            </div>
        </>);
}

export default ThuongHieu;