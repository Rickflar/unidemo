import React from 'react'
import PropTypes from 'prop-types';
import "moment/locale/ru";
import './PocketWeather.css'

import {ReactComponent as Drizzle} from '../../images/weather/drizzle.svg';
import {ReactComponent as Sunny} from '../../images/weather/sunny-day.svg';
import {ReactComponent as Cloudy} from '../../images/weather/partialy-cloudy.svg';
import {ReactComponent as Clouds} from '../../images/weather/overcast-day.svg';
import {ReactComponent as Snow} from '../../images/weather/snow-cloud.svg';
import {ReactComponent as Mist} from '../../images/weather/mist.svg';

class PocketWeather extends React.Component {

    static propTypes = {
        temperature: PropTypes.number,
        description: PropTypes.string,
        id: PropTypes.number
    };

    iconRender(id) {
        switch (true) {
            case id >= 200 && id <= 232:
                return <Drizzle style={{width: 36, fill: 'var(--button_outline_border)'}}/>;
            case id >= 300 && id <= 321:
                return <Drizzle style={{width: 36, fill: 'var(--button_outline_border)'}}/>;
            case id >= 500 && id <= 531:
                return <Drizzle style={{width: 36, fill: 'var(--button_outline_border)'}}/>;
            case id >= 600 && id <= 622:
                return <Snow style={{width: 36, fill: 'var(--pocket_gray)'}}/>;
            case id >= 701 && id <= 781:
                return <Mist style={{width: 36, fill: 'var(--pocket_gray)'}}/>;
            case 800:
                return <Sunny style={{width: 36, fill: 'var(--pocket_yellow)'}}/>;
            case 801:
                return <Clouds style={{width: 36, fill: 'var(--button_outline_border)'}}/>;
            case id >= 802 && id <= 804:
                return <Cloudy style={{width: 36}}/>;
            default:
                return <Clouds style={{width: 36, fill: 'var(--pocket_dark_blue)'}}/>;
        }
    }

    render() {
        const {temperature, description, id, ...restProps} = this.props;

        return (
            <div
                {...restProps}
                className='row'
            >
                <div>
                    {this.iconRender(id)}
                </div>
                <div style={{marginLeft: 12}}>
                    <div className='temp'>
                        {temperature > 0 ? '+' : ''}{Math.round(temperature)}°
                    </div>
                    <div className='teacher' style={{marginTop: -6}}>
                        {description}
                    </div>
                </div>
            </div>
        );
    }
}

export default PocketWeather