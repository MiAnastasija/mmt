'use client';

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
      <table className="min-w-full table-auto border-collapse border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-700">First Name</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-700">Last Name</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-700">Email</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-700">Phone</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-700">Segment</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-700">Created At</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-700">Successfully Sent</th> {/* Poslednja kolona */}
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr key={contact.id} className="hover:bg-gray-200 even:bg-white odd:bg-white">
              <td className="px-4 py-2 border-b border-gray-300 text-black">{contact.firstName}</td>
              <td className="px-4 py-2 border-b border-gray-300 text-black">{contact.lastName}</td>
              <td className="px-4 py-2 border-b border-gray-300 text-black">{contact.email}</td>
              <td className="px-4 py-2 border-b border-gray-300 text-black">{contact.phone}</td>
              <td className="px-4 py-2 border-b border-gray-300 text-black">{contact.segment}</td>
              <td className="px-4 py-2 border-b border-gray-300 text-black">{contact.createdAt}</td>
              <td className="px-4 py-2 border-b border-gray-300 text-black">{contact.successfullySent ? 'Yes' : 'No'}</td> {/* Poslednji podaci */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
