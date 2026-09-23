// MATKALAUKKU (web #passport-dialog, js/ui.js renderProgress, renderAarteet,
// renderFinds, renderJulisteet): pelaajan kukkaro, tietäjätaso, matkan
// tilastot, Aarnin luettelo, tavarat ja voitetut julisteet puhtaana datana.
// Natiivi-UI piirtää näkymän (Ylapalkki-pilleri → laukku); Pelikoodari antaa
// datan PeliOhjain.Laukku()-kutsulla ja ilmoittaa muutoksista
// PeliOhjain.TilaMuuttui-tapahtumalla. Varusteet (linssit) ovat Linssisepän.
// Ei UnityEngineä: testattavissa Peli-testit/Testit/LaukkuTestit.cs.
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Peli;

namespace Matkakirja.Natiivi
{
    /// <summary>Tietäjätaso laukun Matka-lohkoon (web tietajataso, tietajatasonOsuus, seuraavaTietajataso).</summary>
    public sealed class LaukkuTietaja
    {
        public int Taso;
        public string Nimi;
        public int Pisteet;
        /// <summary>Edistyminen kohti seuraavaa tasoa 0..1 (palkki).</summary>
        public double Osuus;
        /// <summary>Seuraava taso tai null huipulla ("Seuraava taso {Raja} tp: {Nimi}").</summary>
        public string SeuraavaNimi;
        public int? SeuraavaRaja;
        /// <summary>Muotokuva (web tietajaAvatar: assets/tietaja/taso-NN.jpg).</summary>
        public string AvatarUrl;
    }

    /// <summary>Aarnin luettelon rivi: mantereen unohdettu aarre (web aarreLuettelo).</summary>
    public sealed class LaukkuAarre
    {
        /// <summary>Vakaa tunnus: "aarni:&lt;manner&gt;".</summary>
        public string Id;
        public string Manner;
        public string Nimi;
        public string KuvaUrl;
        public bool Loydetty;
    }

    /// <summary>Tavarat-rivi (web renderFinds): pääaarteet yksitellen, muut aarteet nimen mukaan ryhmiteltynä.</summary>
    public sealed class LaukkuTavara
    {
        /// <summary>Vakaa tunnus: "tavara:&lt;tyyppi&gt;:&lt;manner&gt;:&lt;maa&gt;" ensimmäisestä löydöstä (pääaarteella indeksi perässä).</summary>
        public string Id;
        public string Tyyppi;
        public string Nimi;
        public string KuvaUrl;
        public int Maara;
        /// <summary>Web: nimi ja "×n", kun useampi.</summary>
        public string Teksti => Maara > 1 ? $"{Nimi} ×{Maara}" : Nimi;
    }

    /// <summary>Voitettu juliste (web julisteVoitot, julisteUrl).</summary>
    public sealed class LaukkuJuliste
    {
        public string Avain;
        public string Otsikko, Lyhyt, Selite;
        public string Url;
    }

    /// <summary>Laukun koko sisältö. Uusi olio joka kutsulla (PeliOhjain.Laukku()).</summary>
    public sealed class LaukkuNaytto
    {
        public string Sijainti;
        public int Raha;
        /// <summary>Web "£{money}".</summary>
        public string Kukkaro => "£" + Raha;
        public LaukkuTietaja Tietaja;
        /// <summary>Matkan tilastot (väkäsen alla): otsikko ja arvo webin järjestyksessä.</summary>
        public List<(string Otsikko, string Arvo)> Tilastot = new List<(string, string)>();
        /// <summary>Aarnin luettelo: kaikki mantereet; web näyttää löydetyt ja "Kateissa n".</summary>
        public List<LaukkuAarre> AarninLuettelo = new List<LaukkuAarre>();
        public int Kateissa => AarninLuettelo.Count(a => !a.Loydetty);
        public List<LaukkuTavara> Tavarat = new List<LaukkuTavara>();
        /// <summary>Tyhjän Tavarat-lohkon teksti (web: "Laukku on vielä tyhjä." / "Ei vielä matkalöytöjä.").</summary>
        public string TavaratTyhja;
        /// <summary>Voitetut julisteet voittojärjestyksessä; rivi piiloon, kun tyhjä.</summary>
        public List<LaukkuJuliste> Julisteet = new List<LaukkuJuliste>();
        /// <summary>Julisteita kaikkiaan (web "{voitetut}/{kaikki} »").</summary>
        public int JulisteitaKaikkiaan;
        /// <summary>Kolme viimeisintä, uusin ensin (web slice(-3).reverse()).</summary>
        public List<LaukkuJuliste> ViimeisimmatJulisteet =>
            Julisteet.Skip(Math.Max(0, Julisteet.Count - 3)).Reverse().ToList();
    }

