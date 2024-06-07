import { useState } from "react";
import DashMenu from "../../components/admin/DashMenu";
import Header from "../../components/admin/Header";

export const Dashboard: React.FC = () => {
  const [isMenu, setMenu] = useState(false);

  const handleMenuShow = () => {
    setMenu(!isMenu);
  };

  return (
    <div className="relative dashBoard h-screen">
      <Header title={"Dashboard"} />
      <DashMenu isMenu={isMenu} handleMenuShow={handleMenuShow} />
      <div className="min-h-[300px]  flex justify-center py-10 lg:py-20">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          <DashboardCard title="Weekly enrollments" value="2500+" />
          <DashboardCard title="Revenue" value="200,000+" />
          <DashboardCard title="Courses uploaded" value="56" />
        </div>
        <div></div>
      </div>
    </div>
  );
};

interface DashboardCardProps {
  title: string;
  value: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value }) => {
  return (
    <div className="bg-gradient-to-br from-purple-950 to-purple-700 rounded-lg shadow-md p-12 text-white ">
      <div className="text-center">
        <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl">{title}</h1>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-thin mt-2">{value}</h1>
      </div>
    </div>
  );
};
