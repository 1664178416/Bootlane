# Bootlane Python Support

Last updated: 2026-06-08

Bootlane includes an initial read-only Python detection spike.

## Detection Signals

Bootlane detects a Python project when it finds one of:

- `pyproject.toml`
- `requirements.txt`
- `uv.lock`
- `poetry.lock`
- `Pipfile`
- `Pipfile.lock`
- `setup.py`
- `setup.cfg`

If both `package.json` and Python files exist, Bootlane currently treats the repo as Node-first.

## Package Manager Detection

| Signal | Package manager |
| --- | --- |
| `uv.lock` or `[tool.uv]` | `uv` |
| `poetry.lock`, `[tool.poetry]`, or `poetry-core` build backend | `poetry` |
| `Pipfile` or `Pipfile.lock` | `pipenv` |
| `requirements.txt`, `setup.py`, `setup.cfg`, or pyproject-only metadata | `pip` |

## Current Checks

| Check | Finding ID | Meaning |
| --- | --- | --- |
| GitHub Actions workflow | `ci.github-actions.missing` | Python test files exist but no GitHub Actions workflow was found |
| GitHub Actions test command | `ci.github-actions.no-test` | Workflow exists but does not run a recognizable Python test command |
| Dependency lockfile | `dependencies.python.lockfile.missing` | uv, Poetry, or Pipenv metadata exists but the matching lockfile is missing |
| Dependency metadata mismatch | `dependencies.python.package-manager.mismatch` | Multiple lockfile-based Python package manager signals exist |
| Python version | `runtime.python-version.missing` | No `requires-python`, `.python-version`, `runtime.txt`, or `.tool-versions` |
| README install docs | `readme.python-install.missing` | README does not show a recognizable install command |
| README test docs | `readme.python-test.missing` | Tests exist but README does not document how to run them |
| Test signal | `tests.python.missing` | No test files or common test tooling found |
| Test tooling without files | `tests.python.tooling-no-files` | Test tooling is declared but no common Python test files were found |
| Env example | `env.example.missing` / `env.example.incomplete` | Python source reads env vars not documented in `.env.example` |

## Test Signal Recognition

Bootlane treats common pytest and unittest file layouts as concrete test signals:

- `tests/test_app.py`
- `tests/app_test.py`
- `app/test_helpers.py`
- `app/helpers_test.py`

`tests/__init__.py` by itself is not counted as a test file.

If `pyproject.toml` or `requirements.txt` declares pytest or unittest but Bootlane cannot find matching test files, it reports `tests.python.tooling-no-files` as an info-level hint. This keeps placeholder or early-stage Python projects from getting a warning while still showing that test setup looks incomplete.

## Dependency Metadata Checks

Bootlane treats pyproject-only projects as `pip` by default and suggests `python -m pip install .` when README install docs are missing.

For lockfile-based package managers, Bootlane expects:

| Package manager | Expected lockfile | Suggested command |
| --- | --- | --- |
| `uv` | `uv.lock` | `uv lock` |
| `poetry` | `poetry.lock` | `poetry lock` |
| `pipenv` | `Pipfile.lock` | `pipenv lock` |

If more than one lockfile-based Python package manager signal appears, Bootlane reports `dependencies.python.package-manager.mismatch` instead of guessing which tool is authoritative.

## CI Signal Recognition

Bootlane checks GitHub Actions for Python projects only when it finds real Python test files. Declared test tooling without test files remains an info-level test hint and does not require CI.

Recognized workflow test commands reuse the README test command rules, including:

- `pytest`
- `python -m pytest`
- `python -m unittest`
- `uv run pytest`
- `poetry run pytest`
- `pipenv run pytest`
- `tox`
- `nox`

When CI workflow setup is missing or a workflow omits tests, Bootlane suggestions reuse the same metadata-aware commands as README checks and fix previews. If test files exist but no supported test tooling is declared, CI suggestions stay generic instead of guessing pytest.

## CI Fix Previews

Python projects missing GitHub Actions can generate a read-only `fix.ci.github-actions.python.create` proposal when Bootlane can infer both install and test commands from metadata.

The generated workflow preview includes:

- `actions/checkout@v4`
- `actions/setup-python@v5`
- A Python version inferred from `requires-python`, `.python-version`, `runtime.txt`, or `.tool-versions`
- Tool setup for uv, Poetry, or Pipenv when those package managers are detected
- A package-manager-aware install command
- A package-manager-aware test command

Version inference keeps `requires-python` as the first source. When it is absent, Bootlane checks `.python-version`, then `runtime.txt`, then the `python` entry in `.tool-versions`. If none of those sources contains a deterministic version, generated workflow previews use `3.x`.

If a project has test files but no supported test tooling metadata, Bootlane still reports `ci.github-actions.missing`, but it does not generate an overconfident workflow snippet.

## README Command Recognition

Bootlane recognizes common install commands such as:

- `pip install -r requirements.txt`
- `pip install .`
- `pip install -e .`
- `pip install ./app`
- `python -m pip install -r requirements.txt`
- `python -m pip install .`
- `python -m pip install -e .`
- `python3 -m pip install -r requirements.txt`
- `py -m pip install -r requirements.txt`
- `uv sync`
- `uv pip install -r requirements.txt`
- `poetry install`
- `poetry install --with dev`
- `pipenv install`
- `pipenv sync`

Bootlane recognizes common test commands such as:

- `pytest`
- `python -m pytest`
- `python3 -m pytest`
- `py -m pytest`
- `python -m unittest`
- `uv run pytest`
- `poetry run pytest`
- `pipenv run pytest`
- `tox`
- `nox`

When README test instructions are missing, Bootlane suggests a command that matches detected metadata:

| Signal | Suggested test command |
| --- | --- |
| `uv` package manager | `uv run pytest` |
| Poetry package manager | `poetry run pytest` |
| Pipenv package manager | `pipenv run pytest` |
| `tox` tooling | `tox` |
| `nox` tooling | `nox` |
| unittest tooling | `python -m unittest` |
| pip or unknown package manager | `python -m pytest` |

## README Fix Previews

Python README findings can generate read-only `fix.readme.setup.create` or `fix.readme.setup.append` proposals when Bootlane can infer deterministic commands.

Install snippets are generated from package-manager metadata:

| Signal | Preview install command |
| --- | --- |
| `uv` package manager | `uv sync` |
| Poetry package manager | `poetry install` |
| Pipenv package manager with `Pipfile.lock` | `pipenv sync` |
| Pipenv package manager without `Pipfile.lock` | `pipenv install` |
| `requirements.txt` | `python -m pip install -r requirements.txt` |
| pyproject-only, `setup.py`, or `setup.cfg` | `python -m pip install .` |

Test snippets require real test files and declared pytest, unittest, tox, or nox tooling. If a project has test files but no test tooling metadata, Bootlane still reports `readme.python-test.missing`, but it does not generate an overconfident README test snippet.

## Env Var Detection

Bootlane detects these Python env patterns:

```python
os.environ["SECRET_KEY"]
os.environ.get("SECRET_KEY")
os.getenv("SECRET_KEY")
```

## Limits

This is intentionally a first spike:

- It does not execute Python commands.
- It does not parse full TOML semantics.
- It does not inspect virtualenvs.
- It does not resolve dependency graphs.
- It does not write Python README fix previews to disk.
