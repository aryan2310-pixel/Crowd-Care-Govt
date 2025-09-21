import React, { useEffect, useState } from 'react';

function statusStyles(status) {
  switch (status) {
    case 'Open':
      return 'bg-gray-100 text-blue-600 border border-blue-300';
    case 'Pending':
      return 'bg-gray-100 text-yellow-700 border border-yellow-300';
    case 'Done':
      return 'bg-gray-100 text-green-700 border border-green-300';
    default:
      return 'bg-gray-200 text-gray-600';
  }
}

const Dashboard = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch issues data on mount
  useEffect(() => {
    fetch('http://localhost:4000/api/issues')
      .then((res) => res.json())
      .then((data) => {
        // Data may be object with .issues array or direct array
        setIssues(Array.isArray(data) ? data : data.issues || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch issues:', err);
        setLoading(false);
      });
  }, []);

  const handleStatusChange = (id, newStatus) => {
    // Optimistic UI update
    setIssues((prev) =>
      prev.map((issue) =>
        issue._id === id ? { ...issue, status: newStatus } : issue
      )
    );

    // Update backend status via PATCH
    fetch(`http://localhost:4000/api/issues/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    }).catch((err) => {
      console.error('Failed to update status:', err);
      // Optionally handle errors by reverting status or notifying user
    });
  };

  if (loading) {
    return <div className="p-6 max-w-5xl mx-auto">Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-1">Submitted Issues</h2>
      <p className="text-gray-500 mb-6">
        Track the progress of your reported issues and view detailed information.
      </p>

      <div className="overflow-x-auto bg-white rounded-md border">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="py-3 px-4 font-medium text-gray-600">Issue Title</th>
              <th className="py-3 px-4 font-medium text-gray-600">Submission Date</th>
              <th className="py-3 px-4 font-medium text-gray-600">Status</th>
              <th className="py-3 px-4 font-medium text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue._id} className="border-b last:border-none hover:bg-gray-50">
                <td className="py-3 px-4">{issue.title}</td>
                <td className="py-3 px-4 text-gray-500">{issue.date}</td>
                <td className="py-3 px-4">
                  <select
                    className={`rounded-md px-2 py-1 text-xs font-semibold ${statusStyles(issue.status)}`}
                    value={issue.status}
                    onChange={(e) => handleStatusChange(issue._id, e.target.value)}
                  >
                    <option value="Open">Open</option>
                    <option value="Pending">Pending</option>
                    <option value="Done">Done</option>
                  </select>
                </td>
                <td className="py-3 px-4">
                  <button className="text-blue-600 text-sm hover:underline">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
