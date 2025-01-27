'use client';

import { useState, useEffect } from 'react';
import Table from '../components/Table'; // Importuj komponentu Table
import '../styles/globals.css';

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  segment: string;
  successfullySent: boolean;
  createdAt: string;
}

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '123-456-7890', segment: 'A', successfullySent: true, createdAt: '2025-01-20T10:30:00Z' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '987-654-3210', segment: 'B', successfullySent: false, createdAt: '2025-01-15T08:45:00Z' },
    { id: 3, firstName: 'James', lastName: 'Brown', email: 'james.brown@example.com', phone: '555-123-4567', segment: 'C', successfullySent: true, createdAt: '2025-01-25T14:20:00Z' },
  ]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter funkcija za pretragu
  const filteredContacts = contacts.filter(contact => {
    const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  // Formatiranje vremena za sve kontakte
  useEffect(() => {
    const formatDates = () => {
      setContacts((prevContacts) =>
        prevContacts.map((contact) => ({
          ...contact,
          createdAt: new Date(contact.createdAt).toLocaleString(),
        }))
      );
    };

    formatDates();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Leads Management</h1>
      
      {/* Polje za pretragu */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Renderuj tabelu */}
      <Table contacts={filteredContacts} />
    </div>
  );
}
