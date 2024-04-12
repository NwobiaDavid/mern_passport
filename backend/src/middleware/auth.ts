export const verifyToken = async (req, res, next) => {
    try {
      // Check if user is authenticated via Google OAuth
      if (!req.user) {
        return res.status(403).send("Access Denied");
      }
  
      // If authenticated, proceed to the next middleware
      next();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  