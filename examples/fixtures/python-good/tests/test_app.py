from app.main import get_database_url


def test_get_database_url():
    assert get_database_url() is None

