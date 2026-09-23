// Yhteiset apurit kultaisille testeille: juurikansion haku, sisältöpaketin
// ja Kultaiset/siirrot.json -tiedoston lataus (kerran per ajo).
using System;
using System.Collections.Generic;
using System.IO;

namespace Matkakirja.Peli.Testit
{
    static class KultaisetApu
    {
        static string juuri;
        static Reittiverkko verkko;
        static Dictionary<string, object> kultaiset;

        /// <summary>Kansio, jossa on Kultaiset/ (kaanna.sh ajaa juuresta, mutta haetaan varmuuden vuoksi ylöspäin).</summary>
        public static string Juuri
        {
            get
            {
                if (juuri != null) return juuri;
                var d = new DirectoryInfo(Directory.GetCurrentDirectory());
                while (d != null && !Directory.Exists(Path.Combine(d.FullName, "Kultaiset"))) d = d.Parent;
                juuri = d?.FullName ?? throw new Exception("Kultaiset-kansiota ei löydy");
                return juuri;
            }
        }

        public static string Paketti => Path.Combine(Juuri, "Kultaiset", "paketti");

        public static Reittiverkko Verkko => verkko ??= SisaltoTuonti.LueKansiosta(Paketti);

        public static Dictionary<string, object> Kultaiset =>
            kultaiset ??= MiniJson.Objekti(MiniJson.Jasenna(File.ReadAllText(Path.Combine(Juuri, "Kultaiset", "siirrot.json"))));

        public static IEnumerable<Dictionary<string, object>> Lista(Dictionary<string, object> o, string nimi)
        {
            foreach (var a in MiniJson.Taulukko(MiniJson.Kentta(o, nimi))) yield return MiniJson.Objekti(a);
        }

        /// <summary>Web posKey → Sijainti ("c:id" tai "e:a|b:idx").</summary>
        public static Sijainti Sijainniksi(string avain)
        {
            if (avain.StartsWith("c:")) return Sijainti.KaupungissaSijainti(avain.Substring(2));
            var viimeinen = avain.LastIndexOf(':');
            return Sijainti.ReitillaSijainti(avain.Substring(2, viimeinen - 2), int.Parse(avain.Substring(viimeinen + 1)));
        }

        public static Kulkutapa Tavaksi(string mode) =>
            mode == "land" ? Kulkutapa.Maa : mode == "sea" ? Kulkutapa.Meri : throw new Exception("tuntematon tapa " + mode);
    }
}
