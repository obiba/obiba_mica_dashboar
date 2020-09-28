/**
 * @file
 * A Backbone Model for the Obiba Mica Dashboard.
 */

(function (Backbone, Drupal) {
  /**
   * Backbone model for the Obiba Mica Dashboard.
   *
   * @constructor
   *
   * @augments Backbone.Model
   */
  Drupal.micaSummaryDashboard.micaSummaryDashboardModel = Backbone.Model.extend({
    url: '/mica-ws/config/metrics',
    sync: function(method, collection, options){
      options = options || {};
      options.beforeSend = (xhr) => {
        xhr.setRequestHeader('Authorization', ("Basic ".concat(drupalSettings.micaDashboardSettings.basicAuthorisation)));
      };
      return Backbone.Model.prototype.sync.apply(this, arguments);
    },
    parse: function (response){
      let metric = [];
      _.each(response.documents, function (document){
        let values = [];
        _.each(document.properties, function(property){
          values[property.name] = property.value;
        });
        metric[document.type] = values;
      });
      return metric;
    }
  });
})(Backbone, Drupal);



