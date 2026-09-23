// KEKSINTÖJEN PYSÄKKILUENNAT (web js/linssipuhe.js soitaLinssiluenta ja
// js/aikajana.js sytyta/avaaValinaytos/avaa): kertoja lukee pysäkin vuoden,
// keksijän ja keksinnön, merkkipaalun (1873) välinäytöksen oman pidemmän
// tekstin ja esittelylaatikon tekstin. Keksintökaarella ei ole loppupuhetta.
//
// Osoitteet ovat sisältöpaketissa (kokoelmat/linssiaineisto.json, alkio
// linssiluennat.keksinnot: juuri, pysakit [{vuosi, otsikko, runko, url}],
// puheet [{avain, runko, url}]), joten natiivi ei toista webin tiedostonimisääntöä.
// Kultainen testi varmistaa, että paketin osoite = juuri/luennanTiedosto(t).
//
// Soitto on ILuentaSoittimen takana (Unity: Linssit/Unity/LuentaSoitin). Puuttuva
// tiedosto on hiljainen kuten webissä; kello ei jää odottamaan (Kello.LuennanPisinMs).
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Aikajana
{
    /// <summary>Yhden luennan soitin (web ui.linssiluenta). Uusi Soita katkaisee edellisen.</summary>
    public interface ILuentaSoitin
    {
        /// <summary>Soittaa osoitteen viiveen jälkeen (web LUENNAN_VIIVE_MS 350).</summary>
        void Soita(string url, double viiveMs);
        void Lopeta();
        /// <summary>Soiko luenta nyt tai onko se vasta alkamassa (web luentaSoi).</summary>
        bool Soi { get; }
    }

    public sealed class KeksintoLuennat
    {
        /// <summary>Viive ennen soittoa (web LUENNAN_VIIVE_MS).</summary>
        public const double ViiveMs = 350;

        public string Juuri;
        public string Esittely, Valinaytos;
        readonly Dictionary<string, string> pysakit = new Dictionary<string, string>(StringComparer.Ordinal);

        static string Avain(double vuosi, string otsikko) =>
            vuosi.ToString("R", CultureInfo.InvariantCulture) + "|" + (otsikko ?? "");

        /// <summary>Pysäkin luennan osoite, tai null (ei äänitettä).</summary>
        public string Pysakille(Pysakki p) =>
            p != null && pysakit.TryGetValue(Avain(p.Vuosi, p.Otsikko), out var u) ? u : null;

        public int Maara => pysakit.Count;

        static Dictionary<string, object> Ob(object x) => x as Dictionary<string, object>;
        static List<object> Lista(object x) => x as List<object>;

        /// <summary>Kokoelmasta linssiaineisto (alkio linssiluennat); null, jos keksintöjen luentoja ei ole.</summary>
        public static KeksintoLuennat Lue(object linssiaineisto)
        {
            foreach (var o in Lista(MiniJson.Kentta(Ob(linssiaineisto), "alkiot")) ?? new List<object>())
            {
                var a = Ob(o);
                if (MiniJson.Teksti(a, "id") != "linssiluennat") continue;
                return LueData(Ob(MiniJson.Kentta(Ob(MiniJson.Kentta(a, "data")), "keksinnot")));
            }
            return null;
        }

        public static KeksintoLuennat LueData(Dictionary<string, object> d)
        {
            if (d == null) return null;
            var l = new KeksintoLuennat { Juuri = MiniJson.Teksti(d, "juuri") };
            foreach (var p in (Lista(MiniJson.Kentta(d, "pysakit")) ?? new List<object>()).Select(Ob).Where(p => p != null))
            {
                var url = MiniJson.Teksti(p, "url");
                if (url != null && MiniJson.Luku(p, "vuosi") is double v) l.pysakit[Avain(v, MiniJson.Teksti(p, "otsikko"))] = url;
            }
            foreach (var p in (Lista(MiniJson.Kentta(d, "puheet")) ?? new List<object>()).Select(Ob).Where(p => p != null))
            {
                var avain = MiniJson.Teksti(p, "avain");
                if (avain == "esittely") l.Esittely = MiniJson.Teksti(p, "url");
                else if (avain == "valinaytos") l.Valinaytos = MiniJson.Teksti(p, "url");
            }
            return l;
        }
    }
}
