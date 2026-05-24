import axios from "axios";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Loader from "./components/Loader/Loade.tsx";

type Message = {
  _id: string;
  message: string;
  author: string;
  datetime: string;
};

const App = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await axios.get<Message[]>(
          "http://146.185.154.90:8000/messages"
        );
        setMessages([...response.data].reverse());
      } catch (error) {
        console.error("Ошибка:", error);
      }finally {
        setLoading(false);
      }

    };

    fetchData();

  }, []);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">

          <div className="card shadow-sm mb-4">
            <div className="card-body">

              <h3 className="mb-4">Send Message</h3>

              <form className="d-flex flex-column gap-3">

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                />

                <textarea
                  className="form-control"
                  placeholder="Enter message..."
                />

                <button className="btn btn-primary">
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