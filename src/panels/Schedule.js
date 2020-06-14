import React from "react";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import bridge from '@vkontakte/vk-bridge'
import HorizontalScroll from "@vkontakte/vkui/dist/components/HorizontalScroll/HorizontalScroll";
import View from "@vkontakte/vkui/dist/components/View/View";
import ModalPageHeader from "@vkontakte/vkui/dist/components/ModalPageHeader/ModalPageHeader";
import HeaderButton from "@vkontakte/vkui/dist/components/HeaderButton/HeaderButton";
import PocketCell from "../components/PocketCell/PocketCell";
import Search from "@vkontakte/vkui/dist/components/Search/Search";
import FixedLayout from "@vkontakte/vkui/dist/components/FixedLayout/FixedLayout";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import Placeholder from "@vkontakte/vkui/dist/components/Placeholder/Placeholder";
import SelectMimicry from "@vkontakte/vkui/dist/components/SelectMimicry/SelectMimicry";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import ModalRoot from "@vkontakte/vkui/dist/components/ModalRoot/ModalRoot";
import ModalPage from "@vkontakte/vkui/dist/components/ModalPage/ModalPage";
import Snackbar from "@vkontakte/vkui/dist/components/Snackbar/Snackbar";
import PullToRefresh from "@vkontakte/vkui/dist/components/PullToRefresh/PullToRefresh";
import Spinner from "@vkontakte/vkui/dist/components/Spinner/Spinner";
import PocketButton from "../components/PocketButton/PocketButton";
import PocketDiv from "../components/PocketDiv/PocketDiv";
import PocketDay from "../components/PocketDay/PocketDay";
import PocketBanner from "../components/PocketBanner/PocketBanner";

import moment from "moment";
import "moment/locale/ru";

import Icon24Dismiss from "@vkontakte/icons/dist/24/dismiss";
import Icon24Filter from "@vkontakte/icons/dist/24/filter";
import Icon28CheckCircleOutline from '@vkontakte/icons/dist/28/check_circle_outline';
import Icon28CancelCircleOutline from '@vkontakte/icons/dist/28/cancel_circle_outline';
import Icon28Search from '@vkontakte/icons/dist/28/search';
import Icon56EventOutline from "@vkontakte/icons/dist/56/event_outline";
import Icon56DoNotDisturbOutline from '@vkontakte/icons/dist/56/do_not_disturb_outline';

const Days = [
    {id: 1, shortName: "Пн", fullName: "Понедельник"},
    {id: 2, shortName: "Вт", fullName: "Вторник"},
    {id: 3, shortName: "Ср", fullName: "Среда"},
    {id: 4, shortName: "Чт", fullName: "Четверг"},
    {id: 5, shortName: "Пт", fullName: "Пятница"},
    {id: 6, shortName: "Сб", fullName: "Суббота"},
    {id: 7, shortName: "Вс", fullName: "Воскресенье"},
    {id: 0, shortName: "Вне сетки", fullName: "Вне сетки"},
];

const Times = [
    {id: 1, beginTime: "9:00", endTime: "10:30"},
    {id: 2, beginTime: "10:40", endTime: "12:10"},
    {id: 3, beginTime: "12:20", endTime: "13:50"},
    {id: 4, beginTime: "14:10", endTime: "15:40"},
    {id: 5, beginTime: "15:50", endTime: "17:20"},
    {id: 6, beginTime: "17:30", endTime: "19:00"},
    {id: 7, beginTime: "19:10", endTime: "20:30"},
    {id: 8, beginTime: "20:40", endTime: "22:00"},
];

