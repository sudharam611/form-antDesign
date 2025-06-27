import styles from "../FormItem.module.css";
const renderRequiredIndicator = ({ isRequired, requiredMark, prefix }) => {
  if (prefix) return null;

  if (
    requiredMark?.type === "customize" &&
    typeof requiredMark.render === "function"
  ) {
    return requiredMark.render(isRequired);
  }

  if (!isRequired) {
    if (requiredMark?.type === "optional" || requiredMark === "optional") {
      return <span className={styles["optional-text"]}>(optional)</span>;
    }
    return null;
  }

  if (requiredMark?.type === "hidden" || requiredMark === "hidden") {
    return null;
  }

  return <span className={styles["required-asterisk"]}>*</span>;
};

export default renderRequiredIndicator;
