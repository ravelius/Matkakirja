// LÖYDÖS S10 (Fablen päätös 26.9.2026): liikkeen laattavalinnan puhtaat päätökset (Kartta/LiikeLaatatPaatos.cs):
// varjokameran pikselikerroin, valinta hystereesillä ja esteillä, komentojen arvot ja liikkeen katto.
using Matkakirja;
using Valinta = Matkakirja.LiikeLaatatPaatos.Valinta;
using Este = Matkakirja.LiikeLaatatPaatos.Este;

namespace Matkakirja.Kartta.Testit
{
    static class LiikeLaatatPaatosTestit
    {
        [Testi]
        static void KerroinOnPohjaJaettunaLiikkeella()
        {
            Oleta.Sama(0.5f, LiikeLaatatPaatos.Kerroin(16f, 32f), "16 → 32 = puolikas pikselikorkeus");
            Oleta.Sama(1f, LiikeLaatatPaatos.Kerroin(16f, 16f), "sama SSE = täysikokoinen varjo");
            Oleta.Sama(1f, LiikeLaatatPaatos.Kerroin(16f, 8f), "liike tarkempi kuin pohja → ei suurenneta");
            Oleta.Sama(0.75f, LiikeLaatatPaatos.Kerroin(24f, 32f), "maasto sse 24 pohjana");
            Oleta.Sama(LiikeLaatatPaatos.MinKerroin, LiikeLaatatPaatos.Kerroin(16f, 1000f), "alaraja");
            Oleta.Sama(1f, LiikeLaatatPaatos.Kerroin(16f, 0f), "pois");
            Oleta.Sama(1f, LiikeLaatatPaatos.Kerroin(float.NaN, 32f), "ei tilesetiä");
        }

        [Testi]
        static void KarkeaLiikeVaihtaaVarjoonHeti()
        {
            Oleta.Sama(Valinta.Varjo, LiikeLaatatPaatos.Seuraava(Valinta.Paa, true, Este.Ei, 10f, 10f));
            Oleta.Sama(Valinta.Varjo, LiikeLaatatPaatos.Seuraava(Valinta.Varjo, true, Este.Ei, 10f, 10f));
        }

        [Testi]
        static void LepoonViiveenJalkeen()
        {
            float v = LiikeLaatatPaatos.LepoViiveS;
            Oleta.Sama(Valinta.Varjo, LiikeLaatatPaatos.Seuraava(Valinta.Varjo, false, Este.Ei, 10f + v * 0.5f, 10f), "hystereesi pitää");
            Oleta.Sama(Valinta.Paa, LiikeLaatatPaatos.Seuraava(Valinta.Varjo, false, Este.Ei, 10f + v, 10f), "viive täynnä");
            Oleta.Sama(Valinta.Paa, LiikeLaatatPaatos.Seuraava(Valinta.Paa, false, Este.Ei, 10f + v * 0.5f, 10f),
                "levossa ei aloiteta varjoa pelkän viiveen takia");
            Oleta.Tosi(v < 0.5f, "lepoviive lyhyempi kuin Ruudunpaivitys.TaysiPitoS 0,5 s");
        }

        [Testi]
        static void EsteVaihtaaPaahanHeti()
        {
            foreach (var e in new[] { Este.Pois, Este.Kamera, Este.Verho, Este.Peitto, Este.Portti, Este.Lento, Este.Saapuminen })
            {
                Oleta.Sama(Valinta.Paa, LiikeLaatatPaatos.Seuraava(Valinta.Varjo, true, e, 10f, 10f), e.ToString());
                Oleta.Sama(Valinta.Paa, LiikeLaatatPaatos.Seuraava(Valinta.Varjo, false, e, 10.1f, 10f), e + " hystereesin aikana");
                Oleta.Tosi(LiikeLaatatPaatos.Nimi(e).Length > 0, "nimi");
            }
        }

        [Testi]
        static void KomentojenArvot()
        {
            Oleta.Sama(0f, LiikeLaatatPaatos.LueSse("pois").Value);
            Oleta.Sama(32f, LiikeLaatatPaatos.LueSse("32").Value);
            Oleta.Sama(16f, LiikeLaatatPaatos.LueSse("16").Value);
            Oleta.Sama(24.5f, LiikeLaatatPaatos.LueSse("24.5").Value);
            Oleta.Tosi(!LiikeLaatatPaatos.LueSse("0").HasValue, "0 ei kelpaa (käytä pois)");
            Oleta.Tosi(!LiikeLaatatPaatos.LueSse("200").HasValue, "yli 128");
            Oleta.Tosi(!LiikeLaatatPaatos.LueSse("x").HasValue, "ei luku");
            Oleta.Sama(60, LiikeLaatatPaatos.LueKatto("60").Value);
            Oleta.Sama(120, LiikeLaatatPaatos.LueKatto("120").Value);
            Oleta.Sama(0, LiikeLaatatPaatos.LueKatto("pois").Value);
            Oleta.Sama(0, LiikeLaatatPaatos.LueKatto("naytto").Value);
            Oleta.Tosi(!LiikeLaatatPaatos.LueKatto("5").HasValue, "alle 20");
        }

        [Testi]
        static void LiikkeenKatto()
        {
            Oleta.Sama(120, LiikeLaatatPaatos.Katto(120, 0), "ei kattoa");
            Oleta.Sama(60, LiikeLaatatPaatos.Katto(120, 60));
            Oleta.Sama(60, LiikeLaatatPaatos.Katto(60, 120), "katto ei nosta yli näytön");
            Oleta.Sama("varjo", LiikeLaatatPaatos.Nimi(Valinta.Varjo));
            Oleta.Sama("paa", LiikeLaatatPaatos.Nimi(Valinta.Paa));
        }
    }
}
