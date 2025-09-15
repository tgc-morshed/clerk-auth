# Clerk Authentication App

A modern Next.js 15 application with Clerk authentication, featuring custom sign-up and sign-in pages, email verification, social login, and a protected dashboard.

## Features

- **Custom Authentication Pages**: Beautiful, responsive sign-up and sign-in forms
- **Email Verification**: Complete verification flow with code input
- **Social Login**: Google, Facebook, and Slack OAuth integration
- **Protected Routes**: Middleware-protected dashboard and pages
- **User Management**: API routes for storing and managing user data
- **Modern UI**: Clean design with Tailwind CSS and shadcn/ui components
- **TypeScript**: Full type safety throughout the application

## Getting Started

### Prerequisites

- Node.js 18+ 
- A Clerk account and application

### Environment Variables

Create a `.env.local` file in the root directory:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Set up your Clerk application:
   - Create a new Clerk application
   - Configure OAuth providers (Google, Facebook, Slack)
   - Add your environment variables
4. Run the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── users/          # User management API
│   │   └── health/         # Health check endpoint
│   ├── dashboard/          # Protected dashboard page
│   ├── sign-in/           # Custom sign-in page
│   ├── sign-up/           # Custom sign-up page
│   ├── sso-callback/      # OAuth callback handler
│   ├── layout.tsx         # Root layout with ClerkProvider
│   └── page.tsx           # Home page
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── dashboard-header.tsx
│   ├── dashboard-stats.tsx
│   ├── recent-activity.tsx
│   └── quick-actions.tsx
├── middleware.ts          # Clerk middleware for route protection
└── README.md
```

## Key Features Explained

### Custom Authentication Forms
- Built with React Hook Form and Zod validation
- Password visibility toggle
- Comprehensive error handling
- Loading states and feedback

### Email Verification Flow
- Automatic email sending after sign-up
- Custom verification code input
- Seamless transition to dashboard after verification

### Social Authentication
- Pre-configured OAuth buttons for Google, Facebook, and Slack
- Proper redirect handling through SSO callback page

### Protected Routes
- Middleware-based route protection
- Automatic redirects for unauthenticated users
- Server-side user data access

### User Storage API
- RESTful API for user management
- In-memory storage (easily replaceable with database)
- Full CRUD operations with authentication

## Customization

### Styling
The app uses a custom color palette defined in `globals.css`. You can modify the CSS custom properties to match your brand:

```css
:root {
  --primary: #ea580c;        /* Orange-600 */
  --secondary: #f97316;      /* Orange-500 */
  --background: #ffffff;     /* White */
  --foreground: #4b5563;     /* Gray-600 */
  /* ... more colors */
}
```

### Database Integration
Replace the in-memory storage in `/api/users/route.ts` with your preferred database:


## Deployment

1. Deploy to Vercel:
   ```bash
   pnpm run build
   vercel --prod
   ```

2. Add environment variables in your Vercel dashboard

3. Update Clerk settings with your production URLs

## Security Considerations

- All API routes are protected with Clerk authentication
- Middleware ensures only authenticated users can access protected pages
- Environment variables are properly scoped (NEXT_PUBLIC_ for client-side)
- Form validation prevents malicious input

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
