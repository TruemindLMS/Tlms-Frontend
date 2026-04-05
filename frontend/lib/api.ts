// lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

// Enable mock mode for testing when backend is unavailable
const USE_MOCK = true // Set to false when backend is ready

// Helper to safely parse JSON responses
async function parseResponse(response: Response) {
    const text = await response.text()
    try {
        return text ? JSON.parse(text) : {}
    } catch {
        return { message: text || response.statusText }
    }
}

export interface LoginResponse {
    token: string
    refreshToken: string
    user: {
        id: string
        email: string
        firstName: string
        lastName: string
        role: string
    }
    message?: string
}

export interface LoginRequest {
    email: string
    password: string
}

export interface RegisterRequest {
    email: string
    password: string
    confirmPassword: string
    firstName: string
    lastName: string
    role: string
}

export interface ApiResponse {
    success?: boolean
    message?: string
    token?: string
    refreshToken?: string
    user?: any
}

// Mock user database for testing
const mockUsers = new Map()

// Initialize with a test user
mockUsers.set('test@example.com', {
    id: '1',
    email: 'test@example.com',
    password: 'Test123!',
    firstName: 'Test',
    lastName: 'User',
    role: 'individual'
})

// Mock profile data
const mockProfile = {
    id: '1',
    firstName: 'Bankole',
    lastName: 'Shittu',
    email: 'bankole@talentflow.com',
    role: 'UI/UX Designer',
    jobTitle: 'UI/UX Intern',
    bio: 'Passionate UI/UX designer with 3 years of experience',
    enrolledCourses: [],
    completedCourses: [],
    overallProgress: 65,
    profilePicture: null
}

export async function loginUser(email: string, password: string): Promise<LoginResponse> {
    // Mock mode for testing when backend is unavailable
    if (USE_MOCK) {
        console.log('🔐 Mock login for:', email)

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        const user = mockUsers.get(email)

        if (!user || user.password !== password) {
            throw new Error('Invalid email or password')
        }

        const mockResponse: LoginResponse = {
            token: 'mock-jwt-token-12345',
            refreshToken: 'mock-refresh-token-67890',
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role
            },
            message: 'Login successful'
        }

        // Store in localStorage/sessionStorage
        localStorage.setItem('authToken', mockResponse.token)
        localStorage.setItem('refreshToken', mockResponse.refreshToken)
        localStorage.setItem('user', JSON.stringify(mockResponse.user))
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('userFullName', `${user.firstName} ${user.lastName}`)
        localStorage.setItem('userEmail', user.email)
        localStorage.setItem('userRole', user.role)

        return mockResponse
    }

    // Real API call
    try {
        const response = await fetch(`${API_BASE_URL}/Auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })

        const data = await parseResponse(response)

        if (!response.ok) {
            throw new Error(data.message || 'Login failed')
        }

        // Store token if returned
        if (data.token) {
            localStorage.setItem('authToken', data.token)
            if (data.refreshToken) {
                localStorage.setItem('refreshToken', data.refreshToken)
            }
            if (data.user) {
                localStorage.setItem('user', JSON.stringify(data.user))
                localStorage.setItem('userFullName', `${data.user.firstName || ''} ${data.user.lastName || ''}`.trim())
                localStorage.setItem('userEmail', data.user.email)
                localStorage.setItem('userRole', data.user.role)
            }
        }

        return data
    } catch (error) {
        console.error('Login error:', error)
        throw error
    }
}

export async function registerUser(userData: RegisterRequest): Promise<ApiResponse> {
    // Mock mode for testing
    if (USE_MOCK) {
        console.log('📝 Mock registration for:', userData.email)

        await new Promise(resolve => setTimeout(resolve, 1000))

        // Check if user already exists
        if (mockUsers.has(userData.email)) {
            throw new Error('User with this email already exists')
        }

        // Create new user
        const newUser = {
            id: String(mockUsers.size + 1),
            email: userData.email,
            password: userData.password,
            firstName: userData.firstName,
            lastName: userData.lastName,
            role: userData.role
        }

        mockUsers.set(userData.email, newUser)

        // Store pending user data for OTP verification
        localStorage.setItem('pendingUserData', JSON.stringify({
            fullName: `${userData.firstName} ${userData.lastName}`,
            email: userData.email,
            role: userData.role
        }))

        return {
            success: true,
            message: 'Registration successful. Please verify your email.'
        }
    }

    // Real API call
    try {
        const response = await fetch(`${API_BASE_URL}/Auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })

        const data = await parseResponse(response)

        if (!response.ok) {
            let errorMessage = data.message || 'Registration failed'
            if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
                errorMessage = data.errors[0]
            }
            throw new Error(errorMessage)
        }

        return data
    } catch (error) {
        console.error('Registration error:', error)
        throw error
    }
}

