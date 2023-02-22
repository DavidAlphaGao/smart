import React from 'react';
import _ from 'lodash';
import { useQuery } from '@tanstack/react-query';
import SmartForm from './SmartForm';
import test from './test.json';


const fetchSmartInfo = async () => {
  /*const res = await fetch("/api/smart/info");
    return res.json();
  */
  const r = new Promise((resolve,reject)=> resolve(test));
  return r;
}

function SmartContainer(props) {
  const {onChange} = props;
  const query = useQuery({
    queryKey: ['smartInfo'],
    queryFn: fetchSmartInfo
  });

  if (query.loading || query.data == null) {
    return (<div>
      loading...
    </div>);
  }
  console.log(query.data);
  return (<div id="smart-container">
    <SmartForm
      key="smart-form"
      onStateChange={onChange}
      data={query.data}
    />
  </div>);
}

export default SmartContainer;
