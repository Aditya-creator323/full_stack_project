import React, { useEffect, useState } from "react";

export default function InputFields() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
  });

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const defaultTableData = {
      id: "1",
      name: "Aditya",
      email: "googleemail@gmail.com",
    };
    setTableData([defaultTableData]);
    fetch("http://localhost:8080/employee")
      .then((response) => response.json())
      .then((data) => setTableData(data))
      .catch((error) => console.error("Error fetching data : ", error));

    console.log("useeffect is called");
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAdd = (event) => {
    event.preventDefault();
    const queryParams = new URLSearchParams({
      name: formData.name,
      email: formData.email,
    });

    fetch(`http://localhost:8080/addEmployee?${queryParams.toString()}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setTableData([...tableData, data]);
        setFormData({ id: "", name: "", email: "" });
      })
      .catch((error) => console.error("Error adding employee : ", error));
  };

  const handleClear = () => {
    setFormData({ id: "", name: "", email: "" });
  };

  const handleDelete = (event) => {
    event.preventDefault();
    const idToDelete = formData.id;
    if (idToDelete) {
      fetch(`http://localhost:8080/removeEmployee/${idToDelete}`, {
        method: "DELETE",
      })
        .then((reponse) => reponse.text())
        .then((message) => {

          const updatedTableData = tableData.filter(
           function (item) { 
            return item.id.toString() !== idToDelete}
          );
          console.log("UpdatedTableData : ",updatedTableData);
          setTableData(updatedTableData);

          setFormData({ ...formData, id: "" });
          console.log(message);
        })
        .catch(error => console.error('Error Deleting employee: ', error));
    }
    else{
      alert('Please enter an ID to delete.');
    }
  };

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
          />
        </div>
        <div className="buttons">
          <button onClick={handleAdd}>Add</button>
          <button onClick={handleClear}>Clear</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </form>

      <h2>Employee Details</h2>
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
