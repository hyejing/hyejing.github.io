let calendar;
let currentFilter = null;

// ===== 다크모드 기능 =====
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

initTheme();

// ===== 스케줄 데이터 =====
const events = [
    // ===== 5월 스케줄 =====
    // 박세미 - 정희
    { title: '연극 정희', actor: '박세미', start: '2026-05-02', time: '15:00', color: '#9B7BB8', memo: '' },
    { title: '연극 정희', actor: '박세미', start: '2026-05-10', time: '14:00', color: '#9B7BB8', memo: '' },

    // 박세미 - 나의 별
    { title: '연극 나의 별', actor: '박세미', start: '2026-05-03', time: '14:00', color: '#9B7BB8', memo: '' },
    { title: '연극 나의 별', actor: '박세미', start: '2026-05-03', time: '18:00', color: '#9B7BB8', memo: '' },
    { title: '연극 나의 별', actor: '박세미', start: '2026-05-10', time: '18:00', color: '#9B7BB8', memo: '' },
    { title: '연극 나의 별', actor: '박세미', start: '2026-05-13', time: '20:00', color: '#9B7BB8', memo: '' },
    { title: '연극 나의 별', actor: '박세미', start: '2026-05-16', time: '15:00', color: '#9B7BB8', memo: '' },
    { title: '연극 나의 별', actor: '박세미', start: '2026-05-16', time: '19:00', color: '#9B7BB8', memo: '' },
    { title: '연극 나의 별', actor: '박세미', start: '2026-05-17', time: '14:00', color: '#9B7BB8', memo: '' },
    { title: '연극 나의 별', actor: '박세미', start: '2026-05-17', time: '18:00', color: '#9B7BB8', memo: '' },
    { title: '연극 나의 별', actor: '박세미', start: '2026-05-21', time: '20:00', color: '#9B7BB8', memo: '' },
    { title: '연극 나의 별', actor: '박세미', start: '2026-05-23', time: '19:00', color: '#9B7BB8', memo: '' },
    { title: '연극 나의 별', actor: '박세미', start: '2026-05-24', time: '14:00', color: '#9B7BB8', memo: '' },
    { title: '연극 나의 별', actor: '박세미', start: '2026-05-25', time: '18:00', color: '#9B7BB8', memo: '' },
    { title: '연극 나의 별', actor: '박세미', start: '2026-05-26', time: '20:00', color: '#9B7BB8', memo: '' },
    { title: '연극 나의 별', actor: '박세미', start: '2026-05-28', time: '20:00', color: '#9B7BB8', memo: '' },
    { title: '연극 나의 별', actor: '박세미', start: '2026-05-29', time: '20:00', color: '#9B7BB8', memo: '' },
    { title: '연극 나의 별', actor: '박세미', start: '2026-05-30', time: '19:00', color: '#9B7BB8', memo: '' },
    { title: '연극 나의 별', actor: '박세미', start: '2026-05-31', time: '18:00', color: '#9B7BB8', memo: '' },

    // 밀양강오딧세이 (박세미 & 전하영)
    { title: '밀양강오딧세이', actor: '박세미', start: '2026-05-07', time: '20:00', color: '#9B7BB8', memo: '' },
    { title: '밀양강오딧세이', actor: '박세미', start: '2026-05-08', time: '20:00', color: '#9B7BB8', memo: '' },
    { title: '밀양강오딧세이', actor: '박세미', start: '2026-05-09', time: '20:00', color: '#9B7BB8', memo: '' },
    { title: '밀양강오딧세이', actor: '전하영', start: '2026-05-07', time: '20:00', color: '#5E9EA0', memo: '' },
    { title: '밀양강오딧세이', actor: '전하영', start: '2026-05-08', time: '20:00', color: '#5E9EA0', memo: '' },
    { title: '밀양강오딧세이', actor: '전하영', start: '2026-05-09', time: '20:00', color: '#5E9EA0', memo: '' },

    // 전하영 - 나의 별
    { title: '연극 나의 별', actor: '전하영', start: '2026-05-02', time: '15:00', color: '#5E9EA0', memo: '' },
    { title: '연극 나의 별', actor: '전하영', start: '2026-05-02', time: '17:00', color: '#5E9EA0', memo: '' },
    { title: '연극 나의 별', actor: '전하영', start: '2026-05-10', time: '14:00', color: '#5E9EA0', memo: '' },
    { title: '연극 나의 별', actor: '전하영', start: '2026-05-10', time: '18:00', color: '#5E9EA0', memo: '' },
    { title: '연극 나의 별', actor: '전하영', start: '2026-05-12', time: '20:00', color: '#5E9EA0', memo: '' },
    { title: '연극 나의 별', actor: '전하영', start: '2026-05-13', time: '20:00', color: '#5E9EA0', memo: '' },
    { title: '연극 나의 별', actor: '전하영', start: '2026-05-15', time: '20:00', color: '#5E9EA0', memo: '' },
    { title: '연극 나의 별', actor: '전하영', start: '2026-05-16', time: '15:00', color: '#5E9EA0', memo: '' },
    { title: '연극 나의 별', actor: '전하영', start: '2026-05-16', time: '19:00', color: '#5E9EA0', memo: '' },
    { title: '연극 나의 별', actor: '전하영', start: '2026-05-20', time: '20:00', color: '#5E9EA0', memo: '' },
    { title: '연극 나의 별', actor: '전하영', start: '2026-05-21', time: '20:00', color: '#5E9EA0', memo: '' },
    { title: '연극 나의 별', actor: '전하영', start: '2026-05-23', time: '15:00', color: '#5E9EA0', memo: '' },
    { title: '연극 나의 별', actor: '전하영', start: '2026-05-23', time: '19:00', color: '#5E9EA0', memo: '' },
    { title: '연극 나의 별', actor: '전하영', start: '2026-05-25', time: '12:00', color: '#5E9EA0', memo: '' },
    { title: '연극 나의 별', actor: '전하영', start: '2026-05-25', time: '18:00', color: '#5E9EA0', memo: '' },
    { title: '연극 나의 별', actor: '전하영', start: '2026-05-27', time: '20:00', color: '#5E9EA0', memo: '' },
    { title: '연극 나의 별', actor: '전하영', start: '2026-05-28', time: '20:00', color: '#5E9EA0', memo: '' },

    // 전하영 - 접변 (낭독공연)
    { title: '접변', actor: '전하영', start: '2026-05-29', time: '19:00', color: '#5E9EA0', memo: '낭독공연' },
    { title: '접변', actor: '전하영', start: '2026-05-30', time: '14:00', color: '#5E9EA0', memo: '낭독공연' },

    // 박규리 - 5월
    { title: 'HAPPY G-DAY', actor: '박규리', start: '2026-05-16', time: '14:00', color: '#D4896A', memo: '생일팬미팅' },
    { title: 'HAPPY G-DAY', actor: '박규리', start: '2026-05-16', time: '19:00', color: '#D4896A', memo: '생일팬미팅' },
    { title: '연세여 사랑한다', actor: '박규리', start: '2026-05-17', time: '', color: '#D4896A', memo: '2026 연세여 사랑한다' },
    { title: '박규리 생일', actor: '박규리', start: '2026-05-21', time: '', color: '#D4896A', memo: '', type: 'birthday' },

    // ===== 6월 스케줄 - 나의 별 =====
    // 박세미
    { title: '연극 나의 별', actor: '박세미', start: '2026-06-02', time: '20:00', color: '#9B7BB8', memo: '' },
    { title: '연극 나의 별', actor: '박세미', start: '2026-06-04', time: '20:00', color: '#9B7BB8', memo: '' },
    { title: '연극 나의 별', actor: '박세미', start: '2026-06-07', time: '14:00', color: '#9B7BB8', memo: '' },
    { title: '연극 나의 별', actor: '박세미', start: '2026-06-07', time: '18:00', color: '#9B7BB8', memo: '' },
    { title: '연극 나의 별', actor: '박세미', start: '2026-06-09', time: '20:00', color: '#9B7BB8', memo: '' },
    { title: '연극 나의 별', actor: '박세미', start: '2026-06-11', time: '20:00', color: '#9B7BB8', memo: '' },
    { title: '연극 나의 별', actor: '박세미', start: '2026-06-12', time: '20:00', color: '#9B7BB8', memo: '' },
    { title: '연극 나의 별', actor: '박세미', start: '2026-06-14', time: '14:00', color: '#9B7BB8', memo: '' },
    { title: '연극 나의 별', actor: '박세미', start: '2026-06-14', time: '18:00', color: '#9B7BB8', memo: '' },
    { title: '연극 나의 별', actor: '박세미', start: '2026-06-17', time: '20:00', color: '#9B7BB8', memo: '' },
    { title: '연극 나의 별', actor: '박세미', start: '2026-06-18', time: '20:00', color: '#9B7BB8', memo: '' },
    { title: '연극 나의 별', actor: '박세미', start: '2026-06-20', time: '15:00', color: '#9B7BB8', memo: '' },
    { title: '연극 나의 별', actor: '박세미', start: '2026-06-20', time: '19:00', color: '#9B7BB8', memo: '' },
    { title: '연극 나의 별', actor: '박세미', start: '2026-06-21', time: '18:00', color: '#9B7BB8', memo: '' },
    { title: '연극 나의 별', actor: '박세미', start: '2026-06-23', time: '20:00', color: '#9B7BB8', memo: '' },
    { title: '연극 나의 별', actor: '박세미', start: '2026-06-24', time: '20:00', color: '#9B7BB8', memo: '' },
    { title: '연극 나의 별', actor: '박세미', start: '2026-06-26', time: '20:00', color: '#9B7BB8', memo: '' },
    { title: '연극 나의 별', actor: '박세미', start: '2026-06-27', time: '15:00', color: '#9B7BB8', memo: '' },
    { title: '연극 나의 별', actor: '박세미', start: '2026-06-27', time: '19:00', color: '#9B7BB8', memo: '' },
    { title: '연극 나의 별', actor: '박세미', start: '2026-06-30', time: '20:00', color: '#9B7BB8', memo: '' },

    // 전하영
    { title: '연극 나의 별', actor: '전하영', start: '2026-06-02', time: '20:00', color: '#5E9EA0', memo: '' },
    { title: '연극 나의 별', actor: '전하영', start: '2026-06-03', time: '14:00', color: '#5E9EA0', memo: '' },
    { title: '연극 나의 별', actor: '전하영', start: '2026-06-04', time: '20:00', color: '#5E9EA0', memo: '' },
    { title: '연극 나의 별', actor: '전하영', start: '2026-06-05', time: '20:00', color: '#5E9EA0', memo: '' },
    { title: '연극 나의 별', actor: '전하영', start: '2026-06-06', time: '19:00', color: '#5E9EA0', memo: '' },
    { title: '연극 나의 별', actor: '전하영', start: '2026-06-10', time: '20:00', color: '#5E9EA0', memo: '' },
    { title: '연극 나의 별', actor: '전하영', start: '2026-06-13', time: '15:00', color: '#5E9EA0', memo: '' },
    { title: '연극 나의 별', actor: '전하영', start: '2026-06-14', time: '14:00', color: '#5E9EA0', memo: '' },
    { title: '연극 나의 별', actor: '전하영', start: '2026-06-14', time: '18:00', color: '#5E9EA0', memo: '' },
    { title: '연극 나의 별', actor: '전하영', start: '2026-06-16', time: '20:00', color: '#5E9EA0', memo: '' },
    { title: '연극 나의 별', actor: '전하영', start: '2026-06-18', time: '20:00', color: '#5E9EA0', memo: '' },
    { title: '연극 나의 별', actor: '전하영', start: '2026-06-19', time: '20:00', color: '#5E9EA0', memo: '' },
    { title: '연극 나의 별', actor: '전하영', start: '2026-06-21', time: '18:00', color: '#5E9EA0', memo: '' },
    { title: '연극 나의 별', actor: '전하영', start: '2026-06-22', time: '20:00', color: '#5E9EA0', memo: '' },
    { title: '연극 나의 별', actor: '전하영', start: '2026-06-24', time: '20:00', color: '#5E9EA0', memo: '' },
    { title: '연극 나의 별', actor: '전하영', start: '2026-06-26', time: '20:00', color: '#5E9EA0', memo: '' },
    { title: '연극 나의 별', actor: '전하영', start: '2026-06-28', time: '14:00', color: '#5E9EA0', memo: '' },
    { title: '연극 나의 별', actor: '전하영', start: '2026-06-28', time: '18:00', color: '#5E9EA0', memo: '' },

    // 박규리 - 던터치
    { title: '뮤지컬 던터치', actor: '박규리', start: '2026-06-19', time: '19:30', color: '#D4896A', memo: '' },
    { title: '뮤지컬 던터치', actor: '박규리', start: '2026-06-21', time: '18:00', color: '#D4896A', memo: '' },
    { title: '뮤지컬 던터치', actor: '박규리', start: '2026-06-22', time: '19:30', color: '#D4896A', memo: '' },
    { title: '뮤지컬 던터치', actor: '박규리', start: '2026-06-24', time: '19:30', color: '#D4896A', memo: '' },

    // ===== 7월 스케줄 =====
    // 박규리 - 던터치
    { title: '뮤지컬 던터치', actor: '박규리', start: '2026-07-03', time: '19:30', color: '#D4896A', memo: '' },
    { title: '뮤지컬 던터치', actor: '박규리', start: '2026-07-05', time: '14:00', color: '#D4896A', memo: '' },

    // 박세미 - 나의 별
    { title: '연극 나의 별', actor: '박세미', start: '2026-07-02', time: '20:00', color: '#9B7BB8', memo: '' },
    { title: '연극 나의 별', actor: '박세미', start: '2026-07-04', time: '15:00', color: '#9B7BB8', memo: '' },
    { title: '연극 나의 별', actor: '박세미', start: '2026-07-04', time: '19:00', color: '#9B7BB8', memo: '막공' },

    // 전하영 - 나의 별
    { title: '연극 나의 별', actor: '전하영', start: '2026-07-01', time: '20:00', color: '#5E9EA0', memo: '' },
    { title: '연극 나의 별', actor: '전하영', start: '2026-07-03', time: '20:00', color: '#5E9EA0', memo: '' },
    { title: '연극 나의 별', actor: '전하영', start: '2026-07-04', time: '15:00', color: '#5E9EA0', memo: '' },
    { title: '연극 나의 별', actor: '전하영', start: '2026-07-04', time: '19:00', color: '#5E9EA0', memo: '막공' },

    // ===== 8월 스케줄 =====
    // 박규리 - 카라
    { title: '카라 홍콩팬미팅', actor: '박규리', start: '2026-08-08', time: '17:00', color: '#D4896A', memo: '' },
    { title: '카라 대만팬미팅', actor: '박규리', start: '2026-08-22', time: '18:00', color: '#D4896A', memo: '' },

];

