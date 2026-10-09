// HISTORIAOSIOT (omistaja 9.10.: "lentojen aikanakin kertoja voisi kertoa jotain … kaupungin historiasta"; Pelikoodari opas/historia-v1,
// juna 170): {osiot: [{tunnus, otsikko, teksti, sha, kesto_s, lahteet: [url]}]}. Vuoro: kierroksen lähtö ilman siltalausetta, joka
// Vali:nteen tällaiseen lähtöön, lento vähintään MinLentoS. Osio ei toistu kaupungissa (Seuraava ohittaa kuullut). Puhdas C#.
using System;
using System.Collections.Generic;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Kierros
{
    public static class OpasHistoria
    {
        public sealed class Osio { public string Tunnus, Otsikko, Teksti, Sha; public double KestoS; public List<string> Lahteet = new List<string>(); }

        public const int Vali = 2;
        public const double MinLentoS = 12;

        public static List<Osio> Lue(object json)
        {
            var l = new List<Osio>();
            if (!(json is Dictionary<string, object> j)) return l;
            foreach (var x in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(j, "osiot")))
            {
                var d = MiniJson.ObjektiTaiNull(x);
                string sha = MiniJson.Teksti(d, "sha"), tunnus = MiniJson.Teksti(d, "tunnus");
                if (string.IsNullOrEmpty(sha) || string.IsNullOrEmpty(tunnus)) continue;
                var o = new Osio { Tunnus = tunnus, Otsikko = MiniJson.Teksti(d, "otsikko") ?? tunnus, Teksti = MiniJson.Teksti(d, "teksti"), Sha = sha, KestoS = MiniJson.Luku(d, "kesto_s") ?? 30 };
                foreach (var lx in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(d, "lahteet"))) if (lx is string ls && !string.IsNullOrWhiteSpace(ls)) o.Lahteet.Add(ls.Trim());
                l.Add(o);
            }
            return l;
        }

        /// <summary>Lähtö ilman siltalausetta: laskuri kasvaa; true = historiaosion vuoro (joka Vali:s, lento ≥ MinLentoS).</summary>
        public static bool Vuoro(ref int laskuri, double lentoS)
        {
            if (lentoS < MinLentoS) return false;
            return ++laskuri % Vali == 0;
        }

        /// <summary>Ensimmäinen kuulematon osio tai null.</summary>
        public static Osio Seuraava(IReadOnlyList<Osio> osiot, ICollection<string> kuultu)
        {
            if (osiot == null) return null;
            foreach (var o in osiot) if (!kuultu.Contains(o.Tunnus)) return o;
            return null;
        }
    }
}
