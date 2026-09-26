// Löydös 128: kermahunnun sarjan valinta (Kartta/Kermasarja.cs; Varitaso.AsetaVersio, komento "vari sarja").
using System;
using Matkakirja;

namespace Matkakirja.Kartta.Testit
{
    static class KermasarjaTestit
    {
        [Testi]
        static void LyhytNimiSarjaksi()
        {
            Oleta.Sama("2026-09-26-p060", Kermasarja.Oletus, "oletus = omistajan valinta p060 26-pohjasta");
            Oleta.Sama("2026-09-26-p060", Kermasarja.Nimi("p060"));
            Oleta.Sama("2026-09-26-p045", Kermasarja.Nimi("p045"));
            Oleta.Sama(Kermasarja.Oletus, Kermasarja.Nimi("oletus"));
            Oleta.Sama(Kermasarja.Oletus, Kermasarja.Nimi(null));
            Oleta.Sama(Kermasarja.Oletus, Kermasarja.Nimi(" "));
            Oleta.Sama("2026-09-24-23a", Kermasarja.Nimi("/2026-09-24-23a/"), "täysi nimi sellaisenaan");
            Oleta.Sama("p06", Kermasarja.Nimi("p06"), "vain kolme numeroa on lyhyt nimi");
            Oleta.Sama("2026-09-26-", Kermasarja.Etuliite, "etuliite oletussarjan pohjasta (26-pohjaan vaihdettaessa vain Oletus muuttuu)");
        }

        [Testi]
        static void PeittoNimesta()
        {
            Oleta.Tosi(Math.Abs(Kermasarja.Peitto("2026-09-25-p080") - 0.80f) < 1e-6, "p080");
            Oleta.Tosi(Math.Abs(Kermasarja.Peitto("2026-09-25-p060") - 0.60f) < 1e-6, "p060");
            Oleta.Tosi(Math.Abs(Kermasarja.Peitto("2026-09-25-p045") - 0.45f) < 1e-6, "p045");
            Oleta.Tosi(Kermasarja.Peitto("2026-09-24-23a") == Kermasarja.OletusPeitto, "ei päätettä → 0,80");
            Oleta.Tosi(Kermasarja.Peitto("2026-09-25-p999") == Kermasarja.OletusPeitto, "yli 100 → 0,80");
            Oleta.Tosi(Kermasarja.Peitto(null) == Kermasarja.OletusPeitto, "null");
        }
    }
}
