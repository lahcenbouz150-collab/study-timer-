'use strict';

/* =====================================================================
   STUDY TIMER — APPLICATION LOGIC
   Vanilla ES6+. No dependencies. Everything persists to localStorage.
   ===================================================================== */

/* ---------------------------------------------------------------------
   1. TRANSLATIONS
   --------------------------------------------------------------------- */
const I18N = {
  en: {
    skipToContent: 'Skip to content',
    brandName: 'Study Timer',
    navHome: 'Home',
    navSettings: 'Settings',
    heroTitle: 'Study Timer',
    heroSubtitle: 'One dial per subject. Start it, trust it, and watch the work get done.',
    subjectsHeading: 'Your subjects',
    subjectsCountZero: 'No subjects yet',
    subjectsCountOne: '1 subject',
    subjectsCountOther: '{n} subjects',
    emptyTitle: 'No subjects yet',
    emptyBody: 'Add your first subject and give it a duration. Your dial starts here.',
    emptyCta: 'Add a subject',
    addSubjectAria: 'Add subject',
    settingsTitle: 'Settings',
    settingLanguage: 'Language',
    settingLanguageDesc: 'Choose the interface language.',
    settingTheme: 'Theme',
    settingThemeDesc: 'Switch between dark and light.',
    themeDark: 'Dark',
    themeLight: 'Light',
    settingAlarm: 'Alarm',
    settingAlarmDesc: 'Play a sound when a timer finishes.',
    settingVolume: 'Alarm volume',
    settingVolumeDesc: 'Adjust how loud the finish alarm plays.',
    settingTestAlarm: 'Test',
    settingReset: 'Reset all data',
    settingResetDesc: 'Delete every subject and restore default settings. This cannot be undone.',
    settingResetCta: 'Reset data',
    aboutHeading: 'About',
    aboutBody: 'Study Timer is an independent, offline-friendly timer built for focused study sessions — one dial per subject, running entirely in your browser.',
    aboutVersion: 'Version',
    modalTitle: 'Add a subject',
    fieldSubjectName: 'Subject name',
    fieldSubjectNamePlaceholder: 'e.g. Organic Chemistry',
    fieldHours: 'Hours',
    fieldMinutes: 'Minutes',
    modalCancel: 'Cancel',
    modalCreate: 'Create',
    errorNameEmpty: 'Give this subject a name.',
    errorNameDuplicate: 'You already have a subject with this name.',
    errorTimeZero: 'Set a duration greater than zero.',
    statusRunning: 'Focusing',
    statusPaused: 'Paused',
    statusFinished: 'Done',
    statusIdle: 'Ready',
    btnStart: 'Start',
    btnRestart: 'Restart',
    btnPause: 'Pause',
    btnResume: 'Resume',
    btnReset: 'Reset',
    btnDelete: 'Delete',
    deleteConfirm: 'Delete "{name}"? This cannot be undone.',
    resetConfirm: 'This will delete all subjects and restore default settings. Continue?',
    toastCreated: '"{name}" was added.',
    toastDeleted: '"{name}" was deleted.',
    toastStarted: '"{name}" is running.',
    toastPaused: '"{name}" is paused.',
    toastResumed: '"{name}" is running again.',
    toastReset: '"{name}" was reset.',
    toastFinishedTitle: 'Time is over! Great job!',
    toastFinishedBody: '"{name}" is complete.',
    toastDataReset: 'All data was reset.',
    notifTitle: 'Time is over! Great job!',
  },
  ar: {
    skipToContent: 'التخطي إلى المحتوى',
    brandName: 'مؤقّت الدراسة',
    navHome: 'الرئيسية',
    navSettings: 'الإعدادات',
    heroTitle: 'مؤقّت الدراسة',
    heroSubtitle: 'قرص واحد لكل مادة. ابدأه، ثِق به، وشاهد المهمة تنتهي.',
    subjectsHeading: 'موادّك الدراسية',
    subjectsCountZero: 'لا توجد مواد بعد',
    subjectsCountOne: 'مادة واحدة',
    subjectsCountOther: '{n} مواد',
    emptyTitle: 'لا توجد مواد بعد',
    emptyBody: 'أضف أول مادة دراسية وحدّد لها مدة زمنية. قرصك يبدأ من هنا.',
    emptyCta: 'إضافة مادة',
    addSubjectAria: 'إضافة مادة',
    settingsTitle: 'الإعدادات',
    settingLanguage: 'اللغة',
    settingLanguageDesc: 'اختر لغة الواجهة.',
    settingTheme: 'المظهر',
    settingThemeDesc: 'التبديل بين الوضع الداكن والفاتح.',
    themeDark: 'داكن',
    themeLight: 'فاتح',
    settingAlarm: 'المنبّه',
    settingAlarmDesc: 'تشغيل صوت عند انتهاء المؤقّت.',
    settingVolume: 'مستوى صوت المنبّه',
    settingVolumeDesc: 'اضبط مستوى صوت المنبّه عند الانتهاء.',
    settingTestAlarm: 'تجربة',
    settingReset: 'إعادة تعيين كل البيانات',
    settingResetDesc: 'حذف جميع المواد واستعادة الإعدادات الافتراضية. لا يمكن التراجع عن هذا الإجراء.',
    settingResetCta: 'إعادة التعيين',
    aboutHeading: 'حول التطبيق',
    aboutBody: 'مؤقّت الدراسة تطبيق مستقل يعمل بالكامل داخل متصفحك، مصمَّم لجلسات الدراسة المركّزة — قرص واحد لكل مادة.',
    aboutVersion: 'الإصدار',
    modalTitle: 'إضافة مادة',
    fieldSubjectName: 'اسم المادة',
    fieldSubjectNamePlaceholder: 'مثال: الكيمياء العضوية',
    fieldHours: 'ساعات',
    fieldMinutes: 'دقائق',
    modalCancel: 'إلغاء',
    modalCreate: 'إنشاء',
    errorNameEmpty: 'يرجى إدخال اسم لهذه المادة.',
    errorNameDuplicate: 'لديك بالفعل مادة بهذا الاسم.',
    errorTimeZero: 'حدّد مدة أكبر من صفر.',
    statusRunning: 'تركيز',
    statusPaused: 'متوقّف مؤقتًا',
    statusFinished: 'انتهى',
    statusIdle: 'جاهز',
    btnStart: 'ابدأ',
    btnRestart: 'إعادة البدء',
    btnPause: 'إيقاف مؤقّت',
    btnResume: 'استئناف',
    btnReset: 'إعادة تعيين',
    btnDelete: 'حذف',
    deleteConfirm: 'حذف "{name}"؟ لا يمكن التراجع عن هذا الإجراء.',
    resetConfirm: 'سيؤدي هذا إلى حذف جميع المواد واستعادة الإعدادات الافتراضية. متابعة؟',
    toastCreated: 'تمت إضافة "{name}".',
    toastDeleted: 'تم حذف "{name}".',
    toastStarted: '"{name}" قيد التشغيل الآن.',
    toastPaused: '"{name}" متوقّفة مؤقتًا.',
    toastResumed: '"{name}" تعمل من جديد.',
    toastReset: 'تمت إعادة تعيين "{name}".',
    toastFinishedTitle: 'انتهى الوقت! أحسنت!',
    toastFinishedBody: '"{name}" اكتملت.',
    toastDataReset: 'تمت إعادة تعيين جميع البيانات.',
    notifTitle: 'انتهى الوقت! أحسنت!',
  },
};