// ===== 캘린더 초기화 =====
document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');

    calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: false,
        initialView: 'dayGridMonth',
        initialDate: new Date(),
        locale: 'ko',
        events: getCalendarEvents(),
        height: 'auto',
        dayMaxEvents: false,
        eventDisplay: 'block',
        fixedWeekCount: false,
        showNonCurrentDates: false,

        // 시간순 정렬
        eventOrder: function(a, b) {
            const timeA = a.extendedProps.time || '';
            const timeB = b.extendedProps.time || '';
            return timeA.localeCompare(timeB);
        },

        eventContent: function(arg) {
            const time = arg.event.extendedProps.time || '';
            const title = arg.event.title;
            const colors = arg.event.extendedProps.colors || [arg.event.backgroundColor];
            const isBirthday = arg.event.extendedProps.isBirthday;
            const isMobile = window.innerWidth <= 600;

            let eventEl = document.createElement('div');

            // 생일 이벤트
            if (isBirthday) {
                eventEl.style.background = '#E8B4B8';
                eventEl.style.padding = isMobile ? '2px 4px' : '3px 6px';
                eventEl.style.borderRadius = '4px';
                eventEl.style.color = 'white';
                eventEl.style.fontSize = isMobile ? '8px' : '11px';
                eventEl.style.fontWeight = '500';
                eventEl.style.textAlign = 'center';
                eventEl.innerText = isMobile ? '🎂' : '🎂 Birthday';
                return { domNodes: [eventEl] };
            }

            // 2명 이상이면 그라데이션
            if (colors.length >= 2) {
                eventEl.style.background = `linear-gradient(90deg, ${colors[0]} 50%, ${colors[1]} 50%)`;
            } else {
                eventEl.style.background = colors[0];
            }

            eventEl.style.padding = isMobile ? '2px 3px' : '3px 6px';
            eventEl.style.borderRadius = '4px';
            eventEl.style.color = 'white';
            eventEl.style.fontSize = isMobile ? '8px' : '11px';
            eventEl.style.fontWeight = '500';
            eventEl.style.overflow = 'hidden';
            eventEl.style.textOverflow = 'ellipsis';
            eventEl.style.whiteSpace = 'nowrap';

            // 제목 축약 (연극/뮤지컬 접두어 제거)
            const shortTitle = title.replace('연극 ', '').replace('뮤지컬 ', '');

            if (isMobile) {
                eventEl.innerText = shortTitle;
            } else {
                eventEl.innerText = time ? `${time} ${shortTitle}` : shortTitle;
            }

            return { domNodes: [eventEl] };
        },

        dateClick: function(info) {
            const clickedDate = info.dateStr;
            const dayEvents = events.filter(event => event.start === clickedDate);

            if (dayEvents.length > 0) {
                showEventModal(clickedDate, dayEvents);
            }
        },

        eventClick: function(info) {
            const clickedDate = info.event.startStr;
            const dayEvents = events.filter(event => event.start === clickedDate);

            if (dayEvents.length > 0) {
                showEventModal(clickedDate, dayEvents);
            }
        },

        datesSet: function(info) {
            updateMonthTitle(info.view.currentStart);
        }
    });

    calendar.render();
    updateMonthTitle(calendar.view.currentStart);
    updateFilterList();

    // 네비게이션 버튼
    document.getElementById('prevBtn').addEventListener('click', function() {
        animateCalendarTransition(() => calendar.prev());
    });

    document.getElementById('nextBtn').addEventListener('click', function() {
        animateCalendarTransition(() => calendar.next());
    });

    document.getElementById('todayBtn').addEventListener('click', function() {
        animateCalendarTransition(() => calendar.gotoDate(new Date()));
    });
});

