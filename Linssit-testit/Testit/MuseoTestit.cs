// TAIDEMUSEO (Linssiseppä 10.10.2026, PT 09.5x): sali.json (Linnanrakentaja) + teokset.json (Rijksmuseum PDM) → ripustus
// todellisessa koossa, väliaikaishallin geometria aukkoineen, kehyspursotus, kierroksen vaiheet ja vapaa kulku, valaistus.
using System;
using System.IO;
using Matkakirja.Linssit.Dioraama;
using Matkakirja.Linssit.Museo;

namespace Matkakirja.Linssit.Testit
{
    public static class MuseoTestit
    {
        static string Polku(params string[] o) => Path.Combine(AppContext.BaseDirectory, "..", "..", Path.Combine(o));
        static Sali Alankomaat() => Sali.Lue(
            File.ReadAllText(Polku("Assets", "Matkakirja", "Linssit", "Resources", "Museo", "alankomaat", "sali.json")),
            File.ReadAllText(Polku("Assets", "Matkakirja", "Linssit", "Resources", "Museo", "alankomaat", "teokset.json")));

        [Testi] static void SaliJaRipustus()
        {
            var s = Alankomaat();
            Oleta.Tosi(s.Osat.Count >= 13 && s.Teospaikat.Count >= 50 && s.Reitti.Count >= 10, $"osat {s.Osat.Count}, paikat {s.Teospaikat.Count}, reitti {s.Reitti.Count}");
            Oleta.Tosi(s.Teokset.Count >= 10 && s.Teokset.Count <= 20, $"ensimmäinen pala 10–20 teosta: {s.Teokset.Count}");
            Oleta.Tosi(s.Ripustukset.Count == s.Teokset.Count, $"jokainen teos seinällä: {s.Ripustukset.Count}/{s.Teokset.Count}");
            var yv = s.Ripustukset.Find(r => r.Teos.Id == "SK-C-5");
            Oleta.Tosi(yv != null && Math.Abs(yv.Leveys - 4.535) < 1e-6 && Math.Abs(yv.Korkeus - 3.795) < 1e-6 && !yv.Pienennetty, "Yövartio todellisessa koossa 453,5 × 379,5 cm");
            foreach (var r in s.Ripustukset)
            {
                Oleta.Tosi(r.Leveys <= r.Paikka.MaxLeveys + 1e-9 && r.Korkeus <= r.Paikka.MaxKorkeus + 1e-9, $"{r.Teos.Id} mahtuu paikkaan {r.Paikka.Id}");
                Oleta.Tosi(r.Teos.Grafiikka == r.Paikka.Grafiikka, $"{r.Teos.Id}: grafiikka grafiikkapaikalla ({r.Paikka.Sopii})");
                Oleta.Tosi(s.Kehykset.ContainsKey(r.Paikka.Kehysprofiili), $"{r.Paikka.Id}: kehysprofiili {r.Paikka.Kehysprofiili}");
                Oleta.Tosi(r.Paikka.Valo != null && r.Paikka.Valo.Lx >= 50 && r.Paikka.Valo.Kelvin >= 3000 && r.Paikka.Valo.Kelvin <= 3500, $"{r.Paikka.Id}: valokeila 3000–3500 K");
                Oleta.Tosi(!string.IsNullOrEmpty(r.Teos.Otsikko) && !string.IsNullOrEmpty(r.Teos.Taiteilija) && r.Teos.Lisenssi.StartsWith("Public Domain"), $"{r.Teos.Id}: kortin tiedot ja PD");
            }
            Oleta.Tosi(s.Teokset.Find(t => t.Id == "SK-A-2344").Mitat == "45,5 × 41 cm", "kortin mitat suomeksi");
            foreach (var rp in s.Reitti) if (rp.Kohde != null) Oleta.Tosi(s.HaePaikka(rp.Kohde) != null, $"reitin kohde {rp.Kohde} on teospaikka");
        }

        [Testi] static void HalliJaAukot()
        {
            var s = Alankomaat();
            var v = MuseoGeometria.Halli(s);
            Oleta.Tosi(v.P.Count == v.N.Count && v.P.Count == v.C.Count && v.T.Count % 3 == 0 && v.T.Count > 0, "verkko eheä");
            // Aukko on reikä: m1:n ja m2:n välisessä seinässä ei ole pintaa oviaukon keskellä 1,5 m korkeudella.
            var m1 = s.HaeOsa("m1");
            bool osuu = false;
            for (int i = 0; i < v.T.Count; i += 3)
            {
                V3 a = v.P[v.T[i]], b = v.P[v.T[i + 1]], c = v.P[v.T[i + 2]];
                if (Math.Abs(a.Z - m1.Z0) < 1e-6 && Math.Abs(b.Z - m1.Z0) < 1e-6 && Math.Abs(c.Z - m1.Z0) < 1e-6
                    && Math.Min(a.X, Math.Min(b.X, c.X)) <= 0 && Math.Max(a.X, Math.Max(b.X, c.X)) >= 0
                    && Math.Min(a.Y, Math.Min(b.Y, c.Y)) <= 1.5 && Math.Max(a.Y, Math.Max(b.Y, c.Y)) >= 1.5) osuu = true;
            }
            Oleta.Tosi(!osuu, "ovi m1 → m2 on auki");
            var r = MuseoGeometria.Suorakaiteet(-4, 4, 0, 5.6, new System.Collections.Generic.List<(double, double, double)> { (-0.8, 0.8, 3.0) });
            double ala = 0; foreach (var q in r) ala += (q.U1 - q.U0) * (q.Y1 - q.Y0);
            Oleta.Tosi(Math.Abs(ala - (8 * 5.6 - 1.6 * 3.0)) < 1e-9 && r.Count == 3, $"seinä miinus ovi: {ala:F2} m², {r.Count} osaa");
        }

