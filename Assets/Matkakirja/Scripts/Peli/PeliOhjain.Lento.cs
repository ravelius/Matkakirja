// PELIOHJAIN: LENNON VAIHEET (lennon esitys, omistajan linjaus 23.9.2026; Lento.cs).
using System;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed partial class PeliOhjain
    {
        /// <summary>
        /// Lennon vaihe vaihtui (Natiiviseppä: koneen koreografia ja savujana; Natiivi-UI: äänet):
        /// Nousu lähdössä (suunnitelma mukana), Matka, Lasku ja Perilla saapuessa.
        /// </summary>
        public event Action<LennonVaihe, Lentosuunnitelma> LennonVaiheMuuttui;

        /// <summary>Käynnissä oleva lento tai null.</summary>
        public Lentosuunnitelma Lento { get; private set; }

        LennonVaihe lennonVaihe;
        float lennonAlku;

        void IlmoitaVaihe(LennonVaihe v)
        {
            lennonVaihe = v;
            try { LennonVaiheMuuttui?.Invoke(v, Lento); } catch (Exception e) { Debug.LogException(e); }
        }

        /// <summary>Lento lähtee nyt (kone irtoaa maasta): Nousu.</summary>
        void AloitaLento(Lentosuunnitelma s)
        {
            Lento = s;
            lennonAlku = Time.unscaledTime;
            IlmoitaVaihe(LennonVaihe.Nousu);
        }

        /// <summary>Ruudun välein: Matka ja Lasku ajallaan.</summary>
        void PaivitaLento()
        {
            if (Lento == null) return;
            var v = Lento.VaiheHetkella(Time.unscaledTime - lennonAlku);
            if (v == LennonVaihe.Perilla) v = LennonVaihe.Lasku;   // Perilla vasta todellisesta saapumisesta
            if (v != lennonVaihe) IlmoitaVaihe(v);
        }

        /// <summary>Saapuminen (Perilla): Perilla ja lento pois.</summary>
        void PaataLento()
        {
            if (Lento == null) return;
            IlmoitaVaihe(LennonVaihe.Perilla);
            Lento = null;
        }
    }
}
