// Kultaiset testit: vanojen piirron CPU-osa (web js/aikajana-vanat.js).
// Arvot tekee Linssit-testit/kultaiset/tee-vanat.mjs verkkopelin omalla
// moduulilla: puhtaat funktiot suoraan ja luoVanat valepallolla
// (instanssipuskuri ja uniformit paivita/korosta-sarjan jälkeen).
//
// Toleranssit: puhtaat funktiot suhteellisesti 1e-9 (V8:n ja .NETin acos ja
// pow voivat erota ulpin); webin Float32Array-puskurit ja uniformit
// Float32-pyöristyksen verran (2^-22 suhteellisesti).
using System;
using System.Collections.Generic;
using System.IO;
using Matkakirja.Linssit.Virrat;
using static Matkakirja.Linssit.Testit.VirratApu;

namespace Matkakirja.Linssit.Testit
{
    public static class VanaPiirtoTestit
    {
        static Dictionary<string, object> kultaiset;
        static Ruutumaski rantamaski, kulku;
        static VanatTulos vanat;

        static Dictionary<string, object> K =>
            kultaiset ??= (Dictionary<string, object>)Jasenna(File.ReadAllText(Path.Combine(Kansio, "vanat.json")));

        static Ruutumaski Ranta => rantamaski ??= Ruutumaski.Lue(Jasenna(File.ReadAllText(Path.Combine(Kansio, "rantamaski.json"))));

        static Ruutumaski Kulku => kulku ??= Ruutumaski.Kulkumaskista(Aineisto.Maamaski);

        /// <summary>Vanat virrat-kultaiset.json:sta (C# JohdaVanat antaa samat, VirratVanatTestit).</summary>
        static VanatTulos Vanat
        {
            get
            {
                if (vanat != null) return vanat;
                var o = O(Kultaiset, "vanat");
                var t = new VanatTulos();
                foreach (var a in L(o, "vanat"))
                {
                    var v = O(a);
                    var pisteet = new List<VananKarki>();
                    foreach (var p in L(v, "pisteet")) { var q = L(p); pisteet.Add(new VananKarki(D(q[0]), D(q[1]), D(q[2]))); }
                    var virrat = new List<string>();
                    foreach (var s in L(v, "virrat")) virrat.Add((string)s);
                    t.Vanat.Add(new Vana { Tunnus = S(v, "tunnus"), Virta = S(v, "virta"), Paksuus = D(v["paksuus"]), Pisteet = pisteet, Virrat = virrat });
                }
                foreach (var a in L(o, "kotipesat"))
                {
                    var p = O(a);
                    t.Kotipesat.Add(new Kotipesa { Tunnus = S(p, "tunnus"), Lat = D(p["lat"]), Lon = D(p["lon"]), Aika = D(p["aika"]), Sade = D(p["sade"]) });
                }
                return vanat = t;
            }
        }

        /// <summary>Webin pallon säde (maailmayksikköä) ja km → maailmayksikkö.</summary>
        const double WebSade = 100 * (1 + VanaPiirto.VananKorkeus);
        const double KmYks = 100.0 / VanaPiirto.MaapallonSadeKm;

        static VanaPiirto UusiPiirto() =>
            new VanaPiirto(Vanat, Aineisto.Virrat, Aineisto.Vanat.Kaista, Ranta, Kulku, WebSade);

        /// <summary>Float32-arvo: ero enintään 2^-22 suhteellisesti (web tallentaa Float32Arrayhin).</summary>
        static void Float32(double odotettu, double saatu, string viesti)
        {
            var mittakaava = Math.Max(Math.Abs(odotettu), Math.Abs(saatu));
            if (Math.Abs(odotettu - saatu) <= mittakaava * 2.4e-7 + 1e-30) return;
            throw new Exception($"odotettu {odotettu:R}, saatu {saatu:R} (Float32) {viesti}");
        }

        /* ------------------------------------------------------ puhtaat kaavat */

