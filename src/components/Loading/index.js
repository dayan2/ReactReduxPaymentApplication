import React from 'react';
import './style.scss';

const LoadingIndicator = () => (
  <div className="loading-indicator">
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
  </div>
);

const List = ({ component, items }) => {
    const ComponentToRender = component;
    let content = (<div></div>);
  
    if (items) {
      content = items.map((item) => (
        <ComponentToRender key={`item-${item.id}`} item={item} />
      ));
    } else {
      content = (<ComponentToRender />);
    }
  
    return (
      <div className="list-wrapper">
        <ul>
          {content}
        </ul>
      </div>
    );
  };

const Loading = ({ loading }) => {
    if (loading) {
      return <List component={LoadingIndicator} />;
    }
    
    return null;
  };

  
export default Loading;
  