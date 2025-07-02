import bcrypt from 'bcryptjs'; // Add this for password hashing
import prisma from "../prisma/index.js";
import cookieToken from "../utils/cookieToken.js";

// User signup
export const signup = async (req, res) => {
  try {
    const { name, email, phone, password, location, userType } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !password || !location) {
      return res.status(400).json({ 
        success: false, 
        message: "All fields are required: name, email, phone, password, location" 
      });
    }

    // Check if user already exists (email or phone)
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { phone }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: "User already exists with this email or phone" 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        location,
        userType: userType || "USER", // Default to USER if not provided
      },
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    // Generate JWT token and set cookie
    cookieToken(userWithoutPassword, res);
    
  } catch (error) {
    console.error("Signup error:", error);
    
    // Handle Prisma unique constraint errors
    if (error.code === 'P2002') {
      return res.status(400).json({ 
        success: false, 
        message: "Email or phone already exists" 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
};