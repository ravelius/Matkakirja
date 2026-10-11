// Kaupunkien puut (Linssiseppä 10.10.2026, juna 181): Ydin PuuRuudukko (Karttasepän puut-<kohde>.bytes: otsake, ruututaulu, purku),
// ruutuvalinta, näkymäkartio, LOD ja koodi; oikea tiedosto Karttasepän kansiosta tai vientipaketista, jos koneella.
// 11.10. (iPad-ajo 181): runko–latvus-suhde (Muoto), tyvi maahan pintamallista (MaaPinnasta), Googlen puut ensin (GooglellaPuu), muistirivi.
using System;
using System.Collections.Generic;
using System.IO;
using Matkakirja.Linssit.Elava;

namespace Matkakirja.Linssit.Testit
{
    public static class KaupunkiPuutTestit
    {
        static string Polku(params string[] o) => Path.Combine(AppContext.BaseDirectory, "..", "..", Path.Combine(o));

        /// <summary>Pieni tiedosto: 2 × 2 ruutua à 100 m (alue −100…100), puut (x, y 0,5 m; h, l, tyyppi) ruuduittain.</summary>
        static byte[] Tiedosto(params (short x, short y, byte h, byte l, byte t)[][] ruudut)
        {
            var m = new MemoryStream(); var w = new BinaryWriter(m);
            int n = 0; foreach (var r in ruudut) n += r.Length;
            w.Write(new[] { (byte)'P', (byte)'U', (byte)'U', (byte)'1' }); w.Write((ushort)2); w.Write((ushort)2); w.Write(100f); w.Write((uint)n);
            uint a = 0; foreach (var r in ruudut) { w.Write(a); a += (uint)r.Length; } w.Write(a);
            foreach (var r in ruudut) foreach (var p in r) { w.Write(p.x); w.Write(p.y); w.Write(p.h); w.Write(p.l); w.Write(p.t); w.Write((byte)3); }
            return m.ToArray();
        }

        [Testi] static void JasennysJaPurku()
        {
            var b = Tiedosto(
                new[] { ((short)-150, (short)-150, (byte)40, (byte)80, (byte)1) },                 // ruutu 0 (x −100…0, z −100…0): (−75, −75), 10 m, 8 m
                new (short, short, byte, byte, byte)[0],                                          // ruutu 1 tyhjä
                new[] { ((short)-20, (short)100, (byte)0, (byte)0, (byte)2), ((short)-180, (short)190, (byte)20, (byte)0, (byte)6) },   // ruutu 2
                new[] { ((short)100, (short)100, (byte)60, (byte)70, (byte)9) });                  // ruutu 3 (50, 50)
            Oleta.Sama(16 + 5 * 4, PuuRuudukko.OtsakeTavua + PuuRuudukko.TauluTavua(b));
            var r = PuuRuudukko.Lue(b);
            Oleta.Sama(2, r.RuutujaX); Oleta.Sama(100f, r.RuutuM); Oleta.Sama(4, r.Puita);
            Oleta.Sama((long)b.Length, r.TiedostonKoko, "otsake + taulu + 8 t / puu");
            Oleta.Sama(-100.0, r.X0); Oleta.Sama(0, r.Maara(1)); Oleta.Sama(2, r.Maara(2)); Oleta.Sama(3, r.Alku(3));
            var a2 = r.Alue(2); Oleta.Tosi(a2.X0 == -100 && a2.Z0 == 0 && a2.X1 == 0 && a2.Z1 == 100, "ruutu 2 = rivi 1, sarake 0");
            var puut = new PuuRuudukko.Puu[2];
            PuuRuudukko.Pura(b, (int)r.Siirto(2), 2, puut);
            Oleta.Tosi(puut[0].X == -10f && puut[0].Z == 50f, "x/y 0,5 m, y = pohjoinen = Z");
            Oleta.Tosi(puut[0].KorkeusM == PuuRuudukko.OletusKorkeusM && Math.Abs(puut[0].LatvusM - 0.45f * 8f) < 1e-5 && puut[0].Havu, "oletukset ja havu");
            Oleta.Tosi(puut[1].KorkeusM == 5f && Math.Abs(puut[1].LatvusM - 2.25f) < 1e-5 && puut[1].Havu && puut[1].Suku == 3, "latvus 0,45 × korkeus; bitit 2–3 eivät muuta lajia");
            Oleta.Heittaa<FormatException>(() => PuuRuudukko.Lue(new byte[] { (byte)'P', (byte)'U', (byte)'U', (byte)'2', 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0 }));
            var vaara = (byte[])b.Clone(); vaara[12] = 9;   // puita ≠ taulun loppu
            Oleta.Heittaa<FormatException>(() => PuuRuudukko.Lue(vaara));
        }

