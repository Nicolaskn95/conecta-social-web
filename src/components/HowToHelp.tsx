import { Typography } from "@mui/material";
import { BiSolidContact } from "react-icons/bi";
import { FaPeopleLine } from "react-icons/fa6";
import { MdVolunteerActivism } from "react-icons/md";

const HowToHelp = () => {
  const helpers = [
    {
      title: "Doar",
      description: "Ajude com doações",
      icon: <FaPeopleLine size={60} />,
    },
    {
      title: "Voluntário",
      description: "Seja um voluntário",
      icon: <MdVolunteerActivism size={60} />,
    },
    {
      title: "Parcerias",
      description: "Entre em contato para parcerias",
      icon: <BiSolidContact size={60} />,
    },
  ];

  return (
    <div className="text-center my-12">
      <Typography variant="h4" className="mb-8">
        Como Ajudar?
      </Typography>
      <div className="flex justify-around">
        {helpers.map((helper, index) => (
          <div key={index} className="max-w-xs">
            <div className="flex justify-center">{helper.icon}</div>
            <Typography variant="h6" className="mt-4">
              {helper.title}
            </Typography>
            <Typography variant="body2" className="text-gray-600">
              {helper.description}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowToHelp;
