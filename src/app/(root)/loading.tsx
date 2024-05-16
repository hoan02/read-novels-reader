const Loading = () => {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0">
      <div
        role="status"
        className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
      >
        <svg className="h-20 w-20 animate-spin stroke-blue-500" viewBox="0 0 256 256">
          <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
          <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round"stroke-width="24"></line>
          <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
          <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round"stroke-width="24"></line>
          <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
          <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round"stroke-width="24"></line>
          <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
          <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
          </line>
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
