import React from "react";
import {Button, CircularProgress, Snackbar, TextField, withStyles} from "@material-ui/core";
import * as requests from '../../ApiRequests/ApiRequests'
import './css/CukiCode.css';
import * as PropTypes from "prop-types";

function Alert(props) {
    return null;
}

Alert.propTypes = {
    severity: PropTypes.string,
    onClose: PropTypes.any,
    children: PropTypes.node
};

class CukiCode extends React.Component {

    state = {
        code: 0,
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
    handleSubmitClick = (code) => {
        requests.getResByCode(code, this.getCodeCallback)
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
                    <div className={'mb-3 mt-3'}>
                        <CssTextField className={'IranSans'}
                                      id="outlined-multiline-flexible"
                                      label="کد مجموعه"
                                      onChange={(e) => {
                                          if (isNaN(parseInt(e.target.value[e.target.value.length - 1]))) {
                                              e.target.value = e.target.value.slice(0, -1)
                                          } else {
                                              this.state.code = e.target.value
                                          }
                                      }}
                                      variant="outlined"
                        />


                    </div>

                    <Button className={'IranSans codeButton'} variant="contained" onClick={
                        () => {
                            this.setState({
                                submitButtonInside: <CircularProgress size={28} color={"inherit"}/>,
                                buttonAndTextFieldDisabled:true
                            })
                            this.handleSubmitClick(this.state.code)
                        }
                    }
                            disabled={this.state.buttonAndTextFieldDisabled}
                    >
                        {this.state.submitButtonInside}
                    </Button>
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