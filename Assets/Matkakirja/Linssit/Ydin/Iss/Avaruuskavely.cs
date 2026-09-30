// AVARUUSKÄVELY (omistaja 29.9.2026 "Kyllä, radion jälkeen"; suunnitelma docs/raportit/avaruuskavely-suunnitelma-20260929.md):
// lyhyt käsikirjoitettu hetki ISS:n ulkopuolella. Ilmalukko (napautus avaa luukun) → Ulos (4 s kaiteelle) → Köysi (napautus
// kiinnittää) → Auringonnousu (simukello kelaa ISS:n seuraavaan auringonnousuun, ≤ 5 s kuten ylilento) → Pulu (repliikki
// radiossa) → Kuva (napautus) → Vertailu (oma kuva + astronautin NASA-kuva lähimmästä kohteesta) → Takaisin (2 s sisään).
// Ei vapaata liikkumista. Puhdas C#: tilakone ja auringonnousun haku; AstronauttiLinssi kytkee kyydin (IssKyyti.Ulos/Sisaan)
// ja kellon (Simukello.KelaaHetkeen), Unity-puoli näyttää kerrokset ja repliikit.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Aikajana;
using Matkakirja.Linssit.Astronautti;

namespace Matkakirja.Linssit.Iss
{
    public enum KavelynVaihe { Ei, Ilmalukko, Ulos, Koysi, Auringonnousu, Pulu, Kuva, Vertailu, Takaisin }

    /// <summary>Pulun repliikki: Puhe äänitagien kanssa (xAI / Pelikoodarin radioversio), Teksti ilman tageja puhekuplaan.</summary>
    public readonly struct KavelynRepliikki
    {
        public readonly string Tunnus, Puhe;
        public KavelynRepliikki(string tunnus, string puhe) { Tunnus = tunnus; Puhe = puhe; }
        public string Teksti => Avaruuskavely.IlmanTageja(Puhe);
    }

    public sealed class Avaruuskavely
    {
        /// <summary>Automaattiset vaiheet (s): ulos kaiteelle (= IssKyyti.UlosS), Pulun repliikki (napautus nopeuttaa;
        /// Pelikoodarin radioversio avaruuskavely-2 8,80 s + quindar 0,25 s + tauko) ja paluu sisään (= IssKyyti.SisaanS).</summary>
        public const double UlosS = IssKyyti.UlosS, PuluS = 9.5, TakaisinS = IssKyyti.SisaanS;
        /// <summary>Kelaus päättyy näin monta simuloitua sekuntia ENNEN auringonnousua, ja vaihe jatkuu nousun jälkeen
        /// JalkeenS: pelaaja näkee valon pyyhkäisyn (ISS:ltä nousu kestää noin 10 s) omassa tahdissaan.</summary>
        public const double EnnenS = 4, JalkeenS = 3;
        /// <summary>Jos auringonnousua ei löydy (ei TLE:tä tms.), vaihe päättyy tämän jälkeen (s).</summary>
        public const double NousuVaraS = 2;
        /// <summary>Auringonnousun haku: enintään kaksi kierrosta eteenpäin, askel ja tarkkuus (s).</summary>
        public const double NousuHakuS = 2 * IssNyt.KierrosS, NousuAskelS = 10, NousuTarkkuusS = 0.5;

        /// <summary>Pulun repliikit (Päätoimittaja 29.9., sanatarkasti).</summary>
        public static readonly KavelynRepliikki Luukku = new KavelynRepliikki("luukku",
            "[excited] Luukku on auki! [warmly] Kiinnitä köysi kaiteeseen ennen kuin päästät irti – täällä ei ole alas, on vain ympäri.");
        public static readonly KavelynRepliikki Nousu = new KavelynRepliikki("nousu",
            "[excited] Katso horisonttia! [warmly] Kierrämme maapallon puolessatoista tunnissa, joten aurinko nousee meille noin kuusitoista kertaa vuorokaudessa.");
        public static readonly KavelynRepliikki Kuva = new KavelynRepliikki("kuva",
            "[amused] Hymyile, kamera on valmis! [warmly] Ota kuva – verrataan sitä astronautin oikeaan kuvaan samalta paikalta.");

        public KavelynVaihe Vaihe { get; private set; } = KavelynVaihe.Ei;
        public bool Kaynnissa => Vaihe != KavelynVaihe.Ei;
        /// <summary>Vaiheen alku (reaaliaika s, sama kello kuin Paivita).</summary>
        public double VaiheAlkoi { get; private set; }
        /// <summary>Haettu auringonnousu (simuloitu UTC) Auringonnousu-vaiheessa, null = ei löytynyt tai ei vielä haettu.</summary>
        public DateTime? NousuHetki { get; private set; }
        /// <summary>Vaihe vaihtui (uusi vaihe); linssi kytkee kyydin, kellon ja näkymän.</summary>
        public event Action<KavelynVaihe> Vaihtui;

