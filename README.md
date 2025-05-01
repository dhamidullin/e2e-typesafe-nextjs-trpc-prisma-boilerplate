# Next.js Fullstack Template (tRPC + Prisma)

This is a fullstack Next.js project template with tRPC and Prisma set up, featuring end-to-end type safety from the Prisma schema all the way to frontend TSX components.

## Getting Started

1.  **Install dependencies:**
    This project uses Yarn. Make sure you have it installed.
    ```bash
    yarn install
    ```

2.  **Set up environment variables:**
    Copy the example environment file:
    ```bash
    cp .env.example .env
    ```
    Update the `DATABASE_URL` in the `.env` file to point to your PostgreSQL database.
    Example: `postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public`

3.  **Apply database migrations:**
    This command will apply any pending migrations to your database schema.
    ```bash
    yarn prisma:migrate
    ```

4.  **Run the development server:**
    ```bash
    yarn dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Prisma Commands

This project includes npm scripts for common Prisma operations:

*   **Generate Prisma Client:** Updates the Prisma Client library (`@/generated/prisma`) based on your `prisma/schema.prisma` file. Run this after changing the schema.
    ```bash
    yarn prisma:generate
    # Equivalent to: npx prisma generate
    ```

*   **Create Migration:** Generates a new SQL migration file in `prisma/migrations` based on changes in `prisma/schema.prisma` *without* applying it to the database.
    ```bash
    # Replace <migration-name> with a descriptive name (e.g., add-user-model)
    yarn prisma migrate dev --create-only --name <migration-name>
    # Equivalent to: npx prisma migrate dev --create-only --name <migration-name>
    ```

*   **Apply Migrations:** Applies all pending migrations from the `prisma/migrations` directory to the database. The `prisma:migrate` script in `package.json` runs this.
    ```bash
    yarn prisma:migrate
    # Equivalent to: npx prisma migrate dev
    ```

*   **Open Prisma Studio:** Opens a GUI tool to view and manage data in your database.
    ```bash
    yarn prisma:studio
    # Equivalent to: npx prisma studio
    ```

## TODO

-   [ ] Add `Dockerfile` and `docker-compose.yml` for containerization and simplified local setup.
