// ELÄVÄ KARTTA: aikajanan profiilit (Linssiseppä 26.9.2026). Sama koreografia kahdella tempolla:
//   Video       käsikirjoituksen 18,5 s:n video (omistaja hyväksyi suunnan 26.9. klo 05.0x): kaikki vaiheet.
//   Saapuminen  pelattava kohta 1 (Fable 26.9.): ohitettava, kerran maata kohden; kamera on Natiivisepän saapumisajo, joten
//               profiili ei aja kameraa. Omistaja 27.9.2026 klo 08.3x (koko maailma auki, maakunnat heränneinä heti): VAIN
//               maakuntien pohjavärin täyttö heti 0 s:sta ja lopuksi omien kerrosten luovutus pelin pysyviin kerroksiin — ei
//               huntua, kynäviivoja (joet ja rajat), nostojen pudotusta eikä auringon liikettä (vaiheliput).
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Elava
{
    public sealed class ElavaProfiili
    {
        public string Nimi;
        /// <summary>
        /// Soitettavat vaiheet (oletus kaikki, kuten video): hunnun kuivuminen, joet ja rajat kynällä, nostojen pudotus ja
        /// auringon liike. Maakuntien täyttö ja luovutus soivat aina. Saapuminen 27.9.2026: kaikki pois.
        /// </summary>
        public bool HuntuKuivuu = true, ViivatPiirtyvat = true, NostotPutoavat = true, AurinkoLiikkuu = true;
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
        /// Saapuminen 1,6 s (omistaja 27.9.2026 klo 08.3x): maakuntien pohjaväri täyttyy etäisyysjärjestyksessä heti 0 s:sta
        /// (syttymiset 0–0,85 s, kukin 0,35 s, kaikki valmiina viimeistään 1,2 s:ssa), ja 1,2–1,6 s omat kerrokset häipyvät
        /// pelin pysyviin (luovutus). Ennen 27.9.: huntu, kynäviivat, nostojen pudotus ja auringon liike, 4,8 s.
        /// </summary>
        public static readonly ElavaProfiili Saapuminen = new ElavaProfiili
        {
            Nimi = "saapuminen",
            HuntuKuivuu = false, ViivatPiirtyvat = false, NostotPutoavat = false, AurinkoLiikkuu = false,
            MaakunnatAlku = 0.0, MaakuntaVali = 0.08, MaakuntienKesto = 0.85, MaakunnanTaytto = 0.35,
            Kesto = 1.6, LuovutusAlku = 1.2, Kamera = false,
        };

        /// <summary>
        /// Auringon avaimet (hetki, atsimuutti, korkeus): video aamu → päivä → kartan valo, välit pehmeästi, lyhintä kulmaa.
        /// Ilman auringon liikettä (saapuminen 27.9.2026) kartan valo pysyy koko ajan.
        /// </summary>
        public List<(double T, double Atsimuutti, double Korkeus)> AurinkoPolku(double alkuAtsimuutti, double alkuKorkeus)
        {
            if (!AurinkoLiikkuu) return new List<(double, double, double)> { (0, alkuAtsimuutti, alkuKorkeus) };
            return new List<(double, double, double)>
            {
                (0, alkuAtsimuutti, alkuKorkeus),
                (ElavaKohtaus.SaapuminenLoppu, ElavaKohtaus.AamuAtsimuutti, ElavaKohtaus.AamuKorkeus),
                (ElavaKohtaus.AurinkoAlku, ElavaKohtaus.AamuAtsimuutti, ElavaKohtaus.AamuKorkeus),
                (ElavaKohtaus.AurinkoLoppu, ElavaKohtaus.PaivaAtsimuutti, ElavaKohtaus.PaivaKorkeus),
                (ElavaKohtaus.MaailmaAlku, ElavaKohtaus.PaivaAtsimuutti, ElavaKohtaus.PaivaKorkeus),
                (ElavaKohtaus.MaailmaLoppu, alkuAtsimuutti, alkuKorkeus),
            };
        }
    }
}
