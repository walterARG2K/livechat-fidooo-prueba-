export function getRandomTailwindColor() {
  const tailwindTextColors = [
    "text-red-500",
    "text-green-500",
    "text-yellow-500",
    "text-orange-500",
    "text-blue-500",
    "text-indigo-500",
    "text-purple-500",
    "text-pink-500",
    "text-teal-500",
    "text-cyan-500",
    "text-red-600",
    "text-green-600",
    "text-yellow-600",
    "text-orange-600",
    "text-blue-600",
    "text-indigo-600",
    "text-purple-600",
    "text-pink-600",
    "text-teal-600",
    "text-cyan-600",
    "text-gray-400",
    "text-red-400",
    "text-green-400",
    "text-yellow-400",
    "text-orange-400",
    "text-blue-400",
    "text-indigo-400",
    "text-purple-400",
    "text-pink-400",
    "text-teal-400",
    "text-cyan-400",
    "text-gray-300",
    "text-red-300",
    "text-green-300",
    "text-yellow-300",
    "text-orange-300",
    "text-blue-300",
    "text-indigo-300",
    "text-purple-300",
    "text-pink-300",
    "text-teal-300",
    "text-cyan-300",
  ];

  // Ejemplo de uso:
  const randomIndex = Math.floor(Math.random() * tailwindTextColors.length);
  const randomColor = tailwindTextColors[randomIndex];
  return randomColor;
}