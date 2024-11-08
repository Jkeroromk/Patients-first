"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { set, useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/Validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/action/patient.action"
import { FormFieldType } from "./PatientForm"
import { RadioGroup } from "@radix-ui/react-radio-group"


const RegisterForm = ({user}:{user:User}) => {
  const router = useRouter();
  const [isLoading,setisLoading] = useState(false)
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name:"",
      email:"",
      Phone:""
    },
  })

  // 2. Define a submit handler.
  async function onSubmit({ name, email, Phone }: z.infer<typeof UserFormValidation>) {
    setisLoading(true);
    try {
        const userData = { name, email, phone: Phone };
        const user = await createUser(userData);
        if (user && user.$id) {
            router.push(`/patients/${user.$id}/register`);
        } else {
            console.warn("User creation or retrieval failed");
        }
    } catch (error) {
        console.error("Error in onSubmit:", error);
    } finally {
        setisLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className="space-y-4">
        <h1 className="header">Welcome👋 </h1>
        <p className="text-dark-700">Let us know more about Yourself </p>
        </section>
        <section className="space-y-6">
        <div className="mb-9 space-y-1">
        <h2 className="sub-header">Personal Information </h2>
        </div>
        </section>
        <CustomFormField
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name="name"
        label="Full name"
        placeholder="Enter your full name"
        iconSrc="/assets/icons/user.svg"
        iconAlt="user"
        />
        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name="email"
        label="Email"
        placeholder="@email.com"
        iconSrc="/assets/icons/email.svg"
        iconAlt="email"
        />
        <CustomFormField
        fieldType={FormFieldType.PHONE_INPUT}
        control={form.control}
        name="Phone"
        label="Phone Number"
        placeholder="(XXX) XXX-XXX"
        iconSrc="/assets/icons/call.svg"
        iconAlt="phone"
        />
        
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
        fieldType={FormFieldType.DATE_PICKER}
        control={form.control}
        name="birthDate"
        label="Date of Birth"
        />
        <CustomFormField
        fieldType={FormFieldType.SKELETON}
        control={form.control}
        name="Gender"
        label="Gender"
        renderSkeleton={(field)=>(
          <FormControl>
            <RadioGroup>
              
            </RadioGroup>
          </FormControl>
        )}
        />
        </div>

        <SubmitButton isLoading={isLoading}>
        Get Started
        </SubmitButton> 
      </form>
    </Form>
  )
}

export default RegisterForm