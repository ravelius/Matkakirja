// TAIDEMUSEO: SALIN JA TEOSTEN DATA (Linssiseppä 10.10.2026; PT 09.5x, Raamattu TAIDEMUSEO-LINSSI, MAITTAIN, ALANKOMAAT ENSIN,
// ESITYSMOOTTORI). Lava SALI on dataa: Linnanrakentajan sali.json (osat laatikkoina, aukot, teospaikat valokeiloineen,
// kehysprofiilit cm-polylineina, reitti) ja teokset.json (Sisältökirjurin aineisto, Rijksmuseum PDM). Ripustus yhdistää
// teospaikan ehdotuksen teokseen; teos ripustetaan TODELLISESSA koossaan (cm), ja jos se ei mahdu paikan rajoihin, se
// pienennetään mahtumaan (kirjataan Ripustus.Pienennetty). Koordinaatit glTF: X oikealle, Y ylös, Z taaksepäin, metrit,
// origo sisäänkäynnin lattiassa (kävijä etenee −Z). Puhdas C#: MuseoTestit.
using System;
using System.Collections.Generic;
using System.Globalization;
using Matkakirja.Linssit.Dioraama;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Museo
{
    public sealed class Valokeila
    {
        public V3 Paikka, Suunta;
        public double PuolikulmaAste, Reunahaive, Lx, Kelvin;
    }

    /// <summary>Veistospaikka (sali.json "veistospaikat", LR): jalusta (alapinnan keskipiste, koko m), veistoksen alapinnan keskipiste
    /// (Paikka, jalustan päällä), suurin koko [x, y, z] m, katse ja omat valokeilat. Veistos = patsas-id (veistokset.json) tai null.</summary>
    public sealed class Jalusta
    {
        public string Id, Osa, Ehdotus, Veistos;
        public V3 AlaKeski, Koko, Paikka, MaxKoko, Katse;
        public readonly List<Valokeila> Valot = new List<Valokeila>();
    }

    public sealed class Teospaikka
    {
        public string Id, Osa, Seina, Sopii, Kehysprofiili, Ehdotus;
        public V3 Keskipiste, Normaali;
        public double MaxLeveys, MaxKorkeus;
        public Valokeila Valo;
        public bool Grafiikka => Sopii == "grafiikka";
    }

    public sealed class Aukko
    {
        public string Id, Seina;
        public string[] Osat;
        public double Keskipiste, Leveys, Korkeus, Syvyys;
        public bool Kaari;
    }

    /// <summary>Huone (Sisältökirjurin huoneet.json): nimi näkyy hetken huoneeseen tultaessa, teksti vain napautuksesta (Raamattu:
    /// NIMIKYLTIT HETKEN, INFO NAPAUTUKSESTA). Osat = sali.json:n osa-id:t (komerot jakavat yhden huoneen).</summary>
    public sealed class Huone
    {
        public string Id, Nimi, NimiEn, Teksti;
        public readonly List<string> Osat = new List<string>();
    }

    public sealed class Osa
    {
        public string Id, Nimi, Tyyppi, SeinaMateriaali, PaneeliMateriaali, Lattia, KattoTyyppi;
        public double X0, X1, Y0, Y1, Z0, Z1;   // X0 < X1, Y0 < Y1, Z0 < Z1 (järjestetty luettaessa)
        public double Sokkeli, Paneeli, Lista, Lx, Ev100, Kelvin, Paivanvalo;
        /// <summary>Kattoikkuna (leveys X, pituus Z) metreinä; null = ei.</summary>
        public double[] Kattoikkuna;
        public bool Sisalla(V3 p, double vara = 0) => p.X >= X0 - vara && p.X <= X1 + vara && p.Z >= Z0 - vara && p.Z <= Z1 + vara;
    }

    public sealed class Kehysprofiili
    {
        public string Id, Materiaali;
        /// <summary>Poikkileikkaus (cm): x = etäisyys teoksen reunasta ulospäin, y = korkeus seinästä; ulkoreuna → sisäreuna.</summary>
        public List<(double X, double Y)> Pisteet = new List<(double, double)>();
        public double LeveysCm { get { double m = 0; foreach (var p in Pisteet) m = Math.Max(m, p.X); return m; } }
        /// <summary>Sisähuulen korkeus seinästä (cm, profiilin viimeinen piste): kangas jää tämän alle.</summary>
        public double HuuliCm => Pisteet.Count > 0 ? Pisteet[Pisteet.Count - 1].Y : 1.5;
    }

    /// <summary>Tekstitaulu ilman tekstiä (liite C2.4 kohta 8): pieni vaalea laatta teoksen vieressä; napautus avaa kortin.</summary>
    public sealed class Tekstitaulu
    {
        public string Id, Teospaikka;
        public V3 Keskipiste, Normaali;
        public double Leveys, Korkeus;
    }

    public sealed class Reittipiste
    {
        public V3 P, Katse;
        public double PysahdysS;
        public string Kohde;
    }

    public sealed class Teos
    {
        /// <summary>Kuva = JPEG-seinäkuva (2048 px) ja Paketti = ASTC-paketin kansio ("astc-v1/&lt;id&gt;/"), kumpikin suhteessa maan juureen
        /// (MuseoSovitin.KuvaJuuri); null = ei kuvaa / ei pakettia.</summary>
        public string Id, Otsikko, Alkuperainen, Taiteilija, Vuosi, Tekniikka, Lahde, Lisenssi, Iiif, Kuva, Paketti;
        /// <summary>Lyhyt kuvateksti (1–3 virkettä, Sisältökirjuri); null = ei riviä kortissa.</summary>
        public string Kuvateksti;
        /// <summary>Kuva on havainnekuva (ei teoksen valokuva): kortti merkitsee sen kuten nostot.</summary>
        public bool Havainnekuva;
        /// <summary>Kuvan pikselit (leveys, korkeus): v2:ssa ASTC-paketin lähde (iso, pitkä sivu 8192), v1:ssä seinäkuva; 0 = tuntematon.</summary>
        public int KuvaLeveys, KuvaKorkeus;
        public double KorkeusCm, LeveysCm, Kuvasuhde;
        public bool Grafiikka;
        /// <summary>Kortin mittarivi: "45,5 × 41 cm".</summary>
        public string Mitat => $"{Luku(KorkeusCm)} × {Luku(LeveysCm)} cm";
        static string Luku(double v) => v.ToString(v % 1 == 0 ? "0" : "0.0", CultureInfo.GetCultureInfo("fi-FI"));
    }

    public sealed class Ripustus
    {
        public Teospaikka Paikka;
        public Teos Teos;
        /// <summary>Teoksen (ilman kehystä) koko seinällä metreinä.</summary>
        public double Leveys, Korkeus;
        public bool Pienennetty;
    }

    public sealed class Sali
    {
        public string Maa, Nimi, Oletuskehys;
        public readonly List<Osa> Osat = new List<Osa>();
        public readonly List<Aukko> Aukot = new List<Aukko>();
        public readonly List<Teospaikka> Teospaikat = new List<Teospaikka>();
        public readonly Dictionary<string, Kehysprofiili> Kehykset = new Dictionary<string, Kehysprofiili>(StringComparer.Ordinal);
        public readonly Dictionary<string, (double R, double G, double B)> Varit = new Dictionary<string, (double, double, double)>(StringComparer.Ordinal);
        public readonly Dictionary<string, (double R, double G, double B, double Karheus, double Metalli)> KehysMateriaalit =
            new Dictionary<string, (double, double, double, double, double)>(StringComparer.Ordinal);
        public readonly List<Reittipiste> Reitti = new List<Reittipiste>();
        public readonly List<Tekstitaulu> Tekstitaulut = new List<Tekstitaulu>();
        /// <summary>Veistospaikkojen tunnukset (sali.json "veistospaikat"; veistokset GLB:inä myöhemmin, nyt reitin kulkupisteitä).</summary>
        public readonly HashSet<string> Veistospaikat = new HashSet<string>(StringComparer.Ordinal);
        /// <summary>Veistospaikat kokonaisina (MuseoVeistokset, Natiiviseppä); Veistos täytetään LueVeistokset-kutsulla.</summary>
        public readonly List<Jalusta> Jalustat = new List<Jalusta>();
        public Jalusta HaeJalusta(string id) => Jalustat.Find(j => j.Id == id);

        /// <summary>veistokset.json {"sijoitus": {veistospaikka-id: patsas-id}} → Jalusta.Veistos; tuntemattomat paikat ohitetaan.
        /// Palauttaa sijoitettujen määrän.</summary>
        public int LueVeistokset(string json)
        {
            int n = 0;
            foreach (var j in Jalustat) j.Veistos = null;
            if (MiniJson.ObjektiTaiNull(MiniJson.Kentta(MiniJson.Objekti(MiniJson.Jasenna(json)), "sijoitus")) is { } d)
                foreach (var kv in d)
                    if (HaeJalusta(kv.Key) is { } j && kv.Value is string v && v.Length > 0) { j.Veistos = v; n++; }
            return n;
        }
        public readonly List<Teos> Teokset = new List<Teos>();
        public readonly List<Ripustus> Ripustukset = new List<Ripustus>();
        public readonly List<Huone> Huoneet = new List<Huone>();

        public Osa HaeOsa(string id) => Osat.Find(o => o.Id == id);
        public Teospaikka HaePaikka(string id) => Teospaikat.Find(p => p.Id == id);
        public Ripustus HaeRipustus(string paikkaId) => Ripustukset.Find(r => r.Paikka.Id == paikkaId);
        /// <summary>Osa, jonka lattialla piste on (ensimmäinen osuma; aukkojen kohdalla kumpi tahansa).</summary>
        public Osa OsaPisteessa(V3 p) => Osat.Find(o => o.Sisalla(p));
        public Huone HuoneOsalle(string osaId) => osaId == null ? null : Huoneet.Find(h => h.Osat.Contains(osaId));

        /// <summary>Huone, jossa piste on. Pysyy edellisessä niin kauan kuin piste on sen jossakin osassa (oviaukoissa osat menevät
        /// päällekkäin, eikä nimi saa välkkyä), ja osien ulkopuolella (aukon raossa) edellinen jää voimaan.</summary>
        public Huone HuonePisteessa(V3 p, Huone edellinen)
        {
            if (edellinen != null && edellinen.Osat.Exists(id => HaeOsa(id)?.Sisalla(p) == true)) return edellinen;
            return HuoneOsalle(OsaPisteessa(p)?.Id) ?? edellinen;
        }

        /// <summary>huoneet.json (Sisältökirjuri: huoneet[] = id, nimi_fi, nimi_en, osat, teksti_fi) salin huoneiksi; tuntemattomat osat ohitetaan.</summary>
        public void LueHuoneet(string json)
        {
            Huoneet.Clear();
            var j = MiniJson.Objekti(MiniJson.Jasenna(json));
            foreach (var o in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(j, "huoneet")))
            {
                var d = MiniJson.Objekti(o);
                var h = new Huone { Id = MiniJson.Teksti(d, "id"), Nimi = MiniJson.Teksti(d, "nimi_fi"), NimiEn = MiniJson.Teksti(d, "nimi_en"), Teksti = MiniJson.Teksti(d, "teksti_fi") };
                foreach (var x in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(d, "osat"))) if (x is string id && HaeOsa(id) != null) h.Osat.Add(id);
                if (h.Id != null && h.Osat.Count > 0) Huoneet.Add(h);
            }
        }

        /// <summary>sali.json + teokset.json → sali ripustuksineen (vain teokset, jotka teokset.json tuntee).</summary>
        public static Sali Lue(string saliJson, string teoksetJson)
        {
            var s = new Sali();
            var j = MiniJson.Objekti(MiniJson.Jasenna(saliJson));
            s.Maa = MiniJson.Teksti(j, "maa"); s.Nimi = MiniJson.Teksti(j, "nimi");
            var tyyli = MiniJson.ObjektiTaiNull(MiniJson.Kentta(j, "tyyli"));
            if (tyyli != null)
            {
                s.Oletuskehys = MiniJson.Teksti(tyyli, "oletuskehys");
                if (MiniJson.ObjektiTaiNull(MiniJson.Kentta(tyyli, "seinavarit_srgb")) is { } sv)
                    foreach (var kv in sv) s.Varit[kv.Key] = Rgb(kv.Value);
                if (MiniJson.ObjektiTaiNull(MiniJson.Kentta(tyyli, "kehysmateriaalit")) is { } km)
                    foreach (var kv in km)
                    {
                        var m = MiniJson.Objekti(kv.Value); var c = Rgb(MiniJson.Kentta(m, "srgb"));
                        s.KehysMateriaalit[kv.Key] = (c.R, c.G, c.B, MiniJson.Luku(m, "karheus") ?? 0.5, MiniJson.Luku(m, "metalli") ?? 0);
                    }
            }
            foreach (var o in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(j, "osat")))
            {
                var d = MiniJson.Objekti(o);
                var l = MiniJson.Objekti(MiniJson.Kentta(d, "laatikko"));
                var (x0, x1) = Vali(MiniJson.Kentta(l, "x")); var (y0, y1) = Vali(MiniJson.Kentta(l, "y")); var (z0, z1) = Vali(MiniJson.Kentta(l, "z"));
                var seina = MiniJson.ObjektiTaiNull(MiniJson.Kentta(d, "seina")) ?? new Dictionary<string, object>();
                var katto = MiniJson.ObjektiTaiNull(MiniJson.Kentta(d, "katto")) ?? new Dictionary<string, object>();
                var valo = MiniJson.ObjektiTaiNull(MiniJson.Kentta(d, "valo")) ?? new Dictionary<string, object>();
                var ikkuna = MiniJson.Kentta(katto, "kattoikkuna") as List<object>;
                s.Osat.Add(new Osa
                {
                    Id = MiniJson.Teksti(d, "id"), Nimi = MiniJson.Teksti(d, "nimi"), Tyyppi = MiniJson.Teksti(d, "tyyppi"),
                    X0 = x0, X1 = x1, Y0 = y0, Y1 = y1, Z0 = z0, Z1 = z1,
                    SeinaMateriaali = MiniJson.Teksti(seina, "materiaali"), PaneeliMateriaali = MiniJson.Teksti(seina, "paneelimateriaali"),
                    Sokkeli = MiniJson.Luku(seina, "sokkeli") ?? 0, Paneeli = MiniJson.Luku(seina, "paneeli") ?? 0, Lista = MiniJson.Luku(seina, "lista") ?? 0,
                    Lattia = MiniJson.Teksti(d, "lattia"), KattoTyyppi = MiniJson.Teksti(katto, "tyyppi"),
                    Kattoikkuna = ikkuna != null && ikkuna.Count >= 2 ? new[] { Convert.ToDouble(ikkuna[0], CultureInfo.InvariantCulture), Convert.ToDouble(ikkuna[1], CultureInfo.InvariantCulture) } : null,
                    Lx = MiniJson.Luku(valo, "lx") ?? 150, Ev100 = MiniJson.Luku(valo, "ev100") ?? 7, Kelvin = MiniJson.Luku(valo, "kelvin") ?? 3300,
                    Paivanvalo = MiniJson.Luku(valo, "paivanvalo") ?? 0,
                });
            }
            foreach (var o in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(j, "aukot")))
            {
                var d = MiniJson.Objekti(o);
                var osat = new List<string>();
                foreach (var x in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(d, "osat"))) osat.Add(x as string);
                s.Aukot.Add(new Aukko
                {
                    Id = MiniJson.Teksti(d, "id"), Seina = MiniJson.Teksti(d, "seina"), Osat = osat.ToArray(),
                    Keskipiste = MiniJson.Luku(d, "keskipiste") ?? 0, Leveys = MiniJson.Luku(d, "leveys") ?? 1.6, Korkeus = MiniJson.Luku(d, "korkeus") ?? 3,
                    Syvyys = MiniJson.Luku(d, "syvyys") ?? 0.4, Kaari = MiniJson.Totuus(d, "kaari"),
                });
            }
            foreach (var o in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(j, "teospaikat")))
            {
                var d = MiniJson.Objekti(o);
                var vk = MiniJson.ObjektiTaiNull(MiniJson.Kentta(d, "valokeila"));
                s.Teospaikat.Add(new Teospaikka
                {
                    Id = MiniJson.Teksti(d, "id"), Osa = MiniJson.Teksti(d, "osa"), Seina = MiniJson.Teksti(d, "seina"), Sopii = MiniJson.Teksti(d, "sopii") ?? "maalaus",
                    Kehysprofiili = MiniJson.Teksti(d, "kehysprofiili"), Ehdotus = MiniJson.Teksti(d, "teos_ehdotus"),
                    Keskipiste = Vektori(MiniJson.Kentta(d, "keskipiste")), Normaali = Vektori(MiniJson.Kentta(d, "normaali")),
                    MaxLeveys = MiniJson.Luku(d, "max_leveys") ?? 1, MaxKorkeus = MiniJson.Luku(d, "max_korkeus") ?? 1,
                    Valo = vk == null ? null : new Valokeila
                    {
                        Paikka = Vektori(MiniJson.Kentta(vk, "paikka")), Suunta = Vektori(MiniJson.Kentta(vk, "suunta")),
                        PuolikulmaAste = MiniJson.Luku(vk, "puolikulma_aste") ?? 20, Reunahaive = MiniJson.Luku(vk, "reunahaive") ?? 0.35,
                        Lx = MiniJson.Luku(vk, "lx") ?? 150, Kelvin = MiniJson.Luku(vk, "kelvin") ?? 3300,
                    },
                });
            }
            if (MiniJson.ObjektiTaiNull(MiniJson.Kentta(j, "kehysprofiilit")) is { } kp)
                foreach (var kv in kp)
                {
                    var d = MiniJson.Objekti(kv.Value);
                    var k = new Kehysprofiili { Id = kv.Key, Materiaali = MiniJson.Teksti(d, "materiaali") ?? "musta" };
                    foreach (var p in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(d, "pisteet_cm")))
                    {
                        var a = MiniJson.TaulukkoTaiTyhja(p);
                        if (a.Count >= 2) k.Pisteet.Add((Convert.ToDouble(a[0], CultureInfo.InvariantCulture), Convert.ToDouble(a[1], CultureInfo.InvariantCulture)));
                    }
                    s.Kehykset[kv.Key] = k;
                }
            foreach (var o in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(j, "veistospaikat")))
            {
                var d = MiniJson.Objekti(o);
                if (!(MiniJson.Teksti(d, "id") is string vid)) continue;
                s.Veistospaikat.Add(vid);
                var ja = MiniJson.ObjektiTaiNull(MiniJson.Kentta(d, "jalusta"));
                var jal = new Jalusta
                {
                    Id = vid, Osa = MiniJson.Teksti(d, "osa"), Ehdotus = MiniJson.Teksti(d, "teos_ehdotus"),
                    AlaKeski = ja != null ? Vektori(MiniJson.Kentta(ja, "keskipiste_ala")) : default, Koko = ja != null ? Vektori(MiniJson.Kentta(ja, "koko")) : default,
                    Paikka = Vektori(MiniJson.Kentta(d, "paikka")), MaxKoko = Vektori(MiniJson.Kentta(d, "max_koko")), Katse = Vektori(MiniJson.Kentta(d, "katse")),
                };
                foreach (var vo in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(d, "valot")))
                {
                    var vk = MiniJson.Objekti(vo);
                    jal.Valot.Add(new Valokeila
                    {
                        Paikka = Vektori(MiniJson.Kentta(vk, "paikka")), Suunta = Vektori(MiniJson.Kentta(vk, "suunta")),
                        PuolikulmaAste = MiniJson.Luku(vk, "puolikulma_aste") ?? 22, Reunahaive = MiniJson.Luku(vk, "reunahaive") ?? 0.35,
                        Lx = MiniJson.Luku(vk, "lx") ?? 200, Kelvin = MiniJson.Luku(vk, "kelvin") ?? 3200,
                    });
                }
                s.Jalustat.Add(jal);
            }
            foreach (var o in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(j, "tekstitaulut")))
            {
                var d = MiniJson.Objekti(o);
                var koko = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(d, "koko_m"));
                s.Tekstitaulut.Add(new Tekstitaulu
                {
                    Id = MiniJson.Teksti(d, "id"), Teospaikka = MiniJson.Teksti(d, "teospaikka"),
                    Keskipiste = Vektori(MiniJson.Kentta(d, "keskipiste")), Normaali = Vektori(MiniJson.Kentta(d, "normaali")),
                    Leveys = koko.Count > 0 ? Convert.ToDouble(koko[0], CultureInfo.InvariantCulture) : 0.16,
                    Korkeus = koko.Count > 1 ? Convert.ToDouble(koko[1], CultureInfo.InvariantCulture) : 0.16,
                });
            }
            foreach (var o in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(j, "reitti")))
            {
                var d = MiniJson.Objekti(o);
                s.Reitti.Add(new Reittipiste
                {
                    P = Vektori(MiniJson.Kentta(d, "p")), Katse = Vektori(MiniJson.Kentta(d, "katse")),
                    PysahdysS = MiniJson.Luku(d, "pysahdys_s") ?? 0, Kohde = MiniJson.Teksti(d, "kohde"),
                });
            }

            var t = MiniJson.Objekti(MiniJson.Jasenna(teoksetJson));
            foreach (var o in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(t, "teokset")))
                s.Teokset.Add(LueTeos(MiniJson.Objekti(o)));
            s.Ripusta();
            return s;
        }

        /// <summary>Teos teokset.json:sta. Yhteinen skeema Sisältökirjurin paketin kanssa (PT 10.1x): kentät kelpaavat kummassakin
        /// muodossa (otsikko|nimi_fi, alkuperainen|nimi_en, taiteilija|tekija, korkeus_cm+leveys_cm|mitat_cm_kork_lev, lahde|museo,
        /// teoksen_oikeustila|lisenssi, kuvateksti|kuvateksti_fi, kuva "polku"|kuva.seina.tiedosto|kuva.seina_lahde). teokset.v2.json
        /// (Sisältökirjuri 10.10.): kuva = {paketti, px, lahde, seina_lahde}; id = museon inventaarionumero (sali.json:n teos_ehdotus,
        /// esim. SK-C-5), vanhassa paketissa inventaario.</summary>
        public static Teos LueTeos(Dictionary<string, object> d)
        {
            string T(params string[] n) { foreach (var x in n) if (MiniJson.Teksti(d, x) is string v && v.Length > 0) return v; return null; }
            var mitat = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(d, "mitat_cm_kork_lev"));
            double M(int i) => Convert.ToDouble(mitat[i], CultureInfo.InvariantCulture);
            var kuva = MiniJson.ObjektiTaiNull(MiniJson.Kentta(d, "kuva"));
            var seina = kuva != null ? MiniJson.ObjektiTaiNull(MiniJson.Kentta(kuva, "seina")) : null;
            var px = MiniJson.TaulukkoTaiTyhja(seina != null ? MiniJson.Kentta(seina, "px") : kuva != null ? MiniJson.Kentta(kuva, "px") : MiniJson.Kentta(d, "kuva_px"));
            var paketti = kuva != null ? MiniJson.Kentta(kuva, "paketti") : null;   // "astc-v1/<id>/" tai {polku}
            string id = T("inventaario", "id"), tekniikka = T("tekniikka");
            return new Teos
            {
                Id = id, Otsikko = T("otsikko", "nimi_fi"), Alkuperainen = T("alkuperainen", "nimi_en"), Taiteilija = T("taiteilija", "tekija"),
                Vuosi = T("vuosi"), Tekniikka = tekniikka, Lahde = T("lahde", "museo"), Lisenssi = T("teoksen_oikeustila", "lisenssi"), Iiif = T("iiif"),
                Kuva = seina != null ? MiniJson.Teksti(seina, "tiedosto") : kuva != null ? MiniJson.Teksti(kuva, "seina_lahde") : T("kuva"),
                Paketti = paketti as string ?? (paketti is Dictionary<string, object> po ? MiniJson.Teksti(po, "polku") : null),
                KorkeusCm = MiniJson.Luku(d, "korkeus_cm") ?? (mitat.Count == 2 ? M(0) : 50), LeveysCm = MiniJson.Luku(d, "leveys_cm") ?? (mitat.Count == 2 ? M(1) : 40),
                Kuvasuhde = MiniJson.Luku(d, "kuvasuhde") ?? MiniJson.Luku(d, "kuvasuhde_leveys_per_korkeus") ?? 0,
                Grafiikka = MiniJson.Kentta(d, "grafiikka") is bool g ? g : id != null && id.StartsWith("RP-P-", StringComparison.Ordinal),
                Kuvateksti = T("kuvateksti", "kuvateksti_fi"), Havainnekuva = MiniJson.Totuus(d, "havainnekuva"),
                KuvaLeveys = px.Count == 2 ? Convert.ToInt32(px[0], CultureInfo.InvariantCulture) : 0,
                KuvaKorkeus = px.Count == 2 ? Convert.ToInt32(px[1], CultureInfo.InvariantCulture) : 0,
            };
        }

        /// <summary>Teospaikan ehdotus → teos todellisessa koossa; liian iso pienennetään paikan rajoihin (kuvasuhde säilyy).</summary>
        void Ripusta()
        {
            Ripustukset.Clear();
            foreach (var p in Teospaikat)
            {
                var teos = p.Ehdotus == null ? null : Teokset.Find(x => x.Id == p.Ehdotus);
                if (teos == null) continue;
                double w = teos.LeveysCm / 100, h = teos.KorkeusCm / 100;
                double k = Math.Min(1, Math.Min(p.MaxLeveys / w, p.MaxKorkeus / h));
                Ripustukset.Add(new Ripustus { Paikka = p, Teos = teos, Leveys = w * k, Korkeus = h * k, Pienennetty = k < 1 });
            }
        }

        static (double R, double G, double B) Rgb(object o)
        {
            var a = MiniJson.TaulukkoTaiTyhja(o);
            double C(int i) => a.Count > i ? Convert.ToDouble(a[i], CultureInfo.InvariantCulture) / 255.0 : 0.5;
            return (C(0), C(1), C(2));
        }

        static (double, double) Vali(object o)
        {
            var a = MiniJson.TaulukkoTaiTyhja(o);
            double v0 = Convert.ToDouble(a[0], CultureInfo.InvariantCulture), v1 = Convert.ToDouble(a[1], CultureInfo.InvariantCulture);
            return v0 <= v1 ? (v0, v1) : (v1, v0);
        }

        static V3 Vektori(object o)
        {
            var a = MiniJson.TaulukkoTaiTyhja(o);
            double C(int i) => a.Count > i ? Convert.ToDouble(a[i], CultureInfo.InvariantCulture) : 0;
            return new V3(C(0), C(1), C(2));
        }
    }
}
