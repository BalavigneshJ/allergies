import React from 'react' ;
import Allergy from './Allergy' ;

function AllergiesList(props) {

    let list = props.allergies.length ? 
        props.allergies.map((allergy , index) => {
            return(
            <Allergy className="allergy-ele" key={index} index={index} allergy={allergy} />
            )
        }) : <span></span>

    return(
      <div className="allergies-list">
        {list}
      </div>
    );
}

export default AllergiesList;
