import React from 'react';
import bridge from '@vkontakte/vk-bridge';
import '@vkontakte/vkui/dist/vkui.css';
import View from "@vkontakte/vkui/dist/components/View/View";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import PocketButton from "../components/PocketButton/PocketButton";
import HorizontalScroll from "@vkontakte/vkui/dist/components/HorizontalScroll/HorizontalScroll";
import FixedLayout from "@vkontakte/vkui/dist/components/FixedLayout/FixedLayout";
import PocketNews from "../components/PocketNews/PocketNews";
import PocketDiv from "../components/PocketDiv/PocketDiv";
import PocketDeadline from "../components/PocketDeadline/PocketDeadline";
import PocketDay from "../components/PocketDay/PocketDay";
import PocketWeather from "../components/PocketWeather/PocketWeather";
import PocketBanner from "../components/PocketBanner/PocketBanner";
import PocketSeparator from "../components/PocketSeparator/PocketSeparator";
import Snackbar from "@vkontakte/vkui/dist/components/Snackbar/Snackbar";

import moment from "moment";
import "moment/locale/ru";

import Icon28CheckCircleOutline from '@vkontakte/icons/dist/28/check_circle_outline';
import Icon28CancelCircleOutline from '@vkontakte/icons/dist/28/cancel_circle_outline';

const Tabs = [
    { id: 0, name: 'Университет', ownerId: -122496494 },
    { id: 1, name: 'Профком', ownerId: -232453 },
    { id: 2, name: 'Медиа', ownerId: -5515524 },
    { id: 3, name: 'Спорт', ownerId: -138336798 },
    { id: 4, name: 'Музыка', ownerId: -66449391 },
    { id: 5, name: 'Инженерный кружок', ownerId: -149885408 },
    { id: 6, name: 'КВН', ownerId: -9187 }
];

const Times = [
    { id: 1, beginTime: "9:00", endTime: "10:30" },
    { id: 2, beginTime: "10:40", endTime: "12:10" },
    { id: 3, beginTime: "12:20", endTime: "13:50" },
    { id: 4, beginTime: "14:10", endTime: "15:40" },
    { id: 5, beginTime: "15:50", endTime: "17:20" },
    { id: 6, beginTime: "17:30", endTime: "19:00" },
    { id: 7, beginTime: "19:10", endTime: "20:30" },
    { id: 8, beginTime: "20:40", endTime: "22:00" },
];

