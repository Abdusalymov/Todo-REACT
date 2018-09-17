import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class DropList extends React.Component{
  constructor(props){
    super(props);
    this.state = {text: (<input type="text" data-id="item" onBlur={this.handleChange.bind(this)}/>)}
  }
  handleChange(e){
    let value = e.target.value;
    this.setState({text: value})
  }
  removeDropList(){
    this.props.remove(this.props.ident);
  }
  render(){
    return(
      <ul className="drop_list">
        <li className='child'>
          <label>
            <input type="checkbox" className='checkbox'/>
            <span className="checkbox_custom"></span>
            {this.state.text}
          </label>
          <span className='remove' onClick={this.removeDropList.bind(this)}>Remove</span>
        </li>
      </ul>
    )
  }
}
class ElementList extends React.Component{
  constructor(props){
    super(props);
		this.state = {text: (<input type="text"  onBlur={this.handleChange.bind(this)}/>),
			elem: []
		}
  }
  appChild(){
    const {elem} = this.state;
    this.setState({elem: elem.concat(elem.length)});
  }
  handleChange(e){
    let value = e.target.value;
    this.setState({text: value})
	}
	removeElementList(){
		this.props.remove(this.props.ident);
	}
  remove(i){
    const {elem} = this.state;
    elem.splice(i, 1);
    this.setState({elem: elem});
  }
  render(){
    return(
      <li className="child">
        <label>
          <input type="checkbox" className='checkbox'/>
          <span className="checkbox_custom"></span>
          {this.state.text}
        </label>
        <div>
          <span className='add' onClick={this.appChild.bind(this)}>Add</span>
          <span className='remove' onClick={this.removeElementList.bind(this)}>Remove</span>
        </div>
        {this.state.elem.map((item, index) => (<DropList key={item} ident={index} remove={this.remove.bind(this)}/>))}
      </li>
    )
  }
}
class TaskName extends React.Component{
  constructor(props){
    super(props);
    this.state = {name: (<input type="text"  onBlur={this.handleChange.bind(this)}/>)}
  }
  handleChange(e){
    let value = e.target.value;
    this.setState({name: value})
  }
  render(){
    return(
      <h1 className="name_task cursor_style">
        {this.state.name}
      </h1>
    )
  }
}
class HideWrapper extends React.Component{
  render(){
		const {elems, toggle} = this.props;
    return(
      <div className="hide">
        {toggle && elems.length !== 0 && elems.map((item, index) => (<ElementList key={item} ident={index} remove={this.props.removeBlock}/>))}
      </div>
    )
  }
}
class Block extends React.Component{
  constructor(props){
    super(props);
    this.state = {elems: [], toggleSwitch: true, toggleName: "CLOSE"};
  }
  appChildBLock(){
    const {elems} = this.state;
    this.setState({elems: elems.concat(elems.length)});
	}
	removeChildBlock(i){
		const {elems} = this.state;
		elems.splice(i,1);
		this.setState({elems: elems})
	}
  removeBlock(){
    this.props.remove(this.props.ident);
	}
	hideElementList(){
		const {toggleSwitch, toggleName} = this.state;
		this.setState({toggleSwitch: !toggleSwitch,
			toggleName: toggleName === "OPEN" ? "CLOSE" : "OPEN" 
		})
	}
  render(){
		const {elems, toggleSwitch, toggleName}= this.state;
    return(
      <ul className="block_list">
        <li className="hedear_blockList">
					<div>
						<button className="btn_in_Block btn cursor_style"  onClick={this.removeBlock.bind(this)}>REMOVE BLOCK</button>
						<button className="btn_in_Block btn cursor_style"  onClick={this.appChildBLock.bind(this)}>ADD ITEM</button>
					</div>
					<TaskName/>
					<span className="open_close cursor_style"  onClick={this.hideElementList.bind(this)}>{toggleName}</span>
				</li>
        <HideWrapper elems={elems} removeBlock={this.removeChildBlock.bind(this)} toggle={toggleSwitch}/>
      </ul>
    )
  }
}
class Wrapper extends React.Component{
  constructor(props){
    super(props);
    this.state = {elems: []};
  }
  appChildWrapper(){
    const {elems} = this.state;
    this.setState({elems: elems.concat(elems.length)});
  }
  remove(i){
    const {elems} = this.state;
    elems.splice(i, 1);
    this.setState({elems: elems});
  }
  render(){
		const {elems} = this.state;
    return(
      <div className="wrapper_inner">
        <div className="add_Main_Task">
          <button id="main_task" className="btn warning cursor_style" onClick={this.appChildWrapper.bind(this)}>
            ADD NEW TASK
          </button>
        </div>
          { elems.length !== 0 && 
            elems.map((item, index) => (<Block key={item} ident={index} remove={this.remove.bind(this)}/>))
          }
      </div>
    )
  }
}
class Todo extends React.Component{
  render(){
    return (
      <div className="wrapper_todo">
        <Wrapper/>
      </div>
    )
  }
}
ReactDOM.render(<Todo/>, document.getElementById('root'));