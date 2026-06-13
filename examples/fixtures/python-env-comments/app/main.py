import os


# Historical example only: os.getenv("COMMENT_ONLY_SECRET")
literal = "value # not a comment"
string_example = 'Use os.getenv("STRING_ONLY_SECRET") in docs, not runtime.'


def get_home() -> str | None:
    return os.getenv("HOME")
