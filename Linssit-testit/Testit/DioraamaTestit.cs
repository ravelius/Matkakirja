// DIORAAMAMOOTTORIN C#-YTIMEN TESTIT (speksi docs/raportit/dioraama-rajapinnat-20260929.md kohdat 4 ja 5).
// Ajuri-kaavalla (kuten muutkin Linssit-testit). Neljä osaa:
//  1) DioraamaData/DioraamaGlb: jäsennys pienestä käsin kirjoitetusta keittiö-fixturesta ja pienestä testi-glb:stä.
//  2) Kameraliike/Heratys/Ohjaaja: käsin lasketut yksikkötestit (a = 180 → +Z, tasot aikajanalla, askel+napautus).
//  3) PoikkileikkausLinssi: käsikirjoituksen käynnistyminen saapumisesta, pulun lento, napautus, toistettavuus.
//  4) PARITEETTITESTI (opportunistinen): jos Linssit-testit/kultaiset/dioraama-vektorit.json on olemassa
//     (kopio pelin repon tests/fixtures/dioraama/vektorit.json:sta, tools/dioraama/tee-vektorit.mjs), verrataan
//     C#-kaavoja js/dioraama/{kamera,heratys,ohjaaja}.js:n tallennettuihin tuloksiin 1e-6 toleranssilla.
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using Matkakirja.Linssit.Dioraama;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Testit
{
    public static class DioraamaTestit
    {
        // ═══════════════════════════════════════════════════════════════════
        // Apurit
        // ═══════════════════════════════════════════════════════════════════

        static void Lahella(double odotettu, double saatu, string mita, double tol = 1e-6)
        {
            if (Math.Abs(odotettu - saatu) > tol * Math.Max(1, Math.Abs(odotettu)))
                throw new Exception($"{mita}: odotettu {odotettu:R}, saatu {saatu:R}");
        }

        static void LahellaV3(V3 odotettu, V3 saatu, string mita, double tol = 1e-6)
        {
            Lahella(odotettu.X, saatu.X, mita + ".X", tol);
            Lahella(odotettu.Y, saatu.Y, mita + ".Y", tol);
            Lahella(odotettu.Z, saatu.Z, mita + ".Z", tol);
        }

        static void SamaV3(V3 odotettu, V3 saatu, string mita) => LahellaV3(odotettu, saatu, mita, 1e-9);

        // ═══════════════════════════════════════════════════════════════════
        // 1a) DioraamaData: jäsennys pienestä keittiö-fixturesta
        // ═══════════════════════════════════════════════════════════════════

        const string KeittioFixture = @"{
          ""id"": ""keittio-testi"", ""nimi"": ""Keittiön testilinna"", ""otsikko"": ""Testiotsikko"", ""versio"": 1,
          ""yleiskamera"": {
            ""vaaka"": {""kohde"":[1,0,1],""atsimuutti"":0,""korkeus"":40,""etaisyys"":10,""fov"":50,""aukko"":0.1},
            ""pysty"": {""kohde"":[1,0,1],""atsimuutti"":0,""korkeus"":50,""etaisyys"":14,""fov"":55,""aukko"":0.1}
          },
          ""pulu"": {""laskeutuminen"":[0,0,0]},
          ""taulu"": {""otsikko"":""Linna"",""tila"":""luonnos"",""kohdat"":[{""teksti"":""Ensimmäinen"",""lahde"":""lahde1""}]},
          ""tilat"": [
            {
              ""id"":""keittio"",""nimi"":""Keittiö"",""kohdistettava"":true,
              ""rajat"":{""min"":[0,0,-1],""max"":[2,2.5,1]},
              ""naapurit"":[""kellari""],
              ""kamera"":{""kohde"":[1,1,0],""atsimuutti"":200,""korkeus"":25,""etaisyys"":4,""fov"":45,""aukko"":0.3},
              ""pulu"":{""laskeutuminen"":[1,0,0.5],""taulupuoli"":""vasen""},
              ""taulu"":{""otsikko"":""Keittiö"",""tila"":""luonnos"",""kohdat"":[{""teksti"":""Kohta A"",""lahde"":""l1""},{""teksti"":""Kohta B pidempi teksti"",""lahde"":""l2""}]},
              ""hahmot"":[
                {""id"":""kokki"",""henkilo"":""kokki-1500"",""paikka"":[0.5,0,0.3],""suunta"":90,""peilattu"":false,""silmukka"":""tyo"",""heraa"":1,""reitti"":null,
                  ""repliikit"":[{""id"":""kokki-r1"",""teksti"":""Keitto kiehuu."",""aani"":null}],
                  ""reaktio"":{""id"":""kokki-react"",""teksti"":""Kokki hätkähtää."",""aani"":null}},
                {""id"":""apulainen"",""henkilo"":""apulainen-1500"",""paikka"":[1.2,0,-0.4],""suunta"":180,""peilattu"":true,""silmukka"":""kavely"",""heraa"":2,
                  ""reitti"":{""pisteet"":[[1.2,0,-0.4],[2.0,0,-0.4]],""nopeus"":0.8,""tauko"":1.0},
                  ""repliikit"":[],""reaktio"":null}
              ],
              ""kasikirjoitus"":[
                {""tee"":""pulu-lenna""},
                {""tee"":""taulu""},
                {""tee"":""kohta"",""n"":0},
                {""tee"":""repliikki"",""hahmo"":""kokki""},
                {""tee"":""odota"",""s"":0.5}
              ],
              ""glb"":{""tiedosto"":""tilat/keittio.glb"",""sha256"":""abc123""}
            },
            {
              ""id"":""kellari"",""nimi"":""Kellari"",""kohdistettava"":true,
              ""rajat"":{""min"":[2,0,-1],""max"":[4,3,1]},
              ""naapurit"":[""keittio""],
              ""kamera"":{""kohde"":[3,1,0],""atsimuutti"":160,""korkeus"":20,""etaisyys"":5,""fov"":42,""aukko"":0.25},
              ""pulu"":{""laskeutuminen"":[3,0,0.5],""taulupuoli"":""oikea""},
              ""taulu"": null,
              ""hahmot"":[],
              ""kasikirjoitus"":[]
            }
          ],
          ""henkilot"": {
            ""kokki-1500"": {""nimi"":""Kokki"",""atlas"":""hahmot/kokki-1500.png"",""ruutu"":[128,192],""sarakkeet"":8,""pivot"":[0.5,0.04],""korkeus_m"":1.72,
              ""silmukat"":{""idle"":{""rivi"":0,""ruudut"":4,""fps"":6},""tyo"":{""rivi"":1,""ruudut"":8,""fps"":10}}},
            ""apulainen-1500"": {""nimi"":""Apulainen"",""atlas"":""hahmot/apulainen-1500.png"",""ruutu"":[128,192],""sarakkeet"":8,""pivot"":[0.5,0.04],""korkeus_m"":1.6,
              ""silmukat"":{""idle"":{""rivi"":0,""ruudut"":4,""fps"":6},""kavely"":{""rivi"":3,""ruudut"":8,""fps"":10}}}
          },
          ""pinnat"": {
            ""kivi"": {""vari"":""#b8ad9c"",""toisto_m"":2.0},
            ""hiillos"": {""vari"":""#d38c41"",""toisto_m"":1.0,""hehku"":1}
          },
          ""aanet"": {
            ""testiaani"": {""tiedosto"":""testi.mp3"",""silmukka"":false,""voimakkuus"":1,""kesto_s"":2.4,""lisenssi"":""testi""}
          }
        }";

        [Testi] static void JasennysKeittioFixturesta()
        {
            var r = DioraamaData.Lue(KeittioFixture);
            Oleta.Sama("keittio-testi", r.Id);
            Oleta.Sama("Keittiön testilinna", r.Nimi);
            Oleta.Sama("Testiotsikko", r.Otsikko);
            Oleta.Sama(1, r.Versio);
            Oleta.Sama(0.0, r.YleisVaaka.Atsimuutti);
            Oleta.Sama(40.0, r.YleisVaaka.Korkeus);
            Oleta.Sama(50.0, r.YleisPysty.Korkeus);
            SamaV3(new V3(0, 0, 0), r.PuluLaskeutuminen, "Rakennus.PuluLaskeutuminen");
            Oleta.Sama("Linna", r.Taulu.Otsikko);
            Oleta.Sama(1, r.Taulu.Kohdat.Count);
            Oleta.Sama("Ensimmäinen", r.Taulu.Kohdat[0].Teksti);
            Oleta.Sama(2, r.Tilat.Count);

            var keittio = r.Tila("keittio");
            Oleta.Tosi(keittio != null, "keittio löytyy");
            Oleta.Tosi(keittio.Kohdistettava, "keittio kohdistettava");
            SamaV3(new V3(0, 0, -1), keittio.RajaMin, "RajaMin");
            SamaV3(new V3(2, 2.5, 1), keittio.RajaMax, "RajaMax");
            Oleta.Sama(1, keittio.Naapurit.Count);
            Oleta.Sama("kellari", keittio.Naapurit[0]);
            Oleta.Sama(200.0, keittio.Kamera.Atsimuutti);
            SamaV3(new V3(1, 0, 0.5), keittio.PuluLaskeutuminen, "keittio.PuluLaskeutuminen");
            Oleta.Sama("vasen", keittio.Taulupuoli);
            Oleta.Sama(2, keittio.Taulu.Kohdat.Count);
            Oleta.Sama("tilat/keittio.glb", keittio.GlbTiedosto);
            Oleta.Sama("abc123", keittio.GlbSha256);

            Oleta.Sama(2, keittio.Hahmot.Count);
            var kokki = keittio.Hahmot[0];
            Oleta.Sama("kokki", kokki.Id);
            Oleta.Sama("kokki-1500", kokki.HenkiloId);
            SamaV3(new V3(0.5, 0, 0.3), kokki.Paikka, "kokki.Paikka");
            Oleta.Sama(90.0, kokki.Suunta);
            Oleta.Tosi(!kokki.Peilattu, "kokki ei peilattu");
            Oleta.Sama("tyo", kokki.Silmukka);
            Oleta.Sama(1, kokki.Heraa);
            Oleta.Tosi(kokki.Reitti == null, "kokilla ei reittiä");
            Oleta.Sama(1, kokki.Repliikit.Count);
            Oleta.Sama("Keitto kiehuu.", kokki.Repliikit[0].Teksti);
            Oleta.Sama("Kokki hätkähtää.", kokki.Reaktio.Teksti);

            var apulainen = keittio.Hahmot[1];
            Oleta.Tosi(apulainen.Peilattu, "apulainen peilattu");
            Oleta.Tosi(apulainen.Reitti != null, "apulaisella reitti");
            Oleta.Sama(2, apulainen.Reitti.Pisteet.Count);
            Oleta.Sama(0.8, apulainen.Reitti.Nopeus);
            Oleta.Sama(1.0, apulainen.Reitti.Tauko);
            Oleta.Sama(0, apulainen.Repliikit.Count);
            Oleta.Tosi(apulainen.Reaktio == null, "apulaisella ei reaktiota");

            Oleta.Sama(5, keittio.Kasikirjoitus.Count);
            Oleta.Sama("pulu-lenna", keittio.Kasikirjoitus[0].Tee);
            Oleta.Sama("kohta", keittio.Kasikirjoitus[2].Tee);
            Oleta.Sama(0, keittio.Kasikirjoitus[2].N);
            Oleta.Sama("repliikki", keittio.Kasikirjoitus[3].Tee);
            Oleta.Sama("kokki", keittio.Kasikirjoitus[3].HahmoId);
            Oleta.Sama("odota", keittio.Kasikirjoitus[4].Tee);
            Oleta.Sama(0.5, keittio.Kasikirjoitus[4].S);

            var kellari = r.Tila("kellari");
            Oleta.Tosi(kellari.Taulu == null, "kellarilla ei taulua");

            Oleta.Sama(2, r.Henkilot.Count);
            var h = r.Henkilot["kokki-1500"];
            Oleta.Sama("Kokki", h.Nimi);
            Oleta.Sama(128, h.RuutuL);
            Oleta.Sama(192, h.RuutuK);
            Oleta.Sama(8, h.Sarakkeet);
            Oleta.Sama(0.5, h.PivotX);
            Oleta.Sama(0.04, h.PivotY);
            Oleta.Sama(1.72, h.KorkeusM);
            Oleta.Sama(1, h.Silmukat["tyo"].Rivi);
            Oleta.Sama(8, h.Silmukat["tyo"].Ruudut);
            Oleta.Sama(10, h.Silmukat["tyo"].Fps);

            Oleta.Sama(2, r.Pinnat.Count);
            Oleta.Sama("#b8ad9c", r.Pinnat["kivi"].Vari);
            Oleta.Sama(2.0, r.Pinnat["kivi"].ToistoM);
            Oleta.Sama(0.0, r.Pinnat["kivi"].Hehku);
            Oleta.Sama(1.0, r.Pinnat["hiillos"].Hehku);

            Oleta.Sama(2.4, r.Aanet["testiaani"].KestoS);
            Oleta.Sama("testi.mp3", r.Aanet["testiaani"].Tiedosto);
            Oleta.Tosi(!r.Aanet["testiaani"].Silmukka, "aani ei silmukoi");
            Oleta.Sama("testiaani", r.Aanet["testiaani"].Id);

            // ERA 2 (dioraama-rajapinnat-era2-20260929.md kohta 3): vanha muoto ilman uusia kenttiä jäsentyy
            // ennallaan, uudet kentät jäävät oletusarvoihinsa (0 / tyhjä lista / null).
            Oleta.Sama(2.0, r.Pinnat["kivi"].ToistoU, "numero-toisto: ToistoU = vanha ToistoM");
            Oleta.Sama(2.0, r.Pinnat["kivi"].ToistoV, "numero-toisto: ToistoV = ToistoU");
            Oleta.Tosi(r.Pinnat["kivi"].Tekstuuri == null, "vanhassa muodossa ei tekstuuria");
            Oleta.Sama(0.0, r.Pinnat["kivi"].VirtausU);
            Oleta.Sama(0.0, r.Pinnat["kivi"].VirtausV);
            Oleta.Sama(0.0, h.PxPerM, "maalaamaton henkilö: px_per_m puuttuu lähteestä → 0");
            Oleta.Sama(0, r.Liekit.Count, "vanhassa rakennuksessa ei liekkipankkia");
            Oleta.Sama(0, keittio.Liekit.Count, "vanhassa tilassa ei liekkisijoituksia");
            Oleta.Sama(0, keittio.Aanet.Count, "vanhassa tilassa ei aanet-sijoituksia");
            Oleta.Tosi(r.Taulu.Kohdat[0].Aani == null, "vanhassa kohdassa ei ääntä");
        }

        // ═══════════════════════════════════════════════════════════════════
        // 1b) DioraamaData ERA 2: pinnan numero-/[u,v]-toisto + tekstuuri + virtaus, maalatun henkilön px_per_m,
        //     liekkipankki + tilan liekkisijoitukset, äänipankki (Id) + tilan äänisijoitukset, kohdan ääni.
        // ═══════════════════════════════════════════════════════════════════

        const string UusienKenttienFixture = @"{
          ""taulu"": {""otsikko"":""Linna"",""tila"":""luonnos"",""kohdat"":[{""teksti"":""Ensimmäinen"",""lahde"":""l""}]},
          ""tilat"": [
            {
              ""id"":""tulisali"",""nimi"":""Tulisali"",""kohdistettava"":true,
              ""rajat"":{""min"":[0,0,0],""max"":[1,1,1]},
              ""taulu"":{""otsikko"":""Tulisali"",""tila"":""luonnos"",
                ""kohdat"":[{""teksti"":""Liekki palaa"",""lahde"":""l"",""aani"":""kerronta-1""}]},
              ""hahmot"":[
                {""id"":""kokki"",""henkilo"":""kokki-maalattu"",""paikka"":[0,0,0],""suunta"":0,
                  ""repliikit"":[{""id"":""r1"",""teksti"":""Kuuma!"",""aani"":""kokki-aani-1""}],
                  ""reaktio"":{""id"":""react"",""teksti"":""Au!"",""aani"":""kokki-react-aani""}}
              ],
              ""liekit"":[{""liekki"":""tulisija"",""paikka"":[0.5,0,0.5],""koko"":1.2,""vaihe"":0.25}],
              ""aanet"":[{""aani"":""tulen-rasina"",""voimakkuus"":0.6}]
            }
          ],
          ""henkilot"": {
            ""kokki-maalattu"": {""nimi"":""Kokki"",""atlas"":""hahmot/kokki.png"",""ruutu"":[256,384],""sarakkeet"":8,
              ""pivot"":[0.5,0.039],""korkeus_m"":1.72,""px_per_m"":196,
              ""silmukat"":{""idle"":{""rivi"":0,""ruudut"":8,""fps"":10}}}
          },
          ""pinnat"": {
            ""kivi"": {""vari"":""#b8ad9c"",""toisto_m"":2.0,""tekstuuri"":""pinnat/kivi.jpg""},
            ""leikkaus"": {""vari"":""#d9ceb8"",""toisto_m"":[4.0,1.0]},
            ""vesi"": {""vari"":""#465e68"",""toisto_m"":8.0,""virtaus"":[0.04,0.015]}
          },
          ""liekit"": {
            ""tulisija"": {""ruutu"":[256,256],""sarakkeet"":4,""ruudut"":8,""fps"":12,""koko_m"":[1.1,1.1],
              ""pivot"":[0.5,0.06],""atlas"":""liekit/tulisija.png""}
          },
          ""aanet"": {
            ""tulen-rasina"": {""tiedosto"":""aanet/tulen-rasina.mp3"",""silmukka"":true,""voimakkuus"":0.8,""kesto_s"":12.0},
            ""kokki-aani-1"": {""tiedosto"":""aanet/kokki-1.mp3"",""silmukka"":false,""voimakkuus"":1,""kesto_s"":1.5}
          }
        }";

        [Testi] static void UusienKenttienJasennys()
        {
            var r = DioraamaData.Lue(UusienKenttienFixture);

            // PINNAT: numero- ja [u,v]-toisto (ToistoM säilyy = ToistoU), tekstuuri, virtaus (vain vedellä).
            Oleta.Sama(2.0, r.Pinnat["kivi"].ToistoU);
            Oleta.Sama(2.0, r.Pinnat["kivi"].ToistoV);
            Oleta.Sama(2.0, r.Pinnat["kivi"].ToistoM, "ToistoM säilyy = ToistoU");
            Oleta.Sama("pinnat/kivi.jpg", r.Pinnat["kivi"].Tekstuuri);
            Oleta.Sama(4.0, r.Pinnat["leikkaus"].ToistoU);
            Oleta.Sama(1.0, r.Pinnat["leikkaus"].ToistoV);
            Oleta.Sama(4.0, r.Pinnat["leikkaus"].ToistoM, "ToistoM = ToistoU myös [u,v]-muodossa");
            Oleta.Tosi(r.Pinnat["leikkaus"].Tekstuuri == null, "leikkauksella ei tekstuuria");
            Oleta.Sama(0.04, r.Pinnat["vesi"].VirtausU);
            Oleta.Sama(0.015, r.Pinnat["vesi"].VirtausV);

            // HENKILOT: maalattu px_per_m.
            Oleta.Sama(196.0, r.Henkilot["kokki-maalattu"].PxPerM);

            var tila = r.Tila("tulisali");

            // LIEKIT: pankki (Rakennus.Liekit) + tilan sijoitukset (Tila.Liekit).
            Oleta.Sama(1, r.Liekit.Count);
            var liekki = r.Liekit["tulisija"];
            Oleta.Sama("tulisija", liekki.Id);
            Oleta.Sama("liekit/tulisija.png", liekki.Atlas);
            Oleta.Sama(256, liekki.RuutuL);
            Oleta.Sama(256, liekki.RuutuK);
            Oleta.Sama(4, liekki.Sarakkeet);
            Oleta.Sama(8, liekki.Ruudut);
            Oleta.Sama(12, liekki.Fps);
            Oleta.Sama(1.1, liekki.KokoL);
            Oleta.Sama(1.1, liekki.KokoK);
            Oleta.Sama(0.5, liekki.PivotX);
            Oleta.Sama(0.06, liekki.PivotY);

            Oleta.Sama(1, tila.Liekit.Count);
            Oleta.Sama("tulisija", tila.Liekit[0].LiekkiId);
            SamaV3(new V3(0.5, 0, 0.5), tila.Liekit[0].Paikka, "liekki.Paikka");
            Oleta.Sama(1.2, tila.Liekit[0].Koko);
            Oleta.Sama(0.25, tila.Liekit[0].Vaihe);

            // AANET: pankki (Id-kenttä + uudelleennimetty Aani-luokka), tilan sijoitukset, repliikki/reaktio/
            // kohta-viittaukset (Repliikki.Aani oli jo olemassa; Kohta.Aani on era 2 -lisäys).
            Oleta.Sama("tulen-rasina", r.Aanet["tulen-rasina"].Id);
            Oleta.Sama("aanet/tulen-rasina.mp3", r.Aanet["tulen-rasina"].Tiedosto);
            Oleta.Tosi(r.Aanet["tulen-rasina"].Silmukka, "tulen rasina silmukoi");
            Oleta.Sama(0.8, r.Aanet["tulen-rasina"].Voimakkuus);
            Oleta.Sama(12.0, r.Aanet["tulen-rasina"].KestoS);

            Oleta.Sama(1, tila.Aanet.Count);
            Oleta.Sama("tulen-rasina", tila.Aanet[0].AaniId);
            Oleta.Sama(0.6, tila.Aanet[0].Voimakkuus);

            Oleta.Sama("kerronta-1", tila.Taulu.Kohdat[0].Aani);
            Oleta.Sama("kokki-aani-1", tila.Hahmot[0].Repliikit[0].Aani);
            Oleta.Sama("kokki-react-aani", tila.Hahmot[0].Reaktio.Aani);
        }

        // ═══════════════════════════════════════════════════════════════════
        // 1c) DioraamaGlb: pieni käsin rakennettu glb (1 kolmio, COLOR_0 UBYTE normalized, indeksit uint32)
        // ═══════════════════════════════════════════════════════════════════

        static byte[] TeeGlbTavut(string json, byte[] bin)
        {
            byte[] jsonTavut = System.Text.Encoding.UTF8.GetBytes(json);
            int jsonPad = (4 - jsonTavut.Length % 4) % 4;
            var jsonPadattu = new byte[jsonTavut.Length + jsonPad];
            Array.Copy(jsonTavut, jsonPadattu, jsonTavut.Length);
            for (int i = jsonTavut.Length; i < jsonPadattu.Length; i++) jsonPadattu[i] = 0x20;

            int binPad = (4 - bin.Length % 4) % 4;
            var binPadattu = new byte[bin.Length + binPad];
            Array.Copy(bin, binPadattu, bin.Length);

            var t = new List<byte>();
            t.AddRange(BitConverter.GetBytes((uint)0x46546C67));
            t.AddRange(BitConverter.GetBytes((uint)2));
            t.AddRange(BitConverter.GetBytes((uint)(12 + 8 + jsonPadattu.Length + 8 + binPadattu.Length)));
            t.AddRange(BitConverter.GetBytes((uint)jsonPadattu.Length));
            t.AddRange(BitConverter.GetBytes((uint)0x4E4F534A));
            t.AddRange(jsonPadattu);
            t.AddRange(BitConverter.GetBytes((uint)binPadattu.Length));
            t.AddRange(BitConverter.GetBytes((uint)0x004E4942));
            t.AddRange(binPadattu);
            return t.ToArray();
        }

        static byte[] TestiGlb()
        {
            // Yksi kolmio: POSITION (float VEC3, z ei-nolla jotta unityyn-muunnos on todennettavissa),
            // COLOR_0 (UNSIGNED_BYTE normalized VEC4), indeksit UNSIGNED_INT (5125, kohta 3: "indeksit uint32").
            float[] pos = { 0, 0, 2, 1, 0, 2, 0, 1, 5 };
            byte[] vareja = { 200, 10, 5, 255, 0, 255, 0, 128, 10, 20, 30, 40 };
            uint[] idx = { 0, 1, 2 };

            var bin = new List<byte>();
            foreach (var f in pos) bin.AddRange(BitConverter.GetBytes(f));
            bin.AddRange(vareja);
            foreach (var ix in idx) bin.AddRange(BitConverter.GetBytes(ix));

            string json = @"{
              ""asset"": {""version"":""2.0""},
              ""nodes"": [{""name"":""keittio"",""mesh"":0}],
              ""meshes"": [{""primitives"":[{""attributes"":{""POSITION"":0,""COLOR_0"":1},""indices"":2,""material"":0,""extras"":{""pinta"":""kivi""}}]}],
              ""materials"": [{""name"":""kivi""}],
              ""accessors"": [
                {""bufferView"":0,""componentType"":5126,""count"":3,""type"":""VEC3""},
                {""bufferView"":1,""componentType"":5121,""count"":3,""type"":""VEC4"",""normalized"":true},
                {""bufferView"":2,""componentType"":5125,""count"":3,""type"":""SCALAR""}
              ],
              ""bufferViews"": [
                {""buffer"":0,""byteOffset"":0,""byteLength"":36},
                {""buffer"":0,""byteOffset"":36,""byteLength"":12},
                {""buffer"":0,""byteOffset"":48,""byteLength"":12}
              ],
              ""buffers"": [{""byteLength"":60}]
            }";
            return TeeGlbTavut(json, bin.ToArray());
        }

        [Testi] static void GlbLukijaJasennysJaVarit()
        {
            var malli = DioraamaGlb.Lue(TestiGlb(), unityyn: false);
            Oleta.Sama("keittio", malli.Nimi);
            Oleta.Sama(1, malli.Osat.Count);
            var osa = malli.Osat[0];
            Oleta.Sama("kivi", osa.Pinta);
            Oleta.Sama(9, osa.Paikat.Length);
            Oleta.Sama(2f, osa.Paikat[2]);   // z ei muutu ilman unityyn
            Oleta.Sama(5f, osa.Paikat[8]);
            Oleta.Sama(12, osa.Varit.Length);
            byte[] odotetutVarit = { 200, 10, 5, 255, 0, 255, 0, 128, 10, 20, 30, 40 };
            for (int i = 0; i < odotetutVarit.Length; i++) Oleta.Sama(odotetutVarit[i], osa.Varit[i], "vari[" + i + "]");
            Oleta.Sama(0, osa.Kolmiot[0]); Oleta.Sama(1, osa.Kolmiot[1]); Oleta.Sama(2, osa.Kolmiot[2]);
        }

        [Testi] static void GlbUnityynMuuntaaZnJaKiertosuunnan()
        {
            var malli = DioraamaGlb.Lue(TestiGlb(), unityyn: true);
            var osa = malli.Osat[0];
            Oleta.Sama(-2f, osa.Paikat[2]);
            Oleta.Sama(-2f, osa.Paikat[5]);
            Oleta.Sama(-5f, osa.Paikat[8]);
            // Kiertosuunta käännetty: (i0, i2, i1).
            Oleta.Sama(0, osa.Kolmiot[0]); Oleta.Sama(2, osa.Kolmiot[1]); Oleta.Sama(1, osa.Kolmiot[2]);
            // Värit eivät riipu unityyn-lipusta.
            Oleta.Sama((byte)200, osa.Varit[0]);
            Oleta.Sama((byte)128, osa.Varit[7]);
        }

        // ═══════════════════════════════════════════════════════════════════
        // 1d) DioraamaGlb.Solmut (era 2b, kohta 4, ali-agentti P4b): monisolmuinen glb — 2 solmua
        // (juuri: mesh+TRS+lapsi; lapsi: EI meshiä, vanhempi luetaan juuren "children"-taulukosta).
        // Kattaa: hierarkia/vanhempi-indeksi, TRS-oletukset puuttuvalle rotation/scale-kentälle, ja
        // unityyn-peilaus (translation.z ja rotation (z,w) negatoituvat, scale EI muutu).
        // ═══════════════════════════════════════════════════════════════════

        static byte[] TestiMonisolmuGlb()
        {
            // Sama POSITION/COLOR_0/indeksit-data kuin TestiGlb() — vain nodes/mesh-rakenne eroaa.
            float[] pos = { 0, 0, 2, 1, 0, 2, 0, 1, 5 };
            byte[] vareja = { 200, 10, 5, 255, 0, 255, 0, 128, 10, 20, 30, 40 };
            uint[] idx = { 0, 1, 2 };
            var bin = new List<byte>();
            foreach (var f in pos) bin.AddRange(BitConverter.GetBytes(f));
            bin.AddRange(vareja);
            foreach (var ix in idx) bin.AddRange(BitConverter.GetBytes(ix));

            // juuri: mesh 0, translation [1,2,3], rotation [0.5,0.5,0.5,0.5] (yksikkökvaternio — 0.25×4=1 —
            // 120° kierto akselin (1,1,1)/√3 ympäri), scale [2,1,0.5], lapsi = solmu 1 ("children":[1]).
            // lapsi: EI mesh-kenttää (puhdas nivel), translation [0,-0.3,0.2], rotation/scale PUUTTUU lähteestä
            // (-> lukijan oletus [0,0,0,1] / [1,1,1]).
            string json = @"{
              ""asset"": {""version"":""2.0""},
              ""nodes"": [
                {""name"":""juuri"",""mesh"":0,""translation"":[1,2,3],""rotation"":[0.5,0.5,0.5,0.5],""scale"":[2,1,0.5],""children"":[1]},
                {""name"":""lapsi"",""translation"":[0,-0.3,0.2]}
              ],
              ""meshes"": [{""primitives"":[{""attributes"":{""POSITION"":0,""COLOR_0"":1},""indices"":2,""material"":0,""extras"":{""pinta"":""iho""}}]}],
              ""materials"": [{""name"":""iho"",""pbrMetallicRoughness"":{""baseColorFactor"":[0.2,0.4,0.6,1]}}],
              ""accessors"": [
                {""bufferView"":0,""componentType"":5126,""count"":3,""type"":""VEC3""},
                {""bufferView"":1,""componentType"":5121,""count"":3,""type"":""VEC4"",""normalized"":true},
                {""bufferView"":2,""componentType"":5125,""count"":3,""type"":""SCALAR""}
              ],
              ""bufferViews"": [
                {""buffer"":0,""byteOffset"":0,""byteLength"":36},
                {""buffer"":0,""byteOffset"":36,""byteLength"":12},
                {""buffer"":0,""byteOffset"":48,""byteLength"":12}
              ],
              ""buffers"": [{""byteLength"":60}]
            }";
            return TeeGlbTavut(json, bin.ToArray());
        }

        [Testi] static void MonisolmuGlbHierarkiaJaTrsKanoninen()
        {
            var malli = DioraamaGlb.Lue(TestiMonisolmuGlb(), unityyn: false);
            Oleta.Sama(2, malli.Solmut.Count);
            var juuri = malli.Solmut[0]; var lapsi = malli.Solmut[1];
            Oleta.Sama("juuri", juuri.Nimi); Oleta.Sama(-1, juuri.Vanhempi);
            Oleta.Sama("lapsi", lapsi.Nimi); Oleta.Sama(0, lapsi.Vanhempi);
            Oleta.Sama(1, juuri.Osat.Count, "juurella on mesh -> 1 osa");
            Oleta.Sama(0, lapsi.Osat.Count, "lapsella ei meshiä -> 0 osaa (ei virhe)");

            Lahella(1, juuri.Translation[0], "juuri T.x"); Lahella(2, juuri.Translation[1], "juuri T.y");
            Lahella(3, juuri.Translation[2], "juuri T.z");
            Lahella(0.5, juuri.Rotation[0], "juuri R.x"); Lahella(0.5, juuri.Rotation[1], "juuri R.y");
            Lahella(0.5, juuri.Rotation[2], "juuri R.z"); Lahella(0.5, juuri.Rotation[3], "juuri R.w");
            Lahella(2, juuri.Scale[0], "juuri S.x"); Lahella(1, juuri.Scale[1], "juuri S.y"); Lahella(0.5, juuri.Scale[2], "juuri S.z");

            Lahella(0, lapsi.Translation[0], "lapsi T.x"); Lahella(-0.3, lapsi.Translation[1], "lapsi T.y");
            Lahella(0.2, lapsi.Translation[2], "lapsi T.z");
            Lahella(0, lapsi.Rotation[0], "lapsi R.x (oletus)"); Lahella(0, lapsi.Rotation[1], "lapsi R.y (oletus)");
            Lahella(0, lapsi.Rotation[2], "lapsi R.z (oletus)"); Lahella(1, lapsi.Rotation[3], "lapsi R.w (oletus identiteetti)");
            Lahella(1, lapsi.Scale[0], "lapsi S.x (oletus)"); Lahella(1, lapsi.Scale[1], "lapsi S.y (oletus)");
            Lahella(1, lapsi.Scale[2], "lapsi S.z (oletus)");

            // Vanha yksisolmu-sopimus säilyy MUUTTUMATTOMANA: Nimi/Osat = ensimmäinen solmu, jolla on mesh.
            Oleta.Sama("juuri", malli.Nimi);
            Oleta.Sama(1, malli.Osat.Count);

            // GlbOsa.Vari (era 2b): materiaalin pbrMetallicRoughness.baseColorFactor luetaan sellaisenaan
            // (LINEAARINEN, ei sRGB-muunnosta — glTF-spec ja hahmot3d.mjs:n rakenna aina näin).
            var osa = juuri.Osat[0];
            Lahella(0.2, osa.Vari[0], "osa.Vari.r"); Lahella(0.4, osa.Vari[1], "osa.Vari.g");
            Lahella(0.6, osa.Vari[2], "osa.Vari.b"); Lahella(1, osa.Vari[3], "osa.Vari.a");
        }

        [Testi] static void MonisolmuGlbUnityynPeilaaTranslationJaRotationEiScalea()
        {
            var malli = DioraamaGlb.Lue(TestiMonisolmuGlb(), unityyn: true);
            var juuri = malli.Solmut[0]; var lapsi = malli.Solmut[1];

            Lahella(1, juuri.Translation[0], "juuri T.x sama"); Lahella(2, juuri.Translation[1], "juuri T.y sama");
            Lahella(-3, juuri.Translation[2], "juuri T.z negatoitu");
            Lahella(0.5, juuri.Rotation[0], "juuri R.x sama"); Lahella(0.5, juuri.Rotation[1], "juuri R.y sama");
            Lahella(-0.5, juuri.Rotation[2], "juuri R.z negatoitu"); Lahella(-0.5, juuri.Rotation[3], "juuri R.w negatoitu");
            Lahella(2, juuri.Scale[0], "juuri S.x muuttumaton"); Lahella(1, juuri.Scale[1], "juuri S.y muuttumaton");
            Lahella(0.5, juuri.Scale[2], "juuri S.z muuttumaton");

            Lahella(0, lapsi.Translation[0], "lapsi T.x sama"); Lahella(-0.3, lapsi.Translation[1], "lapsi T.y sama");
            Lahella(-0.2, lapsi.Translation[2], "lapsi T.z negatoitu");
            // Oletusidentiteetti [0,0,0,1] peilattuna -> [0,0,0,-1]: SAMA rotaatio (kvaternio q ≡ -q), ei virhe.
            Lahella(0, lapsi.Rotation[0], "lapsi R.x (oletus, muuttumaton)"); Lahella(0, lapsi.Rotation[1], "lapsi R.y (oletus)");
            Lahella(0, lapsi.Rotation[2], "lapsi R.z (oletus)"); Lahella(-1, lapsi.Rotation[3], "lapsi R.w (identiteetti peilattuna: -1 ≡ +1)");

            // Pyörivä osa (juuren mesh, osat[0]): sama POSITION/kiertosuunta-muunnos kuin ennen — vertaa
            // GlbUnityynMuuntaaZnJaKiertosuunnan-testiin (identtinen lähde-POSITION/indeksit).
            var osa = juuri.Osat[0];
            Oleta.Sama(-2f, osa.Paikat[2]); Oleta.Sama(-2f, osa.Paikat[5]); Oleta.Sama(-5f, osa.Paikat[8]);
            Oleta.Sama(0, osa.Kolmiot[0]); Oleta.Sama(2, osa.Kolmiot[1]); Oleta.Sama(1, osa.Kolmiot[2]);
        }

        // ═══════════════════════════════════════════════════════════════════
        // 2a) Kameraliike: käsin lasketut arvot (a = 180 → +Z)
        // ═══════════════════════════════════════════════════════════════════

        [Testi] static void SmootherstepPaatepisteetJaKeskikohta()
        {
            Oleta.Sama(0.0, Kameraliike.Smootherstep(0));
            Oleta.Sama(1.0, Kameraliike.Smootherstep(1));
            Oleta.Sama(0.5, Kameraliike.Smootherstep(0.5));
            Oleta.Sama(0.0, Kameraliike.Smootherstep(-5), "rajataan alle 0");
            Oleta.Sama(1.0, Kameraliike.Smootherstep(5), "rajataan yli 1");
        }

        [Testi] static void AsentoSijaintiAtsimuutti180OnEtelassa()
        {
            var p = new Asento(new V3(0, 0, 0), atsimuutti: 180, korkeus: 0, etaisyys: 10, fov: 50, aukko: 0);
            var (sijainti, kohde) = Kameraliike.AsentoSijainti(p);
            LahellaV3(new V3(0, 0, 10), sijainti, "a=180,k=0 -> +Z");
            SamaV3(new V3(0, 0, 0), kohde, "kohde kaikuu");

            var yla = new Asento(new V3(1, 2, 3), atsimuutti: 0, korkeus: 90, etaisyys: 5, fov: 50, aukko: 0);
            var (sijaintiYla, _) = Kameraliike.AsentoSijainti(yla);
            LahellaV3(new V3(1, 7, 3), sijaintiYla, "korkeus=90 -> suoraan ylös");

            var pohjoinen = new Asento(new V3(0, 0, 0), atsimuutti: 0, korkeus: 0, etaisyys: 10, fov: 50, aukko: 0);
            var (sijaintiPohjoinen, _) = Kameraliike.AsentoSijainti(pohjoinen);
            LahellaV3(new V3(0, 0, -10), sijaintiPohjoinen, "a=0,k=0 -> -Z (pohjoinen)");
        }

        [Testi] static void SiirtymanKestoRajautuuKattoonJaLattiaan()
        {
            var p0 = new Asento(new V3(0, 0, 0), 0, 10, 5, 45, 0.1);
            var pSama = new Asento(new V3(0, 0, 0), 90, 20, 5, 45, 0.1); // Δ=0 (kohde+etäisyys ennallaan)
            Oleta.Sama(2.0, Kameraliike.SiirtymanKesto(p0, pSama), "lattia 2,0 s");
            var pIso = new Asento(new V3(100, 0, 0), 0, 10, 50, 45, 0.1); // Δ iso
            Oleta.Sama(3.8, Kameraliike.SiirtymanKesto(p0, pIso), "katto 3,8 s");
        }

        [Testi] static void SiirtymaAsentoPaatepisteetTasmaavat()
        {
            var p0 = new Asento(new V3(-3, 0.2, 4), 200, 22, 8, 50, 0.35);
            var p1 = new Asento(new V3(1, 1.5, -2), 260, 12, 5.5, 30, 0.05);
            var a0 = Kameraliike.SiirtymaAsento(p0, p1, 0);
            SamaV3(p0.Kohde, a0.Kohde, "t=0 kohde");
            Lahella(p0.Atsimuutti, a0.Atsimuutti, "t=0 atsimuutti");
            Lahella(p0.Etaisyys, a0.Etaisyys, "t=0 etaisyys (nosto 0 reunalla)");
            var a1 = Kameraliike.SiirtymaAsento(p0, p1, 1);
            SamaV3(p1.Kohde, a1.Kohde, "t=1 kohde");
            Lahella(p1.Atsimuutti, a1.Atsimuutti, "t=1 atsimuutti");
            Lahella(p1.Etaisyys, a1.Etaisyys, "t=1 etaisyys (nosto 0 reunalla)");
        }

        [Testi] static void PelaajanAsentoRajaaPoikkeamat()
        {
            var p = new Asento(new V3(1, 2, 3), 10, 5, 4, 45, 0.1);
            var a = Kameraliike.PelaajanAsento(p, da: 100, dk: -50, zoom: 5);
            Oleta.Sama(30.0, a.Atsimuutti, "da rajattu +20");
            Oleta.Sama(-5.0, a.Korkeus, "dk rajattu -10");
            Oleta.Sama(5.2, a.Etaisyys, "zoom rajattu 1,3");
            var b = Kameraliike.PelaajanAsento(p, da: -100, dk: 50, zoom: 0.1);
            Oleta.Sama(-10.0, b.Atsimuutti, "da rajattu -20");
            Oleta.Sama(15.0, b.Korkeus, "dk rajattu +10");
            Oleta.Sama(3.0, b.Etaisyys, "zoom rajattu 0,75");
        }

        // ─── ERA 2B (agentti P5, dioraama-rajapinnat-era2b-20260929.md kohdat 1 ja 5): kaarilento, RajaaKierto, Leijunta ───

        [Testi] static void SiirtymaAsentoKaariNouseeJaPullistuuKeskella()
        {
            var p0 = new Asento(new V3(0, 0, 0), 0, 0, 5, 45, 0);
            var p1 = new Asento(new V3(10, 0, 0), 0, 0, 5, 45, 0); // |Δkohde|=10
            var reuna0 = Kameraliike.SiirtymaAsento(p0, p1, 0);
            var reuna1 = Kameraliike.SiirtymaAsento(p0, p1, 1);
            Lahella(0.0, reuna0.Korkeus, "t=0: ei nousua"); Lahella(5.0, reuna0.Etaisyys, "t=0: ei pullistumaa");
            Lahella(0.0, reuna1.Korkeus, "t=1: ei nousua"); Lahella(5.0, reuna1.Etaisyys, "t=1: ei pullistumaa");
            double matka01 = 10.0 / 60.0; // ei kyllästy
            var keski = Kameraliike.SiirtymaAsento(p0, p1, 0.5);
            Lahella(12.0 * matka01, keski.Korkeus, "keski.Korkeus = KaarenNousuMaxAstetta·matka01");
            Lahella(5.0 * (1 + 0.35 * matka01), keski.Etaisyys, "keski.Etaisyys = lerp·(1+0,35·matka01)");

            var p1Kauas = new Asento(new V3(100, 0, 0), 0, 0, 5, 45, 0); // |Δkohde|=100 > 60 -> matka01=1 (kyllästys)
            var kaukoKeski = Kameraliike.SiirtymaAsento(p0, p1Kauas, 0.5);
            Lahella(12.0, kaukoKeski.Korkeus, "matka01=1 -> täysi 12° nousu");
            Lahella(5.0 * 1.35, kaukoKeski.Etaisyys, "matka01=1 -> täysi 0,35-pullistuma");
        }

        [Testi] static void RajaaKiertoEiKiertoKenttaaKayttaaTilaOletusta()
        {
            var perus = new Asento(new V3(0, 0, 0), 200, 25, 4, 45, 0.3);
            var sisalla = Kameraliike.RajaaKierto(perus, new Asento(new V3(0, 0, 0), 220, 30, 4.5, 45, 0.3));
            Oleta.Sama(220.0, sisalla.Atsimuutti, "rajojen sisällä: läpi muuttumattomana");
            Oleta.Sama(30.0, sisalla.Korkeus);
            Oleta.Sama(4.5, sisalla.Etaisyys);
            var ylitys = Kameraliike.RajaaKierto(perus, new Asento(new V3(0, 0, 0), 350, 90, 20, 45, 0.3));
            Oleta.Sama(perus.Atsimuutti + Kierto.OletusTila.AtsimuuttiMax.Value, ylitys.Atsimuutti, "atsimuutti leikkautuu +55:een");
            Oleta.Sama(Kierto.OletusTila.KorkeusMax, ylitys.Korkeus, "korkeus leikkautuu 65:een");
            Oleta.Sama(perus.Etaisyys * Kierto.OletusTila.EtaisyysMax, ylitys.Etaisyys, "etaisyys leikkautuu perus·1,6:een");
        }

        [Testi] static void RajaaKiertoYleisnakymaAtsimuuttiVapaa()
        {
            var perus = new Asento(new V3(0, 0, 0), 180, 35, 8, 50, 0.1);
            var kauas = Kameraliike.RajaaKierto(perus, new Asento(new V3(0, 0, 0), 340, 90, 20, 50, 0.1), yleisnakyma: true);
            Oleta.Sama(340.0, kauas.Atsimuutti, "yleisnäkymä: atsimuutti vapaa (ei rajaa)");
            Oleta.Sama(Kierto.OletusYleis.KorkeusMax, kauas.Korkeus);
            Oleta.Sama(perus.Etaisyys * Kierto.OletusYleis.EtaisyysMax, kauas.Etaisyys);
        }

        [Testi] static void RajaaKiertoOmaKiertoVoittaaOletuksenVaikkaYleisnakymaTosi()
        {
            var oma = new Kierto { AtsimuuttiMin = -10, AtsimuuttiMax = 10, KorkeusMin = 20, KorkeusMax = 30, EtaisyysMin = 0.9, EtaisyysMax = 1.1 };
            var perus = new Asento(new V3(0, 0, 0), 200, 25, 4, 45, 0.3, oma);
            var tulos = Kameraliike.RajaaKierto(perus, new Asento(new V3(0, 0, 0), 230, 5, 10, 45, 0.3), yleisnakyma: true);
            Oleta.Sama(210.0, tulos.Atsimuutti, "perus.Kierto voittaa OLETUS_KIERTO_YLEISin");
            Oleta.Sama(20.0, tulos.Korkeus);
            Oleta.Sama(4.4, tulos.Etaisyys);
        }

        [Testi] static void RajaaKiertoAtsimuuttiEiNormalisoidu360Ylle()
        {
            // perus 350°, pelaaja 430°(≡70°): lyhin ero on +80°, leikkautuu +55:een -> tulos 350+55=405 (ei 45).
            var perus = new Asento(new V3(0, 0, 0), 350, 20, 5, 45, 0.2);
            var tulos = Kameraliike.RajaaKierto(perus, new Asento(new V3(0, 0, 0), 430, 20, 5, 45, 0.2));
            Oleta.Sama(405.0, tulos.Atsimuutti, "ei normalisoida 0..360-välille");
        }

        [Testi] static void LeijuntaJaksollinenMuutKentatEnnallaan()
        {
            var p = new Asento(new V3(1, 2, 3), 200, 25, 4, 45, 0.3);
            var t0 = Kameraliike.Leijunta(p, 0);
            Lahella(200.0, t0.Atsimuutti, "t=0: nollapoikkeama atsimuutille"); Lahella(25.0, t0.Korkeus, "t=0: nollapoikkeama korkeudelle");
            var t6 = Kameraliike.Leijunta(p, 6); // 24/4=6 -> sin(π/2)=1 -> +3°
            Lahella(203.0, t6.Atsimuutti, "t=6: neljännesjakso -> +3°");
            var t24 = Kameraliike.Leijunta(p, 24); // täysi jakso -> takaisin 0:aan
            Lahella(200.0, t24.Atsimuutti, "t=24: täysi jakso -> 0");
            var t31 = Kameraliike.Leijunta(p, 31); // täysi jakso korkeudelle -> takaisin 0:aan
            Lahella(25.0, t31.Korkeus, "t=31: täysi jakso -> 0");
            SamaV3(p.Kohde, t6.Kohde, "kohde koskematta"); Lahella(p.Etaisyys, t6.Etaisyys, "etaisyys koskematta");
            Lahella(p.Fov, t6.Fov, "fov koskematta"); Lahella(p.Aukko, t6.Aukko, "aukko koskematta");
        }

        // ═══════════════════════════════════════════════════════════════════
        // 2b) Heratys: tasot aikajanalla (käsin laskettu 2 tilaa, 1 reittihahmo)
        // ═══════════════════════════════════════════════════════════════════

        static Rakennus PieniRakennus()
        {
            var henkilo = new Henkilo
            {
                Id = "h1", Nimi = "H1",
                Silmukat = new Dictionary<string, Silmukka>
                {
                    ["idle"] = new Silmukka { Rivi = 0, Ruudut = 4, Fps = 4 },
                    ["tyo"] = new Silmukka { Rivi = 1, Ruudut = 6, Fps = 6 },
                },
            };
            var hahmo1 = new Hahmo { Id = "hahmo1", HenkiloId = "h1", Silmukka = "tyo", Reitti = null };
            var hahmoReitti = new Hahmo { Id = "reittihahmo", HenkiloId = "h1", Silmukka = "idle", Reitti = new Reitti { Nopeus = 1, Tauko = 0 } };
            var tilaA = new Tila { Id = "tilaA", Kohdistettava = true, Naapurit = new List<string>(), Hahmot = new List<Hahmo> { hahmo1 } };
            var tilaB = new Tila { Id = "tilaB", Kohdistettava = false, Naapurit = new List<string>(), Hahmot = new List<Hahmo> { hahmoReitti } };
            return new Rakennus { Tilat = new List<Tila> { tilaA, tilaB }, Henkilot = new Dictionary<string, Henkilo> { ["h1"] = henkilo } };
        }

        static readonly List<Kameratapahtuma> PieniAikataulu = new List<Kameratapahtuma>
        {
            new Kameratapahtuma(0, null, 0),
            new Kameratapahtuma(1, "tilaA", 2),
        };

        [Testi] static void TilanTasoLaskeeHetiNouseeViiveella()
        {
            var rak = PieniRakennus();
            var (taso0, alkoi0) = Heratys.TilanTaso(rak, PieniAikataulu, "tilaA", 0);
            Oleta.Sama(1, taso0); Oleta.Sama(0.0, alkoi0);
            var (taso15, alkoi15) = Heratys.TilanTaso(rak, PieniAikataulu, "tilaA", 1.5);
            Oleta.Sama(1, taso15, "NOUSU viivästyy 0,6*kesto=1,2: ei vielä 2 hetkellä 1,5");
            Oleta.Sama(0.0, alkoi15);
            var (taso22, alkoi22) = Heratys.TilanTaso(rak, PieniAikataulu, "tilaA", 2.2);
            Oleta.Sama(2, taso22, "tasan hetki+0,6*kesto=2,2");
            Oleta.Sama(2.2, alkoi22);
        }

        [Testi] static void AanenVoimakkuusLiukuu12SEdellisestaTavoitteesta()
        {
            var rak = PieniRakennus();
            var (t1, a1, e1) = Heratys.TilanTasoJaEdellinen(rak, PieniAikataulu, "tilaA", 1.5);
            Oleta.Sama(1, e1, "ensimmäisen pisteen edellinen = taso itse");
            Lahella(0.25, Heratys.AanenVoimakkuus(t1, a1, e1, 1.5), "ei liukua ensimmäisellä pisteellä");

            var (t2, a2, e2) = Heratys.TilanTasoJaEdellinen(rak, PieniAikataulu, "tilaA", 2.2);
            Oleta.Sama(1, e2, "NOUSUn edellinen taso");
            Lahella(0.25, Heratys.AanenVoimakkuus(t2, a2, e2, 2.2), "liu'un alku = alkuarvo");
            Lahella(0.625, Heratys.AanenVoimakkuus(t2, a2, e2, 2.8), "puolivälissä (0,6/1,2 s)");
            Lahella(1.0, Heratys.AanenVoimakkuus(t2, a2, e2, 3.4), "liu'un jälkeen tavoitteessa");
        }

        [Testi] static void HahmonTilaAnimaatioJaRuutu()
        {
            var rak = PieniRakennus();
            var t15 = Heratys.HahmonTila(rak, PieniAikataulu, "tilaA", 0, 1.5);
            Oleta.Tosi(t15.Naky, "ei-reittihahmo aina näkyvä");
            Oleta.Sama("idle", t15.Silmukka, "taso 1 -> idle");
            Oleta.Sama(3, t15.Ruutu, "floor((1,5-0)*2) mod 4 = 3 (fps/2 ei pyöristetty)");

            var t22 = Heratys.HahmonTila(rak, PieniAikataulu, "tilaA", 0, 2.2);
            Oleta.Sama("tyo", t22.Silmukka, "taso 2 ja t>=herasi -> oma silmukka");
            Oleta.Sama(0, t22.Ruutu);

            var t27 = Heratys.HahmonTila(rak, PieniAikataulu, "tilaA", 0, 2.7);
            Oleta.Sama(3, t27.Ruutu, "floor((2,7-2,2)*6) mod 6 = 3");
        }

        [Testi] static void ReittihahmoNakyyVainTasolla2()
        {
            var rak = PieniRakennus();
            // tilaB ei kohdistettava eikä koskaan kohteena/naapurina: pysyy tasolla 0 koko aikajanan.
            var t0 = Heratys.HahmonTila(rak, PieniAikataulu, "tilaB", 0, 0);
            Oleta.Tosi(!t0.Naky, "reittihahmo piilossa tasolla 0");
            Oleta.Sama(0, t0.Ruutu, "taso 0 pakottaa ruudun 0:aan");
        }

        // ═══════════════════════════════════════════════════════════════════
        // 2c) Ohjaaja: askeleen kesto, käsikirjoitus + napautus, pulun lento
        // ═══════════════════════════════════════════════════════════════════

        [Testi] static void AskeleenKestoKaavatKaikilleTyypeille()
        {
            var henkilo = new Henkilo { Id = "h", Silmukat = new Dictionary<string, Silmukka>() };
            var hahmo = new Hahmo
            {
                Id = "h", HenkiloId = "h",
                Repliikit = new List<Repliikki> { new Repliikki { Teksti = new string('x', 50) } },     // 0,06*50=3,0
                Reaktio = new Repliikki { Teksti = new string('y', 10), Aani = null },                   // 0,06*10=0,6 -> max(2,·)=2
            };
            var taulu = new Taulu { Kohdat = new List<Kohta> { new Kohta { Teksti = new string('z', 10) } } }; // 0,06*10=0,6 -> max(3,·)=3
            var tila = new Tila { Id = "t", Taulu = taulu, Hahmot = new List<Hahmo> { hahmo } };
            var rak = new Rakennus { Tilat = new List<Tila> { tila }, Aanet = new Dictionary<string, Aani> { ["ääni1"] = new Aani { KestoS = 5.0 } } };

            Oleta.Sama(1.8, Ohjaaja.AskeleenKesto(new Askel { Tee = "pulu-lenna" }, tila, rak));
            Oleta.Sama(0.25, Ohjaaja.AskeleenKesto(new Askel { Tee = "taulu" }, tila, rak));
            Oleta.Sama(3.0, Ohjaaja.AskeleenKesto(new Askel { Tee = "kohta", N = 0 }, tila, rak));
            Oleta.Sama(3.0, Ohjaaja.AskeleenKesto(new Askel { Tee = "repliikki", HahmoId = "h" }, tila, rak), "repliikit[0], 0,06*50=3,0");
            Oleta.Sama(2.0, Ohjaaja.AskeleenKesto(new Askel { Tee = "reaktio", HahmoId = "h" }, tila, rak), "max(2; 0,06*10=0,6)");
            Oleta.Sama(0.5, Ohjaaja.AskeleenKesto(new Askel { Tee = "odota", S = 0.5 }, tila, rak));

            hahmo.Reaktio = new Repliikki { Teksti = new string('y', 10), Aani = "ääni1" };
            Oleta.Sama(5.0, Ohjaaja.AskeleenKesto(new Askel { Tee = "reaktio", HahmoId = "h" }, tila, rak), "ääni korvaa tekstipohjaisen keston");
        }

        // era2 (dioraama-rajapinnat-era2-20260929.md kohta 2 "AANET", koordinaattorin lisäys 29.9.):
        // kohta.Aani LISÄÄ tauon (ei korvaa kokonaan, toisin kuin repliikki/reaktio), ja repliikki.N valitsee rivin.
        [Testi] static void AskeleenKestoKohtaAaniLisaaTaukoaEikaKorvaaKokonaan()
        {
            var taulu = new Taulu { Kohdat = new List<Kohta> { new Kohta { Teksti = new string('x', 10), Aani = "k1" } } };
            var tila = new Tila { Id = "t", Taulu = taulu, Hahmot = new List<Hahmo>() };
            var rak = new Rakennus { Tilat = new List<Tila> { tila }, Aanet = new Dictionary<string, Aani> { ["k1"] = new Aani { KestoS = 4.0 } } };
            Oleta.Sama(4.6, Ohjaaja.AskeleenKesto(new Askel { Tee = "kohta", N = 0 }, tila, rak), "kesto_s (4) + 0,6 s tauko");

            // Sama kohta ilman Aania palaa tekstipohjaiseen kaavaan (regressio: ei riko vanhaa muotoa).
            var tauluEiAania = new Taulu { Kohdat = new List<Kohta> { new Kohta { Teksti = new string('x', 10) } } };
            var tilaEiAania = new Tila { Id = "t2", Taulu = tauluEiAania, Hahmot = new List<Hahmo>() };
            Oleta.Sama(3.0, Ohjaaja.AskeleenKesto(new Askel { Tee = "kohta", N = 0 }, tilaEiAania, rak), "ei aania -> tekstipohjainen (regressio)");
        }

        [Testi] static void AskeleenKestoRepliikkiNValitseeRivin()
        {
            var hahmo = new Hahmo
            {
                Id = "h", HenkiloId = "h",
                Repliikit = new List<Repliikki>
                {
                    new Repliikki { Teksti = new string('x', 10) },  // 0,06*10=0,6 -> max(2,·)=2
                    new Repliikki { Teksti = new string('y', 100) }, // 0,06*100=6
                },
                Reaktio = new Repliikki { Teksti = "z" },
            };
            var tila = new Tila { Id = "t", Taulu = new Taulu { Kohdat = new List<Kohta>() }, Hahmot = new List<Hahmo> { hahmo } };
            var rak = new Rakennus { Tilat = new List<Tila> { tila }, Aanet = new Dictionary<string, Aani>() };

            Oleta.Sama(2.0, Ohjaaja.AskeleenKesto(new Askel { Tee = "repliikki", HahmoId = "h" }, tila, rak), "N puuttuu (oletus 0) -> ennallaan");
            Oleta.Sama(2.0, Ohjaaja.AskeleenKesto(new Askel { Tee = "repliikki", HahmoId = "h", N = 0 }, tila, rak), "N=0 eksplisiittisenä");
            Oleta.Sama(6.0, Ohjaaja.AskeleenKesto(new Askel { Tee = "repliikki", HahmoId = "h", N = 1 }, tila, rak), "N=1 -> toinen repliikki");
        }

        [Testi] static void TehosteJaksotJasentyvatJaPuuttuvaOnTyhjaLista()
        {
            const string json = @"{
              ""tilat"": [
                {
                  ""id"":""keittio"",""kohdistettava"":true,""rajat"":{""min"":[0,0,0],""max"":[1,1,1]},
                  ""tehosteet"":[
                    {""aanet"":[""pilkkominen-1"",""pilkkominen-2""],""valit_s"":[4,9]},
                    {""aanet"":[""askel-puu""],""valit_s"":[12,25],""voimakkuus"":0.7}
                  ]
                },
                {""id"":""massa"",""kohdistettava"":false,""rajat"":{""min"":[0,0,0],""max"":[1,1,1]}}
              ]
            }";
            var r = DioraamaData.Lue(json);
            var keittio = r.Tila("keittio");
            Oleta.Sama(2, keittio.Tehosteet.Count);
            Oleta.Sama(2, keittio.Tehosteet[0].AaniIdt.Count);
            Oleta.Sama("pilkkominen-1", keittio.Tehosteet[0].AaniIdt[0]);
            Oleta.Sama("pilkkominen-2", keittio.Tehosteet[0].AaniIdt[1]);
            Oleta.Sama(4.0, keittio.Tehosteet[0].ValiMin);
            Oleta.Sama(9.0, keittio.Tehosteet[0].ValiMax);
            Oleta.Sama(1.0, keittio.Tehosteet[0].Voimakkuus, "voimakkuus puuttuu -> oletus 1");
            Oleta.Sama(1, keittio.Tehosteet[1].AaniIdt.Count);
            Oleta.Sama("askel-puu", keittio.Tehosteet[1].AaniIdt[0]);
            Oleta.Sama(0.7, keittio.Tehosteet[1].Voimakkuus);

            var massa = r.Tila("massa");
            Oleta.Sama(0, massa.Tehosteet.Count, "tehosteet puuttuu JSON:sta -> tyhjä lista");
        }

        [Testi] static void KasikirjoitusHetkellaEteneeJaNapautusKatkaisee()
        {
            var kestot = new double[] { 1, 1, 1 };
            var eiNapautuksia = Array.Empty<double>();
            var a = Ohjaaja.KasikirjoitusHetkella(kestot, eiNapautuksia, 0.5);
            Oleta.Sama(0, a.Indeksi); Oleta.Sama(0.0, a.Alku); Oleta.Sama(0.5, a.Paikallinen); Oleta.Tosi(!a.Valmis);

            var b = Ohjaaja.KasikirjoitusHetkella(kestot, eiNapautuksia, 2.5);
            Oleta.Sama(2, b.Indeksi); Oleta.Sama(2.0, b.Alku); Oleta.Sama(0.5, b.Paikallinen); Oleta.Tosi(!b.Valmis);

            var c = Ohjaaja.KasikirjoitusHetkella(kestot, eiNapautuksia, 3.5);
            Oleta.Sama(2, c.Indeksi, "pysyy viimeisellä askeleella"); Oleta.Sama(1.5, c.Paikallinen); Oleta.Tosi(c.Valmis);

            var napit = new double[] { 0.5 };
            var d = Ohjaaja.KasikirjoitusHetkella(kestot, napit, 0.7);
            Oleta.Sama(1, d.Indeksi, "napautus 0,5 katkaisi askeleen 0"); Oleta.Sama(0.5, d.Alku); Lahella(0.2, d.Paikallinen, "paikallinen (0,7-0,5)");

            var tyhja = Ohjaaja.KasikirjoitusHetkella(Array.Empty<double>(), eiNapautuksia, 3);
            Oleta.Sama(-1, tyhja.Indeksi); Oleta.Tosi(tyhja.Valmis);
        }

        [Testi] static void PuluLentoBezierJaNollamatka()
        {
            var alku = new V3(-5, 0, -3);
            var loppu = new V3(6, 0, 4);
            SamaV3(alku, Ohjaaja.PuluLento(alku, loppu, 0), "t01=0 -> alku");
            SamaV3(loppu, Ohjaaja.PuluLento(alku, loppu, 1), "t01=1 -> loppu");
            var keski = Ohjaaja.PuluLento(alku, loppu, 0.5);
            Oleta.Tosi(keski.Y > 0, "huippu nousee puolivälissä");

            // Nollamatka: huippu = alku + (0,1,0) silti (vakiotermi +1 ei häviä). B(0,5) = 0,25·P0 + 0,5·P1 + 0,25·P2
            // = 0,25·(2,3,4) + 0,5·(2,4,4) + 0,25·(2,3,4) = (2, 3,5, 4) (P0=P2, joten Y-keskiarvo painottuu huippuun).
            var paikallaan = Ohjaaja.PuluLento(new V3(2, 3, 4), new V3(2, 3, 4), 0.5);
            LahellaV3(new V3(2, 3.5, 4), paikallaan, "nollamatka puolivälissä");
        }

        // ═══════════════════════════════════════════════════════════════════
        // 3) PoikkileikkausLinssi: saapuminen, käsikirjoitus, pulu, napautus, toistettavuus
        // ═══════════════════════════════════════════════════════════════════

        [Testi] static void PoikkileikkausAvausJaKohdistaminen()
        {
            var rak = DioraamaData.Lue(KeittioFixture);
            var linssi = new PoikkileikkausLinssi();
            linssi.Avaa(rak, 0);

            var n0 = linssi.NakymaHetkella(0, pysty: false);
            Oleta.Tosi(n0.KohdeTila == null, "alussa yleisnäkymässä");
            Lahella(rak.YleisVaaka.Atsimuutti, n0.Kamera.Atsimuutti, "yleisnäkymän kamera heti");
            // Avauksen käsikirjoitus alkaa AvausViive s:n päästä: ennen sitä Pulu on taivaalla, taulu kiinni.
            SamaV3(rak.PuluLaskeutuminen + PoikkileikkausLinssi.TaivasSiirtyma, n0.Pulu, "pulu taivaalla ennen avausta");
            Oleta.Tosi(!n0.PuluLentaa);
            Oleta.Sama(-1, n0.Kohta);
            Oleta.Tosi(!n0.TauluAuki);

            // Avaus: lento 1,8 s, taulu 0,25 s, sitten linnan kohta 0 (fixturessa yksi kohta).
            var nLento = linssi.NakymaHetkella(PoikkileikkausLinssi.AvausViive + 0.9, pysty: false);
            Oleta.Tosi(nLento.PuluLentaa, "avauksessa pulu liitää linnan pisteeseen");
            var nAvausKohta = linssi.NakymaHetkella(PoikkileikkausLinssi.AvausViive + 1.8 + 0.25 + 0.5, pysty: false);
            Oleta.Tosi(nAvausKohta.TauluAuki, "linnan taulu auki");
            Oleta.Sama(0, nAvausKohta.Kohta);
            Oleta.Sama("pulu", nAvausKohta.Puhuja);
            Oleta.Sama("Ensimmäinen", nAvausKohta.Repliikki);
            SamaV3(rak.PuluLaskeutuminen, nAvausKohta.Pulu, "pulu laskeutunut linnan pisteeseen");

            double kohdistusHetki = 2.0;
            linssi.Kohdista("keittio", kohdistusHetki);
            double kesto = Kameraliike.SiirtymanKesto(rak.YleisVaaka, rak.Tila("keittio").Kamera);

            // Kesken siirtymän: kohde on jo "keittio", mutta käsikirjoitus ei ole vielä alkanut.
            double keskella = kohdistusHetki + kesto / 2;
            var nKesken = linssi.NakymaHetkella(keskella, pysty: false);
            Oleta.Sama("keittio", nKesken.KohdeTila);
            Oleta.Tosi(!nKesken.PuluLentaa, "pulu ei vielä lennä kesken kamera-ajon");
            Oleta.Sama(-1, nKesken.Kohta);
            var odotettuKesken = Kameraliike.SiirtymaAsento(rak.YleisVaaka, rak.Tila("keittio").Kamera, 0.5);
            Lahella(odotettuKesken.Atsimuutti, nKesken.Kamera.Atsimuutti, "kesken siirtymän atsimuutti");

            double saapumisHetki = kohdistusHetki + kesto;

            // Tasan saapuessa: pulu-lenna alkaa, t01=0 -> pulu tarkalleen lähtöpisteessä.
            var nSaapuu = linssi.NakymaHetkella(saapumisHetki, pysty: false);
            Oleta.Tosi(nSaapuu.PuluLentaa, "pulu-lenna käynnissä heti saapuessa");
            SamaV3(rak.PuluLaskeutuminen, nSaapuu.Pulu, "pulu lähtee linnan pisteestä (ei aiempaa vierailtua tilaa)");

            // Pulu-lenna-askeleen (1,8 s) jälkeen: taulu auki, pulu perillä. Pieni marginaali (+0,01) askeleen
            // rajan yli, jotta liukulukujen (A+c)-A ei satu palaamaan tasan rajan alle (ei tarkkaa nollakohtaa).
            var nTaulu = linssi.NakymaHetkella(saapumisHetki + 1.8 + 0.01, pysty: false);
            Oleta.Tosi(nTaulu.TauluAuki, "taulu-askel käynnissä");
            Oleta.Tosi(!nTaulu.PuluLentaa, "pulu on jo perillä");
            SamaV3(rak.Tila("keittio").PuluLaskeutuminen, nTaulu.Pulu, "pulu keittiön laskeutumispisteessä");

            // + taulu (0,25 s): kohta 0.
            var nKohta = linssi.NakymaHetkella(saapumisHetki + 1.8 + 0.25 + 0.01, pysty: false);
            Oleta.Tosi(nKohta.TauluAuki, "taulu pysyy auki kohta-askeleissa");
            Oleta.Sama(0, nKohta.Kohta);

            // Napautus keskellä kohta-askelta (kesto 3,0 s: max(3; 0,06*7)): katkaisee sen aikaisemmin.
            double kohtaAlku = saapumisHetki + 1.8 + 0.25;
            linssi.Napauta(kohtaAlku + 1.0);
            var nNapautuksenJalkeen = linssi.NakymaHetkella(kohtaAlku + 1.5, pysty: false);
            Oleta.Sama(0, nNapautuksenJalkeen.Kohta, "kohta pysyy näkyvissä (viimeisin saavutettu)");
            Oleta.Tosi(nNapautuksenJalkeen.TauluAuki, "taulu pysyy auki repliikin ajan");
        }

        // REGRESSIO (löydös, katselmointi 29.9.2026): Puhe() käytti Repliikit[0]:aa askel.N:stä riippumatta, ja
        // DioraamaAanet tunnisti askeleen vaihtumisen tekstillä. Sama hahmo puhuu tässä kahdesti peräkkäin eri
        // N:llä -- Nakyma.Repliikki/AskeleenAani/Askel on kummallakin askeleella eri.
        [Testi] static void PuheKayttaaAskeleenNJaPerakkaisetAskeletAntavatEriAanen()
        {
            var henkilo = new Henkilo
            {
                Id = "h", Nimi = "H",
                Silmukat = new Dictionary<string, Silmukka> { ["idle"] = new Silmukka { Rivi = 0, Ruudut = 4, Fps = 4 } },
            };
            var hahmo = new Hahmo
            {
                Id = "kokki", HenkiloId = "h", Silmukka = "idle",
                Repliikit = new List<Repliikki>
                {
                    new Repliikki { Id = "r0", Teksti = "Ensimmäinen repliikki.", Aani = "aani-0" },
                    new Repliikki { Id = "r1", Teksti = "Toinen repliikki.", Aani = "aani-1" },
                },
            };
            var tila = new Tila
            {
                Id = "keittio", Nimi = "Keittiö", Kohdistettava = true,
                Kamera = new Asento(new V3(1, 1, 0), 200, 25, 4, 45, 0.3),
                PuluLaskeutuminen = new V3(1, 0, 0.5),
                Taulu = new Taulu(),
                Hahmot = new List<Hahmo> { hahmo },
                Kasikirjoitus = new List<Askel>
                {
                    new Askel { Tee = "pulu-lenna" },
                    new Askel { Tee = "repliikki", HahmoId = "kokki", N = 0 },
                    new Askel { Tee = "repliikki", HahmoId = "kokki", N = 1 },
                },
            };
            var rak = new Rakennus
            {
                YleisVaaka = new Asento(new V3(1, 0, 1), 0, 40, 10, 50, 0.1),
                YleisPysty = new Asento(new V3(1, 0, 1), 0, 50, 14, 55, 0.1),
                PuluLaskeutuminen = new V3(0, 0, 0),
                Taulu = new Taulu(),
                Tilat = new List<Tila> { tila },
                Henkilot = new Dictionary<string, Henkilo> { ["h"] = henkilo },
            };

            var linssi = new PoikkileikkausLinssi();
            linssi.Avaa(rak, 0);
            double kohdistusHetki = 1.0;
            linssi.Kohdista("keittio", kohdistusHetki);
            double saapumisHetki = kohdistusHetki + Kameraliike.SiirtymanKesto(rak.YleisVaaka, tila.Kamera);

            double kestoN0 = Ohjaaja.AskeleenKesto(tila.Kasikirjoitus[1], tila, rak);
            var n0 = linssi.NakymaHetkella(saapumisHetki + 1.8 + kestoN0 / 2, pysty: false);
            Oleta.Sama("kokki", n0.Puhuja, "N=0: puhuja");
            Oleta.Sama("Ensimmäinen repliikki.", n0.Repliikki, "N=0: teksti tulee askel.N:stä (ei aina Repliikit[0])");
            Oleta.Sama("aani-0", n0.AskeleenAani, "N=0: aani-id askel.N:stä");
            Oleta.Sama(1, n0.Askel, "N=0: askelindeksi (0=pulu-lenna, 1=tämä repliikki)");

            double alkuN1 = saapumisHetki + 1.8 + kestoN0;
            double kestoN1 = Ohjaaja.AskeleenKesto(tila.Kasikirjoitus[2], tila, rak);
            var n1 = linssi.NakymaHetkella(alkuN1 + kestoN1 / 2, pysty: false);
            Oleta.Sama("kokki", n1.Puhuja, "N=1: puhuja");
            Oleta.Sama("Toinen repliikki.", n1.Repliikki, "N=1: eri teksti kuin N=0:lla");
            Oleta.Sama("aani-1", n1.AskeleenAani, "N=1: eri aani-id kuin N=0:lla");
            Oleta.Sama(2, n1.Askel, "N=1: eri askelindeksi kuin N=0:lla");

            Oleta.Tosi(n0.AskeleenAani != n1.AskeleenAani, "sama hahmo puhuu kahdesti peräkkäin eri N:llä -> kaksi eri AskeleenAani-arvoa");
            Oleta.Tosi(n0.Askel != n1.Askel, "sama hahmo puhuu kahdesti peräkkäin eri N:llä -> eri Askel");
        }

        [Testi] static void NakymaHetkellaOnToistettava()
        {
            var rak = DioraamaData.Lue(KeittioFixture);
            var linssi = new PoikkileikkausLinssi();
            linssi.Avaa(rak, 0);
            linssi.Kohdista("keittio", 1);
            linssi.Napauta(3.3);

            double t = 6.4;
            var a = linssi.NakymaHetkella(t, pysty: true);
            var b = linssi.NakymaHetkella(t, pysty: true);

            Oleta.Sama(a.Kamera.Atsimuutti, b.Kamera.Atsimuutti);
            Oleta.Sama(a.Kamera.Korkeus, b.Kamera.Korkeus);
            Oleta.Sama(a.Kamera.Etaisyys, b.Kamera.Etaisyys);
            Oleta.Sama(a.KohdeTila, b.KohdeTila);
            Oleta.Sama(a.PuluLentaa, b.PuluLentaa);
            Oleta.Sama(a.TauluAuki, b.TauluAuki);
            Oleta.Sama(a.Kohta, b.Kohta);
            SamaV3(a.Pulu, b.Pulu, "pulu sama molemmilla kyselyillä");
            Oleta.Sama(a.Tasot.Count, b.Tasot.Count);
            foreach (var avain in a.Tasot.Keys) Oleta.Sama(a.Tasot[avain], b.Tasot[avain], "taso " + avain);
            Oleta.Sama(a.Hahmot.Count, b.Hahmot.Count);
            for (int i = 0; i < a.Hahmot.Count; i++)
            {
                Oleta.Sama(a.Hahmot[i].Naky, b.Hahmot[i].Naky);
                Oleta.Sama(a.Hahmot[i].Silmukka, b.Hahmot[i].Silmukka);
                Oleta.Sama(a.Hahmot[i].Ruutu, b.Hahmot[i].Ruutu);
            }
        }

        // ═══════════════════════════════════════════════════════════════════
        // 4) PARITEETTITESTI: Linssit-testit/kultaiset/dioraama-vektorit.json (jos olemassa)
        // ═══════════════════════════════════════════════════════════════════

        static string KultainenPolku() => Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", "dioraama-vektorit.json");
        static bool KultainenSaatavilla() => File.Exists(KultainenPolku());
        static JsonElement? kultainenPuskuri;
        static JsonElement Kultainen() => kultainenPuskuri ??= JsonDocument.Parse(File.ReadAllText(KultainenPolku())).RootElement;

        static V3 LueV3Json(JsonElement e)
        {
            var a = e.EnumerateArray().Select(x => x.GetDouble()).ToArray();
            return new V3(a[0], a[1], a[2]);
        }

        static Asento LueAsentoJson(JsonElement e) => new Asento(
            LueV3Json(e.GetProperty("kohde")), e.GetProperty("atsimuutti").GetDouble(), e.GetProperty("korkeus").GetDouble(),
            e.GetProperty("etaisyys").GetDouble(), e.GetProperty("fov").GetDouble(), e.GetProperty("aukko").GetDouble(),
            LueKiertoJson(e));

        /// <summary>ERA 2B: lukee ASENTOn valinnaisen "kierto"-kentän (dioraama-vektorit.json:n rajaus-osio,
        /// tools/dioraama/tee-vektorit.mjs). Puuttuva kenttä -> null (Kameraliike.RajaaKierto soveltaa oletuksen).</summary>
        static Kierto LueKiertoJson(JsonElement asentoJson)
        {
            if (!asentoJson.TryGetProperty("kierto", out var k) || k.ValueKind != JsonValueKind.Object) return null;
            return new Kierto
            {
                AtsimuuttiMin = k.GetProperty("atsimuuttiMin").ValueKind == JsonValueKind.Null ? (double?)null : k.GetProperty("atsimuuttiMin").GetDouble(),
                AtsimuuttiMax = k.GetProperty("atsimuuttiMax").ValueKind == JsonValueKind.Null ? (double?)null : k.GetProperty("atsimuuttiMax").GetDouble(),
                KorkeusMin = k.GetProperty("korkeusMin").GetDouble(), KorkeusMax = k.GetProperty("korkeusMax").GetDouble(),
                EtaisyysMin = k.GetProperty("etaisyysMin").GetDouble(), EtaisyysMax = k.GetProperty("etaisyysMax").GetDouble(),
            };
        }

        static string TekstiTaiNull(JsonElement e) => e.ValueKind == JsonValueKind.Null ? null : e.GetString();

        static List<Kameratapahtuma> LueAikatauluJson(JsonElement arr) => arr.EnumerateArray()
            .Select(e => new Kameratapahtuma(e.GetProperty("hetki").GetDouble(), TekstiTaiNull(e.GetProperty("kohde")), e.GetProperty("kesto").GetDouble()))
            .ToList();

        [Testi] static void PariteettiKamera()
        {
            if (!KultainenSaatavilla()) return;
            foreach (var pari in Kultainen().GetProperty("kamera").EnumerateArray())
            {
                string nimi = pari.GetProperty("nimi").GetString();
                var p0 = LueAsentoJson(pari.GetProperty("p0"));
                var p1 = LueAsentoJson(pari.GetProperty("p1"));
                Lahella(pari.GetProperty("kesto").GetDouble(), Kameraliike.SiirtymanKesto(p0, p1), nimi + " kesto");
                foreach (var nayte in pari.GetProperty("naytteet").EnumerateArray())
                {
                    double t = nayte.GetProperty("t").GetDouble();
                    string mita = $"{nimi} t={t}";
                    var odotettu = nayte.GetProperty("asento");
                    var asento = Kameraliike.SiirtymaAsento(p0, p1, t);
                    LahellaV3(LueV3Json(odotettu.GetProperty("kohde")), asento.Kohde, mita + " kohde");
                    Lahella(odotettu.GetProperty("atsimuutti").GetDouble(), asento.Atsimuutti, mita + " atsimuutti");
                    Lahella(odotettu.GetProperty("korkeus").GetDouble(), asento.Korkeus, mita + " korkeus");
                    Lahella(odotettu.GetProperty("etaisyys").GetDouble(), asento.Etaisyys, mita + " etaisyys");
                    Lahella(odotettu.GetProperty("fov").GetDouble(), asento.Fov, mita + " fov");
                    Lahella(odotettu.GetProperty("aukko").GetDouble(), asento.Aukko, mita + " aukko");
                    var (sijainti, _) = Kameraliike.AsentoSijainti(asento);
                    LahellaV3(LueV3Json(nayte.GetProperty("sijainti").GetProperty("sijainti")), sijainti, mita + " sijainti");
                }
            }
        }

        static Rakennus kultainenRakennus;
        static Rakennus KultainenRakennus() => kultainenRakennus ??= DioraamaData.Lue(Kultainen().GetProperty("heratys").GetProperty("rakennus").GetRawText());

        [Testi] static void PariteettiHeratys()
        {
            if (!KultainenSaatavilla()) return;
            var k = Kultainen().GetProperty("heratys");
            var rak = KultainenRakennus();
            var aikataulu = LueAikatauluJson(k.GetProperty("aikataulu"));
            foreach (var hetki in k.GetProperty("hetket").EnumerateArray())
            {
                double t = hetki.GetProperty("t").GetDouble();
                foreach (var tilaOd in hetki.GetProperty("tilat").EnumerateArray())
                {
                    string tilaId = tilaOd.GetProperty("tilaId").GetString();
                    string mita = $"tila {tilaId} t={t}";
                    var (taso, alkoi, edellinen) = Heratys.TilanTasoJaEdellinen(rak, aikataulu, tilaId, t);
                    Oleta.Sama(tilaOd.GetProperty("taso").GetInt32(), taso, mita + " taso");
                    Lahella(tilaOd.GetProperty("alkoi").GetDouble(), alkoi, mita + " alkoi");
                    Oleta.Sama(tilaOd.GetProperty("edellinenTaso").GetInt32(), edellinen, mita + " edellinenTaso");
                    Lahella(tilaOd.GetProperty("aanenVoimakkuus").GetDouble(), Heratys.AanenVoimakkuus(taso, alkoi, edellinen, t), mita + " aanenVoimakkuus");
                }
                foreach (var hahmoOd in hetki.GetProperty("hahmot").EnumerateArray())
                {
                    string tilaId = hahmoOd.GetProperty("tilaId").GetString();
                    int hahmoIndeksi = hahmoOd.GetProperty("hahmoIndeksi").GetInt32();
                    string mita = $"hahmo {tilaId}[{hahmoIndeksi}] t={t}";
                    var ht = Heratys.HahmonTila(rak, aikataulu, tilaId, hahmoIndeksi, t);
                    Oleta.Sama(hahmoOd.GetProperty("naky").GetBoolean(), ht.Naky, mita + " naky");
                    Oleta.Sama(hahmoOd.GetProperty("silmukka").GetString(), ht.Silmukka, mita + " silmukka");
                    Oleta.Sama(hahmoOd.GetProperty("ruutu").GetInt32(), ht.Ruutu, mita + " ruutu");
                }
            }
        }

        [Testi] static void PariteettiOhjaaja()
        {
            if (!KultainenSaatavilla()) return;
            var k = Kultainen().GetProperty("ohjaaja");
            var rak = KultainenRakennus();
            var tila = rak.Tila("keittio");
            var kestotOd = k.GetProperty("kestot").EnumerateArray().Select(x => x.GetDouble()).ToList();
            Oleta.Sama(kestotOd.Count, tila.Kasikirjoitus.Count, "askelmäärä");
            var kestot = new List<double>();
            for (int i = 0; i < tila.Kasikirjoitus.Count; i++)
            {
                double kesto = Ohjaaja.AskeleenKesto(tila.Kasikirjoitus[i], tila, rak);
                Lahella(kestotOd[i], kesto, $"AskeleenKesto[{i}]");
                kestot.Add(kesto);
            }
            var napautukset = k.GetProperty("napautukset").EnumerateArray().Select(x => x.GetDouble()).ToList();
            foreach (var hetki in k.GetProperty("hetket").EnumerateArray())
            {
                double t = hetki.GetProperty("t").GetDouble();
                string mita = "ohjaaja t=" + t;
                var kt = Ohjaaja.KasikirjoitusHetkella(kestot, napautukset, t);
                Oleta.Sama(hetki.GetProperty("indeksi").GetInt32(), kt.Indeksi, mita + " indeksi");
                Lahella(hetki.GetProperty("alku").GetDouble(), kt.Alku, mita + " alku");
                Lahella(hetki.GetProperty("paikallinen").GetDouble(), kt.Paikallinen, mita + " paikallinen");
                Oleta.Sama(hetki.GetProperty("valmis").GetBoolean(), kt.Valmis, mita + " valmis");
            }
        }

        [Testi] static void PariteettiPulu()
        {
            if (!KultainenSaatavilla()) return;
            foreach (var lento in Kultainen().GetProperty("pulu").EnumerateArray())
            {
                string nimi = lento.GetProperty("nimi").GetString();
                var alku = LueV3Json(lento.GetProperty("alku"));
                var loppu = LueV3Json(lento.GetProperty("loppu"));
                foreach (var nayte in lento.GetProperty("naytteet").EnumerateArray())
                {
                    double t01 = nayte.GetProperty("t01").GetDouble();
                    var piste = Ohjaaja.PuluLento(alku, loppu, t01);
                    LahellaV3(LueV3Json(nayte.GetProperty("piste")), piste, $"{nimi} t01={t01}");
                }
            }
        }

        // ═══════════════════════════════════════════════════════════════════
        // 5) Aanimaisema (erä 2, dioraama-aanirajapinta-ehdotus.md): tilan silmukoiden tavoitetaso
        //    (Heratys.AanenVoimakkuus-liuku), "massa"-yleisnäkymämallin erikoissääntö ja tehosteajastimen
        //    determinismi/ajoitus.
        // ═══════════════════════════════════════════════════════════════════

        [Testi] static void AanimaisemaSilmukanTavoitetasoLiukuu()
        {
            var am = new Aanimaisema();
            Oleta.Sama(0.0, am.SilmukanTavoitetaso("huone", 0, null, 0.0), "alkutaso 0, ei liu'ussa (ensimmäinen kutsu)");
            Oleta.Sama(0.0, am.SilmukanTavoitetaso("huone", 2, null, 1.0), "taso vaihtui juuri nyt: liuku ei ole vielä edennyt");
            Lahella(0.5, am.SilmukanTavoitetaso("huone", 2, null, 1.6), "puolivälissä 1,2 s liukua (0,6 s kulunut)");
            Oleta.Sama(1.0, am.SilmukanTavoitetaso("huone", 2, null, 2.2), "liuku valmis 1,2 s kohdalla");
            Oleta.Sama(1.0, am.SilmukanTavoitetaso("huone", 2, null, 5.0), "pysyy tasossa 1 kunnes taso vaihtuu uudelleen");
            // Lasku (taso 2 → 0): Heratys.cs:n Aikajana-kommentti ("LASKU tapahtuu heti tapahtuman hetkellä") koskee
            // vain SITÄ HETKEÄ, jolloin liuku alkaa (alkoi = t, ei viivettä) — itse äänenvoimakkuus liukuu tästä
            // hetkestä vanhasta arvosta (1,0) uuteen (0,0) samalla 1,2 s käyrällä kuin nousu, ei hypähdä heti.
            Oleta.Sama(1.0, am.SilmukanTavoitetaso("huone", 0, null, 5.0), "taso vaihtui juuri nyt (lasku): liuku lähtee vanhasta arvosta 1,0");
            Lahella(0.75, am.SilmukanTavoitetaso("huone", 0, null, 5.3), "lasku etenee samalla 1,2 s käyrällä (0,3/1,2 s kohti 0:aa)");
        }

        [Testi] static void AanimaisemaMassaYleisnakymassaJaKohdistettuna()
        {
            var am = new Aanimaisema();
            // Massalle nykyinenTaso-parametri ei vaikuta mitään (0 kelpaa aina testiarvoksi): kohdeTila ratkaisee.
            Oleta.Sama(1.0, am.SilmukanTavoitetaso(Aanimaisema.MassaTilaId, 0, null, 0.0), "massa yleisnäkymässä: 1");
            Oleta.Sama(0.35, am.SilmukanTavoitetaso(Aanimaisema.MassaTilaId, 0, "keittio", 1.0), "massa kun tila kohdistettu: 0,35");
            Oleta.Sama(1.0, am.SilmukanTavoitetaso(Aanimaisema.MassaTilaId, 2, null, 2.0), "takaisin yleisnäkymään: 1 (ei liu'u itse)");
        }

        [Testi] static void AanimaisemaTehosteAjastinEiSoiHetiJaValiOsuu()
        {
            // ValiMin = ValiMax = 1: väli on aina täsmälleen 1 s riippumatta arvotusta murto-osasta (ennustettavaa).
            var jakso = new DioraamaData_TehosteJaksoTestiapuri().Uusi(1, 1, "ainoa");
            var am = new Aanimaisema();
            Oleta.Tosi(am.TehosteenLaukaisu("h", 0, jakso, 0.0) == null, "ei laukaisua heti avattaessa (odottaa ensin)");
            Oleta.Tosi(am.TehosteenLaukaisu("h", 0, jakso, 0.5) == null, "ei vielä 0,5 s kohdalla");
            Oleta.Sama("ainoa", am.TehosteenLaukaisu("h", 0, jakso, 1.0), "laukeaa 1 s kohdalla");
            Oleta.Tosi(am.TehosteenLaukaisu("h", 0, jakso, 1.0) == null, "ei laukea kahdesti samalla hetkellä");
            Oleta.Tosi(am.TehosteenLaukaisu("h", 0, jakso, 1.9) == null, "ei vielä toista laukaisua (2,0 s)");
            Oleta.Sama("ainoa", am.TehosteenLaukaisu("h", 0, jakso, 2.0), "toinen laukaisu 2,0 s kohdalla (1,0 + 1,0)");
        }

        [Testi] static void AanimaisemaTehosteAjastinDeterministinenJaValinValissa()
        {
            var jakso = new DioraamaData_TehosteJaksoTestiapuri().Uusi(2, 4, "lintu", "tuuli");
            var am1 = new Aanimaisema();
            var am2 = new Aanimaisema();
            var t1 = new List<(double T, string Id)>();
            var t2 = new List<(double T, string Id)>();
            for (double t = 0; t <= 30; t += 0.25)
            {
                var id1 = am1.TehosteenLaukaisu("keittio", 0, jakso, t);
                if (id1 != null) t1.Add((t, id1));
                var id2 = am2.TehosteenLaukaisu("keittio", 0, jakso, t);
                if (id2 != null) t2.Add((t, id2));
            }
            Oleta.Tosi(t1.Count >= 3, $"ainakin 3 laukaisua 30 s:ssa 2..4 s väleillä (saatiin {t1.Count})");
            Oleta.Sama(t1.Count, t2.Count, "eri Aanimaisema-instanssi, sama tila+jakso: sama laukaisumäärä");
            for (int i = 0; i < t1.Count; i++)
            {
                Oleta.Sama(t1[i].T, t2[i].T, $"laukaisu {i}: samaan aikaan molemmissa instansseissa");
                Oleta.Sama(t1[i].Id, t2[i].Id, $"laukaisu {i}: sama äänen id molemmissa instansseissa");
                Oleta.Tosi(jakso.AaniIdt.Contains(t1[i].Id), $"laukaisu {i}: id ({t1[i].Id}) on jakson AaniIdt-listalta");
            }
            for (int i = 1; i < t1.Count; i++)
            {
                double vali = t1[i].T - t1[i - 1].T;
                // ±0,26 s testin 0,25 s:n näytteistysaskeleen pyöristysvaraa varten.
                Oleta.Tosi(vali >= 2.0 - 0.26 && vali <= 4.0 + 0.26, $"väli {vali:F2} s on lähellä 2..4 s ikkunaa");
            }
        }

        /// <summary>Pieni apuri TehosteJakson kokoamiseen testeissä (DioraamaData.TehosteJakso-kentät ovat julkisia,
        /// mutta oliolauseke pysyy siistimpänä nimettynä metodina toistuvassa käytössä).</summary>
        sealed class DioraamaData_TehosteJaksoTestiapuri
        {
            public TehosteJakso Uusi(double valiMin, double valiMax, params string[] aaniIdt)
            {
                var j = new TehosteJakso { ValiMin = valiMin, ValiMax = valiMax };
                j.AaniIdt.AddRange(aaniIdt);
                return j;
            }
        }

        // ═══════════════════════════════════════════════════════════════════
        // 6) ERA 2B (dioraama-rajapinnat-era2b-20260929.md kohdat 1 ja 4, P0/datakerros): Rakennus.Valaistus,
        //    Tila.Valot, Pinta.Kuvio, Asento.Kierto, Henkilo.Malli3d. Jokainen testi tarkistaa myös vanhan
        //    muodon (kenttä puuttuu lähteestä) oletusarvon.
        // ═══════════════════════════════════════════════════════════════════

        [Testi] static void ValaistusJasennysJaOletusPuuttuessa()
        {
            const string json = @"{
              ""valaistus"": {
                ""aurinko"": {""atsimuutti"":215,""korkeus"":38,""vari"":""#fff0d8"",""voima"":1.15},
                ""taivas"": {""yla"":""#b9cddd"",""ala"":""#5d4c3c"",""voima"":0.55},
                ""sumu"": null
              }
            }";
            var r = DioraamaData.Lue(json);
            Oleta.Tosi(r.Valaistus != null, "valaistus jäsentyy");
            Oleta.Sama(215.0, r.Valaistus.Aurinko.Atsimuutti);
            Oleta.Sama(38.0, r.Valaistus.Aurinko.Korkeus);
            Oleta.Sama("#fff0d8", r.Valaistus.Aurinko.Vari);
            Oleta.Sama(1.15, r.Valaistus.Aurinko.Voima);
            Oleta.Sama("#b9cddd", r.Valaistus.Taivas.Yla);
            Oleta.Sama("#5d4c3c", r.Valaistus.Taivas.Ala);
            Oleta.Sama(0.55, r.Valaistus.Taivas.Voima);

            // Vanha rakennus.json (ei valaistus-kenttää lähteessä): Valaistus pysyy nullina.
            var vanha = DioraamaData.Lue(KeittioFixture);
            Oleta.Tosi(vanha.Valaistus == null, "vanhassa muodossa ei valaistusta -> null");
        }

        [Testi] static void TilanValotJasennysJaOletusPuuttuessa()
        {
            const string json = @"{
              ""tilat"": [
                {
                  ""id"":""keittio"",""kohdistettava"":true,""rajat"":{""min"":[0,0,0],""max"":[1,1,1]},
                  ""valot"": [
                    {""paikka"":[14,0.5,4.9],""sade"":7,""voima"":1},
                    {""paikka"":[13.3,0.9,4.9],""sade"":1.5,""voima"":0.6,""vari"":""#ffb070"",""lepatus"":0.35}
                  ]
                },
                {""id"":""massa"",""kohdistettava"":false,""rajat"":{""min"":[0,0,0],""max"":[1,1,1]}}
              ]
            }";
            var r = DioraamaData.Lue(json);
            var keittio = r.Tila("keittio");
            Oleta.Sama(2, keittio.Valot.Count);
            SamaV3(new V3(14, 0.5, 4.9), keittio.Valot[0].Paikka, "valot[0].Paikka");
            Oleta.Sama(7.0, keittio.Valot[0].Sade);
            Oleta.Sama(1.0, keittio.Valot[0].Voima);
            Oleta.Tosi(keittio.Valot[0].Vari == null, "ensimmäisellä valolla ei väriä -> null");
            Oleta.Sama(0.0, keittio.Valot[0].Lepatus, "lepatus puuttuu -> 0");
            Oleta.Sama("#ffb070", keittio.Valot[1].Vari);
            Oleta.Sama(0.35, keittio.Valot[1].Lepatus, "tulisijan lepatus 0,35 (kohta 1)");

            var massa = r.Tila("massa");
            Oleta.Sama(0, massa.Valot.Count, "valot puuttuu JSON:sta -> tyhjä lista");
        }

        [Testi] static void PinnanKuvioJasennysJaOletusTasainen()
        {
            const string json = @"{
              ""pinnat"": {
                ""kivilattia"": {""vari"":""#9c948a"",""toisto_m"":0.5,
                  ""kuvio"":{""tyyppi"":""kivi"",""koko_m"":[0.6,0.6],""sauma_m"":0.015,""vaihtelu"":0.4}},
                ""kivi"": {""vari"":""#b8ad9c"",""toisto_m"":2.0}
              }
            }";
            var r = DioraamaData.Lue(json);
            var kivilattia = r.Pinnat["kivilattia"].Kuvio;
            Oleta.Sama("kivi", kivilattia.Tyyppi);
            Oleta.Sama(0.6, kivilattia.KokoU);
            Oleta.Sama(0.6, kivilattia.KokoV);
            Oleta.Sama(0.015, kivilattia.Sauma);
            Oleta.Sama(0.4, kivilattia.Vaihtelu);

            // Pinta ilman kuvio-kenttää: oletus "tasainen", muut kentät 0. Kuvio ei ole koskaan null.
            var kivi = r.Pinnat["kivi"].Kuvio;
            Oleta.Tosi(kivi != null, "Kuvio ei ole koskaan null");
            Oleta.Sama("tasainen", kivi.Tyyppi);
            Oleta.Sama(0.0, kivi.KokoU);
            Oleta.Sama(0.0, kivi.Vaihtelu);
        }
        [Testi] static void AsennonKiertoJasennysJaOletusPuuttuessa()
        {
            const string json = @"{
              ""yleiskamera"": {
                ""vaaka"": {""kohde"":[0,2,0],""atsimuutti"":165,""korkeus"":30,""etaisyys"":150,""fov"":32,""aukko"":0.3,
                  ""kierto"":{""atsimuutti"":null,""korkeus"":[8,70],""etaisyys"":[0.45,1.8]}}
              },
              ""tilat"": [
                {""id"":""keittio"",""kohdistettava"":true,""rajat"":{""min"":[0,0,0],""max"":[1,1,1]},
                  ""kamera"":{""kohde"":[1,1,1],""atsimuutti"":172,""korkeus"":22,""etaisyys"":16,""fov"":38,""aukko"":0.8,
                    ""kierto"":{""atsimuutti"":[-55,55],""korkeus"":[6,65],""etaisyys"":[0.55,1.6]}}},
                {""id"":""ilmankiertoa"",""kohdistettava"":true,""rajat"":{""min"":[0,0,0],""max"":[1,1,1]},
                  ""kamera"":{""kohde"":[1,1,1],""atsimuutti"":0,""korkeus"":0,""etaisyys"":1,""fov"":40,""aukko"":0}}
              ]
            }";
            var r = DioraamaData.Lue(json);

            var yleisKierto = r.YleisVaaka.Kierto;
            Oleta.Tosi(yleisKierto != null, "yleiskameran kierto jäsentyy");
            Oleta.Tosi(yleisKierto.AtsimuuttiMin == null && yleisKierto.AtsimuuttiMax == null, "atsimuutti null -> vapaa 360");
            Oleta.Sama(8.0, yleisKierto.KorkeusMin);
            Oleta.Sama(70.0, yleisKierto.KorkeusMax);
            Oleta.Sama(0.45, yleisKierto.EtaisyysMin);
            Oleta.Sama(1.8, yleisKierto.EtaisyysMax);

            var tilaKierto = r.Tila("keittio").Kamera.Kierto;
            Oleta.Tosi(tilaKierto != null, "tilan kierto jäsentyy");
            Oleta.Sama(-55.0, tilaKierto.AtsimuuttiMin.Value);
            Oleta.Sama(55.0, tilaKierto.AtsimuuttiMax.Value);
            Oleta.Sama(6.0, tilaKierto.KorkeusMin);
            Oleta.Sama(65.0, tilaKierto.KorkeusMax);
            Oleta.Sama(0.55, tilaKierto.EtaisyysMin);
            Oleta.Sama(1.6, tilaKierto.EtaisyysMax);

            Oleta.Tosi(r.Tila("ilmankiertoa").Kamera.Kierto == null, "kierto puuttuu lähteestä -> null (kutsuja valitsee oletuksen)");

            // Speksin kohdan 1 valmiit oletukset: lukittu regressiota vastaan (muut agentit nojaavat näihin).
            Oleta.Sama(-55.0, Kierto.OletusTila.AtsimuuttiMin.Value);
            Oleta.Sama(55.0, Kierto.OletusTila.AtsimuuttiMax.Value);
            Oleta.Sama(6.0, Kierto.OletusTila.KorkeusMin);
            Oleta.Sama(65.0, Kierto.OletusTila.KorkeusMax);
            Oleta.Sama(0.55, Kierto.OletusTila.EtaisyysMin);
            Oleta.Sama(1.6, Kierto.OletusTila.EtaisyysMax);
            Oleta.Tosi(Kierto.OletusYleis.AtsimuuttiMin == null && Kierto.OletusYleis.AtsimuuttiMax == null, "yleisnäkymän oletus: vapaa atsimuutti");
            Oleta.Sama(8.0, Kierto.OletusYleis.KorkeusMin);
            Oleta.Sama(70.0, Kierto.OletusYleis.KorkeusMax);
            Oleta.Sama(0.45, Kierto.OletusYleis.EtaisyysMin);
            Oleta.Sama(1.8, Kierto.OletusYleis.EtaisyysMax);
        }

        [Testi] static void HenkilonMalli3dJasennysJaOletusPuuttuessa()
        {
            const string json = @"{
              ""henkilot"": {
                ""kokki-1500"": {
                  ""nimi"":""Kokki"",""atlas"":""hahmot/kokki-1500.png"",""ruutu"":[128,192],""sarakkeet"":8,
                  ""pivot"":[0.5,0.04],""korkeus_m"":1.72,
                  ""silmukat"":{""idle"":{""rivi"":0,""ruudut"":4,""fps"":6}},
                  ""malli3d"": {
                    ""mittasuhteet"": {""pituus_m"":1.72,""hartiat_m"":0.42,""lantio_m"":0.34,""paa_m"":0.22},
                    ""vaatteet"": {""paita"":""#7a3b2e"",""housut"":""#4b3a2a"",""esiliina"":""#e8e0cc"",""paahine"":""myssy""},
                    ""varit"": {""iho"":""#d9b48f"",""hiukset"":""#3a2a1f""},
                    ""esine"": ""kauha"",
                    ""glb"": ""hahmot3d/kokki-1500.glb""
                  }
                },
                ""apulainen-1500"": {
                  ""nimi"":""Apulainen"",""atlas"":""hahmot/apulainen-1500.png"",""ruutu"":[128,192],""sarakkeet"":8,
                  ""pivot"":[0.5,0.04],""korkeus_m"":1.65,
                  ""silmukat"":{""idle"":{""rivi"":0,""ruudut"":4,""fps"":6}}
                }
              }
            }";
            var r = DioraamaData.Lue(json);
            var kokki = r.Henkilot["kokki-1500"].Malli3d;
            Oleta.Tosi(kokki != null, "malli3d jäsentyy");
            Oleta.Sama(1.72, kokki.Mittasuhteet.PituusM);
            Oleta.Sama(0.42, kokki.Mittasuhteet.HartiatM);
            Oleta.Sama(0.34, kokki.Mittasuhteet.LantioM);
            Oleta.Sama(0.22, kokki.Mittasuhteet.PaaM);
            Oleta.Sama("#7a3b2e", kokki.Vaatteet.Paita);
            Oleta.Sama("#4b3a2a", kokki.Vaatteet.Housut);
            Oleta.Tosi(kokki.Vaatteet.Hame == null, "housut asetettu -> hame null (housut|hame poissulkevat)");
            Oleta.Sama("#e8e0cc", kokki.Vaatteet.Esiliina);
            Oleta.Sama("myssy", kokki.Vaatteet.Paahine);
            Oleta.Sama(2, kokki.Varit.Count);
            Oleta.Sama("#d9b48f", kokki.Varit["iho"]);
            Oleta.Sama("#3a2a1f", kokki.Varit["hiukset"]);
            Oleta.Sama("kauha", kokki.Esine);
            Oleta.Sama("hahmot3d/kokki-1500.glb", kokki.Glb);

            // Vanha henkilö (ei malli3d-kenttää lähteessä): Malli3d pysyy nullina (2D-atlashahmo jatkuu).
            Oleta.Tosi(r.Henkilot["apulainen-1500"].Malli3d == null, "malli3d puuttuu -> null");
        }

        // ═══════════════════════════════════════════════════════════════════
        // 6) ERA 2B PARITEETTI (agentti P5, dioraama-rajapinnat-era2b-20260929.md kohdat 1 ja 5):
        //    RajaaKierto ja Leijunta — dioraama-vektorit.json:n rajaus/leijunta-osiot.
        //    (Kaarilennon SiirtymaAsento-pariteetti ajautuu jo yllä olevassa PariteettiKamera-testissä,
        //    koska formulanmuutos ei muuttanut sen allekirjoitusta tai kutsutapaa.)
        // ═══════════════════════════════════════════════════════════════════

        [Testi] static void PariteettiRajaus()
        {
            if (!KultainenSaatavilla()) return;
            foreach (var tapaus in Kultainen().GetProperty("rajaus").EnumerateArray())
            {
                string nimi = tapaus.GetProperty("nimi").GetString();
                var perus = LueAsentoJson(tapaus.GetProperty("perus"));
                var asento = LueAsentoJson(tapaus.GetProperty("asento"));
                bool yleisnakyma = tapaus.GetProperty("yleisnakyma").GetBoolean();
                var odotettu = tapaus.GetProperty("tulos");
                var tulos = Kameraliike.RajaaKierto(perus, asento, yleisnakyma);
                Lahella(odotettu.GetProperty("atsimuutti").GetDouble(), tulos.Atsimuutti, nimi + " atsimuutti");
                Lahella(odotettu.GetProperty("korkeus").GetDouble(), tulos.Korkeus, nimi + " korkeus");
                Lahella(odotettu.GetProperty("etaisyys").GetDouble(), tulos.Etaisyys, nimi + " etaisyys");
                Lahella(odotettu.GetProperty("fov").GetDouble(), tulos.Fov, nimi + " fov");
                Lahella(odotettu.GetProperty("aukko").GetDouble(), tulos.Aukko, nimi + " aukko");
            }
        }

        [Testi] static void PariteettiLeijunta()
        {
            if (!KultainenSaatavilla()) return;
            var l = Kultainen().GetProperty("leijunta");
            var asento = LueAsentoJson(l.GetProperty("asento"));
            foreach (var nayte in l.GetProperty("naytteet").EnumerateArray())
            {
                double t = nayte.GetProperty("t").GetDouble();
                string mita = "leijunta t=" + t;
                var odotettu = nayte.GetProperty("tulos");
                var tulos = Kameraliike.Leijunta(asento, t);
                Lahella(odotettu.GetProperty("atsimuutti").GetDouble(), tulos.Atsimuutti, mita + " atsimuutti");
                Lahella(odotettu.GetProperty("korkeus").GetDouble(), tulos.Korkeus, mita + " korkeus");
                Lahella(odotettu.GetProperty("etaisyys").GetDouble(), tulos.Etaisyys, mita + " etaisyys");
            }
        }

        // ═══════════════════════════════════════════════════════════════════
        // 7) ERÄ 2B (ali-agentti P4b, dioraama-rajapinnat-era2b-20260929.md kohta 4 "3D-HAHMOT"):
        //    Liikkeet.cs (NivelKulmat/JuuriNousu) pariteetti Linssit-testit/kultaiset/dioraama-liikkeet-
        //    vektorit.json:ia vasten (tools/dioraama/tee-liikevektorit.mjs). Kultainen tiedosto ei sisällä
        //    LIIKKEET-pankin lähdeavaimia (vain tulokset) — LiikkeetFixtureJson alla on SUORAAN pelin repon
        //    js/dioraama/pankit/liikkeet.js:stä generoitu (node -e "console.log(JSON.stringify(LIIKKEET))"),
        //    ei käsin näpätty, jotta transkriptioriski ei sekoita pariteettia. Testaa SAMALLA DioraamaData.
        //    Lue/LueLiike-jäsennyksen (era2b kohta 4, rakennus.json:n uusi "liikkeet"-kenttä).
        // ═══════════════════════════════════════════════════════════════════

        const string LiikkeetFixtureJson = @"{""liikkeet"": {
  ""idle"": {""kesto_s"":4,""avaimet"":{""selka"":[[0,0,0,0],[0.5,1.5,0,0],[1,0,0,0]],""paa"":[[0,0,0,0],[0.5,0,2,0],[1,0,0,0]],""olka_v"":[[0,0,0,0],[0.5,2,0,0],[1,0,0,0]],""olka_o"":[[0,0,0,0],[0.5,2,0,0],[1,0,0,0]]}},
  ""tyo"": {""kesto_s"":2,""avaimet"":{""olka_o"":[[0,20,0,10],[0.25,35,0,-15],[0.5,20,0,-30],[0.75,5,0,-15],[1,20,0,10]],""kyynar_o"":[[0,40,0,0],[0.25,55,0,0],[0.5,40,0,0],[0.75,25,0,0],[1,40,0,0]],""kasi_o"":[[0,0,0,10],[0.5,0,0,-10],[1,0,0,10]],""selka"":[[0,0,0,0],[0.25,0,0,3],[0.5,0,0,0],[0.75,0,0,-3],[1,0,0,0]],""paa"":[[0,0,0,0],[0.5,3,0,0],[1,0,0,0]]}},
  ""kavely"": {""kesto_s"":1,""juuri"":{""nousu_m"":0.03},""avaimet"":{""lonkka_v"":[[0,25,0,0],[0.25,-5,0,0],[0.5,-25,0,0],[0.75,-5,0,0],[1,25,0,0]],""lonkka_o"":[[0,-25,0,0],[0.25,-5,0,0],[0.5,25,0,0],[0.75,-5,0,0],[1,-25,0,0]],""polvi_v"":[[0,8,0,0],[0.5,8,0,0],[0.75,50,0,0],[1,8,0,0]],""polvi_o"":[[0,8,0,0],[0.25,50,0,0],[0.5,8,0,0],[1,8,0,0]],""olka_v"":[[0,-15,0,0],[0.25,-3,0,0],[0.5,15,0,0],[0.75,-3,0,0],[1,-15,0,0]],""olka_o"":[[0,15,0,0],[0.25,3,0,0],[0.5,-15,0,0],[0.75,3,0,0],[1,15,0,0]],""kyynar_v"":[[0,15,0,0],[0.5,20,0,0],[1,15,0,0]],""kyynar_o"":[[0,15,0,0],[0.5,20,0,0],[1,15,0,0]],""selka"":[[0,0,0,3],[0.25,0,0,0],[0.5,0,0,-3],[0.75,0,0,0],[1,0,0,3]],""paa"":[[0,0,0,0],[0.5,2,0,0],[1,0,0,0]]}},
  ""kanto"": {""kesto_s"":1,""juuri"":{""nousu_m"":0.025},""avaimet"":{""lonkka_v"":[[0,25,0,0],[0.25,-5,0,0],[0.5,-25,0,0],[0.75,-5,0,0],[1,25,0,0]],""lonkka_o"":[[0,-25,0,0],[0.25,-5,0,0],[0.5,25,0,0],[0.75,-5,0,0],[1,-25,0,0]],""polvi_v"":[[0,8,0,0],[0.5,8,0,0],[0.75,50,0,0],[1,8,0,0]],""polvi_o"":[[0,8,0,0],[0.25,50,0,0],[0.5,8,0,0],[1,8,0,0]],""olka_v"":[[0,-10,0,0],[0.5,10,0,0],[1,-10,0,0]],""kyynar_v"":[[0,20,0,0],[0.5,25,0,0],[1,20,0,0]],""olka_o"":[[0,10,0,0],[1,10,0,0]],""kyynar_o"":[[0,60,0,0],[1,60,0,0]],""selka"":[[0,0,0,3],[0.25,0,0,0],[0.5,0,0,-3],[0.75,0,0,0],[1,0,0,3]],""paa"":[[0,0,0,0],[0.5,2,0,0],[1,0,0,0]]}},
  ""puhe"": {""kesto_s"":3,""avaimet"":{""paa"":[[0,0,0,0],[0.25,3,4,0],[0.5,-2,-3,0],[0.75,2,3,0],[1,0,0,0]],""olka_o"":[[0,10,0,0],[0.3,30,0,15],[0.6,15,0,-10],[1,10,0,0]],""kyynar_o"":[[0,30,0,0],[0.3,70,0,0],[0.6,50,0,0],[1,30,0,0]]}}
}}";

        static Dictionary<string, Liike> liikkeetPankkiCache;
        static Dictionary<string, Liike> LiikkeetPankki() => liikkeetPankkiCache ??= DioraamaData.Lue(LiikkeetFixtureJson).Liikkeet;

        static string KultainenLiikkeetPolku() => Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", "dioraama-liikkeet-vektorit.json");
        static bool KultainenLiikkeetSaatavilla() => File.Exists(KultainenLiikkeetPolku());
        static JsonElement? kultainenLiikkeetPuskuri;
        static JsonElement KultainenLiikkeet() => kultainenLiikkeetPuskuri ??= JsonDocument.Parse(File.ReadAllText(KultainenLiikkeetPolku())).RootElement;

        static double[] LueLukuTaulukkoJson(JsonElement e) => e.EnumerateArray().Select(x => x.GetDouble()).ToArray();

        [Testi] static void LiikkeetJasennysRakennusJsonista()
        {
            // DioraamaData.Lue/LueLiike (era2b kohta 4): fixturen "liikkeet"-kenttä jäsentyy pankiksi.
            var pankki = LiikkeetPankki();
            Oleta.Sama(5, pankki.Count);
            Oleta.Sama(4.0, pankki["idle"].KestoS);
            Oleta.Tosi(pankki["idle"].JuuriNousuM == null, "idle: ei juuri-kenttää lähteessä -> null");
            Oleta.Sama(0.03, pankki["kavely"].JuuriNousuM.Value);
            Oleta.Sama(0.025, pankki["kanto"].JuuriNousuM.Value);
            var selka = pankki["idle"].Avaimet["selka"];
            Oleta.Sama(3, selka.Length);
            Lahella(0.5, selka[1][0], "idle.selka avain[1].t01"); Lahella(1.5, selka[1][1], "idle.selka avain[1].rx");
            Oleta.Tosi(!pankki["puhe"].Avaimet.ContainsKey("lantio"), "puhe ei mainitse lantiota avaimissaan");
        }

        [Testi] static void PariteettiLiikkeet()
        {
            if (!KultainenLiikkeetSaatavilla()) return;
            var pankki = LiikkeetPankki();
            foreach (var s in KultainenLiikkeet().GetProperty("silmukat").EnumerateArray())
            {
                string nimi = s.GetProperty("silmukka").GetString();
                Oleta.Tosi(pankki.TryGetValue(nimi, out var liike), $"LiikkeetFixtureJson: silmukka '{nimi}' puuttuu (ei täsmää LIIKKEET-pankkiin)");
                Lahella(s.GetProperty("kesto_s").GetDouble(), liike.KestoS, nimi + " kesto_s (fixturen ja kultaisen täsmäys)");
                var juuriOdotettu = s.GetProperty("juuri_nousu_m");
                if (juuriOdotettu.ValueKind == JsonValueKind.Null)
                    Oleta.Tosi(liike.JuuriNousuM == null, nimi + " juuri_nousu_m: odotettu null");
                else Lahella(juuriOdotettu.GetDouble(), liike.JuuriNousuM ?? 0, nimi + " juuri_nousu_m");

                foreach (var nayte in s.GetProperty("naytteet").EnumerateArray())
                {
                    double t = nayte.GetProperty("t").GetDouble();
                    string mita = $"{nimi} t={t}";
                    var nivelKulmat = Liikkeet.NivelKulmat(liike, t);
                    var odotetutNivelet = nayte.GetProperty("nivelet");
                    foreach (var nivel in Liikkeet.Nivelet)
                    {
                        var odotettu = LueLukuTaulukkoJson(odotetutNivelet.GetProperty(nivel));
                        var saatu = nivelKulmat[nivel];
                        Lahella(odotettu[0], saatu[0], $"{mita} {nivel}.rx"); Lahella(odotettu[1], saatu[1], $"{mita} {nivel}.ry");
                        Lahella(odotettu[2], saatu[2], $"{mita} {nivel}.rz");
                    }
                    Lahella(nayte.GetProperty("juuriNousu").GetDouble(), Liikkeet.JuuriNousu(liike, t), mita + " juuriNousu");
                }
            }
        }
    }
}
