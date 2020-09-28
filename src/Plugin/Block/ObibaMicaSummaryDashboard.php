<?php


namespace Drupal\obiba_mica_dashboard\Plugin\Block;

use Drupal\obiba_mica_dashboard\ObibaMica;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a summary dashboard  block.
 *
 * @Block(
 *   id = "mica_summary_dasboard",
 *   admin_label = @Translation("Mica Summary Dashboard"),
 *   category = @Translation("Custom"),
 * )
 */
class ObibaMicaSummaryDashboard extends  BlockBase{

  public function build() {
    $obiba_mica_server_conf = \Drupal::config(ObibaMica::MICA_SERVER_SETTINGS);
    return [
      '#theme' => 'obiba_mica_summary_dashboard',
      '#attached' => [
        'library' => [
          'obiba_mica_dashboard/summary_dashboard'
        ],
        'drupalSettings' => [
          'micaDashboardSettings' => [
            'basicAuthorisation' =>  base64_encode(
              $obiba_mica_server_conf->get(ObibaMica::CONFIG_PREFIX_SERVER . '.mica_user_name') .
              ':' .
              $obiba_mica_server_conf->get(ObibaMica::CONFIG_PREFIX_SERVER . '.mica_user_password')
            ),
            'currentLang' => \Drupal::languageManager()->getCurrentLanguage()->getId(),
          ]
        ]
      ],
    ];
  }

}