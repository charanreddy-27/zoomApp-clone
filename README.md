# MeetSync - Next-Generation Video Conferencing

MeetSync is a modern, high-performance video conferencing platform built with Next.js, featuring AI-powered meeting tools and a sleek user interface.

![MeetSync Screenshot](public/images/meetsync-screenshot.png)

## Features

- **Modern UI/UX**: Sleek design with smooth animations and intuitive navigation
- **AI Meeting Assistant**: Real-time meeting summaries, action item detection, and smart suggestions
- **Collaborative Tools**: Whiteboard, document sharing, and live polls
- **Performance Optimized**: Fast loading times and efficient rendering
- **Responsive Design**: Works seamlessly across all devices
- **Dark/Light Mode**: Customizable theme support
- **Enterprise Security**: End-to-end encryption and advanced security features

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Authentication**: Clerk
- **Video SDK**: Stream Video
- **State Management**: React Hooks
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Shadcn UI (customized)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/meetsync.git
   cd meetsync
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
   
   NEXT_PUBLIC_STREAM_API_KEY=your_stream_api_key
   STREAM_SECRET_KEY=your_stream_secret_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
meetsync/
├── actions/        # Server actions
├── app/            # App router pages and layouts
├── components/     # React components
├── constants/      # Application constants
├── hooks/          # Custom React hooks
├── lib/            # Utility functions
├── providers/      # Context providers
└── public/         # Static assets
```

## Key Components

- **Navbar**: Navigation with scroll-based transparency
- **Sidebar**: Main navigation for authenticated users
- **AIAssistant**: AI-powered meeting assistant
- **MeetingTypeList**: Different meeting creation options
- **StreamClientProvider**: Video client initialization

## Performance Optimizations

- Memoized components for better rendering performance
- Optimized animations with reduced motion support
- Proper cleanup in useEffect hooks
- Image optimization with Next.js Image component
- Route prefetching for faster navigation

## Design System

The application uses a custom design system built on Tailwind CSS with:

- Custom color palette with primary, secondary, accent, danger, and warning colors
- Consistent spacing and typography
- Modern glass effects
- Smooth animations and transitions
- Dark mode support

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Clerk](https://clerk.dev/)
- [Stream](https://getstream.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)

## <a name="tech-stack">⚙️ Tech Stack</a>

- Next.js
- TypeScript
- Clerk
- getstream
- shadcn
- Tailwind CSS

## <a name="features">🔋 Features</a>


👉 **Authentication**: Implements authentication and authorization features using Clerk, allowing users to securely log in via social sign-on or traditional email and password methods, while ensuring appropriate access levels and permissions within the platform.

👉 **New Meeting**: Quickly start a new meeting, configuring camera and microphone settings before joining.

👉 **Meeting Controls**: Participants have full control over meeting aspects, including recording, emoji reactions, screen sharing, muting/unmuting, sound adjustments, grid layout, participant list view, and individual participant management (pinning, muting, unmuting, blocking, allowing video share).

👉 **Exit Meeting**: Participants can leave a meeting, or creators can end it for all attendees.

👉 **Schedule Future Meetings**: Input meeting details (date, time) to schedule future meetings, accessible on the 'Upcoming Meetings' page for sharing the link or immediate start.

👉 **Past Meetings List**: Access a list of previously held meetings, including details and metadata.

👉 **View Recorded Meetings**: Access recordings of past meetings for review or reference.

👉 **Personal Room**: Users have a personal room with a unique meeting link for instant meetings, shareable with others.

👉 **Join Meetings via Link**: Easily join meetings created by others by providing a link.

👉 **Secure Real-time Functionality**: All interactions within the platform are secure and occur in real-time, maintaining user privacy and data integrity.

👉 **Responsive Design**: Follows responsive design principles to ensure optimal user experience across devices, adapting seamlessly to different screen sizes and resolutions.

and many more, including code architecture and reusability. 

## <a name="quick-start">🤸 Quick Start</a>

**Cloning the Repository**

```bash
git clone https://github.com/adrianhajdin/zoom-clone.git
cd zoom-clone
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

NEXT_PUBLIC_STREAM_API_KEY=
STREAM_SECRET_KEY=
```

Replace the placeholder values with your actual Clerk & getstream credentials. You can obtain these credentials by signing up on the [Clerk website](https://clerk.com/) and [getstream website](https://getstream.io/)

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.


## 🎨 **Connect With Me**
<p align="center">
  <a href="https://www.linkedin.com/in/chandacharanreddy/" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-Charan%20Reddy-blue?style=for-the-badge&logo=linkedin" alt="LinkedIn Badge"/></a>
  <a href="mailto:charanreddychanda@gmail.com" target="_blank"><img src="https://img.shields.io/badge/Email-charanreddychanda%40gmail.com-red?style=for-the-badge&logo=gmail" alt="Email Badge"/></a>
  <a href="https://github.com/charanreddy-27" target="_blank"><img src="https://img.shields.io/badge/GitHub-charanreddy--27-lightgrey?style=for-the-badge&logo=github" alt="GitHub Badge"/></a>
</p>

---

<p align="center" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 18px; color: #4B4B4B;">
  © 2025 <strong>Charan Reddy</strong>. All rights reserved.
</p>
<p align="center" style="font-family: 'Courier New', Courier, monospace; font-size: 16px; color: #8D8D8D;">
</p>
