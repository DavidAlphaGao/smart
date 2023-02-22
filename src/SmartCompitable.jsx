import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Button } from '@mui/material';
import ExampleView from './ExampleView';
import Shop from './ShopModel';


class SmartCompitable extends React.Component {
  constructor(props) {
    super(props);
    this.backboneComponent = null;
    this.backboneRef = React.createRef(null);
    this.onChange = props.onChange;
    this.changeName = this.changeName.bind(this);
    this.state = {
      model: new Shop({ brand: "Noosh" })
    };
  }
  changeName() {
    console.log("change Name");
    this.state.model.set("brand", "Noosh2012");
  }
  componentDidMount() {
    const {onChange} = this.props;
    this.backboneComponent = new ExampleView({
      onChange,
      model: this.state.model,
      el: this.backboneRef.current
      //el: ReactDOM.findDOMNode(this)
    }).render();
  }

  render() {
    return (
      <Grid container>
        <Grid item xs={12}>
          <div id="backbone-smart-form" ref={this.backboneRef} />
        </Grid>
        <Grid item xs={12}>
          <Button onClick={() => this.changeName()}>
            Change Name
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default SmartCompitable;
