<?php
/**
 * @file
 * Contains Drupal\OBIBA_MICA\Form\MessagesForm.
 */
namespace Drupal\obiba_mica_dashboard\Form;

use Drupal\obiba_mica_dashboard\ObibaMica;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

class MicaServerSettings extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
        ObibaMica::MICA_SERVER_SETTINGS,
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return ObibaMica::OBIBA_MICA_FORM_SERVER_SETTINGS;
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $form = parent::buildForm($form, $form_state);
    $config = $this->config(ObibaMica::MICA_SERVER_SETTINGS);

    $form['server'] = [
        '#type' => 'details',
        '#title' => $this->t('OBiBa Mica server'),
        '#open' => TRUE,
    ];

    $form['server'][ObibaMica::CONFIG_PREFIX_SERVER . '_' . 'url'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Mica Server Address'),
      '#required' => TRUE,
      '#default_value' => $config->get(ObibaMica::CONFIG_PREFIX_SERVER . '.' . 'url'),
      '#maxlength' => 255,
      '#description' => $this->t('URL of the Mica server. Note that cross-domain can be work around using apache/NgNix proxy.'),
    ];

    $form['server'][ObibaMica::CONFIG_PREFIX_SERVER . '_' . 'repository_link'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Mica Server Repository Link Path'),
      '#required' => TRUE,
      '#default_value' => $config->get(ObibaMica::CONFIG_PREFIX_SERVER . '.' . 'repository_link'),
      '#maxlength' => 255,
      '#description' => $this->t('The link path of repository page on the Mica server without slash \'/\'. Note that cross-domain can be work around using apache/NgNix proxy.'),
    ];

    $form['server'][ObibaMica::CONFIG_PREFIX_SERVER . '_' . 'mica_user_name'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Anonymous Mica User Name'),
      '#required' => TRUE,
      '#default_value' => $config->get(ObibaMica::CONFIG_PREFIX_SERVER . '.' . 'mica_user_name'),
      '#maxlength' => 255,
      '#description' => $this->t('The anonymous user name under which the Drupal server can connect to mica server.'),
    ];

    $form['server'][ObibaMica::CONFIG_PREFIX_SERVER . '_' . 'mica_user_password'] = [
      '#type' => 'password',
      '#title' => $this->t('Password'),
      '#required' => FALSE,
      '#default_value' => $config->get(ObibaMica::CONFIG_PREFIX_SERVER . '.' . 'mica_user_password') ?
          $config->get(ObibaMica::CONFIG_PREFIX_SERVER . '.' . 'mica_user_password') : 'password',
      '#maxlength' => 255,
      '#description' => $this->t('The key used by the Drupal server when issuing requests to Agate.'),
    ];
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
      parent::submitForm($form, $form_state);
      $this->config(ObibaMica::MICA_SERVER_SETTINGS)
      ->set(ObibaMica::CONFIG_PREFIX_SERVER . '.' . 'url', $form_state->getValue(ObibaMica::CONFIG_PREFIX_SERVER . '_' . 'url'))
      ->set(ObibaMica::CONFIG_PREFIX_SERVER . '.' . 'repository_link', $form_state->getValue(ObibaMica::CONFIG_PREFIX_SERVER . '_' . 'repository_link'))
      ->set(ObibaMica::CONFIG_PREFIX_SERVER . '.' . 'mica_user_name', $form_state->getValue(ObibaMica::CONFIG_PREFIX_SERVER . '_' . 'mica_user_name'))
      ->set(ObibaMica::CONFIG_PREFIX_SERVER . '.' . 'mica_user_password', $form_state->getValue(ObibaMica::CONFIG_PREFIX_SERVER . '_' . 'mica_user_password'))
      ->save();
  }


}