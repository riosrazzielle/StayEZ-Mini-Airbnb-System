// This middleware expects the user's role to be sent in the request headers
const checkRole = (requiredRoles) => {
    return (req, res, next) => {
        // Frontend will send the role in the headers for simplicity in this mini-project
        const userRole = req.headers['user-role'];

        if (!userRole) {
            return res.status(401).json({ message: 'Access denied: No role provided' });
        }

        if (!requiredRoles.includes(userRole)) {
            return res.status(403).json({ message: 'Access denied: You do not have permission' });
        }

        // If they have the right role, let them proceed to the route
        next();
    };
};

module.exports = checkRole;