function t(key, vars) {
  const dict = I18N[state.language] || I18N.en;
  let str = dict[key] !== undefined ? dict[key] : (I18N.en[key] || key);
  if (vars) {
    Object.keys(vars).forEach((k) => {
      str = str.replace(`{${k}}`, vars[k]);
    });
  }
  return str;
}

function pluralSubjects(n) {
  if (n === 0) return t('subjectsCountZero');
  if (n === 1) return t('subjectsCountOne');
  return t('subjectsCountOther', { n });
}

/* ---------------------------------------------------------------------
   2. STATE + PERSISTENCE
   --------------------------------------------------------------------- */
const STORAGE_KEY = 'studyTimer.v1';

const DEFAULT_STATE = {
  subjects: [],       // { id, name, totalSeconds, remainingSeconds, running, endTime, finished }
  theme: 'dark',
  language: 'en',
  alarmEnabled: true,
  volume: 70,
};

let state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredCloneShim(DEFAULT_STATE);
    const parsed = JSON.parse(raw);
    return Object.assign(structuredCloneShim(DEFAULT_STATE), parsed);
  } catch (err) {
    console.warn('Study Timer: could not read saved data, starting fresh.', err);
    return structuredCloneShim(DEFAULT_STATE);
  }
}

function structuredCloneShim(obj) {
  return JSON.parse(JSON.stringify(obj));
}

