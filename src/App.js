import React from 'react';
import bridge from '@vkontakte/vk-bridge'
import '@vkontakte/vkui/dist/vkui.css';
import Tabbar from "@vkontakte/vkui/dist/components/Tabbar/Tabbar";
import Epic from "@vkontakte/vkui/dist/components/Epic/Epic";
import TabbarItem from "@vkontakte/vkui/dist/components/TabbarItem/TabbarItem";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import Snackbar from "@vkontakte/vkui/dist/components/Snackbar/Snackbar";
import smoothscroll from 'smoothscroll-polyfill';
import { motion } from "framer-motion"
import { withPlatform } from '@vkontakte/vkui';

import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';
import Icon28FireOutline from '@vkontakte/icons/dist/28/fire_outline';
import Icon28CalendarOutline from '@vkontakte/icons/dist/28/calendar_outline';
import Icon28InfoOutline from '@vkontakte/icons/dist/28/info_outline';
import Icon28UserCircleOutline from '@vkontakte/icons/dist/28/user_circle_outline';
import Icon28CheckCircleOutline from '@vkontakte/icons/dist/28/check_circle_outline';
import Icon28CancelCircleOutline from '@vkontakte/icons/dist/28/cancel_circle_outline';

import moment from "moment";
import "moment/locale/ru";

import News from './panels/News';
import Settings from './panels/Settings';
import Schedule from "./panels/Schedule";
import Info from "./panels/Info";
import Deadlines from "./panels/Deadlines";

import { Super } from './data/demo/super'
import { NewsArray } from './data/demo/news'
import { DeadlinesArray } from './data/demo/deadlines'
import { Banner } from './data/demo/banners'
import { Teachers } from './data/demo/teachers'
import { Orders } from './data/demo/orders'
import { SettingsArray } from './data/demo/settings'
import { Groups } from './data/demo/groups'
import { ScheduleArray } from './data/demo/schedule'