        [Testi] static void KehysPursotus()
        {
            var s = Alankomaat();
            var k = s.Kehykset["nl_aalto_musta"];
            var v = MuseoGeometria.Kehys(k, 0.41, 0.455, (0.1, 0.1, 0.1));
            Oleta.Tosi(v.P.Count == 4 * (k.Pisteet.Count - 1) * 4, $"neljä sivua × {k.Pisteet.Count - 1} väliä");
            double minX = 1, maxX = -1, maxZ = 0;
            foreach (var p in v.P) { minX = Math.Min(minX, p.X); maxX = Math.Max(maxX, p.X); maxZ = Math.Max(maxZ, p.Z); }
            Oleta.Tosi(Math.Abs(maxX - (0.205 + k.LeveysCm / 100)) < 1e-9 && Math.Abs(minX + maxX) < 1e-9, $"ulkoreuna {maxX:F3} m (teos 0,41 + 2 × {k.LeveysCm} cm)");
            Oleta.Tosi(maxZ > 0.05 && maxZ < 0.1, $"kehyksen syvyys {maxZ * 100:F1} cm");
            foreach (var n in v.N) Oleta.Tosi(Math.Abs(n.Pituus - 1) < 1e-6, "yksikkönormaalit");
            // Kehyksen sisäreuna peittää teoksen reunan (huuli −0,6 cm).
            double minSisa = 1; foreach (var p in v.P) minSisa = Math.Min(minSisa, Math.Abs(p.X));
            Oleta.Tosi(minSisa < 0.205, "sisähuuli teoksen päällä");
        }

        [Testi] static void KierrosJaPysahdykset()
        {
            var s = Alankomaat();
            var k = new MuseoKierros(s);
            Oleta.Tosi(k.Pysahdykset.Count >= 10, $"pysähdyksiä {k.Pysahdykset.Count}");
            Oleta.Tosi(k.Vaihe == MuseoVaihe.Siirtyy && k.Kohta == 0, "alkaa siirtymällä ensimmäiseen");
            int pysahdyksia = 0, versio = k.Versio; var ed = k.Nykyinen.P; double maxNopeus = 0;
            for (int i = 0; i < 20000 && k.Vaihe != MuseoVaihe.Valmis; i++)
            {
                k.Paivita(0.05);
                maxNopeus = Math.Max(maxNopeus, (k.Nykyinen.P - ed).Pituus / 0.05); ed = k.Nykyinen.P;
                if (k.Versio != versio) { versio = k.Versio; if (k.Vaihe == MuseoVaihe.Pysahtyy) { pysahdyksia++; Oleta.Tosi(k.NykyinenTeos != null, $"pysähdys {k.Kohta}: teos"); } }
                Oleta.Tosi(Math.Abs(k.Nykyinen.P.Y - 1.6) < 0.05, "silmän korkeus");
            }
            Oleta.Tosi(k.Vaihe == MuseoVaihe.Valmis && pysahdyksia == k.Pysahdykset.Count, $"kierros läpi: {pysahdyksia}/{k.Pysahdykset.Count}");
            Oleta.Tosi(maxNopeus < 3.5, $"kävelyvauhti (huippu {maxNopeus:F2} m/s)");
            // Yövartio viimeisenä.
            Oleta.Tosi(s.HaeRipustus(k.Pysahdys(k.Pysahdykset.Count - 1).Kohde).Teos.Id == "SK-C-5", "Yövartio viimeisenä");
        }

