import React from 'react' ;

function DateComp(props) {

    let dateEle = props.dates.length ? 
        props.dates.map((date , index) => {
            return(
            <span className="date-ele" key={index}>{date}</span>
            )
        }) : <span></span>

    return(
      <div className="date-comp">
        {dateEle}
      </div>
    );
}

export default DateComp;