    /// <summary>
    /// Matkan yhteenveto (web matkanYhteenveto + natiiviMatkaTeksti): jakoteksti ja
    /// kaikkien aarteiden virstanpylväs (PeliOhjain.KaikkiAarteetLoytyi).
    /// </summary>
    public sealed class MatkanYhteenveto
    {
        public int Paivat, Kaupungit, Aarteet, AarteitaKaikkiaan;
        public bool KaikkiLoytyi => AarteitaKaikkiaan > 0 && Aarteet >= AarteitaKaikkiaan;

        /// <summary>Web natiiviMatkaTeksti: "Matkakirja: 12 päivää, 30 kaupunkia, 2 unohdettua aarretta löytyi."</summary>
        public string Teksti
        {
            get
            {
                string M(int n, string yksi, string monta) => $"{n} {(n == 1 ? yksi : monta)}";
                return $"Matkakirja: {M(Paivat, "päivä", "päivää")}, {M(Kaupungit, "kaupunki", "kaupunkia")}, "
                    + (Aarteet > 0 ? M(Aarteet, "unohdettu aarre", "unohdettua aarretta") + " löytyi" : "yksikään unohdettu aarre ei vielä löytynyt") + ".";
            }
        }

        public static MatkanYhteenveto Laske(Matka m, LaukkuNaytto laukku) => new MatkanYhteenveto
        {
            Paivat = m.Tila.Paiva(),
            Kaupungit = m.Tila.Pelaaja.Kaydyt.Count,
            Aarteet = laukku.AarninLuettelo.Count(a => a.Loydetty),
            AarteitaKaikkiaan = laukku.AarninLuettelo.Count,
        };
    }

    public static class Laukku
    {
        public const string JulisteJuuri = "https://media.matkakirja.app/julisteet/";
        public const string SivustoJuuri = "https://matkakirja.app/";

        /// <summary>
        /// Rakentaa laukun pelin tilasta. nimet = kokoelmat laatat + paikallisaarteet
        /// (Aarrenimet), julisteet = kokoelma julisteet (Kauppasisalto) tai null.
        /// linssejaOmistetaan = pelaajalla on varusteita (vain tyhjän laukun teksti).
        /// </summary>
        public static LaukkuNaytto Rakenna(Matka m, Aarrenimet nimet, Kauppasisalto julisteet = null, bool linssejaOmistetaan = false)
        {
            var p = m.Tila.Pelaaja;
            var v = m.Verkko;
            var d = new LaukkuNaytto { Sijainti = SijaintiNimi(v, p.Sijainti), Raha = p.Raha };

            var taso = Kokemus.TasoPisteille(p.Xp);
            var seuraava = Kokemus.SeuraavaTaso(p.Xp);
            d.Tietaja = new LaukkuTietaja
            {
                Taso = taso.Taso, Nimi = taso.Nimi, Pisteet = p.Xp, Osuus = Kokemus.TasonOsuus(p.Xp),
                SeuraavaNimi = seuraava?.Nimi, SeuraavaRaja = seuraava?.Raja,
                AvatarUrl = SivustoJuuri + $"assets/tietaja/taso-{taso.Taso:00}.jpg",
            };

            // Aarnin luettelo: mantereet laatat.mannerTypes-järjestyksessä, joilla on pääaarre.
            foreach (var manner in nimet?.Mantereet ?? Enumerable.Empty<string>())
            {
                var a = nimet.Hae(Laattatyypit.Paaaarre, manner, null);
                if (a?.Nimi == null) continue;
                d.AarninLuettelo.Add(new LaukkuAarre
                {
                    Id = "aarni:" + manner, Manner = manner, Nimi = a.Nimi, KuvaUrl = a.KuvaUrl,
                    Loydetty = m.Laatat != null && m.Laatat.PaaaarreLoytynyt(manner),
                });
            }

            // Tilastot (web tilastoRivi-järjestys).
            d.Tilastot.Add(("Avatut aarteet", $"{d.AarninLuettelo.Count(a => a.Loydetty)} / {d.AarninLuettelo.Count}"));
            int kaupunkeja = v.Kaupungit.Count;
            if (kaupunkeja > 0) d.Tilastot.Add(("Käydyt kaupungit", $"{p.Kaydyt.Count} / {kaupunkeja}"));
            var kaikkiMaat = new HashSet<string>(v.Kaupungit.Values.Select(k => k.Maa).Where(x => !string.IsNullOrEmpty(x)));
            if (kaikkiMaat.Count > 0)
            {
                var kaydytMaat = new HashSet<string>(p.Kaydyt
                    .Select(id => v.Kaupungit.TryGetValue(id, out var k) ? k.Maa : null).Where(x => !string.IsNullOrEmpty(x)));
                d.Tilastot.Add(("Käydyt maat", $"{kaydytMaat.Count} / {kaikkiMaat.Count}"));
            }
            if (Kokemus.Tietoprosentti(p) is int tieto) d.Tilastot.Add(("Tieto tästä laudasta", $"{tieto} %"));

            // Tavarat: pääaarteet ensin yksitellen, sitten muut aarteet nimen mukaan.
            string Kohta(List<string> l, int i) => i < l.Count ? l[i] : null;
            for (int i = 0; i < p.Loydot.Count; i++)
            {
                if (p.Loydot[i] != Laattatyypit.Paaaarre) continue;
                string manner = Kohta(p.LoytoMantereet, i);
                var a = nimet?.Hae(Laattatyypit.Paaaarre, manner, null);
                d.Tavarat.Add(new LaukkuTavara
                {
                    Id = $"tavara:{Laattatyypit.Paaaarre}:{manner}:#{i}", Tyyppi = Laattatyypit.Paaaarre,
                    Nimi = a?.Nimi ?? Laattatyypit.Paaaarre, KuvaUrl = a?.KuvaUrl, Maara = 1,
                });
            }
            var ryhmat = new Dictionary<string, LaukkuTavara>();
            for (int i = 0; i < p.Loydot.Count; i++)
            {
                var tyyppi = p.Loydot[i];
                if (tyyppi == Laattatyypit.Paaaarre || !Laattatyypit.OnAarre(tyyppi)) continue;
                string manner = Kohta(p.LoytoMantereet, i), maa = Kohta(p.LoytoMaat, i);
                var a = nimet?.Hae(tyyppi, manner, maa);
                var nimi = a?.Nimi ?? tyyppi;
                if (ryhmat.TryGetValue(nimi, out var r)) { r.Maara++; continue; }
                r = new LaukkuTavara { Id = $"tavara:{tyyppi}:{manner}:{maa}", Tyyppi = tyyppi, Nimi = nimi, KuvaUrl = a?.KuvaUrl, Maara = 1 };
                ryhmat[nimi] = r;
                d.Tavarat.Add(r);
            }
            if (d.Tavarat.Count == 0) d.TavaratTyhja = linssejaOmistetaan ? "Ei vielä matkalöytöjä." : "Laukku on vielä tyhjä.";

            // Julisteet: Kauppatila.Julisteet voittojärjestyksessä, vain tunnetut (web filter JULISTEET[id]).
            if (julisteet != null)
            {
                d.JulisteitaKaikkiaan = julisteet.Julisteet.Count;
                foreach (var avain in m.Tila.Kaupat.Julisteet)
                    if (julisteet.Julisteet.TryGetValue(avain, out var j))
                        d.Julisteet.Add(new LaukkuJuliste
                        {
                            Avain = avain, Otsikko = j.Otsikko, Lyhyt = j.Lyhyt, Selite = j.Selite,
                            Url = string.IsNullOrEmpty(j.Tiedosto) ? null
                                : j.Tiedosto.StartsWith("http", StringComparison.Ordinal) ? j.Tiedosto : JulisteJuuri + j.Tiedosto,
                        });
            }
            return d;
        }

