import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: "",
    age: "",
    className: "",
    email: "",
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    await fetch("http://localhost:3000/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    });

    navigate("/");
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Thêm Sinh Viên</h2>

        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-group">
            <label>Họ tên</label>
            <input
              type="text"
              name="name"
              value={student.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Tuổi</label>
            <input
              type="number"
              name="age"
              value={student.age}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label>Lớp</label>
            <input
              type="text"
              name="className"
              value={student.className}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={student.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Thêm sinh viên
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;