        [Testi] static void TaukoSeuraavaEdellinen()
        {
            var s = Alankomaat();
            var k = new MuseoKierros(s);
            for (int i = 0; i < 400 && k.Vaihe != MuseoVaihe.Pysahtyy; i++) k.Paivita(0.05);
            Oleta.Tosi(k.Vaihe == MuseoVaihe.Pysahtyy && k.Kohta == 0, "ensimmäisellä pysähdyksellä");
            k.Tauko(true); var p = k.Nykyinen; for (int i = 0; i < 1000; i++) k.Paivita(0.05);
            Oleta.Tosi(k.Vaihe == MuseoVaihe.Pysahtyy && (k.Nykyinen.P - p.P).Pituus < 1e-9, "tauko pitää paikallaan");
            k.Seuraava(); Oleta.Tosi(!k.Tauolla && k.Kohta == 1 && k.Vaihe == MuseoVaihe.Siirtyy, "seuraava");
            for (int i = 0; i < 600 && k.Vaihe != MuseoVaihe.Pysahtyy; i++) k.Paivita(0.05);
            k.Edellinen(); for (int i = 0; i < 600 && k.Vaihe != MuseoVaihe.Pysahtyy; i++) k.Paivita(0.05);
            Oleta.Tosi(k.Kohta == 0 && (k.Nykyinen.P - k.Pysahdys(0).P).Pituus < 1e-6, "edellinen palaa ensimmäiseen");
            k.Siirry(k.Pysahdykset.Count - 1); for (int i = 0; i < 4000 && k.Vaihe != MuseoVaihe.Pysahtyy; i++) k.Paivita(0.05);
            Oleta.Tosi(k.NykyinenTeos.Teos.Id == "SK-C-5", "siirry Yövartioon");
        }

        [Testi] static void VapaaKulku()
        {
            var s = Alankomaat();
            var k = new MuseoKierros(s);
            for (int i = 0; i < 400 && k.Vaihe != MuseoVaihe.Pysahtyy; i++) k.Paivita(0.05);
            k.Vapaa();
            Oleta.Tosi(k.Vaihe == MuseoVaihe.Vapaa, "vapaa");
            Oleta.Tosi(k.NykyinenTeos != null, "katsottu teos vapaassa tilassa (pysähdyksen katse)");
            // Kävely suoraan seinään: ei läpi.
            for (int i = 0; i < 400; i++) k.VapaaLiike(1, 0, 0, 0, 0.05);
            Oleta.Tosi(k.Sallittu(k.Nykyinen.P), $"pysyy sisällä ({k.Nykyinen.P})");
            // Käänny −Z:aan ja kävele m1 → m2 → m3 → galleriaan oviaukkojen läpi (keskilinja x = 0).
            var m = new MuseoKierros(s); m.Vapaa();
            for (int i = 0; i < 200; i++) m.VapaaLiike(0, 0, 0, 0, 0.05);
            double z0 = m.Nykyinen.P.Z;
            for (int i = 0; i < 1200; i++) { var d = m.Nykyinen.Suunta; double yaw = Math.Atan2(d.X, -d.Z); m.VapaaLiike(1, -m.Nykyinen.P.X * 0.5, -yaw * 2, 0, 0.05); }
            Oleta.Tosi(m.Nykyinen.P.Z < s.HaeOsa("m3").Z0 - 1, $"kulki ovista galleriaan (z {z0:F1} → {m.Nykyinen.P.Z:F1})");
            m.Kierrokselle();
            Oleta.Tosi(m.Vaihe == MuseoVaihe.Siirtyy, "takaisin kierrokselle");
        }

        [Testi] static void Valaistus()
        {
            var c = MuseoValo.Kelvin(3200);
            Oleta.Tosi(c.R > c.G && c.G > c.B && c.B > 0.5, $"3200 K lämmin mutta neutraali ({c.R:F2}, {c.G:F2}, {c.B:F2})");
            Oleta.Tosi(Math.Abs(0.2126 * c.R + 0.7152 * c.G + 0.0722 * c.B - 1) < 0.02, "luminanssi ~1");
            double valkoinen = MuseoValo.KuvaArvo(0.85, 150, 6.6);
            Oleta.Tosi(valkoinen > 0.25 && valkoinen < 0.6, $"valkoinen paperi 150 lx:ssä EV 6,6: {valkoinen:F2} (ei palanut)");
            Oleta.Tosi(MuseoValo.KuvaArvo(0.85, 50, 6.6) < valkoinen / 2.5, "grafiikka 50 lx tummempi");
            var s = Alankomaat();
            var r = s.Ripustukset.Find(x => x.Teos.Id == "SK-A-2344");
            double I = MuseoValo.Voimakkuus(r.Paikka.Valo, r.Paikka.Keskipiste, r.Paikka.Normaali);
            var d = r.Paikka.Keskipiste - r.Paikka.Valo.Paikka;
            double E = I * Math.Abs(d.X * r.Paikka.Normaali.X + d.Y * r.Paikka.Normaali.Y + d.Z * r.Paikka.Normaali.Z) / Math.Pow(d.Pituus, 3);
            Oleta.Tosi(Math.Abs(E - r.Paikka.Valo.Lx) < 1e-6, $"keilan voimakkuus antaa {r.Paikka.Valo.Lx} lx teoksen keskelle");
            var (ulko, sisa) = MuseoValo.Kartio(r.Paikka.Valo);
            Oleta.Tosi(sisa > ulko, "pehmeä reuna");
        }
    }
}
