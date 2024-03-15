"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { NavLink } from "react-router-dom"


const formSchema = z.object({
    username: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(['student', 'professor']),
});

type FormData = z.infer<typeof formSchema>;


const SignupForm = () => {
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            role: "student",
        },
    });
    const onSubmit = (data: FormData) => {
        console.log(data);
    }
    return (
        <>
            <div className="flex flex-col gap-4 w-[500px]">

                <div className=" w-[500px] flex justify-center items-center flex-col bg-[#2f2f2f] text-[#2f2f2f] p-4 rounded-lg">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-[350px] flex justify-center items-center flex-col">
                            <div className="flex flex-col gap-2 justify-center items-center">

                                <p className=" w-[170px] h-[36px] text-[40px] font-bold text-white"><span className="text-purple-500">Gen</span>Learn</p>
                                <h2 className="text-[24px] text-white font-bold leading-[140%] tracking-tighter md:text-[30px] md:font-bold md:leading-[140%] md:tracking-tighter pt-2 sm:pt-4">
                                    Create a new account
                                </h2>
                                <p className="text-[#7878A3] text-[14px] font-medium leading-[140%] md:text-[16px] md:font-normal md:leading-[140%] mt-0">
                                    To use GenLearn , Please enter your details
                                </p>
                            </div>
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem className=" w-full">
                                        <FormLabel className="text-white">Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="shadcn" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is your public display name.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className=" w-full">
                                        <FormLabel className="text-white">Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="email@example.com" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className=" w-full">
                                        <FormLabel className="text-white">Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Password" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem className=" w-1/2">
                                        <FormLabel>Role</FormLabel>
                                        <FormControl>
                                            <Select {...field}>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder={field.value || "Role"} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="student">Student</SelectItem>
                                                    <SelectItem value="professor">Professor</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="bg-[#877EFF] hover:bg-[#5D5FEF]  text-[#eee] w-1/2 flex gap-2 !important font-semibold">Signup</Button>
                        </form>
                    </Form>
                    <div className="flex flex-col justify-center items-center mt-8">
                        <span className="text-[#eee] text-[18px] font-semibold ">Or Sign-up using</span>
                        <div className=" flex justify-center items-center mt-4 p-4 bg-white rounded-full">
                            <img src="/public/images/google-removebg-preview.png" alt="google" className=" rounded-full" width={35} height={35} />
                        </div>
                    </div >

                </div>
                <p className=" font-normal text-[18px] text-[#eee] text-center mt-2">
                    Already have an account?
                    <NavLink
                        to="/sign-in"
                        className="text-[#877EFF] font-semibold ml-1">
                        Log in
                    </NavLink>
                </p>
            </div>


        </>
    )
}

export default SignupForm
