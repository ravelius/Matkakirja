using System;
using System.Collections.Generic;

namespace Matkakirja
{
    /// <summary>
    /// POHJAPALLO (löydös 119, Fablen hyväksyntä 25.9.2026 klo 18.5x): pergamentinvärinen, umpinainen varapinta
    /// <see cref="SyvyysM"/> ellipsoidin alla, jotta laattojen raoista näkyy pergamenttia eikä avaruutta tai pallon
    /// takapuolta. Puhtaat osat (ei UnityEngineä: testit Kartta-testit/Testit/PohjapalloTestit.cs); Unity-puoli
    /// Kartta/Pohjapallo.cs ja varjostin Kartta/Resources/Pohjapallo.shader.
    ///
    /// VERKKO: ikosaedri jaettuna <see cref="Jako"/> kertaa (20·4^n kolmiota; tasakokoiset kolmiot, toisin kuin
    /// pituus-leveysruudukossa, jonka navoille kasautuu kolmioita ja päiväntasaajalle suurin jänne). Kärjet ovat
    /// yksikkövektoreina ECEF-suunnissa, kolmioiden kierto oikeakätisessä ECEF:ssä vastapäivään ulkoa katsottuna
    /// (normaali (b − a) × (c − a) osoittaa ulos). Unity-puoli skaalaa kärjet säteisiin <see cref="Sateet"/> ja
    /// muuntaa ne georeferenssin ecefToLocal-matriisilla (kierto käännetään, jos matriisin determinantti on negatiivinen).
    ///
    /// SYVYYS JA JÄNNE (miksi TAKAPINNAT, Pohjapallo.shader: Cull Front): Karttasepän maastolaatat (tools/maasto/
    /// tee-maasto.mjs, RTIN) harvennetaan virherajaan, jossa jänteen painuma on mukana: kynnys = ½ · 77 067 m / 2^z
    /// (<see cref="MaastonPainuma"/>). Merilaatan kolmiot painuvat siis tasolla z3 noin 3,8 km, z2 7,6 km ja z0 jopa
    /// 38 km ellipsoidin alle, ja koko pallon näkymässä Cesium piirtää tasoja 2–3 (lataushetkellä myös 0–1). Etupinta
    /// 3 km:n syvyydessä nousisi näiden jänteiden läpi pilkuiksi pitkin merta. Siksi varjostin piirtää pallon
    /// TAKAPINNAN: ruutualue on sama (pallon siluetti), mutta syvyys on pallon kaukaisella puolella. Jokainen
    /// kameran puoleinen maastokolmio on silloin lähempänä kuin takapinta (jos kolmion piste on pallon sisällä, säde on
    /// jo ohittanut etupinnan eikä vielä takapintaa), joten läpikuultoa ei synny millään zoomilla eikä laattatasolla, ja
    /// z-taistelua ei ole (lähin toinen pinta, takapuolen maasto, on ≥ 3 km kauempana; 32-bittinen käänteinen syvyys
    /// erottaa ~1e-7 × etäisyys eli ~1,3 m 13 000 km:ssä). Syvyys vaikuttaa vain siluettiin: reiän läpi katsova säde
    /// osuu pohjapalloon, jos se painuu maan alle yli 3 km (verkon oma jänne ≤ <see cref="SuurinPainuma"/> lisää tähän
    /// alle 2 km tasolla 5). Matalalla horisontin lähellä säde ei ehdi syvälle: horisontin alla on kapea kaista
    /// (150 m:n korkeudelta noin 1,4°), jonka reiät näyttävät yhä taustan (usvan).
    /// </summary>
    public static class Pohjapallolaskenta
    {
        /// <summary>Kärkien syvyys ellipsoidin alla (m), Fablen hyväksymä 3 km.</summary>
        public const double SyvyysM = 3000.0;
        /// <summary>Ikosaedrin jakokerrat: 5 → 20 480 kolmiota, 10 242 kärkeä, jänteen painuma ≤ 2 km.</summary>
        public const int Jako = 5;
        /// <summary>WGS84 (CesiumWgs84Ellipsoid): isoakseli ja pikkuakseli metreinä.</summary>
        public const double Ekv = 6378137.0, Nap = 6356752.314245;
        /// <summary>Cesiumin quantized-mesh-tason 0 geometrinen virhe (m): 6 378 137 · 2π · 0,25 / (65 · 2).</summary>
        public const double Taso0Virhe = 6378137.0 * 2.0 * Math.PI * 0.25 / (65.0 * 2.0);

