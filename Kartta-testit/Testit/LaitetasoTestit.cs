// LAATUTASO LAITTEEN MUKAAN (omistaja 8.10.2026 19.5x; Natiiviseppä, juna 169): Kartta/Laitetaso.cs — Ultra vain M-sarjan
// iPadeille ja Apple silicon -Maceille, A-sarjan iPadit (myös pääversio ≥ 13) ja iPhonet Mobile, Intel-Mac PC.
using Matkakirja;

namespace Matkakirja.Kartta.Testit
{
    static class LaitetasoTestit
    {
        [Testi]
        static void MSarjanIpaditUltra()
        {
            foreach (var m in new[] { "iPad13,4", "iPad13,11", "iPad13,16", "iPad14,3", "iPad14,6", "iPad14,8", "iPad15,3", "iPad15,6", "iPad16,3", "iPad16,6", "iPad17,1" })
                Oleta.Sama(Laitetaso.Ultra, Laitetaso.Valitse(m, "Apple A?", false), m);
        }

        [Testi]
        static void ASarjanIpaditJaIphonetMobile()
        {
            foreach (var m in new[] { "iPad13,1", "iPad13,18", "iPad14,1", "iPad15,7", "iPad15,8", "iPad16,1", "iPad16,2", "iPad12,1", "iPad8,11",
                                      "iPhone18,1", "iPhone17,1", "iPhone16,1", "x86_64", "arm64", "", null })
                Oleta.Sama(Laitetaso.Mobile, Laitetaso.Valitse(m, "Apple", false), m ?? "null");
        }

        [Testi]
        static void MacProsessorinMukaan()
        {
            Oleta.Sama(Laitetaso.Ultra, Laitetaso.Valitse("MacBookPro18,3", "Apple M1 Pro", true), "M1 Pro, mallitunnus ei kerro piiriä");
            Oleta.Sama(Laitetaso.Ultra, Laitetaso.Valitse("Mac16,1", "Apple M4", true));
            Oleta.Sama(Laitetaso.PC, Laitetaso.Valitse("MacBookPro16,1", "Intel(R) Core(TM) i9-9880H CPU @ 2.30GHz", true), "Intel-Mac");
            Oleta.Sama(Laitetaso.PC, Laitetaso.Valitse("Mac", null, true), "tuntematon prosessori");
        }

        [Testi]
        static void AjallinenUltraJaHuippu()
        {
            Oleta.Tosi(Laitetaso.OnkoAjallinen("iPad14,3", "Apple", false), "M-iPad");
            Oleta.Tosi(Laitetaso.OnkoAjallinen("Mac16,1", "Apple M4", true), "Apple-Mac");
            Oleta.Tosi(Laitetaso.OnkoAjallinen("iPhone17,1", "Apple", false), "iPhone 16 Pro");
            Oleta.Tosi(Laitetaso.OnkoAjallinen("iPhone18,2", "Apple", false), "iPhone 17 Pro Max");
            Oleta.Tosi(!Laitetaso.OnkoAjallinen("iPhone16,1", "Apple", false), "iPhone 15 Pro");
            Oleta.Tosi(!Laitetaso.OnkoAjallinen("iPad15,7", "Apple", false), "iPad A16");
            Oleta.Tosi(!Laitetaso.OnkoAjallinen("MacBookPro16,1", "Intel(R) Core(TM) i9", true), "Intel-Mac");
            Oleta.Tosi(!Laitetaso.OnkoAjallinen(null, null, false), "tuntematon");
        }

        [Testi]
        static void PakotusVainTunnetuille()
        {
            Oleta.Sama("Ultra", Laitetaso.Pakotus("Ultra"));
            Oleta.Sama("Mobile", Laitetaso.Pakotus("Mobile"));
            Oleta.Sama(null, Laitetaso.Pakotus("auto"));
            Oleta.Sama(null, Laitetaso.Pakotus("ultra"), "kirjainkoko ratkaisee (tason nimi QualitySettingsissa)");
        }
    }
}
