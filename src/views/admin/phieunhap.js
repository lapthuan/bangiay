import { Breadcrumb, Button, Col, Divider, Table } from "antd";
import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem";
import Item from "antd/es/list/Item";
import dayjs from "dayjs";
import useAsync from "hook/useAsync";
import ServiceDanhMuc from "service/ServiceDanhMuc";
import ServiceDeliveryReceipt from "service/ServiceDeliveryReceipt";
import ServiceOrder from "service/ServiceOrder";


const PhieuNhap = () => {
    const { data: danhmuc } = useAsync(() => ServiceDeliveryReceipt.getAllDeliveryReceipt())

    let dataSource = [];
    danhmuc?.map((item, i) => {
        const ngaylap = dayjs(item.NgayLapPhieu).format('DD/MM/YYYY')
        dataSource.push(

            {
                key: i + 1,
                MaPhieuNhap: item.MaPhieuNhap,
                TenNV: item.TenNV,
                TenCuaHang: item.TenCuaHang,
                GhiChu: item.GhiChu,
                NgayLapPhieu: ngaylap
            }
        )
    })


    const columns = [
        {
            title: 'Mã phiếu nhập',
            dataIndex: 'MaPhieuNhap',
            key: 'MaPhieuNhap',
        },
        {
            title: 'Tên Nhân viên',
            dataIndex: 'TenNV',
            key: 'TenNV',
        },
        {
            title: 'Tên cửa hàng',
            dataIndex: 'TenCuaHang',
            key: 'TenCuaHang',
        },
        {
            title: 'Ghi chú',
            dataIndex: 'GhiChu',
            key: 'GhiChu',
        },
        {
            title: 'Ngày lập phiếu',
            dataIndex: 'NgayLapPhieu',
            key: 'NgayLapPhieu',
        },
        {
            title: 'Xem chi tiết',
            render: () => (
                <>
                    <Button type="default" >Xem chi tiết</Button>
                </>
            ),
        },
        {
            title: 'Công cụ',

            fixed: 'right',
            width: 300,
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
                        <Divider orientation="left" >Danh sách phiếu nhập</Divider>

                        <Breadcrumb >
                            <BreadcrumbItem >Chức năng</BreadcrumbItem>
                            <BreadcrumbItem >Phiếu nhập</BreadcrumbItem>

                        </Breadcrumb>
                        <Table dataSource={dataSource} columns={columns} />;
                    </div>
                </div>

            </div>
        </>);
}

export default PhieuNhap;