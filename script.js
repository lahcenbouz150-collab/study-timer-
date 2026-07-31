/* ==========================================================================
   Study Timer — Application logic
   Vanilla JS, no build step. Everything persists to localStorage so a
   refresh never loses a subject or an in-progress countdown.
   ========================================================================== */

'use strict';

/* ---------------------------------------------------------------------- */
/*  Constants & storage keys                                              */
/* ---------------------------------------------------------------------- */

const STORAGE_KEYS = {
  subjects: 'studyTimer.subjects',
  theme: 'studyTimer.theme',
  lang: 'studyTimer.lang',
  alarmEnabled: 'studyTimer.alarmEnabled',
  alarmVolume: 'studyTimer.alarmVolume'
};

const RING_RADIUS = 46;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

/* ---------------------------------------------------------------------- */
/*  Translations                                                          */
/* ---------------------------------------------------------------------- */

const translations = {
  en: {
    appName: 'Study Timer',
    appSubtitle: 'One subject at a time. One clear mind.',
    emptyTitle: 'No subjects yet',
    emptyBody: 'Add your first subject and start a focused session.',
    settingsTitle: 'Settings',
    settingLanguage: 'Language',
    settingLanguageHint: 'Choose your interface language',
    settingTheme: 'Theme',
    settingThemeHint: 'Pick a look for any time of day',
    themeDark: 'Dark',
    themeLight: 'Light',
    settingAlarm: 'Alarm',
    settingAlarmHint: 'Play a sound when a session ends',
    settingVolume: 'Alarm volume',
    settingVolumeHint: 'Adjust how loud the chime plays',
    settingTest: 'Test',
    settingReset: 'Reset all data',
    settingResetHint: 'Delete every subject and restore defaults',
    settingResetBtn: 'Reset',
    settingAbout: 'About',
    aboutBody: 'Study Timer is a lightweight, offline-friendly companion for focused study sessions. No account, no server — everything stays on this device.',
    aboutVersion: 'Version 1.0.0',
    addSubject: 'Add Subject',
    navHome: 'Home',
    navSettings: 'Settings',
    addModalTitle: 'Add subject',
    fieldName: 'Subject name',
    fieldNamePlaceholder: 'e.g. Organic Chemistry',
    errorName: 'Please enter a subject name.',
    fieldDuration: 'Study time',
    hoursLabel: 'hours',
    minutesLabel: 'minutes',
    errorTime: 'Please set a duration greater than zero.',
    cancel: 'Cancel',
    create: 'Create',
    deleteTitle: 'Delete this subject?',
    deleteBody: 'This will remove the subject and its progress. This can\u2019t be undone.',
    delete: 'Delete',
    start: 'Start',
    pause: 'Pause',
    resume: 'Resume',
    reset: 'Reset',
    statusIdle: 'Ready',
    statusRunning: 'Running',
    statusPaused: 'Paused',
    statusFinished: 'Done',
    ofDuration: 'of {duration}',
    hAbbrev: 'h',
    mAbbrev: 'm',
    toastCreated: 'Subject added.',
    toastDeleted: 'Subject deleted.',
    toastReset: 'All data has been reset.',
    toastFinishedTitle: 'Time is over! Great job!',
    toastFinishedBody: '"{name}" session is complete.',
    notifTitle: 'Time is over! Great job!'
  },
  ar: {
    appName: 'مؤقت المذاكرة',
    appSubtitle: 'مادة واحدة في كل مرة. ذهن صافٍ دائمًا.',
    emptyTitle: 'لا توجد مواد بعد',
    emptyBody: 'أضف موادّتك الأولى وابدأ جلسة تركيز.',
    settingsTitle: 'الإعدادات',
    settingLanguage: 'اللغة',
    settingLanguageHint: 'اختر لغة الواجهة',
    settingTheme: 'المظهر',
    settingThemeHint: 'اختر المظهر المناسب لوقتك',
    themeDark: 'داكن',
    themeLight: 'فاتح',
    settingAlarm: 'المنبّه',
    settingAlarmHint: 'تشغيل صوت عند انتهاء الجلسة',
    settingVolume: 'مستوى صوت المنبّه',
    settingVolumeHint: 'اضبط شدة صوت التنبيه',
    settingTest: 'تجربة',
    settingReset: 'إعادة تعيين البيانات',
    settingResetHint: 'حذف جميع المواد واستعادة الإعدادات الافتراضية',
    settingResetBtn: 'إعادة تعيين',
    settingAbout: 'حول التطبيق',
    aboutBody: 'مؤقت المذاكرة رفيق خفيف يعمل بلا اتصال لجلسات التركيز. بلا حساب وبلا خادم — كل شيء يبقى على جهازك.',
    aboutVersion: 'الإصدار 1.0.0',
    addSubject: 'إضافة مادة',
    navHome: 'الرئيسية',
    navSettings: 'الإعدادات',
    addModalTitle: 'إضافة مادة',
    fieldName: 'اسم المادة',
    fieldNamePlaceholder: 'مثال: الكيمياء العضوية',
    errorName: 'يرجى إدخال اسم المادة.',
    fieldDuration: 'مدة المذاكرة',
    hoursLabel: 'ساعات',
    minutesLabel: 'دقائق',
    errorTime: 'يرجى تحديد مدة أكبر من صفر.',
    cancel: 'إلغاء',
    create: 'إنشاء',
    deleteTitle: 'حذف هذه المادة؟',
    deleteBody: 'سيتم حذف المادة وتقدّمها. لا يمكن التراجع عن هذا الإجراء.',
    delete: 'حذف',
    start: 'بدء',
    pause: 'إيقاف مؤقت',
    resume: 'استئناف',
    reset: 'إعادة ضبط',
    statusIdle: 'جاهز',
    statusRunning: 'جارٍ',
    statusPaused: 'متوقف',
    statusFinished: 'اكتمل',
    ofDuration: 'من {duration}',
    hAbbrev: 'س',
    mAbbrev: 'د',
    toastCreated: 'تمت إضافة المادة.',
    toastDeleted: 'تم حذف المادة.',
    toastReset: 'تمت إعادة تعيين جميع البيانات.',
    toastFinishedTitle: 'انتهى الوقت! أحسنت!',
    toastFinishedBody: 'انتهت جلسة "{name}".',
    notifTitle: 'انتهى الوقت! أحسنت!'
  }
};