        [Testi] static void VakiotSamat()
        {
            var v = O(K, "vakiot");
            Oleta.Sama(D(v["KAISTAN_PEITTO"]), VanaPiirto.KaistanPeitto);
            Oleta.Sama(D(v["KAISTAN_LEVEYS_KM"]), VanaPiirto.KaistanOletusleveysKm);
            Oleta.Sama(D(v["KAISTAN_MERI_KERROIN"]), VanaPiirto.KaistanMeriKerroin);
            Oleta.Sama(D(v["KAISTAN_MIN_PX"]), VanaPiirto.KaistanMinPx);
            Oleta.Sama(D(v["KAISTAN_MERI_MIN_PX"]), VanaPiirto.KaistanMeriMinPx);
            Oleta.Sama(D(v["KAISTAN_PEHMENNYS_KM"]), VanaPiirto.KaistanPehmennysKm);
            Oleta.Sama(D(v["KAISTAN_PEHMENNYS_PX"]), VanaPiirto.KaistanPehmennysPx);
            Oleta.Sama(D(L(v, "KAISTAN_KERROIN_RAJAT")[0]), VanaPiirto.KaistanKerroinMin);
            Oleta.Sama(D(L(v, "KAISTAN_KERROIN_RAJAT")[1]), VanaPiirto.KaistanKerroinMax);
            Oleta.Sama(D(v["KAISTAN_ALUEEN_PEHMEYS"]), VanaPiirto.KaistanAlueenPehmeys);
            Oleta.Sama(D(L(v, "KAISTAN_MERI_RAJAT_KM")[0]), VanaPiirto.KaistanMeriRajaAla);
            Oleta.Sama(D(L(v, "KAISTAN_MERI_RAJAT_KM")[1]), VanaPiirto.KaistanMeriRajaYla);
            Oleta.Sama(D(L(v, "RANTAMASKIN_KYNNYS")[0]), VanaPiirto.RantamaskinKynnysAla);
            Oleta.Sama(D(L(v, "RANTAMASKIN_KYNNYS")[1]), VanaPiirto.RantamaskinKynnysYla);
            Oleta.Sama(D(v["VANAN_ENNAKKO"]), VanaPiirto.VananEnnakko);
            Oleta.Sama(D(v["VANAN_ENNAKKO_MAX_AST"]), VanaPiirto.VananEnnakkoMaxAst);
            Oleta.Sama(D(v["VANAN_ASKEL_MS"]), VanaPiirto.VananAskelMs);
            Oleta.Sama(D(v["KAISTAN_PITO_VARA"]), VanaPiirto.KaistanPitoVara);
            Oleta.Sama(I(v["KOTIPESAN_KARKIA"]), VanaPiirto.KotipesanKarkia);
            Oleta.Sama(D(v["KOTIPESAN_LEVEYS_PX"]), VanaPiirto.KotipesanLeveysPx);
            Oleta.Sama(D(v["KOTIPESAN_PEITTO"]), VanaPiirto.KotipesanPeitto);
            Oleta.Sama(D(v["KOROSTUKSEN_HEHKU"]), VanaPiirto.KorostuksenHehku);
            Oleta.Sama(D(v["KOROSTUKSEN_VAIMEA"]), VanaPiirto.KorostuksenVaimea);
            Oleta.Sama(D(v["MAAPALLON_SADE_KM"]), VanaPiirto.MaapallonSadeKm);
            Oleta.Sama(I(v["KAISTAN_VANOJA_MAX"]), VanaPiirto.VanojaMax);
            Oleta.Sama(I(v["KAISTAN_VIRTOJA_MAX"]), VanaPiirto.VirtojaMax);
            Oleta.Sama(D(v["VANAN_KORKEUS"]), VanaPiirto.VananKorkeus);
        }

