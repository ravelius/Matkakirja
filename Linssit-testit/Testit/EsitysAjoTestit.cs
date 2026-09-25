// Ihmisen matkan esitys alusta loppuun oikealla kertomuksella ja
// kertomusmanifestilla (kultaiset/ihmisen-matka.json): kertoja soi
// vale-äänitteenä, ja testi tarkistaa koreografian hetket.
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using Matkakirja.Linssit.Aikajana;
using Matkakirja.Linssit.Kamera;

namespace Matkakirja.Linssit.Testit
{
    public static class EsitysAjoTestit
    {
        internal sealed class ValeAani : IEsityksenAani
        {
            readonly ValeYmparisto y;
            double? alku;       // kello (ms), jolloin kohta oli 0
            double? tauolla;
            public readonly double Pituus;
            public readonly List<double> Siirrot = new List<double>();
            public ValeAani(ValeYmparisto y, double pituus) { this.y = y; Pituus = pituus; }
            /// <summary>Kuinka monta ensimmäistä kelausta epäonnistuu (ääni alkaa nollasta; iPad-vika).</summary>
            public int RikkiKelauksia;
            public void Soita(double kohta)
            {
                Siirrot.Add(kohta);
                if (RikkiKelauksia > 0) { RikkiKelauksia--; kohta = 0; }
                alku = y.Kello * 1000 - kohta;
                tauolla = null;
            }
            public void Tauko() { if (alku != null) tauolla = KohtaMs; }
            public void Jatka() { if (tauolla is double k) { alku = y.Kello * 1000 - k; tauolla = null; } }
            public void Lopeta() { alku = null; tauolla = null; }
            public double? KohtaMs => tauolla ?? (alku is double a ? Math.Min(Pituus, y.Kello * 1000 - a) : (double?)null);
        }

        internal sealed class ValeNakyma : IEsityksenNakyma
        {
            readonly ValeYmparisto y;
            public readonly List<(double ms, string mita)> Loki = new List<(double, string)>();
            public double Kellossa;
            public ValeNakyma(ValeYmparisto y) { this.y = y; }
            void K(string s) => Loki.Add((y.Kello * 1000, s));
            public void Musta(bool p, double f) => K($"musta {p}");
            public void Valot(double f) => K("valot");
            public void PidonPohja(double v) => K("pohja " + v);
            public void Jakso(int i, KertomusJakso j) => K("jakso " + j.Id);
            public void Kello(double v) => Kellossa = v;
            public void SytytaKohde(string k) => K("sytyta " + k);
            public void Kuva(string k) => K("kuva " + (k ?? "pois"));
            public void Pulu(string t) => K("pulu");
            public void Tunne(string t, double v, string j) => K("tunne " + t);
            public void VirtojenPito(bool p) => K("pito " + p);
            public void Loppu() => K("loppu");
            public double Hetki(string mita) => Loki.First(l => l.mita == mita).ms;
        }

