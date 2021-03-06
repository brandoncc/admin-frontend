import React, { Component } from 'react';

class Property extends Component {
  state = {
    dangerHover: false,
  };

  handleDangerHover = () => {
    this.setState((prevState) => {
      return {
        dangerHover: !prevState.dangerHover,
      };
    });
  }

  handleDeleteClick = (e) => {
    e.stopPropagation();

    const { name, onDeleteClick } = this.props;

    onDeleteClick(name)
  }

  render() {
    const { name, value, editable } = this.props;
    const { dangerHover } = this.state;

    let displayValue;

    if (typeof value === 'object' && value !== null) {
      displayValue = <pre>{JSON.stringify(value, null, 2)}</pre>;
    } else {
      displayValue = value;
    }

    return (
      <li>
        <div className={`property${editable ? ' editable' : ''}${dangerHover ? ' danger' : ''}`}>
          <span className="prop-name">{name}&nbsp;&nbsp;</span>
          <span className="prop-value">{displayValue}</span>
          {editable &&
            <button
              type="button"
              className="remove"
              onClick={this.handleDeleteClick}
              onMouseEnter={this.handleDangerHover}
              onMouseLeave={this.handleDangerHover}
            >
              &times;
            </button>
          }
        </div>
      </li>
    );
  };
};

export default Property;
