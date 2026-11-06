import { AnnotationTone, RepositorySnapshot } from "../types/gitTypes";

export const LANE_COLOR_PALETTE: readonly string[] = [
  "#58a6ff",
  "#3fb950",
  "#d29922",
  "#f778ba",
  "#a371f7",
  "#ff7b72",
  "#39c5cf",
  "#db6d28",
  "#79c0ff",
  "#56d364",
];

export const ANNOTATION_TONE_OPTIONS: readonly {
  id: AnnotationTone;
  label: string;
}[] = [
  { id: "accent", label: "Blue" },
  { id: "success", label: "Green" },
  { id: "attention", label: "Amber" },
  { id: "danger", label: "Red" },
  { id: "done", label: "Purple" },
  { id: "sponsors", label: "Pink" },
];

export const DEFAULT_ORPHAN_HORIZON_COMMIT_LIMIT = 10;

export const DEMO_ROCKET_COMPANION_SNAPSHOT: RepositorySnapshot = {
  "repoPath": "/Users/dev/Workspace/RocketCompanion",
  "repoName": "RocketCompanion",
  "headSha": "28a72291ac45e1c1069de8f39d28b740ae76f6ee",
  "headRefName": "z/phase1-lossless-merge",
  "isDetachedHead": false,
  "branches": [
    {
      "name": "origin/z/fix-replay-intervene",
      "fullRef": "refs/remotes/origin/z/fix-replay-intervene",
      "commitSha": "28a72291ac45e1c1069de8f39d28b740ae76f6ee",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793939860,
      "subject": "fix(replay): fix non-POV disappear intervention and POV car selection"
    },
    {
      "name": "origin/z/gen3-ws2-network",
      "fullRef": "refs/remotes/origin/z/gen3-ws2-network",
      "commitSha": "071b4d0b0f145c13cdcaad4ae6fb4a58fad88d27",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793939764,
      "subject": "refactor(network): resolve all Gen-3 architecture radar violations in src/network"
    },
    {
      "name": "origin/z/merge-gen3-ws1-ws4-ws5",
      "fullRef": "refs/remotes/origin/z/merge-gen3-ws1-ws4-ws5",
      "commitSha": "0370bf1897bfb0fc842ea288dc3dda0ac7b5338f",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793939499,
      "subject": "chore(merge): unify Gen-3 radar workstreams WS1, WS4, and WS5"
    },
    {
      "name": "origin/z/merge-nametag-freeplay-trail-and-training-cam",
      "fullRef": "refs/remotes/origin/z/merge-nametag-freeplay-trail-and-training-cam",
      "commitSha": "3dd58c6e70bbb3df412e1cbbe9ebf4df115b0d53",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793939312,
      "subject": "fix(static-training,camera): preserve editor ball/car camera override in static-training-pack mode"
    },
    {
      "name": "origin/z/fix-replay-importer-multi-car-sync",
      "fullRef": "refs/remotes/origin/z/fix-replay-importer-multi-car-sync",
      "commitSha": "f45c896be3631d95dfbb9c40176e11808ff55246",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793938236,
      "subject": "fix(replay): preserve multi-car topology during replay import and playback"
    },
    {
      "name": "origin/z/fix-merge-and-static-training-team-mirror",
      "fullRef": "refs/remotes/origin/z/fix-merge-and-static-training-team-mirror",
      "commitSha": "5008d5a501a9677f7afeac3f666f034b16578951",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793937204,
      "subject": "feat(static-training): add RLRCSPack goal velocity check, preferred team invert & F to mirror"
    },
    {
      "name": "origin/z/name-tag-merge-and-dev-quick-actions",
      "fullRef": "refs/remotes/origin/z/name-tag-merge-and-dev-quick-actions",
      "commitSha": "6bd41edd3700dec26783f73972326f93f15d490e",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793935433,
      "subject": "feat(name-tag): merge Name Tag system, bottom-up offscreen border & Dev Quick Actions"
    },
    {
      "name": "origin/z/fix-freeplay-reconciler-audio-jump",
      "fullRef": "refs/remotes/origin/z/fix-freeplay-reconciler-audio-jump",
      "commitSha": "1e25ad8c89ad1669285df0b456def4ca7eaf4dea",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793933751,
      "subject": "fix(runtime,network): decouple single-player freeplay from loopback reconciler and fix jump/boost reconciliation artifacts"
    },
    {
      "name": "origin/z/supersonic-wheel-trail-calibrated-preset",
      "fullRef": "refs/remotes/origin/z/supersonic-wheel-trail-calibrated-preset",
      "commitSha": "c662f86866091ec5149fdfa3e452702a8468323f",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793932164,
      "subject": "feat(entities,ui-core): merge f15b0139 Supersonic Wheel Trail effect and move to Calibrated Presets"
    },
    {
      "name": "origin/z/gen3-ws1-replay-and-physics",
      "fullRef": "refs/remotes/origin/z/gen3-ws1-replay-and-physics",
      "commitSha": "a520624f73a6286e8c77428454604deb54ab66e2",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793931337,
      "subject": "refactor(replay,physics,utils): resolve all 47 Gen-3 radar violations in WS1"
    },
    {
      "name": "origin/z/gen3-ws4-entities-camera-audio-ai",
      "fullRef": "refs/remotes/origin/z/gen3-ws4-entities-camera-audio-ai",
      "commitSha": "51345d555f13ac3f57724fbf2e86b8ec4f327193",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793930732,
      "subject": "refactor(ws4): resolve all 43 Gen-3 radar violations in entities, camera, audio, and ai"
    },
    {
      "name": "origin/z/gen3-ws5-ui-core",
      "fullRef": "refs/remotes/origin/z/gen3-ws5-ui-core",
      "commitSha": "a48ef1bf51b50678cccc65cec1bc8a14c841975b",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793930187,
      "subject": "chore(ui-core): update submodule to z/gen3-ws5-ui-core (0 any violations)"
    },
    {
      "name": "origin/z/phase1-lossless-merge",
      "fullRef": "refs/remotes/origin/z/phase1-lossless-merge",
      "commitSha": "aa5bd34dae539a37f0d5f5b93d861be619d667b6",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793929140,
      "subject": "wtf new lock?"
    },
    {
      "name": "origin/HEAD",
      "fullRef": "refs/remotes/origin/HEAD",
      "commitSha": "aa5bd34dae539a37f0d5f5b93d861be619d667b6",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793929140,
      "subject": "wtf new lock?"
    },
    {
      "name": "origin/z/replay-to-rcs-importer-sync",
      "fullRef": "refs/remotes/origin/z/replay-to-rcs-importer-sync",
      "commitSha": "24f420ddf5a904a5fbff4b976a63b4bbe95ddacc",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793898717,
      "subject": "Merge commit da2a332f into z/replay-to-rcs-importer-sync"
    },
    {
      "name": "origin/z/merge-da2a332f-and-fix-training-navigator",
      "fullRef": "refs/remotes/origin/z/merge-da2a332f-and-fix-training-navigator",
      "commitSha": "ded34120b3f0dc1671f23a91ea10ceaf2a736171",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793897141,
      "subject": "feat(static-training): merge da2a332f with a1fe7a6, fix Training Pack Navigator classification, UI & sizing"
    },
    {
      "name": "origin/z/workstream-a-replay-mode-deproxy",
      "fullRef": "refs/remotes/origin/z/workstream-a-replay-mode-deproxy",
      "commitSha": "3640c484d85652a4543284cf48cc7d4bb6c0503f",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793896989,
      "subject": "refactor(replay,modes): remove proxy getters/setters and encapsulate mode lifecycle"
    },
    {
      "name": "origin/z/merge-ui-tuner-1b4c822",
      "fullRef": "refs/remotes/origin/z/merge-ui-tuner-1b4c822",
      "commitSha": "a04997be7d8ec5ce3eece52c4b16972578e3390c",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793896149,
      "subject": "refactor(ui): selectively merge RCUITuner 1b4c822 UI architecture improvements"
    },
    {
      "name": "origin/z/workstream-b-network-runtime-decouple",
      "fullRef": "refs/remotes/origin/z/workstream-b-network-runtime-decouple",
      "commitSha": "56964bb549626dc2b7db56d7fa5914a0a3d5fdff",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793895125,
      "subject": "refactor(network,runtime): de-proxy coordinators and decouple WebRTC/server ports"
    },
    {
      "name": "origin/z/workstream-d-ui-cleanup",
      "fullRef": "refs/remotes/origin/z/workstream-d-ui-cleanup",
      "commitSha": "ab9ce588dc496cb77630dc4cff4ec7306eb16918",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793894892,
      "subject": "refactor(ui-system): migrate DevSignalingLab to runtime bridge and align UI presets/routes"
    },
    {
      "name": "origin/z/replay-to-rcs-importer",
      "fullRef": "refs/remotes/origin/z/replay-to-rcs-importer",
      "commitSha": "3c4db9874af8adfe404c856459ece214805416d1",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793893804,
      "subject": "fix(replay,trajectory): de-jitter .replay 120Hz interpolation, fix NetStream ClassNetCache & roster/trajectory bugs"
    },
    {
      "name": "origin/z/gen3-architecture-radar",
      "fullRef": "refs/remotes/origin/z/gen3-architecture-radar",
      "commitSha": "e17d246582537a7b7dce7fbe70a5cf97dc4fb991",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793893474,
      "subject": "feat(radar): upgrade scripts/radar.ts to Generation-3 Semantic Architecture Radar"
    },
    {
      "name": "origin/z/dev-sandbox-tem-pack-importer",
      "fullRef": "refs/remotes/origin/z/dev-sandbox-tem-pack-importer",
      "commitSha": "a1fe7a642d5b9be87d723374d0e5ce63137e4e82",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793893239,
      "subject": "feat(static-training): reset boost pads on shot reset, record waiting time in replay & sync UI"
    },
    {
      "name": "origin/z/workstream-c-camera-kickoff-arena-slim",
      "fullRef": "refs/remotes/origin/z/workstream-c-camera-kickoff-arena-slim",
      "commitSha": "f9b74b512236bc9776c6febe2f740701a712fddf",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793893129,
      "subject": "refactor(camera,kickoff,entities): slim high-waterline controllers, merge micro-files, and eliminate untyped any"
    },
    {
      "name": "origin/z/name-tag-aerial-climb-tracker-and-inward-ring",
      "fullRef": "refs/remotes/origin/z/name-tag-aerial-climb-tracker-and-inward-ring",
      "commitSha": "11eef892205e22701b597a70668040add3eb04df",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793892912,
      "subject": "feat(name-tag): background aerial climb tracker, off-screen inward ring & POV action simulator"
    },
    {
      "name": "origin/z/trajectory-anomaly-debug-and-seam-fix",
      "fullRef": "refs/remotes/origin/z/trajectory-anomaly-debug-and-seam-fix",
      "commitSha": "bb60a19716a190dfc086be8a3126d1b8d0c852d5",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793892076,
      "subject": "feat(trajectory): add dual-space anomaly debug exporter and fix curved-seam drift"
    },
    {
      "name": "origin/z/supersonic-wheel-trail-occlusion-pass",
      "fullRef": "refs/remotes/origin/z/supersonic-wheel-trail-occlusion-pass",
      "commitSha": "f15b0139730e1c192fc56064cf3ad360b020a98b",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793891796,
      "subject": "feat(entities): add dual-pass semi-transparent border occlusion for supersonic wheel trails"
    },
    {
      "name": "origin/z/radar-guardrails-and-lockfile-cleanup",
      "fullRef": "refs/remotes/origin/z/radar-guardrails-and-lockfile-cleanup",
      "commitSha": "eeae94774b3c1202ac66bdcb8da308c83205583d",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793891705,
      "subject": "chore(radar,lockfile): unify npm lockfile and upgrade Gen-2 architecture radar guardrails"
    },
    {
      "name": "origin/z/fix-stage4-asset-stream-and-vite-restart",
      "fullRef": "refs/remotes/origin/z/fix-stage4-asset-stream-and-vite-restart",
      "commitSha": "da2a332ffba8f5abaf5944c721a0be15d352fec8",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793889089,
      "subject": "fix(bootstrap,vite): eliminate Stage 4 60% asset stream hang and fix worktree auto-restart"
    },
    {
      "name": "origin/z/supersonic-wheel-trail-pov-and-hinge",
      "fullRef": "refs/remotes/origin/z/supersonic-wheel-trail-pov-and-hinge",
      "commitSha": "c612cc6b1046db346a1a23da7d657a27e8c98e33",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793885817,
      "subject": "feat(entities): enforce flat POV trail, ground-hinged upright stand, and POV upright preview"
    },
    {
      "name": "origin/z/name-tag-offscreen-indicators-and-aerial-glow",
      "fullRef": "refs/remotes/origin/z/name-tag-offscreen-indicators-and-aerial-glow",
      "commitSha": "ce24999a5304f147a2cb8bd862e6b74ff81deb6b",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793883618,
      "subject": "feat(name-tag): support off-screen directional boost indicators, ROI clamping, and aerial climb outer glow"
    },
    {
      "name": "origin/z/supersonic-wheel-trail-refinement",
      "fullRef": "refs/remotes/origin/z/supersonic-wheel-trail-refinement",
      "commitSha": "65b0123a2249ea6a8ad8d6899f5ca1f2d651f8b4",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793882376,
      "subject": "feat(entities): fix -1t trail head jitter, add view-adaptive camera tilt and 3-point Bezier gradient"
    },
    {
      "name": "origin/z/fix-floating-window-adaptive-bounds",
      "fullRef": "refs/remotes/origin/z/fix-floating-window-adaptive-bounds",
      "commitSha": "954f57cc7a373058c4d70a8052f9d27ffc45b917",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793879378,
      "subject": "fix(ui-core): sync 6D floating window adaptive boundary truncation and auto-shrink"
    },
    {
      "name": "origin/z/supersonic-wheel-trail",
      "fullRef": "refs/remotes/origin/z/supersonic-wheel-trail",
      "commitSha": "38d7da79971cfeccb74d9ae1782e01bcbdd0a17c",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793877209,
      "subject": "feat(entities): implement dual rear-wheel Supersonic Wheel Trail system and tuner"
    },
    {
      "name": "origin/z/unified-refactor-merge",
      "fullRef": "refs/remotes/origin/z/unified-refactor-merge",
      "commitSha": "99a7433ae6b3798060dd948d10a7d13fd13a2ff0",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793876199,
      "subject": "refactor(merge): unify all 9 branches with cloud-profile-refinement (714cdbf4) and decouple MQTT transport"
    },
    {
      "name": "origin/z/training-mode-scope-and-pov-hitbox",
      "fullRef": "refs/remotes/origin/z/training-mode-scope-and-pov-hitbox",
      "commitSha": "d182fcdd0ff21f574cf3b2b03acdf0b57873d151",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793870537,
      "subject": "fix(training): isolate Free Play and Training mode scopes and restrict POV hitbox rendering"
    },
    {
      "name": "origin/z/unison-loopback-freeplay",
      "fullRef": "refs/remotes/origin/z/unison-loopback-freeplay",
      "commitSha": "053188b19528c5ab1a9ae11e778bdf35e789fbd6",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793868838,
      "subject": "feat(network,freeplay): unify Free Play onto loopback AuthoritativeServerHost & sync replay frames"
    },
    {
      "name": "origin/z/decouple-network-and-physics",
      "fullRef": "refs/remotes/origin/z/decouple-network-and-physics",
      "commitSha": "4513d3a370ae82b91480d86ded0dfd6cdddec36e",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793867560,
      "subject": "refactor(network,physics): decouple oversized server, client, and physics modules"
    },
    {
      "name": "origin/z/decouple-runtime-and-ports",
      "fullRef": "refs/remotes/origin/z/decouple-runtime-and-ports",
      "commitSha": "0e0ad86a663e115820831eb191e8f8b1be616422",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793867475,
      "subject": "refactor(game): decouple runtime domain ports, subsystem state, and re-exports"
    },
    {
      "name": "origin/z/cloud-profile-refinement",
      "fullRef": "refs/remotes/origin/z/cloud-profile-refinement",
      "commitSha": "714cdbf40ed138e7d87de5f0fdc327456788588b",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793867283,
      "subject": "feat(cloud-profile): real-time dev slot watch resilience & UI submodule bump"
    },
    {
      "name": "origin/z/clean-entities-and-audio",
      "fullRef": "refs/remotes/origin/z/clean-entities-and-audio",
      "commitSha": "4b44eb334f9827d9269c0baab692e815eee6fc15",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793866891,
      "subject": "refactor(entities,audio): clean ArenaConstants, type entities, and consolidate UI click audio"
    },
    {
      "name": "origin/z/clean-ui-core-and-routes",
      "fullRef": "refs/remotes/origin/z/clean-ui-core-and-routes",
      "commitSha": "807a4ce934f486c5a7d6c2074a75b9344cb8968f",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793866880,
      "subject": "refactor(ui-system,ui-core): clean UI routes, rename exhibitionParentRef, and bump RCUIModule to 4e832ae3"
    },
    {
      "name": "origin/z/decouple-replay-and-lab",
      "fullRef": "refs/remotes/origin/z/decouple-replay-and-lab",
      "commitSha": "fd40033b8757c68e75478c741e287ba7fb450a74",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793866176,
      "subject": "refactor(replay,modes,ai): decouple replay state types, podium lab subcontroller, and kickoff primitives"
    },
    {
      "name": "origin/z/name-tag-boost-progress-and-ball-occlusion",
      "fullRef": "refs/remotes/origin/z/name-tag-boost-progress-and-ball-occlusion",
      "commitSha": "648120ad7c6b594da7897e7e7f8f2d7033f8230c",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793865534,
      "subject": "feat(name-tag): sync 4 boost progress modes, 2D ball occlusion & calibrated defaults from RCUITuner 1b4c822"
    },
    {
      "name": "origin/z/merge-b39f51aa-6cbe228f",
      "fullRef": "refs/remotes/origin/z/merge-b39f51aa-6cbe228f",
      "commitSha": "89c1764f8356c96272fd1be9a31cfb351ee423ef",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793863400,
      "subject": "chore(merge): merge 6cbe228f (z/signaling-identity-and-relay-lifecycle) into b39f51aa"
    },
    {
      "name": "origin/z/merge-phase2-unison-loopback-26b6f527",
      "fullRef": "refs/remotes/origin/z/merge-phase2-unison-loopback-26b6f527",
      "commitSha": "b39f51aac05056fce36752344377df87e252f6e1",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793860493,
      "subject": "feat(network,replay): merge Phase 2 Unison Loopback Authority (bd145557 + 1b2aef37) onto 26b6f527"
    },
    {
      "name": "origin/z/unison-loopback-authority",
      "fullRef": "refs/remotes/origin/z/unison-loopback-authority",
      "commitSha": "bd145557ede97be303ccb4eb05cb469271d2c29e",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793856135,
      "subject": "feat(network,replay): Phase 2 Unison Loopback Authority, SYS_CTRL_* signals, and 30s FIFO RingBuffer"
    },
    {
      "name": "origin/z/cloud-profile-sync-and-remote-tuner",
      "fullRef": "refs/remotes/origin/z/cloud-profile-sync-and-remote-tuner",
      "commitSha": "0e505a4810efeaff6bcf8f54b9f1926a23b6ddd3",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793855570,
      "subject": "feat(sync): implement EMQX Cloud Profile Sync and Developer Remote Profile Tuner"
    },
    {
      "name": "origin/z/signaling-identity-and-relay-lifecycle",
      "fullRef": "refs/remotes/origin/z/signaling-identity-and-relay-lifecycle",
      "commitSha": "6cbe228f4ea50bdb2518fcb4c1334a6971fd7bfb",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793855395,
      "subject": "chore(ui-core): bump RCUIModule submodule to b41e2979"
    },
    {
      "name": "origin/z/old-uni",
      "fullRef": "refs/remotes/origin/z/old-uni",
      "commitSha": "1b2aef371aab9b9323bfd7377bbd8c23ba8ed8b9",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793854382,
      "subject": "feat(phase2): unify 90s FIFO rolling replay buffer, training ruleset & loopback takeover"
    },
    {
      "name": "origin/z/merge-four-post-7b4785e6",
      "fullRef": "refs/remotes/origin/z/merge-four-post-7b4785e6",
      "commitSha": "26b6f527dae13d301d5cffd764d429fe1510198e",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793853541,
      "subject": "chore(merge,security): merge 7b4785e6, 14d59a3d, 292b25ae, and 00030758 and enforce zero-credential invariants"
    },
    {
      "name": "origin/z/sync-with-14d59a3d",
      "fullRef": "refs/remotes/origin/z/sync-with-14d59a3d",
      "commitSha": "654b88228d86f0a65e805e498a2dcd21365cee2c",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793853492,
      "subject": "chore(merge): sync 2fa4ac84 with 14d59a3d and align pure module naming"
    },
    {
      "name": "origin/z/sanitize-private-profile-repo-discovery",
      "fullRef": "refs/remotes/origin/z/sanitize-private-profile-repo-discovery",
      "commitSha": "14d59a3d597108cbbd4a4095320afee56ce18656",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793852409,
      "subject": "fix(security,scripts): remove private profile repo name heuristics and rely on content hash"
    },
    {
      "name": "origin/z/shader-prewarm-and-narrow-decouple",
      "fullRef": "refs/remotes/origin/z/shader-prewarm-and-narrow-decouple",
      "commitSha": "7b4785e61580688a44d955b8483cd74fc6e6fd8d",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793852023,
      "subject": "perf(shader,freeplay,network): eliminate replay shader hitch & narrow-waist decouple"
    },
    {
      "name": "origin/z/fix-exp-multibots-and-botpack-perf",
      "fullRef": "refs/remotes/origin/z/fix-exp-multibots-and-botpack-perf",
      "commitSha": "292b25ae679d427bc91f63311ffb31c8318bb804",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793851235,
      "subject": "fix(exp-modes): decouple Multi-Bots vs Bot Pack #9700488 and fix FPS degradation"
    },
    {
      "name": "origin/z/merge-5722640-ef6b467",
      "fullRef": "refs/remotes/origin/z/merge-5722640-ef6b467",
      "commitSha": "595364386a5b1d6f97433620593998e2b064a10e",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793846887,
      "subject": "chore(merge): merge ef6b4671 into 57226403"
    },
    {
      "name": "origin/z/scenario-telemetry-baseline",
      "fullRef": "refs/remotes/origin/z/scenario-telemetry-baseline",
      "commitSha": "bdb5d5c902fac5e0170a05c4480dfe238a0f44c3",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793846815,
      "subject": "feat(scenario): implement Phase 1 deterministic fast-forward baseline & 6-car loopback harness"
    },
    {
      "name": "origin/z/fix-room-code-stability-and-touch-bot-team",
      "fullRef": "refs/remotes/origin/z/fix-room-code-stability-and-touch-bot-team",
      "commitSha": "00030758ec5d2af8f8bd29de60f2ddde61d37498",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793846738,
      "subject": "fix(network,input): preserve canonical host room code and resolve touch bot team accurately"
    },
    {
      "name": "origin/z/audio-profiles-and-merge-fa46bb81",
      "fullRef": "refs/remotes/origin/z/audio-profiles-and-merge-fa46bb81",
      "commitSha": "572264035ccd8d78c039c9fa823373b31f7d1124",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793845037,
      "subject": "chore(merge): merge fa46bb81 into 03640b19 and calibrate spatial attenuation profiles"
    },
    {
      "name": "origin/z/merge-clean-six-post-f0501b12",
      "fullRef": "refs/remotes/origin/z/merge-clean-six-post-f0501b12",
      "commitSha": "ef6b4671b038a313922ab3e5e926405872720be3",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793844647,
      "subject": "chore(merge): merge 4766ef81 (z/merge-clean-five-post-f0501b12) into fa46bb81 (z/merge-clean-six-post-f0501b12)"
    },
    {
      "name": "origin/z/fix-bootstrap-and-goal-hitch",
      "fullRef": "refs/remotes/origin/z/fix-bootstrap-and-goal-hitch",
      "commitSha": "fa46bb81a25113c4339eda898e6818620ed7c4f9",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793837964,
      "subject": "fix(bootstrap,replay): eliminate 88%/40% loading hangs and Freeplay goal replay freeze"
    },
    {
      "name": "origin/z/merge-clean-five-post-f0501b12",
      "fullRef": "refs/remotes/origin/z/merge-clean-five-post-f0501b12",
      "commitSha": "4766ef81116e53878291617d3ea2f039e1d0d0dd",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793837903,
      "subject": "chore(merge): merge c06716bc (z/zero-hardcoded-broker-and-neutral-ball-terms) into z/merge-clean-five-post-f0501b12"
    },
    {
      "name": "origin/z/merge-four-post-f0501b12",
      "fullRef": "refs/remotes/origin/z/merge-four-post-f0501b12",
      "commitSha": "03059f4861706e93e0c34b5ad89332c5b1cab365",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793837902,
      "subject": "chore(merge): merge 7b274b7b, 0c423491, 4c6f3f88, and 73038797 into z/merge-four-post-f0501b12"
    },
    {
      "name": "origin/z/merge-audio-spatial-eq-lod",
      "fullRef": "refs/remotes/origin/z/merge-audio-spatial-eq-lod",
      "commitSha": "03640b19efa92cb54d54202989de57558e174068",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793836766,
      "subject": "chore(merge): merge 31b9360f, c570f727, 11b06467, and 65be34ec into z/merge-audio-spatial-eq-lod"
    },
    {
      "name": "origin/z/audio/master-bus-eq-and-dynamics",
      "fullRef": "refs/remotes/origin/z/audio/master-bus-eq-and-dynamics",
      "commitSha": "31b9360fcecccd9a82db12519659e39fbd494bd2",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793808994,
      "subject": "feat(audio): implement MasterAcousticProcessor 3-band EQ and dynamics pipeline"
    },
    {
      "name": "origin/z/audio/distance-tuner-and-3d-gizmo",
      "fullRef": "refs/remotes/origin/z/audio/distance-tuner-and-3d-gizmo",
      "commitSha": "c570f7276476f0832380299af9a5c272c8a52879",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793808708,
      "subject": "feat(audio,arena): add 3D spatial audio attenuation visualizer and distance tuner"
    },
    {
      "name": "origin/z/aggressive-bootstrap-and-dev-lock",
      "fullRef": "refs/remotes/origin/z/aggressive-bootstrap-and-dev-lock",
      "commitSha": "7b274b7b1ba05a2672129ec3dc859d87572d33fb",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793808701,
      "subject": "perf(bootstrap): streamline Free Play bootstrap and preload all deferred assets & workers"
    },
    {
      "name": "origin/z/audio/incident-spatial-routing",
      "fullRef": "refs/remotes/origin/z/audio/incident-spatial-routing",
      "commitSha": "11b064678491d72fb73e421082d02166a287aef1",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793808681,
      "subject": "feat(audio): calibrate incident spatial routing, kinetic modulation & slot priority"
    },
    {
      "name": "origin/z/audio/multi-car-engine-lod-and-culling",
      "fullRef": "refs/remotes/origin/z/audio/multi-car-engine-lod-and-culling",
      "commitSha": "65be34eccd2ef2b225c9adfbc792ad05715e1e73",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793808669,
      "subject": "feat(audio): add multi-car engine LOD, Top-K distance culling, and loop hibernation"
    },
    {
      "name": "origin/z/sync-with-f0501b12",
      "fullRef": "refs/remotes/origin/z/sync-with-f0501b12",
      "commitSha": "2fa4ac847817f7184e67941ae0923fbb4de2f1fd",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793808639,
      "subject": "chore(merge): sync 84216d16 with f0501b12 and align pure pipeline naming & waterlines"
    },
    {
      "name": "origin/z/baseline-precheck",
      "fullRef": "refs/remotes/origin/z/baseline-precheck",
      "commitSha": "0c423491b4c21cd10b93054845400da1eeaac0c5",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793806733,
      "subject": "chore(baseline): fix typecheck error, unify roomCodeConnectivityCodec SSOT, and harden radar pre-checks"
    },
    {
      "name": "origin/z/decouple-transport-diagnostics-and-profile-sync",
      "fullRef": "refs/remotes/origin/z/decouple-transport-diagnostics-and-profile-sync",
      "commitSha": "4c6f3f883d76e67f7bbc2935ddf4efa44272b4d9",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793806449,
      "subject": "refactor(transport,scripts): isolate signaling diagnostics and decouple profile sync CLI"
    },
    {
      "name": "origin/z/zero-hardcoded-broker-and-neutral-ball-terms",
      "fullRef": "refs/remotes/origin/z/zero-hardcoded-broker-and-neutral-ball-terms",
      "commitSha": "c06716bc6e820a44a58c3c9602c29450156b8b27",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793806402,
      "subject": "fix(signaling,docs): parameterize public fallback broker and enforce neutral ball terminology"
    },
    {
      "name": "origin/z/audio/spatial-profiles-foundation",
      "fullRef": "refs/remotes/origin/z/audio/spatial-profiles-foundation",
      "commitSha": "29584755401ecaafaa736251d59415bddc4c2f23",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793806013,
      "subject": "feat(audio): establish spatial attenuation profiles foundation and clean up legacy state audio"
    },
    {
      "name": "origin/z/training-pack-and-syncall-decouple",
      "fullRef": "refs/remotes/origin/z/training-pack-and-syncall-decouple",
      "commitSha": "84216d16c57f5f1beac3491be79348316afc47dc",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793804868,
      "subject": "feat(training,syncall): fix dynamic training mode exit, decouple focus-only camera sync & radar"
    },
    {
      "name": "origin/z/fix-kickoff-countdown-audio",
      "fullRef": "refs/remotes/origin/z/fix-kickoff-countdown-audio",
      "commitSha": "73038797d89e7e4d0e29c17edb31da0d20e1c43b",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793804677,
      "subject": "fix(audio): sync matchPhase before kickoff/endgame audio cues and decouple signal handlers"
    },
    {
      "name": "origin/z/old-uni",
      "fullRef": "refs/remotes/origin/z/old-uni",
      "commitSha": "78423e76217b034a9876b239372b84a3fb6e9939",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "timestamp": 1793600120,
      "subject": "chore(orphan-v1): legacy pre-sanitization baseline snapshot"
    }
  ],
  "submodules": [
    {
      "name": "src/ui-core",
      "path": "src/ui-core",
      "url": "https://github.com/Antigravi-ty/RCUIModule.git",
      "branch": "main",
      "currentWorktreeSha": "b9f0af1403bbb45348fd813883c0694a2d901296",
      "isDirty": false
    },
    {
      "name": "public",
      "path": "public",
      "url": "../RocketCompanionStatics.git",
      "branch": "main",
      "currentWorktreeSha": "972fdef7416bdaafea1069cef0a601f8009d8706",
      "isDirty": false
    }
  ],
  "commits": [
    {
      "sha": "28a72291ac45e1c1069de8f39d28b740ae76f6ee",
      "shortSha": "28a7229",
      "parents": [
        "24f420ddf5a904a5fbff4b976a63b4bbe95ddacc"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793939860,
      "subject": "fix(replay): fix non-POV disappear intervention and POV car selection",
      "refs": [
        "origin/z/fix-replay-intervene"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "b9f0af1403bbb45348fd813883c0694a2d901296"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "071b4d0b0f145c13cdcaad4ae6fb4a58fad88d27",
      "shortSha": "071b4d0",
      "parents": [
        "50065ba9767494061b16c89c4b38fa7c25d39a84"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793939764,
      "subject": "refactor(network): resolve all Gen-3 architecture radar violations in src/network",
      "refs": [
        "origin/z/gen3-ws2-network"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "755cf7375c6ad4277709289dc530a5b9bf59c84f"
      },
      "changedSubmodules": []
    },
    {
      "sha": "0370bf1897bfb0fc842ea288dc3dda0ac7b5338f",
      "shortSha": "0370bf1",
      "parents": [
        "50065ba9767494061b16c89c4b38fa7c25d39a84",
        "a520624f73a6286e8c77428454604deb54ab66e2",
        "51345d555f13ac3f57724fbf2e86b8ec4f327193",
        "a48ef1bf51b50678cccc65cec1bc8a14c841975b"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793939499,
      "subject": "chore(merge): unify Gen-3 radar workstreams WS1, WS4, and WS5",
      "refs": [
        "origin/z/merge-gen3-ws1-ws4-ws5"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "4c07185b22e004e8045f491607ad2ac04c5587ae"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "3dd58c6e70bbb3df412e1cbbe9ebf4df115b0d53",
      "shortSha": "3dd58c6",
      "parents": [
        "07414349c40563fc0432bfe973de7f716a85bc4f"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793939312,
      "subject": "fix(static-training,camera): preserve editor ball/car camera override in static-training-pack mode",
      "refs": [
        "origin/z/merge-nametag-freeplay-trail-and-training-cam"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "2acfe7316b978160cd3d7f3aa9e7b02623911182"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "07414349c40563fc0432bfe973de7f716a85bc4f",
      "shortSha": "0741434",
      "parents": [
        "6bd41edd3700dec26783f73972326f93f15d490e",
        "1e25ad8c89ad1669285df0b456def4ca7eaf4dea",
        "c662f86866091ec5149fdfa3e452702a8468323f"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793939311,
      "subject": "chore(merge): merge 6bd41edd (Name Tag & Dev Quick Actions), 1e25ad8c (Freeplay decouple), and c662f868 (Supersonic Trail)",
      "refs": [],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "a16403f76ba486179593354c6a6826f238420e7b"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "f45c896be3631d95dfbb9c40176e11808ff55246",
      "shortSha": "f45c896",
      "parents": [
        "24f420ddf5a904a5fbff4b976a63b4bbe95ddacc"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793938236,
      "subject": "fix(replay): preserve multi-car topology during replay import and playback",
      "refs": [
        "origin/z/fix-replay-importer-multi-car-sync"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "49427e777137027067c25274ab59aba028f1a1a9"
      },
      "changedSubmodules": []
    },
    {
      "sha": "5008d5a501a9677f7afeac3f666f034b16578951",
      "shortSha": "5008d5a",
      "parents": [
        "ded34120b3f0dc1671f23a91ea10ceaf2a736171"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793937204,
      "subject": "feat(static-training): add RLRCSPack goal velocity check, preferred team invert & F to mirror",
      "refs": [
        "origin/z/fix-merge-and-static-training-team-mirror"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "b6dccb672f7e0dab19d0c14db361054e58956ac6"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "6bd41edd3700dec26783f73972326f93f15d490e",
      "shortSha": "6bd41ed",
      "parents": [
        "aa5bd34dae539a37f0d5f5b93d861be619d667b6"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793935433,
      "subject": "feat(name-tag): merge Name Tag system, bottom-up offscreen border & Dev Quick Actions",
      "refs": [
        "origin/z/name-tag-merge-and-dev-quick-actions"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "816b7c908e262f8932eb2e908a2ba758fb992ca1"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "1e25ad8c89ad1669285df0b456def4ca7eaf4dea",
      "shortSha": "1e25ad8",
      "parents": [
        "aa5bd34dae539a37f0d5f5b93d861be619d667b6"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793933751,
      "subject": "fix(runtime,network): decouple single-player freeplay from loopback reconciler and fix jump/boost reconciliation artifacts",
      "refs": [
        "origin/z/fix-freeplay-reconciler-audio-jump"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "755cf7375c6ad4277709289dc530a5b9bf59c84f"
      },
      "changedSubmodules": []
    },
    {
      "sha": "c662f86866091ec5149fdfa3e452702a8468323f",
      "shortSha": "c662f86",
      "parents": [
        "aa5bd34dae539a37f0d5f5b93d861be619d667b6",
        "f15b0139730e1c192fc56064cf3ad360b020a98b"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793932164,
      "subject": "feat(entities,ui-core): merge f15b0139 Supersonic Wheel Trail effect and move to Calibrated Presets",
      "refs": [
        "origin/z/supersonic-wheel-trail-calibrated-preset"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "6f8acc2a89fadcf265ae54c5b7afd440ff7d91cd"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "a520624f73a6286e8c77428454604deb54ab66e2",
      "shortSha": "a520624",
      "parents": [
        "50065ba9767494061b16c89c4b38fa7c25d39a84"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793931337,
      "subject": "refactor(replay,physics,utils): resolve all 47 Gen-3 radar violations in WS1",
      "refs": [
        "origin/z/gen3-ws1-replay-and-physics"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "755cf7375c6ad4277709289dc530a5b9bf59c84f"
      },
      "changedSubmodules": []
    },
    {
      "sha": "51345d555f13ac3f57724fbf2e86b8ec4f327193",
      "shortSha": "51345d5",
      "parents": [
        "50065ba9767494061b16c89c4b38fa7c25d39a84"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793930732,
      "subject": "refactor(ws4): resolve all 43 Gen-3 radar violations in entities, camera, audio, and ai",
      "refs": [
        "origin/z/gen3-ws4-entities-camera-audio-ai"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "755cf7375c6ad4277709289dc530a5b9bf59c84f"
      },
      "changedSubmodules": []
    },
    {
      "sha": "a48ef1bf51b50678cccc65cec1bc8a14c841975b",
      "shortSha": "a48ef1b",
      "parents": [
        "50065ba9767494061b16c89c4b38fa7c25d39a84"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793930187,
      "subject": "chore(ui-core): update submodule to z/gen3-ws5-ui-core (0 any violations)",
      "refs": [
        "origin/z/gen3-ws5-ui-core"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "4c07185b22e004e8045f491607ad2ac04c5587ae"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "aa5bd34dae539a37f0d5f5b93d861be619d667b6",
      "shortSha": "aa5bd34",
      "parents": [
        "50065ba9767494061b16c89c4b38fa7c25d39a84"
      ],
      "authorName": "Default User",
      "authorEmail": "29165094+MaBoCoMark@users.noreply.github.com",
      "timestamp": 1793929140,
      "subject": "wtf new lock?",
      "refs": [
        "HEAD -> z/phase1-lossless-merge",
        "origin/z/phase1-lossless-merge",
        "origin/HEAD"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "755cf7375c6ad4277709289dc530a5b9bf59c84f"
      },
      "changedSubmodules": []
    },
    {
      "sha": "50065ba9767494061b16c89c4b38fa7c25d39a84",
      "shortSha": "50065ba",
      "parents": [
        "eeae94774b3c1202ac66bdcb8da308c83205583d",
        "3640c484d85652a4543284cf48cc7d4bb6c0503f",
        "56964bb549626dc2b7db56d7fa5914a0a3d5fdff",
        "f9b74b512236bc9776c6febe2f740701a712fddf",
        "ab9ce588dc496cb77630dc4cff4ec7306eb16918",
        "bb60a19716a190dfc086be8a3126d1b8d0c852d5",
        "e17d246582537a7b7dce7fbe70a5cf97dc4fb991"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793927215,
      "subject": "chore(merge): unify Phase 1 lossless workstreams (WS-A, WS-B, WS-C-slim, WS-D), trajectory fix, and Gen-3 radar",
      "refs": [],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "755cf7375c6ad4277709289dc530a5b9bf59c84f"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "24f420ddf5a904a5fbff4b976a63b4bbe95ddacc",
      "shortSha": "24f420d",
      "parents": [
        "3c4db9874af8adfe404c856459ece214805416d1",
        "da2a332ffba8f5abaf5944c721a0be15d352fec8"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793898717,
      "subject": "Merge commit da2a332f into z/replay-to-rcs-importer-sync",
      "refs": [
        "origin/z/replay-to-rcs-importer-sync"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "49427e777137027067c25274ab59aba028f1a1a9"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "ded34120b3f0dc1671f23a91ea10ceaf2a736171",
      "shortSha": "ded3412",
      "parents": [
        "a1fe7a642d5b9be87d723374d0e5ce63137e4e82",
        "da2a332ffba8f5abaf5944c721a0be15d352fec8"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793897141,
      "subject": "feat(static-training): merge da2a332f with a1fe7a6, fix Training Pack Navigator classification, UI & sizing",
      "refs": [
        "origin/z/merge-da2a332f-and-fix-training-navigator"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "016ca7323d9a16376b28e86643f9e63806755e81"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "3640c484d85652a4543284cf48cc7d4bb6c0503f",
      "shortSha": "3640c48",
      "parents": [
        "da2a332ffba8f5abaf5944c721a0be15d352fec8"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793896989,
      "subject": "refactor(replay,modes): remove proxy getters/setters and encapsulate mode lifecycle",
      "refs": [
        "origin/z/workstream-a-replay-mode-deproxy"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "b4aac6ee08f7cedd6dce7081e27fb1be6cb3dbfa"
      },
      "changedSubmodules": []
    },
    {
      "sha": "a04997be7d8ec5ce3eece52c4b16972578e3390c",
      "shortSha": "a04997b",
      "parents": [
        "da2a332ffba8f5abaf5944c721a0be15d352fec8"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793896149,
      "subject": "refactor(ui): selectively merge RCUITuner 1b4c822 UI architecture improvements",
      "refs": [
        "origin/z/merge-ui-tuner-1b4c822"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "5ecc670fcffbe24bc088984069b31a72e7df39d1"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "56964bb549626dc2b7db56d7fa5914a0a3d5fdff",
      "shortSha": "56964bb",
      "parents": [
        "da2a332ffba8f5abaf5944c721a0be15d352fec8"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793895125,
      "subject": "refactor(network,runtime): de-proxy coordinators and decouple WebRTC/server ports",
      "refs": [
        "origin/z/workstream-b-network-runtime-decouple"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "b4aac6ee08f7cedd6dce7081e27fb1be6cb3dbfa"
      },
      "changedSubmodules": []
    },
    {
      "sha": "ab9ce588dc496cb77630dc4cff4ec7306eb16918",
      "shortSha": "ab9ce58",
      "parents": [
        "da2a332ffba8f5abaf5944c721a0be15d352fec8"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793894892,
      "subject": "refactor(ui-system): migrate DevSignalingLab to runtime bridge and align UI presets/routes",
      "refs": [
        "origin/z/workstream-d-ui-cleanup"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "fc4795f60797ebb3073d9b12dfac5d7688a1a029"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "3c4db9874af8adfe404c856459ece214805416d1",
      "shortSha": "3c4db98",
      "parents": [
        "ce2c0eeda8620ef45c16a578bde7384a46a4bfa3"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793893804,
      "subject": "fix(replay,trajectory): de-jitter .replay 120Hz interpolation, fix NetStream ClassNetCache & roster/trajectory bugs",
      "refs": [
        "origin/z/replay-to-rcs-importer"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "02d8a85f2a774160c04264cd82877d4543b4e998"
      },
      "changedSubmodules": []
    },
    {
      "sha": "e17d246582537a7b7dce7fbe70a5cf97dc4fb991",
      "shortSha": "e17d246",
      "parents": [
        "da2a332ffba8f5abaf5944c721a0be15d352fec8"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793893474,
      "subject": "feat(radar): upgrade scripts/radar.ts to Generation-3 Semantic Architecture Radar",
      "refs": [
        "origin/z/gen3-architecture-radar"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "b4aac6ee08f7cedd6dce7081e27fb1be6cb3dbfa"
      },
      "changedSubmodules": []
    },
    {
      "sha": "a1fe7a642d5b9be87d723374d0e5ce63137e4e82",
      "shortSha": "a1fe7a6",
      "parents": [
        "dfa42f503192e0527d0d1bdeeb5b5cda65eb61ec"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793893239,
      "subject": "feat(static-training): reset boost pads on shot reset, record waiting time in replay & sync UI",
      "refs": [
        "origin/z/dev-sandbox-tem-pack-importer"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "ce13b83ceb7797032f5657ba86b327900960d3d6"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "f9b74b512236bc9776c6febe2f740701a712fddf",
      "shortSha": "f9b74b5",
      "parents": [
        "da2a332ffba8f5abaf5944c721a0be15d352fec8"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793893129,
      "subject": "refactor(camera,kickoff,entities): slim high-waterline controllers, merge micro-files, and eliminate untyped any",
      "refs": [
        "origin/z/workstream-c-camera-kickoff-arena-slim"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "b4aac6ee08f7cedd6dce7081e27fb1be6cb3dbfa"
      },
      "changedSubmodules": []
    },
    {
      "sha": "11eef892205e22701b597a70668040add3eb04df",
      "shortSha": "11eef89",
      "parents": [
        "ce24999a5304f147a2cb8bd862e6b74ff81deb6b"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793892912,
      "subject": "feat(name-tag): background aerial climb tracker, off-screen inward ring & POV action simulator",
      "refs": [
        "origin/z/name-tag-aerial-climb-tracker-and-inward-ring"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "49c3389426e021de31bbd6aa194c74e8fedb6760"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "bb60a19716a190dfc086be8a3126d1b8d0c852d5",
      "shortSha": "bb60a19",
      "parents": [
        "99a7433ae6b3798060dd948d10a7d13fd13a2ff0"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793892076,
      "subject": "feat(trajectory): add dual-space anomaly debug exporter and fix curved-seam drift",
      "refs": [
        "origin/z/trajectory-anomaly-debug-and-seam-fix"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "57c12cbf2e07b2839a256ef8bd7c3da2d938b25a"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "f15b0139730e1c192fc56064cf3ad360b020a98b",
      "shortSha": "f15b013",
      "parents": [
        "c612cc6b1046db346a1a23da7d657a27e8c98e33"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793891796,
      "subject": "feat(entities): add dual-pass semi-transparent border occlusion for supersonic wheel trails",
      "refs": [
        "origin/z/supersonic-wheel-trail-occlusion-pass"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "cd98e7c17218ed0028ac009370abdae7967f941b"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "eeae94774b3c1202ac66bdcb8da308c83205583d",
      "shortSha": "eeae947",
      "parents": [
        "da2a332ffba8f5abaf5944c721a0be15d352fec8"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793891705,
      "subject": "chore(radar,lockfile): unify npm lockfile and upgrade Gen-2 architecture radar guardrails",
      "refs": [
        "origin/z/radar-guardrails-and-lockfile-cleanup"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "b4aac6ee08f7cedd6dce7081e27fb1be6cb3dbfa"
      },
      "changedSubmodules": []
    },
    {
      "sha": "da2a332ffba8f5abaf5944c721a0be15d352fec8",
      "shortSha": "da2a332",
      "parents": [
        "99a7433ae6b3798060dd948d10a7d13fd13a2ff0"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793889089,
      "subject": "fix(bootstrap,vite): eliminate Stage 4 60% asset stream hang and fix worktree auto-restart",
      "refs": [
        "origin/z/fix-stage4-asset-stream-and-vite-restart"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "b4aac6ee08f7cedd6dce7081e27fb1be6cb3dbfa"
      },
      "changedSubmodules": []
    },
    {
      "sha": "c612cc6b1046db346a1a23da7d657a27e8c98e33",
      "shortSha": "c612cc6",
      "parents": [
        "65b0123a2249ea6a8ad8d6899f5ca1f2d651f8b4"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793885817,
      "subject": "feat(entities): enforce flat POV trail, ground-hinged upright stand, and POV upright preview",
      "refs": [
        "origin/z/supersonic-wheel-trail-pov-and-hinge"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "86982b410e4d5c4ebb80ee490f05a6c3aaec4a0b"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "ce24999a5304f147a2cb8bd862e6b74ff81deb6b",
      "shortSha": "ce24999",
      "parents": [
        "954f57cc7a373058c4d70a8052f9d27ffc45b917"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793883618,
      "subject": "feat(name-tag): support off-screen directional boost indicators, ROI clamping, and aerial climb outer glow",
      "refs": [
        "origin/z/name-tag-offscreen-indicators-and-aerial-glow"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "b3df7fc793d0b009c7c79feb90202052d43f7e59"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "dfa42f503192e0527d0d1bdeeb5b5cda65eb61ec",
      "shortSha": "dfa42f5",
      "parents": [
        "38c702e68326d4ffc68e3ca7aa1aabbd2c35dd66"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793883192,
      "subject": "feat(static-training): fix post-replay freeze & trajectory line, upgrade 3D arrow visuals, and add TrainingA.zip",
      "refs": [],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "7d7942dcadf411b9ef1b0d50c39aed09d064421f"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "65b0123a2249ea6a8ad8d6899f5ca1f2d651f8b4",
      "shortSha": "65b0123",
      "parents": [
        "38d7da79971cfeccb74d9ae1782e01bcbdd0a17c"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793882376,
      "subject": "feat(entities): fix -1t trail head jitter, add view-adaptive camera tilt and 3-point Bezier gradient",
      "refs": [
        "origin/z/supersonic-wheel-trail-refinement"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "b253f88c9d04827f231034ed3616c64dd1654dc5"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "ce2c0eeda8620ef45c16a578bde7384a46a4bfa3",
      "shortSha": "ce2c0ee",
      "parents": [
        "b39f51aac05056fce36752344377df87e252f6e1"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793879484,
      "subject": "feat(replay): add Replay to RCS Replay Importer sandbox, 30Hz-to-120Hz state interpolator, and Track Delta",
      "refs": [],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "02d8a85f2a774160c04264cd82877d4543b4e998"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "954f57cc7a373058c4d70a8052f9d27ffc45b917",
      "shortSha": "954f57c",
      "parents": [
        "648120ad7c6b594da7897e7e7f8f2d7033f8230c"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793879378,
      "subject": "fix(ui-core): sync 6D floating window adaptive boundary truncation and auto-shrink",
      "refs": [
        "origin/z/fix-floating-window-adaptive-bounds"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "2c8b8b42324e826b8392628855a110bb33f0271d"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "38d7da79971cfeccb74d9ae1782e01bcbdd0a17c",
      "shortSha": "38d7da7",
      "parents": [
        "807a4ce934f486c5a7d6c2074a75b9344cb8968f"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793877209,
      "subject": "feat(entities): implement dual rear-wheel Supersonic Wheel Trail system and tuner",
      "refs": [
        "origin/z/supersonic-wheel-trail"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "73a6a30f6eb562fdaf4780481ae44bf6c40e2b45"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "99a7433ae6b3798060dd948d10a7d13fd13a2ff0",
      "shortSha": "99a7433",
      "parents": [
        "714cdbf40ed138e7d87de5f0fdc327456788588b",
        "70e6e0f9a5fd25bc51680570b9b3e2a7bfd98abc"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793876199,
      "subject": "refactor(merge): unify all 9 branches with cloud-profile-refinement (714cdbf4) and decouple MQTT transport",
      "refs": [
        "origin/z/unified-refactor-merge"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "b4aac6ee08f7cedd6dce7081e27fb1be6cb3dbfa"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "70e6e0f9a5fd25bc51680570b9b3e2a7bfd98abc",
      "shortSha": "70e6e0f",
      "parents": [
        "4e0c5705cdf963a11efc64fea388458a9032aa6d",
        "648120ad7c6b594da7897e7e7f8f2d7033f8230c",
        "053188b19528c5ab1a9ae11e778bdf35e789fbd6",
        "d182fcdd0ff21f574cf3b2b03acdf0b57873d151"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793876198,
      "subject": "feat(runtime): merge name-tag boost, unison loopback freeplay, and training scope into decoupled engine",
      "refs": [],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "5881b2b4bbb9ebc50a95836d23d082bd75ee7bc3"
      },
      "changedSubmodules": []
    },
    {
      "sha": "4e0c5705cdf963a11efc64fea388458a9032aa6d",
      "shortSha": "4e0c570",
      "parents": [
        "4513d3a370ae82b91480d86ded0dfd6cdddec36e",
        "0e0ad86a663e115820831eb191e8f8b1be616422",
        "4b44eb334f9827d9269c0baab692e815eee6fc15",
        "807a4ce934f486c5a7d6c2074a75b9344cb8968f",
        "fd40033b8757c68e75478c741e287ba7fb450a74"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793876198,
      "subject": "refactor(engine): merge 5 subsystem decoupling branches",
      "refs": [],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "5881b2b4bbb9ebc50a95836d23d082bd75ee7bc3"
      },
      "changedSubmodules": []
    },
    {
      "sha": "38c702e68326d4ffc68e3ca7aa1aabbd2c35dd66",
      "shortSha": "38c702e",
      "parents": [
        "a8cd78ecf7318ad4eb961a499313c85a961959ad"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793874707,
      "subject": "feat(static-training): integrate Gen-2 RLRCSPack/RCSPackE, EditorFreeCam sync, and Training Variations",
      "refs": [],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "dbf365a2257e7e8557d91c907901cad523cff851"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "d182fcdd0ff21f574cf3b2b03acdf0b57873d151",
      "shortSha": "d182fcd",
      "parents": [
        "89c1764f8356c96272fd1be9a31cfb351ee423ef"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793870537,
      "subject": "fix(training): isolate Free Play and Training mode scopes and restrict POV hitbox rendering",
      "refs": [
        "origin/z/training-mode-scope-and-pov-hitbox"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "9e8bddb974c021507880aa33c9bee2bfb1035f6c"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "053188b19528c5ab1a9ae11e778bdf35e789fbd6",
      "shortSha": "053188b",
      "parents": [
        "b39f51aac05056fce36752344377df87e252f6e1"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793868838,
      "subject": "feat(network,freeplay): unify Free Play onto loopback AuthoritativeServerHost & sync replay frames",
      "refs": [
        "origin/z/unison-loopback-freeplay"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "18814c4afcf2d07d143165da4feb6affa99d054b"
      },
      "changedSubmodules": []
    },
    {
      "sha": "4513d3a370ae82b91480d86ded0dfd6cdddec36e",
      "shortSha": "4513d3a",
      "parents": [
        "89c1764f8356c96272fd1be9a31cfb351ee423ef"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793867560,
      "subject": "refactor(network,physics): decouple oversized server, client, and physics modules",
      "refs": [
        "origin/z/decouple-network-and-physics"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "5881b2b4bbb9ebc50a95836d23d082bd75ee7bc3"
      },
      "changedSubmodules": []
    },
    {
      "sha": "0e0ad86a663e115820831eb191e8f8b1be616422",
      "shortSha": "0e0ad86",
      "parents": [
        "89c1764f8356c96272fd1be9a31cfb351ee423ef"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793867475,
      "subject": "refactor(game): decouple runtime domain ports, subsystem state, and re-exports",
      "refs": [
        "origin/z/decouple-runtime-and-ports"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "5881b2b4bbb9ebc50a95836d23d082bd75ee7bc3"
      },
      "changedSubmodules": []
    },
    {
      "sha": "714cdbf40ed138e7d87de5f0fdc327456788588b",
      "shortSha": "714cdbf",
      "parents": [
        "5ac2b633baa0574c7ff42ab6637ac1a4c3d640a1"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793867283,
      "subject": "feat(cloud-profile): real-time dev slot watch resilience & UI submodule bump",
      "refs": [
        "origin/z/cloud-profile-refinement"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "06b2cdf4395c6408ff929350aa35a8d2fa14febb"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "4b44eb334f9827d9269c0baab692e815eee6fc15",
      "shortSha": "4b44eb3",
      "parents": [
        "89c1764f8356c96272fd1be9a31cfb351ee423ef"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793866891,
      "subject": "refactor(entities,audio): clean ArenaConstants, type entities, and consolidate UI click audio",
      "refs": [
        "origin/z/clean-entities-and-audio"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "5881b2b4bbb9ebc50a95836d23d082bd75ee7bc3"
      },
      "changedSubmodules": []
    },
    {
      "sha": "807a4ce934f486c5a7d6c2074a75b9344cb8968f",
      "shortSha": "807a4ce",
      "parents": [
        "89c1764f8356c96272fd1be9a31cfb351ee423ef"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793866880,
      "subject": "refactor(ui-system,ui-core): clean UI routes, rename exhibitionParentRef, and bump RCUIModule to 4e832ae3",
      "refs": [
        "origin/z/clean-ui-core-and-routes"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "4e832ae31e6171894349958ed8c708d8fce5bc9a"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "fd40033b8757c68e75478c741e287ba7fb450a74",
      "shortSha": "fd40033",
      "parents": [
        "89c1764f8356c96272fd1be9a31cfb351ee423ef"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793866176,
      "subject": "refactor(replay,modes,ai): decouple replay state types, podium lab subcontroller, and kickoff primitives",
      "refs": [
        "origin/z/decouple-replay-and-lab"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "5881b2b4bbb9ebc50a95836d23d082bd75ee7bc3"
      },
      "changedSubmodules": []
    },
    {
      "sha": "648120ad7c6b594da7897e7e7f8f2d7033f8230c",
      "shortSha": "648120a",
      "parents": [
        "89c1764f8356c96272fd1be9a31cfb351ee423ef"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793865534,
      "subject": "feat(name-tag): sync 4 boost progress modes, 2D ball occlusion & calibrated defaults from RCUITuner 1b4c822",
      "refs": [
        "origin/z/name-tag-boost-progress-and-ball-occlusion"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "2cd82f33f9d342704344c2a59612e8825dd7e78b"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "a8cd78ecf7318ad4eb961a499313c85a961959ad",
      "shortSha": "a8cd78e",
      "parents": [
        "b39f51aac05056fce36752344377df87e252f6e1"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793865415,
      "subject": "feat(sandbox): add Rocket League .Tem to .RCSPack training pack importer",
      "refs": [],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "3f3b8f3f3528c9b359518ced5d2c00884afb8133"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "89c1764f8356c96272fd1be9a31cfb351ee423ef",
      "shortSha": "89c1764",
      "parents": [
        "b39f51aac05056fce36752344377df87e252f6e1",
        "6cbe228f4ea50bdb2518fcb4c1334a6971fd7bfb"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793863400,
      "subject": "chore(merge): merge 6cbe228f (z/signaling-identity-and-relay-lifecycle) into b39f51aa",
      "refs": [
        "origin/z/merge-b39f51aa-6cbe228f"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "5881b2b4bbb9ebc50a95836d23d082bd75ee7bc3"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "5ac2b633baa0574c7ff42ab6637ac1a4c3d640a1",
      "shortSha": "5ac2b63",
      "parents": [
        "0e505a4810efeaff6bcf8f54b9f1926a23b6ddd3"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793861241,
      "subject": "feat(cloud-profile): immutable userId transport, commit hashes, live dev-slot watch & UI submodule bump",
      "refs": [],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "18d7123efb4e1667da09cf9e4d297de2bead49f8"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "b39f51aac05056fce36752344377df87e252f6e1",
      "shortSha": "b39f51a",
      "parents": [
        "26b6f527dae13d301d5cffd764d429fe1510198e"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793860493,
      "subject": "feat(network,replay): merge Phase 2 Unison Loopback Authority (bd145557 + 1b2aef37) onto 26b6f527",
      "refs": [
        "origin/z/merge-phase2-unison-loopback-26b6f527"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "18814c4afcf2d07d143165da4feb6affa99d054b"
      },
      "changedSubmodules": []
    },
    {
      "sha": "bd145557ede97be303ccb4eb05cb469271d2c29e",
      "shortSha": "bd14555",
      "parents": [
        "7b4785e61580688a44d955b8483cd74fc6e6fd8d"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793856135,
      "subject": "feat(network,replay): Phase 2 Unison Loopback Authority, SYS_CTRL_* signals, and 30s FIFO RingBuffer",
      "refs": [
        "origin/z/unison-loopback-authority"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "e52471dcae323f2f1c95ecc112784800e17ca894"
      },
      "changedSubmodules": []
    },
    {
      "sha": "0e505a4810efeaff6bcf8f54b9f1926a23b6ddd3",
      "shortSha": "0e505a4",
      "parents": [
        "292b25ae679d427bc91f63311ffb31c8318bb804"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793855570,
      "subject": "feat(sync): implement EMQX Cloud Profile Sync and Developer Remote Profile Tuner",
      "refs": [
        "origin/z/cloud-profile-sync-and-remote-tuner"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "5f1e282be9f000d5200879aeb43b91b3389e22c7"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "6cbe228f4ea50bdb2518fcb4c1334a6971fd7bfb",
      "shortSha": "6cbe228",
      "parents": [
        "9fdf3f166888de2c891e7272181fb00b44cb72c3"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793855395,
      "subject": "chore(ui-core): bump RCUIModule submodule to b41e2979",
      "refs": [
        "origin/z/signaling-identity-and-relay-lifecycle"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "b41e297920b155e8de80f28999012f4a24e342bc"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "9fdf3f166888de2c891e7272181fb00b44cb72c3",
      "shortSha": "9fdf3f1",
      "parents": [
        "00030758ec5d2af8f8bd29de60f2ddde61d37498"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793855376,
      "subject": "feat(signaling): decouple topicHash from mask, add 0ms checksum & relay lifecycle supervisor",
      "refs": [],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "e52471dcae323f2f1c95ecc112784800e17ca894"
      },
      "changedSubmodules": []
    },
    {
      "sha": "1b2aef371aab9b9323bfd7377bbd8c23ba8ed8b9",
      "shortSha": "1b2aef3",
      "parents": [
        "7b4785e61580688a44d955b8483cd74fc6e6fd8d"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793854382,
      "subject": "feat(phase2): unify 90s FIFO rolling replay buffer, training ruleset & loopback takeover",
      "refs": [
        "origin/z/old-uni"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "e52471dcae323f2f1c95ecc112784800e17ca894"
      },
      "changedSubmodules": []
    },
    {
      "sha": "26b6f527dae13d301d5cffd764d429fe1510198e",
      "shortSha": "26b6f52",
      "parents": [
        "7b4785e61580688a44d955b8483cd74fc6e6fd8d",
        "14d59a3d597108cbbd4a4095320afee56ce18656",
        "292b25ae679d427bc91f63311ffb31c8318bb804",
        "00030758ec5d2af8f8bd29de60f2ddde61d37498"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793853541,
      "subject": "chore(merge,security): merge 7b4785e6, 14d59a3d, 292b25ae, and 00030758 and enforce zero-credential invariants",
      "refs": [
        "origin/z/merge-four-post-7b4785e6"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "18814c4afcf2d07d143165da4feb6affa99d054b"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "654b88228d86f0a65e805e498a2dcd21365cee2c",
      "shortSha": "654b882",
      "parents": [
        "2fa4ac847817f7184e67941ae0923fbb4de2f1fd",
        "14d59a3d597108cbbd4a4095320afee56ce18656"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793853492,
      "subject": "chore(merge): sync 2fa4ac84 with 14d59a3d and align pure module naming",
      "refs": [
        "origin/z/sync-with-14d59a3d"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "3e86f1a13bee47dbbf020c8ab23aa4f5eaeb4b20"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "14d59a3d597108cbbd4a4095320afee56ce18656",
      "shortSha": "14d59a3",
      "parents": [
        "595364386a5b1d6f97433620593998e2b064a10e"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793852409,
      "subject": "fix(security,scripts): remove private profile repo name heuristics and rely on content hash",
      "refs": [
        "origin/z/sanitize-private-profile-repo-discovery"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "a2fcaafe471b864dfa5e74e90dd169d08ea6c50a"
      },
      "changedSubmodules": []
    },
    {
      "sha": "7b4785e61580688a44d955b8483cd74fc6e6fd8d",
      "shortSha": "7b4785e",
      "parents": [
        "bdb5d5c902fac5e0170a05c4480dfe238a0f44c3"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793852023,
      "subject": "perf(shader,freeplay,network): eliminate replay shader hitch & narrow-waist decouple",
      "refs": [
        "origin/z/shader-prewarm-and-narrow-decouple"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "e52471dcae323f2f1c95ecc112784800e17ca894"
      },
      "changedSubmodules": []
    },
    {
      "sha": "292b25ae679d427bc91f63311ffb31c8318bb804",
      "shortSha": "292b25a",
      "parents": [
        "595364386a5b1d6f97433620593998e2b064a10e"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793851235,
      "subject": "fix(exp-modes): decouple Multi-Bots vs Bot Pack #9700488 and fix FPS degradation",
      "refs": [
        "origin/z/fix-exp-multibots-and-botpack-perf"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "a1e0cdbd0ba296a0f645581f8494253a46b7df11"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "595364386a5b1d6f97433620593998e2b064a10e",
      "shortSha": "5953643",
      "parents": [
        "572264035ccd8d78c039c9fa823373b31f7d1124",
        "ef6b4671b038a313922ab3e5e926405872720be3"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793846887,
      "subject": "chore(merge): merge ef6b4671 into 57226403",
      "refs": [
        "origin/z/merge-5722640-ef6b467"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "a2fcaafe471b864dfa5e74e90dd169d08ea6c50a"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "bdb5d5c902fac5e0170a05c4480dfe238a0f44c3",
      "shortSha": "bdb5d5c",
      "parents": [
        "fa46bb81a25113c4339eda898e6818620ed7c4f9"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793846815,
      "subject": "feat(scenario): implement Phase 1 deterministic fast-forward baseline & 6-car loopback harness",
      "refs": [
        "origin/z/scenario-telemetry-baseline"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "e52471dcae323f2f1c95ecc112784800e17ca894"
      },
      "changedSubmodules": []
    },
    {
      "sha": "00030758ec5d2af8f8bd29de60f2ddde61d37498",
      "shortSha": "0003075",
      "parents": [
        "fa46bb81a25113c4339eda898e6818620ed7c4f9"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793846738,
      "subject": "fix(network,input): preserve canonical host room code and resolve touch bot team accurately",
      "refs": [
        "origin/z/fix-room-code-stability-and-touch-bot-team"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "e52471dcae323f2f1c95ecc112784800e17ca894"
      },
      "changedSubmodules": []
    },
    {
      "sha": "572264035ccd8d78c039c9fa823373b31f7d1124",
      "shortSha": "5722640",
      "parents": [
        "03640b19efa92cb54d54202989de57558e174068",
        "fa46bb81a25113c4339eda898e6818620ed7c4f9"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793845037,
      "subject": "chore(merge): merge fa46bb81 into 03640b19 and calibrate spatial attenuation profiles",
      "refs": [
        "origin/z/audio-profiles-and-merge-fa46bb81"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "9a2887aefcec7a148eca1c15e2282796be0a69f0"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "ef6b4671b038a313922ab3e5e926405872720be3",
      "shortSha": "ef6b467",
      "parents": [
        "fa46bb81a25113c4339eda898e6818620ed7c4f9",
        "4766ef81116e53878291617d3ea2f039e1d0d0dd"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793844647,
      "subject": "chore(merge): merge 4766ef81 (z/merge-clean-five-post-f0501b12) into fa46bb81 (z/merge-clean-six-post-f0501b12)",
      "refs": [
        "origin/z/merge-clean-six-post-f0501b12"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "974688b09fe2f06d494a9c9f57cdc35dd3a81a90"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "fa46bb81a25113c4339eda898e6818620ed7c4f9",
      "shortSha": "fa46bb8",
      "parents": [
        "7b274b7b1ba05a2672129ec3dc859d87572d33fb"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793837964,
      "subject": "fix(bootstrap,replay): eliminate 88%/40% loading hangs and Freeplay goal replay freeze",
      "refs": [
        "origin/z/fix-bootstrap-and-goal-hitch"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "e52471dcae323f2f1c95ecc112784800e17ca894"
      },
      "changedSubmodules": []
    },
    {
      "sha": "4766ef81116e53878291617d3ea2f039e1d0d0dd",
      "shortSha": "4766ef8",
      "parents": [
        "03059f4861706e93e0c34b5ad89332c5b1cab365",
        "c06716bc6e820a44a58c3c9602c29450156b8b27"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793837903,
      "subject": "chore(merge): merge c06716bc (z/zero-hardcoded-broker-and-neutral-ball-terms) into z/merge-clean-five-post-f0501b12",
      "refs": [
        "origin/z/merge-clean-five-post-f0501b12"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "974688b09fe2f06d494a9c9f57cdc35dd3a81a90"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "03059f4861706e93e0c34b5ad89332c5b1cab365",
      "shortSha": "03059f4",
      "parents": [
        "7b274b7b1ba05a2672129ec3dc859d87572d33fb",
        "0c423491b4c21cd10b93054845400da1eeaac0c5",
        "4c6f3f883d76e67f7bbc2935ddf4efa44272b4d9",
        "73038797d89e7e4d0e29c17edb31da0d20e1c43b"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793837902,
      "subject": "chore(merge): merge 7b274b7b, 0c423491, 4c6f3f88, and 73038797 into z/merge-four-post-f0501b12",
      "refs": [
        "origin/z/merge-four-post-f0501b12"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "50aad9d7e6eba80b91c2e5cca3050a81b6a3c982"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "03640b19efa92cb54d54202989de57558e174068",
      "shortSha": "03640b1",
      "parents": [
        "31b9360fcecccd9a82db12519659e39fbd494bd2",
        "c570f7276476f0832380299af9a5c272c8a52879",
        "11b064678491d72fb73e421082d02166a287aef1",
        "65be34eccd2ef2b225c9adfbc792ad05715e1e73"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793836766,
      "subject": "chore(merge): merge 31b9360f, c570f727, 11b06467, and 65be34ec into z/merge-audio-spatial-eq-lod",
      "refs": [
        "origin/z/merge-audio-spatial-eq-lod"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "d91af9621002ba9a204a04afce9c528891c1bdc6"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "31b9360fcecccd9a82db12519659e39fbd494bd2",
      "shortSha": "31b9360",
      "parents": [
        "29584755401ecaafaa736251d59415bddc4c2f23"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793808994,
      "subject": "feat(audio): implement MasterAcousticProcessor 3-band EQ and dynamics pipeline",
      "refs": [
        "origin/z/audio/master-bus-eq-and-dynamics"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "8f0aa3b30d0eb1afa4267415e47a8cf9aeab9687"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "c570f7276476f0832380299af9a5c272c8a52879",
      "shortSha": "c570f72",
      "parents": [
        "29584755401ecaafaa736251d59415bddc4c2f23"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793808708,
      "subject": "feat(audio,arena): add 3D spatial audio attenuation visualizer and distance tuner",
      "refs": [
        "origin/z/audio/distance-tuner-and-3d-gizmo"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "a93b63060986bc1dd39e9692257731d9f0979c81"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "7b274b7b1ba05a2672129ec3dc859d87572d33fb",
      "shortSha": "7b274b7",
      "parents": [],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793808701,
      "subject": "perf(bootstrap): streamline Free Play bootstrap and preload all deferred assets & workers",
      "refs": [
        "origin/z/aggressive-bootstrap-and-dev-lock"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "e52471dcae323f2f1c95ecc112784800e17ca894"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "11b064678491d72fb73e421082d02166a287aef1",
      "shortSha": "11b0646",
      "parents": [
        "29584755401ecaafaa736251d59415bddc4c2f23"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793808681,
      "subject": "feat(audio): calibrate incident spatial routing, kinetic modulation & slot priority",
      "refs": [
        "origin/z/audio/incident-spatial-routing"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "f38ade4a3afb806b025ae86c6086bb9bf92452a9"
      },
      "changedSubmodules": []
    },
    {
      "sha": "65be34eccd2ef2b225c9adfbc792ad05715e1e73",
      "shortSha": "65be34e",
      "parents": [
        "29584755401ecaafaa736251d59415bddc4c2f23"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793808669,
      "subject": "feat(audio): add multi-car engine LOD, Top-K distance culling, and loop hibernation",
      "refs": [
        "origin/z/audio/multi-car-engine-lod-and-culling"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "f38ade4a3afb806b025ae86c6086bb9bf92452a9"
      },
      "changedSubmodules": []
    },
    {
      "sha": "2fa4ac847817f7184e67941ae0923fbb4de2f1fd",
      "shortSha": "2fa4ac8",
      "parents": [
        "84216d16c57f5f1beac3491be79348316afc47dc"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793808639,
      "subject": "chore(merge): sync 84216d16 with f0501b12 and align pure pipeline naming & waterlines",
      "refs": [
        "origin/z/sync-with-f0501b12"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "85e4456589882e4c712b5d49a5d768a9b8e61d87"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "0c423491b4c21cd10b93054845400da1eeaac0c5",
      "shortSha": "0c42349",
      "parents": [],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793806733,
      "subject": "chore(baseline): fix typecheck error, unify roomCodeConnectivityCodec SSOT, and harden radar pre-checks",
      "refs": [
        "origin/z/baseline-precheck"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "e220bf557a005b4a310a00f092f1c9e5b2b60cd6"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "4c6f3f883d76e67f7bbc2935ddf4efa44272b4d9",
      "shortSha": "4c6f3f8",
      "parents": [],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793806449,
      "subject": "refactor(transport,scripts): isolate signaling diagnostics and decouple profile sync CLI",
      "refs": [
        "origin/z/decouple-transport-diagnostics-and-profile-sync"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "78423e76217b034a9876b239372b84a3fb6e9939"
      },
      "changedSubmodules": []
    },
    {
      "sha": "c06716bc6e820a44a58c3c9602c29450156b8b27",
      "shortSha": "c06716b",
      "parents": [],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793806402,
      "subject": "fix(signaling,docs): parameterize public fallback broker and enforce neutral ball terminology",
      "refs": [
        "origin/z/zero-hardcoded-broker-and-neutral-ball-terms"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "719a6fd33995ffe5262db12667f75cdf76061857"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "29584755401ecaafaa736251d59415bddc4c2f23",
      "shortSha": "2958475",
      "parents": [],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793806013,
      "subject": "feat(audio): establish spatial attenuation profiles foundation and clean up legacy state audio",
      "refs": [
        "origin/z/audio/spatial-profiles-foundation"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "f38ade4a3afb806b025ae86c6086bb9bf92452a9"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "84216d16c57f5f1beac3491be79348316afc47dc",
      "shortSha": "84216d1",
      "parents": [],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793804868,
      "subject": "feat(training,syncall): fix dynamic training mode exit, decouple focus-only camera sync & radar",
      "refs": [
        "origin/z/training-pack-and-syncall-decouple"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "5c665b9a19666f41290a07a4b2c42c2dd690730f"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "73038797d89e7e4d0e29c17edb31da0d20e1c43b",
      "shortSha": "7303879",
      "parents": [],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793804677,
      "subject": "fix(audio): sync matchPhase before kickoff/endgame audio cues and decouple signal handlers",
      "refs": [
        "origin/z/fix-kickoff-countdown-audio"
      ],
      "submodulePointers": {
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706",
        "src/ui-core": "78423e76217b034a9876b239372b84a3fb6e9939"
      },
      "changedSubmodules": []
    },
    {
      "sha": "78423e76217b034a9876b239372b84a3fb6e9939",
      "shortSha": "78423e7",
      "parents": [
        "19a0fe1100239481726354819203948172635481"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "bot@users.noreply.github.com",
      "timestamp": 1793600120,
      "subject": "chore(orphan-v1): legacy pre-sanitization baseline snapshot",
      "refs": [
        "origin/z/old-uni"
      ],
      "submodulePointers": {
        "public": "f37d2d36c83c39c342d87c7d9fd64c21b9ced61b",
        "src/ui-core": "78423e76217b034a9876b239372b84a3fb6e9939"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "19a0fe1100239481726354819203948172635481",
      "shortSha": "19a0fe1",
      "parents": [],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "bot@users.noreply.github.com",
      "timestamp": 1793590000,
      "subject": "init(orphan-v1): initial legacy tree root",
      "refs": [],
      "submodulePointers": {
        "public": "f37d2d36c83c39c342d87c7d9fd64c21b9ced61b",
        "src/ui-core": "78423e76217b034a9876b239372b84a3fb6e9939"
      },
      "changedSubmodules": [
        "public",
        "src/ui-core"
      ]
    }
  ],
  "workingTreeStatus": {
    "isClean": true,
    "mainRepoDirtyFiles": [],
    "dirtySubmodules": [],
    "summaryMessage": "Working tree and all submodules are clean. Ready for detached state inspection."
  }
};
