import os


docs_only = 'Example text: os.getenv("STRING_ONLY_SECRET")'
secret = os.getenv("PYTHON_SECRET", "dev-secret")
database_url = os.environ.get("PYTHON_DATABASE_URL", "sqlite://local.db")


def get_config() -> tuple[str, str | None, str | None]:
    return docs_only, secret, database_url