        [Testi] static void MatkaHetkella()
        {
            var matka = new List<double>();
            foreach (var a in L(K, "selkaMatka")) matka.Add(D(a));
            var aika = new List<double>();
            foreach (var p in Vanat.Vanat[0].Pisteet) aika.Add(p.Aika);
            foreach (var a in L(K, "matkaNyt"))
            {
                var r = L(a);
                Lahella(D(r[1]), VanaPiirto.MatkaHetkella(matka, aika, D(r[0])), "matkaHetkella " + D(r[0]));
            }
            foreach (var a in L(K, "matkaErikois"))
            {
                var r = L(a);
                var m = new List<double>(); foreach (var x in L(r[0])) m.Add(D(x));
                var t = new List<double>(); foreach (var x in L(r[1])) t.Add(D(x));
                Oleta.Sama(D(r[3]), VanaPiirto.MatkaHetkella(m, t, D(r[2])), "erikois");
            }
            Oleta.Sama(0.0, VanaPiirto.MatkaHetkella(null, aika, 5), "null");
        }

        [Testi] static void KarjenPaino()
        {
            foreach (var a in L(K, "paino"))
            {
                var r = L(a);
                Lahella(D(r[3]), VanaPiirto.KarjenPaino(D(r[0]), D(r[1]), D(r[2])), "paino");
                Lahella(D(r[4]), VanaPiirto.KarjenPaino(D(r[0]), D(r[1]), D(r[2]), true), "paino pidossa");
            }
        }

        [Testi] static void KaistaPisteissa()
        {
            var kaista = Aineisto.Vanat.Kaista;
            var n = 0;
            foreach (var a in L(K, "kaistat"))
            {
                var r = L(a);
                double lat = D(r[0]), lon = D(r[1]);
                var nimi = $"({lat}, {lon})";
                Lahella(D(r[2]), VanaPiirto.Leveyskerroin(lat, lon, kaista.Alueet), "leveyskerroin " + nimi);
                Lahella(D(r[3]), VanaPiirto.KaistanLeveysKm(lat, lon, kaista), "kaistanLeveysKm " + nimi);
                Oleta.Sama(I(r[4]), VanaPiirto.RantamaskinRuutu(lat, lon, Ranta), "rantamaskinRuutu " + nimi);
                var d = VanaPiirto.EtaisyysMaahan(lat, lon, Ranta);
                Lahella(D(r[5]), double.IsInfinity(d) ? -1 : d, "etaisyysMaahan " + nimi);
                Lahella(D(r[6]), VanaPiirto.Merisyys(lat, lon, Ranta), "merisyys " + nimi);
                Lahella(D(r[7]), VanaPiirto.Merisyys(lat, lon, Ranta, Kulku), "merisyys kulkumaskilla " + nimi);
                Oleta.Sama(I(r[8]) == 1, VanaPiirto.KarkiMerella(lat, lon, Ranta, Kulku), "karkiMerella " + nimi);
                var d300 = VanaPiirto.EtaisyysMaahan(lat, lon, Ranta, 300);
                Lahella(D(r[9]), double.IsInfinity(d300) ? -1 : d300, "etaisyysMaahan 300 km " + nimi);
                n += 1;
            }
            Oleta.Tosi(n > 500, "kaistapisteitä " + n);
        }

        [Testi] static void LeveyskerroinOmillaAlueilla()
        {
            foreach (var a in L(K, "kerroinOmat"))
            {
                var r = L(a);
                var alueet = new List<KaistanAlue>();
                foreach (var x in L(r[2]))
                {
                    var o = O(x);
                    alueet.Add(new KaistanAlue
                    {
                        Lat = new[] { D(L(o, "lat")[0]), D(L(o, "lat")[1]) },
                        Lon = new[] { D(L(o, "lon")[0]), D(L(o, "lon")[1]) },
                        Kerroin = D(o["kerroin"]),
                        Pehmeys = o.ContainsKey("pehmeys") ? D(o["pehmeys"]) : (double?)null,
                    });
                }
                Lahella(D(r[3]), VanaPiirto.Leveyskerroin(D(r[0]), D(r[1]), alueet), "leveyskerroin");
            }
            Oleta.Sama(1.0, VanaPiirto.Leveyskerroin(10, 10, null), "ei alueita");
            Oleta.Sama(1.0, VanaPiirto.Leveyskerroin(10, 10, new[] { new KaistanAlue { Kerroin = 3 } }), "alue ilman laatikkoa");
            Oleta.Sama(200.0, VanaPiirto.KaistanLeveysKm(10, 10, null), "oletuskaista");
        }