function getCalendarEvents() {
    let filtered = events;
    if (currentFilter) {
        filtered = events.filter(e => e.actor === currentFilter);
    }

    // 같은 날짜+시간+공연을 그룹화
    const grouped = {};
    filtered.forEach(event => {
        const key = `${event.start}_${event.time}_${event.title}`;
        if (!grouped[key]) {
            grouped[key] = {
                title: event.title,
                start: event.start,
                time: event.time,
                actors: [],
                colors: [],
                memos: [],
                isBirthday: false
            };
        }
        if (!grouped[key].actors.includes(event.actor)) {
            grouped[key].actors.push(event.actor);
            grouped[key].colors.push(event.color);
        }
        if (event.memo) grouped[key].memos.push(event.memo);
        if (event.type === 'birthday') grouped[key].isBirthday = true;
    });

    // 시간순 정렬
    const sortedGroups = Object.values(grouped).sort((a, b) => {
        if (a.start !== b.start) return a.start.localeCompare(b.start);
        return (a.time || '').localeCompare(b.time || '');
    });

    return sortedGroups.map(group => ({
        title: group.title,
        start: group.start,
        backgroundColor: group.colors[0] || '#D4896A',
        borderColor: group.colors[0] || '#D4896A',
        extendedProps: {
            time: group.time,
            actors: group.actors,
            colors: group.colors,
            memos: group.memos,
            isBirthday: group.isBirthday
        }
    }));
}

