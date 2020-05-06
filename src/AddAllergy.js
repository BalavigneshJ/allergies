import React from 'react' ;
import Dropdown from './ui/dropdown';
import "./ui/dropdown.css" ;

import { connect } from "react-redux" ;
import { createAllergy, updateAllergy } from './redux/actions/AllergyAction';

class AddAllergy extends React.Component {

    constructor(props) {
        super(props);
        this.state = {isAdd : true , selectedAllergy: "" , desc : ""};
        this.onSelect  = this.onSelect.bind(this);
        this.addAllergy = this.addAllergy.bind(this);
    }

    onSelect(value){
        this.setState({selectedAllergy : value});
    }

    addAllergy(){
        let data ;
        let textarea = document.getElementById("textarea");
        let desc = textarea.value ;
        if(this.props.index !== undefined){
            this.props.updateAllergyWithIndex([desc] , this.props.index);
        }else{
            data = {type : this.state.selectedAllergy , desc : [desc]}
            this.props.newAllergy(data);   
        }

        textarea.value = '' ;
        this.setState({selectedAllergy:""});
    }

    render() {
        console.log("render called" , this.state.selectedAllergy);
        let buttonName = this.state.isAdd ? "Add" : "Edit" ;
        let allergies = ["Allergy 1" , "Allergy 2" ,"Allergy 3","Allergy 4","Allergy 5"];
        let val = this.state.selectedAllergy ;
        return(
            <div className="add-allergy">
                <Dropdown controlClassName="ui selection dropdown default-color s-size" options={allergies} onChange={this.onSelect} placeholder="Choose Allergy" value={val} />
                <textarea id="textarea" className="add-desc"></textarea>
                <button className="button-allergy" onClick={this.addAllergy}>{buttonName}</button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
	return {
	  newAllergy: (data) => {
		  dispatch(createAllergy(data));
      },

      updateAllergyWithIndex : (data , index) => {
        dispatch(updateAllergy(data , index));
      }    
	};
};


export default connect(null ,mapDispatchToProps)(AddAllergy) ;