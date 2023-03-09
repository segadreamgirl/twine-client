import './unauthorized.css';
import '../fonts/nephilm.woff'


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
                <div class="modal-content">
                <div class="modal-header">
                    <span class="close"
                        onClick={()=>{
                            {document.getElementById("login-modal").style.display = "none"}
                        }}>&times;</span>
                    <p>Some text in the Modal..</p>
                    </div>
                    <div class="modal-body">
                        <p>Some text in the Modal Body</p>
                        <p>Some other text...</p>
                    </div>
                </div>
            </div>
        <button className='register-btn'
        onClick={()=>{
            {document.getElementById("reg-modal").style.display = "block"}
        }}
        >register</button>
        <div id="reg-modal" className='modal'>
                <div class="modal-content">
                <div class="modal-header">
                    <span class="close"
                        onClick={()=>{
                            {document.getElementById("reg-modal").style.display = "none"}
                        }}>&times;</span>
                    <p>Some text in the Modal..</p>
                    </div>
                    <div class="modal-body">
                        <p>did i do it right :3</p>
                    </div>
                </div>
            </div>
        </section>
    </div>
    </>
}