let saveHandle = null;
function saveState() {
  // Debounce writes very slightly so rapid ticks don't hammer localStorage.
  if (saveHandle) cancelAnimationFrame(saveHandle);
  saveHandle = requestAnimationFrame(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.warn('Study Timer: could not save data.', err);
    }
  });
}

function uid() {
  return 's_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
}

/* ---------------------------------------------------------------------
   3. DOM REFERENCES
   --------------------------------------------------------------------- */
const el = {
  html: document.documentElement,
  navHome: document.getElementById('navHomeBtn'),
  navSettings: document.getElementById('navSettingsBtn'),
  homeView: document.getElementById('homeView'),
  settingsView: document.getElementById('settingsView'),
  langToggleBtn: document.getElementById('langToggleBtn'),
  langToggleLabel: document.getElementById('langToggleLabel'),
  themeToggleBtn: document.getElementById('themeToggleBtn'),
  cardsGrid: document.getElementById('cardsGrid'),
  emptyState: document.getElementById('emptyState'),
  subjectsCount: document.getElementById('subjectsCount'),
  addSubjectBtn: document.getElementById('addSubjectBtn'),
  emptyAddBtn: document.getElementById('emptyAddBtn'),
  modalBackdrop: document.getElementById('modalBackdrop'),
  modalCloseBtn: document.getElementById('modalCloseBtn'),
  modalCancelBtn: document.getElementById('modalCancelBtn'),
  subjectForm: document.getElementById('subjectForm'),
  subjectNameInput: document.getElementById('subjectNameInput'),
  hoursInput: document.getElementById('hoursInput'),
  minutesInput: document.getElementById('minutesInput'),
  nameError: document.getElementById('nameError'),
  timeError: document.getElementById('timeError'),
  toastLayer: document.getElementById('toastLayer'),
  alarmAudio: document.getElementById('alarmAudio'),
  alarmToggle: document.getElementById('alarmToggle'),
  volumeSlider: document.getElementById('volumeSlider'),
  testAlarmBtn: document.getElementById('testAlarmBtn'),
  resetDataBtn: document.getElementById('resetDataBtn'),
  heroTicks: document.querySelector('.hero-ticks'),
};

/* ---------------------------------------------------------------------
   4. i18n APPLICATION
   --------------------------------------------------------------------- */
function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    node.textContent = t(node.getAttribute('data-i18n'));
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((node) => {
    node.setAttribute('placeholder', t(node.getAttribute('data-i18n-placeholder')));
  });
  document.querySelectorAll('[data-i18n-aria]').forEach((node) => {
    node.setAttribute('aria-label', t(node.getAttribute('data-i18n-aria')));
  });
  document.title = state.language === 'ar'
    ? 'مؤقّت الدراسة — ركّز. تابع. أنجِز.'
    : 'Study Timer — Focus. Track. Finish.';
  el.langToggleLabel.textContent = state.language === 'ar' ? 'AR' : 'EN';
  document.querySelectorAll('[data-lang-option]').forEach((btn) => {
    btn.classList.toggle('is-active', btn.getAttribute('data-lang-option') === state.language);
    btn.setAttribute('aria-checked', String(btn.getAttribute('data-lang-option') === state.language));
  });
}

