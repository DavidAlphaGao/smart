import React from 'react';
import _ from 'lodash';
import { Box, Grid } from '@mui/material';
import SmartCompitable from './SmartCompitable';
import whichComponet from './compType';

function SmartLayout(props) {
  const {
    layout,
    onChange,
    onClick,
    getCompState,
    state
  } = props;
  const [show, setShow] = React.useState(true);
  return (<Box id="smart-layout"
    sx={{ p: "10px" }}
  >
    <Grid container>
      <Grid item xs={12} >
        {show ? <SmartCompitable onChange={(v) => {
          console.log(v);
          setShow(false);
        }} /> : null}
      </Grid>
      <Grid item xs={12} >
        {_.map(layout, (item) => {
          const children = _.get(item, 'children');
          const cid = _.get(item, 'id');
          const ctype = _.get(item, 'type');
          const Comp = whichComponet(ctype);
          return <Comp
            key={`${ctype}-${cid}`}
            cid={cid}
            onChange={onChange}
            onClick={onClick}
            state={state}
            getCompState={getCompState}
            children={children}
          />
        })}
      </Grid>
    </Grid>
  </Box >)
}

export default SmartLayout;