        [Testi] static void VahimmaisleveysJaLineaarinen()
        {
            foreach (var a in L(K, "vahimmais"))
            {
                var r = L(a);
                Lahella(D(r[2]), VanaPiirto.VahimmaisleveysKm(D(r[0]), D(r[1])), "vahimmaisleveysKm");
            }
            foreach (var a in L(K, "lineaari"))
            {
                var r = L(a);
                Lahella(D(r[1]), VanaPiirto.Lineaariseksi(D(r[0])), "lineaariseksi " + D(r[0]));
            }
        }

        [Testi] static void KotipesanRengas()
        {
            foreach (var a in L(K, "renkaat"))
            {
                var o = O(a);
                var rengas = VanaPiirto.KotipesanRengas(D(o["lat"]), D(o["lon"]), D(o["sade"]), I(o["karkia"]));
                var odotettu = L(o, "pisteet");
                Oleta.Sama(odotettu.Count, rengas.Count, "renkaan pisteitä");
                for (var k = 0; k < odotettu.Count; k += 1)
                {
                    var p = L(odotettu[k]);
                    Lahella(D(p[0]), rengas[k].Lat, "rengas lat " + k);
                    Lahella(D(p[1]), rengas[k].Lon, "rengas lon " + k);
                }
            }
        }

        [Testi] static void RantamaskiSisaltopaketista()
        {
            var m = Ranta;
            Oleta.Sama(2880, m.Leveys);
            Oleta.Sama(1440, m.Korkeus);
            Oleta.Sama(0.125, m.Aste);
            var alkio = O(Jasenna(File.ReadAllText(Path.Combine(Kansio, "rantamaski.json"))));
            Oleta.Sama(S(O(alkio, "data"), "juoksut"), Ruudukko.PakkaaMaamaski(m.Maa), "pakkaus palautuu");
            // Sama olio ilman alkion kuorta.
            Oleta.Sama(m.Maa.Length, Ruutumaski.Lue(O(alkio, "data")).Maa.Length);
            // Maa-alueen tarkistus: Kairo maalla, Atlantti merellä.
            Oleta.Sama(1, (int)m.Maa[VanaPiirto.RantamaskinRuutu(30.05, 31.23, m)], "Kairo");
            Oleta.Sama(0, (int)m.Maa[VanaPiirto.RantamaskinRuutu(30, -40, m)], "Atlantti");
        }

        /* ----------------------------------------------------- rakennus */

        [Testi] static void MitatSamatKuinWebissa()
        {
            var m = O(O(K, "piirto"), "mitat");
            var kmPx = D(m["kmPx"]);
            var mitat = VanaPiirto.Mitat(kmPx, Aineisto.Vanat.Kaista);
            Lahella(D(m["minPuoli"]), mitat.MinPuoliKm * KmYks, "uMinPuoli");
            Lahella(D(m["minPuoliMeri"]), mitat.MinPuoliMeriKm * KmYks, "uMinPuoliMeri");
            Lahella(D(m["pehmennys"]), mitat.PehmennysKm * KmYks, "uPehmennys");
            Lahella(D(m["sade"]), WebSade, "uSade");
            var p = UusiPiirto();
            Oleta.Sama(D(m["meriKerroin"]), p.MeriKerroin);
            Oleta.Sama(D(m["peitto"]), p.Peitto);
            var tila = O(O(K, "piirto"), "tila");
            Lahella(D(tila["leveysPx"]), Math.Round(mitat.LeveysPx * 10) / 10, "leveysPx");
            Lahella(1.0, VanaPiirto.Mitat(kmPx).RengasPuoliKm / kmPx, "renkaan puolileveys px");
        }

