"use client";


const exploreRoles = [
  "UI/UX Design",
  "Frontend Development",
  "Backend Development",
  "Product Management",
];

const categories = [
  "Information Technology",
  "Data Science",
  "Personal Development",
];

const skills = ["Python", "Excel", "SQL", "Machine Learning"];

const certificates = [
  "Business",
  "Computer Science",
  "Data Science",
  "Information Technology",
];

const degrees = ["Bachelor’s Degree", "Diploma"];

export default function ExplorePage() {
  return (
    <div className="w-full flex justify-center mt-10">
      <div className="w-[900px] bg-white shadow-lg rounded-md p-6">

        {/* TOP GRID */}
        <div className="grid grid-cols-3 gap-10 pb-6">

          {/* Explore Roles */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">
              Explore roles
            </h3>
            <ul className="space-y-3 text-gray-600 text-sm">
              {exploreRoles.map((item) => (
                <li key={item} className="hover:underline cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-gray-600 text-black cursor-pointer hover:underline">
              View all
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">
              Explore Categories
            </h3>
            <ul className="space-y-3 text-gray-600 text-sm">
              {categories.map((item) => (
                <li key={item} className="hover:underline cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-gray-600 cursor-pointer hover:underline">
              View all
            </p>
          </div>

          {/* Skills */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">
              Explore trending skills
            </h3>
            <ul className="space-y-3 text-gray-600 text-sm">
              {skills.map((item) => (
                <li key={item} className="hover:underline cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-gray-600 cursor-pointer hover:underline">
              View all
            </p>
          </div>
        </div>

        {/* BOTTOM GRID */}
        <div className="grid grid-cols-2 gap-10 pt-6">

          {/* Certificates */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">
              Earn a Professional Certificate
            </h3>
            <ul className="space-y-3 text-gray-600 text-sm">
              {certificates.map((item) => (
                <li key={item} className="hover:underline cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-gray-600 cursor-pointer hover:underline">
              View all
            </p>
          </div>

          {/* Degrees */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">
              Earn an Online Degree
            </h3>
            <ul className="space-y-3 text-gray-600 text-sm">
              {degrees.map((item) => (
                <li key={item} className="hover:underline cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-4">
              <h4 className="text-gray-800 font-bold text-sm">
                Prepare for an exam
              </h4>
              <p className="text-gray-600 text-sm mt-2 cursor-pointer hover:underline">
                View all
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}