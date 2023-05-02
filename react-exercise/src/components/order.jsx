import React, { Component } from "react";

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
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <label>
                    <b>검색어</b>
                    <input type="text" value={this.state.searchKey} onChange={(e)=>this.handleChange(e)}></input>
                </label>
                <input type="submit" value="검색"></input>
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
                <li key={itemId}>
                    상품명: {item.name}, 가격: {item.price}
                    <form onSubmit={(e) => this.addOrderItem(e, itemId)}>
                        <label>
                            <input type="text" value={orderNum} onChange={(e) => this.handleOrderNumChange(e, itemId)}></input>
                        </label>
                        <input type="submit" value="장바구니 담기"></input>
                    </form> 
                </li>
            );
        });
        return <ul>{liList}</ul>;
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
                            .map(orderItem => <li key={orderItem.itemId}> 상품ID : {orderItem.itemId}, 주문수량 : {orderItem.orderNum}</li>);
        return (
            <div>
                <ul>{liList}</ul>;
                <form onSubmit={(e) => this.requestOrderItem(e)}>
                    <label>
                        <input type="text" value={this.state.name} onChange={e=>this.changeName(e)}></input>
                    </label>
                    <input type="submit" value="주문"></input>
                </form>
            </div>
        );
    }
}


export default OrderMain;
export { OrderMain };