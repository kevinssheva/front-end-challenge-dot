import { useState } from "react";
import Layout from "../Layout";
import Input from "../components/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      axios
        .post(
          "http://localhost:3001/auth/login",
          {
            email: data.email,
            password: data.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        )
        .then(() => {
          localStorage.setItem("isAuthenticated", "true");
          navigate("/");
        })
        .catch((err) => console.error(err));
    } else {
      axios
        .post("http://localhost:3001/auth/register", data)
        .then((res) => {
          if (res.status === 201) {
            axios
              .post(
                "http://localhost:3001/auth/login",
                {
                  email: data.email,
                  password: data.password,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                  withCredentials: true,
                }
              )
              .then(() => {
                localStorage.setItem("isAuthenticated", "true");
                navigate("/");
              })
              .catch((err) => console.error(err));
          }
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <Layout>
      <div className="w-full h-full">
        <div className="flex flex-col h-full">
          <h1 className="text-3xl font-bold mb-1">
            {isLogin ? "Login" : "Register"}
          </h1>
          <p className="mb-10 text-gray-500">
            {isLogin
              ? "Login to save and showcase your high scores!"
              : "Sign up to embark on your personalized quiz journey"}
          </p>
          <form className="flex flex-col gap-4 flex-1" onSubmit={handleSubmit}>
            {!isLogin && (
              <Input
                label="Name"
                id="name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                required
              />
            )}
            <Input
              label="Email"
              id="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
            />
            <Input
              label="Password"
              id="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
              type="password"
            />
            <button className="w-full rounded-full py-3 bg-sky-500 text-white font-semibold mt-5">
              {isLogin ? "Login" : "Register"}
            </button>
            <p className="text-sm text-center">
              {isLogin
                ? "Don't have an account yet?"
                : "Already have an account?"}{" "}
              <span
                className="underline cursor-pointer hover:text-sky-500"
                onClick={() => setIsLogin((prev) => !prev)}
              >
                {isLogin ? "Register" : "Login"}
              </span>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;
