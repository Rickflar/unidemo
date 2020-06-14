import React from 'react'
import PropTypes from 'prop-types';
import './PocketBanner.css'
import PocketButton from "../PocketButton/PocketButton";
import Link from "@vkontakte/vkui/dist/components/Link/Link";

class PocketBanner extends React.Component {

    static propTypes = {
        children: PropTypes.node,
        subtitle: PropTypes.string,
        link: PropTypes.string,
        textOfLink: PropTypes.string,
        visible: PropTypes.bool,
        name: PropTypes.string,
        onButtonClick: PropTypes.func,
        clickable: PropTypes.bool,
        type: PropTypes.number,
        shouldHide: PropTypes.bool
    };

    static defaultProps = {
        link: '',
        textOfLink: '',
        visible: true,
        clickable: false,
        onButtonClick: null,
        type: 1,
        shouldHide: false
    };

    constructor(props) {
        super(props);

        this.state = {
            visibility: props.visible
        };
    }

    render() {
        const {children, subtitle, link, textOfLink, name, clickable, onButtonClick, shouldHide, type, ...restProps} = this.props;

        return (
            (this.state.visibility &&
                <div className={type === 1 ? "banner" : "banner red"} {...restProps}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <div>
                            <div className="bannerTitle">
                                {children}
                            </div>
                            <div className='bannerSubtitle'>
                                {subtitle}
                            </div>
                        </div>
                        <div style={{marginLeft: 'auto'}}>
                            <PocketButton style={{background: "var(--pocket_white)"}} clickable={clickable}
                                          onClick={() => {
                                              this.setState({visibility: shouldHide ? !this.state.visibility : this.state.visibility});
                                              localStorage.setItem(name, shouldHide ? !this.state.visibility : this.state.visibility);
                                              onButtonClick !== null && this.props.onButtonClick();
                                          }}>
                                {link !== '' ?
                                    <Link href={link}
                                          style={{color: type === 1 ? "var(--button_outline_border)" : "var(--pocket_error)"}}>{textOfLink}</Link>
                                    : <div>{textOfLink}</div>
                                }
                            </PocketButton>
                        </div>
                    </div>
                </div>
            )
        )
            ;
    }
}

export default PocketBanner