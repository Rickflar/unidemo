import React from 'react'
import PropTypes from 'prop-types';
import {motion} from "framer-motion";
import './PocketDiv.css'

class PocketDiv extends React.Component {

    static propTypes = {
        children: PropTypes.node,
        map: PropTypes.bool,
        layer: PropTypes.bool,
        clickable: PropTypes.bool,
        title: PropTypes.string
    };

    static defaultProps = {
        map: false,
        layer: false,
        clickable: false,
        title: ''
    };

    render() {
        const {children, map, layer, clickable, title, ...restProps} = this.props;

        return (
            <div {...restProps}>
                {title !== '' &&
                <div className='date default' style={{marginLeft: 12, marginTop: 12}}>
                    {title}
                </div>
                }
                <motion.div

                    className={map ? layer ? 'div map layer' : 'div map' : layer ? 'div layer' : 'div'}
                    whileTap={{
                        scale: clickable ? 0.97 : 1
                    }}
                >
                    {children}
                </motion.div>
            </div>
        );
    }
}

export default PocketDiv