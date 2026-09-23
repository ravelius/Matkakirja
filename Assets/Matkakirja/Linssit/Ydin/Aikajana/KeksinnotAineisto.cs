// KEKSINTÖLINSSIN AINEISTO sisältöpaketista (moduulit/js/linssit/keksinnot.json:
// KEKSINNOT = 26 pysäkkiä, LINSSI.aikajana = otsikko, alku, loppu, alue laudan
// yksiköinä, esittely, loppusanat).
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Aikajana
{
    public sealed class KeksinnotAineisto
    {
        public List<Pysakki> Pysakit = new List<Pysakki>();
        public double Alku, Loppu;
        public Laatikko Alue;
        public LinssiTiedot Tiedot;
        public string Otsikko;

        static Dictionary<string, object> Ob(object x) => x as Dictionary<string, object>;
        static List<object> Lista(object x) => x as List<object>;

        public static KeksinnotAineisto Lue(object moduuli)
        {
            var v = Ob(MiniJson.Kentta(Ob(moduuli), "exportit")) ?? throw new FormatException("moduulista puuttuu exportit");
            var linssi = Ob(MiniJson.Kentta(v, "LINSSI"));
            if (Ob(MiniJson.Kentta(linssi, "arvo")) is Dictionary<string, object> arvo) linssi = arvo;
            var kaari = Ob(MiniJson.Kentta(linssi, "aikajana"));
            var a = new KeksinnotAineisto
            {
                Alku = MiniJson.Luku(kaari, "alku") ?? 1765,
                Loppu = MiniJson.Luku(kaari, "loppu") ?? 1928,
                Otsikko = MiniJson.Teksti(kaari, "otsikko"),
            };
            var alue = Ob(MiniJson.Kentta(kaari, "alue"));
            a.Alue = Kameramatikka.LaatikkoLaudalta(MiniJson.Luku(alue, "x") ?? 0, MiniJson.Luku(alue, "y") ?? 0,
                MiniJson.Luku(alue, "w") ?? 12000, MiniJson.Luku(alue, "h") ?? 5399);
            var lahde = Ob(MiniJson.Kentta(linssi, "lahde"));
            a.Tiedot = new LinssiTiedot
            {
                Id = MiniJson.Teksti(linssi, "tunnus") ?? "keksinnot",
                Nimi = MiniJson.Teksti(linssi, "nimi"),
                Lyhyt = MiniJson.Teksti(linssi, "lyhyt"),
                Jarjestys = (int)(MiniJson.Luku(linssi, "jarjestys") ?? 25),
                Ikoni = MiniJson.Teksti(linssi, "ikoni"),
                Valokuva = MiniJson.Totuus(linssi, "valokuva"),
                Lahde = lahde == null ? null : new Lahde
                {
                    Aineisto = MiniJson.Teksti(lahde, "aineisto"), Lisenssi = MiniJson.Teksti(lahde, "lisenssi"),
                    Osoite = MiniJson.Teksti(lahde, "osoite"), Haettu = MiniJson.Teksti(lahde, "haettu"),
                },
            };
            var tapahtumat = Lista(MiniJson.Kentta(kaari, "tapahtumat")) ?? Lista(MiniJson.Kentta(v, "KEKSINNOT")) ?? new List<object>();
            foreach (var t in tapahtumat.Select(Ob).Where(t => t != null))
                a.Pysakit.Add(new Pysakki
                {
                    Vuosi = MiniJson.Luku(t, "vuosi") ?? double.NaN,
                    Lat = MiniJson.Luku(t, "lat") ?? double.NaN,
                    Lon = MiniJson.Luku(t, "lon") ?? double.NaN,
                    Paalu = MiniJson.Totuus(t, "paalu"),
                    Hiljainen = MiniJson.Totuus(t, "hiljainen"),
                    Valinaytos = MiniJson.Kentta(t, "valinaytos") != null,
                    Otsikko = MiniJson.Teksti(t, "otsikko"),
                    Paikka = MiniJson.Teksti(t, "paikka"),
                    Henkilo = MiniJson.Teksti(t, "henkilo"),
                });
            // Web jarjestaTapahtumat: vuoden mukaan, saman vuoden sisällä aineiston järjestys.
            a.Pysakit = a.Pysakit.Select((p, n) => (p, n)).OrderBy(x => x.p.Vuosi).ThenBy(x => x.n).Select(x => x.p).ToList();
            return a;
        }
    }
}
