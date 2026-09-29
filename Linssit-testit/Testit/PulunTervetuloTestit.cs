// Pulun ISS-tervetulo (A–C): repliikit ja vakiot webin kultaisia arvoja vasten (kultaiset/pulu-iss.json, tee-pulu-iss.mjs) ja
// tilakone webin testien mukaan (tests/pulu-iss.test.mjs, A–C): ajoitus äänen kellosta, ohitus, kerran-muisti, mykistys,
// vähennetty liike, kupla ei näy ja mustan verhon odotus. Kello, kamera, kuva, puhe ja muisti ovat tynkiä.
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using Matkakirja.Linssit.Astronautti;

namespace Matkakirja.Linssit.Testit
{
    public static class PulunTervetuloTestit
    {
        static string Polku(string nimi) => Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", nimi);
        static JsonElement K() => JsonDocument.Parse(File.ReadAllText(Polku("pulu-iss.json"))).RootElement;

        sealed class Vale : ITervetulonYmparisto
        {
            public double Aika;
            public bool OnPaljastettu = true, Mykka, Nakyy = true, Muisti, KuvaAukeaa = true;
            public readonly List<string> Kamera = new List<string>();
            public readonly List<string> Sanotut = new List<string>();
            public readonly List<Action<double?>> Soittimet = new List<Action<double?>>();
            public int Vaientui, Suljettu, VaaraAuki;
            public PulunTervetulo T;

            public double Nyt => Aika;
            public bool Paljastettu() => OnPaljastettu;
            public Nakyma? Aloitustila() => new Nakyma(10, 20, 3_000_000);
            public bool KatsoKohteeseen(double lat, double lon, double kestoMs) { Kamera.Add($"katso {lat} {lon} {kestoMs}"); return true; }
            public void PalaaAloitukseen(Nakyma tila, double kestoMs, bool seuraa) => Kamera.Add($"palaa {kestoMs} {seuraa}");
            public bool AvaaVaaraKohde() { VaaraAuki++; return KuvaAukeaa; }
            public void SuljeKortti() => Suljettu++;
            public bool Sano(IssRepliikki r, Action<double?> aaniAlkoi)
            {
                if (!Nakyy) return false;
                Sanotut.Add(r.Avain);
                Soittimet.Add(aaniAlkoi);
                return true;
            }
            public bool Mykistetty() => Mykka;
            public void Vaikene() => Vaientui++;
            public bool Kuultu() => Muisti;
            public void MerkitseKuulluksi() => Muisti = true;

            /// <summary>Kello eteenpäin ja erääntyneet ajastimet (webin tynkäkellon kulje).</summary>
            public void Kulje(double ms) { Aika += ms; T?.Paivita(); }

            /// <summary>Nykyinen repliikki soi alusta loppuun (web soitaLoppuun: 'playing' heti, 'ended' kestonsa jälkeen).</summary>
            public void SoitaLoppuun()
            {
                var r = PulunIss.Jakso.First(x => x.Repliikki.Avain == Sanotut.Last()).Repliikki;
                Soittimet.Last()(r.KestoMs);
                Kulje(r.KestoMs);
            }
        }

        static Vale Aloita(Action<Vale> asetus = null, bool vahennaLiiketta = false)
        {
            var v = new Vale();
            asetus?.Invoke(v);
            v.T = PulunTervetulo.Aloita(v, vahennaLiiketta);
            return v;
        }

        static double Kesto(string avain) => PulunIss.Jakso.First(x => x.Repliikki.Avain == avain).Repliikki.KestoMs;

