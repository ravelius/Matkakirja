// Isoisän linssi 1873 verkkopelin kultaisia arvoja vasten (kultaiset/isoisa-1873.json,
// tee-isoisa-1873.mjs; paketti/nimisto-1873.json, isoisa-1873-ote.json) sekä linssin elinkaari.
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using Matkakirja.Linssit.Isoisa;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Testit
{
    public sealed class ValeIsoisa : IIsoisaNakyma
    {
        public IReadOnlyList<Rajaviiva> Viivat;
        public IReadOnlyList<Nimi1873> Nimet;
        public bool Poistettu;
        public void Rajat(IReadOnlyList<Rajaviiva> v) => Viivat = v;
        void IIsoisaNakyma.Nimet(IReadOnlyList<Nimi1873> n) => Nimet = n;
        public void Pois() => Poistettu = true;
    }

    public static class IsoisaTestit
    {
        static string Polku(string nimi) => Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", nimi);
        static JsonElement K() => JsonDocument.Parse(File.ReadAllText(Polku("isoisa-1873.json"))).RootElement;
        static object Paketti(string nimi) => MiniJson.Jasenna(File.ReadAllText(Polku("paketti/" + nimi)));
        static Isoisa1873Aineisto A() => Isoisa1873Aineisto.Lue(Paketti("isoisa-1873-ote.json"), Paketti("nimisto-1873.json"));

        static NimenKoko Koko(string s) => s switch
        {
            "suuri" => NimenKoko.Suuri, "keski" => NimenKoko.Keski, "pieni" => NimenKoko.Pieni, _ => NimenKoko.Maakunta,
        };

        [Testi] static void VakiotKutenWebissa()
        {
            var k = K();
            Oleta.Sama(k.GetProperty("rako").GetDouble(), Isoisa1873Nimet.RakoPx);
            foreach (var p in k.GetProperty("arvo").EnumerateObject())
                Oleta.Sama(p.Value.GetInt32(), Isoisa1873Nimet.Arvo(Koko(p.Name)), p.Name);
            foreach (var p in k.GetProperty("rajat").EnumerateObject())
            {
                double odotettu = p.Value.ValueKind == JsonValueKind.Null ? double.PositiveInfinity : p.Value.GetDouble();
                Oleta.Sama(odotettu, Isoisa1873Nimet.KorkeusrajaSateina(Koko(p.Name)), p.Name);
            }
        }

        [Testi] static void NakyvyysKorkeudenMukaanKutenWebissa()
        {
            foreach (var r in K().GetProperty("nakyvyys").EnumerateArray())
            {
                double korkeus = r.GetProperty("korkeus").GetDouble();
                foreach (var koko in new[] { "suuri", "keski", "pieni", "maakunta" })
                    Oleta.Sama(r.GetProperty(koko).GetBoolean(), Isoisa1873Nimet.Nakyy(Koko(koko), korkeus * Isoisa1873Nimet.Sade), $"{koko} @ {korkeus}");
            }
        }

        [Testi] static void TormayksetKutenWebissa()
        {
            int n = 0;
            foreach (var t in K().GetProperty("tapaukset").EnumerateArray())
            {
                var laatikot = t.GetProperty("laatikot").EnumerateArray().Select(l => new Nimilaatikko(
                    l.GetProperty("avain").GetString(), l.GetProperty("arvo").GetInt32(),
                    l.GetProperty("x0").GetDouble(), l.GetProperty("y0").GetDouble(),
                    l.GetProperty("x1").GetDouble(), l.GetProperty("y1").GetDouble())).ToList();
                var odotettu = t.GetProperty("piiloon").EnumerateArray().Select(e => e.GetString()).OrderBy(x => x, StringComparer.Ordinal);
                var saatu = Isoisa1873Nimet.RatkaiseTormaykset(laatikot).OrderBy(x => x, StringComparer.Ordinal);
                Oleta.Sama(string.Join(",", odotettu), string.Join(",", saatu), $"tapaus {n++}");
            }
            Oleta.Sama(40, n);
        }

        [Testi] static void AineistoJaMaakunnat()
        {
            var a = A();
            Oleta.Sama(12, a.Viivat.Count);
            Oleta.Tosi(a.Viivat.All(v => v.Pisteet.Count >= 2 && (v.Luokka == 1 || v.Luokka == 2)));
            // Ensimmäinen piste [lon, lat] → LatLon(lat, lon): Luxemburgin raja.
            Oleta.Sama(49.508, a.Viivat[0].Pisteet[0].Lat);
            Oleta.Sama(5.825, a.Viivat[0].Pisteet[0].Lon);
            Oleta.Sama("GPL-3.0", a.Lisenssi);
            Oleta.Tosi(a.Attribuutio.Contains("Ourednik"), "attribuutio");
            var valtiot = a.Nimet.Where(x => x.Koko != NimenKoko.Maakunta).ToList();
            Oleta.Sama(106, valtiot.Count);
            Oleta.Tosi(valtiot.Any(v => v.Teksti == "ABESSINIA" && v.Koko == NimenKoko.Keski && v.Luokka == 1));
            Oleta.Sama(27, a.Nimet.Count(x => x.Koko == NimenKoko.Maakunta), "nimistön aika=1873-rivit");
            Oleta.Sama(a.Nimet.Count, a.Nimet.Select(x => x.Avain).Distinct().Count(), "avaimet yksilöllisiä");
        }

        [Testi] static void PuuttuvaAineistoEiKaada()
        {
            var a = Isoisa1873Aineisto.Lue(null, null);
            Oleta.Sama(0, a.Viivat.Count);
            Oleta.Sama(0, a.Nimet.Count);
        }

        [Testi] static void ElinkaariPohjaJaa()
        {
            string ennen = Isoisa1873Linssi.RajatonPohja;
            Isoisa1873Linssi.RajatonPohja = null;
            try
            {
                var y = new ValeYmparisto();
                var n = new ValeIsoisa();
                var l = new Isoisa1873Linssi(A(), n);
                l.Avaa(y);
                Oleta.Tosi(l.Auki);
                Oleta.Sama(12, n.Viivat.Count);
                Oleta.Sama(133, n.Nimet.Count);
                Oleta.Tosi(!y.Loki.Any(r => r.StartsWith("rasteri") || r.StartsWith("nakyvyys") || r.StartsWith("pelikerrokset")),
                    "peli ja pohja ennallaan: " + string.Join("; ", y.Loki));
                l.Paivita();
                l.Sulje();
                Oleta.Tosi(n.Poistettu && !l.Auki);
                l.Sulje();   // toinen sulku ei tee mitään
            }
            finally { Isoisa1873Linssi.RajatonPohja = ennen; }
        }

        [Testi] static void RajatonPohjaVaihtuuJaPalaa()
        {
            string ennen = Isoisa1873Linssi.RajatonPohja;
            Isoisa1873Linssi.RajatonPohja = "https://esim/{z}/{x}/{y}.jpg";
            try
            {
                var y = new ValeYmparisto();
                var l = new Isoisa1873Linssi(A(), new ValeIsoisa());
                l.Avaa(y);
                Oleta.Tosi(y.Vale.Rasterit.ContainsKey(Isoisa1873Linssi.Kerros));
                Oleta.Sama(false, y.Vale.Nakyvat["laatat"]);
                l.Sulje();
                Oleta.Tosi(!y.Vale.Rasterit.ContainsKey(Isoisa1873Linssi.Kerros));
                Oleta.Sama(true, y.Vale.Nakyvat["laatat"]);

                // Sarja ei tule: pohja palaa kesken linssin.
                var y2 = new ValeYmparisto();
                var l2 = new Isoisa1873Linssi(A(), new ValeIsoisa());
                l2.Avaa(y2);
                y2.Vale.Tilat[Isoisa1873Linssi.Kerros] = KerrosTila.Luovutti;
                l2.Paivita();
                Oleta.Sama(true, y2.Vale.Nakyvat["laatat"]);
                Oleta.Tosi(!y2.Vale.Rasterit.ContainsKey(Isoisa1873Linssi.Kerros));
                l2.Sulje();
                Oleta.Sama(1, y2.Loki.Count(r => r == "rasteri- " + Isoisa1873Linssi.Kerros), "poisto kerran");
            }
            finally { Isoisa1873Linssi.RajatonPohja = ennen; }
        }
    }
}
