// ISOISÄN LUENNAT: mikä äänite soi missäkin pelin hetkessä (Pelikoodari,
// 23.9.2026). Ei UnityEngineä: käännetään myös Peli-testeissä. Soitto on
// Puhe.cs:n; PeliOhjain kysyy täältä osoitteen.
//
// Verkkopelin vastineet (kartoitus 23.9.2026, js/luenta.js ja js/ui.js):
//   intro       uuden pelin alussa (playIntroVoice, assets/audio/intro-puhe.mp3 v2)
//   lento-alku  ensimmäinen lento istunnossa (lueLennonRepliikki, puhe-lento-alku.mp3 v2)
//   saapumispuhe  kaupungin nimi ja iskulause saapuessa (saapumistraileri,
//               kokoelma saapumispuheet, 45 Euroopan kaupunkia)
//   luento      isoisän matkakirjamerkintä kaupungissa (fokusvirran
//               matkakirja.aanite, 45 kaupunkia; kokoelma luennat, kun
//               Siirtoseppä on sen vienyt), kerran per kaupunki istunnossa
// Web lukee muut tekstit puhesynteesillä (pollo-worker); natiivissa se odottaa
// workerin lupaa (Origin-lista), joten niistä ei tässä vielä ole.
using System;
using System.Collections.Generic;
using Matkakirja.Peli;

namespace Matkakirja.Natiivi
{
    /// <summary>Yksi luenta: äänite ja sen teksti (tekstitystä/merkintää varten).</summary>
    public sealed class Luento
    {
        public string Id;
        public string Kaupunki;
        public string Url;
        public string Teksti;
        public string Paikkarivi;
        public double? Kesto;
    }

    public sealed class Luennat
    {
        public const string Ampari = "https://media.matkakirja.app/";
        public static readonly Luento OletusIntro = new Luento { Id = "intro", Url = Ampari + "audio/intro-puhe.mp3?v=2" };
        public static readonly Luento OletusLentoAlku = new Luento { Id = "lento-alku", Url = Ampari + "audio/puhe-lento-alku.mp3?v=2" };

        readonly Dictionary<string, Luento> saapumispuheet = new Dictionary<string, Luento>();
        readonly Dictionary<string, Luento> luennot = new Dictionary<string, Luento>();
        readonly HashSet<string> kuullut = new HashSet<string>();
        bool lentoKuultu;

        public Luento Intro { get; private set; } = OletusIntro;
        public Luento LentoAlku { get; private set; } = OletusLentoAlku;
        public int Saapumispuheita => saapumispuheet.Count;
        public int Luentoja => luennot.Count;

        /// <summary>Kokoelma saapumispuheet: alkiot[].kaupunki + data.url/text/duration.</summary>
        public void LueSaapumispuheet(string json)
        {
            foreach (var (kaupunki, data) in Alkiot(json))
            {
                var url = MiniJson.Teksti(data, "url");
                if (string.IsNullOrEmpty(kaupunki) || string.IsNullOrEmpty(url)) continue;
                saapumispuheet[kaupunki] = new Luento
                {
                    Id = "saapumispuhe:" + kaupunki, Kaupunki = kaupunki, Url = url,
                    Teksti = MiniJson.Teksti(data, "text"), Kesto = Luku(data, "duration"),
                };
            }
        }

        /// <summary>
        /// Kokoelma luennat (Siirtoseppä): alkiot, joissa id, kaupunki, url,
        /// teksti, paikkarivi, kesto suoraan tai data-kentässä. id "intro" ja
        /// "lento-alku" korvaavat oletukset.
        /// </summary>
        public void LueLuennat(string json)
        {
            var juuri = MiniJson.Objekti(MiniJson.Jasenna(json));
            if (!(MiniJson.Kentta(juuri, "alkiot") is List<object> alkiot)) return;
            foreach (var o in alkiot)
            {
                if (!(o is Dictionary<string, object> a)) continue;
                var d = MiniJson.Kentta(a, "data") as Dictionary<string, object> ?? a;
                var l = new Luento
                {
                    Id = MiniJson.Teksti(d, "id") ?? MiniJson.Teksti(a, "id"),
                    Kaupunki = MiniJson.Teksti(d, "kaupunki") ?? MiniJson.Teksti(a, "kaupunki"),
                    Url = MiniJson.Teksti(d, "url"),
                    Teksti = MiniJson.Teksti(d, "teksti"),
                    Paikkarivi = MiniJson.Teksti(d, "paikkarivi"),
                    Kesto = Luku(d, "kesto"),
                };
                if (string.IsNullOrEmpty(l.Url)) continue;
                if (l.Id == "intro") Intro = l;
                else if (l.Id == "lento-alku") LentoAlku = l;
                else if (!string.IsNullOrEmpty(l.Kaupunki)) luennot[l.Kaupunki] = l;
            }
        }

        /// <summary>Saapumispuhe kaupunkiin (joka saapumisella), tai null.</summary>
        public Luento Saapumispuhe(string kaupunki) =>
            kaupunki != null && saapumispuheet.TryGetValue(kaupunki, out var l) ? l : null;

        /// <summary>Kaupungin matkakirjaluento, jos sitä ei ole vielä kuultu tässä istunnossa (ja merkitsee kuulluksi).</summary>
        public Luento OtaLuento(string kaupunki)
        {
            if (kaupunki == null || !luennot.TryGetValue(kaupunki, out var l) || !kuullut.Add(kaupunki)) return null;
            return l;
        }

        /// <summary>Kaupungin luento ehdoitta (kaiutinnappi), tai null.</summary>
        public Luento Luento(string kaupunki) => kaupunki != null && luennot.TryGetValue(kaupunki, out var l) ? l : null;

        /// <summary>Lennon alun repliikki kerran istunnossa (web lennonLuentaAlkoi), tai null.</summary>
        public Luento OtaLentoAlku()
        {
            if (lentoKuultu) return null;
            lentoKuultu = true;
            return LentoAlku;
        }

        static IEnumerable<(string Kaupunki, Dictionary<string, object> Data)> Alkiot(string json)
        {
            var juuri = MiniJson.Objekti(MiniJson.Jasenna(json));
            if (!(MiniJson.Kentta(juuri, "alkiot") is List<object> alkiot)) yield break;
            foreach (var o in alkiot)
            {
                if (!(o is Dictionary<string, object> a)) continue;
                var d = MiniJson.Kentta(a, "data") as Dictionary<string, object>;
                if (d == null) continue;
                yield return (MiniJson.Teksti(a, "kaupunki") ?? MiniJson.Teksti(a, "id"), d);
            }
        }

        static double? Luku(Dictionary<string, object> d, string k) =>
            MiniJson.Kentta(d, k) is double x ? x : (double?)null;
    }
}
