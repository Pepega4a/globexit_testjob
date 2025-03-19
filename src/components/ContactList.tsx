"use client";

import { useState, useEffect } from "react";
import "@/app/globals.css";
import Modal from "./Modal";

interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
  address?: string;
  position_name?: string;
  department?: string;
  hire_date?: string;
}

const ContactList = () => {
  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      try {
        const url = search
          ? `http://localhost:3000?term=${encodeURIComponent(search)}`
          : "http://localhost:3000";
        const response = await fetch(url);
        const data: Contact[] = await response.json();
        setContacts(data);
      } catch (error) {
        console.error("Ошибка загрузки контактов:", error);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(fetchContacts, 300);
    return () => clearTimeout(delayDebounce);
  }, [search]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center font-proxima">
      <div className="w-full p-6 bg-white fixed top-0 left-0 flex justify-center z-10">
        <div className="relative w-[1120px]">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-[48px] border border-gray-300 rounded-[24px] pl-4 pr-12 text-gray-700 focus:outline-none"
          />
          <img src="search.svg" className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div className="w-full max-w-[1120px] mt-24 p-6">
        {loading ? (
          <p className="text-gray-500 text-center">Загрузка...</p>
        ) : contacts.length === 0 ? (
          <p className="text-gray-500 text-center">Нет совпадений</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {contacts.map((contact, index) => (
              <div
                key={contact.id || index}
                className="w-[357px] h-[314px] bg-white rounded-[16px] shadow-lg p-[24px] flex flex-col gap-[24px] transition-transform duration-200 ease-in-out transform hover:scale-105 cursor-pointer"
                onClick={() => setSelectedContact(contact)}
              >
                <h3 className="text-[24px] font-bold leading-[30px]">{contact.name}</h3>
                <p className="text-gray-600 flex items-center">
                  <img src="phone.svg" className="w-5 h-5 mr-2 text-indigo-500" /> {contact.phone}
                </p>
                <p className="text-gray-600 flex items-center">
                  <img src="mail.svg" className="w-5 h-5 mr-2 text-indigo-500" /> {contact.email}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedContact && (
        <Modal contact={selectedContact} onClose={() => setSelectedContact(null)} />
      )}
    </div>
  );
};

export default ContactList;
