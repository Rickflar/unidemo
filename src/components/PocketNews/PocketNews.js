import React from 'react'
import PropTypes from 'prop-types';
import Icon16Like from '@vkontakte/icons/dist/16/like';
import moment from "moment";
import "moment/locale/ru";
import './PocketNews.css'
import Icon28CameraOutline from '@vkontakte/icons/dist/28/camera_outline';

class PocketNews extends React.Component {

    static propTypes = {
        author: PropTypes.string,
        title: PropTypes.string,
        time: PropTypes.string,
        likes: PropTypes.number,
        image: PropTypes.string,
        pinned: PropTypes.bool,
    };

    static defaultProps = {
        pinned: false,
        likes: 0,
        image: ''
    };

    kFormatter(num) {
        return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'K' : Math.sign(num) * Math.abs(num)
    }

    titleFormatter(title) {
        return title.replace(new RegExp(/\[((id\d+)|club(\d+))\|(.*?)]/, 'g'), '$4');
    }

    render() {
        const {author, title, time, image, pinned, likes, ...restProps} = this.props;
        if (!pinned) {
            return (
                <div className='row' {...restProps}>
                    <div style={{paddingRight: 12, minWidth: 0}}>
                        <div className='teacher' style={{color: "var(--pocket_dark_blue)", marginTop: 3}}>
                            {author}
                        </div>
                        <div className='newsTitle' style={{marginTop: 6}}>
                            {this.titleFormatter(title)}
                        </div>
                        <div className='row' style={{marginTop: 6}}>
                            <div className='row'>
                                <div className='like'>
                                    <Icon16Like width={8} height={8} fill="var(--pocket_white)"
                                                style={{marginTop: 3, marginLeft: 3}}/>
                                </div>
                                <div className='teacher' style={{
                                    color: 'var(--pocket_gray)',
                                    marginLeft: 6
                                }}>
                                    {this.kFormatter(likes)}
                                </div>
                            </div>
                            <div className='teacher' style={{marginLeft: 12}}>
                                {moment.unix(time).format('D MMMM в HH:mm')}
                            </div>
                        </div>
                    </div>
                    <div style={{marginLeft: 'auto'}}>
                        {image !== '' ?
                            <div
                                className='image'
                                style={{
                                    backgroundImage: `url(${image})`,
                                }}
                            />
                            :
                            <div
                                className='image row'
                                style={{
                                    backgroundColor: 'var(--pocket_blue)',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Icon28CameraOutline width={40} height={40}
                                                     fill={'var(--pocket_dark_blue)'}/>
                            </div>
                        }
                    </div>
                </div>
            );
        } else {
            return (
                <div style={{marginLeft: 12, marginRight: 12}}>
                    {image !== '' ?
                        <div className='bigImage'
                             style={{
                                 backgroundImage: `url(${image})`,
                             }}
                        />
                        :
                        <div
                            className='bigImage row'
                            style={{
                                backgroundColor: 'var(--pocket_blue)',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Icon28CameraOutline width={40} height={40}
                                                 fill={'var(--pocket_dark_blue)'}/>
                        </div>
                    }
                    <div className='newsDiv'>
                        <div className='teacher' style={{color: "var(--pocket_dark_blue)"}}>
                            {author}
                        </div>
                        <div className='newsTitle' style={{marginTop: 6}}>
                            {this.titleFormatter(title)}
                        </div>
                        <div className='row' style={{marginTop: 6}}>
                            <div className='row'>
                                <div className='like'>
                                    <Icon16Like width={8} height={8} fill="var(--pocket_white)"
                                                style={{marginTop: 3, marginLeft: 3}}/>
                                </div>
                                <div className='teacher' style={{
                                    color: 'var(--pocket_gray)',
                                    marginLeft: 6
                                }}>
                                    {this.kFormatter(likes)}
                                </div>
                            </div>
                            <div className='teacher' style={{marginLeft: 12}}>
                                {moment.unix(time).format('D MMMM в HH:mm')}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default PocketNews