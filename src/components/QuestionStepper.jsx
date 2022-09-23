import * as React from 'react';

import { useTheme } from '@mui/material/styles';
import { 
    Box, MobileStepper, Paper, Typography, Button,
    FormControlLabel, FormGroup, Checkbox,
    Radio, RadioGroup 
} from "@mui/material";
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';


const steps = [
  {
    multiple: true,
    id: 1,
    options: ["1", "2", "4"],
    question: "Years of experience ?"
  },
  {
    multiple: false, 
    id: 2,
    options: ["1", "2", "4"],
    question: "Years of experience ?"
  },
  {
    multiple: false, 
    id: 3,
    options: ["No", "Yes"],
    question: "Years of experience ?"
  },
];

export default function TextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;
  
  const [answers, setAnswers] = React.useState(getAnswerTemplate(steps));
  const handleAnswerChange = (id, value, multiple) => {
      let newValue ;
      if(multiple) {
          if(answers[id].includes(value)) newValue = answers[id].filter(v => v !== value);
          else newValue = [...answers[id], value];
      } else {
          newValue = value;
      }
      setAnswers(prev => ({
          ...prev,
          [id]: newValue
      }))
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
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
        <Typography>Questions</Typography>
      </Paper>
      <Box sx={{ height: 255, maxWidth: 400, width: '100%', p: 2 }}>
        <Typography>{steps[activeStep].question}</Typography>
        <br/>
        {
            steps[activeStep].multiple ? (
                <FormGroup>
                    { steps[activeStep].options.map((o, i) => <FormControlLabel key={i} 
                        control={<Checkbox 
                        onChange={() => { handleAnswerChange(steps[activeStep].id, o, true ) }} />} 
                        label={o} 
                        checked={answers[steps[activeStep].id].includes(o)}
                    />) }
                </FormGroup>
            ) : (
                <RadioGroup
                    
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    value={answers[steps[activeStep].id]}
                    onChange={({ target }) => { handleAnswerChange(steps[activeStep].id, target.value, false ) }}
                >
                    {
                        steps[activeStep].options.map((o, i) => <FormControlLabel key={i} 
                            control={<Radio/>} 
                            value={o}
                            label={o} 
                        />)  
                    }
                </RadioGroup>
            )
        }

      </Box>
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
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
  );
}

function getAnswerTemplate (questions = []) {
    let temp = {};
    questions.forEach((q) => {
        if(q.multiple) temp[q.id] = [];
        else temp[q.id] = "";
    });
    return temp;
}