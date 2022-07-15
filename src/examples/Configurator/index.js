/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect, useMemo } from "react";

// react-github-btn

// @mui material components
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";


// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Custom styles for the Configurator
import ConfiguratorRoot from "examples/Configurator/ConfiguratorRoot";

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setOpenConfigurator,
  setTransparentSidenav,
  setWhiteSidenav,
  setFixedNavbar,
  setSidenavColor,
  setDarkMode,
} from "context";

let timeoutCrawl;

function Configurator() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    openConfigurator,
    fixedNavbar,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [disabled, setDisabled] = useState(false);
  const [crawling, setCrawling] = useState(false);
  const [crawlTime, setCrawlTime] = useState(() => {
    return JSON.parse(localStorage.getItem('crawlTime')) || 0;
  });
  const [timeCrawl, setTimeCrawl] = useState('');
  const [month, setMonth] = useState(0);
  const [week, setWeek] = useState(0);
  const [day, setDay] = useState(0);
  const sidenavColors = ["primary", "dark", "info", "success", "warning", "error"];

  // Use the useEffect hook to change the button state for the sidenav type based on window size.
  useEffect(() => {
    // A function that sets the disabled state of the buttons for the sidenav type.
    function handleDisabled() {
      return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true);
    }

    // The event listener that's calling the handleDisabled function when resizing the window.
    window.addEventListener("resize", handleDisabled);

    // Call the handleDisabled function to set the state with the initial value.
    handleDisabled();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleDisabled);
  }, []);

  useEffect(() => {
    timeoutCrawl = setTimeout(() => {
      const parts = {
        days: Math.floor(crawlTime / (1000 * 60 * 60 * 24)),
        hours: Math.floor((crawlTime / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((crawlTime / 1000 / 60) % 60),
        seconds: Math.floor((crawlTime / 1000) % 60),
      };

      let remaining = Object.keys(parts)
        .map((part) => {
          if (!parts[part]) return;
          return `${parts[part]} ${part}`;
        })
        .join(" ");

      if (crawlTime > 0) {
        setCrawlTime(crawlTime - 1000);
        setTimeCrawl(remaining);
      }
    }, 1000);

    if (crawlTime <= 0) {
      clearTimeout(timeoutCrawl);
    }
  }, [crawlTime]);

  const handleCloseConfigurator = () => setOpenConfigurator(dispatch, false);
  const handleTransparentSidenav = () => {
    setTransparentSidenav(dispatch, true);
    setWhiteSidenav(dispatch, false);
  };
  const handleWhiteSidenav = () => {
    setWhiteSidenav(dispatch, true);
    setTransparentSidenav(dispatch, false);
  };
  const handleDarkSidenav = () => {
    setWhiteSidenav(dispatch, false);
    setTransparentSidenav(dispatch, false);
  };
  const handleFixedNavbar = () => setFixedNavbar(dispatch, !fixedNavbar);
  const handleDarkMode = () => setDarkMode(dispatch, !darkMode);

  // sidenav type buttons styles
  const sidenavTypeButtonsStyles = ({
    functions: { pxToRem },
    palette: { white, dark, background },
    borders: { borderWidth },
  }) => ({
    height: pxToRem(39),
    background: darkMode ? background.sidenav : white.main,
    color: darkMode ? white.main : dark.main,
    border: `${borderWidth[1]} solid ${darkMode ? white.main : dark.main}`,

    "&:hover, &:focus, &:focus:not(:hover)": {
      background: darkMode ? background.sidenav : white.main,
      color: darkMode ? white.main : dark.main,
      border: `${borderWidth[1]} solid ${darkMode ? white.main : dark.main}`,
    },
  });

  // sidenav type active button styles
  const sidenavTypeActiveButtonStyles = ({
    functions: { pxToRem, linearGradient },
    palette: { white, gradients, background },
  }) => ({
    height: pxToRem(39),
    background: darkMode ? white.main : linearGradient(gradients.dark.main, gradients.dark.state),
    color: darkMode ? background.sidenav : white.main,

    "&:hover, &:focus, &:focus:not(:hover)": {
      background: darkMode ? white.main : linearGradient(gradients.dark.main, gradients.dark.state),
      color: darkMode ? background.sidenav : white.main,
    },
  });

  // handle change month
  const handleChangeMonth = () => {
    const value = parseInt(event.target.value);
    setMonth(value);
  };

  // handle change Week
  const handleChangeWeek = () => {
    const value = parseInt(event.target.value);
    setWeek(value);
  };

  // handle change day
  const handleChangeDay = () => {
    const value = parseInt(event.target.value);
    setDay(value);
  };


  // handler setting craler auto
  const handleSetCrawlerAuto = () => {
    const timeout = (month * 30 * 24 * 60 * 60 + week * 7 * 24 * 60 * 60 + day * 24 * 60 * 60) * 1000;

    const interval = setInterval(() => {
      console.log("Crawler Data ...");

      console.log("Crawled Data!");
    }, timeout);

    setCrawling(true);
    setCrawlTime(timeout);
    localStorage.setItem("crawlTime", JSON.parse(timeout));
    localStorage.setItem('interval', JSON.stringify(interval));
  };

  // handle End Crawling
  const handleEndCrawl = () => {
    const interval = JSON.parse(localStorage.getItem('interval'));
    clearInterval(interval);
    setCrawling(false);
    setCrawlTime(0);
    setTimeCrawl('');
    clearTimeout(timeoutCrawl);
    localStorage.setItem("crawlTime", JSON.parse(0));
    localStorage.setItem("interval", JSON.stringify(null));
  }

  return (
    <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator }}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={4}
        pb={0.5}
        px={3}
      >
        <MDBox>
          <MDTypography variant="h5">Dashboard Configurator</MDTypography>
          <MDTypography variant="body2" color="text">
            See our dashboard options.
          </MDTypography>
        </MDBox>

        <Icon
          sx={({ typography: { size }, palette: { dark, white } }) => ({
            fontSize: `${size.lg} !important`,
            color: darkMode ? white.main : dark.main,
            stroke: "currentColor",
            strokeWidth: "2px",
            cursor: "pointer",
            transform: "translateY(5px)",
          })}
          onClick={handleCloseConfigurator}
        >
          close
        </Icon>
      </MDBox>

      <Divider />

      <MDBox pt={0.5} pb={3} px={3}>
        <MDBox>
          <MDTypography variant="h6">Sidenav Colors</MDTypography>

          <MDBox mb={0.5}>
            {sidenavColors.map((color) => (
              <IconButton
                key={color}
                sx={({
                  borders: { borderWidth },
                  palette: { white, dark, background },
                  transitions,
                }) => ({
                  width: "24px",
                  height: "24px",
                  padding: 0,
                  border: `${borderWidth[1]} solid ${darkMode ? background.sidenav : white.main}`,
                  borderColor: () => {
                    let borderColorValue = sidenavColor === color && dark.main;

                    if (darkMode && sidenavColor === color) {
                      borderColorValue = white.main;
                    }

                    return borderColorValue;
                  },
                  transition: transitions.create("border-color", {
                    easing: transitions.easing.sharp,
                    duration: transitions.duration.shorter,
                  }),
                  backgroundImage: ({ functions: { linearGradient }, palette: { gradients } }) =>
                    linearGradient(gradients[color].main, gradients[color].state),

                  "&:not(:last-child)": {
                    mr: 1,
                  },

                  "&:hover, &:focus, &:active": {
                    borderColor: darkMode ? white.main : dark.main,
                  },
                })}
                onClick={() => setSidenavColor(dispatch, color)}
              />
            ))}
          </MDBox>
        </MDBox>

        <MDBox mt={3} lineHeight={1}>
          <MDTypography variant="h6">Sidenav Type</MDTypography>
          <MDTypography variant="button" color="text">
            Choose between different sidenav types.
          </MDTypography>

          <MDBox
            sx={{
              display: "flex",
              mt: 2,
              mr: 1,
            }}
          >
            <MDButton
              color="dark"
              variant="gradient"
              onClick={handleDarkSidenav}
              disabled={disabled}
              fullWidth
              sx={
                !transparentSidenav && !whiteSidenav
                  ? sidenavTypeActiveButtonStyles
                  : sidenavTypeButtonsStyles
              }
            >
              Dark
            </MDButton>
            <MDBox sx={{ mx: 1, width: "8rem", minWidth: "8rem" }}>
              <MDButton
                color="dark"
                variant="gradient"
                onClick={handleTransparentSidenav}
                disabled={disabled}
                fullWidth
                sx={
                  transparentSidenav && !whiteSidenav
                    ? sidenavTypeActiveButtonStyles
                    : sidenavTypeButtonsStyles
                }
              >
                Transparent
              </MDButton>
            </MDBox>
            <MDButton
              color="dark"
              variant="gradient"
              onClick={handleWhiteSidenav}
              disabled={disabled}
              fullWidth
              sx={
                whiteSidenav && !transparentSidenav
                  ? sidenavTypeActiveButtonStyles
                  : sidenavTypeButtonsStyles
              }
            >
              White
            </MDButton>
          </MDBox>
        </MDBox>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={3}
          lineHeight={1}
        >
          <MDTypography variant="h6">Navbar Fixed</MDTypography>

          <Switch checked={fixedNavbar} onChange={handleFixedNavbar} />
        </MDBox>
        <Divider />
        <MDBox display="flex" justifyContent="space-between" alignItems="center" lineHeight={1}>
          <MDTypography variant="h6">Light / Dark</MDTypography>
          <Switch checked={darkMode} onChange={handleDarkMode} />
        </MDBox>
        <Divider />
        <MDBox mt={3} mb={2}>
          <MDTypography variant="h6">Crawler setting</MDTypography>
        </MDBox>
        <MDBox display="flex" justifyContent="center">
          <MDBox pr={1}>
            <MDInput label="Month" onChange={handleChangeMonth} type="number" />
          </MDBox>
          <MDBox pr={1}>
            <MDInput label="Week" type="number" onChange={handleChangeWeek} />
          </MDBox>
          <MDBox pr={1}>
            <MDInput label="Day" type="number" onChange={handleChangeDay} />
          </MDBox>
        </MDBox>
        <MDBox mt={1} mb={3} display="flex" justifyContent="end">
          <MDButton
            color="dark"
            variant="gradient"
            onClick={handleSetCrawlerAuto}
            disabled={crawling}
          >
            Save
          </MDButton>
        </MDBox>
        <Divider />
        <MDBox mt={3} mb={2}>
          <MDTypography variant="h6">Perform the following crawl</MDTypography>
          <MDTypography variant="body2" color="text">
            {timeCrawl}
          </MDTypography>
        </MDBox>
        <MDBox mt={1} mb={1} display="flex" justifyContent="end">
          <MDButton color="dark" variant="gradient" onClick={handleEndCrawl} disabled={!crawling}>
            End Crawl
          </MDButton>
        </MDBox>
      </MDBox>
    </ConfiguratorRoot>
  );
}

export default Configurator;
