import React from "react";

type Props = {
  author: string;
  message: string;
  loading: boolean;
  setAuthor: React.Dispatch<React.SetStateAction<string>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (event: React.SyntheticEvent) => Promise<void>;
};

const MessageForm = (props: Props) => {
  const {author, message, loading, setAuthor, setMessage, handleSubmit} = props
  return (
    <div className="card shadow-sm mb-4">

      <div className="card-body">

        <h3 className="mb-4">Send Message</h3>

        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column gap-3"
        >

          <div>
            <label
              htmlFor="name"
              className="form-label"
            >
              Input your Name
            </label>

            <input
              value={author}
              id="name"
              type="text"
              maxLength={20}
              className="form-control"
              placeholder="Enter your name"
              onChange={(event) =>
                setAuthor(
                  event.target.value
                )
              }
            />
          </div>

          <div>
            <label
              htmlFor="text"
              className="form-label"
            >
              Input your Message
            </label>

            <textarea
              value={message}
              id="text"
              rows={4}
              maxLength={50}
              className="form-control"
              placeholder="Enter message..."
              onChange={(event) =>
                setMessage(
                  event.target.value
                )
              }
            />
          </div>

          <button
            className="btn btn-primary"
            disabled={
              loading ||
              !author.trim() ||
              !message.trim()
            }
          >
            Send
          </button>

        </form>
      </div>
    </div>
  );
};

export default MessageForm;