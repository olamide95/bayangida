'use client'; // Mark the component as a Client Component

import { useState, useEffect, useMemo } from 'react'; // Add useMemo
import { db } from '../firebase'; // Import Firebase
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'; // Add deleteDoc
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import styles from '../styles/Dashboard.module.css'; // Import styles

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [roleFilter, setRoleFilter] = useState(''); // State for role filter

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
      setData(data.filter((item) => item.id !== id)); // Remove the deleted item from state
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  // Filter data based on role (using useMemo for optimization)
  const filteredData = useMemo(() => {
    if (!roleFilter) return data; // If no filter, return all data
    return data.filter((item) => item.role === roleFilter);
  }, [data, roleFilter]);

  // Define columns
  const columns = [
    {
      accessorKey: 'id',
      header: '#',
      cell: ({ row }) => row.index + 1, // Add row numbering
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
        <button
          onClick={() => handleDelete(row.original.id)} // Delete button
          className={styles.deleteButton}
        >
          Delete
        </button>
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
    </div>
  );
};

export default Dashboard;