        [Testi] static void RepliikitJaVakiotKutenWebissa()
        {
            var k = K();
            var jakso = k.GetProperty("jakso").EnumerateArray().ToList();
            Oleta.Sama(jakso.Count, PulunIss.Jakso.Count);
            for (int i = 0; i < jakso.Count; i++)
            {
                var w = jakso[i];
                var n = PulunIss.Jakso[i];
                var r = n.Repliikki;
                Oleta.Sama(w.GetProperty("avain").GetString(), r.Avain);
                Oleta.Sama(w.GetProperty("lahde").GetString(), r.Lahde);
                Oleta.Sama(w.GetProperty("indeksi").GetInt32(), r.Indeksi);
                Oleta.Sama(w.GetProperty("teksti").GetString(), r.Teksti, r.Avain);
                Oleta.Sama(w.GetProperty("kestoMs").GetDouble(), r.KestoMs, r.Avain);
                Oleta.Sama(w.GetProperty("aani").GetString(), r.Aani, r.Avain);
                Oleta.Sama(w.GetProperty("liikettaVaativa").GetBoolean(), n.LiikettaVaativa, r.Avain);
                var toimet = w.GetProperty("toimet").EnumerateArray().ToList();
                Oleta.Sama(toimet.Count, n.Toimet.Length, r.Avain);
                for (int j = 0; j < toimet.Count; j++)
                {
                    Oleta.Sama(toimet[j].GetProperty("ms").GetDouble(), n.Toimet[j].Ms, r.Avain);
                    Oleta.Sama(toimet[j].GetProperty("toimi").GetString(), PulunIss.Nimi(n.Toimet[j].Toimi), r.Avain);
                    Oleta.Sama(toimet[j].GetProperty("kestoMs").GetDouble(), n.Toimet[j].KestoMs, r.Avain);
                }
                Oleta.Tosi(!r.Teksti.Contains("["), "tagit eivät kuulu kuplaan: " + r.Avain);
            }
            var v = k.GetProperty("vakiot");
            Oleta.Sama(v.GetProperty("talle").GetString(), PulunIss.TalleAvain);
            Oleta.Sama(v.GetProperty("viiveMs").GetDouble(), PulunIss.TervetulonViiveMs);
            Oleta.Sama(v.GetProperty("kyselyMs").GetDouble(), PulunIss.KyselyMs);
            Oleta.Sama(v.GetProperty("kattoMs").GetDouble(), PulunIss.KattoMs);
            Oleta.Sama(v.GetProperty("vaaraKohde").GetString(), PulunIss.VaaraKohde);
            Oleta.Sama(v.GetProperty("suosikki").GetProperty("tunnus").GetString(), PulunIss.Suosikki);
            Oleta.Sama(v.GetProperty("suosikki").GetProperty("lat").GetDouble(), PulunIss.SuosikkiLat);
            Oleta.Sama(v.GetProperty("suosikki").GetProperty("lon").GetDouble(), PulunIss.SuosikkiLon);
            Oleta.Sama(v.GetProperty("toimienVaraMs").GetDouble(), PulunIss.ToimienVaraMs);
            Oleta.Sama(v.GetProperty("ohituksenPaluuMs").GetDouble(), PulunIss.OhituksenPaluuMs);
            Oleta.Sama(v.GetProperty("hengahdysMs").GetDouble(), PulunIss.HengahdysMs);
            Oleta.Sama(v.GetProperty("varaMs").GetDouble(), PulunIss.VaraMs);
            Oleta.Sama(string.Join(" ", k.GetProperty("vahennetty").EnumerateArray().Select(x => x.GetString())),
                string.Join(" ", PulunIss.Repliikit(true).Select(x => x.Repliikki.Avain)));
        }

        [Testi] static void JaksoJarjestyksessaKameraRepliikkienTahdissa()
        {
            var v = Aloita();
            Oleta.Tosi(v.T != null);
            // Ei puhetta ennen paljastusta ja hengähdystä.
            v.Kulje(PulunIss.TervetulonViiveMs - 1);
            Oleta.Sama(0, v.Sanotut.Count);
            v.Kulje(1);
            Oleta.Sama("iss-a-1", string.Join(" ", v.Sanotut));
            Oleta.Tosi(v.Muisti, "muisti kirjoitetaan, kun A1 on sanottu");
            v.SoitaLoppuun(); v.Kulje(400); // A1 → A2
            v.SoitaLoppuun(); v.Kulje(400); // A2 → B1
            v.SoitaLoppuun(); v.Kulje(400); // B1 → B2
            Oleta.Sama("iss-a-1 iss-a-2 iss-b-1 iss-b-2", string.Join(" ", v.Sanotut));
            Oleta.Sama(0, v.Kamera.Count);

            // B2: kamera ei liiku ennen soiton alkua, ja pyöräytys osuu sanaan "Pyöräytän" (2,00 s) ja kestää sanaan "noin".
            v.Kulje(500);
            Oleta.Sama(0, v.Kamera.Count);
            v.Soittimet.Last()(Kesto("iss-b-2"));
            v.Kulje(1999);
            Oleta.Sama(0, v.Kamera.Count);
            v.Kulje(1);
            Oleta.Sama($"katso {PulunIss.SuosikkiLat} {PulunIss.SuosikkiLon} 2600", v.Kamera.Last());
            v.Kulje(Kesto("iss-b-2") - 2000); v.Kulje(400);

            // C1: räppäisy heti napautusäänen kohdalla.
            Oleta.Sama("iss-c-1", v.Sanotut.Last());
            v.Soittimet.Last()(Kesto("iss-c-1"));
            v.Kulje(249);
            Oleta.Sama(0, v.VaaraAuki);
            v.Kulje(1);
            Oleta.Sama(1, v.VaaraAuki);
            Oleta.Tosi(v.T.KorttiAuki);
            v.Kulje(Kesto("iss-c-1") - 250); v.Kulje(400);

            // C2: kuva kiinni ja kamera aloitukseen sanasta "Viedään" (3,08 s), seuranta takaisin.
            Oleta.Sama("iss-c-2", v.Sanotut.Last());
            v.Soittimet.Last()(Kesto("iss-c-2"));
            v.Kulje(3079);
            Oleta.Sama(0, v.Suljettu);
            v.Kulje(1);
            Oleta.Sama(1, v.Suljettu);
            Oleta.Sama("palaa 2780 True", v.Kamera.Last());
            v.Kulje(Kesto("iss-c-2") - 3080); v.Kulje(400);

            Oleta.Sama(TervetulonVaihe.Valmis, v.T.Vaihe);
            Oleta.Tosi(!v.T.Kesken && !v.T.Puhuu);
            Oleta.Sama("pyorayta rappaise palaa", string.Join(" ", v.T.Toimitetut));
        }

