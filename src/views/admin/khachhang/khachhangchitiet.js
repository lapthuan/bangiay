
import { Button, Col, DatePicker, Form, Input, message, Row, Select, Space } from "antd";

import dayjs from "dayjs";
import useAsync from "hook/useAsync";
import { useEffect } from "react";

import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ServiceBranch from "service/ServiceBranch";
import ServiceCuaHang from "service/ServiceCuaHang";
import ServiceCustomer from "service/ServiceCustomer";

const { Option } = Select;

const KhachHangChiTiet = () => {
    const [form] = Form.useForm();
    const { id } = useParams()
    const { data: cuahang } = useAsync(() => ServiceCuaHang.getAllCuaHang())

    useEffect(() => {

        if (id != "them") {
            (async () => {
                const res = await ServiceCustomer.getACustomer(id)

                if (res) {

                    form.setFieldsValue({
                        makh: res[0].MaKhachHang,
                        macuahang: res[0].MaCH,
                        tenkh: res[0].TenKhachHang,
                        diachi: res[0].DiaChi,
                        sdt: res[0].SDT,
                    });
                }
            })();
        } else {
            form.resetFields()
        }
    }, [id])
    const onFinish = async (values) => {


        if (id != "them") {
       
            const body = {
                "reqMaKH": values.makh,
                "reqTenKH": values.tenkh,
                "reqMaCH": values.macuahang,
                "reqDiaChi": values.diachi,
                "reqSdt": values.sdt,
            }

            const res = await ServiceCustomer.editCustomer(body)

            if (res.message) {
                toast.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!")

            }

        } else {
           
            const body = {
                "reqMaKH": values.makh,
                "reqTenKH": values.tenkh,
                "reqMaCH": values.macuahang,
                "reqDiaChi": values.diachi,
                "reqSdt": values.sdt,
            }

            const res = await ServiceCustomer.createCustomer(body)

            if (res.message == "Đã tồn tại") {
                toast.warning("Mã khách hàng đã tồn tại!")
            } else if (res.message == "Đồng bộ thêm thành công") {
                toast.success("Thêm dữ liệu thành công và đồng bộ dữ liệu thành công!")

            }

        }


    };
    return (
        <>
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">

                <Form layout="vertical" form={form} onFinish={onFinish} hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="makh"
                                label="Mã khách hàng"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy nhập mã khách hàng',
                                    },
                                ]}
                            >
                                <Input disabled={id != "them" ? true : false} placeholder="Nhập mã khách hàng" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="tenkh"
                                label="Tên khách hàng"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy nhập tên khách hàng',
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập tên khách hàng" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="macuahang"
                                label="Cửa hàng"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy chọn cửa hàng',
                                    },
                                ]}
                            >
                                <Select placeholder="Chọn của hàng">
                                    {
                                        Array.isArray(cuahang) &&
                                        cuahang.map((item, i) => (
                                            <Option key={i + 1} value={item.MaCuaHang}>{item.TenCuaHang}</Option>
                                        ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="sdt"
                                label="Số điện thoại"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy nhập số điện thoại',
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập số điện thoại" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="diachi"
                                label="Địa chỉ"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy nhập địa chỉ',
                                    },
                                ]}
                            >
                                <Input.TextArea placeholder="Nhập địa chỉ" />
                            </Form.Item>
                        </Col>

                    </Row>

                    <Form.Item

                    >
                        <Space align="end">

                            <Button type="primary" htmlType="submit">
                                {id != "them" ? "Sửa" : " Thêm"}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}

export default KhachHangChiTiet;