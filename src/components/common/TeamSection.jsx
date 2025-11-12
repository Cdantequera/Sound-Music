import TeamMemberCard from "./TeamMemberCard";

const teamMembers = [
  {
    name: "Fernando",
    role: "Scrum Master & Developer",
    description:
      "Acompaña al equipo con pasión y liderazgo, creando experiencias visuales  que conectan con cada usuario.",
    image: "/nosotros/fernando.jpg",
    git: "https://github.com/Fernando-urb",
    linkedin: "",
  },
  {
    name: "Daniel",
    role: "Developer",
    description:
      "Diseña interfaces claras y funcionales, pensando siempre en que cada interacción sea intuitiva y agradable.",
    image: "/nosotros/daniel.jpg",
    git: "https://github.com/Cdantequera",
    linkedin: "",
  },
  {
    name: "Santiago",
    role: "Developer",
    description:
      "Optimiza cada detalle para que la experiencia del usuario fluya con rendimiento y calidad, sin perder el ritmo.",
    image: "/nosotros/santiago.jpg",
    git: "https://github.com/SantiagoPaolantonio",
    linkedin: "",
  },
];

const TeamSection = () => (
  <section className="py-16 px-4 bg-white/50 dark:bg-gray-800/50">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Nuestro Equipo
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Un equipo apasionado por la tecnología, trabajando para crear la mejor experiencia UI y
          las mejores funcionalidades
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {teamMembers.map((member) => (
          <TeamMemberCard key={member.name} {...member} />
        ))}
      </div>
    </div>
  </section>
);

export default TeamSection;
