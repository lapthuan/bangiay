
import { Button, Col, DatePicker, Form, Input, message, Row, Select, Space } from "antd";

import dayjs from "dayjs";
import ServiceEmployee from "service/ServiceEmployee";
import { useEffect } from "react";

import { useParams } from "react-router-dom";
import useAsync from "hook/useAsync";
import { toast } from "react-toastify";
import ServiceCuaHang from "service/ServiceCuaHang";
const { Option } = Select;

const NhanVienChiTiet = () => {
    const [form] = Form.useForm();

    const { data: cuahang } = useAsync(() => ServiceCuaHang.getAllCuaHang())
    const { id } = useParams()

    useEffect(() => {

        if (id != "them") {
            (async () => {
                const res = await ServiceEmployee.getAEmployee(id)

                if (res) {

                    const ngaysinhfm = dayjs(res[0].NgaySinh, 'YYYY-MM-DD');

                    form.setFieldsValue({

                        manv: res[0].MaNhanVien,
                        macuahang: res[0].MaCuaHang,
                        tennv: res[0].TenNhanVien,
                        gioitinh: res[0].GioiTinh,
                        diachi: res[0].DiaChi,
                        sdt: res[0].SDT,
                        reqEmail: res[0].Email,
                        ngaysinh: ngaysinhfm
                    });

                }
            })();
        } else {
            form.resetFields()
        }
    }, [id])
    const onFinish = async (values) => {

        if (id != "them") {
            const ngaysinh = dayjs(values.ngaysinh).format('YYYY-MM-DD')
            const body = {
                "reqMaNV": values.manv,
                "reqMaCH": values.macuahang,
                "reqTenNV": values.tennv,
                "reqNgaySinh": ngaysinh,
                "reqGioiTinh": values.gioitinh,
                "reqDiachi": values.diachi,
                "reqSdt": values.sdt,
                "reqEmail": values.reqEmail,
            }

            const res = await ServiceEmployee.editEmployee(body, id)

            if (res.message) {
                toast.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!")

            }

        } else {
            const ngaysinh = dayjs(values.ngaysinh).format('YYYY-MM-DD')

            const body = {
                "reqMaNV": values.manv,
                "reqMaCH": values.macuahang,
                "reqTenNV": values.tennv,
                "reqNgaySinh": ngaysinh,
                "reqGioiTinh": values.gioitinh,
                "reqDiachi": values.diachi,
                "reqSdt": values.sdt,
                "reqEmail": values.reqEmail,
            }

            const res = await ServiceEmployee.createEmployee(body)

            if (res.message == "Lỗi khi thêm vào SQL Server") {
                toast.warning("Mã nhân viên đã tồn tại!")
            } else if (res.message == "Đồng bộ thêm thành công!") {
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
                            name="manv"
                            label="Mã nhân viên"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập mã nhân viên',
                                },
                            ]}
                        >
                            <Input disabled={id != "them" ? true : false} placeholder="Nhập mã nhân viên" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="tennv"
                            label="Họ tên"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập tên nhân viên',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập tên nhân viên" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name="ngaysinh"
                            label="Ngày sinh"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn ngày sinh',
                                },
                            ]}
                        >
                            <DatePicker
                                style={{ width: "100%" }}
                                format="DD-MM-YYYY"
                                placeholder="Chọn ngày sinh" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="gioitinh"
                            label="Giới tính"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn giới tính',
                                },
                            ]}
                        >
                            <Select placeholder="Chọn giới tính">
                                <Option value="Nam">Nam</Option>
                                <Option value="Nu">Nữ</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
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
                </Row>
                <Row gutter={16}>

                    <Col span={12}>
                        <Form.Item
                            name="reqEmail"
                            label="Email"

                        >
                            <Input placeholder="Nhập Email" />
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
                            <Input count={{
                                show: true,
                                max: 10,
                            }} placeholder="Nhập số điện thoại" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}> <Col span={24}>
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
                </Col></Row>
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
    );
}

export default NhanVienChiTiet;