// ELÄVÄ KARTTA: aikajanan profiilit (Linssiseppä 26.9.2026). Sama koreografia kahdella tempolla:
//   Video       käsikirjoituksen 18,5 s:n video (omistaja hyväksyi suunnan 26.9. klo 05.0x)
//   Saapuminen  pelattava kohta 1 (Fable 26.9.): ≤ 5 s, ohitettava, kerran maata kohden; kamera on Natiivisepän
//               saapumisajo, joten profiili ei aja kameraa. Lopussa omat kerrokset häivytetään pelin pysyviin (luovutus).
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Elava
{
    public sealed class ElavaProfiili
    {
        public string Nimi;
        public double HuntuAlku, HuntuLoppu;
        public double ViivatAlku, ViivatLoppu, RajanKesto, JoenKestoMin, JoenKestoMax, JokiVali;
        public double MaakunnatAlku, MaakuntaVali, MaakuntienKesto, MaakunnanTaytto;
        /// <summary>Muiden maakuntien asettuminen paperiksi (video); NaN = ei asetu.</summary>
        public double AsettuminenAlku = double.NaN, AsettuminenLoppu = double.NaN, AsettunutOsuus = 1;
        /// <summary>Nostojen pudotusikkunat luokittain (pääkohde, kohde, pieni): alku, loppu, pudotuksen kesto.</summary>
        public (double Alku, double Loppu, double Kesto)[] NostoIkkunat;
        public double Kesto;
        /// <summary>Omien kerrosten häivytys pelin pysyviin kerroksiin (saapuminen); ≥ Kesto = ei häivytystä (video).</summary>
        public double LuovutusAlku;
        /// <summary>Ajetaanko kamera (video) vai onko se pelin saapumisajon (saapuminen).</summary>
        public bool Kamera;

        public static readonly ElavaProfiili Video = new ElavaProfiili
        {
            Nimi = "video",
            HuntuAlku = ElavaKohtaus.HuntuAlku, HuntuLoppu = ElavaKohtaus.HuntuLoppu,
            ViivatAlku = ElavaKohtaus.ViivatAlku, ViivatLoppu = ElavaKohtaus.ViivatLoppu, RajanKesto = ElavaKohtaus.RajanKesto,
            JoenKestoMin = ElavaKohtaus.JoenKestoMin, JoenKestoMax = ElavaKohtaus.JoenKestoMax, JokiVali = ElavaKohtaus.JokiVali,
            MaakunnatAlku = ElavaKohtaus.MaakunnatAlku, MaakuntaVali = ElavaKohtaus.MaakuntaVali,
            MaakuntienKesto = ElavaKohtaus.MaakuntienKesto, MaakunnanTaytto = ElavaKohtaus.MaakunnanTaytto,
            AsettuminenAlku = ElavaKohtaus.AsettuminenAlku, AsettuminenLoppu = ElavaKohtaus.AsettuminenLoppu,
            AsettunutOsuus = ElavaKohtaus.AsettunutOsuus,
            NostoIkkunat = new[] { (ElavaKohtaus.NostotAlku, 5.35, 0.25), (5.35, 5.95, 0.22), (5.95, 6.3, 0.18) },
            Kesto = ElavaKohtaus.Kesto, LuovutusAlku = double.PositiveInfinity, Kamera = true,
        };

        /// <summary>
        /// Saapuminen ≤ 5 s: huntu kuivuu 1,6 s:ssa, kynä vetää joet ja rajat 0,4–2,5 s, maakunnat syttyvät 2,0–3,2 s,
        /// nostot putoavat 2,6–3,8 s, aurinko pyyhkäisee 0,3–4,2 s, ja 4,3–4,8 s omat kerrokset häipyvät pelin pysyviin.
        /// </summary>
        public static readonly ElavaProfiili Saapuminen = new ElavaProfiili
        {
            Nimi = "saapuminen",
            HuntuAlku = 0.0, HuntuLoppu = 1.6,
            ViivatAlku = 0.4, ViivatLoppu = 2.5, RajanKesto = 0.3, JoenKestoMin = 0.45, JoenKestoMax = 0.9, JokiVali = 0.08,
            MaakunnatAlku = 2.0, MaakuntaVali = 0.08, MaakuntienKesto = 0.85, MaakunnanTaytto = 0.35,
            NostoIkkunat = new[] { (2.6, 2.9, 0.22), (2.9, 3.4, 0.2), (3.4, 3.65, 0.16) },
            Kesto = 4.8, LuovutusAlku = 4.3, Kamera = false,
        };

        /// <summary>
        /// Auringon avaimet (hetki, atsimuutti, korkeus): video aamu → päivä → kartan valo; saapuminen laskee 0,8 s:ssa matalalle
        /// 30° kartan valon vastapäivään ja nousee takaisin kartan valoon (pitkät varjot liikkuvat ja lyhenevät). Välit pehmeästi, lyhintä kulmaa.
        /// </summary>
        public List<(double T, double Atsimuutti, double Korkeus)> AurinkoPolku(double alkuAtsimuutti, double alkuKorkeus)
        {
            if (Nimi == "video")
                return new List<(double, double, double)>
                {
                    (0, alkuAtsimuutti, alkuKorkeus),
                    (ElavaKohtaus.SaapuminenLoppu, ElavaKohtaus.AamuAtsimuutti, ElavaKohtaus.AamuKorkeus),
                    (ElavaKohtaus.AurinkoAlku, ElavaKohtaus.AamuAtsimuutti, ElavaKohtaus.AamuKorkeus),
                    (ElavaKohtaus.AurinkoLoppu, ElavaKohtaus.PaivaAtsimuutti, ElavaKohtaus.PaivaKorkeus),
                    (ElavaKohtaus.MaailmaAlku, ElavaKohtaus.PaivaAtsimuutti, ElavaKohtaus.PaivaKorkeus),
                    (ElavaKohtaus.MaailmaLoppu, alkuAtsimuutti, alkuKorkeus),
                };
            return new List<(double, double, double)>
            {
                (0, alkuAtsimuutti, alkuKorkeus),
                (0.8, alkuAtsimuutti - 30, 12),
                (4.2, alkuAtsimuutti, alkuKorkeus),
            };
        }
    }
}
