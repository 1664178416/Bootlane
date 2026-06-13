import os


DATABASE_URL = os.getenv("DATABASE_URL")


def get_database_url() -> str | None:
    return DATABASE_URL

