import { useEffect,useState } from "react";
import { Link } from "react-router-dom";

const Tasks=()=>{

const [tasks,setTasks]=useState([]);

const [search,setSearch]=useState("");

useEffect(()=>{

// API

// getTasks()

setTasks([

{
_id:1,
title:"React Dashboard",
status:"Pending"
},

{
_id:2,
title:"Node API",
status:"Completed"
},

{
_id:3,
title:"Authentication",
status:"Pending"
}

]);

},[]);

const filteredTasks=tasks.filter(task=>
task.title.toLowerCase().includes(search.toLowerCase())
);

const deleteTask=(id)=>{

setTasks(tasks.filter(task=>task._id!==id));

}

return(

<div className="admin-page">
<div className="page-header">
      <h2>Manage Tasks</h2>

      <Link to="/admin/dashboard">
        <button className="back-btn">← Back to Dashboard</button>
      </Link>
    </div>

<input
className="search-box"
placeholder="Search Task..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

<table className="admin-table">

<thead>

<tr>

<th>Title</th>

<th>Status</th>

<th>Action</th>

</tr>

</thead>

<tbody>

{

filteredTasks.map(task=>(

<tr key={task._id}>

<td>{task.title}</td>

<td>

<span className={task.status==="Completed"?"badge completed":"badge pending"}>

{task.status}

</span>

</td>

<td>

<Link to={`/tasks/${task._id}`}>

<button className="view-btn">

View

</button>

</Link>

<Link to={`/tasks/edit/${task._id}`}>

<button className="edit-btn">

Edit

</button>

</Link>

<button
className="delete-btn"
onClick={()=>deleteTask(task._id)}
>

Delete

</button>

</td>

</tr>

))

}

</tbody>

</table>

</div>

)

}

export default Tasks;