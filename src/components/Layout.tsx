import { Link } from "react-router-dom";
import "./Layout.css";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="header">
        <div className="logo">Student Manager</div>
        <nav>
          <Link to="/">Danh sách</Link>
          <Link to="/add">Thêm sinh viên</Link>
        </nav>
      </header>

      <main className="main-content">
        {children}
      </main>
    </>
  );
};

export default Layout;