import _ from 'lodash';

const transBgColor = (o) =>{
  if(_.has(o, 'bgColor')){
    const bgColor = _.get(o, 'bgColor');
    _.unset(o, 'bgColor');
    _.set(o,'backgroundColor', bgColor);
  }
  return o;
}
const transFontColor = (o) =>{
  if(_.has(o, 'fontColor')){
    const bgColor = _.get(o, 'fontColor');
    _.unset(o, 'fontColor');
    _.set(o,'color', bgColor);
  }
  return o;
}

function transCSS(styles) {
  const funcs = [
    transBgColor,
    transFontColor
  ];
  return _.reduce(funcs, (acc, f) => f(acc),styles);
}

export {
  transCSS
};