# Next.js Authentication Toolkit

A modern, full-featured authentication system built with Next.js 15, featuring both traditional email/password authentication and OAuth providers (GitHub, Google).

## 🚀 Features

- 🔐 Multiple Authentication Methods
  - Email & Password
  - OAuth (GitHub, Google)
  - Two-Factor Authentication (2FA)
- 👤 User Management
  - User Registration
  - Email Verification
  - Password Reset
  - Profile Settings
- 🛡️ Security
  - Role-based Access Control (Admin/User)
  - Protected Routes
  - Server-side Authentication
- 💅 UI/UX
  - Modern Interface with Tailwind CSS
  - Responsive Design
  - Form Validation
  - Loading States
  - Error Handling

## 🛠️ Tech Stack

- Next.js 15
- TypeScript
- Prisma (PostgreSQL)
- NextAuth.js
- Tailwind CSS
- Zod Validation
- Resend (Email Service)

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- npm or yarn
- Resend API Key
- OAuth Provider Credentials (for GitHub and Google authentication)

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd next-auth-toolkit
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL="your_postgresql_url"
   DATABASE_URL_UNPOOLED="your_unpooled_postgresql_url"

   NEXT_PUBLIC_APP_URL="http://localhost:3000"

   GITHUB_CLIENT_ID="your_github_client_id"
   GITHUB_CLIENT_SECRET="your_github_client_secret"

   GOOGLE_CLIENT_ID="your_google_client_id"
   GOOGLE_CLIENT_SECRET="your_google_client_secret"

   RESEND_API_KEY="your_resend_api_key"
   ```

4. **Set up the database**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
├── actions/         # Server actions
├── app/            # Next.js app directory
├── components/     # React components
├── lib/           # Utility functions
├── prisma/        # Database schema
├── public/        # Static assets
└── schemas/       # Validation schemas
```

## 🔒 Authentication Flow

1. **Traditional Authentication**

   - User registers with email/password
   - Email verification
   - Login with credentials
   - Optional 2FA

2. **OAuth Authentication**
   - Select OAuth provider
   - Authorize application
   - Automatic account creation/linking

## 🛣️ Routes

- `/auth/login` - Login page
- `/auth/register` - Registration page
- `/auth/reset` - Password reset
- `/settings` - User settings
- `/admin` - Admin dashboard (protected)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for the deployment platform
- All contributors and users of this toolkit
