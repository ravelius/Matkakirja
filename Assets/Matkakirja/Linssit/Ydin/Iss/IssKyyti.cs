// ISS:N KYYTI (omistajan kysymys 27.9.2026 klo 23.5x: "pääseekö astronautin kamerassa jo iss:n kyytiin?"; Linssisepän
// suositus docs/raportit/iss-kyyti-suositus-20260928.md, Pelikoodari kuittasi webin samoilla luvuilla). Kolme tilaa
// napautuksella: kaukonäkymä → seuranta (kamera ISS:n takana ja yllä 1 200 km, kallistus 55°) → Cupola-ikkuna (silmä ISS:ssä,
// katse radan suuntaan 55° alas, kenttäkulma 80°) → takaisin seurantaan; ✕ palaa kaukonäkymään.
// KOHTEEN YLLÄ (web iss-kyyti.js TILA.kohde, commit 891958e17; omistaja 28.9.2026 klo 12.1x "Lennä kohteen ylle"): ylilennon
// perillä silmä ISS:ssä ja katse kohteeseen kuten astronautin vinokuvissa, pitkä objektiivi (noin 90 km leveä alue ruudun
// pystyyn, 6–50°); napautus palaa seurantaan.
// ULKONA (avaruuskävely, omistaja 29.9.2026 "Kyllä, radion jälkeen"; suunnitelma docs/raportit/avaruuskavely-suunnitelma-
// 20260929.md): silmä ISS:n kaiteella, katse radan sivulle 45° alas (kohteen zeniittikulma ~49°), kenttä 70°. Kallistus
// pidetään alle 55°: laite 29.9. näytti yli ~55–60°:n kallistuksella pitkällä objektiivilla pelkän pohjapallon (#264e91).
// Tila avataan ja suljetaan vain Avaruuskavely-tilakoneesta (Ulos / Sisaan), napautus ei vaihda sitä.
//
// Puhdas C#: kameran asento (Kuvakulma) ISS:n paikasta, korkeudesta ja maajäljen suunnasta, sekä siirtymät asentojen
// välillä. Kohde liikkuu ajon aikana (7,66 km/s), joten siirtymä sekoittaa lähtöasennon ja kohdetilan TÄMÄN kehyksen
// asennon, eikä valmista kamera-ajoa voi käyttää. Unity-sovitin vie asennon PalloKierto.Kuvaa-metodille.
using System;
using System.Globalization;
using Matkakirja.Linssit.Aikajana;

namespace Matkakirja.Linssit.Iss
{
    public enum KyydinTila { Kauko, Seuranta, Ikkuna, Kohde, Ulkona }

    /// <summary>ISS tällä hetkellä: alapiste, korkeus ellipsoidista (m) ja maajäljen suunta (asteina).</summary>
    public readonly struct IssHetki
    {
        public readonly LatLon Paikka;
        public readonly double KorkeusM, Suuntima;
        public IssHetki(LatLon paikka, double korkeusM, double suuntima) { Paikka = paikka; KorkeusM = korkeusM; Suuntima = suuntima; }
    }

    /// <summary>Kyydin kameran asennot pallomallilla (säde 6 371 km; ellipsoidin ero on kilometrejä, ei näy).</summary>
    public static class IssKuvakulma
    {
        public const double MaanSadeM = 6_371_000;
        /// <summary>Seuranta: silmän etäisyys ISS:stä ja kallistus ISS:n pystysuorasta (ISS maan reunan alla, kaari yllä).</summary>
        public const double SeurannanEtaisyysM = 1_200_000, SeurannanKallistus = 55;
        /// <summary>Ikkuna: katse radan suuntaan näin monta astetta vaakatason alapuolelle (horisontti 420 km:stä 20,3°).</summary>
        public const double IkkunanKatseAlas = 55;
        /// <summary>
        /// HORISONTTI (omistaja 28.9. klo 21.5x Päätoimittajan kautta, mainosvideon ISS-ikkuna: "yksi iso ikkuna olisi pääosassa
        /// ja sivuikkunat näkyisivät vähän"): katse radan suuntaan 36° vaakatason alapuolelle, jolloin maan kaari ja ilmakehän
        /// reuna (20,3° alapuolella, 15,7° kuvan keskikohdan yläpuolella) ovat ison sivuikkunan ylimmässä kolmanneksessa ja
        /// avaruus musta sen yllä. Cupola-kerrokset rajataan yläikkunaan niin, että kehys täyttää ruudun (IssKyytiNakyma).
        /// A/B `astro kyyti rajaus horisontti`.
        /// </summary>
        public const double HorisontinKatseAlas = 36;
        /// <summary>
        /// Ikkunan rajaus: PYÖREÄ (oletus, omistaja 28.9. klo 22.5x horisonttiluonnoksen jälkeen: "voisiko ennemmin käyttää sitä
        /// pyöreää ikkunaa ja rajata se lähelle? toimisi aika hyvin vähän eri rajauksella pysty ja vaaka muodossa") = pyöreä
        /// kattoikkuna täyttää ruudun lyhyemmän sivun ja karmi näkyy reunoilla, katse 55°; HORISONTTI = iso sivuikkuna, katse 36°;
        /// KATTO = 1.0.40:n koko kupoli lasin zoomilla 1,3, katse 55°. A/B `astro kyyti rajaus pyorea|horisontti|katto`.
        /// </summary>
        public enum IkkunanRajaus { Pyorea, Horisontti, Katto }
        public static IkkunanRajaus Rajaus = IkkunanRajaus.Pyorea;
        public static bool Horisontti => Rajaus == IkkunanRajaus.Horisontti;

