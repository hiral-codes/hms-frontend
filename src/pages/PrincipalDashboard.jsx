import React from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
function PrincipalDashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setLoading(false);
    }
  }, [user, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return <div>Welcome, {user.name}</div>;
}

export default PrincipalDashboard;
