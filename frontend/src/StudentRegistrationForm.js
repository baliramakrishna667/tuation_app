import { useState } from "react";

function StudentRegistrationForm() {
  const [form, setForm] = useState({
    name: "",
    parentName: "",
    phoneNumber: "",
    location: "",
    studentClass: 1,
    courseType: "DAILY",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8080/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) alert("Student registered!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Student Name" onChange={handleChange} />
      <input name="parentName" placeholder="Parent Name" onChange={handleChange} />
      <input name="phoneNumber" placeholder="Phone Number" onChange={handleChange} />
      <input name="location" placeholder="Location" onChange={handleChange} />
      <select name="courseType" onChange={handleChange}>
        <option value="DAILY">Daily</option>
        <option value="SUMMER">Summer</option>
      </select>
      <input
        type="number"
        name="studentClass"
        min="1"
        max="10"
        onChange={handleChange}
      />
      <button type="submit">Register</button>
    </form>
  );
}

export default StudentRegistrationForm;
