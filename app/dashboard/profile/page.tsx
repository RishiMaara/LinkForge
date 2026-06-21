"use client";
import ProfileForm from "@/components/profile-form";

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">Profile</h1>
        <p className="text-neutral-500 text-sm mt-1">Update your display name, avatar, and public bio information.</p>
      </div>
      <ProfileForm />
    </div>
  );
}
