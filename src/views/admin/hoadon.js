import { Breadcrumb, Button, Col, Divider, Table } from "antd";
import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem";
import Item from "antd/es/list/Item";
import dayjs from "dayjs";
import useAsync from "hook/useAsync";
import ServiceDanhMuc from "service/ServiceDanhMuc";
import ServiceOrder from "service/ServiceOrder";


const HoaDon = () => {
    const { data: danhmuc } = useAsync(() => ServiceOrder.getAllOrder())

    let dataSource = [];
    danhmuc?.map((item, i) => {
        const ngaylap = dayjs(item.NgayLap).format('DD/MM/YYYY')
        dataSource.push(

            {
                key: i + 1,
                MaHD: item.MaHD,
                TenNV: item.TenNV,
                TenKH: item.TenKH,
                HinhThucTT: item.HinhThucTT,
                NgayLap: ngaylap
            }
        )
    })


    const columns = [
        {
            title: 'Mã hóa đơn',
            dataIndex: 'MaHD',
            key: 'MaHD',
        },
        {
            title: 'Tên Nhân viên',
            dataIndex: 'TenNV',
            key: 'TenNV',
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'TenKH',
            key: 'TenKH',
        },
        {
            title: 'Hình thức TT',
            dataIndex: 'HinhThucTT',
            key: 'HinhThucTT',
        },
        {
            title: 'Ngày lập hóa đơn',
            dataIndex: 'NgayLap',
            key: 'NgayLap',
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
                        <Divider orientation="left" >Danh sách hóa đơn</Divider>
                        <Breadcrumb >
                            <BreadcrumbItem >Chức năng</BreadcrumbItem>
                            <BreadcrumbItem >Hóa đơn</BreadcrumbItem>

                        </Breadcrumb>
                        <Table dataSource={dataSource} columns={columns} />;
                    </div>
                </div>

            </div>
        </>);
}

export default HoaDon;