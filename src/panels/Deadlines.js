import React from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import bridge from '@vkontakte/vk-bridge'
import View from "@vkontakte/vkui/dist/components/View/View";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import ModalPageHeader from "@vkontakte/vkui/dist/components/ModalPageHeader/ModalPageHeader";
import ModalRoot from "@vkontakte/vkui/dist/components/ModalRoot/ModalRoot";
import ModalPage from "@vkontakte/vkui/dist/components/ModalPage/ModalPage";
import HorizontalScroll from "@vkontakte/vkui/dist/components/HorizontalScroll/HorizontalScroll";
import HeaderButton from "@vkontakte/vkui/dist/components/HeaderButton/HeaderButton";
import Placeholder from "@vkontakte/vkui/dist/components/Placeholder/Placeholder";
import Textarea from "@vkontakte/vkui/dist/components/Textarea/Textarea";
import Checkbox from "@vkontakte/vkui/dist/components/Checkbox/Checkbox";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import FormStatus from "@vkontakte/vkui/dist/components/FormStatus/FormStatus";
import Select from "@vkontakte/vkui/dist/components/Select/Select";
import PocketDiv from "../components/PocketDiv/PocketDiv";
import Snackbar from "@vkontakte/vkui/dist/components/Snackbar/Snackbar";
import PocketButton from "../components/PocketButton/PocketButton";
import FixedLayout from "@vkontakte/vkui/dist/components/FixedLayout/FixedLayout";
import PocketDeadline from "../components/PocketDeadline/PocketDeadline";
import Input from "@vkontakte/vkui/dist/components/Input/Input";
import Alert from "@vkontakte/vkui/dist/components/Alert/Alert";
import PullToRefresh from "@vkontakte/vkui/dist/components/PullToRefresh/PullToRefresh";

import Icon24Add from '@vkontakte/icons/dist/24/add';
import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import Icon28AddOutline from '@vkontakte/icons/dist/28/add_outline';
import Icon28DoneOutline from '@vkontakte/icons/dist/28/done_outline';
import Icon28FireOutline from '@vkontakte/icons/dist/28/fire_outline';
import Icon28EditOutline from '@vkontakte/icons/dist/28/edit_outline';
import Icon28CheckCircleOutline from '@vkontakte/icons/dist/28/check_circle_outline';
import Icon28CancelCircleOutline from '@vkontakte/icons/dist/28/cancel_circle_outline';
import Icon28DeleteOutlineAndroid from '@vkontakte/icons/dist/28/delete_outline_android';

import moment from "moment";
import "moment/locale/ru";