        [Testi] static void RunkoEnintaanKolmannes()
        {
            // iPad-ajo 181: OSM-puun oletuslatvus 0,45 × h ja vanha latvus clamp(0,6 h, 0,7 l, 1,2 l) → näkyvä runko 0,46 h (rajattu l 0,3 h → 0,64 h).
            foreach (float h in new[] { 3f, 8f, 12.25f, 20f, 35f, 63.75f })
                foreach (float lk in new[] { 0.3f, 0.45f, 0.8f, 1.2f })
                    foreach (bool havu in new[] { false, true })
                    {
                        var m = PuuRuudukko.Muoto(h, lk * h, havu);
                        string t = $"h {h}, l {lk} h, havu {havu}";
                        Oleta.Tosi(m.RunkoM <= h / 3f + 1e-4f && m.RunkoM > 0, "runko ≤ h / 3: " + t + " → " + m.RunkoM);
                        Oleta.Tosi(Math.Abs(m.RunkoM + m.LatvusK - h) < 1e-4, "latvus + runko = h: " + t);
                        Oleta.Tosi(havu ? m.LatvusL >= 0.3f * h - 1e-4 && m.LatvusL <= 0.6f * h + 1e-4 : m.LatvusL >= 0.5f * h - 1e-4 && m.LatvusL <= 1.2f * h + 1e-4, "leveys: " + t);
                        // Varjostimen näkyvä alareuna sivulta: keskipiste h − K/2, kortti ±1,05 × Peitto 1,15 × K/2 → ≥ 0 ja ≤ h / 3.
                        double ala = h - m.LatvusK * 0.5 - 1.05 * 1.15 * m.LatvusK * 0.5;
                        Oleta.Tosi(ala >= 0 && ala <= h / 3.0, "näkyvä latvuksen alareuna " + t + " → " + ala);
                    }
            var osm = PuuRuudukko.Muoto(14f, PuuRuudukko.LatvusKerroin * 14f, false);
            Oleta.Tosi(Math.Abs(osm.RunkoM - 0.3f * 14f) < 1e-4 && Math.Abs(osm.LatvusL - 7f) < 1e-4, "OSM-oletus 14 m: runko 4,2 m, latvus 7 m leveä");
            string v = File.ReadAllText(Polku("Assets", "Matkakirja", "Linssit", "Resources", "Varjostimet", "KaupunkiPuu.shader"));
            Oleta.Tosi(v.Contains("float latvusK = h * (havu > 0.5 ? 0.8 : 0.7);") && v.Contains("clamp(l, 0.3 * h, 0.6 * h) : clamp(l, 0.5 * h, 1.2 * h)")
                && PuuRuudukko.LehtiLatvus == 0.7f && PuuRuudukko.HavuLatvus == 0.8f, "varjostin laskee saman muodon kuin PuuRuudukko.Muoto");
            Oleta.Tosi(v.Contains("lerp(-0.3, h - latvusK * 0.5, kulma.y)"), "runko tyvestä (0,3 m maan alle) latvuksen keskelle");
        }

