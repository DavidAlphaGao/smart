import React from 'react';
import _ from 'lodash';
import {
  TextField
} from '@mui/material'

function SmartInput(props) {
  const {
    cid,
    state,
    getCompState,
    onChange,
  } = props;
  const cState = React.useMemo(() => getCompState(cid, state),
    [cid, state, getCompState]);
  const cProps = React.useMemo(() => _.get(cState,'props',{}),[cState]);
  const handleChange = React.useCallback((e)=> {
    e.preventDefault();
    const value = e.target.value;
    onChange(cid,value);
  },[cid,onChange]);
  return (<TextField
            variant="outlined"
            {...cProps}
            value={cState.value || ""}
            onChange={handleChange}
          />);
}

export default SmartInput;
