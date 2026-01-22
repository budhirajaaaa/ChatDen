import {useState} from "react"
import {useSelector,useDispatch} from "react-redux"
import {signup} from '../redux/authSlice'
export default function Signup(){

  const dispatch = useDispatch();
  const {isSigningUp} = useSelector(state=>state.auth)
  const [formData,setFormData] = useState({
    fullName:"",email:"",password:""
  })
  const handleSubmit=()=>{
    console.log(formData)
    dispatch(signup(formData))
  }
  const handleChange=(e)=>{
    setFormData(data=>({...data,[e.target.name]:e.target.value}))
  }

  return ( <div className="relative z-10 w-full max-w-5xl h-auto md:h-[80vh] bg-slate-800 rounded-2xl shadow-xl p-6 overflow-y-auto flex items-center justify-center p-4 ">
  <div className="md:w-1/2 flex flex-col justify-center items-center">
  <h1 className="text-3xl text-white m-4">Create Account</h1>
  <p className="mb-8">Signup for a new account</p>
  <label className="input input-bordered flex items-center gap-2 m-2">
    Name
    <input type="text" className="grow text-white" placeholder="Jhon Doe" value={formData.fullName} name="fullName" onChange={(e)=>handleChange(e)}/>
  </label>
  <label className="input input-bordered flex items-center gap-2 m-2">
    Email
    <input type="text" className="grow text-white" placeholder="jhondoe@site.com" value={formData.email} name="email" onChange={(e)=>handleChange(e)}/>
  </label>
  <label className="input input-bordered flex items-center gap-2 m-2 ">
    Password
    <input type="password" className="grow text-white" placeholder="Password" value={formData.password} name="password" onChange={(e)=>handleChange(e)}/>
  </label>
<button className="btn bg-sky-500 btn-wide text-white" onClick={handleSubmit}>Sign Up</button>
  </div>
  <div className="hidden md:w-1/2 md:flex items-center justify-center">
  <img src="/signup.png" alt="People using mobile devices w-full h-auto object-contain"/>

  </div>
</div>)
}
