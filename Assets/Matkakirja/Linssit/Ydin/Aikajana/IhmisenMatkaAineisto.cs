// IHMISEN MATKAN AINEISTO sisältöpaketista (Siirtosepän vienti, skeema 1.7):
//   moduulit/js/linssit/ihmisen-matka-data.json      IHMISEN_MATKA (20 löytöpaikkaa),
//                                                    IHMISEN_MATKA_LISANOSTOT, _KYSYMYKSET
//   moduulit/js/linssit/ihmisen-matka-kertomus.json  IHMISEN_MATKA_KERTOMUS (21 jaksoa)
//   kokoelmat/linssiaineisto.json                    kertomusmanifestin ja äänimaisemien osoitteet
//   <kertomus.juuri>/kertomus-manifesti.json         luennan aikaleimat
//
// Syöte on MiniJsonin puu (Dictionary/List/double/string/bool), joten sama
// lukija toimii Unityssä ja testeissä.
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Aikajana
{
    /// <summary>Löytöpaikka tai lisänosto (web IHMISEN_MATKA, IHMISEN_MATKA_LISANOSTOT).</summary>
    public sealed class Loytopaikka
    {
        public string Tunnus, Otsikko, Paikka, Maa, Ajoitus, Loyto, Selite, Virta;
        public double Lat, Lon, VuosiaSitten;
        public bool Lisanosto;
        /// <summary>Kuvien osoitteet (kuva/ilmio, esine, aito) sellaisinaan paketista; null jos puuttuu.</summary>
        public string Kuva, Esine, Aito;
        public IReadOnlyList<string> Kysymykset = Array.Empty<string>();
    }

    public sealed class IhmisenMatkaAineisto
    {
        /// <summary>Web IHMISEN_MATKA_KUVAJUURI.</summary>
        public const string KuvaJuuri = "https://media.matkakirja.app/aikajana/ihmisen-matka";

        public List<Loytopaikka> Paikat = new List<Loytopaikka>();
        public List<Loytopaikka> Lisanostot = new List<Loytopaikka>();
        public List<KertomusJakso> Kertomus = new List<KertomusJakso>();

        public IReadOnlyDictionary<string, LatLon> Kohteet =>
            Paikat.ToDictionary(p => p.Tunnus, p => new LatLon(p.Lat, p.Lon));

        // Sallivat apurit: puuttuva tai eri tyyppinen kenttä on null eikä poikkeus.
        static Dictionary<string, object> Ob(object x) => x as Dictionary<string, object>;
        static List<object> Lista(object x) => x as List<object>;

        static Dictionary<string, object> Viennit(object moduuli) =>
            Ob(MiniJson.Kentta(Ob(moduuli), "exportit"))
            ?? throw new FormatException("moduulista puuttuu exportit");

        /// <summary>Lukee data- ja kertomusmoduulit (MiniJson.Jasenna-tulokset).</summary>
        public static IhmisenMatkaAineisto Lue(object dataModuuli, object kertomusModuuli)
        {
            var a = new IhmisenMatkaAineisto();
            var data = Viennit(dataModuuli);
            foreach (var o in Lista(MiniJson.Kentta(data, "IHMISEN_MATKA")) ?? new List<object>())
                a.Paikat.Add(Paikka(Ob(o), false));
            foreach (var o in Lista(MiniJson.Kentta(data, "IHMISEN_MATKA_LISANOSTOT")) ?? new List<object>())
            {
                var p = Paikka(Ob(o), true);
                // Web nostokuvanOsoite: lisänoston kuvitus kuvaputken kansiosta, ellei omaa.
                p.Kuva ??= KuvaJuuri + "/nosto/" + p.Tunnus + ".jpg";
                p.Kysymykset = (Lista(MiniJson.Kentta(Ob(o), "kysymykset")) ?? new List<object>())
                    .OfType<string>().ToList();
                a.Lisanostot.Add(p);
            }
            var kysymykset = Ob(MiniJson.Kentta(data, "IHMISEN_MATKA_KYSYMYKSET"));
            if (kysymykset != null)
                foreach (var p in a.Paikat)
                    if (Lista(MiniJson.Kentta(kysymykset, p.Tunnus)) is List<object> k)
                        p.Kysymykset = k.OfType<string>().ToList();

            foreach (var o in Lista(MiniJson.Kentta(Viennit(kertomusModuuli), "IHMISEN_MATKA_KERTOMUS")) ?? new List<object>())
            {
                var j = Ob(o);
                var tunne = Ob(MiniJson.Kentta(j, "tunne"));
                a.Kertomus.Add(new KertomusJakso
                {
                    Id = MiniJson.Teksti(j, "id"),
                    Vaihe = MiniJson.Teksti(j, "vaihe"),
                    Kohde = MiniJson.Teksti(j, "kohde"),
                    Hiljaiset = (Lista(MiniJson.Kentta(j, "hiljaiset")) ?? new List<object>()).OfType<string>().ToList(),
                    Alue = MiniJson.Teksti(j, "alue"),
                    Vuosia = MiniJson.Luku(j, "vuosia"),
                    Teksti = MiniJson.Teksti(j, "teksti") ?? "",
                    Pulu = MiniJson.Teksti(j, "pulu"),
                    Tunne = tunne != null ? MiniJson.Teksti(tunne, "tunne") : null,
                    TunteenVoimakkuus = tunne != null ? MiniJson.Luku(tunne, "voimakkuus") ?? 0 : 0,
                    Maisema = MiniJson.Teksti(j, "maisema"),
                });
            }
            return a;
        }

        static Loytopaikka Paikka(Dictionary<string, object> o, bool lisa) => new Loytopaikka
        {
            Tunnus = MiniJson.Teksti(o, "tunnus"),
            Otsikko = MiniJson.Teksti(o, "otsikko"),
            Paikka = MiniJson.Teksti(o, "paikka"),
            Maa = MiniJson.Teksti(o, "maa"),
            Ajoitus = MiniJson.Teksti(o, "ajoitus"),
            Loyto = MiniJson.Teksti(o, "loyto"),
            Selite = MiniJson.Teksti(o, "selite") ?? MiniJson.Teksti(o, "teksti"),
            Virta = MiniJson.Teksti(o, "virta"),
            Lat = MiniJson.Luku(o, "lat") ?? double.NaN,
            Lon = MiniJson.Luku(o, "lon") ?? double.NaN,
            VuosiaSitten = MiniJson.Luku(o, "vuosiaSitten") ?? double.NaN,
            Lisanosto = lisa,
            Kuva = Osoite(MiniJson.Kentta(o, "kuva")) ?? Osoite(MiniJson.Kentta(o, "ilmio")),
            Esine = Osoite(MiniJson.Kentta(o, "esine")),
            Aito = Osoite(MiniJson.Kentta(o, "esineAito")) ?? Osoite(MiniJson.Kentta(o, "kuvaAito")),
        };

        /// <summary>Kuvakenttä on joko osoite tai olio, jolla on osoite.</summary>
        static string Osoite(object kentta) =>
            kentta as string ?? (Ob(kentta) is Dictionary<string, object> o ? MiniJson.Teksti(o, "osoite") : null);

        /// <summary>Kertomusmanifesti → jaksojen aikaleimat (web jaksojenAikaleimat).</summary>
        public static Dictionary<string, JaksonLeimat> LueManifesti(object manifesti)
        {
            var rivit = new List<(string, double, double, IReadOnlyList<double>, IReadOnlyList<(string, double)>)>();
            var m = Ob(manifesti);
            foreach (var o in Lista(MiniJson.Kentta(m, "jaksot")) ?? new List<object>())
            {
                var j = Ob(o);
                var lauseet = (Lista(MiniJson.Kentta(j, "lauseet")) ?? new List<object>()).OfType<double>().ToList();
                var sanat = (Lista(MiniJson.Kentta(j, "sanat")) ?? new List<object>())
                    .Select(MiniJson.Objekti).Where(s => s != null)
                    .Select(s => (MiniJson.Teksti(s, "sana") ?? "", MiniJson.Luku(s, "alku") ?? 0)).ToList();
                rivit.Add((MiniJson.Teksti(j, "tunnus"), MiniJson.Luku(j, "alku") ?? 0, MiniJson.Luku(j, "loppu") ?? 0, lauseet, sanat));
            }
            return JaksonLeimat.Manifestista(rivit);
        }

        /// <summary>Äänitteen tiedosto manifestista (yksi äänite, yhtena = true); null muuten.</summary>
        public static string ManifestinAanite(object manifesti, string juuri)
        {
            var m = Ob(manifesti);
            if (m == null || !MiniJson.Totuus(m, "yhtena")) return null;
            var tiedosto = MiniJson.Teksti(m, "tiedosto");
            return tiedosto == null ? null : juuri.TrimEnd('/') + "/" + tiedosto;
        }
    }
}
