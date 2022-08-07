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
import { useEffect, useMemo, useState } from "react";

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

  const [amountTGDD, setAmountTGDD] = useState(0);
  const [amountTiki, setAmountTiki] = useState(0);
  const [amountSendo, setAmountSendo] = useState(0);
  const [amountShopee, setAmountShopee] = useState(0);
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

    // Amount
    const tikiPOS = tikis.filter((item) => item.evaluate === "POSITIVE");
    const sendoPOS = sendos.filter((item) => item.evaluate === "POSITIVE");
    const shopeePOS = shopees.filter((item) => item.evaluate === "POSITIVE");
    const tgddPOS = tgdds.filter((item) => item.evaluate === "POSITIVE");

    setAmountTiki(Math.ceil((tikiPOS.length * 100) / tikis.length));
    setAmountTGDD(Math.ceil((tgddPOS.length * 100) / tgdds.length));
    setAmountSendo(Math.ceil((sendoPOS.length * 100) / sendos.length));
    setAmountShopee(Math.ceil((shopeePOS.length * 100) / shopees.length));
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
                  amount: `${amountTGDD} %`,
                  label: "Positive",
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
                  amount: `${amountTiki} %`,
                  label: "Positive",
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
                  amount: `${amountSendo} %`,
                  label: "Positive",
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
                  amount: `${amountShopee} %`,
                  label: "Positive",
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
