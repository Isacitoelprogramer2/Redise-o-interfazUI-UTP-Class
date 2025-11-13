import { GraduationCap } from 'lucide-react';

interface Curso {
    nombre: string;
    seccion: string;
    profesor: string;
    modalidad: string;
    progreso: number;
}

export const CursoCard: React.FC<{ curso: Curso }> = ({ curso }) => {
  const progressWidth = (curso.progreso / 100) * 181;

  return (
  <div className="bg-[#191917] border border-transparent hover:border-amber-50/35 w-full h-fit gap-3 flex flex-col items-start justify-between px-6 py-[18px] rounded-[10px]">
      {/* Course Info */}
      <div className="flex flex-col gap-[9px] items-start w-full">
        <p className="font-semibold w-full text-[16px] text-white h-13 line-clamp-2">
          {curso.nombre}
        </p>
        {/* Seccion y modalidad */} 
        <div className="flex">
        <p className="font-normal text-[#a1a1a1] text-[12px]">
          {curso.modalidad} 
        </p>
        <p className="font-normal text-[#a1a1a1] text-[12px]">
          - {curso.seccion}
        </p>
      </div>

      </div>

      {/* Teacher Info */}
      <div className="flex gap-[5px] items-center w-full">
  <div className="bg-[#ff4545] rounded-full p-0.5 flex items-center justify-center">
          <GraduationCap className="w-[18px] h-[18px] text-white" />
        </div>
        <p className="font-normal text-[12px] text-white whitespace-nowrap">
          {curso.profesor}
        </p>
      </div>

      {/* Progress Bar */}
  <div className="flex gap-2.5 items-center w-[218px]">
        <div className="relative w-[181px] h-[9px] bg-[#444444] rounded-full">
          <div
            className="absolute top-0 left-0 h-full bg-[#ff4545] rounded-full"
            style={{ width: `${progressWidth}px` }}
          />
        </div>
        <div className="font-semibold text-[12px] text-white w-[26px] text-center">
          {curso.progreso}%
        </div>
      </div>
    </div>
  );
}