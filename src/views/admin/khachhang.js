import { Breadcrumb, Button, Col, Divider, Table } from "antd";
import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem";
import Item from "antd/es/list/Item";
import useAsync from "hook/useAsync";
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
                        <Divider orientation="left" >Danh sách khách hàng</Divider>
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