import { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Title from "components/TitleHelmet";
import Typography from "@mui/material/Typography";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { login } from "firebases/services";
import { useNavigate } from "react-router-dom";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [admin, setAdmin] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    const logined = JSON.parse(localStorage.getItem("logined")) ?? false;
    if (logined) {
      navigate("/dashboard");
    }
  }, []);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const handleSubmitLogin = async () => {
    const logined = await login(admin);
    if (logined) {
      setAdmin({
        username: "",
        password: "",
      });
      localStorage.setItem("logined", true);
      navigate("/dashboard");
      return;
    }
    setError("Username and Password are incorrect");
  };

  return (
    <BasicLayout image={bgImage}>
      <Title title={"Sign in"} />
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        {error && (
          <MDBox textAlign="center">
            <Typography variant="subtitle1" fontSize={15} color="error" mt={1} component="p">
              {error}
            </Typography>
          </MDBox>
        )}
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Username"
                fullWidth
                onChange={(e) => setAdmin({ ...admin, username: e.target.value })}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleSubmitLogin}>
                sign in
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
