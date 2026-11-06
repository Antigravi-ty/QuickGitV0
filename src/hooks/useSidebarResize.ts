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
  const latestWidthRef = useRef(currentWidth);
  const rafIdRef = useRef<number | null>(null);

  const clampWidth = useCallback(
    (rawWidth: number): number => {
      if (direction === "left") {
        return Math.min(480, Math.max(220, Math.round(rawWidth)));
      }
      return Math.min(540, Math.max(260, Math.round(rawWidth)));
    },
    [direction]
  );

  const applyCssWidthVar = useCallback(
    (clampedWidth: number) => {
      const propName =
        direction === "left"
          ? "--left-sidebar-width"
          : "--right-sidebar-width";
      document.documentElement.style.setProperty(propName, `${clampedWidth}px`);
    },
    [direction]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizingRef.current) {
        return;
      }
      const delta =
        direction === "left"
          ? e.clientX - startXRef.current
          : startXRef.current - e.clientX;
      const nextWidth = clampWidth(startWidthRef.current + delta);
      latestWidthRef.current = nextWidth;
      if (rafIdRef.current === null) {
        rafIdRef.current = window.requestAnimationFrame(() => {
          rafIdRef.current = null;
          applyCssWidthVar(latestWidthRef.current);
        });
      }
    },
    [applyCssWidthVar, clampWidth, direction]
  );

  const stopResizing = useCallback(() => {
    if (!isResizingRef.current) {
      return;
    }
    isResizingRef.current = false;
    if (rafIdRef.current !== null) {
      window.cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", stopResizing);
    onResizeWidth(latestWidthRef.current);
  }, [handleMouseMove, onResizeWidth]);

  useEffect(() => {
    return () => {
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
      }
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
      latestWidthRef.current = currentWidth;
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", stopResizing);
    },
    [currentWidth, handleMouseMove, stopResizing]
  );
}