class Deadlines extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePanel: props.activePanel,
            modalHistory: [],
            activeModal: null,
            search: '',
            filter: parseInt(sessionStorage.getItem('filter')) || 1,
            end: moment().format('YYYY-MM-DD').toString(),
            subjectname: '',
            comment: '',
            idsubject: 0,
            dateError: false,
            deadlines: JSON.parse(localStorage.getItem('deadlines')) || props.deadlines,
            lessons: [],
            deadline: null,
            snackbar: null,
            popout: null,
            loading: false,
            schedule: JSON.parse(localStorage.getItem('schedule')) || props.schedule,
            animations: JSON.parse(localStorage.getItem('animations')) || props.animations,
        };
        this.modalBack = () => {
            this.setActiveModal(
                this.state.modalHistory[this.state.modalHistory.length - 2]
            );
        };
        this.onRefresh = () => {
            this.getDeadlines();
        };
        this.searchChange = this.searchChange.bind(this);
        this.infoChange = this.infoChange.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.checkboxChange = this.checkboxChange.bind(this);
        this.checkEnabled = this.checkEnabled.bind(this);
        this.snackbarRender = this.snackbarRender.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        if (this.props.platform !== 'ios') {
            document.getElementById("filter" + this.state.filter).scrollIntoView({ inline: "center" })
        }
        let arrayNotSorted = this.state.schedule;
        if (arrayNotSorted.length !== 0) {
            let arrayNames = [];
            for (var i = 0; i < arrayNotSorted.length; i++) {
                arrayNames.push(arrayNotSorted[i].Disc);
            }
            let sortedNames = arrayNames.filter(function (item, pos) {
                return arrayNames.indexOf(item) === pos;
            });
            this.setState({ lessons: sortedNames })
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
        this.setState({ search });
    };

    infoChange(text) {
        if (text.target.name === "title") {
            this.setState({ subjectname: text.target.value[0] !== ' ' && text.target.value.length <= 50 ? text.target.value : this.state.subjectname });
        } else if (text.target.name === "description") {
            this.setState({ comment: text.target.value[0] !== ' ' && text.target.value.length <= 300 ? text.target.value : this.state.comment });
        } else if (text.target.name === "lesson") {
            this.setState({ idsubject: text.target.value });
        }
    };

    dateChange(date) {
        if (moment(date.target.value.toString()).isBetween(moment().format('YYYY-MM-DD').toString(), moment().add(365, 'days').format('YYYY-MM-DD').toString(), null, '[]')) {
            this.setState({ end: date.target.value.toString(), dateError: false });
        } else {
            this.setState({ end: date.target.value.toString(), dateError: true });
        }
    };

    checkboxChange(event) {
        this.closeOpenDeadline(this.state.deadlines[this.state.deadlines.length - 1 - parseInt(event.target.name)], this.state.deadlines[this.state.deadlines.length - 1 - parseInt(event.target.name)].closed === 1 ? 2 : 1)
    }

    snackbarRender(text, mode) {
        if (mode === 1) {
            this.props.platform === 'ios' && bridge.send("VKWebAppTapticNotificationOccurred", { "type": "success" });
            this.setState({
                snackbar: (
                    <Snackbar
                        onClose={() => this.setState({ snackbar: null })}
                        before={
                            <div>
                                <Icon28CheckCircleOutline width={20} height={20} fill="var(--pocket_dark_blue)" />
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
            this.props.platform === 'ios' && bridge.send("VKWebAppTapticNotificationOccurred", { "type": "error" });
            this.setState({
                snackbar: (
                    <Snackbar
                        onClose={() => this.setState({ snackbar: null })}
                        before={
                            <div>
                                <Icon28CancelCircleOutline width={20} height={20} fill="var(--pocket_error)" />
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

    createDeadline() {
        this.setState({ snackbar: null });
        moment().format('YYYY-MM-DD').toString();
        let item = {
            idsubject: this.state.idsubject,
            subjectname: this.state.subjectname,
            start: moment().format('YYYY-MM-DD').toString(),
            end: this.state.end,
            comment: this.state.comment,
        }
        this.state.deadlines.push(item);
        this.snackbarRender('Дедлайн успешно создан', 1);
        sessionStorage.setItem('deadlinesCount', this.state.deadlines.filter(deadline => ((moment(deadline.end).isBetween(moment().format('YYYY-MM-DD').toString(), moment().add(7, 'days').format('YYYY-MM-DD').toString(), null, '[]') || moment(deadline.end).isBefore(moment().format('YYYY-MM-DD').toString())) && deadline.closed === 0)).length + 1);
        this.setState({
            end: moment().format('YYYY-MM-DD').toString(),
            subjectname: '',
            idsubject: 0,
            comment: '',
            dateError: false
        });
        this.forceUpdate();
    }

    checkStatus(deadline, mode) {
        if (mode === 1) {
            if (this.state.filter === 1) {
                return deadline.closed === 0 && (moment(deadline.end).isBetween(moment().format('YYYY-MM-DD').toString(), moment().add(7, 'days').format('YYYY-MM-DD').toString(), null, '[]') || moment(deadline.end).isBefore(moment().format('YYYY-MM-DD').toString()));
            } else if (this.state.filter === 2) {
                return deadline.closed === 0;
            } else if (this.state.filter === 3) {
                return deadline.closed !== 0;
            }
        } else if (mode === 2) {
            if (deadline.closed === 1) {
                return 3;
            } else {
                return (moment(deadline.end).isBetween(moment().format('YYYY-MM-DD').toString(), moment().add(7, 'days').format('YYYY-MM-DD').toString(), null, '[]') || moment(deadline.end).isBefore(moment().format('YYYY-MM-DD').toString())) ? 1 : 2;
            }
        }
    }

    checkEnabled(deadlines) {
        if (this.state.filter === 1) {
            return deadlines.some(deadline => (deadline.closed === 0 && (moment(deadline.end).isBetween(moment().format('YYYY-MM-DD').toString(), moment().add(7, 'days').format('YYYY-MM-DD').toString(), null, '[]') || moment(deadline.end).isBefore(moment().format('YYYY-MM-DD').toString()))))
        } else if (this.state.filter === 2) {
            return deadlines.some(deadline => deadline.closed === 0)
        } else {
            return deadlines.some(deadline => deadline.closed === 1)
        }
    }

    closeOpenDeadline(deadline, mode) {
        this.modalBack();
        if (mode === 1) {
            deadline.closed = 1;
        } else {
            deadline.closed = 0;
        }
        let newDeadlines = this.state.deadlines;
        newDeadlines[this.state.deadlines.findIndex(x => (deadline.id === x.id))] = deadline;
        this.setState({ deadlines: newDeadlines, snackbar: null });
        localStorage.setItem('deadlines', JSON.stringify(newDeadlines));
        sessionStorage.setItem('deadlinesCount', this.state.deadlines.filter(deadline => ((moment(deadline.end).isBetween(moment().format('YYYY-MM-DD').toString(), moment().add(7, 'days').format('YYYY-MM-DD').toString(), null, '[]') || moment(deadline.end).isBefore(moment().format('YYYY-MM-DD').toString())) && deadline.closed === 0)).length);
        this.forceUpdate();
        this.snackbarRender(mode === 1 ? 'Дедлайн успешно закрыт' : 'Дедлайн успешно переоткрыт', 1);
    }

    deleteDeadline(deadline) {
        this.modalBack();
        let oldDeadlines = this.state.deadlines;
        let deadlines = this.state.deadlines.filter(d => d.id !== deadline.id);
        this.setState({ deadlines: deadlines, snackbar: null });

        this.snackbarRender('Дедлайн был удален', 1);
        localStorage.setItem('deadlines', JSON.stringify(deadlines));
        this.props.platform === 'ios' && bridge.send("VKWebAppTapticNotificationOccurred", { "type": "error" });
        localStorage.setItem('deadlines', JSON.stringify(oldDeadlines));
        sessionStorage.setItem('deadlinesCount', this.state.deadlines.filter(deadline => ((moment(deadline.end).isBetween(moment().format('YYYY-MM-DD').toString(), moment().add(7, 'days').format('YYYY-MM-DD').toString(), null, '[]') || moment(deadline.end).isBefore(moment().format('YYYY-MM-DD').toString())) && deadline.closed === 0)).length);
        this.forceUpdate();
    }

    updateDeadline(deadline) {
        this.setState({snackbar: null});
        let deadlines = this.state.deadlines;
        deadline.subjectname = this.state.subjectname;
        deadline.comment = this.state.comment;
        deadline.end = this.state.end;
        deadline.idsubject = parseInt(this.state.idsubject);
        deadlines.map(x => (deadline.id === x.id) || x);
        localStorage.setItem('deadlines', JSON.stringify(deadlines));
        this.setState({
            end: moment().format('YYYY-MM-DD').toString(),
            deadlines: deadlines,
            subjectname: '',
            idsubject: 0,
            comment: ''
        });
        this.snackbarRender('Дедлайн был обновлен', 1);

        sessionStorage.setItem('deadlinesCount', this.state.deadlines.filter(deadline => ((moment(deadline.end).isBetween(moment().format('YYYY-MM-DD').toString(), moment().add(7, 'days').format('YYYY-MM-DD').toString(), null, '[]') || moment(deadline.end).isBefore(moment().format('YYYY-MM-DD').toString())) && deadline.closed === 0)).length);
        this.forceUpdate();
    }

    getDeadlines() {
        this.setState({ snackbar: null, loading: true });
        if (window.navigator.onLine) {
            localStorage.setItem('deadlines', this.state.deadlines);
            this.setState({ deadlines: this.state.deadlines, loading: false });
            this.forceUpdate();
        } else {
            this.snackbarRender('Отсутствует подключение к интернету!', 2)
        }
        this.forceUpdate();
    }

    deadlinesRender() {
        return (
            <div style={{ marginTop: 44 }}>
                <PanelHeader
                    noShadow
                    left={
                        <HeaderButton
                            onClick={() => {
                                this.setState({
                                    end: moment().format('YYYY-MM-DD').toString(),
                                    subjectname: '',
                                    idsubject: 0,
                                    comment: '',
                                    dateError: false
                                });
                                this.setActiveModal("createDeadline");
                            }}
                        >
                            <Icon24Add fill="var(--pocket_gray)" />
                        </HeaderButton>
                    }
                >
                    {
                        <div className="header panel">
                            Дедлайны
                        </div>
                    }
                </PanelHeader>
                <FixedLayout vertical="top" style={{ marginTop: -1 }}>
                    <div style={{ background: 'var(--header_background)' }}>
                        <HorizontalScroll>
                            <div style={{ display: "flex" }}>
                                <PocketButton
                                    id={'filter1'}
                                    red
                                    selected={this.state.filter === 1}
                                    clickable={this.state.animations === 1}
                                    onClick={() => {
                                        this.setState({ filter: 1 });
                                        sessionStorage.setItem('filter', 1);
                                        window.scrollTo(0, 0);
                                        if (this.props.platform !== 'ios') {
                                            document.getElementById("filter1").scrollIntoView({
                                                inline: "center",
                                                behavior: "smooth"
                                            })
                                        }
                                        this.props.platform === 'ios' && bridge.send("VKWebAppTapticImpactOccurred", { "style": "light" });
                                    }}
                                >
                                    Ближайшие
                                </PocketButton>
                                <PocketButton
                                    id={'filter2'}
                                    selected={this.state.filter === 2}
                                    clickable={this.state.animations === 1}
                                    onClick={() => {
                                        this.setState({ filter: 2 });
                                        sessionStorage.setItem('filter', 2)
                                        window.scrollTo(0, 0);
                                        if (this.props.platform !== 'ios') {
                                            document.getElementById("filter2").scrollIntoView({
                                                inline: "center",
                                                behavior: "smooth"
                                            })
                                        }
                                        this.props.platform === 'ios' && bridge.send("VKWebAppTapticImpactOccurred", { "style": "light" });
                                    }}
                                >
                                    Открытые
                                </PocketButton>
                                <PocketButton
                                    id={'filter3'}
                                    selected={this.state.filter === 3}
                                    clickable={this.state.animations === 1}
                                    onClick={() => {
                                        this.setState({ filter: 3 });
                                        sessionStorage.setItem('filter', 3)
                                        window.scrollTo(0, 0);
                                        this.props.platform !== 'ios' && document.getElementById("filter3").scrollIntoView({
                                            inline: "center",
                                            behavior: "smooth"
                                        });
                                        this.props.platform === 'ios' && bridge.send("VKWebAppTapticImpactOccurred", { "style": "light" });
                                    }}
                                >
                                    Закрытые
                                </PocketButton>
                            </div>
                        </HorizontalScroll>
                    </div>
                </FixedLayout>
                <PullToRefresh onRefresh={this.onRefresh} isFetching={this.state.loading}>
                    <div
                        style={{ minHeight: 'calc(100vh - 112px - var(--tabbar_height) - var(--safe-area-inset-top) - var(--safe-area-inset-bottom)' }}>
                        {this.state.deadlines.length > 0 && this.checkEnabled(this.state.deadlines) &&
                            <PocketDiv map title='Список дедлайнов'>
                                {this.state.deadlines.slice(0).reverse().map((deadline, index) => (
                                    (this.checkStatus(deadline, 1) &&
                                        <div className='row' key={index}>
                                            <PocketDeadline onClick={() => {
                                                this.setActiveModal("deadlineCard");
                                                this.setState({ deadline: deadline })
                                            }} style={{ marginTop: 12, width: "100%" }}
                                                status={this.checkStatus(deadline, 2)}
                                                lesson={deadline.idsubject === 0 || this.state.schedule.length === 0 || this.state.schedule.findIndex(x => x.ItemId === deadline.idsubject) === -1 ? '' : this.state.schedule.find(x => x.ItemId === deadline.idsubject).Disc}
                                                hasText={deadline.comment !== ''}>
                                                {deadline.subjectname}
                                            </PocketDeadline>
                                            {window.navigator.onLine &&
                                                <div style={{ marginLeft: 'auto', marginTop: 12 }}>
                                                    <Checkbox name={index} checked={deadline.closed === 1}
                                                        onChange={this.checkboxChange} style={{ marginRight: -12 }} />
                                                </div>
                                            }
                                        </div>)
                                ))}
                            </PocketDiv>
                        }
                        {this.state.deadlines.length === 0 &&
                            <PocketDiv title='Список дедлайнов'>
                                <Placeholder
                                    icon={
                                        <Icon28AddOutline
                                            width={56}
                                            height={56}
                                            style={{ color: "var(--pocket_dark_blue)" }}
                                            onClick={() => {
                                                this.setState({
                                                    end: moment().format('YYYY-MM-DD').toString(),
                                                    subjectname: '',
                                                    idsubject: 0,
                                                    comment: '',
                                                    dateError: false
                                                });
                                                this.setActiveModal("createDeadline");
                                            }}
                                        />
                                    }
                                    title={
                                        <div
                                            className="header"
                                            style={{ color: "var(--pocket_black)" }}
                                        >
                                            Дедлайнов нет!
                                    </div>
                                    }
                                >
                                    <div className="teacher" style={{ whiteSpace: 'pre-wrap', overflow: 'visible' }}>Чтобы
                                        создать
                                        дедлайн, нажми на кнопку в левом верхнем углу!
                                </div>
                                </Placeholder>
                            </PocketDiv>
                        }
                        {this.state.deadlines.length !== 0 && !this.checkEnabled(this.state.deadlines) &&
                            <PocketDiv title='Список дедлайнов'>
                                <Placeholder
                                    icon={
                                        this.state.filter === 3 ?
                                            <Icon28DoneOutline
                                                width={56}
                                                height={56}
                                                style={{ color: "var(--pocket_dark_blue)" }}
                                            />
                                            :
                                            <Icon28FireOutline
                                                width={56}
                                                height={56}
                                                style={{ color: "var(--pocket_error)" }}
                                            />
                                    }
                                    title={
                                        <div
                                            className="header"
                                            style={{ color: "var(--pocket_black)" }}
                                        >
                                            Дедлайнов нет!
                                    </div>
                                    }
                                >
                                    <div className="teacher" style={{ whiteSpace: 'pre-wrap' }}> {this.state.filter === 3 ?
                                        "Ты пока не выполнил ни одного дедлайна, но все впереди!"
                                        : this.state.filter === 1 ? "Ты выполнил все срочные дедлайны! Отдохни немного и берись за остальные!"
                                            : "Ничего себе! Ты выполнил все дедлайны! Это достойно уважения!"}
                                    </div>
                                </Placeholder>
                            </PocketDiv>
                        }
                    </div>
                </PullToRefresh>
            </div>
        )
    }

    render() {
        const modal = (
            <ModalRoot activeModal={this.state.activeModal}>
                <ModalPage
                    dynamicContentHeight
                    id={"createDeadline"}
                    onClose={() => {
                        this.modalBack();
                    }}
                    header={
                        <ModalPageHeader
                            right={
                                <HeaderButton onClick={() => {
                                    this.modalBack();
                                }}>
                                    <Icon24Dismiss />
                                </HeaderButton>
                            }
                        >
                            <div
                                align="center"
                                className="name"
                                style={{ color: "var(--pocket_black)" }}
                            >
                                Создать дедлайн
                            </div>
                        </ModalPageHeader>
                    }
                >
                    <div style={{ marginLeft: 12, marginRight: 12 }}>
                        <div className="teacher"
                            style={{ color: 'var(--pocket_black)' }}>
                            Название дедлайна {this.state.subjectname !== '' && <span
                                style={{ color: 'var(--pocket_gray)' }}>(символов {this.state.subjectname.length}/50 )</span>}
                        </div>
                        <Input
                            style={{ marginTop: 12 }}
                            placeholder="Выполнить лабораторную работу №1"
                            type="text"
                            name="title"
                            value={this.state.subjectname || ''}
                            onChange={this.infoChange}
                        />
                        <div className="teacher" style={{ color: 'var(--pocket_black)', marginTop: 12 }}>
                            Описание дедлайна {this.state.comment !== '' ? <span
                                style={{ color: 'var(--pocket_gray)' }}>(символов {this.state.comment.length}/300 )</span> :
                                <span style={{ color: 'var(--pocket_gray)' }}>(необязательно)</span>}
                        </div>
                        <Textarea style={{ marginTop: 12 }} name="description"
                            placeholder={"Написать программу, сделать по ней отчет и защитить"}
                            value={this.state.comment || ''}
                            onChange={this.infoChange}
                        />
                        <div className="teacher" style={{ color: 'var(--pocket_black)', marginTop: 12 }}>
                            Дата дедлайна
                        </div>
                        <Input
                            style={{ marginTop: 12 }}
                            type="date"
                            name="deadline"
                            value={this.state.end}
                            onChange={this.dateChange}
                        />
                        {this.state.lessons.length > 0 && this.state.schedule.length > 0 &&
                            <div>
                                <div className="teacher"
                                    style={{ color: 'var(--pocket_black)', marginTop: 12, marginBottom: 12 }}>
                                    Предмет <span style={{ color: 'var(--pocket_gray)' }}>(необязательно)</span>
                                </div>
                                <Select name="lesson" onChange={this.infoChange} value={this.state.idsubject}>
                                    <option value={0}>Не выбрано</option>
                                    {this.state.lessons.map((lesson, index) => (
                                        <option key={index}
                                            value={this.state.schedule.find(x => x.Disc === lesson).ItemId}>{lesson}</option>
                                    ))}
                                </Select>
                            </div>
                        }
                        {this.state.dateError &&
                            <FormStatus title="Некорректная дата дедлайна" state="error"
                                style={{ marginTop: 12 }}>
                                Дедлайн нельзя устанавливать в прошлом или позднее, чем через год!
                        </FormStatus>
                        }
                        <div style={{ paddingTop: 12, paddingBottom: 12 }}>
                            {window.navigator.onLine &&
                                <Button
                                    onClick={() => {
                                        this.createDeadline();
                                        this.modalBack();
                                    }}
                                    disabled={this.state.subjectname === '' || this.state.dateError}
                                    size="xl"
                                    level="outline"
                                    style={{
                                        color: "var(--pocket_dark_blue)",
                                        border: "1px solid var(--pocket_dark_blue)",
                                        height: "40px"
                                    }}
                                >
                                    Создать дедлайн
                            </Button>
                            }
                            {!window.navigator.onLine &&
                                <FormStatus title="Проблема с доступом к интернету" state="error">
                                    Убедись в том, что ты подключен к нему!
                            </FormStatus>
                            }
                        </div>
                    </div>
                </ModalPage>
                <ModalPage
                    id={"deadlineCard"}
                    dynamicContentHeight
                    onClose={() => {
                        this.modalBack();
                    }}
                    header={
                        <ModalPageHeader
                            right={
                                <HeaderButton onClick={() => {
                                    this.modalBack();
                                }}>
                                    <Icon24Dismiss />
                                </HeaderButton>
                            }
                        >
                            <div
                                align="center"
                                className="name"
                                style={{ color: "var(--pocket_black)" }}
                            >
                                Карточка дедлайна
                            </div>
                        </ModalPageHeader>
                    }
                >
                    {this.state.deadline !== null &&
                        <div>
                            <div style={{ padding: "0px 12px 12px 12px" }} className='name'>
                                Название дедлайна
                        </div>
                            <div className='teacher' style={{ paddingLeft: 12, paddingRight: 12, whiteSpace: 'pre-wrap' }}>
                                {this.state.deadline.subjectname}
                            </div>
                            {this.state.deadline.comment !== '' &&
                                <div>
                                    <div style={{ padding: 12 }} className='name'>
                                        Описание дедлайна
                            </div>
                                    <div className='teacher'
                                        style={{ paddingLeft: 12, paddingRight: 12, whiteSpace: "pre-wrap" }}>
                                        {this.state.deadline.comment}
                                    </div>
                                </div>
                            }
                            <div style={{ padding: 12 }} className='name'>
                                Дата дедлайна
                        </div>
                            <div className='teacher' style={{ paddingLeft: 12, paddingRight: 12 }}>
                                {moment(this.state.deadline.end).format('D MMMM')}
                            </div>
                            {this.state.deadline.idsubject !== 0 && this.state.schedule.findIndex(x => x.ItemId === this.state.deadline.idsubject) !== -1 &&
                                <div>
                                    <div style={{ padding: 12 }} className='name'>
                                        Предмет
                            </div>
                                    <div className='teacher' style={{ paddingLeft: 12, paddingRight: 12 }}>
                                        {this.state.schedule.find(x => x.ItemId === this.state.deadline.idsubject).Disc}
                                    </div>
                                </div>}
                            {window.navigator.onLine &&
                                <div>
                                    <div style={{ padding: 12 }} className='row'>
                                        <Button
                                            onClick={() => {
                                                this.closeOpenDeadline(this.state.deadline, this.state.deadline.closed === 1 ? 2 : 1);
                                            }}
                                            size="xl"
                                            level="outline"
                                            style={{
                                                color: this.state.deadline.closed === 1 ? "var(--pocket_dark_blue)" : "var(--button_commerce_background)",
                                                border: this.state.deadline.closed === 1 ? "1px solid var(--pocket_dark_blue)" : "1px solid var(--button_commerce_background)",
                                                height: "40px"
                                            }}
                                        >
                                            {this.state.deadline.closed === 1 ? "Открыть дедлайн" : "Закрыть дедлайн"}
                                        </Button>
                                    </div>
                                    <div style={{ padding: "0px 12px 12px 12px" }} className='row'>
                                        <Button
                                            onClick={() => {
                                                this.setState({
                                                    subjectname: this.state.deadline.subjectname,
                                                    comment: this.state.deadline.comment,
                                                    end: this.state.deadline.end,
                                                    idsubject: this.state.deadline.idsubject
                                                });
                                                this.setActiveModal("updateDeadline");
                                            }}
                                            size="xl"
                                            level="outline"
                                            style={{
                                                color: "var(--pocket_dark_blue)",
                                                border: "1px solid var(--pocket_dark_blue)",
                                                height: "40px"
                                            }}
                                            before={
                                                <Icon28EditOutline width={20} height={20} fill={"var(--pocket_dark_blue)"} />
                                            }
                                        >
                                            Редактировать
                                </Button>
                                        <Button
                                            onClick={() => {
                                                this.modalBack();
                                                this.setState({
                                                    popout:
                                                        <Alert
                                                            actionsLayout="vertical"
                                                            actions={[{
                                                                title: 'Удалить дедлайн',
                                                                autoclose: true,
                                                                style: 'destructive',
                                                                action: () => this.deleteDeadline(this.state.deadline),
                                                            }, {
                                                                title: 'Отмена',
                                                                autoclose: true,
                                                                action: () => this.setActiveModal("deadlineCard"),
                                                            }]}
                                                            onClose={() => this.setState({ popout: null })}
                                                        >
                                                            <h2>Подтвердите действие</h2>
                                                            <p>Вы уверены, что хотите удалить дедлайн? Отменить действие будет
                                                        нельзя.</p>
                                                        </Alert>
                                                })
                                            }}
                                            size="xl"
                                            level="outline"
                                            style={{
                                                color: "var(--pocket_error)",
                                                border: "1px solid var(--pocket_error)",
                                                height: "40px",
                                                marginLeft: 12
                                            }}
                                            before={
                                                <Icon28DeleteOutlineAndroid width={20} height={20}
                                                    fill={"var(--pocket_error)"} />
                                            }
                                        >
                                            Удалить
                                </Button>
                                    </div>
                                </div>
                            }
                            {!window.navigator.onLine &&
                                <div style={{ paddingBottom: 12, marginLeft: 12, marginRight: 12 }}>
                                    <FormStatus title="Проблема с доступом к интернету" state="error"
                                        style={{ marginTop: 12 }}>
                                        Убедись в том, что ты подключен к нему!
                            </FormStatus>
                                </div>
                            }
                        </div>
                    }
                </ModalPage>
                <ModalPage
                    dynamicContentHeight
                    id={"updateDeadline"}
                    onClose={() => {
                        this.modalBack();
                        this.setState({ dateError: false });
                    }}
                    header={
                        <ModalPageHeader
                            right={
                                <HeaderButton onClick={() => {
                                    this.modalBack();
                                    this.setState({ dateError: false });
                                }}>
                                    <Icon24Dismiss />
                                </HeaderButton>
                            }
                        >
                            <div
                                align="center"
                                className="name"
                                style={{ color: "var(--pocket_black)" }}
                            >
                                Редактировать дедлайн
                            </div>
                        </ModalPageHeader>
                    }
                >
                    <div style={{ marginLeft: 12, marginRight: 12 }}>
                        <div className="teacher"
                            style={{ color: 'var(--pocket_black)' }}>
                            Название дедлайна {this.state.subjectname !== '' && <span
                                style={{ color: 'var(--pocket_gray)' }}>(символов {this.state.subjectname.length}/50 )</span>}
                        </div>
                        <Input
                            style={{ marginTop: 12 }}
                            placeholder="Выполнить лабораторную работу №1"
                            type="text"
                            name="title"
                            value={this.state.subjectname || ''}
                            onChange={this.infoChange}
                        />
                        <div className="teacher" style={{ color: 'var(--pocket_black)', marginTop: 12 }}>
                            Описание дедлайна {this.state.comment !== '' ? <span
                                style={{ color: 'var(--pocket_gray)' }}>(символов {this.state.comment.length}/300 )</span> :
                                <span style={{ color: 'var(--pocket_gray)' }}>(необязательно)</span>}
                        </div>
                        <Textarea style={{ marginTop: 12 }} name="description"
                            placeholder={"Написать программу, сделать по ней отчет и защитить"}
                            value={this.state.comment || ''}
                            onChange={this.infoChange}
                        />
                        <div className="teacher" style={{ color: 'var(--pocket_black)', marginTop: 12 }}>
                            Дата дедлайна
                        </div>
                        <Input
                            style={{ marginTop: 12 }}
                            type="date"
                            name="deadline"
                            value={this.state.end}
                            onChange={this.dateChange}
                        />
                        {this.state.lessons.length > 0 && this.state.schedule.length > 0 &&
                            <div>
                                <div className='teacher'
                                    style={{ color: 'var(--pocket_black)', marginTop: 12, marginBottom: 12 }}>
                                    Предмет <span style={{ color: 'var(--pocket_gray)' }}>(необязательно)</span>
                                </div>
                                <Select name="lesson" onChange={this.infoChange} value={this.state.idsubject}>
                                    <option value={0}>Не выбрано</option>
                                    {this.state.lessons.map((lesson, index) => (
                                        <option key={index}
                                            value={this.state.schedule.find(x => x.Disc === lesson).ItemId}>{lesson}</option>
                                    ))}
                                </Select>
                            </div>
                        }
                        <div style={{ paddingBottom: 12, paddingTop: 12 }}>
                            {this.state.dateError &&
                                <FormStatus title="Некорректная дата дедлайна" state="error"
                                    style={{ marginTop: 12 }}>
                                    Дедлайн нельзя устанавливать в прошлом или позднее, чем через год!
                            </FormStatus>
                            }
                            <Button
                                onClick={() => {
                                    this.updateDeadline(this.state.deadline);
                                    this.modalBack();
                                }}
                                disabled={this.state.subjectname === '' || this.state.dateError}
                                size="xl"
                                level="outline"
                                style={{
                                    color: "var(--pocket_dark_blue)",
                                    border: "1px solid var(--pocket_dark_blue)",
                                    height: "40px"
                                }}
                            >
                                Обновить дедлайн
                            </Button>
                        </div>
                    </div>
                </ModalPage>
            </ModalRoot>
        );
        return (
            <View modal={modal} popout={this.state.popout} activePanel={this.state.activePanel}>
                <Panel id="deadlines">
                    {this.deadlinesRender()}
                    {this.state.snackbar}
                </Panel>
            </View>
        )
    }
}

export default Deadlines;
