import React from 'react';
import _ from "lodash";
import {transCSS} from "./cssUtils";
import {Box, TextField, Tooltip} from "@mui/material";

function SmartTextArea(props) {
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
  const defaultValue = _.get(theData,'defaultValue');
  const rows = _.get(theData,'rows');
  const cols = _.get(theData,'cols');

  const handleInput = React.useCallback((e)=>{
    handleValueUpdate(theKey,e.target.value);
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
    const theText = defaultValue || '';
    return _.get(state,['values',theKey],theText);
  },[state,defaultValue]);

  React.useEffect(()=>{
    const v = _.get(state,['values',theKey]);
    if((v === undefined || v === null) && defaultValue !== undefined) {
      handleValueUpdate(theKey,defaultValue);
    }
  },[state,defaultValue,handleValueUpdate]);

  if(!isShown) return null;
  return <Box sx={boxStyle}>
    <Tooltip title={label}>
      <TextField
          disabled={isReadOnly}
          required={isRequired}
          label={label}
          type={type}
          onInput={handleInput}
          value={theValue}
          multiline={true}
          rows={rows}
          cols={cols}
      />
    </Tooltip>
  </Box>;
}

export default SmartTextArea;
