import React from 'react';
import _ from 'lodash';
import SmartGrid from "./SmartGrid";
import {Card, CardContent, CardHeader, Paper} from "@mui/material";
import SmartCaollapseCard from "./SmartCollapseCard";

function SmartTab(props) {
  const {
    tabDatas,
    tabUis,
    theTab
  } = props;
  const theRows = _.get(theTab, ['tables',0,'rows']);
  const theTitle = _.get(theTab, ['data','title']);
  const renderRows = (rows) => {
    if(undefined === rows ) return null;
    if(!rows.length) return null;
    return _.map(rows,(item) => {
      const domId = _.get(item, ['ui', 'domId']);
      return (<SmartGrid key={domId} tabDatas={tabDatas} tabUis={tabUis} theRow={item}/>);
    });
  }
  if(undefined === theTitle && undefined  === theRows) return null;
  return(<SmartCaollapseCard
      title={theTitle}
      sx={{
        padding: '10px'
      }}
  >
    {renderRows(theRows)}
  </SmartCaollapseCard>);
}
export default SmartTab;