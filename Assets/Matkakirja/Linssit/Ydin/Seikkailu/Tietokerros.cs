// HISTORIAMOOTTORI: TIETOKERROS (Siirtoseppä 7.10.2026; Pelikoodarin seikkailu/<rakennus>/tietokerros-v1/tietokerros.json, kortit
// docs/raportit/olavinlinna-tietokerros-kortit.md). Kortit eivät näy pelin aikana (ei luettavaa); ne avautuvat huoneittain keräiltäviksi
// (avautuu { tyyppi: "huone", huoneet: [n] }) ja loppukortit pystyleikkeen lopussa ({ tyyppi: "loppu" }). Huoneet numeroina kuten
// repliikit-v1: 1 Veneyö, 2 Laituri ja portti, 3 Pikkupiha ja keittiö, 4 Kirkkotorni ja portaat, 5 Kappeli; M-osa 6 Linnantupa ja sali,
// 7 Ampuma- ja muurikäytävä, 8 Muurinharja ja ulkoseinä, 9 Komero, 10 Pako.
using System;
using System.Collections.Generic;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Seikkailu
{
    public sealed class Tietokortti
    {
        public string Id, Otsikko, Lyhyt, Teksti, Varmuus;
        public int Numero;
        public bool Loppu;
        public List<int> Huoneet = new List<int>();
    }

    public sealed class Tietokerros
    {
        public readonly List<Tietokortti> Kortit = new List<Tietokortti>();
        readonly HashSet<string> avatut = new HashSet<string>(StringComparer.Ordinal);
        public IReadOnlyCollection<string> Avatut => avatut;

        public static Tietokerros Lue(string json, IEnumerable<string> joAvatut = null)
        {
            var t = new Tietokerros();
            object j; try { j = MiniJson.Jasenna(json ?? ""); } catch (Exception) { j = null; }
            foreach (var x in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(MiniJson.ObjektiTaiNull(j), "kortit")))
            {
                var o = MiniJson.ObjektiTaiNull(x); string id = MiniJson.Teksti(o, "id");
                if (string.IsNullOrEmpty(id)) continue;
                var k = new Tietokortti
                {
                    Id = id, Otsikko = MiniJson.Teksti(o, "otsikko"), Lyhyt = MiniJson.Teksti(o, "lyhyt") ?? MiniJson.Teksti(o, "otsikko"),
                    Teksti = MiniJson.Teksti(o, "teksti"), Varmuus = MiniJson.Teksti(o, "varmuus"),
                };
                var nro = MiniJson.Kentta(o, "numero");
                k.Numero = nro is double dn ? (int)dn : nro is string sn && int.TryParse(sn, out var ni) ? ni : t.Kortit.Count + 1;
                var av = MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "avautuu"));
                k.Loppu = MiniJson.Teksti(av, "tyyppi") == "loppu";
                foreach (var h in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(av, "huoneet"))) if (h is double hd) k.Huoneet.Add((int)hd);
                t.Kortit.Add(k);
            }
            t.Kortit.Sort((a, b) => a.Numero.CompareTo(b.Numero));
            if (joAvatut != null) foreach (var a in joAvatut) t.avatut.Add(a);
            return t;
        }

        /// <summary>Pelaaja tuli huoneeseen: avaa sen kortit. Palauttaa juuri avatut (järjestyksessä).</summary>
        public List<Tietokortti> Huone(int huone)
        {
            var uudet = new List<Tietokortti>();
            foreach (var k in Kortit) if (!k.Loppu && k.Huoneet.Contains(huone) && avatut.Add(k.Id)) uudet.Add(k);
            return uudet;
        }

        /// <summary>Pystyleikkeen loppu: avaa loppukortit (ja varmuuden vuoksi kaikki huonekortit).</summary>
        public List<Tietokortti> Loppu()
        {
            var uudet = new List<Tietokortti>();
            foreach (var k in Kortit) if (avatut.Add(k.Id)) uudet.Add(k);
            return uudet;
        }

        public bool Auki(string id) => avatut.Contains(id);
    }
}