function t(key, vars) {
  const dict = translations[state.lang] || translations.en;
  let str = dict[key] || translations.en[key] || key;
  if (vars) {
    Object.keys(vars).forEach(k => { str = str.replace(`{${k}}`, vars[k]); });
  }
  return str;
}

/* ---------------------------------------------------------------------- */
/*  State                                                                  */
/* ---------------------------------------------------------------------- */

const state = {
  subjects: [],
  theme: 'dark',
  lang: 'en',
  alarmEnabled: true,
  alarmVolume: 70,
  view: 'home'
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.subjects);
    state.subjects = raw ? JSON.parse(raw) : [];
  } catch (e) { state.subjects = []; }

  state.theme = localStorage.getItem(STORAGE_KEYS.theme) || 'dark';
  state.lang = localStorage.getItem(STORAGE_KEYS.lang) || 'en';

  const storedAlarmEnabled = localStorage.getItem(STORAGE_KEYS.alarmEnabled);
  state.alarmEnabled = storedAlarmEnabled === null ? true : storedAlarmEnabled === 'true';

  const storedVolume = localStorage.getItem(STORAGE_KEYS.alarmVolume);
  state.alarmVolume = storedVolume === null ? 70 : Number(storedVolume);

  // Reconcile any subject that was running when the page was last closed:
  // compute elapsed real time so remaining seconds stay accurate.
  const now = Date.now();
  state.subjects.forEach(subject => {
    if (subject.status === 'running' && subject.endTime) {
      const remaining = Math.round((subject.endTime - now) / 1000);
      if (remaining <= 0) {
        subject.remainingSeconds = 0;
        subject.status = 'finished';
        subject.endTime = null;
      } else {
        subject.remainingSeconds = remaining;
      }
    }
  });
}

function saveSubjects() {
  localStorage.setItem(STORAGE_KEYS.subjects, JSON.stringify(state.subjects));
}

/* ---------------------------------------------------------------------- */
/*  DOM references                                                        */
/* ---------------------------------------------------------------------- */

