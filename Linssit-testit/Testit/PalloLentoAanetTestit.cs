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

        [Testi] static void KeinuntaVainLiikkeenMuutoksessa()
        {
            // Simu 10.10. 02.4x: lennossa kiihtyvyys 1,1–1,5 m/s² vaihdellen ja origon siirrossa 296/374 m/s² → soi enintään yksi aalto.
            var k = new PalloLentoAanet.KeinuntaAallot(); double soi = 0, dt = 0.05;
            for (double t = 0; t < 2; t += dt) k.Paivita(t, 0.2, 0.25);                       // lepo
            for (double t = 2; t < 32; t += dt) { if (k.Paivita(t, 1.3 + 0.2 * System.Math.Sin(t * 3), 0.25) > 0) soi += dt; }
            Oleta.Tosi(soi > 3.5 && soi < 4.6, $"lähdössä yksi {PalloLentoAanet.KeinuntaAaltoS} s:n aalto, ei koko lentoa ({soi:F1} s)");
            var p = new PalloLentoAanet.KeinuntaAallot(); double piikki = 0;
            for (double t = 0; t < 10; t += dt) { if (p.Paivita(t, t > 5 && t < 5.06 ? 374 : 0.3, 0.25) > 0) piikki += dt; }
            Oleta.Tosi(piikki == 0, "origon siirron piikki ei ole liikettä");
        }
    }
}
