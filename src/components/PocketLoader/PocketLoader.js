import React from 'react'
import PropTypes from 'prop-types';
import './PocketLoader.css'
import Placeholder from "@vkontakte/vkui/dist/components/Placeholder/Placeholder";

class PocketLoader extends React.Component {

    static propTypes = {
        title: PropTypes.string,
        text: PropTypes.string,
        changeHeight: PropTypes.bool
    };

    static defaultProps = {
        title: 'Получаем необходимые данные',
        text: 'Нужно немного подождать',
        changeHeight: false
    };

    render() {
        const {title, text, changeHeight} = this.props;
        return (
            <div style={{height: changeHeight ? "auto" : "100vh"}}>
                <Placeholder
                    className='centered'
                    icon={
                        <div className="showbox">
                            <div className="loader">
                                <svg className="circular" viewBox="25 25 50 50">
                                    <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="4"
                                            stroke="var(--pocket_gray)" strokeMiterlimit="10"/>
                                </svg>
                            </div>
                        </div>
                    }
                    title={
                        <div className="header"
                             style={{color: "var(--pocket_black)"}}
                        >{title}</div>}
                >
                    <div className="teacher">{text}</div>
                </Placeholder>
            </div>
        );
    }
}

export default PocketLoader