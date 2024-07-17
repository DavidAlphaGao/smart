import React from 'react';
import _ from "lodash";
import {transCSS} from "./cssUtils";
import {Box, Checkbox, FormControlLabel, FormGroup, Tooltip} from "@mui/material";

function SmartCheckbox(props) {

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
  const type = _.get(theData,'type');
  const theKey = _.get(theData,'name');
  //const defaultValue = _.get(theData,'defaultValue');

  const handleChange = React.useCallback((e)=>{
    console.log(e.target.checked);
    handleValueUpdate(theKey,e.target.checked);
  },[handleValueUpdate,theKey]);

  const boxStyle = React.useMemo(()=>{
    const sx= {
      width: width ? width + 'px': '100%'
    };
    if(style){
      return _.merge(sx, transCSS(style));
    };
    return sx;
  },[width,style]);

  const  theValue = React.useMemo(() => {
    return _.get(state,['values',theKey]);
  },[state]);
/*
  React.useEffect(()=>{
    const v = _.get(state,['values',theKey]);
    if((v === undefined || v === null) && defaultValue !== undefined) {
      handleValueUpdate(theKey,defaultValue);
    }
  },[state,defaultValue,handleValueUpdate]);
*/
  if(!isShown) return null;
  return <Box sx={boxStyle}>
    <FormGroup>
      <FormControlLabel
          onChange={handleChange}
          checked={theValue || false}
          control={<Checkbox />}
          disabled={isReadOnly}
          required={isRequired}
          label={label}
      />
    </FormGroup>
  </Box>;
}
export default SmartCheckbox;