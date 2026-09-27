// Tallennuksen versiopolku (Peli/Pelitila.cs): nykyversio 4, vanhemmat nousevat
// latauksessa, uudempi pysäyttää latauksen omalla poikkeuksellaan (PeliOhjain
// säilyttää tiedoston eikä korvaa sitä).
using System;
using System.Linq;

namespace Matkakirja.Peli.Testit
{
    static class TallennusTestit
    {
        static string Nyky => "\"versio\":" + Pelitila.TallennusVersio;

        static Matka PelattuPeli()
        {
            var m = Matka.UusiPeli(KultaisetApu.Verkko, new Satunnainen(5L), "Fogg", "pariisi", KultaisetApu.Laattamaarat);
            new Kysely(m, KyselyTestit.Data);
            new Kaupat(m).Kulttuuri("pariisi", true);
            m.ValitseKulkutapa(Kulkutapa.Maa);
            m.Heita();
            return m;
        }

        [Testi] static void NykyversioOnKuusiJaAlkaaTallennuksen()
        {
            Oleta.Sama(6, Pelitila.TallennusVersio);
            Oleta.Tosi(PelattuPeli().Tallenna().StartsWith("{" + Nyky + ",", StringComparison.Ordinal), "versio ensimmäisenä");
        }

        [Testi] static void Versio3NouseeNykyversioonSamoinKentin()
        {
            var json = PelattuPeli().Tallenna();
            var v3 = json.Replace(Nyky, "\"versio\":3");
            var l = Matka.Lataa(KultaisetApu.Verkko, v3, KultaisetApu.Laattamaarat);
            Oleta.Sama(3, l.Tila.LuettuVersio, "luettu versio kirjattu");
            Oleta.Sama(json, l.Tallenna(), "seuraava tallennus on nykyversio samoin tiedoin");
        }

        /// <summary>
        /// Oikeat vanhat tallennukset (Kultaiset/vanhat-tallennukset/): kirjoitettu vanhan commitin omalla koodilla
        /// (v3 = TestFlight 1 741352b, v4 = 8630f75) pelaamalla 80 tekoa siemenellä 20260923: kysymys auki,
        /// reitillä ja pitkä peli. Mukana poistuneet kentät (kaksintaistelu, voittaja, tapahtumakortti, botti).
        /// Lataus nykyversioon säilyttää tilan, seuraava tallennus on v5 ja vakaa, ja peli jatkuu.
        /// </summary>
        [Testi] static void VanhatTallennuksetNousevatNykyversioon()
        {
            var juuri = System.IO.Path.Combine(KultaisetApu.Juuri, "Kultaiset", "vanhat-tallennukset");
            int n = 0;
            foreach (var (kansio, versio) in new[] { ("v3-testflight1", 3), ("v4", 4) })
                foreach (var tiedosto in System.IO.Directory.GetFiles(System.IO.Path.Combine(juuri, kansio), "*.json").OrderBy(f => f, StringComparer.Ordinal))
                {
                    var nimi = kansio + "/" + System.IO.Path.GetFileName(tiedosto);
                    var json = System.IO.File.ReadAllText(tiedosto);
                    var vanha = MiniJson.Objekti(MiniJson.Jasenna(json));
                    var vp = MiniJson.Objekti(MiniJson.Taulukko(vanha["pelaajat"])[0]);
                    var m = Matka.Lataa(KultaisetApu.Verkko, json, KultaisetApu.Laattamaarat);
                    var p = m.Tila.Pelaaja;
                    Oleta.Sama(versio, m.Tila.LuettuVersio, nimi);
                    Oleta.Sama((int)MiniJson.Luku(vp, "raha").Value, p.Raha, nimi + " raha");
                    Oleta.Sama(MiniJson.Teksti(vp, "sijainti"), p.Sijainti.Avain, nimi + " sijainti");
                    Oleta.Sama(string.Join(",", MiniJson.Taulukko(vp["kaydyt"]).Cast<string>().OrderBy(x => x, StringComparer.Ordinal)),
                        string.Join(",", p.Kaydyt.OrderBy(x => x, StringComparer.Ordinal)), nimi + " käydyt");
                    Oleta.Sama(MiniJson.Teksti(vanha, "vaihe"), m.Tila.Vaihe.ToString(), nimi + " vaihe");
                    Oleta.Sama((long)MiniJson.Luku(vanha, "arvontoja").Value, m.Satunnainen.Kutsuja, nimi + " arvonnat jatkuvat");
                    Oleta.Sama((int)MiniJson.Luku(vanha, "vuoroLaskuri").Value, m.Tila.VuoroLaskuri, nimi + " vuorot");
                    Oleta.Tosi(m.Laatat.Laatat.Count > 0, nimi + " laatat");
                    Oleta.Tosi(new Kaupat(m).KulttuuriVastattu("pariisi"), nimi + " kaupat-kirjanpito");

                    // Seuraava tallennus on nykyversio ja vakaa.
                    var uusi = m.Tallenna();
                    Oleta.Tosi(uusi.StartsWith("{" + Nyky + ",", StringComparison.Ordinal), nimi + " nykyversio");
                    Oleta.Sama(uusi, Matka.Lataa(KultaisetApu.Verkko, uusi, KultaisetApu.Laattamaarat).Tallenna(), nimi + " vakaa");
                    Oleta.Tosi(!uusi.Contains("kaksintaistelu") && !uusi.Contains("tapahtumakortti") && !uusi.Contains("voittaja"), nimi + " poistuneet kentät pois");

                    // Peli jatkuu: auki jäänyt kysymys vastataan, reitillä heitetään, kaupungissa tutkitaan tai matkataan.
                    var k = new Kysely(m, KyselyTestit.Data);
                    if (m.Tila.Vaihe == Vaihe.Kysymys)
                    {
                        var q = m.Tila.Kysely.Kysymys;
                        var vq = MiniJson.Objekti(MiniJson.Kentta(MiniJson.Objekti(vanha["kysely"]), "kysymys"));
                        Oleta.Sama(MiniJson.Teksti(vq, "kysymys"), q.Kysymys, nimi + " kysymys säilyi");
                        Oleta.Tosi(k.Vastaa(q.Oikea).Ok && k.Sulje().Ok, nimi + " vastaus");
                    }
                    else if (m.Tila.Vaihe == Vaihe.Heitto) Oleta.Tosi(m.Heita().Ok, nimi + " heitto");
                    else Oleta.Tosi(Matkakirja.Natiivi.PeliApu.Vaihtoehdot(m, "lontoo").Count > 0 || p.Sijainti.Kaupunki == "lontoo", nimi + " matka jatkuu");
                    n++;
                }
            Oleta.Sama(6, n, "tallennuksia");
        }

