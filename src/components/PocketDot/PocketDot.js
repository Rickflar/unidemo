import React from 'react'
import PropTypes from 'prop-types';
import './PocketDot.css'

class PocketDot extends React.Component {

    static propTypes = {
        color: PropTypes.string,
        pulse: PropTypes.bool
    };

    static defaultProps = {
        color: 'var(--pocket_error)',
        pulse: true
    };

    render() {
        const {color, pulse, ...restProps} = this.props;

        return (
            <div className='dot' style={{background: color}} {...restProps}>
                {pulse &&
                <div
                    className='pulse'
                    style={{background: color}}
                />}
            </div>
        );
    }
}

export default PocketDot