'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, ArrowRight, Shield, Lock, Mail, User, Building, Phone } from 'lucide-react'

export default function AdminSignupPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [department, setDepartment] = useState('')
    const [adminCode, setAdminCode] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [agreeTerms, setAgreeTerms] = useState(false)

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
                            TALENTFLOW ADMIN REGISTRATION
                        </p>
                    </div>

                    <div className="hidden md:flex flex-col gap-6 lg:gap-8 my-8 lg:my-0">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                            Become an Administrator
                            <br />
                            Join our leadership team
                        </h2>

                        <div className="space-y-3 md:space-y-4">
                            {[
                                'Full platform management access',
                                'Advanced analytics & reporting',
                                'Team coordination tools',
                                'Priority support & training'
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
                            "Becoming a TalentFlow administrator has transformed how
                            we manage our learning ecosystem."
                        </p>
                        <div>
                            <p className="font-semibold text-white">
                                David Williams
                            </p>
                            <p className="text-sm text-gray-400">
                                LEAD ADMINISTRATOR
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side - Admin Sign Up Form */}
                <div className="w-full lg:w-1/2 min-h-[60vh] lg:min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 md:px-8 lg:px-12 overflow-y-auto">
                    <div className="w-full max-w-md mx-auto">
                        {/* Admin Badge */}
                        <div className="flex justify-center mb-6">
                            <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full flex items-center gap-2">
                                <Shield size={16} />
                                <span className="text-sm font-semibold">Admin Registration</span>
                            </div>
                        </div>

                        {/* Welcome Text */}
                        <div className="mb-6 md:mb-8 text-center">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                                Create Admin Account
                            </h2>
                            <p className="text-sm md:text-base text-gray-500">
                                Register as a platform administrator
                            </p>
                        </div>

                        {/* Admin Sign Up Form */}
                        <form className="space-y-4 md:space-y-5" onSubmit={(e) => e.preventDefault()}>
                            {/* Full Name */}
                            <div>
                                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                                    FULL NAME
                                </label>
                                <div className="relative">
                                    <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="John Doe"
                                        className="w-full pl-10 pr-3 md:pr-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            {/* Email */}
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
                                        placeholder="admin@company.com"
                                        className="w-full pl-10 pr-3 md:pr-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                                    PHONE NUMBER
                                </label>
                                <div className="relative">
                                    <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="+1 234 567 8900"
                                        className="w-full pl-10 pr-3 md:pr-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            {/* Department */}
                            <div>
                                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                                    DEPARTMENT
                                </label>
                                <div className="relative">
                                    <Building size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <select
                                        value={department}
                                        onChange={(e) => setDepartment(e.target.value)}
                                        className="w-full pl-10 pr-3 md:pr-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    >
                                        <option value="">Select Department</option>
                                        <option value="it">IT & Infrastructure</option>
                                        <option value="hr">Human Resources</option>
                                        <option value="academic">Academic Affairs</option>
                                        <option value="finance">Finance</option>
                                        <option value="operations">Operations</option>
                                    </select>
                                </div>
                            </div>

                            {/* Admin Code */}
                            <div>
                                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                                    ADMIN REGISTRATION CODE
                                </label>
                                <div className="relative">
                                    <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        value={adminCode}
                                        onChange={(e) => setAdminCode(e.target.value)}
                                        placeholder="Enter admin code"
                                        className="w-full pl-10 pr-3 md:pr-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <p className="text-xs text-gray-400 mt-1">
                                    Contact your organization for the admin registration code
                                </p>
                            </div>

                            {/* Password */}
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
                                        placeholder="Create a strong password"
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

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                                    CONFIRM PASSWORD
                                </label>
                                <div className="relative">
                                    <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm your password"
                                        className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Terms Agreement */}
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={agreeTerms}
                                    onChange={(e) => setAgreeTerms(e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                />
                                <span className="text-xs md:text-sm text-gray-600">
                                    I agree to the{' '}
                                    <Link href="/admin/terms" className="text-purple-600 hover:underline">
                                        Admin Terms of Service
                                    </Link>
                                    {' '}and{' '}
                                    <Link href="/admin/privacy" className="text-purple-600 hover:underline">
                                        Privacy Policy
                                    </Link>
                                </span>
                            </label>

                            {/* Register Button */}
                            <button
                                type="submit"
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 mt-6"
                            >
                                Register as Admin
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
                                    Already have access?
                                </span>
                            </div>
                        </div>

                        {/* Sign In Link */}
                        <p className="text-center text-sm text-gray-600">
                            Already have an admin account?{' '}
                            <Link href="/admin/signin" className="text-purple-600 hover:underline font-medium">
                                Sign In
                            </Link>
                        </p>

                        {/* Back to User Sign Up */}
                        <p className="text-center text-sm text-gray-500 mt-4">
                            <Link href="/signup" className="text-gray-600 hover:underline">
                                ← Back to user sign up
                            </Link>
                        </p>

                        {/* Security Notice */}
                        <div className="mt-6 text-center">
                            <p className="text-xs text-gray-400">
                                🔒 All admin accounts require verification
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}