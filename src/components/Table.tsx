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
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <table className="min-w-full table-auto border-collapse border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-700">First Name</th>
            <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-700">Last Name</th>
            <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-700">Email</th>
            <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-700">Phone</th>
            <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-700">Segment</th>
            <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-700">Created At</th>
            <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-700">Successfully Sent</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr key={contact.id} className="hover:bg-gray-100 even:bg-gray-50 odd:bg-white">
              <td className="px-6 py-3 border-b border-gray-300 text-sm text-gray-900">{contact.firstName}</td>
              <td className="px-6 py-3 border-b border-gray-300 text-sm text-gray-900">{contact.lastName}</td>
              <td className="px-6 py-3 border-b border-gray-300 text-sm text-gray-900">{contact.email}</td>
              <td className="px-6 py-3 border-b border-gray-300 text-sm text-gray-900">{contact.phone}</td>
              <td className="px-6 py-3 border-b border-gray-300 text-sm text-gray-900">{contact.segment}</td>
              <td className="px-6 py-3 border-b border-gray-300 text-sm text-gray-900">{contact.createdAt}</td>
              <td className="px-6 py-3 border-b border-gray-300 text-sm text-gray-900">{contact.successfullySent ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
