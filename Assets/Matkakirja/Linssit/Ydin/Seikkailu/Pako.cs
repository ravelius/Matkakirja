// HISTORIAMOOTTORI M-OSA HUONE 10: PAKON KULKU (Linssiseppä 2, 8.10.2026; pelattavuusmalli-olavinlinna.md 8.2 huone 10; Unity SeikkailuPako).
// Vaiheet: arkku auki → Kello (hälytyskello, kaikki valppaiksi) → Kiinnitä köysi kramppiin → Lasku (köysilasku, sovittimen ote-kiipeily)
// → Kallio (ensimmäinen persoona; 20 s kellosta rannan soihtuvartijat esiin, 45 s → myöhästyi) → K4 (sukellus 4 s) → Uinti (12 s, soutaja
// huutaa 1,5 s ennen) → Köysi (vartija pitää kiinnitysköydestä: Katkaise; armo 20 s, soutaja irrottaa itse) → K5 (12 s) → Valmis.
// Myöhästyminen palauttaa Kello-vaiheeseen (kiinni → T10a köysilaskun alku); uusi kiinnitys aloittaa 45 s:n ikkunan alusta (ei jumia:
// muuten kello jatkui ja jokainen uusi yritys myöhästyi heti kalliolle päästessä). Kertalaukaisut sovittimelle (nollaa itse).
namespace Matkakirja.Linssit.Seikkailu
{
    public enum PakoVaihe { Odottaa, Kello, Lasku, Kallio, K4, Uinti, Koysi, K5, Valmis }

    public sealed class Pako
    {
        public const double RantaEsiinS = 20, MyohassaS = 45, K4S = 4, UintiS = 12, KoysiS = 10, K5S = 12, SoutajaEnnenS = 1.5;

        public PakoVaihe Vaihe { get; private set; } = PakoVaihe.Odottaa;
        /// <summary>Aika yrityksen alusta (kello tai uusi kiinnitys myöhästymisen jälkeen); −1 ennen kelloa.</summary>
        public double KelloS { get; private set; } = -1;
        /// <summary>Aika nykyisen ohjatun vaiheen (K4, Uinti, Köysi, K5) alusta.</summary>
        public double VaiheS { get; private set; }
        public bool Myohastynyt { get; private set; }
        /// <summary>Kertalaukaisut: kello soi, rannan vartijat esiin, myöhästyi, uusi yritys (rannan vartijat piiloon), sukellus, uinti alkoi,
        /// soutaja huutaa, veneessä (Katkaise tarjolle), köysi katkaistu, valmis.</summary>
        public bool KelloSoi, RantaEsiin, Myohastyi, UusiYritys, Sukelsi, UintiAlkoi, SoutajaHuutaa, Veneessa, Katkaistu, Valmistui;
        bool rantaEsiin;

        public void ArkkuAuki() { if (Vaihe != PakoVaihe.Odottaa) return; Vaihe = PakoVaihe.Kello; KelloS = 0; KelloSoi = true; }

        /// <summary>Köysi kramppiin (krampin luona Kello-vaiheessa): köysilasku alkaa.</summary>
        public bool Kiinnita()
        {
            if (Vaihe != PakoVaihe.Kello) return false;
            if (Myohastynyt) { Myohastynyt = false; KelloS = 0; rantaEsiin = false; UusiYritys = true; }
            Vaihe = PakoVaihe.Lasku; return true;
        }

        public void LaskuValmis() { if (Vaihe == PakoVaihe.Lasku) Vaihe = PakoVaihe.Kallio; }

        public bool Katkaise() { if (Vaihe != PakoVaihe.Koysi) return false; Vaihe = PakoVaihe.K5; VaiheS = 0; Katkaistu = true; return true; }

        void Siirry(PakoVaihe v) { Vaihe = v; VaiheS = 0; }

        /// <summary>Kehys; k4Lahella = pelaaja kalliolla K4-kameran luona (sukellus).</summary>
        public void Paivita(double dt, bool k4Lahella)
        {
            if (KelloS >= 0) KelloS += dt;
            VaiheS += dt;
            switch (Vaihe)
            {
                case PakoVaihe.Kallio:
                    if (KelloS > RantaEsiinS && !rantaEsiin) { rantaEsiin = true; RantaEsiin = true; }
                    if (KelloS > MyohassaS) { Myohastyi = true; Myohastynyt = true; Vaihe = PakoVaihe.Kello; return; }
                    if (k4Lahella) { Siirry(PakoVaihe.K4); Sukelsi = true; }
                    break;
                case PakoVaihe.K4: if (VaiheS >= K4S) { Siirry(PakoVaihe.Uinti); UintiAlkoi = true; } break;
                case PakoVaihe.Uinti:
                    if (VaiheS >= UintiS - SoutajaEnnenS && VaiheS - dt < UintiS - SoutajaEnnenS) SoutajaHuutaa = true;
                    if (VaiheS >= UintiS) { Siirry(PakoVaihe.Koysi); Veneessa = true; }
                    break;
                case PakoVaihe.Koysi: if (VaiheS > KoysiS * 2) Katkaise(); break;   // armo: soutaja irrottaa itse
                case PakoVaihe.K5: if (VaiheS >= K5S) { Vaihe = PakoVaihe.Valmis; Valmistui = true; } break;
            }
        }
    }
}