export async function sendOtp(email: string): Promise<ApiResponse> {
    // Mock mode
    if (USE_MOCK) {
        console.log('📧 Mock OTP sent to:', email)
        await new Promise(resolve => setTimeout(resolve, 500))

        // Store mock OTP in localStorage
        localStorage.setItem('mockOtp', '123456')
        localStorage.setItem('otpEmail', email)

        return {
            success: true,
            message: 'OTP sent successfully. Use code: 123456'
        }
    }

    try {
        const response = await fetch(`${API_BASE_URL}/Auth/resend-otp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        })

        const data = await parseResponse(response)

        if (!response.ok) {
            throw new Error(data.message || 'Failed to send OTP')
        }

        return data
    } catch (error) {
        console.error('Send OTP error:', error)
        throw error
    }
}

export async function verifyOtp(email: string, otp: string): Promise<ApiResponse> {
    // Mock mode
    if (USE_MOCK) {
        console.log('🔐 Verifying OTP for:', email)
        await new Promise(resolve => setTimeout(resolve, 500))

        // Accept 123456 or any 6-digit code in mock mode
        if (otp === '123456' || (otp.length === 6 && /^\d+$/.test(otp))) {
            const user = mockUsers.get(email)
            const mockResponse = {
                success: true,
                token: 'mock-jwt-token-12345',
                refreshToken: 'mock-refresh-token-67890',
                user: user || {
                    id: '1',
                    email: email,
                    firstName: email.split('@')[0],
                    lastName: 'User',
                    role: 'individual'
                },
                message: 'OTP verified successfully'
            }

            localStorage.setItem('authToken', mockResponse.token)
            localStorage.setItem('refreshToken', mockResponse.refreshToken)
            localStorage.setItem('user', JSON.stringify(mockResponse.user))
            localStorage.setItem('isAuthenticated', 'true')
            localStorage.setItem('userFullName', `${mockResponse.user.firstName} ${mockResponse.user.lastName}`.trim())
            localStorage.setItem('userEmail', mockResponse.user.email)
            localStorage.setItem('userRole', mockResponse.user.role)

            // Clear mock OTP
            localStorage.removeItem('mockOtp')
            localStorage.removeItem('otpEmail')

            return mockResponse
        } else {
            throw new Error('Invalid OTP. Please enter a valid 6-digit code.')
        }
    }

    try {
        const response = await fetch(`${API_BASE_URL}/Auth/verify-otp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, otp }),
        })

        const data = await parseResponse(response)

        if (!response.ok) {
            throw new Error(data.message || 'OTP verification failed')
        }

        // Store auth data if returned
        if (data.token) {
            localStorage.setItem('authToken', data.token)
            if (data.refreshToken) {
                localStorage.setItem('refreshToken', data.refreshToken)
            }
            if (data.user) {
                localStorage.setItem('user', JSON.stringify(data.user))
                localStorage.setItem('userFullName', `${data.user.firstName || ''} ${data.user.lastName || ''}`.trim())
                localStorage.setItem('userEmail', data.user.email)
                localStorage.setItem('userRole', data.user.role)
            }
            localStorage.setItem('isAuthenticated', 'true')
        }

        return data
    } catch (error) {
        console.error('OTP verification error:', error)
        throw error
    }
}

export async function forgotPassword(email: string): Promise<ApiResponse> {
    // Mock mode
    if (USE_MOCK) {
        console.log('🔑 Mock password reset for:', email)
        await new Promise(resolve => setTimeout(resolve, 500))
        return {
            success: true,
            message: 'Password reset link sent to your email'
        }
    }

    try {
        const response = await fetch(`${API_BASE_URL}/Auth/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        })

        const data = await parseResponse(response)

        if (!response.ok) {
            throw new Error(data.message || 'Password reset request failed')
        }

        return data
    } catch (error) {
        console.error('Forgot password error:', error)
        throw error
    }
}

export async function resetPassword(token: string, newPassword: string): Promise<ApiResponse> {
    // Mock mode
    if (USE_MOCK) {
        console.log('🔑 Mock password reset with token:', token)
        await new Promise(resolve => setTimeout(resolve, 500))
        return {
            success: true,
            message: 'Password reset successfully'
        }
    }

    try {
        const response = await fetch(`${API_BASE_URL}/Auth/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, newPassword }),
        })

        const data = await parseResponse(response)

        if (!response.ok) {
            throw new Error(data.message || 'Password reset failed')
        }

        return data
    } catch (error) {
        console.error('Reset password error:', error)
        throw error
    }
}

