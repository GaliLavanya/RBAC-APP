/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Users,
  ShieldCheck,
  Edit,
  Trash2,
  Search,
  Settings,
} from "lucide-react";

// Mock data and initial state
const initialUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Editor",
    status: "Active",
  },
];

const initialRoles = [
  {
    id: 1,
    name: "Admin",
    permissions: {
      userManagement: true,
      roleManagement: true,
      contentEdit: true,
      contentDelete: true,
    },
  },
  {
    id: 2,
    name: "Editor",
    permissions: {
      userManagement: false,
      roleManagement: false,
      contentEdit: true,
      contentDelete: false,
    },
  },
];

const permissionLabels = {
  userManagement: "User Management",
  roleManagement: "Role Management",
  contentEdit: "Content Editing",
  contentDelete: "Content Deletion",
};

const RBACDashboard = () => {
  const [users, setUsers] = useState(initialUsers);
  const [roles, setRoles] = useState(initialRoles);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // User Management Modal
  // eslint-disable-next-line react/prop-types
  const UserModal = ({ user, isNew }) => {
    const [formData, setFormData] = useState(
      user || { name: "", email: "", role: "", status: "Active" }
    );

    const handleSave = () => {
      if (isNew) {
        setUsers([...users, { ...formData, id: users.length + 1 }]);
      } else {
        setUsers(
          // eslint-disable-next-line react/prop-types
          users.map((u) => (u.id === user.id ? { ...u, ...formData } : u))
        );
      }
      setSelectedUser(null);
    };

    return (
      <div
        className="modal"
        style={{ display: selectedUser ? "block" : "none" }}
      >
        <div className="modal-content">
          <h2>{isNew ? "Create New User" : "Edit User"}</h2>
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>
          <div>
            <label>
              Status:
              <input
                type="checkbox"
                checked={formData.status === "Active"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.checked ? "Active" : "Inactive",
                  })
                }
              />
              {formData.status}
            </label>
          </div>
          <button onClick={handleSave}>Save User</button>
          <button onClick={() => setSelectedUser(null)}>Close</button>
        </div>
      </div>
    );
  };

  // Role Management Modal
  const RoleModal = ({ role, isNew }) => {
    const [formData, setFormData] = useState(
      role || { name: "", permissions: {} }
    );

    const handleSave = () => {
      if (isNew) {
        setRoles([...roles, { ...formData, id: roles.length + 1 }]);
      } else {
        setRoles(
          roles.map((r) => (r.id === role.id ? { ...r, ...formData } : r))
        );
      }
      setSelectedRole(null);
    };

    return (
      <div
        className="modal"
        style={{ display: selectedRole ? "block" : "none" }}
      >
        <div className="modal-content">
          <h2>{isNew ? "Create New Role" : "Edit Role"}</h2>
          <input
            type="text"
            placeholder="Role Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <div>
            <h3>Permissions</h3>
            {Object.keys(formData.permissions).map((key) => (
              <div key={key}>
                <label>
                  <input
                    type="checkbox"
                    checked={formData.permissions[key]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        permissions: {
                          ...formData.permissions,
                          [key]: e.target.checked,
                        },
                      })
                    }
                  />
                  {permissionLabels[key]}
                </label>
              </div>
            ))}
          </div>
          <button onClick={handleSave}>Save Role</button>
          <button onClick={() => setSelectedRole(null)}>Close</button>
        </div>
      </div>
    );
  };

  // Filtered users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard">
      <h1>
        <ShieldCheck /> Role-Based Access Control
      </h1>

      {/* User Management Section */}
      <div className="section">
        <h2>
          <Users /> User Management
          <button onClick={() => setSelectedUser({})}>Add User</button>
        </h2>
        <div className="search-bar">
          <Search />
          <input
            type="text"
            placeholder="Search users"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
                <td>
                  <button onClick={() => setSelectedUser(user)}>
                    <Edit />
                  </button>
                  <button
                    onClick={() =>
                      setUsers(users.filter((u) => u.id !== user.id))
                    }
                  >
                    <Trash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Role Management Section */}
      <div className="section">
        <h2>
          <Settings /> Role Management
          <button onClick={() => setSelectedRole({})}>Add Role</button>
        </h2>
        <table>
          <thead>
            <tr>
              <th>Role Name</th>
              <th>Permissions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id}>
                <td>{role.name}</td>
                <td>
                  {Object.entries(role.permissions)
                    .filter(([_, value]) => value)
                    .map(([key]) => permissionLabels[key])
                    .join(", ")}
                </td>
                <td>
                  <button onClick={() => setSelectedRole(role)}>
                    <Edit />
                  </button>
                  <button
                    onClick={() =>
                      setRoles(roles.filter((r) => r.id !== role.id))
                    }
                  >
                    <Trash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals for User and Role Management */}
      {selectedUser && (
        <UserModal
          user={selectedUser}
          isNew={Object.keys(selectedUser).length === 0}
        />
      )}
      {selectedRole && (
        <RoleModal
          role={selectedRole}
          isNew={Object.keys(selectedRole).length === 0}
        />
      )}
    </div>
  );
};

export default RBACDashboard;
