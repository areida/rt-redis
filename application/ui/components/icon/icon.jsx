'use strict';

var React = require('react');

module.exports = React.createClass({

    displayName : 'Icon',

    propTypes : {
        icon : React.PropTypes.string.isRequired,
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

    getDefaultProps : function()
    {
        return {
            size       : null,
            rotate     : 0,
            colorTheme : null,
            className  : null
        };
    },

    render : function()
    {
        var Icon,
            classes,
            sizeClass,
            colorThemeClass,
            rotationClass;

        Icon = require('./icons/' +  this.props.icon);

        sizeClass = this.props.size ?
            'icon--' + this.props.size : null;

        colorThemeClass = this.props.colorTheme ?
            'icon--' + this.props.colorTheme : null;

        rotationClass = 'icon--rotate-' + this.props.rotate;

        classes = [
            'icon',
            sizeClass,
            colorThemeClass,
            rotationClass,
            this.props.className
        ].join(' ').trim();

        return (
            <span className={classes}>
                <Icon />
            </span>
        );
    }
});
