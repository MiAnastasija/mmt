'use client';
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

interface TableProps {
  contacts: Contact[];
}

const Table: React.FC<TableProps> = ({ contacts }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border border-gray-300">First Name</th>
            <th className="px-4 py-2 border border-gray-300">Last Name</th>
            <th className="px-4 py-2 border border-gray-300">Email</th>
            <th className="px-4 py-2 border border-gray-300">Phone</th>
            <th className="px-4 py-2 border border-gray-300">Segment</th>
            <th className="px-4 py-2 border border-gray-300">Successfully Sent</th>
            <th className="px-4 py-2 border border-gray-300">Created At</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr key={contact.id} className="even:bg-gray-50 hover:bg-gray-100">
              <td className="px-4 py-2 border border-gray-300">{contact.firstName}</td>
              <td className="px-4 py-2 border border-gray-300">{contact.lastName}</td>
              <td className="px-4 py-2 border border-gray-300">{contact.email}</td>
              <td className="px-4 py-2 border border-gray-300">{contact.phone}</td>
              <td className="px-4 py-2 border border-gray-300">{contact.segment}</td>
              <td className="px-4 py-2 border border-gray-300">{contact.successfullySent ? 'Yes' : 'No'}</td>
              <td className="px-4 py-2 border border-gray-300">{contact.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
