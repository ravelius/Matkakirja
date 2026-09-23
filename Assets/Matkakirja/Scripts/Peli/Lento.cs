// LENNON ESITYS (omistajan linjaus 23.9.2026, Fable): lennolla on vaiheet nousu, matka ja lasku
// sekä savujana. Pelilogiikka antaa lennon suunnitelman (reitin pisteet isoympyrällä, arvioitu
// kesto ja vaiheiden kestot) ja kertoo vaiheen vaihtumisen (PeliOhjain.LennonVaiheMuuttui);
// koreografian (kamera, kone, savujana) tekee Natiiviseppä. Pelitila ei riipu esityksestä:
// matkan tulos (MatkanTulos, Pelitila) on sama, piirrettiinpä savujana tai ei.
// Ei UnityEngineä: testattavissa (Peli-testit/Testit/LentoTestit.cs).
using System;
using System.Collections.Generic;

namespace Matkakirja.Natiivi
{
    public enum LennonVaihe { Nousu, Matka, Lasku, Perilla }

    /// <summary>Yhden lennon suunnitelma esitystä varten.</summary>
    public sealed class Lentosuunnitelma
    {
        /// <summary>Lähtö- ja kohdekaupunki (lähtö null, jos lento alkaa reitin varrelta).</summary>
        public string Lahto, Kohde;
        /// <summary>Reitti isoympyrää pitkin (ensimmäinen = lähtö, viimeinen = kohde).</summary>
        public List<(double Lat, double Lon)> Pisteet = new List<(double, double)>();
        /// <summary>Koko lennon kesto ja vaiheiden kestot sekunteina (Nousu + Matka + Lasku = Kesto).</summary>
        public float Kesto, Nousu, Matka, Lasku;
        /// <summary>Aloituslento (Lontoosta valittuun kaupunkiin intro-luennan ajan).</summary>
        public bool Aloitus;

        /// <summary>Nousun ja laskun osuus kestosta ja katto sekunteina.</summary>
        public const float VaiheOsuus = 0.2f, VaiheKattoS = 2.5f;
        /// <summary>Reittipisteiden määrä (savujana, koneen kaari).</summary>
        public const int PisteMaara = 48;

        /// <summary>
        /// Suunnitelma lähtö- ja kohdepisteestä. Nousu ja lasku ovat kumpikin 20 % kestosta, enintään
        /// 2,5 s; loppu on matkaa. minimiKesto sitoo keston alarajan (aloituslento: intro-luennan pituus).
        /// </summary>
        public static Lentosuunnitelma Laske(string lahto, string kohde, (double Lat, double Lon) a, (double Lat, double Lon) b,
            float kesto, float minimiKesto = 0f, bool aloitus = false)
        {
            kesto = Math.Max(Math.Max(kesto, minimiKesto), 0.1f);
            float vaihe = Math.Min(kesto * VaiheOsuus, VaiheKattoS);
            var s = new Lentosuunnitelma
            {
                Lahto = lahto, Kohde = kohde, Kesto = kesto, Nousu = vaihe, Lasku = vaihe, Matka = kesto - 2 * vaihe, Aloitus = aloitus,
            };
            for (int i = 0; i < PisteMaara; i++)
                s.Pisteet.Add(PeliApu.Isoympyra(a.Lat, a.Lon, b.Lat, b.Lon, i / (double)(PisteMaara - 1)));
            return s;
        }

        /// <summary>Vaihe hetkellä t sekuntia lähdöstä.</summary>
        public LennonVaihe VaiheHetkella(float t) =>
            t < Nousu ? LennonVaihe.Nousu : t < Nousu + Matka ? LennonVaihe.Matka : t < Kesto ? LennonVaihe.Lasku : LennonVaihe.Perilla;
    }
}
