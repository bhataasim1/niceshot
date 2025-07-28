# Nice Shot

<div align="center">
  <h3>Create stunning image mockups with beautiful gradients and customizable frames</h3>
  <p>Transform your images into professional presentations with ease</p>

[![License](https://img.shields.io/badge/license-MIT-green)](#license)
[![Next.js](https://img.shields.io/badge/Next.js-15.4.2-black)](https://nextjs.org/)

</div>

---

## 🚀 About

Nice Shot is a modern web application that helps you create beautiful image mockups. Upload your images and transform them with customizable gradients, aspect ratios, and border radius settings to create professional-looking presentations for social media, marketing materials, or personal projects.

### Key Features

- **Drag & Drop Upload** - Easily upload images with a simple drag and drop interface
- **Gradient Backgrounds** - Choose from 14+ beautiful gradient backgrounds
- **Aspect Ratio Control** - Support for 12 different aspect ratios including social media formats
- **Border Radius Customization** - Adjust corner rounding to your preference
- **High-Quality Export** - Download your creations as PNG files
- **Responsive Design** - Works perfectly on desktop and mobile devices
- **Dark/Light Mode** - Built-in theme support

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router) + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: Zustand
- **Image Processing**: dom-to-image for export functionality
- **Authentication**: Better-Auth with OAuth providers
- **Database**: PostgreSQL with Prisma ORM
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
niceshot/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── (landing)/         # Landing page
│   ├── editor/            # Main image editor
│   ├── pricing/           # Subscription pricing
│   └── success/           # Payment success page
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── subscription/     # Subscription-related components
│   └── ...               # Feature-specific components
├── lib/                  # Utility functions and stores
├── constants/            # App constants (gradients, aspect ratios)
├── prisma/              # Database schema and migrations
└── types/               # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ or [Bun](https://bun.sh/) 1.2.13+
- [Docker](https://www.docker.com/) (for local PostgreSQL)
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/niceshot.git
   cd niceshot
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Set up environment variables**

   copy the .env.example file and rename it to .env

   ```bash
   cp .env.example .env
   ```

4. **Start the database**

   ```bash
   docker compose up -d
   ```

5. **Run database migrations**

   ```bash
   bun prisma:generate
   bun prisma:migrate
   ```

6. **Start the development server**

   ```bash
   bun dev
   ```

   The application will be available at `http://localhost:3000`

## 📝 Available Scripts

### Development

- `bun dev` - Start the development server with hot reload
- `bun build` - Build the application for production
- `bun start` - Start the production server
- `bun lint` - Run ESLint

### Database

- `docker compose up -d` - Start PostgreSQL container
- `docker compose down` - Stop the container
- `docker compose down -v` - Stop container and remove volumes
- `bun prisma:migrate` - Apply database migrations
- `bun prisma:generate` - Generate Prisma client
- `bun prisma:studio` - Open Prisma Studio for database management
- `bun db:push` - Push schema changes directly (development only)

### Code Quality

- `bun lint` - Run ESLint
- `bun format` - Format code with Prettier
- `bun check` - Check code formatting

## 🎨 Features

### Image Upload

- Drag and drop interface
- Support for JPG and PNG formats
- File size validation (max 10MB)
- Instant preview

### Gradient Backgrounds

- 14+ beautiful gradient options
- Primary, sunset, fire, purple, green, blue, and more
- Real-time preview

### Aspect Ratios

- 16:9, 3:2, 4:3, 5:4, 1:1 (square)
- 4:5, 3:4, 2:3, 9:16 (portrait)
- 3:1, 10:21 (ultra-wide)
- 16:10 (widescreen)

### Export Options

- High-quality PNG export
- Transparent background support
- Automatic file naming with timestamps

## 🔐 Authentication

The app supports OAuth authentication with:

- Google

### Setting up OAuth Providers

#### Google OAuth

1. Go to [Google Developer Console](https://console.cloud.google.com/)
2. Click "New OAuth App"
3. Fill in the details:
   - Application name: `Nice Shot (Development)`
   - Homepage URL: `http://localhost:3000/`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/google`
4. Copy the Client ID and Client Secret to your `.env.local` file

## 💰 Subscription Features

- **Pro Tier**: All gradients, high-resolution exports, priority support

## 🚀 Deployment

The application is designed to be deployed on Vercel:

1. Fork this repository
2. Import the project in Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy!

For production deployments, ensure you:

- Update OAuth callback URLs to your production domain
- Use production database instance
- Set appropriate environment variables

## 🐛 Troubleshooting

### Common Issues

1. **Database connection errors**
   - Make sure Docker is running
   - Check that PostgreSQL is accessible on port 5432
   - Verify DATABASE_URL is correct

2. **Image upload issues**
   - Ensure file is under 10MB
   - Check file format (JPG/PNG only)
   - Clear browser cache if needed

3. **Export not working**
   - Check browser console for errors
   - Ensure image is fully loaded before export
   - Try refreshing the page

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) to learn about our development process.

### Development Workflow

1. Fork the repository
2. Create a new branch for your feature
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes
4. Run tests and ensure code quality
   ```bash
   bun lint
   bun typecheck
   ```
5. Commit your changes with descriptive messages
6. Push to your fork and create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Image export powered by [dom-to-image](https://github.com/tsayen/dom-to-image)
- Icons from [Lucide React](https://lucide.dev/)
- Auth from [Better-Auth](https://better-auth.com/)

---

[![Star History Chart](https://api.star-history.com/svg?repos=bhataasim1/niceshot&type=Date)](https://www.star-history.com/#bhataasim1/niceshot&Date)


<div align="center">
  Made with ❤️ by <a href="https://x.com/BhatAasim9">Aasim Bhat</a>
</div>
