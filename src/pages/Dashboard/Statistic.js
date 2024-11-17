import "./Statistic.css";
//User,balance,etc...
export default function Statistic(props) {
  return (
    <div className="statistic">
      <p className="statName">{props.name}</p>
      <p className="statVal">{props.value}</p>
      <div
        style={{
          backgroundColor: props.color,
          color: props.iconColor,
        }}
        className="statIcon"
      >
        {props.icon == "user" && <i className="fa-regular fa-user"></i>}
        {props.icon == "cart" && <i className="fa-solid fa-cart-shopping"></i>}
        {props.icon == "money" && <i className="fa-solid fa-dollar-sign"></i>}
        {props.icon == "wallet" && <i className="fa-solid fa-wallet"></i>}
      </div>
    </div>
  );
}
