
export  function RandomColor(i=-1){
    let result
    let colors = [
        {foreground:'#EF953C',background:'#fff7ef'},
        {foreground:'#8B8B8B',background:'#F9F9F9'},
        {foreground:'#F77070',background:'#FCFAFA'},
        {foreground:'#6B8962',background:'#FBFDE9'},
        {foreground:'#6B8962',background:'#F7FAF6'},
        {foreground:'#BF1E1E',background:'#FDF5F4'},
        {foreground:'#41B454',background:'#F2F9F3'},
        {foreground:'#FF005E',background:'#F3ECF0'},
        {foreground:'#C27735',background:'#FFFCF2'},
        {foreground:'#278871',background:'#F0F9F8'},
        {foreground:'#77978F',background:'#F8F8F8'},
        {foreground:'#844545',background:'#FEF5F1'},
    ]
    if(i < 0)
        result = colors[Math.floor(Math.random() * colors.length)]
    else
        result = colors[i % colors.length]

    return result
}