        /// <summary>
        /// CUPOLA 3 (Codexin toimitus 28.9. klo 22.4x, posti/codex-fable-iss-ohjaamo-20260928.md; omistajan pyöreä kattoikkuna
        /// tiiviisti pystyyn ja vaakaan): pyöreän rajauksen ohjaamo on piirretty valmiiksi rajatuksi kahtena kuvana, iPhonen
        /// pysty 1290 × 2796 (ikkuna 98 % leveydestä) ja iPadin vaaka 2732 × 2048 (ikkuna 85 % korkeudesta). Kuva valitaan
        /// laitteen muodosta (pitkä / lyhyt sivu alle 1,75 = iPadin kuva) ja käännetään 90°, kun ruutu on eri asennossa kuin
        /// kuva (iPhone vaaka, iPad pysty): ikkuna pysyy pyöreänä ja täyttää ruudun lyhyemmän sivun.
        /// </summary>
        public static (bool ipad, bool kaanna) Cupola3Kuva(double leveys, double korkeus)
        {
            double pitka = Math.Max(leveys, korkeus), lyhyt = Math.Min(leveys, korkeus);
            bool ipad = lyhyt > 0 && pitka / lyhyt < Cupola3IpadRaja;
            return (ipad, ipad ? korkeus > leveys : leveys > korkeus);
        }
        public const double Cupola3IpadRaja = 1.75;

        /// <summary>Codexin kuvan koko pikseleinä: iPadin vaaka tai iPhonen pysty.</summary>
        public static (double leveys, double korkeus) Cupola3Koko(bool ipad) => ipad ? (2732, 2048) : (1290, 2796);

        /// <summary>
        /// Pyöreän ikkunan keskipiste Codexin kuvassa osuutena leveydestä ja korkeudesta (mitattu ikkunamaskista 28.9.). iPadin
        /// kuvissa ikkuna on hieman yläpuolella (y 0,45–0,47), jolloin oranssi lappu leikkautui laitteella (cl18) ruudun reunaan.
        /// </summary>
        public static (double x, double y) Cupola3Keskus(bool ipad, string kulma) => kulma == "b"
            ? (ipad ? (0.498, 0.452) : (0.448, 0.490))
            : (ipad ? (0.503, 0.465) : (0.498, 0.473));

        /// <summary>
        /// Rajaus kerrossäiliön omassa koordinaatistossa (pt, x oikealle, y alas): kuva cover-asetettuna <paramref name="leveys"/> ×
        /// <paramref name="korkeus"/> -laatikkoon ja laatikko suurennettuna <paramref name="z"/>-kertaiseksi keskeltä. Ikkunan
        /// keskipiste siirretään kohti ruudun keskustaa kahdessa osassa:
        ///  1) kuvaa siirretään laatikon sisällä (background-position 0–1, 0,5 = keskellä) cover-ylijäämän verran; UI Toolkit leikkaa
        ///     taustakuvan laatikkoon, joten pelkkä laatikon siirto paljasti cl19:ssä iPadin yläreunaan 16 pt:n aukon;
        ///  2) loput laatikon siirtona (translate) suurennoksen varan sisällä, reunaan <paramref name="vara"/> pt ajelehdukselle.
        /// iPad vaaka: asema y 0,065 (kuva 31,8 pt alas laatikossa, ikkuna keskelle), siirto 0; iPhone: ei cover-ylijäämää, siirto 9,5 pt.
        /// </summary>
        public static (double asemaX, double asemaY, double x, double y) Cupola3Rajaus(double leveys, double korkeus, bool ipad, string kulma, double z, double vara)
        {
            var (kl, kk) = Cupola3Koko(ipad);
            var (cx, cy) = Cupola3Keskus(ipad, kulma);
            double s = Math.Max(leveys / kl, korkeus / kk);
            double lx = (kl * s - leveys) * 0.5, ly = (kk * s - korkeus) * 0.5;
            double dx = -z * ((leveys - kl * s) * 0.5 + cx * kl * s - leveys * 0.5), dy = -z * ((korkeus - kk * s) * 0.5 + cy * kk * s - korkeus * 0.5);
            double bx = Math.Clamp(dx / z, -lx, lx), by = Math.Clamp(dy / z, -ly, ly);
            double ax = lx > 1e-6 ? 0.5 - bx / (2 * lx) : 0.5, ay = ly > 1e-6 ? 0.5 - by / (2 * ly) : 0.5;
            double vx = Math.Max(0, (z - 1) * leveys * 0.5 - vara), vy = Math.Max(0, (z - 1) * korkeus * 0.5 - vara);
            return (ax, ay, Math.Clamp(dx - bx * z, -vx, vx), Math.Clamp(dy - by * z, -vy, vy));
        }

