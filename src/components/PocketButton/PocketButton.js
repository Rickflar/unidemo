import React from 'react'
import PropTypes from 'prop-types';
import './PocketButton.css';
import {motion} from "framer-motion";

class PocketButton extends React.Component {

    static propTypes = {
        children: PropTypes.node,
        selected: PropTypes.bool,
        red: PropTypes.bool,
        clickable: PropTypes.bool
    };

    static defaultProps = {
        selected: true,
        red: false,
        clickable: false
    };

    render() {
        const {children, selected, red, clickable, ...restProps} = this.props;

        return (
            <motion.div
                {...restProps}
                className={selected ? red ? 'button red' : 'button selected' : 'button notselected'}
                whileTap={{
                    scale: clickable ? 0.95 : 1
                }}
            >
                <div className='row'>
                    {children}
                </div>
            </motion.div>
        );
    }
}

export default PocketButton