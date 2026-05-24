import axios from "axios";
import { useState, useEffect } from "react";

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
    <div>
      {messages.map((item) => (
        <div key={item._id}>
          <h3>{item.author}</h3>
          <p>{item.message}</p>
          <small>{item.datetime}</small>
        </div>
      ))}
    </div>
  );
};

export default App;