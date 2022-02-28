import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key:string] : Array<TaskType>
}


function App() {
    let todolistId1 = v1()
    let todolistId2 = v1()
    let [todolists, setTodolists] = useState<TodolistType[]>([
        {
            id: todolistId1,
            title: 'what to learn',
            filter: 'all'
        },
        {
            id: todolistId2,
            title: 'what to buy',
            filter: 'all'
        }
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ]
    });


    function removeTask(id: string,todolistId: string) {
        tasks[todolistId] = tasks[todolistId].filter(t => t.id !== id);
        setTasks({...tasks});
    }

    function addTask(title: string,todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};
        tasks[todolistId]=[task,...tasks[todolistId]]
        setTasks({...tasks});
    }

    function changeStatus(taskId: string, isDone: boolean,todolistId: string) {
        let task = tasks[todolistId].find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }

        setTasks({...tasks});
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }
    function removeTodolist(tlId:string){
        setTodolists(todolists.filter(tl=>tl.id!==tlId))
        delete tasks[tlId]
        setTasks({...tasks})
    }


    return (
        <div className="App">
            {
                todolists.map(tl => {
                    let tasksForTodolist = tasks[tl.id];

                    if (tl.filter === "active") {
                        tasksForTodolist = tasks[tl.id].filter(t => t.isDone === false);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasks[tl.id].filter(t => t.isDone === true);
                    }


                    return <Todolist key={tl.id}
                                     id={tl.id}
                                     title={tl.title}
                                     tasks={tasksForTodolist}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     addTask={addTask}
                                     changeTaskStatus={changeStatus}
                                     removeTodolist={removeTodolist}
                                     filter={tl.filter}/>
                })
            }
        </div>
    );
}

export default App;
