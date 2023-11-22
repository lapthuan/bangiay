import { Breadcrumb, Button, Col, Divider, Table } from "antd";
import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem";
import Item from "antd/es/list/Item";
import Title from "antd/es/typography/Title";
import useAsync from "hook/useAsync";
import { Link } from "react-router-dom";
import ServiceSanPham from "service/ServiceSanPham";

const SanPham = () => {
    const { data: sanpham } = useAsync(() => ServiceSanPham.getAllSanPham())

    let dataSource = [];
    sanpham?.map((item, i) => dataSource.push({
        key: i + 1,
        MaMG: item.MaMG,
        TenGiay: item.TenGiay,
        DonGia: item.DonGia,
        GiamGia: item.GiamGia,
        TenLoai: item.TenLoai,
        TenThuongHieu: item.TenThuongHieu
    }))


    const columns = [
        {
            title: 'Mã Giày',
            dataIndex: 'MaMG',
            key: 'MaMG',
        },
        {
            title: 'Tên giày',
            dataIndex: 'TenGiay',
            key: 'TenGiay',
        },
        {
            title: 'Giá',
            dataIndex: 'DonGia',
            key: 'DonGia',
        },
        {
            title: 'Giảm giá',
            dataIndex: 'GiamGia',
            key: 'GiamGia',
        },
        {
            title: 'Loại',
            dataIndex: 'TenLoai',
            key: 'TenLoai',
        },
        {
            title: 'Thương hiệu',
            dataIndex: 'TenThuongHieu',
            key: 'TenThuongHieu',
        },
        {
            title: 'Công cụ',
            dataIndex: 'MaMG',
            fixed: 'right',
            width: 200,
            render: (id) => (
                <>
                    <Col>

                        <Link to={`/admin/sanpham/${id}`}> <Button type="primary" >Sửa</Button></Link>

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
                        <Divider orientation="left" className="text-white"><Link to={"/admin/sanpham/them"}><Button type="primary" shape="round" icon={<i class="fas fa-plus"></i>}  >Thêm dữ liệu</Button></Link> </Divider>

                        <Breadcrumb >
                            <BreadcrumbItem >Chức năng</BreadcrumbItem>
                            <BreadcrumbItem >Sản phẩm</BreadcrumbItem>

                        </Breadcrumb>
                        <Table dataSource={dataSource} columns={columns} />;
                    </div>
                </div>

            </div>
        </>);
}

export default SanPham;