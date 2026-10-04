// Pulun taulu (web js/linssit/pulu-taulu.js, PR #3590; tests/pulu-taulu.test.mjs): rivit, moodi, askelkone, sijoitus
// ja lähin kohde webin sääntöjen mukaan.
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Linssit.Astronautti;
using Matkakirja.Linssit.Iss;

namespace Matkakirja.Linssit.Testit
{
    public static class PulunTauluTestit
    {
        [Testi] static void RivitKutenWebissa()
        { Matkakirja.Linssit.Iss.IssKyyti.SeurantaKaytossa = true;   // kehittäjän seurantapolku (ISS:n rinnalla pois pelistä 2.10.)
            try {
            var kaikki = PulunTaulu.Rivit(true, true, AstroMoodi.Pallo);
            // Omistaja 4.10.2026 klo 11.40: Maapallo, Astronauttien kuvat, ISS-ohjaamo, Poistu (seuranta vain kehittäjälle).
            Oleta.Sama("pallo kuvat iss-sisalle iss-rinnalla poistu", string.Join(" ", kaikki.Select(r => r.Tunnus)));
            Oleta.Sama("Maapallo|Astronauttien kuvat|ISS-ohjaamo|ISS:n rinnalla|Poistu", string.Join("|", kaikki.Select(r => r.Otsikko)));
            Oleta.Sama("Koko Maa avaruudesta|Valokuvat avaruudesta|Cupolan ikkunasta alas|Asema radallaan|Takaisin karttaan", string.Join("|", kaikki.Select(r => r.Selite)));
            Oleta.Sama("pallo", kaikki.Single(r => r.Aktiivinen).Tunnus);
            // Ilman kyytiä ISS-rivit puuttuvat, ilman kohteita kuvat; Poistu aina viimeisenä eikä koskaan valittuna.
            Oleta.Sama("pallo kuvat poistu", string.Join(" ", PulunTaulu.Rivit(false, true, AstroMoodi.Kuvat).Select(r => r.Tunnus)));
            Oleta.Sama("pallo iss-sisalle iss-rinnalla poistu", string.Join(" ", PulunTaulu.Rivit(true, false, AstroMoodi.Ikkuna).Select(r => r.Tunnus)));
            Oleta.Tosi(PulunTaulu.Rivit(true, true, AstroMoodi.Pallo).Single(r => r.Tunnus == "poistu") is var p && p.Toiminto && !p.Aktiivinen, "poistu");
            Oleta.Sama("iss-sisalle", PulunTaulu.Rivit(true, true, AstroMoodi.Ikkuna).Single(r => r.Aktiivinen).Tunnus);
            // Kyydin säätimet eivät kuulu tauluun (web test: ei Lennä/nopeu/LIVE/sijainti/Kysy riveissä).
            foreach (var r in PulunTaulu.KaikkiRivit)
                foreach (var kielletty in new[] { "Lennä", "nopeu", "LIVE", "sijainti", "Kysy" })
                    Oleta.Tosi(!(r.Otsikko + r.Selite).Contains(kielletty), r.Tunnus + ": " + kielletty);
                    } finally { Matkakirja.Linssit.Iss.IssKyyti.SeurantaKaytossa = false; }
        }

        [Testi] static void NykyinenMoodiKyydinTilasta()
        {
            Oleta.Sama(AstroMoodi.Kuvat, PulunTaulu.Nykyinen(true, KyydinTila.Ikkuna));
            Oleta.Sama(AstroMoodi.Pallo, PulunTaulu.Nykyinen(false, null));
            Oleta.Sama(AstroMoodi.Pallo, PulunTaulu.Nykyinen(false, KyydinTila.Kauko));
            Oleta.Sama(AstroMoodi.Seuranta, PulunTaulu.Nykyinen(false, KyydinTila.Seuranta));
            Oleta.Sama(AstroMoodi.Ikkuna, PulunTaulu.Nykyinen(false, KyydinTila.Ikkuna));
            Oleta.Sama(AstroMoodi.Ikkuna, PulunTaulu.Nykyinen(false, KyydinTila.Kohde)); // ylilento = ikkuna
        }

