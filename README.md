# EventHub

A full-stack MERN event management platform — organizers create and run events, attendees discover and RSVP to them. Built end-to-end: REST API, auth, database, and a React frontend.

**Backend (Render + MongoDB Atlas):** live
**Frontend (Vercel):** deploying

---

## What it does

- **Browse & search events** — filter by category, keyword, or date range (this week / this month / upcoming)
- **RSVP to events** — join or leave, with an optional capacity limit that closes registration once full
- **Host events** — create, edit, and delete events you organize
- **Comment on events** — attendees can leave comments on an event's page
- **Two dashboards** — "Hosting" for events you organize, "Attending" for events you've joined
- **Authentication** — register/login with hashed passwords and JWT-based sessions; only an event's organizer can edit or delete it

## Tech stack

**Client**
- React 19 + Vite
- React Router
- Axios (with an auth interceptor that attaches the JWT to every request)
- Context API for global auth state

**Server**
- Node.js + Express 5
- MongoDB Atlas + Mongoose
- JWT (jsonwebtoken) for auth, bcryptjs for password hashing
- CORS configured for the deployed frontend origin

## Project structure

```
EventHub/
├── server/
│   ├── config/db.js          # MongoDB connection
│   ├── models/                # User, Event (with embedded comments)
│   ├── routes/                # /api/auth, /api/events
│   ├── middleware/auth.js     # JWT verification
│   └── server.js              # App entry point
│
└── client/
    └── src/
        ├── pages/              # Home, Login, Register, Dashboard, CreateEvent, EditEvent, EventDetails
        ├── components/         # Navbar, EventCard, CommentSection, ProtectedRoute
        ├── context/            # AuthContext (login, register, logout, current user)
        └── utils/api.js        # Axios instance + auth header interceptor
```

## API overview

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create an account |
| POST | `/api/auth/login` | Log in, receive a JWT |
| GET | `/api/auth/me` | Get the logged-in user |
| GET | `/api/events` | List events — supports `?search=`, `?category=`, `?when=week\|month` |
| GET | `/api/events/:id` | Get a single event (with organizer + comments populated) |
| POST | `/api/events` | Create an event *(auth required)* |
| PUT | `/api/events/:id` | Update an event *(organizer only)* |
| DELETE | `/api/events/:id` | Delete an event *(organizer only)* |
| GET | `/api/events/my/hosting` | Events you organize *(auth required)* |
| GET | `/api/events/my/attending` | Events you've RSVP'd to *(auth required)* |
| POST | `/api/events/:id/rsvp` | Join an event *(auth required)* |
| DELETE | `/api/events/:id/rsvp` | Leave an event *(auth required)* |
| POST | `/api/events/:id/comments` | Comment on an event *(auth required)* |

## Running it locally

**1. Clone and install**
```bash
git clone https://github.com/Ankit-4234/EventHub.git
cd EventHub

cd server && npm install
cd ../client && npm install
```

**2. Set up environment variables**

`server/.env`
```
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
CLIENT_URL=http://localhost:5173
```

`client/.env`
```
VITE_APP_URL=http://localhost:5000/api
```

**3. Run both apps**
```bash
# terminal 1
cd server && npm run dev

# terminal 2
cd client && npm run dev
```

The client runs on `http://localhost:5173`, the API on `http://localhost:5000`.

## Deployment

- **Backend** is deployed on [Render](https://render.com), connected to a MongoDB Atlas cluster.
- **Frontend** is being deployed on [Vercel](https://vercel.com) — set `VITE_APP_URL` to the Render API URL in the Vercel project's environment variables, and `CLIENT_URL` on Render to the Vercel domain once it's live.

## Author

Built by [Ankit Wosti](https://github.com/Ankit-4234) — [portfolio](https://myportfolio4234.vercel.app) · [LinkedIn](https://www.linkedin.com/in/ankit-wosti-28584a410/)
