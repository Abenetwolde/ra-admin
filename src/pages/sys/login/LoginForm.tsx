import { Alert, Button, Checkbox, Col, Divider, Form, Input, Row } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AiFillGithub, AiFillGoogleCircle, AiFillWechat } from "react-icons/ai";
import { DEFAULT_USER, TEST_USER } from "@/_mock/assets";
// import { useSignInMutation } from "@/services/authApi"; // Import API hook
import { useLoginStateContext, LoginStateEnum } from "./providers/LoginStateProvider";
// import { setUserToken } from "@/store/userStore"; // Store for managing user authentication
import { useLoginMutation } from "@/api/services/authApi";
import { setUserToken } from "@/api/state/userStore";
import { useNavigate } from "react-router";

function LoginForm() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { loginState, setLoginState } = useLoginStateContext();
  const [signIn, { error }] = useLoginMutation();
  const navigate = useNavigate(); // <

  if (loginState !== LoginStateEnum.LOGIN) return null;

  const handleFinish = async ({ email, password }: { username: string; password: string }) => {
    setLoading(true);
    try {
      const response = await signIn({ email, password }).unwrap();
      console.log("Login Success:", response);

      // Store token in state or local storage
      setUserToken({
        accessToken: response.token,
        refreshToken: response.refreshToken,
        username: response.username,
      });
      navigate("/dashboard", { replace: true }); // Redi
      // Redirect or show success message
    } catch (err) {
      console.error("Login Failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-4 text-2xl font-bold xl:text-3xl">{t("sys.login.signInFormTitle")}</div>

      <Form
        form={form}
        name="login"
        size="large"
        initialValues={{ remember: true, username: DEFAULT_USER.username, password: DEFAULT_USER.password }}
        onFinish={handleFinish}
      >
        <div className="mb-4 flex flex-col">
          {error && <Alert message="Login failed" description="Invalid username or password" type="error" showIcon />}
        </div>

        <Form.Item name="email" rules={[{ required: true, message: t("sys.login.accountPlaceholder") }]}>
          <Input placeholder={t("sys.login.email")} />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: t("sys.login.passwordPlaceholder") }]}>
          <Input.Password placeholder={t("sys.login.password")} />
        </Form.Item>

        <Form.Item>
          <Row align="middle">
            <Col span={12}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>{t("sys.login.rememberMe")}</Checkbox>
              </Form.Item>
            </Col>
            <Col span={12} className="text-right">
              <Button type="link" className="!underline" onClick={() => setLoginState(LoginStateEnum.RESET_PASSWORD)} size="small">
                {t("sys.login.forgetPassword")}
              </Button>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
            {t("sys.login.loginButton")}
          </Button>
        </Form.Item>

        <Row align="middle" gutter={8}>
          <Col span={9} flex="1">
            <Button className="w-full !text-sm" onClick={() => setLoginState(LoginStateEnum.MOBILE)}>
              {t("sys.login.mobileSignInFormTitle")}
            </Button>
          </Col>
          <Col span={9} flex="1">
            <Button className="w-full !text-sm" onClick={() => setLoginState(LoginStateEnum.QR_CODE)}>
              {t("sys.login.qrSignInFormTitle")}
            </Button>
          </Col>
          <Col span={6} flex="1" onClick={() => setLoginState(LoginStateEnum.REGISTER)}>
            <Button className="w-full !text-sm">{t("sys.login.signUpFormTitle")}</Button>
          </Col>
        </Row>

        <Divider className="!text-xs">{t("sys.login.otherSignIn")}</Divider>

        <div className="flex cursor-pointer justify-around text-2xl">
          <AiFillGithub />
          <AiFillWechat />
          <AiFillGoogleCircle />
        </div>
      </Form>
    </>
  );
}

export default LoginForm;
