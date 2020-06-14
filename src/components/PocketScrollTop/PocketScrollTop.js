import React from 'react';
import './PocketScrollTop.css';
import { motion, useViewportScroll } from "framer-motion";

import Icon24BrowserBack from '@vkontakte/icons/dist/24/browser_back';

const { scrollYProgress } = useViewportScroll();

class PocketScrollTop extends React.Component {
    render() {
        return (
            <motion.div
                className="scrollButton"
                whileTap={{
                    scale: 0.95
                }}
                style={{
                    opacity: scrollYProgress
                }}
                onClick={() => {
                    window.scrollTo(0, 0);
                }}
            >
                <div style={{marginLeft: 8, marginTop: 8}}>
                    <Icon24BrowserBack fill="var(--pocket_dark_blue)" style={{transform: "rotate(90deg)"}}/>
                </div>
            </motion.div>
        );
    }
}

export default PocketScrollTop;