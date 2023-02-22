import React from 'react';
import _ from 'lodash';
import SmartLayout from './SmartLayout';
function SmartForm(props) {
  const {
    onStateChange,
    data
  } = props;

  const layout = React.useMemo(() => _.get(data, "layout", []), [data]);
  const initialState = React.useMemo(() => _.get(data, "initialState", {}), [data]);
  const reducerFns = React.useMemo(() => {
    const reducers = _.get(data, 'reducers');
    const fns = _.reduce(
      reducers,
      (acc, v, k) => {
        const fnWrapper = new Function("return " + v);
        acc[k] = fnWrapper();
        return acc;
      }, {});
    return fns;
  }, [data]);
  const reducers = React.useCallback((state, action) => {
    const { cid, value } = action;
    const cFn = _.get(reducerFns, cid);
    const nextState = _.chain(state)
      .clone()
      .thru(function (s) {
        if (cFn) {
          cFn(cid,value,state, _);
        } else {
          if (value) {
            const cState = _.get(s, cid, {});
            _.set(cState, 'value', value);
          }
        }
        return s;
      })
      .value();
    return nextState;
  }, [reducerFns]);
  const [state, dispatch] = React.useReducer(reducers, initialState);
  console.log(state);
  const onValueChange = React.useCallback((id, value) => {
    console.log("change id: " + id + " value: " + value);
    dispatch({ cid: id, value: value });
  }, [dispatch]);
  const onClick = React.useCallback((id) => {
    console.log("click id: " + id);
    dispatch({ cid: id });
  }, [dispatch]);
  const getCompState = React.useCallback((cid, state) => {
    return _.get(state, cid, {});
  }, []);
  React.useEffect(() => {
    onStateChange(state);
  }, [onStateChange, state]);
  return (
    <div id="smart-form">
      <SmartLayout
        state={state}
        layout={layout}
        onChange={onValueChange}
        onClick={onClick}
        getCompState={getCompState}
      />
    </div>);

}

export default SmartForm;
