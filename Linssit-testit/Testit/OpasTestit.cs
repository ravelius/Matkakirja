// Elävä opas (Linssiseppä 5.10.2026): kehystys, lento lähelle ja kauas, silmukan pyynnöt, esihaku ja toiveen keskeytys.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Kierros;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Testit
{
    public static class OpasTestit
    {
        static OpasKohde K(string id, double lat, double lon, double koko = 60) =>
            new OpasKohde { Id = id, Nimi = id, Lat = lat, Lon = lon, KokoM = koko, KestoS = 20 };

        [Testi] static void VastausLuetaanJaVirheellinenHylataan()
        {
            var j = (Dictionary<string, object>)MiniJson.Jasenna("{\"id\":\"Q1\",\"nimi\":\"Rundetaarn\",\"lat\":55.6814,\"lon\":12.5758,\"koko_m\":40,\"aani\":\"https://x/a.mp3\",\"kesto_s\":21.4}");
            var k = OpasKohde.Lue(j);
            Oleta.Tosi(k != null && k.Nimi == "Rundetaarn" && Math.Abs(k.KokoM - 40) < 1e-9 && Math.Abs(k.KestoS - 21.4) < 1e-9);
            Oleta.Tosi(OpasKohde.Lue((Dictionary<string, object>)MiniJson.Jasenna("{\"nimi\":\"x\",\"lat\":95,\"lon\":0}")) == null, "lat yli 90");
            var pcm = OpasKohde.Lue((Dictionary<string, object>)MiniJson.Jasenna("{\"nimi\":\"N\",\"lat\":55,\"lon\":12,\"aani\":\"https://x/a.mp3\",\"aani_pcm\":\"https://x/a.pcm\",\"aani_taajuus\":24000}"));
            Oleta.Sama("https://x/a.pcm", pcm.AaniAvain, "PCM ensisijainen"); Oleta.Sama(24000, pcm.AaniTaajuus);
            Oleta.Sama("https://x/a.mp3", k.AaniAvain, "ilman PCM:ää mp3");
            Oleta.Tosi(OpasKohde.Lue((Dictionary<string, object>)MiniJson.Jasenna("{\"lat\":1,\"lon\":2}")) == null, "nimi puuttuu");
        }

        [Testi] static void VirheTaukoKasvaaJaOpasLuovuttaa()
        {
            // Natiivi-UI 5.10. iPad: 429 → 9 800 pyyntöä 6 min. Nyt: tauko 2–4–8–16 s, viides virhe luovuttaa, ei pyyntöjä sen jälkeen.
            var s = new OpasSilmukka(new Kuvakulma(55.68, 12.57, 1500, 50, 0, 40));
            var pyynnot = new List<int>();
            s.Pyyda += (n, t) => pyynnot.Add(n);
            s.Aloita("Kööpenhamina");
            double aika = 0;
            for (int i = 0; i < 600 * 10; i++)   // 10 min, 10 fps
            {
                if (pyynnot.Count > 0 && !s.Luovutti && i % 5 == 0) s.Vastaus(pyynnot[pyynnot.Count - 1], null, 503);
                s.Paivita(0.1, _ => 40); aika += 0.1;
            }
            Oleta.Sama(OpasSilmukka.VirheitaMax, pyynnot.Count, "yritykset ennen luovutusta");
            Oleta.Tosi(s.Luovutti);
            Oleta.Sama(2.0, OpasSilmukka.Tauko(1)); Oleta.Sama(16.0, OpasSilmukka.Tauko(4)); Oleta.Sama(60.0, OpasSilmukka.Tauko(10));
            // Pelaajan toive purkaa luovutuksen: yksi uusi pyyntö.
            s.Toive("Nyhavn");
            Oleta.Sama(OpasSilmukka.VirheitaMax + 1, pyynnot.Count);
            Oleta.Tosi(!s.Luovutti);
        }

        [Testi] static void RetryAfterPitkaLuovuttaaHetiJaLyhytPidentaaTaukoa()
        {
            var s = new OpasSilmukka(new Kuvakulma(55.68, 12.57, 1500, 50, 0, 40));
            var pyynnot = new List<int>();
            s.Pyyda += (n, t) => pyynnot.Add(n);
            s.Aloita("x");
            s.Vastaus(pyynnot[0], null, 429, 30);
            Oleta.Sama(30.0, s.VirheTauko, "Retry-After 30 s > tauko 2 s");
            for (int i = 0; i < 290; i++) s.Paivita(0.1, _ => 40);
            Oleta.Sama(1, pyynnot.Count, "ei uusintaa ennen Retry-Afteria");
            for (int i = 0; i < 20; i++) s.Paivita(0.1, _ => 40);
            Oleta.Sama(2, pyynnot.Count);
            s.Vastaus(pyynnot[1], null, 429, 6 * 3600);   // päiväraja
            Oleta.Tosi(s.Luovutti, "Retry-After yli 60 s → luovutus heti");
            for (int i = 0; i < 1000; i++) s.Paivita(0.1, _ => 40);
            Oleta.Sama(2, pyynnot.Count);
        }

        [Testi] static void EsilatausOnLaskeutumiskehys()
        {
            // Lennon aikana esilatauskamera = täsmälleen lennon loppuasento (laatat oikeasta kulmasta saapuessa).
            var s = new OpasSilmukka(new Kuvakulma(55.68, 12.57, 1500, 50, 0, 40));
            var pyynnot = new List<int>();
            s.Pyyda += (n, t) => pyynnot.Add(n);
            s.Aloita("x");
            var k = K("nyhavn", 55.6798, 12.5912, 300); k.Luokka = "kanava";
            s.Vastaus(pyynnot[0], k);
            var ennen = s.Esilataus(_ => 5);
            Oleta.Tosi(ennen.HasValue, "esihaettu kohde esiladataan jo ennen lentoa");
            s.Paivita(0.1, _ => 5);
            Oleta.Sama(OpasVaihe.Lentaa, s.Vaihe);
            var esi = s.Esilataus(_ => 5).Value;
            for (int i = 0; i < 400 && s.Vaihe == OpasVaihe.Lentaa; i++) s.Paivita(0.1, _ => 5);
            var loppu = s.Asento;
            Oleta.Tosi(Math.Abs(esi.Lat - loppu.Lat) < 1e-9 && Math.Abs(esi.EtaisyysM - loppu.EtaisyysM) < 1e-6 && Math.Abs(esi.Kallistus - loppu.Kallistus) < 1e-9,
                $"esilataus {esi.EtaisyysM:F0} m / {esi.Kallistus:F0}°, saapuminen {loppu.EtaisyysM:F0} m / {loppu.Kallistus:F0}°");
            Oleta.Tosi(Math.Abs(ennen.Value.EtaisyysM - esi.EtaisyysM) < 1e-6, "ennen lentoa sama kehys");
        }

        [Testi] static void KehysKoonMukaan()
        {
            var pieni = OpasSilmukka.Kehysta(K("a", 55, 12, 10), 40, 90);
            var iso = OpasSilmukka.Kehysta(K("b", 55, 12, 2000), 40, 90);
            Oleta.Sama(OpasSilmukka.EtaisyysMinM, pieni.EtaisyysM);
            Oleta.Sama(OpasSilmukka.EtaisyysMaxM, iso.EtaisyysM);
            Oleta.Tosi(pieni.KatseKorkeusM > 40 && pieni.KatseKorkeusM < 110);
        }

        [Testi] static void LentoKauasNouseeJaOnJatkuva()
        {
            var a = new Kuvakulma(55.68, 12.57, 400, 62, 0, 45);
            var b = new Kuvakulma(41.89, 12.49, 400, 62, 180, 50);   // Kööpenhamina → Rooma ~1 530 km
            var keski = OpasSilmukka.Lennossa(a, b, 0.5);
            Oleta.Tosi(keski.EtaisyysM > 1e6, $"keskellä {keski.EtaisyysM / 1000:F0} km");
            var ed = a; double suurin = 0;
            for (int i = 1; i <= 600; i++)
            {
                var x = OpasSilmukka.Lennossa(a, b, i / 600.0);
                suurin = Math.Max(suurin, KierrosLento.EtaisyysM(ed.Lat, ed.Lon, x.Lat, x.Lon));
                ed = x;
            }
            Oleta.Tosi(suurin < 12000, $"suurin askel {suurin:F0} m / kehys (20 s × 30 fps)");
            Oleta.Tosi(Math.Abs(ed.Lat - b.Lat) < 1e-6 && Math.Abs(ed.Lon - b.Lon) < 1e-6);
        }

        [Testi] static void SilmukkaEsihakeeJaToiveKeskeyttaa()
        {
            var s = new OpasSilmukka(new Kuvakulma(55.68, 12.57, 1500, 50, 0, 40));
            var pyynnot = new List<(int n, string toive)>();
            int saapui = 0, hiljennys = 0;
            s.Pyyda += (n, t) => pyynnot.Add((n, t));
            s.Saapui += _ => saapui++;
            s.Hiljenna += () => hiljennys++;
            s.Aloita("Kööpenhamina");
            Oleta.Sama(1, pyynnot.Count); Oleta.Sama("Kööpenhamina", pyynnot[0].toive);
            s.Vastaus(1, K("radhus", 55.6757, 12.5696));
            for (int i = 0; i < 400 && saapui == 0; i++) s.Paivita(0.05, _ => 50);
            Oleta.Sama(1, saapui); Oleta.Sama(OpasVaihe.Puhuu, s.Vaihe);
            Oleta.Sama(2, pyynnot.Count, "esihaku saapuessa"); Oleta.Sama(null, pyynnot[1].toive);
            // Vanha vastaus hylätään toiveen jälkeen.
            s.Toive("näytä Nyhavn");
            Oleta.Sama(1, hiljennys); Oleta.Sama(3, pyynnot.Count); Oleta.Sama("näytä Nyhavn", pyynnot[2].toive);
            s.Vastaus(2, K("tivoli", 55.6737, 12.5681));
            Oleta.Tosi(s.Seuraava == null, "vanha esihaku hylätty");
            s.Vastaus(3, K("nyhavn", 55.6798, 12.5904));
            for (int i = 0; i < 400 && saapui == 1; i++) s.Paivita(0.05, _ => 50);
            Oleta.Sama(2, saapui); Oleta.Sama("nyhavn", s.Nykyinen.Id);
        }

        [Testi] static void KysymysOdottaaToivettaEikaLiikutaKameraa()
        {
            var s = new OpasSilmukka(new Kuvakulma(55.68, 12.57, 1500, 50, 0, 40));
            var pyynnot = new List<string>(); OpasKohde kysytty = null;
            s.Pyyda += (n, t) => pyynnot.Add(t); s.Kysyy += k => kysytty = k;
            s.Aloita("Kööpenhamina");
            var k = OpasKohde.Lue((Dictionary<string, object>)MiniJson.Jasenna("{\"tyyppi\":\"kysymys\",\"teksti\":\"Mitä haluaisit nähdä?\",\"vaihtoehdot\":[\"Linnoja\",\"Satama\"],\"kesto_s\":4}"));
            Oleta.Tosi(k != null && k.Kysymys && k.Vaihtoehdot.Length == 2);
            s.Vastaus(1, k);
            Oleta.Tosi(kysytty == k && s.OdottaaVastausta);
            Oleta.Sama(2, pyynnot.Count, "ensimmäinen vaihtoehto esihaetaan heti"); Oleta.Sama("Linnoja", pyynnot[1]);
            for (int i = 0; i < 40; i++) s.Paivita(0.1, _ => 50);
            Oleta.Sama(2, pyynnot.Count);
            s.Toive("Satama");
            Oleta.Sama(3, pyynnot.Count); Oleta.Sama("Satama", pyynnot[2]); Oleta.Tosi(!s.OdottaaVastausta);
        }

        [Testi] static void VastaamatonKysymysValitseeEnsimmaisen()
        {
            var s = new OpasSilmukka(new Kuvakulma(55.68, 12.57, 1500, 50, 0, 40));
            var pyynnot = new List<string>();
            s.Pyyda += (n, t) => pyynnot.Add(t);
            s.Aloita("Kööpenhamina");
            s.Vastaus(1, new OpasKohde { Kysymys = true, Teksti = "Mitä?", Vaihtoehdot = new[] { "Linnoja", "Satama" } });
            Oleta.Sama(2, pyynnot.Count); Oleta.Sama("Linnoja", pyynnot[1]);
            s.Vastaus(2, K("linna", 55.6858, 12.5773));
            s.AaniLoppui();
            for (int i = 0; i < 50; i++) s.Paivita(0.1, _ => 50);
            Oleta.Tosi(s.Vaihe != OpasVaihe.Lentaa, "ei lennä ennen vastausaikaa");
            for (int i = 0; i < 200 && s.Vaihe != OpasVaihe.Lentaa; i++) s.Paivita(0.1, _ => 50);
            Oleta.Sama(OpasVaihe.Lentaa, s.Vaihe, "oletukseen vastausajan jälkeen");
        }

        [Testi] static void SamaPaikkaUudelleenEiLenna()
        {
            var s = new OpasSilmukka(new Kuvakulma(55.68, 12.57, 1500, 50, 0, 40));
            int saapui = 0; s.Saapui += _ => saapui++;
            s.Aloita(null); s.Vastaus(1, K("a", 55.6757, 12.5696));
            for (int i = 0; i < 400 && saapui == 0; i++) s.Paivita(0.05, _ => 50);
            s.Vastaus(2, K("a", 55.6757, 12.5696)); s.AaniLoppui();
            for (int i = 0; i < 30 && saapui == 1; i++) s.Paivita(0.05, _ => 50);
            Oleta.Sama(2, saapui); Oleta.Sama(OpasVaihe.Puhuu, s.Vaihe);
        }

        [Testi] static void SaapuminenOdottaaLaattojaEnintaanNeljaSekuntia()
        {
            var s = new OpasSilmukka(new Kuvakulma(55.68, 12.57, 1500, 50, 0, 40));
            int saapui = 0; s.Saapui += _ => saapui++;
            s.Aloita(null); s.Vastaus(1, K("a", 55.6757, 12.5696));
            s.Paivita(0.05, _ => 50, () => false);
            double lento = s.LentoKestoS, t = 0.05;
            while (saapui == 0 && t < 60) { s.Paivita(0.05, _ => 50, () => false); t += 0.05; }
            Oleta.Tosi(t > lento + OpasSilmukka.SaapumisOdotusS - 0.2 && t < lento + OpasSilmukka.SaapumisOdotusS + 0.3, $"saapui {t:F1} s, lento {lento:F1} s");
        }

        [Testi] static void PuheAlkaaKolmeSekuntiaEnnenSaapumistaJaLyhytLentoViisiSekuntia()
        {
            Oleta.Sama(OpasSilmukka.LyhytLentoS, OpasSilmukka.LennonKesto(800));
            Oleta.Tosi(OpasSilmukka.LennonKesto(3000) >= OpasSilmukka.LentoMinS);
            var s = new OpasSilmukka(new Kuvakulma(55.68, 12.57, 1500, 50, 0, 40));
            double puheT = -1, saapuiT = -1, t = 0;
            s.AlkaaPuhua += _ => puheT = t; s.Saapui += _ => saapuiT = t;
            s.Aloita(null); s.Vastaus(1, K("a", 55.6757, 12.5696));
            while (saapuiT < 0 && t < 60) { s.Paivita(0.05, _ => 50, () => true); t += 0.05; }
            double lento = OpasSilmukka.LennonKesto(KierrosLento.EtaisyysM(55.68, 12.57, 55.6757, 12.5696));
            Oleta.Tosi(puheT > 0 && Math.Abs(puheT - Math.Max(OpasSilmukka.PuheAikaisinS, lento - OpasSilmukka.PuheEnnenS)) < 0.2, $"puhe {puheT:F2}, lento {lento:F1}");
        }

        [Testi] static void AvausLiukuuKaupunginYlleOdottaessa()
        {
            var a = new Kuvakulma(55.68, 12.57, 2000, 50, 0, 40);
            var s = new OpasSilmukka(a);
            s.Aloita(null);
            for (int i = 0; i < 100; i++) s.Paivita(0.1, _ => 50);
            Oleta.Tosi(s.Asento.EtaisyysM < 1600 && s.Asento.Kallistus > 52, $"etäisyys {s.Asento.EtaisyysM:F0}, kallistus {s.Asento.Kallistus:F1}");
        }

        [Testi] static void PuheenJalkeenOdottaaSeuraavaa()
        {
            var s = new OpasSilmukka(new Kuvakulma(55.68, 12.57, 1500, 50, 0, 40));
            int saapui = 0; s.Saapui += _ => saapui++;
            s.Aloita(null); s.Vastaus(1, K("a", 55.6757, 12.5696));
            for (int i = 0; i < 400 && saapui == 0; i++) s.Paivita(0.05, _ => double.NaN);
            s.AaniLoppui();
            for (int i = 0; i < 40; i++) s.Paivita(0.05, _ => 50);
            Oleta.Tosi(s.Vaihe == OpasVaihe.Puhuu || s.Vaihe == OpasVaihe.Odottaa, s.Vaihe.ToString());
            s.Vastaus(2, K("b", 55.6798, 12.5904));
            s.Paivita(0.05, _ => 50);
            Oleta.Sama(OpasVaihe.Lentaa, s.Vaihe);
        }
    }
}
