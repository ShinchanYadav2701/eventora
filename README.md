# EventHora

EventHora is a full-stack event booking platform with a React + Vite frontend and an Express + MongoDB backend.

## Project Structure

- `client` - React app
- `server` - Express API, MongoDB models, authentication, bookings, and email utilities

## Requirements

- Node.js 18+
- MongoDB database URI
- Email account/app password for OTP and booking emails

## Local Setup

### 1. Server

```bash
cd server
npm install
copy .env.example .env
npm run dev
```

Update `server/.env` with your real values:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/eventhora
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
CLIENT_URL=http://localhost:5173
CORS_ORIGIN=http://localhost:5173
```

### 2. Client

```bash
cd client
npm install
copy .env.example .env
npm run dev
```

Update `client/.env` if your backend is running somewhere other than localhost:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Environment Variables

### Server

- `PORT` - server port
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - token signing secret
- `EMAIL_USER` - SMTP username
- `EMAIL_PASS` - SMTP password or app password
- `CLIENT_URL` - frontend URL used for CORS
- `CORS_ORIGIN` - comma-separated list of allowed browser origins

### Client

- `VITE_API_BASE_URL` - backend API base URL, for example `https://api.yourdomain.com/api`

## Deployment

### Recommended setup

- Frontend: Vercel
- Backend: Render, Railway, Fly.io, or another Node.js host
- Database: MongoDB Atlas

### Frontend deployment on Vercel

1. Create a new Vercel project from the GitHub repo.
2. Set the root directory to `client`.
3. Set `VITE_API_BASE_URL` to your deployed backend API URL, for example:

```env
VITE_API_BASE_URL=https://api.yourdomain.com/api
```

4. Deploy.

The `client/vercel.json` file adds an SPA rewrite so direct navigation to React routes works after deployment.

### Backend deployment

1. Create a Node.js web service from this repository using the `render.yaml` blueprint, or create a manual service from the `server` folder.
2. Set the production environment variables listed above.
3. Point `CLIENT_URL` and `CORS_ORIGIN` to your deployed frontend URL, for example:

```env
CLIENT_URL=https://eventhora.vercel.app
CORS_ORIGIN=https://eventhora.vercel.app
```

4. Start the server with `node index.js` or `npm start`.

If you use the blueprint, Render will read the backend service settings from [`render.yaml`](/G:/web%20Development/EVENTORA/render.yaml).

### MongoDB

Use a hosted MongoDB database such as MongoDB Atlas for production and update `MONGO_URI` accordingly.

## API

Base route: `/api`

- `POST /api/auth/register`
- `POST /api/auth/verify-otp`
- `POST /api/auth/login`
- `GET /api/events`
- `GET /api/events/:id`
- `POST /api/events`
- `PUT /api/events/:id`
- `DELETE /api/events/:id`
- `POST /api/bookings/send-otp`
- `POST /api/bookings`
- `PUT /api/bookings/:id/confirm`
- `GET /api/bookings/my`
- `DELETE /api/bookings/:id`

## Notes

- The frontend stores the auth token in `localStorage`.
- The server expects the JWT secret and email credentials to be present in production.
- If you change your backend domain later, update `VITE_API_BASE_URL` in the client deployment settings.
