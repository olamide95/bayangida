'use client';

import { useState, useEffect, useMemo } from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, deleteDoc, setDoc, updateDoc } from 'firebase/firestore';
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
  const [showBulkAddDialog, setShowBulkAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [emailData, setEmailData] = useState({
    subject: '',
    content: '',
    recipient: null,
  });
  const [bulkAddData, setBulkAddData] = useState('');
  const [currentEditUser, setCurrentEditUser] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    role: '',
  });
  const [isSending, setIsSending] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest' or 'oldest'

  // Fetch data from Firestore
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, 'waitlist'));
    const waitlistData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setData(waitlistData);
  };

  // Delete a document from Firestore
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'waitlist', id));
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  // Open edit dialog
  const openEditDialog = (user) => {
    setCurrentEditUser(user);
    setEditFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      location: user.location || '',
      role: user.role || '',
    });
    setShowEditDialog(true);
  };

  // Handle edit form changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Update user details
  const updateUser = async () => {
    if (!editFormData.name || !editFormData.email || !editFormData.role) {
      alert('Name, Email, and Role are required');
      return;
    }

    setIsUpdating(true);
    try {
      await updateDoc(doc(db, 'waitlist', currentEditUser.id), editFormData);
      await fetchData(); // Refresh data
      setShowEditDialog(false);
    } catch (error) {
      console.error('Error updating document: ', error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Bulk add users
  const handleBulkAdd = async () => {
    if (!bulkAddData.trim()) {
      alert('Please enter user data');
      return;
    }

    setIsAdding(true);
    try {
      const lines = bulkAddData.trim().split('\n');
      const existingEmails = new Set(data.map(user => user.email.toLowerCase()));
      const usersToAdd = [];
      const duplicateEmails = [];

      // Parse each line
      for (const line of lines) {
        const parts = line.split(',').map(part => part.trim());
        if (parts.length < 3) continue; // Skip invalid lines (need at least name, email, role)

        const [name, email, role, phone = '', location = ''] = parts;
        const emailLower = email.toLowerCase();

        if (existingEmails.has(emailLower)) {
          duplicateEmails.push(email);
          continue;
        }

        usersToAdd.push({
          name,
          email,
          phone,
          location,
          role,
          createdAt: new Date().toISOString()
        });
        existingEmails.add(emailLower);
      }

      // Add users to Firestore
      for (const user of usersToAdd) {
        const docRef = doc(collection(db, 'waitlist'));
        await setDoc(docRef, user);
      }

      if (duplicateEmails.length > 0) {
        alert(`Added ${usersToAdd.length} users. Skipped ${duplicateEmails.length} duplicates: ${duplicateEmails.join(', ')}`);
      } else {
        alert(`Successfully added ${usersToAdd.length} users`);
      }

      await fetchData(); // Refresh data
      setBulkAddData('');
      setShowBulkAddDialog(false);
    } catch (error) {
      console.error('Error adding users: ', error);
      alert('Failed to add users');
    } finally {
      setIsAdding(false);
    }
  };

  // Email functions
  const openEmailDialog = (recipient) => {
    setEmailData({
      subject: '',
      content: '',
      recipient: recipient,
    });
    setShowEmailDialog(true);
  };

  const closeEmailDialog = () => {
    setShowEmailDialog(false);
  };

  const handleEmailInputChange = (e) => {
    const { name, value } = e.target;
    setEmailData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendEmail = async () => {
    if (!emailData.subject || !emailData.content) {
      alert('Please fill in both subject and content');
      return;
    }

    setIsSending(true);

    try {
      let recipients = [];
      
      if (emailData.recipient) {
        recipients = [emailData.recipient];
      } else {
        recipients = roleFilter ? 
          data.filter(item => item.role === roleFilter) : 
          data;
      }

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

  // Filter and sort data
  const filteredData = useMemo(() => {
    let result = [...data];
    
    // Apply role filter
    if (roleFilter) {
      result = result.filter((item) => item.role === roleFilter);
    }
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter((item) => 
        item.name?.toLowerCase().includes(term) ||
        item.email?.toLowerCase().includes(term) ||
        item.phone?.toLowerCase().includes(term) ||
        item.location?.toLowerCase().includes(term) ||
        item.role?.toLowerCase().includes(term)
      );
    }
    
    // Apply sorting
    result.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0);
      const dateB = new Date(b.createdAt || 0);
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
    
    return result;
  }, [data, roleFilter, searchTerm, sortOrder]);

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
      accessorKey: 'createdAt',
      header: 'Sign-up Date',
      cell: ({ row }) => {
        const date = row.original.createdAt ? new Date(row.original.createdAt) : null;
        return date ? date.toLocaleDateString() + ' ' + date.toLocaleTimeString() : 'N/A';
      },
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
            onClick={() => openEditDialog(row.original)}
            className={styles.editButton}
          >
            Edit
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

      {/* Control Buttons */}
      <div className={styles.controlButtons}>
        <button
          onClick={() => setShowBulkAddDialog(true)}
          className={styles.bulkAddButton}
        >
          Bulk Add Users
        </button>
      </div>

      {/* Filters and Search */}
      <div className={styles.filterContainer}>
        {/* Search Input */}
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        {/* Role Filter */}
        <div className={styles.filterGroup}>
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
        </div>

        {/* Sort Order */}
        <div className={styles.filterGroup}>
          <label htmlFor="sortOrder">Sort by Date:</label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
        
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
      <div className={styles.tableContainer}>
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
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className={styles.tr}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={styles.td}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className={styles.noData}>
                  No users found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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

      {/* Bulk Add Dialog */}
      {showBulkAddDialog && (
        <div className={styles.dialogOverlay}>
          <div className={styles.dialog}>
            <h2>Bulk Add Users</h2>
            <p>
              Enter user data in CSV format (one user per line):<br />
              <strong>Format:</strong> Name, Email, Role, [Phone], [Location]<br />
              <strong>Example:</strong> John Doe, john@example.com, consumer, 1234567890, Lagos
            </p>
            
            <div className={styles.dialogInputGroup}>
              <textarea
                value={bulkAddData}
                onChange={(e) => setBulkAddData(e.target.value)}
                className={styles.dialogTextarea}
                rows={10}
                placeholder={`John Doe, john@example.com, consumer, 1234567890, Lagos\nJane Smith, jane@example.com, farmer, 0987654321, Abuja\n...`}
              />
            </div>
            
            <div className={styles.dialogButtons}>
              <button 
                onClick={() => setShowBulkAddDialog(false)}
                className={styles.dialogCancel}
                disabled={isAdding}
              >
                Cancel
              </button>
              <button
                onClick={handleBulkAdd}
                className={styles.dialogSend}
                disabled={isAdding}
              >
                {isAdding ? 'Adding...' : 'Add Users'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Dialog */}
      {showEditDialog && currentEditUser && (
        <div className={styles.dialogOverlay}>
          <div className={styles.dialog}>
            <h2>Edit User: {currentEditUser.name}</h2>
            
            <div className={styles.dialogInputGroup}>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={editFormData.name}
                onChange={handleEditChange}
                className={styles.dialogInput}
              />
            </div>
            
            <div className={styles.dialogInputGroup}>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={editFormData.email}
                onChange={handleEditChange}
                className={styles.dialogInput}
                disabled
              />
            </div>
            
            <div className={styles.dialogInputGroup}>
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={editFormData.phone}
                onChange={handleEditChange}
                className={styles.dialogInput}
              />
            </div>
            
            <div className={styles.dialogInputGroup}>
              <label>Location:</label>
              <input
                type="text"
                name="location"
                value={editFormData.location}
                onChange={handleEditChange}
                className={styles.dialogInput}
              />
            </div>
            
            <div className={styles.dialogInputGroup}>
              <label>Role:</label>
              <select
                name="role"
                value={editFormData.role}
                onChange={handleEditChange}
                className={styles.dialogInput}
              >
                <option value="">Select Role</option>
                <option value="consumer">Consumer</option>
                <option value="logistics">Logistics Personnel</option>
                <option value="farmer">Farmer</option>
              </select>
            </div>
            
            <div className={styles.dialogButtons}>
              <button 
                onClick={() => setShowEditDialog(false)}
                className={styles.dialogCancel}
                disabled={isUpdating}
              >
                Cancel
              </button>
              <button
                onClick={updateUser}
                className={styles.dialogSend}
                disabled={isUpdating}
              >
                {isUpdating ? 'Updating...' : 'Update User'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;