const el = {
  html: document.documentElement,
  themeToggle: document.getElementById('themeToggle'),
  langToggle: document.getElementById('langToggle'),
  langToggleLabel: document.getElementById('langToggleLabel'),

  viewHome: document.getElementById('view-home'),
  viewSettings: document.getElementById('view-settings'),
  navHomeBtn: document.getElementById('navHomeBtn'),
  navSettingsBtn: document.getElementById('navSettingsBtn'),
  fab: document.getElementById('openAddModalBtn'),

  subjectsGrid: document.getElementById('subjectsGrid'),
  emptyState: document.getElementById('emptyState'),

  addModalOverlay: document.getElementById('addModalOverlay'),
  openAddModalBtn: document.getElementById('openAddModalBtn'),
  closeAddModalBtn: document.getElementById('closeAddModalBtn'),
  cancelAddBtn: document.getElementById('cancelAddBtn'),
  addSubjectForm: document.getElementById('addSubjectForm'),
  subjectNameInput: document.getElementById('subjectNameInput'),
  hoursInput: document.getElementById('hoursInput'),
  minutesInput: document.getElementById('minutesInput'),
  nameField: null,
  timeField: null,

  deleteModalOverlay: document.getElementById('deleteModalOverlay'),
  deleteModalBody: document.getElementById('deleteModalBody'),
  cancelDeleteBtn: document.getElementById('cancelDeleteBtn'),
  confirmDeleteBtn: document.getElementById('confirmDeleteBtn'),

  langEnBtn: document.getElementById('langEnBtn'),
  langArBtn: document.getElementById('langArBtn'),
  themeDarkBtn: document.getElementById('themeDarkBtn'),
  themeLightBtn: document.getElementById('themeLightBtn'),
  alarmEnabledInput: document.getElementById('alarmEnabledInput'),
  alarmVolumeInput: document.getElementById('alarmVolumeInput'),
  testAlarmBtn: document.getElementById('testAlarmBtn'),
  resetAllBtn: document.getElementById('resetAllBtn'),

  toastStack: document.getElementById('toastStack'),
  alarmAudio: document.getElementById('alarmAudio')
};
el.nameField = el.subjectNameInput.closest('.field');
el.timeField = el.hoursInput.closest('.field');

let pendingDeleteId = null;

/* ---------------------------------------------------------------------- */
/*  Icons (inline SVG strings, reused across subject cards)               */
/* ---------------------------------------------------------------------- */

const ICONS = {
  play: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4.5v15l13-7.5-13-7.5Z"/></svg>',
  pause: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4.5h3.2v15H7zM13.8 4.5H17v15h-3.2z"/></svg>',
  reset: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5V7m2 0v13a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 7 20V7h10Z"/></svg>'
};

/* ---------------------------------------------------------------------- */
/*  Helpers                                                                */
/* ---------------------------------------------------------------------- */

function uid() {
  return 'sub_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
}

