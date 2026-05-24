import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Loader from "./components/Loader/Loader";

type Message = {
  _id: string;
  message: string;
  author: string;
  datetime: string;
};

const App = () => {

  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async (
    datetime?: string
  ): Promise<void> => {
    try {
      const url = datetime
        ? `http://146.185.154.90:8000/messages?datetime=${datetime}`
        : "http://146.185.154.90:8000/messages";

      const response = await axios.get<Message[]>(url);

      const newMessages = [...response.data].reverse();

      if (datetime) {
        setMessages((prev) => [
          ...newMessages,
          ...prev,
        ]);
      } else {
        setMessages(newMessages);
      }

    } catch (error) {
      console.error("error:", error);
    }
  };

  useEffect(() => {
    const getData = async (): Promise<void> => {
      setLoading(true);

      await fetchData();

      setLoading(false);
    };

    void getData();
  }, []);

  useEffect(() => {
    if (messages.length === 0) {
      return;
    }

    const intervalId = setInterval(() => {
      void fetchData(
        messages[0].datetime
      );
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };

  }, [messages]);

  const handleSubmit = async (
    event: React.SyntheticEvent
  ): Promise<void> => {

    event.preventDefault();

    if (!author.trim() || !message.trim()) {
      return;
    }

    try {
      setLoading(true);

      const data = new URLSearchParams();

      data.set("author", author);
      data.set("message", message);

      await axios.post("http://146.185.154.90:8000/messages", data);

      setAuthor("");
      setMessage("");
      await fetchData();

    } catch (error) {
      console.error("error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">

        <div className="col-md-8">

          <div className="card shadow-sm mb-4">

            <div className="card-body">

              <h3 className="mb-4">Send Message</h3>

              <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">

                <div>
                  <label
                    htmlFor="name"
                    className="form-label"
                  >Input your Name
                  </label>

                  <input
                    value={author}
                    id="name"
                    type="text"
                    maxLength={20}
                    className="form-control"
                    placeholder="Enter your name"
                    onChange={(event) =>
                      setAuthor(event.target.value)
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="text"
                    className="form-label"
                  >Input your Message
                  </label>

                  <textarea
                    value={message}
                    id="text"
                    maxLength={50}
                    className="form-control"
                    placeholder="Enter message..."
                    onChange={(event) =>
                      setMessage(event.target.value)} />
                </div>

                <button
                  className="btn btn-primary"
                  disabled={
                    loading ||
                    !author.trim() ||
                    !message.trim()}>
                  Send
                </button>

              </form>
            </div>
          </div>

          {loading && <Loader/>}

          {messages.map((item) => (

            <div key={item._id} className="card shadow-sm mb-3">
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
          ))}

        </div>
      </div>
    </div>
  );
};

export default App;