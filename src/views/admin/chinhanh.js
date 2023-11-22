import { Breadcrumb, Button, Col, Divider, Table } from "antd";
import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem";
import Item from "antd/es/list/Item";
import useAsync from "hook/useAsync";
import ServiceBranch from "service/ServiceBranch";
import ServiceCustomer from "service/ServiceCustomer";
const ChiNhanh = () => {
    const { data: chinhanh } = useAsync(() => ServiceBranch.getAllBranch())

    let dataSource = [];
    chinhanh?.map((item, i) => dataSource.push({
        key: i + 1,
        MaCN: item.MaCN,
        Diachi: item.DiaChi,
        Sdt: item.Sdt,
        Email: item.Email,
    }))


    const columns = [

        {
            title: 'Mã chi nhánh',
            dataIndex: 'MaCN',
            key: 'MaCN',
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
            dataIndex: 'Email',
            key: 'Email',
        },
       
    ];

    return (
        <>
            <div className="flex flex-wrap mt-32">
                <div className="w-full mb-12 px-4">
                    <div className="relative">
                        <Divider orientation="left" >Danh sách chi nhánh</Divider>
                        <Breadcrumb >
                            <BreadcrumbItem >Chức năng</BreadcrumbItem>
                            <BreadcrumbItem >Chi nhánh</BreadcrumbItem>

                        </Breadcrumb>
                        <Table dataSource={dataSource} columns={columns} />;
                    </div>
                </div>

            </div>
        </>);
}

export default ChiNhanh;