// PELIOHJAIN: LENNON VAIHEET (lennon esitys, omistajan linjaus 23.9.2026; Lento.cs).
// Kello: kun Nappula lennättää konetta, sen VaiheVaihtui (Matkakirja.LennonVaihe) ajaa vaiheet, jotta
// ääni ja kuva kulkevat samalla kellolla; oma Lentosuunnitelma-ajastin on varareitti ilman nappulaa.
// Lisäksi pelin vuorokaudenaika asetetaan nappulan aurinkoon (Aurinko.paikallinenTunti).
using System;
using Matkakirja.Peli;
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
        /// <summary>Nappula on kertonut tämän lennon vaiheen: sen kello ajaa, oma ajastin odottaa.</summary>
        bool nappulanKello;
        Nappula tilattuNappula;

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
            nappulanKello = false;
            TilaaNappulanVaiheet();
            IlmoitaVaihe(LennonVaihe.Nousu);
        }

        /// <summary>Ruudun välein: Matka ja Lasku ajallaan.</summary>
        void PaivitaLento()
        {
            PaivitaAurinko();
            if (Lento == null || nappulanKello) return;
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
            nappulanKello = false;
        }

        void TilaaNappulanVaiheet()
        {
            var n = Nappula;
            if (n == tilattuNappula) return;
            if (tilattuNappula != null) tilattuNappula.VaiheVaihtui -= NappulanVaihe;
            tilattuNappula = n;
            if (n != null) n.VaiheVaihtui += NappulanVaihe;
        }

        /// <summary>Nappulan koreografian vaihe (Ei/Nousu/Matka/Lasku) → lennon vaihe. Perilla tulee saapumisesta.</summary>
        void NappulanVaihe(global::Matkakirja.LennonVaihe v)
        {
            if (Lento == null) return;
            LennonVaihe oma;
            switch (v)
            {
                case global::Matkakirja.LennonVaihe.Nousu: oma = LennonVaihe.Nousu; break;
                case global::Matkakirja.LennonVaihe.Matka: oma = LennonVaihe.Matka; break;
                case global::Matkakirja.LennonVaihe.Lasku: oma = LennonVaihe.Lasku; break;
                default: return;
            }
            nappulanKello = true;
            if (oma != lennonVaihe) IlmoitaVaihe(oma);
        }

        /// <summary>
        /// Pelin vuorokaudenaika (web timeOfDayName) nappulan aurinkoon paikallisena aurinkoaikana:
        /// aamu 9, keskipäivä 13, ilta 18. Yö = iltavalo 18 (Fable 23.9.2026: ei pimeää karttaa, pergamentti
        /// pysyy luettavana; Natiiviseppä voi sävyttää yön sinertävämmäksi samalla valon kulmalla).
        /// </summary>
        void PaivitaAurinko()
        {
            var au = Nappula != null ? Nappula.aurinko : null;
            if (au == null || matka == null) return;
            au.paikallinenTunti = AurinkoTunti(matka.Tila.Vuorokaudenaika());
        }

        internal static double AurinkoTunti(Vuorokaudenaika aika)
        {
            switch (aika)
            {
                case Vuorokaudenaika.Aamu: return 9;
                case Vuorokaudenaika.Keskipaiva: return 13;
                default: return 18;
            }
        }
    }
}
