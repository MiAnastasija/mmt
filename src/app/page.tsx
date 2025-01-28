'use client';

import { useState, useEffect } from 'react';
import Table from '../components/Table';
import SearchInput from '../components/SearchInput'; 
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
  const [currentBanner, setCurrentBanner] = useState(1); // State za trenutno prikazivanje banera

  // Filter funkcija za pretragu po imenu, prezimenu i emailu
  const filteredContacts = contacts.filter(contact => {
    const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
    const email = contact.email.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase()) || email.includes(searchQuery.toLowerCase());
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

  // Postavljanje promene banera nakon 5 sekundi
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentBanner(2); // Prebaci na drugi baner
    }, 5000); // 5 sekundi

    return () => clearTimeout(timer); // Čisti timer ako se komponenta ukloni
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Leads Management</h1>

      {/* Prikazivanje banera */}
      <div className="banner">
        {currentBanner === 1 ? (
          <div className="banner-content">Contacts</div>
        ) : (
          <div className="banner-content">Search</div>
        )}
      </div>

      {/* Komponenta za pretragu */}
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Renderuj tabelu */}
      <Table contacts={filteredContacts} />
    </div>
  );
}
