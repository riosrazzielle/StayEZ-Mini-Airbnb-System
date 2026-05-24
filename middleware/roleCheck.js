// This middleware reads role and userId from request headers
const checkRole = (requiredRoles) => {
    return (req, res, next) => {
        const userRole = req.headers['user-role'];
        const userId   = req.headers['user-id'];

        if (!userRole) {
            return res.status(401).json({ message: 'Access denied: No role provided. Please log in.' });
        }

        if (!requiredRoles.includes(userRole)) {
            return res.status(403).json({ message: `Access denied: ${userRole}s cannot perform this action` });
        }

        // Attach to req so all routes can scope queries to the logged-in user
        req.userId   = userId;
        req.userRole = userRole;
        next();
    };
};

module.exports = checkRole;