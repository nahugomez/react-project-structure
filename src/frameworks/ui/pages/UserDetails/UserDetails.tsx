import { useParams } from 'react-router';
import { useUser } from '../../../../infrastructure/repositories/UserRepositoryImplementation';
import './UserDetails.css';

export function UserDetails() {
  const { id } = useParams<{ id: string }>();
  const { user, isLoading, isError } = useUser(id ? parseInt(id, 10) : 0);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading user</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h1>User Details</h1>
      <div className="user-info">
        <h2>{user.name}</h2>
        <div className="user-field">
          <label>Email:</label>
          <span>{user.email}</span>
        </div>
        <div className="user-field">
          <label>ID:</label>
          <span>{user.id}</span>
        </div>
      </div>
    </div>
  );
}
