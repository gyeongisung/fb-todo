import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Header = ({
  fbName,
  fbEmail,
  fbUid,
  // setFBName,
  // setFBEmail,
  // setFBUid,
}) => {
  // AuthContext 로그아웃 실행으로 상태 변경
  const { logout } = useLogout();
  const { user } = useAuthContext();

  // const navigator = useNavigate();
  // fb 로그아웃
  const handleLogout = () => {
    logout();

    // firebase.auth().signOut();
    // console.log("로그아웃");
    // setFBName("");
    // setFBEmail("");
    // setFBUid("");
    // navigator("/");
  };
  return (
    <header className="p-7 bg-black">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-cyan-300 hover:text-orange-600">
          Logo
        </Link>
        <ul className="flex items-center justify-center gap-4">
          <li>
            <Link to="/home" className="text-cyan-300 hover:text-orange-600">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-cyan-300 hover:text-orange-600">
              About
            </Link>
          </li>
          <li>
            <Link
              to={fbUid ? "/todo" : "/login"}
              className="text-cyan-300 hover:text-orange-600"
            >
              Todo
            </Link>
          </li>
          <li>
            <Link
              to="/schedule"
              className="text-cyan-300 hover:text-orange-600"
            >
              Schedule
            </Link>
          </li>
          <li>
            <Link to="/upload" className="text-cyan-300 hover:text-orange-600">
              Upload
            </Link>
          </li>
          <li>
            <Link to="/chart" className="text-cyan-300 hover:text-orange-600">
              Chart
            </Link>
          </li>
        </ul>
        <div className="flex justify-center gap-5">
          <button
            className="text-cyan-300 hover:text-orange-600"
            onClick={handleLogout}
          >
            로그아웃
          </button>
          {user ? (
            <div className="text-white">
              {fbName} {fbEmail} {fbUid}
              <button onClick={handleLogout}>로그아웃</button>
              <Link to="/mypage">마이페이지</Link>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-cyan-300 hover:text-orange-600">
                로그인
              </Link>
              <Link
                to="/signup"
                className="text-cyan-300 hover:text-orange-600"
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
