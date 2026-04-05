"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  Trophy,
  Star,
  Target,
  BookOpen,
  Clock,
  Play,
  Calendar,
  ChevronRight,
  Sparkles,
  Award,
  Users,
} from "lucide-react";
import { isAuthenticated, getUser, logoutUser } from "@/lib/api";

export default function DashboardPage() {
  const router = useRouter();
  const [hasStartedCourse, setHasStartedCourse] = useState(false);
  const [userName, setUserName] = useState("Favour");
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check authentication and load user data
  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      router.push('/signin');
      return;
    }

    // Load user data
    const user = getUser();
    if (user) {
      setUserName(user.firstName || user.email?.split('@')[0] || "Favour");
    }

    // Check if user has started any course
    const started = localStorage.getItem("hasStartedCourse");
    if (started === "true") {
      setHasStartedCourse(true);
    }

    setLoading(false);
  }, [router]);

  const handleStartCourse = () => {
    setHasStartedCourse(true);
    localStorage.setItem("hasStartedCourse", "true");
  };

  const handleLogout = async () => {
    await logoutUser();
    router.push('/signin');
  };

  const handleSidebarCollapse = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">

      {/* MAIN CONTENT - Adjusted margin based on sidebar state */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'md:ml-10' : 'md:ml-10'
        }`}>
        <div className="pt-5">
          {/* CONDITIONAL RENDERING */}
          {!hasStartedCourse ? (
            <FirstTimeDashboard onStartCourse={handleStartCourse} userName={userName} />
          ) : (
            <ActiveDashboard userName={userName} />
          )}
        </div>
      </div>
    </div>
  );
}

// FIRST TIME USER DASHBOARD
function FirstTimeDashboard({ onStartCourse, userName }: { onStartCourse: () => void; userName: string }) {
  const courses = [
    { title: "UI/UX Design", progress: "2/8 Watched", icon: "🎨", lessons: 8, completed: 2 },
    { title: "Product Management", progress: "0/6 Watched", icon: "📊", lessons: 6, completed: 0 },
    { title: "Graphic Design", progress: "1/10 Watched", icon: "✏️", lessons: 10, completed: 1 },
  ];

  return (
    <main className="p-4 lg:p-6">
      {/* Welcome Hero */}
      <div className="relative bg-gradient-to-r from-green-900 to-green-700 text-white rounded-2xl p-6 lg:p-8 mb-8 overflow-hidden">
        <div className="relative z-10">
          <p className="text-sm mb-2 opacity-80">Welcome Back, {userName}! 👋</p>
          <h2 className="text-2xl lg:text-3xl font-bold mb-4 leading-snug">
            Sharpen Your Skills With <br /> Professional Online Courses
          </h2>
          <button
            onClick={onStartCourse}
            className="bg-white text-green-900 px-6 py-3 rounded-full text-sm font-medium flex items-center gap-2 hover:shadow-lg transition-all"
          >
            Start Your First Course <Play size={16} />
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-6 right-6 opacity-30">
          <Sparkles size={24} />
        </div>
        <div className="absolute bottom-6 right-6 opacity-30">
          <Sparkles size={20} />
        </div>
      </div>

      {/* Featured Courses */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Popular Courses 🔥</h3>
          <button className="text-green-700 text-sm flex items-center gap-1">
            View all <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course, index) => (
            <CourseCard
              key={index}
              title={course.title}
              completed={course.completed}
              total={course.lessons}
              icon={course.icon}
              onStart={onStartCourse}
            />
          ))}
        </div>
      </div>

      {/* Why Join Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6">
        <h3 className="font-semibold text-lg mb-4">Why Join TalentFlow? 🚀</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Trophy size={24} className="text-green-700" />
            </div>
            <p className="font-medium text-sm">Expert-led</p>
            <p className="text-xs text-gray-500">Courses</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Target size={24} className="text-green-700" />
            </div>
            <p className="font-medium text-sm">Hands-on</p>
            <p className="text-xs text-gray-500">Projects</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Award size={24} className="text-green-700" />
            </div>
            <p className="font-medium text-sm">Certification</p>
            <p className="text-xs text-gray-500">Upon Completion</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Users size={24} className="text-green-700" />
            </div>
            <p className="font-medium text-sm">Community</p>
            <p className="text-xs text-gray-500">Support</p>
          </div>
        </div>
      </div>
    </main>
  );
}

// ACTIVE USER DASHBOARD (After Starting Course)
function ActiveDashboard({ userName }: { userName: string }) {
  const stats = [
    { label: "Courses Taken", value: "22", change: "+12.5%", icon: BookOpen, color: "bg-blue-500" },
    { label: "Pending Enrollments", value: "12", change: "+12.5%", icon: Clock, color: "bg-orange-500" },
    { label: "Completed Courses", value: "10", change: "", icon: CheckCircle, color: "bg-green-500" },
    { label: "Certifications", value: "5", change: "", icon: Award, color: "bg-purple-500" },
  ];

  const monthlyProgress = [65, 58, 70, 62];
  const months = ["January", "February", "March", "April"];
  const maxProgress = 70;

  const schedule = [
    { time: "09:00 AM", course: "UI/UX Design Fundamentals", instructor: "Dr. Sarah Johnson", duration: "1.5 hours" },
    { time: "11:00 AM", course: "Advanced Product Management", instructor: "Prof. Michael Chen", duration: "2 hours" },
    { time: "02:00 PM", course: "Graphic Design Workshop", instructor: "Lisa Anderson", duration: "1.5 hours" },
    { time: "04:00 PM", course: "Portfolio Review Session", instructor: "Team Mentors", duration: "1 hour" },
  ];

  const activeCourses = [
    { title: "UI/UX Design Masterclass", progress: 75, nextLesson: "Advanced Prototyping", dueDate: "Today" },
    { title: "Product Management 101", progress: 45, nextLesson: "Market Research", dueDate: "Tomorrow" },
    { title: "Graphic Design Pro", progress: 60, nextLesson: "Color Theory", dueDate: "Friday" },
  ];

  return (
    <main className="p-4 lg:p-6 overflow-y-auto">
      {/* Welcome Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Good evening, {userName}! 👋</h1>
        <p className="text-gray-500">Ready to continue your learning journey?</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon size={20} className="text-white" />
              </div>
              {stat.change && (
                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              )}
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Learning Progress Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Learning Progress</h3>
            <select className="text-xs border rounded-lg px-2 py-1">
              <option>Monthly</option>
              <option>Weekly</option>
              <option>Yearly</option>
            </select>
          </div>

          {/* Chart Bars */}
          <div className="flex items-end justify-between gap-4 h-64">
            {monthlyProgress.map((progress, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-green-600 rounded-t-lg transition-all duration-500 hover:bg-green-700"
                  style={{ height: `${(progress / maxProgress) * 200}px` }}
                >
                  <div className="text-center text-white text-xs font-medium -mt-5">
                    {progress}%
                  </div>
                </div>
                <span className="text-xs text-gray-500">{months[index]}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t">
            <p className="text-xs text-gray-400">Y-Axis: Progress (%) | X-Axis: Months</p>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Today's Schedule</h3>
            <Calendar size={18} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {schedule.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-16 text-xs text-gray-500 font-medium">{item.time}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.course}</p>
                  <p className="text-xs text-gray-400">{item.instructor}</p>
                  <p className="text-xs text-gray-400 mt-1">{item.duration}</p>
                </div>
                <button className="text-green-700">
                  <Play size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Courses */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Active Courses 📚</h3>
          <button className="text-green-700 text-sm flex items-center gap-1">
            View all <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeCourses.map((course, index) => (
            <ActiveCourseCard key={index} {...course} />
          ))}
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="mt-6 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Trophy size={20} className="text-yellow-600" />
          <h3 className="font-semibold">Recent Achievements</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <AchievementBadge icon="🔥" title="7 Day Streak" description="Learned 7 days in a row" />
          <AchievementBadge icon="⚡" title="Quick Learner" description="Completed 5 lessons in one day" />
          <AchievementBadge icon="💯" title="Perfect Score" description="Got 100% on quiz" />
          <AchievementBadge icon="👑" title="Top Performer" description="Top 10% this month" />
        </div>
      </div>
    </main>
  );
}

// COMPONENTS
function CourseCard({ title, completed, total, icon, onStart }: { title: string; completed: number; total: number; icon: string; onStart: () => void }) {
  const percentage = (completed / total) * 100;

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-3">
        <div className="text-2xl">{icon}</div>
        <button onClick={onStart} className="text-green-700 text-sm font-medium hover:underline">
          Start →
        </button>
      </div>
      <h4 className="font-medium mb-1">{title}</h4>
      <p className="text-xs text-gray-400">{completed}/{total} Watched</p>
      <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-green-600 rounded-full" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}

function ActiveCourseCard({ title, progress, nextLesson, dueDate }: { title: string; progress: number; nextLesson: string; dueDate: string }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-3">
        <div className="bg-green-100 p-2 rounded-lg">
          <BookOpen size={18} className="text-green-700" />
        </div>
        <span className="text-xs text-gray-400">{dueDate}</span>
      </div>
      <h4 className="font-medium mb-1">{title}</h4>
      <p className="text-xs text-gray-500">Next: {nextLesson}</p>
      <div className="mt-3">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-gray-500">Progress</span>
          <span className="font-medium">{progress}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-green-600 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      <button className="mt-3 w-full py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition-all">
        Continue Learning
      </button>
    </div>
  );
}

function AchievementBadge({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="text-center p-3 bg-white rounded-lg">
      <div className="text-3xl mb-2">{icon}</div>
      <p className="font-medium text-sm">{title}</p>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  );
}