        [Testi] static void TyviMaahanPintamallista()
        {
            // Maa 50 m; puisto: latvusto 65 m 20 m:n säteellä origosta. Vanha 4 suunnan kehä latvus/2 + 3 = 7 m osui latvustoon (65 m).
            Func<double, double, double> puisto = (x, z) => x * x + z * z < 400 ? 65 : 50;
            double vanha = puisto(0, 0); foreach (var (dx, dz) in new[] { (1, 0), (-1, 0), (0, 1), (0, -1) }) vanha = Math.Min(vanha, puisto(dx * 7, dz * 7));
            Oleta.Sama(65.0, vanha, "vanha kehä: tyvi latvuksessa (ilmassa)");
            Oleta.Sama(50.0, PuuRuudukko.MaaPinnasta(puisto, 0, 0, 8f), "uusi: ulompi kehä (26 m) osuu maahan");
            // Yksittäinen kuoppa (joki laiturin alla) ei vedä puuta alas: toiseksi pienin.
            Func<double, double, double> kuoppa = (x, z) => x > 13 && x < 15 && Math.Abs(z) < 1 ? 40 : 50;
            Oleta.Sama(50.0, PuuRuudukko.MaaPinnasta(kuoppa, 0, 0, 8f), "yksi kuoppa ohitetaan");
            // Rinne 10 %: puu painuu enintään ulomman kehän verran (26 m × 0,1), ei nouse ilmaan.
            double rinne = PuuRuudukko.MaaPinnasta((x, z) => 50 + 0.1 * x, 0, 0, 8f);
            Oleta.Tosi(rinne <= 50 && rinne >= 50 - 2.7, "rinne: " + rinne);
            Oleta.Tosi(double.IsNaN(PuuRuudukko.MaaPinnasta((x, z) => double.NaN, 0, 0, 8f)), "ei pintaa → NaN");
            Oleta.Sama(52.0, PuuRuudukko.MaaPinnasta((x, z) => x == 0 && z == 0 ? 52 : double.NaN, 0, 0, 8f), "yksi näyte riittää");
            string u = File.ReadAllText(Polku("Assets", "Matkakirja", "Linssit", "Unity", "KaupunkiPuut.cs"));
            Oleta.Tosi(u.Contains("PuuRuudukko.MaaPinnasta(pintaNayte, x, z, latvusM)") && u.Contains("m.KorkeusEnu(x, z)") && u.Contains("OpasSovitin.MaanpintaMalli(lat0, lon0)"),
                "Unity: DTM ensin, sitten 25 näytettä pinnasta, näytteet mallin ENU:sta");
        }

        [Testi] static void GooglenPuutEnsin()
        {
            var b = Tiedosto(new[] { ((short)0, (short)0, (byte)40, (byte)0, (byte)5), ((short)2, (short)0, (byte)40, (byte)0, (byte)1),
                ((short)4, (short)0, (byte)0, (byte)0, (byte)1), ((short)6, (short)0, (byte)0, (byte)0, (byte)9) },
                new (short, short, byte, byte, byte)[0], new (short, short, byte, byte, byte)[0], new (short, short, byte, byte, byte)[0]);
            var r = PuuRuudukko.Lue(b);
            var puut = new PuuRuudukko.Puu[4];
            PuuRuudukko.Pura(b, (int)r.Siirto(0), 4, puut);
            Oleta.Tosi(puut[0].Chm && puut[0].KorkeusTunnettu && PuuRuudukko.GooglellaPuu(puut[0]), "latvusmallin puu → Googlella");
            Oleta.Tosi(!puut[1].Chm && PuuRuudukko.GooglellaPuu(puut[1]), "OSM-puu, korkeus datassa (latvus nähty) → Googlella");
            Oleta.Tosi(!puut[2].KorkeusTunnettu && puut[2].KorkeusM == PuuRuudukko.OletusKorkeusM && !PuuRuudukko.GooglellaPuu(puut[2]), "OSM-puu ilman korkeutta → piirretään");
            Oleta.Tosi(!PuuRuudukko.GooglellaPuu(puut[3]), "arvio-bitti (puurivi) ei muuta");
            Oleta.Tosi(Array.Find(PuuRuudukko.Kaupungit, x => x.Id == "tukholma").GooglenPuut && !Array.Find(PuuRuudukko.Kaupungit, x => x.Id == "pariisi").GooglenPuut,
                "PT 11.10.: Tukholmassa Googlen puut ensin, Pariisissa kortit peittävät möykyt");
            string u = File.ReadAllText(Polku("Assets", "Matkakirja", "Linssit", "Unity", "KaupunkiPuut.cs"));
            string o = File.ReadAllText(Polku("Assets", "Matkakirja", "Linssit", "Unity", "LinssiOhjain.cs"));
            Oleta.Tosi(u.Contains("if (ohita && PuuRuudukko.GooglellaPuu(p)) { googlenOhitettu++; continue; }") && o.Contains("KaupunkiPuut.AsetaTupla("), "ohitus latauksessa, komento opas puut tupla");
        }

