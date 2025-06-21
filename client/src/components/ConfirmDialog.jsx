import { motion, AnimatePresence } from "framer-motion";
console.log(motion);
const ConfirmDialog = ({
  title = "Are you sure?",
  message = "This action cannot be undone.",
  onConfirm,
  onCancel,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-main w-full max-w-md rounded-2xl shadow-2xl p-6 text-center border border-gray-200"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
          <p className="text-sm text-gray-600 mb-6">{message}</p>
          <div className="flex justify-center gap-4">
            <button
              className="cursor-pointer px-4 py-2 text-sm rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800 transition duration-200"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className="cursor-pointer px-4 py-2 text-sm rounded-md bg-blue-500 hover:bg-blue-600 text-white transition duration-200"
              onClick={onConfirm}
            >
              Yes, Delete
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ConfirmDialog;
