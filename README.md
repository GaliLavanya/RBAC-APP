This project is a Role-Based Access Control (RBAC) User Interface (UI) designed to manage users, roles, and permissions within an application. 
The goal is to provide administrators with an intuitive and secure way to assign roles, manage user accounts, and configure permissions for each role.
This assignment aims to evaluate creativity, problem-solving skills, and understanding of building secure user interfaces.

Features & Functionality:
User Management: You can add, edit, or delete users, with the ability to assign roles and toggle between active/inactive statuses. A modal is used for creating or editing users.
Role Management: Roles are defined with specific permissions (like user management, content editing, etc.).
A modal allows you to add or edit roles, and each role has a set of permissions that can be toggled on/off.
Search and Filtering: Users can be searched by name or email, and the dashboard displays filtered results dynamically based on the search term.
State Management: React's useState is used to manage the users, roles, search term, and modal visibility. When a user or role is added or edited, the state is updated and re-rendered.
Technologies:
The main technologies include React (with hooks and JSX), JavaScript ES6, Lucide-React (for icons), and CSS for styling
