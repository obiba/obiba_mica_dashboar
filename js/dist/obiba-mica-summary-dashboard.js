/**
 * @file
 * Activate Dashboard.
 */

(function ($, Drupal) {
  Drupal.behaviors.obibaMicaSummaryDashboard = {
    attach: function attach(context, settings) {
      /*
      * Default Translations
      * */
      Drupal.t("Networks");
      Drupal.t('Individual Studies');
      Drupal.t('Harmonization Studies');
      Drupal.t('Variables');

      /*
      * Initialize the app
      * */
      Drupal.micaSummaryDashboard.models = new Drupal.micaSummaryDashboard.micaSummaryDashboardModel();
      Drupal.micaSummaryDashboard.views = new Drupal.micaSummaryDashboard.micaSummaryDashboardView({
         model: Drupal.micaSummaryDashboard.models
      });
    }
  };


  Drupal.micaSummaryDashboard = Drupal.micaSummaryDashboard || {
    models: {},
    views: {}
  };
})(jQuery, Drupal);


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




/**
 * @file
 * A Backbone View for the Obiba Mica Dashboard.
 */

(function ($, Backbone, Drupal) {
  /**
   * Backbone view for the Obiba Mica Dashboard.
   *
   * @constructor
   *
   * @augments Backbone.View
   */
  Drupal.micaSummaryDashboard.micaSummaryDashboardView = Backbone.View.extend({

    /*
    * App template
    * template/obiba_mica_summary_dashboard.html.twig
    * */
    template: _.template($("#summary-dashboard-counts").html()),

    /*
    * Element that fire the app
    * */
    el: '#mica-summary-dashboard',
    close: function (){
      this.stopListening();
    },
    initialize:function() {
      this.listenTo(this.model, 'change', this.render);
      this.model.fetch();
    },
    render: function() {
        let metrics = this.model.clone().toJSON();
        metrics.currentLang = drupalSettings.micaDashboardSettings.currentLang;
        this.$el.html(this.template(metrics));
    }
  });
})(jQuery, Backbone, Drupal);