        /// <summary>Cupola 3:n reunavalot Codexin tiedostonimin: kapea valo ikkunan reunassa luoteessa, koillisessa ja lounaassa.</summary>
        public static readonly string[] Cupola3ValoNimet = { "sun-nw", "sun-ne", "sun-sw" };
        const double R2 = 0.70710678118654752, Cupola3Keila = 0.35;
        /// <summary>Reunavalojen puolet kuvassa (x oikealle, y ylös) samassa järjestyksessä.</summary>
        static readonly (double x, double y)[] Cupola3Reunat = { (-R2, R2), (R2, R2), (-R2, -R2) };

        /// <summary>
        /// Cupola 3:n reunavalojen painot 0…1, kun aurinko on kuvan suunnassa (<paramref name="x"/>, <paramref name="y"/>; x
        /// oikealle, y ylös, CupolaKerros.Valo). Valo tulee lasin läpi ja osuu karmin sisäreunaan auringon VASTAKKAISELLA puolella
        /// (kuten Cupola 2:n reunavaloissa: kehys valaistuu, jos ikkuna on sen ja auringon välissä), eli luoteen reuna loistaa, kun
        /// aurinko on kaakossa. Pehmeä keila (0,35): suunnalle, jolla ei ole omaa kerrosta (aurinko luoteessa), kaksi viereistä
        /// himmeästi. Aurinko suoraan edessä tai takana (xy alle 0,001): ei reunavaloa.
        /// </summary>
        public static void Cupola3Valot(double x, double y, float[] painot)
        {
            double l = Math.Sqrt(x * x + y * y);
            for (int i = 0; i < Cupola3Reunat.Length; i++)
            {
                if (l < 1e-3) { painot[i] = 0; continue; }
                double vastaan = -(x * Cupola3Reunat[i].x + y * Cupola3Reunat[i].y) / l;
                painot[i] = (float)Math.Max(0, (vastaan + Cupola3Keila) / (1 + Cupola3Keila));
            }
        }
        /// <summary>Ikkunan katse nyt (A/B `astro kyyti katse &lt;astetta&gt;` ohittaa; NaN = rajauksen mukaan).</summary>
        public static double KatseAlasPakotettu = double.NaN;
        public static double IkkunanKatseNyt => !double.IsNaN(KatseAlasPakotettu) ? KatseAlasPakotettu
            : Horisontti ? HorisontinKatseAlas : IkkunanKatseAlas;
        /// <summary>Cupolan keskilasin kenttäkulma pystyyn ilman zoomia (lasi 80 cm, silmä 45 cm:n päässä; 1.0.37).</summary>
        public const double IkkunanPerusKentta = 80;
        /// <summary>
        /// Lähemmäs lasia (omistaja 28.9. klo 18.0x Päätoimittajan kautta: "zoomata näkymää vähän lähemmäksi lasia. Nyt näkymä
        /// ulos jää vähän liian pieneksi"): ikkunanäkymä zoomataan tällä kertoimella, eli maa ja Cupola-kerrokset
        /// (IssKyytiNakyma, CupolaKerros) suurenevat samassa suhteessa ja kehys täyttää ruudusta vähemmän. 1 = 1.0.37.
        /// A/B `astro kyyti lasi <kerroin>`.
        /// </summary>
        public static double LasiZoom = 1.3;
        /// <summary>Ikkunan kenttäkulma pystyyn zoomin jälkeen: tan(k / 2) = tan(80° / 2) / LasiZoom (1,3 → 65,7°).</summary>
        public static double IkkunanKentta => KenttaZoomilla(IkkunanPerusKentta, LasiZoom);

        /// <summary>Kenttäkulma (°) <paramref name="zoom"/>-kertaisella suurennoksella (kuvan keskeltä, kuten objektiivin zoom).</summary>
        public static double KenttaZoomilla(double kentta, double zoom) =>
            zoom > 0 ? 2 * Math.Atan(Math.Tan(kentta * 0.5 * Deg) / zoom) / Deg : kentta;

        const double Deg = Math.PI / 180;

        public static Kuvakulma Seuranta(in IssHetki iss) =>
            new Kuvakulma(iss.Paikka.Lat, iss.Paikka.Lon, SeurannanEtaisyysM, SeurannanKallistus, iss.Suuntima, iss.KorkeusM);

        /// <summary>
        /// Ikkuna: silmä ISS:ssä, katse maajäljen suuntaan <paramref name="alas"/> astetta vaakatason alapuolelle. Katsekohde
        /// on maan piste, johon katse osuu: nadiirikulma η = 90° − alas, kohteen zeniittikulma ζ = asin((R + h) / R · sin η),
        /// keskuskulma θ = ζ − η ja etäisyys ρ = R sin θ / sin η (420 km, 55°: θ 2,69°, ρ 521 km, ζ 37,7°). Kallistus on ζ ja
        /// suuntima kohteessa isoympyrän loppusuunta, jolloin silmä osuu ISS:ään.
        /// </summary>
        public static Kuvakulma Ikkuna(in IssHetki iss) => Ikkuna(iss, IkkunanKatseNyt);

