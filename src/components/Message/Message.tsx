import "./Message.scss";

type Message = {
  text: string;
};

const Message = ({ text }: Message) => {
  return (
    <div className="message">
      <span className="message-text">{text}</span>
    </div>
  );
};

export default Message;
