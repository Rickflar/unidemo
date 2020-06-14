import React from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import {motion} from "framer-motion"
import bridge from '@vkontakte/vk-bridge'
import View from "@vkontakte/vkui/dist/components/View/View";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import FormStatus from "@vkontakte/vkui/dist/components/FormStatus/FormStatus";
import ModalPageHeader from "@vkontakte/vkui/dist/components/ModalPageHeader/ModalPageHeader";
import ModalRoot from "@vkontakte/vkui/dist/components/ModalRoot/ModalRoot";
import ModalPage from "@vkontakte/vkui/dist/components/ModalPage/ModalPage";
import HorizontalScroll from "@vkontakte/vkui/dist/components/HorizontalScroll/HorizontalScroll";
import PullToRefresh from "@vkontakte/vkui/dist/components/PullToRefresh/PullToRefresh";
import ConfigProvider from "@vkontakte/vkui/dist/components/ConfigProvider/ConfigProvider";
import HeaderButton from "@vkontakte/vkui/dist/components/HeaderButton/HeaderButton";
import Placeholder from "@vkontakte/vkui/dist/components/Placeholder/Placeholder";
import Search from "@vkontakte/vkui/dist/components/Search/Search";
import Textarea from "@vkontakte/vkui/dist/components/Textarea/Textarea";
import Input from "@vkontakte/vkui/dist/components/Input/Input";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Radio from "@vkontakte/vkui/dist/components/Radio/Radio";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import Snackbar from "@vkontakte/vkui/dist/components/Snackbar/Snackbar";
import PocketFaq from "../components/PocketFaq/PocketFaq";
import PocketCell from "../components/PocketCell/PocketCell";
import PocketDiv from "../components/PocketDiv/PocketDiv";
import PocketAvatar from "../components/PocketAvatar/PocketAvatar";

import Icon24BrowserBack from '@vkontakte/icons/dist/24/browser_back';
import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import Icon28AddOutline from '@vkontakte/icons/dist/28/add_outline';
import Icon28CheckCircleOutline from '@vkontakte/icons/dist/28/check_circle_outline';
import Icon28CancelCircleOutline from '@vkontakte/icons/dist/28/cancel_circle_outline';
import Icon56DoNotDisturbOutline from '@vkontakte/icons/dist/56/do_not_disturb_outline';

import inst from '../images/faq/inst.png';
import otd from '../images/faq/otd.png';
import hat from '../images/faq/hat.png';
import stu from '../images/faq/stu.png';
import med from '../images/faq/med.png';
import medal from '../images/faq/medal.png';
import ref from '../images/faq/ref.png';
import nav from '../images/faq/nav.png';

import {FastFaq} from '../data/info/fastfaq'
import {Departments, Faculties} from '../data/info/info'
import FixedLayout from "@vkontakte/vkui/dist/components/FixedLayout/FixedLayout";