function applyLanguage(lang) {
  state.language = lang;
  el.html.setAttribute('lang', lang);
  el.html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  applyTranslations();
  renderSubjects();
  saveState();
}

/* ---------------------------------------------------------------------
   5. THEME
   --------------------------------------------------------------------- */
function applyTheme(theme) {
  state.theme = theme;
  el.html.setAttribute('data-theme', theme);
  document.querySelectorAll('[data-theme-option]').forEach((btn) => {
    btn.classList.toggle('is-active', btn.getAttribute('data-theme-option') === theme);
    btn.setAttribute('aria-checked', String(btn.getAttribute('data-theme-option') === theme));
  });
  saveState();
}

/* ---------------------------------------------------------------------
   6. VIEW ROUTING (single page, two panels)
   --------------------------------------------------------------------- */
function showView(view) {
  const isHome = view === 'home';
  el.homeView.hidden = !isHome;
  el.settingsView.hidden = isHome;
  el.navHome.classList.toggle('is-active', isHome);
  el.navSettings.classList.toggle('is-active', !isHome);
  el.navHome.setAttribute('aria-current', isHome ? 'page' : 'false');
  el.navSettings.setAttribute('aria-current', !isHome ? 'page' : 'false');
}

/* ---------------------------------------------------------------------
   7. TOASTS
   --------------------------------------------------------------------- */
function showToast(message, kind) {
  const toast = document.createElement('div');
  toast.className = 'toast' + (kind ? ` is-${kind}` : '');
  toast.innerHTML = `<span class="toast-dot" aria-hidden="true"></span><span></span>`;
  toast.querySelector('span:last-child').textContent = message;
  el.toastLayer.appendChild(toast);
  const lifespan = 4200;
  const timer = setTimeout(() => dismiss(), lifespan);
  toast.addEventListener('click', () => { clearTimeout(timer); dismiss(); });
  function dismiss() {
    toast.classList.add('is-leaving');
    setTimeout(() => toast.remove(), 240);
  }
}

/* ---------------------------------------------------------------------
   8. ALARM
   --------------------------------------------------------------------- */
let audioCtx = null;
function playSynthesizedBeep() {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const now = audioCtx.currentTime;
    const gain = audioCtx.createGain();
    gain.connect(audioCtx.destination);
    const peak = Math.max(0, Math.min(1, state.volume / 100)) * 0.35;
    gain.gain.setValueAtTime(0.0001, now);

    [0, 0.35, 0.7].forEach((offset) => {
      const osc = audioCtx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now + offset);
      osc.connect(gain);
      gain.gain.setValueAtTime(0.0001, now + offset);
      gain.gain.exponentialRampToValueAtTime(Math.max(peak, 0.0002), now + offset + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.28);
      osc.start(now + offset);
      osc.stop(now + offset + 0.3);
    });
  } catch (err) {
    console.warn('Study Timer: could not synthesize alarm tone.', err);
  }
}

function playAlarm() {
  if (!state.alarmEnabled) return;
  el.alarmAudio.volume = Math.max(0, Math.min(1, state.volume / 100));
  el.alarmAudio.currentTime = 0;
  const playPromise = el.alarmAudio.play();
  if (playPromise && typeof playPromise.catch === 'function') {
    playPromise.catch(() => {
      // No real audio file (or blocked) — fall back to a synthesized tone
      // so the alarm is never silent.
      playSynthesizedBeep();
    });
  }
}