function refreshCalendar() {
    calendar.removeAllEvents();
    calendar.addEventSource(getCalendarEvents());
    updateFilterList();
}

// ===== 월 이동 애니메이션 =====
function animateCalendarTransition(callback) {
    const container = document.querySelector('.calendar-container');
    container.classList.add('calendar-transitioning');

    setTimeout(() => {
        callback();
        container.classList.remove('calendar-transitioning');
    }, 150);
}

function updateMonthTitle(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    document.getElementById('monthTitle').textContent = year + '년 ' + month + '월';
}

// ===== 필터 기능 (배우 기준) =====
const ACTOR_HEARTS = {
    '박규리': '🧡',
    '박세미': '💜',
    '전하영': '💚'
};

function updateFilterList() {
    const filterList = document.getElementById('filterList');
    const actorCounts = {};

    events.forEach(event => {
        if (event.actor) {
            if (!actorCounts[event.actor]) {
                actorCounts[event.actor] = 0;
            }
            actorCounts[event.actor]++;
        }
    });

    filterList.innerHTML = '';

    // 박규리를 제일 위로 정렬
    const sortedActors = Object.keys(actorCounts).sort((a, b) => {
        if (a === '박규리') return -1;
        if (b === '박규리') return 1;
        return a.localeCompare(b);
    });

    sortedActors.forEach(actor => {
        const item = document.createElement('div');
        item.className = 'filter-item' + (currentFilter === actor ? ' active' : '');
        const heart = ACTOR_HEARTS[actor] || '❤️';
        item.innerHTML = `
            <span class="filter-heart">${heart}</span>
            <span class="filter-count">${actorCounts[actor]}</span>
        `;
        item.addEventListener('click', () => {
            if (currentFilter === actor) {
                resetFilter();
            } else {
                currentFilter = actor;
                refreshCalendar();
            }
        });
        filterList.appendChild(item);
    });
}

