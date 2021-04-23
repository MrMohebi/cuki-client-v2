import React from "react";
import {Button, CircularProgress, Snackbar, TextField, withStyles} from "@material-ui/core";
import * as requests from '../../ApiRequests/ApiRequests'
import './css/CukiCode.css';
import * as PropTypes from "prop-types";

function Alert() {
    return null;
}

Alert.propTypes = {
    severity: PropTypes.string,
    onClose: PropTypes.any,
    children: PropTypes.node
};

class CukiCode extends React.Component {

    state = {
        code: "",
        submitButtonInside: 'مشاهده مجموعه',
        buttonAndTextFieldDisabled: false,
        errorSnackbar:false

    }
    getCodeCallback = (res) => {
        if (res.statusCode === 200){
            window.location.href = "/c-"+res.data.resEnglishName
            // this.props.history.replace("/c-"+res.data.resEnglishName)
        }else{
            this.setState({
                submitButtonInside: 'مشاهده مجموعه',
                buttonAndTextFieldDisabled: false,
                errorSnackbar:true
            })
            setTimeout(()=>{
                this.setState({
                    errorSnackbar:false
                })
            },1500)
        }

    }
    handleSubmitClick = (event) => {
        event.preventDefault()
        this.setState({
            submitButtonInside: <CircularProgress size={28} color={"inherit"}/>,
            buttonAndTextFieldDisabled:true
        })
        requests.getResByCode(this.state.code, this.getCodeCallback)
    }

    handleChangeCodeInput = (event) =>{
        if(event.target.value < 10000)
            this.setState({code: event.target.value})
    }

    render() {
        const CssTextField = withStyles({
            root: {
                '& label.Mui-focused': {
                    color: '#bc845e',
                },
                '& .MuiInput-underline:after': {
                    borderBottomColor: '#bc845e',
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: '#bc845e',
                    },
                    '&:hover fieldset': {
                        borderColor: 'yellow',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#bc845e',
                    },
                },
            },
        })(TextField);

        return (
            <div className={'h-100 d-flex flex-column justify-content-center align-items-center IranSans'}>
                <div className={'logoInputContainer d-flex flex-column justify-content-center align-items-center'}>
                    <div className={'codeCukiIcon'}

                         style={{
                             background: `url(${process.env.PUBLIC_URL + '/img/SplashScreen/splashicon.png'})`,
                             backgroundSize: 'cover'
                         }}
                    />
                    <form autoComplete="off" onSubmit={this.handleSubmitClick}>
                        <div className={'mb-3 mt-3'}>
                            <CssTextField className={'IranSans'}
                                          autoFocus
                                          id="outlined-multiline-flexible"
                                          label="کد مجموعه"
                                          variant="outlined"
                                          onChange={this.handleChangeCodeInput}
                                          value={this.state.code}
                            />
                        </div>

                        <Button className={'IranSans codeButton'} variant="contained" type="submit" disabled={this.state.buttonAndTextFieldDisabled}>
                            {this.state.submitButtonInside}
                        </Button>
                    </form>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        className={'cukiCodeSnackbar IranSans'}
                        open={this.state.errorSnackbar}
                        message={'انگاری کد اشتباهه'}
                    />
                </div>
            </div>
        )
    }
}

export default CukiCode;