import React from 'react'

const ListSection = ({header, style}) => {
  return (
    <div className='list-container'>
      <h3 style={style}>{header}</h3>
      <div className='task-box'>
        <h5>Task 1</h5>
        <hr />
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
        <div className="task-menu">
          <h5>@Tapan</h5>
          <i class="fa fa-bars" aria-hidden="true"></i>
        </div>
        <button>Assign</button>
      </div>


    </div>
  )
}

export default ListSection