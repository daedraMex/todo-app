# TODO FrontEnd 

author : Erika F.

status : in-progress

last update: 08- jan- 2026
<hr/>

## Tech

- React
- Vite
- TypeScript
- Tailwind CSS
- Axios
- React Router DOM

## Docs

- [Architecture](docs/architecture.md)

## System Requirements

- [git](git) v2.13 or greater
- [Node.js](nodejs) v18 or greater
- [npm](npm) v6 or greater
- [Vite](vite) v4 or greater



## Branches

- main: production code
- dev: development code

## 🚀 Getting Started

1. Environment Configuration
To connect the application to your database and enable security features, you must configure your environment variables.
Create a `.env` file in the root directory of your project and add the values variables:

```bash
cp .env-example .env
```

Then, open the `.env` file and set the appropriate values for each variable according to your setup.

| Variable | Description | Example Value |
|----------|-------------|----------------|
| VITE_API_URL | The URL of the API server | <http://localhost:8000> |

1. If is your first tme running the app

```bash
npm install
```

1. Start the Development Server

```bash
npm run dev
```

You can then visit <http://localhost:5173> to see  welcome message.

## Login

To login to the application, use the following credentials:

- Email:user@gmail.com
- Password:secret123
