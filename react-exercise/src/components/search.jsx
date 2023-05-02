import React, { Component } from "react";

class SearchMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderList : [],
            orderItemList : []
        };
        this.changeOrderList = this.changeOrderList.bind(this);
        this.changeOrderItemList = this.changeOrderItemList.bind(this); 
    }
    changeOrderList() {
        this.setState({
            orderList : [ {
                    orderItem_id: 1,
                    description: "order description1",
                    refLink: "..."
                }, {
                    orderItem_id: 2,
                    description: "order description2",
                    refLink: "..."
                } 
            ],
            orderItemList : this.state.orderItemList
        });
    }
    changeOrderItemList() {
        this.setState({
            orderList : this.state.orderList,
            orderItemList : [ {
                    item_id: 1,
                    name: "사과",
                    price: 1000,
                    quantity: 3
                }, {
                    item_id: 2,
                    name: "배",
                    price: 2000,
                    quantity: 10
                }
            ]
        });
    }
    render() {
        return (
            <div>
                <SearchController searchCallback={this.changeOrderList} />
                <SearchResult orderList={this.state.orderList} detailSearchCallback={this.changeOrderItemList}/>
                <SearchDetails orderItemList={this.state.orderItemList} />
            </div>
        );
    }
}

class SearchController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ""
        }
        this.handleButton = this.handleButton.bind(this);
    }
    handleChange(event) {
        this.setState({
            username : event.target.value
        });
    }
    handleButton(event) {
        this.props.searchCallback();
        event.preventDefault();
    }
    render() {
        return (
            <form onSubmit={(e) => this.handleButton(e)}>
                <label>
                    <b>이름</b>
                    <input type="text" value={this.state.username} onChange={(e)=>this.handleChange(e)} placeholder="이름을 입력하세요."></input>
                </label>
                <input type="submit" value="조회"/>
            </form>
        );
    }
}

class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.passDetailSearchCallback = this.passDetailSearchCallback.bind(this);
    }
    passDetailSearchCallback() {
        this.props.detailSearchCallback();
    }

    render() {
        const liList = this.props.orderList.map((order) => <li><SearchRow orderDescript={order.description} refLink={order.refLink} detailSearchCallback={this.passDetailSearchCallback}/></li>);
        return (
            <ul>{liList}</ul>
        );    
    }
}

class SearchRow extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        alert(this.props.refLink + " 로 부터 orderItemList 받아오기");
        this.props.detailSearchCallback();
        e.preventDefault();
    }
    render() {
        return (
            <div class='row'>
                {this.props.orderDescript} 
                <button onClick={this.handleClick}>
                    상세 조회
                </button>
            </div>
        );
    }
}

class SearchDetails extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const liList = this.props.orderItemList.map(orderItem => <li>{orderItem.name}, {orderItem.price}, {orderItem.quantity}</li>);
        return <ul>{liList}</ul>;
    }
}
export default SearchRow;
export { SearchRow, SearchResult, SearchDetails, SearchController, SearchMain };
