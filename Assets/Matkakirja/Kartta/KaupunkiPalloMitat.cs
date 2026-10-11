using System;
using System.Collections.Generic;

namespace Matkakirja
{
    /// <summary>
    /// KAUPUNKIOPAS KARTTAELEMENTTINÄ (omistaja 7.10.2026 klo 08.3x Päätoimittajan kautta): kiinnitetty kuumailmapallo jokaisen
    /// sallitun 3D-kaupungin keskipisteessä (LS2:n sallitut-lista palvelimelta), ajattelijoiden kipsipäiden mekanismilla
    /// (ErikoisnostoMitat). Puhdas geometria (ei UnityEngineä), testit Kartta-testit/Testit/KaupunkiPallotTestit.cs; käyttö
    /// UI/KaupunkiPallot.cs.
    ///
    ///  - NÄKYVYYS: vain pelaajan nykyisen maan pallot kaikilla zoomeilla (omistaja 7.10. 12.5x; UI/KaupunkiPallot.cs, kuten
    ///    kipsipäiden ErikoisnostoMitat.OmaMaa). NakyyAstiM on enää koon kaukaraja. Kehittäjän maailmanäkymässä (huntu pois,
    ///    Paavalikko.MaailmaNakyma) kaikkien maiden pallot (omistaja TF 162, 7.10. 21.5x): <see cref="Nakyy"/>.
    ///    Maailmanäkymässä muiden kuin pelaajan maan pallot ovat paljon pienempiä (omistaja 10.10.2026 klo 11.5x Päätoimittajan
    ///    kautta: "näytä kehittäjätilassa muiden kuin kohdemaan ilmapallot paljon pienempinä"): <see cref="KokoMaassa"/>.
    ///  - KOKO ZOOMIN MUKAAN: ruudulla vakiokokoinen kuten päät, mutta kasvaa lähestyessä logaritmisesti KokoKaukaPt → KokoLahiPt
    ///    (LahiM:stä lähemmäs täysi koko). Kuoren osuus kuvasta on ~1/3 (köysi ja tuulikallistus), joten 84 pt → kuori ~28 pt (Päätoimittaja 7.10.: 1,5–2 × 44090c1a:n 17 × 37 pt).
    ///  - PAIKKA: pallon kuvan alareunan keskikohta (kori ja köysi) on kaupungin keskipisteessä; piilossa, kun piste on yli pallon
    ///    verran ruudun ulkopuolella. Ruudun koordinaatit, y alas.
    /// </summary>
    public static class KaupunkiPalloMitat
    {
        public const double NakyyAstiM = 2_600_000, LahiM = 60_000;
        public const float KokoKaukaPt = 84f, KokoLahiPt = 120f;
        /// <summary>Kuvan pystysuunnassa köyden pää (kiinnityspiste) on näin korkealla kuvan alareunasta (osuus koosta).</summary>
        public const float AnkkuriOsuus = 0.03f;

        /// <summary>
        /// Pallon koko koko Euroopan näkymässä (PT 11.10. 16.5x NUI:n ohjeella, juna 182): 84 pt pallo peitti houkuttimia
        /// (Pariisin pallo Englannin ja Edinburghin päällä). NakyyAstiM:n yläpuolella log-interpolointi 84 → 52 pt Euroopan
        /// sovituskorkeuteen (PalloKierto.EuroopanSovitusM: iPhone pysty ~13 600 km, iPad pysty ~8 000 km; valinta:
        /// laitekohtainen Euroopan sovitus, ei kiinteä korkeus), sen yläpuolella 52 pt. 52 eikä NUI:n ehdottama 44: iPhonella
        /// Pariisin pallo mahtuu Lontoon (−10, −21 pt) ja Amsterdamin (+14, −26 pt) väliin vain 52 pt:n koossa oikealle
        /// kallistettuna (vara 5,2 pt; 44 pt: 4,2 pt, alle houkuttimen ytimen säteen 4,75 pt). Puoli: <see cref="VaistavaPuoli"/>.
        /// </summary>
        public const float KokoEurooppaPt = 52f;

