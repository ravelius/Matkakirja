using System;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// ERIKOISMALLI VISBY (Gotlannin hansakaupunki ja kehämuuri; speksi docs/raportit/erikoismallit/visby.md, omistaja hyväksyi
    /// elämänidean 27.9.2026). Nosto kohde:visby, Ruotsi, 57,6357 N 18,299 E, taso 1 (kaupunki).
    /// Tunnistus sekunnissa: vaalea kalkkikivimuuri kehänä kaupungin ympärillä ja siinä monta korkeaa neliötornia, kehän sisällä
    /// tiivis kaupunki jyrkkine punaruskeine kattoineen rinteessä merestä Klinteniin, Pyhän Marian tuomiokirkon kolme mustaa
    /// barokkihuppua, kattojen keskellä vaaleat kirkkojen rauniot (S:ta Karin Stora torgetin laidalla) ja edessä kapea meri,
    /// pieni satama ja valkoinen Gotlannin lautta.
    /// Mitat: 1,0 ≈ 1 450 m (kehä 1,42 km rannan suuntaan, OpenStreetMap). Rakennukset on liioiteltu noin 4 × (muuri 0,032,
    /// tornit 0,05–0,085, talot 0,03–0,04, tuomiokirkon huppu 0,17) ja maasto noin 1,3 × (alakaupungin lattia nousee rannasta
    /// Klintenin juurelle 0,017:ään ja ylempi kaupunki on 0,04:ssä). Lautta on 0,10 × 0,024 (noin 0,7 × todellinen), jotta satama
    /// ei hallitse, ja legendan tynnyrit 0,03 korkeita.
    /// SUUNTA TYYLITELTY: todellisuudessa meri on lännessä ja maamuurin kaari kiertää kaupungin pohjoisesta idän kautta etelään.
    /// Malli on käännetty 116° vastapäivään: rannikko (Strandmuren, todellinen suunta 26°) on mallin etureuna, meri ja satama
    /// ovat edessä (−Z, todellinen länsiluode) ja maamuurin kaari tornineen kiertää kaupungin takana (+Z, itä). Snäckgärdsporten
    /// on vasemmassa päässä (todellinen pohjoiskoillinen) ja Söderport ja Skansport oikealla (etelälounas). Kaari avautuu
    /// kameraa kohti kuin amfiteatteri, joten kallistettu kamera näkee koko kehän, rinteen kaupunkeineen ja lautan. Rantamuuri
    /// on tyylitelty suoraksi ja yhtenäiseksi Kruttornetista satamaan, ja satama on muurin lounaiskulman edessä.
    /// Liikkuvat osat:
    ///   lautta        Gotlannin lautta (pivot laiturissa, keula vasemmalle): tulee vasemmalta, kääntyy altaassa, peruuttaa laituriin
    ///   vana          lautan V-vana (pivot sama kuin lautalla)
    ///   lauttavalo    lautan ikkunanauhan hehku yöllä (pivot sama kuin lautalla)
    ///   tynnyri0–2    Valdemar Atterdagin oluttynnyrit Stora torgetilla (legenda 1361, harvinainen ja napautus)
    ///   kulta0–2      kultakasa, joka nousee tynnyrin sisältä reunan yli (pivot tynnyrin reunan tasossa)
    ///   kimallus0–2   kimallus kasan yllä (pivot kasan huipulla)
    ///   valot0–6      muurin tornien hehku ryhmittäin (pivot ryhmän keskitornin huipun tasossa, jottei hehku leijaile)
    ///   valot7        S:ta Karinin raunio (pivot rauniossa)
    /// </summary>
    public sealed partial class Symbolimallit
    {
        // ---- Mitat (mallin yksiköissä) ----

        /// <summary>Veden pinta ja rantakaistan taso (kaikki y ≥ 0).</summary>
        const float VbVesiY = 0.0015f, VbRantaY = 0.0025f;
        /// <summary>Alakaupungin lattia on taso y = VbAlaY + VbRinne · (z − VbRantaZ) (nousee rannasta Klintenin juurelle), ja ylempi
        /// kaupunki Klintenin päällä on tasainen VbYlaY:ssä.</summary>
        const float VbAlaY = 0.002f, VbRinne = 0.055f, VbRantaZ = -0.15f, VbYlaY = 0.04f;
        /// <summary>Maamuurin korkeus maastosta ja paksuus, rantamuurin korkeus ja paksuus.</summary>
        const float VbMuuriH = 0.032f, VbMuuriP = 0.013f, VbRantamuuriH = 0.022f, VbRantamuuriP = 0.011f;
        /// <summary>Muuritornin leveys muurin suunnassa, ulkonema muurin ulkopinnasta ja sisäänpäin muurin sisäpinnasta.</summary>
        const float VbTorniL = 0.027f, VbTorniUlos = 0.014f, VbTorniSisaan = 0.003f;
        /// <summary>Meri: veden takareuna (rantakaistan etureuna), etureunan perustaso, sataman alku X, satama-altaan etureuna ja
        /// laiturin sisäpinta (altaan oikea reuna).</summary>
        const float VbVesiTaka = -0.1705f, VbVesiEtu = -0.2375f, VbSatamaX0 = 0.22f, VbSatamaEtu = -0.281f, VbLaituriX = 0.455f;
        /// <summary>Lautan pituus ja leveys sekä satama: laituripaikka (lautan keskikohta levossa), kääntöpaikka altaassa ja
        /// kulkulinja. Samat vakiot liikeytimessä (VisbyLiike): muuta molemmat.</summary>
        const float VbLauttaPituus = 0.1f, VbLauttaLeveys = 0.024f, VbLaituriPaikkaX = 0.39f, VbKaantoX = 0.30f, VbAltaanZ = -0.2275f, VbKulkuZ = -0.205f;
        /// <summary>Stora torget: keskipiste ja koko (x, z).</summary>
        const float VbToriX = -0.085f, VbToriZ = 0.078f, VbToriLx = 0.1f, VbToriLz = 0.055f;
        /// <summary>Tynnyrit: säde (alhaalla ja ylhäällä), korkeus ja paikat torilla rivissä.</summary>
        const float VbTynnyriR0 = 0.0115f, VbTynnyriR1 = 0.0135f, VbTynnyriH = 0.03f;
        static readonly float[] VbTynnyriX = { -0.113f, -0.085f, -0.057f };
        const float VbTynnyriZ = 0.079f;

        // ---- Paletti (Em-seepiaramppi; yksi aksentti = kulta) ----

        /// <summary>Kalkkikivi (muuri, tornit), sen yläpinnat ja avoimien tornien sisus.</summary>
        static readonly Color VbKalkki = Hex(0xd4cab2), VbKalkkiYla = Hex(0xdcd3bd), VbTorninSisus = Hex(0x8a7a5e);
        /// <summary>Tiilikatot kolmena sävynä ja talojen seinät (paperi, okra ja vaalea harmaa).</summary>
        static readonly Color VbTiili = Hex(0x9a6448), VbTiiliTumma = Hex(0x80533d), VbTiiliVaalea = Hex(0xab7556),
            VbSeinaOkra = Hex(0xe3cfa3), VbSeinaHarmaa = Hex(0xdcd4c0);
        /// <summary>Tuomiokirkko: harmaa kivi, katto ja mustat barokkihuput.</summary>
        static readonly Color VbKirkko = Hex(0xcbc1a7), VbKirkkoKatto = Hex(0x8a5c44);
        /// <summary>Rauniot: kalkkikivi ja nurmi sisällä.</summary>
        static readonly Color VbRaunio = Hex(0xdad0b7), VbNurmi = Hex(0xa9a67c);
        /// <summary>Maasto: alakaupungin lattia, ylemmän kaupungin puutarhat, Klintenin rinne ja Stora torget.</summary>
        static readonly Color VbAlakaupunki = Hex(0xc4b593), VbPuutarha = Hex(0xb3b184), VbKlint = Hex(0xbcaa86), VbToriVari = Hex(0xece2c9),
            VbKlintPenger = Hex(0xa8966f);
        /// <summary>Ranta: kävelykatu, Almedalenin nurmi ja satamalaiturin kivi.</summary>
        static readonly Color VbPromenadi = Hex(0xddd2b6), VbAlmedalen = Hex(0xb1b083);
        /// <summary>Lautta: valkoinen runko ja kansirakennus, musteinen ikkunanauha ja tiilenpunainen piippu.</summary>
        static readonly Color VbLautanValkoinen = Hex(0xf6f0e0);
        /// <summary>Tynnyrit: puu, vanteet ja tumma pohja; kimallus vaaleampana kultana.</summary>
        static readonly Color VbTynnyriPuu = Hex(0x8a6a44), VbTynnyriPohja = Hex(0x4a3b2c), VbKimallusVari = Hex(0xf7e7ae);
        /// <summary>Lähitason ovet (tumma puu).</summary>
        static readonly Color VbOvi = Hex(0x6b4a33);

        // ---- Kehän geometria ----

        static Vector3 VbP(float x, float z) => new Vector3(x, 0f, z);

        /// <summary>
        /// Maamuurin keskilinja vasemmasta etukulmasta (Snäckgärdsporten, todellinen pohjoiskärki) takakaarta pitkin oikeaan
        /// etukulmaan (Segeltornetin kivijalka, todellinen lounaiskulma). Pisteet OpenStreetMapin muurista käännettynä 116°:
        /// 2 S:t Göransporten, 3 Norderport, 5 Dalmansporten, 7 Österport, 10 Söderport ja 12 Skansport.
        /// </summary>
        static readonly Vector3[] VbMaamuuri =
        {
            VbP(-0.472f, -0.120f), VbP(-0.462f, -0.035f), VbP(-0.450f, 0.048f), VbP(-0.428f, 0.116f), VbP(-0.350f, 0.163f),
            VbP(-0.248f, 0.199f), VbP(-0.112f, 0.222f), VbP(0.030f, 0.231f), VbP(0.160f, 0.215f), VbP(0.282f, 0.181f),
            VbP(0.396f, 0.122f), VbP(0.448f, 0.032f), VbP(0.462f, -0.050f), VbP(0.466f, -0.128f),
        };

        /// <summary>Rantamuurin keskilinja oikeasta etukulmasta vasempaan (Kruttornet on pisteessä 2).</summary>
        static readonly Vector3[] VbRantamuuri =
        {
            VbP(0.466f, -0.128f), VbP(0.200f, -0.140f), VbP(-0.090f, -0.150f), VbP(-0.300f, -0.140f), VbP(-0.472f, -0.120f),
        };

        /// <summary>Klintenin yläreunan välipisteet (x, z); juuri on 0,03 edempänä. Päät ovat sivumuureilla (vasen segmentillä
        /// 2–3 kohdassa 0,5, oikea segmentillä 10–11 kohdassa 0,55; juuren päät kohdissa 0,1 ja 0,85).</summary>
        static readonly float[] VbKlintX = { -0.36f, -0.26f, -0.15f, -0.04f, 0.07f, 0.18f, 0.28f, 0.36f };
        static readonly float[] VbKlintZ = { 0.118f, 0.140f, 0.152f, 0.157f, 0.155f, 0.146f, 0.128f, 0.100f };
        const float VbKlintSyvyys = 0.03f;

        static Vector3 VbMuurinPiste(int i, float t) => Vector3.Lerp(VbMaamuuri[i], VbMaamuuri[i + 1], t);

        /// <summary>Klintenin yläreuna (y = VbYlaY) vasemmalta oikealle, päät sivumuurien keskilinjalla.</summary>
        static Vector3[] VbKlintYla()
        {
            var v = new Vector3[VbKlintX.Length + 2];
            v[0] = VbMuurinPiste(2, 0.5f);
            for (int i = 0; i < VbKlintX.Length; i++) v[i + 1] = VbP(VbKlintX[i], VbKlintZ[i]);
            v[v.Length - 1] = VbMuurinPiste(10, 0.55f);
            for (int i = 0; i < v.Length; i++) v[i].y = VbYlaY;
            return v;
        }

        /// <summary>Klintenin juuri (alakaupungin lattian tasossa) vasemmalta oikealle, päät sivumuurien keskilinjalla.</summary>
        static Vector3[] VbKlintAla()
        {
            var v = new Vector3[VbKlintX.Length + 2];
            v[0] = VbMuurinPiste(2, 0.1f);
            for (int i = 0; i < VbKlintX.Length; i++) v[i + 1] = VbP(VbKlintX[i], VbKlintZ[i] - VbKlintSyvyys);
            v[v.Length - 1] = VbMuurinPiste(10, 0.85f);
            for (int i = 0; i < v.Length; i++) v[i].y = VbAlaKorkeus(v[i].z);
            return v;
        }

        /// <summary>Alakaupungin lattian korkeus kohdassa z.</summary>
        static float VbAlaKorkeus(float z) => VbAlaY + VbRinne * Mathf.Max(0f, z - VbRantaZ);

        /// <summary>X:n suhteen monotonisen viivan z kohdassa x (päiden ulkopuolella päätepisteen z).</summary>
        static float VbViivaZ(Vector3[] v, float x)
        {
            if (x <= v[0].x) return v[0].z;
            for (int i = 0; i + 1 < v.Length; i++)
                if (x <= v[i + 1].x) return Mathf.Lerp(v[i].z, v[i + 1].z, (x - v[i].x) / Mathf.Max(1e-6f, v[i + 1].x - v[i].x));
            return v[v.Length - 1].z;
        }

        /// <summary>Maaston korkeus kohdassa (x, z): alakaupungin lattia, Klintenin rinne tai ylempi kaupunki.</summary>
        static float VbMaasto(float x, float z)
        {
            var ala = VbKlintAla(); var yla = VbKlintYla();
            float zf = VbViivaZ(ala, x), zk = VbViivaZ(yla, x);
            if (z <= zf) return VbAlaKorkeus(z);
            if (z >= zk) return VbYlaY;
            return Mathf.Lerp(VbAlaKorkeus(zf), VbYlaY, (z - zf) / Mathf.Max(1e-5f, zk - zf));
        }

        /// <summary>
        /// Maamuurin keskilinja Klintenin ylityksineen: pisteiden y on maaston korkeus muurin sisäpuolella (alakaupungissa
        /// lattia, Klintenin päällä VbYlaY), joten muuri nousee sivuilla rinnettä ylös.
        /// </summary>
        static Vector3[] VbMuuriLinja()
        {
            var ala = VbKlintAla(); var yla = VbKlintYla();
            var v = new System.Collections.Generic.List<Vector3>();
            for (int i = 0; i < VbMaamuuri.Length; i++)
            {
                var p = VbMaamuuri[i];
                bool ylhaalla = i >= 3 && i <= 10;
                p.y = ylhaalla ? VbYlaY : VbAlaKorkeus(p.z);
                v.Add(p);
                if (i == 2) { v.Add(ala[0]); v.Add(yla[0]); }
                if (i == 10) { v.Add(yla[yla.Length - 1]); v.Add(ala[ala.Length - 1]); }
            }
            return v.ToArray();
        }

        /// <summary>Rantamuurin keskilinja (y = alakaupungin lattia).</summary>
        static Vector3[] VbRantaLinja()
        {
            var v = new Vector3[VbRantamuuri.Length];
            for (int i = 0; i < v.Length; i++) { v[i] = VbRantamuuri[i]; v[i].y = VbAlaKorkeus(v[i].z); }
            return v;
        }

        /// <summary>Vaakasuunta a → b (y = 0, normitettu).</summary>
        static Vector3 VbSuunta(Vector3 a, Vector3 b) { var d = b - a; d.y = 0f; return d.normalized; }

        /// <summary>Viivan pituus vaakatasossa.</summary>
        static float VbPituus(Vector3[] v)
        {
            float s = 0f;
            for (int i = 0; i + 1 < v.Length; i++) { var d = v[i + 1] - v[i]; d.y = 0f; s += d.magnitude; }
            return s;
        }

        /// <summary>Piste (y interpoloitu) ja vaakasuunta viivalla kaarenpituuden s kohdalla.</summary>
        static void VbViivalla(Vector3[] v, float s, out Vector3 c, out Vector3 d)
        {
            for (int i = 0; i + 1 < v.Length; i++)
            {
                var e = v[i + 1] - v[i]; e.y = 0f;
                float l = e.magnitude;
                if (s <= l || i + 2 == v.Length)
                {
                    float t = Mathf.Clamp01(s / Mathf.Max(1e-6f, l));
                    c = Vector3.Lerp(v[i], v[i + 1], t); d = e / Mathf.Max(1e-6f, l);
                    return;
                }
                s -= l;
            }
            c = v[0]; d = Vector3.right;
        }

        // ---- Runko ----

        static Mesh VisbyRunko()
        {
            var r = new Rakentaja();
            VbMeri(r);
            VbLaituri(r);
            VbKaupunginPohja(r, false);
            VbTuomiokirkko(r, false);
            VbRauniot(r, false);
            VbTalot(r, false);
            VbPuut(r, false);
            return r.Verkko("Visby");
        }

        /// <summary>
        /// Meri ja satama-allas: vesi on pienistä paloista (kukin alle ääriviivan kynnyksen, puolileveys alle 0,035), joten
        /// vedellä ei ole ääriviivaa eikä reunakaistaa. Kameran puoleinen reuna (loivasti aaltoileva) ja vasen pää rajautuvat
        /// suoraan karttaan; rannan puolella veden alle jää rantakaistan (kehän ääriviivaosa) viiva. Oikealla satama-allas on
        /// syvempi, jotta lautta mahtuu kääntymään.
        /// </summary>
        static void VbMeri(Rakentaja r)
        {
            const int palat = 14;
            float x0 = -0.5f, x1 = VbLaituriX;
            for (int i = 0; i < palat; i++)
            {
                float a = Mathf.Lerp(x0, x1, i / (float)palat), b = Mathf.Lerp(x0, x1, (i + 1) / (float)palat);
                r.NelioUlos(new Vector3(a, VbVesiY, VbMeriEtu(a)), new Vector3(b, VbVesiY, VbMeriEtu(b)), new Vector3(b, VbVesiY, VbVesiTaka),
                    new Vector3(a, VbVesiY, VbVesiTaka), Vector3.up, EmVesi);
            }
            // Satama-altaan lisäkaista meren etureunan edessä (VbSatamaX0 → laituri): neljä palaa.
            const int allas = 4;
            for (int i = 0; i < allas; i++)
            {
                float a = Mathf.Lerp(VbSatamaX0, x1, i / (float)allas), b = Mathf.Lerp(VbSatamaX0, x1, (i + 1) / (float)allas);
                r.NelioUlos(new Vector3(a, VbVesiY, VbAltaanEtu(a)), new Vector3(b, VbVesiY, VbAltaanEtu(b)), new Vector3(b, VbVesiY, VbMeriEtu(b)),
                    new Vector3(a, VbVesiY, VbMeriEtu(a)), Vector3.up, EmVesi);
            }
        }

        /// <summary>Meren etureuna kohdassa x: loiva aaltoilu, joka vain kaventaa palaa (syvyys pysyy alle 0,07).</summary>
        static float VbMeriEtu(float x)
        {
            // Satama-altaan kohdalla (x > 0,18) reuna on suora, jotta altaan palat kohtaavat meren palat saumatta.
            float a = 1f - Mathf.SmoothStep(0f, 1f, (x - 0.12f) / 0.06f);
            // Vasen pää kapenee loivasti karttaan (ei suoraa katkoa).
            float kapenee = 0.022f * Mathf.SmoothStep(0f, 1f, (-0.472f - x) / 0.028f);
            return VbVesiEtu + a * (0.0022f * (1f + Mathf.Sin(x * 9.1f + 0.4f)) + 0.0009f * (1f + Mathf.Sin(x * 23.7f))) + kapenee;
        }

        /// <summary>Satama-altaan etureuna: pyöristetty siirtymä meren reunasta altaan reunaan (VbSatamaX0 … +0,06).</summary>
        static float VbAltaanEtu(float x)
        {
            float t = Mathf.Clamp01((x - VbSatamaX0) / 0.06f);
            t = t * t * (3f - 2f * t);
            return Mathf.Lerp(VbMeriEtu(x), VbSatamaEtu + 0.0012f * Mathf.Sin(x * 31f), t);
        }

        /// <summary>
        /// Kaupungin pohja yhtenä ääriviivaosana: rantakaista (kävelykatu, Almedalenin nurmi ja satamalaituri), laituri
        /// oikealla, alakaupungin lattia, Klintenin rinne, ylempi kaupunki, maamuuri ja rantamuuri torneineen. Ääriviiva kiertää
        /// kehän ulkoreunaa ja rantakaistan etureunaa (jää veden alle), ei jokaista tornia erikseen.
        /// </summary>
        static void VbKaupunginPohja(Rakentaja r, bool lahi)
        {
            var linja = VbMuuriLinja();
            var ranta = VbRantaLinja();
            var ala = VbKlintAla(); var yla = VbKlintYla();
            r.AloitaOsa();
            VbRantakaista(r);
            // Alakaupungin lattia: rantamuuri (etureuna) ja takareuna (vasen sivumuuri, Klintenin juuri, oikea sivumuuri).
            var etu = new Vector3[ranta.Length];
            for (int i = 0; i < ranta.Length; i++) etu[i] = ranta[ranta.Length - 1 - i];
            var taka = new System.Collections.Generic.List<Vector3>();
            for (int i = 0; i <= 2; i++) taka.Add(linja[i]);
            foreach (var p in ala) taka.Add(p);
            for (int i = linja.Length - 3; i < linja.Length; i++) taka.Add(linja[i]);
            // Pohjoinen kolmannes (vasen) on puutarhojen ja raunioiden vihreää (1790-luvun kartalla peltoja ja puutarhoja), ydin
            // katujen harmaanruskeaa, jotta punaiset katot ja vaaleat seinät erottuvat.
            VbLeikkaa(etu, VbPuutarhaX, out var etuV, out var etuO);
            VbLeikkaa(taka.ToArray(), VbPuutarhaX, out var takaV, out var takaO);
            VbVetoketju(r, etuV, takaV, VbPuutarha);
            VbVetoketju(r, etuO, takaO, VbAlakaupunki);
            // Klintenin rinne juuresta yläreunaan.
            for (int i = 0; i + 1 < ala.Length; i++)
            {
                var m = (ala[i] + ala[i + 1]) * 0.5f - (yla[i] + yla[i + 1]) * 0.5f; m.y = 0f;
                var ulos = Vector3.up * 0.6f + m.normalized;
                r.NelioUlos(ala[i], ala[i + 1], yla[i + 1], yla[i], ulos, VbKlint);
                if (!lahi) continue;
                // Lähitaso: kalkkikiven penger rinteen puolivälissä (tummempi vyö hieman pinnan edessä).
                var o = ulos.normalized * 0.0007f;
                r.NelioUlos(Vector3.Lerp(ala[i], yla[i], 0.42f) + o, Vector3.Lerp(ala[i + 1], yla[i + 1], 0.42f) + o, Vector3.Lerp(ala[i + 1], yla[i + 1], 0.6f) + o,
                    Vector3.Lerp(ala[i], yla[i], 0.6f) + o, ulos, VbKlintPenger);
            }
            // Ylempi kaupunki: Klintenin yläreuna ja maamuurin keskilinja sen päiden välillä.
            var ylaTaka = new System.Collections.Generic.List<Vector3>();
            for (int i = 4; i <= linja.Length - 5; i++) ylaTaka.Add(linja[i]);
            VbVetoketju(r, yla, ylaTaka.ToArray(), VbPuutarha);
            // Muurit ja tornit.
            VbMuuri(r, linja, VbMuuriH, VbMuuriP, VbKalkki, VbKalkkiYla, lahi);
            VbMuuri(r, ranta, VbRantamuuriH, VbRantamuuriP, VbKalkki, VbKalkkiYla, lahi);
            VbTornit(r, linja, lahi);
            if (lahi) VbLhRanta(r, ranta);
            r.LopetaOsa();
        }

        /// <summary>Puutarhavyöhykkeen raja: alakaupungin lattia on vihreää tästä vasemmalle.</summary>
        const float VbPuutarhaX = -0.235f;

        /// <summary>X:n suhteen monotonisen viivan jako kohdassa x: vasen osa päättyy ja oikea alkaa leikkauspisteeseen (y
        /// interpoloitu).</summary>
        static void VbLeikkaa(Vector3[] v, float x, out Vector3[] vasen, out Vector3[] oikea)
        {
            var a = new System.Collections.Generic.List<Vector3>(); var b = new System.Collections.Generic.List<Vector3>();
            for (int i = 0; i < v.Length; i++)
            {
                if (v[i].x < x) a.Add(v[i]);
                if (i + 1 < v.Length && v[i].x < x && v[i + 1].x >= x)
                {
                    var p = Vector3.Lerp(v[i], v[i + 1], (x - v[i].x) / Mathf.Max(1e-6f, v[i + 1].x - v[i].x));
                    a.Add(p); b.Add(p);
                }
                if (v[i].x >= x) b.Add(v[i]);
            }
            vasen = a.ToArray(); oikea = b.ToArray();
        }

        /// <summary>
        /// Kahden x:n suhteen monotonisen viivan välinen kolmiointi (vetoketju): viivat alkavat ja päättyvät samaan pisteeseen tai
        /// päiden välissä on sivu. Etupuoli ylös.
        /// </summary>
        static void VbVetoketju(Rakentaja r, Vector3[] etu, Vector3[] taka, Color vari)
        {
            int i = 0, j = 0;
            while (i < etu.Length - 1 || j < taka.Length - 1)
            {
                bool etuun = j >= taka.Length - 1 || (i < etu.Length - 1 && etu[i + 1].x <= taka[j + 1].x);
                if (etuun) { r.KolmioUlos(etu[i], etu[i + 1], taka[j], Vector3.up, vari); i++; }
                else { r.KolmioUlos(etu[i], taka[j + 1], taka[j], Vector3.up, vari); j++; }
            }
        }

        /// <summary>
        /// Rantakaista rantamuurin ja veden välissä (veden takareunasta muurin keskilinjaan): vasemmalla kävelykatu, keskellä
        /// Almedalenin nurmi Kruttornetin oikealla puolella ja oikealla satamalaituri.
        /// </summary>
        static void VbRantakaista(Rakentaja r)
        {
            float[] asemat = { -0.5f, -0.472f, -0.3f, -0.16f, -0.075f, 0.02f, 0.11f, VbSatamaX0, 0.33f, VbLaituriX };
            var ranta = VbRantaLinja();
            var viiva = new Vector3[ranta.Length];
            for (int i = 0; i < ranta.Length; i++) viiva[i] = ranta[ranta.Length - 1 - i];
            for (int i = 0; i + 1 < asemat.Length; i++)
            {
                float a = asemat[i], b = asemat[i + 1], xm = (a + b) * 0.5f;
                var vari = xm < -0.075f ? VbPromenadi : xm < VbSatamaX0 ? VbAlmedalen : EmKiviVaalea;
                float za = VbViivaZ(viiva, a), zb = VbViivaZ(viiva, b);
                r.NelioUlos(new Vector3(a, VbRantaY, VbVesiTaka), new Vector3(b, VbRantaY, VbVesiTaka), new Vector3(b, VbRantaY, zb),
                    new Vector3(a, VbRantaY, za), Vector3.up, vari);
            }
        }

        /// <summary>
        /// Laituri (aallonmurtaja) altaan oikeana reunana muurin lounaiskulmasta mallin etureunaan: kolmena lyhyenä palana (kukin alle
        /// ääriviivan kynnyksen), jotta satamaa ei kehystä tumma viiva (veden opetus: ei tummaa rantakaistaa). Yläpinta, altaan puoli
        /// ja pää (ulkosivu on kartan puolella, eikä sitä näe kamerasta).
        /// </summary>
        static void VbLaituri(Rakentaja r)
        {
            float x0 = VbLaituriX, x1 = VbLaituriX + 0.022f, y = 0.0055f;
            float z1 = VbRantamuuri[0].z - 0.004f, z0 = VbSatamaEtu - 0.003f;
            const int palat = 3;
            for (int i = 0; i < palat; i++)
            {
                float a = Mathf.Lerp(z0, z1, i / (float)palat), b = Mathf.Lerp(z0, z1, (i + 1) / (float)palat);
                r.NelioUlos(new Vector3(x0, y, a), new Vector3(x1, y, a), new Vector3(x1, y, b), new Vector3(x0, y, b), Vector3.up, EmKiviVaalea);
                r.NelioUlos(new Vector3(x0, 0f, a), new Vector3(x0, 0f, b), new Vector3(x0, y, b), new Vector3(x0, y, a), Vector3.left, EmKivi);
            }
            r.NelioUlos(new Vector3(x0, 0f, z0), new Vector3(x1, 0f, z0), new Vector3(x1, y, z0), new Vector3(x0, y, z0), Vector3.back, EmKivi);
        }

        /// <summary>
        /// Muuri keskilinjaa pitkin (pisteiden y = maaston korkeus sisäpuolella): sisäpinta maastosta harjaan (upotettu hieman
        /// maaston alle), ulkopinta kartan tasosta harjaan ja harja. Taitteissa viistetyt kulmat (jiiri), joten kaaressa ei ole
        /// rakoja. 6 kolmiota segmentiltä.
        /// </summary>
        static void VbMuuri(Rakentaja r, Vector3[] pts, float h, float p, Color sivu, Color harja, bool lahi = false)
        {
            int n = pts.Length;
            var sis = new Vector3[n]; var ulk = new Vector3[n];
            for (int i = 0; i < n; i++)
            {
                var d0 = i > 0 ? VbSuunta(pts[i - 1], pts[i]) : VbSuunta(pts[i], pts[i + 1]);
                var d1 = i < n - 1 ? VbSuunta(pts[i], pts[i + 1]) : d0;
                Vector3 n0 = Vector3.Cross(Vector3.up, d0), n1 = Vector3.Cross(Vector3.up, d1);
                var nm = (n0 + n1).normalized;
                float k = 1f / Mathf.Max(0.5f, Vector3.Dot(nm, n0));
                var c = new Vector3(pts[i].x, 0f, pts[i].z);
                sis[i] = c + nm * (p * 0.5f * k); ulk[i] = c - nm * (p * 0.5f * k);
            }
            for (int i = 0; i + 1 < n; i++)
            {
                float y0 = pts[i].y, y1 = pts[i + 1].y;
                var nIn = Vector3.Cross(Vector3.up, VbSuunta(pts[i], pts[i + 1]));
                Vector3 t0 = Vector3.up * (y0 + h), t1 = Vector3.up * (y1 + h);
                r.NelioUlos(sis[i] + Vector3.up * (y0 - 0.004f), sis[i + 1] + Vector3.up * (y1 - 0.004f), sis[i + 1] + t1, sis[i] + t0, nIn, sivu);
                r.NelioUlos(ulk[i], ulk[i + 1], ulk[i + 1] + t1, ulk[i] + t0, -nIn, sivu);
                if (!lahi) { r.NelioUlos(sis[i] + t0, sis[i + 1] + t1, ulk[i + 1] + t1, ulk[i] + t0, Vector3.up, harja); continue; }
                // Lähitaso: rintavarustus ulkoreunalla (0,004 korkeampi, puolet paksuudesta) ja kulkutie sisäpuolella.
                Vector3 m0 = (sis[i] + ulk[i]) * 0.5f, m1 = (sis[i + 1] + ulk[i + 1]) * 0.5f, r4 = Vector3.up * 0.004f;
                r.NelioUlos(sis[i] + t0, sis[i + 1] + t1, m1 + t1, m0 + t0, Vector3.up, VbTorninSisus);
                r.NelioUlos(m0 + t0, m1 + t1, m1 + t1 + r4, m0 + t0 + r4, nIn, sivu);
                r.NelioUlos(m0 + t0 + r4, m1 + t1 + r4, ulk[i + 1] + t1 + r4, ulk[i] + t0 + r4, Vector3.up, harja);
                r.NelioUlos(ulk[i] + t0, ulk[i + 1] + t1, ulk[i + 1] + t1 + r4, ulk[i] + t0 + r4, -nIn, sivu);
            }
        }

        /// <summary>Suunnattu laatikko: keskipiste c (y ohitetaan), akselit u ja v (vaaka, yksikkö), rajat u0…u1 ja v0…v1,
        /// korkeus y0…y1; neljä sivua ja katto. 10 kolmiota.</summary>
        static void VbKappale(Rakentaja r, Vector3 c, Vector3 u, Vector3 v, float u0, float u1, float v0, float v1, float y0, float y1,
            Color sivu, Color katto, bool kansi = true)
        {
            c.y = 0f;
            Vector3 A = c + u * u0 + v * v0, B = c + u * u1 + v * v0, C = c + u * u1 + v * v1, D = c + u * u0 + v * v1;
            Vector3 p0 = Vector3.up * y0, p1 = Vector3.up * y1;
            var keski = (A + C) * 0.5f + Vector3.up * ((y0 + y1) * 0.5f);
            r.NelioKeskelta(A + p0, B + p0, B + p1, A + p1, keski, sivu);
            r.NelioKeskelta(B + p0, C + p0, C + p1, B + p1, keski, sivu);
            r.NelioKeskelta(C + p0, D + p0, D + p1, C + p1, keski, sivu);
            r.NelioKeskelta(D + p0, A + p0, A + p1, D + p1, keski, sivu);
            if (kansi) r.NelioUlos(A + p1, B + p1, C + p1, D + p1, Vector3.up, katto);
        }

        /// <summary>Muuritornin laji: 0 avoin neliötorni, 1 porttitorni (kaari), 2 satulakattoinen, 3 matala raunio.</summary>
        struct VbTorniTieto { public float S, Leveys, Korkeus; public int Laji; }

        /// <summary>
        /// Maamuurin tornit kaarenpituuden kohdissa (s mallin yksiköissä VbMuuriLinjan alusta, pituus noin 1,37): S:t Göransporten
        /// 0,17, Långa Lisa 0,21 (korkein), Norderport 0,265, Dalmanstornet 0,44 (satulakatto), Österport 0,72, Kvarntornet 0,87
        /// (satulakatto), Kajsartornet 0,95, Söderport 1,107 (matala, 6,5 m säilynyt) ja Skansportin torni 1,29.
        /// </summary>
        static readonly VbTorniTieto[] VbTornitaulu =
        {
            new VbTorniTieto { S = 0.088f, Leveys = VbTorniL, Korkeus = 0.058f, Laji = 0 },
            new VbTorniTieto { S = 0.170f, Leveys = 0.027f, Korkeus = 0.064f, Laji = 1 },
            new VbTorniTieto { S = 0.212f, Leveys = VbTorniL, Korkeus = 0.078f, Laji = 0 },
            new VbTorniTieto { S = 0.265f, Leveys = 0.03f, Korkeus = 0.07f, Laji = 1 },
            new VbTorniTieto { S = 0.345f, Leveys = VbTorniL, Korkeus = 0.062f, Laji = 0 },
            new VbTorniTieto { S = 0.440f, Leveys = 0.028f, Korkeus = 0.07f, Laji = 2 },
            new VbTorniTieto { S = 0.525f, Leveys = VbTorniL, Korkeus = 0.06f, Laji = 0 },
            new VbTorniTieto { S = 0.615f, Leveys = VbTorniL, Korkeus = 0.064f, Laji = 0 },
            new VbTorniTieto { S = 0.720f, Leveys = 0.03f, Korkeus = 0.074f, Laji = 1 },
            new VbTorniTieto { S = 0.800f, Leveys = VbTorniL, Korkeus = 0.06f, Laji = 0 },
            new VbTorniTieto { S = 0.872f, Leveys = VbTorniL, Korkeus = 0.062f, Laji = 2 },
            new VbTorniTieto { S = 0.950f, Leveys = 0.03f, Korkeus = 0.068f, Laji = 0 },
            new VbTorniTieto { S = 1.030f, Leveys = VbTorniL, Korkeus = 0.06f, Laji = 0 },
            new VbTorniTieto { S = 1.107f, Leveys = 0.028f, Korkeus = 0.046f, Laji = 1 },
            new VbTorniTieto { S = 1.190f, Leveys = VbTorniL, Korkeus = 0.058f, Laji = 0 },
            new VbTorniTieto { S = 1.290f, Leveys = VbTorniL, Korkeus = 0.054f, Laji = 0 },
        };

        /// <summary>Tornin paikka ja suunta muurilla: c (y = maasto), d muurin suunta, v sisäänpäin.</summary>
        static void VbTorninPaikka(Vector3[] linja, float s, out Vector3 c, out Vector3 d, out Vector3 v)
        {
            VbViivalla(linja, s, out c, out d);
            v = Vector3.Cross(Vector3.up, d);
        }

        /// <summary>
        /// Tornit: maamuurin tornit taulukosta, kehän kulmatornit (Silverhättan–Snäckgärdsporten vasemmalla, Segeltornetin kivijalka
        /// oikealla), Jungfrutornet ja Kruttornet rantamuurissa. Tornit ovat muurin päällä ulospäin työntyviä laatikoita kartan
        /// tasosta harjaan; avoimen tornin yläpinta on tumma sisus.
        /// </summary>
        static void VbTornit(Rakentaja r, Vector3[] linja, bool lahi)
        {
            foreach (var t in VbTornitaulu)
            {
                VbTorninPaikka(linja, t.S, out var c, out var d, out var v);
                float yh = c.y + t.Korkeus;
                float v0 = -(VbMuuriP * 0.5f + VbTorniUlos), v1 = VbMuuriP * 0.5f + VbTorniSisaan;
                VbKappale(r, c, d, v, -t.Leveys * 0.5f, t.Leveys * 0.5f, v0, v1, 0f, yh, VbKalkki, VbTorninSisus, t.Laji != 2);
                if (t.Laji == 2)
                {
                    // Satulakatto: harja muuria vastaan kohtisuoraan (päädyt ulos ja kaupunkiin).
                    VbSatulakatto(r, c + v * ((v0 + v1) * 0.5f), v, d, (v1 - v0) + 0.003f, t.Leveys + 0.003f, yh, 0.02f, VbTiili, VbKalkki);
                }
                if (t.Laji == 1 && !lahi)
                {
                    // Porttiaukko kaupungin puolella (kärkiväri).
                    var sisa = c + v * v1; sisa.y = 0f;
                    r.Laatta(sisa + Vector3.up * (c.y + 0.011f), v, t.Leveys * 0.45f, 0.022f, EmMuste);
                }
                if (lahi) VbLhTorni(r, c, d, v, t.Leveys, t.Korkeus, t.Laji, v0, v1);
            }
            if (lahi)
                foreach (float st in VbSatulatornit) VbLhSatulatorni(r, linja, st);
            // Kulmatorni vasemmalla (Silverhättan ja Snäckgärdsporten) ja Segeltornetin kivijalka oikealla.
            var w0 = linja[0]; var wn = linja[linja.Length - 1];
            VbKappale(r, w0, Vector3.right, Vector3.forward, -0.016f, 0.016f, -0.016f, 0.016f, 0f, w0.y + 0.062f, VbKalkki, VbTorninSisus);
            VbKappale(r, wn, Vector3.right, Vector3.forward, -0.014f, 0.014f, -0.014f, 0.014f, 0f, wn.y + 0.03f, VbKalkki, VbKalkkiYla);
            // Jungfrutornet rantamuurissa lähellä vasenta kulmaa.
            var jp = VbJungfrutornet;
            VbKappale(r, jp, Vector3.right, Vector3.forward, -0.011f, 0.011f, -0.012f, 0.01f, 0f, VbAlaKorkeus(jp.z) + 0.05f, VbKalkki, VbTorninSisus);
            // Kruttornet (noin 1160, satamaa vartioinut kastal): tukeva neliötorni ja tiilinen pyramidikatto.
            var kp = VbRantamuuri[2];
            float kh = 0.07f;
            VbKappale(r, kp, Vector3.right, Vector3.forward, -0.017f, 0.017f, -0.018f, 0.016f, 0f, kh, VbKalkki, VbKalkki, false);
            if (lahi) r.PyramidiRaystas(kp + new Vector3(0f, kh, -0.001f), 0.037f, 0.037f, 0.034f, VbTiili, VbTiiliVaalea, 0.16f);
            else r.Pyramidi(kp + new Vector3(0f, kh, -0.001f), 0.037f, 0.037f, 0.034f, VbTiili);
            if (!lahi) return;
            // Lähitaso: kulmatornin ja Jungfrutornetin ampumaraot ja sakaroiden välit meren puolella, Kruttornetin luukku noin
            // kymmenen metrin korkeudella (ainoa sisäänkäynti, tikkaat vedettiin ylös) ja kapeat ikkunat.
            VbLhTorni(r, new Vector3(w0.x, w0.y, w0.z), Vector3.right, Vector3.forward, 0.032f, 0.062f, 3, -0.016f, 0.016f);
            VbLhTorni(r, new Vector3(jp.x, VbAlaKorkeus(jp.z), jp.z), Vector3.right, Vector3.forward, 0.022f, 0.05f, 3, -0.012f, 0.01f);
            var ke = new Vector3(kp.x, 0f, kp.z - 0.018f);
            r.Laatta(ke + Vector3.up * 0.03f, Vector3.back, 0.006f, 0.008f, EmMuste);
            foreach (float dx in new[] { -0.009f, 0.009f })
                r.Laatta(ke + new Vector3(dx, 0.052f, 0f), Vector3.back, 0.0025f, 0.01f, EmMuste);
            r.Laatta(ke + new Vector3(0f, 0.052f, 0f), Vector3.back, 0.0025f, 0.01f, EmMuste);
            foreach (float dz in new[] { -0.006f, 0.006f })
                r.Laatta(new Vector3(kp.x - 0.017f, 0.046f, kp.z + dz), Vector3.left, 0.0025f, 0.01f, EmMuste);
        }

        /// <summary>Satulatornien paikat maamuurilla (kaarenpituus; 1350-luvun pienet tornit muurin harjalla, yhdeksän säilynyt).</summary>
        static readonly float[] VbSatulatornit = { 0.128f, 0.392f, 0.570f, 0.665f, 0.836f, 1.068f, 1.24f };

        /// <summary>
        /// Lähitason muuritorni: avoin takaseinä kaupungin puolella (Visbyn tornit ovat sisäpuolelta avoimia: tumma syvennys ja
        /// kaksi välipohjaa), ampumaraot sivuilla ja ulkona, sakaroiden välit huipun reunoilla ja porttitorneissa holvikaaret
        /// molemmin puolin. laji 3 = kehän kulmatorni (ei avointa takaseinää).
        /// </summary>
        static void VbLhTorni(Rakentaja r, Vector3 c, Vector3 d, Vector3 v, float L, float H, int laji, float v0, float v1)
        {
            var ch = new Vector3(c.x, 0f, c.z);
            float y0 = c.y, yh = c.y + H;
            var sisa = ch + v * v1; var ulko = ch + v * v0;
            if (laji == 0)
            {
                float a = y0 + 0.012f, b = yh - 0.009f;
                r.Laatta(sisa + Vector3.up * ((a + b) * 0.5f), v, L * 0.6f, b - a, VbTorninSisus);
                foreach (float f in new[] { 0.36f, 0.68f })
                    r.Laatta(sisa + v * 0.0006f + Vector3.up * Mathf.Lerp(a, b, f), v, L * 0.6f, 0.0022f, VbKalkkiYla);
            }
            if (laji == 1)
            {
                r.Holvi(sisa + Vector3.up * (y0 + 0.013f), v, L * 0.46f, 0.026f, EmMuste);
                r.Holvi(ulko + Vector3.up * 0.013f, -v, L * 0.46f, 0.026f, EmMuste);
            }
            // Ampumaraot: sivut kahdessa kerroksessa ja ulkosivu.
            foreach (float sg in new[] { -1f, 1f })
            {
                var sp = ch + d * (sg * L * 0.5f) + v * ((v0 + v1) * 0.5f);
                foreach (float f in new[] { 0.45f, 0.72f })
                    r.Laatta(sp + Vector3.up * (y0 + H * f), d * sg, 0.0024f, 0.011f, EmMuste);
            }
            if (laji == 2) return;
            // Sakaroiden välit huipun reunalla: kaupungin puoli ja sivut (kaksi kummallakin).
            foreach (float f in new[] { -0.22f, 0.22f })
            {
                r.Laatta(sisa + d * (L * f) + Vector3.up * (yh - 0.0032f), v, 0.0055f, 0.0064f, VbTorninSisus);
                foreach (float sg in new[] { -1f, 1f })
                    r.Laatta(ch + d * (sg * L * 0.5f) + v * ((v0 + v1) * 0.5f + (v1 - v0) * f) + Vector3.up * (yh - 0.0032f), d * sg, 0.0055f, 0.0064f,
                        VbTorninSisus);
            }
        }

        /// <summary>Satulatorni: pieni avoin torni muurin harjalla (ratsastaa muurilla), kaarenpituuden kohdassa s.</summary>
        static void VbLhSatulatorni(Rakentaja r, Vector3[] linja, float s)
        {
            VbTorninPaikka(linja, s, out var c, out var d, out var v);
            float yt = c.y + VbMuuriH;
            VbKappale(r, c, d, v, -0.0075f, 0.0075f, -(VbMuuriP * 0.5f + 0.004f), VbMuuriP * 0.5f + 0.0015f, yt - 0.01f, yt + 0.012f, VbKalkki, VbTorninSisus);
            var sisa = new Vector3(c.x, 0f, c.z) + v * (VbMuuriP * 0.5f + 0.0015f);
            r.Laatta(sisa + Vector3.up * (yt + 0.003f), v, 0.009f, 0.012f, VbTorninSisus);
        }

        /// <summary>
        /// Lähitason ranta: rantamuurin rintavarustuksen sakaranvälit meren puolella, rantamuurin portit (Kärleksporten 1872,
        /// Fiskarporten ja Lilla Strandporten holvikaarina), lauttalaiturin ramppi laituripaikalla, pollarit laiturin reunassa,
        /// matala satamamakasiini ja Almedalenin lampi (vanhan hansasataman paikka).
        /// </summary>
        static void VbLhRanta(Rakentaja r, Vector3[] ranta)
        {
            for (int i = 0; i + 1 < ranta.Length; i++)
            {
                var a = ranta[i]; var b = ranta[i + 1];
                var dd = VbSuunta(a, b); var n = -Vector3.Cross(Vector3.up, dd);   // ulos (mereen päin)
                var e = b - a; e.y = 0f;
                int kpl = Mathf.Max(1, (int)(e.magnitude / 0.03f));
                for (int k = 0; k < kpl; k++)
                {
                    float f = (k + 0.5f) / kpl;
                    var q = Vector3.Lerp(a, b, f);
                    if (Mathf.Abs(q.x - VbRantamuuri[2].x) < 0.03f || Mathf.Abs(q.x - VbJungfrutornet.x) < 0.02f) continue;
                    var pnt = new Vector3(q.x, 0f, q.z) + n * (VbRantamuuriP * 0.5f);
                    r.Laatta(pnt + Vector3.up * (q.y + VbRantamuuriH + 0.0012f), n, 0.0055f, 0.0056f, VbTorninSisus);
                }
            }
            foreach (float x in new[] { -0.205f, -0.058f, 0.02f })
            {
                float z = VbViivaZ(VbRantaVasemmalta(), x);
                r.Holvi(new Vector3(x, VbAlaKorkeus(z) + 0.0075f, z - VbRantamuuriP * 0.5f), Vector3.back, 0.009f, 0.013f, EmMuste);
            }
            // Lauttalaiturin ramppi ja pollarit.
            r.Laatikko(new Vector3(VbLaituriX - 0.0065f, VbVesiY, VbAltaanZ), new Vector3(0.013f, 0.004f, 0.015f), EmSeepia, EmKivi);
            foreach (float x in new[] { 0.245f, 0.3f, 0.355f, 0.41f })
                r.Laatikko(new Vector3(x, VbRantaY, VbVesiTaka + 0.0025f), new Vector3(0.0028f, 0.0045f, 0.0028f), EmMuste, EmSeepia);
            VbKappale(r, new Vector3(0.335f, 0f, -0.1545f), Vector3.right, Vector3.forward, -0.03f, 0.03f, -0.006f, 0.006f, VbRantaY, VbRantaY + 0.011f,
                VbSeinaHarmaa, VbTiiliTumma);
            // Almedalenin lampi.
            var lc = new Vector3(0.07f, VbRantaY + 0.0005f, -0.158f);
            for (int i = 0; i < 6; i++)
            {
                float a0 = i * Mathf.PI / 3f, a1 = (i + 1) * Mathf.PI / 3f;
                r.KolmioUlos(lc, lc + new Vector3(Mathf.Cos(a0) * 0.022f, 0f, Mathf.Sin(a0) * 0.0055f), lc + new Vector3(Mathf.Cos(a1) * 0.022f, 0f, Mathf.Sin(a1) * 0.0055f),
                    Vector3.up, EmVesi);
            }
        }

        /// <summary>Rantamuurin keskilinja vasemmalta oikealle (x kasvaa).</summary>
        static Vector3[] VbRantaVasemmalta()
        {
            var v = new Vector3[VbRantamuuri.Length];
            for (int i = 0; i < v.Length; i++) v[i] = VbRantamuuri[VbRantamuuri.Length - 1 - i];
            return v;
        }

        /// <summary>Satulakatto: keskipiste c räystään tasolla y, harjan suunta hs (vaaka), pituus harjan suunnassa, leveys ja
        /// harjan korkeus. Lappeet ja päätykolmiot. 6 kolmiota.</summary>
        static void VbSatulakatto(Rakentaja r, Vector3 c, Vector3 hs, Vector3 poikki, float pituus, float leveys, float y, float kork,
            Color katto, Color paaty)
        {
            c.y = y;
            Vector3 a = hs * (pituus * 0.5f), b = poikki * (leveys * 0.5f), h = Vector3.up * kork;
            Vector3 A = c - a - b, B = c + a - b, C = c + a + b, D = c - a + b, H0 = c - a + h, H1 = c + a + h;
            var keski = c + h * 0.3f;
            r.NelioKeskelta(A, B, H1, H0, keski, katto);
            r.NelioKeskelta(D, C, H1, H0, keski, katto);
            r.KolmioKeskelta(A, D, H0, keski, paaty);
            r.KolmioKeskelta(B, C, H1, keski, paaty);
        }

        /// <summary>
        /// Pyhän Marian tuomiokirkko Klintenin juurella: pitkä kivinen kirkko jyrkkine kattoineen (akseli todellinen länsi–itä
        /// käännettynä: länsipää edessä oikealla), neliömäinen länsitorni ja kaksi hoikkaa itätornia kuorin ja laivan kulmissa;
        /// kaikissa musta barokkihuppu (länsitorni 58 m ja itätornit 54,5 m, sv-Wikipedia).
        /// </summary>
        static void VbTuomiokirkko(Rakentaja r, bool lahi)
        {
            var c = VbTuomiokirkonPaikka;
            float y0 = VbAlaKorkeus(c.z) - 0.002f;
            var e = VbKirkonAkseli;                                 // länsi → itä
            var s = Vector3.Cross(Vector3.up, e);                     // poikittain
            float suunta = (float)Math.Atan2(e.z, e.x);
            // Laiva ja kuori (katot harjan suunnassa, jyrkät ja korkeat kuten Visbyssä).
            var laiva = c - e * 0.004f; laiva.y = y0;
            r.Talo(laiva, suunta, 0.044f, 0.036f, 0.036f, 0.03f, VbKirkko, VbKirkkoKatto);
            var kuori = c + e * 0.026f; kuori.y = y0;
            r.Talo(kuori, suunta, 0.016f, 0.024f, 0.032f, 0.022f, VbKirkko, VbKirkkoKatto);
            // Länsitorni ja sen kolmiosainen huppu (kello, kaula ja piikki).
            var lt = c - e * 0.037f;
            float th = 0.115f;
            VbKappale(r, lt, e, s, -0.011f, 0.011f, -0.011f, 0.011f, y0, y0 + th, VbKirkko, VbKirkko);
            VbHuppu(r, lt + Vector3.up * (y0 + th), 0.0125f, 0.066f, lahi, suunta + Mathf.PI / 4f);
            // Itätornit kuorin ja laivan kulmissa (kahdeksankulmaiset, hoikat).
            foreach (float sg in new[] { -1f, 1f })
            {
                var it = c + e * 0.018f + s * (sg * 0.02f); it.y = y0;
                r.Vaippa(it, 0.0072f, 0.0068f, 0.105f, lahi ? 8 : 6, VbKirkko, lahi ? Mathf.PI / 8f : Mathf.PI / 6f);
                VbHuppu(r, it + Vector3.up * 0.105f, 0.0078f, 0.056f, lahi, Mathf.PI / 6f, false);
                if (!lahi) continue;
                // Kellokerroksen aukot kameran puolella.
                foreach (var nn in new[] { -s, -e })
                    r.Laatta(it + nn * 0.0068f + Vector3.up * 0.086f, nn, 0.0028f, 0.011f, EmMuste);
            }
            if (!lahi) return;
            // Lähitaso: laivan pohjoissivun (kameran puoli) suippokaari-ikkunat, kuorin ikkunat, länsitornin portaali ja
            // kellokerroksen aukot sekä lombardinauha laivan räystään alla.
            for (int k = 0; k < 4; k++)
            {
                var q = c - e * 0.004f + e * (-0.0165f + 0.011f * k) - s * 0.018f; q.y = y0 + 0.019f;
                VbLhSuippo(r, q, -s, 0.0055f, 0.022f, EmMuste);
            }
            var kq = c + e * 0.026f - s * 0.012f; kq.y = y0 + 0.017f;
            VbLhSuippo(r, kq, -s, 0.005f, 0.018f, EmMuste);
            var ke = c + e * 0.034f; ke.y = y0 + 0.018f;
            VbLhSuippo(r, ke, e, 0.008f, 0.022f, EmMuste);
            var lombardi = c - e * 0.004f - s * 0.018f; lombardi.y = y0 + 0.0325f;
            r.Laatta(lombardi, -s, 0.042f, 0.0018f, VbTorninSisus);
            var wf = lt - e * 0.011f; wf.y = y0 + 0.011f;
            r.Holvi(wf, -e, 0.008f, 0.017f, EmMuste);
            foreach (var (nn, tt) in new[] { (-e, s), (-s, e) })
                foreach (float f in new[] { -0.26f, 0.26f })
                {
                    var q = lt + nn * 0.011f + tt * (0.022f * f); q.y = y0 + th - 0.016f;
                    r.Laatta(q, nn, 0.0038f, 0.013f, EmMuste);
                }
        }

        /// <summary>Suippokaaren muotoinen aukko pinnassa (p = keskipiste, ulos, leveys ja korkeus kärki mukaan lukien). 4 kolmiota.</summary>
        static void VbLhSuippo(Rakentaja r, Vector3 p, Vector3 ulos, float leveys, float korkeus, Color vari)
        {
            var n = new Vector3(ulos.x, 0f, ulos.z).normalized;
            var t = Vector3.Cross(Vector3.up, n);
            float w = leveys * 0.5f, suora = korkeus - leveys * 0.8f;
            var q = p + n * 0.0015f - Vector3.up * (korkeus * 0.5f);
            Vector3 a0 = q - t * w, a1 = q + t * w, b1 = a1 + Vector3.up * suora, b0 = a0 + Vector3.up * suora;
            r.NelioUlos(a0, a1, b1, b0, n, vari);
            var karki = q + Vector3.up * korkeus;
            var h0 = b0 + t * (w * 0.18f) + Vector3.up * (leveys * 0.42f);
            var h1 = b1 - t * (w * 0.18f) + Vector3.up * (leveys * 0.42f);
            r.NelioUlos(b0, b1, h1, h0, n, vari);
            r.KolmioUlos(h0, h1, karki, n, vari);
        }

        /// <summary>Tuomiokirkon keskipiste (Klintenin juurella, OpenStreetMap käännettynä).</summary>
        static Vector3 VbTuomiokirkonPaikka => VbP(-0.19f, 0.076f);

        /// <summary>Tuomiokirkon akseli (todellinen länsi → itä käännettynä 116°: taakse vasemmalle).</summary>
        static Vector3 VbKirkonAkseli => new Vector3(-0.438f, 0f, 0.899f);

        /// <summary>
        /// Musta barokkihuppu (pohja p, säde ja korkeus, a0 = ensimmäisen kärjen suunta). Rungossa nelitahkoinen kapeneva kello ja
        /// piikki (12 kolmiota). Lähitasossa kahdeksankulmainen: pullistuva kello, kaula, lyhty ja piikki (kuten länsitornin
        /// kolmikerroksinen huppu 1746 ja itätornien huput 1761).
        /// </summary>
        static void VbHuppu(Rakentaja r, Vector3 p, float sade, float kork, bool lahi, float a0, bool lyhty = true)
        {
            if (!lahi)
            {
                r.Vaippa(p, sade, sade * 0.32f, kork * 0.36f, 4, EmMuste, a0);
                VbPiikki(r, p + Vector3.up * (kork * 0.36f), sade * 0.32f, kork * 0.64f, 4, a0);
                return;
            }
            if (!lyhty)
            {
                // Itätornien hoikka huppu: kuusikulmainen pullistuva kello ja pitkä piikki.
                r.Vaippa(p, sade, sade * 1.12f, kork * 0.14f, 6, EmMuste, a0);
                r.Vaippa(p + Vector3.up * (kork * 0.14f), sade * 1.12f, sade * 0.3f, kork * 0.24f, 6, EmMuste, a0);
                VbPiikki(r, p + Vector3.up * (kork * 0.38f), sade * 0.3f, kork * 0.62f, 6, a0);
                return;
            }
            const int n = 8;
            float b0 = a0 + Mathf.PI / 8f;
            r.Vaippa(p, sade, sade * 1.14f, kork * 0.12f, n, EmMuste, b0);
            r.Vaippa(p + Vector3.up * (kork * 0.12f), sade * 1.14f, sade * 0.42f, kork * 0.2f, n, EmMuste, b0);
            r.Vaippa(p + Vector3.up * (kork * 0.32f), sade * 0.42f, sade * 0.38f, kork * 0.12f, n, VbTorninSisus, b0);
            r.Vaippa(p + Vector3.up * (kork * 0.44f), sade * 0.46f, sade * 0.2f, kork * 0.1f, n, EmMuste, b0);
            VbPiikki(r, p + Vector3.up * (kork * 0.54f), sade * 0.2f, kork * 0.46f, n, b0);
        }

        /// <summary>Piikki: kartio pohjasta p säteellä sade korkeuteen kork (n sivua, mustetta).</summary>
        static void VbPiikki(Rakentaja r, Vector3 p, float sade, float kork, int n, float a0)
        {
            var k = p + Vector3.up * kork; var kk = p + Vector3.up * (kork * 0.25f);
            for (int i = 0; i < n; i++)
            {
                float a = a0 + i * Mathf.PI * 2f / n, b = a0 + (i + 1) * Mathf.PI * 2f / n;
                r.KolmioKeskelta(p + new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a)) * sade, p + new Vector3(Mathf.Cos(b), 0f, Mathf.Sin(b)) * sade, k, kk, EmMuste);
            }
        }

        /// <summary>Raunio: keskipiste, akseli (länsi → itä), pituus, leveys, seinän korkeus, päätykolmion korkeus ja torni
        /// (0 ei, 1 länsitorni).</summary>
        struct VbRaunioTieto { public float X, Z, Pituus, Leveys, Korkeus, Paaty; public int Torni; }

        /// <summary>
        /// Kirkkojen rauniot (paikat OpenStreetMapista käännettyinä): S:ta Karin Stora torgetin oikealla puolella, S:t Nicolai
        /// vasemmalla, Drotten ja S:t Lars rinnakkain torin edessä, S:t Clemens ja S:t Hans ja S:t Per oikealla.
        /// </summary>
        static readonly VbRaunioTieto[] VbRauniotaulu =
        {
            new VbRaunioTieto { X = -0.003f, Z = 0.074f, Pituus = 0.046f, Leveys = 0.026f, Korkeus = 0.03f, Paaty = 0.02f, Torni = 0 },
            new VbRaunioTieto { X = -0.34f, Z = 0.033f, Pituus = 0.056f, Leveys = 0.024f, Korkeus = 0.03f, Paaty = 0.018f, Torni = 0 },
            new VbRaunioTieto { X = -0.136f, Z = 0.010f, Pituus = 0.03f, Leveys = 0.016f, Korkeus = 0.022f, Paaty = 0.01f, Torni = 1 },
            new VbRaunioTieto { X = -0.100f, Z = 0.018f, Pituus = 0.028f, Leveys = 0.018f, Korkeus = 0.022f, Paaty = 0.01f, Torni = 1 },
            new VbRaunioTieto { X = 0.168f, Z = 0.036f, Pituus = 0.046f, Leveys = 0.028f, Korkeus = 0.02f, Paaty = 0.008f, Torni = 0 },
        };

        static void VbRauniot(Rakentaja r, bool lahi)
        {
            for (int i = 0; i < VbRauniotaulu.Length; i++) VbRaunioRakenna(r, VbRauniotaulu[i], lahi, i);
        }

        /// <summary>
        /// Katoton kirkko: nurmilattia, pitkät seinät ja päätyseinät paksuina laattoina (sisä-, ulko- ja yläpinta), päädyissä
        /// suippo kolmio; länsitornillinen raunio saa tornin länsipäähän.
        /// </summary>
        static void VbRaunioRakenna(Rakentaja r, VbRaunioTieto t, bool lahi, int nro)
        {
            var c = VbP(t.X, t.Z);
            float y0 = VbMaasto(t.X, t.Z) - 0.002f;
            var e = VbKirkonAkseli; var s = Vector3.Cross(Vector3.up, e);
            float L = t.Pituus * 0.5f, W = t.Leveys * 0.5f, p = 0.0045f, h = t.Korkeus;
            // Lattia (nurmi).
            Vector3 A = c - e * L - s * W, B = c + e * L - s * W, C = c + e * L + s * W, D = c - e * L + s * W;
            var yl = Vector3.up * (y0 + 0.0025f);
            r.NelioUlos(A + yl, B + yl, C + yl, D + yl, Vector3.up, VbNurmi);
            // Seinät: pitkät sivut (±s) ja päädyt (±e).
            VbRaunioSeina(r, A, B, s, p, y0, h, 0f, true);
            VbRaunioSeina(r, C, D, -s, p, y0, h, 0f, true);
            VbRaunioSeina(r, B, C, -e, p, y0, h, t.Paaty, lahi);
            VbRaunioSeina(r, D, A, e, p, y0, h, t.Paaty, lahi);
            if (t.Torni == 1)
            {
                var tp = c - e * (L + 0.006f);
                VbKappale(r, tp, e, s, -0.007f, 0.007f, -0.007f, 0.007f, y0, y0 + h + 0.024f, VbRaunio, VbTorninSisus);
                if (lahi)
                    foreach (var nn in new[] { -e, -s })
                        foreach (float f in new[] { -0.3f, 0.3f })
                        {
                            var q = tp + nn * 0.007f + Vector3.Cross(Vector3.up, nn) * (0.014f * f); q.y = y0 + h + 0.016f;
                            VbLhSuippo(r, q, nn, 0.003f, 0.009f, VbTorninSisus);
                        }
            }
            if (!lahi) return;
            // Lähitaso: suippokaari-ikkunat pitkien seinien ulkopinnoilla ja kauemman seinän sisäpinnalla (aukkoja, joista näkee
            // läpi), päädyissä korkea ikkuna tai S:t Nicolain ruusuikkuna ja S:ta Karinin kahdeksankulmaiset pilarit.
            int ikk = t.Pituus > 0.04f ? 3 : 2;
            for (int k = 0; k < ikk; k++)
            {
                float f = -0.62f + 1.24f * (k + 0.5f) / ikk;
                foreach (float sg in new[] { -1f, 1f })
                {
                    var q = c + e * (L * f) + s * (sg * W); q.y = y0 + h * 0.52f;
                    VbLhSuippo(r, q, s * sg, 0.0045f, h * 0.55f, VbTorninSisus);
                }
                if (nro != 0) continue;
                var qi = c + e * (L * f) + s * (W - p); qi.y = y0 + h * 0.52f;
                VbLhSuippo(r, qi, -s, 0.0045f, h * 0.55f, VbTorninSisus);
            }
            foreach (float sg in new[] { -1f, 1f })
            {
                if (t.Torni == 1 && sg < 0) continue;
                var q = c + e * (sg * L); q.y = y0 + h * 0.62f;
                if (nro == 1) VbLhRuusu(r, q + Vector3.up * (h * 0.12f), e * sg, 0.0075f);
                else VbLhSuippo(r, q, e * sg, 0.0065f, h * 0.72f, VbTorninSisus);
            }
            if (nro == 0)
                foreach (float fe in new[] { -0.3f, 0.3f })
                    foreach (float fs in new[] { -0.33f, 0.33f })
                    {
                        var q = c + e * (L * fe) + s * (W * fs); q.y = y0 + 0.002f;
                        r.Vaippa(q, 0.0021f, 0.0018f, h * 0.9f, 4, VbRaunio, Mathf.PI / 4f);
                    }
        }

        /// <summary>Ruusuikkuna: kahdeksankulmainen tumma kiekko pystypinnassa ja vaalea keskus. 10 kolmiota.</summary>
        static void VbLhRuusu(Rakentaja r, Vector3 p, Vector3 ulos, float sade)
        {
            var n = new Vector3(ulos.x, 0f, ulos.z).normalized;
            var t = Vector3.Cross(Vector3.up, n);
            var q = p + n * 0.0015f;
            for (int i = 0; i < 8; i++)
            {
                float a0 = i * Mathf.PI / 4f, a1 = (i + 1) * Mathf.PI / 4f;
                r.KolmioUlos(q, q + (t * Mathf.Cos(a0) + Vector3.up * Mathf.Sin(a0)) * sade, q + (t * Mathf.Cos(a1) + Vector3.up * Mathf.Sin(a1)) * sade, n, VbTorninSisus);
            }
            var k = q + n * 0.0004f;
            r.NelioUlos(k - t * (sade * 0.3f) - Vector3.up * (sade * 0.3f), k + t * (sade * 0.3f) - Vector3.up * (sade * 0.3f), k + t * (sade * 0.3f) + Vector3.up * (sade * 0.3f),
                k - t * (sade * 0.3f) + Vector3.up * (sade * 0.3f), n, VbRaunio);
        }

        /// <summary>Raunion seinä a → b: ulkopinta, sisäpinta (sisään = suunta rakennuksen sisään) ja yläpinta; paaty &gt; 0 lisää
        /// suippokolmion (molemmat puolet).</summary>
        static void VbRaunioSeina(Rakentaja r, Vector3 a, Vector3 b, Vector3 sisaan, float p, float y0, float h, float paaty, bool yla)
        {
            a.y = 0f; b.y = 0f;
            Vector3 i0 = a + sisaan * p, i1 = b + sisaan * p;
            Vector3 p0 = Vector3.up * y0, p1 = Vector3.up * (y0 + h);
            r.NelioUlos(a + p0, b + p0, b + p1, a + p1, -sisaan, VbRaunio);
            r.NelioUlos(i0 + p0, i1 + p0, i1 + p1, i0 + p1, sisaan, VbRaunio);
            if (yla) r.NelioUlos(a + p1, b + p1, i1 + p1, i0 + p1, Vector3.up, VbRaunio);
            if (paaty > 0f)
            {
                var m = (a + b) * 0.5f + Vector3.up * (y0 + h + paaty);
                r.KolmioUlos(a + p1, b + p1, m, -sisaan, VbRaunio);
                r.KolmioUlos(i0 + p1, i1 + p1, m + sisaan * p, sisaan, VbRaunio);
            }
        }

        /// <summary>
        /// Talorivi (kortteli): keskipiste (x, z), rivin suunta (°), talojen leveydet rivin suunnassa, syvyys, harjojen korkeudet
        /// (osuutena syvyydestä, rivin suuntaisilla harjoilla; poikittain osuutena talon leveydestä), seinän sävy (0 paperi,
        /// 1 okra, 2 harmaa), kattojen sävyt (0 tiili, 1 tumma, 2 vaalea) ja poikittain (harjat rivin suuntaa vastaan, päädyt
        /// kadulle kuten hansakaupungeissa). Yksi runko ja talokohtaiset katot: 26 kolmiota kolmelle talolle (erilliset talot 42).
        /// </summary>
        struct VbRiviTieto { public float X, Z, Kulma, Syvyys; public float[] Leveys, Harja; public int Seina; public int[] Katto; public bool Poikittain, Porras; }

        static VbRiviTieto VbR(float x, float z, float kulma, float syvyys, float[] leveys, float[] harja, int seina, int[] katto, bool poikittain = false,
            bool porras = false) =>
            new VbRiviTieto { X = x, Z = z, Kulma = kulma, Syvyys = syvyys, Leveys = leveys, Harja = harja, Seina = seina, Katto = katto, Poikittain = poikittain,
                Porras = porras };

        /// <summary>
        /// Kaupungin korttelit (tiheä ydin torin, tuomiokirkon ja sataman välissä): Strandgatanin rivi rantamuurin takana, toinen ja
        /// kolmas rivi rinteessä sekä torin ja S:ta Karinin takana Klintenin juurella. Osa riveistä päädyt kadulle.
        /// </summary>
        static readonly VbRiviTieto[] VbRivitaulu =
        {
            // Strandgatan: keskimmäinen kortteli päädyt merelle (porraspäätyjen rivi kuten Gamla apoteket), muut harjat kadun suuntaan.
            VbR(-0.005f, -0.118f, 0f, 0.028f, new[] { 0.046f, 0.042f, 0.048f }, new[] { 0.62f, 0.74f, 0.58f }, 0, new[] { 0, 1, 2 }),
            VbR(0.135f, -0.118f, 0f, 0.04f, new[] { 0.034f, 0.030f, 0.036f }, new[] { 0.78f, 0.66f, 0.74f }, 1, new[] { 2, 0, 1 }, true, true),
            VbR(0.280f, -0.116f, 2f, 0.028f, new[] { 0.046f, 0.044f, 0.046f }, new[] { 0.6f, 0.72f, 0.62f }, 2, new[] { 1, 2, 0 }),
            // Toinen rivi.
            VbR(-0.030f, -0.074f, -3f, 0.04f, new[] { 0.034f, 0.030f, 0.034f }, new[] { 0.62f, 0.75f, 0.66f }, 1, new[] { 0, 2, 1 }, true),
            VbR(0.090f, -0.072f, 0f, 0.04f, new[] { 0.034f, 0.030f, 0.036f }, new[] { 0.7f, 0.62f, 0.76f }, 0, new[] { 1, 0, 2 }, true),
            VbR(0.225f, -0.074f, 4f, 0.04f, new[] { 0.032f, 0.036f, 0.030f }, new[] { 0.7f, 0.6f, 0.74f }, 2, new[] { 2, 1, 0 }, true),
            VbR(0.352f, -0.072f, 0f, 0.028f, new[] { 0.044f, 0.046f, 0.042f }, new[] { 0.6f, 0.7f, 0.62f }, 0, new[] { 0, 2, 1 }),
            VbR(-0.185f, -0.074f, 0f, 0.04f, new[] { 0.034f, 0.032f, 0.034f }, new[] { 0.66f, 0.72f, 0.62f }, 1, new[] { 1, 0, 2 }, true),
            // Kolmas rivi.
            VbR(0.060f, -0.026f, 3f, 0.04f, new[] { 0.030f, 0.034f, 0.032f }, new[] { 0.72f, 0.62f, 0.7f }, 0, new[] { 2, 0, 1 }, true),
            VbR(0.265f, -0.024f, 0f, 0.028f, new[] { 0.046f, 0.042f, 0.046f }, new[] { 0.62f, 0.72f, 0.6f }, 1, new[] { 0, 1, 2 }),
            // Neljäs rivi ja torin takana.
            VbR(0.060f, 0.030f, 0f, 0.028f, new[] { 0.046f, 0.042f }, new[] { 0.6f, 0.72f }, 2, new[] { 1, 0 }),
            VbR(0.255f, 0.030f, -4f, 0.04f, new[] { 0.032f, 0.034f, 0.030f }, new[] { 0.66f, 0.74f, 0.62f }, 0, new[] { 0, 2, 1 }, true),
            VbR(0.070f, 0.083f, 0f, 0.028f, new[] { 0.042f, 0.046f }, new[] { 0.7f, 0.6f }, 1, new[] { 2, 1 }),
            VbR(0.190f, 0.080f, 3f, 0.04f, new[] { 0.034f, 0.036f, 0.032f }, new[] { 0.62f, 0.72f, 0.66f }, 0, new[] { 1, 0, 2 }, true),
        };

        /// <summary>Talo: paikka (x, z), harjan suunta (°), pituus, syvyys, seinän ja katon sävy (erilliset talot puutarhoissa
        /// ja ylemmässä kaupungissa).</summary>
        struct VbTaloTieto { public float X, Z, Kulma, Pituus, Syvyys; public int Seina, Katto; }

        static VbTaloTieto VbT(float x, float z, float kulma, float pituus, float syvyys, int seina, int katto) =>
            new VbTaloTieto { X = x, Z = z, Kulma = kulma, Pituus = pituus, Syvyys = syvyys, Seina = seina, Katto = katto };

        static readonly VbTaloTieto[] VbTalotaulu =
        {
            // Pohjoisen (vasen) puutarhakaupungin talot.
            VbT(-0.300f, -0.070f, 90f, 0.044f, 0.026f, 0, 0), VbT(-0.395f, -0.040f, 90f, 0.042f, 0.024f, 1, 1),
            // Ylempi kaupunki.
            VbT(-0.200f, 0.176f, -10f, 0.044f, 0.026f, 2, 0), VbT(0.100f, 0.190f, 5f, 0.044f, 0.026f, 0, 2), VbT(0.300f, 0.140f, 25f, 0.042f, 0.024f, 1, 0),
        };

        static Color VbSeinaVari(int i) => i == 0 ? EmPaperi : i == 1 ? VbSeinaOkra : VbSeinaHarmaa;
        static Color VbKattoVari(int i) => i == 0 ? VbTiili : i == 1 ? VbTiiliTumma : VbTiiliVaalea;

        static void VbTalot(Rakentaja r, bool lahi)
        {
            foreach (var t in VbRivitaulu) VbRivi(r, t, lahi);
            foreach (var t in VbTalotaulu)
            {
                float y0 = VbMaasto(t.X, t.Z) - 0.002f;
                r.Talo(new Vector3(t.X, y0, t.Z), t.Kulma * Mathf.PI / 180f, t.Pituus, t.Syvyys, 0.02f, t.Syvyys * 0.66f, VbSeinaVari(t.Seina), VbKattoVari(t.Katto));
            }
            // Stora torget: vaalea kiveys (legendan tynnyrit ilmestyvät tänne).
            float za = VbToriZ - VbToriLz * 0.5f, zb = VbToriZ + VbToriLz * 0.5f, xa = VbToriX - VbToriLx * 0.5f, xb = VbToriX + VbToriLx * 0.5f;
            r.NelioUlos(new Vector3(xa, VbAlaKorkeus(za) + 0.0012f, za), new Vector3(xb, VbAlaKorkeus(za) + 0.0012f, za),
                new Vector3(xb, VbAlaKorkeus(zb) + 0.0012f, zb), new Vector3(xa, VbAlaKorkeus(zb) + 0.0012f, zb), Vector3.up, VbToriVari);
        }

        /// <summary>Talorivi yhtenä runkona: seinät (4 sivua), talokohtaiset harjakatot ja päätykolmiot (harjojen korkeuserot
        /// peittää kaksi kapeaa kolmiota liitoksessa). Seinän korkeus 0,02, räystäs yhtenäinen.</summary>
        static void VbRivi(Rakentaja r, VbRiviTieto t, bool lahi)
        {
            float kulma = t.Kulma * Mathf.PI / 180f;
            var u = new Vector3(Mathf.Cos(kulma), 0f, Mathf.Sin(kulma));
            var v = Vector3.Cross(Vector3.up, u);
            float L = 0f; foreach (float w in t.Leveys) L += w;
            float D = t.Syvyys * 0.5f, h = 0.02f;
            float y0 = VbMaasto(t.X, t.Z) - 0.002f, ye = y0 + h;
            var c = new Vector3(t.X, 0f, t.Z);
            var seina = VbSeinaVari(t.Seina);
            // Rivi on yksi ääriviivaosa (kuten rakennus): pitkät seinät ovat yli kynnyksen, joten ilman ryhmää jokainen saisi oman
            // viivansa. Lähitason ikkunat ja porraspäädyt jäävät ryhmän ulkopuolelle.
            r.AloitaOsa();
            // Runko.
            Vector3 A = c - u * (L * 0.5f) - v * D, B = c + u * (L * 0.5f) - v * D, C = c + u * (L * 0.5f) + v * D, E = c - u * (L * 0.5f) + v * D;
            Vector3 p0 = Vector3.up * y0, p1 = Vector3.up * ye;
            var keski = c + Vector3.up * (y0 + h * 0.5f);
            r.NelioKeskelta(A + p0, B + p0, B + p1, A + p1, keski, seina);
            r.NelioKeskelta(B + p0, C + p0, C + p1, B + p1, keski, seina);
            r.NelioKeskelta(C + p0, E + p0, E + p1, C + p1, keski, seina);
            r.NelioKeskelta(E + p0, A + p0, A + p1, E + p1, keski, seina);
            float s0 = -L * 0.5f;
            for (int i = 0; i < t.Leveys.Length; i++)
            {
                float a = s0, b = s0 + t.Leveys[i]; s0 = b;
                var katto = VbKattoVari(t.Katto[i]);
                if (t.Poikittain)
                {
                    // Harja rivin poikki (v): lappeet talon leveydellä, päädyt kadulle (−v) ja pihalle (+v).
                    float m = (a + b) * 0.5f, R = t.Leveys[i] * t.Harja[i];
                    Vector3 H0 = c + u * m - v * D + Vector3.up * (ye + R), H1 = c + u * m + v * D + Vector3.up * (ye + R);
                    Vector3 a0 = c + u * a - v * D + p1, a1 = c + u * a + v * D + p1, b0 = c + u * b - v * D + p1, b1 = c + u * b + v * D + p1;
                    var kk = c + u * m + Vector3.up * (ye + R * 0.3f);
                    r.NelioKeskelta(a0, a1, H1, H0, kk, katto);
                    r.NelioKeskelta(b0, b1, H1, H0, kk, katto);
                    r.KolmioKeskelta(a0, b0, H0, kk, seina);
                    r.KolmioKeskelta(a1, b1, H1, kk, seina);
                }
                else
                {
                    // Harja rivin suuntaan (u): lappeet etu- ja takasivulle, päätykolmiot rivin päissä ja liitoksissa.
                    float R = 2f * D * t.Harja[i];
                    Vector3 Ha = c + u * a + Vector3.up * (ye + R), Hb = c + u * b + Vector3.up * (ye + R);
                    Vector3 fa = c + u * a - v * D + p1, fb = c + u * b - v * D + p1, ta = c + u * a + v * D + p1, tb = c + u * b + v * D + p1;
                    var kk = c + u * ((a + b) * 0.5f) + Vector3.up * (ye + R * 0.3f);
                    r.NelioKeskelta(fa, fb, Hb, Ha, kk, katto);
                    r.NelioKeskelta(ta, tb, Hb, Ha, kk, katto);
                    if (i == 0) r.KolmioUlos(fa, ta, Ha, -u, seina);
                    if (i == t.Leveys.Length - 1) r.KolmioUlos(fb, tb, Hb, u, seina);
                    if (i + 1 < t.Leveys.Length)
                    {
                        // Liitos seuraavaan taloon: korkeamman päädyn yläosa matalamman katon yli (kaksi kapeaa kolmiota).
                        float Rn = 2f * D * t.Harja[i + 1];
                        if (Mathf.Abs(Rn - R) > 1e-4f)
                        {
                            var ulos = Rn < R ? u : -u;
                            var Hn = c + u * b + Vector3.up * (ye + Rn);
                            r.KolmioUlos(fb, Hb, Hn, ulos, seina);
                            r.KolmioUlos(Hb, tb, Hn, ulos, seina);
                        }
                    }
                }
            }
            r.LopetaOsa();
            if (!lahi) return;
            s0 = -L * 0.5f;
            for (int i = 0; i < t.Leveys.Length; i++)
            {
                float a = s0, b = s0 + t.Leveys[i]; s0 = b;
                // Lähitaso: ikkunat ja ovi kameran puoleisella kyljellä (+v on −Z) tai päädyssä; Strandgatanin päätyrivissä
                // porraspäädyt (hansakaupungin tunnus, kuten Gamla apoteket).
                float wi = t.Leveys[i], mi = (a + b) * 0.5f;
                var etu = c + u * mi + v * D;
                if (!t.Poikittain)
                {
                    foreach (float f in new[] { -0.28f, 0.28f })
                        r.Laatta(etu + u * (wi * f) + Vector3.up * (y0 + 0.0135f), v, 0.0055f, 0.0058f, EmMuste);
                    r.Laatta(etu + Vector3.up * (y0 + 0.0048f), v, 0.005f, 0.0085f, VbOvi);
                }
                else
                {
                    float R = t.Leveys[i] * t.Harja[i];
                    foreach (float f in new[] { -0.24f, 0.24f })
                        r.Laatta(etu + u * (wi * f) + Vector3.up * (y0 + 0.012f), v, 0.005f, 0.006f, EmMuste);
                    r.Laatta(etu + Vector3.up * (ye + R * 0.3f), v, 0.004f, 0.0055f, EmMuste);
                    if (t.Porras) VbLhPorraspaaty(r, etu + Vector3.up * ye, u, v, wi, R, seina);
                }
            }
        }

        /// <summary>Porraspääty päätykolmion edessä: kolme porrasta, etupinta ja porrastasot (b = päädyn alareunan keskikohta räystään
        /// tasolla seinän pinnassa, u leveyssuunta, n ulos, leveys w ja harjan korkeus R). Nousee hieman katon yli. 16 kolmiota.</summary>
        static void VbLhPorraspaaty(Rakentaja r, Vector3 b, Vector3 u, Vector3 n, float w, float R, Color vari)
        {
            b += n * 0.0012f;
            float h1 = R * 0.34f + 0.004f, h2 = R * 0.67f + 0.004f, h3 = R + 0.0045f;
            float x1 = w * 0.5f, x2 = w * 0.33f, x3 = w * 0.16f;
            Vector3 Y1 = Vector3.up * h1, Y2 = Vector3.up * h2, Y3 = Vector3.up * h3, t = -n * 0.003f;
            r.NelioUlos(b - u * x1, b + u * x1, b + u * x1 + Y1, b - u * x1 + Y1, n, vari);
            r.NelioUlos(b - u * x2 + Y1, b + u * x2 + Y1, b + u * x2 + Y2, b - u * x2 + Y2, n, vari);
            r.NelioUlos(b - u * x3 + Y2, b + u * x3 + Y2, b + u * x3 + Y3, b - u * x3 + Y3, n, vari);
            foreach (float sg in new[] { -1f, 1f })
            {
                r.NelioUlos(b + u * (sg * x1) + Y1, b + u * (sg * x2) + Y1, b + u * (sg * x2) + Y1 + t, b + u * (sg * x1) + Y1 + t, Vector3.up, vari);
                r.NelioUlos(b + u * (sg * x2) + Y2, b + u * (sg * x3) + Y2, b + u * (sg * x3) + Y2 + t, b + u * (sg * x2) + Y2 + t, Vector3.up, vari);
            }
            r.NelioUlos(b - u * x3 + Y3, b + u * x3 + Y3, b + u * x3 + Y3 + t, b - u * x3 + Y3 + t, Vector3.up, vari);
        }

        /// <summary>Puut (tumma oliivi, ei ääriviivaa): Almedalen rantakaistalla, kasvitieteellinen puutarha S:t Olofin luona,
        /// ylemmän kaupungin puutarhat ja tuomiokirkon piha.</summary>
        static void VbPuut(Rakentaja r, bool lahi)
        {
            (float x, float z, float k)[] puut =
            {
                (-0.030f, -0.160f, 0.8f), (0.050f, -0.161f, 0.75f), (0.125f, -0.158f, 0.8f),
                (-0.205f, -0.108f, 1.0f), (-0.170f, -0.082f, 0.9f), (-0.235f, -0.086f, 0.85f),
                (-0.395f, 0.100f, 0.9f), (-0.270f, 0.165f, 0.9f), (0.030f, 0.205f, 0.85f), (0.170f, 0.190f, 0.9f),
                (-0.150f, 0.100f, 0.8f), (-0.280f, 0.000f, 0.9f), (-0.415f, 0.020f, 0.85f), (-0.360f, 0.080f, 0.8f),
            };
            foreach (var (x, z, k) in puut)
                r.Kartio(new Vector3(x, VbMaasto(x, z) - 0.001f, z), 0.014f * k, 0.034f * k, 5, EmPuu);
            if (!lahi) return;
            // Lähitaso: puutarhojen ja ylemmän kaupungin puita lisää (pienempiä) ja torin kojut.
            (float x, float z, float k)[] lisa =
            {
                (-0.320f, -0.030f, 0.7f), (-0.430f, -0.085f, 0.7f), (-0.250f, -0.040f, 0.65f), (-0.405f, 0.070f, 0.7f), (-0.300f, 0.110f, 0.7f),
                (-0.150f, 0.180f, 0.7f), (0.060f, 0.215f, 0.65f), (0.250f, 0.160f, 0.7f), (0.330f, 0.105f, 0.65f), (-0.230f, 0.130f, 0.65f),
                (-0.120f, -0.160f, 0.6f), (0.170f, -0.160f, 0.6f),
            };
            foreach (var (x, z, k) in lisa)
                r.Kartio(new Vector3(x, VbMaasto(x, z) - 0.001f, z), 0.014f * k, 0.034f * k, 5, EmPuu);
            foreach (var (x, z, vari) in new[] { (-0.127f, 0.057f, 0), (-0.043f, 0.057f, 1), (-0.127f, 0.1f, 1), (-0.043f, 0.1f, 0) })
            {
                var q = new Vector3(x, VbAlaKorkeus(z) + 0.0012f, z);
                r.Pyramidi(q, 0.012f, 0.009f, 0.008f, vari == 0 ? EmPaperi : VbSeinaOkra);
            }
        }

        // ---- Liikkuvat osat ----

        /// <summary>Lautan lepopaikka (pivot): laiturissa altaan oikeassa päässä, keula vasemmalle.</summary>
        static Vector3 VbLautanPivot => new Vector3(VbLaituriPaikkaX, VbVesiY, VbAltaanZ);

        /// <summary>
        /// Gotlannin lautta (M/S Visby: valkoinen runko, tummat ikkunanauhat, piippu perässä; pivot keskellä vesirajassa, keula
        /// −X): viisikulmainen runko ja kansi, kansirakennus ikkunanauhoineen ja tiilenpunainen piippu. Noin 0,7 × todellinen
        /// pituus.
        /// </summary>
        static Mesh VisbyLautta()
        {
            var r = new Rakentaja();
            float L = VbLauttaPituus * 0.5f, W = VbLauttaLeveys * 0.5f, hr = 0.009f;
            var reuna = new[] { new Vector3(L, 0f, -W), new Vector3(L, 0f, W), new Vector3(-L + 0.018f, 0f, W), new Vector3(-L, 0f, 0f), new Vector3(-L + 0.018f, 0f, -W) };
            var yla = Vector3.up * hr;
            var keski = new Vector3(0f, hr * 0.5f, 0f);
            for (int i = 0; i < reuna.Length; i++)
            {
                var a = reuna[i]; var b = reuna[(i + 1) % reuna.Length];
                r.NelioKeskelta(a, b, b + yla, a + yla, keski, VbLautanValkoinen);
            }
            r.KolmioUlos(reuna[0] + yla, reuna[1] + yla, reuna[2] + yla, Vector3.up, EmVaahto);
            r.KolmioUlos(reuna[0] + yla, reuna[2] + yla, reuna[4] + yla, Vector3.up, EmVaahto);
            r.KolmioUlos(reuna[2] + yla, reuna[3] + yla, reuna[4] + yla, Vector3.up, EmVaahto);
            // Kansirakennus ja ikkunanauhat kyljissä.
            VbKappale(r, new Vector3(0.004f, 0f, 0f), Vector3.right, Vector3.forward, -0.034f, 0.03f, -W + 0.002f, W - 0.002f, hr, hr + 0.011f,
                VbLautanValkoinen, VbLautanValkoinen);
            foreach (float s in new[] { -1f, 1f })
                r.Laatta(new Vector3(0.0f, hr + 0.0065f, s * (W - 0.002f)), new Vector3(0f, 0f, s), 0.058f, 0.0032f, EmMuste);
            // Piippu perässä.
            VbKappale(r, new Vector3(0.026f, 0f, 0f), Vector3.right, Vector3.forward, -0.005f, 0.005f, -0.0045f, 0.0045f, hr + 0.011f, hr + 0.019f,
                VbTiili, VbTiiliTumma);
            return r.Verkko("Visby-lautta");
        }

        /// <summary>Vana: kaksi vaaleaa viirua levenee lautan perästä (+X) taaksepäin (pivot lautan keskellä); skaala seuraa
        /// vauhtia. Tehdään ilman ääriviivaryhmää (ohut vaikutusosa).</summary>
        static Mesh VisbyVana()
        {
            var r = new Rakentaja();
            float L = VbLauttaPituus * 0.5f;
            foreach (float s in new[] { -1f, 1f })
            {
                Vector3 a = new Vector3(L - 0.004f, 0.0005f, s * 0.009f), m = new Vector3(L + 0.04f, 0.0005f, s * 0.019f), b = new Vector3(L + 0.085f, 0.0005f, s * 0.027f);
                var t = new Vector3(0f, 0f, 0.0028f);
                r.NelioUlos(a - t, m - t * 0.7f, m + t * 0.7f, a + t, Vector3.up, EmVaahto);
                r.NelioUlos(m - t * 0.7f, b - t * 0.25f, b + t * 0.25f, m + t * 0.7f, Vector3.up, EmVaahto);
            }
            return r.Verkko("Visby-vana");
        }

        /// <summary>Lautan ikkunanauhojen hehku yöllä (pivot lautan keskellä): lämmin nauha tummien ikkunoiden edessä kyljissä.</summary>
        static Mesh VisbyLauttavalo()
        {
            var r = new Rakentaja();
            float W = VbLauttaLeveys * 0.5f;
            foreach (float s in new[] { -1f, 1f })
                r.Laatta(new Vector3(0.0f, 0.009f + 0.0065f, s * (W - 0.002f + 0.0004f)), new Vector3(0f, 0f, s), 0.056f, 0.0026f, EmIkkunavalo);
            return r.Verkko("Visby-lauttavalo");
        }

        /// <summary>Tynnyrin pivot torilla (pohjan keskellä).</summary>
        static Vector3 VbTynnyrinPivot(int k) => new Vector3(VbTynnyriX[k], VbAlaKorkeus(VbTynnyriZ) + 0.0012f, VbTynnyriZ);

        /// <summary>
        /// Oluttynnyri (ölkar, avoin puusaavi; pivot pohjan keskellä): kuusikulmainen, ylöspäin levenevä vaippa, tumma vanne
        /// reunassa ja tumma pohja sisällä. Legendan kokoinen (0,03 korkea).
        /// </summary>
        static Mesh VisbyTynnyri()
        {
            var r = new Rakentaja();
            const int n = 6;
            float h0 = VbTynnyriH * 0.78f;
            float rm = Mathf.Lerp(VbTynnyriR0, VbTynnyriR1, 0.78f);
            r.Vaippa(Vector3.zero, VbTynnyriR0, rm, h0, n, VbTynnyriPuu, Mathf.PI / n);
            r.Vaippa(Vector3.up * h0, rm, VbTynnyriR1, VbTynnyriH - h0, n, EmMuste, Mathf.PI / n);
            // Tumma pohja sisällä (näkyy ylhäältä avoimesta suusta): neliö kuusikulmion sisällä.
            float q = VbTynnyriR0 * 0.8f, yp = 0.004f;
            r.NelioUlos(new Vector3(-q, yp, -q), new Vector3(q, yp, -q), new Vector3(q, yp, q), new Vector3(-q, yp, q), Vector3.up, VbTynnyriPohja);
            return r.Verkko("Visby-tynnyri");
        }

        /// <summary>Kultakasa (pivot tynnyrin reunan tasolla keskellä): kuusikulmainen kartio. Liikeydin nostaa
        /// sen tynnyrin sisältä reunan yli.</summary>
        static Mesh VisbyKulta()
        {
            var r = new Rakentaja();
            const int n = 6;
            float rr = VbTynnyriR1 * 0.92f;
            r.Kartio(Vector3.zero, rr, 0.011f, n, EmKulta);
            return r.Verkko("Visby-kulta");
        }

        /// <summary>Kimallus (pivot kasan yllä): kaksi pientä vaalean kullan timanttia eri kokoisina; liikeydin pyörittää ja
        /// sykkii sitä. Ei ääriviivaa.</summary>
        static Mesh VisbyKimallus()
        {
            var r = new Rakentaja();
            r.Timantti(new Vector3(-0.0065f, 0f, 0.001f), 0.0036f, 0.0078f, VbKimallusVari, 4);
            r.Timantti(new Vector3(0.0065f, 0.005f, -0.001f), 0.0028f, 0.006f, VbKimallusVari, 4);
            return r.Verkko("Visby-kimallus");
        }

        /// <summary>Tynnyrin reunan taso (kultakasan pivot) ja kimalluksen paikka kasan yllä.</summary>
        static Vector3 VbKullanPivot(int k) => VbTynnyrinPivot(k) + Vector3.up * VbTynnyriH;
        static Vector3 VbKimalluksenPivot(int k) => VbKullanPivot(k) + Vector3.up * 0.018f;

        /// <summary>Tornien valoryhmät (VbTornitaulun indeksit) ja niiden pivot-tornit. Ryhmä 6 on rantamuurin tornit (Kruttornet,
        /// Jungfrutornet ja kulmatorni).</summary>
        static readonly int[][] VbValoRyhmat =
        {
            new[] { 0, 1, 2 }, new[] { 3, 4, 5 }, new[] { 6, 7, 8 }, new[] { 9, 10, 11 }, new[] { 12, 13 }, new[] { 14, 15 },
        };

        /// <summary>Tornin t valopintojen keskipiste (huipun taso) ja kameraa kohti oleva sivu.</summary>
        static void VbTorninValo(Vector3[] linja, VbTorniTieto t, out Vector3 huippu, out Vector3 sivu, out Vector3 sivuN, out float sivuL)
        {
            VbTorninPaikka(linja, t.S, out var c, out var d, out var v);
            float v0 = -(VbMuuriP * 0.5f + VbTorniUlos), v1 = VbMuuriP * 0.5f + VbTorniSisaan;
            var keski = c + v * ((v0 + v1) * 0.5f); keski.y = c.y + t.Korkeus;
            huippu = keski;
            // Kameraa (−Z) kohti osoittava sivu: sisäpinta (v), ulkopinta (−v) tai päädyt (±d).
            Vector3[] nn = { v, -v, d, -d };
            float[] etaisyys = { v1, -v0, t.Leveys * 0.5f, t.Leveys * 0.5f };
            float[] leveys = { t.Leveys, t.Leveys, v1 - v0, v1 - v0 };
            int paras = 0;
            for (int i = 1; i < 4; i++) if (nn[i].z < nn[paras].z) paras = i;
            sivuN = nn[paras]; sivuL = leveys[paras];
            sivu = keski + nn[paras] * etaisyys[paras];
        }

        /// <summary>Valoryhmän pivot: ryhmän keskitornin huipun keskellä.</summary>
        static Vector3 VbValoPivot(int g)
        {
            var linja = VbMuuriLinja();
            var ryhma = VbValoRyhmat[g];
            VbTorninValo(linja, VbTornitaulu[ryhma[ryhma.Length / 2]], out var huippu, out _, out _, out _);
            return huippu;
        }

        /// <summary>
        /// Tornien yövalot ryhmittäin (pivot ryhmän keskitornin huipussa, joten 1,5 s:n syttymisessä pinnat liukuvat vain
        /// lyhyen matkan muuria pitkin eivätkä leijaile): lämmin hehku avoimen tornin huipussa (näkyy ylhäältä) ja kameraa kohti
        /// olevalla sivulla (valaistu torni kallistuksesta).
        /// </summary>
        static Mesh VbValoRyhma(int g)
        {
            var r = new Rakentaja();
            var linja = VbMuuriLinja();
            var o = VbValoPivot(g);
            foreach (int k in VbValoRyhmat[g])
            {
                var t = VbTornitaulu[k];
                VbTorninValo(linja, t, out var huippu, out var sivu, out var sivuN, out var sivuL);
                float hl = t.Leveys * 0.36f;
                var y = huippu + Vector3.up * 0.0008f - o;
                VbTorninPaikka(linja, t.S, out _, out var d, out var v);
                if (t.Laji != 2)
                    r.NelioUlos(y - d * hl - v * hl, y + d * hl - v * hl, y + d * hl + v * hl, y - d * hl + v * hl, Vector3.up, EmIkkunavalo);
                r.Laatta(sivu - sivuN * 0.0007f - Vector3.up * (t.Korkeus * 0.3f) - o, sivuN, sivuL * 0.7f, t.Korkeus * 0.45f, EmIkkunavalo);
            }
            return r.Verkko("Visby-valot" + g);
        }

        static Mesh VisbyValot0() => VbValoRyhma(0);
        static Mesh VisbyValot1() => VbValoRyhma(1);
        static Mesh VisbyValot2() => VbValoRyhma(2);
        static Mesh VisbyValot3() => VbValoRyhma(3);
        static Mesh VisbyValot4() => VbValoRyhma(4);
        static Mesh VisbyValot5() => VbValoRyhma(5);

        /// <summary>Kruttornetin valon pivot: tornin etusivun juuressa keskellä.</summary>
        static Vector3 VbKruttornetValoPivot => new Vector3(VbRantamuuri[2].x, 0.045f, VbRantamuuri[2].z - 0.018f);

        /// <summary>Kruttornet yöllä (pivot etusivulla): lämmin hehku meren puoleisella sivulla.</summary>
        static Mesh VisbyValot6()
        {
            var r = new Rakentaja();
            var o = VbKruttornetValoPivot;
            r.Laatta(new Vector3(0f, 0f, 0.0007f), Vector3.back, 0.024f, 0.034f, EmIkkunavalo);
            return r.Verkko("Visby-valot6");
        }

        /// <summary>Jungfrutornetin paikka rantamuurilla.</summary>
        static Vector3 VbJungfrutornet => VbP(-0.43f, VbViivaZ(VbRantaVasemmalta(), -0.43f));

        /// <summary>Kehän vasemman kulmatornin ja Jungfrutornetin valojen pivot (niiden välissä huipun tasolla).</summary>
        static Vector3 VbKulmavaloPivot
        {
            get
            {
                var w0 = VbMaamuuri[0]; var jp = VbJungfrutornet;
                return new Vector3((w0.x + jp.x) * 0.5f, VbAlaKorkeus(w0.z) + 0.055f, (w0.z + jp.z) * 0.5f);
            }
        }

        /// <summary>Vasen kulmatorni (Silverhättan–Snäckgärdsporten) ja Jungfrutornet yöllä: huiput ja meren puoleiset sivut.</summary>
        static Mesh VisbyValot7()
        {
            var r = new Rakentaja();
            var o = VbKulmavaloPivot;
            var jp = VbJungfrutornet;
            float jy = VbAlaKorkeus(jp.z) + 0.05f;
            r.NelioUlos(new Vector3(jp.x - 0.008f, jy + 0.0008f, jp.z - 0.009f) - o, new Vector3(jp.x + 0.008f, jy + 0.0008f, jp.z - 0.009f) - o,
                new Vector3(jp.x + 0.008f, jy + 0.0008f, jp.z + 0.007f) - o, new Vector3(jp.x - 0.008f, jy + 0.0008f, jp.z + 0.007f) - o, Vector3.up, EmIkkunavalo);
            r.Laatta(new Vector3(jp.x, jy - 0.02f, jp.z - 0.012f + 0.0007f) - o, Vector3.back, 0.016f, 0.024f, EmIkkunavalo);
            var w0 = VbMaamuuri[0];
            float wy = VbAlaKorkeus(w0.z) + 0.062f;
            r.NelioUlos(new Vector3(w0.x - 0.011f, wy + 0.0008f, w0.z - 0.011f) - o, new Vector3(w0.x + 0.011f, wy + 0.0008f, w0.z - 0.011f) - o,
                new Vector3(w0.x + 0.011f, wy + 0.0008f, w0.z + 0.011f) - o, new Vector3(w0.x - 0.011f, wy + 0.0008f, w0.z + 0.011f) - o, Vector3.up, EmIkkunavalo);
            r.Laatta(new Vector3(w0.x, wy - 0.022f, w0.z - 0.016f + 0.0007f) - o, Vector3.back, 0.022f, 0.028f, EmIkkunavalo);
            return r.Verkko("Visby-valot7");
        }

        /// <summary>S:ta Karinin valon pivot (raunion lattian keskellä).</summary>
        static Vector3 VbKarinPivot => new Vector3(VbRauniotaulu[0].X, VbMaasto(VbRauniotaulu[0].X, VbRauniotaulu[0].Z), VbRauniotaulu[0].Z);

        /// <summary>
        /// S:ta Karinin raunio yöllä (pivot lattian keskellä): lämmin hehku lattialla (valaistu sisus, näkyy ylhäältä) ja
        /// kameraa kohti olevien seinien pinnoilla sekä länsipäädyssä.
        /// </summary>
        static Mesh VisbyValot8()
        {
            var r = new Rakentaja();
            var t = VbRauniotaulu[0];
            var o = VbKarinPivot;
            var c = VbP(t.X, t.Z);
            float y0 = VbMaasto(t.X, t.Z) - 0.002f;
            var e = VbKirkonAkseli; var s = Vector3.Cross(Vector3.up, e);
            float L = t.Pituus * 0.5f - 0.005f, W = t.Leveys * 0.5f - 0.005f;
            var yl = Vector3.up * (y0 + 0.0033f);
            Vector3 A = c - e * L - s * W, B = c + e * L - s * W, C = c + e * L + s * W, D = c - e * L + s * W;
            r.NelioUlos(A + yl - o, B + yl - o, C + yl - o, D + yl - o, Vector3.up, EmIkkunavalo);
            // Takaseinän ja itäpäädyn sisäpinnat (kameraa kohti) sekä länsipäädyn ulkopinta.
            float h = t.Korkeus;
            var ls = c - e * (t.Pituus * 0.5f); ls.y = y0 + h * 0.55f;
            r.Laatta(ls - e * 0.0008f - o, -e, t.Leveys * 0.8f, h * 0.7f, EmIkkunavalo);
            var ts = c + s * (t.Leveys * 0.5f - 0.0045f); ts.y = y0 + h * 0.55f;
            r.Laatta(ts - s * 0.0008f - o, -s, t.Pituus * 0.8f, h * 0.7f, EmIkkunavalo);
            return r.Verkko("Visby-valot8");
        }

        static LiikkuvaOsaMaaritys[] VisbyOsat()
        {
            var lp = VbLautanPivot;
            var osat = new System.Collections.Generic.List<LiikkuvaOsaMaaritys>
            {
                new LiikkuvaOsaMaaritys { Nimi = "lautta", Verkko = VisbyLautta, Pivot = lp, Liike = Liike.Liuku, Akseli = Vector3.left, Laajuus = 0.82f, KayS = 24f, TaukoS = 30f },
                new LiikkuvaOsaMaaritys { Nimi = "vana", Verkko = VisbyVana, Pivot = lp, Liike = Liike.Liuku, Akseli = Vector3.left, Laajuus = 0.82f },
                new LiikkuvaOsaMaaritys { Nimi = "lauttavalo", Verkko = VisbyLauttavalo, Pivot = lp, Liike = Liike.Valahdys },
            };
            for (int k = 0; k < 3; k++)
            {
                osat.Add(new LiikkuvaOsaMaaritys { Nimi = "tynnyri" + k, Verkko = VisbyTynnyri, Pivot = VbTynnyrinPivot(k), Liike = Liike.Nousu, Akseli = Vector3.up });
                osat.Add(new LiikkuvaOsaMaaritys { Nimi = "kulta" + k, Verkko = VisbyKulta, Pivot = VbKullanPivot(k), Liike = Liike.Nousu, Akseli = Vector3.up });
                osat.Add(new LiikkuvaOsaMaaritys { Nimi = "kimallus" + k, Verkko = VisbyKimallus, Pivot = VbKimalluksenPivot(k), Liike = Liike.Kierto, Akseli = Vector3.up });
            }
            Func<Mesh>[] valot = { VisbyValot0, VisbyValot1, VisbyValot2, VisbyValot3, VisbyValot4, VisbyValot5 };
            for (int g = 0; g < valot.Length; g++)
                osat.Add(new LiikkuvaOsaMaaritys { Nimi = "valot" + g, Verkko = valot[g], Pivot = VbValoPivot(g), Liike = Liike.Valahdys });
            osat.Add(new LiikkuvaOsaMaaritys { Nimi = "valot6", Verkko = VisbyValot6, Pivot = VbKruttornetValoPivot, Liike = Liike.Valahdys });
            osat.Add(new LiikkuvaOsaMaaritys { Nimi = "valot7", Verkko = VisbyValot7, Pivot = VbKulmavaloPivot, Liike = Liike.Valahdys });
            osat.Add(new LiikkuvaOsaMaaritys { Nimi = "valot8", Verkko = VisbyValot8, Pivot = VbKarinPivot, Liike = Liike.Valahdys });
            return osat.ToArray();
        }

        static readonly bool visby = Rekisteroi("visby",
            new Erikoismalli { Runko = VisbyRunko, Osat = VisbyOsat, Lahi = VisbyLahi, Kolmiot0 = 1475, KokoKerroin = 1.5f });

        // ---- LÄHITASO ----

        static Mesh VisbyLahi()
        {
            var r = new Rakentaja();
            VbMeri(r);
            VbLaituri(r);
            VbKaupunginPohja(r, true);
            VbTuomiokirkko(r, true);
            VbRauniot(r, true);
            VbTalot(r, true);
            VbPuut(r, true);
            return r.Verkko("Visby-lahi");
        }
    }
}
