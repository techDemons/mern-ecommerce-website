import React from "react";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6">
      <h2 className="text-3xl font-semibold text-center mb-8">
        My Profile
      </h2>

      <div className="bg-white shadow-lg rounded-2xl p-6 space-y-4">
        <div className="flex flex-col gap-2">
          <p className="text-lg">
            <span className="font-semibold">First Name:</span> {user?.firstName || "N/A"}
          </p>

          <p className="text-lg">
            <span className="font-semibold">Last Name:</span> {user?.lastName || "N/A"}
          </p>

          <p className="text-lg">
            <span className="font-semibold">Email:</span> {user?.email || "N/A"}
          </p>

          <p className="text-lg">
            <span className="font-semibold">Mobile:</span> {user?.mobile || "N/A"}
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Residential Address</h3>

          {user?.address ? (
            <div className="bg-gray-100 p-4 rounded-xl space-y-1">
              <p>{user.address.street}</p>
              <p>{user.address.city}, {user.address.state}</p>
              <p>{user.address.pincode}</p>
            </div>
          ) : (
            <p className="text-gray-500">No address added</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
