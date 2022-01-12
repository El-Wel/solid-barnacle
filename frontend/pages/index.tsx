import type { NextPage } from 'next'
import React, { ReactComponentElement } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import internal from 'stream'
import styles from '../styles/Home.module.css'

// function to get props runs before rendering and saves props for NextPage
export const getServerSideProps = async () => {
  const res = await fetch(endpoint+'get');
  const data: result = await res.json();
  console.log(data);
  return {
    props: {
      data,
    },
  };
}

const endpoint: string = 'https://pkrc1zqgl0.execute-api.ap-southeast-2.amazonaws.com/';
// result from api response interface
interface result{
  "Items": TodoItem[],
  "Count": number,
  "ScannedCount": number
}
//interface for a todo item containing string
interface TodoItem{
  key: number;
  taskID: string;
  task: string;
  done: boolean;
}

async function DeleteTask(taskID:string){
    const taskId: string = taskID
    const fetchEndpoint: string = endpoint + 'delete';
    const res = await fetch(fetchEndpoint);
    console.log(res.json())
    // Add items to the event?
    //   method: 'DELETE',
    //   headers: {
    //     'content-type': 'application/json;charset=UTF-8',
    //   },
    //   body: JSON.stringify({
    //     deleteKey: taskId
    //   }),
    // }))
}
// function component for printing a list
function TodoList(props: {todos: TodoItem[]}) {
  const todos: TodoItem[] = props.todos;
  let todoList: JSX.Element[]
  // checking in case todos is undefined (has been issue when testing lambda)
  if (props.todos) {
    todoList = todos.map((item: TodoItem) => <tr key={item.task}><input type='checkbox' id={item.task}></input>{item.task} <button id={item.taskID} onClick={() => DeleteTask(item.task)}>delete</button></tr>)
  }
  else{
    todoList = [<tr key={undefined}>Api Response message: Internal server error</tr>]
  }
  return(
    <ul>{todoList}</ul>
  )
}

const Home: NextPage<{data: result}> = ({data}) => {
  //data stored from getServerSideProps
  const testList = data.Items
  console.log(testList)
  return (
    <div className={styles.container}>
    <Head>
      <title>Create Next App</title>
      <meta name="description" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <body>
      <h1>Todo List:
      </h1>
      <table><TodoList todos={testList}/></table>
    </body>
  </div>    
  )
};

export default Home
