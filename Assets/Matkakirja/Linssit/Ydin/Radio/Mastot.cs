// RADIOMASTOT (radiouudistus build 12, Fable hyväksyi 24.9.2026; suunnitelma
// docs/raportit/linssi-radiouudistus-suunnitelma-20260924.md luvut 4–7). Vain luvut ja käyrät, ei piirtoa:
// Natiiviseppä piirtää mastot, vilkun, maavalon ja renkaat IRadioKartan takana, tämä kertoo mitä.
//
//   koko        kaupungin asukasluvusta (kaupungit.json "asukkaat", Wikidata P1082):
//               ≥ 2 milj. Iso (Fable 24.9. klo 20.2x: P1082 on kaupungin raja, Pariisi 2,1 milj.), 0,5–2 milj. Keski, muuten Pieni. Puuttuva (luontokohteet kuten Sahara,
//               Alpit) ja asukkaatAlue (luku koskee saarta tai valtiota: Angola, Madagaskar, Islanti) → Pieni:
//               syrjäinen paikka saa pienen maston, alueen väkiluku ei kerro kaupungista (Linssiseppä 24.9.,
//               skeema 1.38)
//   vilkku      muut mastot: jakso 1,5 s ± 20 % ja vaihe aseman tunnuksesta, palaa 0,45 s, reunat 0,12 s
//   valittu     kirkkaus = max(0,25, VU), nousu 30 ms, lasku 250 ms
//   renkaat     uusi 1,6 s välein lukituksesta, kasvu kuuluvuussäteeseen 4,8 s käyrällä Nousu,
//               alfa 0,55 → 0 säteen mukana
//   rahina      viivainta vedettäessä: u = max(0, 1 − e/0,18)², lähetys sin(u·π/2), rahina cos(u·π/2)
//   kamera-ajo  2,28 s (saapuu lukkoon), alle 150 km 1,2 s; kaaren korotus 1 + 0,6·min(1, d/2500 km)
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Kamera;

namespace Matkakirja.Linssit.Radio
{
    public enum MastoKoko { Pieni, Keski, Iso }

    /// <summary>Radiomasto pallolla (suunnitelma luku 9): kaupunki, paikka, koko ja mitä se näyttää.</summary>
    public sealed class Masto
    {
        /// <summary>Kaupungin tunnus (sama kuin RadioNappi.Kaupunki); napautus → SoitaKaupunki.</summary>
        public string Id;
        /// <summary>Aseman tunnus (maa, ISO3): vilkun jakso ja vaihe (Mastot.Vilkku).</summary>
        public string Asema;
        public double Lat, Lon;
        public MastoKoko Koko;
        /// <summary>Soitettava asema: valot palavat. false = kanavaton maa: ei valoja, peittävyys 50 %.</summary>
        public bool Kanava;
        /// <summary>Linkkiasema (kielletty luokka): valot palavat, renkaita ei synny.</summary>
        public bool Linkki;
    }

    /// <summary>
    /// Mastojen, hämärän, renkaiden ja yövalojen piirto (Natiiviseppä, Unity). Linssi kutsuu näitä; muiden
    /// mastojen vilkku lasketaan varjostimessa Mastot.VilkunValo-kaavalla (jakso ja vaihe tunnuksesta).
    /// </summary>
    public interface IRadioMastot
    {
        /// <summary>Kerran avauksessa; null = mastot pois (sulku).</summary>
        void Mastot(IReadOnlyList<Masto> mastot);
        /// <summary>Mastojen nousu maasta 0…1 mastoittain (avaus 0,6 s Nousu, porrastettu etäisyyden mukaan).</summary>
        void Nousu(string id, float osuus);
        /// <summary>Hämärä 0…1 joka kehys avauksen ja sulun aikana (suunnitelma luku 3).</summary>
        void Hamara(float h);
        /// <summary>Valittu masto ja sen kirkkaus (VU-tahti, MastonKirkkaus); null = ei valittua.</summary>
        void Valittu(string id, float kirkkaus);
        /// <summary>Radioaaltorenkaat: keskus, kuuluvuussäde ja näkyvien renkaiden osuudet 0…1 (alfa 0,55 × (1 − osuus)).</summary>
        void Renkaat(double lat, double lon, double sadeKm, IReadOnlyList<double> osuudet);
        /// <summary>Yövalojen paikallinen tehostus valitun maston ympärillä (0…1).</summary>
        void YonValot(double lat, double lon, float paikallinen);
    }

