import { useDispatch, useSelector } from "react-redux";
import { add, cheked1, del, edit, info, } from './store/tableUser/tableUser'
import { useState } from 'react'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { Select } from '@mui/material'
import { Info } from '@mui/icons-material'
export default function App() {
  const dispatch = useDispatch();
  let [dialog,setDialog] = useState(false)
  let [dialog1,setDialog1] = useState(false)
  let data = useSelector((state) => state.table.data);
  let info1 = useSelector((state) => state.table.info);
  
  let [img,setImg] = useState("")
  let [name,setName] = useState("")
  let [email,setEmail] = useState("")
  let [city,setCity] = useState("")
  let [phoneNumber,setPhoneNumber] = useState("")
  let [status,setStatus] = useState("")
  
  let [img1,setImg1] = useState("")
  let [name1,setName1] = useState("")
  let [email1,setEmail1] = useState("")
  let [city1,setCity1] = useState("")
  let [phoneNumber1,setPhoneNumber1] = useState("")
  let [status1,setStatus1] = useState("")
  let [idx,setIdx] = useState(null)
  const [search,setSearch] = useState("")
  const [filterData, setFilterData] = useState("all")
  const [cityFilter, setCityFilter] = useState("all")



  console.log(filterData);
  
  const filterSearch = data?.filter((item) => {
    if (filterData === "all") return true;
    return item.completed === (filterData === "true");
  })
  .filter((item) => {
    return item.name.trim().toLowerCase().includes(search.trim().toLowerCase())
  })
  .filter((item)=>{
    return cityFilter==="all" || item.city == cityFilter
  })


  function Edit(el){
    setDialog1(true)
    setIdx(el.id)
    setName1(el.name)
    setImg1(el.img)
    setEmail1(el.email)
    setCity1(el.city)
    setPhoneNumber1(el.phoneNumber)
    setStatus1(el.completed==true ? "true" : "false")
  }
  console.log(info1);
  
  return (
    <div className="p-6  mb-[30px] bg-gray-100 min-h-screen">
      <div className='flex items-center gap-[20px]'>
      <button className=" px-4 py-2 bg-blue-600 text-white rounded" onClick={() => setDialog(true)}>Add</button>
      <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Google Maps"
        onChange={(el)=>setSearch(el.target.value)}
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
        <DirectionsIcon />
      </IconButton>
    </Paper>
    <select className="p-2 border rounded" value={filterData} onChange={(el) => setFilterData(el.target.value)}>
          <option value="all">All</option>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
        <select
          className="p-2 border rounded"
          value={cityFilter}
          onChange={(el) => setCityFilter(el.target.value)}
        >
          <option value="all">All Cities</option>
          <option value="Dushanbe">Dushanbe</option>
          <option value="Khujand">Khujand</option>
          <option value="Kulob">Kulob</option>
        </select>
    </div>
    

    {info1.status ? (
  <div className="absolute w-[30%] top-0 right-0 fixed h-[100vh] bg-white shadow-lg shadow-md overflow-hidden p-6">
    <div className="flex items-center space-x-4">
      <img
        src={info1.img}
        alt={info1.name}
        className="w-full h-auto max-w-[150px] rounded-full object-cover border-2 border-gray-500 dark:border-gray-600"
      />
      <div>
        <h2 className="text-xl font-semibold text-white dark:text-gray-600">{info1.name}</h2>
        <p className="text-white dark:text-gray-700">{info1.email}</p>
      </div>
    </div>
    <div className="mt-4 space-y-2">
      <p className="text-white dark:text-gray-600">
        <span className="font-semibold">Город:</span> {info1.city}
      </p>
      <p className="text-white dark:text-gray-600">
        <span className="font-semibold">Телефон:</span> {info1.phoneNumber}
      </p>
      <p className="text-white dark:text-gray-600">
        <span className="font-semibold">Статус:</span>{" "}
        {info1.completed ? (
          <span className="text-green-500">✅ Активен</span>
        ) : (
          <span className="text-red-500">❌ Неактивен</span>
        )}
      </p>
    </div>
    <div className="flex items-center justify-between mt-4">
      <button
        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
        onClick={() => dispatch(del(info1.id))}
      >
        delete
      </button>
      <button
        className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition"
        onClick={() => Edit(info1)}
      >
        Edit
      </button>
      <button className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition" onClick={() => dispatch(info(false))}>Close</button>
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          checked={info1.completed}
          onChange={() => dispatch(cheked1(info1.id))}
          className="w-5 h-5 text-blue-500"
        />
        <span className="text-white dark:text-gray-300">Ckeked</span>
      </label>
    </div>
  </div>
) : (
  <></>
)}


      {
        dialog && <div className="bg-white p-4 rounded-lg shadow-lg">
          <input className="block w-full p-2 mb-2 border rounded" type="text" value={img} placeholder='img'  onChange={(el)=>setImg(el.target.value)}/>
          <input className="block w-full p-2 mb-2 border rounded" type="text" value={name} placeholder='name' onChange={(el)=>setName(el.target.value)}/>
          <input className="block w-full p-2 mb-2 border rounded" type="text" value={email} placeholder='email' onChange={(el)=>setEmail(el.target.value)}/>
          <select className="block w-full p-2 mb-2 border rounded" onChange={(el)=>setCity(el.target.value)}>
            <option value="Dushanbe">Dushanbe</option>
            <option value="Khujand">Khujand</option>
            <option value="Kulob">Kulob</option>
          </select>
          <input className="block w-full p-2 mb-2 border rounded" value={phoneNumber} type="text" onChange={(el)=>setPhoneNumber(el.target.value)} placeholder='phoneNumber' />
          <select className="block w-full p-2 mb-2 border rounded" onChange={(el)=>setStatus(el.target.value)}>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
          <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={()=>{setDialog(false),dispatch(add({id:data.length+1,img,name,email,city,phoneNumber,status:status=="true" ? true : false}))}}>Add</button>
          <button onClick={()=>setDialog(false)} className='px-4 py-2 bg-red-500 ml-[20px] text-white rounded'>Close</button>
        </div>
      }
      {
        dialog1 && <div className="bg-white p-4 rounded-lg ">
          <input className="block w-full p-2 mb-2 border rounded" type="text" value={img1} placeholder='img'  onChange={(el)=>setImg1(el.target.value)}/>
          <input className="block w-full p-2 mb-2 border rounded" type="text" value={name1} placeholder='name' onChange={(el)=>setName1(el.target.value)}/>
          <input className="block w-full p-2 mb-2 border rounded" type="text" value={email1} placeholder='email' onChange={(el)=>setEmail1(el.target.value)}/>
          <select className="block w-full p-2 mb-2 border rounded" value={city1} onChange={(el)=>setCity1(el.target.value)}>
            <option value="Dushanbe">Dushanbe</option>
            <option value="Khujand">Khujand</option>
            <option value="Kulob">Kulob</option>
          </select>
          <input className="block w-full p-2 mb-2 border rounded" type="text" value={phoneNumber1} onChange={(el)=>setPhoneNumber1(el.target.value)} placeholder='phoneNumber' />
          <select className="block w-full p-2 mb-2 border rounded" value={status1} onChange={(el)=>setStatus1(el.target.value)}>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
          <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={()=>{setDialog1(false),dispatch(edit({idx,img1,name1,email1,city1,phoneNumber1,status:status1=="true" ? true : false}))}}>Save</button>
          <button onClick={()=>setDialog1(false)} className='px-4 py-2 bg-red-500 ml-[20px] text-white rounded'>Close</button>
        </div>
      }
      
      <table className="w-full  shadow-lg rounded-lg overflow-hidden">
        <thead className="border-b">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">City</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left"></th>
          </tr>
        </thead>
        <tbody>
        {filterSearch?.map((todo) => (        
    <tr key={todo.id} className="border-b hover:bg-white">
      <td className="p-3 flex items-center gap-3">
        <img className="w-10 h-10 rounded-full object-cover" src={todo.img} alt="" />
        <div>
          <span className="font-semibold">{todo.name}</span><br/>
          <span className="text-gray-500">{todo.email}</span>
        </div>
      </td>
      <td className="p-3">{todo.city}</td>
      <td className="p-3">{todo.completed ? "✅ True" : "❌ False"}</td>
      <td className="p-3">{todo.phoneNumber}</td>
      <td className="p-3 flex items-center justify-center gap-2">
        <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => dispatch(del(todo.id))}>delete</button>
        <button className="px-2 py-1 bg-yellow-500 text-white rounded" onClick={()=>Edit(todo)}>Edit</button>
        <button className="px-2 py-1 bg-blue-500 text-white rounded" onClick={()=>{dispatch(info(todo.id))}}>Info</button>
        <input type="checkbox" checked={todo.completed} onChange={()=>dispatch(cheked1(todo.id))} />
      </td>
    </tr>
  ))}
        </tbody>
      </table>
    </div>
  );
}