class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePanel: props.activePanel,
            groups: props.groups,
            teachers: props.teachers,
            settings: props.settings,
            uId: localStorage.getItem('id') || props.uId,
            name: localStorage.getItem('name') || props.name,
            type: parseInt(localStorage.getItem('type')) || props.type,
            day: parseInt(sessionStorage.getItem('scheduleDay')) || moment().isoWeekday(),
            even: JSON.parse(sessionStorage.getItem('week')) || !props.settings.IsWeekOdd,
            shouldUpdate: false,
            snackbar: null,
            search: '',
            popout: null,
            modalHistory: [],
            activeModal: null,
            header: localStorage.getItem('header') || props.name,
            schedule: JSON.parse(localStorage.getItem('schedule')) || props.schedule,
            lesson: null,
            visible: JSON.parse(localStorage.getItem('scheduleBanner')) !== null ? JSON.parse(localStorage.getItem('scheduleBanner')) : true,
            deadlines: JSON.parse(localStorage.getItem('deadlines')) || props.deadlines,
            updating: false,
            loading: false,
            animations: JSON.parse(localStorage.getItem('animations')) || props.animations,
        };
        this.modalBack = () => {
            this.setActiveModal(
                this.state.modalHistory[this.state.modalHistory.length - 2]
            );
        };
        this.onRefresh = () => {
            this.loadSchedule(this.state.uId, this.state.type, false);
        };
        this.loadSchedule = this.loadSchedule.bind(this);
        this.searchChange = this.searchChange.bind(this);
        this.isExists = this.isExists.bind(this);
        this.lessonDeadlines = this.lessonDeadlines.bind(this);
        this.snackbarRender = this.snackbarRender.bind(this);
    }

    snackbarRender(text, mode) {
        if (mode === 1) {
            this.props.platform === 'ios' && bridge.send("VKWebAppTapticNotificationOccurred", {"type": "success"});
            this.setState({
                snackbar: (
                    <Snackbar
                        onClose={() => this.setState({snackbar: null})}
                        before={
                            <div>
                                <Icon28CheckCircleOutline width={20} height={20} fill="var(--pocket_dark_blue)"/>
                            </div>
                        }
                    >
                        <div className="snakbarText">
                            {text}
                        </div>
                    </Snackbar>
                ),
            })
        } else {
            this.props.platform === 'ios' && bridge.send("VKWebAppTapticNotificationOccurred", {"type": "error"});
            this.setState({
                snackbar: (
                    <Snackbar
                        onClose={() => this.setState({snackbar: null})}
                        before={
                            <div>
                                <Icon28CancelCircleOutline width={20} height={20} fill="var(--pocket_error)"/>
                            </div>
                        }
                    >
                        <div className="snakbarText">
                            {text}
                        </div>
                    </Snackbar>
                ),
            })
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        if (this.isExists(this.state.day)) {
            if (this.props.platform !== 'ios') {
                document.getElementById("day" + this.state.day).scrollIntoView({inline: "center"})
            }
            window.scrollTo(0, 0);
        }
    }

    loadSchedule(id, type, loader = true) {
        this.setState({updating: true, loading: loader});
        if (!window.navigator.onLine) {
            this.setState({
                updating: false,
                loading: false
            });
            this.snackbarRender('Отсутствует подключение к интернету!', 2)
        }
    }

    setActiveModal = activeModal => {
        activeModal = activeModal || null;
        let modalHistory = this.state.modalHistory
            ? [...this.state.modalHistory]
            : [];
        if (activeModal === null) {
            modalHistory = [];
        } else if (modalHistory.indexOf(activeModal) !== -1) {
            modalHistory = modalHistory.splice(
                0,
                modalHistory.indexOf(activeModal) + 1
            );
        } else {
            modalHistory.push(activeModal);
        }
        this.setState({
            activeModal,
            modalHistory
        });
    };

    searchChange(search) {
        this.setState({search});
    };

    get groups() {
        const search = this.state.search.toLowerCase().trim();
        return this.state.groups.filter(({Name}) => Name.toLowerCase().indexOf(search) > -1);
    }

    get teachers() {
        const search = this.state.search.toLowerCase().trim();
        return this.state.teachers.filter(({Name}) => Name.toLowerCase().indexOf(search) > -1);
    }

    getDate(dayindex) {
        return Days.find(day => day.id === dayindex).fullName + (this.state.even ? ", четная неделя" : ", нечетная неделя");
    }

    isExists(index) {
        return ((this.state.schedule.findIndex(x => x.Day === index && ((x.Week === (this.state.even ? 2 : 1)) || (x.Week === 0)))) !== -1);
    }

    headerRender() {
        return (
            <div>
                <PanelHeader
                    noShadow
                    left={
                        <HeaderButton
                            onClick={() => {
                                this.setState({shouldUpdate: false});
                                this.setActiveModal("filter");
                            }}
                        >
                            <Icon24Filter fill="var(--pocket_gray)"/>
                        </HeaderButton>
                    }
                >
                    {
                        <div className="header panel">
                            {this.state.header}
                        </div>
                    }
                </PanelHeader>
                <FixedLayout vertical="top">
                    <div
                        className="row"
                        style={{background: "var(--header_background)"}}
                    >
                        <PocketButton
                            selected
                            red={!this.state.even}
                            clickable={this.state.animations === 1}
                            onClick={() => {
                                this.setState({even: !this.state.even});
                                sessionStorage.setItem('week', !this.state.even);
                                this.props.platform === 'ios' && bridge.send("VKWebAppTapticImpactOccurred", {"style": "light"});
                            }}
                        >
                            {this.state.even ? "Четная" : "Нечетная"}
                        </PocketButton>
                        <HorizontalScroll>
                            <div style={{display: "flex"}}>
                                {Days.map(Day => (
                                    this.isExists(Day.id) &&
                                    <div
                                        key={Day.id}
                                        style={{paddingRight: Day.id === 0 ? 12 : 0}}
                                    >
                                        <PocketButton
                                            id={"day" + Day.id}
                                            key={Day.id}
                                            selected={this.state.day === Day.id}
                                            clickable={this.state.animations === 1}
                                            onClick={() => {
                                                this.setState({day: Day.id});
                                                sessionStorage.setItem('scheduleDay', Day.id);
                                                window.scrollTo(0, 0);
                                                if (this.props.platform !== 'ios') {
                                                    document.getElementById("day" + Day.id).scrollIntoView({
                                                        inline: "center",
                                                        behavior: "smooth"
                                                    })
                                                }
                                                this.props.platform === 'ios' && bridge.send("VKWebAppTapticImpactOccurred", {"style": "light"});
                                            }}
                                        >
                                            {Day.shortName}
                                        </PocketButton>
                                    </div>
                                ))}
                            </div>
                        </HorizontalScroll>
                    </div>
                </FixedLayout>
            </div>
        );
    }

    dateRender() {
        return (
            <div className="row" style={{paddingLeft: 12, paddingRight: 12}}>
                <div className="date default">{this.getDate(this.state.day)}</div>
                {(this.state.day !== moment().isoWeekday() || this.state.even !== !this.props.settings.IsWeekOdd) &&
                <div className="date selected" style={{marginLeft: 'auto'}}
                     onClick={() => {
                         this.setState({
                             day: moment().isoWeekday(),
                             even: !this.props.settings.IsWeekOdd,
                         });
                         sessionStorage.setItem('scheduleDay', moment().isoWeekday());
                         sessionStorage.setItem('week', !this.props.settings.IsWeekOdd)
                     }}
                >
                    Сегодня
                </div>
                }
            </div>
        )
    }

    semesterRender() {
        return (
            <div>
                {this.headerRender()}
                <PullToRefresh onRefresh={this.onRefresh} isFetching={this.state.updating} style={{marginTop: 56}}>
                    <div
                        style={{minHeight: 'calc(100vh - 112px - var(--tabbar_height) - var(--safe-area-inset-top) - var(--safe-area-inset-bottom)'}}>
                        {this.dateRender()}
                        {this.state.loading &&
                        <PocketDiv>
                            <Placeholder
                                icon={
                                    <Spinner size='large' style={{color: "var(--pocket_dark_blue)"}}/>
                                }
                                title={
                                    <div
                                        className="header"
                                        style={{color: "var(--pocket_black)"}}
                                    >
                                        Ищем расписание {this.state.type === 1 ? 'группы' : 'преподавателя'}
                                    </div>
                                }
                            >
                                <div className="teacher" style={{whiteSpace: 'normal'}}>Нужно немного подождать</div>
                            </Placeholder>
                        </PocketDiv>
                        }
                        {!this.state.loading && this.state.schedule.length === 0 &&
                        <PocketDiv>
                            <Placeholder
                                icon={
                                    <Icon56DoNotDisturbOutline
                                        style={{color: "var(--pocket_dark_blue)"}}
                                    />
                                }
                                title={
                                    <div
                                        className="header"
                                        style={{color: "var(--pocket_black)"}}
                                    >
                                        Ой, здесь пусто
                                    </div>
                                }
                            >
                                <div className="teacher" style={{whiteSpace: 'normal'}}>Проверь фильтр, вдруг
                                    ошибся
                                </div>
                            </Placeholder>
                        </PocketDiv>
                        }
                        {!this.state.loading && this.state.schedule.length !== 0 &&
                        <PocketDiv map>
                            {this.state.schedule.filter(Lesson => (Lesson.Week === (this.state.even ? 2 : 1) || Lesson.Week === 0) && Lesson.Day === this.state.day).length === 0 ? (
                                <Placeholder
                                    style={{paddingTop: 12}}
                                    icon={
                                        <Icon56EventOutline
                                            style={{color: "var(--pocket_dark_blue)"}}
                                        />
                                    }
                                    title={
                                        <div
                                            className="header"
                                            style={{color: "var(--pocket_black)"}}
                                        >
                                            {this.state.day === moment().isoWeekday() ? "Сегодня " : (Days.find(day => day.id === this.state.day).fullName + ",")} пар
                                            нет!
                                        </div>
                                    }
                                >
                                    <div className="teacher" style={{whiteSpace: 'normal'}}>Можно спать спокойно!</div>
                                </Placeholder>
                            ) : (
                                this.state.schedule.sort((a, b) => (a.Less > b.Less) ? 1 : ((b.Less > a.Less) ? -1 : 0)).map((Lesson, index) => (
                                    (Lesson.Week === (this.state.even ? 2 : 1) || Lesson.Week === 0) && Lesson.Day === this.state.day &&
                                    <PocketDay
                                        key={index}
                                        style={{paddingTop: 12}}
                                        number={Lesson.Less}
                                        beginTime={Lesson.Less === 0 ? "Нет" : Times[Lesson.Less - 1].beginTime}
                                        endTime={Lesson.Less === 0 ? "Нет" : Times[Lesson.Less - 1].endTime}
                                        current={false}
                                        type={Lesson.Type}
                                        teacher={Lesson.Preps === null ? "Преподаватель не указан" : Lesson.PrepsText}
                                        room={(Lesson.Rooms !== null && Lesson.Build !== null) ? (Lesson.Build + " " + Lesson.Rooms) : Lesson.Dept !== null ? Lesson.Dept : "Не указано"}
                                        name={Lesson.Disc}
                                        groupsAmount={Lesson.Groups.split("::").length}
                                        groups={Lesson.GroupsText}
                                        deadlines={this.state.deadlines.length > 0 && this.lessonDeadlines(Lesson, this.state.deadlines).length > 0}
                                        onClick={() => {
                                            this.setState({lesson: Lesson});
                                            this.setActiveModal("lessonCard");
                                        }}
                                    />
                                ))
                            )}
                        </PocketDiv>}
                    </div>
                </PullToRefresh>
            </div>
        );
    }

    lessonDeadlines(lesson, deadlines) {
        let i;
        const ids = [];
        for (i = 0; i < this.state.schedule.length; i++) {
            if (this.state.schedule[i].Disc === lesson.Disc) ids.push(this.state.schedule[i].ItemId);
        }
        const array = [];
        for (i = 0; i < ids.length; i++) {
            for (let j = 0; j < deadlines.length; j++) {
                if ((deadlines[j].idsubject === ids[i]) && (deadlines[j].closed === 0)) array.push(deadlines[j]);
            }
        }
        return array;
    }

    render() {
        const modal = (
            <ModalRoot activeModal={this.state.activeModal}>
                <ModalPage
                    dynamicContentHeight
                    id={"filter"}
                    onClose={() => {
                        this.modalBack();
                        if (this.state.shouldUpdate) {
                            this.loadSchedule(this.state.uId, this.state.type)
                        }
                    }}
                    header={
                        <ModalPageHeader
                            right={
                                <HeaderButton onClick={() => {
                                    this.modalBack();
                                    if (this.state.shouldUpdate) {
                                        this.loadSchedule(this.state.uId, this.state.type)
                                    }
                                    if (this.state.uId === '' && this.state.name === '') {
                                        this.loadSchedule(this.props.uId, 1);
                                    }
                                }}>
                                    <Icon24Dismiss/>
                                </HeaderButton>
                            }
                        >
                            <div
                                align="center"
                                className="name"
                                style={{color: "var(--pocket_black)"}}
                            >
                                Фильтр
                            </div>
                        </ModalPageHeader>
                    }
                >
                    <div style={{marginLeft: 12, marginRight: 12}}>
                        <div className='row' style={{marginBottom: 12}}>
                            <div className="teacher" style={{color: 'var(--pocket_black)'}}>
                                Группа
                            </div>
                            {this.state.name !== this.props.name && this.state.type === 1 && <div
                                className="teacher"
                                onClick={
                                    () => {
                                        this.setState({
                                            name: this.props.name,
                                            uId: this.props.uId,
                                            type: 1,
                                            shouldUpdate: true
                                        });
                                    }
                                }
                                style={{
                                    color: "var(--pocket_dark_blue)",
                                    marginLeft: 'auto',
                                }}
                            >
                                Очистить
                            </div>}
                        </div>
                        <SelectMimicry placeholder="Выберите группу" onClick={() => {
                            this.setActiveModal("groups");
                            this.setState({search: ''})
                        }} value={this.state.type === 1 ? this.state.uId : ''}>
                            {this.state.type === 1 ? this.state.name : ''}
                        </SelectMimicry>
                    </div>
                    <div style={{padding: 12}}>
                        <div className='row' style={{marginBottom: 12}}>
                            <div className="teacher" style={{color: 'var(--pocket_black)'}}>
                                Преподаватель
                            </div>
                            {this.state.name !== this.props.name && this.state.type === 2 && <div
                                className="teacher"
                                onClick={
                                    () => {
                                        this.setState({
                                            name: this.props.name,
                                            uId: this.props.uId,
                                            type: 1,
                                            shouldUpdate: true
                                        });
                                    }
                                }
                                style={{
                                    color: "var(--pocket_dark_blue)",
                                    marginLeft: 'auto',
                                }}
                            >
                                Очистить
                            </div>}
                        </div>
                        <SelectMimicry placeholder="Выберите преподавателя" onClick={() => {
                            this.setActiveModal("teachers");
                            this.setState({search: ''})
                        }} value={this.state.type === 2 ? this.state.uId : ''}>
                            {this.state.type === 2 ? this.state.name : ''}
                        </SelectMimicry>
                    </div>
                    <div style={{paddingLeft: 12, paddingRight: 12, paddingBottom: 12}} className='row'>
                        <Button
                            onClick={() => {
                                this.modalBack();
                                if (this.state.shouldUpdate) {
                                    this.loadSchedule(this.state.uId, this.state.type)
                                }
                            }}
                            size="xl"
                            level="outline"
                            style={{
                                color: "var(--button_commerce_background)",
                                border: "1px solid var(--button_commerce_background)",
                                height: "40px"
                            }}
                        >
                            Найти
                        </Button>
                    </div>
                </ModalPage>
                <ModalPage
                    dynamicContentHeight
                    id={"lessonCard"}
                    onClose={() => {
                        this.modalBack()
                    }}
                    header={
                        <ModalPageHeader
                            right={
                                <HeaderButton onClick={() => {
                                    this.modalBack()
                                }}>
                                    <Icon24Dismiss/>
                                </HeaderButton>
                            }
                        >
                            <div
                                align="center"
                                className="name"
                                style={{color: "var(--pocket_black)"}}
                            >
                                Карточка предмета
                            </div>
                        </ModalPageHeader>
                    }
                >
                    {this.state.lesson !== null &&
                    <div>
                        <div style={{padding: "0px 12px 12px 12px"}} className='name'>
                            Название предмета
                        </div>
                        <div className='teacher' style={{paddingLeft: 12, paddingRight: 12, whiteSpace: 'pre-wrap'}}>
                            {this.state.lesson.Disc}
                        </div>
                        {this.state.lesson.Less !== 0 &&
                        <div>
                            <div style={{padding: 12}} className='name'>
                                Время проведения
                            </div>
                            <div className='teacher' style={{paddingLeft: 12, paddingRight: 12}}>
                                {Times[this.state.lesson.Less - 1].beginTime + "-" + Times[this.state.lesson.Less - 1].endTime}
                            </div>
                        </div>
                        }
                        {this.state.lesson.Preps !== null &&
                        <div>
                            <div style={{padding: 12}} className='name'>
                                Преподаватели
                            </div>
                            {this.state.lesson.PrepsText.split("; ").map((Teacher, index) => (
                                <div className='row fit' key={index}
                                     style={{paddingLeft: 12, paddingRight: 12, marginTop: index === 0 ? 0 : 6}}
                                     onClick={() => {
                                         if (Teacher.localeCompare(this.state.name) !== 0) {
                                             this.setState({
                                                 uId: parseInt(this.state.lesson.Preps.split("::")[index].replace(/[^\w\s]/gi, ''), 10),
                                                 name: Teacher,
                                                 type: 2
                                             });
                                             this.modalBack();
                                             this.loadSchedule(parseInt(this.state.lesson.Preps.split("::")[index].replace(/[^\w\s]/gi, ''), 10), 2)
                                         }
                                     }}>
                                    <div
                                        className={Teacher.localeCompare(this.state.name) === 0 ? 'tag' : Teacher === "Преподаватель не указан" ? 'tag' : 'tag selected'}>{Teacher}</div>
                                </div>
                            ))
                            }
                        </div>
                        }
                        <div style={{padding: 12}} className='name'>
                            Группы
                        </div>
                        <div style={{paddingLeft: 12, paddingRight: 12}}>
                            <div
                                className={this.state.lesson.GroupsText.split("; ").length > 4 ? "gridContainer gridContainerFill" : "row fit"}>
                                {this.state.lesson.GroupsText.split("; ").map((Group, index) => (
                                    <div key={index}
                                        className={Group.localeCompare(this.state.name) === 0 ? 'tag' : 'tag selected'}
                                        style={{marginLeft: this.state.lesson.GroupsText.split("; ").length > 4 ? 0 : index === 0 ? 0 : 6}}
                                        onClick={() => {
                                            if (Group.localeCompare(this.state.name) !== 0) {
                                                this.setState({
                                                    uId: parseInt(this.state.lesson.Groups.split("::")[index].replace(/[^\w\s]/gi, ''), 10),
                                                    name: Group,
                                                    type: 1
                                                });
                                                this.modalBack();
                                                this.loadSchedule(parseInt(this.state.lesson.Groups.split("::")[index].replace(/[^\w\s]/gi, ''), 10), 1)
                                            }
                                        }}>
                                        {Group}
                                    </div>
                                ))}
                            </div>
                        </div>
                        {this.state.type === 1 && this.state.lesson.Disc !== '' && this.state.deadlines.length > 0 && this.lessonDeadlines(this.state.lesson, this.state.deadlines).length > 0 &&
                        <div>
                            <div style={{padding: 12}} className='name'>
                                Дедлайны
                            </div>
                            {this.lessonDeadlines(this.state.lesson, this.state.deadlines).map((deadline, index) => (
                                <div className='teacher' key={index} style={{
                                    paddingLeft: 12,
                                    paddingRight: 12,
                                    marginTop: index === 0 ? 0 : 12,
                                    whiteSpace: 'pre-wrap'
                                }}>
                                    {deadline.subjectname} (до {moment(deadline.end).format('D MMMM')})
                                </div>
                            ))
                            }
                        </div>
                        }
                        <div style={{padding: 12}} className='name'>
                            Дополнительные сведения
                        </div>
                        <div className='row fit' style={{paddingLeft: 12, paddingRight: 12, paddingBottom: 12}}>
                            <div className='tag'>
                                {this.state.lesson.Type === "Л" ? "Лекция" : this.state.lesson.Type === "ЛР" ? "Лаб. работа" : this.state.lesson.Type === "ПР" ? "Прак. работа" : "Курс. работа"}
                            </div>
                            <div className='tag' style={{marginLeft: 6}}>
                                {this.state.lesson.Rooms === null ? this.state.lesson.Dept : (this.state.lesson.Build + " " + this.state.lesson.Rooms)}
                            </div>
                        </div>
                    </div>
                    }
                </ModalPage>
                <ModalPage
                    id={"groups"}
                    dynamicContentHeight
                    onClose={() => {
                        this.modalBack()
                    }}
                    header={
                        <ModalPageHeader
                            right={
                                <HeaderButton onClick={() => {
                                    this.modalBack()
                                }}>
                                    <Icon24Dismiss/>
                                </HeaderButton>
                            }
                        >
                            <div
                                align="center"
                                className="name"
                                style={{color: "var(--pocket_black)"}}
                            >
                                Выбор группы
                            </div>
                        </ModalPageHeader>
                    }
                >
                    <Search value={this.state.search} onChange={this.searchChange}/>
                    {this.groups.length > 0 && this.state.search !== '' &&
                    <div style={{marginLeft: 12, marginRight: 12, minHeight: 320}}>
                        {this.groups.map((group, index) => (
                            <PocketCell mobile={false} key={index} onClick={() => {
                                this.setState({shouldUpdate: true, name: group.Name, uId: group.ItemId, type: 1});
                                this.modalBack()
                            }} key={group.ItemId}>
                                {group.Name}
                            </PocketCell>
                        ))
                        }
                    </div>
                    }
                    {this.state.search === '' &&
                    <div style={{minHeight: 320, display: 'flex', justifyContent: 'center'}}>
                        <Placeholder
                            icon={
                                <Icon28Search width={56} height={56}
                                              style={{color: "var(--pocket_dark_blue)"}}
                                />
                            }
                            title={
                                <div
                                    className="header"
                                    style={{color: "var(--pocket_black)"}}
                                >
                                    Найди, что ищешь
                                </div>
                            }
                        >
                            <div className="teacher" style={{whiteSpace: 'normal'}}>Начни вводить запрос, чтобы увидеть
                                результат
                            </div>
                        </Placeholder>
                    </div>
                    }
                    {this.groups.length === 0 && this.state.search !== '' &&
                    <div style={{minHeight: 320, display: 'flex', justifyContent: 'center'}}>
                        <Placeholder
                            icon={
                                <Icon56DoNotDisturbOutline
                                    style={{color: "var(--pocket_dark_blue)"}}
                                />
                            }
                            title={
                                <div
                                    className="header"
                                    style={{color: "var(--pocket_black)"}}
                                >
                                    Упс, ничего не нашлось
                                </div>
                            }
                        >
                            <div className="teacher" style={{whiteSpace: 'normal'}}>Проверь поиск, вдруг ошибся</div>
                        </Placeholder>
                    </div>
                    }
                </ModalPage>
                <ModalPage
                    id={"teachers"}
                    dynamicContentHeight
                    onClose={() => {
                        this.modalBack()
                    }}
                    header={
                        <ModalPageHeader
                            right={
                                <HeaderButton onClick={() => {
                                    this.modalBack()
                                }}>
                                    <Icon24Dismiss/>
                                </HeaderButton>
                            }
                        >
                            <div
                                align="center"
                                className="name"
                                style={{color: "var(--pocket_black)"}}
                            >
                                Выбор преподавателя
                            </div>
                        </ModalPageHeader>
                    }
                >
                    <Search value={this.state.search} onChange={this.searchChange}/>
                    {this.teachers.length > 0 && this.state.search !== '' &&
                    <div style={{marginLeft: 12, marginRight: 12, minHeight: 320}}>
                        {this.teachers.map((teacher, index) => (
                            <PocketCell mobile={false} key={index} onClick={() => {
                                this.setState({shouldUpdate: true, type: 2, name: teacher.Name, uId: teacher.ItemId});
                                this.modalBack()
                            }} key={teacher.ItemId}>
                                {teacher.Name}
                            </PocketCell>
                        ))
                        }
                    </div>
                    }
                    {this.state.search === '' &&
                    <div style={{minHeight: 320, display: 'flex', justifyContent: 'center'}}>
                        <Placeholder
                            icon={
                                <Icon28Search width={56} height={56}
                                              style={{color: "var(--pocket_dark_blue)"}}
                                />
                            }
                            title={
                                <div
                                    className="header"
                                    style={{color: "var(--pocket_black)"}}
                                >
                                    Найди то, что ищешь
                                </div>
                            }
                        >
                            <div className="teacher" style={{whiteSpace: 'normal'}}>Начни вводить запрос, чтобы увидеть
                                результат
                            </div>
                        </Placeholder>
                    </div>
                    }
                    {this.teachers.length === 0 &&
                    <div style={{minHeight: 320, display: 'flex', justifyContent: 'center'}}>
                        <Placeholder
                            icon={
                                <Icon56DoNotDisturbOutline
                                    style={{color: "var(--pocket_dark_blue)"}}
                                />
                            }
                            title={
                                <div
                                    className="header"
                                    style={{color: "var(--pocket_black)"}}
                                >
                                    Упс, ничего не нашлось
                                </div>
                            }
                        >
                            <div className="teacher" style={{whiteSpace: 'normal'}}>Проверь поиск, вдруг ошибся</div>
                        </Placeholder>
                    </div>
                    }
                </ModalPage>
            </ModalRoot>
        );
        return (
            <React.Fragment>
                <View modal={modal} popout={this.state.popout} activePanel={this.state.activePanel}>
                    <Panel id="schedule">
                        {this.semesterRender()}
                        {this.state.snackbar}
                    </Panel>
                </View>
            </React.Fragment>
        );
    }
}

export default Schedule;