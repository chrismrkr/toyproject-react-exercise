import React, { Component } from "react";
import {TabControl} from './tab';
import {SearchMain} from './search';
import {OrderMain} from './order';
import styles from '../styles/main.module.css';

class Contents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabSelect : 0 // 0: X, 1: 조회, 2: 주문
        }
    }
    selectTab(name) {
        let tabSelectHashMap = {'홈': 0, '조회': 1, '주문': 2};
        this.setState({
            tabSelect : tabSelectHashMap[name]
        });
    }
    render() {
        return (
            <div className={styles.main}>
                <TabControl tabSelectCallback={(name) => this.selectTab(name)} />
                <ContentMain tabSelect={this.state.tabSelect} />
            </div>
        );
    }
}

class ContentMain extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if(this.props.tabSelect == 0) {
            return <div></div>;
        }
        else if(this.props.tabSelect == 1) {
            return <SearchMain />;
        }
        else if(this.props.tabSelect == 2) {
            return <OrderMain />
        }
    }

}

export default Contents;
export {Contents};