
import './App.css'
import { useState } from 'react';
import moment from 'moment';


export function App() {

  const [toDos, setToDos] = useState([])
  const [toDo, setToDo] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editedText, setEditedText] = useState(null)

  const currentDate = moment().format('MMMM Do, YYYY');
  const currentDay = moment().format('dddd').toLowerCase();


  const checkNull = () => {
    const trimmedToDo = toDo.trim();
    if (trimmedToDo !== '') {
      setToDos([...toDos, { id: Date.now(), text: trimmedToDo, status: false }]);
      setToDo('');
    }
  };

  const hasCompletedTasks = toDos.some((todo) => todo.status);

  const edit = (id) =>{
    const editToDo = toDos.find((todo)=>todo.id === id)
    if(editToDo){
      setEditingId(id)
      setEditedText(editToDo.text)
    }
  }

  const update = ()=>{
    setToDos((todos)=>
      todos.map((element)=>{
        if(element.id === editingId){
          return {...element, text:editedText}
        }
        return element
      })
    )
    setEditingId(null)
    setEditedText('')
  }


  return (
    <div className="container">
    <div className="app">
      <div className="mainHeading">
        <br />
        <p>hello {currentDay}!</p>
      </div>
      <div className="subHeading">
        <p>{currentDate}</p>
      </div>
      <div className="input">
        <input value={toDo}
          onChange={(event) => {
            setToDo(event.target.value)
          }}
          type="text" placeholder="Add item..." />
        <i onClick={checkNull} className="fas fa-plus"></i>
      </div>
      <div className="todos">
        {
          toDos.map((object) => {
            if (!object.status) {
              return (
                <div className="todo">
                  <div className="left">
                    <input onChange={() => {
                      setToDos(toDos.filter(element => {
                        if (element.id === object.id) {
                          element.status = !element.status
                          console.log(element.status);
                        }
                        return element
                      }))
                    }} value={object.status} type="checkbox" name="" id="" />
                    {editingId === object.id?(
                      <input type="text" value={editedText}
                      onChange={(event)=> setEditedText(event.target.value)}
                      />
                    ) : (                      
                        <p>{object.text}</p>
                      ) }
                  </div>
                  <div className="right">
                    {editingId === object.id? (
                      <i
                      className="fas fa-check"
                      onClick={update}
                      style={{ color: "#63db00", cursor: "pointer" }}
                    ></i>
                    ):(
                    <i className="fa-solid fa-pen fa-2xs" style={{ color: "#8f8f8f", fontSize: "10pt", marginRight: "15px", marginTop: "15px" }}
                        onClick={()=>edit(object.id)}
                    ></i>
                    )}
                    <i className="fas fa-times" 
                      onClick={()=>setToDos(toDos.filter(element =>{
                      if(element.id === object.id){
                        element=null
                      }
                      return element
                      }))} 
                    ></i>
                  </div>
                </div>
              )
            }
            return null;
          })
        }
      </div>

      {hasCompletedTasks && (
        <div className='completed'>
          <div className="completed-heading">
            <h4>Completed tasks</h4>
          </div>
          {toDos
            .filter((completed) => completed.status)
            .reverse()
            .map((completed) => (
              <div className="completed-lists" key={completed.id}>
                <div className="left">
                  <p>{completed.text}</p>
                </div>
                <div className="right">
                  <i onClick={()=>{
                    setToDos(toDos.filter((element)=>{
                      if(element.id===completed.id){
                        element.status=!element.status
                      }
                      return element
                    }))
                  }}
                  className="fa-solid fa-circle-check" style={{ color: "#63db00" }}></i>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
    </div>
  );
}




