import applewatch from '../../images/achievements/applewatch.png';
import celebration from '../../images/achievements/celebration.png';
import clock from '../../images/achievements/clock.png';
import compass from '../../images/achievements/compass.png';
import fear from '../../images/achievements/fear.png';
import gear from '../../images/achievements/gear.png';
import hourglass from '../../images/achievements/hourglass.png';
import loudspeaker from '../../images/achievements/loudspeaker.png';
import monocle from '../../images/achievements/monocle.png';
import news from '../../images/achievements/news.png';
import oldman from '../../images/achievements/oldman.png';
import sloth from '../../images/achievements/sloth.png';
import stareyes from '../../images/achievements/stareyes.png';
import stopwatch from '../../images/achievements/stopwatch.png';
import student from '../../images/achievements/student.png';
import thumbsup from '../../images/achievements/thumbsup.png';

const Achievements = [
    {
        id: 1,
        name: 'Олдфаг',
        img: oldman,
        description: 'Быть пользователем со времен бота',
    },
    {
        id: 2,
        name: 'Студент',
        img: student,
        description: 'Зарегистрироваться в сервисе',
    },
    {
        id: 3,
        name: 'Чтец',
        img: news,
        description: 'Почитать новости в соответствующем разделе',
    },
    {
        id: 4,
        name: 'Отсчет пошел',
        img: hourglass,
        description: 'Создать первый дедлайн',
    },
    {
        id: 5,
        name: 'Успеть за 24 часа',
        img: stopwatch,
        description: 'Завершить первый дедлайн',
    },
    {
        id: 6,
        name: 'Давай не сегодня?',
        img: sloth,
        description: 'Создать дедлайн, а потом удалить его',
    },
    {
        id: 7,
        name: 'Дедлайн был вчера',
        img: fear,
        description: 'Не уложиться в сроки дедлайна',
    },
    {
        id: 8,
        name: 'Держать руку на пульсе',
        img: celebration,
        description: 'Включить realtime в расписании',
    },
    {
        id: 9,
        name: 'Знаток',
        img: monocle,
        description: 'Изучить справочник вдоль и поперек',
    },
    {
        id: 10,
        name: 'Контролировать каждый аспект',
        img: gear,
        description: 'Настроить сервис под себя',
    },
    {
        id: 11,
        name: 'Как свои пять пальцев',
        img: compass,
        description: 'Изучить все пять вкладок сервиса',
    },
    {
        id: 12,
        name: 'Лайк, подписка, колокольчик',
        img: thumbsup,
        description: 'Подписаться на группу сервиса',
    },
    {
        id: 13,
        name: 'Промоутер',
        img: loudspeaker,
        description: 'Рассказать о сервисе ВКонтакте',
    },
    {
        id: 14,
        name: 'Уверенный пользователь',
        img: clock,
        description: 'Заходить в сервис ежедневно в течение недели',
    },
    {
        id: 15,
        name: 'Опытный пользователь',
        img: applewatch,
        description: 'Заходить в сервис ежедневно в течение месяца',
    },
    {
        id: 16,
        name: 'Коллекционер',
        img: stareyes,
        description: 'Открыть все достижения',
    },
]

export {Achievements}