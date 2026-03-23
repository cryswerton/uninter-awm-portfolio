/**
 * Validação do formulário de contato e simulação de envio.
 * Apenas em contato.html — não envia dados a nenhum servidor.
 */
(function () {
  "use strict";

  /**
   * Regex simples para e-mail no formato usuario@dominio.com
   * (aceita subdomínios e TLDs comuns).
   */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function getEl(id) {
    return document.getElementById(id);
  }

  function clearFieldErrors(form) {
    var groups = form.querySelectorAll(".form-group.has-error");
    for (var i = 0; i < groups.length; i++) {
      groups[i].classList.remove("has-error");
    }
    var spans = form.querySelectorAll(".field-error");
    for (var j = 0; j < spans.length; j++) {
      spans[j].textContent = "";
    }
    var globalErr = getEl("formGlobalError");
    if (globalErr) {
      globalErr.classList.remove("is-visible");
      globalErr.textContent = "";
    }
  }

  function setFieldError(fieldName, message) {
    var group = document.querySelector('.form-group[data-field="' + fieldName + '"]');
    if (!group) return;
    group.classList.add("has-error");
    var errSpan = group.querySelector(".field-error");
    if (errSpan) {
      errSpan.textContent = message;
    }
  }

  function validate(nome, email, mensagem) {
    var ok = true;

    if (!nome || nome.trim() === "") {
      setFieldError("nome", "Informe seu nome.");
      ok = false;
    }

    if (!email || email.trim() === "") {
      setFieldError("email", "Informe seu e-mail.");
      ok = false;
    } else if (!EMAIL_RE.test(email.trim())) {
      setFieldError("email", "Use um e-mail válido (ex.: usuario@dominio.com).");
      ok = false;
    }

    if (!mensagem || mensagem.trim() === "") {
      setFieldError("mensagem", "Escreva uma mensagem.");
      ok = false;
    }

    return ok;
  }

  function openModal() {
    var modal = getEl("successModal");
    if (!modal) return;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    var closeBtn = getEl("modalClose");
    if (closeBtn) {
      closeBtn.focus();
    }
  }

  function closeModal() {
    var modal = getEl("successModal");
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  }

  document.addEventListener("DOMContentLoaded", function () {
    var form = getEl("contactForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var nomeInput = getEl("nome");
      var emailInput = getEl("email");
      var msgInput = getEl("mensagem");

      var nome = nomeInput ? nomeInput.value : "";
      var email = emailInput ? emailInput.value : "";
      var mensagem = msgInput ? msgInput.value : "";

      clearFieldErrors(form);

      if (!validate(nome, email, mensagem)) {
        var globalErr = getEl("formGlobalError");
        if (globalErr) {
          globalErr.textContent = "Corrija os campos destacados abaixo.";
          globalErr.classList.add("is-visible");
        }
        return;
      }

      /* Simulação: limpar campos e feedback visual */
      if (nomeInput) nomeInput.value = "";
      if (emailInput) emailInput.value = "";
      if (msgInput) msgInput.value = "";

      openModal();
    });

    var modalClose = getEl("modalClose");
    if (modalClose) {
      modalClose.addEventListener("click", closeModal);
    }

    var successModal = getEl("successModal");
    if (successModal) {
      successModal.addEventListener("click", function (e) {
        if (e.target === successModal) {
          closeModal();
        }
      });
    }

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && successModal && successModal.classList.contains("is-open")) {
        closeModal();
      }
    });
  });
})();
