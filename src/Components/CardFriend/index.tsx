import { RightOutlined } from "@ant-design/icons";
import "./styles.scss";

interface Props {
  className?: string;
}
function CardFriend(props: Props) {
  return (
    <div className={`cardFriend ${props.className}`}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
        alt=""
        className="userImg"
      />
      <div className="user">
        <p>NV.Cường</p>
        <p>
          Nợ bạn: <span className="owed">$50.0</span>
        </p>
      </div>
      <button className="btnMore">
        <RightOutlined />
      </button>
    </div>
  );
}

export default CardFriend;
