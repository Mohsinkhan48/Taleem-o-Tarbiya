function PageNotFound() {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <h1 className="text-4xl font-bold text-text">404 - Page Not Found</h1>
          <p className="mt-4 text-secondary">
            Sorry, the page you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

export default PageNotFound