        [Testi] static void MuistiriviPortille()
        {
            string u = File.ReadAllText(Polku("Assets", "Matkakirja", "Linssit", "Unity", "KaupunkiPuut.cs"));
            string o = File.ReadAllText(Polku("Assets", "Matkakirja", "Linssit", "Unity", "LinssiOhjain.cs"));
            Oleta.Tosi(u.Contains("Debug.Log($\"MATKAKIRJA kaupunki: puut muisti {n.id}: CPU {Mt(cpu)} Mt, GPU {Mt(gpu)} Mt, puita {n.ladattuPuita}\");"),
                "rivi \"MATKAKIRJA kaupunki: puut muisti <kaupunki>: CPU x Mt, GPU y Mt, puita z\"");
            Oleta.Tosi(u.Contains("ToString(\"F1\", System.Globalization.CultureInfo.InvariantCulture).Replace('.', ',')"), "desimaalipilkku laitteen kielestä riippumatta");
            Oleta.Tosi(o.Contains("if (osat[2] == \"tila\") KaupunkiPuut.KirjaaMuisti();") && u.Contains("jonoKohta >= halutut.Count && halutut.Count > 0"), "komennolla tila ja latauksen valmistuttua");
        }

        [Testi] static void KatutasonLahitaso()
        {
            // Kaupunkinäkymässä maasto 0 → lähitaso puolet silmän ellipsoidikorkeudesta (Pariisi 3 m maan yllä ≈ 43 m). Kiinteä kamera antaa maan.
            string k = File.ReadAllText(Polku("Assets", "Matkakirja", "Kartta", "PalloKierto.cs"));
            string s = File.ReadAllText(Polku("Assets", "Matkakirja", "Linssit", "Unity", "OpasSovitin.cs"));
            Oleta.Tosi(k.Contains("if (maastoRakoPois && LahitasonMaa != null)") && k.Contains("math.max(1.0, (silmanKorkeus - maaLahi) * 0.5)"), "PalloKierto: lähitaso maan mukaan");
            Oleta.Tosi(s.Contains("kierto.LahitasonMaa = LahitasonMaaFn;") && s.Contains("kierto.LahitasonMaa = null;") && s.Contains("lähitaso {kam.nearClipPlane:F1} m"),
                "vain kiinteä kamera (normaali peli ennallaan), lähitaso lokiin");
        }

        [Testi] static void RuutuvalintaLahinEnsin()
        {
            var b = Tiedosto(new[] { ((short)-150, (short)-150, (byte)40, (byte)80, (byte)1) }, new (short, short, byte, byte, byte)[0],
                new[] { ((short)-20, (short)100, (byte)0, (byte)0, (byte)2) }, new[] { ((short)100, (short)100, (byte)60, (byte)70, (byte)9) });
            var r = PuuRuudukko.Lue(b);
            var l = r.Ruudut(60, 60, 5);
            Oleta.Sama(1, l.Count); Oleta.Sama(3, l[0], "vain oma ruutu");
            l = r.Ruudut(60, 60, 500);
            Oleta.Sama("3,2,0", string.Join(",", l), "lähin ensin, tyhjä ruutu 1 pois");
            Oleta.Sama(0, r.Ruudut(5000, 5000, 100).Count, "alueen ulkopuolella ei ruutuja");
            Oleta.Tosi(Math.Abs(r.Etaisyys(0, 60, 60) - Math.Sqrt(2) * 60) < 1e-9, "etäisyys kulmaan");
        }

        [Testi] static void NakymakartioJaLod()
        {
            // Kamera origossa katsoo +z:aan, 90° kartio: tasot x ≤ z, −x ≤ z, y ≤ z, −y ≤ z, z ≥ 1, z ≤ 3000 (n·p + d ≥ 0).
            float s = (float)Math.Sqrt(0.5);
            var t = new float[] { -s, 0, s, 0, s, 0, s, 0, 0, -s, s, 0, 0, s, s, 0, 0, 0, 1, -1, 0, 0, -1, 3000 };
            Oleta.Tosi(PuuRuudukko.Nakyvissa(t, -10, -5, 100, 10, 20, 120), "suoraan edessä");
            Oleta.Tosi(!PuuRuudukko.Nakyvissa(t, -10, -5, -120, 10, 20, -100), "takana");
            Oleta.Tosi(!PuuRuudukko.Nakyvissa(t, 300, 0, 100, 400, 20, 200), "oikealla sivussa");
            Oleta.Tosi(PuuRuudukko.Nakyvissa(t, 90, 0, 100, 400, 20, 200), "osittain kartiossa");
            Oleta.Tosi(PuuRuudukko.Nakyvissa(t, 110, 0, 100, 120, 20, 100, 30), "vara laajentaa (latvus ruudun reunan yli)");
            Oleta.Tosi(!PuuRuudukko.Nakyvissa(t, 0, 0, 3100, 10, 10, 3200), "kaukotason takana");
            Oleta.Sama(0, PuuRuudukko.Lod(100, 400, 2500)); Oleta.Sama(1, PuuRuudukko.Lod(400, 400, 2500)); Oleta.Sama(2, PuuRuudukko.Lod(2500, 400, 2500));
        }

