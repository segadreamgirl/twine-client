export const TicketModal = ({ticket, project_id}) =>{
            return <><div id={ticket.id} className='modal'>
            <div className="modal-content">
                <span className="close"
                    onClick={()=>{
                        {document.getElementById(`${ticket.id}`).style.display = "none"}
                    }}>&times;</span>
                <h1>{ticket.title}</h1>
                <div className="modal-body">
                    {ticket.description}
                </div>
            </div>
        </div>
        </>
}