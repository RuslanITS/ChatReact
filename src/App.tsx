import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Loader from "./components/Loader/Loader";
import MessageForm from "./components/MessageForm/MessageForm";
import MessageList from "./components/MessageList/MessageList";
import type { Message } from "./type";

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

      const response =
        await axios.get<Message[]>(url);

      const newMessages = [
        ...response.data,
      ].reverse();

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
    const getData =
      async (): Promise<void> => {

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

    const intervalId = setInterval(
      () => {

        void fetchData(
          messages[0].datetime
        );

      },
      3000
    );

    return () => {
      clearInterval(intervalId);
    };

  }, [messages]);

  const handleSubmit = async (
    event: React.SyntheticEvent
  ): Promise<void> => {

    event.preventDefault();

    if (
      !author.trim() ||
      !message.trim()
    ) {
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

          <MessageForm
            author={author}
            message={message}
            loading={loading}
            setAuthor={setAuthor}
            setMessage={setMessage}
            handleSubmit={handleSubmit}
          />

          {loading && <Loader />}

          <MessageList
            messages={messages}
          />

        </div>
      </div>
    </div>
  );
};

export default App;