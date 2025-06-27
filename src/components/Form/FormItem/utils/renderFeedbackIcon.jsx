import styles from "../FormItem.module.css";

const renderFeedbackIcon = (status, hasFeedback) => {
  if (!hasFeedback || !status) return null;

  const iconMap = {
    success: "✔️",
    error: "❌",
    warning: "⚠️",
    validating: "🔄",
  };

  return (
    <span className={styles["feedback-icon"]}>{iconMap[status] || null}</span>
  );
};

export default renderFeedbackIcon;