function formatClock(totalSeconds) {
  const s = Math.max(0, Math.round(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = n => String(n).padStart(2, '0');
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(sec)}` : `${pad(m)}:${pad(sec)}`;
}

function formatDurationLabel(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.round((totalSeconds % 3600) / 60);
  const parts = [];
  if (h > 0) parts.push(`${h}${t('hAbbrev')}`);
  if (m > 0 || h === 0) parts.push(`${m}${t('mAbbrev')}`);
  return parts.join(' ');
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* ---------------------------------------------------------------------- */
/*  Theme                                                                  */
/* ---------------------------------------------------------------------- */

function applyTheme() {
  el.html.setAttribute('data-theme', state.theme);
  localStorage.setItem(STORAGE_KEYS.theme, state.theme);
  [el.themeDarkBtn, el.themeLightBtn].forEach(btn => {
    if (!btn) return;
    btn.classList.toggle('is-active', btn.dataset.themeChoice === state.theme);
  });
}

function setTheme(theme) {
  state.theme = theme;
  applyTheme();
}

/* ---------------------------------------------------------------------- */
/*  Language / i18n                                                       */
/* ---------------------------------------------------------------------- */

function applyLanguage() {
  const dir = state.lang === 'ar' ? 'rtl' : 'ltr';
  el.html.setAttribute('lang', state.lang);
  el.html.setAttribute('dir', dir);
  localStorage.setItem(STORAGE_KEYS.lang, state.lang);

  document.querySelectorAll('[data-i18n]').forEach(node => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(node => {
    node.setAttribute('placeholder', t(node.dataset.i18nPlaceholder));
  });

  el.langToggleLabel.textContent = state.lang === 'ar' ? 'English' : 'العربية';
  [el.langEnBtn, el.langArBtn].forEach(btn => {
    if (!btn) return;
    btn.classList.toggle('is-active', btn.dataset.lang === state.lang);
  });

  document.title = state.lang === 'ar' ? 'مؤقت المذاكرة' : 'Study Timer — Focus, one subject at a time';

  renderSubjects();
}

function setLanguage(lang) {
  state.lang = lang;
  applyLanguage();
}

/* ---------------------------------------------------------------------- */
/*  View switching (Home / Settings)                                      */
/* ---------------------------------------------------------------------- */

function setView(view) {
  state.view = view;
  const isHome = view === 'home';
  el.viewHome.hidden = !isHome;
  el.viewSettings.hidden = isHome;
  el.fab.style.display = isHome ? '' : 'none';
  el.navHomeBtn.classList.toggle('is-active', isHome);
  el.navSettingsBtn.classList.toggle('is-active', !isHome);
}

/* ---------------------------------------------------------------------- */
/*  Toasts + notifications                                                */
/* ---------------------------------------------------------------------- */

function showToast(title, body, icon) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span class="toast__icon">${icon || '✅'}</span><span>${escapeHtml(title)}${body ? ' — ' + escapeHtml(body) : ''}</span>`;
  el.toastStack.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('is-leaving');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  }, 4200);
}

function requestNotificationPermissionIfNeeded() {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission().catch(() => {});
  }
}

function fireFinishedNotification(subjectName) {
  const title = t('notifTitle');
  const body = t('toastFinishedBody', { name: subjectName });

  if ('Notification' in window && Notification.permission === 'granted') {
    try { new Notification(title, { body, icon: 'assets/icons/logo.svg' }); }
    catch (e) { /* ignore */ }
  }
  showToast(title, body, '⏰');
}

function playAlarm() {
  if (!state.alarmEnabled) return;
  try {
    el.alarmAudio.volume = Math.min(1, Math.max(0, state.alarmVolume / 100));
    el.alarmAudio.currentTime = 0;
    el.alarmAudio.play().catch(() => {});
  } catch (e) { /* ignore */ }
}

/* ---------------------------------------------------------------------- */
/*  Subject rendering                                                     */
/* ---------------------------------------------------------------------- */

function subjectCardTemplate(subject) {
  const progress = subject.totalSeconds > 0 ? subject.remainingSeconds / subject.totalSeconds : 0;
  const dashoffset = RING_CIRCUMFERENCE * (1 - progress);
  const statusKey = {
    idle: 'statusIdle', running: 'statusRunning', paused: 'statusPaused', finished: 'statusFinished'
  }[subject.status] || 'statusIdle';

  const showStart = subject.status === 'idle';
  const showPause = subject.status === 'running';
  const showResume = subject.status === 'paused';
  const canReset = subject.status !== 'idle';

  return `
    <article class="subject-card" data-id="${subject.id}" data-status="${subject.status}" style="animation-delay:0ms">
      <div class="subject-card__head">
        <h3 class="subject-card__name">${escapeHtml(subject.name)}</h3>
        <span class="subject-card__status" data-role="status">${t(statusKey)}</span>
      </div>
      <div class="subject-card__body">
        <div class="focus-ring">
          <svg viewBox="0 0 120 120">
            <circle class="focus-ring__track" cx="60" cy="60" r="${RING_RADIUS}"></circle>
            <circle class="focus-ring__ticks" cx="60" cy="60" r="${RING_RADIUS}" stroke-dasharray="1.2 22.8"></circle>
            <circle class="focus-ring__progress" data-role="ring" cx="60" cy="60" r="${RING_RADIUS}"
              stroke-dasharray="${RING_CIRCUMFERENCE}" stroke-dashoffset="${dashoffset}"></circle>
          </svg>
          <div class="focus-ring__time" data-role="time">${formatClock(subject.remainingSeconds)}</div>
        </div>
        <div class="subject-card__meta">
          <div class="subject-card__total" data-role="total">${t('ofDuration', { duration: formatDurationLabel(subject.totalSeconds) })}</div>
          <div class="subject-card__progressbar">
            <div class="subject-card__progressbar-fill" data-role="bar" style="width:${(progress * 100).toFixed(2)}%"></div>
          </div>
        </div>
      </div>
      <div class="subject-card__actions">
        <button type="button" class="card-btn card-btn--primary" data-action="start" ${showStart ? '' : 'hidden'}>${ICONS.play}<span>${t('start')}</span></button>
        <button type="button" class="card-btn card-btn--primary" data-action="pause" ${showPause ? '' : 'hidden'}>${ICONS.pause}<span>${t('pause')}</span></button>
        <button type="button" class="card-btn card-btn--primary" data-action="resume" ${showResume ? '' : 'hidden'}>${ICONS.play}<span>${t('resume')}</span></button>
        <button type="button" class="card-btn" data-action="reset" ${canReset ? '' : 'hidden'}>${ICONS.reset}<span>${t('reset')}</span></button>
        <button type="button" class="card-btn card-btn--danger" data-action="delete">${ICONS.trash}<span>${t('delete')}</span></button>
      </div>
    </article>
  `;
}

