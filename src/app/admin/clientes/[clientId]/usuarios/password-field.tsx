"use client";

import { useState } from "react";

export function PasswordField() {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");

  function generate() {
    const chars = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789@#!";
    let pwd = "";
    for (let i = 0; i < 10; i++) {
      pwd += chars[Math.floor(Math.random() * chars.length)];
    }
    setValue(pwd);
    setShow(true);
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/50">
        Senha de acesso *
      </label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            name="password"
            type={show ? "text" : "password"}
            required
            minLength={8}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Mín. 8 caracteres"
            className="w-full border-2 border-[#1A1A1A]/20 rounded-xl px-3 py-2.5 pr-10 text-sm font-medium text-[#1A1A1A] placeholder:text-[#1A1A1A]/25 focus:border-[#FF6100] outline-none transition-colors"
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/30 hover:text-[#1A1A1A]/60 transition-colors text-xs"
          >
            {show ? "🙈" : "👁"}
          </button>
        </div>
        <button
          type="button"
          onClick={generate}
          className="shrink-0 px-3 py-2.5 border-2 border-[#1A1A1A]/20 rounded-xl text-[11px] font-black uppercase tracking-wider text-[#1A1A1A]/50 hover:border-[#FF6100] hover:text-[#FF6100] transition-colors whitespace-nowrap"
        >
          Gerar
        </button>
      </div>
      <p className="text-[10px] text-[#1A1A1A]/30 font-medium">
        Defina e envie as credenciais para o cliente via WhatsApp.
      </p>
    </div>
  );
}
