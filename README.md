# 🏠 Cielito Home Clean - Instrucciones de Instalación

## 📋 Requisitos Previos

- Node.js (versión 14 o superior)
- Una cuenta de Gmail para envío de emails
- Acceso al cPanel o servidor donde se alojará la aplicación

## 🚀 Instalación Paso a Paso

### 1. Instalar Dependencias

```bash
cd backend
npm install
```

### 2. Configurar Variables de Entorno

1. Copia el archivo `.env.example` a `.env`:
```bash
cp .env.example .env
```

2. Edita el archivo `.env` con tus datos reales:
```bash
# Configuración del servidor
PORT=3000
NODE_ENV=production

# Configuración de email
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-app-password-de-gmail

# Configuración de la empresa
COMPANY_EMAIL=cielitoclean@cielitohome.com
COMPANY_NAME=Cielito Home Clean
COMPANY_PHONE=4491382712
COMPANY_WHATSAPP=524491382712
```

### 3. Configurar Gmail para Envío de Emails

#### Opción A: Usar App Password (Recomendado)

1. Ve a tu cuenta de Google: https://myaccount.google.com/
2. Seguridad → Verificación en 2 pasos (debe estar activada)
3. Contraseñas de aplicaciones
4. Selecciona "Correo" y "Otro"
5. Escribe "Cielito Home Clean"
6. Usa la contraseña generada en `EMAIL_PASS`

#### Opción B: Usar OAuth2 (Más Seguro)

Si prefieres usar OAuth2, actualiza el contactController.js:

```javascript
const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        accessToken: process.env.OAUTH_ACCESS_TOKEN
    }
});
```

### 4. Estructura de Archivos

Tu proyecto debe tener esta estructura:

```
proyecto/
├── backend/
│   ├── app.js
│   ├── package.json
│   ├── .env
│   ├── routes/
│   │   ├── webRoutes.js
│   │   └── apiRoutes.js
│   └── controllers/
│       ├── contactController.js
│       ├── homeController.js
│       ├── aboutController.js
│       └── servicesController.js
└── frontend/
    ├── contacto.html
    ├── index.html
    ├── 404.html
    ├── js/
    │   ├── contactForm.js
    │   ├── main.js
    │   └── navbar.js
    ├── css/
    └── images/
```

### 5. Probar Localmente

```bash
# Modo desarrollo
npm run dev

# Modo producción
npm start
```

Visita: http://localhost:3000

### 6. Despliegue en Servidor

#### Para cPanel:

1. Sube todos los archivos al directorio public_html
2. En el administrador de Node.js:
   - Selecciona la versión de Node.js
   - Especifica `backend/app.js` como archivo de inicio
   - Agrega las variables de entorno
3. Instala las dependencias:
```bash
npm install
```

#### Para VPS/Servidor Dedicado:

```bash
# Usar PM2 para producción
npm install -g pm2

# Iniciar la aplicación
pm2 start backend/app.js --name "cielito-clean"

# Configurar para reinicio automático
pm2 startup
pm2 save
```

## 🔧 Configuraciones Adicionales

### Personalizar Emails

Los templates de email están en `contactController.js`. Puedes personalizar:

- Colores y estilos
- Mensajes de bienvenida
- Códigos de descuento
- Enlaces a redes sociales

### Configurar Rate Limiting

En `app.js` puedes ajustar los límites:

```javascript
const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 5, // máximo 5 mensajes por hora
});
```

### SSL/HTTPS

Para producción, asegúrate de configurar HTTPS. Si usas cPanel, esto se hace automáticamente con Let's Encrypt.

## 🧪 Pruebas

### Probar Formulario de Contacto

1. Ve a `/contacto.html`
2. Llena el formulario
3. Verifica que lleguen los emails tanto al admin como al cliente

### Probar Newsletter

1. Usa el formulario del footer
2. Verifica el email de bienvenida con descuento

### Verificar Rate Limiting

1. Envía varios mensajes rápidamente
2. Debe mostrar mensaje de límite excedido

## 📊 Monitoreo

### Logs de la Aplicación

```bash
# Ver logs en tiempo real
pm2 logs cielito-clean

# Ver logs específicos
pm2 logs cielito-clean --lines 100
```

### Monitoreo de Performance

```bash
# Dashboard de PM2
pm2 monit
```

## 🔒 Seguridad

### Variables de Entorno

**NUNCA** subas el archivo `.env` al repositorio. Usa `.env.example` como plantilla.

### Headers de Seguridad

La aplicación incluye:
- Helmet.js para headers de seguridad
- Rate limiting
- Validación de datos
- CORS configurado

### Backup

Considera configurar backups automáticos de:
- Base de datos (cuando la implementes)
- Archivos de configuración
- Logs importantes

## 🆘 Solución de Problemas

### Email no se envía

1. Verifica las credenciales en `.env`
2. Asegúrate de que la verificación en 2 pasos esté activada
3. Revisa que el app password sea correcto
4. Verifica los logs: `pm2 logs`

### Error 500

1. Revisa los logs: `pm2 logs cielito-clean`
2. Verifica que todas las dependencias estén instaladas
3. Confirma que el archivo `.env` exista y tenga los valores correctos

### Formulario no responde

1. Abre las herramientas de desarrollador (F12)
2. Revisa la consola por errores de JavaScript
3. Verifica que `contactForm.js` se esté cargando correctamente

## 📞 Soporte

Si necesitas ayuda adicional:

- Email: cielitoclean@cielitohome.com
- WhatsApp: https://wa.me/524491382712
- Teléfono: 449 138 2712

## ✅ Checklist Final

- [ ] Node.js instalado
- [ ] Dependencias instaladas (`npm install`)
- [ ] Archivo `.env` configurado
- [ ] Gmail configurado con app password
- [ ] Aplicación funcionando localmente
- [ ] Formulario de contacto probado
- [ ] Newsletter probado
- [ ] Emails llegando correctamente
- [ ] Aplicación desplegada en servidor
- [ ] SSL/HTTPS configurado
- [ ] Backups configurados

¡Tu aplicación está lista! 🎉