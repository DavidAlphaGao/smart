import Backbone from 'backbone';
import _ from 'lodash';
import $ from 'jquery';

const ExampleView = Backbone.View.extend({

  my_template: _.template("<div> <h3> React Run JS from remote! </h3><strong><%= brand %></strong ></div>" +
                          "<div style='padding: 10px;'><button id='eb'>commit </button></div>"),
  initialize: function (options) {
    this.onChange = options.onChange;
    this.model.bind("change",this.render,this);
  },
  render: function () {
    this.$el.html(this.my_template(this.model.toJSON()));
    const self = this;
    $("#eb").click(null, function () {
      console.log("commit");
      self.onChange(self.model.attributes);
    });
    return this;
  }
});
export default ExampleView;
