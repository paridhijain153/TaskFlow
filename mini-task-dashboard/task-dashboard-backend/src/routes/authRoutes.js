const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const { PrismaClient } = require("@prisma/client")

const sendOTPEmail =
  require("../utils/sendEmail")

const prisma = new PrismaClient()

const router = express.Router()

// SEND OTP
router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body

    const existingUser =
      await prisma.user.findUnique({
        where: { email },
      })

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      })
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString()

    const expiresAt = new Date(
      Date.now() + 10 * 60 * 1000
    )

    await prisma.oTP.create({
      data: {
        email,
        otp,
        expiresAt,
      },
    })

    await sendOTPEmail(email, otp)

    res.json({
      message: "OTP sent successfully",
    })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: "Server error",
    })
  }
})

// VERIFY OTP
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body

    const otpRecord =
      await prisma.oTP.findFirst({
        where: {
          email,
          otp,
        },
      })

    if (!otpRecord) {
      return res.status(400).json({
        message: "Invalid OTP",
      })
    }

    if (new Date() > otpRecord.expiresAt) {
      return res.status(400).json({
        message: "OTP expired",
      })
    }

    res.json({
      verified: true,
    })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: "Server error",
    })
  }
})

// COMPLETE SIGNUP
router.post(
  "/complete-signup",
  async (req, res) => {
    try {
      const {
        name,
        email,
        password,
      } = req.body

      const otpRecord =
        await prisma.oTP.findFirst({
          where: { email },
        })

      if (!otpRecord) {
        return res.status(400).json({
          message: "Email not verified",
        })
      }

      const hashedPassword =
        await bcrypt.hash(password, 10)

      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      })

      // delete otp after signup
      await prisma.oTP.delete({
        where: {
          id: otpRecord.id,
        },
      })

      res.json({
        message: "Signup completed",
      })
    } catch (error) {
      console.log(error)

      res.status(500).json({
        message: "Server error",
      })
    }
  }
)

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    const user =
      await prisma.user.findUnique({
        where: { email },
      })

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      })
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      )

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      })
    }

    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    )

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: "Server error",
    })
  }
})

module.exports = router