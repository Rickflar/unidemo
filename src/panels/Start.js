import React from 'react'
import axios from 'axios';
import './startScreens/startScreens.css'
import Gallery from "@vkontakte/vkui/dist/components/Gallery/Gallery";
import View from "@vkontakte/vkui/dist/components/View/View";
import SelectMimicry from "@vkontakte/vkui/dist/components/SelectMimicry/SelectMimicry";
import ModalPage from "@vkontakte/vkui/dist/components/ModalPage/ModalPage";
import ModalRoot from "@vkontakte/vkui/dist/components/ModalRoot/ModalRoot";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Placeholder from "@vkontakte/vkui/dist/components/Placeholder/Placeholder";
import ModalPageHeader from "@vkontakte/vkui/dist/components/ModalPageHeader/ModalPageHeader";
import HeaderButton from "@vkontakte/vkui/dist/components/HeaderButton/HeaderButton";
import Search from "@vkontakte/vkui/dist/components/Search/Search";
import PocketCell from "../components/PocketCell/PocketCell";

import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import Icon28Search from '@vkontakte/icons/dist/28/search';
import Icon56DoNotDisturbOutline from '@vkontakte/icons/dist/56/do_not_disturb_outline';

import Welcome from "./startScreens/Welcome";
import NewsScreen from "./startScreens/NewsScreen";
import DeadlinesScreen from "./startScreens/DeadlinesScreen";
import ScheduleScreen from "./startScreens/ScheduleScreen";
import InfoScreen from "./startScreens/InfoScreen";

class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
            settings: props.settings,
            uId: '',
            name: '',
            type: 1,
            groups: props.groups,
            search: ''
        }
        ;
        this.modalBack = () => {
            this.setActiveModal(
                this.state.modalHistory[this.state.modalHistory.length - 2]
            );
        };
        this.searchChange = this.searchChange.bind(this);
        this.selectGroup = this.selectGroup.bind(this);
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

    selectGroup() {
        this.setState({slideIndex: 5})
    }

    setGroup(group) {
        return (
            axios.post("https://suaipocket.ru:8000/SetGroup", {
                group: group.Name,
                timeout: 15000
            }).then(() => {
                localStorage.setItem('id', group.ItemId);
                localStorage.setItem('name', group.Name);
                localStorage.setItem('type', 1);
            }).catch(() => {
                this.setState({
                    error: true
                })
            })
        )
    }

    selectGroupRender() {
        return (
            <div
                className="container"
            >
                <div className='sixthCircle'/>
                <div className='centerBlock' style={{width: '70vw'}}>
                    <SelectMimicry placeholder="Выберите группу" onClick={() => {
                        this.setActiveModal("groups");
                        this.setState({search: ''})
                    }} value={this.state.uId}>
                        {this.state.name}
                    </SelectMimicry>
                    {this.state.uId !== '' && this.state.name !== '' &&
                    <div style={{marginTop: 12}} className='row'>
                        <Button
                            onClick={this.props.function}
                            size="xl"
                            level="outline"
                            style={{
                                color: "var(--pocket_dark_blue)",
                                border: "1px solid var(--pocket_dark_blue)",
                                height: "40px"
                            }}
                        >
                            Продолжить
                        </Button>
                    </div>
                    }
                </div>
                <div className="welcomeTitle header">Начнем?</div>
                <div className="welcomeSubtitle teacher" style={{whiteSpace: "pre-wrap"}}>Выбери свою группу и
                    нажми “Продолжить”
                </div>
            </div>
        )
    }

    render() {
        const modal = (
            <ModalRoot activeModal={this.state.activeModal}>
                <ModalPage
                    dynamicContentHeight
                    id={"groups"}
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
                        {this.groups.map(group => (
                            <PocketCell mobile={false} onClick={() => {
                                this.setState({shouldUpdate: true, name: group.Name, uId: group.ItemId, type: 1});
                                localStorage.setItem('id', group.ItemId);
                                localStorage.setItem('name', group.Name);
                                localStorage.setItem('type', 1);
                                this.setGroup(group);
                                this.modalBack();
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
            </ModalRoot>
        );
        return (
            <View modal={modal} activePanel='start'>
                <div id='start'>
                    <Gallery
                        slideWidth="100%"
                        style={{height: '100vh'}}
                        bullets="dark"
                        slideIndex={this.state.slideIndex}
                        onChange={slideIndex => this.setState({slideIndex})}
                    >
                        <Welcome parentFunc={this.selectGroup}/>
                        <NewsScreen/>
                        <DeadlinesScreen/>
                        <ScheduleScreen settings={this.state.settings}/>
                        <InfoScreen/>
                        <div>
                            {this.selectGroupRender()}
                        </div>
                    </Gallery>
                </div>
            </View>
        );
    }
}

export default Start