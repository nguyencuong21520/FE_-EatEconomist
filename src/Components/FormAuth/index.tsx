import { useContext, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../../store/ProviderStore";
import actionRequest from "../../../utils/restApi";
import "./styles.scss";
import { toast } from "react-toastify";

interface Props {
  form: "login" | "register" | "resetPassword";
}
const FormAuth = (props: Props) => {
  const store = useContext(StoreContext);
  const user = store.user;
  const nav = useNavigate();
  const validationSchema = yup.object({
    email: yup.string().required("Bạn cần nhập email!"),
    ...(props.form !== "resetPassword" && {
      password: yup.string().required("Bạn cần nhập mật khẩu!"),
    }),
    ...(props.form === "register"
      ? {
          fullName: yup.string().required("Bạn cần nhập họ tên!"),
          //   bankName: yup.string().required("Bạn cần tên ngân hàng!"),
          //   bankNumber: yup
          //     .string()
          //     .required("Bạn cần nhập tài khoản ngân hàng!"),
          //   bankHolderName: yup
          //     .string()
          //     .required("Bạn cần nhập tên chủ tài khoản!"),
        }
      : {}),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      ...(props.form === "register"
        ? {
            fullName: "",
            bankName: "",
            bankNumber: "",
            bankHolderName: "",
          }
        : {}),
    },
    validationSchema,
    async onSubmit(values) {
      user.handleUser({
        ...user.data,
        loading: true,
      });
      switch (props.form) {
        case "login":
          // eslint-disable-next-line no-case-declarations
          const logined = await actionRequest("/api/v1/auth/login", "post", {
            body: values,
          });
          user.handleUser({
            ...logined.data,
            loading: false,
          });
          break;
        case "register":
          // eslint-disable-next-line no-case-declarations
          const register = await actionRequest(
            "/api/v1/auth/register",
            "post",
            {
              body: values,
            }
          );
          user.handleUser({
            ...register.data,
            loading: false,
          });
          if (register.status == 201) {
            toast.success("Đăng ký tài khoản thành công");
          }
          break;
        case "resetPassword":
        default:
          break;
      }
    },
  });

  useEffect(() => {
    if (user.data.token) {
      localStorage.setItem("access_token", user.data.token as string);
      nav("/");
    }
  }, [user.data]);
  return (
    <div className="formAuthPage">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={formik.handleSubmit}
        autoComplete="off"
        className="form"
      >
        <div className="contentForm">
          <Form.Item label="Email" name="email">
            <Input
              className="input"
              placeholder="example@gmail.com"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="error">{formik.errors.email}</p>
            )}
          </Form.Item>
          {props.form !== "resetPassword" && (
            <Form.Item label="Password" name="password">
              <Input
                type="password"
                className="input"
                placeholder="Nhập mật khẩu"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.password && formik.touched.password && (
                <p className="error">{formik.errors.password}</p>
              )}
            </Form.Item>
          )}
          {props.form === "register" ? (
            <>
              <Form.Item label="Họ tên" name="fullName">
                <Input
                  className="input"
                  placeholder="Nguyễn Văn An"
                  name="fullName"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.fullName && formik.touched.fullName && (
                  <p className="error">{formik.errors.fullName}</p>
                )}
              </Form.Item>
              {/* <Form.Item label="Tên ngân hàng" name="bankName">
                <Input
                  className="input"
                  placeholder="VD: P BANK"
                  name="bankName"
                  value={formik.values.bankName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.bankName && formik.touched.bankName && (
                  <p className="error">{formik.errors.bankName}</p>
                )}
              </Form.Item>
              <Form.Item label="Số tài khoản" name="bankNumber">
                <Input
                  className="input"
                  placeholder="0123xxxx"
                  name="bankNumber"
                  value={formik.values.bankNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.bankNumber && formik.touched.bankNumber && (
                  <p className="error">{formik.errors.bankNumber}</p>
                )}
              </Form.Item>
              <Form.Item label="Chủ sở hữu" name="bankHolderName">
                <Input
                  className="input"
                  placeholder="NGUYEN VAN A"
                  name="bankHolderName"
                  value={formik.values.bankHolderName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.bankHolderName &&
                  formik.touched.bankHolderName && (
                    <p className="error">{formik.errors.bankHolderName}</p>
                  )}
              </Form.Item> */}
            </>
          ) : (
            ""
          )}
        </div>
        {props.form === "login" && (
          <div>
            <Link to={"/auth/reset-password"}>
              <p className="forgotPass">Bạn quên mật khẩu?</p>
            </Link>
          </div>
        )}
        <Button
          type="primary"
          loading={user.data.loading}
          disabled={user.data.loading}
          htmlType="submit"
          className="btnSubmit"
        >
          {props.form === "login" ? "Đăng nhập" : "Đăng ký"}
        </Button>
        <div className="redirectRegister">
          <p className="forgotPass">
            Bạn {props.form === "login" ? "chưa có" : "đã có"} tài khoản?
          </p>
          <Link to={props.form === "login" ? "/auth/register" : "/auth/login"}>
            <Button loading={user.data.loading} disabled={user.data.loading}>
              {props.form === "login" ? "Đăng ký" : "Đăng nhập"}
            </Button>
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default FormAuth;
