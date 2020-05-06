import React from 'react'
import TitleComp from './TitleComp' ;
import DateComp from './DateComp' ;
import AddAllergy from './AddAllergy' ;
import AllergiesList from './AllergiesList' ;

import { connect } from "react-redux" ;

class ColumnComp extends React.Component {

    constructor(props) {
		super(props);
    }

    render() {
        let dates = [1,2,3,4,5,6,7,8,9,10,11,12]
        return(
            <div className="col-content">
               <TitleComp title="Allergies"/>
               <DateComp dates={dates}/>
               <AllergiesList allergies = {this.props.allergies}/>
               <AddAllergy/>
            </div>
        );
    }
}

const mapStateToProps = (state)=> {
    return {
      allergies: state.Allergies.allergies ,
      status : state.Allergies.status 
    };
};


export default connect(mapStateToProps ,null)(ColumnComp) ;