        /// <summary>Vaiheen repliikki (luukku ulos lähtiessä ja köydellä, nousu Pulun vaiheessa, kuva kuvausvaiheessa) tai null.</summary>
        public KavelynRepliikki? Repliikki => Vaihe switch
        {
            KavelynVaihe.Ulos or KavelynVaihe.Koysi => Luukku,
            KavelynVaihe.Pulu => Nousu,
            KavelynVaihe.Kuva => Kuva,
            _ => null,
        };

        /// <summary>Lyhyt ohjeteksti vaiheen napautukselle (paikkamerkki; null = ei napautettavaa).</summary>
        public string Ohje => Vaihe switch
        {
            KavelynVaihe.Ilmalukko => "Napauta: avaa luukku",
            KavelynVaihe.Koysi => "Napauta: kiinnitä köysi",
            KavelynVaihe.Kuva => "Napauta: ota kuva",
            KavelynVaihe.Vertailu => "Napauta: takaisin sisään",
            _ => null,
        };

        public void Aloita(double nyt)
        {
            if (Kaynnissa) return;
            Siirry(KavelynVaihe.Ilmalukko, nyt);
        }

        /// <summary>Pelaajan napautus: vie seuraavaan vaiheeseen, paitsi siirtymien ja kelauksen aikana (≤ 5 s).</summary>
        public void Napauta(double nyt)
        {
            switch (Vaihe)
            {
                case KavelynVaihe.Ilmalukko: Siirry(KavelynVaihe.Ulos, nyt); break;
                case KavelynVaihe.Koysi: Siirry(KavelynVaihe.Auringonnousu, nyt); break;
                case KavelynVaihe.Pulu: Siirry(KavelynVaihe.Kuva, nyt); break;
                case KavelynVaihe.Kuva: Siirry(KavelynVaihe.Vertailu, nyt); break;
                case KavelynVaihe.Vertailu: Siirry(KavelynVaihe.Takaisin, nyt); break;
            }
        }

        /// <summary>Kävely keskeytetään (linssi suljetaan tai ✕): suoraan pois ilman paluuvaihetta.</summary>
        public void Lopeta(double nyt)
        {
            if (Kaynnissa) Siirry(KavelynVaihe.Ei, nyt);
        }

        /// <summary>Auringonnousu-vaiheen kohde (linssi hakee SeuraavaNousu:lla vaiheen alkaessa).</summary>
        public void AsetaNousu(DateTime? hetki) => NousuHetki = hetki;

        /// <summary>Automaattiset siirtymät. <paramref name="simuNyt"/> = simuloitu UTC (IssNyt.Kello).</summary>
        public void Paivita(double nyt, DateTime simuNyt)
        {
            double t = nyt - VaiheAlkoi;
            switch (Vaihe)
            {
                case KavelynVaihe.Ulos when t >= UlosS: Siirry(KavelynVaihe.Koysi, nyt); break;
                case KavelynVaihe.Auringonnousu:
                    if (NousuHetki.HasValue ? simuNyt >= NousuHetki.Value.AddSeconds(JalkeenS) : t >= NousuVaraS)
                        Siirry(KavelynVaihe.Pulu, nyt);
                    break;
                case KavelynVaihe.Pulu when t >= PuluS: Siirry(KavelynVaihe.Kuva, nyt); break;
                case KavelynVaihe.Takaisin when t >= TakaisinS: Siirry(KavelynVaihe.Ei, nyt); break;
            }
        }

        void Siirry(KavelynVaihe uusi, double nyt)
        {
            Vaihe = uusi;
            VaiheAlkoi = nyt;
            if (uusi != KavelynVaihe.Auringonnousu) NousuHetki = null;
            Vaihtui?.Invoke(uusi);
        }

        // ---- Auringonnousu ISS:ltä ----

        /// <summary>
        /// Auringon korkeuskulman sini ISS:n alapisteessä miinus näkyvän horisontin raja: &gt; 0 = ISS auringossa. Horisontti on
        /// korkeudelta h kulman dip = acos(R / (R + h)) verran alempana (420 km: 20,3°), eli raja on −sin(dip) (sama kuin
        /// CupolanValo.Aurinkoisuus ja sylinterivarjo Aurinko.Varjossa).
        /// </summary>
        public static double Valoisuus(DateTime utc, LatLon alapiste, double korkeusKm)
        {
            Aurinko.Alihajapiste(Aika.Jd(utc), out double alat, out double alon);
            const double r = Math.PI / 180;
            double s = Math.Sin(alapiste.Lat * r) * Math.Sin(alat * r)
                + Math.Cos(alapiste.Lat * r) * Math.Cos(alat * r) * Math.Cos((alapiste.Lon - alon) * r);
            double q = 6371.0 / (6371.0 + Math.Max(0, korkeusKm));
            return s + Math.Sqrt(Math.Max(0, 1 - q * q));
        }

