// HISTORIAMOOTTORI M-OSA (Siirtoseppä 8.10.2026): pelattavuusmalli 8.2 huoneet 6–10 — naamio, kiipeily, kilpilukko, tiilet.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class MOsaTestit
    {
        static readonly List<(double, double, double)> Reitti = new List<(double, double, double)> { (0, 0, 1.0), (0, 10, 1.0) };

        [Testi] static void NaamioOnKulkulupa()
        {
            var v = new Vartija(Reitti, yaw: 0);
            var s = new VartijanSyote { PelaajaZ = 3, NakolinjaVapaa = true, Valoisuus = 1, Naamio = true, PelaajaVauhti = 1.2 };
            Oleta.Sama(0.0, v.NakoVoima(s));
            s.Hiipii = true; Oleta.Tosi(v.NakoVoima(s) > 0, "kyyry naamiossa herättää epäilyn");
            s.Hiipii = false; s.PelaajaVauhti = 3.2; Oleta.Tosi(v.NakoVoima(s) > 0, "juoksu naamiossa herättää epäilyn");
            s.PelaajaVauhti = 1.2;
            Oleta.Tosi(new Vartija(Reitti, yaw: 0) { Profiili = VartijaProfiili.Kokki }.NakoVoima(s) > 0, "kokki tuntee väkensä");
            Oleta.Sama(0.0, new Vartija(Reitti, yaw: 0) { Profiili = VartijaProfiili.Linnavaki }.NakoVoima(s));
            Oleta.Tosi(VartijaProfiili.Hae("linnavaki") == VartijaProfiili.Linnavaki, "profiili nimellä");
        }

        [Testi] static void ApulainenTunnistaaLahelta()
        {
            var a = new Vartija(Reitti, yaw: 0) { Profiili = VartijaProfiili.Apulainen };
            var kaukana = new VartijanSyote { PelaajaZ = 3, NakolinjaVapaa = true, Valoisuus = 1, Naamio = true, PelaajaVauhti = 1.0 };
            for (int i = 0; i < 50; i++) a.Paivita(0.1, kaukana);
            Oleta.Tosi(!a.Tunnisti && a.Mittari == 0, "3 m:stä ei tunnista");
            var lahella = kaukana; lahella.PelaajaZ = 1.5;
            for (int i = 0; i < 15; i++) a.Paivita(0.1, lahella);
            Oleta.Tosi(!a.Tunnisti, "1,5 s vieressä ei vielä");
            for (int i = 0; i < 6; i++) a.Paivita(0.1, lahella);
            Oleta.Tosi(a.Tunnisti && a.NakoVoima(lahella) > 0, "yli 2 s vieressä tunnistaa");
            a.Paivita(0.1, kaukana);
            Oleta.Tosi(a.Tunnisti, "tunnistettu pysyy naamiossa");
            var riisuttu = kaukana; riisuttu.Naamio = false; a.Paivita(0.1, riisuttu);
            Oleta.Tosi(!a.Tunnisti, "naamio pois: tunnistus nollautuu");
        }

        // 0,05 s:n askelin; n askelta (12 askelta = yksi ote 0,6 s).
        static void Aja(Kiipeily k, double s, int suunta) { int n = (int)Math.Round(s / 0.05); for (int i = 0; i < n; i++) k.Paivita(0.05, suunta); }

        [Testi] static void KiipeilyOtteeltaOtteelle()
        {
            var k = new Kiipeily(10);
            Aja(k, 0.55, 1); Oleta.Tosi(k.Ote == 0 && k.Siirtyy == 1, "0,6 s per ote: kesken");
            Aja(k, 0.05, 1); Oleta.Tosi(k.Ote == 1 && k.Siirtyy == 0, "ote 1");
            Aja(k, 0.3, 1); Aja(k, 0.3, 0); Oleta.Tosi(k.Ote == 2, "aloitettu siirtymä viedään loppuun");
            Aja(k, 1.2, -1); Oleta.Sama(0, k.Ote);
            Aja(k, 0.6, -1); Oleta.Tosi(k.Ote == 0 && k.Siirtyy == 0, "ensimmäiseltä ei taaksepäin");
            Aja(k, 9 * 0.6, 1); Oleta.Sama(9, k.Ote);
            Aja(k, 0.05, 1); Oleta.Tosi(k.Perilla, "viimeiseltä eteen = perillä");
        }

        [Testi] static void PuuskaVaroittaaJaMeneeOhiPaikallaan()
        {
            var k = new Kiipeily(10, new[] { 3 });
            Aja(k, 3 * 0.6, 1); Oleta.Tosi(k.Ote == 3 && k.PuuskaVaroittaa, "puuskan varoitus otteella 3");
            Aja(k, 1.5, 0); Oleta.Tosi(k.Puuska, "varoitus 1,5 s → puuska");
            Aja(k, 2.5, 0); Oleta.Tosi(!k.Puuska && k.Lipsahdukset == 0, "paikallaan puuska menee ohi");
            Aja(k, 1.2, -1); Aja(k, 1.2, 1); Oleta.Tosi(k.Ote == 3 && !k.PuuskaVaroittaa, "puuska kerran per ote");
        }

        [Testi] static void LipsahdusPitaaToinenPudottaaAlkuun()
        {
            var k = new Kiipeily(10, new[] { 3 });
            Aja(k, 3 * 0.6, 1); Aja(k, 1.5, 0);
            k.Paivita(0.05, 1); Oleta.Tosi(k.Lipsahti && k.Lipsahdukset == 1 && k.Ote == 3 && !k.Putosi, "liike puuskassa: lipsahdus, ote pitää");
            Aja(k, 0.45, 1); Oleta.Tosi(!k.Putosi, "toipuminen 0,5 s");
            Aja(k, 0.1, 1); Oleta.Tosi(k.Putosi && k.Himmenee, "toinen liike samassa puuskassa → putoaa");
            Aja(k, 0.4, 0); Oleta.Tosi(k.Ote == 0 && !k.Himmenee && k.Lipsahdukset == 0, "himmennys 0,4 s → alkuun");
            Aja(k, 3 * 0.6, 1); Oleta.Tosi(k.PuuskaVaroittaa, "uusi yritys: puuska uudelleen");
            var p = new Kiipeily(10, new[] { 3 });
            Aja(p, 3 * 0.6, 1); Aja(p, 1.5, 0); p.Paivita(0.05, 1); Aja(p, 2.5, 0);
            Aja(p, 0.6, 1); Oleta.Tosi(p.Ote == 4 && !p.Putosi && p.Lipsahdukset == 0, "puuskan jälkeen jatkuu, lipsahdus nollautui");
        }

        [Testi] static void LyhtyValossaLiikeHavaitaan()
        {
            var k = new Kiipeily(10); k.LyhtyYlla();
            Aja(k, 1.9, 0); Oleta.Tosi(k.LyhtyVaroittaa && !k.LyhtyValaisee, "valopiiri kasvaa 2 s");
            Aja(k, 0.2, 0); Oleta.Tosi(k.LyhtyValaisee, "valo");
            Aja(k, 3.0, 0); Oleta.Tosi(!k.Havaittu, "jähmettynyt ei havaita");
            Aja(k, 1.0, 0); Oleta.Tosi(!k.LyhtyValaisee, "valo ohi 4 s");
            var m = new Kiipeily(10); m.LyhtyYlla(); Aja(m, 2.1, 0); m.Paivita(0.05, 1);
            Oleta.Tosi(m.Havaittu, "liike valossa havaitaan");
        }

        [Testi] static void KilpilukkoJaTiiletJaOvi()
        {
            var l = new Kilpilukko();
            l.Kaanna(1, 40); l.Kaanna(2, 30); Oleta.Sama(KilpiTulos.Kolahdus, l.Kokeile());
            l.Kaanna(2, 22); Oleta.Tosi(l.Kokeile() == KilpiTulos.Auki && l.Auki, "45° ±10° molemmat → auki");
            var t = new Tiilet();
            Oleta.Sama(TiiliTulos.Raapaisu, t.Raavi(0));
            Oleta.Sama(TiiliTulos.Putosi, t.Raavi(0, vetoMs: 0.1));   // ensimmäinen putoaa aina
            t.Raavi(1); Oleta.Sama(TiiliTulos.Komeroon, t.Raavi(1, vetoMs: 0.2));
            t.Paivita(5); t.Raavi(2); Oleta.Tosi(t.Raavi(2, vetoMs: 0.8) == TiiliTulos.Putosi && t.Kurkistaa, "nopea veto putoaa; toinen 10 s:ssa → kurkistus");
            var ovi = new[] { "avainrengas" };
            Oleta.Sama(OviTulos.Lukossa, LukittuOvi.Avaa(true, "avainrengas", new string[0], false));
            Oleta.Sama(OviTulos.AukiHiljaa, LukittuOvi.Avaa(true, "avainrengas", ovi, false));
            Oleta.Sama(OviTulos.AukiNarahtaa, LukittuOvi.Avaa(true, "avainrengas", ovi, true));
            Oleta.Sama(OviTulos.AukiHiljaa, LukittuOvi.Avaa(false, null, null, false));
        }

        [Testi] static void OteRanteestaIrtipaasy()
        {
            // Huone 6: vouti tarttuu ranteeseen (OtaKiinni) → irtipääsyn ikkuna 1 s kuten jahdin jälkeen.
            var v = new Vartija(Reitti, yaw: 0) { Profiili = VartijaProfiili.Linnavaki };
            v.OtaKiinni();
            Oleta.Sama(VartijanTila.Kiinni, v.Tila);
            Oleta.Tosi(v.Irrottaudu() && v.Tila == VartijanTila.Halytys, "irtipääsy ikkunan aikana");
            var w = new Vartija(Reitti, yaw: 0); w.OtaKiinni(); w.Paivita(1.2, new VartijanSyote());
            Oleta.Tosi(!w.Irrottaudu(), "ikkuna 1 s ohi: ei irtipääsyä");
        }

        [Testi] static void UppoutunutJaKorkeus()
        {
            // Huone 8: järvelle katsova (uppoutunut) ei aisti selän takana alle 2 m:n päässä; tavallinen aistii.
            var takana = new VartijanSyote { PelaajaZ = -1.0, NakolinjaVapaa = true, Valoisuus = 0.63, Hiipii = true, PelaajaVauhti = 0.5 };
            Oleta.Tosi(new Vartija(Reitti, yaw: 0).NakoVoima(takana) > 0, "tavallinen aistii selän takaa alle 2 m");
            Oleta.Sama(0.0, new Vartija(Reitti, yaw: 0) { Uppoutunut = true }.NakoVoima(takana));
            // Kuulo: yli 2,5 m:n korkeusero puolittaa kuuluvuuden.
            var a = new Aanilahde(0, 0, 6, "muurikaytava", 13.4);
            Oleta.Tosi(a.KuuluvuusKorkeudella(16.6) == 3 && a.KuuluvuusKorkeudella(14.0) == 6 && new Aanilahde(0, 0, 6).KuuluvuusKorkeudella(99) == 6, "korkeusraja 2,5 m, ilman korkeutta ennallaan");
        }
    }
}
