import React, { useEffect } from "react";
import { AlertCircle, X } from "lucide-react";
import { LeftBranchSidebar } from "./components/LeftBranchSidebar";
import { RightCommitInspector } from "./components/RightCommitInspector";
import { TopHeaderBar } from "./components/TopHeaderBar";
import { TopologyGraphCanvas } from "./components/TopologyGraphCanvas";
import { useSidebarResize } from "./hooks/useSidebarResize";
import { useRepositoryStore } from "./stores/repositoryStore";

export const App: React.FC = () => {
  const errorMessage = useRepositoryStore((s) => s.errorMessage);
  const leftSidebarWidth = useRepositoryStore((s) => s.leftSidebarWidth);
  const rightSidebarWidth = useRepositoryStore((s) => s.rightSidebarWidth);
  const initializeWorkspace = useRepositoryStore((s) => s.initializeWorkspace);
  const clearCheckoutBanner = useRepositoryStore((s) => s.clearCheckoutBanner);
  const setLeftSidebarWidth = useRepositoryStore((s) => s.setLeftSidebarWidth);
  const setRightSidebarWidth = useRepositoryStore((s) => s.setRightSidebarWidth);

  useEffect(() => {
    void initializeWorkspace();
  }, [initializeWorkspace]);

  const startLeftResize = useSidebarResize(
    "left",
    leftSidebarWidth,
    setLeftSidebarWidth
  );
  const startRightResize = useSidebarResize(
    "right",
    rightSidebarWidth,
    setRightSidebarWidth
  );

  return (
    <div className="primer-shell">
      <TopHeaderBar />

      {errorMessage && (
        <div
          className="primer-banner primer-banner-warning"
          style={{ margin: "8px 12px 0 12px" }}
        >
          <div className="primer-banner-main">
            <div className="primer-banner-icon">
              <AlertCircle size={15} />
            </div>
            <div className="primer-banner-content">
              <div className="primer-banner-title">Git Operation Notice</div>
              <div className="primer-banner-description">{errorMessage}</div>
            </div>
          </div>
          <div className="primer-banner-actions">
            <button
              type="button"
              className="primer-btn primer-btn-icon-only"
              onClick={clearCheckoutBanner}
            >
              <X size={13} />
            </button>
          </div>
        </div>
      )}

      <div className="primer-main">
        <aside
          className="primer-sidebar"
          style={{ width: `var(--left-sidebar-width, ${leftSidebarWidth}px)` }}
        >
          <LeftBranchSidebar />
          <div
            className="primer-resize-handle-left"
            onMouseDown={startLeftResize}
            onTouchStart={startLeftResize}
          />
        </aside>

        <main
          className="primer-content"
          style={{ padding: 10, overflow: "hidden" }}
        >
          <TopologyGraphCanvas />
        </main>

        <aside
          className="primer-right-sidebar"
          style={{
            width: `var(--right-sidebar-width, ${rightSidebarWidth}px)`,
            borderLeft: "1px solid var(--border-default)",
            backgroundColor: "var(--bg-canvas-subtle)",
          }}
        >
          <div
            className="primer-resize-handle-right"
            onMouseDown={startRightResize}
            onTouchStart={startRightResize}
          />
          <RightCommitInspector />
        </aside>
      </div>
    </div>
  );
};