function showFinishNotification(name) {
  const title = t('notifTitle');
  const body = t('toastFinishedBody', { name });
  if ('Notification' in window) {
    if (Notification.permission === 'granted') {
      try { new Notification(title, { body }); } catch (err) { /* ignore */ }
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((perm) => {
        if (perm === 'granted') {
          try { new Notification(title, { body }); } catch (err) { /* ignore */ }
        }
      });
    }
  }
}

/* ---------------------------------------------------------------------
   9. SUBJECT / TIMER ENGINE
   --------------------------------------------------------------------- */
function createSubject(name, totalSeconds) {
  const subject = {
    id: uid(),
    name,
    totalSeconds,
    remainingSeconds: totalSeconds,
    running: false,
    endTime: null,
    finished: false,
  };
  state.subjects.push(subject);
  saveState();
  renderSubjects();
  showToast(t('toastCreated', { name }), 'success');
}

function getSubjectState(subject) {
  if (subject.finished) return 'finished';
  if (subject.running) return 'running';
  if (subject.remainingSeconds < subject.totalSeconds) return 'paused';
  return 'idle';
}

function startSubject(id) {
  const subject = state.subjects.find((s) => s.id === id);
  if (!subject) return;
  if (subject.finished) {
    subject.remainingSeconds = subject.totalSeconds;
    subject.finished = false;
  }
  subject.running = true;
  subject.endTime = Date.now() + subject.remainingSeconds * 1000;
  saveState();
  renderSubjects();
  showToast(t('toastStarted', { name: subject.name }));
  ensureTicking();
}

function pauseSubject(id) {
  const subject = state.subjects.find((s) => s.id === id);
  if (!subject || !subject.running) return;
  subject.remainingSeconds = Math.max(0, Math.round((subject.endTime - Date.now()) / 1000));
  subject.running = false;
  subject.endTime = null;
  saveState();
  renderSubjects();
  showToast(t('toastPaused', { name: subject.name }));
}

function resumeSubject(id) {
  const subject = state.subjects.find((s) => s.id === id);
  if (!subject || subject.running || subject.finished) return;
  subject.running = true;
  subject.endTime = Date.now() + subject.remainingSeconds * 1000;
  saveState();
  renderSubjects();
  showToast(t('toastResumed', { name: subject.name }));
  ensureTicking();
}

function resetSubject(id) {
  const subject = state.subjects.find((s) => s.id === id);
  if (!subject) return;
  subject.running = false;
  subject.endTime = null;
  subject.finished = false;
  subject.remainingSeconds = subject.totalSeconds;
  saveState();
  renderSubjects();
  showToast(t('toastReset', { name: subject.name }));
}

function deleteSubject(id) {
  const subject = state.subjects.find((s) => s.id === id);
  if (!subject) return;
  if (!window.confirm(t('deleteConfirm', { name: subject.name }))) return;
  state.subjects = state.subjects.filter((s) => s.id !== id);
  saveState();
  renderSubjects();
  showToast(t('toastDeleted', { name: subject.name }));
}

function finishSubject(subject) {
  subject.running = false;
  subject.finished = true;
  subject.remainingSeconds = 0;
  subject.endTime = null;
  playAlarm();
  showFinishNotification(subject.name);
  showToast(`${t('toastFinishedTitle')} ${t('toastFinishedBody', { name: subject.name })}`, 'success');
}

/* --- Ticking loop: recompute remaining time for every running subject --- */
let tickHandle = null;
function ensureTicking() {
  if (tickHandle) return;
  tickHandle = setInterval(tick, 250);
}
function stopTickingIfIdle() {
  const anyRunning = state.subjects.some((s) => s.running);
  if (!anyRunning && tickHandle) {
    clearInterval(tickHandle);
    tickHandle = null;
  }
}
function tick() {
  let changed = false;
  let needsFullRender = false;
  state.subjects.forEach((subject) => {
    if (!subject.running) return;
    const remaining = Math.max(0, Math.round((subject.endTime - Date.now()) / 1000));
    if (remaining !== subject.remainingSeconds) {
      subject.remainingSeconds = remaining;
      changed = true;
    }
    if (remaining <= 0) {
      finishSubject(subject);
      needsFullRender = true;
    }
  });
  if (changed) saveState();
  if (needsFullRender) {
    renderSubjects();
  } else {
    updateRunningDials();
  }
  stopTickingIfIdle();
}

