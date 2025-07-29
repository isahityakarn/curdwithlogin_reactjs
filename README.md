# React Login & Register App

A complete React.js application with user authentication (login and register) functionality using Bootstrap 5 for styling.

## Features

- **User Registration**: Users can create new accounts
- **User Login**: Secure login functionality
- **Protected Routes**: Dashboard accessible only to authenticated users
- **Responsive Design**: Mobile-friendly interface using Bootstrap 5
- **Form Validation**: Client-side validation for all forms
- **Loading States**: Visual feedback during API calls
- **Error Handling**: Comprehensive error handling and user feedback
- **Local Storage**: Persistent login sessions
- **Modern UI**: Clean and professional design

## API Endpoints

The application is configured to work with the following API endpoints:

- **Login**: `POST http://localhost:5050/api/users/login`
- **Register**: `POST http://localhost:5050/api/users/register`

### API Request Format

**Login Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Register Request:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123"
}
```

### Expected API Response Format

**Successful Login Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

**Successful Registration Response:**
```json
{
  "message": "User registered successfully"
}
```

**Error Response:**
```json
{
  "message": "Error message here"
}
```

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

## Project Structure

```
src/
├── components/
│   ├── Dashboard.js       # Protected dashboard component
│   ├── Login.js          # Login form component
│   ├── Navbar.js         # Navigation component
│   └── Register.js       # Registration form component
├── context/
│   └── AuthContext.js    # Authentication context and logic
├── App.js                # Main application component
├── App.css              # Custom styles
└── index.js             # Application entry point
```

## Components Overview

### AuthContext
- Manages authentication state
- Handles login and register API calls
- Provides authentication methods to components
- Manages local storage for persistent sessions

### Login Component
- Email and password form
- Form validation
- Loading states
- Error handling
- Redirects to dashboard on success

### Register Component
- Name, email, password, and confirm password form
- Comprehensive form validation
- Password confirmation
- Success/error messaging
- Auto-redirect to login after successful registration

### Dashboard Component
- Protected route (requires authentication)
- Displays user information
- Sample dashboard content
- Activity timeline

### Navbar Component
- Responsive navigation
- Shows different options based on authentication status
- User dropdown with logout functionality

## Styling

The application uses:
- **Bootstrap 5**: For responsive grid, components, and utilities
- **Custom CSS**: Additional styling in `App.css`
- **Bootstrap Icons**: For icons (optional - can be added)

## Security Features

- Client-side form validation
- JWT token storage in localStorage
- Protected routes
- Automatic logout functionality
- Input sanitization

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers
- Internet Explorer 11+ (with polyfills)

## Development

### Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App (one-way operation)

### Customization

1. **API Endpoints**: Update the URLs in `src/context/AuthContext.js`
2. **Styling**: Modify `src/App.css` or update Bootstrap variables
3. **Validation**: Adjust form validation rules in component files
4. **Routes**: Add new routes in `src/App.js`

## Deployment

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy the `build` folder** to your hosting service

## Backend Requirements

Your backend API should:
- Handle CORS for the frontend domain
- Return JWT tokens for successful login
- Accept and validate user registration data
- Return appropriate error messages
- Implement proper password hashing and security

## Notes

- Make sure your backend API is running on `http://localhost:5050`
- Update the API base URL in `AuthContext.js` if using a different backend URL
- The app stores authentication tokens in localStorage
- For production, consider using httpOnly cookies for enhanced security

## License

This project is open source and available under the [MIT License](LICENSE).