function renderSubjects() {
  el.subjectsGrid.innerHTML = state.subjects.map(subjectCardTemplate).join('');
  el.emptyState.hidden = state.subjects.length > 0;
}

/** Lightweight per-tick update: touches only the DOM nodes that change,
 *  so running cards don't lose hover/focus state every second. */
function updateSubjectDom(subject) {
  const card = el.subjectsGrid.querySelector(`.subject-card[data-id="${subject.id}"]`);
  if (!card) return;

  card.dataset.status = subject.status;

  const progress = subject.totalSeconds > 0 ? subject.remainingSeconds / subject.totalSeconds : 0;
  const dashoffset = RING_CIRCUMFERENCE * (1 - progress);

  card.querySelector('[data-role="time"]').textContent = formatClock(subject.remainingSeconds);
  card.querySelector('[data-role="ring"]').setAttribute('stroke-dashoffset', dashoffset);
  card.querySelector('[data-role="bar"]').style.width = `${(progress * 100).toFixed(2)}%`;

  const statusKey = { idle: 'statusIdle', running: 'statusRunning', paused: 'statusPaused', finished: 'statusFinished' }[subject.status] || 'statusIdle';
  card.querySelector('[data-role="status"]').textContent = t(statusKey);

  const startBtn = card.querySelector('[data-action="start"]');
  const pauseBtn = card.querySelector('[data-action="pause"]');
  const resumeBtn = card.querySelector('[data-action="resume"]');
  const resetBtn = card.querySelector('[data-action="reset"]');

  startBtn.hidden = subject.status !== 'idle';
  pauseBtn.hidden = subject.status !== 'running';
  resumeBtn.hidden = subject.status !== 'paused';
  resetBtn.hidden = subject.status === 'idle';
}

/* ---------------------------------------------------------------------- */
/*  Timer engine                                                          */
/* ---------------------------------------------------------------------- */

function findSubject(id) {
  return state.subjects.find(s => s.id === id);
}

function startSubject(id) {
  const subject = findSubject(id);
  if (!subject || subject.remainingSeconds <= 0) return;
  requestNotificationPermissionIfNeeded();
  subject.status = 'running';
  subject.endTime = Date.now() + subject.remainingSeconds * 1000;
  saveSubjects();
  updateSubjectDom(subject);
}

function pauseSubject(id) {
  const subject = findSubject(id);
  if (!subject || subject.status !== 'running') return;
  const remaining = Math.max(0, Math.round((subject.endTime - Date.now()) / 1000));
  subject.remainingSeconds = remaining;
  subject.status = 'paused';
  subject.endTime = null;
  saveSubjects();
  updateSubjectDom(subject);
}

function resumeSubject(id) { startSubject(id); }

function resetSubject(id) {
  const subject = findSubject(id);
  if (!subject) return;
  subject.remainingSeconds = subject.totalSeconds;
  subject.status = 'idle';
  subject.endTime = null;
  saveSubjects();
  updateSubjectDom(subject);
}

