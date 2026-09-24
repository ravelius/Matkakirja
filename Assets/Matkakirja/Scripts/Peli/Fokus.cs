// FOKUSTEHTÄVÄT JA VIHREÄ AARREPISTE (web js/fokustehtavat.js ja js/fokusvirta.js, kevyt kulku,
// FOKUSVIRTA_KORTIT = false; Fablen tarkastus B3 23.9.2026):
//   kaupunkilehti → lehden nimetyt tehtävät → kohtaaminen ja laattakysymys lehden tehtävänapista,
//   laatasta tai vihreästä pisteestä → aarre.
// Lehden "aarteen avaajat" ovat fokusvirran lehtitehtävät, joiden palkinto ei ole juliste, ja
// kulttuurivisa (fokus:kulttuurivisa), kun kaupungilla on kohtaaminen ja aarrepiste. Oikein ratkaistu
// avaaja tai ostettu pullavinkki sytyttää pisteen (fokusAarreAvattu); kaksi ratkaistua nostotehtävää
// avaa sen myös (fokusAarrepisteAuki). Piste näkyy nykyisessä kaupungissa niin kauan kuin laatta on
// kääntämättä, lukittuna tai auki. Sisältö: kokoelma fokusvirrat (kohtaaminen, sahketehtava,
// kohtaamispiste.laudat.maailmankartta {x, y} laudan Miller-pisteinä, lehtitehtavat).
// Ei UnityEngineä: testattavissa (Peli-testit/Testit/FokusTestit.cs).
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Peli;

namespace Matkakirja.Natiivi
{
    /// <summary>Nykyisen kaupungin vihreä aarrepiste (web fokusvirtaKohtaamispiste).</summary>
    public sealed class Aarrepiste
    {
        public string Kaupunki;
        /// <summary>Laudan Miller-piste (maailmankartta); asteiksi ReittiGeometria.Asteiksi.</summary>
        public double X, Y;
        public string Nimi;
        /// <summary>Lapun teksti: "tapaa paikallinen" / "lue pöllön sähke" tai lukittuna ohje.</summary>
        public string Teko;
        public bool Lukittu;
    }

    public sealed class Fokusdata
    {
        public const string Etuliite = "fokus";
        public const string KulttuurivisaId = "kulttuurivisa";
        /// <summary>Web NOSTOTEHTAVIA_AARREPISTEESEEN.</summary>
        public const int NostotehtaviaAarrepisteeseen = 2;
        /// <summary>Web AARREPISTEEN_LUKKOLAPPU.</summary>
        public const string Lukkolappu = "ratkaise kaksi kysymystä kartalta";

        sealed class Kaupunki
        {
            public readonly List<(string Id, string Palkinto)> Tehtavat = new List<(string, string)>();
            public bool Kohtaaminen, Sahketehtava;
            public double? X, Y;
            public string PisteNimi;
        }

        readonly Dictionary<string, Kaupunki> kaupungit = new Dictionary<string, Kaupunki>();

        /// <summary>
        /// Onko kaupungilla kulttuurivisan kysymys (web KULTTUURIT[lauta][kaupunki].kysymys). Natiivi-UI
        /// asettaa, koska se lukee lehden kulttuurivisan paketista; oletus: ei.
        /// </summary>
        public Func<string, bool> Kulttuurivisa = _ => false;

        public int Kaupunkeja => kaupungit.Count;

        /// <summary>
        /// Kokoelma fokusvirrat. lauta = kohtaamispisteen laudan tunnus. Päätaso (skeema 1.26):
        /// kohtaamispiste, sahketehtava, virta.kohtaaminen ja lehtitehtavat (id-lista "kaupunki:tehtava";
        /// tehtävän tunnus ja palkinto kokoelmasta lehtitehtavat, jonka teksti annetaan lehtitehtavat-
        /// parametrina). Vanha paketti (ei päätason listaa): data.* Paataso-varareitillä.
        /// </summary>
        public static Fokusdata Lue(string json, string lauta = "maailmankartta", string lehtitehtavat = null)
        {
            var f = new Fokusdata();
            if (string.IsNullOrEmpty(json)) return f;
            Dictionary<string, (string Tehtava, string Palkinto)> tehtavat = null;
            if (!string.IsNullOrEmpty(lehtitehtavat))
            {
                tehtavat = new Dictionary<string, (string, string)>();
                foreach (var t in MiniJson.Alkiot(lehtitehtavat))
                    if (MiniJson.Teksti(t, "id") is string lid)
                        tehtavat[lid] = (MiniJson.Teksti(t, "tehtava"), MiniJson.Teksti(t, "palkinto"));
            }
            foreach (var o in MiniJson.Alkiot(json))
            {
                var id = MiniJson.Teksti(o, "kaupunki") ?? MiniJson.Teksti(o, "id");
                if (id == null) continue;
                var raaka = Paataso.Raaka(o);
                // Päätason virta = webin FOKUSVIRRAT[kaupunki] (raaka data on sama olio).
                var virta = MiniJson.Kentta(o, "virta") as Dictionary<string, object> ?? raaka;
                var k = new Kaupunki
                {
                    Kohtaaminen = MiniJson.Kentta(virta, "kohtaaminen") != null,
                    Sahketehtava = Paataso.Olio(o, "sahketehtava", "sahketehtava") != null,
                };
                if (Paataso.Olio(o, "kohtaamispiste", "kohtaamispiste") is Dictionary<string, object> kp)
                {
                    k.PisteNimi = MiniJson.Teksti(kp, "nimi");
                    if (MiniJson.Kentta(kp, "laudat") is Dictionary<string, object> laudat
                        && MiniJson.Kentta(laudat, lauta) is Dictionary<string, object> p
                        && MiniJson.Luku(p, "x") is double x && MiniJson.Luku(p, "y") is double y
                        && !double.IsNaN(x) && !double.IsNaN(y))
                    { k.X = x; k.Y = y; }
                }
                var idt = MiniJson.Kentta(o, "lehtitehtavat") as List<object>;
                if (idt != null && (tehtavat != null || raaka == null))
                {
                    if (tehtavat == null) throw new FormatException($"fokusvirran {id} lehtitehtävät tarvitsevat kokoelman lehtitehtavat");
                    foreach (var tid in idt.OfType<string>())
                    {
                        if (!tehtavat.TryGetValue(tid, out var t))
                            throw new FormatException($"fokusvirran {id} lehtitehtävä {tid} puuttuu kokoelmasta lehtitehtavat");
                        k.Tehtavat.Add((t.Tehtava ?? Tehtava(tid, id), t.Palkinto));
                    }
                }
                else if (MiniJson.Kentta(raaka, "lehtitehtavat") is List<object> tl)
                    foreach (var t in tl.OfType<Dictionary<string, object>>())
                        if (MiniJson.Teksti(t, "id") is string tid) k.Tehtavat.Add((tid, MiniJson.Teksti(t, "palkinto")));
                f.kaupungit[id] = k;
            }
            return f;
        }

