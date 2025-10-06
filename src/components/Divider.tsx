export default function Divider() {
  return (
    <div className="flex items-center my-6">
      <div className="flex-1 border-t border-gray-700"></div>
      <span className="px-4 text-gray-400 text-sm">or</span>
      <div className="flex-1 border-t border-gray-700"></div>
    </div>
  );
}