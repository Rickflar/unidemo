import React from 'react'
import PropTypes from 'prop-types';
import './PocketFaq.css';
import PocketAvatar from "../PocketAvatar/PocketAvatar";
import {motion} from "framer-motion";

class PocketFaq extends React.Component {

    static propTypes = {
        children: PropTypes.node,
        image: PropTypes.string,
        isBig: PropTypes.bool,
        isFast: PropTypes.bool,
        clickable: PropTypes.bool,
        disable: PropTypes.bool
    };

    static defaultProps = {
        isBig: false,
        isFast: false,
        clickable: false,
        disable: false
    };

    render() {
        const {children, image, isBig, isFast, clickable, disable, ...restProps} = this.props;
        if (!isFast) {
            return (
                <motion.div className={isBig ? 'big faq column' : 'faq column'} {...restProps}
                            whileTap={{
                                scale: clickable ? 0.97 : 1
                            }}
                >
                    <PocketAvatar size={44} src={image} style={{opacity: disable ? 0.5 : 1}}/>
                    <div className="faqTitle" style={{textAlign: 'center', marginTop: 6, opacity: disable ? 0.5 : 1}}>
                        {children}
                    </div>
                </motion.div>
            );
        } else {
            return (
                <motion.div className='fast faq row' {...restProps}
                            whileTap={{
                                scale: clickable ? 0.97 : 1
                            }}
                >
                    <PocketAvatar style={{marginRight: 12}} size={44} src={image}/>
                    <div className="fast faqTitle" style={{marginLeft: 'auto'}}>
                        {children}
                    </div>
                </motion.div>
            )
        }
    }
}

export default PocketFaq