# 4A Tek - Digital Solutions Website

A modern, responsive website built with Next.js 15, featuring a comprehensive digital agency showcase with portfolio management, service listings, and client testimonials.

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive Layout**: Optimized for all devices and screen sizes
- **Portfolio Management**: Dynamic portfolio showcase with detailed case studies
- **Service Pages**: Comprehensive service descriptions with process workflows
- **Client Testimonials**: Interactive testimonial carousel
- **Contact System**: Integrated contact forms with email functionality
- **Admin Dashboard**: Content management system for portfolio and services
- **SEO Optimized**: Built-in SEO features and meta tag management
- **Performance**: Optimized for speed and Core Web Vitals

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4
- **Database**: MySQL with Prisma ORM
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Particles**: TSParticles
- **Deployment**: Vercel/Docker ready

## 📋 Prerequisites

- Node.js 18+ 
- MySQL 8.0+
- npm or yarn

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd a4tech
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
```bash
# Copy environment template
cp env.example .env.local

# Edit .env.local with your configuration
```

### 4. Database Setup
```bash
# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push
```

### 5. Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 📁 Project Structure

```
src/
├── app/
│   ├── api/                 # API routes
│   ├── components/          # Shared components
│   ├── home/               # Home page components
│   ├── aboutus/            # About page components
│   ├── services/           # Services pages
│   ├── portfolio/          # Portfolio pages
│   ├── dashboard/          # Admin dashboard
│   └── globals.css         # Global styles
├── lib/                    # Utility functions
└── util/                   # Database utilities
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push database schema
- `npm run db:studio` - Open Prisma Studio
- `npm run clean` - Clean build cache

## 🌐 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Docker
```bash
# Build and run with Docker Compose
docker-compose up -d
```

### Traditional Hosting
1. Build the application: `npm run build`
2. Upload files to your hosting provider
3. Configure environment variables
4. Set up MySQL database

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | MySQL database connection string | Yes |
| `ADMIN_USERNAME` | Admin dashboard username | Yes |
| `ADMIN_PASSWORD` | Admin dashboard password | Yes |
| `IMAGE_UPLOAD_PHP_URL` | Image upload endpoint URL | Yes |
| `NEXT_PUBLIC_IMAGE_UPLOAD_BASE` | Base URL for uploaded images | Yes |
| `NEXT_PUBLIC_SITE_URL` | Your website URL | Yes |

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Image Optimization**: WebP format with lazy loading
- **Code Splitting**: Automatic route-based splitting
- **Caching**: Optimized caching strategies

## 🔒 Security

- Environment variable protection
- Secure authentication system
- CSRF protection
- XSS prevention
- SQL injection protection via Prisma
- Security headers configuration

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is proprietary software. All rights reserved.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Updates

- **v1.0.0** - Initial release with core features
- **v1.1.0** - Added Industries section and performance optimizations
- **v1.2.0** - Enhanced animations and deployment readiness

---

Built with ❤️ by the 4A Tek team
