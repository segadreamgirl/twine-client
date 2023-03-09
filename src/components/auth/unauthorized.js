import './unauthorized.css';
import '../fonts/nephilm.woff'
import { Login } from './Login';
import { Register } from './Register'


export const Unauthorized = () => {
    return <>
    <div className='page-container'>
    <section className='text-container'> 
        <p className='nephilm-font'><b><i>Twine</i></b> - Mauna Kea, Inc.'s all-in-one solution for employee interaction.</p>
        </section>
    <section className='buttons-container'>
        <button className='login-btn'
            onClick={()=>{
                {document.getElementById("login-modal").style.display = "block"}
            }}>login</button>
            <div id="login-modal" className='modal'>
                <div className="modal-content">
                <div className="modal-header">
                    <span className="close"
                        onClick={()=>{
                            {document.getElementById("login-modal").style.display = "none"}
                        }}>&times;</span>
                    <p>Login</p>
                    </div>
                    <div className="modal-body">
                        <Login/>
                    </div>
                </div>
            </div>
        <button className='register-btn'
        onClick={()=>{
            {document.getElementById("reg-modal").style.display = "block"}
        }}
        >register</button>
        <div id="reg-modal" className='modal'>
                <div className="modal-content">
                <div className="modal-header">
                    <span className="close"
                        onClick={()=>{
                            {document.getElementById("reg-modal").style.display = "none"}
                        }}>&times;</span>
                    <p className='nephilm-font-modal'>Register</p>
                    </div>
                    <div className="modal-body">
                        < Register />
                    </div>
                </div>
            </div>
        </section>
    </div>
    </>
}