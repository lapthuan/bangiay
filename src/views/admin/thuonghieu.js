import { Breadcrumb, Button, Col, Divider, Table } from "antd";
import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem";
import Item from "antd/es/list/Item";
import useAsync from "hook/useAsync";
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
                        <Divider orientation="left" >Danh sách thương hiệu</Divider>

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