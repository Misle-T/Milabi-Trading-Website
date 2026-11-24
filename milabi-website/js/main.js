/* Milabi Trading PLC — site behaviour (no libraries needed) */
(function () {
  'use strict';

  /* ---- Form settings ----------------------------------------------------
     Forms post to a form service so they work on any basic web host.
     1. Create a free form at https://formspree.io (or similar).
     2. Paste its endpoint below, e.g. 'https://formspree.io/f/abcdwxyz'.
     Until an endpoint is set, forms show a preview message instead of sending. */
  var FORM_ENDPOINT = '';

  /* Mobile menu */
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? 'Close' : 'Menu';
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = 'Menu';
        toggle.focus();
      }
    });
  }

  /* Machine filter (machines page) */
  var chips = document.querySelectorAll('[data-filter]');
  var machines = document.querySelectorAll('[data-kind]');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.getAttribute('data-filter');
      chips.forEach(function (c) { c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'); });
      machines.forEach(function (m) { m.hidden = !(f === 'all' || m.getAttribute('data-kind') === f); });
    });
  });

  /* Rate tabs (machine detail pages)
     <div data-rates='{"wet":{"note":"...","rows":[["Per day","[RATE]"],...]}, "dry":{...}}'> */
  document.querySelectorAll('[data-rates]').forEach(function (box) {
    var data;
    try { data = JSON.parse(box.getAttribute('data-rates')); } catch (e) { return; }
    var tabs = box.querySelectorAll('[data-tab]');
    var note = box.querySelector('[data-rate-note]');
    var body = box.querySelector('[data-rate-rows]');
    function show(key) {
      var d = data[key];
      if (!d) return;
      tabs.forEach(function (t) { t.setAttribute('aria-pressed', t.getAttribute('data-tab') === key ? 'true' : 'false'); });
      if (note) note.textContent = d.note;
      if (body) {
        body.textContent = '';
        d.rows.forEach(function (r) {
          var tr = document.createElement('tr');
          var a = document.createElement('td'); a.textContent = r[0];
          var b = document.createElement('td'); b.textContent = r[1];
          tr.appendChild(a); tr.appendChild(b); body.appendChild(tr);
        });
      }
    }
    tabs.forEach(function (t) { t.addEventListener('click', function () { show(t.getAttribute('data-tab')); }); });
    show(tabs.length ? tabs[0].getAttribute('data-tab') : 'wet');
  });

  /* Pre-select the machine on the quote form, e.g. contact.html?machine=Excavator */
  var machineSelect = document.getElementById('q-machine');
  if (machineSelect && window.URLSearchParams) {
    var wanted = new URLSearchParams(window.location.search).get('machine');
    if (wanted) {
      Array.prototype.forEach.call(machineSelect.options, function (o) {
        if (o.value.toLowerCase() === wanted.toLowerCase()) machineSelect.value = o.value;
      });
    }
  }

  /* Forms */
  document.querySelectorAll('form[data-form]').forEach(function (form) {
    var msg = form.querySelector('.form-msg');
    function say(text, ok) {
      if (!msg) return;
      msg.hidden = false;
      msg.className = 'form-msg ' + (ok ? 'ok' : 'err');
      msg.textContent = text;
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      if (!FORM_ENDPOINT) {
        say('Preview only: this form is not connected yet. Please call or message us instead.', false);
        return;
      }
      var btn = form.querySelector('[type="submit"]');
      if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = 'Sending…'; }
      var fd = new FormData(form);
      fd.append('_subject', form.getAttribute('data-form') + ' — milabitrading.com');
      fetch(FORM_ENDPOINT, { method: 'POST', body: fd, headers: { Accept: 'application/json' } })
        .then(function (r) {
          if (!r.ok) throw new Error('bad status');
          form.reset();
          say(form.getAttribute('data-ok') || 'Thank you. We will get back to you within one working day.', true);
        })
        .catch(function () {
          say('Sorry, that did not send. Please try again, or call or message us directly.', false);
        })
        .then(function () {
          if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label; }
        });
    });
  });
})();
