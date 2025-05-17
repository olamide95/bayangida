'use client';

import { useState, useEffect, useMemo } from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import styles from '../styles/Dashboard.module.css';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [roleFilter, setRoleFilter] = useState('');
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [emailData, setEmailData] = useState({
    subject: '',
    content: '',
    recipient: null, // null for group email, object for individual
  });
  const [isSending, setIsSending] = useState(false);

  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'waitlist'));
      const waitlistData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(waitlistData);
    };

    fetchData();
  }, []);

  // Delete a document from Firestore
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'waitlist', id));
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  // Open email dialog for individual or group email
  const openEmailDialog = (recipient) => {
    setEmailData({
      subject: '',
      content: '',
      recipient: recipient, // null for group, user object for individual
    });
    setShowEmailDialog(true);
  };

  // Close email dialog
  const closeEmailDialog = () => {
    setShowEmailDialog(false);
  };

  // Handle email input changes
  const handleEmailInputChange = (e) => {
    const { name, value } = e.target;
    setEmailData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Send email function
  const sendEmail = async () => {
    if (!emailData.subject || !emailData.content) {
      alert('Please fill in both subject and content');
      return;
    }

    setIsSending(true);

    try {
      let recipients = [];
      
      // Determine recipients
      if (emailData.recipient) {
        // Individual email
        recipients = [emailData.recipient];
      } else {
        // Group email based on filter
        recipients = roleFilter ? 
          data.filter(item => item.role === roleFilter) : 
          data;
      }

      // Send to each recipient
      for (const recipient of recipients) {
        await sendSingleEmail(recipient.email, recipient.name, emailData.subject, emailData.content);
      }

      alert(`Email(s) sent successfully to ${recipients.length} recipient(s)`);
      closeEmailDialog();
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email(s)');
    } finally {
      setIsSending(false);
    }
  };

  // Function to send single email
  const sendSingleEmail = async (email, name, subject, content) => {
    const response = await fetch('/api/sendcustomemail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        name,
        subject,
        content,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    return response.json();
  };

  // Filter data based on role
  const filteredData = useMemo(() => {
    if (!roleFilter) return data;
    return data.filter((item) => item.role === roleFilter);
  }, [data, roleFilter]);

  // Define columns
  const columns = [
    {
      accessorKey: 'id',
      header: '#',
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
    },
    {
      accessorKey: 'location',
      header: 'Location',
    },
    {
      accessorKey: 'role',
      header: 'Role',
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className={styles.actionButtons}>
          <button
            onClick={() => openEmailDialog(row.original)}
            className={styles.sendButton}
          >
            Send
          </button>
          <button
            onClick={() => handleDelete(row.original.id)}
            className={styles.deleteButton}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  // Create table instance
  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.dashboardTitle}>Waitlist Dashboard</h1>

      {/* Role Filter Dropdown */}
      <div className={styles.filterContainer}>
        <label htmlFor="roleFilter">Filter by Role:</label>
        <select
          id="roleFilter"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">All Roles</option>
          <option value="consumer">Consumer</option>
          <option value="logistics">Logistics Personnel</option>
          <option value="farmer">Farmer</option>
        </select>
        
        {/* Group Send Button */}
        <button
          onClick={() => openEmailDialog(null)}
          className={styles.groupSendButton}
          disabled={filteredData.length === 0}
        >
          Send to All {roleFilter ? roleFilter + 's' : 'Users'}
        </button>
      </div>

      {/* Table */}
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className={styles.th}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={styles.tr}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={styles.td}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Email Dialog */}
      {showEmailDialog && (
        <div className={styles.dialogOverlay}>
          <div className={styles.dialog}>
            <h2>
              {emailData.recipient ? 
                `Send Email to ${emailData.recipient.name}` : 
                `Send Email to All ${roleFilter ? roleFilter + 's' : 'Users'} (${filteredData.length})`
              }
            </h2>
            
            <div className={styles.dialogInputGroup}>
              <label>Subject:</label>
              <input
                type="text"
                name="subject"
                value={emailData.subject}
                onChange={handleEmailInputChange}
                className={styles.dialogInput}
              />
            </div>
            
            <div className={styles.dialogInputGroup}>
              <label>Content:</label>
              <textarea
                name="content"
                value={emailData.content}
                onChange={handleEmailInputChange}
                className={styles.dialogTextarea}
                rows={8}
              />
            </div>
            
            <div className={styles.dialogButtons}>
              <button 
                onClick={closeEmailDialog}
                className={styles.dialogCancel}
                disabled={isSending}
              >
                Cancel
              </button>
              <button
                onClick={sendEmail}
                className={styles.dialogSend}
                disabled={isSending}
              >
                {isSending ? 'Sending...' : 'Send Email'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;