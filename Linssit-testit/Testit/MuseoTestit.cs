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
            foreach (var t in s.Teokset)
            {
                Oleta.Tosi(t.Kuvateksti != null && t.Kuvateksti.Length > 20 && !t.Havainnekuva, $"{t.Id}: kuvateksti (Sisältökirjuri), ei havainnekuva");
                Oleta.Tosi(t.Kuva != null && t.Kuva.StartsWith("lahde/kuvat/seina/") && t.Paketti == "astc-v1/" + t.Id + "/" && Math.Max(t.KuvaLeveys, t.KuvaKorkeus) == 8192,
                    $"{t.Id}: seinäkuva, ASTC-paketti ja lähde 8192 px");
                Oleta.Tosi(Math.Abs((double)t.KuvaLeveys / t.KuvaKorkeus - t.LeveysCm / t.KorkeusCm) / (t.LeveysCm / t.KorkeusCm) < 0.07, $"{t.Id}: kuvan ja mittojen suhde ≤ 7 %");
            }
            foreach (var rp in s.Reitti) if (rp.Kohde != null) Oleta.Tosi(s.HaePaikka(rp.Kohde) != null || s.Veistospaikat.Contains(rp.Kohde), $"reitin kohde {rp.Kohde} on teos- tai veistospaikka");
        }

        // Yhteinen skeema (PT 10.1x): Sisältökirjurin paketin teos sellaisenaan.
        [Testi] static void SisaltokirjurinSkeema()
        {
            const string json = "{\"inventaario\":\"SK-C-5\",\"id\":\"rijks-sk-c-5\",\"nimi_fi\":\"Yövartio\",\"nimi_en\":\"The Night Watch\",\"tekija\":\"Rembrandt van Rijn\",\"vuosi\":\"1642\"," +
                "\"tekniikka\":\"öljy kankaalle\",\"mitat_cm_kork_lev\":[379.5,453.5],\"museo\":\"Rijksmuseum, Amsterdam\",\"teoksen_oikeustila\":\"Public Domain Mark 1.0 (Rijksmuseum)\"," +
                "\"kuvateksti_fi\":\"Rembrandtin suurikokoinen ryhmämuotokuva.\",\"kuvasuhde_leveys_per_korkeus\":1.195,\"kuva\":{\"seina\":{\"tiedosto\":\"kuvat/seina/rijks-sk-c-5.jpg\",\"px\":[2048,1666]}}}";
            var t = Sali.LueTeos(Matkakirja.Peli.MiniJson.Objekti(Matkakirja.Peli.MiniJson.Jasenna(json)));
            Oleta.Tosi(t.Id == "SK-C-5" && t.Otsikko == "Yövartio" && t.Taiteilija == "Rembrandt van Rijn" && t.KorkeusCm == 379.5 && t.LeveysCm == 453.5, "nimi, tekijä, mitat");
            Oleta.Tosi(t.Kuva == "kuvat/seina/rijks-sk-c-5.jpg" && t.KuvaLeveys == 2048 && t.Kuvateksti.StartsWith("Rembrandtin") && !t.Havainnekuva && !t.Grafiikka, "kuva, kuvateksti, havainnekuva false");
        }

        // teokset.v2.json (Sisältökirjuri 10.10.): kuva = {paketti, px, lahde, seina_lahde}, oikeustila ennen lisenssiä.
        [Testi] static void TeoksetV2()
        {
            const string json = "{\"id\":\"SK-C-5\",\"id_lahde\":\"rijks-sk-c-5\",\"nimi_fi\":\"Yövartio\",\"tekija\":\"Rembrandt van Rijn\",\"mitat_cm_kork_lev\":[379.5,453.5]," +
                "\"lisenssi\":\"Public domain\",\"teoksen_oikeustila\":\"Public Domain Mark 1.0 (Rijksmuseum)\",\"kuvateksti_fi\":\"Rembrandtin ryhmämuotokuva.\"," +
                "\"kuva\":{\"paketti\":\"astc-v1/SK-C-5/\",\"px\":[8192,6664],\"lahde\":\"lahde/kuvat/iso/rijks-sk-c-5.jpg\",\"seina_lahde\":\"lahde/kuvat/seina/rijks-sk-c-5.jpg\"}}";
            var t = Sali.LueTeos(Matkakirja.Peli.MiniJson.Objekti(Matkakirja.Peli.MiniJson.Jasenna(json)));
            Oleta.Tosi(t.Id == "SK-C-5" && t.Paketti == "astc-v1/SK-C-5/" && t.Kuva == "lahde/kuvat/seina/rijks-sk-c-5.jpg" && t.KuvaLeveys == 8192 && t.KuvaKorkeus == 6664,
                "paketti, JPEG-vara ja px");
            Oleta.Tosi(t.Lisenssi == "Public Domain Mark 1.0 (Rijksmuseum)", "teoksen oikeustila kortille: " + t.Lisenssi);
        }

        // Huonetekstit (Sisältökirjuri huoneet.json, PT 10.5x): jokainen osa kuuluu yhteen huoneeseen, teksti 2–3 virkettä, nimi ei välky aukossa.
        [Testi] static void Huoneet()
        {
            var s = Alankomaat();
            s.LueHuoneet(File.ReadAllText(Polku("Assets", "Matkakirja", "Linssit", "Resources", "Museo", "alankomaat", "huoneet.json")));
            Oleta.Tosi(s.Huoneet.Count == 9, $"9 huonetta: {s.Huoneet.Count}");
            foreach (var o in s.Osat)
                Oleta.Tosi(s.Huoneet.FindAll(h => h.Osat.Contains(o.Id)).Count == 1, $"osa {o.Id} yhdessä huoneessa");
            foreach (var h in s.Huoneet)
                Oleta.Tosi(!string.IsNullOrEmpty(h.Nimi) && h.Teksti != null && h.Teksti.Length > 80 && h.Teksti.Split(". ").Length <= 4, $"{h.Id}: nimi ja 2–3 virkkeen teksti");
            Oleta.Tosi(s.HuoneOsalle("kg-k3o")?.Id == "kg-komerot", "komerot jakavat yhden huoneen");
            var m1 = s.HaeOsa("m1"); var p = new V3((m1.X0 + m1.X1) / 2, 0, (m1.Z0 + m1.Z1) / 2);
            var h1 = s.HuonePisteessa(p, null);
            Oleta.Tosi(h1?.Id == "m1", "m1:n keskellä huone m1: " + h1?.Id);
            Oleta.Tosi(s.HuonePisteessa(new V3(-1e4, 0, -1e4), h1) == h1, "osien ulkopuolella edellinen huone jää voimaan");
            // Aukon päällekkäisyys: piste, joka on sekä m1:n että toisen osan sisällä, pysyy edellisessä huoneessa.
            foreach (var o in s.Osat)
            {
                if (o == m1) continue;
                double x0 = Math.Max(o.X0, m1.X0), x1 = Math.Min(o.X1, m1.X1), z0 = Math.Max(o.Z0, m1.Z0), z1 = Math.Min(o.Z1, m1.Z1);
                if (x0 > x1 || z0 > z1) continue;
                var y = new V3((x0 + x1) / 2, 0, (z0 + z1) / 2);
                Oleta.Tosi(s.HuonePisteessa(y, h1) == h1 && s.HuonePisteessa(y, s.HuoneOsalle(o.Id)) == s.HuoneOsalle(o.Id), $"m1/{o.Id}-raja: huone ei vaihdu edestakaisin");
            }
        }

        // LR:n sali-GLB (MuseoRakennus.LataaSali): DioraamaGlb lukee sen, jokaisella osalla on valoatlaksen UV1 (0–1), ja tekstuuroidun
        // materiaalin nimi on pinnan nimi (paketin tekstuurit/<nimi>.astcm). Ajetaan, kun LR:n paketti on koneella (muuten ohitetaan).
        [Testi] static void SaliGlb()
        {
            const string lr = "/Users/Shared/Claude/proto-3d/_valmiit/taidemuseo-alankomaat-v1/glb/";
            if (!Directory.Exists(lr)) return;
            foreach (var lod in new[] { 0, 1 })
            {
                var m = DioraamaGlb.Lue(File.ReadAllBytes(lr + $"sali-lod{lod}.glb"), true);
                Oleta.Tosi(m.Osat.Count == 18, $"lod{lod}: 18 materiaalia: {m.Osat.Count}");
                int kolmiot = 0;
                foreach (var o in m.Osat)
                {
                    kolmiot += o.Kolmiot.Length / 3;
                    Oleta.Tosi(o.Uv1 != null && o.Uv1.Length == o.Paikat.Length / 3 * 2, $"lod{lod} {o.Pinta}: UV1 jokaisella kärjellä");
                    bool rajoissa = true; foreach (var u in o.Uv1) if (u < -1e-4 || u > 1 + 1e-4) rajoissa = false;
                    Oleta.Tosi(rajoissa, $"lod{lod} {o.Pinta}: UV1 atlaksen sisällä");
                }
                var lattia = m.Osat.Find(o => o.Pinta == "parketti_kalanruoto");
                Oleta.Tosi(lattia != null && lattia.Kuva >= 0, $"lod{lod}: parketti tekstuuroitu, pinta = materiaalin nimi");
                // Unity-kehys: kävijä etenee +Z:aan (glTF −Z), joten salin syvin kohta (Yövartio, z ≈ −90 glTF) on +Z:ssa.
                float zmax = float.MinValue; foreach (var o in m.Osat) for (int i = 2; i < o.Paikat.Length; i += 3) zmax = Math.Max(zmax, o.Paikat[i]);
                Oleta.Tosi(zmax > 85, $"lod{lod}: Unity-kehyksessä sali +Z:ssa ({zmax:F1})");
                Oleta.Tosi(kolmiot > 5000 && kolmiot < 20000, $"lod{lod}: {kolmiot} kolmiota");
            }
        }

        // Veistospaikat (sali.json) ja sijoitus (veistokset.json): jalusta lattialla, veistos jalustan päällä, keilat ylhäältä.
        [Testi] static void Jalustat()
        {
            var s = Alankomaat();
            Oleta.Tosi(s.Jalustat.Count == 34 && s.Jalustat.Count == s.Veistospaikat.Count, $"34 veistospaikkaa (LR v2f): {s.Jalustat.Count}");
            foreach (var j in s.Jalustat)
            {
                Oleta.Tosi(s.HaeOsa(j.Osa)?.Sisalla(j.Paikka) == true, $"{j.Id} osassa {j.Osa}");
                Oleta.Tosi(Math.Abs(j.AlaKeski.Y) < 1e-6 && Math.Abs(j.Paikka.Y - j.Koko.Y) < 1e-6 && j.MaxKoko.Y > 0.02, $"{j.Id}: jalusta lattialla, veistos sen päällä (v2f: koko patsaan mukaan, vitriineissä pieniä)");
                Oleta.Tosi(j.Valot.Count >= 1 && j.Valot.TrueForAll(v => v.Paikka.Y > j.Paikka.Y + 2 && v.Lx > 0), $"{j.Id}: keilat ylhäältä");
            }
            int n = s.LueVeistokset(File.ReadAllText(Polku("Assets", "Matkakirja", "Linssit", "Resources", "Museo", "alankomaat", "veistokset.json")));
            Oleta.Tosi(n == 34 && s.HaeJalusta("aula-v4").Veistos == "rijks-ccby-maria-lapsi-alabasteri" && s.HaeJalusta("leiden-v1").Veistos == "rmo-beeld-van-maya-en-merit", $"sijoitus: {n}");
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
