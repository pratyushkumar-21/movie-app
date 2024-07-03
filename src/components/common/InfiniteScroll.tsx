import { ReactNode, useCallback, useEffect, useRef } from "react";

type InfiniteScrollPropsType = {
  children: ReactNode;
  loadMore: () => void;
  threshold?: number;
  apiCallInitated?: boolean;
  loader?: ReactNode;
  hasMore?: boolean;
};

export default function InfiniteScroll(props: InfiniteScrollPropsType) {
  const {
    children,
    loadMore,
    apiCallInitated,
    loader,
    hasMore,
    threshold = 500,
  } = props;

  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = useCallback(() => {
    const containerElement = containerRef.current;
    if (!containerElement) return;

    const { scrollTop, scrollHeight, clientHeight } = containerElement;

    if (
      scrollTop + clientHeight + threshold >= scrollHeight &&
      hasMore &&
      !apiCallInitated
    )
      loadMore();
  }, [loadMore, hasMore, apiCallInitated]);

  useEffect(() => {
    const containerElement = containerRef.current;

    //adding scroll event for infinte scrolling
    if (containerElement)
      containerElement.addEventListener("scroll", handleScroll);

    return () => {
      if (containerElement)
        containerElement.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div ref={containerRef} className="infinite-scroll-container">
      {children}
      {apiCallInitated && loader && loader}
    </div>
  );
}
