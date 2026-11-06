# QuickGitV0

Lightweight Tauri v2 visual Git topology inspector and submodule-aware detached state switcher for Apple Silicon macOS.

## Key Capabilities

- **Local Visual Base Spine**: Pin any branch or commit as the local visual mainline spine (persisted locally in OS app config without altering Git remotes or repository config).
- **Divergent & Unmerged Tip Detection**: Automatically classifies commits and branches relative to the local base into `Mainline Spine`, `Unmerged / Tip`, `Merged`, and `Orphan / Disconnected` groups.
- **Orphan Component 10-Commit Horizon**: Groups disconnected root trees (orphan histories) into independent components sorted by latest commit timestamp. Older orphan trees are automatically hidden once newer orphan trees accumulate >= 10 commits (with a manual toggle to inspect hidden legacy trees).
- **Anti-Overlap Orthogonal Graph**: Renders a clean lane-routed SVG commit graph where the selected base branch stays locked to Lane 0, multi-branch merge fan-ins are badged (`Merge <- ...`), and non-focused cross-lane edges dim automatically.
- **Submodule Version Correlation**: Tracks `.gitmodules` pointers (`src/ui-core`, `public`, etc.) across commits, highlights submodule pointer bumps, and lets you inspect the submodule's own commit graph in place.
- **Guarded Detached Checkout + Recursive Submodule Sync**: Checks out any historical commit in detached HEAD mode and recursively syncs all submodules in one step. Strictly blocks with a diagnostic report if the working tree or any submodule has uncommitted changes.
- **Local-Only Commit Tags & Notes**: Attach custom labels, color badges, and notes to any commit locally without polluting Git refs.

## Development & Slim Build

```bash
pnpm install
pnpm tauri dev
```

To build a slim macOS app bundle and clean Rust target artifacts:

```bash
pnpm run build:app
pnpm run clean:target
```
