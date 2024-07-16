import React from 'react';
import _ from 'lodash';
import {
  Box
} from '@mui/material'
import demo from './demo.json';
import SmartTab from "./SmartTab";
import {getCalculators} from "./utils";

const uiPaths = ["tables","rows","cells","cards"];

const getTabUi = (data) => {
  const tabUis = _.get(data, ['form','tabUis']);
  let chainData = _.chain(tabUis);
  let path = '';
  const uiPathsClone =  _.cloneDeep(uiPaths);
  while(path = uiPathsClone.shift()){
    chainData = chainData.map(path).flatten();
  }
  return chainData
      .reduce((acc, curr) => {
        _.set(acc, curr.domId,curr);
        return acc;
      },{})
      .value();
}
const getTabData = (data) => _.chain(data)
    .get(['form','tabDatas'])
    .map('cards')
    .flatten()
    .reduce((acc, curr) => {
      _.set(acc, curr.domId,curr);
      return acc;
    },{})
    .value();

const buildTabUiList = (data) =>{
  const tabDatas = _.get(demo,['form','tabDatas']);
  const tabUis = _.get(demo,['form','tabUis']);
  const uiPathsClone =  _.cloneDeep(uiPaths);
  return _.reduce(tabUis,(acc, curr,idx) => {
    const ui = curr.ui;
    curr.data = _.get(tabDatas,[idx,'data']);
    _.extend(curr,_.pick(ui,"showWhen","isHidden","isHiddenSplr"));
    return _.concat(acc,[curr]);
  },[]);
}

const reducerFn = (state,f) => f(state);

function SmartContainer(props) {
  const tabDatas = getTabData(demo);
  const tabUis = getTabUi(demo);
  const tabUiList = buildTabUiList(demo);
  const [state,dispatch] = React.useReducer(reducerFn,
      {values: {}, calculators: {}});
  console.log(state);
  const handleValueUpdate = React.useCallback((k,v) => {
    dispatch((s) => {
      return _.chain(s)
          .cloneDeep()
          .set(['values',k],v)
          .value();
    });
  },[dispatch]);

  return (<Box sx={{
    width: '100%',
  }}>
    {_.map(tabUiList,(item) => {
      const domId = _.get(item,['ui','domId']);
      return (<SmartTab
          key={domId}
          state={state}
          handleValueUpdate={handleValueUpdate}
          tabDatas={tabDatas}
          tabUis={tabUis}
          theTab={item}
      />);
    })}
  </Box>);
}

export default SmartContainer;
