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