        [Testi] static void NapautusOhittaaJaNakymaPalaa()
        {
            var v = Aloita();
            // Napautus ennen ensimmäistä repliikkiä ei ohita (tavallista katselua).
            Oleta.Tosi(!v.T.Napautus());
            v.Kulje(PulunIss.TervetulonViiveMs);
            Oleta.Sama("iss-a-1", string.Join(" ", v.Sanotut));
            for (int i = 0; i < 4; i++) { v.SoitaLoppuun(); v.Kulje(400); }
            // C1 alkaa, räppäisy avaa väärän kuvan.
            v.Soittimet.Last()(Kesto("iss-c-1"));
            v.Kulje(1000);
            Oleta.Tosi(v.T.KorttiAuki);
            Oleta.Tosi(v.T.Napautus());
            Oleta.Sama(1, v.Vaientui);
            Oleta.Sama(1, v.Suljettu);
            Oleta.Sama("palaa 700 False", v.Kamera.Last());
            Oleta.Sama(TervetulonVaihe.Ohitettu, v.T.Vaihe);
            // Mitään ei enää sanota eikä kamera liiku.
            int kutsuja = v.Kamera.Count;
            v.Kulje(60000);
            Oleta.Sama("iss-c-1", v.Sanotut.Last());
            Oleta.Sama(kutsuja, v.Kamera.Count);
            Oleta.Tosi(!v.T.Napautus(), "ohitettu jakso ei ohitu uudelleen");
        }

        [Testi] static void OhitusEnnenKameraliikettaEiLiikutaKameraa()
        {
            var v = Aloita();
            v.Kulje(PulunIss.TervetulonViiveMs);
            Oleta.Tosi(v.T.Ohita());
            Oleta.Sama(1, v.Vaientui);
            Oleta.Sama(0, v.Kamera.Count);
            // Vähennetyllä liikkeellä ohituksen paluu on hyppy.
            var w = Aloita(null, true);
            w.Kulje(PulunIss.TervetulonViiveMs);
            Oleta.Tosi(w.T.Ohita());
            Oleta.Sama(0, w.Kamera.Count);
        }

        [Testi] static void KuullaanKerran()
        {
            var v = Aloita();
            v.Kulje(PulunIss.TervetulonViiveMs);
            v.T.Pura();
            Oleta.Sama(1, v.Vaientui, "pura vaientaa kesken olevan puheen");
            Oleta.Sama(TervetulonVaihe.Purettu, v.T.Vaihe);
            // Toinen avaus samalla laitteella: ei tervetuloa.
            Oleta.Tosi(PulunTervetulo.Aloita(v, false) == null);
            // Purku ennen A1:tä ei kuluta muistia.
            var w = Aloita();
            w.Kulje(500);
            w.T.Pura();
            Oleta.Tosi(!w.Muisti);
            Oleta.Sama(0, w.Vaientui);
            w.Kulje(10000);
            Oleta.Sama(0, w.Sanotut.Count);
        }

