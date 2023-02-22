import React from 'react';
import _ from 'lodash';
import { Grid } from '@mui/material';
import whichComponet from './compType';

function SmartGrid(props) {
  const {
    cid,
    state,
    getCompState,
    onChange,
    onClick,
    children
  } = props;
  const cState = React.useMemo(() => getCompState(cid, state),
    [cid, state, getCompState]);
  const cProps = React.useMemo(() => _.get(cState, 'props', {}), [cState]);
  return (
    <Grid {...cProps}>
      {_.map(children, (item) => {
        const cchildren = _.get(item, 'children');
        const ccid = _.get(item, 'id');
        const ctype = _.get(item, 'type');
        const CComp = whichComponet(ctype);
        return <CComp
          key={`${ctype}-${ccid}`}
          cid={ccid}
          onChange={onChange}
          onClick={onClick}
          state={state}
          getCompState={getCompState}
          children={cchildren}
        />
      })}
    </Grid>
  );
}

export default SmartGrid;
