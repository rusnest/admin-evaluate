// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import Title from "components/TitleHelmet";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// React router dom
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// image
import tgdd from "assets/images/shop/tgdd.png";
import shopee from "assets/images/shop/shopee.jpeg";
import tiki from "assets/images/shop/tiki.png";
import sendo from "assets/images/shop/sendo.png";
import {
  getTikiProducts,
  getSendoProducts,
  getTGDDProducts,
  getShopeeProducts,
} from "firebases/services";

function Dashboard() {
  const [countTiki, setCountTiki] = useState(0);
  const [countSendo, setCountSendo] = useState(0);
  const [countTGDD, setCountTGDD] = useState(0);
  const [countShopee, setCountShopee] = useState(0);
  const navigate = useNavigate();

  const getCountProduct = async () => {
    const tikis = await getTikiProducts();
    setCountTiki(tikis.length);
    const sendos = await getSendoProducts();
    setCountSendo(sendos.length);
    const shopees = await getShopeeProducts();
    setCountShopee(shopees.length);
    const tgdds = await getTGDDProducts();
    setCountTGDD(tgdds.length);
  }

  useEffect(() => {
    const logined = JSON.parse(localStorage.getItem("logined")) ?? false;
    if (!logined) {
      navigate("/authentication/sign-in");
    }

    getCountProduct();
  }, []);

  return (
    <DashboardLayout>
      <Title title={"Dashboard"} />
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                image={tgdd}
                title="The Gioi Di Dong"
                count={countTGDD}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "positive",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                image={tiki}
                title="Tiki"
                count={countTiki}
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                image={sendo}
                title="Sendo"
                count={countSendo}
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                image={shopee}
                title="Shopee"
                count={countShopee}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
