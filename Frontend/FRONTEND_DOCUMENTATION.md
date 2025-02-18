# Frontend Documentation

## Core Functionality

### Pages

#### Public Pages
- `/` - Root/Home
  - Initial landing for new users
  - Login/Register options
  - Feature showcase
  - Navigation to landing page

- `/landing` - Marketing Landing
  - Product benefits and features
  - Success stories
  - Pricing plans
  - Call-to-action for registration
  - Contact information

#### App Pages
- `/apphome` - App Dashboard
  - Workout summary
  - Recent activity
  - Quick start workout
  - Progress metrics
  - Personalized recommendations

#### Authentication Pages (Planned)
- `/login` - User Login
  - Email/password login
  - Social login options
  - Password recovery

- `/register` - User Registration
  - Account creation
  - Initial profile setup
  - Preference selection

#### Workout Pages (Planned)
- `/workout` - Active Workout
  - Real-time pose detection
  - Exercise form feedback
  - Rep counting
  - Rest timer

- `/exercises` - Exercise Library
  - Exercise catalog
  - Form tutorials
  - Difficulty levels
  - Muscle group targeting

#### Profile Pages (Planned)
- `/profile` - User Profile
  - Personal information
  - Workout history
  - Achievement badges
  - Goals tracking

- `/settings` - User Settings
  - Account preferences
  - Privacy settings
  - Notification management
  - Theme customization

### Key Components

#### WebcamCapture
Core functionality for AR fitness tracking:
- Real-time webcam feed
- Camera permission handling
- Frame capture for pose detection
- Mobile/desktop camera compatibility

#### Theme System
- Light/Dark mode toggle
- System preference detection
- Persistent theme storage

### Tech Stack
- Next.js (15.1.6)
- React (19.0.0)
- Tailwind CSS
- react-webcam for camera integration

### Integration Points
- ML: Frame processing via WebcamCapture
- AR: Canvas overlay system
- Backend: Real-time data handling

### Planned Features
- User authentication
- Exercise tracking
- Progress visualization
- Workout planning
- Social features

This documentation will be updated as features are implemented.