        /// <summary>Ellipsoidin säteet syvyyden verran pienempinä (x, y = päiväntasaaja, z = napa-akseli, ECEF).</summary>
        public static (double x, double y, double z) Sateet(double syvyysM = SyvyysM) =>
            (Ekv - syvyysM, Ekv - syvyysM, Nap - syvyysM);

        /// <summary>
        /// Ikosaedri jaettuna <paramref name="jako"/> kertaa: kärjet yksikköpallolla (ECEF-suunnat), kolmiot kolmen indeksin
        /// ryhminä vastapäivään ulkoa katsottuna. Jaon keskipisteet jaetaan naapurikolmioiden kesken (ei rakoja).
        /// </summary>
        public static (List<(double x, double y, double z)> karjet, List<int> kolmiot) Ikosaedri(int jako = Jako)
        {
            double t = (1.0 + Math.Sqrt(5.0)) / 2.0;
            var karjet = new List<(double x, double y, double z)>();
            void Lisaa(double x, double y, double z) => karjet.Add(Normalisoi((x, y, z)));
            Lisaa(-1, t, 0); Lisaa(1, t, 0); Lisaa(-1, -t, 0); Lisaa(1, -t, 0);
            Lisaa(0, -1, t); Lisaa(0, 1, t); Lisaa(0, -1, -t); Lisaa(0, 1, -t);
            Lisaa(t, 0, -1); Lisaa(t, 0, 1); Lisaa(-t, 0, -1); Lisaa(-t, 0, 1);
            var kolmiot = new List<int>
            {
                0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11,
                1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8,
                3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9,
                4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1,
            };
            for (int n = 0; n < Math.Max(0, jako); n++)
            {
                var valit = new Dictionary<long, int>();
                int Vali(int a, int b)
                {
                    long avain = a < b ? ((long)a << 32) | (uint)b : ((long)b << 32) | (uint)a;
                    if (valit.TryGetValue(avain, out int i)) return i;
                    var p = karjet[a]; var q = karjet[b];
                    Lisaa(p.x + q.x, p.y + q.y, p.z + q.z);
                    valit[avain] = karjet.Count - 1;
                    return karjet.Count - 1;
                }
                var uudet = new List<int>(kolmiot.Count * 4);
                for (int i = 0; i < kolmiot.Count; i += 3)
                {
                    int a = kolmiot[i], b = kolmiot[i + 1], c = kolmiot[i + 2];
                    int ab = Vali(a, b), bc = Vali(b, c), ca = Vali(c, a);
                    uudet.AddRange(new[] { a, ab, ca, b, bc, ab, c, ca, bc, ab, bc, ca });
                }
                kolmiot = uudet;
            }
            return (karjet, kolmiot);
        }

        /// <summary>
        /// Verkon suurin jänteen painuma (m), kun kärjet ovat säteellä <paramref name="sade"/>: tasokolmion syvin kohta
        /// on sen ympäri piirretyn ympyrän keskipiste (pallon keskipisteen kohtisuora projektio kolmion tasolle), joka
        /// on kolmion sisällä teräväkulmaisilla kolmioilla. Painuma = sade − etäisyys keskipisteestä tasoon.
        /// </summary>
        public static double SuurinPainuma(List<(double x, double y, double z)> karjet, List<int> kolmiot, double sade)
        {
            double suurin = 0.0;
            for (int i = 0; i < kolmiot.Count; i += 3)
            {
                var a = karjet[kolmiot[i]]; var b = karjet[kolmiot[i + 1]]; var c = karjet[kolmiot[i + 2]];
                var n = Normalisoi(Risti(Erotus(b, a), Erotus(c, a)));
                double etaisyys = Math.Abs(n.x * a.x + n.y * a.y + n.z * a.z);   // yksikköpallon keskipisteestä tasoon
                suurin = Math.Max(suurin, sade * (1.0 - etaisyys));
            }
            return suurin;
        }

