import { Button, Col, Form, Input, message, Row, Space } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ServiceDanhMuc from "service/ServiceDanhMuc";




const DanhMucChiTiet = () => {
    const [form] = Form.useForm();
    const { id } = useParams()


    useEffect(() => {

        if (id != "add") {
            (async () => {
                const res = await ServiceDanhMuc.getALDanhMuc(id)

                if (res) {
                    form.setFieldsValue({

                        malh: res[0].MaLoai,
                        tenlh: res[0].TenLoai,
                        ghichu: res[0].GhiChu
                    });
                }
            })();
        } else {
            form.resetFields()
        }
    }, [id])
    const onFinish = async (values) => {
        message.loading("Đang xử lý")

        if (id != "add") {
            const body = {
                "reqMaLH": values.malh,
                "reqTenLH": values.tenlh,
                "reqGhiChu": values.ghichu
            }

            const res = await ServiceDanhMuc.editDanhMuc(body)

            if (res.message) {
                message.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!")

            }

        } else {

            const body = {
                "reqMaLH": values.malh,
                "reqTenLH": values.tenlh,
                "reqGhiChu": values.ghichu
            }

            const res = await ServiceDanhMuc.createDanhMuc(body)

            if (res.message == "Đã tồn tại") {
                message.warning("Mã danh mục đã tồn tại!")
            } else if (res.message == "Đồng bộ thêm thành công") {
                message.success("Thêm dữ liệu thành công và đồng bộ dữ liệu thành công!")
            }

        }


    };
    return (
        <>
            <div className="m-2 md:m-10 mt-32 p-2 md:p-10 bg-white rounded-3xl">


                <Form layout="vertical" form={form} onFinish={onFinish} hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="malh"
                                label="Mã danh mục"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy Nhập mã danh mục',
                                    },
                                ]}
                            >
                                <Input disabled={id != "add" ? true : false} placeholder="Nhập mã danh mục" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="tenlh"
                                label="Tên danh mục"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy nhập tên danh mục',
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập tên mặt hàng" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="ghichu"
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
                                {id != "add" ? "Sửa" : " Thêm"}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}

export default DanhMucChiTiet;