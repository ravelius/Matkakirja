// MINIPULUN KYSYMYKSET (Natiivi-UI 16.9.2026; Pelikoodari 1.10.2026): astronautin valokuvanäkymän minipulu avaa
// PULUN YHTEISEN CHATIN (PuluChat.AvaaLinssissa) eikä enää omaa korttia.
//
// Omistaja 30.9.2026 klo 23.5x (Bahaman matalikot, vihreä paneeli ilman kaiutinta): "pululla saisi olla myös tässä
// striimiluenta. tee pululle aina samat napit kaikkialle peliin". Sama PuluChat kuin kartalla: puhekupla, kynä, ≡,
// kaiutin (striimiluenta Pulun äänellä), näppäimistö ja mikki samassa järjestyksessä; linssissä vain teema vaihtuu
// (mk-chat--linssi: tumma lasi, vihreä reuna kuten entinen kortti) ja chat nousee minipulun yläpuolelle oikeaan
// alakulmaan. Kohteen valmiit kysymykset ovat sirunappeja, jotka kulkevat mallille kuten vapaa kysymys (web
// vastaaKysymykseen, Raamattu ASTRONAUTIN KAMERA LISAYS 14; esikirjoitetut vastaukset poistettu löydöksessä 35).
// Luokka säilyy sovittimena, jotta Kuvanakyma ja testikomennot pysyvät ennallaan.
using System.Collections.Generic;
using Matkakirja.Linssit.Astronautti;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class MinipulunKortti
    {
        static readonly IReadOnlyList<string> Tyhja = new List<string>();
        readonly VisualElement kulma;

        static PuluChat Chat => UiNakymat.Olemassa ? UiNakymat.Hae().Chat : null;

        /// <summary>Kysymys matkalla (Kuvanakyma pysäyttää minipulun leijunnan).</summary>
        public bool Kesken => Chat?.Kysyy ?? false;
        public bool Auki => Chat != null && Chat.Auki && Chat.Linssissa;

        /// <param name="kulma">minipulun sarake (web .satelliitti-pulukulma): chat asettuu sen yläpuolelle</param>
        public MinipulunKortti(VisualElement kulma) => this.kulma = kulma;

        public void Vaihda(Havaintokohde k) { if (Auki) Sulje(); else Avaa(k); }

        /// <summary>Chat auki kohteen kysymyksillä; kohteen vaihtuessa sirut vaihtuvat (keskustelu jatkuu).</summary>
        public void Avaa(Havaintokohde k) => Chat?.AvaaLinssissa(() => kulma.worldBound, k?.Tunnus, k?.Kysymykset ?? Tyhja);

        public void Sulje() { if (Auki) Chat.Sulje(); }

        /// <summary>Entinen kortin mitoitus; chat mitoittaa itsensä minipulun kohdalle (PuluChat.AsetteleLinssiin).</summary>
        public void Mitoita(float leveys, float korkeus) { }
    }
}
