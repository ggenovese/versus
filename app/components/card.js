import React from 'react';

const Card = React.createClass({
    handleButton: function(event){
        event.preventDefault();
        this.props.handleButton(this.props.objectKey, this.props.option);
    },

    render: function() {
        const { value, checked } = this.props.option;
        const { selected, objectKey } = this.props;
        let divStyle = {
              backgroundImage: 'url(' + value + ')'
          }
        return (
            <div style={divStyle} onClick={this.handleButton} className={
                    "versus-card v-brd-light l-col-2-5 l-h-2-5 v-bg-white l-position-relative v-brd-b-medium l-margin-top-400 " +
                    (selected === objectKey ? "active-card" : "v-overlay")}>
                <button className="v-button v-button--blue l-position-absolute" onClick={this.handleButton}>Select</button>
            </div>
        );
  }
});

export default Card;
