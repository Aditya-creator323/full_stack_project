import React, { useState } from "react";

export default function InputFields() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
  });

  const [tableData, setTableData] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAdd = () => {
    setTableData([...tableData, formData]);

    setFormData({ id: "", name: "", email: "" });
  };

  const handleClear = () => {
    setFormData({ id: "", name: "", email: "" });
  }

  const handleDelete = () => {
    const idToDelete = formData.id;
    if (idToDelete) {
        const updatedTableData = tableData.filter(item => item.id !== idToDelete);
        setTableData(updatedTableData);

        setFormData({ ...formData, id: "" });
    }
    else {
        alert('Please enter an Id to Delete');
    }
  }

  return (
    <div>
      <form>
        <div>
          <label>Id : </label>
          <input
            type="text"
            name="id"
            value={formData.id}
            placeholder="Enter the id"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Name : </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Enter the Name"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email : </label>
          <input
            type="text"
            name="email"
            value={formData.email}
            placeholder="Enter the Email"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button onClick={handleAdd}>Add</button>
          <button onClick={handleClear}>Clear</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </form>

      <h2>Table for Entries</h2>
      <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
            </tr>
        </thead>
        <tbody>
            {tableData.map((item, index) => (
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
