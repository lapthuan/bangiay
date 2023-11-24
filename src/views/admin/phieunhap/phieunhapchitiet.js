
import { Button, Col, DatePicker, Form, Input, message, Row, Select, Space } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import dayjs from "dayjs";
import ServiceEmployee from "service/ServiceEmployee";
import ServiceBranch from "service/ServiceBranch";
import useAsync from "hook/useAsync";
import ServiceDeliveryReceipt from "service/ServiceDeliveryReceipt";
import ServiceCuaHang from "service/ServiceCuaHang";

const { Option } = Select;



const PhieuNhapChiTiet = () => {
    const { id } = useParams()
    const [form] = Form.useForm();

    const { data: Employee } = useAsync(() => ServiceEmployee.getAllEmployee())
    const { data: CuaHang } = useAsync(() => ServiceCuaHang.getAllCuaHang())
    useEffect(() => {
        if (id != "them") {
            (async () => {
                const res = await ServiceDeliveryReceipt.getDeliveryReceipt(id)
                if (res) {
                    const ngaylp = dayjs(res[0].NgayLap, 'YYYY-MM-DD');

                    form.setFieldsValue({
                        reqMaPhieuNhap: res[0].MaPhieu,
                        reqMaNV: res[0].MaNV,
                        reqGhiChu: res[0].GhiChu,
                        reqNgayLapPhieu: ngaylp,
                        reqMaCH: res[0].MaCuaHang
                    });
                }
            })();
        } else {
            form.resetFields()
        }
    }, [id])
    const onFinish = async (values) => {
        if (id != "them") {
            const ngaylapphieu = dayjs(values.reqNgayLapPhieu).format('YYYY-MM-DD')

            const body = {
                "reqMaNV": values.reqMaNV,
                "reqMaCH": values.reqMaCH,
                "reqGhiChu": values.reqGhiChu,
                "reqNgayLapPhieu": ngaylapphieu
            }

            const res = await ServiceDeliveryReceipt.editDeliveryReceipt(body, id)

            if (res.message) {
                message.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!")

            }

        } else {
            const ngaylapphieu = dayjs(values.reqNgayLapPhieu).format('YYYY-MM-DD')

            const body = {
                "reqMaPhieuNhap": values.reqMaPhieuNhap,
                "reqMaNV": values.reqMaNV,
                "reqMaCH": values.reqMaCH,
                "reqGhiChu": values.reqGhiChu,
                "reqNgayLapPhieu": ngaylapphieu
            }

            const res = await ServiceDeliveryReceipt.createDeliveryReceipt(body)
            if (res.message == "Phiếu nhập đã tồn tại") {
                message.warning("Mã phiếu nhập đã tồn tại!")
            } else if (res.message == "Đồng bộ thêm phiếu nhập thành công") {
                message.success("Thêm dữ liệu thành công và đồng bộ dữ liệu thành công!")

            }


        }
    };
    return (
        <div className="m-2 md:m-10 mt-32 p-2 md:p-10 bg-white rounded-3xl">

            <Form layout="vertical" form={form} onFinish={onFinish} hideRequiredMark>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="reqMaPhieuNhap"
                            label="Mã phiếu nhập"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập mã phiếu nhập',
                                },
                            ]}
                        >
                            <Input disabled={id != "them" ? true : false} placeholder="Nhập mã phiếu nhập" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="reqMaNV"
                            label="Nhân viên"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn nhân viên',
                                },
                            ]}
                        >
                            <Select placeholder="Chọn nhân viên">
                                {Employee?.map((item, i) => (
                                    <Option key={i + 1} value={item.MaNV}>{item.TenNV}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="reqMaCH"
                            label="Cửa hàng"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn cửa hàng',
                                },
                            ]}
                        >
                            <Select placeholder="Chọn cửa hàng">
                                {
                                    Array.isArray(CuaHang) &&
                                    CuaHang?.map((item, i) => (
                                        <Option key={i + 1} value={item.MaCuaHang}>{item.TenCuaHang}</Option>
                                    ))}
                            </Select>
                        </Form.Item>
                    </Col>


                    <Col span={12}>
                        <Form.Item
                            name="reqNgayLapPhieu"
                            label="Ngày lập phếu"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn ngày lập phiếu',
                                },
                            ]}
                        >
                            <DatePicker
                                style={{
                                    width: "100%"
                                }}

                                format="DD-MM-YYYY"
                                placeholder="Nhập ngày lập phiếu" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="reqGhiChu"
                            label="Ghi chú"

                        >
                            <Input.TextArea placeholder="Nhập ghi chú" />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                >
                    <Space align="end">
                        <Button primary htmlType="submit">
                            {id != "them" ? "Sửa" : " Thêm"}
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
}

export default PhieuNhapChiTiet;