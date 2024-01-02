import React, { useEffect, useState } from 'react'
import classes from './FormComp.module.css'

let DUMMYDATA=[
];
let total_amount=0;

function getAllLocalStorageData() {
  let dataa=[];
  // Iterate through all keys in localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
  
    try {
      // Attempt to parse the value as JSON
      const parsedValue = JSON.parse(value);
      
      // Store the parsed value in the new object
      dataa.push(parsedValue);
    } catch (error) {
      // Handle parsing errors (if any)
      console.error(`Error parsing value for key ${key}:`, error);
    }
  }
 return dataa;
}

const FormComp = () => {

 

  const [data,setData]=useState(DUMMYDATA);

  const [Id,setId]=useState('');
  const [Name,setName]=useState('');
  const [Prize,setPrize]=useState('');

  useEffect(()=>{
     setData([...getAllLocalStorageData()])
  },[])

  function getId(event){
    setId(event.target.value);
  }
  function getName(event){
    setName(event.target.value);
  }
  function getPrize(event){
    setPrize(event.target.value);
  }

  let obj={
    Id:Id,
    Name:Name,
    Prize:Prize
  }

  function addItem(event){
    event.preventDefault();
    // console.log(obj)
    localStorage.setItem(obj.Id, JSON.stringify(obj));
    setData((value)=>{
      return [...value,obj]
    })
    total_amount+=Number(obj.Prize)
  }

  function deleteData(obj){
    localStorage.removeItem(obj.Id);
    let fileter_array=data.filter((obj1)=> {
      return obj1.Id!==obj.Id;
    })
    total_amount-=Number(obj.Prize);
    setData([...fileter_array])
  }
  return (
    <>
      <div  className={classes.container}>
      <form className={classes.form}>
       <div>
          <label>Id</label>
          <input type='text'onChange={getId}/>
       </div>
       <div>
          <label>name</label>
          <input type='text' onChange={getName}/>
       </div>
       <div>
          <label>Prize</label>
          <input type='number' onChange={getPrize}/>
       </div>
        <button onClick={addItem}>Add</button>
      </form>
    </div>
    <div>
      {`Total prize of all items ${total_amount}`}
    </div>
    <div>
      <ul>
        {data.map((value)=><li key={value.Id}>{`${value.Id} ${value.Name} ${value.Prize}`} <button onClick={()=>{deleteData(value)}}>delete</button></li>)}
      </ul>
    </div>
    </>
  )
}

export default FormComp