import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.userRole === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Only admins can access this' });
    }
  });
};

export const verifyStaffOrAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.userRole === 'admin' || req.userRole === 'staff') {
      next();
    } else {
      res.status(403).json({ message: 'Only staff and admin can access this' });
    }
  });
};
