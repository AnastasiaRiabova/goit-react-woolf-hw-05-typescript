import React, {
  FC,
  MutableRefObject,
  ReactNode,
  useEffect,
  useRef,
} from "react";

type ObserverProps = {
  children: ReactNode;
  onContentEndVisible: () => void;
};

export const Observer: FC<ObserverProps> = ({
  children,
  onContentEndVisible,
}) => {
  const endContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options: IntersectionObserverInit = {
      rootMargin: "0px",
      threshold: 1.0,
      root: null,
    };

    const observer: IntersectionObserver = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]): void => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.intersectionRatio > 0) {
            onContentEndVisible();
            observer.disconnect();
          }
        });
      },
      options,
    );

    if (endContentRef.current) {
      observer.observe(endContentRef.current);
    }

    return (): void => {
      observer.disconnect();
    };
  }, [onContentEndVisible]);

  return (
    <div>
      {children}
      <div ref={endContentRef} />
    </div>
  );
};
