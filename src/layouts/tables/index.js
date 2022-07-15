import { useCallback, useEffect, useMemo, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import Title from "components/TitleHelmet";
import {
  getTikiProducts,
  getSendoProducts,
  getShopeeProducts,
  getTGDDProducts,
} from "firebases/services";
import { Author, Job } from "./data/authorsTableData";
import { crawlFromTiki } from "services/get";
import { evaluateFromTiki } from "services/get";
import { crawlFromSendo } from "services/get";
import { evaluateFromSendo } from "services/get";
import { crawlFromShopee } from "services/get";
import { evaluateFromShopee } from "services/get";
import { crawlFromTGDD } from "services/get";
import { evaluateFromTGDD } from "services/get";

function Tables() {
  const [products, setProducts] = useState([]);
  const { columns } = authorsTableData();

  useEffect(() => {
    handleChangeShop("Tiki");
  }, []);

  const handleCrawlProduct = async () => {
    const tikis = await crawlFromTiki();
    await evaluateFromTiki(tikis);
    const sendos = await crawlFromSendo();
    await evaluateFromSendo(sendos);
    const shopees = await crawlFromShopee();
    await evaluateFromShopee(shopees);
    const tgdds = await crawlFromTGDD();
    await evaluateFromTGDD(tgdds);

    handleChangeShop("Tiki");
  }

  const handleChangeShop = useCallback(async (shop) => {
    let data = [];
    switch (shop) {
      case "Tiki":
        data = await getTikiProducts();
        setProducts([...data]);
        break;

      case "Sendo":
        data = await getSendoProducts();
        setProducts([...data]);
        break;

      case "Shoppe":
        data = await getShopeeProducts();
        setProducts([...data]);
        break;

      case "TGDD":
        data = await getTGDDProducts();
        setProducts([...data]);
        break;
      default:
        break;
    }
  }, [products]);

  const rows = useMemo(() => {
    return products.map(item => {
      return {
        author: <Author image={item.image} name={item.name} email={item.description} />,
        function: <Job title={item.evaluate} description={item.percent} />,
        action: (
          <MDTypography component="a" href={item.link} variant="caption" color="text" fontWeight="medium">
            Access Link
          </MDTypography>
        ),
      };
    })
  }, [products]);

  return (
    <DashboardLayout>
      <Title title={"Product Table"} />
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                display="flex"
                justifyContent="space-between"
              >
                <MDTypography variant="h6" color="white">
                  Products Table
                </MDTypography>
                <MDButton onClick={handleCrawlProduct}>Crawl Product</MDButton>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={true}
                  canSearch
                  showTotalEntries={false}
                  noEndBorder
                  handleChangeShop={handleChangeShop}
                  options={{
                    tableLayout: "fixed",
                  }}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
