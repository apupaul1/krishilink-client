import { Leaf } from "lucide-react";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <Leaf className="text-green-600" size={28} />
      <h2 className="text-2xl font-bold text-green-700">
        Krishi<span className="text-gray-800">Link</span>
      </h2>
    </Link>
  );
};

export default Logo;