        public static Kuvakulma Ikkuna(in IssHetki iss, double alas)
        {
            double r = MaanSadeM, h = Math.Max(1000, iss.KorkeusM);
            // Katseen on osuttava maahan: horisontin alapuolella vähintään 1°.
            double horisontti = Math.Acos(r / (r + h)) / Deg;
            alas = Math.Max(alas, horisontti + 1);
            double eta = (90 - alas) * Deg;
            double zeta = Math.Asin(Math.Min(1, (r + h) / r * Math.Sin(eta)));
            double theta = zeta - eta;
            double rho = eta > 1e-9 ? r * Math.Sin(theta) / Math.Sin(eta) : h;
            Kohde(iss.Paikka.Lat, iss.Paikka.Lon, iss.Suuntima, theta / Deg, out double lat, out double lon, out double loppu);
            return new Kuvakulma(lat, lon, rho, zeta / Deg, loppu, 0);
        }

        /// <summary>Ulkona: katse radan suunnasta näin monta astetta oikealle (sivulle), vaakatason alapuolelle ja kenttäkulma.</summary>
        public const double UlkonaSivulle = 90, UlkonaKatseAlas = 45, UlkonaKentta = 70;

        /// <summary>
        /// Ulkona (avaruuskävely): Ikkunan kaava radan sivulle. 420 km, 45° alas: kohteen zeniittikulma ζ = asin(6 791 / 6 371 ·
        /// sin 45°) ≈ 48,9°, eli laatat piirtyvät (yli ~55°:n kallistus näytti laitteella vain pohjapallon).
        /// </summary>
        public static Kuvakulma Ulkona(in IssHetki iss) =>
            Ikkuna(new IssHetki(iss.Paikka, iss.KorkeusM, (iss.Suuntima + UlkonaSivulle) % 360), UlkonaKatseAlas);

        /// <summary>Kaukonäkymän asento pelaajan kamerasta (katse alas, suuntima säilyy).</summary>
        public static Kuvakulma Kauko(double lat, double lon, double korkeusM, double kallistus, double suuntima) =>
            new Kuvakulma(lat, lon, korkeusM, kallistus, suuntima, 0);

        /// <summary>Kohteen yllä: kenttäkulma rajataan niin, että noin näin leveä alue (m) täyttää ruudun pystyn (pitkä objektiivi).</summary>
        public const double KohteenNakymaM = 90_000, KohteenKenttaMin = 6, KohteenKenttaMax = 50;

        /// <summary>
        /// Kohteen yllä (web kohteenKulma): katsekohde on kohde maan pinnalla, silmä ISS:ssä. Etäisyys ρ ja kohteen
        /// zeniittikulma ζ kolmiosta (R, R + h, keskuskulma θ); suuntima kohteessa on isoympyrän loppusuunta ISS:n
        /// alapisteestä, jolloin silmä osuu ISS:ään (sama kaava kuin Ikkuna, suunta käännettynä).
        /// </summary>
        public static Kuvakulma KohteenKulma(in IssHetki iss, double lat, double lon)
        {
            double r = MaanSadeM, h = Math.Max(1000, iss.KorkeusM);
            double theta = Kaari(iss.Paikka.Lat, iss.Paikka.Lon, lat, lon) * Deg;
            double rho = Math.Sqrt(r * r + (r + h) * (r + h) - 2 * r * (r + h) * Math.Cos(theta));
            double zeta = Math.Acos(Math.Max(-1, Math.Min(1, ((r + h) * Math.Cos(theta) - r) / rho)));
            double loppu = theta < 1e-7 ? iss.Suuntima : (Suunta(lat, lon, iss.Paikka.Lat, iss.Paikka.Lon) + 180) % 360;
            return new Kuvakulma(lat, lon, rho, zeta / Deg, loppu, 0);
        }

        /// <summary>Kohteen kenttäkulma etäisyydestä (asteina, web kohteenKentta): 2 atan(90 km / 2ρ), 6…50°.</summary>
        public static double KohteenKentta(double etaisyysM) =>
            Math.Max(KohteenKenttaMin, Math.Min(KohteenKenttaMax, 2 * Math.Atan(KohteenNakymaM / 2 / Math.Max(1, etaisyysM)) / Deg));

        /// <summary>Isoympyrän alkusuunta pisteestä a pisteeseen b (asteina 0…360).</summary>
        public static double Suunta(double lat1, double lon1, double lat2, double lon2)
        {
            double p1 = lat1 * Deg, p2 = lat2 * Deg, dl = (lon2 - lon1) * Deg;
            double y = Math.Sin(dl) * Math.Cos(p2), x = Math.Cos(p1) * Math.Sin(p2) - Math.Sin(p1) * Math.Cos(p2) * Math.Cos(dl);
            return (Math.Atan2(y, x) / Deg + 360) % 360;
        }

