import React, { useCallback, useEffect, useRef } from "react";

export type SidebarResizeDirection = "left" | "right";

export function useSidebarResize(
  direction: SidebarResizeDirection,
  currentWidth: number,
  onResizeWidth: (nextWidth: number) => void
): (e: React.MouseEvent | React.TouchEvent) => void {
  const isResizingRef = useRef(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(currentWidth);

  const applyDeltaFromClientX = useCallback(
    (clientX: number) => {
      if (!isResizingRef.current) {
        return;
      }
      const delta =
        direction === "left"
          ? clientX - startXRef.current
          : startXRef.current - clientX;
      onResizeWidth(startWidthRef.current + delta);
    },
    [direction, onResizeWidth]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      applyDeltaFromClientX(e.clientX);
    },
    [applyDeltaFromClientX]
  );

  const stopResizing = useCallback(() => {
    if (!isResizingRef.current) {
      return;
    }
    isResizingRef.current = false;
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", stopResizing);
  }, [handleMouseMove]);

  useEffect(() => {
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [handleMouseMove, stopResizing]);

  return useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      const clientX =
        "touches" in e
          ? e.touches[0]?.clientX ?? 0
          : (e as React.MouseEvent).clientX;
      if (!("touches" in e)) {
        e.preventDefault();
      }
      isResizingRef.current = true;
      startXRef.current = clientX;
      startWidthRef.current = currentWidth;
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", stopResizing);
    },
    [currentWidth, handleMouseMove, stopResizing]
  );
}
