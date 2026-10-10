// Lyhyiden kaupunkisilmukoiden korvaajat (Pelikoodari 9.10.2026, kaupunkisilmukat-v1; juna 174).
using Matkakirja.Linssit.Aanet;

namespace Matkakirja.Linssit.Testit
{
    public static class KaupunkiSilmukatTestit
    {
        const string J = "https://media.matkakirja.app/aanet/";

        [Testi] static void KorvattavatOhjautuvat()
        {
            Oleta.Tosi(KaupunkiSilmukat.Korvaajat.Length == 10, "seitsemän silmukkaa + kolme laatukorvaajaa");
            Oleta.Sama(J + "laatu-korvaajat-v1/kanava-liplatus-01.mp3", KaupunkiSilmukat.Osoite(J + "aanimaisema-v2/kanava-01.mp3", J), "kanava");
            Oleta.Sama(J + "silmukat-korjaukset-v1/laituri-02.mp3", KaupunkiSilmukat.Osoite(J + "kaupunkimaisema-v1/laituri-01.mp3", J), "laituri");
            Oleta.Sama(J + "laatu-korvaajat-v1/lapset-puisto-01.mp3", KaupunkiSilmukat.Osoite(J + "kaupunkimaisema-v2/tukholma/lapset.mp3", J), "Tukholman lapset");
            Oleta.Tosi(KaupunkiSilmukat.Osoite(J + "kaupunkimaisema-v2/pariisi/metro.mp3", J) == J + "kaupunkisilmukat-v1/pariisi-metro-02.mp3", "Pariisin metro");
            Oleta.Tosi(KaupunkiSilmukat.Osoite(J + "kaupunkimaisema-v1/raitiovaunu-02.mp3", J) == J + "kaupunkisilmukat-v1/raitiovaunu-03.mp3", "raitiovaunu");
            Oleta.Tosi(KaupunkiSilmukat.Osoite(J + "pariisi-seine-v1/pariisi/kyyhkyt-kujerrus.mp3", J) == J + "kaupunkisilmukat-v1/pariisi-kyyhkyt-02.mp3", "kujerrus");
            Oleta.Tosi(KaupunkiSilmukat.Osoite(J + "elava-kaupunki-v1/lokkiparvi.mp3", J) == J + "kaupunkisilmukat-v1/lokkiparvi-02.mp3", "lokkiparvi");
        }

        [Testi] static void TukholmanOmaMetro()
        {
            // Pelikoodari 9.10.: Tukholmaan oma metrokerros (kaupunkisilmukat-v2), muualla yleinen metro-02; Pariisin v2-metro ennallaan.
            var m = KaupunkiMaisema.Lue(System.IO.File.ReadAllText("kultaiset/kaupunkimaisema-v1.json"), J + "kaupunkimaisema-v1/",
                System.IO.File.ReadAllText("kultaiset/kaupunkimaisema-v2.json"), J + "kaupunkimaisema-v2/", J);
            Oleta.Sama(J + "kaupunkisilmukat-v2/tukholma-metro-02.mp3", m.Url("tukholma", KaupunkiAanimaisema.Metro), "Tukholman metro");
            Oleta.Sama(J + "kaupunkisilmukat-v1/pariisi-metro-02.mp3", KaupunkiSilmukat.Osoite(m.Url("pariisi", KaupunkiAanimaisema.Metro), J), "Pariisin metro");
            Oleta.Sama(J + "kaupunkisilmukat-v1/raitiovaunu-03.mp3", KaupunkiSilmukat.Osoite(m.Url("tukholma", KaupunkiAanimaisema.Raitiovaunu), J), "Tukholman raitiovaunu yleinen");
        }

        [Testi] static void MuutPysyvat()
        {
            foreach (var u in new[] { J + "kaupunkimaisema-v2/pariisi/kahvila.mp3", J + "elava-kaupunki-v1/kyyhkyt-1.mp3", J + "kaupunkimaisema-v2/pariisi/lapset.mp3",
                                      "https://muu.example/aanet/kaupunkimaisema-v1/metro-01.mp3", null, "" })
                Oleta.Tosi(KaupunkiSilmukat.Osoite(u, J) == u, "ennallaan " + u);
        }
    }
}
