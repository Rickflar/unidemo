import React from 'react';
import "moment/locale/ru";
import '@vkontakte/vkui/dist/vkui.css';
import bridge from '@vkontakte/vk-bridge'
import View from "@vkontakte/vkui/dist/components/View/View";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import HorizontalScroll from "@vkontakte/vkui/dist/components/HorizontalScroll/HorizontalScroll";
import SelectMimicry from "@vkontakte/vkui/dist/components/SelectMimicry/SelectMimicry";
import Placeholder from "@vkontakte/vkui/dist/components/Placeholder/Placeholder";
import PocketCell from "../components/PocketCell/PocketCell";
import ModalPageHeader from "@vkontakte/vkui/dist/components/ModalPageHeader/ModalPageHeader";
import HeaderButton from "@vkontakte/vkui/dist/components/HeaderButton/HeaderButton";
import ModalPage from "@vkontakte/vkui/dist/components/ModalPage/ModalPage";
import ModalCard from "@vkontakte/vkui/dist/components/ModalCard/ModalCard";
import ModalRoot from "@vkontakte/vkui/dist/components/ModalRoot/ModalRoot";
import Switch from "@vkontakte/vkui/dist/components/Switch/Switch";
import Radio from "@vkontakte/vkui/dist/components/Radio/Radio";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import Search from "@vkontakte/vkui/dist/components/Search/Search";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import FixedLayout from "@vkontakte/vkui/dist/components/FixedLayout/FixedLayout";
import Snackbar from "@vkontakte/vkui/dist/components/Snackbar/Snackbar";

import PocketDiv from "../components/PocketDiv/PocketDiv";
import PocketAchievement from "../components/PocketAchievement/PocketAchievement";
import PocketAvatar from "../components/PocketAvatar/PocketAvatar";

import Icon24BrowserBack from '@vkontakte/icons/dist/24/browser_back';
import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import Icon28NarrativeOutline from '@vkontakte/icons/dist/28/narrative_outline';
import Icon56DoNotDisturbOutline from '@vkontakte/icons/dist/56/do_not_disturb_outline';
import Icon28CheckCircleOutline from '@vkontakte/icons/dist/28/check_circle_outline';
import Icon28Search from '@vkontakte/icons/dist/28/search';
import Icon28CancelCircleOutline from '@vkontakte/icons/dist/28/cancel_circle_outline';
import PocketButton from "../components/PocketButton/PocketButton";
import Logo from '../images/Logo.png';
import DarkLogo from '../images/DarkLogo.png';