        /// <summary>Piste isoympyrällä: lähtö, suunta ja keskuskulma (asteina) → kohde ja loppusuunta.</summary>
        public static void Kohde(double lat, double lon, double suunta, double kaari, out double lat2, out double lon2, out double loppu)
        {
            double p1 = lat * Deg, l1 = lon * Deg, b = suunta * Deg, d = kaari * Deg;
            double p2 = Math.Asin(Math.Sin(p1) * Math.Cos(d) + Math.Cos(p1) * Math.Sin(d) * Math.Cos(b));
            double l2 = l1 + Math.Atan2(Math.Sin(b) * Math.Sin(d) * Math.Cos(p1), Math.Cos(d) - Math.Sin(p1) * Math.Sin(p2));
            lat2 = p2 / Deg;
            lon2 = ((l2 / Deg) + 540) % 360 - 180;
            loppu = (Suunta(lat2, lon2, lat, lon) + 180) % 360;
        }

        /// <summary>
        /// Asentojen sekoitus (t = 0…1, jo pehmennetty): katsekohde isoympyrää pitkin (slerp), etäisyys logaritmisesti
        /// (tasainen zoomin tuntu 18 000 km → 1 200 km), kallistus ja katsekorkeus lineaarisesti, suuntima lyhintä tietä.
        /// </summary>
        public static Kuvakulma Sekoita(in Kuvakulma a, in Kuvakulma b, double t)
        {
            if (t <= 0) return a;
            if (t >= 1) return b;
            Yksikko(a.Lat, a.Lon, out double ax, out double ay, out double az);
            Yksikko(b.Lat, b.Lon, out double bx, out double by, out double bz);
            double c = Math.Max(-1, Math.Min(1, ax * bx + ay * by + az * bz)), w = Math.Acos(c);
            double x, y, z;
            if (w < 1e-9) { x = ax; y = ay; z = az; }
            else
            {
                double s = Math.Sin(w), ka = Math.Sin((1 - t) * w) / s, kb = Math.Sin(t * w) / s;
                x = ka * ax + kb * bx; y = ka * ay + kb * by; z = ka * az + kb * bz;
            }
            double lat = Math.Atan2(z, Math.Sqrt(x * x + y * y)) / Deg, lon = Math.Atan2(y, x) / Deg;
            double et = Math.Exp(Math.Log(Math.Max(1, a.EtaisyysM)) * (1 - t) + Math.Log(Math.Max(1, b.EtaisyysM)) * t);
            double ds = ((b.Suuntima - a.Suuntima) % 360 + 540) % 360 - 180;
            return new Kuvakulma(lat, lon, et, a.Kallistus + (b.Kallistus - a.Kallistus) * t, (a.Suuntima + ds * t + 360) % 360,
                a.KatseKorkeusM + (b.KatseKorkeusM - a.KatseKorkeusM) * t);
        }

        /// <summary>Keskuskulma (asteina) kahden pisteen välillä.</summary>
        public static double Kaari(double lat1, double lon1, double lat2, double lon2)
        {
            Yksikko(lat1, lon1, out double ax, out double ay, out double az);
            Yksikko(lat2, lon2, out double bx, out double by, out double bz);
            return Math.Acos(Math.Max(-1, Math.Min(1, ax * bx + ay * by + az * bz))) / Deg;
        }

        static void Yksikko(double lat, double lon, out double x, out double y, out double z)
        {
            double p = lat * Deg, l = lon * Deg;
            x = Math.Cos(p) * Math.Cos(l); y = Math.Cos(p) * Math.Sin(l); z = Math.Sin(p);
        }
    }

    /// <summary>
    /// Cupolan valaistus (omistajan palaute 28.9.2026: valonlähteet tuovat luonnolliset valoisuuden muutokset sisäpintaan):
    /// onko ISS auringossa (sylinterivarjo: maan varjossa, kun aurinko on yli sivukulman verran pinnan alla), maavalo (maa
    /// alla päiväpuolella kirkas, yöpuolella hämärä) ja aurinko kameran koordinaateissa ruudun valonsuunnaksi.
    /// </summary>
    public static class CupolanValo
    {
        /// <summary>
        /// Auringossa, kun dot(ylös, aurinko) &gt; −√(1 − (R / (R + h))²): muuten aurinko on maan takana (420 km: −0,35 eli
        /// aurinko 20° horisontin alla). Palauttaa 0…1 pehmeällä reunalla (auringonnousu ISS:ltä kestää ~10 s).
        /// </summary>
        public static double Aurinkoisuus(double ylosDotAurinko, double korkeusKm)
        {
            double r = 6371.0 / (6371.0 + Math.Max(0, korkeusKm));
            double raja = -Math.Sqrt(Math.Max(0, 1 - r * r));
            return Pehmea((ylosDotAurinko - raja) / 0.02 + 0.5);
        }

        /// <summary>Maavalo 0,15…1: maa alla päiväpuolella kirkas, hämärässä himmenee, yöllä kaupunkien ja kuun valo.</summary>
        public static double Maavalo(double ylosDotAurinko) => 0.15 + 0.85 * Pehmea((ylosDotAurinko + 0.15) / 0.45);

        /// <summary>
        /// Aurinko kameran koordinaateissa (x oikealle, y ylös, z eteen) → ruudun valonsuunta (x, y) ja syvyys (z, &gt; 0 = edessä).
        /// Takana oleva aurinko valaisee kehystä sivulta (z rajataan), mutta ei koskaan suoraan edestä ruudun ulkopuolelta.
        /// </summary>
        public static (double x, double y, double z) Ruudulle(double x, double y, double z)
        {
            double l = Math.Sqrt(x * x + y * y + z * z);
            if (l < 1e-9) return (0, 1, 0);
            return (x / l, y / l, z / l);
        }

