import ScreenLayout from "@/components/layout/ScreenLayout";
import CustomButton from "@/components/ui/CustomButton";
import { T } from "@/components/ui/T";
import { useAuthStore } from "@/stores/authStore";

export default function ProfileScreen() {
  const user = useAuthStore((state) => state.user);
  const handleLogout = async () => {
    await useAuthStore.getState().clearUser();
  };

  return (
    <ScreenLayout style={{ gap: 8 }}>
      <T type="title">Profile</T>
      <T type="subtitle">Email: {user?.email}</T>
      <T type="subtitle">Password: {user?.password}</T>
      <CustomButton title="Logout" onPress={handleLogout} />
    </ScreenLayout>
  );
}
