import React from 'react';
import {Grid} from "@mui/material";
import _ from 'lodash';
import SmartCell from './SmartCell';

function SmartGrid(props) {
  const {
    tabDatas,
    tabUis,
    theRow
  } = props;
  const theCells = _.get(theRow,'cells');
  const cellsCount = _.get(theRow, ['ui','cellsPerRow']);
  const gridSize = React.useMemo(() => {
      try {
        return Math.ceil(12 / cellsCount);
      } catch {
        return 12;
      }
  },[cellsCount]);
  console.log('gridSize', gridSize);
  if(theCells === undefined) return null;
  return (<Grid  container>
    {_.map(theCells,
        (theCell,idx) => {
          return (
              <Grid id={'cell-'+idx}
                    key={'cell-'+idx}
                    item
                    xs={gridSize}
              >
                <SmartCell theCell={theCell}
                           tabDatas={tabDatas}
                           tabUis={tabUis}
                />
              </Grid>);
        })}
  </Grid>);
}

export default SmartGrid;