import './styles.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStory: sessionStorage.getItem('activeStory') || '',
            first: null,
            tab: 1,
            animations: 0,
            building: 1,
            groups: Groups,
            teachers: Teachers,
            settings: Settings,
            deadlines: Deadlines,
            schedule: Schedule,
            banner: Banner,
            news: News,
            super: Super,
            orders: Orders,
            uId: 248,
            name: 'М611',
            type: 1,
            theme: 'client_light',
            notvk: false,
            sName: 'Никита',
            sPhoto: 'Ланда',
            platform: this.props,
            deadlinesCount: 0,
            snackbar: null,
            vkInit: false
        };
        this.onStoryChange = this.onStoryChange.bind(this);
        this.changeStory = this.changeStory.bind(this);
        this.getStory = this.getStory.bind(this);
        this.goToApp = this.goToApp.bind(this);
        this.deadlinesCounter = this.deadlinesCounter.bind(this);
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

    componentWillMount() {
        bridge.send("VKWebAppInit", {});
        bridge.subscribe((e) => {
            switch (e.detail.type) {
                case 'VKWebAppInitResult':
                    this.setState({ vkInit: e.detail.data.result });
                    break;
                case 'VKWebAppGetUserInfoResult':
                    this.setState({
                        sName: e.detail.data.first_name + " " + e.detail.data.last_name,
                        sPhoto: e.detail.data.photo_200
                    });
                    sessionStorage.setItem('name', e.detail.data.first_name + " " + e.detail.data.last_name);
                    sessionStorage.setItem('photo', e.detail.data.photo_200);
                    break;
                case 'VKWebAppUpdateConfig':
                    const schemeAttribute = document.createAttribute('scheme');
                    schemeAttribute.value = e.detail.data.scheme ? e.detail.data.scheme : 'client_light';
                    document.body.attributes.setNamedItem(schemeAttribute);
                    bridge.send("VKWebAppSetViewSettings", {
                        "status_bar_style": (schemeAttribute.value === 'client_light' || schemeAttribute.value === 'bright_light') ? "dark" : "light",
                        "action_bar_color": (schemeAttribute.value === 'client_light' || schemeAttribute.value === 'bright_light') ? "#FFFFFF" : "#1A1C21"
                    });
                    this.setState({ theme: schemeAttribute.value });
                    break;
            }
        });
        if (JSON.parse(localStorage.getItem('eruda')) !== null && JSON.parse(localStorage.getItem('eruda'))) window.eruda.init();
        smoothscroll.polyfill();
        bridge.send("VKWebAppGetUserInfo", {});
        localStorage.setItem('building', 3);
        localStorage.setItem('tab', 1);
        localStorage.setItem('animations', 1);
        localStorage.setItem('id', 248);
        localStorage.setItem('name', 'М611');
        localStorage.setItem('type', 1);
        localStorage.setItem('header', 'М611');
        localStorage.setItem('deadlines', JSON.stringify(DeadlinesArray));
        localStorage.setItem('settings', JSON.stringify(SettingsArray));
        localStorage.setItem('groups', JSON.stringify(Groups));
        localStorage.setItem('teachers', JSON.stringify(Teachers));
        sessionStorage.setItem('news', JSON.stringify(NewsArray));
        sessionStorage.setItem('super', JSON.stringify(Super));
        localStorage.setItem('schedule', JSON.stringify(ScheduleArray));
        sessionStorage.setItem('banners', JSON.stringify(Banner));
        sessionStorage.setItem('orders', JSON.stringify(Orders));
        sessionStorage.setItem('deadlinesCount', DeadlinesArray.filter(deadline => ((moment(deadline.end).isBetween(moment().format('YYYY-MM-DD').toString(), moment().add(7, 'days').format('YYYY-MM-DD').toString(), null, '[]') || moment(deadline.end).isBefore(moment().format('YYYY-MM-DD').toString())) && deadline.closed === 0)).length)
    }

    componentDidMount() {
        setInterval(this.deadlinesCounter, 500);
    }

    deadlinesCounter() {
        if (sessionStorage.getItem('deadlinesCount') !== null && parseInt(sessionStorage.getItem('deadlinesCount')) !== this.state.deadlinesCount) {
            this.setState({ deadlinesCount: parseInt(sessionStorage.getItem('deadlinesCount')) });
            this.forceUpdate();
        }
    }

    getStory(tab) {
        switch (tab) {
            case 1:
                return 'feed';
            case 2:
                return 'deadlines';
            case 3:
                return 'schedule';
            case 4:
                return 'info';
        }
    }

    goToApp() {
        this.setState({
            first: false,
            uId: localStorage.getItem('id'),
            deadlines: [],
            name: localStorage.getItem('name')
        });
        this.setState({
            tab: 1,
            building: 1,
            animations: 0
        });
        localStorage.setItem('building', 1);
        localStorage.setItem('tab', 1);
        localStorage.setItem('animations', 0);
        localStorage.setItem('isFirst', false);
        localStorage.setItem('deadlines', JSON.stringify([]));
        this.loadSchedule(localStorage.getItem('id'), localStorage.getItem('name'), 1);
    }

    onStoryChange(e) {
        if (this.state.activeStory === e.currentTarget.dataset.story) {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
            if (this.state.activeStory === 'info') {
                sessionStorage.removeItem('history');
                this.forceUpdate();
            }
        } else {
            this.setState({ activeStory: e.currentTarget.dataset.story });
            sessionStorage.setItem('activeStory', e.currentTarget.dataset.story);
        }
    }

    changeStory(story) {
        this.setState({ activeStory: story });
        sessionStorage.setItem('activeStory', story);
    }

    loaderScreenRender() {
        return (
            <Panel id='loader'>
                <div style={{
                    width: '100%',
                    height: '100%',
                    flex: '0 0 auto',
                    maxWidth: '100%',
                    overflow: 'hidden',
                }}>
                    <div className="container">
                        <div className="firstCircle" />
                        <motion.div className="welcomeLogo"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20
                            }}>
                            pocket
                        </motion.div>
                        <div className='column'
                            style={{
                                position: 'absolute',
                                width: '100vw',
                                bottom: 120,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <div className="teacher">
                                from
                            </div>
                            <div className="welcomeLogo"
                                style={{ color: "var(--pocket_dark_blue)", fontSize: 24, marginTop: 18 }}>
                                team pocket
                            </div>
                        </div>
                    </div>
                </div>
            </Panel>
        )
    }

    mainAppRender() {
        return (
            <Epic
                activeStory={this.state.activeStory = (this.state.activeStory === '' ? this.getStory(this.state.tab) : this.state.activeStory)}
                tabbar={
                    <Tabbar>
                        <TabbarItem
                            onClick={this.onStoryChange}
                            selected={this.state.activeStory === 'feed'}
                            data-story="feed"
                        ><Icon28Newsfeed /></TabbarItem>
                        <TabbarItem
                            onClick={this.onStoryChange}
                            selected={this.state.activeStory === 'deadlines'}
                            data-story="deadlines"
                            label={this.state.deadlinesCount === 0 ? '' : this.state.deadlinesCount}
                        ><Icon28FireOutline
                                style={{ color: this.state.activeStory === 'deadlines' ? "var(--pocket_error)" : "var(--tabbar_inactive_icon)" }} /></TabbarItem>
                        <TabbarItem
                            onClick={this.onStoryChange}
                            selected={this.state.activeStory === 'schedule'}
                            data-story="schedule"
                        ><Icon28CalendarOutline /></TabbarItem>
                        <TabbarItem
                            onClick={this.onStoryChange}
                            selected={this.state.activeStory === 'info'}
                            data-story="info"
                        ><Icon28InfoOutline /></TabbarItem>
                        <TabbarItem
                            onClick={this.onStoryChange}
                            selected={this.state.activeStory === 'settings'}
                            data-story="settings"
                        ><Icon28UserCircleOutline /></TabbarItem>
                    </Tabbar>
                }>
                <News id='feed' activePanel='feed' news={this.state.news} super={this.state.super}
                    sName={this.state.sName} banners={this.state.banners}
                    deadlines={this.state.deadlines} schedule={this.state.schedule}
                    platform={this.state.platform.platform}
                    animations={this.state.animations} parentFunc2={this.changeStory}/>
                <Settings id='settings' activePanel='settings'
                    tab={this.state.tab} animations={this.state.animations}
                    building={this.state.building} groups={this.state.groups} uId={this.state.uId}
                    name={this.state.name} type={this.state.type} settings={this.state.settings}
                    sName={this.state.sName} sPhoto={this.state.sPhoto}
                    platform={this.state.platform.platform}
                    theme={this.state.theme}/>
                <Schedule id="schedule" activePanel="schedule" groups={this.state.groups}
                    teachers={this.state.teachers} settings={this.state.settings}
                    uId={this.state.uId} name={this.state.name} theme={this.state.theme}
                    type={this.state.type} deadlines={this.state.deadlines} schedule={this.state.schedule}
                    platform={this.state.platform.platform}
                    animations={this.state.animations} />
                <Info id="info" activePanel='info' theme={this.state.theme} animations={this.state.animations}
                    orders={this.state.orders} />
                <Deadlines id="deadlines" activePanel='deadlines' deadlines={this.state.deadlines}
                    schedule={this.state.schedule}
                    platform={this.state.platform.platform} animations={this.state.animations} />
            </Epic>
        )
    }

    render() {
        return (this.mainAppRender())
    }
}

export default withPlatform(App);