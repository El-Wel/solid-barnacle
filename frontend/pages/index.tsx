import type { NextPage } from 'next'
import React, { ReactComponentElement } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import internal from 'stream'
import styles from '../styles/Home.module.css'

//interface for a todo item containing string
interface TodoItem{
  key: number;
  task: string;
  done: boolean;
}

// hardcoding a list
const todoListLocal: Array<TodoItem> = [{key: 1, task: 'do washing', done: false}, {key: 2, task: 'fold washing', done: false}, {key: 2, task: 'put away washing', done: false}]

// function component for printing a list
function TodoList(props: {todos: TodoItem[]}) {
  const todos = props.todos;
  const todoList = todos.map((item: TodoItem) => <tr key={item.key}><input type='checkbox' id={item.task}></input>{item.task}</tr>)
  return(
    <ul>{todoList}</ul>
  )
}

function GetTodos(): TodoItem[]{
  return(
    todoListLocal
  )
}

const Home: NextPage = () => {

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
      <table><TodoList todos={GetTodos()}/></table>
    </body>
  </div>    
  )
}

export default Home

// //based on react tutorial wanting to raise status up 
// // not sure how to integrate into next which seems to just use function components
// class TodoPage extends React.Component {
//   // constructor(props: any) {
//   //   super(props);
//   //   this.state = {
//   //     todos: TodoItem
//   //   }
//   // }
//   getTodos(){
//     const todoList: TodoItem[] = todoListLocal.slice()
//     return todoList
//   }
//   render(){
//     return(
//       <div className={styles.container}>
//         <Head>
//           <title>Create Next App</title>
//           <meta name="description" />
//           <link rel="icon" href="/favicon.ico" />
//         </Head>
//         <body>
//           <h1>Todo List:
//           </h1>
//           <table><TodoList todos={this.getTodos()}/></table>
//         </body>
//       </div>
//       )
//   }
// }