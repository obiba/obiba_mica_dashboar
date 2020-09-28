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