        [Testi] static void UudempiVersioHeittaaOmanPoikkeuksen()
        {
            var uusi = PelattuPeli().Tallenna().Replace(Nyky, "\"versio\":" + (Pelitila.TallennusVersio + 1));
            try
            {
                Matka.Lataa(KultaisetApu.Verkko, uusi);
                throw new Exception("uudempi tallennus latautui");
            }
            catch (UudempiTallennus e) { Oleta.Sama(Pelitila.TallennusVersio + 1, e.Versio); }
        }

        [Testi] static void RosvoPoistettuPaketistaJaTallennuksesta()
        {
            // Rosvolaatat on poistettu pelistä (Raamattu 25.8.2026): paketin robber-määrä ohitetaan.
            var maarat = Laattamaarat.Lue("{\"counts\":{\"star\":7,\"robber\":12,\"mannerAarre\":7,\"empty\":3,\"pieniAarre\":20}}");
            Oleta.Sama("star,mannerAarre,pieniAarre", string.Join(",", maarat.Maarat.Select(m => m.Key)));
            Oleta.Sama("robber,empty", string.Join(",", maarat.Ohitetut));
            try { new Laattamaarat().Lisaa("robber", 1); throw new Exception("robber hyväksyttiin"); }
            catch (ArgumentException) { }

            // Vanha tallennus: auki jäänyt kaksintaistelu ja kääntämätön rosvolaatta.
            var m = PelattuPeli();
            var json = m.Tallenna();
            var kaupunki = m.Laatat.Laatat.First().Key;
            var vanha = json.Replace("\"vaihe\":\"" + m.Tila.Vaihe + "\"", "\"vaihe\":\"Kaksintaistelu\"")
                .Replace("\"polloAarteena\":", "\"kaksintaistelu\":true,\"avoinKaksintaistelu\":{\"q\":\"x\"},\"polloAarteena\":")
                .Replace("[\"" + kaupunki + "\",\"" + m.Laatat.Laatat[kaupunki] + "\"]", "[\"" + kaupunki + "\",\"robber\"]");
            Oleta.Tosi(vanha.Contains("\"robber\"") && vanha.Contains("Kaksintaistelu"), "vanha muoto rakennettu");
            var l = Matka.Lataa(KultaisetApu.Verkko, vanha);
            Oleta.Sama(Vaihe.Toiminta, l.Tila.Vaihe, "kaksintaistelu → Toiminta");
            Oleta.Tosi(!l.LaattaTassa(kaupunki), "rosvolaatta katosi");
            Oleta.Tosi(!l.Tallenna().Contains("aksintaistelu") && !l.Tallenna().Contains("robber"), "ei jälkiä tallennuksessa");
        }

        [Testi] static void PuuttuvaVersioOnRikki()
        {
            var ilman = PelattuPeli().Tallenna().Replace(Nyky + ",", "");
            try
            {
                Pelitila.FromJson(ilman);
                throw new Exception("versioton tallennus latautui");
            }
            catch (UudempiTallennus) { throw new Exception("versioton ei ole uudempi"); }
            catch (FormatException) { }
        }
    }
}
