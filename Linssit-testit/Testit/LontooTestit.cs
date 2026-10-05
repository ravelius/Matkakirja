// Lontoo-pilotti (Linssiseppä 5.10.2026): reitin data, ajoitus ja kameran jatkuvuus moottorittomassa lennossa.
using System;
using Matkakirja.Linssit.Lontoo;

namespace Matkakirja.Linssit.Testit
{
    public static class LontooTestit
    {
        [Testi] static void ReittiOnSeitsemanPysahdystaJaTekstit()
        {
            var r = LontooReitti.Pysahdykset;
            Oleta.Sama(7, r.Length);
            foreach (var p in r)
            {
                Oleta.Tosi(!string.IsNullOrEmpty(p.Teksti) && !string.IsNullOrEmpty(p.Nimi), p.Id);
                Oleta.Tosi(p.Kallistus > 50 && p.Kallistus < 85, $"{p.Id} kallistus {p.Kallistus}");
                // Origo reitin keskellä: kaikki kohteet alle 6 km:n päässä (float-tarkkuus Unityssä ~1 mm).
                Oleta.Tosi(LontooLento.EtaisyysM(p.Lat, p.Lon, LontooReitti.OrigoLat, LontooReitti.OrigoLon) < 6000, p.Id);
            }
        }

        [Testi] static void PysahdysKestoTekstinMukaan()
        {
            Oleta.Sama(LontooLento.PysahdysMinS, LontooLento.PysahdysKesto("lyhyt"));
            // 46 sanaa / 2,3 + 2 = 22 s.
            string t = string.Join(" ", new string[46]).Replace(" ", " sana ");
            double k = LontooLento.PysahdysKesto(t);
            Oleta.Tosi(Math.Abs(k - 22) < 0.6, $"kesto {k:F1}");
        }

        [Testi] static void KokoLentoKestaaNoinKolmeJaPuoliMinuuttia()
        {
            var l = new LontooLento(LontooReitti.Pysahdykset);
            double s = l.ArvioituKesto();
            Oleta.Tosi(s > 180 && s < 260, $"arvio {s:F0} s");
        }

        [Testi] static void LentoKulkeeKaikkienPysahdystenKauttaJaPaattyy()
        {
            var l = new LontooLento(LontooReitti.Pysahdykset);
            int saapumisia = 0, viimeinen = -1;
            l.Saapui += i => { saapumisia++; Oleta.Sama(viimeinen + 1, i, "järjestys"); viimeinen = i; };
            var edellinen = l.Asento;
            double t = 0, suurinHyppy = 0;
            while (l.Vaihe != LentoVaihe.Valmis && t < 600)
            {
                l.Paivita(1.0 / 30, laatatValmiit: true);
                t += 1.0 / 30;
                var a = l.Asento;
                double hyppy = LontooLento.EtaisyysM(edellinen.Lat, edellinen.Lon, a.Lat, a.Lon) + Math.Abs(a.EtaisyysM - edellinen.EtaisyysM);
                suurinHyppy = Math.Max(suurinHyppy, hyppy);
                Oleta.Tosi(Math.Abs(LontooLento.Kiedo(a.Suuntima - edellinen.Suuntima)) < 3, $"suuntima hyppää {edellinen.Suuntima:F1} → {a.Suuntima:F1}");
                edellinen = a;
            }
            Oleta.Sama(LentoVaihe.Valmis, l.Vaihe);
            Oleta.Sama(7, saapumisia);
            // 30 fps: kamera liikkuu enintään ~40 m kehyksessä (pisin lento 5,5 km / 15 s, kaari mukana), ei hyppyjä.
            Oleta.Tosi(suurinHyppy < 40, $"suurin hyppy {suurinHyppy:F1} m");
        }

        [Testi] static void OdotusPitaaKunnesLaatatValmiitTaiAikaraja()
        {
            var l = new LontooLento(LontooReitti.Pysahdykset);
            for (int i = 0; i < 60; i++) l.Paivita(0.1, laatatValmiit: false);
            Oleta.Sama(LentoVaihe.Odotus, l.Vaihe, "6 s: alku odottaa yhä");
            l.Paivita(0.1, laatatValmiit: true);
            Oleta.Sama(LentoVaihe.Pysahdys, l.Vaihe);
            // Ohitus vie lentoon, ja lennon jälkeen odotus päättyy aikarajaan ilman laattoja.
            l.Ohita(); l.Paivita(0.01, true);
            Oleta.Sama(LentoVaihe.Lento, l.Vaihe);
            for (int i = 0; i < 200 && l.Vaihe == LentoVaihe.Lento; i++) l.Paivita(0.1, false);
            Oleta.Sama(LentoVaihe.Odotus, l.Vaihe);
            for (int i = 0; i < 100 && l.Vaihe == LentoVaihe.Odotus; i++) l.Paivita(0.1, false);
            Oleta.Sama(LentoVaihe.Pysahdys, l.Vaihe, "aikaraja");
            Oleta.Sama(1, l.Indeksi);
        }

        [Testi] static void AanenKestoVenyttaaPysahdyksen()
        {
            var l = new LontooLento(LontooReitti.Pysahdykset) { AanenKesto = i => 40 };
            l.Paivita(1, true);
            Oleta.Sama(LentoVaihe.Pysahdys, l.Vaihe);
            Oleta.Sama(40.0, l.VaiheKesto);
        }

        [Testi] static void SuuntimaLyhintaTieta()
        {
            var a = new Kuvakulma(0, 0, 100, 70, 170, 0);
            var b = new Kuvakulma(0, 0, 100, 70, -170, 0);
            var m = LontooLento.Valissa(a, b, 0.5, 0);
            Oleta.Tosi(Math.Abs(Math.Abs(m.Suuntima) - 180) < 1e-6, $"keskellä {m.Suuntima}");
        }
    }
}
