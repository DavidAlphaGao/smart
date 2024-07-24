import React from 'react';
import _ from "lodash";
import {transCSS} from "./cssUtils";
import {Box, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";

function Quantity(props) {
  const {
    label,
    defaultValue,
    reportingName,
    onValueUpdate,
    state,
  } = props;
  const  theValue = React.useMemo(() => {
    return _.get(state,reportingName,defaultValue);
  },[state,defaultValue]);
  React.useEffect(()=>{
    const v = _.get(state,reportingName);
    if(v === undefined || v === null && defaultValue !== undefined) {
      onValueUpdate(reportingName,defaultValue);
    }
  },[state,defaultValue,onValueUpdate]);

  const handleValueUpdate= React.useCallback((e)=>{
    onValueUpdate(reportingName,e.target.value);
  },[onValueUpdate,reportingName]);

    return (<TextField
        label={label}
        onInput={handleValueUpdate}
    />);
}

function SmartQuantity(props) {
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
  const width = _.get(theData,'widthPx');
  const label = _.get(theData,'caption');
  const theKey = _.get(theData,'name');
  const orders =  _.get(theData,'orders');
  const items = _.get(theData,'items');
  const boxStyle = React.useMemo(()=>{
    const sx= {
      width: width ? width + 'px': '100%'
    };
    if(style){
      return _.merge(sx, transCSS(style));
    };
    return sx;
  },[width,style]);
  const theValue = React.useMemo(() => {
    return _.get(state,['values',theKey],{});
  },[state,theKey]);
  const handleChange = React.useCallback((k,value)=>{
    handleValueUpdate([theKey,k],value);
  },[handleValueUpdate,theKey]);
  if(!isShown) return null;
  return (<Box sx={boxStyle}>
    <Box sx={{
      paddingBottom: '10px'
    }}>{label}</Box>
    <Box sx={{
      display: 'flex',
    }}>
      {_.map(orders,(k) => {
        const item = _.get(items,k,{});
        return (<Box sx={{paddingLeft: '10px'}}>
          <Quantity
              {...item}
              onValueUpdate={handleChange}
              state={theValue}
          />
        </Box>) ;
      } )}
    </Box>
  </Box>);
}

export default SmartQuantity;