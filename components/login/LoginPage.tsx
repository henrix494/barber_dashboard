"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { login } from "@/actions/login";
export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data: any) => {
    login(data);
  };
  return (
    <div>
      <div className="flex max-lg:flex-col ">
        <div className="flex max-lg:h-1/2 max-lg:mb-5   lg:justify-center flex-col lg:pt-0 pt-10  lg:w-[40%] items-center ">
          <div className="lg:h-[60%] flex flex-col gap-7 ">
            <div className="self-start">
              <Image
                src={"/loginIcon.svg"}
                width={60}
                height={60}
                alt="icon"
                className=" max-lg:w-[40px]"
              />
            </div>
            <div className=" ">
              <div>
                <h3 className="lg:text-5xl font-bold ">כניסה למשתמש שלך</h3>
                <h3 className="lg:text-2xl pt-5 ">תיראה מה קורה בעסק שלך</h3>
              </div>
              <form
                className="pt-10 flex flex-col gap-10"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <label htmlFor="userName" className="text-xl">
                    שם משתמש
                  </label>
                  <input
                    className="w-full border-2 lg:h-[60px] text-xl "
                    type="text"
                    {...register("userName", { required: true })}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="text-xl">
                    סיסמה
                  </label>
                  <input
                    className="w-full lg:h-[60px] border-2 text-xl"
                    type="password"
                    {...register("password", { required: true })}
                  />
                </div>
                <button className="bg-[black] text-white text-xl flex items-center justify-center h-[40px] rounded-lg">
                  כניסה
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="  lg:w-[60%] ">
          <div className="  ">
            <Image
              src={"/LoginPageIMG.jpg"}
              width={1200}
              height={1200}
              alt="loginBackGround"
              className="h-screen max-lg:h-1/2  w-screen object-cover rounded-xl "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
