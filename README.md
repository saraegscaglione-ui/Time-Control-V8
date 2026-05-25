# TimeControl v8 fixed

Time Control for Mindustry v8

Adds simple time-speed controls to the HUD, allowing you to slow down or speed up local game time.

Features:
- Speed up and slow down gameplay
- Reset to normal speed
- Designed for Mindustry v8 / build 158
- Intended for single-player and sandbox use

Notes:
This mod changes the local game time delta provider. It is not intended for multiplayer clients and may not affect server-controlled games.

Original mod concept/code by sk7725.
Updated/fixed for Mindustry v8 build 158.

Changes from the uploaded version:
- removes brittle color/label UI calls;
- hides the control when connected as a multiplayer client;
- reapplies the time delta provider after world load;
- packages `mod.json` at zip root level for safer direct import.
