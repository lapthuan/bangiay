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
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ServiceOrder from "service/ServiceOrder";
import ServiceSanPham from "service/ServiceSanPham";
const { Option } = Select;

const HoaDonChiTiet = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const id = queryParams.get('id');
    const idMaMH = queryParams.get('MaSP');

    const [form] = Form.useForm();

    const { data: sanPham } = useAsync(() =>
        ServiceSanPham.getAllSanPham()
    );

    useEffect(() => {

        (async () => {
            const res = await ServiceOrder.getAOrderDetails(idMaMH, id);
            if (res) {
                form.setFieldsValue({
                    reqMaGiay: res[0].MaGiay,
                    reqSoLuong: res[0].SoLuong,
                    reqDVT: res[0].DVT,
                });
            }
        })();

    }, [id]);
    const onFinish = async (values) => {


        const resSanPham = await ServiceSanPham.getSanPham(idMaMH);
        const thanhtien = resSanPham[0].DonGia * values.reqSoLuong;

        const body = {
            "reqMaHD": id,
            "reqIdMaGiay": idMaMH,
            "reqMaGiay": values.reqMaGiay,
            "reqSoLuong": values.reqSoLuong,
            "reqDVT": values.reqDVT,
            "reqThanhTien": thanhtien
        };
        const res = await ServiceOrder.editOrderDetail(body);
        if (res.message === "Lỗi khi cập nhật chi tiết hóa đơn ở SQL Server") {
            toast.warning("Sản phẩm trong hóa đơn chi tiết đã tồn tại!");
        } else if (res.message) {
            toast.success(
                "Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!"
            );
        }

    };
    return (
        <div className="flex flex-wrap mt-32">
            <div className="w-full mb-12 px-4">
                <div className="relative">
                    <Link className="hover:text-blue-600 mb-3" to={`./hoadon`}> <Button type="primary">Trở về danh sách hóa đơn</Button></Link>
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
                                    name="reqDVT"
                                    label="Đơn vị tính"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Hãy nhập đơn vị tính",
                                        },
                                    ]}
                                >
                                    <Input type="number" placeholder="Nhập đơn vị tính" />
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
            </div>

        </div>);
}

export default HoaDonChiTiet;