/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from "react-router-dom";
import AccountBalance from "./AccountBalance";

const Credits = (props) => {
  let creditView = (credits) => {
    return credits.map((credit) => {
      let date = credit.date.slice(0, 10);
      return (
        <li key={credit.id}>
          {Number(credit.amount).toFixed(2)} {credit.description} {date}
        </li>
      );
    });
  };

  function addCredit(e) {
    e.preventDefault();

    const description = e.target.elements.description.value;
    const amount = e.target.elements.amount.value;
    //const date = new Date().toISOString().slice(0, 10);
    const now = new Date();
    const tzOffset = now.getTimezoneOffset();
    const date = new Date(now.getTime() - tzOffset * 60 * 1000)
      .toISOString()
      .slice(0, 10);

    //console.log(new Date());

    const newBalance = props.accountBalance + amount;
    props.updateAccountBalance(newBalance);

    props.addCredit([
      ...props.credits,
      {
        id: props.credits.length + 1,
        description: description,
        amount: amount,
        date: date,
      },
    ]);
  }

  return (
    <div>
      <h1>Credit</h1>
      <AccountBalance accountBalance={props.accountBalance} />
      <br></br>
      {creditView(props.credits)}

      <form onSubmit={(e) => addCredit(e)}>
        <input type="text" name="description" placeholder="Description" />
        <input type="number" name="amount" placeholder="Price" step=".01" />
        <button type="submit">Add Credit</button>
      </form>
      <br />
      <Link to="/">Return to Home</Link>
    </div>
  );
};

export default Credits;