        /// <summary>
        /// Maastolaatan jänteen suurin painuma tasolla z (m): Karttasepän RTIN-kynnys ½ · 77 067 m / 2^z (vähintään
        /// 0,5 m), joka rajaa myös kaarevuuden (tee-maasto.mjs: janteenPainuma kulkee virheessä korkeuspoikkeaman rinnalla).
        /// </summary>
        public static double MaastonPainuma(int taso) => Math.Max(0.5, Taso0Virhe / Math.Pow(2.0, taso) * 0.5);

        // ---- Näkyvyys ja sävy ----

        /// <summary>Komento "pallo pohja auto|paalle|pois": auto = päällä paitsi magenta-mittauksessa.</summary>
        public enum Tila { Auto, Paalle, Pois }

        /// <summary>
        /// Näkyykö pohjapallo: Auto piilottaa sen magentataustan ajaksi (PalloReiat, reiät näkyvät mittauksessa), Paalle
        /// näyttää sen magentankin kanssa (jäljelle jäävät reiät mitattavissa), Pois piilottaa aina.
        /// </summary>
        public static bool Nakyy(Tila tila, bool magenta) => tila == Tila.Paalle || (tila == Tila.Auto && !magenta);

        /// <summary>Mikä pinta pallolla on: pohjapallon sävy seuraa sitä (<see cref="Savy"/>).</summary>
        public enum Pinta { Pergamentti, Satelliitti, Reliefi }

        /// <summary>
        /// Pinta nykytilasta: satelliittilento (Blue Marble + Sentinel, KarttaKerrokset.SatelliittiLento) voittaa;
        /// muuten pergamenttipohja piilossa = linssin reliefi (topografia, radio, astronautti, Isoisä 1873:n rajaton
        /// pohja käyttävät Topografia.ReliefiSarjaa); muuten pergamentti.
        /// </summary>
        public static Pinta Valitse(bool satelliittiLento, bool pohjaNakyy) =>
            satelliittiLento ? Pinta.Satelliitti : pohjaNakyy ? Pinta.Pergamentti : Pinta.Reliefi;

        /// <summary>
        /// Pinnan sävy (sRGB-tavuina): pergamentti = Laattapalvelimen varalaatan väri #d9d0bb ("pergamentti, meren ja maan
        /// välissä": pohjan meri #c8c0b0 ja maa #e4c890 mitattu 2026-09-25-pohja-laatoista z4–z6); satelliitti = Blue
        /// Marble -bathyn avomeren keskiarvo (KarttaKerrokset.S2MeriVari 17, 46, 92); reliefi = reliefisarjan avomeri
        /// (web MERIVARI, NapaKannet.ReliefiPohjoinen 38, 78, 145). Maata ei tavoitella: reiät ovat pieniä, ja
        /// pinnan valtasävy erottuu niissä vähiten. Tummennukset (pallon sävy, valokeila, radion hämärä) ja usva lisää
        /// varjostin samoilla globaaleilla kuin laatoille.
        /// </summary>
        public static (byte r, byte g, byte b) Savy(Pinta pinta) =>
            pinta == Pinta.Satelliitti ? ((byte)17, (byte)46, (byte)92)
            : pinta == Pinta.Reliefi ? ((byte)38, (byte)78, (byte)145)
            : ((byte)0xd9, (byte)0xd0, (byte)0xbb);

        // ---- Vektorit ----

        static (double x, double y, double z) Normalisoi((double x, double y, double z) v)
        {
            double l = Math.Sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
            return l > 0.0 ? (v.x / l, v.y / l, v.z / l) : (0.0, 0.0, 0.0);
        }

        static (double x, double y, double z) Erotus((double x, double y, double z) a, (double x, double y, double z) b) =>
            (a.x - b.x, a.y - b.y, a.z - b.z);

        static (double x, double y, double z) Risti((double x, double y, double z) a, (double x, double y, double z) b) =>
            (a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
    }
}
