import React from "react";
import $ from 'jquery'

class VerificationCodeInput extends React.Component {

    componentDidMount(){
        this.nameInput.focus();
    }

    codeDigitsNumber = 4;
    oncomplete = ()=>{
        let out ="";
       for (let i=1;i<=4;i++){
           out=out + $("#"+i).val();
       }
       if (out.length === this.codeDigitsNumber){
           this.props.sendCode(out)
       }
    }

    goNext = (elem)=>{
        if (elem.target.value !== ''){
            if (parseInt(elem.target.value) ===0 || parseInt(elem.target.value) ){
                if (elem.target.value.length > 1){
                    elem.target.value = elem.target.value.slice(1,2);
                }
                let nextinput = parseInt(elem.target.id)+1;
                $("#"+nextinput).focus()
            }else{
                elem.target.value = ''
            }
        }
        if (parseInt(elem.target.id) === this.codeDigitsNumber){
            this.oncomplete()
        }
    }

    onKeyDown = function(e) {
        if (e.keyCode === 8) {
            if (e.target.value === '') {
                let backid = parseInt(e.target.id) - 1;
                $("#" + backid).val('')
                $("#" + backid).focus()
            }
        }
    }

    render() {
        const items = [1,2,3,4]
        const listofinputs = items.map(input =>{
            return (
                <input ref={input === 1? (input) => { this.nameInput = input; }:''}  autoFocus={input === 1} maxLength="1" autoComplete="off" key={input} id={input} type="number" onKeyDown={this.onKeyDown} onInput={this.goNext} onClick={this.emptyclick} style={eachInputStyle}/>
            )
        })

        return (

            <div>
                {listofinputs}
                {/*<form onSubmit={this.oncomplete}>*/}
                {/*    <br/>*/}
                {/*    <button id="buttons"  className="btn" onClick={this.oncomplete} style={buttonStyle}> انجام</button>*/}
                {/*</form>*/}

            </div>

        )
    }
}


export default VerificationCodeInput;

// -------------------------css--------------------------
const eachInputStyle = {
    outline: "0",
    border: "0",
    background: "transparent",
    borderBottom: "1px solid grey",
    width:"10%",
    textAlign:"center",
    fontSize:"20px",
    margin:"0 5px 0 5px",
    maxlength:"1",
    appearance:"none"
}
const buttonStyle = {
    backgroundColor: "#FAA21B",
    borderRadius: "25px",
    width: "90px",
    height: "34px",
    marginTop: "10px",
    fontFamily: "IRANSansMobile_Light",
    paddingTop: "6px",
    color:'white',
    fontWeight:'bold'
}
