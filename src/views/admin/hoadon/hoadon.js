import { Breadcrumb, Button, Col, Collapse, Divider, Form, Input, Modal, Popconfirm, Row, Select, Table } from "antd";
import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem";
import Item from "antd/es/list/Item";
import dayjs from "dayjs";
import useAsync from "hook/useAsync";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ServiceDanhMuc from "service/ServiceDanhMuc";
import ServiceOrder from "service/ServiceOrder";
import ServiceSanPham from "service/ServiceSanPham";
const { Panel } = Collapse;
const { Option } = Select;

const HoaDon = () => {
    const { data: danhmuc } = useAsync(() => ServiceOrder.getAllOrder())
    const { data: sanpham } = useAsync(() => ServiceSanPham.getAllSanPham())

    const [open, setOpen] = useState(false);
    const [data, setData] = useState([])
    const [Add, setAdd] = useState('')
    const [id, setId] = useState("")
    const [maGiay, setMaGiay] = useState("");
    const [soLuong, setSoLuong] = useState("");
    const [dvt, setDvt] = useState("");


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
    const columnsChiTiet = [

        {
            title: 'Mã sản phẩm',
            dataIndex: 'MaGiay',
            key: 'MaGiay',
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'TenGiay',
            key: 'TenGiay',
        },
        {
            title: 'Số lượng',
            dataIndex: 'SoLuong',
            key: 'SoLuong',
        },
        {
            title: 'Đơn vị tính',
            dataIndex: 'DVT',
            key: 'DVT',
        },
        {
            title: 'Thành tiền',
            dataIndex: 'ThanhTien',
            key: 'ThanhTien',

        },
        {
            title: 'Hành động',
            dataIndex: 'MaGiay',
            render: (magiay) =>
            (
                <>
                    <Link to={`./hoadonchitiet?id=${id}&&MaSP=${magiay}`}><Button primary>Sửa</Button></Link>
                    <Popconfirm
                        title="Xóa dữ liệu"
                        description="Bạn chắc xóa dữ liệu này?"
                        onConfirm={() => confirm(id, magiay)}
                        okText="Đồng ý"
                        cancelText="Hủy"
                    >
                        <Button danger>Xóa</Button>
                    </Popconfirm>
                </>
            )

        },
    ]
    const confirm = async (id, magiay) => {

        const body = {
            "id": id,
            "reqMaGiay": magiay
        }
        const res = await ServiceOrder.deleteOrderDetail(body)
        if (res.message == "Đồng bộ xóa chi tiết hóa đơn thành công") {
            toast.success("Xóa dữ liệu thành công")
            handleCancel()
        }
        else
            toast.error("Lỗi xóa dữ liệu, Dữ liệu này đang tồn tại ở bảng khác")
    }


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
            dataIndex: 'MaHD',
            render: (id) => (
                <>
                    <Button type="default" onClick={() => showModal(id)}>Xem chi tiết</Button>
                </>
            ),
        },
        {
            title: 'Công cụ',
            dataIndex: 'MaHD',
            fixed: 'right',
            width: 300,
            render: (MaHD) => (
                <>
                    <Link to={`./hoadon/${MaHD}`}><Button primary>Sửa</Button></Link>
                    <Popconfirm
                        title="Xóa dữ liệu"
                        description="Bạn chắc xóa dữ liệu này?"
                        onConfirm={() => confirm1(MaHD)}
                        okText="Đồng ý"
                        cancelText="Hủy"
                    >
                        <Button danger>Xóa</Button>
                    </Popconfirm>
                </>
            ),
        },
    ];
    const confirm1 = async (MaHD) => {


        const res = await ServiceOrder.deleteOrder(MaHD)
        if (res.message == "Đồng bộ xóa hóa đơn thành công") {
            toast.success("Xóa dữ liệu thành công")
            window.location.reload()
        }
        else
            toast.error("Lỗi xóa dữ liệu, Dữ liệu này đang tồn tại ở bảng khác")
    }
    const showModal = async (id) => {
        setData([])
        const res = await ServiceOrder.getAOrderDetail(id)
        if (res.message != "chi tiết hóa đơn không tồn tại") {
            setData(res)
        }
        setId(id)
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
        setAdd(false)
    };

    const onFinish = async (values) => {


        const resSanPham = await ServiceSanPham.getSanPham(maGiay);
        const thanhtien = resSanPham[0].DonGia * soLuong;

        const body = {
            "reqMaHD": id,
            "reqMaGiay": maGiay,
            "reqSoLuong": soLuong,
            "reqDVT": dvt,
            "reqThanhTien": thanhtien
        };

        const res = await ServiceOrder.createOrderDetail(body);

        if (res.message == "chi tiết hóa đơn đã tồn tại") {
            toast.warning("Mã chi tiết hóa đơn đã tồn tại!");
        } else if (res.message == "Đồng bộ thêm chi tiết hóa đơn thành công") {
            toast.success(
                "Thêm dữ liệu thành công và đồng bộ dữ liệu thành công!"
            );
            handleCancel()
        }


    };



    return (
        <>
            <Modal
                width={1000}
                open={open}
                title="Chi tiết hóa đơn"

                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Đóng
                    </Button>,

                ]}
            >

                <Divider orientation="right " > <Button type="primary" onClick={() => setAdd(!Add)} className="ml-auto">Thêm chi tiết</Button></Divider>
                <Collapse activeKey={Add ? [2] : [1]}>
                    <Panel header="Danh sách chi tiết hóa đơn" key="1">
                        <div>
                            {data.length != 0 ? <>
                                <p>Hóa đơn : <strong>{data.length != 0 && data[0]?.MaHD}</strong></p>

                                <Table dataSource={data} columns={columnsChiTiet} />
                                Tổng tiền :  <strong className="text-right">{data.reduce((acc, item) => acc + item.ThanhTien, 0)} vnđ</strong>
                            </> : <p className="text-center">Chưa có chi tiết hóa đơn nào</p>}
                        </div>
                    </Panel>
                    <Panel header="Thêm chi tiết" key="2">
                        <div>
                            <Form layout="vertical" hideRequiredMark>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <Form.Item
                                            name="reqMaGiay"
                                            label="Sản phẩm"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Hãy chọn sản phẩm",
                                                },
                                            ]}
                                        >
                                            <Select placeholder="Chọn sản phẩm" value={maGiay} onChange={(value) => setMaGiay(value)} >
                                                {Array.isArray(sanpham) &&
                                                    sanpham?.map((item, i) => (
                                                        <Option key={i + 1} value={item.MaMG}>
                                                            {item.TenGiay}
                                                        </Option>
                                                    ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            name="reqSoLuong"
                                            label="Số lượng"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Hãy nhập số lượng",
                                                },
                                            ]}
                                        >
                                            <Input type="number" value={soLuong} onChange={(e) => setSoLuong(e.target.value)} placeholder="Nhập số lượng" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="reqDVT"
                                            label="Đơn vị tính"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Hãy chọn đơn vị tính",
                                                },
                                            ]}
                                        >
                                            <Input value={dvt} onChange={(e) => setDvt(e.target.value)} placeholder="Nhập đơn vị tính" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Form.Item>
                                    <Button primary onClick={onFinish}>
                                        Thêm
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </Panel>
                </Collapse>


            </Modal>
            <div className="flex flex-wrap mt-32">
                <div className="w-full mb-12 px-4">
                    <div className="relative">
                        <Divider orientation="left" className="text-white"><Link to={"/admin/hoadon/them"}><Button type="primary" shape="round" icon={<i class="fas fa-plus"></i>}  >Thêm dữ liệu</Button></Link> </Divider>

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