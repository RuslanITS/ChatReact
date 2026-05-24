import axios from "axios";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

type Message = {
  _id: string;
  message: string;
  author: string;
  datetime: string;
};

const App = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await axios.get<Message[]>(
          "http://146.185.154.90:8000/messages"
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Ошибка:", error);
      }

    };

    fetchData();

  }, []);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">

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