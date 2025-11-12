import { Github, Linkedin } from "lucide-react";

const TeamMemberCard = ({ name, role, description, image, git, linkedin }) => (
  <div className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-gray-700">
    <div className="relative mb-6">
      <img
        src={image}
        alt={name}
        className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-linear-to-r group-hover:scale-110 transition-transform duration-300"
      />
      <div className="absolute inset-0 rounded-full bg-linear-to-r group-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>
    </div>

    <div className="text-center">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{name}</h3>
      <p className="text-pink-600 dark:text-pink-400 font-semibold mb-2">{role}</p>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{description}</p>

      <div className="flex justify-center gap-3">
        <a
          href={git}
          className="w-10 h-10 bg-gray-900 hover:bg-gray-800 text-white rounded-full flex items-center justify-center transition-colors duration-300"
          title="GitHub"
        >
          <Github />
        </a>
        <a
          href={linkedin}
          className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors duration-300"
          title="LinkedIn"
        >
          <Linkedin />
        </a>
      </div>
    </div>
  </div>
);

export default TeamMemberCard;
