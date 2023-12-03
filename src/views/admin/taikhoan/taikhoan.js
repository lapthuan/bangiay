import { Breadcrumb, Button, Col, Divider, Popconfirm, Table } from "antd";
import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem";
import Item from "antd/es/list/Item";
import useAsync from "hook/useAsync";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ServiceSanPham from "service/ServiceSanPham";
import ServiceAccount from "service/ServiceAccount";

const Account = () => {
  const { data: taikhoan } = useAsync(() => ServiceAccount.getAllAccount());
  console.log(taikhoan);
  let dataSource = [];
  taikhoan?.map((item, i) =>
    dataSource.push({
      key: i + 1,
      TenTK: item.TenTK,
      Matkhau: item.Matkhau,
      Quyen: item.Quyen,
      MaNV: item.MaNV,
    })
  );

  const columns = [
    {
      title: "Tên tài khoan",
      dataIndex: "TenTK",
      key: "TenTK",
    },
    {
      title: "Nhân viên",
      dataIndex: "MaNV",
      key: "MaNV",
    },
    {
      title: "Quyền",
      dataIndex: "Quyen",
      key: "Quyen",
    },

    {
      title: "Công cụ",
      dataIndex: "TenTK",
      fixed: "right",
      width: 200,
      render: (id) => (
        <>
          <Col>
            <Link to={`/admin/taikhoan/${id}`}>
              {" "}
              <Button type="primary">Sửa</Button>
            </Link>

            <Popconfirm
              title="Xóa dữ liệu"
              description="Bạn chắc xóa dữ liệu này?"
              onConfirm={() => confirm(id)}
              okText="Đồng ý"
              cancelText="Hủy"
            >
              <Button danger>Xóa</Button>
            </Popconfirm>
          </Col>
        </>
      ),
    },
  ];
  const confirm = async (id) => {
    const res = await ServiceAccount.deleteAccount(id);
    if (res.message == "Đồng bộ xóa thành công") {
      toast.success("Xóa dữ liệu thành công");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } else toast.error("Lỗi xóa dữ liệu, Dữ liệu này đang tồn tại ở bảng khác");
  };
  return (
    <>
      <div className="flex flex-wrap mt-32">
        <div className="w-full mb-12 px-4">
          <div className="relative">
            <Divider orientation="left" className="text-white">
              <Link to={"/admin/taikhoan/them"}>
                <Button
                  type="primary"
                  shape="round"
                  icon={<i class="fas fa-plus"></i>}
                >
                  Thêm dữ liệu
                </Button>
              </Link>{" "}
            </Divider>
            <Breadcrumb>
              <BreadcrumbItem>Chức năng</BreadcrumbItem>
              <BreadcrumbItem>Thương hiệu</BreadcrumbItem>
            </Breadcrumb>
            <Table dataSource={dataSource} columns={columns} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