        /// <summary>Pallon koko ruutupisteinä kameran korkeudesta: log-interpolointi NakyyAstiM (kauka) → LahiM (lähi); NakyyAstiM:n
        /// yläpuolella log-interpolointi <see cref="KokoEurooppaPt"/>:hen Euroopan sovituskorkeudella <paramref name="euroopanM"/>
        /// (NaN tai ≤ NakyyAstiM = vakio KokoKaukaPt kuten ennen).</summary>
        public static float Koko(double korkeusM, double euroopanM = double.NaN)
        {
            if (double.IsNaN(korkeusM)) return KokoKaukaPt;
            if (korkeusM >= NakyyAstiM)
            {
                if (!(euroopanM > NakyyAstiM)) return KokoKaukaPt;
                if (korkeusM >= euroopanM) return KokoEurooppaPt;
                double e = (Math.Log(korkeusM) - Math.Log(NakyyAstiM)) / (Math.Log(euroopanM) - Math.Log(NakyyAstiM));
                return (float)(KokoKaukaPt + (KokoEurooppaPt - KokoKaukaPt) * e);
            }
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

        // ---- Pallon muoto kuvassa (osuudet kuvan koosta, origo vasen yläkulma; samat kuin UI/KaupunkiPallot.cs PalloNappi) ----
        public const float KuoriX = 0.26f, KuoriY = 0.18f, KuoriR = 0.19f, KoriY = 0.63f, KoriR = 0.05f;

        /// <summary>
        /// Pienin etäisyys (pt) pisteistä pallon muotoon (kuori, kori ja köysi korista kiinnityspisteeseen), kun kiinnityspiste
        /// on (ax, ay) (y alas) ja pallo kallistuu <paramref name="oikea"/>lle. Negatiivinen = piste muodon sisällä.
        /// </summary>
        public static float Vara(float ax, float ay, float koko, bool oikea, IReadOnlyList<(float X, float Y)> pisteet)
        {
            float s = oikea ? 1f : -1f;
            float kx = ax + s * (0.5f - KuoriX) * koko;
            float ky = ay - (1f - AnkkuriOsuus - KuoriY) * koko, kr = KuoriR * koko;
            float bx = kx, by = ay - (1f - AnkkuriOsuus - KoriY) * koko, br = KoriR * koko;
            float pienin = float.MaxValue;
            if (pisteet == null) return pienin;
            foreach (var p in pisteet)
            {
                float dk = Etaisyys(p.X - kx, p.Y - ky) - kr, db = Etaisyys(p.X - bx, p.Y - by) - br;
                float vx = ax - bx, vy = ay - by, t = Math.Max(0f, Math.Min(1f, ((p.X - bx) * vx + (p.Y - by) * vy) / Math.Max(1e-6f, vx * vx + vy * vy)));
                float dr = Etaisyys(p.X - (bx + t * vx), p.Y - (by + t * vy));
                pienin = Math.Min(pienin, Math.Min(dk, Math.Min(db, dr)));
            }
            return pienin;
        }

        static float Etaisyys(float x, float y) => (float)Math.Sqrt(x * x + y * y);

        /// <summary>
        /// HOUKUTTIMIEN VÄISTÖ (PT 16.5x): kallistuspuoli, jolla pallo jää kauemmas houkutinpisteistä (Houkuttimet; ruutupisteet
        /// pt, y alas). Tasapelissä tai ilman pisteitä <paramref name="nykyinen"/>. KaupunkiPallot käyttää koko Euroopan näkymässä.
        /// </summary>
        public static bool VaistavaPuoli(float ax, float ay, float koko, IReadOnlyList<(float X, float Y)> pisteet, bool nykyinen)
        {
            if (pisteet == null || pisteet.Count == 0) return nykyinen;
            float v = Vara(ax, ay, koko, false, pisteet), o = Vara(ax, ay, koko, true, pisteet);
            return Math.Abs(o - v) < 0.01f ? nykyinen : o > v;
        }

        /// <summary>Muun kuin pelaajan maan pallon koko maailmanäkymässä (osuus <see cref="Koko"/>sta): 84 → 34 pt, 120 → 48 pt.</summary>
        public const float MuuMaaOsuus = 0.4f;

        /// <summary>
        /// Pallon koko maan mukaan: kehittäjän maailmanäkymässä muun kuin pelaajan maan pallo <see cref="MuuMaaOsuus"/> × koko;
        /// pelaajan maan pallot, peli (vain oma maa näkyy) ja maailmanäkymä ilman pelaajan maata ennallaan.
        /// </summary>
        public static float KokoMaassa(float koko, string pallonMaa, string pelaajanMaa, bool maailmaNakyma) =>
            maailmaNakyma && !string.IsNullOrEmpty(pelaajanMaa) && !ErikoisnostoMitat.OmaMaa(pallonMaa, pelaajanMaa)
                ? koko * MuuMaaOsuus : koko;

        /// <summary>Saako pallo näkyä: kehittäjän maailmanäkymässä (huntu pois) aina, muuten vain pelaajan nykyisessä maassa.</summary>
        public static bool Nakyy(string pallonMaa, string pelaajanMaa, bool maailmaNakyma) =>
            maailmaNakyma || ErikoisnostoMitat.OmaMaa(pallonMaa, pelaajanMaa);
    }
}
