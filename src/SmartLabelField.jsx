import React from 'react';
import _ from "lodash";
import {transCSS} from "./cssUtils";
import {Box, Typography} from "@mui/material";

function SmartLabelField(props) {

  const {
    tabDatas,
    theCard,
    showWhen,
    state,
  } = props;
  const isShown = React.useMemo(() => {
    if(showWhen === undefined) return true;
    return showWhen(state.values);
  },[showWhen,state]);
  const domId = _.get(theCard, 'domId');
  const style = _.get(theCard, 'style');
  const theData  = _.get(tabDatas, domId);
  const label = _.get(theData,'caption');
  const boxStyle = React.useMemo(() =>{
    if(style !== undefined) {
      return transCSS(style);
    }
    return {};
  },[style]);

  if(!isShown) return null;

  return <Box sx={boxStyle}>
    <Typography>
      {label}
    </Typography>
  </Box>;

}

export default SmartLabelField;