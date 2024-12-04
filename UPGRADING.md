# Upgrading Guide

This document outlines the upgrade process and scope of support for the software. For full details on warranty and support coverage, refer to the `WARRANTY.md` file.

## Upgrade Support Coverage

Upgrades to the software are supported as follows:

### Covered Directories

The following directories are covered under the warranty as specified in `WARRANTY.md`. Upgrades in these directories will be fully supported and aligned with the upgrade process detailed at [https://docs.novel.dev/upgrading](https://docs.novel.dev/upgrading):

- **`deploy`**: All deployment-related configurations and files.
- **`packages`**: Core software logic and modules within this directory.
- **`test`**: Tests provided within the covered directories.

### Userland Directories

The following directories fall outside the scope of full warranty coverage. Any upgrades affecting these directories will be handled on a best-effort basis. Code generation tools may be provided where feasible to assist with integration:

- **`app`**: Application-specific files, user customization, and logic.
- **`components`**: User-defined or customized UI components.
- **`test`** (outside covered files): User-modified test cases in unrelated directories.

## Important Notes

1. Modifications to files within the `packages` directory will void warranty coverage for those files.
2. It is recommended to maintain backups of your customizations before proceeding with upgrades.
3. For a step-by-step guide and resources for upgrading supported directories, visit [https://docs.novel.dev/upgrading](https://docs.novel.dev/upgrading).
