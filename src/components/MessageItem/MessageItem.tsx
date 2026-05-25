import type { Message } from "../../type";

type Props = { item: Message; };

const MessageItem = ({ item }: Props) => {
  return (
    <div className="card shadow-sm mb-3">

      <div className="card-body">

        <div className="d-flex justify-content-between align-items-center mb-2">

          <h5 className="card-title m-0">{item.author}</h5>

          <small className="text-muted">
            {new Date(
              item.datetime
            ).toLocaleString()}
          </small>

        </div>

        <p className="card-text">{item.message}</p>

      </div>
    </div>
  );
};

export default MessageItem;