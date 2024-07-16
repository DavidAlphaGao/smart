import React from 'react';
import _ from 'lodash';
import {Grid} from "@mui/material";
import SmartNode from "./SmartNode";

function SmartCell(props) {
  const {
    state,
    handleValueUpdate,
    tabDatas,
    tabUis,
    theCell
  } = props;
  const cards = _.get(theCell, 'cards');
  if(cards === undefined) return  null;
  if(!cards.length) return null;
  return (<Grid container>
    {_.map(cards,(card) => {
      const domId = _.get(card,'domId');
      return(
      <Grid id={domId} key={domId} item xs={12} >
        <SmartNode
            state={state}
            handleValueUpdate={handleValueUpdate}
            theCard={card}
            tabDatas={tabDatas}
            tabUis={tabUis}
        />
      </Grid>);
    })}


  </Grid>)
}

export default SmartCell;