        static JsonElement Data() => JsonDocument.Parse(File.ReadAllText(
            Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", "ihmisen-matka.json"))).RootElement;

        static (Esitys e, ValeYmparisto y, ValeNakyma n, ValeAani a, Dictionary<string, JaksonLeimat> l, List<KertomusJakso> k) Luo()
        {
            var d = Data();
            var kertomus = EsitysAjoTestitApu.WebinKertomus();
            var kohteet = d.GetProperty("kohteet").EnumerateObject()
                .ToDictionary(p => p.Name, p => new LatLon(p.Value[0].GetDouble(), p.Value[1].GetDouble()));
            return Luo2(d, kertomus, kohteet);
        }

        static (Esitys e, ValeYmparisto y, ValeNakyma n, ValeAani a, Dictionary<string, JaksonLeimat> l, List<KertomusJakso> k) Luo2(
            JsonElement d, List<KertomusJakso> kertomus, Dictionary<string, LatLon> kohteet)
        {
            var _ = d.GetProperty("kertomus").EnumerateArray().Select(j => new KertomusJakso
            {
                Id = j.GetProperty("id").GetString(),
                Vaihe = j.GetProperty("vaihe").GetString(),
                Kohde = j.GetProperty("kohde").ValueKind == JsonValueKind.String ? j.GetProperty("kohde").GetString() : null,
                Hiljaiset = j.GetProperty("hiljaiset").EnumerateArray().Select(x => x.GetString()).ToList(),
                Alue = j.GetProperty("alue").ValueKind == JsonValueKind.String ? j.GetProperty("alue").GetString() : null,
                Vuosia = j.GetProperty("vuosia").ValueKind == JsonValueKind.Number ? j.GetProperty("vuosia").GetDouble() : (double?)null,
                Teksti = j.GetProperty("teksti").GetString(),
                Pulu = j.GetProperty("pulu").ValueKind == JsonValueKind.String ? j.GetProperty("pulu").GetString() : null,
                Tunne = j.GetProperty("tunne").ValueKind == JsonValueKind.String ? j.GetProperty("tunne").GetString() : null,
            }).ToList();
            var rivit = d.GetProperty("leimat").EnumerateObject().Select(p => p.Value).OrderBy(v => v.GetProperty("alku").GetDouble())
                .Select(v => (v.GetProperty("tunnus").GetString(), v.GetProperty("alku").GetDouble(), v.GetProperty("loppu").GetDouble(),
                    (IReadOnlyList<double>)v.GetProperty("lauseet").EnumerateArray().Select(x => x.GetDouble()).ToList(),
                    (IReadOnlyList<(string, double)>)v.GetProperty("sanat").EnumerateArray()
                        .Select(s => (s.GetProperty("sana").GetString(), s.GetProperty("alku").GetDouble())).ToList()))
                .ToList();
            var leimat = JaksonLeimat.Manifestista(rivit);
            var y = new ValeYmparisto();
            var n = new ValeNakyma(y);
            var a = new ValeAani(y, leimat.Values.Max(l => l.Paattyy));
            var e = new Esitys(kertomus, kohteet, leimat, null, y, n, a);
            return (e, y, n, a, leimat, kertomus);
        }

        static void Aja(Esitys e, ValeYmparisto y, double sekunnit, double dt = 1 / 60.0)
        {
            double loppu = y.Kello + sekunnit;
            while (y.Kello < loppu && !e.Paattynyt) { y.Kello += dt; e.Paivita(); }
        }

        [Testi] static void UusiEsitysKelaaKertojanAlkuun()
        {
            // Löydös 74 (build 12, iPhone): "Aloita alusta" tauon jälkeen, ja kertoja jatkoi vanhasta kohdasta.
            // Sama äänite jää edellisen esityksen tauon kohtaan (80 s); uuden esityksen pitää kelata jakson 0 alkuun.
            var (e, y, _, a, l, k) = Luo();
            a.Soita(80000);
            a.Tauko();
            e.Aloita();
            Lahella(l[k[0].Id].Alku, a.Siirrot.Last(), "kertoja kelattu jakson 0 alkuun", 1e-9);
            Aja(e, y, 0.5);
            Oleta.Tosi(a.KohtaMs is double kohta && kohta < 1000, "kertoja alusta: " + a.KohtaMs);
            Oleta.Sama(0, e.I, "jakso 0");
        }

        [Testi] static void AvausLasketaanManifestista()
        {
            var (e, y, _, _, _, _) = Luo();
            e.Aloita();
            var o = Data().GetProperty("avauksenVaiheet");
            var v = e.AvauksenAjat();
            Oleta.Sama(o.GetProperty("musta").GetDouble(), v.Musta, "musta");
            Oleta.Sama(o.GetProperty("zoomAlku").GetDouble(), v.ZoomAlku, "zoomAlku");
            Oleta.Sama(o.GetProperty("zoomLoppu").GetDouble(), v.ZoomLoppu, "zoomLoppu");
            Oleta.Sama(o.GetProperty("afrikka").GetDouble(), v.Afrikka, "afrikka");
        }

        [Testi] static void AvausLahteeAvaruudesta()
        {
            // Web avaaKaukaisuus (js/linssit/ihmisen-matka-esitys.js:1460, pointOfView(…, 0)): kamera 300 pallonsäteen
            // päähän Afrikan yllä HETI mustan alla (löydös 74 e: näkyvä nousu mustan häivyttyä näytti pallon kutistumisena),
            // HETKI TÄHDISSÄ, SYÖKSY Afrikkaan kuminauhajarrutuksella (omistajan build 5 -löydös 12: zoomi lähti kaupungista).
            var (e, y, _, _, _, _) = Luo();
            e.Aloita();
            var v = e.AvauksenAjat();
            Oleta.Tosi(y.Ajo == null && y.Avaruus != null, "kamera avaruudessa jo mustan alla, ilman ajoa");
            Oleta.Tosi(e.MustaPaalla, "musta päällä, kun kamera siirtyy");
            Lahella(Esitysmatikka.AvaruudenKorkeus, y.Avaruus.Value.Sateita, "avaruuden korkeus (pallonsäteitä)", 1e-9);
            Lahella(1.0, y.Avaruus.Value.Lat, "avaruuden keskus lat (−35…37)", 1e-9);
            Lahella(17.0, y.Avaruus.Value.Lon, "avaruuden keskus lon (−18…52)", 1e-9);
            Aja(e, y, (v.Musta + 100) / 1000.0);
            Oleta.Tosi(!e.MustaPaalla && y.Ajo == null, "musta häipyi, kamera paikallaan (ei näkyvää nousua)");
            int ajoja = y.Loki.Count(l => l == "ajo");
            Aja(e, y, (v.ZoomAlku - v.Musta - 300) / 1000.0);
            Oleta.Sama(ajoja, y.Loki.Count(l => l == "ajo"), "hetki tähdissä: ei uutta ajoa ennen zoomia");
            Aja(e, y, 0.6);
            Oleta.Tosi(y.Loki.Count(l => l == "ajo") == ajoja + 1, "syöksy Afrikkaan alkoi");
            Oleta.Tosi(y.Ajo.Value.Korkeus < Esitysmatikka.AvaruudenKorkeus * Kameramatikka.MaanSade / 10, "syöksy alas");
            double yli = Enumerable.Range(0, 101).Max(i => y.AjonPehmennys(i / 100.0));
            Oleta.Tosi(yli > 1.0, "kuminauhajarrutus ylittää hieman");

            var (e2, y2, _, _, _, _) = Luo();
            y2.Vahennetty = true;
            e2.Aloita();
            Aja(e2, y2, 3);
            Oleta.Tosi(y2.Avaruus == null && (y2.Ajo == null || y2.Ajo.Value.Korkeus < Esitysmatikka.AvaruudenKorkeus * Kameramatikka.MaanSade / 10),
                "vähennetty liike: ei nousua avaruuteen");
        }

        [Testi] static void KoreografiaAlustaLoppuun()
        {
            var (e, y, n, a, leimat, kertomus) = Luo();
            e.Aloita();
            var v = e.AvauksenAjat();
            Aja(e, y, 500);
            Oleta.Tosi(e.Paattynyt, "esitys päättyi");
            // Äänite aloitettiin kerran eikä sitä siirretty jaksojen välissä.
            Oleta.Sama(1, a.Siirrot.Count, "ääni siirrettiin vain alussa");
            // Äänite alkaa avauksen kohdasta (80 ms), joten testikello = äänitteen kohta − alku.
            double alku = leimat["avaus"].Alku;
            // Musta nousee toisen lauseen kohdalla, zoomi alkaa ja päättyy avauksen hetkinä.
            Lahella(v.Musta, n.Hetki("musta False"), "musta pois toisen lauseen kohdalla", 20);
            Oleta.Tosi(n.Hetki("musta False") <= v.ZoomAlku, "musta pois viimeistään zoomin alkaessa");
            Oleta.Tosi(n.Hetki("valot") >= v.ZoomLoppu - 20, "valot vasta avaruuszoomin jälkeen");
            Oleta.Tosi(n.Hetki("pito True") >= n.Hetki("valot"), "virtojen pito valoista alkaen");
            // Jaksot kertomuksen järjestyksessä, ja kukin alkaa äänitteen omalla kohdallaan.
            var jaksot = n.Loki.Where(l => l.mita.StartsWith("jakso ")).ToList();
            Oleta.Sama(string.Join(",", kertomus.Select(j => j.Id)), string.Join(",", jaksot.Select(j => j.mita.Substring(6))));
            for (int i = 1; i < jaksot.Count; i++)
            {
                var id = kertomus[i].Id;
                Lahella(leimat[id].Alku - alku, jaksot[i].ms, "jakson " + id + " alku", 20);
            }
            Oleta.Tosi(n.Loki.Any(l => l.mita == "sytyta jebel-irhoud"));
            Oleta.Tosi(n.Loki.Any(l => l.mita == "sytyta blombos"), "hiljainen kohde arabia-jaksossa");
            Oleta.Sama(kertomus.Count(j => j.Pulu != null), n.Loki.Count(l => l.mita == "pulu"), "pulun välihuomiot");
            Oleta.Tosi(n.Loki.Last().mita == "loppu");
            Oleta.Sama(360.0, e.ViimeisinAjo.Value.leveysAst, "loppu: koko pallo");
        }

        [Testi] static void KohdeajoMarokkoonEnnenJaksoa()
        {
            var (e, y, n, _, leimat, _) = Luo();
            e.Aloita();
            Aja(e, y, leimat["jebel-irhoud"].Alku / 1000 - 0.1);
            Oleta.Sama("afrikka", e.I == 1 ? "afrikka" : e.I.ToString(), "ollaan valot-jaksossa");
            var ajo = e.ViimeisinAjo.Value;
            Oleta.Tosi(Math.Abs(ajo.keskus.Lat - 31.855) < 1 && Math.Abs(ajo.keskus.Lon + 8.8725) < 1, "kamera matkalla Jebel Irhoudiin: " + ajo.keskus);
            Oleta.Tosi(ajo.kestoMs >= Esitysmatikka.MarokonPohjaMs, "kohdeajon kesto ≥ pohja");
            Oleta.Tosi(y.AjonPehmennys != null && Math.Abs(y.AjonPehmennys(0.5) - Esitysmatikka.MarokonKaari(0.5)) < 1e-12,
                "kohdeajo Marokon kaarella");
            // Kohdejakson alku ei aja kameraa uudestaan (kohdeajo kulutetaan).
            var ennen = e.ViimeisinAjo;
            Aja(e, y, 0.2);
            Oleta.Sama(ennen, e.ViimeisinAjo, "jakson alku ei korvaa kohdeajoa");
        }

        [Testi] static void KelloKulkeeJaksonOsuutena()
        {
            var (e, y, n, _, leimat, kertomus) = Luo();
            e.Aloita();
            var omo = leimat["omo"];
            Aja(e, y, (omo.Alku + omo.Kesto / 2) / 1000);
            Oleta.Sama("omo", kertomus[e.I].Id);
            double osuus = Math.Min(1, e.Kulunut / e.Luenta);
            // omo: 230 000 → seuraavan jakson (ranta) 164 000 v. sitten.
            Lahella(230000 + (164000 - 230000) * osuus, n.Kellossa, "kello omo-jakson puolivälissä", 1e-6);
            Oleta.Tosi(osuus > 0.4 && osuus < 0.6, "puolivälissä: " + osuus);
        }

        [Testi] static void HyppyKelaaKellonTaakse()
        {
            var (e, y, n, _, leimat, kertomus) = Luo();
            e.Aloita();
            var hyppy = leimat["aikahyppy"];
            Aja(e, y, (hyppy.Alku + 100) / 1000);
            Oleta.Sama("aikahyppy", kertomus[e.I].Id);
            Oleta.Tosi(n.Kellossa < 50000 && n.Kellossa > 14500, "kelaa 14 500 → 50 000: " + n.Kellossa);
            Aja(e, y, Esitysmatikka.KelauksenMs / 1000);
            // Kelaus perillä 50 000:ssa, ja kello on jo lähtenyt kohti 45 000:ta.
            Oleta.Tosi(n.Kellossa <= 50000 && n.Kellossa > 49500, "kelaus perillä: " + n.Kellossa);
        }

        [Testi] static void HyppyKeskenMarokkoAjonAjaaOmaanKohteeseen()
        {
            var (e, y, n, a, leimat, kertomus) = Luo();
            e.Aloita();
            // Odotetaan, kunnes avauksen Marokko-ajo on lähtenyt (kamera kohti ~−8 °E).
            for (int k = 0; k < 60 * 60 && !(e.ViimeisinAjo?.keskus.Lon < 0); k++) Aja(e, y, 1 / 60.0);
            Oleta.Tosi(e.ViimeisinAjo?.keskus.Lon < 0, "Marokko-ajo lähti");
            Oleta.Tosi(kertomus[e.I].Id != "jebel-irhoud", "yhä ennen ensimmäistä kohdetta: " + kertomus[e.I].Id);
            e.Valitse("levantti");
            var ajo = e.ViimeisinAjo.Value;
            // Skhul ja Qafzeh ovat Levantissa (~32,7 °N, 35 °E), eivät Marokossa (~31 °N, −8 °E).
            Oleta.Tosi(ajo.keskus.Lon > 25 && ajo.keskus.Lon < 45, "kamera Levanttiin: " + ajo.keskus.Lon);
        }

        [Testi] static void HyppyHetiAlustaSytyttaaValot()
        {
            // iPad 24.9.: "esitys levantti" heti avauksen alussa jätti mustan ruudun päälle (valot-jaksoa
            // ei ajettu). Web valitse → avaus ohi → asennaPinnat({ pimea: false }).
            var (e, y, n, a, leimat, kertomus) = Luo();
            e.Aloita();
            Aja(e, y, 0.5);
            Oleta.Tosi(!n.Loki.Any(l => l.mita == "valot"), "avauksessa pimeää");
            e.Valitse("levantti");
            Oleta.Tosi(n.Loki.Any(l => l.mita == "valot"), "valot syttyivät hypyssä");
            Oleta.Tosi(e.AvausOhi);
            int valoja = n.Loki.Count(l => l.mita == "valot");
            e.Valitse("chauvet");
            Oleta.Sama(valoja, n.Loki.Count(l => l.mita == "valot"), "valot syttyvät kerran");
        }

        [Testi] static void AikaselaimenKelausKutenWebissa()
        {
            var (e, y, n, a2, leimat, kertomus) = Luo();
            var k = JsonDocument.Parse(File.ReadAllText(Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", "aikaselain.json"))).RootElement;
            foreach (var r in k.GetProperty("kelaus").EnumerateArray())
            {
                double odotettu = r[1].GetDouble(), saatu = Esitys.KelauksenLukema(kertomus, r[0].GetDouble());
                Oleta.Tosi(Math.Abs(odotettu - saatu) <= 1e-9 * Math.Max(1, odotettu), $"osuus {r[0]}: {odotettu} vs {saatu}");
            }
            Oleta.Sama("50 000 v. sitten", Esitys.SelaimenVuositeksti(50000));
            Oleta.Sama("300 000 v. sitten", Esitys.SelaimenVuositeksti(299999.6));
            Oleta.Tosi(Esitys.SelaimenVuositeksti(150).EndsWith("jaa."), "loppupää kalenterivuosina");
        }

        [Testi] static void AikaselaimenVetoJaIrrotus()
        {
            var (e, y, n, a2, leimat, kertomus) = Luo();
            e.Aloita();
            Aja(e, y, 1);
            Oleta.Tosi(e.Kaynnissa);
            e.Esikatsele(0.5);
            Oleta.Tosi(!e.Kaynnissa && e.Selataan, "veto pysäyttää hiljaa");
            Oleta.Tosi(n.Loki.Any(l => l.mita == "pito False"), "pito pois vedon ajaksi");
            Oleta.Sama(Esitys.KelauksenLukema(kertomus, 0.5), e.Vuosia);
            e.Valitse("levantti");
            Oleta.Tosi(e.Kaynnissa && !e.Selataan, "irrotus jatkaa, koska ajo oli käynnissä");
            Oleta.Sama("levantti", kertomus[e.I].Id);
            // Tauolla veto + irrotus: jakso vaihtuu, esitys jää tauolle.
            e.Tauko();
            e.Esikatsele(0.8);
            e.Valitse(kertomus[15].Id);
            Oleta.Tosi(!e.Kaynnissa, "tauolla pysyy tauolla");
            Oleta.Sama(15, e.I);
        }

        [Testi] static void EpaonnistunutKelausEiJumita()
        {
            // iPad: hyppy jaksoon, mutta ääni alkaa nollasta (kelaus ei tartu kahdesti).
            var (e, y, n, a, leimat, kertomus) = Luo();
            e.Aloita();
            Aja(e, y, 5);
            a.RikkiKelauksia = 2;
            int siirtoja = a.Siirrot.Count;
            e.Valitse("levantti");
            Aja(e, y, 3);
            Oleta.Sama("levantti", kertomus[e.I].Id);
            Oleta.Tosi(e.Kulunut > 2500, "kello kulkee seinäkellolla: " + e.Kulunut);
            // Kelausta pyydettiin uudelleen, ja kolmas yritys tarttui: ääni ohjaa taas.
            Oleta.Tosi(a.Siirrot.Count - siirtoja >= 3, "uudet kelaukset: " + (a.Siirrot.Count - siirtoja));
            var l = leimat["levantti"];
            Oleta.Tosi(Math.Abs(a.KohtaMs.Value - (l.Alku + e.Kulunut)) < 50, "ääni ja kello tahdissa");
            Oleta.Tosi(a.Siirrot.Count - siirtoja <= 4, "ei kelaustulvaa: " + (a.Siirrot.Count - siirtoja));
        }

        [Testi] static void TaukoPysayttaaAjan()
        {
            var (e, y, n, a, _, _) = Luo();
            e.Aloita();
            Aja(e, y, 20);
            int i = e.I;
            double kello = n.Kellossa;
            e.Tauko();
            y.Kello += 60;
            e.Paivita();
            Oleta.Sama(i, e.I);
            Oleta.Sama(kello, n.Kellossa);
            e.Jatka();
            Aja(e, y, 1);
            Oleta.Tosi(e.I >= i, "jatkuu");
        }

        [Testi] static void IlmanAantaVarakestoin()
        {
            var d = Luo();
            var e = new Esitys(d.k, new Dictionary<string, LatLon> { ["jebel-irhoud"] = new LatLon(31.855, -8.8725) },
                null, null, d.y, d.n, null);
            e.Aloita();
            Oleta.Sama(Esitys.Varakesto(d.k[0]), e.Luenta, "varakesto tekstistä");
            Aja(e, d.y, 600);
            Oleta.Tosi(e.Paattynyt, "päättyy seinäkellolla");
        }

        [Testi] static void ValitseHyppaaJaksoonJaSiirtaaAanen()
        {
            var (e, y, n, a, leimat, kertomus) = Luo();
            e.Aloita();
            Aja(e, y, 3);
            e.Valitse("chauvet");
            Oleta.Sama("chauvet", kertomus[e.I].Id);
            Oleta.Sama(leimat["chauvet"].Alku, a.Siirrot.Last(), "ääni hyppää jakson alkuun");
        }

        static void Lahella(double odotettu, double saatu, string mita, double tol)
        {
            if (Math.Abs(odotettu - saatu) > tol) throw new Exception($"{mita}: odotettu {odotettu}, saatu {saatu}");
        }
        }

    public static class EsitysAjoTestitApu
    {
        public static System.Collections.Generic.List<KertomusJakso> WebinKertomus()
        {
            var d = System.Text.Json.JsonDocument.Parse(System.IO.File.ReadAllText(System.IO.Path.Combine(
                System.AppContext.BaseDirectory, "..", "kultaiset", "ihmisen-matka.json"))).RootElement;
            return d.GetProperty("kertomus").EnumerateArray().Select(j => new KertomusJakso
            {
                Id = j.GetProperty("id").GetString(),
                Vaihe = j.GetProperty("vaihe").GetString(),
                Kohde = j.GetProperty("kohde").ValueKind == System.Text.Json.JsonValueKind.String ? j.GetProperty("kohde").GetString() : null,
                Hiljaiset = j.GetProperty("hiljaiset").EnumerateArray().Select(x => x.GetString()).ToList(),
                Alue = j.GetProperty("alue").ValueKind == System.Text.Json.JsonValueKind.String ? j.GetProperty("alue").GetString() : null,
                Vuosia = j.GetProperty("vuosia").ValueKind == System.Text.Json.JsonValueKind.Number ? j.GetProperty("vuosia").GetDouble() : (double?)null,
                Teksti = j.GetProperty("teksti").GetString(),
                Pulu = j.GetProperty("pulu").ValueKind == System.Text.Json.JsonValueKind.String ? j.GetProperty("pulu").GetString() : null,
                Tunne = j.GetProperty("tunne").ValueKind == System.Text.Json.JsonValueKind.String ? j.GetProperty("tunne").GetString() : null,
            }).ToList();
        }
    }
}
