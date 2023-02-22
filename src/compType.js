import SmartInput from './SmartInput';
import SmartGrid from './SmartGrid';

function whichComponet(ctype) {
  switch (ctype) {
  case "input":
    return SmartInput;
  case "grid":
    return SmartGrid;
  default:
    return null;
  }
}

export default whichComponet;
