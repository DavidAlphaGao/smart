import React from 'react';
import _ from "lodash";
import {transCSS} from "./cssUtils";
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const buildTheOptionList = (theData) => {
  const values = _.get(theData, 'values');
  const uniques = _.get(theData, 'uniques');
  return  _.map(uniques,(theKey) => _.get(values,theKey));
}

function SmartSelectField(props) {

  const {
    tabDatas,
    theCard,
    state,
    handleValueUpdate,
      showWhen,
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
  const boxStyle = React.useMemo(()=>{
    const sx= {
      width: width ? width + 'px': '100%'
    };
    if(style){
      return _.merge(sx, transCSS(style));
    };
    return sx;
  },[width,style]);
  const theOptions = React.useMemo(() => {
    return buildTheOptionList(theData);
  },[theData]);

  const theValue = React.useMemo(() => {
      const defaultKey = _.get(theData, 'defaultValue');
      if(defaultKey) {
        const theItem = _.get(theData, ['values', defaultKey]);
        return _.get(state,['values',theKey],theItem.value);
      }
      return _.get(state,['values',theKey]);
  },[state,theData,theKey]);
  const handleSelect = React.useCallback((e)=>{
    handleValueUpdate(theKey,e.target.value);
  },[handleValueUpdate,theKey]);


  if(!isShown) return null;

  return <Box >
    <FormControl sx={boxStyle}>
      <InputLabel>{label}</InputLabel>
      <Select
          label={label}
          required={isRequired}
        disabled={isReadOnly}
        value={theValue}
          onChange={handleSelect}
      >
        {_.map(theOptions,
            (option)=>(<MenuItem
                key={theKey + '-' +option.value}
                value={option.value}>
              {option.label}
            </MenuItem>))}
      </Select>
    </FormControl>
  </Box>;

}

export default SmartSelectField;