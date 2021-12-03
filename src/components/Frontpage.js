import { Alert, Avatar, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import InputUnstyled from "@mui/base/InputUnstyled";
import { styled } from "@mui/system";
import React, { useState } from "react";
import images from "../asserts/windows-11-wallpapers.jpg";
import Questions from "./Questions";


const StyledInputElement = styled("input")`
  width: 200px;
  font-size: 1rem;
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  line-height: 1.4375em;
  background: rgb(243, 246, 249);
  border: 1px solid #e5e8ec;
  border-radius: 10px;
  padding: 6px 10px;
  color: #20262d;
  transition: width 300ms ease;

  &:hover {
    background: #eaeef3;
    border-color: #e5e8ec;
  }

  &:focus {
    outline: none;
    width: 220px;
    transition: width 200ms ease-out;
  }
`;

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
  return (
    <InputUnstyled
      components={{ Input: StyledInputElement }}
      {...props}
      ref={ref}
      onChange={(e) => props.setname(e.target.value)}
    />
  );
});

const usestyle = makeStyles({
  front_page: {
    height: "100vh",
    width: "100vw",
    backgroundImage: `url(${images})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: "100",
    top: 0,
    left: 0,
    transition: "all 1s",
    transitionDelay: ".5s",
  },
  deactivate: {
    transform: "translateY(-100%)",
  },
  box: {
    padding: "3vh 5vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    background: "radial-gradient(black, transparent)",
    gap: "20px",
  },
});

const Frontpage = () => {
  const classes = usestyle();
  const [name, setname] = useState("");
  const [alert, setalert] = useState(false);
  const [alertmsg, setalertmsg] = useState("");
  const [alerttype, setalerttype] = useState("");

  const handleclick = () => {
    if (name === "") {
      setalert(true);
      setalerttype("error");
      setalertmsg("fill the name");
    } else if (name.length < 4) {
      setalert(true);
      setalerttype("error");
      setalertmsg("name should be of minimum 4 character");
    } else {
      setalert(true);
      setalerttype("success");
      setalertmsg("successfull");
    }
  };

  return (
    <>
      <div
        className={
          alerttype === "success"
            ? `${classes.front_page} ${classes.deactivate}`
            : `${classes.front_page}`
        }
      >
        <Box className={classes.box}>
          {alert === true ? <Alert severity={alerttype}>{alertmsg}</Alert> : ""}
          <Avatar
            style={{ height: "10vmax", width: "10vmax" }}
            src="/broken-image.jpg"
          />
          <CustomInput
            aria-label="Demo input"
            value={name}
            placeholder="Enter your name"
            setname={setname}
          />
          <Button variant="outlined" onClick={handleclick}>
            Start Test
          </Button>
        </Box>
      </div>
      <div className="questionpage">
        <Questions />
      </div>
    </>
  );
};

export default Frontpage;
