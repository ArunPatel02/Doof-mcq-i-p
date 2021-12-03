import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from "@mui/styles";
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';


const usestyle = makeStyles({
  scorebox : { 
      height:"100vh",
       display:"flex" , 
       flexDirection : "column" ,
       alignItems : "center",
       justifyContent : "center",
  },
  scorebar: { width: 200, height: 200 , margin : "20px auto" },
  scoreboard : {width:"fit-content"  ,alignItems:"center" , fontSize: "23px", fontFamily: "cursive" , fontWeight : "500" , margin : "20px auto"}

})


export default function Questions(props) {

  const classes = usestyle()

  const steps = [
    {
      label: "Which one is correct team name in NBA?",
      options: [
        "New York Bulls",
        "Los Angeles Kings",
        "Golden State Warriros",
        "Huston Rocket",
      ],
      answer: "Huston Rocket",
    },
    {
      label: "Capital of India",
      options: ["Mumbai", "Bhopal", "New Delhi", "Kolkata"],
      answer: "New Delhi",
    },
    {
      label: "5 + 7 = ?",
      options: ["10", "11", "12", "13"],
      answer: "12",
    },
    {
      label: "11*12  = ?",
      options: ["133", "132", "140", "142"],
      answer: "132",
    },
    {
      label: "12 - 8 = ?",
      options: ["1", "2", "3", "4"],
      answer: "4",
    },
  ];
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const array = ["a","b","c","d" , "e"];
  const [answers, setanswers] = React.useState({a: "",b: "",c: "",d: "", e:""})
  const [chart, setchart] = React.useState(false)
  const [value, setvalue] = React.useState(0)
  let score = 0;

  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const answersave = (e)=>{
    setanswers({...answers, [array[activeStep]] : e.target.value})
  }

  const handlesubmit = ()=>{
    array.forEach((ele)=>{
      switch (ele) {
        case "a":
          if(answers.a === steps[0].answer){score++};
          break;
        case "b":
          if(answers.b === steps[1].answer){score++};
          break;
        case "c":
          if(answers.c === steps[2].answer){score++};
          break;
        case "d":
          if(answers.d === steps[3].answer){score++};
          break;
        case "e":
          if(answers.e === steps[4].answer){score++};
          break;
      }
    })
    console.log(score)
    setchart(true)
    setvalue(score)
  }

  return (
    <>
    {chart===true?"":
    <Box sx={{ width: "70vw",border: "1px solid",padding: "10px 30px",minWidth : "300px",flexGrow: 1 , margin: "20px auto" }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        <Typography>{`${activeStep+1} . ${steps[activeStep].label}`}</Typography>
      </Paper>
      <FormControl component="fieldset">
      <RadioGroup
        aria-label="Questions"
        name="radio-buttons-group"
      >
        <FormControlLabel value={steps[activeStep].options[0]} control={<Radio onChange={answersave}/>} label={steps[activeStep].options[0]} />
        <FormControlLabel value={steps[activeStep].options[1]} control={<Radio onChange={answersave} />} label={steps[activeStep].options[1]}/>
        <FormControlLabel value={steps[activeStep].options[2]} control={<Radio onChange={answersave} />} label={steps[activeStep].options[2]} />
        <FormControlLabel value={steps[activeStep].options[3]} control={<Radio onChange={answersave}/>} label={steps[activeStep].options[3]} />
      </RadioGroup>
    </FormControl>
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
            activeStep === maxSteps - 1?<Button
            size="small"
            onClick={handlesubmit}
          >
            submit
          </Button>:
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
}
    {chart===true?
    <div className={classes.scorebox}>
    <div className={classes.scorebar}>
        <CircularProgressbar value={`${value * 20}`} text={`${value * 20}%`} />
      </div>
      <h1 className={classes.scoreboard}>HI! {props.name} You Have Scored {value} out of 5</h1>
      </div>:""}
      </>
  );
}
