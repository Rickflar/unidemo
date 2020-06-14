import React from 'react'
import PropTypes from 'prop-types';
import './PocketDeadline.css'

import Icon24Recent from '@vkontakte/icons/dist/24/recent';
import Icon24Done from '@vkontakte/icons/dist/24/done';
import Icon28ArticleOutline from '@vkontakte/icons/dist/28/article_outline';
import Icon28CalendarOutline from '@vkontakte/icons/dist/28/calendar_outline';

class PocketDeadline extends React.Component {

    static propTypes = {
        children: PropTypes.node,
        lesson: PropTypes.string,
        status: PropTypes.number,
        hasText: PropTypes.bool
    };

    static defaultProps = {
        status: 2,
        hasText: false
    };


    render() {
        const {children, lesson, status, checkFunction, hasText, ...restProps} = this.props;
        let background = '';
        let color = '';
        switch (status) {
            case 2:
                color = 'var(--button_outline_border)';
                background = 'var(--pocket_blue)';
                break;
            case 1:
                color = 'var(--pocket_red_button_text)';
                background = 'var(--pocket_deadline_red)';
                break;
            case 3:
                color = 'var(--pocket_green_button_text)';
                background = 'var(--pocket_deadline_green)';
                break;
        }
        return (
            <div
                {...restProps}
                className={status === 3 ? 'row fit' : 'row fit'}
            >
                <div className='row' style={{
                    background: background, borderRadius: 10, minWidth: 44, minHeight: 44,
                    justifyContent: "center"
                }}>
                    {status === 3 ?
                        <Icon24Done fill={color}/>
                        :
                        <Icon24Recent fill={color}/>
                    }
                </div>
                <div className='fit' style={{marginLeft: 12, width: '100%'}}>
                    <div className='newsTitle'>
                        {children}
                    </div>
                    {lesson !== '' &&
                    <div className='teacher' style={{marginTop: 6}}>
                        {lesson}
                    </div>
                    }
                </div>
                <div style={{marginLeft: 'auto'}} className='row'>
                    {hasText &&
                    <Icon28ArticleOutline width={20} height={20} fill={"var(--pocket_dark_blue)"}
                                          style={{marginLeft: 6}}/>
                    }
                    {lesson !== '' &&
                    <Icon28CalendarOutline width={20} height={20} fill={"var(--pocket_dark_blue)"}
                                           style={{marginLeft: 6}}/>
                    }
                </div>
            </div>
        );
    }
}

export default PocketDeadline