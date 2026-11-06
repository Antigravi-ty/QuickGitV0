import {
  AnnotationTone,
  CommitTriageStatus,
  LocalCommitAnnotation,
  RepositorySnapshot,
} from "../types/gitTypes";

export const LANE_COLOR_PALETTE: readonly string[] = [
  "#0969da",
  "#2da44e",
  "#d97706",
  "#db2777",
  "#8250df",
  "#e11d48",
  "#0891b2",
  "#ea580c",
  "#4f46e5",
  "#059669",
  "#9333ea",
  "#c026d3",
  "#2563eb",
  "#ca8a04",
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

export const TRIAGE_STATUS_OPTIONS: readonly {
  id: CommitTriageStatus;
  label: string;
  shortBadge: string;
  defaultTone: AnnotationTone;
}[] = [
  {
    id: "useful",
    label: "Useful / Keep",
    shortBadge: "USEFUL",
    defaultTone: "success",
  },
  {
    id: "useless",
    label: "Useless / No Need",
    shortBadge: "USELESS",
    defaultTone: "danger",
  },
  {
    id: "absorbed",
    label: "Absorbed / Linked",
    shortBadge: "ABSORBED",
    defaultTone: "done",
  },
  {
    id: "hold",
    label: "On Hold / Outdated",
    shortBadge: "ON HOLD",
    defaultTone: "attention",
  },
  {
    id: "unconfirmed",
    label: "Unconfirmed",
    shortBadge: "UNCONFIRMED",
    defaultTone: "accent",
  },
];

export const ROCKET_COMPANION_DEFAULT_ANNOTATIONS: Record<
  string,
  LocalCommitAnnotation
> = {
  "003346382265f81146827e45c668eb291bdbe771": {
    commitSha: "003346382265f81146827e45c668eb291bdbe771",
    tagLabel: "no-need-anymore",
    colorTone: "danger",
    note: "Superseded by merge-five and merge-six; no longer needed.",
    updatedAt: 1793961600,
    confirmed: true,
    triageStatus: "useless",
  },
  "24f420ddf5a904a5fbff4b976a63b4bbe95ddacc": {
    commitSha: "24f420ddf5a904a5fbff4b976a63b4bbe95ddacc",
    tagLabel: "replay system",
    colorTone: "accent",
    note: "Shared replay importer sync base for downstream replay system tips.",
    updatedAt: 1793961600,
    confirmed: true,
    triageStatus: "useful",
  },
  "aac86091a28687e94b1da67c53a48ceb7bc9cdb2": {
    commitSha: "aac86091a28687e94b1da67c53a48ceb7bc9cdb2",
    tagLabel: "replay system",
    colorTone: "accent",
    note: "Replay system tip (intervene + multi-car sync); pending replay cluster merge.",
    updatedAt: 1793961600,
    confirmed: true,
    triageStatus: "useful",
  },
  "96910e4da9f8276aedda1db25d5cb2ab74d27fb1": {
    commitSha: "96910e4da9f8276aedda1db25d5cb2ab74d27fb1",
    tagLabel: "replay system",
    colorTone: "accent",
    note: "Replay system tip (120Hz physics/boost timeline & intervene); merge with replay system cluster.",
    updatedAt: 1793961600,
    confirmed: true,
    triageStatus: "useful",
  },
  "31dca9f572cdb0e74b9da70feca638713f8107ce": {
    commitSha: "31dca9f572cdb0e74b9da70feca638713f8107ce",
    tagLabel: "replay system",
    colorTone: "accent",
    note: "Replay system tip (wheel suspension droop & car hitboxes); merge with replay system cluster.",
    updatedAt: 1793961600,
    confirmed: true,
    triageStatus: "useful",
  },
  "a04997be7d8ec5ce3eece52c4b16972578e3390c": {
    commitSha: "a04997be7d8ec5ce3eece52c4b16972578e3390c",
    tagLabel: "ui-plan-hold",
    colorTone: "attention",
    note: "Selective RCUITuner 1b4c822 UI improvements; on hold pending newer UI plan.",
    updatedAt: 1793961600,
    confirmed: true,
    triageStatus: "hold",
  },
  "11eef892205e22701b597a70668040add3eb04df": {
    commitSha: "11eef892205e22701b597a70668040add3eb04df",
    tagLabel: "absorbed-in-mainline",
    colorTone: "done",
    note: "Name Tag aerial climb tracker & inward ring reworked and absorbed into mainline 6bd41edd.",
    updatedAt: 1793961600,
    confirmed: true,
    triageStatus: "absorbed",
    linkedCommitSha: "6bd41edd3700dec26783f73972326f93f15d490e",
  },
  "654b88228d86f0a65e805e498a2dcd21365cee2c": {
    commitSha: "654b88228d86f0a65e805e498a2dcd21365cee2c",
    tagLabel: "useful-needs-catchup",
    colorTone: "success",
    note: "Useful pure module naming alignment; currently behind latest architecture and needs catch-up merge.",
    updatedAt: 1793961600,
    confirmed: true,
    triageStatus: "useful",
  },
};

export const DEFAULT_ORPHAN_HORIZON_COMMIT_LIMIT = 10;

export const DEMO_ROCKET_COMPANION_SNAPSHOT: RepositorySnapshot = {
  "repoPath": "/Users/dev/Workspace/RocketCompanion",
  "repoName": "RocketCompanion",
  "headSha": "90434454ce75bb8e5c88be2dea60ee3f0178b5dc",
  "headRefName": "z/merge-clean-six-post-3dd58c6e",
  "isDetachedHead": false,
  "remoteSyncAvailable": false,
  "lastRemoteSyncTimestamp": null,
  "branches": [
    {
      "name": "origin/z/merge-g3-01-to-10",
      "fullRef": "refs/remotes/origin/z/merge-g3-01-to-10",
      "commitSha": "7f519274b7b251aedac0547360719e4ff1d3e5dc",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
      "timestamp": 1793960480,
      "subject": "feat(arch): merge g3-01..g3-10 Gen-3 refactoring & fix cross-branch contracts"
    },
    {
      "name": "origin/z/static-training-kevpert-and-catalog-cleanup",
      "fullRef": "refs/remotes/origin/z/static-training-kevpert-and-catalog-cleanup",
      "commitSha": "63a6c69a23b8113ae9c47ff85dd037b49bacb639",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
      "timestamp": 1793960406,
      "subject": "refactor(static-training): update ui-core submodule and fix ShotGizmoMath radar violations"
    },
    {
      "name": "origin/z/fix-director-camera-aggressiveness",
      "fullRef": "refs/remotes/origin/z/fix-director-camera-aggressiveness",
      "commitSha": "62e0b860b41f3753e1c1fd38491a3fcb1b3aec8c",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
      "timestamp": 1793959089,
      "subject": "fix(replay,camera): calm director camera trajectory & fix 50/50, handoff, and post-goal whips"
    },
    {
      "name": "origin/z/merge-clean-six-post-3dd58c6e",
      "fullRef": "refs/remotes/origin/z/merge-clean-six-post-3dd58c6e",
      "commitSha": "90434454ce75bb8e5c88be2dea60ee3f0178b5dc",
      "isRemote": true,
      "isTag": false,
      "isHead": true,
      "isOnRemoteOrigin": true,
      "hasLocalRef": true,
      "timestamp": 1793955459,
      "subject": "what lock again"
    },
    {
      "name": "origin/z/g3-08-modes-isolation-lab",
      "fullRef": "refs/remotes/origin/z/g3-08-modes-isolation-lab",
      "commitSha": "98fefd8273d6e2a0c5476519d45b01184f532844",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
      "timestamp": 1793954558,
      "subject": "refactor(isolation-lab): decouple pure pipelines, encapsulate episode tracker, and type lab contracts"
    },
    {
      "name": "origin/z/g3-05-modes-core-and-freeplay",
      "fullRef": "refs/remotes/origin/z/g3-05-modes-core-and-freeplay",
      "commitSha": "a562b0817bbc1601df1995e8fe25a7c8047b0e79",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
      "timestamp": 1793953984,
      "subject": "refactor(modes): narrow runtime/replay waist ports and eliminate untyped any (g3-05)"
    },
    {
      "name": "origin/z/merge-four-post-3dd58c6e",
      "fullRef": "refs/remotes/origin/z/merge-four-post-3dd58c6e",
      "commitSha": "003346382265f81146827e45c668eb291bdbe771",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
      "timestamp": 1793953873,
      "subject": "chore(merge): merge 2b36521f, 8afe4ad9, c5acf655, and 3dd58c6e into z/merge-four-post-3dd58c6e"
    },
    {
      "name": "origin/z/g3-10-strict-network-server-match",
      "fullRef": "refs/remotes/origin/z/g3-10-strict-network-server-match",
      "commitSha": "1080c65e7a3a875a1c7e7077624569def1038263",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
      "timestamp": 1793953518,
      "subject": "refactor(match): decouple MatchDomainState ports and eliminate Object.assign mutations"
    },
    {
      "name": "origin/z/merge-clean-five-post-3dd58c6e",
      "fullRef": "refs/remotes/origin/z/merge-clean-five-post-3dd58c6e",
      "commitSha": "60609d4022a6a47caaf9a0e072abfe0c2c08ef23",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
      "timestamp": 1793953436,
      "subject": "chore(merge): merge 2b36521f, b58db448, 8afe4ad9, c5acf655, and 3dd58c6e into z/merge-clean-five-post-3dd58c6e"
    },
    {
      "name": "origin/z/g3-01-game-core-pipeline",
      "fullRef": "refs/remotes/origin/z/g3-01-game-core-pipeline",
      "commitSha": "c472ad343392478c7f1ff62161ed3b70a6003341",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
      "timestamp": 1793953122,
      "subject": "refactor(game): decouple core runtime pipeline stages and type boundaries (g3-01)"
    },
    {
      "name": "origin/z/g3-02-runtime-online-coordinators",
      "fullRef": "refs/remotes/origin/z/g3-02-runtime-online-coordinators",
      "commitSha": "0b91c5a1d051ae6bb0b22aadb8f34391de47008f",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
      "timestamp": 1793952422,
      "subject": "refactor(runtime): narrow online coordinator host ports and encapsulate signal latch state"
    },
    {
      "name": "origin/z/g3-09-strict-network-client-and-sim",
      "fullRef": "refs/remotes/origin/z/g3-09-strict-network-client-and-sim",
      "commitSha": "a8fdfd4cbc86544aad7a165e2086ee4c305d25ca",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
      "timestamp": 1793952329,
      "subject": "refactor(network): replace Object.assign and defineProperties proxies with domain methods"
    },
    {
      "name": "origin/z/g3-04-runtime-ports-and-io",
      "fullRef": "refs/remotes/origin/z/g3-04-runtime-ports-and-io",
      "commitSha": "880e3fe73d78812810805b3a74e4cf55df08fa8e",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
      "timestamp": 1793952098,
      "subject": "refactor(runtime): narrow runtime ports and eliminate pipeline mutations (g3-04)"
    },
    {
      "name": "origin/z/g3-06-modes-training-and-kickoff",
      "fullRef": "refs/remotes/origin/z/g3-06-modes-training-and-kickoff",
      "commitSha": "f22de3e90db3f5e35742d71379c41d4925df9c8a",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
      "timestamp": 1793951432,
      "subject": "refactor(modes): decouple training/kickoff controllers and pure gizmo math (g3-06)"
    },
    {
      "name": "origin/z/g3-03-runtime-signal-controllers",
      "fullRef": "refs/remotes/origin/z/g3-03-runtime-signal-controllers",
      "commitSha": "78309e7e5bf35e1ab58352406308f7b29d5b18cc",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
      "timestamp": 1793951416,
      "subject": "refactor(runtime): narrow signal subcontroller host ports and remove untyped any (g3-03)"
    },
    {
      "name": "origin/z/fix-goal-replay-director-vehicle-and-pose",
      "fullRef": "refs/remotes/origin/z/fix-goal-replay-director-vehicle-and-pose",
      "commitSha": "2b36521f49790d8fcdbfa924170c1b93857504b2",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
      "timestamp": 1793951279,
      "subject": "fix(replay): record vehicle models and preserve accurate car poses in Goal Replay Director"
    },
    {
      "name": "origin/z/g3-07-modes-exp-multibots",
      "fullRef": "refs/remotes/origin/z/g3-07-modes-exp-multibots",
      "commitSha": "9e3967c04f82089c4ab84677f5da054e3eb61d57",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
      "timestamp": 1793951122,
      "subject": "refactor(exp-multi-bots): narrow lifecycle port and add explicit TypeScript interfaces"
    },
    {
      "name": "origin/z/merge-replay-intervene-and-multi-car-sync",
      "fullRef": "refs/remotes/origin/z/merge-replay-intervene-and-multi-car-sync",
      "commitSha": "aac86091a28687e94b1da67c53a48ceb7bc9cdb2",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
      "timestamp": 1793949648,
      "subject": "Merge z/fix-replay-importer-multi-car-sync (f45c896) into z/fix-replay-intervene (28a7229)"
    },
    {
      "name": "origin/z/fix-replay-viewer-perf-and-telemetry",
      "fullRef": "refs/remotes/origin/z/fix-replay-viewer-perf-and-telemetry",
      "commitSha": "b58db4483e765ee3081730f43a683bb995501253",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
      "timestamp": 1793949176,
      "subject": "fix(replay,perf): eliminate Replay Viewer progressive slowdown, residual multi-car overhead, and audio LOD hitches"
    },
    {
      "name": "origin/z/director-cinematic-camera-v2",
      "fullRef": "refs/remotes/origin/z/director-cinematic-camera-v2",
      "commitSha": "7b22fe9f3457536b3168bfbcce4bcbc18eb40bee",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
      "timestamp": 1793947261,
      "subject": "feat(replay,camera): phase-aware cinematic director camera v2 & decoupled solver"
    },
    {
      "name": "origin/z/fix-rc-replay-viewer-and-trajectory",
      "fullRef": "refs/remotes/origin/z/fix-rc-replay-viewer-and-trajectory",
      "commitSha": "8afe4ad919f03bc5430158ecc769300ef9eea2f7",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
      "timestamp": 1793946080,
      "subject": "fix(replay,trajectory): fix RC Replay Viewer takeover physics and trajectory line"
    },
    {
      "name": "origin/z/radar-anti-cheat-guardrails",
      "fullRef": "refs/remotes/origin/z/radar-anti-cheat-guardrails",
      "commitSha": "831cfe8b77a5af08399a6314b162ae392d267fa9",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
      "timestamp": 1793945512,
      "subject": "feat(radar): close Object.assign, defineProperties, method-alias, and local-buffer bypasses in scripts/radar.ts"
    },
    {
      "name": "origin/z/merge-gen3-ws1-ws2-ws4-ws5",
      "fullRef": "refs/remotes/origin/z/merge-gen3-ws1-ws2-ws4-ws5",
      "commitSha": "7bb1bf2e6070494e8b143dc71b3e6ffad8aa6d08",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
      "timestamp": 1793945411,
      "subject": "chore(merge): unify Gen-3 radar workstream WS2 (071b4d0) into d75298e"
    },
    {
      "name": "origin/z/merge-static-training-and-ballcam",
      "fullRef": "refs/remotes/origin/z/merge-static-training-and-ballcam",
      "commitSha": "c5acf6554d24cad925b23eefd41ff0f55225f289",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
      "timestamp": 1793943537,
      "subject": "Merge 3dd58c6e and 5008d5a5 with static training & ball camera fixes"
    },
    {
      "name": "origin/z/rl-replay-physics-bake-and-intervene",
      "fullRef": "refs/remotes/origin/z/rl-replay-physics-bake-and-intervene",
      "commitSha": "96910e4da9f8276aedda1db25d5cb2ab74d27fb1",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
      "timestamp": 1793941713,
      "subject": "feat(replay): bake 120Hz physics/boost state timeline, inverse controls, loadouts, and fix intervene takeover"
    },
    {
      "name": "origin/z/merge-gen3-ws1-ws4-ws5",
      "fullRef": "refs/remotes/origin/z/merge-gen3-ws1-ws4-ws5",
      "commitSha": "d75298e59488543e48296cd4450136c180d1ba24",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
      "timestamp": 1793941510,
      "subject": "fix(types): resolve tsc --noEmit regressions introduced in WS1 and WS4"
    },
    {
      "name": "origin/z/fix-replay-suspension-and-hitbox-mapping",
      "fullRef": "refs/remotes/origin/z/fix-replay-suspension-and-hitbox-mapping",
      "commitSha": "31dca9f572cdb0e74b9da70feca638713f8107ce",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
      "timestamp": 1793941176,
      "subject": "fix(replay,physics): solve natural wheel suspension droop and map .replay car hitboxes"
    },
    {
      "name": "origin/z/fix-replay-intervene",
      "fullRef": "refs/remotes/origin/z/fix-replay-intervene",
      "commitSha": "28a72291ac45e1c1069de8f39d28b740ae76f6ee",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
      "timestamp": 1793939764,
      "subject": "refactor(network): resolve all Gen-3 architecture radar violations in src/network"
    },
    {
      "name": "origin/z/merge-nametag-freeplay-trail-and-training-cam",
      "fullRef": "refs/remotes/origin/z/merge-nametag-freeplay-trail-and-training-cam",
      "commitSha": "3dd58c6e70bbb3df412e1cbbe9ebf4df115b0d53",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
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
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
      "timestamp": 1793804677,
      "subject": "fix(audio): sync matchPhase before kickoff/endgame audio cues and decouple signal handlers"
    },
    {
      "name": "origin/z/merge-trajectory-signaling-botpack",
      "fullRef": "refs/remotes/origin/z/merge-trajectory-signaling-botpack",
      "commitSha": "f0501b12eefbcd7d25dbf3bf53ab651a850026d6",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
      "timestamp": 1793803733,
      "subject": "chore(merge): merge 0d1e8248, d7492627, and 65dd69a3 into z/merge-trajectory-signaling-botpack"
    },
    {
      "name": "origin/z/syncall-unified",
      "fullRef": "refs/remotes/origin/z/syncall-unified",
      "commitSha": "e6522cca01b120ce74c4df2d34d71dda805c9ec1",
      "isRemote": true,
      "isTag": false,
      "isHead": false,
      "isOnRemoteOrigin": true,
      "hasLocalRef": false,
      "timestamp": 1793799759,
      "subject": "chore(merge): merge z/dynamic-training (853ca6ce) and z/syncall-ghost-tape (4043b535)"
    }
  ],
  "submodules": [
    {
      "name": "src/ui-core",
      "path": "src/ui-core",
      "url": "https://github.com/Antigravi-ty/RCUIModule.git",
      "branch": "main",
      "currentWorktreeSha": "58852b7ef0912a34bc5678901234567890abcdef",
      "isDirty": false
    },
    {
      "name": "public",
      "path": "public",
      "url": "https://github.com/Antigravi-ty/RCPublicAssets.git",
      "branch": "main",
      "currentWorktreeSha": "972fdefa1234567890abcdef1234567890abcdef",
      "isDirty": false
    }
  ],
  "commits": [
    {
      "sha": "7f519274b7b251aedac0547360719e4ff1d3e5dc",
      "shortSha": "7f51927",
      "parents": [
        "c472ad343392478c7f1ff62161ed3b70a6003341",
        "0b91c5a1d051ae6bb0b22aadb8f34391de47008f",
        "78309e7e5bf35e1ab58352406308f7b29d5b18cc",
        "880e3fe73d78812810805b3a74e4cf55df08fa8e",
        "a562b0817bbc1601df1995e8fe25a7c8047b0e79",
        "f22de3e90db3f5e35742d71379c41d4925df9c8a",
        "9e3967c04f82089c4ab84677f5da054e3eb61d57",
        "98fefd8273d6e2a0c5476519d45b01184f532844",
        "a8fdfd4cbc86544aad7a165e2086ee4c305d25ca",
        "1080c65e7a3a875a1c7e7077624569def1038263"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793960480,
      "subject": "feat(arch): merge g3-01..g3-10 Gen-3 refactoring & fix cross-branch contracts",
      "body": "- Merge all 10 Gen-3 workstreams (g3-01 through g3-10) into a unified branch\n- Align cross-branch TypeScript port contracts in BaseGameMode, DirectorPreviewSubController, GoalReplaySessionCoordinator, goalReplayHudPipeline, StaticTrainingReplayController, PodiumCelebrationController, ExperimentalMultiBotsMatchMath, and LabTabTypes (0 tsc errors, 0 radar errors)\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/merge-g3-01-to-10"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "4c07185b22e004e8045f491607ad2ac04c5587ae",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": []
    },
    {
      "sha": "63a6c69a23b8113ae9c47ff85dd037b49bacb639",
      "shortSha": "63a6c69",
      "parents": [
        "90434454ce75bb8e5c88be2dea60ee3f0178b5dc"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793960406,
      "subject": "refactor(static-training): update ui-core submodule and fix ShotGizmoMath radar violations",
      "body": "- Update `src/ui-core` submodule (`a16d2270`): remove embedded Gzip+Base64 catalog data, clean up Kevpert F-presets (`F3, F5, F7, F8, F9, F10, F11, F12`), and style historical `Variants Ready` badges purple\n- Fix `ShotGizmoMath.ts` radar violations (`[PIPELINE MUTATION VIOLATION]` and `[UNTYPED ANY VIOLATION]`)\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/static-training-kevpert-and-catalog-cleanup"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "a16d2270f607445af73df1205490a081525648e8",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "62e0b860b41f3753e1c1fd38491a3fcb1b3aec8c",
      "shortSha": "62e0b86",
      "parents": [
        "90434454ce75bb8e5c88be2dea60ee3f0178b5dc"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793959089,
      "subject": "fix(replay,camera): calm director camera trajectory & fix 50/50, handoff, and post-goal whips",
      "body": "- Replace violent opponent 50/50 challenge anchor/pullback/elevation overrides with bounded challenge weights\n- Smooth multi-car pass handoffs by freezing passer corner follow-through after release and starting corner-pass blends earlier\n- Project out forward sightline components from open-side lateral offsets and enforce a cone-bounded Behind-Play Invariant so the camera never drifts ahead of the active striker or ball\n- Replace the 0.45s end-of-shot goal-box teleport and 2600 UU post-goal backward sprint with a leashed post-goal drift and goal-mouth net guard\n- Smooth horizontal gaze direction (2D unit vector) and 1D pitch angle independently to eliminate the -51.2 deg Cartesian cancellation pitch plunge\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/fix-director-camera-aggressiveness"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "5885272a03487bf4aafc814c303084f2f469acad",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": []
    },
    {
      "sha": "90434454ce75bb8e5c88be2dea60ee3f0178b5dc",
      "shortSha": "9043445",
      "parents": [
        "2fce25a65bdd1da70a94399a13120aa8ae1f2fb0"
      ],
      "authorName": "Default User",
      "authorEmail": "29165094+MaBoCoMark@users.noreply.github.com",
      "timestamp": 1793955459,
      "subject": "what lock again",
      "body": "",
      "refs": [
        "HEAD -> z/merge-clean-six-post-3dd58c6e",
        "origin/z/merge-clean-six-post-3dd58c6e"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "5885272a03487bf4aafc814c303084f2f469acad",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": []
    },
    {
      "sha": "98fefd8273d6e2a0c5476519d45b01184f532844",
      "shortSha": "98fefd8",
      "parents": [
        "831cfe8b77a5af08399a6314b162ae392d267fa9"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793954558,
      "subject": "refactor(isolation-lab): decouple pure pipelines, encapsulate episode tracker, and type lab contracts",
      "body": "- Refactor probeKinematicsPipeline and kickoffDuelSimulationPipeline to return pure state/decision outputs instead of mutating passed-in objects in-place\n- Encapsulate KickoffDuelEpisodeTracker state transitions in KickoffDuelLabTab to eliminate cross-controller property mutation violations\n- Delegate single-player lab baseline reset from SubsystemIsolationLabMode to resetSinglePlayerLabBaseline to narrow runtime port surface (<=12 properties)\n- Define explicit TypeScript contracts in LabTabTypes and eliminate untyped any across all subsystem-isolation-lab modules\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/g3-08-modes-isolation-lab"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "4c07185b22e004e8045f491607ad2ac04c5587ae",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": []
    },
    {
      "sha": "2fce25a65bdd1da70a94399a13120aa8ae1f2fb0",
      "shortSha": "2fce25a",
      "parents": [
        "60609d4022a6a47caaf9a0e072abfe0c2c08ef23",
        "7b22fe9f3457536b3168bfbcce4bcbc18eb40bee"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793954017,
      "subject": "chore(merge): merge 7b22fe9f (z/director-cinematic-camera-v2) into z/merge-clean-five-post-3dd58c6e (60609d40)",
      "body": "- Losslessly unify all 6 commits (2b36521f, b58db448, 7b22fe9f, 8afe4ad9, c5acf655, 3dd58c6e) onto z/merge-clean-six-post-3dd58c6e\n- Combine ReplayDirectorCameraSubController & phase-aware cinematic director camera v2 (7b22fe9f) with vehicle model/hitbox & car pose preservation (2b36521f), Replay Viewer perf & audio LOD optimizations (b58db448), trajectory & takeover physics fixes (8afe4ad9), and static training & ball camera updates (c5acf655)\n- Type replayDirectorCarRosterPipeline.ts and align cross-branch TypeScript interfaces (0 tsc --noEmit errors, 0 src/replay radar violations)\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "5885272a03487bf4aafc814c303084f2f469acad",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": []
    },
    {
      "sha": "a562b0817bbc1601df1995e8fe25a7c8047b0e79",
      "shortSha": "a562b08",
      "parents": [
        "831cfe8b77a5af08399a6314b162ae392d267fa9"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793953984,
      "subject": "refactor(modes): narrow runtime/replay waist ports and eliminate untyped any (g3-05)",
      "body": "- Declare strong GameModeRuntimePort in BaseGameMode and encapsulate shared kickoff/loadout helpers\n- Narrow this.runtime property reads across BotMatchMode, FreeplayMode, and PodiumCelebrationController\n- Extract cohesive replay timeline/camera session helpers to narrow replayController reads in DirectorPreviewSubController\n- Replace all untyped any across BaseGameMode, FreeplayMode, PodiumCelebrationController, DirectorPreviewSubController, GoalReplaySessionCoordinator, and goalReplayHudPipeline\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/g3-05-modes-core-and-freeplay"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "4c07185b22e004e8045f491607ad2ac04c5587ae",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": []
    },
    {
      "sha": "003346382265f81146827e45c668eb291bdbe771",
      "shortSha": "0033463",
      "parents": [
        "2b36521f49790d8fcdbfa924170c1b93857504b2",
        "8afe4ad919f03bc5430158ecc769300ef9eea2f7",
        "c5acf6554d24cad925b23eefd41ff0f55225f289",
        "3dd58c6e70bbb3df412e1cbbe9ebf4df115b0d53"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793953873,
      "subject": "chore(merge): merge 2b36521f, 8afe4ad9, c5acf655, and 3dd58c6e into z/merge-four-post-3dd58c6e",
      "body": "- Zero-conflict merge of 2b36521f49790d8fcdbfa924170c1b93857504b2, 8afe4ad919f03bc5430158ecc769300ef9eea2f7, c5acf6554d24cad925b23eefd41ff0f55225f289, and 3dd58c6e70bbb3df412e1cbbe9ebf4df115b0d53\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/merge-four-post-3dd58c6e"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "e597440fa008e20ab9a33281ac7afd4a45cf9de4",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "1080c65e7a3a875a1c7e7077624569def1038263",
      "shortSha": "1080c65",
      "parents": [
        "831cfe8b77a5af08399a6314b162ae392d267fa9"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793953518,
      "subject": "refactor(match): decouple MatchDomainState ports and eliminate Object.assign mutations",
      "body": "- Remove private domainState() cheat aliases across MatchPhaseLifecycleSubController, MatchRosterSubController, MatchCommandQueueSubController, MatchSessionAdmin, and MatchSystemControlSubController\n- Encapsulate cohesive match domain state queries, snapshot builders, and phase/clock/score transitions inside MatchDomainState methods so all sub-controllers read <= 12 domain properties\n- Convert Object.assign player slot mutations in matchLoadoutAndSpawnPipeline, matchRosterPhysicsAndBotPipeline, and matchSessionRoleSwitchPipeline into pure Partial<MatchPlayerSlot> patch builders applied via MatchDomainState.updatePlayerSlot\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/g3-10-strict-network-server-match"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "4c07185b22e004e8045f491607ad2ac04c5587ae",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": []
    },
    {
      "sha": "60609d4022a6a47caaf9a0e072abfe0c2c08ef23",
      "shortSha": "60609d4",
      "parents": [
        "2b36521f49790d8fcdbfa924170c1b93857504b2",
        "b58db4483e765ee3081730f43a683bb995501253",
        "8afe4ad919f03bc5430158ecc769300ef9eea2f7",
        "c5acf6554d24cad925b23eefd41ff0f55225f289",
        "3dd58c6e70bbb3df412e1cbbe9ebf4df115b0d53"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793953436,
      "subject": "chore(merge): merge 2b36521f, b58db448, 8afe4ad9, c5acf655, and 3dd58c6e into z/merge-clean-five-post-3dd58c6e",
      "body": "- Merge 2b36521f49790d8fcdbfa924170c1b93857504b2 (z/fix-goal-replay-director-vehicle-and-pose): record vehicle models and preserve accurate car poses in Goal Replay Director\n- Merge b58db4483e765ee3081730f43a683bb995501253 (z/fix-replay-viewer-perf-and-telemetry): eliminate Replay Viewer progressive slowdown, residual multi-car overhead, and audio LOD hitches\n- Merge 8afe4ad919f03bc5430158ecc769300ef9eea2f7 (z/fix-rc-replay-viewer-and-trajectory): fix RC Replay Viewer takeover physics and trajectory line\n- Merge c5acf6554d24cad925b23eefd41ff0f55225f289 (z/merge-static-training-and-ballcam): static training pack & ball camera fixes\n- Base 3dd58c6e70bbb3df412e1cbbe9ebf4df115b0d53 (z/merge-nametag-freeplay-trail-and-training-cam)\n- Unify Standalone Replay Viewer and Freeplay Rewinder active checks in GameRenderSubsystem.ts\n- Update src/ui-core submodule to 5885272a03487bf4aafc814c303084f2f469acad (merge e597440f and aa8f5ae5)\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/merge-clean-five-post-3dd58c6e"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "5885272a03487bf4aafc814c303084f2f469acad",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "c472ad343392478c7f1ff62161ed3b70a6003341",
      "shortSha": "c472ad3",
      "parents": [
        "831cfe8b77a5af08399a6314b162ae392d267fa9"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793953122,
      "subject": "refactor(game): decouple core runtime pipeline stages and type boundaries (g3-01)",
      "body": "1. Remove unused pass-through setters on GameRuntime (reducing proxy count to <=8 and file length below 580L waterline).\n2. Narrow PresentationStage, SimulationStage, GameCameraSubsystem, and GameRenderSubsystem runtime dependencies via explicit port interfaces and FrameContext transient fields.\n3. Declare explicit TypeScript boundary interfaces across GameBootstrap, ShaderPrewarmer, FramePipeline, CarActionEventSynthesizer, hudTransientFramePipeline, ScenarioAutorunBootstrap, and ScenarioTypes.\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/g3-01-game-core-pipeline"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "4c07185b22e004e8045f491607ad2ac04c5587ae",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": []
    },
    {
      "sha": "0b91c5a1d051ae6bb0b22aadb8f34391de47008f",
      "shortSha": "0b91c5a",
      "parents": [
        "831cfe8b77a5af08399a6314b162ae392d267fa9"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793952422,
      "subject": "refactor(runtime): narrow online coordinator host ports and encapsulate signal latch state",
      "body": "- Partition OnlineSessionCoordinatorHostPort into cohesive world, lifecycle, and coordinators sub-ports\n- Partition OnlineRosterSyncHostPort into cohesive session, world, and diagnostics sub-ports\n- Narrow RuntimeLoadoutHostPort to 12 members and delegate network loadout sync to RuntimeNetworkManager\n- Encapsulate SignalLatchState reset and signal-id tracking methods in ReconcilerSignalCoordinator\n- Reduce RuntimeNetworkManager direct runtime property accesses to pass Gen-3 architecture radar\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/g3-02-runtime-online-coordinators"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "4c07185b22e004e8045f491607ad2ac04c5587ae",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": []
    },
    {
      "sha": "a8fdfd4cbc86544aad7a165e2086ee4c305d25ca",
      "shortSha": "a8fdfd4",
      "parents": [
        "831cfe8b77a5af08399a6314b162ae392d267fa9"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793952329,
      "subject": "refactor(network): replace Object.assign and defineProperties proxies with domain methods",
      "body": "Encapsulate state updates on ReconcilerMetrics, BotAgentRuntimeRecord, and ProbeAltitudeControllerState via domain methods, narrow ClientClockPacingController port access, and remove attachSimulatorAccessors dynamic Object.defineProperties proxy in favor of the channel.simulator narrow port.\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/g3-09-strict-network-client-and-sim"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "4c07185b22e004e8045f491607ad2ac04c5587ae",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": []
    },
    {
      "sha": "880e3fe73d78812810805b3a74e4cf55df08fa8e",
      "shortSha": "880e3fe",
      "parents": [
        "831cfe8b77a5af08399a6314b162ae392d267fa9"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793952098,
      "subject": "refactor(runtime): narrow runtime ports and eliminate pipeline mutations (g3-04)",
      "body": "- Narrow RuntimeBotCoordinator, RuntimeDOMEventManager, and RuntimeInputPoller host port reads to <= 12 properties\n- Delegate match and reconciler state resets to domain methods in runtimeDomainPorts and runtimeReplayAndDiagnosticsPort\n- Replace multi-property in-place mutations on trainingOptions and remove Object.assign fallbacks in runtimeTunerPort\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/g3-04-runtime-ports-and-io"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "4c07185b22e004e8045f491607ad2ac04c5587ae",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": []
    },
    {
      "sha": "f22de3e90db3f5e35742d71379c41d4925df9c8a",
      "shortSha": "f22de3e",
      "parents": [
        "831cfe8b77a5af08399a6314b162ae392d267fa9"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793951432,
      "subject": "refactor(modes): decouple training/kickoff controllers and pure gizmo math (g3-06)",
      "body": "- Convert ShotGizmoMath delta and mouse drag helpers into pure patch operators returning { carPatch, ballPatch } applied by StaticTrainingShotEditor\n- Narrow KickoffTrainingMode access on this.episodeController (15 -> 9 properties) via getConfigSnapshot() and applyConfigPatch()\n- Declare explicit TypeScript interfaces and eliminate all untyped any occurrences across KickoffGhostVisuals, MultiWorldGhostRenderer, StaticTrainingReplayController, StaticTrainingShotEditor, and ShotGizmoMath\n- Reduce MultiWorldGhostRenderer, KickoffEpisodeSubController, and ShotGizmoMath below the 580-line soft waterline\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/g3-06-modes-training-and-kickoff"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "4c07185b22e004e8045f491607ad2ac04c5587ae",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": []
    },
    {
      "sha": "78309e7e5bf35e1ab58352406308f7b29d5b18cc",
      "shortSha": "78309e7",
      "parents": [
        "831cfe8b77a5af08399a6314b162ae392d267fa9"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793951416,
      "subject": "refactor(runtime): narrow signal subcontroller host ports and remove untyped any (g3-03)",
      "body": "- Declare explicit RuntimeSignalActiveModePort and replay camera override contracts on RuntimeSignalHostPort, eliminating all 9 untyped any occurrences in RuntimeGoalReplaySignalSubController.ts and 2 in RuntimeSignalDomainSubController.ts\n- Extract cohesive domain helpers (teardownSignalReplayAndPodiumSession, focusLocalPlayerCarInArenaAndCamera, startGoalReplayDirectorSession, toggleGoalReplayCameraViewMode, resetGoalReplayIncidentFlags, preparePhysicsReplayRecordingForMatch, exitLobbyDualWorldAndActivateMatchMode) to narrow direct this.host port reads below the <=12 threshold across RuntimeSignalDomainSubController, RuntimeKickoffSignalSubController, and RuntimeGoalReplaySignalSubController\n- Keep all 3 exclusive signal subcontroller files below the 580-line soft waterline with 0 tsc --noEmit errors\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/g3-03-runtime-signal-controllers"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "4c07185b22e004e8045f491607ad2ac04c5587ae",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": []
    },
    {
      "sha": "2b36521f49790d8fcdbfa924170c1b93857504b2",
      "shortSha": "2b36521",
      "parents": [
        "3dd58c6e70bbb3df412e1cbbe9ebf4df115b0d53"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793951279,
      "subject": "fix(replay): record vehicle models and preserve accurate car poses in Goal Replay Director",
      "body": "- Add `src/replay/replayDirectorCarRosterPipeline.ts` to decouple and normalize per-car vehicle model (`visualId`), physics collision hitbox (`hitboxId`), team, and cosmetic loadout capture/restoration across live sessions, exports, and 3D Arena previews.\n- Record and serialize `carEntries` (`visualId`, `hitboxId`, `colorSlot`, `paintFinish`, `boostVisual`, `boostAudio`, `anthemId`), focus car orientation basis (`focus_car_fx/fy/fz`, `focus_car_ux/uy/uz`), and multi-car `cars_pose_compact` across `.rcgr.gz`, `.csv`, and `.json` diagnostic patterns.\n- Ensure `applyReplayFrameToEngine` activates all required car slots (`0..numCars-1`) before `restoreState`, and re-orthonormalize `[fwd, right, up]` basis vectors during sub-tick snapshot interpolation.\n- Deduplicate streamed slow-mo sub-tick replay snapshots sharing the same physics tick in `appendStreamedReplayFrameToState`, and prevent Goal Replay slice frames from polluting `hostReplayRingBuffer`.\n- Prevent live Freeplay loopback server/reconciler ticks from overwriting car slots and positions while `DirectorPreviewSubController` is active, and apply/restore Car 0's recorded vehicle model during single-car and multi-car previews.\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/fix-goal-replay-director-vehicle-and-pose"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "2acfe7316b978160cd3d7f3aa9e7b02623911182",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": []
    },
    {
      "sha": "9e3967c04f82089c4ab84677f5da054e3eb61d57",
      "shortSha": "9e3967c",
      "parents": [
        "831cfe8b77a5af08399a6314b162ae392d267fa9"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793951122,
      "subject": "refactor(exp-multi-bots): narrow lifecycle port and add explicit TypeScript interfaces",
      "body": "- Encapsulate stepPostFrameLifecycle and stepEndedMatchPodiumDelay callback on ExperimentalMultiBotsMatchLifecycleController to narrow lifecycleCtrl reads in ExperimentalMultiBotsSimulationController to <=12\n- Declare explicit TypeScript interfaces (ExpModeRuntimePort, ExpPhysicsEnginePort, ExpModeAudioPort, ExpExportedRosterEntry) in ExperimentalMultiBotsMatchMath\n- Eliminate all untyped any occurrences across ExperimentalMultiBotsMatchMath, ExperimentalMultiBotsReplayController, ExperimentalMultiBotsRosterController, ExperimentalMultiBotsMatchLifecycleController, and ExperimentalMultiBotsSimulationController\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/g3-07-modes-exp-multibots"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "4c07185b22e004e8045f491607ad2ac04c5587ae",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": []
    },
    {
      "sha": "aac86091a28687e94b1da67c53a48ceb7bc9cdb2",
      "shortSha": "aac8609",
      "parents": [
        "28a72291ac45e1c1069de8f39d28b740ae76f6ee",
        "f45c896be3631d95dfbb9c40176e11808ff55246"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793949648,
      "subject": "Merge z/fix-replay-importer-multi-car-sync (f45c896) into z/fix-replay-intervene (28a7229)",
      "body": "- Unify authoritative system control takeover lifecycle (MatchSystemControlSubController + ReplayTakeoverSubController)\n- Unify 3v3 multi-car replay roster resolution, POV slot switching, and non-POV intervention modes (ReplayImporterInterventionSubController + ReplayImporterPlaybackEngine)\n- Extract pure pipelines (replayRosterResolutionPipeline, replayDataPayloadPipeline, hudTransientFramePipeline) for Gen-3 Architecture Radar compliance\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/merge-replay-intervene-and-multi-car-sync"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "b9f0af1403bbb45348fd813883c0694a2d901296",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": []
    },
    {
      "sha": "b58db4483e765ee3081730f43a683bb995501253",
      "shortSha": "b58db44",
      "parents": [
        "3dd58c6e70bbb3df412e1cbbe9ebf4df115b0d53"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793949176,
      "subject": "fix(replay,perf): eliminate Replay Viewer progressive slowdown, residual multi-car overhead, and audio LOD hitches",
      "body": "- Short-circuit ArcadeParticlePhysics.reset() and RealisticParticlePhysics.reset() when already inactive/hidden to eliminate 280 Float32Array.fill() + 80 WebGL BufferAttribute uploads per frame after exiting 6-car Replay Viewer\n- Remove duplicate pre-camera updateSubjectShadows, nameTagSystem.update, spatialAudioVisualizer.update, and supersonicWheelTrailSystem.prepare calls from ArenaWorld.update()\n- Eliminate per-tick saveCompactState() allocations and systemControlSignalHistory churn during Replay Viewer playback/scrubbing\n- Optimize SignalTimeline.evaluateMatchStateAtFrame and deduplicate 120Hz hudStore.setMatchState calls in ReplayScoreboardSynchronizer\n- Swap primary-full and remote-lod engine synths on POV change and skip per-frame updates on dormant remote engine synths\n- Guard against detached WASM controlsView ArrayBuffer in RocketSimPhysicsEngine.resetKickoff after memory growth\n- Add runtimeDiagnosticReportBuilder and replay_viewer_6car_playback_and_exit automated WebGL baseline scenario\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/fix-replay-viewer-perf-and-telemetry"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "aa8f5ae5bbe310769fbbf9ef470e05dc376f05af",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "7b22fe9f3457536b3168bfbcce4bcbc18eb40bee",
      "shortSha": "7b22fe9",
      "parents": [
        "3dd58c6e70bbb3df412e1cbbe9ebf4df115b0d53"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793947261,
      "subject": "feat(replay,camera): phase-aware cinematic director camera v2 & decoupled solver",
      "body": "Improve the Goal Replay Director Cinematic Camera algorithm based on reference guidance keyframes (cam1 & cam2) and decouple the replay camera pipeline:\n\n1. Car-Grounded Action-Plane Elevation & Rule-of-Thirds Upper-Frame Gaze:\n   - Anchor camera elevation primarily to the active striker height (~220-280 UU on ground, climbing with aerials) instead of bridging global ball Z peaks across the entire replay.\n   - Frame high airborne balls in the upper third of the 80-deg vertical FOV while keeping pitch strictly downward (-2.5 deg to -15.5 deg) and keeping ground/aerial strikers in frame.\n2. Phase-Aware Behind-Striker Sightline & Multi-Touch Handoff:\n   - Blend local Striker->Ball and Ball->Goal sightlines during approach.\n   - Fix nextScoreCar lookahead to target the subsequent touch (k + 1) and add a smooth lateral anticipation arc during multi-touch handoffs.\n3. Open-Interior Lateral Bias, Goalpost Clearance & Goal-Box Showcase:\n   - Prefer the open stadium interior side whenever play is off-center.\n   - Enforce smooth backboard/goalpost clearance in clampPositionInsideArena.\n   - Peel off into an oblique Goal-Box Showcase angle after the final touch.\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/director-cinematic-camera-v2"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "2acfe7316b978160cd3d7f3aa9e7b02623911182",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": []
    },
    {
      "sha": "8afe4ad919f03bc5430158ecc769300ef9eea2f7",
      "shortSha": "8afe4ad",
      "parents": [
        "3dd58c6e70bbb3df412e1cbbe9ebf4df115b0d53"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793946080,
      "subject": "fix(replay,trajectory): fix RC Replay Viewer takeover physics and trajectory line",
      "body": "- Suppress and clear BallTrajectoryPredictor during Standalone Replay Viewer playback/scrub/preroll and Freeplay Rewinder scrub/preroll so frozen engine ticks do not extrude a tether line from the replay ball to pre-replay trajectory slices.\n- Guard extrudeTrajectoryTubeDashRanges start vertex snapping when liveBallPosition diverges beyond interpolation range.\n- Stop overwriting live ball state on every physics tick inside ReplayCausalHybridEngine.stepBeforePhysics during Intervene from here, preventing recorded POV hits from moving the ball on its own and preventing per-tick ballStateWriteRevision resets that kept the trajectory line stuck at 5 ticks.\n- Increment ballStateWriteRevision on snapshot restore and explicitly reset/clear BallTrajectoryPredictor and its anomaly latch in executeLiveFreeplayHandoff.\n- Treat direct car-ball physical proximity (closestSurfaceGapUu <= 24 UU) as multi-tick car contact to prevent false trajectory anomalies on soft touches.\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/fix-rc-replay-viewer-and-trajectory"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "2acfe7316b978160cd3d7f3aa9e7b02623911182",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": []
    },
    {
      "sha": "831cfe8b77a5af08399a6314b162ae392d267fa9",
      "shortSha": "831cfe8",
      "parents": [
        "7bb1bf2e6070494e8b143dc71b3e6ffad8aa6d08"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793945512,
      "subject": "feat(radar): close Object.assign, defineProperties, method-alias, and local-buffer bypasses in scripts/radar.ts",
      "body": "- Remove dst/out/target/res/result/next/patch/draft from ALLOWED_LOCAL_BUFFER_NAMES while fixing local allocation regex to recognize typed local declarations\n- Detect Object.assign(target, { ... }) property mutations in both pure pipelines (1A) and cross-controller checks (1B)\n- Track private helper method aliases (e.g. domainState() { return this.host.domain; }) for Wide-Waist Port and Gut-Sharing checks\n- Detect Object.defineProperties / Object.defineProperty pass-through getter/setter factories in checkProxyBloat\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/radar-anti-cheat-guardrails"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "4c07185b22e004e8045f491607ad2ac04c5587ae",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": []
    },
    {
      "sha": "7bb1bf2e6070494e8b143dc71b3e6ffad8aa6d08",
      "shortSha": "7bb1bf2",
      "parents": [
        "d75298e59488543e48296cd4450136c180d1ba24",
        "071b4d0b0f145c13cdcaad4ae6fb4a58fad88d27"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793945411,
      "subject": "chore(merge): unify Gen-3 radar workstream WS2 (071b4d0) into d75298e",
      "body": "- Merge z/gen3-ws2-network (071b4d0b0f145c13cdcaad4ae6fb4a58fad88d27) into z/merge-gen3-ws1-ws4-ws5 (d75298e59488543e48296cd4450136c180d1ba24)\n- Resolve 9 cross-branch TypeScript boundary incompatibilities between WS1/WS4 and WS2 (0 tsc --noEmit errors)\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/merge-gen3-ws1-ws2-ws4-ws5"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "4c07185b22e004e8045f491607ad2ac04c5587ae",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": []
    },
    {
      "sha": "c5acf6554d24cad925b23eefd41ff0f55225f289",
      "shortSha": "c5acf65",
      "parents": [
        "3dd58c6e70bbb3df412e1cbbe9ebf4df115b0d53",
        "5008d5a501a9677f7afeac3f666f034b16578951"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793943537,
      "subject": "Merge 3dd58c6e and 5008d5a5 with static training & ball camera fixes",
      "body": "- Tear down active loopback/authoritative session when transitioning into training modes so ball physics is never overwritten by a stale Freeplay loopback server\n- Separate normal Static Training Pack storage (rc-virtual-fs-db) and Developer .RLRCSPack storage (rc-dev-virtual-fs-db)\n- Default static training editor & ball camera FOV to 110 deg and wire tuner FOV slider to EditorCameraController\n- Integrate 3D shaded direction arrows and update src/ui-core submodule\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/merge-static-training-and-ballcam"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "e597440fa008e20ab9a33281ac7afd4a45cf9de4",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "96910e4da9f8276aedda1db25d5cb2ab74d27fb1",
      "shortSha": "96910e4",
      "parents": [
        "24f420ddf5a904a5fbff4b976a63b4bbe95ddacc"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793941713,
      "subject": "feat(replay): bake 120Hz physics/boost state timeline, inverse controls, loadouts, and fix intervene takeover",
      "body": "- Release ball immediately (`isBallFree = true`) on `beginIntervention` in `ReplayCausalHybridEngine` and bypass background loopback `AuthoritativeServerHost`/`PredictionReconciler` during replay playback and takeover so ball and non-POV cars are never overwritten\n- Preserve neutral multi-car loadouts (`preserveRecordedLoadoutOnTakeover`) and allow selecting any player (`1..6`) to intervene with their recorded hitbox and visual model\n- Add `RLReplayVehicleLoadoutMapper` to map `TAGame.PRI_TA:ClientLoadouts` body Product IDs and resting Z height to the 6 RocketSim hitboxes and visual models (`fennec`, `insidio`, and hitbox whiteboxes)\n- Fix `TAGame.VehiclePickup_TA:NewReplicatedPickupData` boost pickup & respawn extraction and `TAGame.GameEvent_TA:ReplicatedRoundCountDownNumber` kickoff signals\n- Add `RLReplayPhysicsBakePipeline` to bake 120Hz full-field boost pad states (`BOOST_PAD_STATES_OFFSET = 342`), continuous boost consumption & refills, hitbox-aware wheel suspension, and jump/air timers into the state buffer for instant rewind restoration\n- Add `RLReplayInverseControlSolver` to reconstruct 120Hz fractional throttle, active braking, steering, and aerial pitch/yaw/roll from trajectories and drive presentation & engine audio across all 6 cars\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/rl-replay-physics-bake-and-intervene"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "49427e777137027067c25274ab59aba028f1a1a9",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": []
    },
    {
      "sha": "d75298e59488543e48296cd4450136c180d1ba24",
      "shortSha": "d75298e",
      "parents": [
        "0370bf1897bfb0fc842ea288dc3dda0ac7b5338f"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793941510,
      "subject": "fix(types): resolve tsc --noEmit regressions introduced in WS1 and WS4",
      "body": "- Restore strict TypeScript compilation (npx tsc --noEmit exits 0) across src/ai, src/audio, src/camera, src/entities, src/physics, and src/replay after merging WS1 (a520624) and WS4 (51345d5)\n- Preserve 0 Gen-3 Radar violations across all WS1, WS4, and WS5 subsystems\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/merge-gen3-ws1-ws4-ws5"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "4c07185b22e004e8045f491607ad2ac04c5587ae",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": []
    },
    {
      "sha": "31dca9f572cdb0e74b9da70feca638713f8107ce",
      "shortSha": "31dca9f",
      "parents": [
        "24f420ddf5a904a5fbff4b976a63b4bbe95ddacc"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793941176,
      "subject": "fix(replay,physics): solve natural wheel suspension droop and map .replay car hitboxes",
      "body": "- Add VehicleWheelSuspensionSolver for per-wheel surface raycast contact placement\n  and natural downward suspension droop when unconstrained or airborne\n- Fix DEFAULT_GROUNDED_SUS_LENGTH and DEFAULT_AIRBORNE_SUS_LENGTH in StateInterpolationMath\n  so grounded wheels rest on the floor (-4.5 front, -2.0 rear) instead of clipping into fenders\n- Add RLReplayBodyCatalog mapping 185+ Rocket League car body Product IDs to exact\n  RocketCompanion hitbox presets and visual models (Fennec, Insidio, Ryza, Octane, and\n  hitbox overrides with Fennec fallback)\n- Extract TAGame.PRI_TA:ClientLoadouts in RLReplayRosterAndEventBuilder and emit\n  PLAYER_LOADOUT_UPDATED signals in Track C\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/fix-replay-suspension-and-hitbox-mapping"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "49427e777137027067c25274ab59aba028f1a1a9",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": []
    },
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
      "body": "- Clean up single-car Freeplay loopback server/reconciler when entering a replay-viewer session so multi-car rosters (e.g. slots 1, 2, 4, 5) are not truncated to Car 0 on takeover\n- Deactivate and park non-POV cars in disappear mode without triggering 3s demolition respawns, and restore cars from the replay snapshot when switching POV or returning to replay\n- Keep Left/Right HUD team strips and slot keys (1-3 vs 4-6) stable when selecting or intervening as an opposing team's car\n- Route HUD POV slot selection to ReplayToRcsImporterStore when an imported replay is loaded\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/fix-replay-intervene"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "b9f0af1403bbb45348fd813883c0694a2d901296",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "Resolve all 71 Gen-3 semantic architecture radar violations and waterline alerts across src/network/**:\n- Narrow proxy getter/setter surfaces in HostLoopbackChannel, P2PWebRTCChannel, and SignalingProtocolHandler\n- Refactor matchLoadoutAndSpawnPipeline, matchRosterPhysicsAndBotPipeline, and matchSessionRoleSwitchPipeline to avoid in-place external object mutation\n- Encapsulate ClientClockPacingController access in PredictionReconciler to satisfy wide-waist port limits\n- Replace DEFAULT_SOCCAR_BOOST_PADS with mode-neutral DEFAULT_ARENA_BOOST_PADS in BotInferenceWorker\n- Add explicit TypeScript boundary interfaces across src/network/** and eliminate all tsc errors\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/gen3-ws2-network"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "755cf7375c6ad4277709289dc530a5b9bf59c84f",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "Merge a520624f (z/gen3-ws1-replay-and-physics), 51345d55 (z/gen3-ws4-entities-camera-audio-ai),\nand a48ef1bf (z/gen3-ws5-ui-core) onto Phase 1 baseline (50065ba).\nEliminates 123 Gen-3 radar violations across replay, physics, utils, entities,\ncamera, audio, ai, and ui-core, leaving 131 violations isolated to src/game and src/network.\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "4c07185b22e004e8045f491607ad2ac04c5587ae",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Fix GameCameraSubsystem._reconcileSceneCameraOverrides checking 'static-training' instead of 'static-training-pack', which deactivated EditorCameraController every frame and forced PovCameraController (car view) even when in Ball Speed ('ball-speed') sub-mode\n- Auto-switch editSubMode to 'ball-speed' when adjusting ball parameters and back to 'car-heading' / 'car-speed' when adjusting car parameters in the Shot Inspector UI (src/ui-core @ 2acfe731)\n- Remove dead duplicated computeEditorSubModeCameraPose from ShotGizmoMath.ts (owned by EditorCameraController.syncShotPose in SceneOverrideCameraControllers.ts)\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/merge-nametag-freeplay-trail-and-training-cam"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "2acfe7316b978160cd3d7f3aa9e7b02623911182",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Merge 6bd41edd3700dec26783f73972326f93f15d490e (Name Tag system, bottom-up offscreen border & Dev Quick Actions)\n- Merge 1e25ad8c89ad1669285df0b456def4ca7eaf4dea (decouple single-player freeplay from loopback reconciler and fix jump/boost reconciliation artifacts)\n- Merge c662f86866091ec5149fdfa3e452702a8468323f (Supersonic Wheel Trail effect and Calibrated Presets)\n- Re-export NameTagOffscreenIndicatorCard2D in VehicleNameTagCanvasRenderer.ts and update src/ui-core submodule to a16403f7\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "a16403f76ba486179593354c6a6826f238420e7b",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Synchronously enable PredictionReconciler.replayPlaybackMode on SYS_CTRL_STATE_ONLY and SYS_CTRL_INTERVENE_WILL_RESUME transitions so in-flight 1-car server worker frames cannot trigger syncClientCarTopology and strip cars 1..5 on the client right after replay load.\n- Fix MatchSystemControlSubController snapshot restoration to use restoreCompactState/restoreState (instead of non-existent loadCompactState/loadState) and synchronize server PhysicsEngineManager car slot topology with the snapshot car count.\n- Include replayToRcsImporter in RuntimeSignalDomainSubController local controller checks and mirror authoritative state-only updates across ReplayToRcsImporterController playback, scrubbing, and pre-roll countdown.\n- Synchronize authoritativeServer car slots during ReplayViewerRosterSubController roster resolution and ReplayScoreboardSynchronizer clear/reset.\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/fix-replay-importer-multi-car-sync"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "49427e777137027067c25274ab59aba028f1a1a9",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Update src/ui-core submodule to b6dccb67 (resolved conflict markers, merged 5 TRAINIC.zip packs, and added Enable F to Mirror setting)\n- Require positive inward goal velocity (and reject stationary or outward-moving balls > 100 UU/s) for .RLRCSPack goal evaluation so shots launched from inside the goal net do not falsely score\n- Sync Static Training player car team and color with User Preferred Team (getPreferredFreeplayTeam) and automatically invert shots 180 deg around Z when Orange team is preferred\n- Support pressing [F] in Play Mode and Single-Shot Test [G] to horizontally mirror the active shot across X = 0 when Enable F to Mirror is enabled\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/fix-merge-and-static-training-team-mirror"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "b6dccb672f7e0dab19d0c14db361054e58956ac6",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Merge VehicleAerialClimbTracker, VehicleNameTagProjector, VehicleNameTagSystem, and NameTagTunerArenaController from 11eef892 onto aa5bd34d\n- Update src/ui-core submodule with calibrated Name Tag presets, bottom-up off-screen boost circle border fill, and Developer Quick Actions\n- Wire dev-quick-actions route in menuRouteRegistry and Developer Mode auto-activation in GameUIRoot\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/name-tag-merge-and-dev-quick-actions"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "816b7c908e262f8932eb2e908a2ba758fb992ca1",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Run single-player Free Play directly on the local RocketSim physics engine without auto-spawning a loopback AuthoritativeServerHost + PredictionReconciler, eliminating dual-engine CPU overhead and self-reconciliation jitter while preserving explicit loopback/online multiplayer sessions.\n- Latch jump suppression across kickoff resets, Goal Replay transitions/skips, and frozen kickoff countdowns on both client (RuntimeInputPoller) and server (authoritativePhysicsStepPipeline), and zero CarControls WASM buffer on resetKickoff so holding Jump never triggers a spontaneous jump on spawn or kickoff unfreeze.\n- Preserve RocketSim transient CarState timers and flags (hasJumped, hasDoubleJumped, hasFlipped, jumpTime, flipTime, isFlipping, isJumping, airTime, airTimeSinceJump, boostingTime, supersonicTime, handbrakeVal, lastControls) from the client's saved full state slot across compact state restore in VisualErrorSmoother.\n- Gate local-player jump/air-jump/boost audio synthesis on local input edges with a 12-tick boost stop hysteresis in CarActionEventSynthesizer so server state overrides never emit phantom empty double-jump or overlapping boost sounds.\n- Update DirectorPreviewSubController to read de-proxied ReplayTimelineController.sessionState properties and remove stray pnpm lockfiles.\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/fix-freeplay-reconciler-audio-jump"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "755cf7375c6ad4277709289dc530a5b9bf59c84f",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Merge f15b0139 (Supersonic Wheel Trail effect with dual-pass semi-transparent border occlusion) into aa5bd34d\n- Remove re-export facade supersonicWheelTrailConfigPort.ts and import supersonicTrailConfig/vehicleTunerConfig directly from source modules\n- Update src/ui-core submodule to 6f8acc2a (z/supersonic-wheel-trail-calibrated-preset) moving Supersonic Wheel Trail Tuner from Active Tuners to Calibrated Presets\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/supersonic-wheel-trail-calibrated-preset"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "6f8acc2a89fadcf265ae54c5b7afd440ff7d91cd",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Port ReplayDirectorCameraSubController from f477ada5 to encapsulate director camera state\n  and eliminate cross-controller/pipeline mutations in ReplayTimelineController,\n  ReplayDirectorStatePipeline, replayTimelineStepPipeline, and ReplayDirectorCamera\n- Convert replayDirectorStreamingFallbackPipeline, ReplayTakeoverSubController,\n  RCReplayFallbackSignalSynthesizer, RCReplayTrackMaterializer, replayDataPayloadPipeline,\n  and goalBarrierVolumePipeline to pure/non-mutating pipelines\n- Rename STANDARD_SOCCAR / DEFAULT_SOCCAR_MUTATOR_CONFIG to neutral STANDARD_ARENA /\n  DEFAULT_STANDARD_MUTATOR_CONFIG in RocketSimConstants and mutatorConfigPipeline\n- Declare explicit TypeScript interfaces across src/replay/**, src/physics/**, and src/utils/**\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/gen3-ws1-replay-and-physics"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "755cf7375c6ad4277709289dc530a5b9bf59c84f",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Replace forbidden Soccar terminology in ReachabilityConstants.ts and ballTrajectoryAnomalyPipeline.ts\n- Narrow proxy accessors (<=8) and port reads (<=12) in BallTrajectoryPredictor.ts and StadiumSpatialAudioEngine.ts\n- Encapsulate state mutations in AudioSubsystemStateStore and CameraDeterminismMetricsState\n- Eliminate all untyped any and pipeline mutation violations across src/entities, src/camera, src/audio, and src/ai\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/gen3-ws4-entities-camera-audio-ai"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "755cf7375c6ad4277709289dc530a5b9bf59c84f",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "Point src/ui-core submodule to 4c07185b (z/gen3-ws5-ui-core) which resolves\nall 33 [UNTYPED ANY VIOLATION] radar items in Workstream E5.\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/gen3-ws5-ui-core"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "4c07185b22e004e8045f491607ad2ac04c5587ae",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "",
      "refs": [
        "origin/z/phase1-lossless-merge"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "755cf7375c6ad4277709289dc530a5b9bf59c84f",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "Merge clean da2a332f-based branches onto eeae94774b3c1202ac66bdcb8da308c83205583d:\n- 3640c484d85652a4543284cf48cc7d4bb6c0503f (z/workstream-a-replay-mode-deproxy)\n- 56964bb549626dc2b7db56d7fa5914a0a3d5fdff (z/workstream-b-network-runtime-decouple)\n- f9b74b512236bc9776c6febe2f740701a712fddf (z/workstream-c-camera-kickoff-arena-slim)\n- ab9ce588dc496cb77630dc4cff4ec7306eb16918 (z/workstream-d-ui-cleanup)\n- bb60a19716a190dfc086be8a3126d1b8d0c852d5 (z/trajectory-anomaly-debug-and-seam-fix)\n- e17d246582537a7b7dce7fbe70a5cf97dc4fb991 (z/gen3-architecture-radar)\n\nAlso add invalidateCachedDirectorPlans and setRecordedCsvCameraMode to ReplayTimelineController and bump src/ui-core submodule to 755cf737 (z/phase1-lossless-merge).\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "755cf7375c6ad4277709289dc530a5b9bf59c84f",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Merge stage-4 asset stream, cloud profile sync, and narrow-waist runtime ports from da2a332f into 3c4db987\n- Remove legacy combined runtimeTunerAndReplayPorts.ts in favor of split runtimeTunerPort.ts and runtimeReplayAndDiagnosticsPort.ts\n- Decouple oversized replay importer and interpolation modules into focused units:\n  - StateInterpolationMath.ts + StateInterpolationPipeline.ts\n  - RLReplayPropertyAttributeCodec.ts + RLReplayNetStreamDecoder.ts\n  - RLReplaySnapshotFramePacker.ts + RLReplayActorStateExtractor.ts\n  - ReplayImporterConversionSubController.ts + ReplayToRcsImporterController.ts\n- Sync src/ui-core submodule to 49427e77\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/replay-to-rcs-importer-sync"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "49427e777137027067c25274ab59aba028f1a1a9",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Merge da2a332ffba8f5abaf5944c721a0be15d352fec8 into a1fe7a642d5b9be87d723374d0e5ce63137e4e82\n- Update src/ui-core submodule to 016ca7323d9a16376b28e86643f9e63806755e81 (merged b4aac6e + ce13b83 with restored neutral UI, fixed Psyonix/Rank/Local classification, and fixed 920x740 panel sizing)\n- Route useStaticTrainingBallCamTunerStore and DEFAULT_STATIC_TRAINING_BALL_CAM_CONFIG through runtimeUiPort.ts in StaticTrainingVisuals.ts to maintain zero engine->UI boundary leaks\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/merge-da2a332f-and-fix-training-navigator"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "016ca7323d9a16376b28e86643f9e63806755e81",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Remove barrel re-exports in ExperimentalMultiBotsMatchMath.ts\n- Encapsulate match phase, clock, countdown, and goal state transitions inside ExperimentalMultiBotsMatchLifecycleController.ts and remove 28 proxy accessors from ExperimentalMultiBotsMode.ts\n- De-proxy StandaloneReplayViewerController.ts (remove 9 getter/setter pairs forwarding rosterSubController, takeoverSubController, and scoreboardSynchronizer)\n- De-proxy FreeplayMode.ts (remove 14 getter/setter pairs forwarding goalAndTouch and directorPreview)\n- De-proxy ReplayTimelineController.ts (remove 34 getter/setter pairs forwarding sessionState.*) and update callers to use narrow state slices\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/workstream-a-replay-mode-deproxy"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "b4aac6ee08f7cedd6dce7081e27fb1be6cb3dbfa",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Update src/ui-core submodule to 5ecc670f (z/merge-ui-tuner-1b4c822)\n- Adopt pure React EdgePlayerSlotCard, MorphingStageShell, floatingWindowGeometry, L1 config purity, and narrow-waist stateOverride bindings from RCUITuner 1b4c822\n- Fix L1->L6 upward dependency violations in settingsPacingStore and cloudProfileSyncStore and split experimentalMultiBotsStore below 600-line ceiling\n- Wire attachCloudProfileConflictDialogueAutoSync in runtimeProfileSyncBridge, onNavigateDevRemoteProfile in menuRouteRegistry, and narrow-waist stateOverride in DevSignalingLabPanel\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/merge-ui-tuner-1b4c822"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "5ecc670fcffbe24bc088984069b31a72e7df39d1",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Remove redundant proxy getters/setters and 1-line forwarding methods on RuntimeNetworkManager\n- Remove internal sub-component proxy getters/setters on PredictionReconciler\n- Decouple HandshakeSession and DataChannelTransport from P2PWebRTCChannel via narrow ports\n- Split HostSimProxy from HostLoopbackChannel and prune internal simulator proxy properties\n- Consolidate single-caller SignalingRelayFactory into SignalingMultiRelayTransportPool\n- Consolidate phase/clock/score mutations into atomic MatchDomainState methods and simplify MatchSessionAdmin ports\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/workstream-b-network-runtime-decouple"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "b4aac6ee08f7cedd6dce7081e27fb1be6cb3dbfa",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Replace wrapper component DevSignalingLabPanel.tsx with runtimeSignalingLabBridge.ts and mount Layer4DevSignalingLabRecipe directly in menuRouteRegistry\n- Align Acoustics & Equalizer route/recipe and renamed developer tuner presets across ui-system\n- Update src/ui-core submodule to z/workstream-d-ui-cleanup\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/workstream-d-ui-cleanup"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "fc4795f60797ebb3073d9b12dfac5d7688a1a029",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Reconstruct true 120Hz server physics tick timestamps from client-recorded UE3 NetStream RigidBody keyframes (`RLReplayKeyframeDejitterer.ts`) and evaluate 120Hz Track A curves directly on de-jittered keyframes to eliminate ~15Hz partial-replication freezes and UDP arrival jitter\n- Fix `buildClassNetCacheLookup` parent resolution (`maxStreamId`) and `objToNode` matching (`nodeByObjectInd`, stripped `.Default__` class names, and largest `objectInd <= oid`) plus add `CurrentVoiceRoom`, `ReplicatedWorstNetQualityBeyondLatency`, `InfectedStatus`, and `ClientFXInfectedType` to `RLReplayNetStreamDecoder.ts` so all multi-mode `.replay` files parse without `Invalid UTF-8 string length`\n- Exclude spectator/referee/observer PRIs (`bIsSpectator` / `bOnlySpectator` without a linked car pawn) and bound fallback car slot scanning by `NUM_CARS` so extra `Orange #6` spectator slots are never added\n- Look ahead for `Engine.Pawn:PlayerReplicationInfo` on car spawn, ignore keyframe re-announcements of live car actors, evict demolished stale car actors on respawn, and add a deterministic `carIndex` tie-breaker to `VehicleNameTagCanvasRenderer.ts` to eliminate flickering/swapping player name tags\n- Register `onInterpolationMethodChange` and `onNonPovInterventionModeChange` in `ReplayToRcsImporterController.ts` without recursive store re-entry\n- Check coordinate deviation and sleep threshold when `deltaTicks === 0` in `ballTrajectoryPolicy.ts` and clear stale `ballTrajectoryPredictor` state during replay sessions so no residual line connects the ball to `(0, 0, 93)`\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/replay-to-rcs-importer"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "02d8a85f2a774160c04264cd82877d4543b4e998",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "Implement all 7 Generation-3 structural and semantic architecture guards:\n1. Anti-Gut-Sharing & In-Place Mutation Guard ([PIPELINE MUTATION VIOLATION], [CROSS-CONTROLLER GUT-SHARING], [WIDE-WAIST PORT VIOLATION]).\n2. Anti-Pass-Through Proxy Guard ([PROXY BLOAT VIOLATION] for >8 pass-through getter/setter accessors).\n3. Bimodal Volume & Micro-Fragment Guard (580L soft waterline, 680L hard ceiling, <65L single-reference warning).\n4. Code Style & Terminology Guard (English-only/Zero-Emoji, soccer/soccar ban, zero value re-export facades).\n5. Anti-any Boundary & Density Guard ([UNTYPED ANY VIOLATION]).\n6. UI Route & Floating Window Alignment Guard (menuRouteRegistry Layer*Recipe purity & 1:1 PascalCase FloatingWindow naming).\n7. Repo Hygiene Guard ([DUPLICATE LOCKFILE VIOLATION]).\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/gen3-architecture-radar"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "b4aac6ee08f7cedd6dce7081e27fb1be6cb3dbfa",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Reset RocketSim WASM boost pads (resetKickoff) and 3D BoostPadSystem visuals on shot reset so collected big/small pads are immediately restored\n- Record replay frames continuously at 120Hz starting from shot reset through countdown and waiting-input phases into live/goal phases\n- Resolve Apply Old (video description spec) vs Apply New (latest Kevpert F1-F12 binds) in staticTrainingVariationMath\n- Update src/ui-core submodule with TrainingB catalog (139 packs), Kevpert Old/New binds, and folder hierarchy\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/dev-sandbox-tem-pack-importer"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "ce13b83ceb7797032f5657ba86b327900960d3d6",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Extract pure FOV conversion, mode-priority arbitration, and Three.js/Unreal pose snapshot calculation from CameraManager, FreeCameraController, and RearViewCamera into cameraFovAndPosePipeline\n- Extract kickoff spawn coordinate mirroring, suspension settling clamping, and isolated WASM PPO ghost timeline precomputation from KickoffEpisodeSubController into kickoffGhostPrecomputePipeline\n- Extract Driftwoods stadium mesh classification, Standard/Lambert material pair instantiation, and shader uniform synchronization from DriftwoodsMaterialManager into driftwoodsMeshMaterialPipeline and replace all 27 untyped any fields with explicit Three.js and config interfaces\n- Replace all 30 untyped any usages in ArenaVehicleRegistry with explicit TypeScript interfaces and remove unused nodeDispose\n- Inline single-caller StadiumEnvironmentManager into ArenaWorld and remove redundant shallow-copied lighting/vehicleRegistry properties\n- Merge single-caller freeplayBallControlPipeline into ballPredictionPipeline\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/workstream-c-camera-kickoff-arena-slim"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "b4aac6ee08f7cedd6dce7081e27fb1be6cb3dbfa",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Add decoupled VehicleAerialClimbTracker to track hold-jump + pitch-up and double-jump climb intent in the background across frames regardless of camera frustum visibility\n- Ensure on-screen name tag pills never display the yellow aerial climb ring while off-screen boost circles immediately light up when an ascending car leaves the view\n- Extinguish latched climb state immediately as soon as upward velocity drops below threshold or disappears\n- Support live POV car action simulation in the 6-Car Kickoff Name Tag Tuner and update src/ui-core submodule\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/name-tag-aerial-climb-tracker-and-inward-ring"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "49c3389426e021de31bbd6aa194c74e8fedb6760",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "1. Add Dual-Space Trajectory Anomaly Recorder (Space A car-hit baseline vs Space B anomaly recompute + 90-tick rolling physics history) with one-click JSON export, clipboard copy, popup alert, and reset/re-arm.\n2. Fix incremental tail shift validation and proactive tail seam batch refresh so floor-sidewall, ceiling-sidewall, and corner curves stay continuous without horizon collapse or stale buffer drift.\n3. Track ballStateWriteRevision and multi-tick car-ball contact follow-through to prevent false non-car deviation triggers.\n4. Update src/ui-core submodule with BallTrajectoryAnomalyDebugCard.\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/trajectory-anomaly-debug-and-seam-fix"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "57c12cbf2e07b2839a256ef8bd7c3da2d938b25a",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Render SupersonicWheelRibbon with a pre-occlusion pass (renderOrder 0.05) before semi-transparent stadium border/goalpost overlays (renderOrder 0.1..0.6) so borders alpha-blend on top of the trail with clear depth layering instead of depth-clipping it\n- Pair with a stencil-gated foreground pass (renderOrder 14, stencilRef = 2, mask = 0x02) matching BallTrajectoryTubeRenderer so trails in front of semi-transparent borders render cleanly in the foreground\n- Move ArenaBlobShadowSystem ground decals to renderOrder 0.02 so blob shadows render before pre-occlusion trail/trajectory passes and remain visible through semi-transparent stadium borders\n- Align midColorPosPct shader fallback to 24.1 and sync RCUIModule tuner preset metadata\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/supersonic-wheel-trail-occlusion-pass"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "cd98e7c17218ed0028ac009370abdae7967f941b",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Remove redundant pnpm-lock.yaml and pnpm-workspace.yaml to standardize on package-lock.json and prevent lockfile drift\n- Upgrade scripts/radar.ts to enforce English-only source (blocking CJK characters), neutral ball/arena terminology (/socc[ae]r/i), and zero value barrel re-exports\n- Add narrow-waist static checks in scripts/radar.ts for proxy getter/setter bloat (>15 forwarding accessors) and disguised cross-file state-bag/sub-controller in-place mutations (sessionState, directorCameraState, directorState, lifecycleCtrl, domain, ch)\n- Update AGENTS.md to document the expanded narrow-waist, terminology, and single-lockfile invariants\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/radar-guardrails-and-lockfile-cleanup"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "b4aac6ee08f7cedd6dce7081e27fb1be6cb3dbfa",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Isolate Stage 2 auditRequiredAssets Range probes with ?__rc_audit=1 and cache: no-store while cleanly draining 16-byte 206 responses so browser HTTP caches never store sparse 206 entries or emit HTTP/2 RST_STREAM on canonical GLB URLs\n- Strip If-None-Match and If-Modified-Since on Range requests in vite.config.ts before sirv runs so byte-range requests always return 206 Partial Content instead of empty 304 responses that wedge browser sparse cache entries\n- Resolve Git worktree commondir and HEAD reflog in rcGitHeadAutoRestartPlugin, destroy active HTTP/2 sessions on server close, and broadcast full-reload after server.restart() settles\n- Add bounded timeout and cache-reload retry to THREE.FileLoader fetch interceptor and loadDriftwoodsQ1GroundTexture so interrupted streams automatically recover instead of stalling for 60s\n- Parallelize active vehicle GLB and boost pad template loading in loadCarAndPadAssets and report active in-flight assets in runParallelArenaAssetSteps instead of leaving completed Ball Geometry on screen\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/fix-stage4-asset-stream-and-vite-restart"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "b4aac6ee08f7cedd6dce7081e27fb1be6cb3dbfa",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Always keep the focused POV car trail flat on the driving surface in normal play while tilting other cars toward the camera\n- Support povForceUprightPreview override to stand the POV car trail 90-deg upright in-place for live calibration\n- Pivot upright trails from the ground-contact hinge along normalPerp and scale vertical height (uprightHeightScale) above wheel axle height without clipping underground\n- Remove unused near/far tilt distance thresholds and sync calibrated 3-stop Bezier defaults\n- Bump RCUIModule submodule to include updated Supersonic Trail Tuner controls\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/supersonic-wheel-trail-pov-and-hinge"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "86982b410e4d5c4ebb80ee490f05a6c3aaec4a0b",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Default unified/shared boost accent color to pure white (#ffffff) and unfilled base background opacity to 0.1\n- Project off-screen and behind-camera vehicles onto ROI-clamped screen edges with a pure boost circle and isosceles arrow\n- Detect airborne vehicles that expended their second jump/flip while climbing (isDoubleJumpedAndClimbedHigher) and render an outer glow\n- Sync src/ui-core submodule with off-screen and aerial climb alert tuner controls\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/name-tag-offscreen-indicators-and-aerial-glow"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "b3df7fc793d0b009c7c79feb90202052d43f7e59",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Import 61 new .Tem packs from TrainingA.zip into Dev Mode .RLRCSPack catalog (134 total)\n- Map video-exact Kevpert BakkesMod variations and classify Psyonix Progression packs\n- Fix post-Goal Replay freeze (missing clearReplayState on useHudStore) and restore static trajectory line preview on next shot\n- Upgrade 3D Car Direction/Speed Arrow with 3D standard shading, silhouette shadow shell, radial clarity halo, semi-transparency, rounded tip cone, and live Floating Window Tuner controls\n- Play countdown audio only on 3, 2, 1 (never 4, >3, or 0) and set expired ball opacity to 70% on 0s ground impact\n- Add Override Unlimited Boost as 100 (default ON: top HUD shows INF while arena & bottom-right gauge consume from 100)\n- Update StaticTrainingVariationsModal with read-only Kevpert presets and Custom bidirectional dual-thumb sliders\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "7d7942dcadf411b9ef1b0d50c39aed09d064421f",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Modularize supersonic wheel trail into src/entities/vehicle/supersonic-trail/ (Shader, Geometry, Ribbon, System, ConfigPort) and remove monolithic vehicle-root files\n- Eliminate -1t head flicker/jitter via sub-tick wheel contact interpolation, live-head + committed-knot separation, and continuous age-window trajectory resampling\n- Implement view-adaptive camera tilt with ground-hinge lift so trails hug the ground when close/aligned, tilt with the camera during drifts, and stand upright at long distances without clipping into the floor\n- Implement 3-stop White -> Pink -> Purple fragment shader with dual Cubic-Bezier curve evaluation\n- Bump RCUIModule submodule to include modular Supersonic Trail Tuner and updated calibrated defaults\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/supersonic-wheel-trail-refinement"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "b253f88c9d04827f231034ed3616c64dd1654dc5",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Add reusable StateInterpolationPipeline.ts (shortest-arc Quaternion SLERP with hemisphere sign check, Velocity-Clamped Cubic Hermite & Linear position interpolation, teleport hard-cut threshold, and wheel suspension derivation)\n- Add Rocket League .replay binary header/NetStream parser and 120Hz converter pipeline in src/replay/rl-importer/\n- Preserve native .replay telemetry and unmapped property audit in V2 binary container Track Delta (trackDelta) without synthesizing fake kickoff countdown signals\n- Add ReplayToRcsImporterController and ReplayImporterInterventionSubController supporting 4 non-POV intervention modes (disappear, trajectory, nexto, necto) and .rcreplay.gz pack export\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "02d8a85f2a774160c04264cd82877d4543b4e998",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Update src/ui-core submodule to absorb 6D floating window boundary height clamping, vertical truncation, and edge-squeeze auto-shrink fixes for Boost & Name Tag Tuner and all diagnostic windows\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/fix-floating-window-adaptive-bounds"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "2c8b8b42324e826b8392628855a110bb33f0271d",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "Add SupersonicWheelTrailSystem and SupersonicWheelRibbon to render independent left/right rear-wheel contact trace ribbons with -10t to -60t age windowing, white-to-purple self-luminous gradient, head-to-tail width taper, surface-normal alignment, automatic air/ball/car contact segmentation, and live floating window tuning.\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/supersonic-wheel-trail"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "73a6a30f6eb562fdaf4780481ae44bf6c40e2b45",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Merge 714cdbf40ed138e7d87de5f0fdc327456788588b (z/cloud-profile-refinement) with all 8 decoupled & feature branches\n- Split CloudProfileMqttTransport.ts out of CloudProfileSyncClient.ts to keep all modules well below line limits\n- Rename cloudProfileRecordHelpers.ts to cloudProfileRecordPipeline.ts for Gen-2 role suffix compliance\n- Point src/ui-core submodule to unified verified commit b4aac6ee08f7cedd6dce7081e27fb1be6cb3dbfa\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/unified-refactor-merge"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "b4aac6ee08f7cedd6dce7081e27fb1be6cb3dbfa",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "Merge remaining feature/fix branches onto Group 1 decoupled architecture:\n- 648120ad7c6b594da7897e7e7f8f2d7033f8230c (z/name-tag-boost-progress-and-ball-occlusion)\n- 053188b19528c5ab1a9ae11e778bdf35e789fbd6 (z/unison-loopback-freeplay)\n- d182fcdd0ff21f574cf3b2b03acdf0b57873d151 (z/training-mode-scope-and-pov-hitbox)\n\nMigrate runtimeTunerAndReplayPorts changes into runtimeTunerPort.ts and runtimeReplayAndDiagnosticsPort.ts, and reconcile loopback Free Play detection with training mode scope guards.\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "5881b2b4bbb9ebc50a95836d23d082bd75ee7bc3",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "Merge Group 1 refactoring branches:\n- 4513d3a370ae82b91480d86ded0dfd6cdddec36e (z/decouple-network-and-physics)\n- 0e0ad86a663e115820831eb191e8f8b1be616422 (z/decouple-runtime-and-ports)\n- 4b44eb334f9827d9269c0baab692e815eee6fc15 (z/clean-entities-and-audio)\n- 807a4ce934f486c5a7d6c2074a75b9344cb8968f (z/clean-ui-core-and-routes)\n- fd40033b8757c68e75478c741e287ba7fb450a74 (z/decouple-replay-and-lab)\n\nAlso fix ArenaMath.interpolatePhysicsTransform parameter unpacking when alphaParam is undefined.\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "5881b2b4bbb9ebc50a95836d23d082bd75ee7bc3",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Reuse Layer4StaticTrainingPackBrowseRecipe (isDevMode=true) in Developer Sandboxes\n  (\"Static Training Packs (Dev Mode)\") and remove obsolete Layer3DevTemPackConverterRecipe\n- Map VelocityStartRotationR and EditorFreeCam into StaticTrainingShotItem, syncing Three.js\n  FreeCameraController pose when entering/leaving Edit Mode free-cam sub-mode (.RCSPackE)\n- Apply BakkesMod / Kevpert F3-F12 Training Variations and Quick Toggles (More Boost 0..100,\n  Disable Ball/Vehicle Variance, Disable RLRCSPack/Global Angular Velocity) in StaticTrainingPackMode\n- Built-in Dev Mode catalog of 73 unique training packs from Training.zip with Folder/Rank/Date\n  filtering and batch .zip import/export\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "dbf365a2257e7e8557d91c907901cad523cff851",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Render car hitbox wireframe only on active POV vehicle when Show POV Hitbox is enabled\n- Support Show All Car Hitboxes developer override across all arena vehicles\n- Isolate Free Play boost, Disable Goal Reset, and Rewinder to offline Free Play so Exhibition and Multiplayer are never overridden\n- Automatically suspend and restore Goal Barrier collision chunks and visuals across Training vs Exhibition/Multiplayer transitions\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/training-mode-scope-and-pov-hitbox"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "9e8bddb974c021507880aa33c9bee2bfb1035f6c",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Bind prewarmed Loopback AuthoritativeServerHost + PredictionReconciler upon background asset pipeline completion in GameBootstrap when still in Free Play\n- Rebind unexposed Loopback AuthoritativeServerHost (training mode, 30s FIFO, goal replay enabled) when returning to Free Play from online sessions or bot matches\n- Deduplicate FreeplayGoalAndTouchSubController local goal state machine when authoritative server / reconciler is attached while preserving local touch tracking and Rewinder ring buffer recording\n- Stream continuous state-only snapshots per tick in StandaloneReplayViewerController and FreeplayRewinderController (playing, rewinding, forwarding, preroll-countdown) and apply state-only frames on passive remote clients\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/unison-loopback-freeplay"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "18814c4afcf2d07d143165da4feb6affa99d054b",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "Decouple >665-line modules in src/network/ and src/physics/ into pure pipelines and stateful sub-controllers:\n\n- Extract authoritativePhysicsStepPipeline.ts from PhysicsEngineManager.ts (676L -> 520L)\n- Extract matchSessionRoleSwitchPipeline.ts from MatchRosterSubController.ts (673L -> 487L)\n- Extract advancePlayingClockState into matchLifecyclePipeline.ts from MatchPhaseLifecycleSubController.ts (668L -> 623L)\n- Extract stateful ClientClockPacingController.ts from PredictionReconciler.ts (666L -> 562L)\n- Extract stateful PhysicsPossessionTracker.ts and pure WASM helpers from RocketSimPhysicsEngine.ts (676L -> 624L)\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/decouple-network-and-physics"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "5881b2b4bbb9ebc50a95836d23d082bd75ee7bc3",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Split `src/game/runtime/runtimeTunerAndReplayPorts.ts` (610L) into `runtimeTunerPort.ts` (271L) and `runtimeReplayAndDiagnosticsPort.ts` (353L)\n- Extract domain port contracts (`RuntimeCameraPort`, `RuntimeMatchPort`, `RuntimeTunerPort`, `RuntimeReplayPort`, `GameRuntimeUiBridgePort`, and option/telemetry/diagnostic buffer contracts) into `src/game/runtimeDomainPortTypes.ts` (233L), reducing `runtimeUiPort.ts` to 495L and `runtimeUiStorePortTypes.ts` to 569L while keeping `runtimeUiPort.ts` exports 100% intact\n- Encapsulate transient audio latch fields (`lastRemainingSec`, `last10sCountdown`, `lastGoalScored`, `lastOvertime`, `lastCountdown`, `lastBoostPressed`, `lastPhase`) inside `GameAudioSubsystem` and goal-replay camera override state (`_goalReplayCameraOverrideActive`, `_goalReplayCameraOverrideSources`) inside `GameCameraSubsystem`\n- Remove secondary Re-export Facades in `OnlineSessionCoordinator.ts`, `runtimeDomainPorts.ts`, and `RuntimeSignalDomainSubController.ts`\n- Unify `src/game/runtime/` filenames with exported class names (`OnlineRosterSyncCoordinator.ts`, `ReconcilerSignalCoordinator.ts`, `RuntimeSignalDomainSubController.ts`, `RuntimeWindowHotkeysController.ts`)\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/decouple-runtime-and-ports"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "5881b2b4bbb9ebc50a95836d23d082bd75ee7bc3",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "Preserve active watchUserDevSlot subscriptions across record fetches, reuse dev credentials on the shared MQTT transport, initialize the profile sync bridge on UI mount, and bump src/ui-core.\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/cloud-profile-refinement"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "06b2cdf4395c6408ff929350aa35a8d2fa14febb",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Remove unused constants (ARENA_WIDTH, ARENA_LENGTH, ARENA_GOAL_DEPTH, TEAM_BLUE_HEX, TEAM_ORANGE_HEX, BUFFER_OFFSETS, BOOST_PAD_OFFSET, WHEEL_STATE_STRIDE) and re-exports (CAR_STATE_OFFSETS, CAR_STATE_STRIDE, resolveAssetPath) from ArenaConstants.ts\n- Import resolveAssetPath directly from AssetResponseValidator.ts in ArenaSky.ts\n- Add strict TypeScript parameter, property, and return types to ArenaAssetLoader.ts, StadiumEnvironmentManager.ts, VehiclePaint.ts, ArenaMath.ts, DriftwoodsColorMath.ts, ArcadeBoostParticleMesh.ts, and RealisticBoostParticleMesh.ts\n- Rename arcadeParticleMesh.ts and realisticParticleMesh.ts to PascalCase ArcadeBoostParticleMesh.ts and RealisticBoostParticleMesh.ts to match their exported class names\n- Consolidate playClick into SignalAudioEngine.ts and GameAudioEngineFacade.ts and type previewAudioDetail parameters\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/clean-entities-and-audio"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "5881b2b4bbb9ebc50a95836d23d082bd75ee7bc3",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Update MenuShell.tsx and menuRouteRegistry.tsx to import StaticTrainingShotInspectorDrawer\n- Rename legacy botDifficultyParentRef to exhibitionParentRef in menuRouteRegistry.tsx and MenuShell.tsx\n- Remove unused ROUTE_TO_PANEL_ID and LivePreviewAnimPhase re-export from MenuShell.tsx\n- Update src/ui-core submodule to 4e832ae3 (z/clean-ui-core-and-routes)\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/clean-ui-core-and-routes"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "4e832ae31e6171894349958ed8c708d8fce5bc9a",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Extract 20 state interfaces and initial state factory functions from ReplayDirectorStatePipeline.ts into replayDirectorStateTypes.ts\n- Extract podium showcase state machine and replay JSON export assembly from GoalReplayLabTab.ts into GoalReplayPodiumSubController.ts\n- Declare explicit base lifecycle and mode interface members on BaseGameMode.ts and remove the [key: string]: any index signature\n- Rename KickoffPPOHelpers.ts to kickoffEpisodePrimitives.ts and remove secondary re-exports of preloadKickoffPPOWeights and KICKOFF_SPAWNS\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/decouple-replay-and-lab"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "5881b2b4bbb9ebc50a95836d23d082bd75ee7bc3",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Unify 2D high-DPI overlay & 3D sprite fallback rendering in VehicleNameTagCanvasRenderer.ts with src/ui-core/config/nameTagPillRenderer.ts (supporting bottom-up-fill, left-right-fill, sunset-circle, and border-only modes)\n- Add projectBallOcclusion2D in VehicleNameTagProjector.ts and wire destination-out ball silhouette masking into VehicleNameTagSystem.ts\n- Route getNameTagConfig and subscribeNameTagConfig through runtimeUiPort.ts to preserve strict engine/UI boundary isolation\n- Bump src/ui-core submodule with purified L1 nameTagConfig, split NameTagTunerFloatingWindow sections, and calibrated 5H defaults\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/name-tag-boost-progress-and-ball-occlusion"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "2cd82f33f9d342704344c2a59612e8825dd7e78b",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "Implement pure-TS Rocket League .Tem SaveData decryption (AES-256-ECB + MSB CRC32),\nUE3 property tree deserialization for both v34 local and v32 online training packs,\nand a Developer Sandboxes .Tem-to-.RCSPack converter with JSON attribute preservation.\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "3f3b8f3f3528c9b359518ced5d2c00884afb8133",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Merge 6cbe228f4ea50bdb2518fcb4c1334a6971fd7bfb onto b39f51aac05056fce36752344377df87e252f6e1\n- Keep roomCodeConnectivityCodec SSOT in src/ui-core/config/roomCodeConnectivityCodec.ts (removing duplicate src/network/transport/roomCodeConnectivityCodec.ts)\n- Point SignalingCryptoSession and MultiplayerSessionManager to src/ui-core/config/roomCodeConnectivityCodec.ts and src/network/transport/diagnostics/signalingDiagnosticsProbe.ts\n- Complete MultiplayerSessionManager methods (reprobeAndRefreshHostSignaling, notifyMatchStarted, notifyReturnedToLobby, and onRelayHealthChanged) for runtimeDomainPorts\n- Update src/ui-core submodule to 5881b2b4 (merging b41e2979 into 18814c4a and wiring DeveloperTab signaling match relay policy store bindings)\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/merge-b39f51aa-6cbe228f"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "5881b2b4bbb9ebc50a95836d23d082bd75ee7bc3",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Key MQTT account index and user/dev profile slots by immutable userId while supporting login by mutable username\n- Add deterministic 7-char commit hashes (revHash) to user/dev slot payloads and account index entries\n- Make watchUserDevSlot auto-resubscribe across MQTT WebSocket reconnects and surface index metadata updates\n- Update src/ui-core submodule to 18d7123e\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "18d7123efb4e1667da09cf9e4d297de2bead49f8",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "Unify and merge Phase 2 Unison Loopback Authority commits (bd145557 and 1b2aef37) onto 26b6f527:\n\n- Keep SYSTEM_CONTROL_SIGNALS (SYS_CTRL_STATE_ONLY=0xA0, SYS_CTRL_INTERVENE_WILL_RESUME=0xA1, SYS_CTRL_PHYSICS_RESUME=0xA2), CLIENT_COMMAND_TYPES (0xC9..0xCB), and MatchSystemControlSubController from bd145557.\n- Set default COUNTUP_FIFO ReplayRingBuffer and Freeplay Rewinder rolling window capacity to 30 seconds (3,600 ticks @ 120Hz, ~6.45 MB) with FIFO shift on full buffer and automatic filtering of SYS_CTRL_* signals from exported replay containers.\n- Integrate HostLoopbackChannel, AuthoritativeServerHost, workerTrainingAndPhysicsRouter, GameRuntime, and runtimeTunerAndReplayPorts forwarding for controlBall, setBallState, setDisableGoalReset, setUnlimitedBoost, and requestResumeWithCountdown from 1b2aef37.\n- Wire MatchPhaseLifecycleSubController.stepFrame() to invoke systemControl.stepStateOnlyFrameIfActive() and pass unified training ruleset flags (trainingDisableGoalReset, trainingGoalReplayEnabled, trainingGoalCelebrationTicks) into evaluateGoalScoredOutcome.\n- Extract processHostLoopbackChannelPacket into HostServerFallbackSubController.ts to keep AuthoritativeServerHost.ts well below the architecture radar waterline.\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/merge-phase2-unison-loopback-26b6f527"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "18814c4afcf2d07d143165da4feb6affa99d054b",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "Implement Phase 2 Unison Loopback Authority, System Control Mode signals, and 30-second FIFO RingBuffer:\n\n- Add SYSTEM_CONTROL_SIGNALS (SYS_CTRL_STATE_ONLY=0xA0, SYS_CTRL_INTERVENE_WILL_RESUME=0xA1, SYS_CTRL_PHYSICS_RESUME=0xA2) and CLIENT_COMMAND_TYPES (CMD_SYS_STATE_ONLY=0xC9, CMD_SYS_INTERVENE_COUNTDOWN=0xCA, CMD_SYS_PHYSICS_RESUME=0xCB) in RocketSimConstants.ts and GlobalPayloadCodec.ts without recompiling WASM.\n- Create MatchSystemControlSubController.ts under src/network/server/match/ owning authoritative state-only projection, pre-roll takeover countdowns, live physics resume, and homologous Training/Freeplay ruleset configuration.\n- Set default COUNTUP_FIFO ReplayRingBuffer duration to 30 seconds (3,600 ticks @ 120Hz, ~6.45 MB) across ReplayRingBuffer.ts and FreeplayMode.ts, with instant highlight export (exportRecentHighlightReplay) and automatic filtering of SYS_CTRL_* signals from pure match/freeplay replay containers.\n- Wire Rewinder Configurator, Standalone Replay Viewer, and ReplayTakeoverSubController to emit SYS_CTRL_STATE_ONLY -> SYS_CTRL_INTERVENE_WILL_RESUME -> SYS_CTRL_PHYSICS_RESUME transitions and synchronize with AuthoritativeServerHost & PredictionReconciler.\n- Extend deterministic scenario baseline suite (builtinBaselineScenarios.ts) to verify 30s FIFO RingBuffer capacity and end-to-end SYS_CTRL_* transitions in both Single Player and 6-car Multiplayer Loopback.\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/unison-loopback-authority"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "e52471dcae323f2f1c95ecc112784800e17ca894",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Implement CloudProfileSyncClient over MQTT v3.1.1 WebSocket retained messages on rc_cfg_8b3d_v1.\n- Strip developer credentials (CNRCConfigDevV1) automatically when exporting .rctbnspib user bundles.\n- Wire runtimeProfileSyncBridge between CloudProfileSyncClient, CredentialBundleManager, and useCloudProfileSyncStore.\n- Update src/ui-core submodule to z/cloud-profile-sync-and-remote-tuner.\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/cloud-profile-sync-and-remote-tuner"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "5f1e282be9f000d5200879aeb43b91b3389e22c7",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "Co-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/signaling-identity-and-relay-lifecycle"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "b41e297920b155e8de80f28999012f4a24e342bc",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Separate immutable room identityKey (seed:<n> / custom:<prefix>) from 4-bit hostMask so deriveDeterministicRoomContext never changes topicHash when mask updates\n- Restrict 4-digit random seed to 0..199 and mask to 1..15 (3,000 valid codes, rejecting 70% of random typos in 0ms locally)\n- Extract SignalingRelayFactory and SignalingRelayLifecyclePolicy (SessionRelayUsageTracker + SignalingRelayHealthSupervisor)\n- Add bounded per-relay auto-reconnect (max 2 retries before yellow degraded warning), manual Host re-probe (reprobeAndRefreshHostSignaling), and Match-phase relay convergence (smart-prune vs keep-all-probed)\n- Remove 1.5s _clientBridgeFallbackArmed timer so direct-shared routes never trigger Edge Function bridge\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "e52471dcae323f2f1c95ecc112784800e17ca894",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Unify positive count-up FIFO circular replay buffer default capacity to 90s (10,800 ticks @ 120Hz) across ReplayRingBuffer, FreeplayRewinderController, ReplayTakeoverSubController, and AuthoritativeServerHost\n- Configure AuthoritativeServerHost.hostReplayRingBuffer to switch between COUNTUP_FIFO (training/warmup/lobby) and COUNTDOWN_MATCH (regulation matches) with anytime highlight export fallback\n- Unify training ruleset in MatchDomainState, MatchPhaseLifecycleSubController, MatchGoalReplaySubController, and matchLifecyclePipeline (supporting trainingDisableGoalReset, trainingUnlimitedBoost, trainingGoalCelebrationTicks=150, and optional Director Goal Replay in training mode)\n- Forward controlBall, setBallState, setDisableGoalReset, and requestResumeWithCountdown through HostLoopbackChannel, AuthoritativeServerHost, and workerTrainingAndPhysicsRouter\n- Synchronize authoritativeServer and networkReconciler during Rewinder scrubbing, seeking, preroll countdown, and live Freeplay takeover handoff\n- Add Phase 2 scenario assertions in builtinBaselineScenarios.ts and verify green baseline report\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/old-uni"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "e52471dcae323f2f1c95ecc112784800e17ca894",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "1. Merge 4 Completed Branches onto `z/merge-four-post-7b4785e6`:\n   - `7b4785e61580688a44d955b8483cd74fc6e6fd8d` (`z/shader-prewarm-and-narrow-decouple`): replay shader prewarming (+0 runtime shader compiles) and narrow-waist router/Freeplay SubController decoupling.\n   - `14d59a3d597108cbbd4a4095320afee56ce18656` (`z/sanitize-private-profile-repo-discovery`): content-hash-based private profile repository and sibling checkout resolution without repository name heuristics.\n   - `292b25ae679d427bc91f63311ffb31c8318bb804` (`z/fix-exp-multibots-and-botpack-perf`): Multi-Bots vs Bot Pack #9700488 route decoupling and scoped WASM ball prediction horizon.\n   - `00030758ec5d2af8f8bd29de60f2ddde61d37498` (`z/fix-room-code-stability-and-touch-bot-team`): immutable host room code across relay pool changes and accurate touch bot team resolution.\n\n2. Additional Security & Architecture Hygiene Audits (Post-`14d59a3d`):\n   - Remove hardcoded private profile `topicNamespace` (`rc_7e2a4d_v2`) across `signalingRelayConfig`, `signalingRelaySlotRegistry`, `CredentialBundleManager`, `SignalingCryptoSession`, `SupabaseRealtimeSignalingClient`, `signalingDiagnosticsProbe`, `signalingFourServerProbe`, `SignalingFourServerLoopbackHarness`, `rctbnspibBundleCliPipeline`, and `src/ui-core` (`recipes/dev/signalingLabTypes.ts`), defaulting to neutral placeholder `rc/sig` when no private profile or `.rctbnspib` bundle is active.\n   - Replace private RFC 1918 LAN IPs (`192.168.1.x`) in `signalingFourServerScenarios.ts` and `vite.config.ts` with RFC 5737 documentation IPs (`192.0.2.x`).\n   - Remove inline `SIMD_MATVEC_WASM_BYTES` byte array from `wasmSimdMatVec.ts` and load co-located `simdMatVec.wasm` via `new URL(\"./simdMatVec.wasm\", import.meta.url)` to comply with the zero-inline-binary architecture boundary.\n   - Add automated guard in `scripts/radar.ts` against private profile repository name or topic namespace leaks.\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/merge-four-post-7b4785e6"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "18814c4afcf2d07d143165da4feb6affa99d054b",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Merge 14d59a3d into 2fa4ac84 (resolving ArenaWorld.ts, BallTrajectoryPredictor.ts, AuthoritativeServerHost.ts, and src/ui-core submodule conflicts)\n- Update src/ui-core submodule to 3e86f1a1 (merging a2fcaafe into 85e44565)\n- Rename pure non-class modules IncidentSpatialModulator.ts -> incidentSpatialModulator.ts and SpatialAudioDebugGeometries.ts -> spatialAudioDebugGeometries.ts to match camelCase pure-pipeline conventions\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/sync-with-14d59a3d"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "3e86f1a13bee47dbbf020c8ab23aa4f5eaeb4b20",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Replace the explicit repository name in AGENTS.md with a neutral description (\"the untracked private profile repository\").\n- Remove repository name keyword scoring and filtering (\"rocketcompanion\" / \"profile\") in scripts/privateProfile/profileRepositoryResolver.mjs, resolving the private profile repository purely via PRIVATE_PROFILE_HASH content fingerprint across accessible private repositories.\n- Replace the hardcoded sibling repository directory name in scripts/syncPrivateProfile.mjs with resolveMatchingSiblingProfile so local sibling checkouts are also matched strictly by PRIVATE_PROFILE_HASH.\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/sanitize-private-profile-repo-discovery"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "a2fcaafe471b864dfa5e74e90dd169d08ea6c50a",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "1. Eliminate Runtime Shader Compilation Hitch (121 -> 121 programs, +0 runtime compiles):\n   - Bind EffectComposer's offscreen RenderTarget (`composerRenderTarget`) during `compileSceneAsync` and `RuntimeBloomOcclusion` bloom material compilation so Three.js `WebGLPrograms.getParameters` compiles scene materials with `NoToneMapping` and `LinearSRGBColorSpace` (matching `EffectComposer.RenderPass` and `BoostBloom` at runtime).\n   - Mirror `ArenaLighting` non-POV directional light visibility (`ballSun` and `opponentSun` hidden when `allowShadows === false`) during Stage 5 shader prewarming and execute both `renderBloom()` and `renderFinal()` per unique light-rig key.\n   - Parent `VehicleBoostEmitter.light` (`PointLight`) directly to `scene` (transforming its nozzle offset via `car.localToWorld`) so toggling Car 0 visibility does not alter `NUM_POINT_LIGHTS`.\n   - Measure `RenderStage` duration before `gl.getError()` sync in `VirtualClockFastForwardDriver.executeForcedKeyframeRenderPass`.\n   - Verified via `runScenarioBaseline.mjs`: `phase_goal_to_replay` (`FirstReplayRender`) drops from 4,968.20 ms (+24 shaders) to 3.70 ms (+0 shaders) in Freeplay and from 6,307.40 ms (+24 shaders) to 14.80 ms (+0 shaders) in 6-car Multiplayer.\n\n2. Narrow-Waist & Stateful SubController Decoupling (Phase 2 Preparation):\n   - Split `HostWorkerMessageRouter.ts` (678 -> 342 lines) into narrow-waist domain routers `workerReplayAndDiagnosticsRouter.ts` (186 lines) and `workerTrainingAndPhysicsRouter.ts` (194 lines).\n   - Extract `FreeplayGoalAndTouchSubController.ts` (206 lines) from `FreeplayMode.ts` (657 -> 475 lines) and configure Freeplay's `ReplayRingBuffer` to `COUNTUP_FIFO` with a 90s rolling window (`10800` ticks).\n   - Update `FreeplayRewinderController._ensureFreeplayMode` to accept `'freeplay'`, `'dev-test-lab'`, `'online-warmup'`, and `'training'`.\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/shader-prewarm-and-narrow-decouple"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "e52471dcae323f2f1c95ecc112784800e17ca894",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Register dedicated `exp-botpack-9700488` route and close experimental floating windows on Exhibition / Freeplay transitions\n- Synchronously instantiate inline `simdMatVec.wasm` (855B) at module load so WASM SIMD128 accelerates Bot Pack MLPs/Perceivers from tick 0 without Vite URL fetch failure\n- Reset `_staggered = false` in `ExperimentalBotAgent.reset()` so all 6 cars remain evenly staggered (1 inference/tick) across kickoff and goal resets\n- Scope WASM ball prediction horizon to each model's actual requirement (2.05s Fury/Galactus, 3.05s Ducky, 5.0s Ripple) and eliminate permanent `wasmFullHorizonActive` latch in `BallTrajectorySamplingController` and unconditional `updateBallPrediction(5.0)` in `ExperimentalMultiBotsRosterController` that degraded Exhibition to ~30 FPS\n- Avoid redundant `swapCarVisual` on spawn and preserve cached GLB `BufferGeometry` in `removeCarMeshes`\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/fix-exp-multibots-and-botpack-perf"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "a1e0cdbd0ba296a0f645581f8494253a46b7df11",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Losslessly merge 57226403 (z/audio-profiles-and-merge-fa46bb81) and ef6b4671 (z/merge-clean-six-post-f0501b12)\n- Update src/ui-core submodule to a2fcaafe (merge 974688b0 into 9a2887ae)\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/merge-5722640-ef6b467"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "a2fcaafe471b864dfa5e74e90dd169d08ea6c50a",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Add declarative ScenarioScript & telemetry report schemas (ScenarioTypes.ts, scenarioMetricsPipeline.ts)\n- Add VirtualClockFastForwardDriver for max-rate deterministic 120Hz virtual clock execution, per-stage wall-clock profiling (P50/P95/P99/Max), and keyframe WebGL shader compilation delta tracking\n- Add MultiClientLoopbackSimulator for 6-car (3v3) in-memory multiplayer loopback stress testing with 6 distinct 3D models, hitboxes, paint finishes, boost visuals, and boost audio variations\n- Add builtinBaselineScenarios (boot_and_freeplay_goal_replay and multiplayer_6car_loadout_stress) and ScenarioAutorunBootstrap\n- Add headless Linux + WebGL2 (ANGLE/SwiftShader) runner (scripts/runScenarioBaseline.mjs / npm run test:baseline)\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/scenario-telemetry-baseline"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "e52471dcae323f2f1c95ecc112784800e17ca894",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Keep `roomId` immutable (`this.roomId`) in `MultiplayerSessionManager.initHostSignaling` `onOpen` instead of re-encoding the room code with the first connected relay mask (`liveMask`), preventing 4-digit room codes (e.g. `1712`, mask `0xf`) from mutating on the UI (e.g. `8381`, mask `0x8`) when signaling relays connect or prune after a peer joins.\n- Fix `resolveTouchActiveCarsAndTeam` in `RuntimeInputPoller.ts` to read `useAppStore.getState().onlineSession.connectedPeers`, `onlineSession.localTeam`, `rosterSyncCoordinator.participantTeams`, `physics._carSpecs`, `arena.carTeams`, and `teamAssignment` rather than the non-existent top-level `appState.connectedPeers` or `carIndex % 2`, ensuring Touch Input AI agents (`nexto` / `necto`) know their true team and active car roster when players switch teams.\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/fix-room-code-stability-and-touch-bot-team"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "e52471dcae323f2f1c95ecc112784800e17ca894",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Merge fa46bb81 (z/fix-bootstrap-and-goal-hitch) into 03640b19 (z/merge-audio-spatial-eq-lod)\n- Resolve GameAudioSubsystem.ts conflict by retaining RemoteEngineAudioLodController while preloading turtle_modem engine audio pack assets in setupAudio()\n- Resolve BallTrajectoryPredictor.ts conflict by checking both tubeRenderer.group.visible and tubeRenderer.foregroundMesh.visible\n- Update src/ui-core submodule to 9a2887ae (merge e52471dc into d91af962 and calibrate DEFAULT_SPATIAL_ATTENUATION_PROFILES)\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/audio-profiles-and-merge-fa46bb81"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "9a2887aefcec7a148eca1c15e2282796be0a69f0",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Merge z/merge-clean-five-post-f0501b12 (4766ef81) onto z/fix-bootstrap-and-goal-hitch (fa46bb81)\n- Combine bootstrap 88%/40% hang fixes, Freeplay goal replay shader prewarm/material reuse, and lazy ReplayTimelineController diagnostics (fa46bb81) with the 5 post-f0501b12 branches (0c423491, 4c6f3f88, 73038797, c06716bc)\n- Auto-merge JSDoc .ts headers with cached template cloning in ThrowbackStadiumLoader.ts and in-place PBR/standard material updates in customGlbVehicleMaterials.ts\n- Update src/ui-core submodule to 974688b0\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/merge-clean-six-post-f0501b12"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "974688b09fe2f06d494a9c9f57cdc35dd3a81a90",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Replace bare requestAnimationFrame yield in ShaderPrewarmer with visibility-aware timeout fallback so unfocused/occluded/headless tabs never stall at 88%\n- Wait for parallel compilation of bloom occluder materials before executing synchronous boostBloom.render draw calls, and flush WebGL command queue during KHR_parallel_shader_compile\n- Prewarm both POV shadow-casting (allowShadows=true) and Director/FreeCam shadow-off (allowShadows=false) light permutations while pre-allocating the hidden opponent rig before Stage 5 so entering Goal Replay Director Camera never triggers synchronous stadium/vehicle shader recompilation\n- Update custom GLB vehicle surface materials in-place and guard setCarTeam/setCarColor/setCarPaintFinish against redundant updates so prewarmed MeshPhysicalMaterial programs are never disposed on replay start/end\n- Compute ReplayTimelineController director diagnostic pattern payloads lazily on demand instead of running 3 full-window simulation passes synchronously inside beginReplaySession\n- Cancel response body streams immediately after Range header inspection in auditRequiredAssets, fix untracked file byte accumulation in StreamDownloadTracker, skip redundant all-zero 2048x3000 mipmap pyramid builds in DriftwoodsMaterialManager, clone cached Throwback templates, and fix worker prewarm timeout handling\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/fix-bootstrap-and-goal-hitch"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "e52471dcae323f2f1c95ecc112784800e17ca894",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Merge z/zero-hardcoded-broker-and-neutral-ball-terms (c06716bc) onto 4-branch baseline (03059f48)\n- Parameterize PUBLIC_FALLBACK_BROKER_URL to empty default and resolve runtime fallback via resolvePublicFallbackBrokerUrl (?publicBroker= / VITE_PUBLIC_FALLBACK_BROKER_URL)\n- Enforce neutral ball/carball terminology and zero hardcoded broker.emqx.io endpoints in AGENTS.md and scripts/radar.ts\n- Update src/ui-core submodule to 974688b0 (merge e52471dc, e220bf55, and 719a6fd3)\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/merge-clean-five-post-f0501b12"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "974688b09fe2f06d494a9c9f57cdc35dd3a81a90",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Merge z/aggressive-bootstrap-and-dev-lock (7b274b7b): streamline Free Play bootstrap and preload deferred assets & workers\n- Merge z/baseline-precheck (0c423491): unify roomCodeConnectivityCodec SSOT in src/ui-core/config/ and enable src/ui-core/ orphan detection in scripts/radar.ts\n- Merge z/decouple-transport-diagnostics-and-profile-sync (4c6f3f88): isolate signaling diagnostics under src/network/transport/diagnostics/ and decouple scripts/syncPrivateProfile.mjs into scripts/privateProfile/ pipelines\n- Merge z/fix-kickoff-countdown-audio (73038797): sync matchPhase before kickoff/endgame audio cues, extract RuntimeKickoffSignalSubController and NinetySecDualBotController\n- Update relative roomCodeConnectivityCodec imports in src/network/transport/diagnostics/ to ../../../ui-core/config/roomCodeConnectivityCodec.ts\n- Rename ninetySecDualBotController.ts to PascalCase NinetySecDualBotController.ts to match class naming convention\n- Update src/ui-core submodule to 50aad9d7 (merge e52471dc and e220bf55)\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/merge-four-post-f0501b12"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "50aad9d7e6eba80b91c2e5cca3050a81b6a3c982",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "03640b19efa92cb54d54202989de57558e174068",
      "shortSha": "03640b1",
      "parents": [
        "f0501b12eefbcd7d25dbf3bf53ab651a850026d6",
        "31b9360fcecccd9a82db12519659e39fbd494bd2",
        "c570f7276476f0832380299af9a5c272c8a52879",
        "11b064678491d72fb73e421082d02166a287aef1",
        "65be34eccd2ef2b225c9adfbc792ad05715e1e73"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793836766,
      "subject": "chore(merge): merge 31b9360f, c570f727, 11b06467, and 65be34ec into z/merge-audio-spatial-eq-lod",
      "body": "- Merge z/audio/master-bus-eq-and-dynamics (31b9360f): add MasterAcousticProcessor 3-band parametric EQ, 5.5kHz far-field high-shelf roll-off, and 3-mode DynamicsCompressor (Studio, Dynamic, Night) in AudioMixer\n- Merge z/audio/distance-tuner-and-3d-gizmo (c570f727): add SpatialAudioDebugVisualizer and SpatialAudioDebugGeometries in src/entities/arena/ for 3D R_min/R_max spheres, 25%/50%/75% iso-gain contour rings, and radial attenuation ruler\n- Merge z/audio/incident-spatial-routing (11b06467): add IncidentSpatialModulator for kinetic intensity modulation, distanceRadiusScale propagation scaling, 16-slot voice priority & cooldown hierarchy, 2D self vs 3D remote boost pickup differentiation, and wheel_impact landing audio\n- Merge z/audio/multi-car-engine-lod-and-culling (65be34ec): extract TurtleModemGranularVoiceGraph (40-slice primary vs 10-anchor-slice remote LOD) and RemoteEngineAudioLodController (Top-3 remote engine budget, wake hysteresis, and voice hibernation), plus on-demand loop hibernation in VehicleAudioEmitter\n- Unify arenaAcousticScale and distanceRadiusScale across SpatialAttenuationEvaluator, SpatialAudioSource, RemoteEngineAudioLodController, SpatialAudioDebugVisualizer, and SpatialAudioDebugGeometries\n- Fix BallTrajectoryTubeRenderer group.visible check in BallTrajectoryPredictor.ts\n- Update src/ui-core submodule to d91af962 (merge 8f0aa3b3 and a93b6306 onto 75dbe640)\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/merge-audio-spatial-eq-lod"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "d91af9621002ba9a204a04afce9c528891c1bdc6",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Add MasterAcousticProcessor with 3-band parametric EQ (100Hz lowshelf, 1kHz peaking, 10kHz highshelf), 5.5kHz far-field high-shelf roll-off, and 3-mode DynamicsCompressor (Studio, Dynamic, Night)\n- Mount MasterAcousticProcessor inside AudioMixer and sync live with audioConfig\n- Connect arenaAcousticScale and spatialAudio toggle to SpatialAttenuationEvaluator and spatialAudioMath\n- Update src/ui-core submodule with live Layer3AudioEqRecipe bindings and AudioTab navigation\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/audio/master-bus-eq-and-dynamics"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "8f0aa3b30d0eb1afa4267415e47a8cf9aeab9687",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Add SpatialAudioDebugVisualizer and SpatialAudioDebugGeometries in src/entities/arena/ to render concentric R_min/R_max spheres, ground footprint rings, 50%/75%/25% non-linear iso-gain contour rings, and a dynamic emitter-to-listener radial attenuation ruler with 3D billboard telemetry\n- Support Emitter-Centered (ball, opponent/bot car, local car, fixed probe point) and Listener-Centered radar anchor modes\n- Wire SpatialAudioDebugVisualizer into ArenaWorld and PresentationStage with minimal footprint\n- Bump src/ui-core with interactive per-category distance attenuation curve editor and 3D gizmo controls\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/audio/distance-tuner-and-3d-gizmo"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "a93b63060986bc1dd39e9692257731d9f0979c81",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "7b274b7b1ba05a2672129ec3dc859d87572d33fb",
      "shortSha": "7b274b7",
      "parents": [
        "f0501b12eefbcd7d25dbf3bf53ab651a850026d6"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793808701,
      "subject": "perf(bootstrap): streamline Free Play bootstrap and preload all deferred assets & workers",
      "body": "- Restrict blocking bootstrap asset audit and vehicle loading to critical Free Play prerequisites only\n- Prewarm AuthoritativeServerWorker and BotInferenceWorker (module graphs, WASM, and cached collision meshes) in background pipeline after ignition\n- Preload all remaining vehicle GLBs, Throwback stadium GLBs/collision meshes, TurtleModem engine synth pack, and all 12 SafeTensors bot policies in background\n- Update src/ui-core submodule to lock Developer Settings row to ?dev=1 URL query activation\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/aggressive-bootstrap-and-dev-lock"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "e52471dcae323f2f1c95ecc112784800e17ca894",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Add IncidentSpatialModulator for pure kinetic intensity modulation of volume, propagation radius scale (distanceRadiusScale), pitch contour, and deterministic slot priority/cooldowns\n- Extend SpatialAttenuationEvaluator, spatialAudioMath, AudioSlotPool (16 slots), and VehicleAudioEmitter with distanceRadiusScale support before slot acquisition and distance culling\n- Differentiate Self (2D tactile stereo) vs. Remote Car (3D world-culled) and Big Orb (100) vs. Small Pad (12) boost pickups\n- Wire airborne-to-grounded wheel_impact (0x12) landing audio in VehicleAudioManager modulated by peak downward vertical velocity\n- Enforce priority & anti-spam cooldown hierarchy so Goal (10) and Demolish (9) are never preempted by surface or pad events\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/audio/incident-spatial-routing"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "f38ade4a3afb806b025ae86c6086bb9bf92452a9",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
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
      "body": "- Extract TurtleModemGranularVoiceGraph supporting 40-slice primary-full synthesis and 10-anchor-slice remote-lod synthesis (reducing active AudioBufferSourceNodes per remote vehicle from 81 to 11 while eliminating remote offSource, DelayNode, and 3-band EQ overhead)\n- Add click-free voice graph hibernation in TurtleModemEngineSynth when remote vehicles enter dormancy, keeping drivetrain RPM/gear state synchronized in lightweight JS math with 0 active Web Audio buffer sources\n- Extract RemoteEngineAudioLodController from GameAudioSubsystem to enforce engine_other distance culling with wake hysteresis and Top-K (max 3) closest remote engine budget\n- Add on-demand startup and delayed hibernation teardown for boostLoopSource and supersonicLoopSource in VehicleAudioEmitter when inactive or distance-culled\n- Slim down TurtleModemEngineSynth (618 -> 482 lines) and GameAudioSubsystem (554 -> 381 lines) well below the 680-line Radar soft waterline\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/audio/multi-car-engine-lod-and-culling"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "f38ade4a3afb806b025ae86c6086bb9bf92452a9",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": []
    },
    {
      "sha": "2fa4ac847817f7184e67941ae0923fbb4de2f1fd",
      "shortSha": "2fa4ac8",
      "parents": [
        "84216d16c57f5f1beac3491be79348316afc47dc",
        "f0501b12eefbcd7d25dbf3bf53ab651a850026d6"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793808639,
      "subject": "chore(merge): sync 84216d16 with f0501b12 and align pure pipeline naming & waterlines",
      "body": "- Merge main branch f0501b12 into 84216d16 (resolving StandaloneReplayViewerController and src/ui-core submodule conflicts)\n- Fix BallTrajectoryPredictor.setSceneContext typecheck by checking foregroundMesh.visible and preOcclusionMesh.visible\n- Remove dead SharedViewportFollowerSubController.ts and redundant re-exports in CameraManager.ts and RocketSimStateViews.ts\n- Rename pure non-class modules in dynamic-training, static-training, syncall, and physics to camelCase (dynamicTrainingPresets.ts, dynamicTrainingTypes.ts, staticTrainingSyncHandlerBindings.ts, ghostTapeBinaryCodec.ts, trainingEpisodeTypes.ts, syncAllTypes.ts, episodeDeterminismPipeline.ts)\n- Extract onlineTrainingCameraAndFramePipeline.ts from OnlineTrainingSyncSubController.ts (593 -> 441 lines), move SyncAll wire lookup tables into syncAllTypes.ts (SyncAllProtocolCodec.ts 556 -> 461 lines), and extract runtimeTrainingStorePortTypes.ts from runtimeUiStorePortTypes.ts (678 -> 505 lines)\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/sync-with-f0501b12"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "85e4456589882e4c712b5d49a5d768a9b8e61d87",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "0c423491b4c21cd10b93054845400da1eeaac0c5",
      "shortSha": "0c42349",
      "parents": [
        "f0501b12eefbcd7d25dbf3bf53ab651a850026d6"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793806733,
      "subject": "chore(baseline): fix typecheck error, unify roomCodeConnectivityCodec SSOT, and harden radar pre-checks",
      "body": "- Fix BallTrajectoryPredictor.setSceneContext typecheck error by checking foregroundMesh.visible and preOcclusionMesh.visible\n- Deduplicate roomCodeConnectivityCodec.ts into src/ui-core/config/roomCodeConnectivityCodec.ts and allow src/network/transport/ to import pure src/ui-core/config/ in scripts/radar.ts\n- Enable orphan module detection for src/ui-core/ in scripts/radar.ts\n- Replace hardcoded public broker URL with wss://relay.carsoccer.dev/mqtt in credentialBundleTypes.ts and CredentialBundleManager.ts\n- Remove non-English comment characters in ReplayDirectorTrajectoryPlanner.ts and replayDirectorElevationPipeline.ts, and update 45 JSDoc headers from .js to .ts\n- Update src/ui-core submodule to e220bf55\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/baseline-precheck"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "e220bf557a005b4a310a00f092f1c9e5b2b60cd6",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "4c6f3f883d76e67f7bbc2935ddf4efa44272b4d9",
      "shortSha": "4c6f3f8",
      "parents": [
        "f0501b12eefbcd7d25dbf3bf53ab651a850026d6"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793806449,
      "subject": "refactor(transport,scripts): isolate signaling diagnostics and decouple profile sync CLI",
      "body": "- Move SignalingFourServerLoopbackHarness, signalingFourServerProbe, signalingFourServerScenarios, and signalingDiagnosticsProbe into src/network/transport/diagnostics/ to cleanly isolate Dev Lab diagnostic harnesses from production transport controllers\n- Decouple scripts/syncPrivateProfile.mjs (618 -> 149 lines) by extracting narrow-waist pure pipelines under scripts/privateProfile/ (githubAppAuthPipeline.mjs, profileRepositoryResolver.mjs, and rctbnspibBundleCliPipeline.mjs)\n- Fix BallTrajectoryPredictor.setSceneContext mesh visibility reference to preOcclusionMesh so tsc --noEmit passes with zero errors\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/decouple-transport-diagnostics-and-profile-sync"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "75dbe64031a22598df6ce317aac82bf144171ef9",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": []
    },
    {
      "sha": "c06716bc6e820a44a58c3c9602c29450156b8b27",
      "shortSha": "c06716b",
      "parents": [
        "f0501b12eefbcd7d25dbf3bf53ab651a850026d6"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793806402,
      "subject": "fix(signaling,docs): parameterize public fallback broker and enforce neutral ball terminology",
      "body": "- Initialize `PUBLIC_FALLBACK_BROKER_URL` to `''` in `credentialBundleTypes` and resolve parameter-supplied public fallback URLs via `resolvePublicFallbackBrokerUrl` (`?publicBroker=` / `VITE_PUBLIC_FALLBACK_BROKER_URL`) in `credentialBundlePersistence` and `CredentialBundleManager`.\n- Forbid `soccer` terminology and hardcoded `broker.emqx.io` endpoints in `AGENTS.md` and `scripts/radar.ts`, replacing `carsoccer.dev` placeholders with `carball.dev`.\n- Fix `BallTrajectoryPredictor.setSceneContext` to check `preOcclusionMesh` and `foregroundMesh` visibility instead of the removed `tubeMesh` field.\n- Update `src/ui-core` submodule to include neutral `carball.dev` placeholders and zero hardcoded broker URLs.\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/zero-hardcoded-broker-and-neutral-ball-terms"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "719a6fd33995ffe5262db12667f75cdf76061857",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "29584755401ecaafaa736251d59415bddc4c2f23",
      "shortSha": "2958475",
      "parents": [
        "d74926277ca73636ac76de83880cf002cf325aa8"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793806013,
      "subject": "feat(audio): establish spatial attenuation profiles foundation and clean up legacy state audio",
      "body": "- Introduce SpatialAttenuationEvaluator supporting linear, smoothstep, power, bezier, and inverse distance curves with hard distance culling and iso-gain radius solving\n- Connect spatialAudioMath, AudioSlotPool, SpatialAudioSource, VehicleAudioEmitter, VehicleAudioManager, BallAudioEmitter, IncidentAudioEngine, and WorldImpactAudioHandler to 16 tactical AudioAttenuationCategory profiles\n- Perform hard distance culling in AudioSlotPool before acquiring voice slots so out-of-range events never steal active voices\n- Fix X-axis coordinate negation bug in GameAudioSubsystem._scratchCarAudioPos so fallback CarStateView positions match ArenaMath (+posX) and AudioListener coordinates\n- Delete redundant StateAudioEngine.ts (legacy 2D boost/supersonic loops) and unused UIAudioEngine.ts, routing BallAudioEmitter directly through GameAudioEngineFacade\n- Remove duplicate per-frame updateSupersonic/updateBoost calls in GameAudioSubsystem\n- Update src/ui-core submodule with spatialAttenuationProfiles registry\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/audio/spatial-profiles-foundation"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "f38ade4a3afb806b025ae86c6086bb9bf92452a9",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "84216d16c57f5f1beac3491be79348316afc47dc",
      "shortSha": "84216d1",
      "parents": [
        "e6522cca01b120ce74c4df2d34d71dda805c9ec1"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793804868,
      "subject": "feat(training,syncall): fix dynamic training mode exit, decouple focus-only camera sync & radar",
      "body": "Co-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/training-pack-and-syncall-decouple"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "5c665b9a19666f41290a07a4b2c42c2dd690730f",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "73038797d89e7e4d0e29c17edb31da0d20e1c43b",
      "shortSha": "7303879",
      "parents": [
        "0d1e824844916e8e7491de5d2489a37ebc107174"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793804677,
      "subject": "fix(audio): sync matchPhase before kickoff/endgame audio cues and decouple signal handlers",
      "body": "- Ensure ExperimentalMultiBotsMatchLifecycleController updates runtime and HUD matchPhase to\n  'kickoff' or 'ended' before triggering match_countdown_321, match_entering_overtime, and\n  endgame cues so isSignalAudioMutedInGoalReplay() never drops the '3' countdown cue after\n  Goal Replay completion or skip.\n- Reset stale 'replay' phase state in ExperimentalMultiBotsReplayController.endSession() and\n  RuntimeGoalReplaySignalSubController.handleGoalReplayEndOrRoundStart().\n- Extract RuntimeKickoffSignalSubController from RuntimeReconcilerSignalHandler and update\n  matchPhase before evaluating isSignalAudioMutedInGoalReplay() on KICKOFF_WILL_START.\n- Extract NinetySecDualBotController from NinetySecMatchLabTab and sync HUD matchPhase before\n  kickoff countdown cues.\n- Guard AudioSlotPool.silenceAll() in RuntimeDOMEventManager._onWindowBlurFocus() so spurious\n  window focus events when not muted do not cut off active 2D signal voices.\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/fix-kickoff-countdown-audio"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "d4b26dc69fcd11bec4c154d6b7d75695e25b1303",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": []
    },
    {
      "sha": "f0501b12eefbcd7d25dbf3bf53ab651a850026d6",
      "shortSha": "f0501b1",
      "parents": [
        "0d1e824844916e8e7491de5d2489a37ebc107174",
        "d74926277ca73636ac76de83880cf002cf325aa8",
        "65dd69a3d822912e7806f3f00b00bcf4958cad7e"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793803733,
      "subject": "chore(merge): merge 0d1e8248, d7492627, and 65dd69a3 into z/merge-trajectory-signaling-botpack",
      "body": "- Unify BallTrajectorySamplingController native WASM incremental prediction (0d1e8248) with BotPack full-horizon 5.0s preservation (65dd69a3) without setBallState live-arena perturbation\n- Move event-snapshot coordinate deviation check into ballTrajectoryPolicy.ts and drop redundant post-step check in BallTrajectoryPredictor.ts\n- Merge 4-server signaling mesh and Self Test lab (d7492627)\n- Extract pure mqttPacketCodec.ts and signalingHandshakeFrames.ts to keep MqttWebSocketClient.ts (397 lines) and SignalingProtocolHandler.ts (507 lines) below the 520-line waterline\n- Update src/ui-core submodule to 75dbe640 (merge d4b26dc, 594e3a4, and cc5b6b9)\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/merge-trajectory-signaling-botpack"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "75dbe64031a22598df6ce317aac82bf144171ef9",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "0d1e824844916e8e7491de5d2489a37ebc107174",
      "shortSha": "0d1e824",
      "parents": [
        "2c4fa8ee708c4ded985d45cef8fdfe481be806d3"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793801111,
      "subject": "fix(trajectory): fix multi-bounce live-arena perturbation, add round/chamfer caps, and remove line renderer",
      "body": "- Fix multi-bounce false full-deviation recomputes by using native WASM BallPredTracker incremental updates without mutating the live arena ball state every frame via setBallState\n- Remove BallTrajectoryLineRenderer.ts and decimated-line fallback mode\n- Add round capsule dome and 45-deg chamfered bevel end-cap geometry options for 3D trajectory dashes\n- Fix white clipping in TUBE_FRAGMENT_SHADER and tune 3D shading defaults (shadingStrength: 0.75, radiusTaper: 0.35, horizonFade: 0.3)\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "d4b26dc69fcd11bec4c154d6b7d75695e25b1303",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "e6522cca01b120ce74c4df2d34d71dda805c9ec1",
      "shortSha": "e6522cc",
      "parents": [
        "853ca6ce0227c2ca3ebc7d33cb68fcd5e4e6a4b4",
        "4043b5352b68ae8b346037796d9230fed9eb4b31"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793799759,
      "subject": "chore(merge): merge z/dynamic-training (853ca6ce) and z/syncall-ghost-tape (4043b535)",
      "body": "- Unify RetainedGhostTapeRecorder with GhostTapeBinaryCodec (GTAP container) and standalone/online lifecycle APIs\n- Unify StaticTrainingPackMode with Kevpert seeded variance, EpisodeEnvironmentPassport, and OnlineTrainingSyncSubController\n- Extract StaticTrainingSyncHandlerBindings.ts and replayRemoteCameraAndCursorHelpers.ts to keep all modules well below file-size waterlines\n- Isolate both static-training-pack and dynamic-training-pack from warmup lobby reconciliation in SimulationStage and RuntimeInputPoller\n- Update src/ui-core submodule to z/syncall-unified (97c1361)\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [
        "origin/z/syncall-unified"
      ],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "97c1361ec56c0c85c3334a01404e58e93784b85c",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "d74926277ca73636ac76de83880cf002cf325aa8",
      "shortSha": "d749262",
      "parents": [
        "3e0de058a3267c7754d9df67f3f3155ea363e454",
        "18ea6f49acbec21110288cbaa99eac5784fd488f"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793799275,
      "subject": "feat(network): merge 4-server signaling mesh, strip hardcoded secrets, and minimize credential bundles",
      "body": "- Merge 18ea6f49 (4-server star-topology signaling mesh & dual-cloud bridge) onto 3e0de058\n- Strip all hardcoded EMQX/Supabase URLs, client/bridge usernames, passwords, and JWT tokens from source code\n- Resolve 4-server relay slots and co-hosted Edge Function bridge URLs dynamically from active credential bundle\n- Minimize exported .rctbnspib payload to essential credentials and support per-friend EMQX credential overrides\n- Route 4-Server Signaling & Bridge Lab under new Self Test menu (bug-play) gated by dev-private source\n- Report P2P Blocked by NAT when signaling SDP offer succeeds but WebRTC DataChannel fails\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "594e3a4fe1715cbc92e29daa45503b5123cfb57d",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "65dd69a3d822912e7806f3f00b00bcf4958cad7e",
      "shortSha": "65dd69a",
      "parents": [
        "2c4fa8ee708c4ded985d45cef8fdfe481be806d3"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793798773,
      "subject": "fix(trajectory,ui): fix 1-tick BotPack ball prediction desync and restore #9700488 identifier",
      "body": "- Synchronize WASM BallPredTracker to the post-physics render tick via updateBallPredictionIncremental(5.0) in BallTrajectorySamplingController._predictWindowedCatchup when external BotPack policies (ducky, fury, galactus, ripple_v1_1) expand WASM prediction to full horizon during stepBeforePhysics\n- Preserve full-horizon incremental prediction across forceFull resets when full-horizon tracking is active, avoiding 24-tick <-> 600-tick cache thrashing between AI inference and trajectory rendering\n- Remove redundant post-step hasTrajectoryCoordinateDeviation check in BallTrajectoryPredictor.update\n- Update src/ui-core submodule to cc5b6b9 (restore Experimental Bot Pack #9700488 title and commit ID comments)\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "04e3de139b145d50c164ab167c632b8ea5312d53",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": []
    },
    {
      "sha": "2c4fa8ee708c4ded985d45cef8fdfe481be806d3",
      "shortSha": "2c4fa8e",
      "parents": [
        "3e0de058a3267c7754d9df67f3f3155ea363e454"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793796884,
      "subject": "feat(trajectory): update default ball trajectory horizon to 600 ticks and catchup to 5",
      "body": "- Set DEFAULT_TRAJECTORY_SETTINGS.predictionTicks to 600 and catchupTicksPerFrame to 5\n- Align fallback defaults in BallTrajectorySamplingController\n- Update src/ui-core submodule to 04e3de1\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "04e3de139b145d50c164ab167c632b8ea5312d53",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "4043b5352b68ae8b346037796d9230fed9eb4b31",
      "shortSha": "4043b53",
      "parents": [
        "fcbceb472ca3fcdaaca47e54cbfdda7ed1eeb4e7"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793793042,
      "subject": "feat(syncall-training): implement Online Training Buddy-Box & 120Hz Retained Ghost Tape",
      "body": "- Add RetainedGhostTapeRecorder for 120Hz Float32Array(448) + CarControls recording, GTAP binary serialization, and MultiWorldGhostRenderer run-along playback\n- Add OnlineTrainingSyncSubController unifying Mode 1 (Coach Demo), Mode 2 (Retain Display + Student Practice), and Mode 3 (Free Practice) over SyncAllSessionBridge\n- Wire StaticTrainingPackMode and SimulationStage/RuntimeInputPoller to isolate local training physics from warmup lobby reconciliation while keeping P2P SyncAll active\n- Update src/ui-core submodule to z/syncall-ghost-tape with Developer Sandboxes entry and SyncAllGhostTrainingFloatingWindow\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "7eb6d6e010a233e3328015d60796dab144411b73",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": []
    },
    {
      "sha": "fcbceb472ca3fcdaaca47e54cbfdda7ed1eeb4e7",
      "shortSha": "fcbceb4",
      "parents": [
        "fe137a51758c3933d04c8ea673b271e8d36aa783",
        "b3e82e10e8a19fb6abed2d729cb7e3edec7c0a9e"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793793041,
      "subject": "chore(merge): merge z/syncall-delta-spatial-laser-viewport-guards into z/syncall-ghost-tape",
      "body": "Co-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "7eb6d6e010a233e3328015d60796dab144411b73",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": []
    },
    {
      "sha": "853ca6ce0227c2ca3ebc7d33cb68fcd5e4e6a4b4",
      "shortSha": "853ca6c",
      "parents": [
        "fe137a51758c3933d04c8ea673b271e8d36aa783",
        "b3e82e10e8a19fb6abed2d729cb7e3edec7c0a9e"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793792225,
      "subject": "feat(training): add Dynamic Training Pack mode, Kevpert variance RNG & ghost sync",
      "body": "- Merge z/syncall-replay-rdp (fe137a51) and z/syncall-delta-spatial-laser-viewport-guards (b3e82e10)\n- Add deterministic seeded PRNG trainingVariancePipeline supporting Kevpert BakkesMod F-key tiers (F3, F5, F7-F12) and 3 historical variance eras\n- Add DynamicTrainingPackMode with multi-car arena/simulation controllers, 4s Pre-Roll Watch, 3-2-1 Countdown pre-input takeover, and multi-car overdub recording\n- Support all 4 non-active car fallback policies: keep-previous, nexto, necto, and disappear\n- Add RetainedGhostTapeRecorder and TrainingEpisodeSyncAdapter for holographic ghost comparison and SyncAll episode sharing\n- Update src/ui-core submodule to z/dynamic-training (3db0a33)\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "3db0a338226ff45983e9e2bc5fa3e2514ed2aa99",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "18ea6f49acbec21110288cbaa99eac5784fd488f",
      "shortSha": "18ea6f4",
      "parents": [
        "88abad0f9f263b94b69be2e35c09732aba254a70"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793788776,
      "subject": "fix(signaling,ui): warm up Edge Function brg/+ listeners and bump ui-core for scrollable 4-Server Lab",
      "body": "- Ensure paired JP/SG Edge Function isolate is awake and subscribed to rc_7e2a4d_v2/brg/+ before publishing MQTT bridge frames in signalingFourServerScenarios and SignalingMultiRelayTransportPool\n- Update src/ui-core submodule to fix vertical card collapsing and text truncation in Layer 4 4-Server Signaling & Dual Bridge Lab\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "7eb6d6e010a233e3328015d60796dab144411b73",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": []
    },
    {
      "sha": "3e0de058a3267c7754d9df67f3f3155ea363e454",
      "shortSha": "3e0de05",
      "parents": [
        "7ed2a6aae8a04b2e270504c75d82c76d684294de",
        "06cd4f320af22b4d0d6058011db027f61c75b846",
        "bc3e936e200f7237ce99786c1dd2b3dacbc318ee",
        "6ec0bb55f40e8b8be52eaca840c02f35b8afeff7",
        "8f73c0464c4e7a8070f0bc3f32b69e12698f9ef2",
        "6e85e131d750dc2084811fe53c2a8948a2fd86c8"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793788634,
      "subject": "chore(merge): merge five post-7ed2a6aa refactor branches into z/merge-clean-five-refactors",
      "body": "- Merge z/refactor-ball-trajectory-engine (06cd4f3): extract ballTrajectoryTelemetryPipeline and ballTrajectoryTubeMeshPipeline below 520-line waterline\n- Merge z/refactor-exp-ai-simd-and-pipelines (bc3e936): externalize simdMatVec.wasm and normalize experimental AI pipeline naming\n- Merge z/refactor-game-loadout-and-runtime-signals (6ec0bb5): clean up experimental freeplay loadout fallback and extract RuntimeGoalReplaySignalSubController\n- Merge z/refactor-replay-waterline-and-naming (8f73c04): align replayDirectorElevationPipeline naming and split 7 high-waterline replay controllers into pure pipelines and ReplayHotkeySubController\n- Merge z/refactor-ui-core-tuner-and-room-codec (6e85e13): align roomCodeConnectivityCodec 1:1 mirror and bump src/ui-core to 4b9e2c9\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "4b9e2c99a38e9a1c8959bc2979f678ca605de528",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "6e85e131d750dc2084811fe53c2a8948a2fd86c8",
      "shortSha": "6e85e13",
      "parents": [
        "7ed2a6aae8a04b2e270504c75d82c76d684294de"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793781276,
      "subject": "refactor(track-a): align roomCodeConnectivityCodec 1:1 mirror and bump ui-core",
      "body": "- Align src/network/transport/roomCodeConnectivityCodec.ts with src/ui-core/config/roomCodeConnectivityCodec.ts\n- Update src/ui-core submodule to 4b9e2c9 (BallTrajectoryTuner slot split + Layer3 online props narrow-waist)\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "7eb6d6e010a233e3328015d60796dab144411b73",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": []
    },
    {
      "sha": "88abad0f9f263b94b69be2e35c09732aba254a70",
      "shortSha": "88abad0",
      "parents": [
        "5969dcf67aeeb74a42aa56f4c1baa778b8bc755e"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793780986,
      "subject": "feat(signaling): integrate 4-server full-mesh signaling, dual Edge bridges, and One-Click Diagnostic",
      "body": "- Activate 4-server private profile hash (83f1186c23f952db) with canonical IDs: emqx_cn (8), emqx_gb (4), supabase_jp (2), supabase_sg (1)\n- Add signalingRelaySlotRegistry and update roomCodeConnectivityCodec, eliminating legacy emqx_1/supabase_1 aliases\n- Wire sendBridgeOnRelay(), 4-bit connectivity routing, 1.5s cross-island bridge fallback, and _brgHop>=1 reply bridging into SignalingMultiRelayTransportPool and SignalingProtocolHandler\n- Modularize 4-server verification harness into signalingFourServerProbe, signalingFourServerScenarios, and SignalingFourServerLoopbackHarness with One-Click 5-Stage Full Diagnostic\n- Replace DevSignalingLabConnectedView with DevSignalingLabPanel and update src/ui-core submodule\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "7eb6d6e010a233e3328015d60796dab144411b73",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": []
    },
    {
      "sha": "b3e82e10e8a19fb6abed2d729cb7e3edec7c0a9e",
      "shortSha": "b3e82e1",
      "parents": [
        "7ed2a6aae8a04b2e270504c75d82c76d684294de"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793780701,
      "subject": "feat(syncall-delta): add 3D analytical laser pointer, shared viewport follower & determinism guards",
      "body": "Implement orthogonal Branch Delta primitives for SyncAll (Online Training, Replay RDP & Dynamic Training):\n\n1. Analytical 3D Arena Raycaster & Multi-Peer Holographic Laser/Telestrator (`src/entities/arena/ArenaLaserPointerVisual.ts`):\n   - Zero-mesh analytical raycasting against RocketSim Soccar planes, 45-deg corner bevels, and dynamic ball sphere in <0.01ms.\n   - Multi-peer surface-normal-aligned target reticle, sight beam, and decaying 3D telestrator ribbon trail wired into `ArenaWorld`.\n2. Shared Viewport & FreeCam Pose Follower (`src/camera/SharedViewportFollowerSubController.ts`):\n   - Prevents `FreeCameraController.update()` quaternion overwrite by synchronizing internal Euler (`yaw`, `pitch`) and `camPosition`.\n   - Provides 36-byte zero-GC binary pose+pointer codec and `linked` / `unlink()` / `syncToDriverNow()` workflow on `CameraManager`.\n3. Cross-Peer Episode Determinism & Transport Guards (`src/physics/EpisodeDeterminismGuard.ts`):\n   - `EpisodeEnvironmentPassport`: FNV-1a 32-bit digest over 36-float MutatorConfig, arenaPreset, unlimitedBoostMask, and 448-float snapshot.\n   - `computeCanonicalHandoffTick`: Deterministic WASM tick anchor for `ReplayCausalHybridEngine` live handoff.\n   - `packUint32IntoCommandParams`: Packs 32-bit `cursorFrame` (>65535) across two 16-bit `InputPacketCodec` command params.\n   - `ArtifactChunkAssembler`: 12KB SCTP-safe chunk framing with FNV-1a integrity check and selective NACK list for unordered WebRTC channels.\n4. Co-Session Idle Eviction Guard (`PeerSession.ts`, `EstablishedSessionManager.ts`):\n   - Adds `coSessionKeepAliveExempt` to prevent the 30s non-driving timeout from evicting peers during Replay Co-Watch or Coach Demo.\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "7eb6d6e010a233e3328015d60796dab144411b73",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": []
    },
    {
      "sha": "fe137a51758c3933d04c8ea673b271e8d36aa783",
      "shortSha": "fe137a5",
      "parents": [
        "7ed2a6aae8a04b2e270504c75d82c76d684294de"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793780626,
      "subject": "feat(syncall): implement Semantic RDP replay co-viewing & narrow-waist protocol",
      "body": "Implement the SyncAll narrow-waist protocol core (`src/network/syncall/`) and Replay Remote Sync Adapter (`src/replay/syncall/ReplayRemoteSyncAdapter.ts`) for ultra-low-bandwidth Semantic RDP replay co-viewing, FreeCam link/unlink, chunked .rcreplay artifact streaming, and remote Intervene From Here takeover.\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "7eb6d6e010a233e3328015d60796dab144411b73",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": []
    },
    {
      "sha": "8f73c0464c4e7a8070f0bc3f32b69e12698f9ef2",
      "shortSha": "8f73c04",
      "parents": [
        "7ed2a6aae8a04b2e270504c75d82c76d684294de"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793779865,
      "subject": "refactor(replay): align elevation pipeline naming and split high-waterline files",
      "body": "- Rename ReplayDirectorElevationSolver.ts to replayDirectorElevationPipeline.ts and update internal imports\n- Extract replayTouchLookaheadPipeline.ts from ReplayTouchTimelineAnalyzer.ts (679 -> 348 lines)\n- Extract replayTimelineStepPipeline.ts from ReplayTimelineController.ts (678 -> 516 lines)\n- Extract ReplayHotkeySubController.ts and replayDataPayloadPipeline.ts from StandaloneReplayViewerController.ts (677 -> 516 lines) and FreeplayRewinderController.ts (671 -> 510 lines)\n- Extract replayDirectorSingleFramePipeline.ts from ReplayDirectorDiagnostics.ts (677 -> 409 lines)\n- Extract replayDirectorSubjectAnchorPipeline.ts from ReplayDirectorTrajectoryPlanner.ts (676 -> 295 lines)\n- Extract replayDirectorStreamingFallbackPipeline.ts from ReplayDirectorCamera.ts (669 -> 360 lines)\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "7eb6d6e010a233e3328015d60796dab144411b73",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": []
    },
    {
      "sha": "06cd4f320af22b4d0d6058011db027f61c75b846",
      "shortSha": "06cd4f3",
      "parents": [
        "7ed2a6aae8a04b2e270504c75d82c76d684294de"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793779060,
      "subject": "refactor(trajectory): extract pure telemetry and tube mesh pipelines below 520-line waterline",
      "body": "- Extract TubeRenderParams derivation, world linewidth calculation, telemetry snapshot assembly, and windowed catch-up slice packing from BallTrajectoryPredictor and BallTrajectorySamplingController into ballTrajectoryTelemetryPipeline.ts\n- Extract twist-free parallel-transport 3D tubular mesh extrusion, radial trig tables, ground drop-line vertex builders, and GLSL shaders from BallTrajectoryTubeRenderer into ballTrajectoryTubeMeshPipeline.ts\n- Extract per-tick live sampling state-machine decision policy into ballTrajectoryPolicy.ts\n- Reduce BallTrajectoryPredictor (510 lines), BallTrajectorySamplingController (498 lines), and BallTrajectoryTubeRenderer (393 lines) safely below the 520-line target waterline\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "7eb6d6e010a233e3328015d60796dab144411b73",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": []
    },
    {
      "sha": "bc3e936e200f7237ce99786c1dd2b3dacbc318ee",
      "shortSha": "bc3e936",
      "parents": [
        "7ed2a6aae8a04b2e270504c75d82c76d684294de"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793778937,
      "subject": "refactor(ai): externalize simdMatVec.wasm and normalize experimental AI pipelines",
      "body": "- Extract inline WASM_SIMD_MATVEC_BYTES from WasmSimdMatVec.ts into external binary src/ai/experimental/simdMatVec.wasm loaded via new URL('./simdMatVec.wasm', import.meta.url)\n- Split Botpack9700488ObsCore.ts (677 lines) into botpackSharedBallPredPipeline.ts (343 lines) and botpack9700488ObsCorePipeline.ts (355 lines)\n- Rename pure function modules in src/ai/experimental/ to camelCase (wasmSimdMatVec.ts, botpack9700488ObsExtendedPipeline.ts, botpack9700488Actions.ts, botpack9700488Specs.ts, experimentalMultiCarObsPipeline.ts, multiCarHeuristicPolicy.ts) and update internal imports\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "7eb6d6e010a233e3328015d60796dab144411b73",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": []
    },
    {
      "sha": "6ec0bb55f40e8b8be52eaca840c02f35b8afeff7",
      "shortSha": "6ec0bb5",
      "parents": [
        "7ed2a6aae8a04b2e270504c75d82c76d684294de"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793778648,
      "subject": "refactor(game): clean up experimental freeplay loadout fallback and split runtime signal handlers",
      "body": "- Remove legacy `typeof r.restoreLocalPlayerFreeplayLoadout === 'function'` fallback branch and unused `vehiclePresets` imports in `ExperimentalMultiBotsRosterController.ts` (retaining `getMaterialsConfig` which is still required by `spawnRosterFromStore()`).\n- Split `RuntimeSignalDomainHandlers.ts` (674 -> 431 lines) by extracting goal scoring, goal replay choreography, participant identity resolution, and flip-reset/demolition incident effects into `RuntimeGoalReplaySignalSubController.ts` (428 lines).\n- Remove legacy `typeof ... === 'function'` checks on `requestFullReplayExport`, `addCarAtSlot`, `ensureCar`, and `removeCar` within touched modules.\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "7eb6d6e010a233e3328015d60796dab144411b73",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": []
    },
    {
      "sha": "5969dcf67aeeb74a42aa56f4c1baa778b8bc755e",
      "shortSha": "5969dcf",
      "parents": [
        "7ed2a6aae8a04b2e270504c75d82c76d684294de"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793776836,
      "subject": "feat(signaling): rebase 4+1 signaling & bridge lab onto 7ed2a6aa with Layer 4 route and theme adaptation",
      "body": "- Rebase 4+1 signaling & Edge Function bridge transport stack (SupabaseRealtimeSignalingClient, MqttWebSocketClient dir/brg isolation, modular SignalingDualPeerLoopbackHarness + scenarios) onto 7ed2a6aa\n- Restore Layer 3 'dev-under-development' route to Layer3DevUnderDevelopmentRecipe with GraphStar sub-menu entry navigating to Layer 4 'dev-signaling-lab'\n- Connect DevSignalingLabConnectedView to theme-adaptive Layer4DevSignalingLabRecipe in src/ui-core\n- Enhance scripts/syncPrivateProfile.mjs to auto-resync on cache hash mismatch and resolve historical profile revisions matching PRIVATE_PROFILE_HASH without exposing repo URLs or commit SHAs\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "7eb6d6e010a233e3328015d60796dab144411b73",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": []
    },
    {
      "sha": "7ed2a6aae8a04b2e270504c75d82c76d684294de",
      "shortSha": "7ed2a6a",
      "parents": [
        "6d6b95146d3fed4c7ecaf18701738f0210583d2d"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793771336,
      "subject": "feat(vite): auto-restart dev server on git HEAD or branch switch",
      "body": "- Add rcGitHeadAutoRestartPlugin to monitor .git/HEAD and active branch refs across root and initialized submodules without mutating submodule state\n- Wait for index.lock / HEAD.lock release and a 200ms settle window before calling server.moduleGraph.invalidateAll() and server.restart()\n- Preserve full ETag (304 Not Modified) caching during normal development\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "7eb6d6e010a233e3328015d60796dab144411b73",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": []
    },
    {
      "sha": "6d6b95146d3fed4c7ecaf18701738f0210583d2d",
      "shortSha": "6d6b951",
      "parents": [
        "0bb3ddfe5c890cd2487725ab33cb36f7c4737431",
        "56e43bf88569459631449857947d3ae0fa60af09",
        "12a8a8e7be493d0acb8f5ae62632ec84276c2c65",
        "563198a281988df932b031b29cb3e275ed4d0e34",
        "e8df8b2f33cad57f16b516d9ca3503e9e17382ca",
        "dedea2244efba62868c47193e0ab4a11d3c3bdfe",
        "ffab5b19f7c47703fba4b1fe9c05f043beb1fa35"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793770110,
      "subject": "chore(merge): merge six post-0bb3ddfe branches into z/merge-clean-six-branches",
      "body": "- Merge z/demolish-audio-sfx-typed-merge (56e43bf)\n- Merge z/ball-trajectory-predictor-v2 (12a8a8e)\n- Merge z/fix-exhibition-loadout-restore (563198a)\n- Merge z/goal-replay-camera-smoothing-and-elevation (e8df8b2)\n- Merge z/signaling-profile-ui-and-room-codec (dedea22)\n- Merge z/fix-exp-botpack-and-ripple (ffab5b1)\n- Unify ballPredictionPipeline and RocketSimPhysicsEngine wrapper methods across trajectory predictor and botpack branches\n- Preserve external full-horizon WASM prediction state in BallTrajectorySamplingController when Botpack9700488ObsCore is active\n- Sync src/ui-core to 7eb6d6e (z/merge-clean-six-branches) and public to 972fdef\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "7eb6d6e010a233e3328015d60796dab144411b73",
        "public": "972fdef7416bdaafea1069cef0a601f8009d8706"
      },
      "changedSubmodules": [
        "public",
        "src/ui-core"
      ]
    },
    {
      "sha": "ffab5b19f7c47703fba4b1fe9c05f043beb1fa35",
      "shortSha": "ffab5b1",
      "parents": [
        "0bb3ddfe5c890cd2487725ab33cb36f7c4737431"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793768814,
      "subject": "fix(ai,physics,ui): fix Ripple v1.1 spinning, eliminate BotPack freezes via WASM SIMD128 & incremental BallPred, and decouple BotPack floating window",
      "body": "- Fix RocketSimPhysicsEngine.getBallPrediction() buffer length from count * 6 to count * 9 (BALL_PRED_STRIDE = 9) via ballPredictionPipeline.ts, fixing NaN injection into Ripple v1.1 observations at t=4.0s and t=5.0s that caused fallback action 0 (spinning in place)\n- Fix Ducky boost pad timer canonical-to-WASM index mapping in buildDuckyObs\n- Initialize WASM BallPredTracker upfront on arena creation and use incremental ball prediction updates per tick to eliminate lazy 90ms mesh-clone stalls and redundant 600-step Bullet re-simulations\n- Add WasmSimdMatVec (WebAssembly SIMD128 4-row unrolled f32x4 matrix-vector kernel with pre-uploaded SafeTensors weights), accelerating 3v3 BotPack MLP and Perceiver inference by 6x-12.5x\n- Await preloadNativeModels() before kickoff countdown and cap PhysicsStateInterpolator substep wall-clock budget to prevent spiral-of-death freezes\n- Wire dedicated Experimental Bot Pack floating window preset and lifecycle handlers\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "9dd6479997fd6a3e4f7eb7bb39d507e5dfabbeae",
        "public": "f37d2d36c83c39c342d87c7d9fd64c21b9ced61b"
      },
      "changedSubmodules": []
    },
    {
      "sha": "dedea2244efba62868c47193e0ab4a11d3c3bdfe",
      "shortSha": "dedea22",
      "parents": [
        "0bb3ddfe5c890cd2487725ab33cb36f7c4737431"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793768521,
      "subject": "feat(transport,ui): add 4-bit room code connectivity codec, public/custom/bundle mutex, and ?nokey=1 simulation",
      "body": "- Add pure-function roomCodeConnectivityCodec.ts for 4-bit relay connectivity mask embedding (4-digit affine bijection + case-insensitive <custom>-<hex> suffix) and 4+1 route decision\n- Normalize cleanRoomId to lowercase in deriveDeterministicRoomContext so custom room codes are case-insensitive\n- Upgrade CredentialBundleManager, credentialBundlePersistence, and signalingRelayConfig with strict imported-bundle mutex, custom self-hosted relay override, and Public EMQX fallback\n- Support ?nokey=1 query parameter in vite.config.ts and CredentialBundleManager to bypass dev-private profile injection and simulate third-party environments\n- Add probeFourRelaysConnectivity helper in signalingDiagnosticsProbe.ts and update src/ui-core submodule\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "9dd6479997fd6a3e4f7eb7bb39d507e5dfabbeae",
        "public": "f37d2d36c83c39c342d87c7d9fd64c21b9ced61b"
      },
      "changedSubmodules": []
    },
    {
      "sha": "e8df8b2f33cad57f16b516d9ca3503e9e17382ca",
      "shortSha": "e8df8b2",
      "parents": [
        "0bb3ddfe5c890cd2487725ab33cb36f7c4737431"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793767248,
      "subject": "fix(replay): smooth multi-bounce camera nodding, enforce overhead non-upward pitch, and balance lateral side bias",
      "body": "- Add ReplayDirectorElevationSolver.ts to decouple bounce-valley trajectory bridging, overhead-biased camera elevation, non-upward pitch clamping, and balanced lateral side selection.\n- Bridge post-shot multi-bounce ball valleys with a monotone-descending envelope and phase-locked causal damping so the camera glides smoothly without nodding across bounces.\n- Keep camera elevation slightly above aerial balls and clamp look rays to non-upward pitch (<= 0 deg, horizontal near the 2044 UU ceiling) so the ground and players below remain in view.\n- Prioritize car lateral approach side across the main field (|X| < 2400 UU), widen pullback on side approaches, and bound the suffix safe-zone longitudinal leash.\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "9dd6479997fd6a3e4f7eb7bb39d507e5dfabbeae",
        "public": "f37d2d36c83c39c342d87c7d9fd64c21b9ced61b"
      },
      "changedSubmodules": []
    },
    {
      "sha": "563198a281988df932b031b29cb3e275ed4d0e34",
      "shortSha": "563198a",
      "parents": [
        "0bb3ddfe5c890cd2487725ab33cb36f7c4737431"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793766527,
      "subject": "fix(loadout): restore local player loadout after exhibition and multi-car modes",
      "body": "- Add RuntimeLoadoutCoordinator.restoreLocalPlayerFreeplayLoadout(carIndex) to restore the local player's saved vehicle preset, hitbox, preferred Freeplay team, color slot, paint finish, boost visual, and boost audio on Car 0\n- Restore Car 0 loadout and reset humanPlayerCarIndex in ExperimentalMultiBotsRosterController.cleanupExtraCarsOnLeave so Blue Bot #0 loadout (used when player is on Orange/Spectator) never leaks out of Exhibition\n- Fix returnToFreeplay execution order in runtimeDomainPorts so activeMode.onLeave runs before resetToCleanFreeplay and leaveBotMatch only runs when a bot match was active\n- Fix FreeplayMode.resetToCleanFreeplay, ReplayScoreboardSynchronizer, and ReplayViewerRosterSubController reading non-existent appState.selectedCar/carColor fields instead of activeCar and stored color preferences\n- Preserve player preset/hitbox and full cosmetics in RuntimeBotCoordinator.leaveBotMatch and applyFreeplayTeamAndColorOnStop\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "9dd6479997fd6a3e4f7eb7bb39d507e5dfabbeae",
        "public": "f37d2d36c83c39c342d87c7d9fd64c21b9ced61b"
      },
      "changedSubmodules": []
    },
    {
      "sha": "12a8a8e7be493d0acb8f5ae62632ec84276c2c65",
      "shortSha": "12a8a8e",
      "parents": [
        "21b98cd8024738b0675a1739677e37208c0f9c6d",
        "0bb3ddfe5c890cd2487725ab33cb36f7c4737431"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793765677,
      "subject": "refactor(trajectory): decouple BallTrajectoryPredictor, fix radar violations & add progressive catch-up",
      "body": "- Merge z/merge-clean-five-branches (0bb3ddfe) into z/ball-trajectory-predictor (21b98cd2)\n- Split BallTrajectoryPredictor.ts (1004 -> 551 lines) by extracting:\n  - src/entities/trajectory/BallTrajectorySamplingController.ts (WASM sampling, tail shift & progressive catch-up ramp)\n  - src/entities/trajectory/BallTrajectoryLineRenderer.ts (LineSegments2 pre-occlusion & stencil-gated dual-pass renderer)\n- Route ballTrajectoryTunerStore through RuntimeTunerPort (runtimeUiPort.ts) to eliminate boundary violation\n- Replace remaining `any` types on physics engine & launch state interfaces with strict TypeScript types\n- Slim RocketSimPhysicsEngine.ts below 680-line waterline (674 lines)\n- Implement progressive catch-up ramp (catchupTicksPerFrame) using a compact WASM window to bound per-frame cost on ball hits\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "6d8c591a372fd710a1aecd9c6a4083816a59571d",
        "public": "f37d2d36c83c39c342d87c7d9fd64c21b9ced61b"
      },
      "changedSubmodules": []
    },
    {
      "sha": "56e43bf88569459631449857947d3ae0fa60af09",
      "shortSha": "56e43bf",
      "parents": [
        "a8c08c3f8f14cf8e7d203682c34baf13969bf420",
        "0bb3ddfe5c890cd2487725ab33cb36f7c4737431"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793764115,
      "subject": "Merge commit '0bb3ddfe' (z/merge-clean-five-branches) into z/demolish-audio-sfx-typed-merge",
      "body": "- Resolve IncidentAudioEngine.ts type conflict by adding carDemo: Array<AudioBuffer | null> to IncidentAudioBuffers, typing lastCarDemoSoundIdx as number, and typing buf as AudioBuffer | null\n- Resolve audioAssetLoader.ts conflict by upgrading carDemoBuffers filter to type guard .filter(isAudioBuffer)\n- Merge src/ui-core (c6dd864) and preserve public submodule (972fdef)\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "6d8c591a372fd710a1aecd9c6a4083816a59571d",
        "public": "f37d2d36c83c39c342d87c7d9fd64c21b9ced61b"
      },
      "changedSubmodules": []
    },
    {
      "sha": "0bb3ddfe5c890cd2487725ab33cb36f7c4737431",
      "shortSha": "0bb3ddf",
      "parents": [
        "9b77a5afbbb21068bd1a3a5c26c7a6e7b41ac361",
        "78c4ce563eef39f42863f738ad935bfb1f625d41"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793763376,
      "subject": "Merge branch 'z/fps-power-saving-and-telemetry' into z/merge-clean-five-branches",
      "body": "Co-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "9dd6479997fd6a3e4f7eb7bb39d507e5dfabbeae",
        "public": "f37d2d36c83c39c342d87c7d9fd64c21b9ced61b"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "9b77a5afbbb21068bd1a3a5c26c7a6e7b41ac361",
      "shortSha": "9b77a5a",
      "parents": [
        "231d28ccc0230cd41f0b72e0372b1203cc2c925d",
        "f2decf8c4b4416a86016476946f3c7a6d253d01d"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793763350,
      "subject": "Merge branch 'z/engine-audio-tuner-and-eq' into z/merge-clean-five-branches",
      "body": "Co-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "be956dad4fc1196427950fa592314868960c6159",
        "public": "f37d2d36c83c39c342d87c7d9fd64c21b9ced61b"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "231d28ccc0230cd41f0b72e0372b1203cc2c925d",
      "shortSha": "231d28c",
      "parents": [
        "8b2b21faa51ec9d044d43f9240a120c1fadd8b79",
        "60786263a8956553cc3e14a481735ad0da0357cf"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793763348,
      "subject": "Merge branch 'z/pov-camera-shadow-roi' into z/merge-clean-five-branches",
      "body": "Co-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "6d8c591a372fd710a1aecd9c6a4083816a59571d",
        "public": "f37d2d36c83c39c342d87c7d9fd64c21b9ced61b"
      },
      "changedSubmodules": []
    },
    {
      "sha": "8b2b21faa51ec9d044d43f9240a120c1fadd8b79",
      "shortSha": "8b2b21f",
      "parents": [
        "6e97a4d742b10584323e1821fd52780bc24689bc",
        "9b9dc51cfb66a2dd6deab549646525a974cc0efc"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793763347,
      "subject": "Merge branch 'z/type-audio-effects-loader' into z/merge-clean-five-branches",
      "body": "Co-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "6d8c591a372fd710a1aecd9c6a4083816a59571d",
        "public": "f37d2d36c83c39c342d87c7d9fd64c21b9ced61b"
      },
      "changedSubmodules": []
    },
    {
      "sha": "6e97a4d742b10584323e1821fd52780bc24689bc",
      "shortSha": "6e97a4d",
      "parents": [
        "e977fcdd2f152dffe7a6b6370a6376e78c7c2db3",
        "e22cdf586dab0a250bca7465e0c21efcb6464532"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793763346,
      "subject": "Merge branch 'z/unify-match-lifecycle-and-fix-exhibition' into z/merge-clean-five-branches",
      "body": "Co-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "6d8c591a372fd710a1aecd9c6a4083816a59571d",
        "public": "f37d2d36c83c39c342d87c7d9fd64c21b9ced61b"
      },
      "changedSubmodules": []
    },
    {
      "sha": "21b98cd8024738b0675a1739677e37208c0f9c6d",
      "shortSha": "21b98cd",
      "parents": [
        "82b60e3ef3d71b4cf3177a307ae0d454b4177dcc"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793762784,
      "subject": "feat(trajectory): lock calibrated ball trajectory defaults with 3.3s (396t) horizon",
      "body": "- Set DEFAULT_TRAJECTORY_SETTINGS to calibrated defaults (predictionTicks: 396 / 3.3s, thickness: 20, color: #ffffff, velocityThresholdUu: 15, sampleStride: 1, shadingStrength: 0, radiusTaper: 0, horizonFade: 0, showBounceMarkers: false, dropLineIntervalTicks: 104)\n- Sync default uniforms and velocity thresholds in BallTrajectoryTubeRenderer and ballTrajectoryGeometryPipeline\n- Update src/ui-core submodule with calibrated trajectory defaults\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "6d8c591a372fd710a1aecd9c6a4083816a59571d",
        "public": "f37d2d36c83c39c342d87c7d9fd64c21b9ced61b"
      },
      "changedSubmodules": []
    },
    {
      "sha": "a8c08c3f8f14cf8e7d203682c34baf13969bf420",
      "shortSha": "a8c08c3",
      "parents": [
        "d2726882ec962a362cc75ece1ef5457b2e575a4b"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793761382,
      "subject": "feat(audio): replace goal poof in car demolition with 5-sample M4A explosion pool",
      "body": "- Load 5 converted M4A demolition SFX (car_demo_0..4) in audioAssetManifest and audioAssetLoader\n- Randomize 1-of-5 demolition explosion selection in IncidentAudioEngine.handleCarCarDemo with non-repeating index tracking at 1.0x playbackRate\n- Cycle through the 5 carDemo buffers when previewing carDemoVolume in GameAudioEngineFacade\n- Route online MATCH_SIGNALS.DEMOLITION and DemolishRespawnLabTab manual demolish trigger through CAR_CAR_DEMO incident audio\n- Update public (RocketCompanionStatics) and src/ui-core (RCUIModule) submodule pointers\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "6d8c591a372fd710a1aecd9c6a4083816a59571d",
        "public": "f37d2d36c83c39c342d87c7d9fd64c21b9ced61b"
      },
      "changedSubmodules": []
    },
    {
      "sha": "82b60e3ef3d71b4cf3177a307ae0d454b4177dcc",
      "shortSha": "82b60e3",
      "parents": [
        "d2726882ec962a362cc75ece1ef5457b2e575a4b"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793761051,
      "subject": "feat(trajectory): add WASM incremental ball prediction, 3D shaded tube renderer, and dev tuner",
      "body": "- Expose all 8 WASM BallPredTracker exports in ballPredictionPipeline and RocketSimPhysicsEngine, fixing the stride=9 buffer truncation bug and pre-warming _physics_initBallPrediction(5.0) on arena creation\n- Add continuous incremental tail prediction (~20-50us/tick) in BallTrajectoryPredictor, recomputing 600 ticks only on CAR_BALL_HIT incidents or coordinate deviation\n- Add 1-draw-call 3D volumetric tube renderer (BallTrajectoryTubeRenderer) with hemisphere/rim shading, capsule tips, horizon radius taper, opacity fade, 3D surface-aligned bounce rings, and ground altitude drop lines\n- Update src/ui-core submodule with Ball Trajectory Prediction Line Tuner and JSON export\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "6d8c591a372fd710a1aecd9c6a4083816a59571d",
        "public": "f37d2d36c83c39c342d87c7d9fd64c21b9ced61b"
      },
      "changedSubmodules": []
    },
    {
      "sha": "f2decf8c4b4416a86016476946f3c7a6d253d01d",
      "shortSha": "f2decf8",
      "parents": [
        "3d35ad69b5c902b94b1ecb7849f65906aed42303"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793760904,
      "subject": "feat(audio): calibrate boost overdrive rise rate, turn shift-lock, and 1.25s air quota",
      "body": "- Scale virtual overdrive RPM rise rate by boostOverdriveMultiplier (1.85x calibrated from RocketSim boost vs throttle ground acceleration).\n- Replace supersonic turning redline snap with turn-under-power shift-lock so steering while accelerating/boosting holds the current gear without jumping to redline.\n- Update default airborne free-rev quota duration to 1.25s and sync src/ui-core.\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "6d8c591a372fd710a1aecd9c6a4083816a59571d",
        "public": "f37d2d36c83c39c342d87c7d9fd64c21b9ced61b"
      },
      "changedSubmodules": []
    },
    {
      "sha": "60786263a8956553cc3e14a481735ad0da0357cf",
      "shortSha": "6078626",
      "parents": [
        "7c2fe9d6d9f3c6c4fa749fe4b336a071e1c3e008"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793760744,
      "subject": "feat(arena): add global blob shadows with ROI auto-culling and ramp indicator ring projection",
      "body": "- Add ArenaBlobShadowSystem for lightweight vehicle (oriented rounded rectangle)\n  and ball (circle) ground shadows with sun-angle offset projection and\n  height-based opacity attenuation at constant size\n- Automatically cull blob shadow fragments inside active POV directional shadow\n  frustums so real and simple shadows transition seamlessly without overlap\n- Project ball ground indicator rings onto Driftwoods brown lower ramps\n  (Woods_Field_Ramps / Woods_Field_Ramps_1) while excluding team-colored upper ramps\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "6d8c591a372fd710a1aecd9c6a4083816a59571d",
        "public": "f37d2d36c83c39c342d87c7d9fd64c21b9ced61b"
      },
      "changedSubmodules": []
    },
    {
      "sha": "78c4ce563eef39f42863f738ad935bfb1f625d41",
      "shortSha": "78c4ce5",
      "parents": [
        "d2726882ec962a362cc75ece1ef5457b2e575a4b"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793760680,
      "subject": "fix(game): stitch active telemetry time seamlessly across pauses and separate minimized vs unfocused states",
      "body": "- Track continuous activeTimeMs and warmup frames in PerformanceProfiler so pre-pause and post-pause samples connect without drops or jumps\n- Distinguish minimized/hidden (document.hidden -> pause GPU rendering and offline physics) from unfocused (!document.hasFocus -> throttle FPS while keeping visible window rendering)\n- Update src/ui-core submodule\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "6d8c591a372fd710a1aecd9c6a4083816a59571d",
        "public": "f37d2d36c83c39c342d87c7d9fd64c21b9ced61b"
      },
      "changedSubmodules": []
    },
    {
      "sha": "9b9dc51cfb66a2dd6deab549646525a974cc0efc",
      "shortSha": "9b9dc51",
      "parents": [
        "e977fcdd2f152dffe7a6b6370a6376e78c7c2db3"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793760321,
      "subject": "refactor(types): eliminate index signatures and any across audio, effects, loader, input, and replay buffer",
      "body": "Remove all `[key: string]: any` index signatures, `: any` property/parameter declarations, and internal `as any` casts across peripheral engine subsystems:\n- `src/audio/**`: declare explicit typed fields and narrow runtime/engine ports (`AudioMixer`, `AudioSlotPool`, `SpatialAudioSource`, `BallAudioEmitter`, `StateAudioEngine`, `VehicleAudioEmitter`, `VehicleAudioManager`, `IncidentAudioEngine`, `WorldImpactAudioHandler`, `SignalAudioEngine`, `UIAudioEngine`, `GameAudioEngineFacade`, `BackgroundMusicController`, `audioAssetLoader`, `audioContext`, `audioDiagnosticProbes`, `audioDebug`, `spatialAudioMath`)\n- `src/effects/**`: type postprocessing pipeline, passes, bloom, speed lines, flip reset visual, room environment, and theme material sync\n- `src/loader/**`: type loading orchestrator, tasks, stream tracker, minimum progress loader, dual UI adapter, and pipeline contracts\n- `src/input/**`: type keyboard/mouse controller, gamepad controller, and hotkey input guard\n- `src/replay/ReplayRingBuffer.ts`: replace index signature and untyped fields with typed ring buffer and entity state contracts\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "6d8c591a372fd710a1aecd9c6a4083816a59571d",
        "public": "f37d2d36c83c39c342d87c7d9fd64c21b9ced61b"
      },
      "changedSubmodules": []
    },
    {
      "sha": "d2726882ec962a362cc75ece1ef5457b2e575a4b",
      "shortSha": "d272688",
      "parents": [
        "3d35ad69b5c902b94b1ecb7849f65906aed42303"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793759501,
      "subject": "feat(game): support unfocused power saving and pause telemetry sampling in power save",
      "body": "- Extend Power Saving throttling and Extreme GPU render freeze to unfocused/hidden window states while keeping 120Hz simulation decoupled\n- Add setUnfocusedFpsLimit and immediate wake timer reset to RenderClockScheduler\n- Skip PerformanceProfiler ring-buffer sampling during Power Saving or GPU render freeze and reset frame timing on resume\n- Update src/ui-core submodule with power saving telemetry configuration\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "6d8c591a372fd710a1aecd9c6a4083816a59571d",
        "public": "f37d2d36c83c39c342d87c7d9fd64c21b9ced61b"
      },
      "changedSubmodules": []
    },
    {
      "sha": "e22cdf586dab0a250bca7465e0c21efcb6464532",
      "shortSha": "e22cdf5",
      "parents": [
        "e977fcdd2f152dffe7a6b6370a6376e78c7c2db3"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793758362,
      "subject": "fix(modes): unify match lifecycle pipelines and fix exhibition HUD synchronization",
      "body": "- Remove end-of-frame HudMatchStateReconciler pull overwrite that reset exhibition scores, clock, kickoff countdown, and winner state\n- Add syncLocalMatchStateToRuntimeAndHud to atomically push match state transitions to runtime.match.state and hudStore\n- Expose forwarding match lifecycle getters on ExperimentalMultiBotsMode and unify replay/spectator POV slot hotkeys in RuntimeWindowHotkeys\n- Extract shared matchClockAndPhasePipeline, goalAndBallTouchPipeline, and multiCarBotStepPipeline across game modes\n- Remove dead legacy non-reconciler bot match tick fallback from RuntimeBotCoordinator, RuntimeMatchState, SimulationStage, and GameAudioSubsystem\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "6d8c591a372fd710a1aecd9c6a4083816a59571d",
        "public": "f37d2d36c83c39c342d87c7d9fd64c21b9ced61b"
      },
      "changedSubmodules": []
    },
    {
      "sha": "7c2fe9d6d9f3c6c4fa749fe4b336a071e1c3e008",
      "shortSha": "7c2fe9d",
      "parents": [
        "e977fcdd2f152dffe7a6b6370a6376e78c7c2db3"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793758124,
      "subject": "fix(entities,game): anchor shadow ROI to camera position and restrict shadow pass to POV modes",
      "body": "- Anchor ArenaLightingManager single-sun shadow frustum directly to the active camera position instead of hardcoding cars[0]\n- Gate directional shadow casting and WebGLRenderer shadowMap updates on POV camera modes (pov, wasmPov, rearView), skipping shadow depth passes in free, director, podium, and editor modes\n- Refresh subject shadows after GameCameraSubsystem updates in PresentationStage so the shadow frustum tracks the current-frame camera pose without 1-frame lag\n- Type ArenaLightingManager and ArenaLightingDebugGizmo with explicit TypeScript interfaces\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "6d8c591a372fd710a1aecd9c6a4083816a59571d",
        "public": "f37d2d36c83c39c342d87c7d9fd64c21b9ced61b"
      },
      "changedSubmodules": []
    },
    {
      "sha": "3d35ad69b5c902b94b1ecb7849f65906aed42303",
      "shortSha": "3d35ad6",
      "parents": [
        "e977fcdd2f152dffe7a6b6370a6376e78c7c2db3"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793757569,
      "subject": "fix(audio): refine TurtleModemDrivetrainModel stationary/overdrive/airborne behavior and add EngineAudioEqualizer",
      "body": "- Keep stationary vehicle in Neutral (Gear 0) with pure idle_loop playback and zero granular RPM slice vibration, shifting instantaneously to Gear 1 on forward throttle\n- Restrict exhaust backfire pops to natural overdrive accumulation (after exceeding the velocity-coupled speed curve) or active reverse-braking on ground, applying a substantial RPM drop and cooldown per pop\n- Suppress backfire pops completely while airborne so free-revving only enters redline rev-limiter oscillation\n- Add EngineAudioEqualizer with automatic per-slice RMS loudness normalization, 5-band fundamental frequency EQ, and 3-band Web Audio parametric timbre shaping\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "6d8c591a372fd710a1aecd9c6a4083816a59571d",
        "public": "f37d2d36c83c39c342d87c7d9fd64c21b9ced61b"
      },
      "changedSubmodules": []
    },
    {
      "sha": "e977fcdd2f152dffe7a6b6370a6376e78c7c2db3",
      "shortSha": "e977fcd",
      "parents": [
        "80acec6d0cb01290cba5a81d9ebb8f6ce4daf716"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793755033,
      "subject": "refactor(game,ui): decouple GameRuntime sub-controllers and type UI domain ports",
      "body": "- Convert RuntimeSceneBootstrap from a stateless gut-sharing class into pure factory functions createCorePhysicsBundle, createCoreSceneGraph, and disposeCoreSceneGraph returning strongly-typed component bundles\n- Make RuntimeNetworkManager, RuntimeBotCoordinator, RuntimeDOMEventManager, RuntimeWindowHotkeys, OnlineRosterSyncCoordinator, ReconcilerSignalCoordinator, and RuntimeLoadoutCoordinator autonomous stateful sub-controllers operating over narrow host ports\n- Remove the 240-line bindRuntimeNetworkStateBridge Object.defineProperties gut-sharing bridge and single-line proxy boilerplate on GameRuntime\n- Replace all 102 any occurrences in runtimeUiPort.ts with explicit TypeScript store contracts and domain-grouped RuntimeCameraPort, RuntimeMatchPort, RuntimeTunerPort, and RuntimeReplayPort interfaces\n- Narrow runtime*BridgeHandlers.ts to consume GameRuntimeUiBridgePort domain ports and remove dead settingsSheet property accesses\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "6d8c591a372fd710a1aecd9c6a4083816a59571d",
        "public": "f37d2d36c83c39c342d87c7d9fd64c21b9ced61b"
      },
      "changedSubmodules": []
    },
    {
      "sha": "80acec6d0cb01290cba5a81d9ebb8f6ce4daf716",
      "shortSha": "80acec6",
      "parents": [
        "06a8b8c91bd62d1e35a9f95572774fc6073372d1",
        "cbd750522fae463fc208f0ec9937e87f3a7563ec"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793747961,
      "subject": "Merge branch 'z/ui-core-menushell-cleanup' into z/merge-five-branches",
      "body": "Co-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "6d8c591a372fd710a1aecd9c6a4083816a59571d",
        "public": "f37d2d36c83c39c342d87c7d9fd64c21b9ced61b"
      },
      "changedSubmodules": [
        "src/ui-core"
      ]
    },
    {
      "sha": "06a8b8c91bd62d1e35a9f95572774fc6073372d1",
      "shortSha": "06a8b8c",
      "parents": [
        "342ae76943db90bf803ae7d57a705ffaaad14a46",
        "d4a0ef843a6f9a1cfadeca60123b9b9513b1bd82"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793747960,
      "subject": "Merge branch 'z/replay-typed-state-and-podium-pipeline' into z/merge-five-branches",
      "body": "Co-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "78423e76217b034a9876b239372b84a3fb6e9939",
        "public": "f37d2d36c83c39c342d87c7d9fd64c21b9ced61b"
      },
      "changedSubmodules": []
    },
    {
      "sha": "342ae76943db90bf803ae7d57a705ffaaad14a46",
      "shortSha": "342ae76",
      "parents": [
        "9ba026eb3784dac00fd2937fe7febcca27d8907d",
        "4206d20a8755b414656ef0e39c11e13037e9d44f"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793747958,
      "subject": "Merge branch 'z/refactor-pipeline-stages' into z/merge-five-branches",
      "body": "Co-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "78423e76217b034a9876b239372b84a3fb6e9939",
        "public": "f37d2d36c83c39c342d87c7d9fd64c21b9ced61b"
      },
      "changedSubmodules": []
    },
    {
      "sha": "9ba026eb3784dac00fd2937fe7febcca27d8907d",
      "shortSha": "9ba026e",
      "parents": [
        "95db2044e05012e952744b255d6a120723e70199",
        "ed19cd84b014b9616646cb8c2e6d4dbe41533feb"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793747957,
      "subject": "Merge branch 'z/match-session-admin-narrow-waist' into z/merge-five-branches",
      "body": "Co-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "78423e76217b034a9876b239372b84a3fb6e9939",
        "public": "f37d2d36c83c39c342d87c7d9fd64c21b9ced61b"
      },
      "changedSubmodules": []
    },
    {
      "sha": "95db2044e05012e952744b255d6a120723e70199",
      "shortSha": "95db204",
      "parents": [
        "27a29d29cde455e2b7561377e01efe24e8a596a7",
        "f981359844b8c8c62c79b2403d9f220e4e531575"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793747956,
      "subject": "Merge branch 'z/docs-and-arena-world-types' into z/merge-five-branches",
      "body": "Co-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "78423e76217b034a9876b239372b84a3fb6e9939",
        "public": "f37d2d36c83c39c342d87c7d9fd64c21b9ced61b"
      },
      "changedSubmodules": []
    },
    {
      "sha": "cbd750522fae463fc208f0ec9937e87f3a7563ec",
      "shortSha": "cbd7505",
      "parents": [
        "27a29d29cde455e2b7561377e01efe24e8a596a7"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793719783,
      "subject": "refactor(ui-system): extract useLivePreviewDockTransition and declarative menuRouteRegistry from MenuShell",
      "body": "- Extract live preview dock collapse/expand transition state machine into useLivePreviewDockTransition.ts\n- Extract declarative ROUTE_TO_PANEL_ID and MENU_ROUTE_RENDERERS into menuRouteRegistry.tsx\n- Reduce MenuShell.tsx from 596 lines to 226 lines and bump src/ui-core submodule to 6d8c591\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "78423e76217b034a9876b239372b84a3fb6e9939",
        "public": "f37d2d36c83c39c342d87c7d9fd64c21b9ced61b"
      },
      "changedSubmodules": []
    },
    {
      "sha": "d4a0ef843a6f9a1cfadeca60123b9b9513b1bd82",
      "shortSha": "d4a0ef8",
      "parents": [
        "27a29d29cde455e2b7561377e01efe24e8a596a7"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793716415,
      "subject": "refactor(replay): strongly type replay session/camera state and extract podiumFormationPipeline",
      "body": "- Define strongly-typed ReplaySessionState and DirectorCameraState value objects in ReplayDirectorStatePipeline.ts and ReplayTimelineController.ts\n- Eliminate all 22 Object.assign blind patches and all 122 any occurrences across ReplayTimelineController.ts and ReplayDirectorStatePipeline.ts\n- Rename PodiumPhysicsHelper.ts to pure pipeline podiumFormationPipeline.ts and return podiumCarSpots map to PodiumCelebrationController instead of mutating simTarget._podiumCarSpots\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "78423e76217b034a9876b239372b84a3fb6e9939",
        "public": "f37d2d36c83c39c342d87c7d9fd64c21b9ced61b"
      },
      "changedSubmodules": []
    },
    {
      "sha": "f981359844b8c8c62c79b2403d9f220e4e531575",
      "shortSha": "f981359",
      "parents": [
        "27a29d29cde455e2b7561377e01efe24e8a596a7"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793715398,
      "subject": "refactor(entities,docs): type ArenaWorld entities and update docs",
      "body": "- Replace all 53 untyped `any` usages in `ArenaWorld` with explicit entity, material, configuration, and physics transform interfaces (`BoostPadInstance`, `BoostPadTemplates`, `VehicleWheelSet`, `SuspensionUnitVisual`, `CarLoadoutConfig`, `CarControlInput`, `PhysicsTransformSource`, `TraversableMaterialNode`) and remove unused `flatCarAsset` accessors.\n- Update stale `.js` extensions and submodule mount paths (`src/ui-core`, `src/ui-core/stores`, `src/ui-core/config`) in `AGENTS.md`, `README.md`, and `src/camera/exempt_pov_microkernel/README.md`.\n- Add concise `Security & Zero-Credential Invariants` to `AGENTS.md`.\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "78423e76217b034a9876b239372b84a3fb6e9939",
        "public": "f37d2d36c83c39c342d87c7d9fd64c21b9ced61b"
      },
      "changedSubmodules": []
    },
    {
      "sha": "ed19cd84b014b9616646cb8c2e6d4dbe41533feb",
      "shortSha": "ed19cd8",
      "parents": [
        "27a29d29cde455e2b7561377e01efe24e8a596a7"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793715011,
      "subject": "refactor(network/server): eliminate MatchSessionAdmin proxy boilerplate and narrow subcontroller HostPorts",
      "body": "- Introduce explicit MatchDomainState and MatchSessionSnapshot in src/network/server/match/MatchDomainState.ts to hold shared match core state instead of using MatchSessionAdmin as a 34-property bag.\n- Remove 67 get/set property proxies (~300 lines of boilerplate) from MatchSessionAdmin.ts and expose domain subcontrollers (roster, lifecycle, commandQueue, goalReplay) plus getSnapshot().\n- Narrow MatchRosterHostPort, MatchCommandHostPort, MatchGoalReplayHostPort, and MatchPhaseLifecycleHostPort to explicit domain state and narrow action contracts.\n- Route HostWorkerMessageRouter, AuthoritativeServerWorker, HostServerFallbackSubController, and NetworkDataHandler directly through domain subcontrollers and getSnapshot().\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "78423e76217b034a9876b239372b84a3fb6e9939",
        "public": "f37d2d36c83c39c342d87c7d9fd64c21b9ced61b"
      },
      "changedSubmodules": []
    },
    {
      "sha": "4206d20a8755b414656ef0e39c11e13037e9d44f",
      "shortSha": "4206d20",
      "parents": [
        "27a29d29cde455e2b7561377e01efe24e8a596a7"
      ],
      "authorName": "antigravity-fine-grained-token[bot]",
      "authorEmail": "328994737+antigravity-fine-grained-token[bot]@users.noreply.github.com",
      "timestamp": 1793714878,
      "subject": "refactor(pipeline): extract CarActionEventSynthesizer and hudTransientFramePipeline",
      "body": "- Extract vehicle action debounce and edge event synthesis from SimulationStage into stateful CarActionEventSynthesizer sub-controller with narrow reset() and processTickEvents() lifecycle methods\n- Expose simulationStage on GameRuntime so callers of simulationStage.resetActionStates() and getCarActionState() resolve cleanly\n- Extract pure HUD transient data pipeline (buildHudTransientFramePayload, resolveModeRosterEntries, computeMiniMapCoordinates, projectNameTagScreenPositions) from TelemetryStage into hudTransientFramePipeline\n\nCo-authored-by: Mark <29165094+MaBoCoMark@users.noreply.github.com>",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "78423e76217b034a9876b239372b84a3fb6e9939",
        "public": "f37d2d36c83c39c342d87c7d9fd64c21b9ced61b"
      },
      "changedSubmodules": []
    },
    {
      "sha": "27a29d29cde455e2b7561377e01efe24e8a596a7",
      "shortSha": "27a29d2",
      "parents": [],
      "authorName": "Default User",
      "authorEmail": "29165094+MaBoCoMark@users.noreply.github.com",
      "timestamp": 1793710579,
      "subject": "init safe submodule",
      "body": "",
      "refs": [],
      "staleRefs": [],
      "submodulePointers": {
        "src/ui-core": "78423e76217b034a9876b239372b84a3fb6e9939",
        "public": "f37d2d36c83c39c342d87c7d9fd64c21b9ced61b"
      },
      "changedSubmodules": [
        "public",
        "src/ui-core"
      ]
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
