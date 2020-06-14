import React from 'react'
import bridge from '@vkontakte/vk-bridge'
import PropTypes from 'prop-types';
import './PocketAvatar.css'
import Icon28CameraOutline from '@vkontakte/icons/dist/28/camera_outline';

class PocketAvatar extends React.Component {
    static propTypes = {
        size: PropTypes.number,
        src: PropTypes.string,
        type: PropTypes.string,
        canOpen: PropTypes.bool
    };


    static defaultProps = {
        size: 54,
        type: 'default',
        canOpen: false

    };

    openPhotoNative(src, type, canOpen) {
        if (type === 'avatar' && canOpen && window.navigator.onLine) {
            bridge.send("VKWebAppShowImages", {images: [src]})
        }
    }

    render() {
        const {size, src, type, canOpen, ...restProps} = this.props;
        if (src !== '') {
            return (<div {...restProps} className={type}
                         style={{width: size, height: size, backgroundImage: `url(${src})`}} onClick={() => {
                this.openPhotoNative(src, type, canOpen)
            }}/>)
        } else {
            return (<div
                    className={type}
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: size,
                        height: size,
                        backgroundColor: 'var(--pocket_blue)',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Icon28CameraOutline width={24} height={24}
                                         fill={'var(--pocket_dark_blue)'}/>
                </div>
            )
        }
    }
}

export default PocketAvatar