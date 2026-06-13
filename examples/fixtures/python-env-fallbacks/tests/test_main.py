from app.main import get_config


def test_get_config() -> None:
    assert get_config()[0]
