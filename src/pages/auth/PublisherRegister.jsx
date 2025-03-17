import { useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import { Link, Navigate, useNavigate } from "react-router";
import AuthImagePattern from "../../components/AuthImagePattern";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import { toast } from "react-toastify";

export default function PublisherRegister() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { isLoggingIn, user, registerPublisher } = useAuthStore();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    referralCode: "",
    paymentInfo: "",
  });
  console.log("isLoggingIn", isLoggingIn);

  if (user) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("formData in register page", formData);
      const res = await registerPublisher(formData);
      console.log("res in login page", res);
      if (res) {
        toast.success("Register successful");
        navigate("/login");
      } else {
        console.error("Register failed:", res.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      {/* Left Side - Image/Pattern */}
      <AuthImagePattern
        title={"Publisher Register"}
        subtitle={
          "Register to continue your conversations and catch up with your messages."
        }
      />

      {/* Right Side - Form */}
      <div className="flex flex-col mt-5 justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
              transition-colors"
              >
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Publisher</h1>
              {/* <p className="text-base-content/60">Register your account</p> */}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Username</span>
              </label>
              <input
                type="text"
                className={`input input-bordered w-full pl-10`}
                placeholder="Username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>
            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>
            {/* Confirm Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Confirm Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10 ${
                    formData.confirmPassword &&
                    formData.password !== formData.confirmPassword
                      ? "input-error"
                      : ""
                  }`}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" />
                  )}
                </button>
              </div>
              {formData.confirmPassword &&
                formData.password !== formData.confirmPassword && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      Mật khẩu không khớp
                    </span>
                  </label>
                )}
            </div>
            {/* Phone Number */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Phone Number</span>
              </label>
              <input
                type="text"
                className={`input input-bordered w-full pl-10`}
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
              />
            </div>
            {/* Referral Code */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Referral Code</span>
              </label>
              <input
                type="text"
                className={`input input-bordered w-full pl-10`}
                placeholder="Referral Code"
                value={formData.referralCode}
                onChange={(e) =>
                  setFormData({ ...formData, referralCode: e.target.value })
                }
              />
            </div>
            {/* Payment Info */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Payment Info</span>
              </label>
              <input
                type="text"
                className={`input input-bordered w-full pl-10`}
                placeholder="Payment Info"
                value={formData.paymentInfo}
                onChange={(e) =>
                  setFormData({ ...formData, paymentInfo: e.target.value })
                }
              />
            </div>

            <button type="submit" className="btn btn-primary w-full">
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Register"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60 ">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary font-bold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
