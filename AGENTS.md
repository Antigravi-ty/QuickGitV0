# Global Instructions
Limit code comments to a strict minimum. Never add comments except on non-trivial algorithms or non-obvious contracts. Do not remove existing comments unless directly related to your change.

## Referring to Code in Bugs, Reviews, and Commit Messages
- **Reference a name, not a position.** Cite a function, class, type, or file name without line numbers or positional phrasing.

## Code Style
- Zero emoji across all source code, UI strings, comments, logs, documentation, and commit messages.
- Every file in this repository must be written strictly in English.
- **Standalone Commits & Zero Legacy Baggage**: Treat every commit as a standalone version. Do not maintain compatibility shims, dead code, or pure re-export barrel files (`index.ts`).
- **Self-Explanatory Naming**: Use clear, semantic identifiers. Single-letter names are forbidden except for standard mathematical or coordinate indices.
- **Cohesive Modules & Narrow Contracts**: Avoid monolithic files and avoid `*Helper.ts` gut-sharing splits. Extract pure `(input) => output` data pipelines or cohesive state slices.

## Architecture Boundaries
- Maintain zero circular dependencies across the codebase.
- **Frontend Unidirectional Layering (`src/`)**: `types` & `config` -> `utils` (pure graph, orphan-component, and layout pipelines) -> `services` (Tauri IPC client) -> `stores` (Zustand state) -> `hooks` & `components` (Primer UI). Lower layers must never import from higher layers.
- **Backend Unidirectional Layering (`src-tauri/src/`)**: `models` (serializable structs) -> `storage` (OS config persistence) & `git_engine` (read-only topology & guarded detached checkout) -> `commands` (Tauri IPC handlers).
- **Local-Only Metadata & Guarded Checkout**: Local base branch selection, commit tags, and notes must be stored exclusively in OS app config storage without mutating Git refs. Detached checkout (`git checkout --detach` + recursive submodule sync) must strictly block when working tree or submodules are dirty.
