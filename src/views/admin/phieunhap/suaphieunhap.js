



import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    message,
    Row,
    Select,
    Space,
} from "antd";
import useAsync from "hook/useAsync";


import { useEffect } from "react";

import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import ServiceDeliveryReceipt from "service/ServiceDeliveryReceipt";
import ServiceSanPham from "service/ServiceSanPham";

const { Option } = Select;


const SuaPhieuNhap = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const id = queryParams.get('id');
    const idMaMH = queryParams.get('MaSP');
    const action = queryParams.get('action');
    const [form] = Form.useForm();

    const { data: sanPham } = useAsync(() =>
        ServiceSanPham.getAllSanPham()
    );

    useEffect(() => {

        (async () => {
            const res = await ServiceDeliveryReceipt.getDeliveryReceiptDetails(
                id,
                idMaMH
            );
            if (res) {
                form.setFieldsValue({
                    reqMaGiay: res[0].MaGiay,
                    reqGiaNhap: res[0].GiaNhap,
                    reqGiaBan: res[0].GiaBan,
                    reqSoLuong: res[0].SoLuong,
                    reqDvt: res[0].DVT,
                });
            }
        })();

    }, [id]);

    const onFinish = async (values) => {

        const thanhtien = values.reqGiaNhap * values.reqSoLuong;

        const body = {
            "reqIdMaGiay": idMaMH,
            "reqMaPhieuNhap": id,
            "reqMaGiay": values.reqMaGiay,
            "reqGiaNhap": values.reqGiaNhap,
            "reqGiaBan": values.reqGiaBan,
            "reqSoLuong": values.reqSoLuong,
            "reqDvt": values.reqDvt,
            "reqThanhTien": thanhtien,
        };

        const res = await ServiceDeliveryReceipt.editDeliveryReceiptDetail(body);
        if (res.message === "Lỗi khi cập nhật chi tiết phiếu nhập ở SQL Server") {
            toast.success("Sản phẩm trong phiếu đã tồn tại!");
        } else if (res.message) {
            toast.warning(
                "Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!"
            );

        }

    };
    return (
        <div className="m-2 md:m-10 mt-32 p-2 md:p-10 bg-white rounded-3xl">

            <Form layout="vertical" form={form} onFinish={onFinish} hideRequiredMark>
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
                            <Select placeholder="Chọn sản phẩm">
                                {Array.isArray(sanPham) &&
                                    sanPham?.map((item, i) => (
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
                            name="reqGiaNhap"
                            label="Giá nhập"
                            rules={[
                                {
                                    required: true,
                                    message: "Hãy nhập giá nhập",
                                },
                            ]}
                        >
                            <Input type="number" placeholder="Nhập giá nhập" />
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
                            <Input type="number" placeholder="Nhập đơn giá bán" />
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
                            <Input type="number" placeholder="Nhập số lượng" />
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
                            <Input placeholder="Nhập đơn vị tính" />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item>
                    <Space align="end">

                        <Button type="primary" htmlType="submit">
                            Sửa
                        </Button>
                    </Space>
                </Form.Item>
            </Form>

        </div>

    );
}

export default SuaPhieuNhap;