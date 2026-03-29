'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, ArrowRight, Shield, Lock, Mail } from 'lucide-react'

export default function AdminSigninPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [keepSignedIn, setKeepSignedIn] = useState(false)

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 to-gray-800">
            <div className="flex flex-col lg:flex-row min-h-screen">

                {/* Left Side - Admin Brand Section */}
                <div className="w-full lg:w-1/2 bg-gradient-to-br from-gray-900 to-gray-800 min-h-[40vh] lg:min-h-screen flex flex-col justify-between p-6 sm:p-8 md:p-10">
                    <div className="mb-8 lg:mb-0">
                        <div className="flex items-center gap-3 mb-4">
                            <Shield size={40} className="text-purple-500" />
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                                Admin Portal
                            </h1>
                        </div>
                        <p className="text-sm sm:text-md text-gray-300 mt-1">
                            TALENTFLOW ADMIN DASHBOARD
                        </p>
                    </div>

                    <div className="hidden md:flex flex-col gap-6 lg:gap-8 my-8 lg:my-0">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                            Manage your platform
                            <br />
                            with full control
                        </h2>

                        <div className="space-y-3 md:space-y-4">
                            {[
                                'User Management & Analytics',
                                'Course & Content Administration',
                                'Certificate Verification System',
                                'Real-time Platform Monitoring'
                            ].map((feature, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="w-5 h-5 border border-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                    </div>
                                    <span className="text-gray-300 text-sm md:text-[16px]">
                                        {feature}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="hidden lg:block border border-purple-500/30 p-6 md:p-8 rounded-xl bg-white/5 backdrop-blur-sm mt-8 lg:mt-0">
                        <p className="text-gray-300 italic text-sm md:text-base mb-4">
                            "The admin portal gives us complete visibility and control
                            over our learning platform. Absolutely essential!"
                        </p>
                        <div>
                            <p className="font-semibold text-white">
                                Merit Okonkwo
                            </p>
                            <p className="text-sm text-gray-400">
                                PLATFORM ADMINISTRATOR
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side - Admin Sign In Form */}
                <div className="w-full lg:w-1/2 min-h-[60vh] lg:min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 md:px-8 lg:px-12">
                    <div className="w-full max-w-md mx-auto">
                        {/* Admin Badge */}
                        <div className="flex justify-center mb-6">
                            <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full flex items-center gap-2">
                                <Shield size={16} />
                                <span className="text-sm font-semibold">Admin Access</span>
                            </div>
                        </div>

                        {/* Welcome Text */}
                        <div className="mb-6 md:mb-8 text-center">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                                Admin Sign In
                            </h2>
                            <p className="text-sm md:text-base text-gray-500">
                                Access the administrative dashboard
                            </p>
                        </div>

                        {/* Admin Login Form */}
                        <form className="space-y-4 md:space-y-5" onSubmit={(e) => e.preventDefault()}>
                            {/* Email Field */}
                            <div>
                                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                                    ADMIN EMAIL
                                </label>
                                <div className="relative">
                                    <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="admin@talentflow.com"
                                        className="w-full pl-10 pr-3 md:pr-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                                    PASSWORD
                                </label>
                                <div className="relative">
                                    <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Options Row */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={keepSignedIn}
                                        onChange={(e) => setKeepSignedIn(e.target.checked)}
                                        className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                    />
                                    <span className="text-sm text-gray-600">
                                        Keep me signed in
                                    </span>
                                </label>

                                <button
                                    type="button"
                                    className="text-sm text-purple-600 hover:underline"
                                >
                                    Forgot password?
                                </button>
                            </div>

                            {/* Sign In Button */}
                            <button
                                type="submit"
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 mt-6"
                            >
                                Access Dashboard
                                <ArrowRight size={18} />
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    Secure Access Only
                                </span>
                            </div>
                        </div>

                        {/* Back to User Sign In */}
                        <p className="text-center text-sm text-gray-600">
                            Not an admin?{' '}
                            <Link href="/signin" className="text-purple-600 hover:underline font-medium">
                                User Sign In
                            </Link>
                        </p>

                        {/* Security Notice */}
                        <div className="mt-6 text-center">
                            <p className="text-xs text-gray-400">
                                🔒 This area is restricted to authorized personnel only
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}