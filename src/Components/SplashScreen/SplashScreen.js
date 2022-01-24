import React from "react";
import './css/style.css';
import * as requests from '../../ApiRequests/ApiRequests'
import * as ls from "../../stores/localStorage/localStorage"
import {connect} from 'react-redux';
import * as actions from '../../stores/reduxStore/actions';
import {Snackbar} from "@material-ui/core"
import getComName from "../../functions/getComName";

function url2paramsArray(search) {
    return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}


class SplashScreen extends React.Component {

    searchParam = this.props.history.location.search.replace("?", "").length > 2 ? this.props.history.location.search.replace("?", "") : "null=null"
    urlParams = url2paramsArray(this.searchParam) // 12827295

    componentDidMount() {
        this.props.setResEnglishName(getComName())
        if (ls.getLSResParts() && ls.getLSResParts().length > 1) {
            this.props.history.push("/main");
        }
        this.getData();
    }

    state = {
        openSnackbar: false,
        snackbarMessage: "فکر کنم اینترنتت قطعه :(",
    }

    setOpenSnackbar = (status) => {
        this.setState({
            openSnackbar: status
        })
    }

    goMainPage = (response) => {
        this.props.setTableScanned(this.urlParams["table"] ? this.urlParams["table"] : 0)
        if (response.hasOwnProperty('statusCode') && response.statusCode === 200) {
            if (!response.hasOwnProperty('data') || !response.data)
                response.data = ['restaurant']
            this.props.setResParts(response.data)
            ls.setLSResParts(response.data);
            this.props.history.push("/main");


        } else {
            this.setOpenSnackbar(true)
        }
    }

    getData = () => {
        requests.getRestaurantParts(this.goMainPage);
    }

    render() {
        return (
            <div className='mainSplashScreen'>
                <Snackbar
                    anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                    open={this.state.openSnackbar}
                    message={this.state.snackbarMessage}
                />
                <div className='d-flex h-100 justify-content-center'>
                    <div className='splashScreenImage' style={{
                        background: 'url(./img/SplashScreen/splashicon.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = () => {
    return {}
}

const mapDispatchToProps = () => {
    return {
        setResParts: actions.setResParts,
        setTableScanned: actions.setTableScanned,
        setResEnglishName: actions.setResEnglishName,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);