import { Achievements } from "../data/achievements/achievements";
import { Rating } from "../data/achievements/rating";

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: parseInt(localStorage.getItem('tab')) || props.tab,
            achievementstab: 1,
            sName: "Никита Иванов",
            sPhoto: props.sPhoto,
            settings: props.settings,
            activePanel: props.activePanel,
            animations: JSON.parse(localStorage.getItem('animations')) || props.animations,
            building: parseInt(localStorage.getItem('building')) || props.building,
            groups: props.groups,
            uId: props.uId,
            name: props.name,
            type: props.type,
            search: '',
            achievement: [],
            snackbar: null,
            popout: null,
            eruda: JSON.parse(localStorage.getItem('eruda')) != null ? JSON.parse(localStorage.getItem('eruda')) === true : false,
        };
        this.modalBack = () => {
            this.setActiveModal(
                this.state.modalHistory[this.state.modalHistory.length - 2]
            );
        };
        this.searchChange = this.searchChange.bind(this);
        this.animChange = this.animChange.bind(this);
        this.buildingChange = this.buildingChange.bind(this);
        this.tabChange = this.tabChange.bind(this);
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

    animChange() {
        this.updateSettings(this.state.tab, this.state.animations === 1 ? 0 : 1, this.state.building);
    };

    eruda = async () => {
        localStorage.setItem('eruda', !this.state.eruda);
        await this.setState({ eruda: !this.state.eruda });
        this.state.eruda ? window.eruda.init() : window.eruda.destroy()
    };

    get groups() {
        const search = this.state.search.toLowerCase().trim();
        return this.state.groups.filter(({ Name }) => Name.toLowerCase().indexOf(search) > -1);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    buildingChange(e) {
        this.updateSettings(this.state.tab, this.state.animations, parseInt(e.currentTarget.value));
    }

    tabChange(e) {
        this.updateSettings(parseInt(e.currentTarget.value), this.state.animations, this.state.building);
    }

    updateGroup(group) {
        this.setState({ snackbar: null });

        localStorage.setItem('id', group.ItemId);
        localStorage.setItem('name', group.Name);
        localStorage.setItem('header', group.Name);
        localStorage.setItem('type', 1);
        this.snackbarRender('Группа успешно сохранена', 1);
        this.setState({
            shouldUpdate: true,
            name: group.Name,
            uId: group.ItemId,
            type: 1
        })
    }

    updateSettings(tab, animations, building) {
        this.setState({
            tab: parseInt(tab),
            building: parseInt(building),
            animations: animations,
            snackbar: null
        });

        this.snackbarRender('Настройки успешно сохранены!', 1);
        localStorage.setItem('animations', animations);
        localStorage.setItem('building', building);
        localStorage.setItem('tab', tab);
    }

    settingsRender() {
        return (
            <div>
                <PanelHeader noShadow>
                    <div className="header panel">
                        Настройки
                    </div>
                </PanelHeader>
                {this.state.sName !== '' &&
                    <PocketDiv title='Карточка студента'>
                        <div className="row">
                            <div>
                                <PocketAvatar type='avatar' size={54}
                                    src={"https://sun9-71.userapi.com/c848632/v848632448/1d1248/j4-jBScjc2c.jpg?ava=1"} />
                            </div>
                            <div className='column' style={{ marginLeft: 12 }}>
                                <div className='teacher' style={{ color: "var(--pocket_black)" }}>
                                    {this.state.sName}
                                </div>
                                {this.state.name !== '' &&
                                    <div className='teacher' style={{ marginTop: 6 }}>
                                        Группа {this.state.name}
                                    </div>
                                }
                            </div>
                            <div className="row" style={{
                                marginLeft: 'auto',
                                borderRadius: 10,
                                minWidth: 44,
                                minHeight: 44,
                                justifyContent: "center"
                            }}>
                                <Icon28NarrativeOutline width={24} height={24} fill="var(--pocket_gray)" />
                                <div className='teacher' style={{ marginLeft: 6 }}>soon</div>
                            </div>
                        </div>
                    </PocketDiv>
                }
                <PocketDiv title='Основные настройки'>
                    <div className='row' style={{ marginBottom: 12 }}>
                        <div className="teacher" style={{ color: 'var(--pocket_black)' }}>
                            Группа
                        </div>
                        {this.state.name !== '' && <div
                            className="teacher"
                            onClick={
                                () => {
                                    this.setState({
                                        name: '',
                                        uId: '',
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
                        this.setState({ search: '' })
                    }} value={this.state.uId}>
                        {this.state.name}
                    </SelectMimicry>
                    <div className="teacher" style={{ color: 'var(--pocket_black)', marginTop: 12 }}>
                        Начальный экран
                    </div>
                    <FormLayout>
                        <div style={{ marginTop: -6, marginBottom: -12 }}>
                            <Radio name="radio" value="1" onChange={this.tabChange} checked={this.state.tab === 1}>
                                <div className="teacher">Новости</div>
                            </Radio>
                            <Radio name="radio" value="2" onChange={this.tabChange} checked={this.state.tab === 2}>
                                <div className="teacher">Дедлайны</div>
                            </Radio>
                            <Radio name="radio" value="3" onChange={this.tabChange} checked={this.state.tab === 3}>
                                <div className="teacher">Расписание</div>
                            </Radio>
                            <Radio name="radio" value="4" onChange={this.tabChange} checked={this.state.tab === 4}>
                                <div className="teacher">Справочник</div>
                            </Radio>
                        </div>
                    </FormLayout>
                    <div className="teacher" style={{ color: 'var(--pocket_black)', marginTop: 12 }}>
                        Корпус по умолчанию
                    </div>
                    <FormLayout>
                        <div style={{ marginTop: -6, marginBottom: -12 }}>
                            <Radio name="radio" value="1" onChange={this.buildingChange}
                                checked={this.state.building === 1}>
                                <div className="teacher">Большая Морская 67</div>
                            </Radio>
                            <Radio name="radio" value="2" onChange={this.buildingChange}
                                checked={this.state.building === 2}>
                                <div className="teacher">Гастелло 15</div>
                            </Radio>
                            <Radio name="radio" value="3" onChange={this.buildingChange}
                                checked={this.state.building === 3}>
                                <div className="teacher">Ленсовета 14</div>
                            </Radio>
                        </div>
                    </FormLayout>
                    <div className="teacher" style={{ color: 'var(--pocket_black)', marginTop: 12 }}>
                        Анимация
                    </div>
                    <div className='row' style={{ marginTop: 12 }}>
                        <div className="teacher">
                            Анимация в сервисе
                        </div>
                        <div style={{ marginLeft: 'auto' }}>
                            <Switch checked={this.state.animations === 1} onChange={this.animChange} />
                        </div>
                    </div>
                    <div className="teacher" style={{ color: 'var(--pocket_black)', marginTop: 12 }}>
                        Debug
                    </div>
                    <div className='row' style={{ marginTop: 12 }}>
                        <div className="teacher">
                            Eruda
                        </div>
                        <div style={{ marginLeft: 'auto' }}>
                            <Switch checked={this.state.eruda} onChange={this.eruda} />
                        </div>
                    </div>
                </PocketDiv>
                <PocketDiv title='О сервисе'>
                    <div className="row">
                        <PocketAvatar size={54} type="app" src={this.props.theme === "space_gray" ? DarkLogo : Logo} />
                        <div className='column' style={{ marginLeft: 12 }}>
                            <div className='teacher' style={{ color: "var(--pocket_black)" }}>
                                Версия 1.4 Eco
                            </div>
                            <div className='teacher' style={{ marginTop: 6 }}>
                                <a href='https://vk.com/public184800526'> Группа ВКонтакте </a>
                            </div>
                        </div>
                    </div>
                </PocketDiv>
            </div>
        )
    }

    achievementsRender() {
        return (
            <PocketDiv map>
                {Achievements.map((Achievement, index) => (
                    <PocketAchievement gained key={index} title={Achievement.name} image={Achievement.img}
                        style={{ marginTop: 12 }} onClick={() => {
                            this.setState({ achievement: Achievement });
                            this.setActiveModal('achievement');
                        }}>
                        {Achievement.description}
                    </PocketAchievement>
                ))}
            </PocketDiv>
        )
    }

    ratingRender() {
        return (
            <PocketDiv map>
                {Rating.map((User, index) => (
                    <PocketAchievement rating position={index + 1} key={index} title={User.name} image={User.img}
                        style={{ marginTop: 12 }}>
                        {User.group}
                    </PocketAchievement>
                ))}
            </PocketDiv>
        )
    }

    achievementsTabRender() {
        return (
            <div>
                <PanelHeader noShadow
                    left={<HeaderButton>
                        <Icon24BrowserBack fill={"var(--pocket_gray)"}
                            onClick={() => this.setState({ activePanel: 'settings' })} />
                    </HeaderButton>}
                >
                    <div className="header panel">
                        Достижения
                    </div>
                </PanelHeader>
                <div className='date default' style={{ marginLeft: 12, marginTop: 54 }}>
                    {this.state.achievementstab === 1 ?
                        "Все достижения"
                        :
                        "Рейтинг пользователей (обновлен 1 марта)"
                    }
                </div>
                <FixedLayout vertical="top" style={{ marginTop: -1 }}>
                    <div style={{ background: 'var(--pocket_white)' }}>
                        <HorizontalScroll>
                            <div style={{ display: "flex" }}>
                                <PocketButton
                                    selected={this.state.achievementstab === 1}
                                    clickable={this.state.animations}
                                    onClick={() => {
                                        this.setState({ achievementstab: 1 });
                                    }}>
                                    Достижения
                                </PocketButton>
                                <PocketButton
                                    selected={this.state.achievementstab === 2}
                                    onClick={() => {
                                        this.setState({ achievementstab: 2 });
                                    }}
                                >
                                    Рейтинг
                                </PocketButton>
                            </div>
                        </HorizontalScroll>
                    </div>
                </FixedLayout>
                {this.state.achievementstab === 1 ?
                    this.achievementsRender()
                    :
                    this.ratingRender()
                }
            </div>
        )
    }

    render() {
        const modal = (
            <ModalRoot activeModal={this.state.activeModal}>
                <ModalPage
                    id={"groups"}
                    dynamicContentHeight
                    onClose={() => {
                        this.modalBack();
                        this.setState({ groups: this.props.groups })
                    }}
                    header={
                        <ModalPageHeader
                            right={
                                <HeaderButton onClick={() => {
                                    this.modalBack();
                                    this.setState({ groups: this.props.groups });
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
                                Выбор группы
                            </div>
                        </ModalPageHeader>
                    }
                >
                    <div style={{ marginLeft: 4, marginRight: 4 }}><Search value={this.state.search}
                        onChange={this.searchChange} /></div>
                    {this.groups.length > 0 && this.state.search !== '' &&
                        <div style={{ marginLeft: 12, marginRight: 12, minHeight: 320 }}>
                            {this.groups.map((group, index) => (
                                <PocketCell mobile={false} key={index} onClick={() => {
                                    if (this.state.name !== group.name) this.updateGroup(group);
                                    this.modalBack()
                                }} key={group.ItemId}>
                                    {group.Name}
                                </PocketCell>
                            ))
                            }
                        </div>
                    }
                    {this.state.search === '' &&
                        <div style={{ minHeight: 320, display: 'flex', justifyContent: 'center' }}>
                            <Placeholder
                                icon={
                                    <Icon28Search width={56} height={56}
                                        style={{ color: "var(--pocket_dark_blue)" }}
                                    />
                                }
                                title={
                                    <div
                                        className="header"
                                        style={{ color: "var(--pocket_black)" }}
                                    >
                                        Найди, что ищешь
                                </div>
                                }
                            >
                                <div className="teacher" style={{ whiteSpace: 'normal' }}>Начни вводить запрос, чтобы увидеть
                                    результат
                            </div>
                            </Placeholder>
                        </div>
                    }
                    {this.groups.length === 0 && this.state.search !== '' &&
                        <div style={{ minHeight: 320, display: 'flex', justifyContent: 'center' }}>
                            <Placeholder
                                icon={
                                    <Icon56DoNotDisturbOutline
                                        style={{ color: "var(--pocket_dark_blue)" }}
                                    />
                                }
                                title={
                                    <div
                                        className="header"
                                        style={{ color: "var(--pocket_black)" }}
                                    >
                                        Упс, ничего не нашлось
                                </div>
                                }
                            >
                                <div className="teacher" style={{ whiteSpace: 'normal' }}>Проверь поиск, вдруг ошибся</div>
                            </Placeholder>
                        </div>
                    }
                </ModalPage>
                <ModalCard
                    id={"achievement"}
                    onClose={() => {
                        this.modalBack();
                    }}
                >
                    <div className='column' style={{ justifyContent: "center", alignItems: "center" }}>
                        <div
                            align="center"
                            className="name"
                            style={{ color: "var(--pocket_black)", marginBottom: 12, marginTop: 4 }}
                        >
                            {this.state.achievement.name}
                        </div>
                        <PocketAvatar size={54} src={this.state.achievement.img} />
                        <div className="teacher" style={{ textAlign: 'center', marginTop: 6 }}>
                            {this.state.achievement.description}
                        </div>
                        <div className="teacher"
                            style={{ textAlign: 'center', marginTop: 6, color: "var(--pocket_green)" }}>
                            Открыто
                        </div>
                    </div>
                    <div style={{ marginTop: 12 }} className='row'>
                        <Button
                            onClick={() => {
                            }}
                            size="xl"
                            level="outline"
                            style={{
                                color: "var(--pocket_dark_blue)",
                                border: "1px solid var(--pocket_dark_blue)",
                                height: "40px"
                            }}
                        >
                            Поделиться в истории
                        </Button>
                    </div>
                </ModalCard>
            </ModalRoot>
        );
        return (
            <View modal={modal} popout={this.state.popout} activePanel={this.state.activePanel}>
                <Panel id='settings'>
                    {this.settingsRender()}
                    {this.state.snackbar}
                </Panel>
                <Panel id='achievements'>
                    {this.achievementsTabRender()}
                </Panel>
            </View>
        )
    }
}

export default Settings;
