import React, { useState, useEffect } from 'react';
import PatientForm from "@/components/ui/forms/PatientForm";
import { Link } from "lucide-react";
import Image from "next/image";



export default function Home() {
  return (
      <div className="flex h-screen max-h-screen">
        <section className="remove-scrollbar container my-auto">
          <div className="sub-container max-w-[496px]">
            <Image
              src="/assets/icons/logo-full.svg"
              height={1000}
              width={1000}
              alt="patient"
              className="mb-12 h-10 w-fit"
            />
            <PatientForm />
            <div className="text-14-regular mt-20 flex justify-between">
              <p className="justify-item-end text-dark-600 xl:text-left">
                © 2024 CarePulse
              </p>
              <p className="justify-item-end text-dark-600 xl:text-left">Zexin Zou Clone Project</p>
              <Link href="/?admin=" className="text-green-500">Admin</Link>
            </div>
          </div>
        </section>
        <Image
          src="/assets/images/onboarding-img.png"
          height={1000}
          width={1000}
          alt="patient"
          priority={true}
          className="side-img max-w-[50%] "
        />
      </div> 
  );
}