        /// <summary>Lehtitehtävän kokoelma-id "kaupunki:tehtava" → tehtava (lehden aihe fokus:&lt;tehtava&gt;).</summary>
        static string Tehtava(string id, string kaupunki) =>
            id.StartsWith(kaupunki + ":", StringComparison.Ordinal) ? id.Substring(kaupunki.Length + 1) : id;

        /// <summary>Web tehtavanAihe: "fokus:&lt;id&gt;" (minitehtävän aihe Kaupat-avaimessa).</summary>
        public static string Aihe(string tehtavaId) => Etuliite + ":" + tehtavaId;

        /// <summary>Web aarteenAvaajat: aarteen avaavat aiheet (ei julisteet) ja kulttuurivisa, jos mahdollinen.</summary>
        public IReadOnlyList<string> Avaajat(string kaupunki)
        {
            var lista = new List<string>();
            if (kaupunki == null || !kaupungit.TryGetValue(kaupunki, out var k)) return lista;
            foreach (var t in k.Tehtavat) if (t.Palkinto != "juliste") lista.Add(Aihe(t.Id));
            if (k.Kohtaaminen && k.X.HasValue && Kulttuurivisa(kaupunki)) lista.Add(Aihe(KulttuurivisaId));
            return lista;
        }

        /// <summary>Web fokusAarreAvattu: pullavinkki tai jokin avaaja ratkaistu oikein.</summary>
        public bool AarreAvattu(Kaupat kaupat, string kaupunki) =>
            kaupunki != null && (kaupat.PullaVinkkiOstettu(kaupunki) || Avaajat(kaupunki).Any(a => kaupat.MinitehtavaRatkaistu(kaupunki, a)));

        /// <summary>Web fokusAarreVastattu: kaikkiin avaajiin on vastattu (umpikuja ilman pullaa).</summary>
        public bool AarreVastattu(Kaupat kaupat, string kaupunki)
        {
            var a = Avaajat(kaupunki);
            return a.Count > 0 && a.All(x => kaupat.MinitehtavaVastattu(kaupunki, x));
        }

        /// <summary>Web aarreAuki: jälki on jo kartalla tai laatta käännetty (avaavasta kysymyksestä vain rahaa).</summary>
        public bool AarreAuki(Kaupat kaupat, string kaupunki) =>
            AarreAvattu(kaupat, kaupunki) || !kaupat.Matka.LaattaTassa(kaupunki);

        /// <summary>Web fokusAarrepisteAuki: avattu tai kaksi nostotehtävää ratkaistu.</summary>
        public bool AarrepisteAuki(Kaupat kaupat, string kaupunki) =>
            AarreAvattu(kaupat, kaupunki) || kaupat.Matka.Tila.Kaupat.NostotehtavatRatkaistu >= NostotehtaviaAarrepisteeseen;

        /// <summary>
        /// Web fokusvirtaKohtaamispiste pelaajan nykyiselle kaupungille: kohtaaminen tai sähketehtävä,
        /// laatta kääntämättä ja pisteellä paikka. null = ei pistettä.
        /// </summary>
        public Aarrepiste Piste(Kaupat kaupat)
        {
            var s = kaupat.Matka.Tila.Pelaaja.Sijainti;
            if (!s.Kaupungissa || !kaupungit.TryGetValue(s.Kaupunki, out var k)) return null;
            if (!k.Kohtaaminen && !k.Sahketehtava) return null;
            if (!kaupat.Matka.LaattaTassa(s.Kaupunki) || !k.X.HasValue) return null;
            bool lukittu = !AarrepisteAuki(kaupat, s.Kaupunki);
            return new Aarrepiste
            {
                Kaupunki = s.Kaupunki, X = k.X.Value, Y = k.Y.Value,
                Nimi = k.PisteNimi ?? PeliApu.KaupunginNimi(kaupat.Matka.Verkko, s.Kaupunki),
                Teko = lukittu ? Lukkolappu : k.Sahketehtava ? "lue pöllön sähke" : "tapaa paikallinen",
                Lukittu = lukittu,
            };
        }

        /// <summary>Onko kaupungilla kohtaaminen (web: vihreä piste avaa visan muodossa quiz).</summary>
        public bool Kohtaaminen(string kaupunki) => kaupunki != null && kaupungit.TryGetValue(kaupunki, out var k) && k.Kohtaaminen;
    }
}
