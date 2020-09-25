{/* <section className='add-form'>
  <input
    placeholder='Name'
    value={newExpense.name}
    onChange={event => setNewExpense({...newExpense, name: event.target.value})}
  />
  <input
    placeholder='Category'
    value={newExpense.category}
    onChange={event => setNewExpense({...newExpense, category: event.target.value})}
  />
  <Dropdown />
  <input
    className='form-amount'
    value={newExpense.amount}
    onChange={event => setNewExpense({...newExpense, amount: event.target.value})}
  />
  <div className='add-form-buttons'>
    <button
      style={{margin: '10px'}}
      onClick={() => {
        addNewExpense()
        setNewExpense({name: '', category: '', amount: 0})
        setRerender(true)
      }}
    >Add</button>
    <button
      style={{margin: '10px'}}
      onClick={() => {
        setNewExpense({name: '', category: '', amount: 0})
      }}
    >Cancel</button>
  </div>
</section> */}

// .add-form {
//   height: 80%;
//   width: 35%;
//   background-color: #3a606e;
//   padding: 0 20px;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-evenly;
//   align-items: center;
//   box-shadow: 0 14px 28px 0 rgba(0,0,0,.25), 0 10px 10px 0 rgba(0,0,0,.26);
//   border-radius: 20px;
//   position: relative;
// }

// .add-form-buttons {
//   display: flex;
//   /* flex-direction: column; */
// }

// /* .select-cat {
//   height: 25px;
//   width: 100%;
//   font-size: 12px;
//   background-color: #2f323a;
//   color: white;
//   border: 0;
//   padding: 5px 0;
//   overflow: hidden;
//   text-align: center;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   position: absolute;
//   z-index: 1;
// }

// .selector {
//   margin: 5px;
// }

// .cat-expanded {
//   height: auto;
// } */

// .expense-view {
//   height: 95%;
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   position: relative;
// }

// .expense-buttons{
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// }

// .buttons-section{
//   position: absolute;
//   right: 10px;
// }

// .bud-button{
//   height: 20px;
//   width: 20px;
// }