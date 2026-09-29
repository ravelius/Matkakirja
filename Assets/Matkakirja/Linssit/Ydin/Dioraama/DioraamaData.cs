// DIORAAMAN LÄHDEDATA (Linnanrakentaja, speksi docs/raportit/dioraama-rajapinnat-20260929.md kohdat 1 ja 5).
// Jäsentää rakennus.json-muotoisen (tai käsin kirjoitetun testifixturen) JSON-merkkijonon Rakennus-puuksi
// MiniJsonilla. Kentät, joita Ydin-luokat (Kameraliike/Heratys/Ohjaaja/PoikkileikkausLinssi) eivät tarvitse
// (geoAnkkuri, aikakerros, lahteet, valot, palikat — rakennuskoneen ja Unity-puolen omaa dataa) jätetään
// tarkoituksella lukematta; ylimääräiset JSON-kentät eivät riko jäsennystä.
//
// LISÄYS SPEKSIN YLI (kirjattu raporttiin, era 1): Rakennus.Aanet ei ollut speksin kohdan 5 Rakennus-listalla,
// mutta js/dioraama/ohjaaja.js:n askeleenKesto (rak.aanet[aani].kesto_s) ja sen kommentti "kuten C#:n Rakennus-
// malli" olettivat sen olevan olemassa. ERA 2 (dioraama-rajapinnat-era2-20260929.md kohta 3) muodollistaa tämän:
// luokka nimettiin AaniTiedosta Aaniksi ja sille lisättiin Id-kenttä (Lisenssi jätettiin pois, koska rakennus.json
// ei tulosta sitä aanet-oliolle — vain pankin lähdedatassa on lisenssi, ks. kohta 2 "AANET").
//
// ERA 2 -LISÄYKSET (kirjattu raporttiin, dioraama-rajapinnat-era2-20260929.md kohdat 2 ja 3): Pinta.ToistoU/
// ToistoV/Tekstuuri/VirtausU/VirtausV, Henkilo.PxPerM, Rakennus.Liekit + Liekki, Tila.Liekit + LiekkiPaikka,
// Rakennus.Aanet (uudelleennimetty) + Tila.Aanet + AaniPaikka, Kohta.Aani. Kaikki uusi on valinnaista: vanha
// paketti (ilman näitä JSON-kenttiä) jäsentyy ennallaan, uudet kentät jäävät oletusarvoihinsa.
//
// KOORDINAATTORIN LISÄYS 29.9. (era2 kohta 2 "AANET"): Tila.Tehosteet + TehosteJakso (tilan satunnaiset
// kertaäänet). Askel.N oli jo olemassa (repliikki-askel voi valita rivin sillä); rakennus.json:n aanet[id].Tiedosto
// sisältää nyt v<versio>-alikansion (natiivin URL-välimuisti) — merkkijono luetaan sellaisenaan, ei erillistä
// Versio-kenttää Aani-luokkaan.
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
        /// <summary>Maalatun atlaksen pikseliä per metri (era 2, kohta 2 "HENKILOT"); 0 = ei maalattu
        /// (paikkamerkkihahmo, ei kenttää lähteessä).</summary>
        public double PxPerM;
        public Dictionary<string, Silmukka> Silmukat = new Dictionary<string, Silmukka>();
    }

    /// <summary>Pintapankin (js/dioraama/pankit/pinnat.js) rivi.</summary>
    public sealed class Pinta
    {
        public string Id, Vari, Tekstuuri;
        public double Hehku;
        /// <summary>Vanha yksiarvoinen toisto (era 1); säilyy aina samana kuin ToistoU (era 2 kohta 3).</summary>
        public double ToistoM;
        /// <summary>UV-toisto metreinä ura/pystyakselilla (era 2 kohta 2 "PINNAT"/"UV"): lähteen toisto_m on
        /// joko numero (→ ToistoU = ToistoV) tai [u_m, v_m]-taulukko.</summary>
        public double ToistoU, ToistoV;
        /// <summary>UV-siirtymä metriä/s (era 2), vain vesipinnoilla; muuten (0, 0).</summary>
        public double VirtausU, VirtausV;
    }

    /// <summary>Äänipankin (js/dioraama/pankit/aanet.js) rivi rakennus.jsonista (era 2 kohta 2 "AANET";
    /// nimetty AaniTiedosta uudelleen, katso tiedoston alun huomautus). Ei Lisenssi-kenttää: rakennus.json ei
    /// tulosta sitä äänille (toisin kuin henkilöille).</summary>
    public sealed class Aani
    {
        public string Id, Tiedosto;
        public bool Silmukka;
        public double Voimakkuus, KestoS;
    }

    /// <summary>Liekkipankin (js/dioraama/pankit/liekit.js) rivi + rakennuskoneen atlas-polku (era 2 kohta 2
    /// "LIEKIT").</summary>
    public sealed class Liekki
    {
        public string Id, Atlas;
        public int RuutuL, RuutuK, Sarakkeet, Ruudut, Fps;
        public double KokoL, KokoK, PivotX, PivotY;
    }

    /// <summary>Yksi liekki-instanssi tilassa (era 2 kohta 2: TILA.liekit-lista).</summary>
    public sealed class LiekkiPaikka
    {
        public string LiekkiId;
        public V3 Paikka;
        public double Koko, Vaihe;
    }

    /// <summary>Yksi tilakohtainen äänilähde (era 2 kohta 2: TILA.aanet-lista).</summary>
    public sealed class AaniPaikka
    {
        public string AaniId;
        public double Voimakkuus;
    }

    /// <summary>Yksi tilan satunnaisten kertaäänien tehostejakso (era 2 kohta 2 "AANET": TILA.tehosteet-lista,
    /// koordinaattorin lisäys 29.9.). Soittaa AaniIdt-listalta yhden satunnaisen äänen kerrallaan, odottaen
    /// seuraavaa satunnaisin väliajoin ValiMin..ValiMax-väliltä (sekuntia).</summary>
    public sealed class TehosteJakso
    {
        public List<string> AaniIdt = new List<string>();
        public double ValiMin, ValiMax, Voimakkuus;
    }

    public sealed class Kohta
    {
        public string Teksti, Lahde;
        /// <summary>Äänen id Rakennus.Aanet-pankissa, tai null (era 2 kohta 2: taulu.kohdat[].aani).</summary>
        public string Aani;
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
        /// <summary>Tilaan sijoitetut liekki-instanssit (era 2); tyhjä vanhassa muodossa.</summary>
        public List<LiekkiPaikka> Liekit = new List<LiekkiPaikka>();
        /// <summary>Tilaan sijoitetut äänilähteet (era 2); tyhjä vanhassa muodossa.</summary>
        public List<AaniPaikka> Aanet = new List<AaniPaikka>();
        /// <summary>Tilan satunnaisten kertaäänien tehostejaksot (era 2, koordinaattorin lisäys 29.9.); tyhjä
        /// vanhassa muodossa ja tiloissa, joilla ei ole tehosteita.</summary>
        public List<TehosteJakso> Tehosteet = new List<TehosteJakso>();
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
        /// <summary>Käytetyt liekkimääritykset (era 2); tyhjä vanhassa muodossa.</summary>
        public Dictionary<string, Liekki> Liekit = new Dictionary<string, Liekki>();
        public Dictionary<string, Aani> Aanet = new Dictionary<string, Aani>();

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
                if (o == null) continue;
                var (tu, tv) = LueToisto(o);
                var virtaus = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "virtaus"));
                double vu = virtaus.Count > 0 && virtaus[0] is double vud ? vud : 0;
                double vv = virtaus.Count > 1 && virtaus[1] is double vvd ? vvd : 0;
                r.Pinnat[pari.Key] = new Pinta { Id = pari.Key, Vari = MiniJson.Teksti(o, "vari"),
                    ToistoM = tu, ToistoU = tu, ToistoV = tv, Hehku = MiniJson.Luku(o, "hehku") ?? 0,
                    Tekstuuri = MiniJson.Teksti(o, "tekstuuri"), VirtausU = vu, VirtausV = vv };
            }
            foreach (var pari in MiniJson.ObjektiTaiNull(MiniJson.Kentta(juuri, "liekit")) ?? new Dictionary<string, object>())
            {
                var o = MiniJson.ObjektiTaiNull(pari.Value);
                if (o != null) r.Liekit[pari.Key] = LueLiekki(pari.Key, o);
            }
            foreach (var pari in MiniJson.ObjektiTaiNull(MiniJson.Kentta(juuri, "aanet")) ?? new Dictionary<string, object>())
            {
                var o = MiniJson.ObjektiTaiNull(pari.Value);
                if (o != null)
                    r.Aanet[pari.Key] = new Aani { Id = pari.Key, Tiedosto = MiniJson.Teksti(o, "tiedosto"),
                        Silmukka = MiniJson.Totuus(o, "silmukka"), Voimakkuus = MiniJson.Luku(o, "voimakkuus") ?? 1,
                        KestoS = MiniJson.Luku(o, "kesto_s") ?? 0 };
            }
            return r;
        }

        /// <summary>toisto_m on joko numero (→ U = V = numero) tai [u_m, v_m] (era 2 kohta 2 "PINNAT"/"UV").</summary>
        static (double u, double v) LueToisto(Dictionary<string, object> o)
        {
            var arvo = MiniJson.Kentta(o, "toisto_m");
            if (arvo is List<object> l)
            {
                double u = l.Count > 0 && l[0] is double du ? du : 0;
                double v = l.Count > 1 && l[1] is double dv ? dv : u;
                return (u, v);
            }
            double numero = arvo is double d ? d : 0;
            return (numero, numero);
        }

        static Liekki LueLiekki(string id, Dictionary<string, object> o)
        {
            var l = new Liekki
            {
                Id = id, Atlas = MiniJson.Teksti(o, "atlas"),
                Sarakkeet = (int)(MiniJson.Luku(o, "sarakkeet") ?? 0),
                Ruudut = (int)(MiniJson.Luku(o, "ruudut") ?? 0),
                Fps = (int)(MiniJson.Luku(o, "fps") ?? 0),
            };
            var ruutu = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "ruutu"));
            l.RuutuL = ruutu.Count > 0 && ruutu[0] is double rl ? (int)rl : 0;
            l.RuutuK = ruutu.Count > 1 && ruutu[1] is double rk ? (int)rk : 0;
            var koko = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "koko_m"));
            l.KokoL = koko.Count > 0 && koko[0] is double kl ? kl : 0;
            l.KokoK = koko.Count > 1 && koko[1] is double kk ? kk : 0;
            var pivot = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "pivot"));
            l.PivotX = pivot.Count > 0 && pivot[0] is double px ? px : 0;
            l.PivotY = pivot.Count > 1 && pivot[1] is double py ? py : 0;
            return l;
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
                if (k != null) t.Kohdat.Add(new Kohta { Teksti = MiniJson.Teksti(k, "teksti"), Lahde = MiniJson.Teksti(k, "lahde"),
                    Aani = MiniJson.Teksti(k, "aani") });
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
            foreach (var rivi in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "liekit")))
            {
                var l = MiniJson.ObjektiTaiNull(rivi);
                if (l != null) t.Liekit.Add(new LiekkiPaikka { LiekkiId = MiniJson.Teksti(l, "liekki"),
                    Paikka = LueV3(MiniJson.Kentta(l, "paikka")), Koko = MiniJson.Luku(l, "koko") ?? 1,
                    Vaihe = MiniJson.Luku(l, "vaihe") ?? 0 });
            }
            foreach (var rivi in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "aanet")))
            {
                var a = MiniJson.ObjektiTaiNull(rivi);
                if (a != null) t.Aanet.Add(new AaniPaikka { AaniId = MiniJson.Teksti(a, "aani"),
                    Voimakkuus = MiniJson.Luku(a, "voimakkuus") ?? 1 });
            }
            foreach (var rivi in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "tehosteet")))
            {
                var te = MiniJson.ObjektiTaiNull(rivi);
                if (te == null) continue;
                var jakso = new TehosteJakso { Voimakkuus = MiniJson.Luku(te, "voimakkuus") ?? 1 };
                foreach (var id in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(te, "aanet"))) if (id is string s) jakso.AaniIdt.Add(s);
                var valit = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(te, "valit_s"));
                jakso.ValiMin = valit.Count > 0 && valit[0] is double vmin ? vmin : 0;
                jakso.ValiMax = valit.Count > 1 && valit[1] is double vmax ? vmax : 0;
                t.Tehosteet.Add(jakso);
            }
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
                PxPerM = MiniJson.Luku(o, "px_per_m") ?? 0,
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
