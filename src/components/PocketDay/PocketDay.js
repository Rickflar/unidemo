import React from 'react'
import PropTypes from 'prop-types';
import './PocketDay.css'
import PocketDot from '../PocketDot/PocketDot'
import moment from 'moment'
import 'moment/locale/ru'
import Icon28FireOutline from '@vkontakte/icons/dist/28/fire_outline';

class PocketDay extends React.Component {

    static propTypes = {
        type: PropTypes.string,
        room: PropTypes.string,
        beginTime: PropTypes.string,
        endTime: PropTypes.string,
        name: PropTypes.string,
        teacher: PropTypes.node,
        groups: PropTypes.node,
        current: PropTypes.bool,
        groupsAmount: PropTypes.number,
        children: PropTypes.node,
        number: PropTypes.number,
        demo: PropTypes.bool,
        deadlines: PropTypes.bool
    };

    static defaultProps = {
        selected: true,
        web: false,
        number: 1,
        demo: false,
        deadlines: false
    };

    render() {
        const {room, type, beginTime, endTime, name, teacher, current, groupsAmount, web, groups, children, number, demo, deadlines, ...restProps} = this.props;
        let groupsNum;
        switch (groupsAmount) {
            case 2:
            case 3:
            case 4:
                groupsNum = parseInt(groupsAmount) + " группы";
                break;
            default:
                groupsNum = parseInt(groupsAmount) + " групп";
                break;
        }

        return (
            <div
                {...restProps}
                className={demo ? 'day' : (current && moment().format('HH:mm') >= endTime) ? 'day notcurrent' : 'day'}
            >
                <div className='row'>
                    <div className='time'>
                        <div align="center" style={{marginTop: 6}} className='btime'>
                            {beginTime}
                        </div>
                        <div align="center" className="name" style={{color: "var(--pocket_tag_border)"}}>
                            {number === 0 ? '' : number}
                        </div>
                        <div align="center" style={{marginBottom: 7}} className='etime'>
                            {endTime}
                        </div>
                    </div>
                    <div className='row fit' style={{marginLeft: 44}}>
                        <div
                            className={type === 'ЛР' ? 'separator aqua' : type === 'Л' ? 'separator purple' : type === 'ПР' ? 'separator orange' : 'separator green'}>
                            &nbsp;
                        </div>
                        <div className="column fit">
                            <div className='row'>
                                <div className='row fit'>
                                    <div className='name'>
                                        {name}
                                    </div>
                                    {deadlines &&
                                    <Icon28FireOutline style={{marginLeft: 5}} width={16} height={16}
                                                       fill={'var(--pocket_error)'}/>
                                    }
                                </div>
                                <div>{((demo && current) || (current && moment().format('HH:mm') >= beginTime &&
                                    moment().format('HH:mm') < endTime)) ?
                                    <PocketDot pulse color='var(--pocket_error)'/> :
                                    ''
                                }
                                </div>
                            </div>
                            <div className='row fit' style={{marginTop: 3, flexWrap: 'wrap'}}>
                                <div className='tag visible map' style={{marginLeft: 0}}>
                                    {type}
                                </div>
                                <div className='tag visible map' style={{marginLeft: 0}}>
                                    {room}
                                </div>
                                {groups.split("; ").length === 1 ?
                                    (groups.split("; ").map(group => (
                                        <div
                                            className='tag'
                                            style={{marginLeft: 0, marginRight: 6}}>
                                            {group}
                                        </div>
                                    )))
                                    :
                                    ''
                                }
                                {groupsAmount > 1 &&
                                <div className='tag map' style={{marginLeft: 0}}>
                                    {groupsNum}
                                </div>
                                }
                            </div>
                            <div className='teacher' style={{marginTop: 3}}>
                                {teacher}
                            </div>
                        </div>
                    </div>
                </div>
                {children}
            </div>
        );
    }
}

export default PocketDay