        [Testi] static void InstanssipuskuriSamaKuinWebissa()
        {
            var piirto = O(K, "piirto");
            var p = UusiPiirto();
            var tila = O(piirto, "tila");
            Oleta.Sama(I(piirto["janoja"]), p.Janat.Count, "janoja");
            Oleta.Sama(I(tila["vanoja"]), p.VanojaPiirrossa, "vanoja");
            Oleta.Sama(true, p.MaskiKaytossa, "maski");
            Oleta.Sama(36, I(piirto["leveys"]), "instanssin leveys");
            var tarkistettu = 0;
            foreach (var a in L(piirto, "janat"))
            {
                var r = L(a);
                var j = I(r[0]);
                var b = L(r[1]);
                var jana = p.Janat[j];
                var nimi = $"jana {j} (vana {jana.Vana})";
                var pisteet = new[] { jana.P0, jana.P1, jana.P2, jana.P3 };
                for (var q = 0; q < 4; q += 1)
                {
                    VanaPiirto.PallonPiste(pisteet[q].Lat, pisteet[q].Lon, WebSade, out var x, out var y, out var z);
                    Float32(D(b[q * 3]), x, nimi + " iP" + q + ".x");
                    Float32(D(b[q * 3 + 1]), y, nimi + " iP" + q + ".y");
                    Float32(D(b[q * 3 + 2]), z, nimi + " iP" + q + ".z");
                }
                var matkat = new[] { jana.Matka0, jana.Matka1, jana.Matka2, jana.Matka3 };
                for (var q = 0; q < 4; q += 1) Float32(D(b[16 + q]), matkat[q], nimi + " iMatka" + q);
                Float32(D(b[13]), jana.PuoliKmA * KmYks, nimi + " iW.y");
                Float32(D(b[14]), jana.PuoliKmB * KmYks, nimi + " iW.z");
                Float32(D(b[21]), jana.AikaA, nimi + " iAika.y");
                Float32(D(b[22]), jana.AikaB, nimi + " iAika.z");
                Float32(D(b[25]), jana.MeriA, nimi + " iMeri.y");
                Float32(D(b[26]), jana.MeriB, nimi + " iMeri.z");
                Float32(D(b[29]), jana.RantaKmA * KmYks, nimi + " iRanta.y");
                Float32(D(b[30]), jana.RantaKmB * KmYks, nimi + " iRanta.z");
                Oleta.Sama(I(b[32]), jana.VirtaA, nimi + " iVirta.x");
                Oleta.Sama(I(b[33]), jana.VirtaB, nimi + " iVirta.y");
                Oleta.Sama(I(b[34]), jana.Vana, nimi + " iVana");
                Oleta.Sama(false, jana.Rengas, nimi + " rengas");
                tarkistettu += 1;
            }
            Oleta.Tosi(tarkistettu > 250, "otos " + tarkistettu);
        }

        [Testi] static void KotipesienRenkaatSamatKuinWebissa()
        {
            var p = UusiPiirto();
            var pesat = L(O(K, "piirto"), "pesat");
            Oleta.Sama(pesat.Count, p.KotipesiaPiirrossa, "kotipesiä");
            for (var i = 0; i < pesat.Count; i += 1)
            {
                var o = O(pesat[i]);
                var paikat = L(o, "paikat");
                var janat = p.Renkaat.FindAll((j) => j.Vana == VanaPiirto.VanojaMax + i);
                Oleta.Sama(paikat.Count / 3 - 1, janat.Count, "renkaan janoja");
                for (var k = 0; k <= janat.Count; k += 1)
                {
                    var ll = k < janat.Count ? janat[k].P1 : janat[k - 1].P2;
                    VanaPiirto.PallonPiste(ll.Lat, ll.Lon, WebSade, out var x, out var y, out var z);
                    Float32(D(paikat[k * 3]), x, $"pesä {i} kärki {k}.x");
                    Float32(D(paikat[k * 3 + 1]), y, $"pesä {i} kärki {k}.y");
                    Float32(D(paikat[k * 3 + 2]), z, $"pesä {i} kärki {k}.z");
                }
                Oleta.Sama("rgb(217,115,30)", S(o, "tyyli"), "webin tyyli");
                Oleta.Sama(VanaPiirto.KotipesanLeveysPx, D(o["leveys"]));
                Lahella(VanaPiirto.Lineaariseksi(217), p.PesanVari.R, "pesän väri r");
                Lahella(VanaPiirto.Lineaariseksi(115), p.PesanVari.G, "pesän väri g");
                Lahella(VanaPiirto.Lineaariseksi(30), p.PesanVari.B, "pesän väri b");
                Oleta.Tosi(janat.TrueForAll((j) => j.Rengas && j.MeriA == 1), "renkaan liput");
            }
        }

