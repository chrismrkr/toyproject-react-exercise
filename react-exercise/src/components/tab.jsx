import React, { Component } from "react";
import styles from '../styles/tab.module.css';

class TabControl extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const tabNameList = ['홈', '조회', '주문'];
        const liList = tabNameList.map(tabName => <li className={styles.control_li}><TabButton tabName={tabName} tabSelectCallback={(tabName) => this.props.tabSelectCallback(tabName)}/></li>);
        liList.push(<li className={styles.control_li_logo} >Item Order Example</li>);
        return <ul className={styles.control_main}>{liList}</ul>;
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
                <button className={styles.control_button} onClick={(event) => this.handleClick(event)}>
                    {this.props.tabName}
                </button>
            </form>
        );
    }
}

export default TabControl;
export { TabControl };