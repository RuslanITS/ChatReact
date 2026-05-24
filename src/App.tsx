import axios from "axios";
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Loader from "./components/Loader/Loader.tsx";

type Message = {
  _id: string;
  message: string;
  author: string;
  datetime: string;
};

const App = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [author, setAuthor] = useState('')
  const [loading, setLoading] = useState(false);

  const fetchData = async (): Promise<void> => {
    try {
      const response = await axios.get<Message[]>(
        'http://146.185.154.90:8000/messages'
      );
      setMessages([...response.data].reverse());
    } catch (error) {
      console.error("Ошибка:", error);
    }

  };

  useEffect(() => {
    const getData = async (): Promise<void> => {
      setLoading(true);

      await fetchData();

      setLoading(false);
    };

    getData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

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

      await axios.post(
        "http://146.185.154.90:8000/messages",
        data
      );

      setAuthor("");
      setMessage("");

      await fetchData();

    } catch (error) {
      console.error("Ошибка:", error);

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
                <label htmlFor={'name'}>Input your Name</label>
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
                <label htmlFor={'text'}>input your Message</label>
                <textarea
                  value={message}
                  id="text"
                  name={'text'}
                  maxLength={50}
                  onChange={(event) =>
                    setMessage(event.target.value)
                  }
                  className="form-control"
                  placeholder="Enter message..."
                />

                <button className="btn btn-primary" disabled={
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
          {loading && <Loader />}
          {messages.map((item) => (
                <div
                  key={item._id}
                  className="card shadow-sm mb-3"
                >
                  <div className="card-body">

                    <div className="d-flex justify-content-between align-items-center mb-2">

                      <h5 className="card-title m-0">
                        {item.author}
                      </h5>

                      <small className="text-muted">
                        {new Date(
                          item.datetime
                        ).toLocaleString()}
                      </small>

                    </div>

                    <p className="card-text">
                      {item.message}
                    </p>

                  </div>
                </div>
              ))
          }

        </div>
      </div>
    </div>
  );
};

export default App;