    public static class Mastot
    {
        public const long IsoRaja = 2_000_000, KeskiRaja = 500_000;

        /// <summary>Kokoluokka asukasluvusta; puuttuva tai alueen (saari, valtio) luku → Pieni.</summary>
        public static MastoKoko Koko(long? asukkaat, bool alue = false) =>
            asukkaat is long a && !alue ? (a >= IsoRaja ? MastoKoko.Iso : a >= KeskiRaja ? MastoKoko.Keski : MastoKoko.Pieni) : MastoKoko.Pieni;

        public static MastoKoko Koko(RadioKaupunki k) => Koko(k?.Asukkaat, k?.AsukkaatAlue ?? false);

        /// <summary>Maston korkeus ruudulla (pt) 2 600 km:n korkeudelta katsottuna.</summary>
        public static double KorkeusPt(MastoKoko k) => k switch { MastoKoko.Iso => 64, MastoKoko.Keski => 46, _ => 30 };

        /// <summary>Kuuluvuusalue = renkaiden suurin säde (km).</summary>
        public static double KuuluvuusKm(MastoKoko k) => k switch { MastoKoko.Iso => 900, MastoKoko.Keski => 600, _ => 350 };

        /// <summary>Lentoestevalojen korkeudet osuutena maston korkeudesta.</summary>
        public static IReadOnlyList<double> Valotasot(MastoKoko k) => k switch
        {
            MastoKoko.Iso => ValotIso,
            MastoKoko.Keski => ValotKeski,
            _ => ValotPieni,
        };
        static readonly double[] ValotIso = { 0.36, 0.68, 1.0 }, ValotKeski = { 0.5, 1.0 }, ValotPieni = { 1.0 };

        /// <summary>Maston korkeus maailmassa (m): c × kameran korkeus^0,85 (koko ruudulla kasvaa hieman lähelle mentäessä).</summary>
        public static double KorkeusM(MastoKoko k, double kameranKorkeusM)
        {
            // c niin, että 2 600 km:stä iPadin 1024 pt:n leveydellä (≈ 2 400 km) korkeus on KorkeusPt.
            const double Viite = 2_600_000, MetriaPerPt = 2_400_000.0 / 1024;
            double c = KorkeusPt(k) * MetriaPerPt / Math.Pow(Viite, 0.85);
            return c * Math.Pow(Math.Max(1, kameranKorkeusM), 0.85);
        }

        // ---- Vilkku (muut mastot) ----

        public const double VilkunJakso = 1.5, VilkunVaihtelu = 0.2, VilkkuPalaa = 0.45, VilkunReuna = 0.12;

        /// <summary>FNV-1a: sama asema saa aina saman jakson ja vaiheen (ei Randomia, toistettava).</summary>
        static uint Tiiviste(string s)
        {
            uint h = 2166136261;
            foreach (char c in s ?? "") { h ^= c; h *= 16777619; }
            return h;
        }

        /// <summary>Aseman vilkun jakso (s) ja vaihe (0…1).</summary>
        public static (double jakso, double vaihe) Vilkku(string asemaId)
        {
            uint h = Tiiviste(asemaId);
            double a = (h & 0xffff) / 65535.0, b = (h >> 16) / 65535.0;
            return (VilkunJakso * (1 + VilkunVaihtelu * (2 * a - 1)), b);
        }

        /// <summary>Muun maston valo 0…1 hetkellä t (s). Sama kaava varjostimeen.</summary>
        public static double VilkunValo(string asemaId, double t)
        {
            var (jakso, vaihe) = Vilkku(asemaId);
            double x = ((t / jakso + vaihe) % 1 + 1) % 1 * jakso;   // s jakson alusta
            if (x >= VilkkuPalaa) return 0;
            double nousu = Math.Min(1, x / VilkunReuna), lasku = Math.Min(1, (VilkkuPalaa - x) / VilkunReuna);
            return Kamerakayrat.Pehmea(Math.Min(nousu, lasku));
        }

        // ---- Renkaat ----

        public const double RenkaanVali = 1.6, RenkaanKasvu = 4.8, RenkaanAlfa = 0.55;

        /// <summary>
        /// Näkyvien renkaiden osuudet säteestä (0…1) hetkellä s lukituksesta; tyhjä ennen lukitusta.
        /// Kasvu käyrällä Nousu. Alfa = RenkaanAlfa × (1 − osuus).
        /// </summary>
        public static List<double> Renkaat(double sLukosta) => Renkaat(sLukosta, new List<double>());

