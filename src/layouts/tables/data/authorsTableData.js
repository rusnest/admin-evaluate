// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

export const Author = ({ image, name, email }) => (
  <MDBox display="flex" alignItems="center" lineHeight={1} style={{ width: "100%" }}>
    <MDAvatar src={image} name={name} size="md" />
    <MDBox ml={2} lineHeight={1} width={700}>
      <MDTypography display="block" variant="button" fontWeight="medium">
        {name}
      </MDTypography>
      <MDTypography display="block" variant="caption">
        {email}
      </MDTypography>
    </MDBox>
  </MDBox>
);

export const Job = ({ title, description }) => (
  <MDBox lineHeight={1} textAlign="left">
    <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
      {title}
    </MDTypography>
    <MDTypography variant="caption">{description} %</MDTypography>
  </MDBox>
);

export default function data() {

  return {
    columns: [
      { Header: "Product", accessor: "author", width: "35%", align: "left" },
      { Header: "evaluate", accessor: "function", align: "left" },
      { Header: "action", accessor: "action", align: "center" },
    ],
  };
}
