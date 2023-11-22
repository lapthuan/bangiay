import { Button, Col, Form, Input, Row, Space } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ServiceThuongHieu from "service/ServiceThuongHieu";




const ThuongHieuChiTiet = () => {
    const [form] = Form.useForm();
    const { id } = useParams()


    useEffect(() => {

        if (id != "them") {
            (async () => {
                const res = await ServiceThuongHieu.getThuongHieu(id)

                if (res) {
                    form.setFieldsValue({

                        reqMaTH: res[0].MaThuongHieu,
                        reqTenTH: res[0].TenThuongHieu,
                        reqDiaChi: res[0].DiaChi,
                        reqSDT: res[0].SDT,
                        reqEmail: res[0].Email
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
                "reqMaTH": values.reqMaTH,
                "reqTenTH": values.reqTenTH,
                "reqDiaChi": values.reqDiaChi,
                "reqSDT": values.reqSDT,
                "reqEmail": values.reqEmail,
            }

            const res = await ServiceThuongHieu.editThuongHieu(body)

            if (res.message) {
                toast.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!")

            }

        } else {

            const body = {
                "reqMaTH": values.reqMaTH,
                "reqTenTH": values.reqTenTH,
                "reqDiaChi": values.reqDiaChi,
                "reqSDT": values.reqSDT,
                "reqEmail": values.reqEmail,
            }

            const res = await ServiceThuongHieu.createThuongHieu(body)

            if (res.message == "Đã tồn tại") {
                toast.warning("Mã thương hiệu đã tồn tại!")
            } else if (res.message == "Đồng bộ thêm thành công") {
                toast.success("Thêm dữ liệu thành công và đồng bộ dữ liệu thành công!")
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
                                name="reqMaTH"
                                label="Mã thương hiệu"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy nhập mã thương hiệu',
                                    },
                                ]}
                            >
                                <Input disabled={id != "them" ? true : false} placeholder="Nhập mã thương hiệu" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="reqTenTH"
                                label="Tên thương hiệu"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy nhập tên thương hiệu',
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập tên thương hiệu" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="reqSDT"
                                label="Số điẹn thoại"

                            >
                                <Input count={{
                                    show: true,
                                    max: 10,
                                }} placeholder="Nhập số điẹn thoại" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="reqEmail"
                                label="Email"

                            >
                                <Input placeholder="Nhập Email" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>

                        <Col span={24}>
                            <Form.Item
                                name="reqDiaChi"
                                label="Địa chỉ"

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

export default ThuongHieuChiTiet;