        /// <summary>
        /// Pulun vaiheessa aurinko nousee nopeutettuna (×): 9,5 s × 24 ≈ 4 min, jolloin valo ehtii horisontista maahan päin
        /// (ISS:n nousun hetkellä maa alla on vielä yötä, aurinko 20° horisontin alla; laite 29.9. kavely2). Kuvasta eteenpäin 1×.
        /// </summary>
        public const double NousuKerroin = 24;
        /// <summary>
        /// Etualan reunavalo (Codexin valo-*-kerrokset, oranssi viiva siluetin reunassa): voimakas auringonnousun matalassa valossa
        /// ja heikko muulloin (laite kavely2: koko päivän täydellä voimalla sädekehä). ReunaValo = aurinko × (pohja + (1 − pohja) ×
        /// max(0, 1 − valoisuus / ReunaKaista)); kaista 0,05 ≈ 45 s ISS:n nousun jälkeen.
        /// </summary>
        public const double ReunaPohja = 0.2, ReunaKaista = 0.05;

        public static double ReunaValo(DateTime utc)
        {
            double v = Valoisuus(utc, IssNyt.Paikka(utc), IssNyt.KorkeusKm(utc));
            double a = Aurinkoisuus(utc);
            return a * (ReunaPohja + (1 - ReunaPohja) * Math.Max(0, Math.Min(1, 1 - v / ReunaKaista)));
        }

        /// <summary>Katsotaanko ulkona kohti aurinkoa (true, oletus) vai radan sivulle (A/B `astro kavely suunta aurinko|sivu`).</summary>
        public static bool KohtiAurinkoa = true;

        /// <summary>Auringon suunta ISS:n alapisteestä (asteina pohjoisesta, isoympyrä alihajapisteeseen).</summary>
        public static double AuringonSuunta(DateTime utc)
        {
            var p = IssNyt.Paikka(utc);
            Aurinko.Alihajapiste(Aika.Jd(utc), out double alat, out double alon);
            return IssKuvakulma.Suunta(p.Lat, p.Lon, alat, alon);
        }

        /// <summary>ISS auringossa 0…1 pehmeällä reunalla (kuten CupolanValo.Aurinkoisuus): etualan valokerrokset ja metallin sävy.</summary>
        public static double Aurinkoisuus(DateTime utc)
        {
            double v = Valoisuus(utc, IssNyt.Paikka(utc), IssNyt.KorkeusKm(utc)) / 0.02 + 0.5;
            v = v < 0 ? 0 : v > 1 ? 1 : v;
            return v * v * (3 - 2 * v);
        }

        /// <summary>
        /// ISS:n SEURAAVA auringonnousu hetken <paramref name="alku"/> jälkeen: varjosta valoon (Valoisuus nousee yli 0).
        /// Karkea haku 10 s:n askelin enintään kaksi kierrosta, sitten puolitus 0,5 s:iin. null = ei nousua (esim. rata
        /// koko ajan auringossa, beta-kulma suuri).
        /// </summary>
        public static DateTime? SeuraavaNousu(Func<DateTime, LatLon> paikka, Func<DateTime, double> korkeusKm, DateTime alku,
            double hakuS = NousuHakuS)
        {
            double V(DateTime t) => Valoisuus(t, paikka(t), korkeusKm(t));
            double edellinen = V(alku);
            for (double s = NousuAskelS; s <= hakuS; s += NousuAskelS)
            {
                var t = alku.AddSeconds(s);
                double v = V(t);
                if (edellinen <= 0 && v > 0)
                {
                    DateTime a = alku.AddSeconds(s - NousuAskelS), b = t;
                    while ((b - a).TotalSeconds > NousuTarkkuusS)
                    {
                        var m = a.AddTicks((b - a).Ticks / 2);
                        if (V(m) > 0) b = m; else a = m;
                    }
                    return b;
                }
                edellinen = v;
            }
            return null;
        }

        // ---- Cupola päivänvaloon (arvioija 1.1 (75), Päätoimittaja 30.9.: yöpuolen Cupola näytti rikkinäiseltä) ----