        [Testi] static void AskelkoneKutenWebissa()
        { Matkakirja.Linssit.Iss.IssKyyti.SeurantaKaytossa = true;   // kehittäjän seurantapolku (ISS:n rinnalla pois pelistä 2.10.)
            try {
            // Pallolta ISS:n sisälle: napautus, odotus siirtymän ajan, toinen napautus, perillä (web: 2 napautaIss-kutsua).
            Oleta.Sama(MoodinAskel.Napauta, PulunTaulu.Askel(AstroMoodi.Ikkuna, false, KyydinTila.Kauko, false));
            Oleta.Sama(MoodinAskel.Odota, PulunTaulu.Askel(AstroMoodi.Ikkuna, false, KyydinTila.Kauko, true));
            Oleta.Sama(MoodinAskel.Napauta, PulunTaulu.Askel(AstroMoodi.Ikkuna, false, KyydinTila.Seuranta, false));
            Oleta.Sama(MoodinAskel.Perilla, PulunTaulu.Askel(AstroMoodi.Ikkuna, false, KyydinTila.Ikkuna, false));
            // Kuvasta minne tahansa ensin kuva kiinni; kuvamoodi on perillä kuvan ollessa auki.
            Oleta.Sama(MoodinAskel.SuljeKuva, PulunTaulu.Askel(AstroMoodi.Pallo, true, KyydinTila.Kauko, false));
            Oleta.Sama(MoodinAskel.Perilla, PulunTaulu.Askel(AstroMoodi.Kuvat, true, KyydinTila.Kauko, false));
            // Pallolle kyydistä: poistu; paluulennon aikana odota.
            Oleta.Sama(MoodinAskel.Poistu, PulunTaulu.Askel(AstroMoodi.Pallo, false, KyydinTila.Ikkuna, false));
            Oleta.Sama(MoodinAskel.Odota, PulunTaulu.Askel(AstroMoodi.Pallo, false, KyydinTila.Kauko, true));
            Oleta.Sama(MoodinAskel.Perilla, PulunTaulu.Askel(AstroMoodi.Pallo, false, KyydinTila.Kauko, false));
            // Kuviin kyydistä ensin pois, pallolta kuva auki.
            Oleta.Sama(MoodinAskel.Poistu, PulunTaulu.Askel(AstroMoodi.Kuvat, false, KyydinTila.Seuranta, false));
            Oleta.Sama(MoodinAskel.AvaaKuva, PulunTaulu.Askel(AstroMoodi.Kuvat, false, KyydinTila.Kauko, false));
            // Ilman kyytiä ISS-moodeihin ei ole tietä.
            Oleta.Sama(MoodinAskel.Ei, PulunTaulu.Askel(AstroMoodi.Seuranta, false, null, false));
            // Ikkunasta tai ylilennolta rinnalle: napautus.
            Oleta.Sama(MoodinAskel.Napauta, PulunTaulu.Askel(AstroMoodi.Seuranta, false, KyydinTila.Kohde, false));
                    } finally { Matkakirja.Linssit.Iss.IssKyyti.SeurantaKaytossa = false; }
        }

        [Testi] static void SijoitusVaistaaIssiaJaPulua()
        {
            // iPhone 393 × 852 pt (webin mallikuva 28.9.): Pulu oikeassa alakulmassa, eleen vara nostaa yläreunaa 90 pt.
            var pulu = new Laatikko(318, 719 - PulunTaulu.PulunEleenVaraPt, 378, 790);
            const float W = 393, H = 852, w = 232, h = 290;
            var ilman = PulunTaulu.Sijoita(pulu, W, H, w, h, new List<Laatikko>());
            Oleta.Sama("ylla", ilman.Nimi);
            Oleta.Sama(W - PulunTaulu.OikeaReuna, ilman.Alue.Oikea);
            Oleta.Tosi(ilman.Alue.Ala <= pulu.Yla - PulunTaulu.RakoPt, "ylla jää Pulun eleen yläpuolelle " + ilman.Alue);
            // ISS ruudun keskellä (avausnäkymä): yläpaikka peittäisi sen → Pulun viereen, alareuna Pulun alareunan tasolla.
            var iss = PulunTaulu.IssAlue(195, 425);
            var vieres = PulunTaulu.Sijoita(pulu, W, H, w, h, new[] { iss });
            Oleta.Sama("vieres", vieres.Nimi);
            Oleta.Tosi(!vieres.Alue.Leikkaa(iss), "ISS vapaana " + vieres.Alue);
            Oleta.Tosi(vieres.Alue.Oikea <= pulu.Vasen - PulunTaulu.RakoPt, "ei Pulun päällä " + vieres.Alue);
            Oleta.Sama(H - 790, vieres.Ala);
            // Mikään ei sovi (ISS molempien päällä): yläpaikka silti.
            var kaikkiPeitossa = PulunTaulu.Sijoita(pulu, W, H, w, h, new[] { new Laatikko(0, 0, W, H) });
            Oleta.Sama("ylla", kaikkiPeitossa.Nimi);
            // Auki olevan taulun yläpaikka ei laske kesken (Pulu laskeutui eleestä).
            var pysyy = PulunTaulu.Sijoita(new Laatikko(318, 719, 378, 790), W, H, w, h, null, "ylla", ilman.Ala);
            Oleta.Sama(ilman.Ala, pysyy.Ala);
        }

