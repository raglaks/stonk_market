# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- First version of stuff.
- Added a preliminary version of a data structure (playerMembersMap) to keep track of AM and PM turnip prices per guild member.
- Added commands to wipe and list the playerMembersMap.
- Added changelog!
- Added DayData class for basic data structure to store AM and PM prices
- Added amprice and pmprice commands

### Changed
- Deprecated price command. Related commands do not work anymore.
- Changed help command printout to reflect commands that do not work with new amprice and pmprice commands.
- Updated help command to reflect current active/working commands (2020-04-09)
- Fixed max command (added it to both price commands and included its global variables in the wipe command) (2020-04-09)

### Deprecated
- Deprecated reset command--wipe command replaced it (2020-04-09)