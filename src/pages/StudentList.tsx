import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Student } from "../types/Student";
import "./StudentList.css";

const StudentList = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    // Lấy danh sách sinh viên
    const fetchStudents = async () => {
        try {
            const res = await fetch("http://localhost:3000/students");
            if (!res.ok) throw new Error("Lỗi khi lấy dữ liệu");
            const data: Student[] = await res.json();
            setStudents(data);
        } catch (err) {
            setError("Không thể tải danh sách sinh viên");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    // Xóa sinh viên
    const handleDelete = async (id?: string) => {
        if (!id) return;

        const confirmDelete = window.confirm(
            "Bạn có chắc muốn xóa sinh viên này?"
        );

        if (!confirmDelete) return;

        try {
            await fetch(`http://localhost:3000/students/${id}`, {
                method: "DELETE"
            });

            // Cập nhật lại state sau khi xóa
            setStudents(prev =>
                prev.filter(student => student.id !== id)
            );
        } catch (err) {
            alert("Xóa thất bại!");
        }
    };

    if (loading) return <p>Đang tải dữ liệu...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container">
            <h2>Danh Sách Sinh Viên</h2>

            <Link to="/add">
                <button className="add-btn">Thêm Sinh Viên</button>
            </Link>

            <table border={1} cellPadding={8} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>Họ Tên</th>
                        <th>Tuổi</th>
                        <th>Lớp</th>
                        <th>Email</th>
                        <th>Chức năng</th>
                    </tr>
                </thead>

                <tbody>
                    {students.length === 0 ? (
                        <tr>
                            <td colSpan={6}>Không có dữ liệu</td>
                        </tr>
                    ) : (
                        students.map(student => (
                            <tr key={student.id}>
                                <td>{student.name}</td>
                                <td>{student.age}</td>
                                <td>{student.className}</td>
                                <td>{student.email}</td>
                                <td>
                                    <div className="action-buttons">
                                        <Link to={`/edit/${student.id}`}>
                                            <button className="edit-btn">Sửa</button>
                                        </Link>

                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDelete(student.id)}
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default StudentList;