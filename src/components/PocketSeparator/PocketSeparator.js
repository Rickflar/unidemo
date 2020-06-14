import React from 'react'
import PropTypes from 'prop-types';
import './PocketSeparator.css'
import PocketDot from '../PocketDot/PocketDot'

class PocketSeparator extends React.Component {

    static propTypes = {
        children: PropTypes.node,
        type: PropTypes.string,
        line: PropTypes.bool
    };

    static defaultProps = {
        line: false
    };

    render() {
        const {children, type, line, ...restProps} = this.props;

        return (
            <div
                {...restProps}
                className='sep'
            >
                <PocketDot pulse style={{marginRight: 5, background: 'var(--pocket_error)'}}/>
                {line ?
                    <div className='line'/>
                    :
                    <div className='name'>{children}</div>
                }
            </div>
        );
    }
}

export default PocketSeparator