        /// <summary>Tiivis JSON testikomentojen tilaraporttiin (peli-tila.json, kenttä laukku).</summary>
        public static string Json(LaukkuNaytto d)
        {
            if (d == null) return "null";
            string T(string x) => PeliApu.Json(x);
            string Lista(IEnumerable<string> l) => "[" + string.Join(",", l) + "]";
            return "{\"sijainti\":" + T(d.Sijainti) + ",\"kukkaro\":" + T(d.Kukkaro)
                + ",\"tietaja\":{\"taso\":" + d.Tietaja.Taso + ",\"nimi\":" + T(d.Tietaja.Nimi) + ",\"pisteet\":" + d.Tietaja.Pisteet + "}"
                + ",\"tilastot\":" + Lista(d.Tilastot.Select(t => "[" + T(t.Otsikko) + "," + T(t.Arvo) + "]"))
                + ",\"aarni\":" + Lista(d.AarninLuettelo.Where(a => a.Loydetty).Select(a => T(a.Id))) + ",\"kateissa\":" + d.Kateissa
                + ",\"tavarat\":" + Lista(d.Tavarat.Select(t => T(t.Teksti)))
                + ",\"julisteet\":" + Lista(d.Julisteet.Select(j => T(j.Avain))) + ",\"julisteitaKaikkiaan\":" + d.JulisteitaKaikkiaan + "}";
        }

        /// <summary>Web: kaupungissa nimi, reitillä "matkalla — {lähempi kaupunki}" (factCity).</summary>
        public static string SijaintiNimi(IReittiverkko v, Sijainti s)
        {
            if (s.Kaupungissa) return PeliApu.KaupunginNimi(v, s.Kaupunki);
            if (!v.Reitit.TryGetValue(s.Reitti, out var r)) return "matkalla";
            var lahempi = s.Askel * 2 <= r.Askeleet ? r.A : r.B;
            return "matkalla — " + PeliApu.KaupunginNimi(v, lahempi);
        }
    }
}