        /// <summary>Auringon korkeuskulman sini ISS:n alapisteessä (maa ISS:n alla: &gt; 0 = päivä).</summary>
        public static double MaanAurinko(DateTime utc, LatLon alapiste)
        {
            Aurinko.Alihajapiste(Aika.Jd(utc), out double alat, out double alon);
            const double r = Math.PI / 180;
            return Math.Sin(alapiste.Lat * r) * Math.Sin(alat * r)
                + Math.Cos(alapiste.Lat * r) * Math.Cos(alat * r) * Math.Cos((alapiste.Lon - alon) * r);
        }

        /// <summary>Yöpuoli: aurinko alapisteessä horisontin alla. Päivänvalo: aurinko vähintään ~14,5° (sini 0,25), jolloin
        /// maa on valoisa myös ikkunan horisonttia kohti eikä ilta tule heti (aamupuolelta haettuna valo vain kasvaa).</summary>
        public const double YoRaja = 0, PaivaRaja = 0.25, PaivaAskelS = 20, PaivaHakuS = 3 * 3600;

        public static bool Yopuolella(DateTime utc) => MaanAurinko(utc, IssNyt.Paikka(utc)) < YoRaja;

        /// <summary>
        /// Seuraava hetki <paramref name="alku"/>:sta, jolloin maa ISS:n alla on päivänvalossa (MaanAurinko ≥ PaivaRaja):
        /// 20 s:n askelin enintään 3 h, sitten puolitus 1 s:iin. Jo valoisassa = alku. null = ei valoa hakuajassa (napayö).
        /// </summary>
        public static DateTime? SeuraavaPaivanvalo(Func<DateTime, LatLon> paikka, DateTime alku, double hakuS = PaivaHakuS)
        {
            double A(DateTime t) => MaanAurinko(t, paikka(t));
            if (A(alku) >= PaivaRaja) return alku;
            for (double s = PaivaAskelS; s <= hakuS; s += PaivaAskelS)
            {
                var t = alku.AddSeconds(s);
                if (A(t) < PaivaRaja) continue;
                DateTime a = alku.AddSeconds(s - PaivaAskelS), b = t;
                while ((b - a).TotalSeconds > 1)
                {
                    var m = a.AddTicks((b - a).Ticks / 2);
                    if (A(m) >= PaivaRaja) b = m; else a = m;
                }
                return b;
            }
            return null;
        }

        /// <summary>SeuraavaNousu ISS:n todellisella radalla (IssNyt: SGP4 tai havainnollinen rata).</summary>
        public static DateTime? SeuraavaNousu(DateTime alku) => SeuraavaNousu(IssNyt.Paikka, IssNyt.KorkeusKm, alku);

        /// <summary>Kelauksen tavoite: EnnenS ennen nousua, tai null, jos nousu on jo niin lähellä ettei kelata.</summary>
        public static DateTime? KelausHetki(DateTime nousu, DateTime nyt)
        {
            var k = nousu.AddSeconds(-EnnenS);
            return k > nyt ? k : (DateTime?)null;
        }

        // ---- Vertailukuva ----

        /// <summary>
        /// Astronautin NASA-kuva vertailuun: aineiston kohde lähimpänä ISS:n alapistettä (mieluiten sen kuvaamaa aluetta).
        /// null = ei kohteita. Etäisyys km (Ylilennot.MaaEtaisyysKm) kortin tekstiin.
        /// </summary>
        public static (Havaintokohde Kohde, double Km)? LahinKohde(IEnumerable<Havaintokohde> kohteet, double lat, double lon)
        {
            Havaintokohde paras = null;
            double parasKm = double.MaxValue;
            if (kohteet != null)
                foreach (var k in kohteet)
                {
                    if (k == null || double.IsNaN(k.Lat) || double.IsNaN(k.Lon)) continue;
                    double d = Ylilennot.MaaEtaisyysKm(lat, lon, k.Lat, k.Lon);
                    if (d < parasKm) { parasKm = d; paras = k; }
                }
            return paras == null ? ((Havaintokohde, double)?)null : (paras, parasKm);
        }

        /// <summary>Äänitagit pois ("[excited] Luukku…" → "Luukku…"), välilyönnit siistiksi.</summary>
        public static string IlmanTageja(string puhe)
        {
            if (string.IsNullOrEmpty(puhe)) return puhe ?? "";
            var sb = new System.Text.StringBuilder(puhe.Length);
            bool tagi = false;
            foreach (char c in puhe)
            {
                if (c == '[') { tagi = true; continue; }
                if (c == ']') { tagi = false; continue; }
                if (tagi) continue;
                if (c == ' ' && (sb.Length == 0 || sb[sb.Length - 1] == ' ')) continue;
                sb.Append(c);
            }
            return sb.ToString().Trim();
        }
    }
}
