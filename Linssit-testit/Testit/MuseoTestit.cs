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
            // LS2 10.10. (PT 20.5x "ilman tyhjiä kohtia"): jokaisella teos_ehdotuksella on teos (ennen 20 ensimmäistä).
            int ehdotuksia = 0; var ehd = new System.Collections.Generic.HashSet<string>();
            foreach (var p in s.Teospaikat) if (p.Ehdotus != null && ehd.Add(p.Ehdotus)) ehdotuksia++;
            Oleta.Sama(ehdotuksia, s.Teokset.Count, "kaikki sali.json:n teos_ehdotukset teoksina");
            Oleta.Tosi(s.Ripustukset.Count == s.Teokset.Count, $"jokainen teos seinällä: {s.Ripustukset.Count}/{s.Teokset.Count}");
            var yv = s.Ripustukset.Find(r => r.Teos.Id == "SK-C-5");
            Oleta.Tosi(yv != null && Math.Abs(yv.Leveys - 4.535) < 1e-6 && Math.Abs(yv.Korkeus - 3.795) < 1e-6 && !yv.Pienennetty, "Yövartio todellisessa koossa 453,5 × 379,5 cm");
            foreach (var r in s.Ripustukset)
            {
                Oleta.Tosi(r.Leveys <= r.Paikka.MaxLeveys + 1e-9 && r.Korkeus <= r.Paikka.MaxKorkeus + 1e-9, $"{r.Teos.Id} mahtuu paikkaan {r.Paikka.Id}");
                Oleta.Tosi(r.Teos.Grafiikka == r.Paikka.Grafiikka, $"{r.Teos.Id}: grafiikka grafiikkapaikalla ({r.Paikka.Sopii})");
                Oleta.Tosi(s.Kehykset.ContainsKey(r.Paikka.Kehysprofiili), $"{r.Paikka.Id}: kehysprofiili {r.Paikka.Kehysprofiili}");
                Oleta.Tosi(r.Paikka.Valo != null && r.Paikka.Valo.Lx >= 50 && r.Paikka.Valo.Kelvin >= 3000 && r.Paikka.Valo.Kelvin <= 3500, $"{r.Paikka.Id}: valokeila 3000–3500 K");
                Oleta.Tosi(!string.IsNullOrEmpty(r.Teos.Otsikko) && !string.IsNullOrEmpty(r.Teos.Taiteilija) && r.Teos.Lisenssi.StartsWith("Public Domain", StringComparison.OrdinalIgnoreCase), $"{r.Teos.Id}: kortin tiedot ja PD");
            }
            Oleta.Tosi(s.Teokset.Find(t => t.Id == "SK-A-2344").Mitat == "45,5 × 41 cm", "kortin mitat suomeksi");
            foreach (var t in s.Teokset)
            {
                Oleta.Tosi(t.Kuvateksti != null && t.Kuvateksti.Length > 20 && !t.Havainnekuva, $"{t.Id}: kuvateksti (Sisältökirjuri), ei havainnekuva");
                Oleta.Tosi(t.Kuva != null && (t.Kuva.StartsWith("lahde/kuvat/seina/") || t.Kuva.StartsWith("grafiikka/kuvat/seina/")) && t.Paketti == "astc-v1/" + t.Id + "/" && Math.Max(t.KuvaLeveys, t.KuvaKorkeus) == 8192,
                    $"{t.Id}: seinäkuva, ASTC-paketti ja lähde 8192 px");
                if (t.MitatPuuttuu)
                {
                    var r = s.Ripustukset.Find(x => x.Teos == t);
                    Oleta.Tosi(t.Mitat == null && r != null && Math.Abs(r.Leveys / r.Korkeus - t.Kuvasuhde) < 0.01
                               && (Math.Abs(r.Korkeus - r.Paikka.MaxKorkeus) < 1e-6 || Math.Abs(r.Leveys - r.Paikka.MaxLeveys) < 1e-6), $"{t.Id}: mitaton teos paikan kokoon kuvasuhteella");
                }
                else Oleta.Tosi(Math.Abs((double)t.KuvaLeveys / t.KuvaKorkeus - t.LeveysCm / t.KorkeusCm) / (t.LeveysCm / t.KorkeusCm) < 0.07, $"{t.Id}: kuvan ja mittojen suhde ≤ 7 %");
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

        [Testi] static void KatseluasentoKaikilleTeoksille()
        {
            // PT 11.10. 00.3x KIIRE (omistaja TF 180: "liian kaukaa ja matalalta"): jokainen teos iPhonella ja iPadilla vaakana.
            var s = Alankomaat(); var k = new MuseoKierros(s);
            double t = Math.Tan(MuseoKierros.KameraFovAste / 2 * Math.PI / 180);
            var lyhyet = new System.Collections.Generic.List<string>();
            foreach (double ks in new[] { 2622.0 / 1206, 4.0 / 3 })
                foreach (var r in s.Ripustukset)
                {
                    var a = k.Katseluasento(r, ks);
                    Oleta.Tosi(a != null, $"{r.Teos.Id} ({r.Paikka.Id}) {ks:F2}: katseluasento löytyy");
                    var p = a.Value.P; var d = a.Value.Suunta; var n = r.Paikka.Normaali;
                    Oleta.Tosi(Math.Abs(d.Y) < 1e-9 && d.X * n.X + d.Z * n.Z < -0.999, $"{r.Teos.Id}: katse vaakasuoraan kohtisuoraan seinään");
                    double et = (p - r.Paikka.Keskipiste).Pituus;
                    var (w, h) = k.Nakoala(r);   // omistaja 11.10. 09.2x: kehyksen sisäreuna täyttää ruudun (95 %), ei rajausta
                    double fh = h / (2 * et * t), fw = w / (2 * et * t * ks);
                    Oleta.Tosi(fh <= MuseoKierros.TayttoKorkeus + 1e-6 && fw <= MuseoKierros.TayttoLeveys + 1e-6, $"{r.Teos.Id} {ks:F2}: mahtuu ({fh:F2} × {fw:F2})");
                    Oleta.Tosi(Math.Abs(p.Y - r.Paikka.Keskipiste.Y) < 1e-6, $"{r.Teos.Id}: silmä teoksen keskikorkeudella ({p.Y:F2} / {r.Paikka.Keskipiste.Y:F2})");
                    Oleta.Tosi(et >= k.LahinEtaisyys(r) - 1e-6, $"{r.Teos.Id}: kehys ei leikkaudu lähitasoon ({et:F2} m)");
                    if (Math.Max(fh, fw) < 0.85 && et > k.LahinEtaisyys(r) + 0.06) lyhyet.Add($"{r.Teos.Id} {ks:F2} {fh:F2}/{fw:F2} {et:F1} m");
                }
            Oleta.Tosi(lyhyet.Count == 0, "teos täyttää ruudun (huone ei rajaa liikaa): " + string.Join("; ", lyhyet));
            k.SovitaPysahdykset(2622.0 / 1206);
            foreach (int i in k.Pysahdykset)
            {
                var rp = s.Reitti[i]; var r = s.HaeRipustus(rp.Kohde);
                Oleta.Tosi((rp.P - k.Katseluasento(r, 2622.0 / 1206).Value.P).Pituus < 1e-9, $"pysähdys {rp.Kohde} katseluasennossa");
            }
        }

        static System.Collections.Generic.List<string> KierrosTeokset()
        {
            var l = new System.Collections.Generic.List<string>();
            var j = Matkakirja.Peli.MiniJson.Objekti(Matkakirja.Peli.MiniJson.Jasenna(File.ReadAllText(Polku("Assets", "Matkakirja", "Linssit", "Resources", "Museo", "alankomaat", "kierros.json"))));
            foreach (var x in Matkakirja.Peli.MiniJson.TaulukkoTaiTyhja(Matkakirja.Peli.MiniJson.Kentta(j, "pysahdykset"))) l.Add((string)x);
            return l;
        }

        [Testi] static void TeoskierrosKertojanTeoksilla()
        {
            // PT 11.10. 00.4x: kierros pysähtyy jokaisella kertojan teoksella (33, 00.5x kaikki seinällä), kamera teoksen katseluasennossa,
            // matka ei kulje seinien läpi (osasta toiseen oviaukoista) ja muut teokset jäävät seinille.
            var s = Alankomaat(); var lista = KierrosTeokset();
            Oleta.Sama(33, lista.Count, "kierros.json: 33 kertojan teosta");
            foreach (double ks in new[] { 2622.0 / 1206, 4.0 / 3 })
            {
                var k = new MuseoKierros(s, lista);
                Oleta.Tosi(k.Puuttuvat.Count == 0, "salista puuttuvat: " + string.Join(", ", k.Puuttuvat));
                Oleta.Sama(33, k.Pysahdykset.Count, "pysähdys jokaisella kertojan teoksella");
                k.SovitaPysahdykset(ks);
                var nahdyt = new System.Collections.Generic.List<string>(); int versio = k.Versio; var ed = k.Nykyinen.P; double maxNopeus = 0;
                var seinassa = new System.Collections.Generic.List<string>();
                for (int i = 0; i < 60000 && k.Vaihe != MuseoVaihe.Valmis; i++)
                {
                    k.Paivita(0.05);
                    maxNopeus = Math.Max(maxNopeus, (k.Nykyinen.P - ed).Pituus / 0.05); ed = k.Nykyinen.P;
                    if (!k.SallittuKatselu(k.Nykyinen.P) && seinassa.Count < 5) seinassa.Add($"{k.Kohta}: {k.Nykyinen.P}");
                    if (k.Versio != versio)
                    {
                        versio = k.Versio;
                        if (k.Vaihe != MuseoVaihe.Pysahtyy) continue;
                        var r = k.NykyinenTeos; nahdyt.Add(r.Teos.Id);
                        var a = k.Katseluasento(r, ks).Value;
                        Oleta.Tosi((k.Nykyinen.P - a.P).Pituus < 1e-6, $"{r.Teos.Id} {ks:F2}: kamera katseluasennossa");
                    }
                }
                Oleta.Tosi(seinassa.Count == 0, $"{ks:F2}: matka ei seinän läpi: " + string.Join("; ", seinassa));
                Oleta.Tosi(k.Vaihe == MuseoVaihe.Valmis, $"{ks:F2}: kierros läpi");
                var odotus = lista.FindAll(id => !k.Puuttuvat.Contains(id));
                Oleta.Sama(string.Join(",", odotus), string.Join(",", nahdyt), $"{ks:F2}: pysähdykset kierros.json:n järjestyksessä");
                Oleta.Tosi(maxNopeus < 3.5, $"{ks:F2}: kävelyvauhti (huippu {maxNopeus:F2} m/s)");
            }
            // Seuraava (⏭) ohittaa pysähdyksen, Siirry viimeiseen kulkee galleriaan oviaukoista.
            var m = new MuseoKierros(s, lista); m.SovitaPysahdykset(4.0 / 3);
            for (int i = 0; i < 600 && m.Vaihe != MuseoVaihe.Pysahtyy; i++) m.Paivita(0.05);
            m.Seuraava(); Oleta.Tosi(m.Kohta == 1 && m.Vaihe == MuseoVaihe.Siirtyy, "⏭ seuraavaan");
            m.Siirry(m.Pysahdykset.Count - 1); bool ulkona = false;
            for (int i = 0; i < 20000 && m.Vaihe != MuseoVaihe.Pysahtyy; i++) { m.Paivita(0.05); ulkona |= !m.SallittuKatselu(m.Nykyinen.P); }
            Oleta.Tosi(!ulkona && m.NykyinenTeos.Teos.Id == "SK-C-5", "Siirry Yövartioon oviaukoista");
        }

        [Testi] static void VapaaanLaskeutuuPehmeasti()
        {
            // PT 11.10. 09.0x: vapaaseen kulkuun siirryttäessä silmä ei hyppää pysähdyksen korkeudelta 1,6 m:iin vaan laskeutuu.
            var s = Alankomaat(); var k = new MuseoKierros(s, KierrosTeokset()); k.SovitaPysahdykset(4.0 / 3);
            int kg = k.Pysahdykset.Count - 2;   // korkealla roikkuva kabinettigallerian teos (SK-A-44)
            k.Siirry(kg); for (int i = 0; i < 20000 && k.Vaihe != MuseoVaihe.Pysahtyy; i++) k.Paivita(0.05);
            double y0 = k.Nykyinen.P.Y;
            Oleta.Tosi(y0 > MuseoKierros.SilmaY + 0.5, $"pysähdys korkealla ({y0:F2} m)");
            k.Vapaa();
            Oleta.Tosi(Math.Abs(k.Nykyinen.P.Y - y0) < 1e-9, "ei hyppyä vapaaseen siirryttäessä");
            double ed = y0, maxAskel = 0;
            for (int i = 0; i < 60; i++) { k.VapaaLiike(0, 0, 0, 0, 0.05); maxAskel = Math.Max(maxAskel, Math.Abs(k.Nykyinen.P.Y - ed)); ed = k.Nykyinen.P.Y; }
            Oleta.Tosi(maxAskel < 0.25, $"laskeutuminen pehmeä (suurin askel {maxAskel:F3} m / 50 ms)");
            Oleta.Tosi(Math.Abs(k.Nykyinen.P.Y - MuseoKierros.SilmaY) < 0.01, $"3 s:ssa kävelykorkeudella ({k.Nykyinen.P.Y:F3})");
            Oleta.Tosi(k.Sallittu(k.Nykyinen.P), $"teoksen edestä liukui kävelyalueelle ({k.Nykyinen.P})");
            for (int i = 0; i < 20; i++) k.VapaaLiike(1, 0, 0, 0, 0.05);
            Oleta.Tosi(k.Sallittu(k.Nykyinen.P), "kävely toimii");
            var r = s.Ripustukset.Find(x => x.Teos.Id == "SK-C-5");
            Oleta.Tosi(k.NaytaTeos(r), "QA: teos katseluasentoon");
            double yq = k.Nykyinen.P.Y; for (int i = 0; i < 40; i++) k.VapaaLiike(0, 0, 0, 0, 0.05);
            Oleta.Tosi(Math.Abs(k.Nykyinen.P.Y - yq) < 1e-9, "QA-kuvan korkeus pysyy");
        }

        [Testi] static void KertojanTekstitys()
        {
            // PT 11.10. 09.0x: tekstitys virkkeittäin kertojan sanojen ajoista (ajat/<sali>/<id>.json); näytetty teksti, kun virkkeitä yhtä monta.
            const string json = "{\"teksti\": \"Katso sinistä. Se on ultramariinia (n. 1663)! Loppu.\", \"puhuttu\": \"Katso sinistä. Se on ultramariinia noin 1663! Loppu.\"," +
                "\"sanat\": [{\"sana\":\"Katso\",\"alku_s\":0.3,\"loppu_s\":0.6},{\"sana\":\"sinistä.\",\"alku_s\":0.7,\"loppu_s\":1.2}," +
                "{\"sana\":\"Se\",\"alku_s\":1.6,\"loppu_s\":1.7},{\"sana\":\"on\",\"alku_s\":1.75,\"loppu_s\":1.9},{\"sana\":\"ultramariinia\",\"alku_s\":2.0,\"loppu_s\":2.8}," +
                "{\"sana\":\"noin\",\"alku_s\":2.9,\"loppu_s\":3.1},{\"sana\":\"1663!\",\"alku_s\":3.2,\"loppu_s\":4.0},{\"sana\":\"Loppu.\",\"alku_s\":4.5,\"loppu_s\":5.0}]}";
            var t = MuseoTekstitys.Lue(json);
            Oleta.Sama(3, t.Virkkeet.Count, "kolme virkettä");
            Oleta.Tosi(t.Virke(0.1) == null, "ennen ensimmäistä sanaa ei tekstiä");
            Oleta.Sama("Katso sinistä.", t.Virke(0.5));
            Oleta.Sama("Se on ultramariinia (n. 1663)!", t.Virke(2.5), "näytetty teksti puhutun ajoituksella (lyhenne ei katkaise)");
            Oleta.Sama("Loppu.", t.Virke(5.2));
            Oleta.Tosi(t.Virke(5.0 + MuseoTekstitys.JalkiS + 0.1) == null, "lopun jälkeen tyhjä");
        }

        [Testi] static void KehyksenKultaJaAalto()
        {
            // PT 11.10. 09.0x (omistaja: "kehykset jäävät niin mustiksi"): LR:n janamateriaalit ja aaltokuvio käyttöön, kultainen
            // sisähelmi mustissa aaltolistoissa, pääteoksille kullattu aaltolista.
            var s = Alankomaat();
            var k = s.Kehykset["nl_aalto_musta"];
            var osat = MuseoGeometria.KehysOsat(k, 1.0, 0.8, (1, 1, 1));
            Oleta.Tosi(osat.ContainsKey("musta") && osat.ContainsKey("kulta"), "musta nauha + kultainen sisähelmi");
            double pm = osat["musta"].Pinta(), pk = osat["kulta"].Pinta();
            Oleta.Tosi(pk > 0.01 * pm && pk < 0.25 * pm, $"kultaa kapea osa ({pk / pm:P0})");
            int aallossa = 0; foreach (var uv in osat["musta"].UV) if (uv.V > 0.5) aallossa++;
            Oleta.Tosi(aallossa > 0 && k.AaltoJaksoMm > 0 && k.AaltoSyvyysMm > 0, $"aaltonauhat merkitty ({aallossa} kärkeä)");
            Oleta.Tosi(MuseoGeometria.KehysOsat(s.Kehykset["nl_yovartio"], 4.5, 3.8, (1, 1, 1)).ContainsKey("kulta"), "Yövartion kultaliuska");
            Oleta.Tosi(Math.Abs(MuseoGeometria.Kehys(k, 1.0, 0.8, (1, 1, 1)).Pinta() - pm - pk) < 1e-9, "Kehys = kaikki osat yhtenä");
            foreach (var id in new[] { "SK-C-216", "SK-C-6", "SK-A-135" })
                Oleta.Sama("nl_aalto_kulta", s.Ripustukset.Find(r => r.Teos.Id == id).Paikka.Kehysprofiili, id + ": kullattu aaltolista");
            Oleta.Sama("kulta", s.Kehykset["nl_aalto_kulta"].Materiaali);
        }

        [Testi] static void PysahdysKertojanMittainen()
        {
            var k = new MuseoKierros(Alankomaat());
            k.PidennaPysahdys(60);
            Oleta.Tosi(k.VaiheenKesto < 60, "siirtymää ei pidennetä");
            for (int i = 0; i < 600 && k.Vaihe != MuseoVaihe.Pysahtyy; i++) k.Paivita(0.05);
            k.PidennaPysahdys(45);
            Oleta.Tosi(Math.Abs(k.VaiheenKesto - 45) < 1e-9, "pysähdys kertojan äänitteen mittainen");
            k.PidennaPysahdys(10);
            Oleta.Tosi(Math.Abs(k.VaiheenKesto - 45) < 1e-9, "lyhyempi ei lyhennä");
        }

        [Testi] static void AsetaPaikka()
        {
            var k = new MuseoKierros(Alankomaat());
            Oleta.Tosi(k.Aseta(-8.4, 4.4, 270), "grafiikkakabinetin keskelle, katse −X");
            Oleta.Tosi(k.Vaihe == MuseoVaihe.Vapaa && Math.Abs(k.Nykyinen.P.X + 8.4) < 1e-9 && k.Nykyinen.Suunta.X < -0.99, "vapaa, paikka ja suunta");
            Oleta.Tosi(!k.Aseta(-30, 4.4, 0), "salin ulkopuolelle ei");
            Oleta.Tosi(k.Aseta(14.6, -80, 180, -10) && k.Nykyinen.Suunta.Z > 0.9 && k.Nykyinen.Suunta.Y < 0, "Leidenin siipi, katse +Z ja alas");
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
