import { Button, Col, Form, Input, Row, Space, Select } from "antd";
import useAsync from "hook/useAsync";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ServiceAccount from "service/ServiceAccount";
import ServiceEmployee from "service/ServiceEmployee";
const { Option } = Select;

const AccountDetail = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const { data: emp } = useAsync(() => ServiceEmployee.getAllEmployee());

  useEffect(() => {
    if (id != "them") {
      (async () => {
        const res = await ServiceAccount.getAccount(id);
        if (res) {
          form.setFieldsValue({
            reqTenTK: res[0].TenTk,
            reqMaNV: res[0].MaNV,
            reqMatkhau: res[0].Matkhau,
            reqQuyen: res[0].Quyen === true ? "Admin" : "User",
          });
        }
      })();
    } else {
      form.resetFields();
    }
  }, [id]);
  const onFinish = async (values) => {
    if (id != "them") {
      const body = {
        reqTenTK: values.reqTenTK,
        reqMaNV: values.reqMaNV,
        reqMatkhau: values.reqMatkhau,
        reqQuyen: values.reqQuyen,
      };

      const res = await ServiceAccount.editAccount(body);

      if (res.message) {
        toast.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!");
      }
    } else {
      const body = {
        reqTenTK: values.reqTenTK,
        reqMaNV: values.reqMaNV,
        reqMatkhau: values.reqMatkhau,
        reqQuyen: values.reqQuyen,
      };

      const res = await ServiceAccount.createAccount(body);

      if (
        res.message == "Tài khoản đã tồn tại hoặc nhân viên đã có tài khoản"
      ) {
        toast.warning("Tài khoản đã tồn tại hoặc nhân viên đã có tài khoản!");
      } else if (res.message == "Đồng bộ thêm thành công") {
        toast.success("Thêm dữ liệu thành công và đồng bộ dữ liệu thành công!");
      }
    }
  };
  return (
    <>
      <div className="m-2 md:m-10 mt-32 p-2 md:p-10 bg-white rounded-3xl">
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          hideRequiredMark
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="reqTenTK"
                label="Tên tài khoản"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập tài khoản",
                  },
                ]}
              >
                <Input
                  disabled={id != "them" ? true : false}
                  placeholder="Nhập tài khoản"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="reqMatkhau"
                label="Mậ khẩu"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập mật khẩu",
                  },
                ]}
              >
                <Input placeholder="Nhập mật khẩu" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="reqQuyen"
                label="Quyền"
                rules={[
                  {
                    required: true,
                    message: "Hãy chọn quyền",
                  },
                ]}
              >
                <Select placeholder="Chọn quyền">
                  <Option value="1">Admin</Option>
                  <Option value="0">User</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="reqMaNV"
                label="Nhân viên"
                rules={[
                  {
                    required: true,
                    message: "Hãy chọn nhân viên",
                  },
                ]}
              >
                <Select placeholder="Chọn nhân viên">
                  {Array.isArray(emp) &&
                    emp.map((item, i) => (
                      <Option key={i + 1} value={item.MaNV}>
                        {item.TenNV}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
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
};

export default AccountDetail;
