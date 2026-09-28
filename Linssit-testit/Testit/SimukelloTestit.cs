// Simuloitu aika (web tests/iss-rata.test.mjs "simuloitu kello"): nopeutus, Palaa LIVE pehmeästi, kelaus hetkeen ~1000×,
// vähennetty liike heti, testikellon siirto ja nopeus yhdessä sekä IssNyt.Kello simuloidusta ajasta.
using System;
using Matkakirja.Linssit.Iss;

namespace Matkakirja.Linssit.Testit
{
    public static class SimukelloTestit
    {
        static readonly DateTime Alku = new DateTime(2026, 9, 28, 9, 0, 0, DateTimeKind.Utc);

        [Testi] static void NopeutusPalaaLiveJaKelausHetkeen()
        {
            Oleta.Sama("1 10 100 1000", string.Join(" ", Simukello.Nopeudet), "logaritminen porras");
            var r = Alku;
            var k = new Simukello(() => r);
            Oleta.Tosi(k.Live, "alussa LIVE");
            Oleta.Sama(r, k.Nyt());
            k.AsetaNopeus(100);
            r = r.AddSeconds(1);
            Oleta.Sama(Alku.AddSeconds(100), k.Nyt(), "100× sekunnissa 100 s");
            Oleta.Tosi(!k.Live, "nopeutettu ei ole LIVE");
            Oleta.Sama(100.0, k.Nopeus());

            // Palaa LIVE: ei hyppyä — ensimmäinen askel on lähellä lähtöä, loppu on todellinen hetki.
            var ennen = k.Nyt();
            int id = k.PalaaLive();
            Oleta.Tosi(id > 0 && k.Kelaa, "kelaus alkoi");
            r = r.AddMilliseconds(16);
            var eka = k.Nyt();
            Oleta.Tosi(Math.Abs((eka - ennen).TotalSeconds) < 1, $"pehmeä alku: {(eka - ennen).TotalMilliseconds:0} ms");
            r = r.AddSeconds(3);
            Oleta.Sama(r, k.Nyt(), "perillä todellinen hetki");
            Oleta.Tosi(k.Live, "perillä LIVE");
            Oleta.Sama(id, k.ValmisId, "kelaus kirjattiin valmiiksi");
            Oleta.Sama(0, k.PalaaLive(), "jo LIVE: ei kelausta");

            // Kelaus hetkeen: 3 h eteenpäin huippu noin 1000×, perillä 1× (ei LIVE).
            var kohde = r.AddHours(3);
            int kid = k.KelaaHetkeen(kohde);
            r = r.AddSeconds(10);   // kesto 1,875 · 10 800 s / 1000 = 20,25 s: puolivälissä huippunopeus
            double huippu = k.Nopeus();
            Oleta.Tosi(huippu > 800 && huippu < 1200, $"huippu {huippu:0}×");
            Oleta.Tosi(k.Kelaa && k.ValmisId != kid, "kesken");
            r = r.AddSeconds(15);
            Oleta.Sama(kohde, k.Nyt(), "perillä hetki");
            Oleta.Sama(kid, k.ValmisId);
            Oleta.Tosi(!k.Live && !k.Kelaa, "perillä 1×, ei LIVE");
            r = r.AddSeconds(1);
            Oleta.Sama(kohde.AddSeconds(1), k.Nyt(), "perillä 1×");

            var v = new Simukello(() => r);
            v.AsetaNopeus(1000);
            r = r.AddSeconds(5);
            v.PalaaLive(vahennetty: true);
            Oleta.Sama(r, v.Nyt(), "vähennetty liike: heti");
            Oleta.Tosi(v.Live);
        }

        [Testi] static void KelausKestoRajoineen()
        {
            var r = Alku;
            var k = new Simukello(() => r);
            k.KelaaHetkeen(r.AddMinutes(10));   // 1,875 · 600 / 1000 = 1,1 s → vähintään 2 s
            r = r.AddSeconds(1.9);
            k.Nyt();
            Oleta.Tosi(k.Kelaa, "2 s:n minimi");
            r = r.AddSeconds(0.2);
            Oleta.Sama(Alku.AddMinutes(10), k.Nyt());
            k.KelaaHetkeen(k.Nyt().AddHours(47));   // 317 s → enintään 25 s
            r = r.AddSeconds(24.9);
            k.Nyt();
            Oleta.Tosi(k.Kelaa, "25 s:n katto");
            r = r.AddSeconds(0.2);
            k.Nyt();
            Oleta.Tosi(!k.Kelaa, "valmis katossa");
        }

        [Testi] static void KeskeytettyKelausEiValmistu()
        {
            var r = Alku;
            var k = new Simukello(() => r);
            int id = k.KelaaHetkeen(r.AddHours(2));
            r = r.AddSeconds(3);
            k.AsetaNopeus(10);   // keskeyttää ylilennon kelauksen
            r = r.AddSeconds(30);
            k.Nyt();
            Oleta.Tosi(k.ValmisId != id, "keskeytetty kelaus ei kirjaudu valmiiksi");
            Oleta.Sama(10.0, k.Kerroin);
            // Palaa LIVE korvaa kelauksen: tavoite liikkuu todellisen kellon mukana.
            int id2 = k.KelaaHetkeen(k.Nyt().AddHours(1));
            r = r.AddSeconds(1);
            int id3 = k.PalaaLive();
            r = r.AddSeconds(5);
            Oleta.Sama(r, k.Nyt());
            Oleta.Tosi(k.ValmisId == id3 && id3 != id2, "vain viimeinen kelaus valmistui");
        }

        [Testi] static void TestikellonSiirtoJaNopeusYhdessa()
        {
            var r = Alku;
            var k = new Simukello(() => r);
            k.AsetaNopeus(1000);
            r = r.AddSeconds(2);
            // Testikello (astro kyyti kello +2): heti uuteen LIVE-hetkeen, nopeus pois.
            k.AsetaSiirto(TimeSpan.FromHours(2));
            Oleta.Tosi(k.Live, "siirto hyppää LIVE:ksi");
            Oleta.Sama(r.AddHours(2), k.Nyt());
            // Nopeutus testikellon hetkestä ja Palaa LIVE siihen.
            k.AsetaNopeus(10);
            r = r.AddSeconds(6);
            Oleta.Sama(r.AddHours(2).AddSeconds(54), k.Nyt(), "10× testikellon hetkestä");
            k.PalaaLive();
            r = r.AddSeconds(4);
            Oleta.Sama(r.AddHours(2), k.Nyt(), "Palaa LIVE palaa testikellon hetkeen");
            k.AsetaSiirto(TimeSpan.Zero);
            Oleta.Sama(r, k.Nyt(), "testikello pois");
        }

        [Testi] static void IssNytKelloLukeeSimukelloa()
        {
            var vanha = IssNyt.Simu;
            try
            {
                var r = Alku;
                IssNyt.Simu = new Simukello(() => r);
                Oleta.Sama(Alku, IssNyt.Kello());
                IssNyt.Simu.AsetaNopeus(100);
                r = r.AddSeconds(3);
                Oleta.Sama(Alku.AddSeconds(300), IssNyt.Kello(), "rata, aurinko ja taivas samasta simuloidusta ajasta");
            }
            finally { IssNyt.Simu = vanha; }
        }
    }
}