/* ---------------------------------------------------------------------
   10. RENDERING
   --------------------------------------------------------------------- */
const RING_RADIUS = 72;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function formatTime(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

function buildCardMarkup(subject) {
  const cardState = getSubjectState(subject);
  const progress = subject.totalSeconds > 0
    ? (subject.totalSeconds - subject.remainingSeconds) / subject.totalSeconds
    : 0;
  const offset = RING_CIRCUMFERENCE * (1 - progress);
  const percent = Math.round(progress * 100);

  const wrapper = document.createElement('article');
  wrapper.className = 'subject-card';
  wrapper.dataset.id = subject.id;
  wrapper.dataset.state = cardState;

  wrapper.innerHTML = `
    <button class="card-delete" data-action="delete" aria-label="${t('btnDelete')}" type="button">
      <svg viewBox="0 0 24 24" width="15" height="15"><path d="M6 7h12M9.5 7V5.2c0-.6.5-1.2 1.2-1.2h2.6c.7 0 1.2.6 1.2 1.2V7M8 7v12.3c0 .9.7 1.7 1.7 1.7h4.6c1 0 1.7-.8 1.7-1.7V7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>
    <h3 class="card-name" title="${escapeHtml(subject.name)}">${escapeHtml(subject.name)}</h3>
    <div class="dial-wrap">
      <svg viewBox="0 0 168 168">
        <circle cx="84" cy="84" r="${RING_RADIUS}" fill="none" stroke="var(--ring-track)" stroke-width="12"/>
        <circle class="dial-progress" cx="84" cy="84" r="${RING_RADIUS}" fill="none" stroke="var(--accent)" stroke-width="12"
          stroke-linecap="round" stroke-dasharray="${RING_CIRCUMFERENCE}" stroke-dashoffset="${offset}"
          transform="rotate(-90 84 84)"/>
      </svg>
      <div class="dial-center">
        <span class="dial-status" data-role="status">${t('status' + capitalize(cardState))}</span>
        <span class="dial-time" data-role="time" dir="ltr">${formatTime(subject.remainingSeconds)}</span>
        <span class="dial-percent" data-role="percent" dir="ltr">${percent}%</span>
      </div>
    </div>
    <div class="card-actions">
      <button class="btn btn-primary btn-sm" data-action="start" type="button">${t(cardState === 'finished' ? 'btnRestart' : 'btnStart')}</button>
      <button class="btn btn-primary btn-sm" data-action="pause" type="button">${t('btnPause')}</button>
      <button class="btn btn-primary btn-sm" data-action="resume" type="button">${t('btnResume')}</button>
      <button class="btn btn-ghost btn-sm" data-action="reset" type="button">${t('btnReset')}</button>
    </div>
  `;

  const [startBtn, pauseBtn, resumeBtn, resetBtn] = wrapper.querySelectorAll('.card-actions .btn');
  startBtn.classList.toggle('is-hidden', !(cardState === 'idle' || cardState === 'finished'));
  pauseBtn.classList.toggle('is-hidden', cardState !== 'running');
  resumeBtn.classList.toggle('is-hidden', cardState !== 'paused');
  resetBtn.classList.toggle('is-hidden', cardState === 'idle');

  return wrapper;
}

function capitalize(str) { return str.charAt(0).toUpperCase() + str.slice(1); }

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function renderSubjects() {
  el.cardsGrid.innerHTML = '';
  const hasSubjects = state.subjects.length > 0;
  el.emptyState.hidden = hasSubjects;
  el.cardsGrid.hidden = !hasSubjects;
  el.subjectsCount.textContent = pluralSubjects(state.subjects.length);

  state.subjects.forEach((subject) => {
    el.cardsGrid.appendChild(buildCardMarkup(subject));
  });
}

/* Cheap per-tick update: only touch the numbers/ring of running cards
   instead of rebuilding the whole grid (keeps DOM churn minimal). */
function updateRunningDials() {
  state.subjects.forEach((subject) => {
    if (!subject.running) return;
    const card = el.cardsGrid.querySelector(`.subject-card[data-id="${subject.id}"]`);
    if (!card) return;
    const progress = subject.totalSeconds > 0
      ? (subject.totalSeconds - subject.remainingSeconds) / subject.totalSeconds
      : 0;
    const offset = RING_CIRCUMFERENCE * (1 - progress);
    const percent = Math.round(progress * 100);
    card.querySelector('.dial-progress').setAttribute('stroke-dashoffset', offset);
    card.querySelector('[data-role="time"]').textContent = formatTime(subject.remainingSeconds);
    card.querySelector('[data-role="percent"]').textContent = `${percent}%`;
  });
}

/* ---------------------------------------------------------------------
   11. HERO DECORATIVE TICKS (purely cosmetic dial face)
   --------------------------------------------------------------------- */
function buildHeroTicks() {
  if (!el.heroTicks) return;
  const cx = 100, cy = 100, rOuter = 90, rInner = 82;
  let markup = '';
  for (let i = 0; i < 24; i++) {
    const angle = (i / 24) * Math.PI * 2;
    const x1 = cx + rOuter * Math.cos(angle);
    const y1 = cy + rOuter * Math.sin(angle);
    const x2 = cx + rInner * Math.cos(angle);
    const y2 = cy + rInner * Math.sin(angle);
    markup += `<line x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}" />`;
  }
  el.heroTicks.innerHTML = markup;
  const heroProgress = document.querySelector('.hero-progress');
  if (heroProgress) {
    const circumference = 2 * Math.PI * 66;
    heroProgress.setAttribute('stroke-dasharray', circumference.toFixed(1));
    heroProgress.setAttribute('stroke-dashoffset', (circumference * 0.28).toFixed(1));
  }
}

/* ---------------------------------------------------------------------
   12. MODAL
   --------------------------------------------------------------------- */
function openModal() {
  el.modalBackdrop.hidden = false;
  el.subjectForm.reset();
  el.hoursInput.value = 0;
  el.minutesInput.value = 25;
  el.nameError.textContent = '';
  el.timeError.textContent = '';
  document.body.style.overflow = 'hidden';
  setTimeout(() => el.subjectNameInput.focus(), 50);
}

function closeModal() {
  el.modalBackdrop.hidden = true;
  document.body.style.overflow = '';
}

function handleSubjectFormSubmit(evt) {
  evt.preventDefault();
  const name = el.subjectNameInput.value.trim();
  const hours = parseInt(el.hoursInput.value, 10) || 0;
  const minutes = parseInt(el.minutesInput.value, 10) || 0;
  const totalSeconds = hours * 3600 + minutes * 60;

  let valid = true;
  el.nameError.textContent = '';
  el.timeError.textContent = '';

  if (!name) {
    el.nameError.textContent = t('errorNameEmpty');
    valid = false;
  } else {
    const duplicate = state.subjects.some((s) => s.name.trim().toLowerCase() === name.toLowerCase());
    if (duplicate) {
      el.nameError.textContent = t('errorNameDuplicate');
      valid = false;
    }
  }

  if (totalSeconds <= 0) {
    el.timeError.textContent = t('errorTimeZero');
    valid = false;
  }

  if (!valid) return;

  createSubject(name, totalSeconds);
  closeModal();
}

/* ---------------------------------------------------------------------
   13. SETTINGS INTERACTIONS
   --------------------------------------------------------------------- */
function initSettingsControls() {
  document.querySelectorAll('[data-lang-option]').forEach((btn) => {
    btn.addEventListener('click', () => applyLanguage(btn.getAttribute('data-lang-option')));
  });
  document.querySelectorAll('[data-theme-option]').forEach((btn) => {
    btn.addEventListener('click', () => applyTheme(btn.getAttribute('data-theme-option')));
  });

  el.alarmToggle.checked = state.alarmEnabled;
  el.alarmToggle.addEventListener('change', () => {
    state.alarmEnabled = el.alarmToggle.checked;
    saveState();
    if (state.alarmEnabled && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  });

  el.volumeSlider.value = state.volume;
  el.volumeSlider.addEventListener('input', () => {
    state.volume = parseInt(el.volumeSlider.value, 10);
    saveState();
  });

  el.testAlarmBtn.addEventListener('click', () => {
    const wasEnabled = state.alarmEnabled;
    state.alarmEnabled = true;
    playAlarm();
    state.alarmEnabled = wasEnabled;
  });

  el.resetDataBtn.addEventListener('click', () => {
    if (!window.confirm(t('resetConfirm'))) return;
    localStorage.removeItem(STORAGE_KEY);
    state = structuredCloneShim(DEFAULT_STATE);
    applyTheme(state.theme);
    applyLanguage(state.language);
    el.alarmToggle.checked = state.alarmEnabled;
    el.volumeSlider.value = state.volume;
    renderSubjects();
    showToast(t('toastDataReset'), 'success');
    showView('home');
  });
}

/* ---------------------------------------------------------------------
   14. EVENT WIRING
   --------------------------------------------------------------------- */
function initEvents() {
  el.navHome.addEventListener('click', () => showView('home'));
  el.navSettings.addEventListener('click', () => showView('settings'));

  el.langToggleBtn.addEventListener('click', () => {
    applyLanguage(state.language === 'ar' ? 'en' : 'ar');
  });
  el.themeToggleBtn.addEventListener('click', () => {
    applyTheme(state.theme === 'dark' ? 'light' : 'dark');
  });

  el.addSubjectBtn.addEventListener('click', openModal);
  el.emptyAddBtn.addEventListener('click', openModal);
  el.modalCloseBtn.addEventListener('click', closeModal);
  el.modalCancelBtn.addEventListener('click', closeModal);
  el.modalBackdrop.addEventListener('click', (evt) => {
    if (evt.target === el.modalBackdrop) closeModal();
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && !el.modalBackdrop.hidden) closeModal();
  });
  el.subjectForm.addEventListener('submit', handleSubjectFormSubmit);

  el.cardsGrid.addEventListener('click', (evt) => {
    const btn = evt.target.closest('[data-action]');
    if (!btn) return;
    const card = evt.target.closest('.subject-card');
    const id = card && card.dataset.id;
    if (!id) return;
    const action = btn.getAttribute('data-action');
    if (action === 'start') startSubject(id);
    else if (action === 'pause') pauseSubject(id);
    else if (action === 'resume') resumeSubject(id);
    else if (action === 'reset') resetSubject(id);
    else if (action === 'delete') deleteSubject(id);
  });
}

/* ---------------------------------------------------------------------
   15. INIT
   --------------------------------------------------------------------- */
function init() {
  applyTheme(state.theme);
  el.html.setAttribute('lang', state.language);
  el.html.setAttribute('dir', state.language === 'ar' ? 'rtl' : 'ltr');
  applyTranslations();
  buildHeroTicks();
  renderSubjects();
  initEvents();
  initSettingsControls();

  if (state.subjects.some((s) => s.running)) ensureTicking();
  // Catch up any timers that finished while the tab was closed.
  let anyFinishedOffline = false;
  state.subjects.forEach((subject) => {
    if (subject.running && subject.endTime <= Date.now()) {
      subject.remainingSeconds = 0;
      subject.running = false;
      subject.finished = true;
      subject.endTime = null;
      anyFinishedOffline = true;
    }
  });
  if (anyFinishedOffline) {
    saveState();
    renderSubjects();
  }
}

document.addEventListener('DOMContentLoaded', init);
