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

        // Kortin kentät (web ihmisen-matka-kortti.js kokoaNostot).
        /// <summary>Havainnekuvan lyhyt teksti (web ilmionLyhyt: lyhyt ?? kuvateksti), muuten otsikko.</summary>
        public string KuvaSelite;
        /// <summary>Löytökuvan lyhyt teksti (web kuvatekstiLyhyt(esine)); lisänostolla null.</summary>
        public string EsineSelite;
        /// <summary>Aidon Commons-kuvan lyhyt teksti (web kuvatekstiLyhyt(kuvaAito)).</summary>
        public string AitoSelite;
        /// <summary>
        /// Aidon kuvan koko olio (web kuvaAitoTiedot: tekija, lisenssi, lisenssiUrl, lahdeUrl, lahde,
        /// selite) kortinKuvalahdetta ja suurennosta varten; null, jos aitoa kuvaa ei ole.
        /// </summary>
        public IReadOnlyDictionary<string, object> AidonTiedot;
        /// <summary>Tekstin lähderivi (web lahde, esim. en-Wikipedia "Jebel Irhoud").</summary>
        public string Lahde;
        /// <summary>Tiedeliitteen juttu (vain löytöpaikoilla); Juttu = onko sivu (web Boolean(t.juttu)).</summary>
        public string JuttuTeksti;
        public bool Juttu => !string.IsNullOrEmpty(JuttuTeksti);
        /// <summary>Kuvatiedot tiedeliitteelle: havainnekuva (web ilmio), löytökuva (esine) ja aito.</summary>
        public Kuvatieto KuvaTieto, EsineTieto, AitoTieto;
        /// <summary>Kortin teksti (web teksti: löytöpaikalla loyto ?? selite, lisänostolla teksti).</summary>
        public string KortinTeksti => Loyto ?? Selite ?? "";
        /// <summary>Lyhyt ajoitus sisällykseen ja varakuvaan (web lyhytAjoitus): "230 000 v." tai sanallinen.</summary>
        public string LyhytAjoitus => double.IsFinite(VuosiaSitten) && VuosiaSitten > 0
            ? IhmisenMatkaAineisto.RyhmitaLuku(VuosiaSitten) + "\u00a0v." : Ajoitus ?? "";
    }

    public sealed class IhmisenMatkaAineisto
    {
        /// <summary>Web IHMISEN_MATKA_KUVAJUURI.</summary>
        public const string KuvaJuuri = "https://media.matkakirja.app/aikajana/ihmisen-matka";

        public List<Loytopaikka> Paikat = new List<Loytopaikka>();
        public List<Loytopaikka> Lisanostot = new List<Loytopaikka>();
        public List<KertomusJakso> Kertomus = new List<KertomusJakso>();
        /// <summary>Tiedeliitteen alkusanat (web kaari.tiedeliiteAlkusanat = IHMISEN_MATKA_KAISTASELITE); null, jos paketissa ei ole.</summary>
        public string Kaistaselite;

        /// <summary>
        /// Tiedeliitteen sivut (web ihmisenMatkanPysakit → avaaTiedeliite): löytöpaikat järjestyksessä,
        /// kasvoriville löytökuva (varana havainnekuva) ja aito, ilmiöksi havainnekuva. Indeksi on
        /// Paikat-listan indeksi (web avaaNostonJuttu(indeksi)).
        /// </summary>
        public List<Pysakki> TiedeliitteenPysakit() => Paikat.Select(p => new Pysakki
        {
            Vuosi = double.NaN, Lat = p.Lat, Lon = p.Lon,
            Otsikko = p.Otsikko, Paikka = p.Paikka, Ajoitus = p.Ajoitus,
            Selite = p.Selite, Juttu = p.JuttuTeksti, Lahde = p.Lahde,
            Kuva = p.EsineTieto != null
                ? new Kuvatieto
                {
                    Osoite = p.EsineTieto.Osoite, Tiedosto = p.EsineTieto.Tiedosto, Lyhyt = p.EsineTieto.Lyhyt,
                    Selite = p.EsineTieto.Selite, Kuvateksti = p.EsineTieto.Kuvateksti, Lahde = p.EsineTieto.Lahde,
                    Vara = p.KuvaTieto?.Osoite,
                }
                : p.KuvaTieto,
            KuvaAito = p.AitoTieto,
            Ilmio = p.KuvaTieto,
        }).ToList();

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
            a.Kaistaselite = MiniJson.Teksti(data, "IHMISEN_MATKA_KAISTASELITE");
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

        /// <summary>Web ryhmitaLuku: tuhaterotin sitovalla välilyönnillä (U+00A0), joka ei katkea riviltä.</summary>
        public static string RyhmitaLuku(double n)
        {
            long k = (long)Math.Round(Math.Abs(double.IsFinite(n) ? n : 0), MidpointRounding.AwayFromZero);
            var t = k.ToString(System.Globalization.CultureInfo.InvariantCulture);
            var b = new System.Text.StringBuilder();
            for (int i = 0; i < t.Length; i++)
            {
                if (i > 0 && (t.Length - i) % 3 == 0) b.Append('\u00a0');
                b.Append(t[i]);
            }
            return b.ToString();
        }

        static Loytopaikka Paikka(Dictionary<string, object> o, bool lisa)
        {
            var p = PaikanKentat(o, lisa);
            var kuva = MiniJson.Kentta(o, "kuva") ?? MiniJson.Kentta(o, "ilmio");
            var esine = lisa ? null : MiniJson.Kentta(o, "esine");
            var aito = MiniJson.Kentta(o, "kuvaAito");
            p.KuvaTieto = Kuvatieto.Lue(kuva);
            p.EsineTieto = Kuvatieto.Lue(esine);
            p.AitoTieto = Kuvatieto.Lue(aito);
            // Web ilmionLyhyt(kuva) = lyhyt ?? kuvateksti (ei seliteä), tyhjä → otsikko.
            var kuvaOlio = Ob(kuva);
            var ilmionLyhyt = MiniJson.Teksti(kuvaOlio, "lyhyt") ?? MiniJson.Teksti(kuvaOlio, "kuvateksti");
            p.KuvaSelite = !string.IsNullOrEmpty(ilmionLyhyt) ? ilmionLyhyt : p.Otsikko;
            p.EsineSelite = Tyhja(p.EsineTieto?.LyhytTeksti);
            p.AitoSelite = Tyhja(p.AitoTieto?.LyhytTeksti);
            p.AidonTiedot = Ob(aito);
            p.Lahde = MiniJson.Teksti(o, "lahde");
            p.JuttuTeksti = lisa ? null : MiniJson.Teksti(o, "juttu");
            return p;
        }

        static string Tyhja(string s) => string.IsNullOrEmpty(s) ? null : s;

        static Loytopaikka PaikanKentat(Dictionary<string, object> o, bool lisa) => new Loytopaikka
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
