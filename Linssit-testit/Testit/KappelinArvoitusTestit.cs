// KAPPELIN VALOARVOITUS (Linssiseppä 2, 8.10.2026; pelattavuusmalli kohta 11 "arvoitus ja jumi", käsikirjoitus E3 kohdat 2–3):
// vaiheet 1–11 → löytö; jokainen käsikirjoituksen väärä yritys jokaisessa vaiheessa → ei jumia (leveyshaku löytää yhä tien loppuun);
// 1 000 satunnaista tekosarjaa siemenellä → ei jumia; kappalainen kerran yritystä kohden; 10 s:n automaattinen asetus; tallennus;
// 180 s paikallaan → Pulu taso 2 kerran (Vihjeet).
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class KappelinArvoitusTestit
    {
        const KappeliTeko Odota100 = (KappeliTeko)(-1);   // leveyshaun "odota": Paivita(100 s)

        // Sujuva pelaaja käsikirjoituksen järjestyksessä (kappalainen tulee ensimmäisestä raapaisusta).
        static readonly KappeliTeko[] Sujuva =
        {
            KappeliTeko.KohtausAlkoi, KappeliTeko.VoutiLahti, KappeliTeko.OviLukittu, KappeliTeko.LiekkiKilville, KappeliTeko.AvaaLuukku,
            KappeliTeko.LiekkiVetoon, KappeliTeko.KoputaOntto, KappeliTeko.AsetaKynttila, KappeliTeko.Raapaise, KappeliTeko.OtaKynttila,
            KappeliTeko.Puhalla, KappeliTeko.KappalainenLahti, KappeliTeko.SytytaOma, KappeliTeko.AsetaKynttila,
            KappeliTeko.Raapaise, KappeliTeko.Raapaise, KappeliTeko.Raapaise, KappeliTeko.Raapaise, KappeliTeko.Raapaise, KappeliTeko.Raapaise,
            KappeliTeko.Raapaise, KappeliTeko.Raapaise, KappeliTeko.Raapaise, KappeliTeko.Raapaise, KappeliTeko.Raapaise,
            KappeliTeko.AvaaNyytti, KappeliTeko.KalkkiAlttarille, KappeliTeko.PateeniAlttarille, KappeliTeko.LiuskekiviLaukkuun,
        };

        static void Tee(KappelinArvoitus a, KappeliTeko t) { if (t == Odota100) a.Paivita(100); else a.Teko(t); }

        /// <summary>Leveyshaku: pääseekö tilasta valmiiksi pelaajan teoilla, odottamalla ja kappalaisen lähdöllä (ei kiinnijääntiä).</summary>
        static bool Ratkaistavissa(KappelinArvoitus alku, out int askelia)
        {
            var teot = new List<KappeliTeko> { Odota100 };
            foreach (KappeliTeko t in Enum.GetValues(typeof(KappeliTeko))) if (t != KappeliTeko.Kiinni) teot.Add(t);
            var kayty = new HashSet<string> { alku.Avain() }; var jono = new Queue<(KappelinArvoitus, int)>(); jono.Enqueue((alku.Kopio(), 0));
            while (jono.Count > 0)
            {
                var (a, n) = jono.Dequeue();
                if (a.Vaihe == KappelinArvoitus.Valmis) { askelia = n; return true; }
                foreach (var t in teot)
                {
                    var b = a.Kopio(); Tee(b, t);
                    if (kayty.Add(b.Avain())) jono.Enqueue((b, n + 1));
                }
            }
            askelia = -1; return false;
        }

        [Testi] static void SujuvaJarjestysVaiheet1_11JaLoyto()
        {
            var a = new KappelinArvoitus(); var vaiheet = new List<int> { a.Vaihe }; int edistys = 0;
            foreach (var t in Sujuva)
            {
                Oleta.Tosi(a.Teko(t), $"{t} hyväksytään (vaihe {a.Vaihe})");
                if (a.Edistyi) { edistys++; a.Edistyi = false; }
                if (a.Vaihe != vaiheet[vaiheet.Count - 1]) vaiheet.Add(a.Vaihe);
                if (t == KappeliTeko.Raapaise && a.KappalainenTulee) { Oleta.Tosi(a.KappalainenTulossa, "ensimmäinen raapaisu tuo kappalaisen"); a.KappalainenTulee = false; }
            }
            Oleta.Sama("1,2,3,4,5,6,7,8,9,10,11,12", string.Join(",", vaiheet));
            Oleta.Tosi(a.Loyto && a.Asetuttu && !a.LuukkuAuki, "löytö, asetus ja kappalainen sulki luukun");
            Oleta.Tosi(edistys >= 14, $"edistys vaiheista ja kivistä ({edistys})");
        }

        [Testi] static void VaaratYrityksetJokaisessaVaiheessaEivatJumita()
        {
            // Käsikirjoituksen taulukko (kohta 3) + pelaajan virheet: alttarikynttilä, liekki luukulle, umpiseinä, kiven heitto, koputus
            // umpeen, puhallus, luukku, odotus ja kiinnijäänti.
            var vaarat = new[] { KappeliTeko.SytytaAlttari, KappeliTeko.LiekkiLuukulle, KappeliTeko.RaapaiseUmpi, KappeliTeko.HeitaKivi, KappeliTeko.KoputaUmpi,
                KappeliTeko.Puhalla, KappeliTeko.AvaaLuukku, KappeliTeko.SuljeLuukku, KappeliTeko.OtaKynttila, Odota100, KappeliTeko.Kiinni };
            int tarkistettu = 0;
            for (int i = 0; i <= Sujuva.Length; i++)
                foreach (var v in vaarat)
                {
                    var a = new KappelinArvoitus();
                    for (int j = 0; j < i; j++) a.Teko(Sujuva[j]);
                    int ennen = a.Vaihe;
                    Tee(a, v); Tee(a, v);   // kahdesti peräkkäin
                    if (v != KappeliTeko.Kiinni) Oleta.Tosi(a.Vaihe >= ennen || v == KappeliTeko.SytytaAlttari || v == KappeliTeko.OtaKynttila || v == KappeliTeko.Puhalla || v == KappeliTeko.LiekkiLuukulle,
                        $"{v} vaiheessa {ennen}: ei taantumista ({a.Vaihe})");
                    Oleta.Tosi(Ratkaistavissa(a, out _), $"{v} vaiheessa {ennen} (askel {i}): jumi ({a.Avain()})");
                    tarkistettu++;
                }
            Console.WriteLine($"      väärät yritykset: {tarkistettu} tilaa, ei jumia");
        }

        [Testi] static void IsoValoPettaaJaLiekkiSammuuLuukulla()
        {
            var a = new KappelinArvoitus();
            foreach (var t in new[] { KappeliTeko.KohtausAlkoi, KappeliTeko.VoutiLahti, KappeliTeko.OviLukittu, KappeliTeko.SytytaAlttari }) a.Teko(t);
            Oleta.Tosi(a.AlttariPalaa && !a.Teko(KappeliTeko.LiekkiKilville), "tasaisessa valossa kilvet eivät näy");
            a.Teko(KappeliTeko.AsetaKynttila);
            Oleta.Tosi(!a.SaumatNakyvat && !a.Teko(KappeliTeko.Raapaise), "alttarikynttilä palaa: saumat häviävät, veitsellä ei tartu");
            a.Teko(KappeliTeko.SammutaAlttari);
            Oleta.Tosi(a.SaumatNakyvat && a.Vaihe == 7, $"sammutettu: saumat näkyvät (vaihe {a.Vaihe})");
            a.Teko(KappeliTeko.OtaKynttila); a.Teko(KappeliTeko.AvaaLuukku);
            Oleta.Tosi(a.Teko(KappeliTeko.LiekkiLuukulle) && !a.OmaPalaa, "luukun edessä liekki sammuu");
            Oleta.Tosi(a.Teko(KappeliTeko.SytytaOma) && a.OmaPalaa, "ikuisesta valosta uudelleen");
        }

        [Testi] static void SatunnaisetTekosarjatEivatJumita()
        {
            var r = new Random(13); var teot = (KappeliTeko[])Enum.GetValues(typeof(KappeliTeko)); int tarkistuksia = 0, valmiita = 0;
            for (int ajo = 0; ajo < 1000; ajo++)
            {
                var a = new KappelinArvoitus(); int vaihe = a.Vaihe;
                for (int n = 0; n < 120; n++)
                {
                    var t = r.Next(8) == 0 ? Odota100 : teot[r.Next(teot.Length)];
                    if (t == Odota100) a.Paivita(r.NextDouble() * 60); else a.Teko(t);
                    Oleta.Tosi(a.Vaihe >= 1 && a.Vaihe <= KappelinArvoitus.Valmis, $"vaihe rajoissa ({a.Vaihe})");
                    if (n % 12 == 11 && ajo % 4 == 0) { Oleta.Tosi(Ratkaistavissa(a, out _), $"ajo {ajo} askel {n}: jumi ({a.Avain()})"); tarkistuksia++; }
                }
                if (a.Vaihe == KappelinArvoitus.Valmis) valmiita++;
                Oleta.Tosi(Ratkaistavissa(a, out _), $"ajo {ajo}: jumi lopussa ({a.Avain()})");
            }
            Console.WriteLine($"      satunnaiset: 1 000 ajoa, {tarkistuksia} välitarkistusta, {valmiita} valmiiksi sattumalta");
        }

        [Testi] static void KappalainenKerranYritystaKohden()
        {
            var a = new KappelinArvoitus();
            foreach (var t in new[] { KappeliTeko.KohtausAlkoi, KappeliTeko.VoutiLahti, KappeliTeko.OviLukittu }) a.Teko(t);
            a.Paivita(KappelinArvoitus.PaluuS - 0.1); Oleta.Tosi(!a.KappalainenTulee, "ei ennen 100 s");
            a.Paivita(0.2); Oleta.Tosi(a.KappalainenTulee && a.KappalainenTulossa, "100 s → kappalainen");
            a.KappalainenTulee = false;
            a.Teko(KappeliTeko.AsetaKynttila); a.Teko(KappeliTeko.Raapaise);
            Oleta.Tosi(!a.KappalainenTulee, "raapaisu käynnin aikana ei tuo uutta");
            a.Teko(KappeliTeko.Kiinni);   // liekki näkyi pääovelle → tallennuspisteeseen, maailma (raapaisut) säilyy
            Oleta.Tosi(!a.KappalainenTulossa && !a.KappalainenKaynyt && a.Pimea && a.Raapaisut == 1, "kiinnijäänti: käynti keskeytyi, raapaisu säilyi");
            a.Teko(KappeliTeko.Raapaise);
            Oleta.Tosi(a.KappalainenTulee, "uusi yritys: raapaisu tuo kappalaisen uudelleen");
            a.KappalainenTulee = false; a.Teko(KappeliTeko.KappalainenLahti);
            a.Paivita(500); a.Teko(KappeliTeko.Raapaise);
            Oleta.Tosi(!a.KappalainenTulee && !a.KappalainenTulossa, "käynnin jälkeen ei enää");
        }

        [Testi] static void HavaintoKynttilatilasta()
        {
            // Sovitin (SeikkailuKynttilat) kertoo tilan: kädessä saumoilla ≤ 0,5 m riittää vaiheeseen 6; alttarikynttilä pimeässä vie saumat.
            var a = new KappelinArvoitus();
            foreach (var t in new[] { KappeliTeko.KohtausAlkoi, KappeliTeko.VoutiLahti, KappeliTeko.OviLukittu }) a.Teko(t);
            a.Tallennettiin = false;
            a.Havaitse(omaPalaa: true, asetettu: false, kasiSaumoilla: true, alttariPalaa: true, luukkuAuki: false);
            Oleta.Tosi(!a.SaumatNakyvat && a.Vaihe == 3, "alttarikynttilä palaa: saumat eivät näy");
            a.Havaitse(true, false, true, false, false);
            Oleta.Tosi(a.SaumatNakyvat && a.Vaihe == 7 && a.Edistyi && a.Tallennettiin, $"kädessä saumoilla: vaihe 7 ({a.Vaihe}), edistys ja tallennus");
            a.Havaitse(true, false, false, false, false);
            Oleta.Tosi(!a.SaumatNakyvat && a.SaumatNahty && a.Vaihe == 7, "käsi pois: saumat nähty, vaihe pysyy");
            Oleta.Tosi(a.Teko(KappeliTeko.KappalainenTuli) && !a.Teko(KappeliTeko.KappalainenTuli), "Unityn paluu (100 s) kerran");
        }

        [Testi] static void LoytoAsettuuItse10s()
        {
            var a = new KappelinArvoitus();
            foreach (var t in Sujuva) { if (t == KappeliTeko.KalkkiAlttarille) break; a.Teko(t); }
            Oleta.Sama(11, a.Vaihe);
            a.Paivita(KappelinArvoitus.AsetusS - 0.1); Oleta.Sama(11, a.Vaihe);
            a.Paivita(0.2); Oleta.Tosi(a.Vaihe == KappelinArvoitus.Valmis && a.Asetuttu, "10 s → Fogg asettaa itse");
        }

        [Testi] static void TallennusJaJatka()
        {
            var a = new KappelinArvoitus();
            for (int i = 0; i < Sujuva.Length - 9; i++) a.Teko(Sujuva[i]);   // kaksi kiveä irti, kolmannessa raapaisu
            Oleta.Tosi(a.Vaihe == 9 && a.KiviaIrti >= 1, $"vaihe 9, kiviä {a.KiviaIrti} + {a.Raapaisut}");
            var t = new SeikkailuTallennus(); a.Kirjoita(t);
            var b = KappelinArvoitus.Lue(SeikkailuTallennus.Lue(t.Kirjoita()));
            Oleta.Sama(a.Avain(), b.Avain());
            Oleta.Sama(a.Vaihe, b.Vaihe);
            Oleta.Sama(a.Vaihe, t.Arvoitus["kappeli"]);
            Oleta.Tosi(Ratkaistavissa(b, out int n), $"jatkosta loppuun ({n} tekoa)");
            Oleta.Sama(1, KappelinArvoitus.Lue(new SeikkailuTallennus()).Vaihe);
        }

        [Testi] static void Jumi180sPuluTaso2Kerran()
        {
            // Pimeässä kappelissa paikallaan 400 s: kappalainen käy 100 s:n kohdalla (vaara 25 s), Pulu tekee tason 2 kerran 180 s:n jälkeen.
            var a = new KappelinArvoitus(); var v = new Vihjeet();
            foreach (var t in new[] { KappeliTeko.KohtausAlkoi, KappeliTeko.VoutiLahti, KappeliTeko.OviLukittu }) a.Teko(t);
            v.UusiHuone(); int annettu = 0; double kaynti = -1; const double dt = 0.1;
            for (double s = 0; s < 400; s += dt)
            {
                a.Paivita(dt);
                if (a.KappalainenTulee) { a.KappalainenTulee = false; kaynti = s; }
                if (a.KappalainenTulossa && s - kaynti >= 25) a.Teko(KappeliTeko.KappalainenLahti);
                if (a.Edistyi) { a.Edistyi = false; v.Edistys(); }
                if (v.Paivita(dt, a.KappalainenTulossa, false) == 2) { annettu++; Oleta.Tosi(s >= Vihjeet.JumiS - 0.2 && !a.KappalainenTulossa, $"vihje {s:F0} s"); }
            }
            Oleta.Sama(1, annettu);
            Oleta.Sama(3, a.Vaihe);
        }
    }
}
