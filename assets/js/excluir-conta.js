// Exclusão de conta pelo site: entra com e-mail e senha e chama DELETE /me.
(function () {
  'use strict';

  var form = document.getElementById('form-excluir');
  if (!form) return;

  var emailInput = document.getElementById('email');
  var passwordInput = document.getElementById('senha');
  var confirmInput = document.getElementById('confirmo');
  var button = document.getElementById('botao');
  var errorBox = document.getElementById('erro');
  var errorText = document.getElementById('erro-texto');
  var success = document.getElementById('sucesso');
  var buttonLabel = button.textContent;

  var MESSAGES = {
    INVALID_CREDENTIALS: 'E-mail ou senha incorretos.',
    INVALID_PASSWORD: 'Senha incorreta.',
    ACCOUNT_LOCKED: 'Muitas tentativas. Aguarde alguns minutos ou redefina sua senha pelo app.',
    EMAIL_NOT_VERIFIED:
      'Esta conta ainda não foi confirmada. Cadastros não confirmados são apagados automaticamente em até 7 dias.',
    RATE_LIMITED: 'Muitas tentativas. Aguarde um pouco e tente novamente.',
  };

  function showError(message, field) {
    errorText.textContent = message;
    errorBox.hidden = false;
    [emailInput, passwordInput].forEach(function (input) {
      input.setAttribute('aria-invalid', String(input === field));
    });
    if (field) field.focus();
  }

  function clearError() {
    errorBox.hidden = true;
    emailInput.removeAttribute('aria-invalid');
    passwordInput.removeAttribute('aria-invalid');
  }

  function setLoading(loading) {
    button.disabled = loading;
    button.textContent = loading ? 'Excluindo…' : buttonLabel;
  }

  async function request(path, options) {
    var response = await fetch(form.getAttribute('data-api') + path, options);
    if (response.status === 204) return null;
    var body = await response.json().catch(function () {
      return null;
    });
    if (!response.ok) {
      var error = (body && body.error) || {};
      throw { code: error.code, message: error.message };
    }
    return body;
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    clearError();

    var email = emailInput.value.trim();
    var password = passwordInput.value;
    if (!email || emailInput.validity.typeMismatch) return showError('Informe um e-mail válido.', emailInput);
    if (!password) return showError('Informe sua senha.', passwordInput);
    if (!confirmInput.checked) return showError('Marque a confirmação para continuar.', confirmInput);

    setLoading(true);
    try {
      var session = await request('/auth/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: email, password: password, deviceName: 'Site: excluir conta' }),
      });
      await request('/me', {
        method: 'DELETE',
        headers: { 'content-type': 'application/json', authorization: 'Bearer ' + session.accessToken },
        body: JSON.stringify({ password: password }),
      });
      form.hidden = true;
      success.hidden = false;
      success.setAttribute('tabindex', '-1');
      success.focus();
    } catch (error) {
      // Erros da API trazem `code`; falhas de rede (TypeError) caem na mensagem genérica.
      var fromApi = error && error.code;
      var message =
        (fromApi && (MESSAGES[error.code] || error.message)) ||
        'Não foi possível concluir agora. Verifique sua conexão e tente novamente.';
      var field = error && error.code === 'INVALID_CREDENTIALS' ? passwordInput : null;
      showError(message, field);
    } finally {
      setLoading(false);
    }
  });
})();
