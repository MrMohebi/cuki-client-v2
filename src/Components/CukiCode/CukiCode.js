import React from "react";
import {Button, TextField, withStyles} from "@material-ui/core";

import './css/CukiCode.css';
class CukiCode extends React.Component {

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

        return(
            <div className={'h-100 d-flex flex-column justify-content-center align-items-center IranSans'}>
                <div className={'logoInputContainer d-flex flex-column justify-content-center align-items-center'}>
                    <div className={'codeCukiIcon'}

                    style={{background:`url(${process.env.PUBLIC_URL + '/img/SplashScreen/splashicon.png'})`,backgroundSize:'cover'}}
                    />
                    <div className={'mb-3 mt-3'}>
                        <CssTextField className={'IranSans'}
                            id="outlined-multiline-flexible"
                            label="کد مجموعه"

                            onChange={()=>{}}
                            variant="outlined"
                        />


                    </div>

                    <Button className={'IranSans codeButton'} variant="contained">
                        مشاهده
                    </Button>

                </div>
            </div>
        )
    }
}
export default CukiCode;