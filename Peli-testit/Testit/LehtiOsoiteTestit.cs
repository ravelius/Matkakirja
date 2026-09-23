// Testit: kaupunkilehden osoite (Peli/LehtiOsoite.cs). ./kaanna.sh LehtiOsoite
using System;

namespace Matkakirja.Peli.Testit
{
    public static class LehtiOsoiteTestit
    {
        [Testi] static void OletusPohjaJaTunnus()
        {
            Oleta.Sama("https://matkakirja.app/index.html?lehti=pariisi", LehtiOsoite.Rakenna("pariisi"));
            Oleta.Sama("https://matkakirja.app/index.html?lehti=new-york", LehtiOsoite.Rakenna("new-york", null));
            Oleta.Sama("https://matkakirja.app/index.html?lehti=a1", LehtiOsoite.Rakenna("a1", ""));
        }

        [Testi] static void TunnuksenPituusrajat()
        {
            Oleta.Tosi(!LehtiOsoite.KelpaaTunnukseksi("a"), "1 merkki");
            Oleta.Tosi(LehtiOsoite.KelpaaTunnukseksi("ab"), "2 merkkiä");
            Oleta.Tosi(LehtiOsoite.KelpaaTunnukseksi(new string('x', 40)), "40 merkkiä");
            Oleta.Tosi(!LehtiOsoite.KelpaaTunnukseksi(new string('x', 41)), "41 merkkiä");
        }

        [Testi] static void KelvottomatTunnukset()
        {
            foreach (var t in new[] { null, "", "Pariisi", "pa ris", "pa_ris", "pariisi\n", "\npariisi",
                                      "pa/ris", "pa?x=1", "pa&x", "pa#x", "pä", "../x", "pa%20" })
                Oleta.Tosi(!LehtiOsoite.KelpaaTunnukseksi(t), "hyväksyi: " + (t ?? "null"));
        }

        [Testi] static void KelvotonTunnusEiRakennaOsoitetta()
        {
            Oleta.Tosi(!LehtiOsoite.YritaRakentaa("Pariisi", null, out var osoite, out var virhe));
            Oleta.Sama(null, osoite);
            Oleta.Tosi(virhe.Contains("kaupunkitunnus"), virhe);
            bool heitti = false;
            try { LehtiOsoite.Rakenna("x"); } catch (ArgumentException) { heitti = true; }
            Oleta.Tosi(heitti, "Rakenna ei heittänyt");
        }

        [Testi] static void MuutettuPohja()
        {
            Oleta.Sama("https://esikatselu.example/peli/index.html?koe=1&lehti=kairo",
                LehtiOsoite.Rakenna("kairo", "https://esikatselu.example/peli/index.html?koe=1&lehti="));
            Oleta.Sama("http://localhost:8080/index.html?lehti=kairo",
                LehtiOsoite.Rakenna("kairo", "http://localhost:8080/index.html?lehti="));
            Oleta.Sama("http://127.0.0.1:8080/index.html?lehti=kairo",
                LehtiOsoite.Rakenna("kairo", "http://127.0.0.1:8080/index.html?lehti="));
        }

        [Testi] static void KelvottomatPohjat()
        {
            foreach (var p in new[] {
                "http://matkakirja.app/index.html?lehti=",          // http vain paikallisesti (ATS)
                "https://matkakirja.app/index.html?kaupunki=",      // väärä parametri
                "https://matkakirja.app/index.html",                // ei parametria
                "https://matkakirja.app/index.html#x?lehti=",       // fragmentti
                "file:///tmp/index.html?lehti=",
                "javascript:alert(1)//?lehti=",
                "/index.html?lehti=",                               // suhteellinen
                "https:///index.html?lehti=",                       // ei isäntää
                "https://kayttaja@matkakirja.app/?lehti=",          // käyttäjätieto
                "https://matkakirja.app:abc/?lehti=",               // kelvoton portti
                "https://matka kirja.app/?lehti=",                  // välilyönti isännässä
            })
                Oleta.Tosi(!LehtiOsoite.KelpaaPohjaksi(p), "hyväksyi pohjan: " + p);
            Oleta.Tosi(!LehtiOsoite.YritaRakentaa("kairo", "https://x.example/?q=", out _, out var virhe));
            Oleta.Tosi(virhe.Contains("osoitepohja"), virhe);
        }
        [Testi] static void TilaRisuaitaanKuinWebinBase64url()
        {
            // Odotettu = Node Buffer.from(json, 'utf8').toString('base64url') (verkkopelin lehtikuorenTila purkaa).
            const string json = @"{""raha"":123,""kaupat"":{""kulttuuri"":[""maailmankartta:pariisi""],""julisteet"":[""pariisi""],""pullat"":[""sähke:ä""]}}";
            var o = LehtiOsoite.LisaaTila("https://matkakirja.app/index.html?lehti=pariisi", json);
            Oleta.Sama("https://matkakirja.app/index.html?lehti=pariisi#tila=eyJyYWhhIjoxMjMsImthdXBhdCI6eyJrdWx0dHV1cmkiOlsibWFhaWxtYW5rYXJ0dGE6cGFyaWlzaSJdLCJqdWxpc3RlZXQiOlsicGFyaWlzaSJdLCJwdWxsYXQiOlsic8OkaGtlOsOkIl19fQ", o);
            Oleta.Sama("https://x/?lehti=a#tila=eyJyYWhhIjoxMjMsImthdXBhdCI6eyJrdWx0dHV1cmkiOlsibWFhaWxtYW5rYXJ0dGE6cGFyaWlzaSJdLCJqdWxpc3RlZXQiOlsicGFyaWlzaSJdLCJwdWxsYXQiOlsic8OkaGtlOsOkIl19fQ", LehtiOsoite.LisaaTila("https://x/?lehti=a#vanha", json), "vanha risuaita korvautuu");
            Oleta.Sama("https://x/?lehti=a", LehtiOsoite.LisaaTila("https://x/?lehti=a", null));
        }
        [Testi] static void MaalehtiOsoitteeseen()
        {
            const string p = "https://matkakirja.app/index.html?lehti=rooma";
            Oleta.Sama(p + "&maa=ITA&sivu=ruoka", LehtiOsoite.LisaaMaa(p, "ITA", "ruoka"));
            Oleta.Sama(p + "&maa=ITA", LehtiOsoite.LisaaMaa(p, "ITA", "<x>"), "kelvoton sivu pois");
            Oleta.Sama(p, LehtiOsoite.LisaaMaa(p, "ita"), "vain ISO3 isoilla");
            Oleta.Sama(p + "&maa=ITA#tila=abc", LehtiOsoite.LisaaMaa(p + "#tila=abc", "ITA"), "ennen risuaitaa");
            Oleta.Sama(p + "&maa=ITA#tila=YQ", LehtiOsoite.LisaaTila(LehtiOsoite.LisaaMaa(p, "ITA"), "a"));
        }
    }
}
