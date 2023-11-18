import { message, Spin } from "antd";
import useAsync from "hook/useAsync";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ServiceDistributed from "service/ServiceDistributed";

export default function Login() {
  const [bang, setBang] = useState()
  const [cot, setCot] = useState()
  const [dieukien, setDieukien] = useState("")
  const [cotvitu, setCotvitu] = useState()
  const [dieukienvitu, setDieukienvitu] = useState("")
  const [columnOptionTable, setColumnOptionTable] = useState([])
  const [columnOption, setColumnOption] = useState([])
  const [columnOptionDatabase, setColumnOptionDatabase] = useState([])
  const [isLogin, setIsLogin] = useState(false)
  const [isLogin2, setIsLogin2] = useState(false)
  const [host, setHost] = useState("localhost")
  const [userName, setUserName] = useState()
  const [password, setPassword] = useState()
  const [database, setDataBase] = useState()
  const [tanNgang, setTanNgang] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isChecked, setChecked] = useState(false)
  const { data: cuaHang } = useAsync(() => ServiceDistributed.ShowColumn("cuahang"))

  const loginMysql = async (values) => {
    message.loading("Đang thực hiện")

    const body = {
      "host": host,
      "username": userName,
      "password": password,

    }

    const res = await ServiceDistributed.LoginMysql(body)

    if (res.databases) {

      setColumnOptionDatabase(res.databases)
      message.success("Đăng nhập thành công")
      setIsLogin2(true)
    } else {
      setColumnOptionDatabase([])
      message.warning("Đăng nhập thất bại, kiểm tra lại tài khoản và mật khẩu!")
    }

  }
  useEffect(() => {
    if (bang) {
      (async () => {

        const resColumn = await ServiceDistributed.ShowColumn(bang)

        setColumnOption(resColumn?.columns)
      })()
    } else {
      setColumnOption([])
    }
  }, [bang])
  const connectDatabase = async () => {
    const res = await ServiceDistributed.ShowTable(database)
    if (res.table) {

      setColumnOptionTable(res.table)
      message.success("Truy cập thành công")
      setIsLogin(true)

    } else {
      message.warning("Database này không được hỗ trợ phân tán!")
    }

  }

  const phanTan = async () => {
    message.loading("Đang thực hiện phân tán dữ liệu")
    setLoading(true)

    if (isChecked == true && dieukienvitu == "") {
      message.warning("Điều kiện rỗng")
      return
    }

    const body = {
      "bang": "chinhanh",
      "cot": cot,
      "phantan": dieukien,
      "bangvitu": "cuahang",
      "cotvitu": cotvitu,
      "dieukienvitu": dieukienvitu
    }
    const bodyNull = {
      "bang": "chinhanh",
      "cot": cot,
      "phantan": dieukien,
    }

    const res = await ServiceDistributed.PhanTanNgang(isChecked == true ? body : bodyNull)

    if (res.message) {
      message.success("Phân tán thành công")
      setLoading(false)
    }
    setLoading(false)

  }
  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };

  const handleChange = (value) => {
    setDataBase(value.target.value)
  }
  const handleChangeTable = (value) => {
    setBang(value.target.value)
  }
  const handleChangeCotVitu = (value) => {
    setCotvitu(value.target.value)
  }
  const handleChangeCot = (value) => {
    setCot(value.target.value)
  }
  return (
    <>
      {isLogin2 == false ?
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h6 className="text-blueGray-500 text-sm font-bold">
                      Đăng nhập MySql
                    </h6>
                  </div>

                  <hr className="mt-6 border-b-1 border-blueGray-300" />
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">

                  <form>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Host
                      </label>
                      <input
                        type="text"
                        value={host}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        disabled
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        User Name
                      </label>
                      <input
                        type="text"
                        onChange={(e) => setUserName(e.target.value)}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Nhập user name"
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Mật khẩu
                      </label>
                      <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Password"
                      />
                    </div>


                    <div className="text-center mt-6">
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button"
                        onClick={loginMysql}
                      >
                        Đăng nhập
                      </button>
                    </div>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </div> :
        isLogin == false ?
          < div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h6 className="text-blueGray-500 text-sm font-bold">
                        Chọn Database phân tán
                      </h6>
                    </div>

                    <hr className="mt-6 border-b-1 border-blueGray-300" />
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">

                    <form>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Database
                        </label>
                        <select
                          type="host"
                          placeholder="Chọn Database"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          onChange={handleChange}
                        >
                          <option >Chọn Database</option>

                          {
                            columnOptionDatabase?.map((item, i) => (
                              <option key={i + 1} value={item}>{item}</option>
                            ))}

                        </select>
                      </div>



                      <div className="text-center mt-6">
                        <button
                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="button"
                          onClick={connectDatabase}
                        >
                          Truy cập phân tán
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

              </div>
            </div>
          </div> :
          tanNgang == false ?
            < div className="container mx-auto px-4 h-full">
              <div className="flex content-center items-center justify-center h-full">
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                    <div className="rounded-t mb-0 px-6 py-6">
                      <div className="text-center mb-3">
                        <h6 className="text-blueGray-500 text-sm font-bold">
                          Chọn kiểu phân tán
                        </h6>
                      </div>

                      <hr className="mt-6 border-b-1 border-blueGray-300" />
                    </div>
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">

                      <form>
                        <div className="text-center mt-6">
                          <button
                            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setTanNgang(true)}
                          >
                            Ngang
                          </button>
                          <button
                            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            type="button"

                          >
                            Dọc
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                </div>
              </div>
            </div> :
            < div className="container mx-auto px-4 h-full">
              <div className="flex content-center items-center justify-center h-full">
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                    <div className="rounded-t mb-0 px-6 py-6">
                      <div className="text-center mb-3">
                        <h6 className="text-blueGray-500 text-sm font-bold">
                          Lược đồ phân mảnh
                        </h6>
                      </div>

                      <hr className="mt-6 border-b-1 border-blueGray-300" />
                    </div>
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">

                      <form>


                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Bảng
                          </label>
                          <select

                            placeholder="Chọn bảng"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            onChange={handleChangeTable}
                          >
                            <option>Chọn bảng</option>
                            {

                              columnOptionTable?.map((item, i) => (
                                <option key={i + 1} value={item}>{item}</option>
                              ))}

                          </select>
                        </div>
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Cột
                          </label>
                          <select

                            placeholder="Chọn cột"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            onChange={handleChangeCot}
                          >
                            <option>Chọn cột</option>
                            {
                              columnOption?.map((item, i) => (
                                <option key={i + 1} value={item}>{item}</option>
                              ))}
                          </select>
                        </div>
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Điều kiện
                          </label>
                          <input
                            placeholder="Nhập điều kiện"
                            type="text"
                            onChange={(e) => setDieukien(e.target.value)}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          />
                        </div>
                        <div className="relative w-full mb-3">

                          <div class="flex items-center">
                            <input id="checked-checkbox" checked={isChecked} onChange={handleCheckboxChange} type="checkbox" value="" class="w-4 h-4 mr-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="checked-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Thêm vị từ</label>
                          </div>
                        </div>

                        {isChecked == true &&
                          <>
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Bảng
                              </label>
                              <input disabled defaultValue={"cuahang"} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              />
                            </div>
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Cột
                              </label>
                              <select

                                placeholder="Chọn cột"
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                onChange={handleChangeCotVitu}
                              >
                                <option>Chọn cột</option>
                                {
                                  cuaHang?.columns?.map((item, i) => (
                                    <option key={i + 1} value={item}>{item}</option>
                                  ))}
                              </select>
                            </div>


                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Điều kiện
                              </label>
                              <input
                                type="text"
                                onChange={(e) => setDieukienvitu(e.target.value)}
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="Nhập điều kiện"
                              />
                            </div>

                          </>}


                        <div className="text-center mt-6">

                          <button
                            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            type="button"
                            onClick={phanTan}
                            disabled={loading}
                          >
                            {loading === true ? <> <Spin className="px-2" /> Đang phân tán</> : "Phán tán"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                </div>
              </div>
            </div >}

    </>
  );
}