export async function logoutUser(): Promise<void> {
    try {
        const token = getAuthToken()
        if (token && !USE_MOCK) {
            await fetch(`${API_BASE_URL}/Auth/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
        }
    } catch (error) {
        console.error('Logout error:', error)
    } finally {
        logout()
    }
}

// Helper function to get auth token
export function getAuthToken(): string | null {
    if (typeof window === 'undefined') return null
    let token = sessionStorage.getItem('authToken')
    if (!token) {
        token = localStorage.getItem('authToken')
    }
    return token
}

// Helper function to get refresh token
export function getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null
    let token = sessionStorage.getItem('refreshToken')
    if (!token) {
        token = localStorage.getItem('refreshToken')
    }
    return token
}

// Helper function to logout
export function logout(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem('authToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('pendingUserData')
    localStorage.removeItem('userFullName')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userRole')
    localStorage.removeItem('onboardingCompleted')
    localStorage.removeItem('mockOtp')
    localStorage.removeItem('otpEmail')
    sessionStorage.removeItem('authToken')
    sessionStorage.removeItem('refreshToken')
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('isAuthenticated')
}

// Helper function to check if user is authenticated
export function isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false
    const token = getAuthToken()
    const isAuth = localStorage.getItem('isAuthenticated') === 'true'
    return !!token && isAuth
}

// Helper function to get user from storage
export function getUser(): any {
    if (typeof window === 'undefined') return null
    const userStr = localStorage.getItem('user')
    if (userStr) {
        try {
            return JSON.parse(userStr)
        } catch {
            return null
        }
    }
    return null
}

// Helper function to set user data
export function setUser(user: any): void {
    if (typeof window === 'undefined') return
    localStorage.setItem('user', JSON.stringify(user))
}

// Helper function to get user full name
export function getUserFullName(): string {
    const user = getUser()
    if (user) {
        return `${user.firstName || ''} ${user.lastName || ''}`.trim()
    }
    return localStorage.getItem('userFullName') || ''
}

// Helper function to get user email
export function getUserEmail(): string {
    const user = getUser()
    if (user) {
        return user.email || ''
    }
    return localStorage.getItem('userEmail') || ''
}

// Helper function to get user role
export function getUserRole(): string {
    const user = getUser()
    if (user) {
        return user.role || ''
    }
    return localStorage.getItem('userRole') || ''
}

// API client with proper headers typing
export async function apiClient(endpoint: string, options: RequestInit = {}) {
    const token = getAuthToken()

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }

    if (options.headers) {
        const customHeaders = options.headers as Record<string, string>
        Object.assign(headers, customHeaders)
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    })

    const data = await parseResponse(response)

    if (!response.ok) {
        throw new Error(data.message || 'API request failed')
    }

    return data
}

// Course API endpoints
export const courseApi = {
    getAll: () => apiClient('/Courses'),
    getById: (id: string) => apiClient(`/Courses/${id}`),
    create: (courseData: any) => apiClient('/Courses', { method: 'POST', body: JSON.stringify(courseData) }),
    update: (id: string, courseData: any) => apiClient(`/Courses/${id}`, { method: 'PUT', body: JSON.stringify(courseData) }),
    delete: (id: string) => apiClient(`/Courses/${id}`, { method: 'DELETE' }),
}

// Profile API endpoints with mock fallback
export const profileApi = {
    get: async () => {
        if (USE_MOCK) {
            console.log('👤 Mock: Getting profile data')
            await new Promise(resolve => setTimeout(resolve, 500))

            // Get user data from localStorage
            const user = getUser()
            if (user) {
                return {
                    ...mockProfile,
                    firstName: user.firstName || mockProfile.firstName,
                    lastName: user.lastName || mockProfile.lastName,
                    email: user.email || mockProfile.email,
                    role: user.role || mockProfile.role
                }
            }
            return mockProfile
        }

        try {
            return await apiClient('/Profile')
        } catch (error: any) {
            console.error('Profile API error:', error)
            // Return mock data as fallback
            return mockProfile
        }
    },
    update: async (profileData: any) => {
        if (USE_MOCK) {
            console.log('✏️ Mock: Updating profile:', profileData)
            await new Promise(resolve => setTimeout(resolve, 500))
            return { success: true, message: 'Profile updated successfully', data: profileData }
        }
        return apiClient('/Profile', { method: 'PUT', body: JSON.stringify(profileData) })
    },
}

// Complete Onboarding API endpoints with mock support
export const onboardingApi = {
    getStatus: async () => {
        if (USE_MOCK) {
            console.log('📋 Mock: Getting onboarding status')
            await new Promise(resolve => setTimeout(resolve, 500))
            return {
                success: true,
                status: 'pending',
                steps: {
                    bio: false,
                    profilePicture: false,
                    role: false,
                    goals: false
                }
            }
        }
        return apiClient('/Onboarding/status')
    },

    submitBio: async (bioData: { bio: string }) => {
        if (USE_MOCK) {
            console.log('📝 Mock: Submitting bio:', bioData)
            await new Promise(resolve => setTimeout(resolve, 500))
            return { success: true, message: 'Bio submitted successfully' }
        }
        return apiClient('/Onboarding/bio', {
            method: 'POST',
            body: JSON.stringify(bioData)
        })
    },

    uploadProfilePicture: async (file: File) => {
        if (USE_MOCK) {
            console.log('🖼️ Mock: Uploading profile picture:', file.name)
            await new Promise(resolve => setTimeout(resolve, 1000))
            return {
                success: true,
                message: 'Profile picture uploaded successfully',
                url: '/mock-profile-picture.jpg'
            }
        }

        const formData = new FormData()
        formData.append('file', file)

        const token = getAuthToken()
        const headers: Record<string, string> = {}
        if (token) {
            headers['Authorization'] = `Bearer ${token}`
        }

        const response = await fetch(`${API_BASE_URL}/Onboarding/profile-picture`, {
            method: 'POST',
            headers,
            body: formData,
        })

        return parseResponse(response)
    },

    submitRole: async (roleData: { role: string }) => {
        if (USE_MOCK) {
            console.log('💼 Mock: Submitting role:', roleData)
            await new Promise(resolve => setTimeout(resolve, 500))
            return { success: true, message: 'Role submitted successfully' }
        }
        return apiClient('/Onboarding/role', {
            method: 'POST',
            body: JSON.stringify(roleData)
        })
    },

    submitGoals: async (goalsData: { goals: string[] }) => {
        if (USE_MOCK) {
            console.log('🎯 Mock: Submitting goals:', goalsData)
            await new Promise(resolve => setTimeout(resolve, 500))
            return { success: true, message: 'Goals submitted successfully' }
        }
        return apiClient('/Onboarding/goals', {
            method: 'POST',
            body: JSON.stringify(goalsData)
        })
    },

    completeOnboarding: async () => {
        if (USE_MOCK) {
            console.log('✅ Mock: Completing onboarding')
            await new Promise(resolve => setTimeout(resolve, 500))

            // Mark onboarding as completed in localStorage
            localStorage.setItem('onboardingCompleted', 'true')

            return {
                success: true,
                message: 'Onboarding completed successfully',
                redirectUrl: '/dashboard'
            }
        }
        return apiClient('/Onboarding/complete', {
            method: 'POST'
        })
    },

    skipOnboarding: async () => {
        if (USE_MOCK) {
            console.log('⏭️ Mock: Skipping onboarding')
            await new Promise(resolve => setTimeout(resolve, 500))

            // Mark onboarding as skipped in localStorage
            localStorage.setItem('onboardingCompleted', 'skipped')

            return {
                success: true,
                message: 'Onboarding skipped successfully',
                redirectUrl: '/dashboard'
            }
        }
        return apiClient('/Onboarding/skip', {
            method: 'POST'
        })
    },
}

// Team API endpoints
export const teamApi = {
    getAll: () => apiClient('/Team'),
    getById: (id: string) => apiClient(`/Team/${id}`),
    create: (teamData: any) => apiClient('/Team', { method: 'POST', body: JSON.stringify(teamData) }),
    addMember: (teamId: string, memberData: any) => apiClient(`/Team/${teamId}/members`, { method: 'POST', body: JSON.stringify(memberData) }),
    getMembers: (teamId: string) => apiClient(`/Team/${teamId}/members`),
    getTasks: (teamId: string) => apiClient(`/Team/${teamId}/tasks`),
    createTask: (teamId: string, taskData: any) => apiClient(`/Team/${teamId}/tasks`, { method: 'POST', body: JSON.stringify(taskData) }),
}

// Test backend connection
export async function testBackendConnection(): Promise<boolean> {
    if (USE_MOCK) return true

    try {
        const response = await fetch(`${API_BASE_URL.replace('/api', '')}/swagger/index.html`, {
            method: 'HEAD',
            signal: AbortSignal.timeout(5000)
        })
        return response.ok
    } catch {
        return false
    }
}