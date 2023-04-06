/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';

const Debits = (props) => {

  // Create the list of Debit items
  let debitsView = (debits) => {
    return debits.map((debit) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = debit.date.slice(0,10);
      return <li key={debit.id}>{Number(debit.amount).toFixed(2)} {debit.description} {date}</li>
    });
  }

  function addDebit(e){
    e.preventDefault();

    const description = e.target.elements.description.value;
    const amount = e.target.elements.amount.value;
    //const date = new Date().toISOString().slice(0, 10);
    const now = new Date();
    const tzOffset = now.getTimezoneOffset();
    const date = new Date(now.getTime() - tzOffset * 60 * 1000).toISOString().slice(0, 10);

    //console.log(new Date());

    const newBalance = props.accountBalance - amount;
    props.updateAccountBalance(newBalance);

    props.addDebit([...props.debits, {
      id: props.debits.length + 1,
      description: description,
      amount: amount,
      date: date,
    }]);
  }
  // Render the list of Debit items and a form to input new Debit item
  return (
    <div>
      <h1>Debits</h1>
      <AccountBalance accountBalance={props.accountBalance}/>
      <br></br>
      {debitsView(props.debits)}

      <form onSubmit={(e) => addDebit(e)}>
        <input type="text" name="description" placeholder="Description" />
        <input type="number" name="amount" placeholder='Price' step=".01"/>
        <button type="submit">Add Debit</button>
      </form>
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Debits;