function resetFilter() {
    currentFilter = null;
    refreshCalendar();
}

// ===== 이벤트 상세 모달 (읽기 전용) =====
function showEventModal(date, dayEvents) {
    const modal = document.getElementById('eventModal');
    const modalDate = document.getElementById('modalDate');
    const eventList = document.getElementById('eventList');

    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const dayName = dayNames[dateObj.getDay()];

    modalDate.textContent = `${year}.${month}.${day}(${dayName})`;

    // 같은 공연+시간 그룹화
    const grouped = {};
    dayEvents.forEach(event => {
        const key = `${event.time}_${event.title}`;
        if (!grouped[key]) {
            grouped[key] = {
                title: event.title,
                time: event.time,
                actors: [],
                colors: [],
                memos: []
            };
        }
        if (event.actor && !grouped[key].actors.includes(event.actor)) {
            grouped[key].actors.push(event.actor);
            grouped[key].colors.push(event.color);
        }
        if (event.memo && !grouped[key].memos.includes(event.memo)) {
            grouped[key].memos.push(event.memo);
        }
    });

    // 시간순 정렬
    const sortedGroups = Object.values(grouped).sort((a, b) => {
        return (a.time || '').localeCompare(b.time || '');
    });

    eventList.innerHTML = '';
    sortedGroups.forEach(group => {
        const listItem = document.createElement('li');
        listItem.className = 'event-item';

        // 색상 점들
        let colorDots = group.colors.map(color =>
            `<span class="event-color-dot" style="background: ${color};"></span>`
        ).join('');

        // 제목 축약
        const shortTitle = group.title.replace('연극 ', '').replace('뮤지컬 ', '');

        let html = `
            <div class="event-header">
                ${colorDots}
                <span class="event-time">${group.time || '시간 미정'}</span>
            </div>
            <div class="event-title">${shortTitle}</div>
        `;

        if (group.actors.length > 0) {
            html += `<div class="event-actor">${group.actors.join(', ')}</div>`;
        }

        if (group.memos.length > 0) {
            html += `<div class="event-memo">${group.memos.join(' / ')}</div>`;
        }

        listItem.innerHTML = html;
        eventList.appendChild(listItem);
    });

    modal.style.display = 'block';
    requestAnimationFrame(() => {
        modal.classList.add('show');
    });
}

function closeEventModal() {
    const modal = document.getElementById('eventModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// ===== 모달 외부 클릭시 닫기 =====
window.onclick = function(event) {
    const eventModal = document.getElementById('eventModal');
    if (event.target === eventModal) {
        closeEventModal();
    }
};

// ESC 키로 모달 닫기
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeEventModal();
    }
});
