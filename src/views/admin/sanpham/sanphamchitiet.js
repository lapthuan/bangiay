import { useParams } from "react-router-dom";

import { Button, Col, Form, Input, message, Row, Select, Space } from "antd";

import { useEffect, useState } from "react";

import ServiceThuongHieu from "service/ServiceThuongHieu";
import ServiceSanPham from "service/ServiceSanPham";
import ServiceDanhMuc from "service/ServiceDanhMuc";
import useAsync from "hook/useAsync";

const { Option } = Select;


const SanPhamChiTiet = () => {
    const { id } = useParams()
    const [form] = Form.useForm();
    const { data: DanhMuc } = useAsync(() => ServiceDanhMuc.getAllDanhMuc())
    const { data: ThuongHieu } = useAsync(() => ServiceThuongHieu.getAllThuongHieu())
    useEffect(() => {
        if (id != "them") {
            (async () => {
                const res = await ServiceSanPham.getSanPham(id)
                if (res) {
                    form.setFieldsValue({
                        reqMaGiay: res[0].MaGiay,
                        reqMaDM: res[0].MaDanhMuc,
                        reqDonGia: res[0].DonGia,
                        reqGiamGia: res[0].GiamGia,
                        reqTenGiay: res[0].TenGiay,
                        reqMaTH: res[0].MaTH,

                    });
                }
            })();
        } else {
            form.resetFields()
        }
    }, [id])
    const onFinish = async (values) => {
        message.loading("Đang xử lý")
        if (id != "them") {
            const body = {
                "reqMaGiay": values.reqMaGiay,
                "reqMaDM": values.reqMaDM,
                "reqDonGia": values.reqDonGia,
                "reqGiamGia": values.reqGiamGia,
                "reqTenGiay": values.reqTenGiay,
                "reqMaTH": values.reqMaTH,
            }

            const res = await ServiceSanPham.editSanPham(body)

            if (res.message) {
                message.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!")

            }

        } else {
            const body = {
                "reqMaGiay": values.reqMaGiay,
                "reqMaDM": values.reqMaDM,
                "reqDonGia": values.reqDonGia,
                "reqGiamGia": values.reqGiamGia,
                "reqTenGiay": values.reqTenGiay,
                "reqMaTH": values.reqMaTH,
            }

            const res = await ServiceSanPham.createSanPham(body)

            if (res.message == "Đã tồn tại") {
                message.warning("Mã sản phẩm đã tồn tại!")
            } else if (res.message == "Đồng bộ thêm thành công") {
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
                            name="reqMaGiay"
                            label="Mã sản phẩm"

                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập mã sản phẩm',
                                },
                            ]}
                        >
                            <Input disabled={id != "them" ? true : false} placeholder="Nhập mã sản phẩm" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="reqTenGiay"
                            label="Tên sản phẩm"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập tên sản phẩm',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập tên sản phẩm" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="reqMaDM"
                            label="Danh mục"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn danh mục',
                                },
                            ]}
                        >
                            <Select placeholder="Chọn danh mục">
                                {
                                    Array.isArray(DanhMuc) &&
                                    DanhMuc?.map((item, i) => (
                                        <Option key={i + 1} value={item.MaLoai}>{item.TenLoai}</Option>

                                    ))}

                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="reqMaTH"
                            label="Thương hiệu"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn thương hiệu',
                                },
                            ]}
                        >
                            <Select placeholder="Chọn thương hiệu">
                                {
                                    Array.isArray(ThuongHieu) &&
                                    ThuongHieu?.map((item, i) => (
                                        <Option key={i + 1} value={item.MaThuongHieu}>{item.TenThuongHieu}</Option>

                                    ))}
                            </Select>
                        </Form.Item>
                    </Col>

                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="reqDonGia"
                            label="Giá"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập giá',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập giá" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="reqGiamGia"
                            label="Giá giảm"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập giá giảm',
                                },
                            ]}
                        >
                            <Input type="number" placeholder="Nhập giá giảm" />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item

                >
                    <Space align="end">

                        <Button htmlType="submit" primary>
                            {id != "them" ? "Sửa" : " Thêm"}
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>


    );
}

export default SanPhamChiTiet;