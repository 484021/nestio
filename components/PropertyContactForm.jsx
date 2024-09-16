"use client";
import React from "react";
import { FaPaperPlane } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function PropertyContactForm({ property }) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [message, setMessage] = useState();
  const [submitted, setSubmitted] = useState(false);

  const { data: session } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      email,
      phone,
      message,
      recipient: property.owner,
      property: property,
    };
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.status === 200) {
        toast.success("Message sent successfully");
        // setSubmitted(true);
      } else if (res.status === 400 || res.status === 401) {
        const dataObj = await res.json();
        toast.error(dataObj.message);
      } else {
        toast.error("Error sending form");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error sending form");
    } finally {
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
      {!session ? (
        <p className="mb-4">Please login to contact the property manager.</p>
      ) : submitted ? (
        <div className="mb-4">
          <p className="text-green-500">Message sent successfully!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your name"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="text"
              placeholder="Enter your phone number"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="message"
            >
              Message:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
              id="message"
              placeholder="Enter your message"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            ></textarea>
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
              type="submit"
            >
              <FaPaperPlane className="mr-2" />
              Send Message
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