        static double Pehmea(double t)
        {
            t = t < 0 ? 0 : t > 1 ? 1 : t;
            return t * t * (3 - 2 * t);
        }
    }

    /// <summary>
    /// Kyydin tilakone: napautus vie seuraavaan tilaan, Poistu kaukonäkymään. Paivita antaa joka kehys kameran asennon ja
    /// kenttäkulman (siirtymän aikana sekoitettuna). Kaukonäkymässä kamera on pelaajan, joten asentoa ei anneta.
    /// </summary>
    public sealed class IssKyyti
    {
        /// <summary>Siirtymien kestot (s): kaukaa seurantaan (+ enintään 1,5 s, jos ISS on pallon toisella puolella), seurannan
        /// ja ikkunan välillä, sekä paluu kaukonäkymään.</summary>
        public const double KyytiinS = 2.5, KyytiinLisaS = 1.5, IkkunaanS = 1.2, KaukoonS = 2.0;
        /// <summary>Paluun korkeus avauskorkeuden osuutena (astronautin kameran lepokorkeus).</summary>
        public const double PaluuKorkeus = 0.72;
        /// <summary>Siirtymä seurannasta kohteen ylle (s, web KOHTEESEEN_S).</summary>
        public const double KohteeseenS = 1.2;
        /// <summary>Avaruuskävely: siirtymä ilmalukosta ulos kaiteelle ja takaisin sisään (seurantaan), s.</summary>
        public const double UlosS = 4, SisaanS = 2;

        /// <summary>Tila, johon ollaan menossa tai jossa ollaan.</summary>
        public KyydinTila Tila { get; private set; } = KyydinTila.Kauko;
        /// <summary>Kamera on kyydissä (seuranta, ikkuna, kohde tai siirtymä niiden välillä tai paluu kesken).</summary>
        public bool Kyydissa => Tila != KyydinTila.Kauko || siirtyy;
        public bool Siirtyy => siirtyy;
        /// <summary>Viimeisin ylilennon kohde (KyydinTila.Kohde katsoo siihen); null ennen ensimmäistä.</summary>
        public LatLon? Kohde => onKohde ? kohdePaikka : (LatLon?)null;
        /// <summary>
        /// Kyydin viimeksi antama asento ja kenttäkulma (web viimeisin): siirtymä lähtee tästä, koska pelikameran näkymä ei
        /// kerro katsekorkeutta (seurannassa ISS 420 km:ssä). OnAsento = kyyti on antanut asennon tämän kyydin aikana.
        /// </summary>
        public Kuvakulma Viimeisin => viimeisin;
        public double ViimeisinKentta => viimeisinKentta;
        public bool OnAsento { get; private set; }

        Kuvakulma alku, viimeisin;
        double alkuKentta, viimeisinKentta, t0, kesto;
        bool siirtyy;
        double paluuKorkeus;
        LatLon kohdePaikka;
        bool onKohde;

        /// <summary>
        /// Napautus: kauko → seuranta → ikkuna → seuranta; kohteen yltä takaisin seurantaan; ulkona ei mitään (avaruuskävely). <paramref name="nykyinen"/> on
        /// kameran asento nyt.
        /// </summary>
        public void Napauta(in Kuvakulma nykyinen, in IssHetki iss, double kentta, double nyt, bool vahennetty)
        {
            switch (Tila)
            {
                case KyydinTila.Kauko:
                    double kaari = IssKuvakulma.Kaari(nykyinen.Lat, nykyinen.Lon, iss.Paikka.Lat, iss.Paikka.Lon);
                    Aloita(KyydinTila.Seuranta, nykyinen, kentta, nyt, vahennetty ? 0 : KyytiinS + KyytiinLisaS * kaari / 180);
                    break;
                case KyydinTila.Seuranta:
                    Aloita(KyydinTila.Ikkuna, siirtyy ? viimeisin : nykyinen, siirtyy ? viimeisinKentta : kentta, nyt, vahennetty ? 0 : IkkunaanS);
                    break;
                case KyydinTila.Ulkona: break;   // avaruuskävelyn tilakone ohjaa (Ulos / Sisaan)
                case KyydinTila.Ikkuna:
                case KyydinTila.Kohde:
                    Aloita(KyydinTila.Seuranta, siirtyy ? viimeisin : nykyinen, siirtyy ? viimeisinKentta : kentta, nyt, vahennetty ? 0 : IkkunaanS);
                    break;
            }
        }

        /// <summary>Ylilento perillä (web kohteeseen): silmä ISS:ssä, katse kohteeseen, pitkä objektiivi.</summary>
        public void Kohteeseen(LatLon paikka, in Kuvakulma nykyinen, double kentta, double nyt, bool vahennetty)
        {
            kohdePaikka = paikka;
            onKohde = true;
            Aloita(KyydinTila.Kohde, siirtyy ? viimeisin : nykyinen, siirtyy ? viimeisinKentta : kentta, nyt, vahennetty ? 0 : KohteeseenS);
        }