class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            activePanel: props.activePanel,
            tab: sessionStorage.getItem('newsTab') !== null ? parseInt(sessionStorage.getItem('newsTab')) : (props.super === null ? 0 : -1),
            yInterval: 0,
            news: JSON.parse(sessionStorage.getItem('news')) || props.news,
            super: JSON.parse(sessionStorage.getItem('super')) || props.super,
            loadMore: 'Загружены все новости',
            loading: false,
            snackbar: null,
            banners: JSON.parse(sessionStorage.getItem('banners')) || props.banners,
            deadlines: JSON.parse(localStorage.getItem('deadlines')) || props.deadlines,
            schedule: JSON.parse(localStorage.getItem('schedule')) || props.schedule,
            isSub: JSON.parse(localStorage.getItem('groupBanner')) !== null ? JSON.parse(localStorage.getItem('groupBanner')) : props.super !== null ? !props.super[0].is_sub : false,
            animations: JSON.parse(localStorage.getItem('animations')) || props.animations === 1,
            slideIndex: 0
        };
        this.onRefresh = () => {
            console.log(this.state.loading)
        };
        this.snackbarRender = this.snackbarRender.bind(this);
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

    getSuper() {
        this.setState({ loading: true });
        if (!window.navigator.onLine) {
            this.setState({ loading: false });
            this.snackbarRender('Отсутствует подключение к интернету!', 2)
        }
    }

    updateYOffset() {
        sessionStorage.setItem('y', window.pageYOffset);
    }

    componentDidMount() {
        window.scrollTo(0, parseInt(sessionStorage.getItem('y')));
        if (this.props.platform !== 'ios') {
            document.getElementById("tab" + this.state.tab).scrollIntoView({ inline: "center" })
        }
        let interval = setInterval(this.updateYOffset, 1000);
        this.setState({ yInterval: interval });
    }

    componentWillUnmount() {
        clearInterval(this.state.yInterval)
    }

    tabsRender() {
        return (
            <FixedLayout vertical="top" style={{ marginTop: -1 }}>
                <div style={{ background: 'var(--header_background)' }}>
                    <HorizontalScroll>
                        <div style={{ display: "flex" }}>
                            {this.state.super !== null &&
                                <div
                                    key={8}
                                >
                                    <PocketButton
                                        id={"tab-1"}
                                        key={-1}
                                        selected={this.state.tab === -1}
                                        clickable={this.state.animations === 1}
                                        onClick={() => {
                                            if (this.state.loading === false) {
                                                this.setState({
                                                    tab: -1,
                                                });
                                                sessionStorage.setItem('newsTab', -1);
                                                sessionStorage.setItem('y', 0);
                                                window.scrollTo(0, 0);
                                                if (this.props.platform !== 'ios') {
                                                    document.getElementById("tab-1").scrollIntoView({
                                                        inline: "center",
                                                        behavior: "smooth"
                                                    })
                                                }
                                                this.props.platform === 'ios' && bridge.send("VKWebAppTapticImpactOccurred", { "style": "light" });
                                            }
                                        }}
                                    >
                                        Сводка
                                </PocketButton>
                                </div>
                            }
                            {Tabs.map((Tab, index) => (
                                <div
                                    key={index}
                                    style={{ paddingRight: index === Tabs.length - 1 ? 12 : 0 }}
                                >
                                    <PocketButton
                                        id={"tab" + index}
                                        key={index}
                                        selected={this.state.tab === index}
                                        clickable={this.state.animations === 1}
                                        onClick={() => {
                                            if (this.state.loading === false) {
                                                this.setState({
                                                    tab: index,
                                                });
                                                sessionStorage.setItem('newsTab', index);
                                                sessionStorage.setItem('y', 0);
                                                window.scrollTo(0, 0);
                                                if (this.props.platform !== 'ios') {
                                                    this.props.platform !== 'ios' && document.getElementById("tab" + index).scrollIntoView({
                                                        inline: "center",
                                                        behavior: "smooth"
                                                    })
                                                }
                                                this.props.platform === 'ios' && bridge.send("VKWebAppTapticImpactOccurred", { "style": "light" });
                                            }
                                        }}
                                    >
                                        {Tab.name}
                                    </PocketButton>
                                </div>
                            ))}
                        </div>
                    </HorizontalScroll>
                </div>
            </FixedLayout>
        )
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

    greetingsPhrase(m) {
        if (!m || !m.isValid()) {
            return;
        }
        var currentHour = parseFloat(m.format("HH"));
        if (currentHour >= 0 && currentHour < 4) {
            return 'Доброй ночи';
        } else if (currentHour >= 4 && currentHour < 12) {
            return 'Доброе утро';
        } else if (currentHour >= 12 && currentHour < 16) {
            return 'Добрый день';
        } else if (currentHour >= 16 && currentHour < 24) {
            return 'Добрый вечер';
        }
    }

    imageFinder(news) {
        if (news.hasOwnProperty('attachments')) {
            if (news.attachments.find(x => x.type === 'photo') !== undefined) {
                return news.attachments.find(x => x.type === 'photo').photo.sizes[news.attachments.find(x => x.type === 'photo').photo.sizes.length - 1].url;
            } else if (news.attachments.find(x => x.type === 'video') !== undefined) {
                return news.attachments.find(x => x.type === 'video').video.image[2].url;
            } else if (news.attachments.find(x => x.type === 'audio_playlist') !== undefined) {
                return news.attachments.find(x => x.type === 'audio_playlist').photo.photo_300;
            } else if (news.attachments.find(x => x.type === 'link') !== undefined) {
                if (news.attachments.find(x => x.type === 'link').link.hasOwnProperty('photo')) {
                    return news.attachments.find(x => x.type === 'link').link.photo.sizes[news.attachments.find(x => x.type === 'link').link.photo.sizes.length - 1].url;
                } else {
                    return '';
                }
            } else {
                return '';
            }
        } else {
            return '';
        }
    }

    centerRender() {
        return (
            <div style={{ marginTop: 60 }}>
                <div>
                    <div className='date default' style={{ marginLeft: 12 }}>
                        {this.greetingsPhrase(moment())}{this.props.sName.split(' ')[0] !== '' ? ", " + this.props.sName.split(' ')[0] : ''}
                    </div>
                    <div>
                        <PocketBanner name="groupBanner" visible={this.state.isSub} subtitle="Узнай о новинках первым!"
                            link="" textOfLink="Вступить" type={1} clickable={this.state.animations === 1}
                            onButtonClick={() => {
                                bridge.send("VKWebAppJoinGroup", { "group_id": 184800526 });
                                this.setState({ isSub: false })
                            }}>
                            Вступай в группу!
                            </PocketBanner>
                    </div>
                    {(this.state.isSub || this.state.banners.length > 0) &&
                        <div className='date default' style={{ marginLeft: 12, marginTop: 12 }}>
                            Погода на сегодня
                    </div>
                    }
                    <PocketDiv>
                        <PocketWeather id={this.state.super[0].weather.id}
                            temperature={this.state.super[0].weather.temp}
                            description={this.state.super[0].weather.conditions} />
                    </PocketDiv>
                </div>
                {this.state.super[0].deadlines.length > 0 &&
                    <PocketDiv map
                        title={this.state.super[0].deadlines.length === 1 ? "Ближайший дедлайн" : "Ближайшие дедлайны"}
                        onClick={() => {
                            this.props.parentFunc2("deadlines");
                            sessionStorage.setItem('filter', 1)
                        }} clickable>
                        {this.state.super[0].deadlines.slice(0).reverse().map((deadline, index) => (
                            <PocketDeadline key={index} style={{ marginTop: 12, width: "100%" }}
                                status={this.checkStatus(deadline, 2)}
                                lesson={deadline.idsubject === 0 || this.state.schedule.length === 0 || this.state.schedule.findIndex(x => x.ItemId === deadline.idsubject) === -1 ? '' : this.state.schedule.find(x => x.ItemId === deadline.idsubject).Disc}
                                hasText={deadline.comment !== ''}>
                                {deadline.subjectname}
                            </PocketDeadline>
                        ))}
                    </PocketDiv>
                }
                {this.state.super[0].lessons.length > 0 &&
                    <div style={{ marginTop: 12 }}>
                        <PocketDiv map title='Сегодняшнее расписание' onClick={() => {
                            this.props.parentFunc2("schedule")
                        }} clickable>
                            {this.state.super[0].lessons.sort((a, b) => (a.Less > b.Less) ? 1 : ((b.Less > a.Less) ? -1 : 0)).map((Lesson, index) => (
                                <div key={index}>
                                    <PocketDay
                                        style={{ paddingTop: 12 }}
                                        number={Lesson.Less}
                                        beginTime={Lesson.Less === 0 ? "Нет" : Times[Lesson.Less - 1].beginTime}
                                        endTime={Lesson.Less === 0 ? "Нет" : Times[Lesson.Less - 1].endTime}
                                        current={false}
                                        type={Lesson.Type}
                                        teacher={Lesson.Preps === null ? "Преподаватель не указан" : Lesson.PrepsText}
                                        room={(Lesson.Rooms !== null && Lesson.Build !== null) ? (Lesson.Build + " " + Lesson.Rooms) : Lesson.Dept !== null ? Lesson.Dept : "Не указано"}
                                        name={Lesson.Disc}
                                        deadlines={this.state.deadlines.length > 0 && this.lessonDeadlines(Lesson, this.state.deadlines).length > 0}
                                        groupsAmount={Lesson.Groups.split("::").length}
                                        groups={Lesson.GroupsText}
                                    />
                                    <div>
                                        {moment().format("HH:mm") >= Times[Lesson.Less - 1].endTime &&
                                            moment().format("HH:mm") < Times[Lesson.Less].beginTime &&
                                            index < this.state.super[0].lessons.length - 1 &&
                                            (
                                                <PocketSeparator style={{ marginTop: 12 }}>
                                                    Перерыв c {Times[Lesson.Less - 1].endTime} до{" "}
                                                    {Times[Lesson.Less].beginTime}
                                                </PocketSeparator>
                                            )}
                                    </div>
                                </div>
                            ))}
                        </PocketDiv>
                    </div>
                }
                {this.state.super[0].news.length > 0 &&
                    <PocketDiv map title='Актуальные новости'>
                        {this.state.super[0].news.sort((a, b) => moment.unix(b.date).utc().diff(moment.unix(a.date).utc())).map((news, index) => (
                            news.text !== "" &&
                            <div style={{ paddingTop: 12 }} key={index}>
                                <PocketNews
                                    author={Tabs.find(x => Math.abs(x.ownerId) === Math.abs(news.owner_id)).name}
                                    time={news.date}
                                    likes={news.likes.count}
                                    title={news.text || "Без заголовка"}
                                    image={news.url} />
                            </div>
                        ))}
                    </PocketDiv>
                }
            </div>
        )
    }

    newsRender() {
        return (
            <div style={{ marginTop: 60 }}>
                <div id='news'>
                    {this.state.news[this.state.tab].length > 0 && (
                        this.state.news[this.state.tab][0].hasOwnProperty("is_pinned") &&
                        <PocketNews
                            author={Tabs.find(x => Math.abs(x.ownerId) === Math.abs(this.state.news[this.state.tab][0].owner_id)).name}
                            pinned={true} 
                            time={this.state.news[this.state.tab][0].date}
                            likes={this.state.news[this.state.tab][0].likes.count}
                            title={this.state.news[this.state.tab][0].text || "Без заголовка"}
                            image={this.state.news[this.state.tab][0].url} />
                    )
                    }
                    {this.state.news.length > 0 && (
                        <div>
                            <PocketDiv map style={{ marginTop: 12 }}>
                                {this.state.news[this.state.tab].map((news, index) => (
                                    !news.hasOwnProperty('is_pinned') && news.text !== "" &&
                                    <div style={{ paddingTop: 12 }} key={index}>
                                        <PocketNews
                                            author={Tabs.find(x => Math.abs(x.ownerId) === Math.abs(news.owner_id)).name}
                                            time={news.date}
                                            likes={news.likes.count}
                                            title={news.text || "Без заголовка"}
                                            image={news.url} />
                                    </div>
                                ))}
                            </PocketDiv>
                            <div className="row date default"
                                style={{ color: "var(--pocket_dark_blue)", margin: 12, justifyContent: 'center' }}>
                                {this.state.loadMore}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    render() {
        return (
            <View id={this.state.id} popout={this.state.popout} activePanel={this.state.activePanel}>
                <Panel id={this.state.id}>
                    <PanelHeader noShadow>
                        <div className="header panel">
                            Новости
                        </div>
                    </PanelHeader>
                    {this.tabsRender()}
                    {this.state.tab === -1 ? this.centerRender() : this.newsRender()}
                    {this.state.snackbar}
                </Panel>
            </View>
        )
    }
}

export default News;