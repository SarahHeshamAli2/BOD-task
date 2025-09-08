import { useForm } from "react-hook-form";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";
import axiosInstance from "../../services/api";
import { useNavigate } from "react-router-dom";
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from "../../services/validations";
import toast from "react-hot-toast";

export default function LoginForm() {

  const navigate = useNavigate();

  const {
    register,
    formState: { errors,isSubmitting },
    handleSubmit,
  } = useForm();

  const onSubmitHandler = async (values) => {
    try {
      const response = await axiosInstance.post("/auth/login", values);
      localStorage.setItem("token", response?.data?.accessToken);
            toast.success('welcome back','success')

      navigate("/dashboard",{
        replace:true
      });
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || 'something went wrong')
    } 
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sign in
        </h1>
        <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-5">
          <Input
            {...register("email", EMAIL_VALIDATION)}
            error={errors.email && errors.email.message}
            label="Email"
            type="email"
            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-200"
          />

          <Input
            {...register("password", PASSWORD_VALIDATION)}
            label="Password"
            type="password"
            error={errors.password && errors.password.message}
            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-200"
          />

          <Button
            disabled={isSubmitting}
            variant="primary"
            size="md"
            className={`w-full  py-3 text-white font-semibold rounded-lg transition-transform ${
              isSubmitting ? "bg-indigo-300 cursor-not-allowed" : "hover:scale-105"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Sign In"}
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-500">
          
          <span
            className="text-indigo-500 font-medium hover:underline cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            Continue as a guest
          </span>
        </p>
      </div>
    </main>
  );
}