        /// <summary>Avaruuskävely ulos (Avaruuskavely.Vaihe.Ulos): silmä kaiteelle, katse radan sivulle. Vain kyydissä.</summary>
        public void Ulos(in Kuvakulma nykyinen, double kentta, double nyt, bool vahennetty)
        {
            if (!Kyydissa || Tila == KyydinTila.Kauko) return;
            Aloita(KyydinTila.Ulkona, siirtyy ? viimeisin : nykyinen, siirtyy ? viimeisinKentta : kentta, nyt, vahennetty ? 0 : UlosS);
        }

        /// <summary>Avaruuskävely päättyi: takaisin sisään seurantaan.</summary>
        public void Sisaan(in Kuvakulma nykyinen, double kentta, double nyt, bool vahennetty)
        {
            if (Tila != KyydinTila.Ulkona) return;
            Aloita(KyydinTila.Seuranta, siirtyy ? viimeisin : nykyinen, siirtyy ? viimeisinKentta : kentta, nyt, vahennetty ? 0 : SisaanS);
        }

        /// <summary>✕: paluu kaukonäkymään ISS:n alapisteen ylle korkeudelle <paramref name="kaukoKorkeusM"/>.</summary>
        public void Poistu(double kaukoKorkeusM, double nyt, bool vahennetty)
        {
            if (!Kyydissa || (Tila == KyydinTila.Kauko && siirtyy)) return;
            paluuKorkeus = kaukoKorkeusM;
            Aloita(KyydinTila.Kauko, viimeisin, viimeisinKentta, nyt, vahennetty ? 0 : KaukoonS);
        }

        /// <summary>Kyyti pois heti (linssi suljetaan): ei asentoa, kenttäkulma palautetaan kutsujan puolella.</summary>
        public void Nollaa() { Tila = KyydinTila.Kauko; siirtyy = false; OnAsento = false; }

        void Aloita(KyydinTila uusi, in Kuvakulma nykyinen, double kentta, double nyt, double kestoS)
        {
            Tila = uusi;
            alku = nykyinen;
            alkuKentta = kentta;
            t0 = nyt;
            kesto = Math.Max(0, kestoS);
            siirtyy = true;
        }

        /// <summary>
        /// Tämän kehyksen asento ja kenttäkulma. false = kamera on pelaajan (kaukonäkymä, myös heti paluun päätyttyä:
        /// <paramref name="paluuValmis"/> kertoo, että kutsujan pitää lopettaa kuvaus ja palauttaa kenttäkulma).
        /// </summary>
        public bool Paivita(double nyt, in IssHetki iss, double perusKentta, out Kuvakulma asento, out double kentta, out bool paluuValmis)
        {
            paluuValmis = false;
            asento = default;
            kentta = perusKentta;
            if (!Kyydissa) return false;
            Kuvakulma kohde;
            double kohdeKentta = perusKentta;
            switch (Tila)
            {
                case KyydinTila.Seuranta: kohde = IssKuvakulma.Seuranta(iss); break;
                case KyydinTila.Ikkuna: kohde = IssKuvakulma.Ikkuna(iss); kohdeKentta = IssKuvakulma.IkkunanKentta; break;
                case KyydinTila.Ulkona: kohde = IssKuvakulma.Ulkona(iss); kohdeKentta = IssKuvakulma.UlkonaKentta; break;
                case KyydinTila.Kohde when onKohde:
                    kohde = IssKuvakulma.KohteenKulma(iss, kohdePaikka.Lat, kohdePaikka.Lon);
                    kohdeKentta = IssKuvakulma.KohteenKentta(kohde.EtaisyysM);
                    break;
                default:
                    kohde = IssKuvakulma.Kauko(Math.Max(-55, Math.Min(55, iss.Paikka.Lat)), iss.Paikka.Lon, paluuKorkeus, 0, 0);
                    break;
            }
            double u = kesto <= 0 ? 1 : Math.Max(0, Math.Min(1, (nyt - t0) / kesto));
            double s = Matkakirja.Linssit.Kamera.Kamerakayrat.Pehmea(u);
            asento = siirtyy ? IssKuvakulma.Sekoita(alku, kohde, s) : kohde;
            kentta = siirtyy ? alkuKentta + (kohdeKentta - alkuKentta) * s : kohdeKentta;
            if (u >= 1) siirtyy = false;
            viimeisin = asento;
            viimeisinKentta = kentta;
            OnAsento = true;
            if (Tila == KyydinTila.Kauko && !siirtyy) { paluuValmis = true; return true; }
            return true;
        }
    }

