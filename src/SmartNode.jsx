import React from 'react';
import _ from 'lodash';
import {Box} from "@mui/material";

function SmartNode(props) {
  const {
    tabDatas,
    tabUis,
    theCard
  } = props;
  const smartComponetName = React.useMemo(() => {
    const domId = _.get(theCard, 'domId');
    const tabData = _.get(tabDatas, domId);
    return _.get(tabData, 'elementType');
  },[theCard,tabDatas]);
  const Component  = React.useMemo(() => {
    return null;
  },[smartComponetName]);
  //if(!Component) return null;
  return <Box sx={{
    width: '100%',
    backgroundColor: 'red'
  }}>
    {smartComponetName}
  </Box>
}
export default SmartNode;