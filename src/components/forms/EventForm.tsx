"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";

const schema = z.object({
    username: z
    .string()
    .min(3, { message: 'User must be at least 3 characters long' })
    .max(20, { message: 'User must be at most 20 characters long' }),
    email: z.string().email({message: "Invalid email address"}),
    password: z
    .string()
    .min(8, { message: 'Password must be at least 8 long' }),
    firstName: z.string().min(1, {message:"First name is required"}),
    lastName: z.string().min(1, {message:"Last name is required"}),
    phone: z.string().min(1, {message:"Phone is required"}),
    address: z.string().min(1, {message:"Address is required"}),
    bithday: z.date({message:"Birthday is required"}),
    sex: z.enum(["male", 'female'], {message: "Sex is required"}),
    bloodType: z.string().min(1, {message:"Blood type is required"}),
    img:z.instanceof(File, {message: "Image is required"})
  });

type Inputs = z.infer<typeof schema>;

const EventForm = ({ type, data }:{type:"create" | "update", data?: any}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(schema),
    });

    const onSubmit = handleSubmit((data) =>  {
        console.log(data);
    });
      
    return (
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold">Create a new event</h1>
            <span className="text-xs text-gray-400 font-medium">Authentication information</span>
            <div className="flex justify-between flex-wrap gap-4">
                <InputField label={"Username"} register={register} name={"username"} defaultValue={data?.username} error={errors?.username} />
                <InputField label={"Email"} register={register} name={"email"} defaultValue={data?.email} error={errors?.email} type="email" />
                <InputField label={"Password"} register={register} name={"password"} defaultValue={data?.password} error={errors?.password} type="password" />
            </div>            
                <span className="text-xs text-gray-400 font-medium">Personal information</span>
            <div className="flex justify-between flex-wrap gap-4">
                <InputField label={"First Name"} register={register} name={"firstname"} defaultValue={data?.firstName} error={errors?.firstName} />
                <InputField label={"Last Name"} register={register} name={"lastname"} defaultValue={data?.lastName} error={errors?.lastName} />
                <InputField label={"Phone"} register={register} name={"phone"} defaultValue={data?.phone} error={errors?.phone} />
                <InputField label={"Address"} register={register} name={"address"} defaultValue={data?.address} error={errors?.address} />
                <InputField label={"Address"} register={register} name={"address"} defaultValue={data?.address} error={errors?.address} />
                <InputField label={"Birthday"} register={register} name={"birthday"} defaultValue={data?.birthday} error={errors?.bithday} type="date" />
                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-sm text-gray-500">Sex</label>
                    <select className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" {...register("sex")} defaultValue={data?.sex}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    {errors.sex && <p className="text-sm text-red-400">{errors?.sex.message?.toString()}</p>}
                </div>
                <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
                    <label className="text-sm text-gray-500 flex items-center gap-2 cursor-pointer" htmlFor="img">
                        <Image src="/upload.png" alt="" height={28} width={28} />
                        <span>Upload a photo</span>
                    </label>
                    <input type="file" {...register("img")} className="hidden" id="img" />                    
                    {errors.sex && <p className="text-sm text-red-400">{errors?.sex.message?.toString()}</p>}
                </div>                
            </div>
            <button className="bg-blue-400 text-white p-2 rounded-md">{ type === "create" ? "Create" : "Update"}</button>
        </form>
    )
}

export default EventForm