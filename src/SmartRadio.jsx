import React from 'react';
import _ from "lodash";
import {transCSS} from "./cssUtils";
import {Box,
    FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import {values} from "lodash/object";

function SmartRadio(props) {
  const {
    tabDatas,
    theCard,
    showWhen,
    state,
    handleValueUpdate
  } = props;
  const isShown = React.useMemo(() => {
    if(showWhen === undefined) return true;
    return showWhen(state.values);
  },[showWhen,state]);

  const domId = _.get(theCard, 'domId');
  const isReadOnly = _.get(theCard, 'isReadOnly');
  const isRequired = _.get(theCard, 'isRequired');
  const style = _.get(theCard, 'style');

  const theData  = _.get(tabDatas, domId);
  const label = _.get(theData,'caption');
  const width = _.get(theData,'widthPx');
  const theKey = _.get(theData,'name');
  const theOptions = _.get(theData,'options');
  const defaultValue = _.get(theData,'defaultValue');

  const handleChange = React.useCallback((e)=>{
    handleValueUpdate(theKey,e.target.value);
  },[handleValueUpdate,theKey]);

  const  theValue = React.useMemo(() => {
    return _.get(state,['values',theKey],defaultValue);
  },[state,defaultValue]);

  React.useEffect(()=>{
    const v = _.get(state,['values',theKey]);
    if((v === undefined || v === null)&& defaultValue !== undefined) {
      handleValueUpdate(theKey,defaultValue);
    }
  },[state,defaultValue,handleValueUpdate]);

  const boxStyle = React.useMemo(()=>{
    const sx= {
      width: width ? width + 'px': '100%'
    };
    if(style){
      return _.merge(sx, transCSS(style));
    };
    return sx;
  },[width,style]);
  if(!isShown) return null;
  return <Box sx={boxStyle}>
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <RadioGroup
          value={theValue}
          onChange={handleChange}
      >
        {_.map(theOptions,(k,v) => {
          return (<FormControlLabel value={v} key={k} control={<Radio />} label={k} />);
        })}
      </RadioGroup>
    </FormControl>
  </Box>
}

export default SmartRadio;