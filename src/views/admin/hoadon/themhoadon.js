import { Button, Col, DatePicker, Form, Input, message, Row, Select, Space } from "antd";
import { toast } from "react-toastify";
import ServiceCustomer from "service/ServiceCustomer";
import ServiceEmployee from "service/ServiceEmployee";


import dayjs from "dayjs";
import { useEffect } from "react";
import useAsync from "hook/useAsync";
import ServiceOrder from "service/ServiceOrder";
import { useParams } from "react-router";
const { Option } = Select;

const ThemHoaDon = () => {
    const { id } = useParams()
    const [form] = Form.useForm();
    const { data: Customer } = useAsync(() => ServiceCustomer.getAllCustomer())
    const { data: Employee } = useAsync(() => ServiceEmployee.getAllEmployee())
    useEffect(() => {
        if (id != "them") {
            (async () => {
                const res = await ServiceOrder.getOrder(id)
                if (res) {
                    const ngaylap = dayjs(res[0].NgayLap, 'YYYY-MM-DD');


                    form.setFieldsValue({
                        reqMaHD: res[0].MaHD,
                        reqMaNV: res[0].MaNhanVien,
                        reqMaKH: res[0].MaKhachHang,
                        reqHinhThucTT: res[0].HinhThucTT,
                        reqNgayLap: ngaylap,

                    });
                }
            })();
        } else {
            form.resetFields()
        }
    }, [id])
    const onFinish = async (values) => {
        if (id != "them") {

            const ngaylap = dayjs(values.reqNgayLap).format('YYYY-MM-DD')

            const body = {
                "reqMaNV": values.reqMaNV,
                "reqMaKH": values.reqMaKH,
                "reqHinhThucTT": values.reqHinhThucTT,
                "reqNgayLap": ngaylap,

            }

            const res = await ServiceOrder.editOrder(body, id)

            if (res.message) {
                toast.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!")
            }

        } else {
            const ngaylap = dayjs(values.reqNgayLap).format('YYYY-MM-DD')

            const body = {
                "reqMaHD": values.reqMaHD,
                "reqMaNV": values.reqMaNV,
                "reqMaKH": values.reqMaKH,
                "reqHinhThucTT": values.reqHinhThucTT,
                "reqNgayLap": ngaylap,

            }

            const res = await ServiceOrder.createOrder(body)
            if (res.message == "hóa đơn đã tồn tại") {
                toast.warning("Mã hóa đơn đã tồn tại!")
            } else if (res.message == "Đồng bộ thêm hóa đơn thành công") {
                toast.success("Thêm dữ liệu thành công và đồng bộ dữ liệu thành công!")

            }


        }
    };
    return (

        <div className="m-2 md:m-10 mt-32 p-2 md:p-10 bg-white rounded-3xl">

            <Form layout="vertical" form={form} onFinish={onFinish} hideRequiredMark>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="reqMaHD"
                            label="Mã hóa đơn"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập mã hóa đơn',
                                },
                            ]}
                        >
                            <Input disabled={id != "them" ? true : false} placeholder="Nhập mã hóa đơn" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="reqHinhThucTT"
                            label="Hình thức thành toán"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập hình thức thanh toán',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập hình thức thanh toán" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
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

                                {
                                    Array.isArray(Employee) &&
                                    Employee?.map((item, i) => (
                                        <Option key={i + 1} value={item.MaNV}>{item.TenNV}</Option>
                                    ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="reqMaKH"
                            label="Khách hàng"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn khách hàng',
                                },
                            ]}
                        >
                            <Select placeholder="Chọn khách hàng">
                                {
                                    Array.isArray(Employee) &&
                                    Customer?.map((item, i) => (
                                        <Option key={i + 1} value={item.MaKH}>{item.TenKH}</Option>
                                    ))}
                            </Select>
                        </Form.Item>
                    </Col>



                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="reqNgayLap"
                            label="Ngày lập"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn ngày lập',
                                },
                            ]}
                        >
                            <DatePicker
                                style={{ width: "100%" }}
                                format="DD-MM-YYYY"

                                placeholder="Chọn ngày lập " />
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

export default ThemHoaDon;