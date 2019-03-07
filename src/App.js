import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';



class AddToDoForm extends Component {  
  constructor() {
    super();
    this.state = { 
      inputVal:"" 
    };
  }
  submitToDo = (ev)=>{
    ev.preventDefault();

    if(this.state.inputVal){
      this.props.addTodo(this.state.inputVal);
      this.setState({inputVal:""});
    }else{
      alert("A value is required!");
    }
  }

  render(){
    return(
      <form onSubmit={this.submitToDo}>
        <label>Add a todo</label>
        <div>
          <input
            className="todo-input"
            placeholder="Start typing..."
            onChange={(ev)=>{
              this.setState({inputVal:ev.target.value});
            }}
            value={this.state.inputVal}
          />
          <button>Submit</button>
        </div>
      </form>
    )
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = { 
      todos: [{
        text:"Buy groceries",
        isDone:false
      },    {
        text:"Go to the gym",
        isDone:false
      },    {
        text:"Pay credit card",
        isDone:false
      }] 
    };
  }

  addTodo = (text)=>{
    console.log("hhhhh", text)
    this.setState({todos:[...this.state.todos, {text}]});
  }

  toggleTodoStatus = (payload)=>{
    const { status, index } = payload;
    console.log(payload)
    const myNewTodos = [...this.state.todos];
    myNewTodos[index].isDone = status;
    this.setState({todos:myNewTodos});
  }
  render() {
    return (
      <div className="app">
        <AddToDoForm addTodo={this.addTodo}/>
        {
          this.state.todos.map((todo, index)=>{
            const { text, isDone} = todo;
            const btnText = isDone ? "Undo" : "Done";
            return(
              <div key={index} className="list-item">
                <span className={isDone ? "strike-through" : ""}>{text}</span>
                <button className={`status-btn ${isDone ? "done" : ""}`} onClick={()=>this.toggleTodoStatus({status:!isDone, index})}>{btnText}</button>
              </div>
          );
          })
        }
      </div>
    );
  }
}

export default App;