function finishSubject(subject) {
  subject.status = 'finished';
  subject.remainingSeconds = 0;
  subject.endTime = null;
  updateSubjectDom(subject);
  const card = el.subjectsGrid.querySelector(`.subject-card[data-id="${subject.id}"]`);
  if (card) {
    card.classList.remove('subject-card--pulse');
    void card.offsetWidth;
  }
  playAlarm();
  fireFinishedNotification(subject.name);
}

function tick() {
  let changed = false;
  const now = Date.now();
  state.subjects.forEach(subject => {
    if (subject.status !== 'running') return;
    const remaining = Math.round((subject.endTime - now) / 1000);
    if (remaining <= 0) {
      finishSubject(subject);
      changed = true;
    } else if (remaining !== subject.remainingSeconds) {
      subject.remainingSeconds = remaining;
      updateSubjectDom(subject);
      changed = true;
    }
  });
  if (changed) saveSubjects();
}

setInterval(tick, 1000);

/* ---------------------------------------------------------------------- */
/*  Add subject modal                                                     */
/* ---------------------------------------------------------------------- */

function openAddModal() {
  el.addSubjectForm.reset();
  el.hoursInput.value = 0;
  el.minutesInput.value = 25;
  el.nameField.classList.remove('has-error');
  el.timeField.classList.remove('has-error');
  el.addModalOverlay.hidden = false;
  requestAnimationFrame(() => el.subjectNameInput.focus());
  document.body.style.overflow = 'hidden';
}

function closeAddModal() {
  el.addModalOverlay.hidden = true;
  document.body.style.overflow = '';
}

function handleAddSubjectSubmit(evt) {
  evt.preventDefault();
  const name = el.subjectNameInput.value.trim();
  const hours = Math.max(0, Math.min(23, parseInt(el.hoursInput.value, 10) || 0));
  const minutes = Math.max(0, Math.min(59, parseInt(el.minutesInput.value, 10) || 0));
  const totalSeconds = hours * 3600 + minutes * 60;

  let valid = true;
  if (!name) {
    el.nameField.classList.add('has-error');
    valid = false;
  } else {
    el.nameField.classList.remove('has-error');
  }
  if (totalSeconds <= 0) {
    el.timeField.classList.add('has-error');
    valid = false;
  } else {
    el.timeField.classList.remove('has-error');
  }
  if (!valid) return;

  const subject = {
    id: uid(),
    name,
    totalSeconds,
    remainingSeconds: totalSeconds,
    status: 'idle',
    endTime: null,
    createdAt: Date.now()
  };
  state.subjects.unshift(subject);
  saveSubjects();
  renderSubjects();
  closeAddModal();
  showToast(t('toastCreated'), null, '📚');
  requestNotificationPermissionIfNeeded();
}

/* ---------------------------------------------------------------------- */
/*  Delete confirmation modal                                             */
/* ---------------------------------------------------------------------- */

