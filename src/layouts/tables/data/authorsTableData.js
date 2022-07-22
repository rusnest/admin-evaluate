// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

const convertStarToEvaluate = (star, title) => {
  let render = title;
  if (title === 'none') {
    if (star > 4.5) render = 'POSITIVE';
    else if (star > 3.5 && star < 4.5) render = 'NEUTRAL';
    else render = 'NEGATIVE';
  }

  return render;
}

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

export const Job = ({ title, description, star }) => (
  <MDBox lineHeight={1} textAlign="left">
    <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
      {convertStarToEvaluate(star, title)}
    </MDTypography>
    <MDTypography variant="caption">{!description || description === 0 ? `${star} star` : `${description} %`}</MDTypography>
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
