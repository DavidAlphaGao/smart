import React from 'react';
import {Grid} from "@mui/material";
import _ from 'lodash';
import SmartCell from './SmartCell';

function SmartGrid(props) {
  const {
    state,
    handleValueUpdate,
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
                <SmartCell
                    theCell={theCell}
                    tabDatas={tabDatas}
                    tabUis={tabUis}
                    state={state}
                    handleValueUpdate={handleValueUpdate}
                />
              </Grid>);
        })}
  </Grid>);
}

export default SmartGrid;