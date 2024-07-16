import _ from 'lodash';

const findTheIdx = (values,uniques, value) => {
  const theKey  = _.findKey(values,(o) => o.value === value);
  if(theKey !== undefined) {
    return _.findIndex(uniques, (key) =>  key === theKey);
  }
  return -1;
};

const getExpectAndValueIdx = (expect,ctx,value) => {
  const values = _.get(ctx, 'values');
  const uniques = _.get(ctx, 'uniques');
  const expectIdx = findTheIdx(values,uniques,expect);
  const valueIdx = findTheIdx(values,uniques,value);
  return ({
    expectIdx,
    valueIdx
  });
}

const funcEQ = _.curry((expect,ctx,state ) => {
  const type = _.get(ctx, 'type');
  const name = _.get(ctx, 'name');
  const value = _.get(state, name);
  if(type ==='select'){
    const {valueIdx,expectIdx} =  getExpectAndValueIdx(expect,ctx,value);
    return valueIdx === expectIdx;
  }
  return value === expect;
});
const funcNEQ = _.curry((expect,ctx,state ) => {
  const type = _.get(ctx, 'type');
  const name = _.get(ctx, 'name');
  const value = _.get(state, name);
  if(type ==='select'){
    const {valueIdx,expectIdx} =  getExpectAndValueIdx(expect,ctx,value);
    return valueIdx !== expectIdx;
  }
  return value !== expect;
});


const funcGT = _.curry((expect,ctx,state ) => {
  const type = _.get(ctx, 'type');
  const name = _.get(ctx, 'name');
  const value = _.get(state, name);
  if(type ==='select'){
    const {valueIdx,expectIdx} =  getExpectAndValueIdx(expect,ctx,value);
    return valueIdx > expectIdx;
  }
  return value > expect;
});
const funcGTE = _.curry((expect,ctx,state ) => {
  const type = _.get(ctx, 'type');
  const name = _.get(ctx, 'name');
  const value = _.get(state, name);
  if(type ==='select'){
    const {valueIdx,expectIdx} =  getExpectAndValueIdx(expect,ctx,value);
    return valueIdx >= expectIdx;
  }
  return value >= expect;
});
const funcLT = _.curry((expect,ctx,state ) => {
  const type = _.get(ctx, 'type');
  const name = _.get(ctx, 'name');
  const value = _.get(state, name);
  if(type ==='select'){
    const {valueIdx,expectIdx} =  getExpectAndValueIdx(expect,ctx,value);
    return valueIdx < expectIdx;
  }
  return value < expect;
});
const funcLTE = _.curry((expect,ctx,state ) => {
  const type = _.get(ctx, 'type');
  const name = _.get(ctx, 'name');
  const value = _.get(state, name);
  if(type ==='select'){
    const {valueIdx,expectIdx} =  getExpectAndValueIdx(expect,ctx,value);
    return valueIdx <= expectIdx;
  }
  return value <= expect;
});

const funcAnd = _.curry((funcs,state ) => {
  const h = _.head(funcs);
  const t = _.tail(funcs);

  return _.reduce(t,(acc, f) => {
    const r = f(state);
    return (r && acc);
  },h(state));
});

const funcOr = _.curry((funcs,state ) => {
  const h = _.head(funcs);
  const t = _.tail(funcs);

  return _.reduce(t,(acc, f) => {
    const r = f(state);
    return (r ||  acc);
  },h(state));

})

function buildShowWhen(showWhens,showUsing,tabDatas){
  const funcs  = _.map(showWhens,(showWhen) => {
    const operator = _.get(showWhen,'operation');
    const value = _.get(showWhen,'value');
    const filedId = _.get(showWhen,'cellCardDomId');
    const ctx = _.get(tabDatas,filedId);
    switch(operator){
      case 'eq':
        return funcEQ(value,ctx);
      case 'neq':
        return funcNEQ(value,ctx);
      case 'gt':
        return funcGT(value,ctx);
      case 'gte':
        return funcGTE(value,ctx);
     case  'lt':
        return funcLT(value,ctx);
      case 'lte':
        return funcLTE(value,ctx);
      default:
        return (v) => true;
    }
  });
  switch (showUsing) {
    case 'and':
      return funcAnd(funcs);
    case 'or':
      return funcOr(funcs);
    default:
      return funcAnd(funcs);
  }
}
function  getCalculators(calculator){
  const domIdReg = /\{[^\:}]+:([^}]+)\}/g;
  let matchArr = [];
  let domIds = [];
  while(matchArr = domIdReg.exec(calculator)) {
    domIds.push(matchArr[1]);
  }
  return domIds;
}
export {
  buildShowWhen,
  getCalculators
}