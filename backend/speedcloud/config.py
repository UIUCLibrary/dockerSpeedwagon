from functools import lru_cache
import os
from typing import List

from pydantic import BaseSettings
import tomlkit
import logging
logger = logging.getLogger(__name__)


class Settings(BaseSettings):
    storage: str


search_locations: List[str] = [
        os.getcwd(),
        os.path.join("/", "opt", "etc", "speedcloud"),
        os.path.join("/", "etc", "speedcloud")
]


def read_settings(config_file):
    logger.debug(f'Using config file "{config_file}".')

    with open(config_file, "r") as config_file:
        data = tomlkit.parse(config_file.read())

    return Settings(storage=data['main']['storage_path'])


@lru_cache()
def get_settings():
    config_file = find_config_file(search_paths=search_locations)
    return read_settings(config_file)


def find_config_file(config_file_name="config.toml", search_paths=None):

    for location in search_paths or search_locations:
        candidate = os.path.join(location, config_file_name)
        if os.path.exists(candidate):
            return candidate

    raise FileNotFoundError("No config file located")
