// HISTORIAMOOTTORI: KÄVELYGEOMETRIAN DATA (Siirtoseppä 7.10.2026; Linnanrakentajan kavely v1, rakennus.json kavely { osat, merkit }).
// osat.json: { versio, koordinaatit ("glTF x itä, y ylös, z etelä"), osat { <id>: { tiedostot { nakyva, tormays, kavely },
// rajat { min, max }, naapurit[], portaalit[] { nimi, paikka, leveys, korkeus }, kamera_rajat { katto_y }, leikkaukset[]
// { nimi, keskipiste, koko, kierto_y (rad) }, varmuus } }, esineet { <id>: glb } }. merkit.json: [ { nimi "laji:id", paikka,
// osa?, leveys?, korkeus?, koko?, tyyppi?, odota_s?, glb? } ]. Polut suhteessa osat.jsonin kansioon. Puhdas C# (MiniJson), testit
// Linssit-testit/Testit/KavelyDataTestit.cs. Koordinaatit glTF-muodossa (z etelä = Unityn −z peilattuna DioraamaGlb.Lue(unityyn)).
using System;
using System.Collections.Generic;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Seikkailu
{
    public sealed class KavelyOsa
    {
        public string Id, Nakyva, Tormays, Kavely, Varmuus;
        public double[] RajatMin = new double[3], RajatMax = new double[3];
        public List<string> Naapurit = new List<string>();
        public List<KavelyMerkki> Portaalit = new List<KavelyMerkki>();
        public List<KavelyLeikkaus> Leikkaukset = new List<KavelyLeikkaus>();
        public double? KattoY;
        /// <summary>Märkyys 0–1 (LR v45f: sateen jälkeinen yö; vesiportti 0,85, ulkoalue 0,75, sisätilat 0).</summary>
        public double Markyys;
        /// <summary>Leivottu valoatlas (LR 8.10., juna 169; `valoatlas` kuten tiloissa, polut paketin juuresta); null = ei atlasta.</summary>
        public Dictionary<string, object> ValoAtlas;
        /// <summary>Osan oletuspinta askelille (pelattavuusmalli 2.2: kivi, porras, puu, olki, sora, vesi); null = kivi.</summary>
        public string Pinta;
    }

    /// <summary>Särmiö, jonka sisältä kuori ei piirry kävelytilassa (keskipiste, koko, kierto y-akselin ympäri radiaaneina).</summary>
    public readonly struct KavelyLeikkaus
    {
        public readonly string Nimi; public readonly double X, Y, Z, KokoX, KokoY, KokoZ, KiertoY;
        public KavelyLeikkaus(string nimi, double x, double y, double z, double kx, double ky, double kz, double kierto)
        { Nimi = nimi; X = x; Y = y; Z = z; KokoX = kx; KokoY = ky; KokoZ = kz; KiertoY = kierto; }
        /// <summary>Onko piste (glTF-koordinaatit) särmiön sisällä.</summary>
        public bool Sisalla(double px, double py, double pz)
        {
            double dx = px - X, dz = pz - Z, c = Math.Cos(-KiertoY), s = Math.Sin(-KiertoY);
            double lx = c * dx - s * dz, lz = s * dx + c * dz;
            return Math.Abs(lx) <= KokoX / 2 && Math.Abs(py - Y) <= KokoY / 2 && Math.Abs(lz) <= KokoZ / 2;
        }
    }

    public sealed class KavelyMerkki
    {
        public string Nimi, Laji, Tunnus, Osa, Tyyppi, Glb;
        /// <summary>partio: henkilo ja profiili (pelattavuusmalli 3.1: vartija, portinvartija, kokki, apulainen, renki).</summary>
        public string Henkilo, Profiili;
        /// <summary>lakaisu (LR v45y): tehosteen tunnus (esim. "luuta"), soi kun henkilö seisoo merkillä; null jos puuttuu.</summary>
        public string Aani;
        /// <summary>partio: kantaa lyhtyä tai soihtua (v44m; pelattavuusmalli 8.1: portinvartijan lyhty, portaiden vastaantulijan soihtu).</summary>
        public bool Lyhty, Soihtu;
        /// <summary>leikkaus:vain-1499(-b) (v44r/v44x): aina leikattavien kuorileikkausten nimet (vuoden 1499 näkymä kävelyssä); null jos puuttuu.</summary>
        public List<string> Leikkaukset;
        /// <summary>koko [x, y, z] (piilo, pinta), null jos kenttä on luku tai puuttuu.</summary>
        public double[] KokoV;
        public double X, Y, Z, Leveys, Korkeus, Koko, OdotaS;
        /// <summary>kierto_y radiaaneina (glTF y-akselin ympäri; esim. vene:laituri = keulan suunta); null jos puuttuu.</summary>
        public double? KiertoY;
        /// <summary>esine: heitettava (Linnanrakentaja v44e): poimittava ja heitettävä harhautukseen.</summary>
        public bool Heitettava;
        /// <summary>esine: irrotettava (Linnanrakentaja v44h: syvennyksen muuratut kivet).</summary>
        public bool Irrotettava;
        /// <summary>esine: kiintea (Linnanrakentaja v44k: kilpilaatat seinässä): näkyy, ei poimittavissa.</summary>
        public bool Kiintea;
        /// <summary>esine: kannettava (tarjotin, molemmat kädet) ja kaadettava (patapino) sekä äänen kuuluvuus aani_m (v44m).</summary>
        public bool Kannettava, Kaadettava;
        public double AaniM;
        /// <summary>luukku: sarana (Linnanrakentaja v44i), glTF-koordinaatit; null jos puuttuu.</summary>
        public double[] Sarana;
        /// <summary>kiipeily: yläpää (v44q kiipeily:tikkaat-*), glTF; null jos puuttuu.</summary>
        public double[] Yla;
        /// <summary>M-osa (v44q–s): esine puettava (esiliina, myssy); ovi lukko + avain + aani_nopea_m; ote ulkonormaali (glTF);
        /// raapaisut (tiili); kesto_s (tuuli:puuska); kaanto_aste ja sallittu_aste (kilpi:arkku-N).</summary>
        public bool Puettava, Lukko;
        public string Avain;
        public double AaniNopeaM, Raapaisut, KestoS, KaantoAste, SallittuAste;
        /// <summary>pinta: märkyys 0–1 (LR v45f: laiturin kansi puu-1 0,9).</summary>
        public double Markyys;
        /// <summary>seisoo: kääntyy kerran näin moneksi sekunniksi taaksepäin (v44q seisoo:harja-talonpoika kaantyy_s 4).</summary>
        public double KaantyyS;
        public double[] Ulkonormaali;
        /// <summary>kamera:K4/K5 (v44r): katseen kohde, glTF; null jos puuttuu.</summary>
        public double[] Katse;
    }

    public sealed class KavelyData
    {
        /// <summary>Rekvisiitta peittää poimittavan esineen (alle 0,25 m vaakatasossa ja 0,5 m pystyssä; LR v45p: kulho tarjottimen päällä):
        /// silloin sitä ei piirretä, jottei koriste estä esineen napautusta.</summary>
        public const double RekvisiittaVaraM = 0.25;

        /// <summary>Huonekohtainen lataus (PT 9.10.): osa ja sen naapurit kumpaan suuntaan tahansa (KavelyOsa.Naapurit voi olla yksisuuntainen).</summary>
        public void AktiivisetOsat(string osa, System.Collections.Generic.ISet<string> ulos)
        {
            ulos.Clear();
            if (osa == null) return;
            ulos.Add(osa);
            if (Osat.TryGetValue(osa, out var o)) foreach (var n in o.Naapurit) ulos.Add(n);
            foreach (var kv in Osat) if (kv.Value.Naapurit.Contains(osa)) ulos.Add(kv.Key);
        }
        public bool RekvisiittaPeittaa(KavelyMerkki r)
        {
            foreach (var e in Lajia("esine"))
                if ((r.X - e.X) * (r.X - e.X) + (r.Z - e.Z) * (r.Z - e.Z) < RekvisiittaVaraM * RekvisiittaVaraM && System.Math.Abs(r.Y - e.Y) < 0.5) return true;
            return false;
        }

        public int Versio;
        public Dictionary<string, KavelyOsa> Osat = new Dictionary<string, KavelyOsa>(StringComparer.Ordinal);
        public Dictionary<string, string> Esineet = new Dictionary<string, string>(StringComparer.Ordinal);
        public List<KavelyMerkki> Merkit = new List<KavelyMerkki>();

        public IEnumerable<KavelyMerkki> Lajia(string laji) { foreach (var m in Merkit) if (m.Laji == laji) yield return m; }

        public static KavelyData Lue(string osatJson, string merkitJson)
        {
            var d = new KavelyData();
            if (Jasenna(osatJson) is Dictionary<string, object> o)
            {
                d.Versio = (int)(MiniJson.Luku(o, "versio") ?? 0);
                foreach (var pari in MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "osat")) ?? new Dictionary<string, object>())
                {
                    if (!(pari.Value is Dictionary<string, object> v)) continue;
                    var t = MiniJson.ObjektiTaiNull(MiniJson.Kentta(v, "tiedostot"));
                    var osa = new KavelyOsa
                    {
                        Id = pari.Key, Nakyva = MiniJson.Teksti(t, "nakyva"), Tormays = MiniJson.Teksti(t, "tormays"),
                        Kavely = MiniJson.Teksti(t, "kavely"), Varmuus = MiniJson.Teksti(v, "varmuus"),
                        KattoY = MiniJson.Luku(MiniJson.ObjektiTaiNull(MiniJson.Kentta(v, "kamera_rajat")), "katto_y"), Pinta = MiniJson.Teksti(v, "pinta"),
                        Markyys = MiniJson.Luku(v, "markyys") ?? 0,
                        ValoAtlas = MiniJson.ObjektiTaiNull(MiniJson.Kentta(v, "valoatlas")),
                    };
                    var r = MiniJson.ObjektiTaiNull(MiniJson.Kentta(v, "rajat"));
                    osa.RajatMin = Vektori(MiniJson.Kentta(r, "min")); osa.RajatMax = Vektori(MiniJson.Kentta(r, "max"));
                    foreach (var n in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(v, "naapurit"))) if (n is string ns) osa.Naapurit.Add(ns);
                    foreach (var p in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(v, "portaalit")))
                        if (LueMerkki(MiniJson.ObjektiTaiNull(p)) is KavelyMerkki pm) { pm.Osa ??= osa.Id; osa.Portaalit.Add(pm); }
                    foreach (var l in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(v, "leikkaukset")))
                    {
                        var lo = MiniJson.ObjektiTaiNull(l); if (lo == null) continue;
                        var k = Vektori(MiniJson.Kentta(lo, "keskipiste")); var s = Vektori(MiniJson.Kentta(lo, "koko"));
                        osa.Leikkaukset.Add(new KavelyLeikkaus(MiniJson.Teksti(lo, "nimi"), k[0], k[1], k[2], s[0], s[1], s[2], MiniJson.Luku(lo, "kierto_y") ?? 0));
                    }
                    d.Osat[osa.Id] = osa;
                }
                foreach (var pari in MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "esineet")) ?? new Dictionary<string, object>())
                    if (pari.Value is string g) d.Esineet[pari.Key] = g;
            }
            foreach (var m in MiniJson.TaulukkoTaiTyhja(Jasenna(merkitJson)))
                if (LueMerkki(MiniJson.ObjektiTaiNull(m)) is KavelyMerkki km) d.Merkit.Add(km);
            return d;
        }

        static object Jasenna(string json) { if (string.IsNullOrWhiteSpace(json)) return null; try { return MiniJson.Jasenna(json); } catch (Exception) { return null; } }

        static KavelyMerkki LueMerkki(Dictionary<string, object> o)
        {
            string nimi = MiniJson.Teksti(o, "nimi");
            if (o == null || string.IsNullOrEmpty(nimi)) return null;
            int kp = nimi.IndexOf(':');
            var p = Vektori(MiniJson.Kentta(o, "paikka"));
            return new KavelyMerkki
            {
                Nimi = nimi, Laji = kp > 0 ? nimi.Substring(0, kp) : "", Tunnus = kp > 0 ? nimi.Substring(kp + 1) : nimi,
                Osa = MiniJson.Teksti(o, "osa"), Tyyppi = MiniJson.Teksti(o, "tyyppi"), Glb = MiniJson.Teksti(o, "glb"),
                X = p[0], Y = p[1], Z = p[2], Leveys = MiniJson.Luku(o, "leveys") ?? 0, Korkeus = MiniJson.Luku(o, "korkeus") ?? 0,
                Koko = MiniJson.Luku(o, "koko") ?? 0, OdotaS = MiniJson.Luku(o, "odota_s") ?? MiniJson.Luku(o, "odotus_s") ?? 0, KiertoY = MiniJson.Luku(o, "kierto_y"), Heitettava = MiniJson.Kentta(o, "heitettava") is bool hb && hb, Irrotettava = MiniJson.Kentta(o, "irrotettava") is bool ib && ib,
                Sarana = MiniJson.Kentta(o, "sarana") is object sa ? Vektori(sa) : null,
                Yla = MiniJson.Kentta(o, "yla") is object ya ? Vektori(ya) : null,
                Kiintea = MiniJson.Kentta(o, "kiintea") is bool kb && kb,
                Kannettava = MiniJson.Kentta(o, "kannettava") is bool kab && kab, Kaadettava = MiniJson.Kentta(o, "kaadettava") is bool kdb && kdb, AaniM = MiniJson.Luku(o, "aani_m") ?? 0,
                Henkilo = MiniJson.Teksti(o, "henkilo"), Profiili = MiniJson.Teksti(o, "profiili"), Aani = MiniJson.Teksti(o, "aani"),
                Puettava = MiniJson.Kentta(o, "puettava") is bool pub && pub, Lukko = MiniJson.Kentta(o, "lukko") is bool lub && lub, Avain = MiniJson.Teksti(o, "avain"),
                AaniNopeaM = MiniJson.Luku(o, "aani_nopea_m") ?? 0, Raapaisut = MiniJson.Luku(o, "raapaisut") ?? 0, KestoS = MiniJson.Luku(o, "kesto_s") ?? 0,
                KaantoAste = MiniJson.Luku(o, "kaanto_aste") ?? 0, KaantyyS = MiniJson.Luku(o, "kaantyy_s") ?? 0, SallittuAste = MiniJson.Luku(o, "sallittu_aste") ?? 0,
                Ulkonormaali = MiniJson.Kentta(o, "ulkonormaali") is object un ? Vektori(un) : null, Markyys = MiniJson.Luku(o, "markyys") ?? 0,
                Katse = MiniJson.Kentta(o, "katse") is object ka ? Vektori(ka) : null,
                Leikkaukset = MiniJson.Kentta(o, "leikkaukset") is List<object> lk ? lk.ConvertAll(x => x as string) : null,
                Lyhty = MiniJson.Kentta(o, "lyhty") is bool lyb && lyb, Soihtu = MiniJson.Kentta(o, "soihtu") is bool sob && sob,
                KokoV = MiniJson.Kentta(o, "koko") is List<object> kl && kl.Count == 3 ? Vektori(kl) : null,
            };
        }

        static double[] Vektori(object arvo)
        {
            var l = MiniJson.TaulukkoTaiTyhja(arvo); var v = new double[3];
            for (int i = 0; i < 3 && i < l.Count; i++) v[i] = l[i] is double d ? d : 0;
            return v;
        }
    }
}
