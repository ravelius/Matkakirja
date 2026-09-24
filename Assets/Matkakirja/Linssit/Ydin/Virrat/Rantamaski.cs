// RUUTUMASKI VANOJEN KAISTALLE: rantamaski (0,125°) ja mallin kulkumaski (0,5°).
//
// Rantamaski on sisältöpaketin kokoelmassa linssiaineisto.json alkiona
// "rantamaski" (web js/linssit/ihmisen-matka-rantamaski.js, Natural Earth
// 1:50m, 2880 × 1440): data { leveys, korkeus, aste, juoksut }. Juoksut ovat
// samaa muotoa kuin kulkumaskin (kuvaus-kenttä: base64-tavut, LEB128-varint
// -juoksut vuorotellen meri ja maa, meri ensin), joten purku on
// Ruudukko.PuraMaamaski. Rivi 0 = 90°N, sarake 0 = 180°W.
//
// Syöte on jäsennetty JSON samassa muodossa kuin MiniJson tuottaa
// (Dictionary/List/double); Ydin ei jäsennä tekstiä itse.
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Virrat
{
    /// <summary>Maa/meri-ruudukko tasavälisenä (1 = maa). Rivi 0 pohjoisin, sarake 0 = 180°W.</summary>
    public sealed class Ruutumaski
    {
        public byte[] Maa;
        public int Leveys;
        public int Korkeus;
        /// <summary>Ruudun sivu asteina (webissä `aste ?? 360 / leveys`).</summary>
        public double Aste;

        public Ruutumaski(byte[] maa, int leveys, int korkeus, double aste = double.NaN)
        {
            Maa = maa;
            Leveys = leveys;
            Korkeus = korkeus;
            Aste = double.IsNaN(aste) ? 360.0 / leveys : aste;
        }

        /// <summary>Rivijuoksuista (Ruudukko.PuraMaamaski).</summary>
        public static Ruutumaski Juoksuista(string juoksut, int leveys, int korkeus, double aste = double.NaN) =>
            new Ruutumaski(Ruudukko.PuraMaamaski(juoksut, leveys * korkeus), leveys, korkeus, aste);

        /// <summary>Virtalohkon kulkumaski (720 × 360, 0,5°); null, jos puuttuu.</summary>
        public static Ruutumaski Kulkumaskista(Maamaski m) =>
            m?.Juoksut == null ? null : Juoksuista(m.Juoksut, m.Leveys, m.Korkeus, Ruudukko.Aste);

        /// <summary>
        /// Rantamaski sisältöpaketin alkiosta: päätason kentät { id, leveys, korkeus, aste, juoksut } (2.0-polku)
        /// tai vanha { id, data: { … } } Paataso.Raaka-varareitin kautta, tai suoraan data-oliosta.
        /// </summary>
        public static Ruutumaski Lue(object alkio)
        {
            var o = alkio as Dictionary<string, object> ?? throw new FormatException("rantamaski: odotettiin objektia");
            // Päätaso ensin; raaka data vain Paatason kautta (RaakaKielletty katkaisee sen, Pelikoodari 24.9.).
            // 2.0-skeemassa alkiolla voi olla muiden alkioiden kentät null-arvoina: päätaso kelpaa vain arvolla.
            if (!(o.TryGetValue("juoksut", out var pj) && pj != null) && Matkakirja.Peli.Paataso.Raaka(o) is Dictionary<string, object> data) o = data;
            var juoksut = o.TryGetValue("juoksut", out var j) ? j as string : null;
            if (juoksut == null) throw new FormatException("rantamaski: juoksut puuttuu");
            var leveys = (int)(Luku(o, "leveys") ?? 2880);
            var korkeus = (int)(Luku(o, "korkeus") ?? 1440);
            return Juoksuista(juoksut, leveys, korkeus, Luku(o, "aste") ?? double.NaN);
        }

        static double? Luku(Dictionary<string, object> o, string nimi) =>
            o.TryGetValue(nimi, out var a) ? AineistonLukija.Luku(a) : null;
    }
}
