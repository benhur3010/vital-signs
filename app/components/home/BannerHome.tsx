export default function BannerHome() {
  return (
    <div className=" bg-span relative min-h-200 bg-[url('/banner-home.png')] bg-cover bg-no-repeat">
      <div className="absolute space-y-3 -translate-y-1/2 top-[47%] py-6 rounded-xl px-4 left-[66%] z-10 bg-[rgba(255,255,255,0.22)] border border-light shadow-[0_3px_6px_#00000029] backdrop-blur-[17px] backdrop-brightness-[1.24]">
        <div className="flex gap-3">
          <span className="font-bold text-primary">SYS</span> <span>140</span>
        </div>
        <div className="flex gap-3">
          <span className="font-bold text-primary">DIA</span> <span>82</span>
        </div>
        <div className="flex gap-3">
          <span>SYS</span> <span>100bpm</span>
        </div>
      </div>
    </div>
  );
}
