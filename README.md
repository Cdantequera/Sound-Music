# 🎵 V-Sound Music

<div align="center">

![Rolling Music Logo](https://img.shields.io/badge/Rolling-Music-purple?style=for-the-badge&logo=music&logoColor=white)

### Plataforma de Gestión Musical

**Una aplicación web moderna para la gestión y reproducción de música**

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)


[Demo en Vivo](#) • [Reportar Bug](https://github.com/Fernando-urb/Rolling-Music-Equipo-4/issues) • [Solicitar Feature](https://github.com/Fernando-urb/Rolling-Music-Equipo-4/issues)

</div>



## 🎯 Sobre el Proyecto

** V-Sound Music** es una plataforma web desarrollada para gestionar y disfrutar de música de manera intuitiva y moderna. El proyecto combina una interfaz elegante con funcionalidades robustas para ofrecer una experiencia completa de usuario.

### ¿Por qué  V-Sound Music?

- 🎨 **Diseño Moderno**: Interfaz intuitiva y responsive
- ⚡ **Rendimiento Óptimo**: Carga rápida y experiencia fluida
- 🔒 **Seguridad**: Autenticación y autorización implementadas
- 📱 **Multiplataforma**: Funciona en desktop, tablet y móvil

---

## ✨ Características

### Para Usuarios
- 🎵 Explorar catálogo de música
- 🔍 Búsqueda avanzada de canciones, artistas y álbumes
- ⭐ Sistema de favoritos
- 📝 Creación de playlists personalizadas
- 👤 Gestión de perfil de usuario

### Para Administradores
- 📊 Panel de administración completo
- 🎼 CRUD de canciones y álbumes
- 👥 Gestión de usuarios
- 📈 Estadísticas y analíticas

---

## 🛠️ Tecnologías

### Frontend
```
React.js 18.x
React Router DOM
Tailwinds
Axios
Lucide Icons
SweetAlert2
Formik & Yup
Bcrypt
firebase
Zod
```

### Herramientas de Desarrollo
```
Vite
ESLint
Prettier
Git & GitHub
```

---

## 🚀 Instalación

### Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (v18 o superior)
- **npm** o **yarn**
- **Git**

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/Fernando-urb/Rolling-Music-Equipo-4.git
cd Rolling-Music-Equipo-4
```


2. **Instalar dependencias del Frontend**
```bash
cd ../frontend
npm install
```

3. **Configurar variables de entorno**

Crear archivo `.env` en la carpeta `Frontend`:
```env

VITE_FIREBASE_API_KEY

```

4. **Iniciar el cliente frontend**
```bash
npm run dev
```

5. **Abrir en el navegador**
```
http://localhost:5173
```

---

## 💻 Uso

### Usuario Regular

1. **Registro**: Crear una cuenta nueva
2. **Login**: Iniciar sesión con credenciales
3. **Explorar**: Navegar por el catálogo de música
4. **Reproducir**: Escuchar tus canciones favoritas
5. **Crear Playlists**: Organiza tu música

### Administrador

1. **Panel Admin**: Acceso desde `/admin`
2. **Gestionar Contenido**: Agregar, editar o eliminar canciones
3. **Usuarios**: Administrar la base de usuarios
4. **Estadísticas**: Ver métricas del sistema

---

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Admin/          # Componentes de administración
│   ├── auth/           # Componentes de autenticación
│   ├── Canciones/      # Componentes de música
│   ├── cards/          # Tarjetas de contenido
│   ├── Footer/         # Pie de página
│   ├── Header/         # Encabezado
│   ├── modals/         # Modales
│   ├── MusicPlayer/    # Reproductor de música
│   ├── Sidebar/        # Barra lateral
│   └── Ui/            # Componentes UI base
├── config/             # Configuraciones
├── constants/          # Constantes de la aplicación
├── context/            # Context API providers
├── hook/              # Custom hooks
├── layouts/           # Layouts de página
├── pages/             # Páginas principales
├── routes/            # Configuración de rutas
├── services/          # Servicios API
└── utils/             # Utilidades y helpers
```

---

## 🔐 Variables de Entorno


### Frontend
| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `VITE_FIREBASE_API_KEY`  `tu key de firebase` |

---

---

## 🤝 Contribuir

Las contribuciones son lo que hacen que la comunidad de código abierto sea un lugar increíble para aprender, inspirar y crear. ¡Cualquier contribución que hagas será **muy apreciada**!

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 👥 Equipo

### Equipo 4 -  V-Sound Music

| Nombre | Rol | GitHub |
|--------|-----|--------|
| **Daniel Antequera ** |Frontend Developer  | [@usuario1](https://github.com/Cdantequera) |
| **Fernando Urbano ** | Frontend Developer | [@usuario2](https://github.com/Fernando-urb) |
| **Santiago Paolo Rios** | Frontend Developer | [@usuario3](https://github.com/SantiagoPaolantonio) |

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 📞 Contacto

** - Equipo 4**

- 📧 Email: /
- 🐛 Issues: [GitHub Issues](https://github.com/Fernando-urb/Rolling-Music-Equipo-4/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/Fernando-urb/Rolling-Music-Equipo-4/discussions)

---

## 🙏 Agradecimientos

- [Rolling Code School](https://rollingcodeschool.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js](https://expressjs.com/)

---

<div align="center">

**⭐ Si te gustó este proyecto, no olvides darle una estrella ⭐**

Hecho con ❤️ por el Equipo 4

</div>
