// DIORAAMAN LÄHDEDATA (Linnanrakentaja, speksi docs/raportit/dioraama-rajapinnat-20260929.md kohdat 1 ja 5).
// Jäsentää rakennus.json-muotoisen (tai käsin kirjoitetun testifixturen) JSON-merkkijonon Rakennus-puuksi
// MiniJsonilla. Kentät, joita Ydin-luokat (Kameraliike/Heratys/Ohjaaja/PoikkileikkausLinssi) eivät tarvitse
// (geoAnkkuri, aikakerros, lahteet, valot, palikat — rakennuskoneen ja Unity-puolen omaa dataa) jätetään
// tarkoituksella lukematta; ylimääräiset JSON-kentät eivät riko jäsennystä.
//
// LISÄYS SPEKSIN YLI (kirjattu raporttiin): Rakennus.Aanet (Dictionary<string,AaniTieto>) ei ole speksin
// kohdan 5 Rakennus-listalla, mutta js/dioraama/ohjaaja.js:n askeleenKesto (rak.aanet[aani].kesto_s) ja sen
// kommentti "kuten C#:n Rakennus-malli" olettavat sen olevan olemassa. Ilman sitä Ohjaaja.AskeleenKesto ei voisi
// toteuttaa äänipohjaista kestoa lainkaan. Lisätty, jotta C#-pariteetti JS-vertailutoteutuksen kanssa säilyy.
using System;
using System.Collections.Generic;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Dioraama
{
    /// <summary>Kameran asento: kohde + kompassikoordinaatit siitä (kohta 4). Katso Kameraliike.</summary>
    public readonly struct Asento
    {
        public readonly V3 Kohde;
        public readonly double Atsimuutti, Korkeus, Etaisyys, Fov, Aukko;
        public Asento(V3 kohde, double atsimuutti, double korkeus, double etaisyys, double fov, double aukko)
        { Kohde = kohde; Atsimuutti = atsimuutti; Korkeus = korkeus; Etaisyys = etaisyys; Fov = fov; Aukko = aukko; }
    }

    /// <summary>Hahmon spritelehden yksi animaatiosilmukka (rivi ruudukossa, ruutumäärä, toistonopeus).</summary>
    public sealed class Silmukka
    {
        public int Rivi, Ruudut, Fps;
    }

    /// <summary>Henkilöpankin (js/dioraama/pankit/henkilot.js) koostettu rivi + rakennuskoneen atlas-polku.</summary>
    public sealed class Henkilo
    {
        public string Id, Nimi, Atlas;
        public int RuutuL, RuutuK, Sarakkeet;
        public double PivotX, PivotY, KorkeusM;
        public Dictionary<string, Silmukka> Silmukat = new Dictionary<string, Silmukka>();
    }

    /// <summary>Pintapankin (js/dioraama/pankit/pinnat.js) rivi.</summary>
    public sealed class Pinta
    {
        public string Id, Vari;
        public double ToistoM, Hehku;
    }

    /// <summary>Äänipankin (js/dioraama/pankit/aanet.js) rivi. Katso tiedoston alun huomautus lisäyksestä.</summary>
    public sealed class AaniTieto
    {
        public string Tiedosto;
        public bool Silmukka;
        public double Voimakkuus, KestoS;
        public string Lisenssi;
    }

    public sealed class Kohta
    {
        public string Teksti, Lahde;
    }

    public sealed class Taulu
    {
        public string Otsikko, Tila;
        public List<Kohta> Kohdat = new List<Kohta>();
    }

    public sealed class Repliikki
    {
        public string Id, Teksti, Aani;
    }

    public sealed class Reitti
    {
        public List<V3> Pisteet = new List<V3>();
        public double Nopeus, Tauko;
    }

    /// <summary>Yksi askel huoneen käsikirjoituksessa (kohta 1: ASKEL). Kaikki kentät läsnä, vain osa käytössä
    /// riippuen Tee-arvosta ("pulu-lenna" | "taulu" | "kohta" | "repliikki" | "reaktio" | "odota").</summary>
    public sealed class Askel
    {
        public string Tee;
        public int N;
        public string HahmoId;
        public double S;
    }

    /// <summary>Huoneessa oleva hahmo paikkoineen ja repliikkeineen (kohta 1: HAHMO).</summary>
    public sealed class Hahmo
    {
        public string Id, HenkiloId;
        public V3 Paikka;
        public double Suunta;
        public bool Peilattu;
        public string Silmukka;
        public int Heraa;
        public Reitti Reitti;
        public List<Repliikki> Repliikit = new List<Repliikki>();
        public Repliikki Reaktio;
    }

    /// <summary>Yksi huone/tila rakennuksessa (kohta 1: TILA), täydennettynä rakennuskoneen glb-tiedoilla.</summary>
    public sealed class Tila
    {
        public string Id, Nimi;
        public bool Kohdistettava;
        public V3 RajaMin, RajaMax;
        public List<string> Naapurit = new List<string>();
        public Asento Kamera;
        /// <summary>Pystynäytön asento (valinnainen `kameraPysty`); null = Kamera.</summary>
        public Asento? KameraPysty;
        public V3 PuluLaskeutuminen;
        public string Taulupuoli;
        public Taulu Taulu;
        public List<Hahmo> Hahmot = new List<Hahmo>();
        public List<Askel> Kasikirjoitus = new List<Askel>();
        public string GlbTiedosto, GlbSha256;
    }

    /// <summary>Koko rakennus (kohta 1: RAKENNUS + rakennuskoneen lisäykset, kohta 3).</summary>
    public sealed class Rakennus
    {
        public string Id, Nimi, Otsikko;
        public int Versio;
        public Asento YleisVaaka, YleisPysty;
        public V3 PuluLaskeutuminen;
        public Taulu Taulu;
        public List<Tila> Tilat = new List<Tila>();
        public Dictionary<string, Henkilo> Henkilot = new Dictionary<string, Henkilo>();
        public Dictionary<string, Pinta> Pinnat = new Dictionary<string, Pinta>();
        public Dictionary<string, AaniTieto> Aanet = new Dictionary<string, AaniTieto>();

        /// <summary>Tila id:llä, tai null jos ei löydy (kuten js:n loydaTila).</summary>
        public Tila Tila(string id)
        {
            foreach (var t in Tilat) if (t.Id == id) return t;
            return null;
        }
    }

    public static class DioraamaData
    {
        /// <summary>Jäsentää rakennus.json:n (tai vastaavan käsin kirjoitetun fixturen) Rakennus-puuksi.</summary>
        public static Rakennus Lue(string json)
        {
            var juuri = MiniJson.Objekti(MiniJson.Jasenna(json));
            var r = new Rakennus
            {
                Id = MiniJson.Teksti(juuri, "id"),
                Nimi = MiniJson.Teksti(juuri, "nimi"),
                Otsikko = MiniJson.Teksti(juuri, "otsikko"),
                Versio = (int)(MiniJson.Luku(juuri, "versio") ?? 0),
            };
            var yleiskamera = MiniJson.ObjektiTaiNull(MiniJson.Kentta(juuri, "yleiskamera"));
            r.YleisVaaka = LueAsento(MiniJson.ObjektiTaiNull(MiniJson.Kentta(yleiskamera, "vaaka")));
            r.YleisPysty = LueAsento(MiniJson.ObjektiTaiNull(MiniJson.Kentta(yleiskamera, "pysty")));
            var pulu = MiniJson.ObjektiTaiNull(MiniJson.Kentta(juuri, "pulu"));
            r.PuluLaskeutuminen = LueV3(MiniJson.Kentta(pulu, "laskeutuminen"));
            r.Taulu = LueTaulu(MiniJson.ObjektiTaiNull(MiniJson.Kentta(juuri, "taulu")));

            foreach (var rivi in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(juuri, "tilat")))
            {
                var o = MiniJson.ObjektiTaiNull(rivi);
                if (o != null) r.Tilat.Add(LueTila(o));
            }
            foreach (var pari in MiniJson.ObjektiTaiNull(MiniJson.Kentta(juuri, "henkilot")) ?? new Dictionary<string, object>())
            {
                var o = MiniJson.ObjektiTaiNull(pari.Value);
                if (o != null) r.Henkilot[pari.Key] = LueHenkilo(pari.Key, o);
            }
            foreach (var pari in MiniJson.ObjektiTaiNull(MiniJson.Kentta(juuri, "pinnat")) ?? new Dictionary<string, object>())
            {
                var o = MiniJson.ObjektiTaiNull(pari.Value);
                if (o != null)
                    r.Pinnat[pari.Key] = new Pinta { Id = pari.Key, Vari = MiniJson.Teksti(o, "vari"),
                        ToistoM = MiniJson.Luku(o, "toisto_m") ?? 0, Hehku = MiniJson.Luku(o, "hehku") ?? 0 };
            }
            foreach (var pari in MiniJson.ObjektiTaiNull(MiniJson.Kentta(juuri, "aanet")) ?? new Dictionary<string, object>())
            {
                var o = MiniJson.ObjektiTaiNull(pari.Value);
                if (o != null)
                    r.Aanet[pari.Key] = new AaniTieto { Tiedosto = MiniJson.Teksti(o, "tiedosto"),
                        Silmukka = MiniJson.Totuus(o, "silmukka"), Voimakkuus = MiniJson.Luku(o, "voimakkuus") ?? 1,
                        KestoS = MiniJson.Luku(o, "kesto_s") ?? 0, Lisenssi = MiniJson.Teksti(o, "lisenssi") };
            }
            return r;
        }

        static V3 LueV3(object arvo)
        {
            var l = MiniJson.TaulukkoTaiTyhja(arvo);
            double Osa(int i) => l.Count > i && l[i] is double d ? d : 0;
            return new V3(Osa(0), Osa(1), Osa(2));
        }

        static Asento LueAsento(Dictionary<string, object> o)
        {
            if (o == null) return default;
            return new Asento(LueV3(MiniJson.Kentta(o, "kohde")), MiniJson.Luku(o, "atsimuutti") ?? 0,
                MiniJson.Luku(o, "korkeus") ?? 0, MiniJson.Luku(o, "etaisyys") ?? 0,
                MiniJson.Luku(o, "fov") ?? 0, MiniJson.Luku(o, "aukko") ?? 0);
        }

        static Taulu LueTaulu(Dictionary<string, object> o)
        {
            if (o == null) return null;
            var t = new Taulu { Otsikko = MiniJson.Teksti(o, "otsikko"), Tila = MiniJson.Teksti(o, "tila") };
            foreach (var rivi in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "kohdat")))
            {
                var k = MiniJson.ObjektiTaiNull(rivi);
                if (k != null) t.Kohdat.Add(new Kohta { Teksti = MiniJson.Teksti(k, "teksti"), Lahde = MiniJson.Teksti(k, "lahde") });
            }
            return t;
        }

        static Tila LueTila(Dictionary<string, object> o)
        {
            var t = new Tila
            {
                Id = MiniJson.Teksti(o, "id"),
                Nimi = MiniJson.Teksti(o, "nimi"),
                Kohdistettava = MiniJson.Totuus(o, "kohdistettava"),
                Kamera = LueAsento(MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "kamera"))),
                KameraPysty = MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "kameraPysty")) is Dictionary<string, object> kp
                    ? LueAsento(kp) : (Asento?)null,
                Taulu = LueTaulu(MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "taulu"))),
            };
            var rajat = MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "rajat"));
            t.RajaMin = LueV3(MiniJson.Kentta(rajat, "min"));
            t.RajaMax = LueV3(MiniJson.Kentta(rajat, "max"));
            foreach (var n in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "naapurit"))) if (n is string s) t.Naapurit.Add(s);
            var pulu = MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "pulu"));
            t.PuluLaskeutuminen = LueV3(MiniJson.Kentta(pulu, "laskeutuminen"));
            t.Taulupuoli = MiniJson.Teksti(pulu, "taulupuoli");
            foreach (var rivi in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "hahmot")))
            {
                var h = MiniJson.ObjektiTaiNull(rivi);
                if (h != null) t.Hahmot.Add(LueHahmo(h));
            }
            foreach (var rivi in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "kasikirjoitus")))
            {
                var a = MiniJson.ObjektiTaiNull(rivi);
                if (a != null) t.Kasikirjoitus.Add(LueAskel(a));
            }
            var glb = MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "glb"));
            t.GlbTiedosto = MiniJson.Teksti(glb, "tiedosto");
            t.GlbSha256 = MiniJson.Teksti(glb, "sha256");
            return t;
        }

        static Henkilo LueHenkilo(string id, Dictionary<string, object> o)
        {
            var h = new Henkilo
            {
                Id = id,
                Nimi = MiniJson.Teksti(o, "nimi"),
                Atlas = MiniJson.Teksti(o, "atlas"),
                Sarakkeet = (int)(MiniJson.Luku(o, "sarakkeet") ?? 0),
                KorkeusM = MiniJson.Luku(o, "korkeus_m") ?? 0,
            };
            var ruutu = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "ruutu"));
            h.RuutuL = ruutu.Count > 0 && ruutu[0] is double rl ? (int)rl : 0;
            h.RuutuK = ruutu.Count > 1 && ruutu[1] is double rk ? (int)rk : 0;
            var pivot = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "pivot"));
            h.PivotX = pivot.Count > 0 && pivot[0] is double px ? px : 0;
            h.PivotY = pivot.Count > 1 && pivot[1] is double py ? py : 0;
            foreach (var pari in MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "silmukat")) ?? new Dictionary<string, object>())
            {
                var s = MiniJson.ObjektiTaiNull(pari.Value);
                if (s != null)
                    h.Silmukat[pari.Key] = new Silmukka { Rivi = (int)(MiniJson.Luku(s, "rivi") ?? 0),
                        Ruudut = (int)(MiniJson.Luku(s, "ruudut") ?? 0), Fps = (int)(MiniJson.Luku(s, "fps") ?? 0) };
            }
            return h;
        }

        static Hahmo LueHahmo(Dictionary<string, object> o)
        {
            var h = new Hahmo
            {
                Id = MiniJson.Teksti(o, "id"),
                HenkiloId = MiniJson.Teksti(o, "henkilo"),
                Paikka = LueV3(MiniJson.Kentta(o, "paikka")),
                Suunta = MiniJson.Luku(o, "suunta") ?? 0,
                Peilattu = MiniJson.Totuus(o, "peilattu"),
                Silmukka = MiniJson.Teksti(o, "silmukka"),
                Heraa = (int)(MiniJson.Luku(o, "heraa") ?? 0),
            };
            var reitti = MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "reitti"));
            if (reitti != null)
            {
                var re = new Reitti { Nopeus = MiniJson.Luku(reitti, "nopeus") ?? 0, Tauko = MiniJson.Luku(reitti, "tauko") ?? 0 };
                foreach (var p in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(reitti, "pisteet"))) re.Pisteet.Add(LueV3(p));
                h.Reitti = re;
            }
            foreach (var rivi in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "repliikit")))
            {
                var rp = MiniJson.ObjektiTaiNull(rivi);
                if (rp != null) h.Repliikit.Add(LueRepliikki(rp));
            }
            var reaktio = MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "reaktio"));
            if (reaktio != null) h.Reaktio = LueRepliikki(reaktio);
            return h;
        }

        static Repliikki LueRepliikki(Dictionary<string, object> o) =>
            new Repliikki { Id = MiniJson.Teksti(o, "id"), Teksti = MiniJson.Teksti(o, "teksti"), Aani = MiniJson.Teksti(o, "aani") };

        static Askel LueAskel(Dictionary<string, object> o) => new Askel
        {
            Tee = MiniJson.Teksti(o, "tee"),
            N = (int)(MiniJson.Luku(o, "n") ?? 0),
            HahmoId = MiniJson.Teksti(o, "hahmo"),
            S = MiniJson.Luku(o, "s") ?? 0,
        };
    }
}
