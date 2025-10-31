document.addEventListener('DOMContentLoaded', function() {
  const locale = 'en';
  loadTranslations(locale).then(applyTranslations).then(function() {
    initUi();
  });
});

function loadTranslations(locale) {
  return fetch(`locales/${locale}.json`, { cache: 'no-cache' })
    .then(function(res) { return res.json(); })
    .catch(function() { return {}; });
}

function applyTranslations(dict) {
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var key = el.getAttribute('data-i18n');
    var value = getByPath(dict, key);
    if (typeof value === 'string' && value.length > 0) {
      el.textContent = value;
    } else if (el.dataset.default) {
      el.textContent = el.dataset.default;
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
    var key = el.getAttribute('data-i18n-placeholder');
    var value = getByPath(dict, key);
    if (typeof value === 'string' && value.length > 0) {
      el.setAttribute('placeholder', value);
    } else if (el.dataset.defaultPlaceholder) {
      el.setAttribute('placeholder', el.dataset.defaultPlaceholder);
    }
  });
}

function getByPath(obj, path) {
  return path.split('.').reduce(function(acc, part) {
    return acc && acc[part] != null ? acc[part] : undefined;
  }, obj);
}

function initUi() {
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  var form = document.getElementById('waitlistForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var email = document.getElementById('email').value.trim();
      if (!email) return;
      window.location.href = 'mailto:hello.jadeai@gmail.com?subject=Waitlist&body=' + encodeURIComponent(email);
    });
  }

  // Contact form to mailto
  var cform = document.getElementById('contactForm');
  if (cform) {
    cform.addEventListener('submit', function(e) {
      e.preventDefault();
      var name = (document.getElementById('cname') || {}).value || '';
      var from = (document.getElementById('cemail') || {}).value || '';
      var subject = (document.getElementById('csubject') || {}).value || 'Contact';
      var message = (document.getElementById('cmessage') || {}).value || '';
      var body = 'Name: ' + name + '\nEmail: ' + from + '\n\n' + message;
      window.location.href = 'mailto:hello.jadeai@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }
}


