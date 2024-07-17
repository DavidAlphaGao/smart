import React from 'react';
import _ from 'lodash';
import {Box} from "@mui/material";
import SmartTextField from "./SmartTextField";
import SmartSelectField from "./SmartSelectField";
import SmartLabelField from './SmartLabelField';
import {buildShowWhen} from "./utils";
import SmartDimensions from "./SmartDimensions";
import SmartRadio from "./SmartRadio";
import SmartCheckbox from "./SmartCheckbox";

function SmartNode(props) {
  const {
    tabDatas,
    tabUis,
    theCard,
      state,
    handleValueUpdate
  } = props;

  const showWhenFunc = React.useMemo(()=> {
    const showWhen = _.get(theCard, 'showWhen');
    const showUsing = _.get(theCard, 'showUsing');
    if(showWhen && showWhen.length > 0) {
      return buildShowWhen(showWhen,showUsing,tabDatas);
    }
    return undefined;
  },[theCard,tabDatas]);


  const smartComponetName = React.useMemo(() => {
    const domId = _.get(theCard, 'domId');
    const tabData = _.get(tabDatas, domId);
    return _.get(tabData, 'elementType');
  },[theCard,tabDatas]);
  const Component  = React.useMemo(() => {
    switch (smartComponetName) {
      case 'text':
        return SmartTextField;
      case 'number':
        return SmartTextField;
      case 'label':
        return SmartLabelField;
      case 'select':
        return SmartSelectField;
      case 'dimensions':
        return SmartDimensions;
      case 'radiobuttons':
        return SmartRadio;
      case 'checkboxes':
        return SmartCheckbox;
      default:
        return null;
    }
    return null;
  },[smartComponetName]);
  if(!Component) return null;
  return <Box sx={{
    padding: '10px',
  }}>
    <Component
      tabDatas={tabDatas}
      tabUis={tabUis}
      theCard={theCard}
      showWhen={showWhenFunc}
      state={state}
      handleValueUpdate={handleValueUpdate}
    />
  </Box>
}
export default SmartNode;