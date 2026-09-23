// VESISTÖLINSSIN AINEISTO sisältöpaketista:
//   moduulit/js/packs/maailmankartta-maasto.json  MAAILMANKARTAN_MAASTO: jarvet (38 rengasta)
//                                                 ja joet (169 polkua) laudan koordinaateissa
//   moduulit/js/packs/maailmankartta-nimet.json   MAAILMANKARTAN_NIMET.joet: avain, nimi,
//                                                 tarkeys 1–3, pituus, pisteet (nimet ja luokat)
//   moduulit/js/linssit/vesistot.json             LINSSI: tunnus, nimi, lyhyt, ikoni, lahde,
//                                                 jarjestys 20, valokuva
//
// Selite ei ole paketissa (web selite() on funktio), joten sen rivit ovat
// täällä koodissa kuten topografian (web js/linssit/vesistot.js selite).
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Vesistot
{
    /// <summary>Järven rengas tai joen polku laudan koordinaateissa (x, y).</summary>
    public sealed class LaudanMuoto
    {
        public string Nimi;
        /// <summary>Pisteet; puuttuva koordinaatti on NaN, ja muunnos ohittaa sen (web pisteetAsteina).</summary>
        public List<(double X, double Y)> Pisteet = new List<(double X, double Y)>();
    }

    /// <summary>Nimipaketin joki (web MAAILMANKARTAN_NIMET.joet).</summary>
    public sealed class NimettyJoki
    {
        public string Avain, Nimi;
        /// <summary>Tärkeysluokka 1–3; null, jos aineistossa ei ole.</summary>
        public int? Tarkeys;
        public double? Pituus;
        public List<(double X, double Y)> Pisteet = new List<(double X, double Y)>();
    }

    public sealed class VesistotAineisto
    {
        public List<LaudanMuoto> Jarvet = new List<LaudanMuoto>();
        public List<LaudanMuoto> Joet = new List<LaudanMuoto>();
        public List<NimettyJoki> NimetytJoet = new List<NimettyJoki>();
        public LinssiTiedot Tiedot;

        // Web vakiot: PENGER, UOMA, JARVEN_VESI (sävyt reliefikuvan merestä).
        public const string Penger = "#123f68";
        public const string JarvenVesi = "#3b7db5";
        public static readonly IReadOnlyDictionary<int, string> Uoma = new Dictionary<int, string>
        {
            [1] = "#5aa9e0", [2] = "#4a95d0", [3] = "#3c82be",
        };

        /// <summary>Web LINSSI.selite() sanatarkasti.</summary>
        public static readonly IReadOnlyList<SeliteRivi> Selite = new[]
        {
            new SeliteRivi(Uoma[1], "Pääjoki, esimerkiksi Niili tai Amazon"),
            new SeliteRivi(Uoma[3], "Sivujoki ja pienempi uoma"),
            new SeliteRivi(JarvenVesi, "Järvi tai suolainen sisämeri"),
            new SeliteRivi("#3968a5", "Meri ja valtameri"),
            new SeliteRivi("#3e6e42", "Alanko, jonne joet laskevat"),
            new SeliteRivi("#94623e", "Vuoristo, josta joet saavat alkunsa"),
        };

        static Dictionary<string, object> Ob(object x) => x as Dictionary<string, object>;
        static List<object> Lista(object x) => x as List<object>;
        static Dictionary<string, object> Vienti(object moduuli, string nimi)
        {
            var v = Ob(MiniJson.Kentta(Ob(moduuli), "exportit")) ?? throw new FormatException("moduulista puuttuu exportit");
            var o = Ob(MiniJson.Kentta(v, nimi)) ?? throw new FormatException("moduulista puuttuu " + nimi);
            return Ob(MiniJson.Kentta(o, "arvo")) ?? o;
        }

        /// <summary>Piste [x, y] tai { x, y } (web pisteetAsteina hyväksyy molemmat).</summary>
        static (double X, double Y) Piste(object p)
        {
            if (Lista(p) is List<object> l && l.Count >= 2)
                return (l[0] is double x ? x : double.NaN, l[1] is double y ? y : double.NaN);
            var o = Ob(p);
            return (MiniJson.Luku(o, "x") ?? double.NaN, MiniJson.Luku(o, "y") ?? double.NaN);
        }

        static List<(double X, double Y)> Pisteet(object lista) =>
            (Lista(lista) ?? new List<object>()).Select(Piste).ToList();

        /// <summary>Muoto: olio { nimi, rengas|pisteet } tai paljas pistelista (web jarvi.rengas ?? jarvi).</summary>
        static LaudanMuoto Muoto(object o, string kentta)
        {
            var ob = Ob(o);
            return new LaudanMuoto
            {
                Nimi = MiniJson.Teksti(ob, "nimi"),
                Pisteet = Pisteet(ob != null ? MiniJson.Kentta(ob, kentta) : o),
            };
        }

        public static VesistotAineisto Lue(object maastoModuuli, object nimiModuuli, object linssiModuuli)
        {
            var a = new VesistotAineisto();
            var maasto = Vienti(maastoModuuli, "MAAILMANKARTAN_MAASTO");
            foreach (var j in Lista(MiniJson.Kentta(maasto, "jarvet")) ?? new List<object>()) a.Jarvet.Add(Muoto(j, "rengas"));
            foreach (var j in Lista(MiniJson.Kentta(maasto, "joet")) ?? new List<object>()) a.Joet.Add(Muoto(j, "pisteet"));

            // Nimipaketti ei ole pakollinen: ilman sitä kaikki joet ovat luokkaa 3 eikä nimiä ole.
            if (nimiModuuli != null)
                foreach (var o in Lista(MiniJson.Kentta(Vienti(nimiModuuli, "MAAILMANKARTAN_NIMET"), "joet")) ?? new List<object>())
                {
                    var j = Ob(o);
                    if (j == null) continue;
                    a.NimetytJoet.Add(new NimettyJoki
                    {
                        Avain = MiniJson.Teksti(j, "avain"),
                        Nimi = MiniJson.Teksti(j, "nimi"),
                        Tarkeys = MiniJson.Luku(j, "tarkeys") is double t ? (int)t : (int?)null,
                        Pituus = MiniJson.Luku(j, "pituus"),
                        Pisteet = Pisteet(MiniJson.Kentta(j, "pisteet")),
                    });
                }

            var linssi = linssiModuuli == null ? null : Vienti(linssiModuuli, "LINSSI");
            var lahde = Ob(MiniJson.Kentta(linssi, "lahde"));
            a.Tiedot = new LinssiTiedot
            {
                Id = MiniJson.Teksti(linssi, "tunnus") ?? "vesistot",
                Nimi = MiniJson.Teksti(linssi, "nimi") ?? "Vesistölinssi",
                Lyhyt = MiniJson.Teksti(linssi, "lyhyt"),
                Jarjestys = (int)(MiniJson.Luku(linssi, "jarjestys") ?? 20),
                Ikoni = MiniJson.Teksti(linssi, "ikoni"),
                Valokuva = MiniJson.Totuus(linssi, "valokuva", true),
                Kesken = MiniJson.Totuus(linssi, "kesken", false),
                Lahde = lahde == null ? null : new Lahde
                {
                    Aineisto = MiniJson.Teksti(lahde, "aineisto"), Lisenssi = MiniJson.Teksti(lahde, "lisenssi"),
                    Osoite = MiniJson.Teksti(lahde, "osoite"), Haettu = MiniJson.Teksti(lahde, "haettu"),
                },
                Selite = Selite,
            };
            return a;
        }
    }
}
