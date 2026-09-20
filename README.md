# SecureDesk

Aplicación independiente de autenticación segura construida con Next.js 16+, App Router, TypeScript, Server Actions y Supabase.

## Características

- Registro, inicio y cierre de sesión.
- Verificación de email mediante callback de Supabase.
- Recuperación y actualización de contraseña.
- Cookies de sesión gestionadas con `@supabase/ssr`.
- Cookies `httpOnly`, `SameSite=Lax`, `secure` en producción y sin tokens en `localStorage`.
- Middleware para refrescar sesiones y proteger `/dashboard` y `/profile`.
- Validación de entrada con Zod en Server Actions.
- Comprobación de origen en acciones mutables para reducir riesgo CSRF.
- React escapa por defecto el contenido renderizado y se incluye CSP y otros encabezados de seguridad.
- SQL con perfiles y Row Level Security.

## Instalación local

Requisitos: Node.js 20.9 o superior y un proyecto Supabase.

```bash
npm install
copy .env.example .env.local
npm run dev
```

En macOS/Linux, usa `cp .env.example .env.local` en lugar de `copy`.

Completa `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

No añadas la `service_role key` al frontend ni la publiques en variables `NEXT_PUBLIC_*`.

## Configuración de Supabase

1. Ejecuta `supabase/schema.sql` en el SQL Editor.
2. En Authentication > URL Configuration, añade `http://localhost:3000/auth/callback`.
3. Para producción, añade `https://TU-DOMINIO.vercel.app/auth/callback`.
4. Configura el proveedor Email y decide si exigir confirmación de email.

## Seguridad

Las acciones de autenticación usan el cliente de servidor. La sesión se guarda en cookies protegidas y el middleware llama a `getUser()` para validar la identidad con Supabase, en lugar de confiar solamente en datos decodificados del navegador.

Las credenciales no se imprimen ni se devuelven en mensajes de error. La aplicación no usa `dangerouslySetInnerHTML`, no almacena tokens en `localStorage` y limita las redirecciones externas. En producción debe utilizarse HTTPS y un dominio final incluido en `NEXT_PUBLIC_SITE_URL`.

## Verificación

```bash
npm run typecheck
npm run lint
npm run build
```

## Despliegue en Vercel

1. Importa la carpeta `auth-security-app` como proyecto en Vercel.
2. Configura las tres variables de `.env.local` en Project Settings > Environment Variables.
3. Cambia `NEXT_PUBLIC_SITE_URL` a la URL final de Vercel.
4. Añade el callback de producción en Supabase.

URL de producción: pendiente de despliegue.
