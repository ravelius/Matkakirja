// Pallon lentoäänet, Soundly-erä 1c (Linssiseppä 10.10.2026; Pelikoodarin pallo-lento-soundly-v1).
using Matkakirja.Linssit.Aanet;

namespace Matkakirja.Linssit.Testit
{
    public static class PalloLentoAanetTestit
    {
        const string Manifesti = "{\"aanet\":[{\"tunnus\":\"poltin-humahdus-01\",\"aani\":\"poltin-humahdus-01.mp3\",\"silmukka\":false,\"kesto_s\":0.91}," +
            "{\"tunnus\":\"poltin-palaa-lahi\",\"aani\":\"poltin-palaa-lahi.mp3\",\"silmukka\":true,\"kesto_s\":20}," +
            "{\"tunnus\":\"kaksitaso-ohilento-01\",\"aani\":\"kaksitaso-ohilento-01.mp3\",\"silmukka\":false}]}";

        [Testi] static void ManifestiJaMikseri()
        {
            var m = PalloLentoAanet.Lue(Manifesti);
            Oleta.Tosi(m.Aanet["poltin-palaa-lahi"].Silmukka && m.Aanet["poltin-palaa-lahi"].Osoite == PalloLentoAanet.Juuri + "poltin-palaa-lahi.mp3", "silmukka ja osoite");
            Oleta.Tosi(PalloLentoAanet.MikseriAani("poltin-humahdus-03").Id == "kori.poltin", "humahdukset samaan ääneen kuin vanha liekki");
            Oleta.Tosi(PalloLentoAanet.MikseriAani("kaksitaso-ohilento-01").Id == null, "kaksitaso ei korin ääni (lento v3)");
            int n = 0; foreach (var _ in PalloLentoAanet.Tunnukset()) n++;
            Oleta.Tosi(n == 6, "ladattavat: 4 humahdusta, palaminen ja keinunta");
            foreach (var t in PalloLentoAanet.Tunnukset())
                Oleta.Tosi(PalloElavaAanet.MikseriAani(t).Id == null && PalloSoundlyAanet.MikseriAani(t).Id == null && PalloKaupunkiAanet.MikseriAani(t).Id == null, "ei päällekkäisiä tunnuksia: " + t);
        }

        [Testi] static void TasotLiekistaJaLiikkeesta()
        {
            Oleta.Tosi(PalloLentoAanet.Palaa(0) == 0 && System.Math.Abs(PalloLentoAanet.Palaa(1) - PalloLentoAanet.PalaaTaso) < 1e-9 && PalloLentoAanet.Palaa(2) == PalloLentoAanet.PalaaTaso, "palaminen liekin mukaan");
            Oleta.Tosi(PalloLentoAanet.KeinuntaKiihtyvyydesta(0.5, 0.25) == 0, "omistaja TF 163: ei jatkuvaa narinaa tasaisessa lennossa");
            double t = PalloLentoAanet.KeinuntaKiihtyvyydesta(10, 0.25);
            Oleta.Tosi(System.Math.Abs(t - PalloLentoAanet.KeinuntaTaso * 0.25) < 1e-9 && t <= 0.25 * 0.6, "keinunta enintään puolet narinan tasosta");
        }
    }
}