        /* ---------------------------------------------------------- kehys */

        [Testi] static void KehysSarjaSamaKuinWebissa()
        {
            var p = UusiPiirto();
            var sarja = L(O(K, "piirto"), "sarja");
            var n = 0;
            foreach (var a in sarja)
            {
                var o = O(a);
                var komento = S(o, "komento");
                var arvo = O(o, "arvo");
                bool tulos;
                double karkiNyt = 0;
                if (komento == "paivita")
                {
                    karkiNyt = D(arvo["nyt"]);
                    var pito = arvo.TryGetValue("pito", out var pt) && pt is bool b && b;
                    tulos = p.Paivita(karkiNyt, pito);
                }
                else
                {
                    var virta = arvo["virta"] as string;
                    var vaimea = arvo.TryGetValue("vaimea", out var va) ? D(va) : VanaPiirto.KorostuksenVaimea;
                    var hehku = arvo.TryGetValue("hehku", out var he) ? D(he) : VanaPiirto.KorostuksenHehku;
                    tulos = p.Korosta(virta, vaimea, hehku);
                }
                var nimi = $"#{n} {komento}";
                Oleta.Sama((bool)o["tulos"], tulos, nimi + " tulos");
                Float32(D(o["nyt"]), p.Nyt, nimi + " uNyt");
                Float32(D(o["rintama"]), p.Rintama, nimi + " uRintama");
                Oleta.Sama(D(o["pito"]) == 1, p.Pito, nimi + " uPito");
                Oleta.Sama((bool)o["nakyva"], p.Nakyvissa, nimi + " näkyvä");
                var kuljettu = L(o, "kuljettu");
                var peitto = L(o, "peitto");
                for (var i = 0; i < VanaPiirto.VanojaMax; i += 1)
                {
                    Float32(D(kuljettu[i]), p.Kuljettu[i], nimi + " uKuljettu " + i);
                    Float32(D(peitto[i]), p.VanaPeitto[i], nimi + " uVanaPeitto " + i);
                }
                var vanha = L(o, "vanha");
                var kirkas = L(o, "kirkas");
                for (var i = 0; i < VanaPiirto.VirtojaMax * 3; i += 1)
                {
                    Float32(D(vanha[i]), p.Vanha[i], nimi + " uVanha " + i);
                    Float32(D(kirkas[i]), p.Kirkas[i], nimi + " uKirkas " + i);
                }
                var pesat = L(o, "pesat");
                for (var i = 0; i < pesat.Count; i += 1)
                {
                    var r = L(pesat[i]);
                    Oleta.Sama((bool)r[0], p.PesaNakyvissa(i), nimi + " pesä näkyy " + i);
                    Lahella(D(r[1]), p.PesanPeitto(i), nimi + " pesän peitto " + i);
                }
                if (komento != "paivita") karkiNyt = 0;
                var karki = O(o, "karki");
                var k1 = p.Karki(karkiNyt).Value;
                Lahella(D(karki["lat"]), k1.Lat, nimi + " kärki lat");
                Lahella(D(karki["lng"]), k1.Lon, nimi + " kärki lon");
                var ilman = O(o, "karkiIlman");
                var k0 = p.Karki(karkiNyt, 0).Value;
                Lahella(D(ilman["lat"]), k0.Lat, nimi + " kärki ilman ennakkoa lat");
                Lahella(D(ilman["lng"]), k0.Lon, nimi + " kärki ilman ennakkoa lon");
                n += 1;
            }
            Oleta.Sama(I(O(O(K, "piirto"), "tila")["paivityksia"]), p.Paivityksia, "päivityksiä");
        }

