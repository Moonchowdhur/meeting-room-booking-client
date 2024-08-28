/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  // const location = useLocation();
  const navigate = useNavigate();
  // const [success, setSuccess] = useState("");
  // const [error, setError] = useState("");
  const [eye, setEye] = useState(false);

  const [login, { error }] = useLoginMutation();
  const dispatch = useAppDispatch();

  console.log(error);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const toastId = toast.loading("Logging in");

    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email, password);
    event.target.reset();
    try {
      const userInfo = {
        email,
        password,
      };

      //server login
      const res = await login(userInfo).unwrap();

      console.log(res, "res");
      //* verify token and decode user
      const user = verifyToken(res?.token);
      console.log("user", user);
      // console.log(user);
      //* set user & token to local state
      dispatch(setUser({ user: user, token: res?.token }));
      toast.success("Logged in", { id: toastId, duration: 2000 });
      //set user, token in local state
      navigate("/");
    } catch (err) {
      // @ts-expect-error: Unreachable code error
      toast.error(err?.data?.message, { id: toastId, duration: 2000 });
      console.log(err);
    }
  };

  return (
    <div className="md:flex items-center justify-center  h-full md:p-16">
      <div className="md:flex mb-20 mt-36  gap-10 items-center justify-center md:mt-7  ">
        {/* login pic */}
        <div className=" ">
          <img
            src="https://i.ibb.co/NyV82dX/undraw-Mobile-login-re-9ntv.png"
            className="w-[500px]"
            alt=""
          />
        </div>

        <div className="w-96 p-6 shadow-md bg-white rounded">
          <div className="text-center mb-3 font-bold text-3xl justify-center gap-3 flex items-center">
            <FaUser className="text-[#49674a] " />
            <h1 className="animate-text text-[#49674a]  text-xl font-semibold">
              Sign in to your account
            </h1>
          </div>

          <hr className="mt-3" />
          <form onSubmit={handleSubmit}>
            <div className="mt-3">
              <label htmlFor="email" className="block text-base mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Email"
                className="border w-full px-2 focus:outline-none text-base py-1 focus:ring-0 focus:border-gray-600 rounded"
              />
            </div>
            <div className="mt-3">
              <label htmlFor="password" className="block text-base mb-2">
                Password
              </label>
              <div className="flex items-center">
                <input
                  type={eye ? "text" : "password"}
                  name="password"
                  id="password"
                  required
                  placeholder="Enter Password"
                  className="border w-full px-2 focus:outline-none text-base py-1 focus:ring-0 focus:border-gray-600 rounded"
                />
                <span onClick={() => setEye(!eye)}>
                  {eye ? (
                    <AiFillEye className="text-4xl border focus:outline-none focus:ring-0 focus:border-gray-600 rounded " />
                  ) : (
                    <AiFillEyeInvisible className="text-4xl border focus:outline-none focus:ring-0 focus:border-gray-600   rounded " />
                  )}
                </span>
              </div>
            </div>
            <div className="mt-3 ">
              <label className="label gap-2 flex  items-center cursor-pointer">
                <input type="checkbox" className="checkbox" />
                <span className="label-text">Remember Me</span>
              </label>
            </div>
            <button
              type="submit"
              className="mt-5 font-semibold text-xl border-2 w-full px-3 py-2 rounded-lg border-[#49674a] bg-[#49674a] hover:bg-transparent hover:text-[#49674a] text-white "
            >
              Sign in
            </button>
          </form>

          <button className="mt-3">
            <small>
              Don’t have an account yet?{" "}
              <span className="text-[#49674a] font-semibold underline">
                <Link to="/register">Sign up</Link>
              </span>
            </small>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
