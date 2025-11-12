import { useState, useEffect } from "react";
import { Play } from "lucide-react";
import { LOGO_VMUSIC } from "../constants/imagenes";
import { featuresAbout } from "../context/LandingCards.jsx";
import { stats } from "../constants/nosotros.js";
import TeamSection from "../components/common/TeamSection.jsx";

const logo = LOGO_VMUSIC[0];
const PARRAFO_UNO =
  "En Sound-Music, creemos que la música es el lenguaje universal que une a las personas. Nuestra misión es democratizar el acceso a la música y crear una plataforma donde cada usuario pueda descubrir, compartir y disfrutar de experiencias musicales únicas.";

function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        <div
          className={`relative z-10 max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 ">
              <img src={logo.src} alt={logo.alt} width={150} />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Sobre Sound-Music
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            La plataforma musical que conecta a los amantes de la música con sus canciones
            favoritas, artistas emergentes y experiencias sonoras únicas.
          </p>
        </div>
      </section>
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Nuestra Misión
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {PARRAFO_UNO}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Trabajamos incansablemente para ofrecer la mejor experiencia musical, conectando
                artistas con sus audiencias y ayudando a los usuarios a descubrir su próxima canción
                favorita.
              </p>
            </div>
            <div className="relative">
              <div className="bg-linear-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white">
                <Play className="w-16 h-16 mb-6" />
                <h3 className="text-2xl font-bold mb-4">Experiencia Musical Única</h3>
                <p className="text-pink-100">
                  Desde previews de alta calidad hasta recomendaciones personalizadas, cada detalle
                  está diseñado para enriquecer tu experiencia musical.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 px-4 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              ¿Por qué elegir Sound-Music?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Descubre las características que nos hacen únicos
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuresAbout.map((feature, index) => {
              // 1. Asigna la función del icono a una variable con mayúscula.
              // React trata las variables con mayúscula inicial como Componentes.
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-gray-700"
                >
                  <div className="text-pink-600 dark:text-pink-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12">
            Sound-Music en Números
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="group">
                <div className="bg-linear-to-r from-pink-500 to-purple-600 rounded-2xl p-6 text-white group-hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-pink-100 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <TeamSection />
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            ¿Tienes alguna pregunta?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Estamos aquí para ayudarte. Contáctanos y te responderemos lo antes posible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/543813540041 "
              target="_blank"
              className="bg-linear-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Contactar Soporte
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