        [Testi] static void VaakanaPulunViereenLaskeutuen()
        {
            // Omistaja TF 140 (iPhone vaaka 874 × 402 pt): Pulu oikealla (y 251–315), taulu 300 pt ei mahdu Pulun yläpuolelle eikä
            // Pulun alareunasta ylöspäin linssin ✕:n alle (ylaMin 54) → Pulun viereen, alareuna alempana, koko korkeus näkyvissä.
            const float W = 874, H = 402, w = 232, h = 300;
            var pulu = new Laatikko(700, 251 - PulunTaulu.PulunEleenVaraPt, 750, 315);
            var p = PulunTaulu.Sijoita(pulu, W, H, w, h, new List<Laatikko>(), ylaMin: 54);
            Oleta.Sama("vieres", p.Nimi);
            Oleta.Tosi(p.Alue.Yla >= 54f, "ylaMin:n alla " + p.Alue);
            Oleta.Tosi(H - p.Alue.Ala >= PulunTaulu.AlaMin, "alareuna ruudulla " + p.Alue);
            Oleta.Tosi(p.Alue.Oikea <= pulu.Vasen, "ei Pulun päällä " + p.Alue);
        }

        [Testi] static void CupolassaYlhaallaTaydellaKorkeudella()
        {
            // Laitekuva 1.0.54 (iPhone 402 × 874): Pulu ikkunan takana ruudun keskellä (y ≈ 380–480), lukemarivi ylhäällä → taulu
            // ankkuroidaan ylhäältä (turva-alue 59 + 52) täydellä korkeudella eikä puristu yläreunaan.
            const float W = 402, H = 874, w = 232, h = 300;
            var pulu = new Laatikko(215, 470 - PulunTaulu.PulunEleenVaraPt, 285, 560);
            var p = PulunTaulu.Sijoita(pulu, W, H, w, h, new List<Laatikko>(), ylaMin: 111);
            Oleta.Sama("ylhaalla", p.Nimi);
            Oleta.Sama(111f, p.Alue.Yla);
            Oleta.Sama(h, p.Alue.Ala - p.Alue.Yla);
            Oleta.Tosi(p.Alue.Ala < 470, "ei Pulun päällä (eleen vara saa jäädä alle) " + p.Alue);
            // Normaali kulma-Pulu: entinen yläpaikka ennallaan.
            var kulma = PulunTaulu.Sijoita(new Laatikko(318, 719 - PulunTaulu.PulunEleenVaraPt, 378, 790), 393, 852, 232, 290, new List<Laatikko>(), ylaMin: 67);
            Oleta.Sama("ylla", kulma.Nimi);
        }

        [Testi] static void LahinKohdeIsoympyraaPitkin()
        {
            var kohteet = new List<Havaintokohde>
            {
                new Havaintokohde { Tunnus = "fidzi", Lat = -17.7, Lon = 178.0 },
                new Havaintokohde { Tunnus = "samoa", Lat = -13.8, Lon = -172.1 },
                new Havaintokohde { Tunnus = "etna", Lat = 37.751, Lon = 14.994 },
            };
            // Päivämääräraja: −179,5° on lähempänä Fidžiä (178°) kuin Samoaa (−172°).
            Oleta.Sama("fidzi", PulunTaulu.LahinKohde(kohteet, -17, -179.5).Tunnus);
            Oleta.Sama("etna", PulunTaulu.LahinKohde(kohteet, 41.9, 12.5).Tunnus);
            Oleta.Tosi(PulunTaulu.LahinKohde(kohteet, double.NaN, 0) == null, "katse puuttuu");
        }
    }
}
