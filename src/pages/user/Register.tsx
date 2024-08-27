/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .regex(/^\d+$/, { message: "Phone number must only contain digits" }),
  address: z.string().min(1, { message: "Address is required" }),
});

const Register = () => {
  const navigate = useNavigate();
  const [eye, setEye] = useState(false);

  const [addRegister] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Loading for Sign up");

    try {
      const res = await addRegister(data).unwrap();
      console.log(res);
      if (res?.success === true) {
        toast.success("Sign up Successful", { id: toastId, duration: 2000 });
        navigate("/login");
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
      console.log(err);
    }
  };

  return (
    <div className="md:flex items-center justify-center  h-full p-4">
      <div className="md:flex mb-20   gap-10 items-center justify-center md:mt-7  ">
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
              Sign up to your account
            </h1>
          </div>

          <hr className="mt-3" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-3">
              <label htmlFor="name" className="block text-base mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter Name"
                className="border w-full px-2 focus:outline-none text-base py-1 focus:ring-0 focus:border-gray-600 rounded"
                {...register("name")}
              />
              {errors.name && (
                // @ts-expect-error: Unreachable code error
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="mt-3">
              <label htmlFor="email" className="block text-base mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter Email"
                className="border w-full px-2 focus:outline-none text-base py-1 focus:ring-0 focus:border-gray-600 rounded"
                {...register("email")}
              />
              {errors.email && (
                // @ts-expect-error: Unreachable code error
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="mt-3">
              <label htmlFor="password" className="block text-base mb-2">
                Password
              </label>
              <div className="flex items-center">
                <input
                  type={eye ? "text" : "password"}
                  id="password"
                  placeholder="Enter Password"
                  className="border w-full px-2 focus:outline-none text-base py-1 focus:ring-0 focus:border-gray-600 rounded"
                  {...register("password")}
                />
                <span onClick={() => setEye(!eye)}>
                  {eye ? (
                    <AiFillEye className="text-4xl border focus:outline-none focus:ring-0 focus:border-gray-600 rounded " />
                  ) : (
                    <AiFillEyeInvisible className="text-4xl border focus:outline-none focus:ring-0 focus:border-gray-600 rounded " />
                  )}
                </span>
              </div>
              {errors.password && (
                // @ts-expect-error: Unreachable code error
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div className="mt-3">
              <label htmlFor="phone" className="block text-base mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="Enter Phone Number"
                className="border w-full px-2 focus:outline-none text-base py-1 focus:ring-0 focus:border-gray-600 rounded"
                {...register("phone")}
              />
              {errors.phone && (
                // @ts-expect-error: Unreachable code error
                <p className="text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div className="mt-3">
              <label htmlFor="address" className="block text-base mb-2">
                Address
              </label>
              <input
                type="text"
                id="address"
                placeholder="Enter Address"
                className="border w-full px-2 focus:outline-none text-base py-1 focus:ring-0 focus:border-gray-600 rounded"
                {...register("address")}
              />
              {errors.address && (
                // @ts-expect-error: Unreachable code error
                <p className="text-red-500">{errors.address.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="mt-5 font-semibold text-xl border-2 w-full px-3 py-2 rounded-lg border-[#49674a] bg-[#49674a] hover:bg-transparent hover:text-[#49674a] text-white "
            >
              Sign up
            </button>
          </form>
          <button className="mt-3">
            <small>
              Already have an account?{" "}
              <span className="text-[#49674a] font-semibold underline">
                <Link to="/login">Login</Link>
              </span>
            </small>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
