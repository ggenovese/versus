import React from 'react';

const Card = React.createClass({
    handleButton: function(event){
        event.preventDefault();
        this.props.handleButton(this.props.objectKey, this.props.option);
    },

    render: function() {
        const { value } = this.props.option;
        const { notselected, selected, objectKey } = this.props;

        let divStyle = {
              backgroundImage: 'url(' + value + ')'
        };
        return (
            <div style={divStyle}
                 onClick={this.handleButton}
                 className={"versus-card v-bg-white l-col-r "+ (selected === objectKey ? "l-col-1 l-h-9-10" : "l-col-1-2 l-h-4-5")+(notselected === objectKey ? " l-hide-me" : "")}>
            </div>
        );
  }
});

export default Card;