    /// <summary>
    /// Kyydin simuloitu aika tietoriville ja ohjaimille (web paivitaTietorivi). Oletusarvo = LIVE. Linssi antaa tämän
    /// tietorivin kanssa: kerran sekunnissa (nopeutettuna 4 kertaa) sekä tilan, nopeuden ja ylilennon vaihtuessa.
    /// </summary>
    public readonly struct KyydinAika
    {
        /// <summary>Aika ei ole LIVE (nopeutus, kelaus tai perillä ylilennolla): pilleri näyttää kertoimen ilman LIVE-sanaa,
        /// piste ei ole punainen eikä syki, ja pillerin napautus = Palaa LIVE.</summary>
        public readonly bool Nopeutettu;
        /// <summary>Kelaus käynnissä (Palaa LIVE tai ylilento): portaassa ei valintaa.</summary>
        public readonly bool Kelaa;
        /// <summary>Portaan kerroin (1, 10, 100, 1000), kun ei kelata.</summary>
        public readonly int Porras;
        /// <summary>Todellinen nopeus (×), kelauksessa derivaatta.</summary>
        public readonly double Nopeus;
        /// <summary>Ylilennon rivi ("Venetsia · Ylilento klo 14.32, 3 h 12 min päästä") tai null (rivi piiloon).</summary>
        public readonly string Ylilento;

        public KyydinAika(bool nopeutettu, bool kelaa, int porras, double nopeus, string ylilento)
        { Nopeutettu = nopeutettu; Kelaa = kelaa; Porras = porras; Nopeus = nopeus; Ylilento = ylilento; }

        /// <summary>Portaan valittu kerroin (web valittu): null kelauksen aikana, LIVE:nä 1.</summary>
        public int? Valittu => Kelaa ? (int?)null : Nopeutettu ? Math.Max(1, Porras) : 1;

        /// <summary>Kellon tila nyt (Nopeus lukee kellon ensin, jolloin juuri päättynyt kelaus näkyy jo).</summary>
        public static KyydinAika Kellosta(Simukello s, string ylilento)
        {
            double nopeus = s.Nopeus();
            return new KyydinAika(!s.Live, s.Kelaa, (int)Math.Round(s.Kerroin), nopeus, ylilento);
        }
    }

    /// <summary>
    /// Kyydin tekstit (web iss-kyyti.js tietorivi, nopeudenMerkki, ylilennonTeksti): kokonaisluvut suomeksi tuhaterottimella
    /// U+00A0 alustan lokaalista riippumatta.
    /// </summary>
    public static class KyydinTeksti
    {
        /// <summary>Tietorivi: merkki (LIVE, kerroin tai null) ja teksti; Live = punainen sykkivä piste.</summary>
        public readonly struct Rivi
        {
            public readonly bool Live;
            public readonly string Merkki, Teksti;
            public Rivi(bool live, string merkki, string teksti) { Live = live; Merkki = merkki; Teksti = teksti; }
        }

        /// <summary>
        /// "● LIVE · ISS · 418 km · 27 580 km/h"; nopeutettuna (<paramref name="kerroin"/> annettu) "● 100× · ISS · …" ilman
        /// LIVE-sanaa (omistaja 28.9. klo 12.1x: kerroin kertoo, ettei ISS ole juuri nyt tuossa); ilman tuoretta TLE:tä ei
        /// LIVE-merkkiä vaan loppuun "rata-arvio". Nopeus kymmeniin.
        /// </summary>
        public static Rivi Tietorivi(double korkeusKm, double nopeusKmh, bool arvio, double? kerroin = null)
        {
            string km = Luku(korkeusKm), kmh = Luku(Math.Floor(nopeusKmh / 10 + 0.5) * 10);
            string k = kerroin.HasValue ? NopeudenMerkki(kerroin.Value) : null;
            string merkki = k ?? (arvio ? null : "LIVE");
            return new Rivi(!arvio && k == null, merkki,
                (merkki != null ? "· " : "") + $"ISS · {km} km · {kmh} km/h" + (arvio ? " · rata-arvio" : ""));
        }

        /// <summary>Nopeuskerroin pilleriin kahdella merkitsevällä numerolla: 1×, 10×, 870×, 1 000×.</summary>
        public static string NopeudenMerkki(double k)
        {
            double x = double.IsNaN(k) ? 0 : Math.Abs(k);
            if (x < 1.5) return "1×";
            double d = Math.Pow(10, Math.Max(0, Math.Floor(Math.Log10(x)) - 1));
            return Luku(Math.Floor(x / d + 0.5) * d) + "×";
        }

        /// <summary>Ylilennon kellonaika (paikallinen) ja aika siihen: "Ylilento klo 14.32, 3 h 12 min päästä".</summary>
        public static string YlilennonTeksti(DateTime hetkiUtc, DateTime nytUtc, TimeZoneInfo vyohyke = null)
        {
            var d = TimeZoneInfo.ConvertTimeFromUtc(DateTime.SpecifyKind(hetkiUtc, DateTimeKind.Utc), vyohyke ?? TimeZoneInfo.Local);
            int min = Math.Max(0, (int)Math.Floor((hetkiUtc - nytUtc).TotalMinutes + 0.5));
            int h = min / 60;
            return $"Ylilento klo {d.Hour}.{d.Minute:00}, " + (h > 0 ? $"{h} h {min % 60} min" : $"{min} min") + " päästä";
        }

        /// <summary>Kokonaisluku tuhaterottimella U+00A0 (web toLocaleString('fi-FI'), pyöristys kuten Math.round).</summary>
        public static string Luku(double n) =>
            Math.Floor(n + 0.5).ToString("#,0", CultureInfo.InvariantCulture).Replace(',', '\u00a0');
    }
}
