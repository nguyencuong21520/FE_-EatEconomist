import { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { Button, GetProp, Input, Upload, UploadProps, message } from "antd";
import { useFormik } from "formik";
import { StoreContext } from "../../../store/ProviderStore";
import "./styles.scss";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import actionRequest from "../../../utils/restApi";
import { toast } from "react-toastify";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const Personal = () => {
  const store = useContext(StoreContext);
  const user = store.user;
  const [imageUrl, setImageUrl] = useState<string>(user.data?.qr);

  const [loading, setLoading] = useState(false);

  const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChangeIMG: UploadProps["onChange"] = (info) => {
    setLoading(true);
    getBase64(info.file.originFileObj as FileType, (url) => {
      setLoading(false);
      setImageUrl(url);
    });
  };
  const formMik = useFormik({
    initialValues: {
      fullName: user.data.fullName as string,
      phoneNumber: user.data.phoneNumber as string,
      bankName: user.data.bankName as string,
      bankNumber: user.data.bankNumber as string,
      bankHolderName: user.data.bankHolderName as string,
    },
    async onSubmit(values) {
      try {
        user.handleUser({
          ...user.data,
          loading: true,
        });

        const respon = await actionRequest("api/v1/auth/current-user", "put", {
          body: {
            ...values,
            qr: imageUrl,
          },
        });

        if (respon.status === 200) {
          toast.success("Cập nhật tài khoản thành công");
          user.handleUser({
            ...user.data,
            ...respon.data?.data,
            loading: false,
          });
        }

        console.log("🚀 ~ onSubmit ~ user:", user);
      } catch (error: any) {
        console.log("🚀 ~ onSubmit ~ error:", error);

        toast.error(error?.message);
      }
    },
  });

  const { handleSubmit, setFieldValue, values } = formMik;
  return (
    <div className="personal">
      <Form>
        <Form.Group>
          <Form.Label>Họ tên</Form.Label>
          <Input
            size="small"
            value={values.fullName}
            onChange={(e) => {
              setFieldValue("fullName", e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Số điện thoại</Form.Label>
          <Input
            size="small"
            value={values.phoneNumber}
            onChange={(e) => {
              setFieldValue("phoneNumber", e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Ngân hàng</Form.Label>
          <Input
            size="small"
            value={values.bankName}
            onChange={(e) => {
              setFieldValue("bankName", e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Số tài khoản</Form.Label>
          <Input
            size="small"
            value={values.bankNumber}
            onChange={(e) => {
              setFieldValue("bankNumber", e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Chủ tài khoản</Form.Label>
          <Input
            size="small"
            value={values.bankHolderName}
            onChange={(e) => {
              setFieldValue("bankHolderName", e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Mã QR</Form.Label>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChangeIMG}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Group>
        <div className="groupBtn">
          <Button
            size="small"
            onClick={() => {
              handleSubmit();
            }}
          >
            {user.data?.loading ? <LoadingOutlined /> : "Cập nhật"}
          </Button>
          <Button size="small">Reset</Button>
        </div>
      </Form>
    </div>
  );
};

export default Personal;