        [Testi] static void KoodiVarjostimelle()
        {
            var p = new PuuRuudukko.Puu { X = -1234.5f, Z = 77f, KorkeusM = 12.25f, LatvusM = 30f, Tyyppi = 6 };
            uint k = PuuRuudukko.Koodi(p);
            Oleta.Sama(12.25f, PuuRuudukko.KoodiKorkeus(k));
            Oleta.Tosi(Math.Abs(PuuRuudukko.KoodiLatvus(k) - 14.7f) < 0.051, "latvus rajattu 1,2 × korkeus (karsintasäde ei ole latvus): " + PuuRuudukko.KoodiLatvus(k));
            Oleta.Sama(2u, k >> 16 & 3u, "havu (bitit 0–1), chm-bitti pois");
            Oleta.Tosi(PuuRuudukko.KoodiLatvus(PuuRuudukko.Koodi(new PuuRuudukko.Puu { KorkeusM = 20, LatvusM = 1 })) >= 6f - 1e-4, "latvus vähintään 0,3 × korkeus");
            Oleta.Tosi(PuuRuudukko.KoodiKorkeus(PuuRuudukko.Koodi(new PuuRuudukko.Puu { KorkeusM = 99, LatvusM = 5 })) == 63.75f, "korkeus enintään 63,75 m");
            Oleta.Tosi(k >> 18 != PuuRuudukko.Koodi(new PuuRuudukko.Puu { X = 30f, Z = 77f, KorkeusM = 12.25f, LatvusM = 30f, Tyyppi = 6 }) >> 18, "vaihtelu paikasta");
        }

        /// <summary>Karttasepän peli/-kansio tai vientipaketti (ämpärin kartta/puut/v1); null jos ei koneella (CI ilman dataa).</summary>
        static string OikeaTiedosto(string id)
        {
            foreach (var k in new[] { "/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/puut-20261010/peli/", "/Users/Shared/Claude/proto-3d/_valmiit/kaupunkipuut-v1-vienti-20261010/kartta/puut/v1/" })
                if (File.Exists(k + "puut-" + id + ".bytes")) return k + "puut-" + id + ".bytes";
            return null;
        }

