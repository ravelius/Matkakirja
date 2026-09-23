// ASTRONAUTIN KAMERAN AINEISTO sisältöpaketista:
//   moduulit/js/linssit/satelliitti-data.json      SATELLIITTI_KOHTEET (64), SATELLIITTI_LAHDE
//   moduulit/js/linssit/astronaut-kysymykset.json  ASTRONAUTIN_KYSYMYKSET (2 per kohde)
//   kokoelmat/linssiaineisto.json                  pilvet, humina ja musiikki
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Astronautti
{
    /// <summary>Yksi astronautin valokuva (web havainto).</summary>
    public sealed class Havainto
    {
        public string Id, Aika, Teksti, Kuvaustapa, Retkikunta, Kuvaaja, Kuva, Pikku, Sivu;
        public int Leveys, Korkeus;
    }

    /// <summary>Havaintokohde pallolla (web SATELLIITTI_KOHTEET).</summary>
    public sealed class Havaintokohde
    {
        public string Tunnus, Nimi, Seutu, Selite, Oletus;
        public double Lat, Lon;
        public List<Havainto> Havainnot = new List<Havainto>();
        public IReadOnlyList<string> Kysymykset = Array.Empty<string>();

        /// <summary>Oletuskuvan indeksi: nimetty oletus, muuten uusin aika (web oletusIndeksi).</summary>
        public int OletusIndeksi
        {
            get
            {
                int nimetty = Havainnot.FindIndex(h => h.Id == Oletus);
                if (nimetty >= 0) return nimetty;
                Havainto paras = null;
                foreach (var h in Havainnot)
                    if (paras == null || string.CompareOrdinal(h.Aika ?? "", paras.Aika ?? "") > 0) paras = h;
                int i = paras == null ? -1 : Havainnot.IndexOf(paras);
                return i >= 0 ? i : 0;
            }
        }
    }

    public sealed class AstronauttiAineisto
    {
        public List<Havaintokohde> Kohteet = new List<Havaintokohde>();
        public Lahde Lahde;

        static Dictionary<string, object> Ob(object x) => x as Dictionary<string, object>;
        static List<object> Lista(object x) => x as List<object>;

        public static AstronauttiAineisto Lue(object dataModuuli, object kysymysModuuli = null)
        {
            var a = new AstronauttiAineisto();
            var v = Ob(MiniJson.Kentta(Ob(dataModuuli), "exportit")) ?? throw new FormatException("moduulista puuttuu exportit");
            if (Ob(MiniJson.Kentta(v, "SATELLIITTI_LAHDE")) is Dictionary<string, object> l)
                a.Lahde = new Lahde
                {
                    Aineisto = MiniJson.Teksti(l, "aineisto"), Lisenssi = MiniJson.Teksti(l, "lisenssi"),
                    Osoite = MiniJson.Teksti(l, "osoite"), Haettu = MiniJson.Teksti(l, "haettu"),
                };
            var kysymykset = Ob(MiniJson.Kentta(Ob(MiniJson.Kentta(Ob(kysymysModuuli), "exportit")), "ASTRONAUTIN_KYSYMYKSET"));
            foreach (var o in Lista(MiniJson.Kentta(v, "SATELLIITTI_KOHTEET")) ?? new List<object>())
            {
                var k = Ob(o);
                var kohde = new Havaintokohde
                {
                    Tunnus = MiniJson.Teksti(k, "tunnus"), Nimi = MiniJson.Teksti(k, "nimi"),
                    Seutu = MiniJson.Teksti(k, "seutu"), Selite = MiniJson.Teksti(k, "selite"),
                    Oletus = MiniJson.Teksti(k, "oletus"),
                    Lat = MiniJson.Luku(k, "lat") ?? double.NaN, Lon = MiniJson.Luku(k, "lon") ?? double.NaN,
                };
                foreach (var ho in Lista(MiniJson.Kentta(k, "havainnot")) ?? new List<object>())
                {
                    var h = Ob(ho);
                    var mitat = Lista(MiniJson.Kentta(h, "mitat"));
                    kohde.Havainnot.Add(new Havainto
                    {
                        Id = MiniJson.Teksti(h, "id"), Aika = MiniJson.Teksti(h, "aika"), Teksti = MiniJson.Teksti(h, "teksti"),
                        Kuvaustapa = MiniJson.Teksti(h, "kuvaustapa"), Retkikunta = MiniJson.Teksti(h, "retkikunta"),
                        Kuvaaja = MiniJson.Teksti(h, "kuvaaja"), Kuva = MiniJson.Teksti(h, "kuva"),
                        Pikku = MiniJson.Teksti(h, "pikku"), Sivu = MiniJson.Teksti(h, "sivu"),
                        Leveys = mitat?.Count == 2 && mitat[0] is double w ? (int)w : 0,
                        Korkeus = mitat?.Count == 2 && mitat[1] is double hh ? (int)hh : 0,
                    });
                }
                if (Ob(MiniJson.Kentta(kysymykset, kohde.Tunnus)) is Dictionary<string, object> q)
                    kohde.Kysymykset = (Lista(MiniJson.Kentta(q, "kysymykset")) ?? new List<object>()).OfType<string>().ToList();
                a.Kohteet.Add(kohde);
            }
            return a;
        }
    }
}
