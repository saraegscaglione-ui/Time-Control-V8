# TimeControl v8 fixed

Small compatibility patch for Mindustry v8 build 158.

Changes from the uploaded version:
- removes brittle color/label UI calls;
- hides the control when connected as a multiplayer client;
- reapplies the time delta provider after world load;
- packages `mod.json` at zip root level for safer direct import.
