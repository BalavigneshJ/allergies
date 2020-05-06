import React from 'react' ;
import Switch from "react-switch";
import { Line } from 'rc-progress';

class Allergy extends React.Component {

    constructor(props) {
        super(props);
        this.state = {checked : true};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(){

    }

    render() {
        let allergy = this.props.allergy ;

        let list = allergy.desc.length ? 
        allergy.desc.map((d , index) => {
            return(
        <div className="desc-ele" key={index} index={index}>Date :{d}</div>
            )
        }) : <div></div>

        return(
            <div className="allergy-item">
                
                <Switch className='allergy-switch' onChange={this.handleChange} checked={this.state.checked} uncheckedIcon={false} checkedIcon={false}/>
                <span className='allergy-title'>{allergy.type}</span>
                <Line percent="48" trailWidth="4" strokeWidth="4" strokeColor="#2db7f5 " trailColor="#D3D3D3"/>
                <div className='desc-list'>
                    {list}
                </div>
            </div>
        );
    }
}



export default Allergy ;