        [Testi] static void OikeatTiedostot()
        {
            foreach (var (id, puita, lahella) in new[] { ("pariisi", 505976, 30000), ("tukholma", 1050571, 40000) })
            {
                string polku = OikeaTiedosto(id);
                if (polku == null) { Console.WriteLine($"      ({id}: puutiedosto ei koneella, ohitettu)"); continue; }
                var b = File.ReadAllBytes(polku);
                var r = PuuRuudukko.Lue(b);
                var kk = Array.Find(PuuRuudukko.Kaupungit, x => x.Id == id);
                Oleta.Sama(puita, r.Puita, id + ": puita (metan puita)");
                Oleta.Tosi(r.RuutujaX == 64 && r.RuutujaY == 64 && r.RuutuM == 250f && r.X0 == -8000, id + ": 64 × 64 ruutua à 250 m, säde 8 km");
                Oleta.Sama((long)b.Length, r.TiedostonKoko, id + ": tiedoston koko");
                Oleta.Sama(kk.Tavua, (long)b.Length, id + ": PuuRuudukko.Kaupungit-koko (välimuistin tarkistus)");
                // Jokainen puu oman ruutunsa sisällä, korkeus ja latvus järkeviä (näyte joka 7. ruudusta).
                var puut = new PuuRuudukko.Puu[4096];
                long summa = 0;
                for (int ru = 0; ru < r.Ruutuja; ru += 7)
                {
                    int n = r.Maara(ru); if (n == 0) continue;
                    if (puut.Length < n) puut = new PuuRuudukko.Puu[n];
                    PuuRuudukko.Pura(b, (int)r.Siirto(ru), n, puut);
                    var a = r.Alue(ru);
                    for (int k = 0; k < n; k++)
                    {
                        var p = puut[k];
                        Oleta.Tosi(p.X >= a.X0 - 0.5 && p.X <= a.X1 + 0.5 && p.Z >= a.Z0 - 0.5 && p.Z <= a.Z1 + 0.5, $"{id}: puu ({p.X}, {p.Z}) ruudussa {ru}");
                        Oleta.Tosi(p.KorkeusM > 0 && p.KorkeusM < 64 && p.LatvusM > 0, $"{id}: mitat {p.KorkeusM}/{p.LatvusM}");
                    }
                    summa += n;
                }
                Oleta.Tosi(summa > puita / 10, $"{id}: näytteessä {summa} puuta");
                // Googlen puut ensin: koko tiedosto (Tukholma: 4 026 OSM-puuta ilman latvusmallin korkeutta jää piirrettäväksi).
                var kaikki = new PuuRuudukko.Puu[r.Puita];
                PuuRuudukko.Pura(b, (int)r.PuidenAlku, r.Puita, kaikki);
                int jaa = 0; foreach (var p in kaikki) if (!PuuRuudukko.GooglellaPuu(p)) jaa++;
                Console.WriteLine($"      {id}: Googlen puut ensin -säännöllä piirrettäväksi jää {jaa} / {r.Puita} puuta ({(kk.GooglenPuut ? "käytössä" : "ei käytössä")})");
                if (id == "tukholma") Oleta.Tosi(jaa > 1000 && jaa < r.Puita / 100, "tukholma: alle 1 % jää piirrettäväksi: " + jaa);
                // Ruutuvalinta keskustassa: KaukoM 2500 m → kymmeniä tuhansia puita ja alle LadattuMax:n (muistiarvio).
                var l = r.Ruudut(0, 0, 2500 + 250);
                long lahi = 0; foreach (int ru in l) lahi += r.Maara(ru);
                Oleta.Tosi(lahi > lahella && lahi < 150000, $"{id}: puita 2,75 km:n ruuduissa {lahi}");
                Console.WriteLine($"      {id}: {r.Puita} puuta, keskustan ruuduissa {l.Count} ruutua / {lahi} puuta (≈ {lahi * 16 / 1048576.0:F1} Mt)");
            }
        }

        [Testi] static void UnityOsaJaKytkennat()
        {
            string u = File.ReadAllText(Polku("Assets", "Matkakirja", "Linssit", "Unity", "KaupunkiPuut.cs"));
            string v = File.ReadAllText(Polku("Assets", "Matkakirja", "Linssit", "Resources", "Varjostimet", "KaupunkiPuu.shader"));
            string o = File.ReadAllText(Polku("Assets", "Matkakirja", "Linssit", "Unity", "LinssiOhjain.cs"));
            string ov = File.ReadAllText(Polku("Assets", "Matkakirja", "UI", "Linssit", "OpasValikko.cs"));
            Oleta.Tosi(u.Contains("Graphics.RenderPrimitives(rp, MeshTopology.Triangles, lahia * 12, 1)") && u.Contains("kaukoja * 6, 1)"), "GPU-instanssit: lähi 12, kauko 6 kärkeä");
            Oleta.Tosi(!u.Contains("Resources.Load<TextAsset>") && u.Contains("DownloadHandlerFile") && u.Contains("tiedosto.Position = ruudukko.Siirto(r)"), "data ämpäristä levylle, vain ruudut muistiin");
            Oleta.Tosi(u.Contains("OpasSovitin.MaanpintaValmis(lat0, lon0)") && u.Contains("OpasSovitin.PintaMalli(lat0, lon0)"), "tyvi maanpinnasta, ruudut vasta kun maanpinta ratkennut");
            Oleta.Tosi(v.Contains("StructuredBuffer<PuuGpu> _Puut") && v.Contains("SV_VertexID") && v.Contains("\"DepthOnly\"") && v.Contains("\"DepthNormals\"") && v.Contains("kd * siirto"), "varjostin: proseduraalinen, syvyyspassit, latvus möykyn edessä");
            Oleta.Tosi(o.Contains("osat[1] == \"puut\"") && o.Contains("KaupunkiPuut.Tila()"), "komento opas puut 0|1|tila");
            Oleta.Tosi(ov.Contains("KaupunkiPuut.Krediitti"), "krediitti Lähteet-näkymässä");
            Oleta.Tosi(PuuRuudukko.Krediitti.Contains("OpenStreetMap") && PuuRuudukko.Krediitti.Contains("CC BY 4.0") && PuuRuudukko.Krediitti.Contains("Canopy Height"), "krediitin sisältö");
        }
    }
}
