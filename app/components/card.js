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
                 className={"versus-card l-h-4-5 v-bg-white "+ (selected === objectKey ? "l-col-1" : "l-col-1-2")+(notselected === objectKey ? " l-hidden" : "")}>
            </div>
        );
  }
});

export default Card;
