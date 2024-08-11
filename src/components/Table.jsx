import React, { useState } from "react";
import './Table.css'

export default function Table() {
  const valueObject = [
    { id: 1, name: "Aditya", email: "chouhan@gmail.com" },
    { id: 2, name: "Nikunj", email: "sharma1@gmail.com" },
    { id: 3, name: "Khushal", email: "hanswal@gmail.com" },
    { id: 4, name: "Bhavyansh", email: "sharma2@gmail.com" },
  ];

  const [value, setValue] = useState(valueObject);

  return (
    <table>
        <tr key={"header"}>
            {Object.keys(value[0]).map((key) => (
                <th>{key}</th>
            ))}
        </tr>
        {value.map((item) => (
            <tr key={item.id}>
                {Object.values(item).map((val) => (
                    <td>{val}</td>
                ))}
            </tr>
        ))}
    </table>
  );
}
