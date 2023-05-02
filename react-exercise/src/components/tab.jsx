import React, { Component } from "react";

class TabControl extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const tabNameList = ['홈', '조회', '주문'];
        const liList = tabNameList.map(tabName => <li><TabButton tabName={tabName} tabSelectCallback={(tabName) => this.props.tabSelectCallback(tabName)}/></li>);
        return <ul>{liList}</ul>;
    }
}
class TabButton extends Component {
    constructor(props) {
        super(props);
    }
    handleClick(e) {
        this.props.tabSelectCallback(this.props.tabName);
        e.preventDefault();
    }
    render() {
        return (
            <form>
                <button onClick={(event) => this.handleClick(event)}>
                    {this.props.tabName}
                </button>
            </form>
        );
    }
}

export default TabControl;
export { TabControl };