        [Testi] static void JananNakyvyysJaVari()
        {
            var p = UusiPiirto();
            var eka = p.Janat[0];
            Oleta.Sama(false, p.JanaNakyvissa(eka), "ennen alkua");
            p.Paivita(eka.AikaA + 1);
            Oleta.Sama(false, p.JanaNakyvissa(eka), "juuri ennen alkua");
            // Kello janan puolivälissä: osuus 1/2, kärjen paino 1, alun paino rintaman mukaan.
            var puoliva = (eka.AikaA + eka.AikaB) / 2;
            p.Paivita(puoliva);
            Oleta.Sama(true, p.JanaNakyvissa(eka), "puolivälissä");
            Lahella(0.5, p.JananOsuus(eka), "osuus", 1e-6);
            var karki = p.JananVari(eka, 0.5);
            var paavirta = eka.VirtaA;
            Lahella(p.Kirkas[paavirta * 3], karki.R, "kärki rintaman värinen", 1e-9);
            Lahella(VanaPiirto.KaistanPeitto, karki.A, "peitto");
            // Korostus: muu virta vaimentaa.
            p.Korosta("tyynimeri");
            Lahella(VanaPiirto.KaistanPeitto * VanaPiirto.KorostuksenVaimea, p.JananVari(eka, 0.5).A, "vaimennettu");
            // Pidossa kelaus taaksepäin ei lyhennä eikä leimauta rintamaan.
            p.Paivita(1000, true);
            p.Paivita(puoliva, true);
            Oleta.Sama(1.0, p.JananOsuus(eka), "pito ei lyhennä");
            Lahella(p.Vanha[paavirta * 3], p.JananVari(eka, 1).R, "pidossa vanha väestö", 1e-9);
            // Renkaat: näkyy pysäkkinsä hetkellä ja jää palamaan pidossa.
            var rengas = p.Renkaat[0];
            Oleta.Sama(true, p.JanaNakyvissa(rengas), "rengas pidossa");
            Oleta.Sama(double.MaxValue, p.RenkaanKuljettu(0));
            p.Paivita(400000);
            Oleta.Sama(false, p.JanaNakyvissa(rengas), "rengas ennen pysäkkiä");
            Oleta.Sama(0.0, p.RenkaanKuljettu(0));
        }

        [Testi] static void VahennettyLiikeAskeltaa()
        {
            var p = UusiPiirto();
            p.VahennettyLiike = true;
            Oleta.Sama(true, p.Paivita(100000, false, 0), "ensimmäinen");
            Oleta.Sama(false, p.Paivita(90000, false, 200), "alle askeleen");
            Oleta.Sama(true, p.Paivita(80000, false, 600), "askel täynnä");
            Oleta.Sama(true, p.Paivita(70000), "ilman kelloa ei rajoiteta");
        }

        [Testi] static void TyhjaEiKaada()
        {
            var p = new VanaPiirto(null, null, null, null);
            Oleta.Sama(false, p.Paivita(1000), "tyhjä paivita");
            Oleta.Sama(true, p.Korosta("paavirta"), "tyhjä korosta");
            Oleta.Sama(false, p.Karki(1000).HasValue, "tyhjä kärki");
            Oleta.Sama(0, p.Janat.Count + p.Renkaat.Count);
            Oleta.Sama(false, p.MaskiKaytossa);
            Oleta.Sama(0.0, VanaPiirto.Merisyys(10, 10, null), "merisyys ilman maskia");
            Oleta.Sama(0.0, VanaPiirto.EtaisyysMaahan(10, 10, null), "etäisyys ilman maskia");
            var q = UusiPiirto();
            q.Pura();
            Oleta.Sama(false, q.Paivita(1000), "purettu");
            Oleta.Sama(false, q.Korosta(null), "purettu korosta");
        }
    }
}
