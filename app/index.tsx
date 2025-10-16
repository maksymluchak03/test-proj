import ScreenLayout from "@/components/layout/ScreenLayout";
import CustomButton from "@/components/ui/CustomButton";
import CustomTextInput from "@/components/ui/CustomTextInput";
import { T } from "@/components/ui/T";
import { useAuthStore } from "@/stores/authStore";
import {
  loginDefaultValues,
  LoginFormData,
  loginSchema,
} from "@/validationSchemas/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultValues,
  });

  const onSubmit = (data: LoginFormData) => {
    useAuthStore.getState().setUser(data);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenLayout style={styles.screenContainer}>
        <View style={styles.container}>
          <T type="title">LOGIN</T>
          <CustomTextInput
            control={control}
            name="email"
            placeholder="Email"
            error={errors.email?.message}
          />
          <CustomTextInput
            control={control}
            name="password"
            placeholder="Password"
            secureTextEntry={true}
            error={errors.password?.message}
          />
          <CustomButton
            variant="primary"
            title="Login"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ScreenLayout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  screenContainer: {
    justifyContent: "center",
  },
});
