import { useEffect } from "react";

interface InfiniteScrollProps {
  isFetching: boolean;
  loading: boolean;
  onScrollEnd: () => void;
}

const useInfiniteScroll = ({ isFetching, loading, onScrollEnd }: InfiniteScrollProps) => {
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        !isFetching &&
        !loading
      ) {
        onScrollEnd(); // Trigger the callback when scroll reaches the end
      }
    };

    const debounce = (func: () => void, delay: number) => {
      let timeoutId: NodeJS.Timeout;
      return () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func();
        }, delay);
      };
    };

    const debouncedHandleScroll = debounce(handleScroll, 300);

    window.addEventListener("scroll", debouncedHandleScroll);
    return () => window.removeEventListener("scroll", debouncedHandleScroll);
  }, [isFetching, loading, onScrollEnd]);
};

export default useInfiniteScroll;
