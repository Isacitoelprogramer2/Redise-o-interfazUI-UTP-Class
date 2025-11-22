import Image from "next/image";

export const LoginHeader = () => {
  return (
    <div className="flex flex-col items-center justify-center mb-10 text-center">
      <div className="flex items-center mb-6">
        <Image src="/new-logo.c86d23e3_1.svg" alt="UTP Logo" width={250} height={150} />
      </div>
      <h1 className="text-white text-xl md:text-2xl font-medium mb-2">
        Una Nueva experiencia digital de aprendizaje
      </h1>
      <p className="text-gray-400 text-lg">
        Cercana, dinámica y flexible
      </p>
    </div>
  );
};
