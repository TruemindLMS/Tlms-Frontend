"use client";

import UserProfile from "@/components/userProfile";

const UserProfilePage = () => {
 
  return (
    <div className=" max-w-6xl w-10/12 mx-auto py-20  ">
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="text-2xl md:text-4xl font-bold text-green-900 dark:text-green-600">
          Settings
        </h1>
        <p className=" text-sm md:text-base text-green-500 mt-1">
          Manage your profile, address and security
        </p>
      </div>
      <UserProfile />
    </div>
  );
}

export default UserProfilePage;
