import React, { Component } from "react";
import styles from '../styles/order.module.css';

class OrderMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderItemList: []
        }
    }

    changeOrderItemList(itemId, orderNum) {
        const newOrderItemList = this.state.orderItemList;
        newOrderItemList.push({itemId: itemId, orderNum: orderNum});
        this.setState({orderItemList: newOrderItemList});
    }

    render() {
        return (
            <div>
                <ItemSearchContent changeOrderItemList={(itemId, orderNum) => this.changeOrderItemList(itemId, orderNum)}/>
                <OrderItemContent orderItemList={this.state.orderItemList} />
            </div>
        );
    }
}

class ItemSearchContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemList : []
        };
    }

    getItemList(key) {
        this.setState({
            itemList : [
                {itemId : 1, name : "item1", price: 1000},
                {itemId : 2, name : "item2", price: 3000},
                {itemId : 3, name : "item3", price: 5000}
            ]
        });
    }

    addOrderItem(itemId, orderNum) {
        this.props.changeOrderItemList(itemId, orderNum);
    }

    render() {
        return (
            <div>
                <ItemSearchEngine getItemList={(key) => this.getItemList(key)}/>
                <ItemSearchList itemList={this.state.itemList} addOrderItem={(itemId, orderNum) => this.addOrderItem(itemId, orderNum)}/>
            </div>
        );
    }
}
class ItemSearchEngine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKey: ""
        };
    }
    handleChange(e) {
        this.setState({
            searchKey: e.target.value
        });
    }
    handleSubmit(e) {
        const searchKey = this.state.searchKey;
        // searchKey(검색어)에 해당하는 itemList 가져오기
        this.props.getItemList(searchKey);
        e.preventDefault();
    }
    render() {
        return (
            <form className={styles.search_engine_form} onSubmit={(e) => this.handleSubmit(e)}>
                <label>
                    <b className={styles.search_engine_form}>검색어</b>
                    <input className={styles.search_engine_form} type="text" value={this.state.searchKey} onChange={(e)=>this.handleChange(e)} placeholder="상품명을 입력하세요."></input>
                </label>
                <input className={styles.search_engine_form} type="submit" value="검색"></input>
            </form>
        );
    }
}
class ItemSearchList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderNums : {}
        };
    }
    handleOrderNumChange(event, itemId)  {
        const newOrderNums = { ...this.state.orderNums };
        newOrderNums[itemId] = event.target.value;
        this.setState({
            orderNums: newOrderNums,
        });
    }

    addOrderItem(e, itemId) {
        const orderNum = this.state.orderNums[itemId];
        this.props.addOrderItem(itemId, orderNum);
        e.preventDefault();
    }

    render() {
        const liList = this.props.itemList.map(item => {
            const itemId = item.itemId;
            const orderNum = this.state.orderNums[itemId] || '';
            return (
                <li className={styles.search_list} key={itemId}>
                    <text> 상품명: {item.name}, 가격: {item.price} </text>
                    <form onSubmit={(e) => this.addOrderItem(e, itemId)}>
                        <label>
                            <input type="text" value={orderNum} onChange={(e) => this.handleOrderNumChange(e, itemId)}></input>
                        </label>
                        <input type="submit" value="장바구니 담기"></input>
                    </form> 
                </li>
            );
        });
        return <ul className={styles.search_list}>{liList}</ul>;
    }
}

class OrderItemContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        }
    }

    changeName(e) {
        this.setState({
            name: e.target.value
        });
    }
    requestOrderItem(e) {
        const requestBody = {
            name: this.state.name,
            itemList : this.props.orderItemList.map(orderItem => orderItem)
        };
        alert("상품 주문 완료");
    }

    render() {
        const liList = this.props
                            .orderItemList
                            .map(orderItem => <li className={styles.order_item_content} key={orderItem.itemId}> 상품ID : {orderItem.itemId}, 주문 수량 : {orderItem.orderNum}</li>);
        return (
            <div>
                <ul className={styles.order_item_content}>{liList}</ul>
                <form class={styles.order_item_content} onSubmit={(e) => this.requestOrderItem(e)}>
                    <label>
                        <input type="text" value={this.state.name} onChange={e=>this.changeName(e)} placeholder="주문자를 입력하세요."></input>
                    </label>
                    <input type="submit" value="주문"></input>
                </form>
            </div>
        );
    }
}


export default OrderMain;
export { OrderMain };