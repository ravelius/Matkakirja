using System;

namespace Matkakirja
{
    /// <summary>
    /// KAUPUNKIOPAS KARTTAELEMENTTINÄ (omistaja 7.10.2026 klo 08.3x Päätoimittajan kautta): kiinnitetty kuumailmapallo jokaisen
    /// sallitun 3D-kaupungin keskipisteessä (LS2:n sallitut-lista palvelimelta), ajattelijoiden kipsipäiden mekanismilla
    /// (ErikoisnostoMitat). Puhdas geometria (ei UnityEngineä), testit Kartta-testit/Testit/KaupunkiPallotTestit.cs; käyttö
    /// UI/KaupunkiPallot.cs.
    ///
    ///  - NÄKYVYYS ZOOMIN MUKAAN: pallot näkyvät, kun kameran korkeus on enintään NakyyAstiM (maan tasolta lähemmäs; kartan aloitusnäkymä ~1 500 km, simu 7.10.), ja
    ///    häivyttyvät HaipyyAlkaenM:stä alkaen; koko Euroopan näkymä (~6 500 km) ei täyty palloista (niukkuus).
    ///  - KOKO ZOOMIN MUKAAN: ruudulla vakiokokoinen kuten päät, mutta kasvaa lähestyessä logaritmisesti KokoKaukaPt → KokoLahiPt
    ///    (LahiM:stä lähemmäs täysi koko). Kuoren osuus kuvasta on ~1/3 (köysi ja tuulikallistus), joten 84 pt → kuori ~28 pt (Päätoimittaja 7.10.: 1,5–2 × 44090c1a:n 17 × 37 pt).
    ///  - PAIKKA: pallon kuvan alareunan keskikohta (kori ja köysi) on kaupungin keskipisteessä; piilossa, kun piste on yli pallon
    ///    verran ruudun ulkopuolella. Ruudun koordinaatit, y alas.
    /// </summary>
    public static class KaupunkiPalloMitat
    {
        public const double NakyyAstiM = 2_600_000, HaipyyAlkaenM = 2_000_000, LahiM = 60_000;
        public const float KokoKaukaPt = 84f, KokoLahiPt = 120f;
        /// <summary>Kuvan pystysuunnassa köyden pää (kiinnityspiste) on näin korkealla kuvan alareunasta (osuus koosta).</summary>
        public const float AnkkuriOsuus = 0.03f;

        /// <summary>Peitto 0…1 kameran korkeudesta (m): 1 HaipyyAlkaenM:iin asti, lineaarisesti 0:aan NakyyAstiM:ssä.</summary>
        public static float Peitto(double korkeusM)
        {
            if (double.IsNaN(korkeusM) || korkeusM >= NakyyAstiM) return 0f;
            if (korkeusM <= HaipyyAlkaenM) return 1f;
            return (float)((NakyyAstiM - korkeusM) / (NakyyAstiM - HaipyyAlkaenM));
        }

        /// <summary>Pallon koko ruutupisteinä kameran korkeudesta: log-interpolointi NakyyAstiM (kauka) → LahiM (lähi).</summary>
        public static float Koko(double korkeusM)
        {
            if (double.IsNaN(korkeusM) || korkeusM >= NakyyAstiM) return KokoKaukaPt;
            if (korkeusM <= LahiM) return KokoLahiPt;
            double s = (Math.Log(NakyyAstiM) - Math.Log(korkeusM)) / (Math.Log(NakyyAstiM) - Math.Log(LahiM));
            return (float)(KokoKaukaPt + (KokoLahiPt - KokoKaukaPt) * s);
        }

        /// <summary>Kortin vaikutusalue: kortti, jonka keskipiste on alle tämän (× pallon koko) päässä pisteestä, ratkaisee puolen.</summary>
        public const float KorttiLahella = 1.5f;

        /// <summary>
        /// PUOLI KORTISTA POISPÄIN (omistaja 7.10. 12.4x: "Kreikassa kuumailmapallo jää Ateenan nostokortin taakse … voisi olla
        /// toisella puolella"): pallo kallistuu oletuksena vasemmalle (pelaajan kaupungin kutsukortti on useimmiten oikealla).
        /// Jos kortti on lähellä pistettä ja sen keskipiste on pisteen vasemmalla puolella, pallo kallistuu oikealle. null = ei
        /// päätöstä (kortti kaukana tai piilossa): pidä aiempi puoli.
        /// </summary>
        public static bool? Oikealle(float pisteX, float pisteY, float korttiKeskiX, float korttiKeskiY, float koko)
        {
            if (float.IsNaN(korttiKeskiX) || float.IsNaN(pisteX)) return null;
            float dx = korttiKeskiX - pisteX, dy = korttiKeskiY - pisteY;
            if (dx * dx + dy * dy > (KorttiLahella * koko) * (KorttiLahella * koko)) return null;
            return dx < 0f;
        }

        /// <summary>Napin vasen yläkulma (x, y alas) pisteestä ja koosta; false = yli pallon verran ruudun ulkopuolella.</summary>
        public static bool Ruutupaikka(float pisteX, float pisteY, float koko, float leveys, float korkeus, out float x, out float y)
        {
            x = pisteX - koko / 2f;
            y = pisteY - koko * (1f - AnkkuriOsuus);
            if (float.IsNaN(x) || float.IsNaN(y)) return false;
            return !(pisteX < -koko || pisteY < -koko || pisteX > leveys + koko || pisteY > korkeus + koko);
        }
    }
}
