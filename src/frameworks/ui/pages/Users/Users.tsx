import { Link, Outlet } from 'react-router';
import { useUsers } from '../../../../infrastructure/repositories/UserRepositoryImplementation';
import { ErrorBoundary } from '../../components/ErrorBoundary/ErrorBoundary';
import './Users.css';

export function Users() {
  const { users, isLoading, isError, error } = useUsers();

  if (isLoading) {
    return (
      <div className="users-loading-state">
        <div className="spinner"></div>
        <p>Loading users...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="users-error-state">
        <h2>Error loading users</h2>
        <p>{error?.message || 'Please try again later'}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (!users?.length) {
    return (
      <div className="users-empty-state">
        <h2>No users found</h2>
        <p>There are currently no users in the system.</p>
      </div>
    );
  }

  return (
    <div className="users-container">
      <header className="users-header">
        <h1>Users</h1>
        <div className="users-actions">
          <input
            type="search"
            placeholder="Search users..."
            className="users-search"
            // Add search functionality here
          />
          <button className="add-user-btn">Add User</button>
        </div>
      </header>

      <div className="users-layout">
        <nav className="users-list">
          {users.map(user => (
            <Link
              key={user.id}
              to={`/users/${user.id}`}
              className="user-list-item"
            >
              <div className="user-avatar">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="user-info">
                <span className="user-name">{user.name}</span>
                <span className="user-email">{user.email}</span>
              </div>
            </Link>
          ))}
        </nav>

        <main className="user-details-view">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}