        [Testi] static void KuplaEiNayJaksoPoisMuistiEnnallaan()
        {
            var v = Aloita(x => x.Nakyy = false);
            v.Kulje(PulunIss.TervetulonViiveMs);
            Oleta.Sama(TervetulonVaihe.Pois, v.T.Vaihe);
            Oleta.Tosi(!v.Muisti);
            // Myöhemmällä rivillä hypätään seuraavaan hengähdyksen jälkeen.
            var w = Aloita();
            w.Kulje(PulunIss.TervetulonViiveMs);
            w.Nakyy = false;
            w.SoitaLoppuun(); w.Kulje(400);
            Oleta.Sama("iss-a-1", string.Join(" ", w.Sanotut));
            Oleta.Sama(TervetulonVaihe.Puhuu, w.T.Vaihe);
            w.Nakyy = true;
            w.Kulje(400);
            Oleta.Sama("iss-a-1 iss-b-1", string.Join(" ", w.Sanotut));
        }

        [Testi] static void MykistettynaEiAloitetaJaKeskenOhittaa()
        {
            var v = new Vale { Mykka = true };
            Oleta.Tosi(PulunTervetulo.Aloita(v, false) == null);
            Oleta.Tosi(!v.Muisti);
            // Mykistys kesken jakson: seuraavaa repliikkiä ei sanota.
            var w = Aloita();
            w.Kulje(PulunIss.TervetulonViiveMs);
            w.Mykka = true;
            w.SoitaLoppuun();
            w.Kulje(400);
            Oleta.Sama("iss-a-1", string.Join(" ", w.Sanotut));
            Oleta.Sama(TervetulonVaihe.Ohitettu, w.T.Vaihe);
            // Mykistys odotuksen aikana: jakso jää pois.
            var x = Aloita();
            x.Mykka = true;
            x.Kulje(PulunIss.TervetulonViiveMs);
            Oleta.Sama(TervetulonVaihe.Pois, x.T.Vaihe);
            Oleta.Sama(0, x.Sanotut.Count);
        }

        [Testi] static void VahennaLiikettaVainTervetulo()
        {
            Oleta.Sama("iss-a-1 iss-a-2", string.Join(" ", PulunIss.Repliikit(true).Select(r => r.Repliikki.Avain)));
            Oleta.Sama(PulunIss.Jakso.Count, PulunIss.Repliikit(false).Count);
            var v = Aloita(null, true);
            v.Kulje(PulunIss.TervetulonViiveMs);
            v.SoitaLoppuun(); v.Kulje(400);
            v.SoitaLoppuun(); v.Kulje(400);
            Oleta.Sama("iss-a-1 iss-a-2", string.Join(" ", v.Sanotut));
            Oleta.Sama(TervetulonVaihe.Valmis, v.T.Vaihe);
            Oleta.Sama(0, v.Kamera.Count);
        }

        [Testi] static void OdottaaMustanVerhonPoistumista()
        {
            var v = Aloita(x => x.OnPaljastettu = false);
            v.Kulje(5000);
            Oleta.Sama(0, v.Sanotut.Count);
            Oleta.Tosi(v.T.Kesken);
            v.OnPaljastettu = true;
            v.Kulje(PulunIss.KyselyMs + PulunIss.TervetulonViiveMs);
            Oleta.Sama("iss-a-1", string.Join(" ", v.Sanotut));
            // Katto: verho ei poistu 20 s:ssa → jakso pois.
            var w = Aloita(x => x.OnPaljastettu = false);
            for (int i = 0; i < 90; i++) w.Kulje(250);
            Oleta.Sama(TervetulonVaihe.Pois, w.T.Vaihe);
        }

        [Testi] static void VarakellotIlmanSoittoa()
        {
            // Soitin ei kerro alkaneensa: B2:n toimet 1,5 s:n varakellolla, ja repliikki päättyy kesto + 2 s.
            var v = Aloita();
            v.Kulje(PulunIss.TervetulonViiveMs);
            for (int i = 0; i < 3; i++) { v.SoitaLoppuun(); v.Kulje(400); }
            Oleta.Sama("iss-b-2", v.Sanotut.Last());
            v.Kulje(PulunIss.ToimienVaraMs + 2000 - 1);
            Oleta.Sama(0, v.Kamera.Count);
            v.Kulje(1);
            Oleta.Sama(1, v.Kamera.Count);
            // Myöhässä tuleva soitto ei ajasta toimia uudelleen.
            v.Soittimet.Last()(Kesto("iss-b-2"));
            v.Kulje(5000);
            Oleta.Sama(1, v.Kamera.Count);
            Oleta.Sama("iss-b-2", v.Sanotut.Last());
            v.Kulje(Kesto("iss-b-2") + PulunIss.VaraMs + 400);
            Oleta.Sama("iss-c-1", v.Sanotut.Last());
            // Ääni jää pois (null): toimet heti soiton ilmoituksesta.
            v.Soittimet.Last()(null);
            v.Kulje(250);
            Oleta.Sama(1, v.VaaraAuki);
        }
    }
}
