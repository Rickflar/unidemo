import React from 'react'
import PropTypes from 'prop-types';
import './PocketAchievement.css'
import PocketAvatar from '../PocketAvatar/PocketAvatar'
import Icon20EducationOutline from '@vkontakte/icons/dist/20/education_outline';

class PocketAchievement extends React.Component {

    static propTypes = {
        title: PropTypes.string,
        children: PropTypes.node,
        image: PropTypes.string,
        gained: PropTypes.bool,
        rating: PropTypes.bool,
        position: PropTypes.number
    };

    static defaultProps = {
        gained: true,
        rating: false
    };

    render() {
        const {title, children, image, gained, rating, position, ...restProps} = this.props;
        let color;
        switch (position) {
            case 1:
                color = 'var(--pocket_yellow)';
                break;
            case 2:
                color = 'var(--pocket_gray)';
                break;
            case 3:
                color = 'var(--pocket_orange)';
                break;
            default:
                color = 'var(--pocket_white)';
                break;
        }
        return (
            <div
                {...restProps}
                className={gained ? 'gained row fit' : 'notgained row fit'}
            >
                {rating &&
                <div className='name' style={{marginRight: 12, color: 'var(--pocket_gray)'}}>
                    {position}
                </div>
                }
                <PocketAvatar type={rating ? 'avatar' : 'default'} size={44} src={image}/>
                <div style={{marginLeft: 12}} className='fit'>
                    <div className='name'>
                        {title}
                    </div>
                    {gained &&
                    <div className='teacher' style={{marginTop: 6}}>
                        {children}
                    </div>
                    }
                </div>
                {rating &&
                <Icon20EducationOutline fill={color} style={{marginLeft: 'auto'}}/>
                }
            </div>
        );
    }
}

export default PocketAchievement