        /// <summary>Sama annettuun listaan (joka kehys ilman uutta listaa); lista tyhjennetään ensin.</summary>
        public static List<double> Renkaat(double sLukosta, List<double> o)
        {
            o.Clear();
            if (sLukosta < 0) return o;
            int uusin = (int)Math.Floor(sLukosta / RenkaanVali);
            for (int i = uusin; i >= 0; i--)
            {
                double ika = sLukosta - i * RenkaanVali;
                if (ika >= RenkaanKasvu) break;
                o.Add(Kamerakayrat.Arvo(Kayra.Nousu, ika / RenkaanKasvu));
            }
            return o;
        }

        // ---- Rahina (viivaimen veto) ----

        public const double RahinanLeveys = 0.18;

        /// <summary>Lähetyksen ja rahinan tasot, kun viisari on e asemaväliä lähimmästä asemasta (tasatehoinen pari).</summary>
        public static (double lahetys, double rahina) Rahina(double e)
        {
            double u = Math.Max(0, 1 - Math.Abs(e) / RahinanLeveys);
            u *= u;
            return (RadioLinssi.Nouseva(u), RadioLinssi.Vaistyva(u));
        }

        // ---- Kamera-ajo ----

        public const double KameraAjo = (RadioLinssi.LukitusAikaisintaanMs) / 1000.0, LyhytAjo = 1.2, LyhytMatkaKm = 150;

        public static double KameraAjonKesto(double matkaKm) => matkaKm < LyhytMatkaKm ? LyhytAjo : KameraAjo;

        /// <summary>Korkeuden kerroin kaaren keskellä.</summary>
        public static double KaarenKorotus(double matkaKm) => 1 + 0.6 * Math.Min(1, matkaKm / 2500);

        public const double RadionKallistus = 40, AvausS = 1.5, SulkuS = 0.8, NousuS = 0.6, NousunPorras = 0.6, ValojenSyttyminen = 1.2;

        /// <summary>Isoympyrän etäisyys (km).</summary>
        public static double EtaisyysKm(double lat1, double lon1, double lat2, double lon2)
        {
            double r = Math.PI / 180, a = Math.Sin((lat2 - lat1) * r / 2), b = Math.Sin((lon2 - lon1) * r / 2);
            double h = a * a + Math.Cos(lat1 * r) * Math.Cos(lat2 * r) * b * b;
            return 2 * 6371 * Math.Asin(Math.Min(1, Math.Sqrt(h)));
        }

        /// <summary>Piste isoympyrällä osuudella u (0…1, ylitys sallittu kuminauhaa varten).</summary>
        public static (double lat, double lon) Isoympyra(double lat1, double lon1, double lat2, double lon2, double u)
        {
            double r = Math.PI / 180;
            double x1 = Math.Cos(lat1 * r) * Math.Cos(lon1 * r), y1 = Math.Cos(lat1 * r) * Math.Sin(lon1 * r), z1 = Math.Sin(lat1 * r);
            double x2 = Math.Cos(lat2 * r) * Math.Cos(lon2 * r), y2 = Math.Cos(lat2 * r) * Math.Sin(lon2 * r), z2 = Math.Sin(lat2 * r);
            double d = Math.Acos(Math.Clamp(x1 * x2 + y1 * y2 + z1 * z2, -1, 1));
            if (d < 1e-9) return (lat1, lon1);
            double a = Math.Sin((1 - u) * d) / Math.Sin(d), b = Math.Sin(u * d) / Math.Sin(d);
            double x = a * x1 + b * x2, y = a * y1 + b * y2, z = a * z1 + b * z2;
            return (Math.Atan2(z, Math.Sqrt(x * x + y * y)) / r, Math.Atan2(y, x) / r);
        }
    }

    /// <summary>Valitun maston kirkkaus VU-tasosta: nousu 30 ms, lasku 250 ms, lattia 0,25.</summary>
    public sealed class MastonKirkkaus
    {
        public const double Nousu = 0.030, Lasku = 0.250, Lattia = 0.25;
        double taso;
        public double Arvo => Math.Max(Lattia, taso);

        /// <summary>Päivitys kehyksen lopussa: dt sekunteina, vu 0…1.</summary>
        public double Paivita(double vu, double dt)
        {
            vu = Math.Clamp(vu, 0, 1);
            double tau = vu > taso ? Nousu : Lasku;
            taso += (vu - taso) * (1 - Math.Exp(-Math.Max(0, dt) / tau));
            return Arvo;
        }

        public void Nollaa() => taso = 0;
    }
}