function openDeleteModal(id) {
  pendingDeleteId = id;
  el.deleteModalOverlay.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeDeleteModal() {
  pendingDeleteId = null;
  el.deleteModalOverlay.hidden = true;
  document.body.style.overflow = '';
}

function confirmDelete() {
  if (!pendingDeleteId) return;
  state.subjects = state.subjects.filter(s => s.id !== pendingDeleteId);
  saveSubjects();
  renderSubjects();
  closeDeleteModal();
  showToast(t('toastDeleted'), null, '🗑️');
}

/* ---------------------------------------------------------------------- */
/*  Settings                                                              */
/* ---------------------------------------------------------------------- */

function applyAlarmSettingsToUI() {
  el.alarmEnabledInput.checked = state.alarmEnabled;
  el.alarmVolumeInput.value = state.alarmVolume;
}

function resetAllData() {
  state.subjects = [];
  saveSubjects();
  renderSubjects();
  showToast(t('toastReset'), null, '♻️');
}

/* ---------------------------------------------------------------------- */
/*  Event wiring                                                          */
/* ---------------------------------------------------------------------- */

function wireEvents() {
  // Theme + language toggles (top bar)
  el.themeToggle.addEventListener('click', () => setTheme(state.theme === 'dark' ? 'light' : 'dark'));
  el.langToggle.addEventListener('click', () => setLanguage(state.lang === 'ar' ? 'en' : 'ar'));

  // Bottom navigation
  el.navHomeBtn.addEventListener('click', () => setView('home'));
  el.navSettingsBtn.addEventListener('click', () => setView('settings'));

  // Add-subject modal
  el.openAddModalBtn.addEventListener('click', openAddModal);
  el.closeAddModalBtn.addEventListener('click', closeAddModal);
  el.cancelAddBtn.addEventListener('click', closeAddModal);
  el.addModalOverlay.addEventListener('click', evt => { if (evt.target === el.addModalOverlay) closeAddModal(); });
  el.addSubjectForm.addEventListener('submit', handleAddSubjectSubmit);

  // Delete modal
  el.cancelDeleteBtn.addEventListener('click', closeDeleteModal);
  el.confirmDeleteBtn.addEventListener('click', confirmDelete);
  el.deleteModalOverlay.addEventListener('click', evt => { if (evt.target === el.deleteModalOverlay) closeDeleteModal(); });

  // Escape key closes any open modal
  document.addEventListener('keydown', evt => {
    if (evt.key !== 'Escape') return;
    if (!el.addModalOverlay.hidden) closeAddModal();
    if (!el.deleteModalOverlay.hidden) closeDeleteModal();
  });

  // Subject card actions (event delegation)
  el.subjectsGrid.addEventListener('click', evt => {
    const btn = evt.target.closest('[data-action]');
    if (!btn) return;
    const card = evt.target.closest('.subject-card');
    const id = card && card.dataset.id;
    if (!id) return;
    const action = btn.dataset.action;
    if (action === 'start') startSubject(id);
    else if (action === 'pause') pauseSubject(id);
    else if (action === 'resume') resumeSubject(id);
    else if (action === 'reset') resetSubject(id);
    else if (action === 'delete') {
      const subject = findSubject(id);
      if (subject) el.deleteModalBody.textContent = t('deleteBody');
      openDeleteModal(id);
    }
  });

  // Settings — language segmented control
  el.langEnBtn.addEventListener('click', () => setLanguage('en'));
  el.langArBtn.addEventListener('click', () => setLanguage('ar'));

  // Settings — theme segmented control
  el.themeDarkBtn.addEventListener('click', () => setTheme('dark'));
  el.themeLightBtn.addEventListener('click', () => setTheme('light'));

  // Settings — alarm
  el.alarmEnabledInput.addEventListener('change', () => {
    state.alarmEnabled = el.alarmEnabledInput.checked;
    localStorage.setItem(STORAGE_KEYS.alarmEnabled, String(state.alarmEnabled));
  });
  el.alarmVolumeInput.addEventListener('input', () => {
    state.alarmVolume = Number(el.alarmVolumeInput.value);
    localStorage.setItem(STORAGE_KEYS.alarmVolume, String(state.alarmVolume));
  });
  el.testAlarmBtn.addEventListener('click', () => {
    const wasEnabled = state.alarmEnabled;
    state.alarmEnabled = true;
    playAlarm();
    state.alarmEnabled = wasEnabled;
  });

  // Settings — reset all data
  el.resetAllBtn.addEventListener('click', () => {
    openDeleteModal(null);
    el.deleteModalBody.textContent = t('settingResetHint');
    // Repurpose the confirm-delete modal for the reset confirmation.
    const originalHandler = confirmDelete;
    el.confirmDeleteBtn.onclick = () => {
      resetAllData();
      closeDeleteModal();
      el.confirmDeleteBtn.onclick = null; // restore delegated listener next tick
    };
  });

  // Pause countdown work when the tab is hidden is unnecessary (we compute
  // from timestamps), but re-sync the DOM immediately on return to avoid a
  // stale display before the next 1s tick.
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') tick();
  });
}

/* ---------------------------------------------------------------------- */
/*  Init                                                                  */
/* ---------------------------------------------------------------------- */

function init() {
  loadState();
  saveSubjects();
  applyTheme();
  applyLanguage();
  applyAlarmSettingsToUI();
  setView('home');
  wireEvents();
}

init();
