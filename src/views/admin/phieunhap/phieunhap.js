import { Breadcrumb, Button, Col, Collapse, Divider, Form, Input, Modal, Popconfirm, Row, Select, Table } from "antd";
import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem";
import Item from "antd/es/list/Item";
import dayjs from "dayjs";
import useAsync from "hook/useAsync";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ServiceDanhMuc from "service/ServiceDanhMuc";
import ServiceDeliveryReceipt from "service/ServiceDeliveryReceipt";
import ServiceOrder from "service/ServiceOrder";
import ServiceSanPham from "service/ServiceSanPham";
const { Panel } = Collapse;
const { Option } = Select;

const PhieuNhap = () => {
    const { data: danhmuc } = useAsync(() => ServiceDeliveryReceipt.getAllDeliveryReceipt())
    const { data: sanpham } = useAsync(() => ServiceSanPham.getAllSanPham())
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([])
    const [Add, setAdd] = useState('')
    const [id, setId] = useState("")
    const [maGiay, setMaGiay] = useState("");
    const [soLuong, setSoLuong] = useState("");
    const [dvt, setDvt] = useState("");
    const [giaNhap, setGiaNhap] = useState("");
    const [giaBan, setGiaBan] = useState("");


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
            title: 'Giá nhập',
            dataIndex: 'GiaNhap',
            key: 'GiaNhap',
        },
        {
            title: 'Giá bán',
            dataIndex: 'GiaBan',
            key: 'GiaBan',
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
                    <Link to={`./phieunhapchitiet?id=${id}&&MaSP=${magiay}`}><Button primary>Sửa</Button></Link>
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
        const res = await ServiceDeliveryReceipt.deleteDeliveryReceiptDetail(body)
        if (res.message == "Đồng bộ xóa chi tiết phiếu nhập thành công") {
            toast.success("Xóa dữ liệu thành công")
            handleCancel()
        }
        else
            toast.error("Lỗi xóa dữ liệu, Dữ liệu này đang tồn tại ở bảng khác")
    }
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
            dataIndex: 'MaPhieuNhap',
            render: (id) => (
                <>
                    <Button type="default" onClick={() => showModal(id)}>Xem chi tiết</Button>
                </>
            ),
        },

        {
            title: 'Công cụ',
            fixed: 'right',
            dataIndex: 'MaPhieuNhap',
            width: 300,
            render: (MaPhieuNhap) => (
                <>
                    <Link to={`./phieunhap/${MaPhieuNhap}`}><Button primary>Sửa</Button></Link>
                    <Popconfirm
                        title="Xóa dữ liệu"
                        description="Bạn chắc xóa dữ liệu này?"
                        onConfirm={() => confirm1(MaPhieuNhap)}
                        okText="Đồng ý"
                        cancelText="Hủy"
                    >
                        <Button danger>Xóa</Button>
                    </Popconfirm>
                </>
            ),
        },
    ];
    const confirm1 = async (MaPhieuNhap) => {


        const res = await ServiceDeliveryReceipt.deleteDeliveryReceipt(MaPhieuNhap)
        if (res.message == "Đồng bộ xóa phiếu nhập thành công") {
            toast.success("Xóa dữ liệu thành công")
            window.location.reload()
        }
        else
            toast.error("Lỗi xóa dữ liệu, Dữ liệu này đang tồn tại ở bảng khác")
    }
    const showModal = async (id) => {
        setData([])
        const res = await ServiceDeliveryReceipt.getDeliveryReceiptDetail(id)
        if (res.message != "chi tiết phiếu nhập không tồn tại") {
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

        const thanhtien = giaNhap * soLuong;

        const body = {
            "reqMaPhieuNhap": id,
            "reqMaGiay": maGiay,
            "reqGiaNhap": giaNhap,
            "reqGiaBan": giaBan,
            "reqSoLuong": soLuong,
            "reqDvt": dvt,
            "reqThanhTien": thanhtien
        };

        const res = await ServiceDeliveryReceipt.createDeliveryReceiptDetail(body);

        if (res.message == "chi tiết phiếu nhập đã tồn tại") {
            toast.warning("Chi tiết hóa đơn đã tồn tại!");
        } else if (res.message == "Đồng bộ thêm chi tiết phiếu nhập thành công") {
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
                                <p>Phiéu nhập : <strong>{data.length != 0 && data[0]?.MaHD}</strong></p>

                                <Table dataSource={data} columns={columnsChiTiet} />
                                Tổng tiền :  <strong className="text-right">{data.reduce((acc, item) => acc + item.ThanhTien, 0)} vnđ</strong>
                            </> : <p className="text-center">Chưa có chi tiết phiếu nhập nào</p>}
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
                                            name="reqDvt"
                                            label="Đơn vị tính"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Hãy nhập đơn vị tính",
                                                },
                                            ]}
                                        >
                                            <Input onChange={(e) => setDvt(e.target.value)} placeholder="Nhập đơn vị tính" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            name="reqGiaNhap"
                                            label="Giá nhập"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Hãy nhập giá nhập",
                                                },
                                            ]}
                                        >
                                            <Input type="number" onChange={(e) => setGiaNhap(e.target.value)} placeholder="Nhập giá nhập" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="reqGiaBan"
                                            label="Giá bán"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Hãy nhập giá bán",
                                                },
                                            ]}
                                        >
                                            <Input type="number" onChange={(e) => setGiaBan(e.target.value)} placeholder="Nhập giá bán" />
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
                        <Divider orientation="left" className="text-white"><Link to={"/admin/phieunhap/them"}><Button type="primary" shape="round" icon={<i class="fas fa-plus"></i>}  >Thêm dữ liệu</Button></Link> </Divider>

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