class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePanel: sessionStorage.getItem('infoPanel') || props.activePanel,
            modalHistory: [],
            activeModal: null,
            fastFaq: [],
            list: JSON.parse(sessionStorage.getItem('list')) || [],
            faculty: JSON.parse(sessionStorage.getItem('faculty')) || [],
            pulpit: JSON.parse(sessionStorage.getItem('pulpit')) || [],
            mode: sessionStorage.getItem('mode') || 1,
            transition: sessionStorage.getItem('transition') || 1,
            search: '',
            history: JSON.parse(sessionStorage.getItem('history')) || [props.activePanel],
            historyCheck: null,
            animations: JSON.parse(localStorage.getItem('animations')) || props.animations,
            orders: JSON.parse(sessionStorage.getItem('orders')) || props.orders,
            orderName: props.sName,
            uId: localStorage.getItem('id') || props.uId,
            orderGroup: localStorage.getItem('name') || props.name,
            orderAmount: 1,
            orderType: 0,
            comment: '',
            loading: false,
        };

        this.onRefresh = () => {
            this.getOrders();
        };

        this.modalBack = () => {
            this.setActiveModal(
                this.state.modalHistory[this.state.modalHistory.length - 2]
            );
        };

        this.goBack = (toBegin = false) => {
            let history;
            if (toBegin) {
                history = ['info', 'list']
            } else {
                history = [...this.state.history];
            }
            history.pop();
            const activePanel = history[history.length - 1];
            if (activePanel === this.props.activePanel) {
                bridge.send('VKWebAppDisableSwipeBack');
            }
            this.setState({history, activePanel});
            sessionStorage.setItem('history', JSON.stringify(history));
            sessionStorage.setItem('infoPanel', activePanel)
        };
        this.goForward = (activePanel) => {
            const history = [...this.state.history];
            history.push(activePanel);
            if (this.state.activePanel === this.props.activePanel) {
                bridge.send('VKWebAppEnableSwipeBack');
            }
            this.setState({history, activePanel});
            sessionStorage.setItem('history', JSON.stringify(history));
            sessionStorage.setItem('infoPanel', activePanel)
        };
        this.searchChange = this.searchChange.bind(this);
        this.historyCheckUpdate = this.historyCheckUpdate.bind(this);
        this.infoChange = this.infoChange.bind(this);
        this.typeChange = this.typeChange.bind(this);
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

    infoChange(text) {
        if (text.target.name === "amount") {
            this.setState({orderAmount: text.target.value !== '' ? parseInt(text.target.value) : ''});
        } else if (text.target.name === "description") {
            this.setState({comment: text.target.value[0] !== ' ' && text.target.value.length <= 254 ? text.target.value : this.state.comment});
        }
    };

    typeChange(e) {
        this.setState({orderType: parseInt(e.currentTarget.value)});
    };

    searchChange(search) {
        window.scrollTo(0, 0);
        this.setState({search: search[0] !== ' ' ? search : ''});
    };

    get results() {
        const search = this.state.search.toLowerCase().trim();
        let results = [];
        Departments.concat(Faculties).forEach(function (node) {
            if (node.name.toLowerCase().includes(search) || node.director.toLowerCase().includes(search)) {
                results.push(node);
            }
            if (node.hasOwnProperty("pulpits")) {
                node.pulpits.forEach(function (pulpit) {
                    if (pulpit.name.toLowerCase().includes(search) || pulpit.director.toLowerCase().includes(search)) {
                        results.push(pulpit);
                    }
                })
            }
        });
        return results;
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        let interval = setInterval(this.historyCheckUpdate, 500);
        this.setState({historyCheck: interval});
    }

    componentWillUnmount() {
        clearInterval(this.state.historyCheck)
    }

    historyCheckUpdate() {
        if (sessionStorage.getItem('history') === null && JSON.stringify(this.state.history) !== JSON.stringify(['info'])) {
            this.goBack(true);
            sessionStorage.removeItem('infoPanel');
            sessionStorage.removeItem('mode');
            sessionStorage.removeItem('list');
            sessionStorage.removeItem('transition');
            sessionStorage.removeItem('faculty');
        }
        this.forceUpdate();
    }

    listRender() {
        return (
            <div>
                <PanelHeader noShadow
                             left={<HeaderButton>
                                 <Icon24BrowserBack fill={"var(--pocket_gray)"}
                                                    onClick={() => {
                                                        this.setState({activePanel: 'info'});
                                                        this.goBack();
                                                        sessionStorage.setItem('infoPanel', 'info')
                                                    }}/>
                             </HeaderButton>}>
                    <div className="header panel">
                        Справочник
                    </div>
                </PanelHeader>
                <PocketDiv>
                    {this.state.list.map((element, index) => (
                        <PocketCell key={index} onClick={() => {
                            this.setState({faculty: element, activePanel: 'faculty', transition: 1});
                            sessionStorage.setItem('infoPanel', 'faculty');
                            sessionStorage.setItem('transition', 1);
                            sessionStorage.setItem('faculty', JSON.stringify(element));
                            this.goForward('faculty')
                        }}>
                            {element.name}
                        </PocketCell>
                    ))
                    }
                </PocketDiv>
            </div>
        )
    }

    helpRender() {
        return (
            <div>
                <PanelHeader noShadow
                             left={<HeaderButton>
                                 <Icon24BrowserBack fill={"var(--pocket_gray)"}
                                                    onClick={() => {
                                                        this.setState({activePanel: 'info'});
                                                        this.goBack();
                                                        sessionStorage.setItem('infoPanel', 'info')
                                                    }}/>
                             </HeaderButton>}>
                    <div className="header panel">
                        Справки
                    </div>
                </PanelHeader>
                <PullToRefresh onRefresh={this.onRefresh} isFetching={this.state.loading}>
                    <div
                        style={{minHeight: 'calc(100vh - var(--tabbar_height) - var(--safe-area-inset-top) - var(--safe-area-inset-bottom)'}}>
                        {this.state.orders.length > 0 &&
                        <PocketDiv map title='Список справок'>
                            {this.state.orders.slice(0).reverse().map((order, index) => (
                                <div className='teacher row' key={index}
                                     style={{alignItems: 'center', marginTop: 12, color: "var(--pocket_black)"}}>
                                    <div className="name" style={{
                                        color: "var(--pocket_tag_border)",
                                        marginRight: 12,
                                    }}>
                                        {index + 1}
                                    </div>
                                    <div style={{paddingRight: 12, minWidth: 0}}>
                                        <div>
                                            {order.type === 0 ? "О доходах" : "Об обучении"}
                                        </div>
                                        <div className='row' style={{marginTop: 6}}>
                                            <div style={{color: "var(--pocket_gray)"}}>Количество:</div>
                                            <div style={{marginLeft: 6}}> {order.amount}</div>
                                        </div>
                                        {order.comment !== "" &&
                                        <div className='row' style={{marginTop: 6}}>
                                            <div style={{color: "var(--pocket_gray)"}}>Комментарий:</div>
                                            <div className="orderComment"
                                                 style={{marginLeft: 6}}> {order.comment} </div>
                                        </div>
                                        }
                                    </div>
                                    <div style={{
                                        color: order.state === 0 ? "var(--pocket_orange)" : order.state === 1 ? "var(--pocket_dark_blue)" : "var(--pocket_error)",
                                        marginLeft: 'auto',
                                        minWidth: "fit-content"
                                    }}>
                                        {order.state === 0 ?
                                            "в обработке" :
                                            order.state === 1 ?
                                                "готова" :
                                                "отказ"
                                        }
                                    </div>
                                </div>
                            ))}
                            <Button
                                onClick={() => {
                                    this.setState({
                                        comment: '',
                                        amount: 1,
                                        type: 1,
                                    });
                                    this.setActiveModal("createOrder");
                                }}
                                disabled={this.state.orderAmount > 5 || this.state.orderAmount <= 0 || this.state.orderAmount === ''}
                                size="xl"
                                level="outline"
                                style={{
                                    color: "var(--pocket_dark_blue)",
                                    border: "1px solid var(--pocket_dark_blue)",
                                    height: "40px",
                                    marginTop: 12
                                }}
                            >
                                Заказать справку
                            </Button>
                        </PocketDiv>
                        }
                        {this.state.orders.length === 0 &&
                        <PocketDiv title='Список справок'>
                            <Placeholder
                                icon={
                                    <Icon28AddOutline
                                        width={56}
                                        height={56}
                                        style={{color: "var(--pocket_dark_blue)"}}
                                        onClick={() => {
                                            this.setState({
                                                comment: '',
                                                amount: 1,
                                                type: 1,
                                            });
                                            this.setActiveModal("createOrder");
                                        }}
                                    />
                                }
                                title={
                                    <div
                                        className="header"
                                        style={{color: "var(--pocket_black)"}}
                                    >
                                        Справок нет!
                                    </div>
                                }
                                action={<Button size="l"
                                                level="outline"
                                                style={{
                                                    color: "var(--pocket_dark_blue)",
                                                    border: "1px solid var(--pocket_dark_blue)",
                                                    height: "40px"
                                                }}
                                                onClick={() => {
                                                    this.setState({
                                                        comment: '',
                                                        amount: 1,
                                                        type: 1,
                                                    });
                                                    this.setActiveModal("createOrder");
                                                }}>Заказать справку</Button>}
                            >
                                <div className="teacher" style={{whiteSpace: 'pre-wrap', overflow: 'visible'}}>Чтобы
                                    заказать справку, нажми на кнопку ниже!
                                </div>
                            </Placeholder>
                        </PocketDiv>
                        }
                    </div>
                </PullToRefresh>
            </div>
        )
    }

    createOrder() {
        this.setState({snackbar: null});
        let item = {
            groupid: this.state.orderGroup,
            comment: this.state.comment,
            state: 0,
            amount: this.state.orderAmount,
            type: this.state.orderType,
        }
        this.state.orders.push(item);
        this.snackbarRender('Справка успешно заказана', 1)
        this.setState({
            comment: '',
            amount: 1,
            type: 1,
        });
        this.forceUpdate();
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

    getOrders() {
        this.setState({snackbar: null, loading: true});
        if (!window.navigator.onLine) {
            this.snackbarRender('Отсутствует подключение к интернету!', 2)
        }
        this.forceUpdate();
    }

    facultyRender() {
        return (
            <div>
                <PanelHeader noShadow
                             left={<HeaderButton>
                                 <Icon24BrowserBack fill={"var(--pocket_gray)"}
                                                    onClick={() => {
                                                        this.setState({activePanel: this.state.transition === 1 ? 'list' : 'info'});
                                                        this.goBack();
                                                        sessionStorage.setItem('infoPanel', this.state.transition === 1 ? 'list' : 'info')
                                                    }}/>
                             </HeaderButton>}>
                    <div className="header panel">
                        Справочник
                    </div>
                </PanelHeader>
                <PocketDiv title={this.state.mode === 1 ? "Факультет" : "Отдел"}>
                    <div className='teacher'
                         style={{color: "var(--pocket_black)", whiteSpace: "pre-wrap"}}>
                        {this.state.faculty.name}
                    </div>
                </PocketDiv>
                {this.state.faculty.type !== "Нет данных" &&
                <PocketDiv title={this.state.faculty.type}>
                    <div className="row">
                        <div>
                            <PocketAvatar type='avatar' size={54} src={this.state.faculty.avatar}/>
                        </div>
                        <div className='column fit' style={{marginLeft: 12}}>
                            <div className='teacher' style={{color: "var(--pocket_black)", whiteSpace: "pre-wrap"}}>
                                {this.state.faculty.director}
                            </div>
                            <div className='row fit' style={{flexWrap: 'wrap'}}>
                                {this.state.faculty.room !== '' &&
                                <div className="tag" style={{marginRight: 6, marginTop: 6}}>
                                    {this.state.faculty.room}
                                </div>
                                }
                                {this.state.faculty.phone !== '' &&
                                <div className="tag selected" style={{marginTop: 6}}>
                                    <a href={"tel:" + this.state.faculty.phone}>{this.state.faculty.phone}</a>
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </PocketDiv>
                }
                {this.state.faculty.hasOwnProperty("deputies") &&
                <PocketDiv title='Заместители'>
                    {this.state.faculty.deputies.map((depute, index) => (
                        <div key={index} style={{marginTop: index === 0 ? 0 : 12}}>
                            <div className='teacher'>
                                {depute.type}
                            </div>
                            <div className='teacher'
                                 style={{marginTop: 6, whiteSpace: "pre-wrap", color: "var(--pocket_black)"}}>
                                {depute.name}
                            </div>
                            <div className='row fit' style={{flexWrap: 'wrap'}}>
                                {depute.room !== '' &&
                                <div className="tag" style={{marginTop: 6, marginRight: 6}}>
                                    {depute.room}
                                </div>
                                }
                                {depute.phone !== '' &&
                                <div className="tag selected" style={{marginTop: 6}}>
                                    <a href={"tel:" + depute.phone}>{depute.phone}</a>
                                </div>
                                }
                            </div>
                        </div>
                    ))
                    }
                </PocketDiv>
                }
                {this.state.faculty.hasOwnProperty("pulpits") &&
                <PocketDiv title={this.state.mode === 1 ? "Кафедры" : "Подразделения"}>
                    {this.state.faculty.pulpits.map((pulpit, index) => (
                        <PocketCell key={index} onClick={() => {
                            this.setState({pulpit: pulpit, activePanel: "pulpit", transition: 1});
                            this.goForward("pulpit");
                            sessionStorage.setItem('infoPanel', 'pulpit');
                            sessionStorage.setItem('transition', 1);
                            sessionStorage.setItem('pulpit', JSON.stringify(pulpit));
                        }}>
                            {pulpit.name}
                        </PocketCell>
                    ))}
                </PocketDiv>
                }
            </div>
        )
    }

    pulpitRender() {
        return (
            <div>
                <PanelHeader noShadow
                             left={<HeaderButton>
                                 <Icon24BrowserBack fill={"var(--pocket_gray)"}
                                                    onClick={() => {
                                                        this.setState({activePanel: this.state.transition === 1 ? 'faculty' : 'info'});
                                                        this.goBack();
                                                        sessionStorage.setItem('infoPanel', this.state.transition === 1 ? 'faculty' : 'info')
                                                    }}/>
                             </HeaderButton>}>
                    <div className="header panel">
                        Справочник
                    </div>
                </PanelHeader>
                <PocketDiv title={this.state.mode === 1 ? "Кафедра" : "Подразделение"}>
                    <div className='teacher'
                         style={{color: "var(--pocket_black)", whiteSpace: "pre-wrap"}}>
                        {this.state.pulpit.name}
                    </div>
                </PocketDiv>
                {this.state.pulpit.director !== "Нет данных" &&
                <PocketDiv title={this.state.pulpit.type}>
                    <div className="row">
                        <div>
                            <PocketAvatar type='avatar' size={54} src={this.state.pulpit.avatar}/>
                        </div>
                        <div className='column fit' style={{marginLeft: 12}}>
                            <div className='teacher' style={{color: "var(--pocket_black)", whiteSpace: "pre-wrap"}}>
                                {this.state.pulpit.director}
                            </div>
                            <div className='row fit' style={{flexWrap: 'wrap'}}>
                                {this.state.pulpit.room !== '' &&
                                <div className="tag" style={{marginRight: 6, marginTop: 6}}>
                                    {this.state.pulpit.room}
                                </div>
                                }
                                {this.state.pulpit.phone !== '' &&
                                <div className="tag selected" style={{marginTop: 6}}>
                                    <a href={"tel:" + this.state.pulpit.phone}>{this.state.pulpit.phone}</a>
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </PocketDiv>
                }
            </div>
        )
    }

    infoRender() {
        return (
            <div>
                <PanelHeader noShadow>
                    <div className="header panel">
                        Справочник
                    </div>
                </PanelHeader>
                <FixedLayout vertical="top" style={{marginTop: -1}}>
                    <div style={{paddingLeft: 4, paddingRight: 4, background: 'var(--header_background)'}}>
                        <Search value={this.state.search} onChange={this.searchChange}/>
                    </div>
                </FixedLayout>
                {this.state.search !== '' &&
                <div style={{marginTop: 54}}>
                    <motion.div
                        initial={{opacity: this.state.animations === 1 ? 0 : 1}}
                        animate={{opacity: 1}}
                        transition={{
                            duration: 0.4,
                        }}
                    >
                        <PocketDiv title='Результаты поиска'>
                            {this.results.length > 0 &&
                            this.results.map((result, index) => (
                                <PocketCell key={index} onClick={() => {
                                    this.setState({
                                        activePanel: result.hasOwnProperty('iddir') ? 'faculty' : 'pulpit',
                                        mode: result.mode,
                                        list: result.mode === 1 ? Faculties : Departments,
                                        faculty: result.hasOwnProperty('iddir') ? result : [],
                                        pulpit: result.hasOwnProperty('iddir') ? [] : result,
                                        transition: 2
                                    });
                                    this.goForward(result.hasOwnProperty('iddir') ? 'faculty' : 'pulpit');
                                    sessionStorage.setItem('infoPanel', result.hasOwnProperty('iddir') ? 'faculty' : 'pulpit');
                                    sessionStorage.setItem('transition', 2);
                                    sessionStorage.setItem('mode', result.mode);
                                    sessionStorage.setItem('pulpit', JSON.stringify(result.hasOwnProperty('iddir') ? [] : result));
                                    sessionStorage.setItem('faculty', JSON.stringify(result.hasOwnProperty('iddir') ? result : []));
                                    sessionStorage.setItem('list', JSON.stringify(result.mode === 1 ? Faculties : Departments));

                                }}>
                                    {result.name.toLowerCase().includes(this.state.search.toLowerCase().trim()) ? result.name : result.director}
                                </PocketCell>
                            ))}
                            {this.results.length === 0 && this.state.search !== '' &&
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
                                <div className="teacher" style={{whiteSpace: 'normal'}}>Проверь поиск, вдруг ошибся
                                </div>
                            </Placeholder>
                            }
                        </PocketDiv>
                    </motion.div>
                </div>
                }
                {this.state.search === '' &&
                <div>
                    <div className='date default' style={{marginLeft: 12, marginTop: 54}}>
                        Обновления
                    </div>
                    <HorizontalScroll>
                        <div style={{display: "flex"}}>
                            {FastFaq.slice(0, 5).map((Faq, index) => (
                                <div key={index} style={{marginLeft: index === 0 ? 0 : -12}}>
                                    <PocketFaq clickable={this.state.animations === 1} isFast image={Faq.img}
                                               onClick={() => {
                                                   this.setState({fastFaq: Faq});
                                                   this.setActiveModal("fastFaq");
                                               }}
                                    >
                                        {Faq.name}
                                    </PocketFaq>
                                </div>
                            ))}
                        </div>
                    </HorizontalScroll>
                    <div className='date default' style={{marginLeft: 12}}>
                        Справочная информация
                    </div>
                    <div>
                        <div className='row'>
                            <PocketFaq clickable={this.state.animations === 1} image={nav}
                                       isBig onClick={() => {
                                           this.setState({
                                               activePanel: 'help',
                                           });
                                           sessionStorage.setItem('infoPanel', 'help');
                                           this.goForward('help');
                                       }}
                            >
                                Справки
                            </PocketFaq>
                        </div>
                        <div className='row' style={{marginTop: -12}}>
                            <PocketFaq clickable={this.state.animations === 1} image={inst} onClick={() => {
                                this.setState({activePanel: 'list', mode: 1, list: Faculties});
                                sessionStorage.setItem('infoPanel', 'list');
                                sessionStorage.setItem('mode', 1);
                                sessionStorage.setItem('list', JSON.stringify(Faculties));
                                this.goForward('list');
                            }}>
                                Институты и факультеты
                            </PocketFaq>
                            <PocketFaq clickable={this.state.animations === 1} style={{marginLeft: 0}} image={otd}
                                       onClick={() => {
                                           this.setState({activePanel: 'list', mode: 2, list: Departments});
                                           sessionStorage.setItem('infoPanel', 'list');
                                           sessionStorage.setItem('mode', 2);
                                           sessionStorage.setItem('list', JSON.stringify(Departments));
                                           this.goForward('list');
                                       }}>
                                Отделы университета
                            </PocketFaq>
                        </div>
                        <div className='row' style={{marginTop: -12}}>
                            <PocketFaq clickable={this.state.animations === 1} image={hat}
                                       onClick={() => {
                                           this.setState({
                                               activePanel: 'pulpit',
                                               mode: 2,
                                               list: Departments,
                                               faculty: Departments[0],
                                               pulpit: Departments[0].pulpits[1],
                                               transition: 2
                                           });
                                           sessionStorage.setItem('infoPanel', 'pulpit');
                                           sessionStorage.setItem('transition', 2);
                                           sessionStorage.setItem('mode', 2);
                                           sessionStorage.setItem('pulpit', JSON.stringify(Departments[0].pulpits[1]));
                                           sessionStorage.setItem('faculty', JSON.stringify(Departments[0]));
                                           sessionStorage.setItem('list', JSON.stringify(Departments));
                                           this.goForward('pulpit');
                                       }}
                            >
                                Приемная комиссия
                            </PocketFaq>
                            <PocketFaq clickable={this.state.animations === 1} style={{marginLeft: 0}} image={stu}
                                       onClick={() => {
                                           this.setState({
                                               activePanel: 'pulpit',
                                               mode: 2,
                                               list: Departments,
                                               faculty: Departments[2],
                                               pulpit: Departments[2].pulpits[0],
                                               transition: 2
                                           });
                                           sessionStorage.setItem('infoPanel', 'pulpit');
                                           sessionStorage.setItem('transition', 2);
                                           sessionStorage.setItem('mode', 2);
                                           sessionStorage.setItem('pulpit', JSON.stringify(Departments[2].pulpits[0]));
                                           sessionStorage.setItem('faculty', JSON.stringify(Departments[2]));
                                           sessionStorage.setItem('list', JSON.stringify(Departments));
                                           this.goForward('pulpit');
                                       }}
                            >
                                Иностранные студенты
                            </PocketFaq>
                        </div>
                        <div className='row' style={{marginTop: -12}}>
                            <PocketFaq clickable={this.state.animations === 1} image={med}
                                       onClick={() => {
                                           this.setState({
                                               activePanel: 'pulpit',
                                               mode: 2,
                                               list: Departments,
                                               faculty: Departments[3],
                                               pulpit: Departments[3].pulpits[5],
                                               transition: 2
                                           });
                                           sessionStorage.setItem('infoPanel', 'pulpit');
                                           sessionStorage.setItem('transition', 2);
                                           sessionStorage.setItem('mode', 2);
                                           sessionStorage.setItem('pulpit', JSON.stringify(Departments[3].pulpits[5]));
                                           sessionStorage.setItem('faculty', JSON.stringify(Departments[3]));
                                           sessionStorage.setItem('list', JSON.stringify(Departments));
                                           this.goForward('pulpit');
                                       }}
                            >
                                Медицинский центр
                            </PocketFaq>
                            <PocketFaq clickable={this.state.animations === 1} style={{marginLeft: 0}} image={medal}
                                       onClick={() => {
                                           this.setState({
                                               activePanel: 'pulpit',
                                               mode: 2,
                                               list: Departments,
                                               faculty: Departments[3],
                                               pulpit: Departments[3].pulpits[4],
                                               transition: 2
                                           });
                                           sessionStorage.setItem('infoPanel', 'pulpit');
                                           sessionStorage.setItem('transition', 2);
                                           sessionStorage.setItem('mode', 2);
                                           sessionStorage.setItem('pulpit', JSON.stringify(Departments[3].pulpits[4]));
                                           sessionStorage.setItem('faculty', JSON.stringify(Departments[3]));
                                           sessionStorage.setItem('list', JSON.stringify(Departments));
                                           this.goForward('pulpit');
                                       }}
                            >
                                Второй отдел
                            </PocketFaq>
                        </div>
                    </div>
                </div>}
            </div>
        )
    }

    render() {
        const modal = (
            <ModalRoot activeModal={this.state.activeModal}>
                <ModalPage
                    dynamicContentHeight
                    id={"createOrder"}
                    onClose={() => {
                        this.modalBack();
                    }}
                    header={
                        <ModalPageHeader
                            right={
                                <HeaderButton onClick={() => {
                                    this.modalBack();
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
                                Заказать справку
                            </div>
                        </ModalPageHeader>
                    }
                >
                    <div style={{marginLeft: 12, marginRight: 12}}>
                        <div className="teacher"
                             style={{color: 'var(--pocket_black)'}}>
                            ФИО
                        </div>
                        <Input
                            style={{marginTop: 12}}
                            placeholder="Иванов Петр Сергеевич"
                            disabled
                            type="text"
                            name="fio"
                            value={"Никита Иванов" || ''}
                        />
                        <div className="teacher" style={{color: 'var(--pocket_black)', marginTop: 12}}>
                            Группа
                        </div>
                        <Input
                            style={{marginTop: 12}}
                            placeholder="М611"
                            disabled
                            type="text"
                            name="group"
                            value={this.state.orderGroup || ''}
                        />
                        <div className="teacher" style={{color: 'var(--pocket_black)', marginTop: 12}}>
                            Тип справки
                        </div>
                        <FormLayout>
                            <div style={{marginTop: -6, marginBottom: -12}}>
                                <Radio name="radio" value="0" onChange={this.typeChange}
                                       checked={this.state.orderType === 0}>
                                    <div className="teacher">О доходах</div>
                                </Radio>
                                <Radio name="radio" value="1" onChange={this.typeChange}
                                       checked={this.state.orderType === 1}>
                                    <div className="teacher">Об обучении</div>
                                </Radio>
                            </div>
                        </FormLayout>
                        <div className="teacher" style={{color: 'var(--pocket_black)', marginTop: 12}}>
                            Количество экземпляров
                        </div>
                        <Input
                            style={{marginTop: 12}}
                            placeholder="1"
                            type="text"
                            name="amount"
                            value={this.state.orderAmount}
                            onChange={this.infoChange}
                        />
                        <div className="teacher" style={{color: 'var(--pocket_black)', marginTop: 12}}>
                            Комментарий {this.state.comment !== '' ? <span
                                style={{color: 'var(--pocket_gray)'}}>(символов {this.state.comment.length}/254 )</span> :
                            <span style={{color: 'var(--pocket_gray)'}}>(необязательно)</span>}
                        </div>
                        <Textarea style={{marginTop: 12}} name="description"
                                  placeholder={"Зачем необходима справка?"}
                                  value={this.state.comment || ''}
                                  onChange={this.infoChange}
                        />
                        <div style={{paddingTop: 12, paddingBottom: 12}}>
                            {window.navigator.onLine &&
                            <Button
                                onClick={() => {
                                    this.createOrder();
                                    this.modalBack();
                                }}
                                disabled={this.state.orderAmount > 5 || this.state.orderAmount <= 0 || this.state.orderAmount === ''}
                                size="xl"
                                level="outline"
                                style={{
                                    color: "var(--pocket_dark_blue)",
                                    border: "1px solid var(--pocket_dark_blue)",
                                    height: "40px"
                                }}
                            >
                                Заказать справку
                            </Button>
                            }
                            {!window.navigator.onLine &&
                            <FormStatus title="Проблема с доступом к интернету" state="error">
                                Убедись в том, что ты подключен к нему!
                            </FormStatus>
                            }
                            {(this.state.orderAmount > 5 || this.state.orderAmount <= 0 || this.state.orderAmount === '') && window.navigator.onLine &&
                            <FormStatus title="Некорректное значение количества экземпляров" state="error"
                                        style={{marginTop: 12}}>
                                Число экземпляров должно быть больше 0 и не больше 5
                            </FormStatus>
                            }

                        </div>
                    </div>
                </ModalPage>
                <ModalPage
                    id={"fastFaq"}
                    onClose={() => {
                        this.modalBack();
                    }}
                    header={
                        <ModalPageHeader
                            right={
                                <HeaderButton onClick={() => {
                                    this.modalBack();
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
                                {this.state.fastFaq.name}
                            </div>
                        </ModalPageHeader>
                    }
                >
                    <div style={{padding: "0px 12px 12px"}} className='name'>
                        Об обновлении
                    </div>
                    <div className='teacher'
                         style={{padding: "0px 12px 12px", whiteSpace: "pre-wrap", color: "var(--pocket_black)"}}>
                        {this.state.fastFaq.description}
                    </div>
                </ModalPage>
            </ModalRoot>
        );
        return (
            <ConfigProvider scheme={this.props.theme}>
                <View modal={modal} activePanel={this.state.activePanel} onSwipeBack={this.goBack}
                      history={this.state.history}>
                    <Panel id="info">
                        {this.infoRender()}
                    </Panel>
                    <Panel id="list">
                        {this.listRender()}
                    </Panel>
                    <Panel id="faculty">
                        {this.facultyRender()}
                    </Panel>
                    <Panel id="pulpit">
                        {this.pulpitRender()}
                    </Panel>
                    <Panel id="help">
                        {this.helpRender()}
                        {this.state.snackbar}
                    </Panel>
                </View>
            </ConfigProvider>
        )
    }
}

export default Info;
