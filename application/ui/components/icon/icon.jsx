'use strict';

import React      from 'react';
import classNames from 'classnames';

export default React.createClass({

    displayName : 'Icon',

    propTypes : {
        icon : React.PropTypes.oneOf([
            'back',
            'cancel',
            'caret',
            'group',
            'hamburger',
            'heart',
            'save',
            'search',
            'trash'
        ]).isRequired,
        size : React.PropTypes.oneOf([
            'x-small',
            'small',
            'large',
            'x-large',
            null
        ]),
        rotate : React.PropTypes.oneOf([
            0,
            45,
            90,
            180,
            270
        ]),
        colorTheme : React.PropTypes.oneOf([
            'black',
            'white',
            'primary',
            'secondary',
            'tertiary',
            'status--success',
            'status--warning',
            'status--error',
            null
        ]),
        className : React.PropTypes.string
    },

    getDefaultProps()
    {
        return {
            size       : null,
            rotate     : 0,
            colorTheme : null,
            className  : null
        };
    },

    render()
    {
        import Icon from './icons/' +  this.props.icon;

        let sizeClass       = this.props.size ? 'icon--' + this.props.size : null;
        let colorThemeClass = this.props.colorTheme ? 'icon--' + this.props.colorTheme : null;
        let rotationClass   = 'icon--rotate-' + this.props.rotate;

        let classes = [
            'icon',
            sizeClass,
            colorThemeClass,
            rotationClass,
            this.props.className
        ];

        return (
            <span className={classNames(classes)}>
                <Icon />
            </span>
        );
    }
});
