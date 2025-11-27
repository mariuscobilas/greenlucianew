"use client";
import { useState } from "react";
import Image from "next/image";
import Button from "@/app/components/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {FaLocationDot, FaPhone} from "react-icons/fa6";
import {IoMdMail} from "react-icons/io";

export default function Home() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    organisation: "",
    consent: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheckboxChange = (checked: boolean | string) => {
    setFormData((prev) => ({ ...prev, consent: checked === true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.consent) {
      alert("Please consent to the terms.");
      return;
    }

    setIsLoading(true);
    setIsSuccess(false); // Reset success state on new submission attempt

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Success!
        console.log("Form data sent to Airtable successfully.");
        setIsSuccess(true);
        // Optional: clear form data here
      } else {
        // Handle API errors
        const errorData = await response.json();
        console.error("Submission failed:", errorData);
        alert(`Registration failed: ${errorData.message}`);
        setIsSuccess(false);
      }
    } catch (error) {
      // Handle network errors
      console.error("Network or unexpected error:", error);
      alert("An unexpected error occurred during submission.");
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="flex-col min-h-screen items-center justify-center bg-[#072F04] font-sans">
        {/* Hero Section */}
        <section className="min-h-screen w-full flex flex-col justify-between items-center py-10 px-4">
          <Image src="/top_logo.svg" width={700} height={1} quality={100} alt="Top logo part" className="w-full max-w-[500px] h-auto" />

          <div className="flex flex-col items-center gap-0 py-10">
            <div className="flex items-center gap-0">
              <Image src="/icon1.svg" width={1} height={70} className="w-auto h-[140px]" alt="Icon 1" />
              <Image src="/icon2.svg" width={1} height={70} className="w-auto h-[140px]" alt="Icon 2" />
              <Image src="/icon3.svg" width={1} height={70} className="w-auto h-[140px]" alt="Icon 3" />
            </div>

            <p className="text-center font-[500] text-[14px] md:text-[16px] text-[#ADBE8F] mt-1 px-4">
              Cybercor Institute, Technical University <br />
              168 Stefan cel Mare Boulevard <br />
              11 December 18:30–20:30
            </p>

            <Button href="#form" className="h-[40px] w-full max-w-[320px] text-[16px] text-[#072F04] cursor-pointer mt-6">
              Register
            </Button>
          </div>

          <Image src="/bottom_logo.svg" width={600} height={1} alt="Bottom logo part" className="w-full max-w-[400px] h-auto" />
        </section>

        {/* Sponsors Section */}
        <section className="grid grid-cols-2 md:py-10 bg-[#052403] sm:grid-cols-4 md:flex md:flex-row items-center justify-center md:justify-between px-4 md:px-[90px] py-5 gap-4 md:gap-16">
          {/* Example for the first image, apply similar changes to all others */}
          <Image
              src="/embassy.svg"
              alt="Embassy logo"
              width={700}
              height={700}
              quality={100}
              className="h-auto w-full max-w-[80px] md:max-w-[274px] mx-auto"
              sizes="(max-width: 768px) 80px, 137px"
          />
          <Image
              src="/utm.svg"
              alt="UTM logo"
              width={700}
              height={700}
              quality={100}
              className="h-auto w-full max-w-[60px] md:max-w-[91.5px] mx-auto"
              sizes="(max-width: 768px) 60px, 91.5px"
          />
          <Image
              src="/cybercor.svg"
              alt="Cybercor logo"
              width={700}
              height={700}
              quality={100}

              className="h-auto w-full max-w-[90px] md:max-w-[142.13px] mx-auto"
              sizes="(max-width: 768px) 90px, 142.13px"
          />
          <Image
              src="/volvo.svg"
              alt="Volvo logo"
              width={700}
              height={700}
              quality={100}

              className="h-auto w-full max-w-[120px] md:max-w-[193.35px] mx-auto"
              sizes="(max-width: 768px) 120px, 193.35px"
          />
          <Image
              src="/ericsson.svg"
              alt="Erricson logo"
              width={700}
              height={700}
              quality={100}

              className="h-auto w-full max-w-[50px] md:max-w-[70.11px] mx-auto"
              sizes="(max-width: 768px) 50px, 70.11px"
          />
          <Image
              src="/synevo.svg"
              alt="Synevo logo"
              width={700}
              height={700}
              quality={100}

              className="h-auto w-full max-w-[90px] md:max-w-[138.7px] mx-auto"
              sizes="(max-width: 768px) 90px, 138.7px"
          />
          <Image
              src="/trox.svg"
              alt="Trox logo"
              width={700}
              height={700}
              quality={100}

              className="h-auto w-full max-w-[60px] md:max-w-[83.57px] mx-auto"
              sizes="(max-width: 768px) 60px, 83.57px"
          />
          <Image
              src="/dynava.svg"
              alt="Dynava logo"
              width={700}
              height={700}
              quality={100}

              className="h-auto w-full max-w-[70px] md:max-w-[98.22px] mx-auto"
              sizes="(max-width: 768px) 70px, 98.22px"
          />
        </section>

        {/* Form Section */}
        <section className="min-h-fit w-full flex justify-center items-center py-20 px-4" id="form">
          <div className="flex flex-col items-center justify-center w-full max-w-[600px] bg-white rounded-[24px] py-8 md:py-12 px-6 md:px-9 shadow-lg">

            {isSuccess ? (
                <div className="text-center py-10">
                  <h2 className="text-[24px] md:text-[28px] text-[#072F04] font-bold">Thank You!</h2>
                  <p className="text-[16px] md:text-[18px] text-[#072F04] opacity-70 mt-2">
                    Your registration has been received.
                  </p>
                </div>
            ) : (
                <>
                  <h2 className="text-[24px] md:text-[28px] text-[#072F04] font-bold text-center">Registration form</h2>
                  <h4 className="text-[16px] md:text-[18px] text-[#072F04] opacity-50 mt-2 text-center">
                    Sign up to participate in selection process
                  </h4>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-6 justify-center mt-[36px] w-full">
                    <div className="flex flex-col md:flex-row gap-4 items-center w-full">
                      <div className="flex flex-col gap-1 w-full">
                        <Label htmlFor="firstName">First Name*</Label>
                        <Input
                            id="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="John"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-full">
                        <Label htmlFor="lastName">Last Name*</Label>
                        <Input
                            id="lastName"
                            required
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Smith"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                      <Label htmlFor="email">Email*</Label>
                      <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="example@gmail.com"
                      />
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                      <Label htmlFor="organisation">Organisation/Institution*</Label>
                      <Input
                          id="organisation"
                          required
                          value={formData.organisation}
                          onChange={handleChange}
                          placeholder="Your organisation"
                      />
                    </div>

                    <div className="flex flex-row items-start md:items-center justify-start gap-2">
                      <Checkbox
                          id="checkbox"
                          onCheckedChange={handleCheckboxChange}
                          className="mt-1 md:mt-0"
                      />
                      <Label htmlFor="checkbox" className="cursor-pointer text-sm">
                        I consent to the use of my personal information for the selection process.*
                      </Label>
                    </div>

                    <Button className="w-full" type="submit" disabled={isLoading}>
                      {isLoading ? "Submitting..." : "Register"}
                    </Button>
                  </form>
                </>
            )}
          </div>
        </section>

        {/* Location Section */}
        <section className="flex justify-center items-center w-full px-4 md:px-[90px] py-10">
          <div className="w-full flex flex-col md:flex-row justify-center gap-4 h-full border-2 border-[#BFCDA8] rounded-[24px] md:rounded-[32px] p-4">
            <div className="w-full md:w-1/2 rounded-[16px] h-[250px] md:h-auto">
              <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2719.482320319112!2d28.82133307628489!3d47.03076567114286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97dc9f2eb1fad%3A0xe405bf6660e6533f!2sTechnical%20University%20of%20Moldova%2C%20Block%201%2C%20Stefan%20cel%20Mare%20si%20Sfant%20Boulevard%20168%2C%20MD-2004%2C%20Chi%C8%99in%C4%83u%2C%20Moldova!5e0!3m2!1sen!2s!4v1764193022732!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-[16px]"
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-3 md:gap-2">
              <p className="text-[20px] md:text-[24px] text-[#BFCDA8] font-medium">
                About location
              </p>
              <div className="flex flex-row gap-2 items-start w-full">
                <FaLocationDot className="fill-[#BFCDA8] mt-1 flex-shrink-0" />
                <p className="font-medium text-[16px] md:text-[18px] text-[#BFCDA8]">
                  CyberCor (inside UTM) <br />
                  168 Stefan cel Mare Boulevard
                </p>
              </div>

              <p className="text-[20px] md:text-[24px] text-[#BFCDA8] font-medium mt-2">
                Contact information
              </p>

              <div className="flex flex-row gap-2 items-center w-full">
                <IoMdMail className="fill-[#BFCDA8] flex-shrink-0" />
                <p className="font-medium text-[16px] md:text-[18px] text-[#BFCDA8] break-all">
                  example@gmail.com
                </p>
              </div>

              <div className="flex flex-row gap-2 items-center w-full">
                <FaPhone className="fill-[#BFCDA8] flex-shrink-0" />
                <p className="font-medium text-[16px] md:text-[18px] text-[#BFCDA8]">
                  +373 (69) 123456
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
}