import React from 'react'
import PropTypes from 'prop-types';
import './PocketCell.css'
import Icon16Done from '@vkontakte/icons/dist/16/done';
import Icon16Chevron from '@vkontakte/icons/dist/16/chevron';

class PocketCell extends React.Component {

    static propTypes = {
        children: PropTypes.node,
        iconBefore: PropTypes.node,
        isChecked: PropTypes.bool,
        disabled: PropTypes.bool,
        mobile: PropTypes.bool
    };

    static defaultProps = {
        isChecked: false,
        iconBefore: null,
        disabled: false,
        mobile: true
    };

    render() {
        const {children, isChecked, iconBefore, disabled, mobile, ...restProps} = this.props;

        return (
            <div {...restProps} className={disabled ? "cell disabled row" : "cell row"}
                 style={{paddingTop: 9, paddingBottom: 9}}>
                {iconBefore !== null && <div style={{marginRight: 6}}>{iconBefore}</div>}
                <div className='celltext'>{children}</div>
                {isChecked && <Icon16Done style={{marginLeft: 6, color: "var(--pocket_dark_blue)"}}/>}
                {mobile && <Icon16Chevron style={{marginLeft: 'auto', color: 'var(--pocket_gray)', paddingLeft: 6}}/>}
            </div>
        );
    }
}

export default PocketCell