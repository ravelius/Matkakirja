// KAUPUNKI-INTRON KELLO (Pariisin nykyintro, docs/kohtaukset/pallokierros/pariisi-nykyintro.md kohta 4; Pelikoodari 9.10.2026).
// Aanisoitin ajaa tätä ruuduittain: kello alkaa, kun jakson nopea todella soi (t0 = kappaleen todellinen alku) tai heti, jos
// musiikki ei voi soida (hiljainen kello: musiikki tai äänimaisema pois, PT 9.10.), jolloin intro saa silti KaupunkiIntroAlkoi-
// tapahtuman. Katko katkoS:ssä ja hidas hidasS:ssä; ohitus siirtää kellon katkoon tässä ruudussa. Puhdas logiikka (ei UnityEnginea).
using System;

namespace Matkakirja.Peli
{
    public sealed class KaupunkiIntroKello
    {
        public string Kaupunki { get; private set; }
        public bool Hiljainen { get; private set; }
        float katkoS, haivytysS, hidasS, t0;
        bool alkanut, katkottu, hidasAlkoi, ohita;

        /// <summary>Käynnissä: intro on pyydetty eikä hidas ole vielä alkanut.</summary>
        public bool Kaynnissa => Kaupunki != null;

        public void Aloita(string kaupunki, float katkoS, float haivytysS, float hidasS, bool hiljainen)
        {
            Kaupunki = kaupunki; this.katkoS = katkoS; this.haivytysS = haivytysS; this.hidasS = hidasS; Hiljainen = hiljainen;
            t0 = 0f; alkanut = katkottu = hidasAlkoi = ohita = false;
        }

        /// <summary>Ohitus (kohtaus 7): katko seuraavassa päivityksessä, hidas (hidasS − katkoS) myöhemmin. false = ei käynnissä.</summary>
        public bool Ohita()
        {
            if (Kaupunki == null) return false;
            ohita = true;
            return true;
        }

        /// <summary>
        /// Yksi ruutu. nopeanKohta = jakson nopean kappaleen kohta sekunteina, jos se soi, muuten null. alkoi(kaupunki, kohta)
        /// laukeaa kerran, katko(haivytysMs) ja hidas() kerran kukin; hiljaisessa kellossa katko ja hidas eivät soita mitään.
        /// </summary>
        public void Paivita(float nyt, float? nopeanKohta, Action<string, float> alkoi, Action<int> katko, Action hidas)
        {
            if (Kaupunki == null) return;
            if (ohita)
            {
                ohita = false;
                if (!katkottu) { t0 = nyt - katkoS; alkanut = true; } // jo tehty katko ei toistu, hidas tulee ajallaan
            }
            if (!alkanut)
            {
                float? kohta = Hiljainen ? 0f : nopeanKohta;
                if (kohta == null) return;
                t0 = nyt - kohta.Value; alkanut = true;
                alkoi?.Invoke(Kaupunki, kohta.Value);
            }
            float s = nyt - t0;
            if (!katkottu && s >= katkoS) { katkottu = true; if (!Hiljainen) katko?.Invoke((int)(haivytysS * 1000)); }
            if (!hidasAlkoi && s >= hidasS) { hidasAlkoi = true; if (!Hiljainen) hidas?.Invoke(); Kaupunki = null; }
        }
    }
}
